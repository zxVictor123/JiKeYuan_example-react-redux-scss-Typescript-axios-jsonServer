import { FC, useState } from 'react';
import logo from '../../assets/logo.png';
import './index.scss';

const Login: FC = () => {
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [hasFocused, setHasFocused] = useState(false);

  // 防抖函数
  const debounce = <T extends unknown[]>(fn: (...args: T) => void, t: number) => {
    let timer: number | null = null;
    return (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), t);
    };
  };

  // 正则表达式
  const usernameRegex = /^[\s\S]{0,8}$/; // 0-8 位任意字符
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/; // 8-16 位，含大小写和数字

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

  return (
    <div className="LoginPage-container">
      <div className="form-container">
        <img src={logo} alt="Logo" />
        <form>
          <input
            type="text" 
            placeholder="请输入账号"
            onChange={handleChangeUsername}
            onFocus={handleFocused}
          />
          <p className={isUsernameInvalid ? 'visible' : 'hidden'}>
            用户名必须是 1-8 位字符
          </p>
          <input
            type="password"
            placeholder="请输入密码"
            onChange={handleChangePassword}
            onFocus={handleFocused}
          />
          <p className={isPasswordInvalid ? 'visible' : 'hidden'}>
            密码长度为 8-16 个字符，至少包含 1 个小写字母、1 个大写字母和 1 个数字
          </p>
          <button type="submit" disabled = {isButtonDisable} className={isButtonDisable ? 'disable' : 'able'}>注册</button>
        </form>
      </div>
    </div>
  );
};

export default Login;