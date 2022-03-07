import { useAuth } from "../../hooks/use-auth"
import { Dashboard } from "../../pages/dashboard"
import { Login } from "../../pages/login"

const Root = () => {
    const { isAuth } = useAuth()

    return isAuth ? <Dashboard /> : <Login />
}

export { Root }