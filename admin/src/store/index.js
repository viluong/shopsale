import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

let composeEnhancers = compose;

if (
  process.env.NODE_ENV !== "production" 
  && typeof window === "object"
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(
  rootReducer,
  composeEnhancers(...enhancers)
);

export default store;
