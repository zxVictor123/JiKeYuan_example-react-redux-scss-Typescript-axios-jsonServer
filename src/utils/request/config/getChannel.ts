import axios , {AxiosInstance} from "axios";


const channelRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

channelRequest.interceptors.request

