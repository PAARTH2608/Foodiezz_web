import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHiglighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
    const { items } = cartCtx;
    useEffect(() => {

        if(cartCtx.items.length === 0){
            return;
        }

        setBtnIsHiglighted(true); 

        const timer = setTimeout(() => {
            setBtnIsHiglighted(false);
        }, 300);

        // removing the timer.
        return clearTimeout(timer)

    },
    /*eslint-disable-next-line*/
    [items])

    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>)
};
export default HeaderCartButton;