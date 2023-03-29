import React from 'react'
import axios from 'axios'

import AppContext from '../context';

import Card from '../Сomponents/Card';

function Profile({items, onItemsToCart, onItemsToFavorite}) {
    const {isItemInCart} = React.useContext(AppContext)
    const {isItemInFavorites} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        const start = async () => {
          try {
            const {data} = await axios.get('https://641dc760945125fff3d5f129.mockapi.io/orders');
            console.log(data)
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            //setIsLoading(false);
          } catch (error) {
            alert('Ошибка при запросе заказов');
            console.error(error);
          }
        }
        start();
      }, []);
    return(
        <div className='content'>
          <h1>Заказы</h1>
          <div className='items'>
            {orders.map((el) => (
              <div className='card'>
              
              <img src={el.imageUrl} height={200} width={200} alt='item'/>
              <div>
                  <b>{el.name}</b>
                  <p>Деталей: {el.details}</p>
                  <div className='price'>
                      <h3>{el.price} руб.</h3>
                      
                  </div>
                  
              </div>
          </div>
            ))
            }
          </div>
        </div>
    )
}

export default Profile