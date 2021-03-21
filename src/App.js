import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/home';
import SignIn from './containers/SignIn/signin';
import SignUp from './containers/SignUp/signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products/products';
import Orders from './containers/Orders/orders';
import Category from './containers/Category/category';

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // use effect hooks to check authentication
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
