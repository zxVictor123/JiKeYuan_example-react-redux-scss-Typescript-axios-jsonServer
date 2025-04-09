import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice(
    {
        name: 'register',
        initialState: {
            username: '',
            password: '',
            isCheck: false,
        },
        reducers: {
            changeUsername: (state,action) => {
                state.username = action.payload
            },
            changePassword: (state,action) => {
                state.password = action.payload
            },
            trueCheck: (state) => {
                state.isCheck = true
            },
        }
    }
)
const {changeUsername,changePassword,trueCheck} = registerSlice.actions
export {changeUsername,changePassword,trueCheck}
export default registerSlice.reducer 