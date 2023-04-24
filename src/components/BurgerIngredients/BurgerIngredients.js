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

    const [currentTab, setCurrentTab] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    const {ingredients} = useSelector(state => state.ingredients);


    const buns = React.useMemo(
       () => ingredients.filter((item) => item.type === "bun"),[ingredients]
    );

    const sauces = React.useMemo( 
       () => ingredients.filter((item) => item.type === "sauce"), [ingredients]
    );
    const mains = React.useMemo( 
       () => ingredients.filter((item) => item.type === "main"),[ingredients]
    );

    const closeModal = () => {
        setModalVisible(false);
    };

    const scrollList = React.useRef(null);
    const bunsList = React.useRef(null);
    const saucesList = React.useRef(null);
    const mainsList = React.useRef(null);

    const typeListRefs = new Map();
    typeListRefs.set(tab1, bunsList);
    typeListRefs.set(tab2, saucesList);
    typeListRefs.set(tab3, mainsList);

    // Переключение вкладок при скроллинге
    React.useEffect(() => {
        const typeTitleInViewport = {};
        const callback = (entries) => {
            entries.forEach((entry) => {
                typeTitleInViewport[entry.target.id] = entry.isIntersecting;
            })
            for (let typeTitle of Object.keys(typeTitleInViewport)) {
                if (typeTitleInViewport[typeTitle]) {
                    setCurrentTab(typeTitle);
                }
            }
        };

        const options = {
            root: scrollList.current,
            rootMargin: '20% 0% -80% 0%',
            threshold: 0
        };
        const observer = new IntersectionObserver(callback, options);
        typeListRefs.forEach((typeTitle) => observer.observe(typeTitle.current));
    });

    const scrollTo = (e, ref) => {
        setCurrentTab(e);
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title="Детали ингредиента">
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
                        <Tab value={tab1} active={currentTab === tab1} onClick={(e) => scrollTo(e, bunsList)} >
                        {tab1}
                        </Tab>
                        <Tab value={tab2} active={currentTab === tab2} onClick={(e) => scrollTo(e, saucesList)} >
                        {tab2}
                        </Tab>
                        <Tab value={tab3} active={currentTab === tab3} onClick={(e) => scrollTo(e, mainsList)} >
                        {tab3}
                        </Tab>
                    </div>
                </div>
                <section className={styles.scrollList} ref={scrollList}>
                    <div>
                        <h2 className="text text_type_main-medium" ref={bunsList} id={tab1}>Булки</h2>
                        <IngredientSection data={buns} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium" ref={saucesList} id={tab2}>Соусы</h2>
                        <IngredientSection data={sauces} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium" ref={mainsList} id={tab3}>Начинки</h2>
                        <IngredientSection data={mains} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}


export default BurgerIngredients;