import { LoginParams, RegisterParams, AuthResponse } from "../types/api"
import { requestQueue } from "../utils"
import { request } from "../utils"

export const authApi = {
    login: (data: LoginParams): Promise<AuthResponse> | undefined => {
        // 唯一标识
        const key = `login_${data.username}`
        // 先检查队列中有没有相同请求，如果有，直接return并报错
        if(requestQueue.has(key)){
            console.log('该登录请求已经在队列中')
            return
        }else {
            // 如果没有，加入请求队列中
            const promise = request.post<LoginParams,AuthResponse>('/login',data)
            requestQueue.add(key,promise)
            console.log('已成功将该登录请求加入队列')
            promise.finally(() => requestQueue.cancel(key))
            // 返回请求
            return promise
        }
    },
    register: (data: RegisterParams): Promise<AuthResponse> | undefined => {
        // 唯一标识
        const key = `register_${data.username}`
        // 先检查队列中有没有相同请求，如果有，直接return并报错
        if(requestQueue.has(key)){
            console.log('该注册请求已经在队列中')
            return
        }else {
            // 如果没有，加入请求队列中
            const promise = request.post<LoginParams,AuthResponse>('/register',data)
            requestQueue.add(key,promise)
            console.log('已成功将该注册请求加入队列')
            // 不管最终有没有成功，最后都从队列中删除这个请求
            promise.finally(() => requestQueue.cancel(key))
            // 返回请求
            return promise
        }
    }
}