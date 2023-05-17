import React, { createContext, useContext, useEffect, useState } from 'react'
import styles from './App.module.scss'
import 'boxicons'
import Form from './components/Form/Form'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import OnOffButton from './components/OnOffButton/OnOffButton'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  addACtionCreator,
  clearACtionCreator,
  getActionCreate,
} from './redux/todoReducer'
export const url = 'https://644131f3792fe886a8a0f728.mockapi.io/todos'

export const Context = createContext()

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios({
      method: 'get',
      url,
    })
      .then((todos) => {
        dispatch(getActionCreate(todos.data))
      })
      .catch((e) => console.error(e))
      .finally(() => {
        console.log('get end')
      })
  }, [])

  const [type, setType] = useState('all')

  const clearAll = () => {
    dispatch(clearACtionCreator())
  }

  return (
    <Context.Provider value={{ setType, type }}>
      <div className={styles.wrapper} id="wrapper">
        <div className={styles.wrapper__container}>
          <div className={styles.title}>
            <h1 data-text="TODO LIST APP">TODO LIST APP</h1>
          </div>
          <div className={styles.hero}>
            <Form />
            <Filter />
            <List />
            <button className={styles.clear} onClick={() => clearAll()}>
              Clear All
            </button>
          </div>
        </div>
        <OnOffButton />
      </div>
    </Context.Provider>
  )
}
