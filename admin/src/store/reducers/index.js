import { combineReducers } from 'redux';
import productReducer from './product';
import orderReducer from './order';
import categoryReducer from './category';

const rootReducer = combineReducers({
  product: productReducer,
  order: orderReducer,
  category: categoryReducer
})

export default rootReducer;
