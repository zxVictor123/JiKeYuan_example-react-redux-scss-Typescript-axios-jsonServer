import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './modules/registerSlice'

const store = configureStore(
    {
        reducer:{
            register: registerReducer
        }
    }
)
// 自动获取state的类型并暴露
export type rootState = ReturnType<typeof store.getState>
export default store