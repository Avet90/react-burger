import React from "react";

import constructorStyles from "./BurgerConstructor.module.css";
import {data} from '../../utils/data'
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components"

function BurgerConstructor() {
    return(
        <section className={constructorStyles.constructor_section}>
        <ConstructorItems />
        <ButtonPriceWrapper />
      </section>
    )
}


function ConstructorItems() {
    return (
      <div className={`${constructorStyles.constructor_wrapper} mt-25 pr-4`}>
        <div className="mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
  
        <ConstructorList />
  
        <div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
    );
  }
  
  function ConstructorList() {
    return (
      <ul className={constructorStyles.constructor_list}>
        {data.map((el) => {
          if (el.type === "sauce" || el.type === "main") {
            return (
              <li className={`${constructorStyles.constructor_list_item} mb-4`}>
                <DragIcon />
                <div className="ml-2">
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    key={el._id}
                  />
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
  
  function ButtonPriceWrapper() {
    return (
      <div className={`${constructorStyles.constructor_button_wrapper} mt-10`}>
        <div className={`${constructorStyles.constructor_price_box} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" size="large" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    );
  }
  
  export default BurgerConstructor;