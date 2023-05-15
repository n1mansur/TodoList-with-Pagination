import React, { createContext, useContext, useEffect, useState } from 'react'
import styles from './App.module.scss'
import 'boxicons'
import Form from './components/Form/Form'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import OnOffButton from './components/OnOffButton/OnOffButton'
import axios from 'axios'
export const url = 'https://644131f3792fe886a8a0f728.mockapi.io/todos'

export const Context = createContext()

export default function App() {
  const [todos, setTodos] = useState([])

  //console.log(todos, 'todos')

  useEffect(() => {
    axios({
      method: 'get',
      url,
    })
      .then((todos) => {
        setTodos(todos.data)
      })
      .catch((e) => console.error(e))
      .finally(() => {
        console.log('get end')
      })
  }, [])

  const [type, setType] = useState('all')

  const clearAll = () => {
    setTodos([])
  }

  return (
    <Context.Provider value={{ setTodos, todos, setType, type }}>
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
