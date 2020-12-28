import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = (initialState = {}, options) => {
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

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
};

export const wrapper = createWrapper(makeStore, {debug: true});


