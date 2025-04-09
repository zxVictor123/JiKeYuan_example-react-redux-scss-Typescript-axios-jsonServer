import Layout from "../pages/Layout";
import Register from "../pages/Register"
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />
    },
    {
        path: '/Register',
        element: <Register /> 
    }
];

/**
 * 创建路由实例
 */
const router = createBrowserRouter(routes);

export default router; 