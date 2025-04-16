/**
 * 请求队列管理类
 * @description 用于管理并发请求，防止重复请求
 */
class RequestQueue {
    private queue: Map<string, Promise<any>> = new Map();

    /**
     * 添加请求到队列
     * @param key 请求的唯一标识
     * @param promise 请求的 Promise
     * @returns Promise
     */
    add(key: string, promise: Promise<any>) {
        if (this.queue.has(key)) {
            return Promise.reject(new Error('请求已在进行中'));
        }
        
        this.queue.set(key, promise);
        return promise.finally(() => this.queue.delete(key));
    }

    /**
     * 检查请求是否在队列中
     * @param key 请求的唯一标识
     * @returns boolean
     */
    has(key: string) {
        return this.queue.has(key);
    }

    /**
     * 从队列中移除请求
     * @param key 请求的唯一标识
     */
    cancel(key: string) {
        this.queue.delete(key);
    }

    /**
     * 清空请求队列
     */
    clear() {
        this.queue.clear();
    }
}

// 导出单例
export const requestQueue = new RequestQueue(); 