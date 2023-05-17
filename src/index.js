import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { todoReducer } from './redux/todoReducer'

const root = ReactDOM.createRoot(document.getElementById('root'))

const allReducer = combineReducers({ todos: todoReducer })

const store = createStore(allReducer)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
