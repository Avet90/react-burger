import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal'
import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails.js'
import {ingredientArray} from "../../utils/prop-types";

const BurgerConstructor = ({data}) => {

    const [modalVisible, setModalVisible] = React.useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails/>
                </Modal>
            }
            <div className={`${styles.container}`}>
                <ul>
                    <li className='mb-4 mr-4'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={20}
                                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                            />
                        </div>
                    </li>
                    <li className='mb-4'>
                        <ul className={styles.scrollList}>
                            {data.map((elem) => {
                                if (elem.type !== 'bun') {
                                    return (
                                        <li className='mb-4' key={elem._id}>
                                            <DragIcon type="primary"/>
                                            <ConstructorElement text={elem.name} price={elem.price}
                                                                thumbnail={elem.image}/>
                                        </li>)
                                }
                            })}
                        </ul>
                    </li>
                    <li className='mb-4 ml-8'>
                        <div>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i (низ)"
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
                                onClick={() => setModalVisible(!modalVisible)}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

BurgerConstructor.propTypes = {
    data: ingredientArray.isRequired
};

export default BurgerConstructor;