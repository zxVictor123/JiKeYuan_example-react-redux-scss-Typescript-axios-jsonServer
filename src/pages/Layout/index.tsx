import { FC } from 'react';
import './index.scss'
/**
 * 布局组件
 */
const Layout: FC = () => {
    return (
        <div className='layoutPage-container'>
            <h1>Layout<span className='point-1'>.</span><span className='point-2'>.</span><span className='point-3'>.</span></h1>
            <div className='box-container'>
                <div className='navigate-container'>
                </div>
            </div>
        </div>
    )
}

export default Layout;