import { useState } from "react"
import { api } from "../../../../service/api"
import { Input } from "../../../input"
import { useSnackbar } from 'notistack'
import classes from './styles.module.css'
import { useAuth } from "../../../../hooks/use-auth"

const Method2 = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { signOut } = useAuth()

    const [searched, setSearched] = useState('')
    const [result, setResult] = useState([])

    const handleCheck = async value => {
        try {
            setSearched(value)
    
            const { data } = await api.post('documents/word-sentences', { word: value })
    
            setResult(data.sentence || [])
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
            <h1 className="method">Método 2</h1>

            <Input onClick={handleCheck} />

            {searched && <p className={classes.result}>A palavra <strong>{searched}</strong> foi encontrada em {result.length} frase(s) no texto</p>}

            <ul className={classes.sentences}>
                {result.map((sentence, index) => {
                    const regex = new RegExp(`(${searched})`, 'i')
                    const text = sentence.replace(regex, '<strong>$1</strong>')

                    return <li key={index}>{index + 1}. <span dangerouslySetInnerHTML={{ __html: text }}/></li>
                })}
            </ul>
        </div>
    ) 
}

export { Method2 }