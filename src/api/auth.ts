import { LoginParams, RegisterParams, AuthResponse } from "../types/api"
import { requestQueue } from "../utils"
import { request } from "../utils"

export const authApi = {
    login: (data: LoginParams): Promise<AuthResponse> => {
        // 唯一标识
        const key = `login_${data.username}`
        // 先检查队列中有没有相同请求，如果有，直接抛出错误
        if(requestQueue.has(key)){
            throw new Error('该登录请求已经在队列中')
        }
        // 如果没有，加入请求队列中，并且执行完毕不管成败都从请求队列里删除这个请求
        const promise = request.post<LoginParams,AuthResponse>('/login',data)
        requestQueue.add(key,promise)
        promise.finally(() => requestQueue.cancel(key))
        // 返回请求
        return promise
    },

    register: (data: RegisterParams): Promise<AuthResponse> => {
        // 唯一标识
        const key = `register_${data.username}`
        // 先检查队列中有没有相同请求，如果有，直接抛出错误
        if(requestQueue.has(key)){
            throw new Error('该注册请求已经在队列中')
        }
        // 如果没有，加入请求队列中，并且执行完毕不管成败都从请求队列里删除这个请求
        const promise = request.post<RegisterParams,AuthResponse>('/register',data)
        requestQueue.add(key,promise)
        promise.finally(() => requestQueue.cancel(key))
        // 返回请求
        return promise
    }
}