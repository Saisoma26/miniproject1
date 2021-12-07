import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItem: () => {},
  incrementCount: () => {},
  decrementCount: () => {},
})

export default CartContext
