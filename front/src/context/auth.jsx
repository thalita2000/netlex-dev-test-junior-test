import { createContext, useCallback, useEffect, useState } from "react";
import { useSnackbar } from 'notistack'

import { api } from "../service/api";

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    const signIn = useCallback(async ({ email, password }) => {
        try {
            const { data } = await api.post('users/login', { email, password })

            api.defaults.headers.Authorization = data.token

            localStorage.setItem('@user', JSON.stringify(data))

            setUser(data)
            setIsAuth(!!data)
        } catch (err) {
            const error = err?.response?.data?.error || 'Erro ao tentar fazer login'

            enqueueSnackbar(error, {
                variant: 'error'
            })
        }
    }, [])

    const signOut = () => {
        setUser(null)
        setIsAuth(false)

        localStorage.setItem('@user', '{}')
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('@user'))

        if (!!user && !!user.token) {
            api.defaults.headers.Authorization = user.token
            setUser(user)
            setIsAuth(!!user)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, isAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }