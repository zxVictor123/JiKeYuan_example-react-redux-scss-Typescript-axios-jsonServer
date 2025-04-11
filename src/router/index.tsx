import Layout from "../pages/Layout";
import Register from "../pages/Register"
import Login from "../pages/Login";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/Register',
        element: <Register /> 
    },
    {
        path: '/Layout',
        element: <Layout />
    },
    
];

/**
 * 创建路由实例
 */
const router = createBrowserRouter(routes);

export default router; 