import { configureStore } from "@reduxjs/toolkit";
import userReducer from './modules/userSlice'

const store = configureStore(
    {
        reducer:{
            user: userReducer
        }
    }
)
// 自动获取state的类型并暴露
export type rootState = ReturnType<typeof store.getState>
export default store