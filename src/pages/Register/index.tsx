import { FC } from 'react';
import logo from '../../assets/logo.png'
import './index.scss'
import { useDispatch,useSelector } from 'react-redux';
import { changeUsername,changePassword,trueCheck} from '../../store/modules/registerSlice';
import { rootState } from '../../store';

const Login: FC = () => {
    // 解构hooks
    const dispatch = useDispatch()
    // 获取store中的数据
    const {username,password,isCheck} = useSelector((state: rootState) => state.register)
    // 封装一个防抖函数
    const debounce = <T extends unknown[]>(fn: (...args: T) => void , t: number) => {
        let timer: number | null = null;
        return (...args: T) => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(
                () => {
                    fn(...args)
                },t
            )
        }
    }
    // 创建与事件绑定的handle函数
    const handleChangeUsername = debounce((value: string) => dispatch(changeUsername(value)),200)
    const handleChangePassword = debounce((value: string) => dispatch(changePassword(value)),200)
    const handleTrueCheck = () => dispatch(trueCheck())
    // 规定用户名和密码字符串正则
    const usernameRegex = /^[\s\S]{1,16}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,16}$/
    // 定义判定是否提示正则规定的三元表达式
    const isusernameRagex = usernameRegex.test(username) ? 'hidden' : 'visible'
    const ispasswordRagex = passwordRegex.test(password) ? 'hidden' : 'visible'
    return (
        <div className='LoginPage-container'>
                <div className='form-container'>
                    <img src={logo}></img>
                    <form>
                        <input type='username' placeholder='请输入账号' onChange={(event) => handleChangeUsername(event?.target.value)} onClick={handleTrueCheck}></input>
                        {
                            isCheck ? <span className={isusernameRagex}>必须由1 到 16位的字符组成</span> : null
                        }
                        <input type='password' placeholder='请输入密码' onChange={(event) => handleChangePassword(event?.target.value)} onClick={handleTrueCheck}></input>
                        {
                            isCheck ? <span className={ispasswordRagex}>必须包含大小写字母和数字，且只能由 8 到 16 位的字母，数字，和下划线组成</span> : null
                        }
                        <button>注册</button>
                    </form>
                </div>
        </div>
    )
}

export default Login;