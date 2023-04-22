import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal'
import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails.js'
import {IngredientsContext} from "../../utils/context";
import {createOrder} from "../../utils/burger_api";



const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    const ingredients = React.useContext(IngredientsContext);

    const withoutBuns = React.useMemo(
        () => ingredients.filter((item) => item.type !== "bun"),
        [ingredients]
    );

    const onCreateOrder = () => {
        const ingredientIds = withoutBuns.map(element => element._id);
        ingredientIds.push("60d3b41abdacab0026a733c6");
        ingredientIds.push("60d3b41abdacab0026a733c6");
        createOrder(ingredientIds).then((res) => {
            setOrderId(res.order.number);
        }).catch((e) => {
            setError(true);
        });
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails orderId={orderId} error={error}/>
                </Modal>
            }
            <div className={`${styles.container}`}>
                <ul>
                    <li className='mb-4 mr-4'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i"
                                price={20}
                                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                            />
                        </div>
                    </li>
                    <li className='mb-4'>
                        <ul className={styles.scrollList}>
                            {withoutBuns.map((elem) => {
                                    return (
                                        <li className='mb-4' key={elem._id}>
                                            <DragIcon type="primary"/>
                                            <ConstructorElement text={elem.name} price={elem.price}
                                                                thumbnail={elem.image}/>
                                        </li>)
                            })}
                        </ul>
                    </li>
                    <li className='mb-4 mr-4'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i"
                                price={20}
                                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                            />
                        </div>
                    </li>
                </ul>
                <section className={styles.bottomBoxContainer}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary"/>
                    <div className='ml-10'>
                        <Button htmlType="button" type="primary" size="large"
                                onClick={onCreateOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}


export default BurgerConstructor;