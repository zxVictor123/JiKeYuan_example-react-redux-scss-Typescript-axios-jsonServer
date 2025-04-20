import { request } from "../../utils"
import { resChannel } from "./type";

// 频道相关接口
export const channelApi = {
    
    getChannel: (): Promise<resChannel> => {
        return request.get('/channel').then(result => result as unknown as resChannel);
    }
}