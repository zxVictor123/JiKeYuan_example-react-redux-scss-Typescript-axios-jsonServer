import { channelRequest } from "../utils"
import { ChannelArray } from "../types/form";

/**
 * 频道相关接口
 */
export const channelApi = {
    /**
     * 获取频道列表
     * @returns {Promise<ChannelArray>} 频道列表数据
     */
    getChannel: (): Promise<ChannelArray> => {
        return channelRequest.get('/channel').then(result => result as unknown as ChannelArray);
    }
}