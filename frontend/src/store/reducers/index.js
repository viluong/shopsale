import { combineReducers } from 'redux';
import productReducer from './product';
import cartReducer from './cart';
import authReducer from './auth';
import orderReducer from './order';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer
})

export default rootReducer;