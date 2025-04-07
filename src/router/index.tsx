import Layout from "../pages/Layout";
import Login from "../pages/Login"
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />
    },
    {
        path: '/Login',
        element: <Login /> 
    }
];

/**
 * 创建路由实例
 */
const router = createBrowserRouter(routes);

export default router; 