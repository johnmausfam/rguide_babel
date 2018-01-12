import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App2 from './components/App2'
import { AppContainer } from 'react-hot-loader';

let store = createStore(todoApp,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App2 />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render();

if(module.hot) {
  module.hot.accept('./components/App', () => {
    render()
  })

  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}