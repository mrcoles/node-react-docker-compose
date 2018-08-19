import reducers from './redux';
import {createStore, compose, applyMiddleware} from 'redux';
// import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import config from "./config";

let composeEnhancers;

if (config.devToolsDisabled) {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default (history, initialState) => {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      ),
    )
  )
};
