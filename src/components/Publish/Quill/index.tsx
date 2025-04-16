import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';

interface QuillProps {
  value?: string;
  onChange?: (content: string) => void;
}

const Quill: React.FC<QuillProps> = ({ value, onChange }) => {
  // 工具栏配置
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // 加粗，斜体，下划线
      ['blockquote', 'code-block'],    // 引用，代码块
      [{ 'header': 1 }, { 'header': 2 }], // 标题
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // 有序列表和无序列表
      [{ 'align': [] }],  // 对齐方式
      ['link', 'image']   // 链接，图片
    ]
  };

  return (
    <ReactQuill 
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="请输入内容..."
    />
  );
};

export default Quill;