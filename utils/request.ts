import axios from "axios";
import {getToken} from './token'

// 创建axios实例并进行基础配置
const request = axios.create(
    {
        baseURL: 'http://localhost:3001',
        timeout: 5000
    }
)
// 添加请求拦截器
request.interceptors.request.use(
    // 操作这个config,按后端要求注入token，使所有使用此实例的请求都带有token
    (config) => {
        const token = getToken()
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => { return Promise.reject(error) }
)
// 添加响应拦截器
request.interceptors.response.use(
    (response) => { return response },
    (error) => { return Promise.reject(error) }
)

export {request}