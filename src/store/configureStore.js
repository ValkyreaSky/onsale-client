import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import adsReducer from 'store/reducers/ads';
import adReducer from 'store/reducers/ad';
import authReducer from 'store/reducers/auth';
import favouritesReducer from 'store/reducers/favourites';

const composeEnhancers = (
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose
);

const rootReducer = combineReducers({
  form: formReducer,
  ads: adsReducer,
  ad: adReducer,
  auth: authReducer,
  favourites: favouritesReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
