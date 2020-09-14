import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/app/app';
import RootReducer from './reducers/RootReducer';
import './index.css';

const store = createStore( 
  RootReducer,
  applyMiddleware(thunk) 
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
