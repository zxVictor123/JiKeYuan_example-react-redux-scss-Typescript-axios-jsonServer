// 封装token的存取删逻辑
const TOKENKEY = 'token_key'

const setToken = (token: string) => {
    return window.localStorage.setItem(TOKENKEY,token)
} 
const getToken = () => {
    return window.localStorage.getItem(TOKENKEY)
} 
const removeToken = () => {
    return window.localStorage.removeItem(TOKENKEY)
} 
export {
    setToken,getToken,removeToken
}