import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Card.module.css';
import {ingredientType} from "../../utils/prop-types";

const Card = ({item, onClick, setSelected}) => {

    const [count, setCount] = React.useState(0);

    const onCardClick = () => {
        onClick(true);
        setSelected(item);
    }

    return (
        <>
            <div className={styles.wrapper} onClick={onCardClick}>
                <div className={styles.wrapper_count}>
                    <Counter count={count} size="default"/>
                </div>
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