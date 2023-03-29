import React from 'react'
import AppContext from "../context"

export const useCart = () => {
    const {cartItems, setCartItems} =  React.useContext(AppContext)


    return {cartItems, setCartItems}
}