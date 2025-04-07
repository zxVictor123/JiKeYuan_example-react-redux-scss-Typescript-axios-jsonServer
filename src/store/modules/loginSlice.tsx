import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice(
    {
        name: 'login',
        initialState: {
            username: '',
            password: '',
        },
        reducers: {
            changeUsername: (state,action) => {
                state.username = action.payload
            },
            changePassword: (state,action) => {
                state.password = action.payload
            }
        }
    }
)
const {changeUsername,changePassword} = loginSlice.actions
export {changeUsername,changePassword}
export default loginSlice.reducer 