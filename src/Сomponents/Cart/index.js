import React from 'react'
import axios from 'axios'

import AppContext from '../../context';
import Info from '../Info'

import { IoCloseOutline, IoTrashOutline } from "react-icons/io5";
//import { useCart } from '../../hooks/useCart'
import styles from './Cart.module.scss'
import { useCart } from '../../hooks/useCart'


const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

function Cart ({items=[], onCloseCart, opened, removeItem}) {
    const {cartItems, setCartItems} =  React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(null)
    const [isOrdered, setIsOrdered] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false);

    console.log(cartItems)

    const onOrder = async () => {
        try {
            setIsLoading(true);
          const { data } = await axios.post('https://641dc760945125fff3d5f129.mockapi.io/orders', {
            items: cartItems,
          });
          setOrderId(data.id);
          setIsOrdered(true);
          setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://641beca01f5d999a446cd875.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
            console.log(error)
        }
        setIsLoading(false);
        };

    

    //const {cartItems, setCartItems, totalPrice} = useCart();
    const totalPrice = items.reduce((sum, obj) => obj.price + sum, 0)
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
                <div className={styles.cart}>
                    <div className={styles.title}>
                        <h1>Корзина</h1>
                        <button><IoCloseOutline size={24} onClick={onCloseCart}/></button>
                    </div>
                    {items.length>0 ? (
                        <div className={styles.fullCart}>
                            <div className={styles.items}>
                            {items.map((item) => (
                                
                                <div className={styles.item}>
                                    <img width={60} height={60} src={item.imageUrl} alt='Товар' />
                                    <div>
                                        <p>{item.name}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <button onClick={() => removeItem(item.id)}><IoTrashOutline /></button>
                                </div>
                        
                    ))}</div>
                        <div>
                            <div className={styles.total}>
                                <span>Итого:</span>
                                <b>{totalPrice} руб.</b>
                            </div> 
                            <div>
                                <button onClick={onOrder} className={styles.button}>Оформить заказ</button>
                            </div>
                        </div>
                        </div>
                    ): <Info 
                            title={isOrdered ? 'Заказ оформлен' : 'Корзина пустая'} 
                            description={isOrdered ? `Заказ #${orderId} скоро будет передан курьеру`: 'Добавьте товары, чтобы оформить заказ'} 
                            image={isOrdered ? 'https://nastyas16.github.io/puzzles/img/empy-box.png':'https://nastyas16.github.io/puzzles/img/empy-box.png'}
                            onCloseCart={onCloseCart}/>
                    }</div>
                    
                    
        </div>
    )
}

export default Cart;