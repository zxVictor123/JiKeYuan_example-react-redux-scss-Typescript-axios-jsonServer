import { LoginParams, RegisterParams, AuthResponse,AuthErrorResponse } from "../types/api"
import { request } from "../utils"

/**
 * 认证相关API接口
 */
export const authApi = {
    /**
     * 用户登录
     * @param data 登录参数
     * @returns 认证响应Promise
     */
    login: (data: LoginParams): Promise<AuthResponse | AuthErrorResponse> => {
        return request.post<LoginParams, AuthResponse | AuthErrorResponse>('/login', data)
    },

    /**
     * 用户注册
     * @param data 注册参数
     * @returns 认证响应Promise
     */
    register: (data: RegisterParams): Promise<AuthResponse> => {
        return request.post<RegisterParams, AuthResponse>('/register', data)
    }
}