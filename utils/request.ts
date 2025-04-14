import axios from "axios";
import {getToken} from './token'

/**
 * @description 创建axios实例并进行基础配置
 */
const request = axios.create(
    {
        baseURL: 'http://localhost:3001',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
)

/**
 * @description 添加请求拦截器
 * @param config - axios配置对象
 * @returns 处理后的配置对象
 */
request.interceptors.request.use(
    (config) => {
        console.log('发送请求:', config.url, config.method, config.data)
        const token = getToken()
        if(token) {
            // 添加编码处理，避免非ASCII字符的问题
            config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`
        }
        return config
    },
    (error) => { 
        console.error('请求错误:', error)
        return Promise.reject(error) 
    }
)

/**
 * @description 添加响应拦截器
 * @param response - axios响应对象
 * @returns 处理后的响应对象或错误
 */
request.interceptors.response.use(
    (response) => { 
        console.log('收到响应:', response.config.url, response.status, response.data)
        // 如果响应中包含token，需要解码
        if(response.data && response.data.token) {
            response.data.token = decodeURIComponent(response.data.token)
        }
        return response 
    },
    (error) => { 
        console.error('响应错误:', error.config?.url, error.response?.status, error.response?.data)
        return Promise.reject(error) 
    }
)

export {request}