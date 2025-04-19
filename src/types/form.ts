// 频道项类型
interface ChannelItem {
    name: string;
    id: number;
}
export type ChannelArray =  ChannelItem[]

// 表单收集值的类型
export interface FormValue {
    title: string;
    channel_select: number;
    content: string;
    picture_number_radio: number;
    picture_upload: {
        fileList: file[]
    }
}

// file类型
interface file {
    thumbURL: string;
}

// 后端要求表单数据格式
export interface resFormValue {
    title: string;
    content: string;
    cover: {
        type: number;
        images: string[];
    }
    channel_id: number;
}

// 图片值类型
export interface pictureValue {
    fileList: []
}

// 封面类型值类型
export interface typeValue {
    target: {
        value: number
    }
}
