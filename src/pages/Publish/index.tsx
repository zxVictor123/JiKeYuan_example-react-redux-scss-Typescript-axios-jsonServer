import { Form, Input, Select, Button, Radio } from "antd"
import './index.scss'
import Quill from "../../components/Publish/Quill"
import { useState, useEffect } from "react"
import { channelApi } from "../../api/channel"



const Publish = () => {
    // 用useForm管理初始值
    const [form] = Form.useForm()
    // 频道列表状态
    const [channels, setChannels] = useState<string[]>([])
    
    // 获取频道列表
    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const res = await channelApi.getChannel()
                setChannels(res.data || [])
            } catch (error) {
                console.error('获取频道失败:', error)
            }
        }
        
        fetchChannels()
    }, [])

    return(
        <div className="publish-container">
            <Form 
            form = {form}
            className="Form-container"
            initialValues={{'picture-number-radio': 'option3'}}>
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
            className="channel-select"
            name={'channel-select'}
            required= {true}
            rules={[{required: true,message: '频道不能为空'}]}>
                <Select
                placeholder= {'请选择文章频道'}
                options={channels.map(channel => ({
                    value: channel,
                    label: channel
                }))}/>
            </Form.Item >
            {/* 图片数量复选框 */}
            <Form.Item 
            className="picture-number-radio"
            name={'picture-number-radio'}>
                <Radio.Group>
                    <Radio value={"option1"}>单图</Radio>
                    <Radio value={"option2"}>三图</Radio>
                    <Radio value={"option3"}>无图</Radio>
                </Radio.Group>
            </Form.Item >
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