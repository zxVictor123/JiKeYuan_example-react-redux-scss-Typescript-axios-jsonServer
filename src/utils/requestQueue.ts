// 请求队列管理
// 用于防止重复请求和请求去重
interface RequestQueue {
    // 添加请求到队列
    // @param key - 请求的唯一标识
    // @param promise - 请求的Promise对象
    // @returns 请求的Promise对象
    add: (key: string, promise: Promise<any>) => Promise<any>;
    
    // 检查队列中是否存在指定key的请求
    // @param key - 请求的唯一标识
    // @returns 是否存在
    has: (key: string) => boolean;
    
    // 清空队列
    clear: () => void;
    
    // 获取队列中的请求数量
    // @returns 请求数量
    size: () => number;
}

// 创建请求队列管理器
// @returns 请求队列管理器实例
const createRequestQueue = (): RequestQueue => {
    const queue = new Map<string, Promise<any>>();

    const add = (key: string, promise: Promise<any>) => {
        if (queue.has(key)) {
            return Promise.reject(new Error('请求已在进行中'));
        }
        
        queue.set(key, promise);
        return promise.finally(() => queue.delete(key));
    };

    const has = (key: string) => queue.has(key);

    const clear = () => queue.clear();
    
    const size = () => queue.size;

    return {
        add,
        has,
        clear,
        size
    };
};

// 导出单例
export const requestQueue = createRequestQueue(); 