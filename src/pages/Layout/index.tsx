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
            <h1>Layout...</h1>
            <div className='box-container'>
                <div className='navigate-container'>
                    <button onClick={() => navigate('/Login')}>登录</button>
                </div>
            </div>
        </div>
    )
}

export default Layout;