import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal'
import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails.js'
import {useSelector, useDispatch} from "react-redux";
import {createOrder} from "../../utils/burger_api";
import {addIngredient, deleteAll, deleteIngredient} from "../../services/actions/order-actions";
import {useDrop} from "react-dnd";


function getFirst(ingredients, type) {
    const [first] = ingredients.filter((item) => item.type === type);
    return first;
}

function getInitialComposition(ingredients) {
    const bun = getFirst(ingredients, "bun");
    const sauce = getFirst(ingredients, "sauce");
    const main = getFirst(ingredients, "main");
    return [bun, sauce, main].filter(item => item && item.type);
}


const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    const {bun, filling, price} = useSelector(state => state.order);

    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.ingredients);
    
    React.useEffect(() => {
        dispatch(deleteAll());
        getInitialComposition(ingredients).forEach(item => dispatch(addIngredient(item)));
    }, [dispatch, ingredients]);

    const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addIngredient(item))
        }
    });

    const onDelete = (id) => {
        dispatch(deleteIngredient(id));
    }

    const onCreateOrder = () => {
        const ingredientIds = filling.map(element => element._id);
        ingredientIds.push(bun._id);
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
                            {filling?.map((item) => {
                                    return (
                                        <li className='mb-4' key={item._id}>
                                            <DragIcon type="primary"/>
                                            <ConstructorElement 
                                                text={item.name} 
                                                price={item.price}
                                                thumbnail={item.image}
                                                handleClose={() =>onDelete(item.id)}
                                            />
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