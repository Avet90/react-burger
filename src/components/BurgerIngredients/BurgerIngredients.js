import React from 'react';
import {useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal.js'
import IngredientSection from "../IngredientSection/IngredientSection.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";


const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = () => {

    const [current, setCurrent] = React.useState("bun");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    const {ingredients} = useSelector(state => state.ingredients);


    const bunMenu = React.useMemo(
       () => ingredients.filter((el) => el.type === "bun"),[ingredients]);
    const sauceMenu = React.useMemo( 
       () => ingredients.filter((el) => el.type === "sauce"), [ingredients]);
    const mainMenu = React.useMemo( 
       () => ingredients.filter((el) => el.type === "main"),[ingredients]);

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

            <section  className={styles.section}>
                <div className='mt-10 mb-5'>
                    <h1 className="text text_type_main-large">
                        Соберите бургер
                    </h1>
                </div>
                <div className='mb-10'>
                    <div className={styles.wrapper_tabs}>
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
                        <h2 className="text text_type_main-medium" ref={bunRef}>Булки</h2>
                        <IngredientSection data={bunMenu} type='bun' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium" ref={sauceRef}>Соусы</h2>
                        <IngredientSection data={sauceMenu} type='sauce' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>
                        <IngredientSection data={mainMenu} type='main' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}


export default BurgerIngredients;