import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducers';

export default combineReducers({
  productsData: ProductsReducer
});