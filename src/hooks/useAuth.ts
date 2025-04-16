import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { authApi } from '../api/auth';
import { setToken, setUserInfo } from '../store/modules/userSlice';
import type { LoginParams, RegisterParams } from '../types/api';

/**
 * 认证相关的 Hook
 * @returns 认证相关的状态和方法
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    /**
     * 登录
     * @param values 登录参数
     */
    const login = async (values: LoginParams) => {
        setLoading(true);
        try {
            const response = await authApi.login(values);
            
            // 存储 token 和用户信息
            dispatch(setToken(response.token));
            dispatch(setUserInfo(response.user));
            
            message.success('登录成功');
            return response;
        } catch (error: any) {
            // 处理重复请求的情况
            if (error.message === '请求已在进行中') {
                message.info('登录请求正在处理中...');
            } else {
                message.error('登录失败：' + error.message);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    /**
     * 注册
     * @param values 注册参数
     */
    const register = async (values: RegisterParams) => {
        setLoading(true);
        try {
            const response = await authApi.register(values);
            message.success('注册成功');
            return response;
        } catch (error: any) {
            if (error.message === '请求已在进行中') {
                message.info('注册请求正在处理中...');
            } else {
                message.error('注册失败：' + error.message);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        login,
        register
    };
}; 