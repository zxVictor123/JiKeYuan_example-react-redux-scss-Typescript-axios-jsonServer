import { LoginParams, RegisterParams, AuthResponse, AuthErrorResponse } from "../types/api";
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
      
      // 判断响应是否包含token和user，以确定是否为成功响应
      if ('token' in response && 'user' in response) {
        // 成功响应
        console.log('从后端获取数据成功');
        dispatch(setToken(response.token));
        dispatch(setUserInfo(response.user));
        console.log('成功dispatch数据到store中');
        message.success("登录成功！");
        navigate("/layout"); // 登录成功后自动跳转
      } else {
        // 错误响应
        const errorResp = response;
        message.error(`登录失败: ${errorResp.message}`);
        setLoading(false); // 确保在这里也重置loading状态
        return; // 提前返回，不执行后续代码
      }
    }
    catch (error: any) {
      message.error(`登录失败: ${error.message}`);
      // 不抛出错误，让函数正常结束
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
          message.success("注册成功！");
          navigate("/layout"); // 注册成功后跳转
        }else {
          console.log('从后端获取数据失败')
          message.error("注册失败！");
          return; // 提前返回
        }
    } catch (error: any) {
      message.error(`注册失败: ${error.message}`);
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