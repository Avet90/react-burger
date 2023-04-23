import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal'
import React, {useCallback} from 'react';
import OrderDetails from '../OrderDetails/OrderDetails.js'
import {useSelector, useDispatch} from "react-redux";
import {createOrder} from "../../utils/burger_api";
import {addIngredient, deleteAll, replaceFilling} from "../../services/actions/order-actions";
import {useDrop} from "react-dnd";
import OrderItem from "../OrderItem/OrderItem";


const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    const {bun, filling, price} = useSelector(state => state.order);

    const dispatch = useDispatch();

    const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addIngredient(item))
        }
    });

    const onMoveCard = useCallback((dragIndex, hoverIndex) => {
        const dragItem = filling[dragIndex];
        const newFilling = [...filling];
        newFilling.splice(dragIndex, 1);
        newFilling.splice(hoverIndex, 0, dragItem);
        dispatch(replaceFilling(newFilling))
    }, [dispatch, filling]);

    const onCreateOrder = () => {
        const ingredientIds = filling.map(element => element._id);
        ingredientIds.push(bun._id);
        createOrder(ingredientIds).then((res) => {
            setOrderId(res.order.number);
            setModalVisible(true);
        }).catch((e) => {
            setError(true);
        });
    }

    const closeModal = () => {
        setModalVisible(false);
        dispatch(deleteAll());

    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails orderId={orderId} error={error}/>
                </Modal>
            }
            {!bun &&
                    <div>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</div>
            }
            <div className={`${styles.container}`} ref={dropTargetRef}>
                <ul>
                    {bun &&
                    <li className='mb-4 mr-4'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    </li>
                }
                {filling &&
                    <li className='mb-4'>
                        <ul className={styles.scrollList}>
                            {filling?.map((item, index) => {
                                    return (
                                        <li className='mb-4' key={item._id}>
                                            <OrderItem key={`item-${item.id}`} item={item} index={index} moveCard={onMoveCard}/>
                                        </li>)
                            })}
                        </ul>
                    </li>
                    }
                    {bun &&
                    <li className='mb-4 mr-4'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    </li>
                    }
                </ul>
                <section className={styles.bottomBoxContainer}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary"/>
                    <div className='ml-10'>
                        <Button htmlType="button" type="primary" size="large"
                                onClick={onCreateOrder} disabled={!bun}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}


export default BurgerConstructor;