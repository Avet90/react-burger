import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import styles from './App.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {loadIngredients} from "../../services/actions/ingredients-actions";
import {Loader} from "../Loader/loader";


function App() {
    const dispatch = useDispatch();
    const {isLoading, isFailed} = useSelector(state => state.ingredients);

    

    React.useEffect(() => {
        dispatch(loadIngredients());
    },
    [dispatch]
    );

    return (
        <>
            <AppHeader/>
                <main className={styles.wrapper}>
                {isFailed && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
                {!isFailed && isLoading && <Loader size="large"/>}
                {!isFailed && !isLoading && <BurgerIngredients/>}
                    <div className='pt-25'>
                    <BurgerConstructor/>
                    </div>
                </main>
        </ >
    );
}


export default App;