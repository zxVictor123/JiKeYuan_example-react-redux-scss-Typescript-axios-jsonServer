import { Outlet } from "react-router-dom"
import logo from '../../assets/logo.png'
import homeIcon from '../../assets/homeIcon.svg'
import articleIcon from '../../assets/articleIcon.svg'
import publishIcon from '../../assets/publishIcon.svg'
import logoutIcon from '../../assets/logout.svg'
import './index.scss'
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { rootState } from "../../store"
const items = [
    {
        label: '首页',
        key: 1,
        icon: homeIcon,
        path: '',
    },
    {
        label: '文章管理',
        key: 2,
        icon: articleIcon,
        path: 'article',
    },
    {
        label: '发布文章',
        key: 3,
        icon: publishIcon,
        path: 'publish',
    }
]
const Layout = () => {
    // 获取一些函数
    const navigate = useNavigate()

    // 获取store中的数据
    const username = useSelector((state: rootState) => state.user.userInfo?.username)

    return (
        <div className="layout-container">
            {/* 顶部导航栏 */}
            <div className="topNav-container">
                <img src={logo} alt="" className="logo"/>
                <div className="top-right-container">
                    <span className='username'>{username}</span>
                    <div className="logout-container">
                        <img src={logoutIcon} alt="" className="logout-icon"/>
                        <span className="logout-span">登出</span>
                    </div>
                </div>
            </div>
            {/* 底下区域 */}
            <div className="behind-container">
                {/* 左侧边栏 */}
                <div className="left-sidebar">
                    {/* 渲染列表项 */}
                {
                items.map(
                    (item) => 
                        <div className="item-container" key={item.key} onClick={() => navigate(item.path)}>
                            <img className="item-icon" src={item.icon}></img>
                            <span className="item-label">{item.label}</span>
                        </div>
                )
                }
                </div>
                {/* 二级路由区 */}
                <Outlet />
            </div>
        </div>        
    )
}
export default Layout