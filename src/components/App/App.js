import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import {getIngredients} from '../../utils/burger_api';
import styles from './App.module.css'

function App() {
    const [error, setError] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(() => {
        getIngredients().then((res) => {
            setIngredients(res.data);
        }).catch((e) => {
            setError(true);
            console.log(e)
        });
    }, [])

    return (
        <>
            {error && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
            <AppHeader/>
            <main className={styles.wrapper}>
                <BurgerIngredients data={ingredients}/>
                <div className='pt-25'>
                    <BurgerConstructor data={ingredients}/>
                </div>
            </main>
        </ >
    );
}


export default App;