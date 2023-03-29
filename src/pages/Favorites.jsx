import React from 'react'

import Card from '../Сomponents/Card';

function Favorites({items, onItemsToCart, onItemsToFavorite}) {
    return(
        <div className='content'>
          <h1>Избранное</h1>
          <div className='items'>
            {items.map((el) => (
              <Card 
                key={el.id} 
                onItemsToCart={onItemsToCart}
                onItemsToFavorite={onItemsToFavorite}
                favorited={true}
                {...el}/>
            ))
            }
          </div>
        </div>
    )
}

export default Favorites