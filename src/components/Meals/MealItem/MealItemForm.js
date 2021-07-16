import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState /*for error handling*/} from 'react';
const MealItemForm = props => {

    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value; 
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        {/* <input/> */}
        <Input
            ref={amountInputRef /*this wont work like this on custom components we need to use forward ref here*/}  
            label="Amount" input={{
            id:'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1',
        }}/>
        <button>+ Add </button>
        {!amountIsValid && <p>Please enter a valid amount 1-5.</p>}
    </form>

};
export default MealItemForm;

// the props used in Input are all default props in html input element.