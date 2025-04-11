import axios from "axios";
// 创建axios实例并进行基础配置
const request = axios.create(
    {
        baseURL: 'http://localhost:3001',
        timeout: 5000
    }
)
// 添加请求拦截器
request.interceptors.request.use(
    (config) => { return config },
    (error) => { return Promise.reject(error) }
)
// 添加响应拦截器
request.interceptors.response.use(
    (response) => { return response },
    (error) => { return Promise.reject(error) }
)

export {request}