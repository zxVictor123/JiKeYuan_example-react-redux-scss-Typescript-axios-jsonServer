import { request } from "../utils"

/**
 * 频道相关接口
 */
export const channelApi = {
    /**
     * 获取频道列表
     * @returns {Promise<string[]>} 频道列表数据
     */
    getChannel: () => {
        return request.get('/channel')
    }
}