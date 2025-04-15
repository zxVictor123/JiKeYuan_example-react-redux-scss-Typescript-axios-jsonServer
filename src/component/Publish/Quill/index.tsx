import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import './index.scss'
const Quill: React.FC = () => {
    // 管理一些局部状态
    const [value,setValue] = useState('')

    const modules = {
        toolbar: [
            [{header: [1,2, false]}],
            ['bold','italic','underline'],
        ],
    }

    const formats  = ['header','bold','italic','underline']
    return(
        <div>
            <ReactQuill
            className="Quill"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            placeholder="请输入内容"/>
            
        </div>
    )
}
export default Quill