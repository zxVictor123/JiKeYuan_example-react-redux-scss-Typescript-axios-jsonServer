import axios , {AxiosInstance,AxiosResponse} from "axios";

export const channelRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

channelRequest.interceptors.response.use(
    (response: AxiosResponse) => {
        const {data} = response
        const {channel} = data
        return channel
    } 
)

