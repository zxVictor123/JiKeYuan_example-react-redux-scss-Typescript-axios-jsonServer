import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    username: string,
    id: number,
}
const userSlice = createSlice(
    {
        name: 'register',
        initialState: {
            token: '',
            userInfo: null as UserInfo | null,
        },
        reducers: {
            setToken: (state,action) => {
                state.token = action.payload
                localStorage.setItem('token_key',action.payload)
            },
            setUserInfo: (state,action) => {
                state.userInfo = action.payload
            },
            removeTokenUserInfo: (state) => {
                state.token = ''
                state.userInfo = null
                localStorage.removeItem('token_key')
            },
        }
    }
)
const {setToken,setUserInfo,removeTokenUserInfo} = userSlice.actions
export {setToken,setUserInfo,removeTokenUserInfo}
export default userSlice.reducer 