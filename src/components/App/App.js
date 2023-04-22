import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import {getIngredients} from '../../utils/burger_api';
import styles from './App.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {loadIngredients} from "../../services/actions/ingredients";
import {Loader} from "../Loader/loader";


function App() {
    const dispatch = useDispatch();
    const {loadingStarted, loadingFailed} = useSelector(
        state => state.ingredients
    );
    

    React.useEffect(() => {
        dispatch(loadIngredients());
    },
    [dispatch]
    );

    return (
        <>
            <AppHeader/>
                <main className={styles.wrapper}>
                {loadingFailed && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
                {!loadingFailed && loadingStarted && <Loader size="large"/>}
                {!loadingFailed && !loadingStarted && <BurgerIngredients/>}
                    <div className='pt-25'>
                    <BurgerConstructor/>
                    </div>
                </main>
        </ >
    );
}


export default App;