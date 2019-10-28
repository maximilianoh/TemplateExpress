import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import Main from './layout/Main';
import SideBar from './layout/SideBar';
import NavBar from './layout/NavBar';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <NavBar />
      <SideBar />
      <Main />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./App', () => {
    // if you are using harmony modules ({modules:false})
    render();
  });
}
