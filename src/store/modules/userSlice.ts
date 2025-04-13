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
            }
        }
    }
)
const {setToken,setUserInfo} = userSlice.actions
export {setToken,setUserInfo}
export default userSlice.reducer 