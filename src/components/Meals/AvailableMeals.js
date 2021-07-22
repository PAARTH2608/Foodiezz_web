import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
// we cannot use async func as a function in useEffect rather we created another func inside the use effect func which can be made async
const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState()
    // getting DUMMY_MEALS from backend.
    useEffect(() => {
        // loader.
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-f5ae6-default-rtdb.firebaseio.com/meals.json');
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const reponseData = await response.json();
            const loadedMeals = [];
            for( const key in reponseData){
                loadedMeals.push({
                    id: key,
                    name: reponseData[key].name,
                    description: reponseData[key].description,
                    price: reponseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });  
    }, []);

    if(isLoading){
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if(httpError){
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }
    // const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>);
    const mealsList = meals.map(meal => (
    <MealItem 
        key={meal.id}
        id= {meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price}
    />)
    );
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
        )
};
export default AvailableMeals;
