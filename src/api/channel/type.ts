// 频道项及数组类型
interface ChannelItem {
  name: string;
  id: number;
}
export type ChannelArray =  ChannelItem[]

// 响应频道数据
export interface resChannel {
  code: 200;
  channels: ChannelArray
} 