import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { BrowserRouter as Route } from 'react-router-dom';
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Route>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Route>
  </Provider>,

  document.getElementById('root')
);
