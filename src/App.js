import React, { createContext, useContext, useEffect, useState } from 'react'
import styles from './App.module.scss'
import 'boxicons'
import Form from './components/Form/Form'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import OnOffButton from './components/OnOffButton/OnOffButton'
import { useMutation, useQuery } from 'react-query'
import { todosService } from './TodoAPI/TodosService'
export const url = 'https://644131f3792fe886a8a0f728.mockapi.io/todos'

export const Context = createContext()

export default function App() {
  const { data, refetch } = useQuery('getTodos', todosService.get)
  const clearMutate = useMutation(todosService.clear)
  const [type, setType] = useState('all')
  const clearAll = () => {
    clearMutate.mutate(data)
    setTimeout(() => {
      refetch()
    }, 5000)
  }

  return (
    <Context.Provider value={{ setType, type }}>
      <div className={styles.wrapper} id="wrapper">
        <span id="finally_status" className={styles.finally_status}></span>
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
