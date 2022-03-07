import { useAuth } from '../../hooks/use-auth'
import { useSnackbar } from 'notistack'

import classes from './styles.module.css'

const Login = () => {
    const { signIn } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        if (!email || !password) {
            enqueueSnackbar('Preencha corretamente os campos antes de fazer login', { variant: 'error' })

            return
        }

        signIn({ email, password })
    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <div className={classes.wrapper}>
                    <div className={classes.box}>
                        <label>E-mail</label>
                        <input type="text" />
                    </div>

                    <div className={classes.box}>
                        <label>Senha</label>
                        <input type="password" />
                    </div>

                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    )
}

export { Login }
