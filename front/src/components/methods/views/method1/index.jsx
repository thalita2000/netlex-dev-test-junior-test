import { useState } from "react"
import { api } from "../../../../service/api"
import { Input } from "../../../input"
import { useSnackbar } from 'notistack'
import classes from './styles.module.css'
import { useAuth } from "../../../../hooks/use-auth"

const Method1 = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { signOut } = useAuth()

    const [searched, setSearched] = useState('')
    const [result, setResult] = useState(0)

    const handleCheck = async value => {
        try {
            setSearched(value)
    
            const { data } = await api.post('documents/word-frequency', { word: value })
    
            setResult(data.frequency)
        } catch (err) {
            if (err?.response?.data?.error === 'Unauthorized') {
                signOut()

                enqueueSnackbar('Token expirado', {
                    variant: 'error'
                })
          
                return
              }

            enqueueSnackbar(err.message, {
                variant: 'error'
            })
        }
    }

    return (
        <div>
            <h1 className="method">Método 1</h1>

            <Input onClick={handleCheck} />

            {searched && <p className={classes.result}>A palavra <strong>{searched}</strong> foi encontrada {result} vez(es)</p>}
        </div>
    ) 
}

export { Method1 }