// server.js
const { message } = require('antd');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 注册端点
server.post('/Register',(req,res) => {

  // 解构请求体
  const {username,password} = req.body
  // 结构db文件模拟数据库
  const db = router.db
  // 验证用户名和密码是否为空，如果为空，返回 400 状态码和错误信息
  if (!username || !password) {
    return res.status(400).json({ message: '用户名或密码不能为空' });
  }
  // 检测是否重名
  const existingUser = db.get('users').find({username}).value()
  if (existingUser) {
    return res.status(400).json({message: '用户名已存在'})
  }

  // 创建新用户对象并添加至users并写入json文件
  const newUser = {id: Date.now(),username,password}
  db.get('users').push(newUser).write()

  // 处理token的产生，存储，返回
  const token = `token_${username}_${Date.now()}`
  const tokenRecord = {
    token,
    userId: newUser.id,
    createdAt: new Date().toISOString() //创建时间，格式为ISO字符串
  }
  db.get('tokens').push(tokenRecord).write()
  
  // 返回token给客户端
  res.json({ 
    token,
    user: {
      id: newUser.id,
      username: newUser.username
    }
   })
})
// 登录端点
server.post('/Login',(req,res) => {
  const {username,password} = req.body
  const db = router.db
  // 验证输入
  if (!username || !password) {
    return (
      res.status(400).json({message:'用户名和密码不能为空'})
    )
  }
  // 查找用户并验证
  const user = db.get('users').find({username}).value()
  if(!user || user.password !== password) {
    return (
      res.status(401).json({message:'用户名或密码错误'})
    )
  }
  // 生成新token并存储
  const token = `token_${username}_${Date.now()}`
  const tokenRecord = {
    token: token,
    userId: user.id,
    createdAt: new Date().toISOString()
  }
  db.get('tokens').push(tokenRecord).write()
  console.log('token已写入数据库')
  // 返回数据
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username
    }
  })
  console.log('后端已返回数据')
})
// 启动服务器，监听3001端口
server.listen(3001,() => console.log('JSON Server is running on port 3001'))