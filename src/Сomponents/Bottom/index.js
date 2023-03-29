import React from 'react';

import styles from './Bottom.module.scss'

function Bottom() {
    return (
        <div className={styles.bottomContainer}>
            <div className={styles.bottom}>
                <b>Все права защищены ©2023</b>
                <ul>
                    <li>Оплата</li>
                    <li>Доставка</li>
                    <li>Контакты</li>
                </ul>
            </div>
        </div>
    )
}

export default Bottom;