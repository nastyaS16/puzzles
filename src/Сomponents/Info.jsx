import React from 'react'
import AppContext from '../context'

import styles from './Cart/Cart.module.scss'

const Info = ({title, description, image, onCloseCart}) => {
    const {setCartOpened} = React.useContext(AppContext)

    return (
        <div className={styles.empty}>
            <div >
                <h3>{title}</h3>
                <img src={image} width={100} height={100}/>
            </div>
                <button className={styles.button} onClick={onCloseCart}>Выбрать товары</button>
        </div>
    )
}

export default Info 