import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Card.module.css';
import {ingredientType} from "../../utils/prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";



const Card = ({item, onClick, setSelected}) => {

    const [count, setCount] = React.useState(0);

    const {bun, filling} = useSelector(state => state.order);

    React.useEffect(() => {
        if (item.type === 'bun') {
            setCount(item._id === bun?._id ? 1 : 0);
        } else {
            setCount(filling.filter(elem => elem._id === item._id).length);
        }
    }, [item, bun, filling]);

    const onCardClick = () => {
        onClick(true);
        setSelected(item);
    }

    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.1 : 1
        })
    })

    return (
        <>
            <div className={styles.wrapper} style={{opacity}} onClick={onCardClick} ref={dragRef}>
                <div className={styles.wrapper_count}>
                    <Counter count={count} size="default"/>
                </div>
                {count > 0 &&
                    <div className={styles.counter}>
                        <Counter count={count} size="default"/>
                    </div>
                }
                <div className={styles.wrapper_card}>
                    <img className='mb-1' src={item.image} alt={item.name}/>
                    <div className={styles.wrapper_text}>
                        <p className="text text_type_digits-default">{item.price}</p><CurrencyIcon type="primary"/>
                    </div>
                </div>
        
                <div className={styles.textCont}>
                    <p className="text text_type_main-default" >
                        {item.name}
                    </p>
                </div>
            </div>
        </>
    )
}
Card.propTypes = {
    item: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export default Card;