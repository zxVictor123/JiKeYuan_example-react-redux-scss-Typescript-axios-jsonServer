import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <div>我是布局页</div>
            <Outlet />
        </div>        
    )
}
export default Layout