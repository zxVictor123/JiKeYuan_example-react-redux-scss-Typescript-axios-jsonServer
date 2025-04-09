import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss'
/**
 * 布局组件
 */
const Layout: FC = () => {
    const navigate = useNavigate()
    return (
        <div className='layoutPage-container'>
            <h1>Layout<span className='point-1'>.</span><span className='point-2'>.</span><span className='point-3'>.</span></h1>
            <div className='box-container'>
                <div className='navigate-container'>
                    <button onClick={() => navigate('/register')}>注册</button>
                </div>
            </div>
        </div>
    )
}

export default Layout;