import React from "react";

import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerStyles from '../BurgerIngredients/BurgerIngredients.module.css'
import {data} from '../../utils/data'

function BurgerIngredients() {
    const [current, setCurrent] = React.useState("bun");

    const bunMenu = data.filter((el) => el.type === "bun");
    const sauceMenu = data.filter((el) => el.type === "sauce");
    const mainMenu = data.filter((el) => el.type === "main");

    const scrollTabClick = (e, tab) => {
        setCurrent(e);
        tab.current.scrollIntoView({ behavior: "smooth" });
      };

    return(
        <section>
            <h1 className=" mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className="mt-5" style={{ display: "flex" }}>
                <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
                </Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
                </Tab>
                <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
                </Tab>
            </div>

            <div className={burgerStyles.ingredients_box}>
                <h2 className="text text_type_main-medium mt-10">Булки</h2>
                <IngredientsList data={bunMenu} type="bun" />
                <h2 className="text text_type_main-medium mt-10">Соусы</h2>
                <IngredientsList data={sauceMenu} type="sauce" />
                <h2 className="text text_type_main-medium mt-10">Начинки</h2>
                <IngredientsList data={mainMenu} type="main" />
            </div>
        </section>
    );
}

function IngredientsList({ data }) {
    return (
      <ul className={`${burgerStyles.menu_list} mt-6 ml-1 mr-1`}>
        {data.map((el) => (
          <li>
            <div className={burgerStyles.menu_item}>
              <img className="ml-4 mr-4" src={el.image} />
              <div className={`${burgerStyles.item_price_box} mt-1`}>
                <p className="text text_type_digits-default mr-2">{el.price}</p>
                <CurrencyIcon />
              </div>
              <h3 className="text text_type_main-default mt-1`">{el.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  export default BurgerIngredients;