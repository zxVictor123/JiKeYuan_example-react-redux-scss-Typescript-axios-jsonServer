import axios from "axios";
import {getToken} from './token'
import { removeTokenUserInfo } from "../store/modules/userSlice";
import router from "../router";

const request = axios.create(
    {
        baseURL: 'http://localhost:3001',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
)

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 添加 token
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
        }

        // 添加请求日志
        console.log('Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers
        });

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => { 
        console.log('收到响应:', response.config.url, response.status, response.data)
        // 如果响应中包含token，需要解码
        if(response.data && response.data.token) {
            response.data.token = decodeURIComponent(response.data.token)
        }
        return response.data  // 返回 response.data 而不是整个 response
    },
    (error) => {
        console.error('响应错误:', error.config?.url, error.response?.status, error.response?.data)
        // token失效时的处理
        if(error.response.status == 401) {
            removeTokenUserInfo()
            router.navigate('/login')
        }
        return Promise.reject(error)
    }
)

export {request}