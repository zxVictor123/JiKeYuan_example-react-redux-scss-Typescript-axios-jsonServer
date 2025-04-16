import { request, requestQueue } from '../utils/request';
import type { LoginParams, RegisterParams, AuthResponse } from '../types/api';

/**
 * 认证相关 API
 */
export const authApi = {
    /**
     * 用户登录
     * @param data 登录参数
     */
    login: (data: LoginParams) => {
        const key = `login_${data.username}`;
        const promise = request.post<AuthResponse>('/login', data);
        return requestQueue.add(key, promise);
    },

    /**
     * 用户注册
     * @param data 注册参数
     */
    register: (data: RegisterParams) => {
        const key = `register_${data.username}`;
        const promise = request.post<AuthResponse>('/register', data);
        return requestQueue.add(key, promise);
    }
}; 