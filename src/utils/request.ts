import axios, { AxiosInstance,InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from './token';
import { removeTokenUserInfo } from "../store/modules/userSlice";
import router from "../router";
import { requestQueue } from './requestQueue';




// 创建 axios 实例
export const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// 生成请求的唯一标识
// @param config - 请求配置
// @returns 请求的唯一标识
const generateRequestKey = (config: InternalAxiosRequestConfig): string => {
    // 对请求数据进行排序，确保相同数据但顺序不同时生成相同的key
    const sortedData = config.data ? 
        JSON.stringify(Object.keys(config.data).sort().reduce((obj: Record<string, any>, key) => {
            obj[key] = config.data[key];
            return obj;
        }, {})) : 
        '';
    
    return `${config.method}_${config.url}_${sortedData}`;
};

// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 生成请求的唯一标识
        const key = generateRequestKey(config);
        
        // 检查是否有重复请求
        if (requestQueue.has(key)) {
            return Promise.reject(new Error('请求已在进行中'));
        }
        
        // 将请求标记为正在进行中
        // 存储原始请求配置以便在响应拦截器中使用
        config.headers._requestKey = key;

        // 添加 token
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
        }
        
        // 将请求添加到队列中
        const promise = Promise.resolve(config);
        requestQueue.add(key, promise);
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        const {authData} = data;
        
        // 如果响应中包含 token，需要解码
        if(authData?.token) {
            authData.token = decodeURIComponent(authData.token);
            return authData;
        }
        return data;
    },
    (error) => {
        // 统一错误处理
        if (error.response?.status === 401) {
            removeTokenUserInfo();
            router.navigate('/');
        }
        console.log(error)
        return Promise.reject(error);
    }
);

export const request = instance