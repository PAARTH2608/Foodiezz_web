import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem'; // added externally.
import Checkout from './Checkout';
const Cart = props => {

    const [isCheckout, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1})
    };
    const orderHandler = () => {
        setIsCheckOut(true);
    };
    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-http-f5ae6-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);

        cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>
        {// { id:'c1', name:'sushi', amount:'2', price:12.99}
        // cartCtx.items.map(item => <li>{item.name}</li>)}
        cartCtx.items.map(item => <CartItem 
                                        key={item.id} 
                                        name={item.name} 
                                        amount={item.amount} 
                                        price={item.price}
                                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                        onAdd={cartItemAddHandler.bind(null, item)}
                                    />
                                )}
    </ul>
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
    <React.Fragment>
        {cartItems} 

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
        {!isCheckout && modalActions}
    </React.Fragment>);

    const isSubmittingModalContent = <p>Ordering...</p>

    const didSubmitModalContent = (
    <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>)

    return <Modal onClose={props.onClose}>
                {!isSubmitting && !didSubmit && cartModalContent}
                {isSubmitting && isSubmittingModalContent}
                {!isSubmitting && didSubmit && didSubmitModalContent}
            </Modal>
};
export default Cart;
