import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import {getIngredients} from '../../utils/burger_api';
import {IngredientsContext} from "../../utils/context";
import styles from './App.module.css'

function App() {
    const [error, setError] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);
    

    React.useEffect(() => {
        getIngredients().then((res) => {
            setIngredients(res.data);
        }).catch((e) => {
            setError(true);
        });
    }, [])

    return (
        <>
            {error && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
            <AppHeader/>
            <IngredientsContext.Provider value={ingredients}>
                <main className={styles.wrapper}>
                    <BurgerIngredients/>
                    <div className='pt-25'>
                    <BurgerConstructor/>
                    </div>
                </main>
            </IngredientsContext.Provider>
        </ >
    );
}


export default App;