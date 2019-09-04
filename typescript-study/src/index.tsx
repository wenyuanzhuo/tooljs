import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
// import App from './App';
import { App } from './components/Todos'
import { reducers } from './reducers'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
// )
const store = createStore(
  reducers,
  applyMiddleware(thunk)
)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 