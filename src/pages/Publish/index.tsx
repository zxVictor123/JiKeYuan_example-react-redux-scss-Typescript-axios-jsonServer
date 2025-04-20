import { Form, Input, Select, Button, Radio, Upload } from "antd"
import './index.scss'
import Quill from "../../components/Publish/Quill"
import { useState, useEffect } from "react"
import { channelApi } from "../../api/channel/channel"
import { ChannelArray } from "../../api/channel/type"
import { pictureValue,typeValue,formValue,resFormValue } from "../../api/articles/type"


const Publish = () => {
    // 用useState管理局部状态
    const [imageList,setImageList] = useState([])
    const [typeValue,setTypeValue] = useState(0)

    // 用useForm管理初始值
    const [form] = Form.useForm()

    // 频道列表状态
    const [channels, setChannels] = useState<ChannelArray>([])
    
    // 获取频道列表
    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const res = await channelApi.getChannel()
                setChannels(res.channels)
            } catch (error) {
                console.error('获取频道失败:', error)
            }
        }
        
        fetchChannels()
    }, [])

    // 上传图片onchange回调
    const onChange = (value: pictureValue) => {
        setImageList(value.fileList)
    }

    // 改变封面类型回调
    const onTypeChange = (value: typeValue) => {
        setTypeValue(value.target.value)
    }

    // 表单提交回调
    const onFinish = (value: formValue ) => {
        const {title,content,channel_select: channel_id,picture_number_radio: type,picture_upload: {fileList}} = value
        console.log(value)
        const resFormValue: resFormValue = {
            title,
            content,
            cover: {
                type,
                images: fileList.map(file => file.thumbURL)
            },
            channel_id
        }
    }   
    return(
        <div className="publish-container">
            <Form 
            form = {form}
            className="Form-container"
            initialValues={{'picture_number_radio': 0}}
            onFinish={onFinish}>
            {/* 标题框 */}
            <Form.Item 
            label= {'标题'}
            className="title"
            name={'title'}
            required= {true}
            rules={[
                {required:true,message: '标题不能为空'}
            ]} >
                <Input placeholder="请输入标题"/>
            </Form.Item>
            {/* 频道下拉框 */}
            <Form.Item
            label= {'频道'}
            className="channel_select"
            name={'channel_select'}
            required= {true}
            rules={[{required: true,message: '频道不能为空'}]}>
                <Select
                placeholder= {'请选择文章频道'}
                options={channels.map(channel => ({
                    value: channel.id,
                    label: channel.name
                }))}/>
            </Form.Item >
            {/* 图片数量复选框 */}
            <Form.Item 
            className="picture_number_radio"
            name={'picture_number_radio'}>
                <Radio.Group onChange={onTypeChange}>
                    <Radio value={1}>单图</Radio>
                    <Radio value={3}>三图</Radio>
                    <Radio value={0}>无图</Radio>
                </Radio.Group>
            </Form.Item >
            {/* 图片上传 */}
            <Form.Item
            name={'picture_upload'}
            className="picture_card">
                {
                typeValue > 0 
                ? <Upload
                listType="picture-card"
                action={'http://localhost:3001/articles'}
                onChange={onChange}
                maxCount={typeValue}>
                    +
                </Upload> 
                : null}
            </Form.Item>
            {/* 富文本编辑器 */}
            <Form.Item
            label= {'内容'}
            className="content"
            name={'content'}
            required= {true}>
                <Quill />
            </Form.Item>
            <Form.Item className="Button">
                <Button type="primary" htmlType="submit">发布文章</Button>
            </Form.Item>
        </Form>

        </div>
    )
}

export default Publish