import { FC, useState, useRef } from 'react';
import logo from '../../assets/logo.png';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import debounce from '../../utils/debounce'
import { message } from 'antd';
import useAuth from '../../hooks/useAuth';

const Register: FC = () => {
    // 获取一些函数
    const navigate = useNavigate()
    const {register} = useAuth()

    // 用useState管理仅本页面使用的局部状态
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const [hasFocused, setHasFocused] = useState(false);
    
    // 使用ref引用输入框
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // 正则表达式
    const usernameRegex = /^^[A-Za-z0-9]{1,8}$/; // 1-8 位数字和字母
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,20}$/; // 8-20 位非空格字符，必须含大小写和数字

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

    // 处理聚焦事件
    const handleFocused = () => {
        if (!hasFocused) {
            setHasFocused(true);
        }
    };

    // 控制警告是否显示
    let isUsernameInvalid = false
    let isPasswordInvalid = false
    isUsernameInvalid = hasFocused && (!usernameRegex.test(username) || username === '');
    isPasswordInvalid = hasFocused && (!passwordRegex.test(password) || password === '');

    // 控制按钮是否禁用
    const isButtonDisable = isUsernameInvalid || isPasswordInvalid || !hasFocused

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!username || !password) {
          message.error("请输入用户名和密码");
          return;
        }
    
        try {
          await register({ username, password });
          // 不需要手动 navigate，useAuth 已经处理了跳转
        } catch (error) {
          console.error("登录错误:", error); // 仅记录错误，错误提示已在 useAuth 中处理
        }
      };

    return (
        <div className="registerPage-container">
            <h1>
                <span className='text-1'>R</span>
                <span className='text-2'>E</span>
                <span className='text-3'>G</span>
                <span className='text-4'>I</span>
                <span className='text-5'>S</span>
                <span className='text-6'>T</span>
                <span className='text-7'>E</span>
                <span className='text-8'>R</span>
            </h1>
            <div className="form-container">
                <img src={logo} alt="Logo" />
                <form>
                    <input
                        type="text"
                        placeholder="请输入账号"
                        onChange={handleChangeUsername}
                        onFocus={handleFocused}
                        ref={usernameInputRef}
                    />
                    <p className={isUsernameInvalid ? 'visible' : 'hidden'}>
                        账号必须是 1-8 位数字和字母
                    </p>
                    <input
                        type="password"
                        placeholder="请输入密码"
                        onChange={handleChangePassword}
                        onFocus={handleFocused}
                        ref={passwordInputRef}
                    />
                    <p className={isPasswordInvalid ? 'visible' : 'hidden'}>
                        密码长度为 8-20 个非空格字符，必须包含大小写字母和数字
                    </p>
                    <button onClick={handleSubmit} type="submit" disabled={isButtonDisable} className={isButtonDisable ? 'disable' : 'able'}>注册</button>
                    <a onClick={() => navigate('/')}>已经有账号了？点击登录</a>
                </form>
            </div>
        </div>
    );
};

export default Register;