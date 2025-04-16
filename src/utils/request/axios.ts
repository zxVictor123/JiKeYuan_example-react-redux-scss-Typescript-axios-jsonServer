import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from '../token';
import { removeTokenUserInfo } from "../../store/modules/userSlice";
import router from "../../router";
import { requestQueue } from './requestQueue';

/**
 * 创建 axios 实例
 */
const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 生成请求的唯一标识
        const key = `${config.method}_${config.url}`;
        
        // 检查是否有重复请求
        if (requestQueue.has(key)) {
            throw new Error('请求已在进行中');
        }

        // 添加 token
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        
        // 如果响应中包含 token，需要解码
        if (data?.token) {
            data.token = decodeURIComponent(data.token);
        }
        
        return data;
    },
    (error) => {
        // 统一错误处理
        if (error.response?.status === 401) {
            removeTokenUserInfo();
            router.navigate('/login');
        }
        return Promise.reject(error);
    }
);

export const request = instance; 