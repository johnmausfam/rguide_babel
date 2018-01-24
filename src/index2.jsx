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
/*
var count = 0
class Child extends React.Component {
  render() {
    count++;
    return <div>{count}</div>
  }
}

const staticContext = {};
class CProvider extends React.Component {
  static childContextTypes = {}
  getChildContext() {
    return staticContext;
  }
  render() {
    return this.props.children
  }
}

const providerEntity = ReactDOM.render(
  <CProvider><Child /></CProvider>, document.getElementById('root')
)
providerEntity.setState({});*/