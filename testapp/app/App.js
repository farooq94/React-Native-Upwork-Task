import React, { Component } from 'react';
import Navigator from './containers/Navigator';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './reducers';


// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

const store = createStore(
  allReducers,
  applyMiddleware(thunkMiddleware, promise, loggerMiddleware)
);

const App = () => (
    <Provider store={store}>
      <Navigator />
    </Provider>
);

export default App;

