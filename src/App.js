import React from 'react'
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'

import AppContext from './context';

import Header from "./Сomponents/Header";
import Card from './Сomponents/Card';
import Cart from './Сomponents/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Bottom from './Сomponents/Bottom';

function App() {
  const [searchValue, setsearchValue] = React.useState('')
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(()=> {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse, favoritesResponse] = await Promise.all([
          axios.get('https://641beca01f5d999a446cd875.mockapi.io/cart'),
          axios.get('https://641beca01f5d999a446cd875.mockapi.io/items'),
          axios.get('https://641dc760945125fff3d5f129.mockapi.io/favorites')
        ])
    
      //setIsLoading(false)
      
      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
      setFavoriteItems(favoritesResponse.data)
      } catch(error) {
        alert('Ошибка при запросе данных')
      }
    }
    fetchData();
  }, []);

  const onSearchInput = (event) => {
    setsearchValue(event.target.value)
  }

  const onItemsToCart = async (obj) => {
    try {
      const findItem=cartItems.find(el => Number(el.parentdId)===Number(obj.id))
      if (findItem){
        axios.delete(`https://641beca01f5d999a446cd875.mockapi.io/cart/${findItem.id}`);
        setCartItems(prev => prev.filter(item => Number(item.parentdId) !== Number(obj.id)));
      }
      else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post('https://641beca01f5d999a446cd875.mockapi.io/cart', obj);
        setCartItems(prev => prev.map(item =>{
          if(item.parentdId === data.parentdId){
            return {
              ...item, id: data.id
            }
          }
          return item;
        }));
      }
    } catch(error) {
      alert('Ошибка при добавлении в корзину')
    }
  }

  const isItemInCart = (id) => {
      return cartItems.some((obj) => Number(obj.parentdId)===Number(id));
  }

  const removeItem = (id) => {
    axios.delete(`https://641beca01f5d999a446cd875.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    
  }

  const onItemsToFavorite = (obj) => {
    if (favoriteItems.find(el => el.id===obj.id)){
      setFavoriteItems(prev => prev.filter(item => item.id !== obj.id))
    }
    else {
      setFavoriteItems(prev => [...prev, obj]);
    }
  }

  const isItemInFavorites = (id) => {
    return favoriteItems.some((obj) => Number(obj.parentdId)===Number(id));
}

  return (
    
    <AppContext.Provider value={{searchValue, items, isItemInCart, isItemInFavorites, cartItems, setCartItems}} >
    <div>
      <Header onClickCart={() => setCartOpened(true)}/>
      <Cart items={cartItems} onCloseCart={() => setCartOpened(false)} opened={cartOpened} removeItem={removeItem}/>
      <Routes>
        <Route path='/' element={
          <Home
            onSearchInput={onSearchInput}
            items={items}
            onItemsToCart={onItemsToCart}
            onItemsToFavorite={onItemsToFavorite}
            searchValue={searchValue}/>
        }/>
        <Route path='favorites' element={
          <Favorites 
            items={favoriteItems}
            onItemsToCart={onItemsToCart}
            onItemsToFavorite={onItemsToFavorite}/>
        }/>
        <Route path='profile' element={
          <Profile 
            onItemsToCart={onItemsToCart}
            onItemsToFavorite={onItemsToFavorite}/>
        }/>
        
      </Routes>
      <Bottom/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
