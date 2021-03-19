import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/HOC/privateRoute';
import Home from './containers/Home/home';
import SignIn from './containers/SignIn/signin';
import SignUp from './containers/SignUp/signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Router>
    </div>
  ); 
}

export default App;
