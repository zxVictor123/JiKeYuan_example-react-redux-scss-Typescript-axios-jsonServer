// axios 配置文件
export const axiosConfig = {
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

// 请求队列管理
export class RequestQueue {
    private queue: Map<string, Promise<any>> = new Map();

    // 添加请求到队列
    add(key: string, promise: Promise<any>) {
        this.queue.set(key, promise);
        return promise.finally(() => this.queue.delete(key));
    }

    // 取消请求
    cancel(key: string) {
        const request = this.queue.get(key);
        if (request) {
            this.queue.delete(key);
        }
    }

    // 清空所有请求
    clear() {
        this.queue.clear();
    }
}