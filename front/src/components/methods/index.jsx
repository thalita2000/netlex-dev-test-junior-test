import classes from './styles.module.css'
import { useState } from 'react'

import { views } from './views'
import { navs } from './navs'

const Methods = () => {
    const [currentView, setCurrentView] = useState(0)
    const View = views[currentView]

    return (
        <div className={classes.container}>
            <aside>
                <ul>
                    {navs.map(({ label }, index) => (
                        <li
                            className={index === currentView ? classes.selected : ''}
                            onClick={() => setCurrentView(index)}
                            key={label}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </aside>

            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <View />
                </div>
            </div>
        </div>
    )
}

export { Methods }