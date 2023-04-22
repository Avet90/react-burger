import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients-reducers";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
});