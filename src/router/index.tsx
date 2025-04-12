import Layout from "../pages/Layout";
import Register from "../pages/Register"
import Login from "../pages/Login";
import Home from "../pages/Home";
import Article from "../pages/Article";
import Publish from "../pages/Publish";

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
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'Article',
                element: <Article />
            },
            {
                path: 'Publish',
                element: <Publish />
            }
        ]
    },
    
];

/**
 * 创建路由实例
 */
const router = createBrowserRouter(routes);

export default router; 