import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal.js'
import BigCard from "../BigCard/BigCard.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import {ingredientArray} from "../../utils/prop-types";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = React.useState("bun");

    const bunMenu = data.filter((el) => el.type === "bun");
    const sauceMenu = data.filter((el) => el.type === "sauce");
    const mainMenu = data.filter((el) => el.type === "main");

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    const closeModal = () => {
        setModalVisible(false);
    };

    const bunRef = React.useRef();
    const sauceRef = React.useRef();
    const mainRef = React.useRef();

    function scrollTabClick(e, tab) {
        setCurrent(e);
        tab.current.scrollIntoView({ behavior: "smooth" });
      }

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title="Детали заказа">
                    <IngredientDetails item={selected}/>
                </Modal>}

            <section style={{width: '600px'}}>
                <div className='mt-10 mb-5'>
                    <p className="text text_type_main-large">
                        Соберите бургер
                    </p>
                </div>
                <div className='mb-10'>
                    <div style={{display: 'flex'}}>
                        <Tab value="bun" active={current === "bun"} onClick={(e) => scrollTabClick(e, bunRef)} >
                            Булки
                        </Tab>
                        <Tab value="sauce" active={current === "sauce"} onClick={(e) => scrollTabClick(e, sauceRef)} >
                            Соусы
                        </Tab>
                        <Tab value="main" active={current === "main"} onClick={(e) => scrollTabClick(e, mainRef)} >
                            Начинки
                        </Tab>
                    </div>
                </div>
                <section className={styles.scrollList}>
                    <div>
                        <p className="text text_type_main-medium" ref={bunRef}>Булки</p>
                        <BigCard data={bunMenu} type='bun' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={sauceRef}>Соусы</p>
                        <BigCard data={sauceMenu} type='sauce' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={mainRef}>Начинки</p>
                        <BigCard data={mainMenu} type='main' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: ingredientArray.isRequired,
    setModalVisible: ingredientArray.isRequired,

};

export default BurgerIngredients;