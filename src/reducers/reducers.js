import authReducers from './authReducers';
import { combineReducers } from 'redux';
import userReducers from '../reducers/userReducers';
import categoryReducers from '../reducers/categoryReducers';
import productReducers from '../reducers/productReducers';
import orderReducers from '../reducers/orderReducers';

// combine reducers
const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducers,
  product: productReducers,
  orders: orderReducers,
});

export default rootReducers;
