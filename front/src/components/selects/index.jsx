import { useRef } from "react"
import classes from './styles.module.css'

const Selects = ({ onClick }) => {
    const inputCountRef = useRef()
    const inputMinimumRef = useRef()

    const handleOnClick = () => {
        const count = Number(inputCountRef.current.value)
        const minWordLength = Number(inputMinimumRef.current.value)

        onClick({ count, minWordLength })
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                    <div className={classes.box}>
                        <label>Count</label>
                        <input ref={inputCountRef} type="number" />
                    </div>

                    <div className={classes.box}>
                        <label>Minimum Word Length</label>
                        <input ref={inputMinimumRef} type="number" />
                    </div>
                </div>

            <button onClick={handleOnClick}>Verificar</button>
        </div>
    )
}

export { Selects }