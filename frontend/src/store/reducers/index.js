import { combineReducers } from 'redux';
import productReducer from './product';
import cartReducer from './cart';
import authReducer from './auth';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer
})

export default rootReducer;