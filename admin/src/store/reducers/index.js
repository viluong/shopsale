import { combineReducers } from 'redux';
import productReducer from './product';
import orderReducer from './order';
import categoryReducer from './category';
import popupReducer from './popup';

const rootReducer = combineReducers({
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
  popup: popupReducer
})

export default rootReducer;
