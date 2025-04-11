import logo from '../../assets/logo.png'
import './index.scss'
const Login = () => {
    return(
        <div className="loginPage-container">
          <h1>
            <span className='text-1'>L</span>
            <span className='text-2'>O</span>
            <span className='text-3'>G</span>
            <span className='text-4'>I</span>
            <span className='text-5'>N</span>
          </h1>
          <div className="form-container">
            <img src={logo} alt="Logo" />
            <form>
              <input
                type="text" 
                placeholder="请输入账号"
              />
              <input
                type="password"
                placeholder="请输入密码"
              />
              <button type="submit">登录</button>
              <a>还没有账号？点击注册</a>
            </form>
          </div>
          <h2>登录</h2>
        </div>
      );
}
export default Login