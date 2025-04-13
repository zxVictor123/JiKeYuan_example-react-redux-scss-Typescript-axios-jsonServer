import { Outlet } from "react-router-dom"
import logo from '../../assets/logo.png'
import homeIcon from '../../assets/homeIcon.svg'
import articleIcon from '../../assets/articleIcon.svg'
import publishIcon from '../../assets/publishIcon.svg'
import logoutIcon from '../../assets/logout.svg'
import './index.scss'
const items = [
    {
        label: '首页',
        key: 1,
        icon: homeIcon
    },
    {
        label: '文章管理',
        key: 2,
        icon: articleIcon
    },
    {
        label: '发布文章',
        key: 3,
        icon: publishIcon
    }
]
const Layout = () => {
    
    return (
        <div className="layout-container">
            <div className="topNav-container">
                <img src={logo} alt="" className="logo"/>
                <div className="top-right-container">
                    <span className='username'>user.name</span>
                    <div className="logout-container">
                        <img src={logoutIcon} alt="" className="logout-icon"/>
                        <span className="logout-span">登出</span>
                    </div>
                </div>
            </div>
            <div className="behind-container">
                <div className="left-sidebar">
                {
                items.map(
                    (item) => 
                        <div className="item-container" key={item.key}>
                            <img className="item-icon" src={item.icon}></img>
                            <span className="item-label">{item.label}</span>
                        </div>
                )
                }
                </div>
                <Outlet />
            </div>
        </div>        
    )
}
export default Layout