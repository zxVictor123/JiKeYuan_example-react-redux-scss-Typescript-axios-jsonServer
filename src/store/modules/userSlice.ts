import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: 'register',
        initialState: {
            token: '',
        },
        reducers: {
            setToken: (state,action) => {
                state.token = action.payload
                localStorage.setItem('token_key',action.payload)
            }
        }
    }
)
const {setToken} = userSlice.actions
export {setToken}
export default userSlice.reducer 