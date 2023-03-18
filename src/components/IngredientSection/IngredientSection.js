import Card from '../Card/Card.js';
import {ingredientArray} from "../../utils/prop-types";
import PropTypes from "prop-types";
import style from "./IngredientSection.module.css";

const IngredientSection = ({data, type, onClick, setSelected}) => {
    return (
        <div className={style.wrapper}>
            {data.map((elem) => {
                if (elem.type === type) {
                    return (
                        <Card key={elem._id} item={elem} onClick={onClick} setSelected={setSelected}/>
                    )
                }
            })}
        </div>
    )
}

IngredientSection.propTypes = {
    data: ingredientArray.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
};

export default IngredientSection;