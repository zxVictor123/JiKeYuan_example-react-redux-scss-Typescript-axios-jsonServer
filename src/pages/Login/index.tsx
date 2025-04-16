import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import './index.scss'
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUserInfo } from '../../store/modules/userSlice';
import debounce from '../../utils/debounce'
import { message } from 'antd';
import { authApi } from '../../api/auth';
import type { LoginParams } from '../../types/api';

const Login = () => {
    // 获取一些函数
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 用useState管理局部变量
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    // 定义ref
    const usernameInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    // 处理提交表单 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const loginParams: LoginParams = { username, password };
            const response = await authApi.login(loginParams);
            
            if (response.token) {
                dispatch(setToken(response.token))
                dispatch(setUserInfo(response.user))
                message.success('登录成功');
                
                // 清空输入框
                changeUsername('')
                changePassword('')
                if (usernameInputRef.current) usernameInputRef.current.value = '';
                if (passwordInputRef.current) passwordInputRef.current.value = '';
                
                navigate('/Layout')
            }
        } catch (error) {
            // 错误处理已经在 errorHandler 中统一处理
            console.error('登录失败:', error)
        }
    }

    // 处理用户名输入变化
    const handleChangeUsername = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        changeUsername(value);
    }, 300);

    // 处理密码输入变化
    const handleChangePassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        changePassword(value);
    }, 300);

    return (
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
                        ref={usernameInputRef}
                        onChange={handleChangeUsername}
                    />
                    <input
                        type="password"
                        placeholder="请输入密码"
                        ref={passwordInputRef}
                        onChange={handleChangePassword}
                    />
                    <button type="submit" onClick={handleSubmit}>登录</button>
                    <a onClick={() => navigate('/Register')}>还没有账号？点击注册</a>
                </form>
            </div>
        </div>
    );
}

export default Login;