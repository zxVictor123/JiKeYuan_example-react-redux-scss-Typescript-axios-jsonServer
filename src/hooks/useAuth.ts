import { LoginParams, RegisterParams } from "../types/api";
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
      if(response) {
        console.log('从后端获取数据成功')
        dispatch(setToken(response.token));
        dispatch(setUserInfo(response.user));
        console.log('成功dispatch数据到store中')
      }else {
        console.log('从后端获取数据失败')
      }
      
      message.success("登录成功！");
      navigate("/layout"); // 登录成功后自动跳转
    } catch (error: any) {
      message.error(`登录失败: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: RegisterParams) => {
    setLoading(true);
    try {
        const response = await authApi.register(values);
        if(response) {
          console.log('从后端获取数据成功')
          dispatch(setToken(response.token));
          dispatch(setUserInfo(response.user));
          console.log('成功dispatch数据到store中')
        }else {
          console.log('从后端获取数据失败')
        }
      message.success("注册成功！");
      navigate("/layout"); // 注册成功后跳转
    } catch (error: any) {
      message.error(`注册失败: ${error.message}`);
      throw error;
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