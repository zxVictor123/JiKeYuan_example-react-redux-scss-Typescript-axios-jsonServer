import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './modules/loginSlice'

const store = configureStore(
    {
        reducer:{
            login: loginReducer
        }
    }
)
export default store