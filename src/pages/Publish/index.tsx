import { Form,Input,Select,Button,Radio } from "antd"
import { useState } from "react"
import Quill from "../../component/Publish/Quill"
import './index.scss'






const Publish = () => {
    // 用useState管理局部状态
    const [value,setValue] = useState('option3')
    return(
        <div className="publish-container">
            <Form className="Form-container">
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
                options={[
                    {value: 'React',label: 'React'},
                    {value: 'Vue',label: 'Vue'},
                    {value: 'Javascript',label: 'Javascript'},
                    {value: 'Css',label: 'Css'},
                    {value: 'Tailwind css',label: 'Tailwind css'},
                    {value: 'Next.js',label: 'Next.js'}
                ]}/>
            </Form.Item >
            {/* 图片数量复选框 */}
            <Form.Item 
            className="picture-number-radio"
            name={'picture-number-radio'}>
                <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
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
            <Form.Item>
                <Button type="primary" htmlType="submit">发布文章</Button>
            </Form.Item>
        </Form>

        </div>
    )
}

export default Publish