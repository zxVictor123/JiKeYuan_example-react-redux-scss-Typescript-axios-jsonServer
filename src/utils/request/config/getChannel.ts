import axios, {AxiosInstance, AxiosResponse} from "axios";

/**
 * 频道请求专用的axios实例
 */
export const channelRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

/**
 * 响应拦截器 - 提取channels数组
 */
channelRequest.interceptors.response.use(
    (response: AxiosResponse) => {
        const {data} = response;
        // 从响应中提取channels数组
        if (data && data.channels) {
            return data.channels;
        }
        // 如果没有找到channels，返回空数组
        console.warn('未找到channels数据');
        return [];
    }
);

