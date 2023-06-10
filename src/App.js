import React, { createContext, useState } from 'react'
import styles from './App.module.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'boxicons'
import Form from './components/Form/Form'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import { ToastContainer, toast } from 'react-toastify'
export const url = 'https://644131f3792fe886a8a0f728.mockapi.io/todos'

export const Context = createContext()

export default function App() {
  const [searchState, setSearchState] = useState([])

  const [type, setType] = useState('all')
  const clearAllFn = () => {
    toast.warning('AXIOSDA clear all yoq', {
      position: 'bottom-center',
      autoClose: 4000,
      hideProgressBar: true,
      draggable: true,
      theme: 'colored',
      style: { boxShadow: '0 0 15px red' },
    })
  }

  return (
    <Context.Provider value={{ setType, type }}>
      <div className={styles.wrapper} id="wrapper">
        <div className={styles.wrapper__container}>
          <div className={styles.title}>
            <h1 data-text="TODO LIST APP">TODO LIST APP</h1>
          </div>
          <div className={styles.hero}>
            <Form setSearchState={setSearchState} />
            <Filter />
            <List searchState={searchState} setSearchState={setSearchState} />
            {/*<button className={styles.clear} onClick={() => clearAllFn()}>
              Clear All
            </button>*/}
          </div>
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </Context.Provider>
  )
}
