import { Outlet } from "react-router-dom"
import logo from '../../assets/logo.png'
import homeIcon from '../../assets/homeIcon.svg'
import articleIcon from '../../assets/articleIcon.svg'
import publishIcon from '../../assets/publishIcon.svg'
import logoutIcon from '../../assets/logout.svg'
import './index.scss'
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { rootState } from "../../store"
import { useState } from "react"
import Modal from "antd/es/modal/Modal"
import { removeTokenUserInfo } from "../../store/modules/userSlice"

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
    const dispatch = useDispatch()

    // 获取store中的数据
    const username = useSelector((state: rootState) => state.user.userInfo?.username)

    // 使用useState管理局部状态
    const [isModalVisible,switchIsModalVisible] = useState(false)

    // 负责模态框的取消和确定
    const handleCancel = () => {
        switchIsModalVisible(false)
    }
    const handleOk = () => {
        navigate('/')
        dispatch(removeTokenUserInfo())
    }
    return (
        <div className="layout-container">
            <Modal
        title="提示"
        open={isModalVisible}
        okText= '确定'
        cancelText= '取消'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定要退出登录吗</p>
      </Modal>
            {/* 顶部导航栏 */}
            <div className="topNav-container">
                <img src={logo} alt="" className="logo"/>
                <div className="top-right-container">
                    <span className='username' >{username}</span>
                    <div className="logout-container">
                        <img src={logoutIcon} alt="" className="logout-icon"/>
                        {/* 点击退出显示模态框 */}
                        <span className="logout-span" onClick={() => switchIsModalVisible(true)}>登出</span>
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