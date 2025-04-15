import { request } from '../utils/axiosInstance';
import type { LoginParams, RegisterParams, AuthResponse } from '../types/api';

// 认证相关 API
export const authAPI = {
    // 用户登录
    login: (data: LoginParams) => 
        request.post<AuthResponse>('/login', data),

    // 用户注册
    register: (data: RegisterParams) => 
        request.post<AuthResponse>('/register', data)
}; 