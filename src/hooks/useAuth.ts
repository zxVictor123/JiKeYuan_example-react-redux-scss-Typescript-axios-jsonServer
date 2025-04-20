import { LoginParams, RegisterParams } from "../api/auth/type";
import { authApi } from "../api/auth";
import { useDispatch } from "react-redux";
import { setUserInfo, setToken } from "../store/modules/userSlice";
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // 添加导航

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 获取导航函数
  const [loading, setLoading] = useState(false);

  const login = async (values: LoginParams) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      dispatch(setToken(response.token));
        dispatch(setUserInfo(response.user));
        message.success("登录成功！");
        navigate("/layout"); // 登录成功后自动跳转
    }
    catch (error: any) {
      message.error(`登录失败: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: RegisterParams) => {
    setLoading(true);
    try {
        const response = await authApi.register(values);
        dispatch(setToken(response.token));
        dispatch(setUserInfo(response.user));
        message.success("注册成功！");
        navigate("/layout"); // 注册成功后跳转
    } catch (error: any) {
      message.error(`注册失败: ${error.response.data.message}`);
      // 不抛出错误
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
  };
};

export default useAuth;