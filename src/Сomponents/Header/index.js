import React from 'react';
import {Link} from 'react-router-dom'
import { IoCartOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";

import styles from './Header.module.scss'
import logo from '../../img/logo.jpg'

function Header({onClickCart}) {
    return (
        <header>
            <div className={styles.content}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src={logo} height={40} width ={40}/>
                    <div>
                        <h3>Пазл.рф</h3>
                        <p>Деревянные пазлы ручной работы</p>
                    </div>
                </div>
                </Link>
                <ul>
                    <li onClick={onClickCart}>
                        <IoCartOutline className={styles.icon}/>
                        <span>Корзина</span>  
                    </li>
                    <Link to='/favorites'>
                        <li>
                            <IoHeartOutline className={styles.icon}/>
                            Избранное
                        </li>
                    </Link>
                    <Link to='/profile'>
                        <li className={styles.liLast}>
                            <IoPersonOutline className={styles.icon}/>
                            Профиль
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header;