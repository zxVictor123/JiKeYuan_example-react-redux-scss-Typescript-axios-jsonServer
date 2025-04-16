import Layout from "../pages/Layout";
import Register from "../pages/Register"
import Login from "../pages/Login";
import Home from "../pages/Home";
import Article from "../pages/Article";
import Publish from "../pages/Publish";
import AuthRouteGuard from "../components/AuthRouteGuard";

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
        element: <AuthRouteGuard><Layout /></AuthRouteGuard>,
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

const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true
    }
});

export default router; 