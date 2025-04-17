import { ReactNode,FC } from "react"
import { Navigate,useLocation } from "react-router-dom"
import { getToken } from "../utils/token"

interface AuthRouteProps {
  children: ReactNode
  redirectTo?: string
}

const AuthRoute: FC<AuthRouteProps> = ({
  children,
  redirectTo = '/'
}) => {
  const location = useLocation()
  const token = getToken()
  if(!token) {
    return (
      <Navigate to={redirectTo} state={{from: location}} replace/>
    )
  }
  return <>{children}</>
}
export default AuthRoute
