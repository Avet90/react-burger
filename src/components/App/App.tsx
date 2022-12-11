import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import appStyles from '../App/App.module.css'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'


class App extends React.Component {
  render() {
    return(
      <div className={appStyles.page}>
        <AppHeader />
        <section className={appStyles.wrapper}>
          <BurgerIngredients />
          <BurgerConstructor/>
        </section>
      </div>
    )
  }
}

export default App;
