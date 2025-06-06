// 模拟后端服务器
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 中间件配置
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 数据库
const db = router.db

// 生成用户 token
const generateToken = (username) => `token_${username}_${Date.now()}`;

// 创建 token 记录
const createTokenRecord = (token, userId) => ({
    token,
    userId,
    createdAt: new Date().toISOString()
});


// 注册接口
server.post('/register', (req, res) => {
    const { username, password } = req.body;

    // 非空验证
    if (!username || !password) {
        return res.status(400).json({ 
            code: 400,
            message: '用户名和密码不能为空'
        });
    }

    // 检查用户是否存在
    const existingUser = db.get('users').find({ username }).value();
    if (existingUser) {
        return res.status(400).json({
            code: 400,
            message: '用户名已存在'
        });
    }

    // 创建新用户
    const newUser = {
        id: Date.now(),
        username,
        password
    };
    db.get('users').push(newUser).write();

    // 生成token
    const token = generateToken(username);
    const tokenRecord = createTokenRecord(token, newUser.id);
    db.get('tokens').push(tokenRecord).write();

    // 返回成功响应
    res.json({
        code: 200,
        authData: {
            token,
            user: {
                id: newUser.id,
                username: newUser.username
            }
        }
    });
});

// 登录接口
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = router.db;

    // 输入验证
    const validationError = validateUserInput(username, password);
    if (validationError) {
        return res.status(400).json({
            code: 400,
            message: validationError
        });
    }

    // 验证用户存在
    const user = db.get('users').find({ username }).value();
    if (!user) {
        return res.status(401).json({
            code: 401,
            message: '用户名或密码错误'
        });
    }
    
    // 验证密码正确
    if (user.password !== password) {
        return res.status(401).json({
            code: 401,
            message: '用户名或密码错误'
        });
    }

    // 生成token
    const token = generateToken(username);
    const tokenRecord = createTokenRecord(token, user.id);
    db.get('tokens').push(tokenRecord).write();

    // 返回成功响应
    res.json({
        code: 200,
        authData: {
            token,
            user: {
                id: user.id,
                username: user.username
            }
        }
    });
});

// 获取频道接口
server.get('/channel',(req,res) => {
    const channels = db.get('channels').value()
    res.json({
        code: 200,
        channels: channels
    })
})

// 启动服务器
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});