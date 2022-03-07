import { useState } from "react"
import { api } from "../../../../service/api"
import { useSnackbar } from 'notistack'
import { Selects } from '../../../selects'
import classes from './styles.module.css'
import { useAuth } from "../../../../hooks/use-auth"

const Method3 = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { signOut } = useAuth()

    const [result, setResult] = useState([])
    const [alreadyMakeSearch, setaAlreadyMakeSearch] = useState(false)
    
    const handleCheck = async value => {
        try {
            const { data } = await api.post('documents/top-words', value)

            setaAlreadyMakeSearch(true)
            setResult(data)
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
            <h1 className="method">Método 3</h1>

            <Selects onClick={handleCheck} />

            {(alreadyMakeSearch && !result.length) && <p className={classes.result}>Nenhum resultado foi encontrado</p>}

            <ul className={classes.sentences}>
                {result.map(({ word, count }, index) => {
                    return <li key={index}>{word} - <strong>{count}</strong> ocorrências no texto.</li>
                })}
            </ul>
        </div>
    ) 
}

export { Method3 }