import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {}, // id, name, amount, price are coming via MealItem component.
    removeItem: (id) => {}
});
export default CartContext;