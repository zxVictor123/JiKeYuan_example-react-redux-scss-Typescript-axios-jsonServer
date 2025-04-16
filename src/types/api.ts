/**
 * 用户相关接口类型定义
 */
export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams extends LoginParams {}

export interface UserInfo {
    id: number;
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'  // 请求头
    }
    username: string;
}

export interface AuthResponse {
    token: string;
    user: UserInfo;
}
