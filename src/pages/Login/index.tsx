import { FC } from 'react';
import logo from '../../assets/logo.png'
import './index.scss'
import { useDispatch } from 'react-redux';
import { changeUsername,changePassword } from '../../store/modules/loginSlice';

const Login: FC = () => {
    const dispatch = useDispatch()
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
    const handleChangeUsername = debounce((value: string) => dispatch(changeUsername(value)),300)
    const handleChangePassword = debounce((value: string) => dispatch(changePassword(value)),300)
    return (
        <div className='LoginPage-container'>
                <div className='form-container'>
                    <img src={logo}></img>
                    <form>
                        <input type='username' placeholder='请输入账号' onChange={(event) => handleChangeUsername(event?.target.value)}></input>
                        <input type='password' placeholder='请输入密码' onChange={(event) => handleChangePassword(event?.target.value)}></input>
                        <button>登录</button>
                    </form>
                </div>
        </div>
    )
}

export default Login;