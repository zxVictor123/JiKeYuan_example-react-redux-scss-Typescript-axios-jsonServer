import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useState, useRef } from "react";
import debounce from "../../utils/debounce";
import { message } from "antd";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      message.error("请输入用户名和密码");
      return;
    }

    // 直接调用login，不需要try/catch，useAuth内部已处理所有错误情况
    login({ username, password });
  };

  const handleChangeUsername = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    changeUsername(e.target.value);
  }, 300);

  const handleChangePassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
  }, 300);

  return (
    <div className="loginPage-container">
      <h1>
        <span className="text-1">L</span>
        <span className="text-2">O</span>
        <span className="text-3">G</span>
        <span className="text-4">I</span>
        <span className="text-5">N</span>
      </h1>
      <div className="form-container">
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? "加载中..." : "登录"}
          </button>
          <a onClick={() => navigate("/Register")}>还没有账号？点击注册</a>
        </form>
      </div>
    </div>
  );
};

export default Login;