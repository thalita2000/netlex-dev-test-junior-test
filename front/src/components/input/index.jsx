import { useRef } from "react"
import classes from './styles.module.css'

const Input = ({ onClick }) => {
    const inputRef = useRef()

    const handleOnClick = () => {
        const value = inputRef.current.value
        onClick(value)
    }

    return (
        <div className={classes.container}>
            <label>Digite uma palavra</label>

            <input ref={inputRef} />

            <button onClick={handleOnClick}>Verificar</button>
        </div>
    )
}

export { Input }