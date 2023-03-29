import React from 'react'

import { IoCartOutline, IoHeartOutline, IoHeartSharp, IoCheckmarkSharp } from "react-icons/io5";
import AppContext from "../../context";

import styles from './Card.module.scss'

function Card({id, name, price, details, imageUrl, onItemsToCart, onItemsToFavorite, favorited=false}) {
    const {isItemInCart} = React.useContext(AppContext)
    const {isItemInFavorites} = React.useContext(AppContext)
    const onAddtoCart = () => {
        onItemsToCart({id, parentdId: id, name, price, imageUrl});
    }
    const onAddtoFavorites = () => {
        onItemsToFavorite({id, parentdId: id, name, price, imageUrl});
    }
    //const items = React.useContext(AppContext)
    
    return (
        <div className={styles.card}>
            {isItemInFavorites(id) || favorited ? 
            <IoHeartSharp onClick={onAddtoFavorites} size = {24} className={styles.favorite}/>
        :<IoHeartOutline onClick={onAddtoFavorites} size = {24} className={styles.favorite}/>}
            <IoHeartOutline onClick={onAddtoFavorites} size = {24} className={styles.favorite}/>
            <img src={imageUrl} height={200} width={200} alt='item'/>
            <div>
                <b>{name}</b>
                <p>Деталей: {details}</p>
                <div className={styles.price}>
                    <h3>{price} руб.</h3>
                    <button onClick={onAddtoCart}>
                        {isItemInCart(id) ?
                        <IoCheckmarkSharp size = {24} className={styles.icon}/>
                        :<IoCartOutline size = {24} className={styles.icon}/>}</button>
                </div>
                
            </div>
        </div>
    )
}

export default Card;