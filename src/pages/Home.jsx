import React, { useContext } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import AppContext from '../context';

import Card from '../Сomponents/Card';

function Home({onSearchInput, items, onItemsToCart, onItemsToFavorite, searchValue=""}){


  const renderItems = () => {
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      filteredItems.map((el) => (
        <Card 
          key={el.id} 
          onItemsToCart={onItemsToCart}
          onItemsToFavorite={onItemsToFavorite}
          {...el}/>
      ))
      
    )
  }
    return (
        <div className='content'>
          <div className='heading'>
            <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Деревянные пазлы"}</h1>
            <div className='search'>
              <IoSearchOutline size={16}/>
              <input onChange={onSearchInput} placeholder='Искать товар...'/>
            </div>
          </div>
          
          <div className='items'>
            {renderItems()}
          </div>
        </div>
    )
}

export default Home;