import authReducers from './authReducers';
import { combineReducers } from 'redux';
import userReducers from './userReducers';
import categoryReducers from './categoryReducers';
import productReducers from './productReducers';
import orderReducers from './orderReducers';

// combine reducers
const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducers,
  product: productReducers,
  orders: orderReducers,
});

export default rootReducers;
