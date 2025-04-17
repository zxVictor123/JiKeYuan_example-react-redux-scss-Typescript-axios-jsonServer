import { channelRequest } from "../utils"

/**
 * 频道相关接口
 */
export const channelApi = {
    /**
     * 获取频道列表
     * @returns {Promise<string[]>} 频道列表数据
     */
    getChannel: () : Promise<string[]> => {
        return channelRequest.get('/channel').then(result => result as unknown as string[]);
    }
}