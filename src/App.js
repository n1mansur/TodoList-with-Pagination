import React, { useState } from 'react'
import styles from './App.module.scss'
import 'boxicons'
import Form from './components/Form/Form'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import OnOffButton from './components/OnOffButton/OnOffButton'

export default function App() {
  const [todos, setTodos] = useState([
    {
      createdTime: '5:36 12.05.2023',
      id: 1,
      status: false,
      todo: '1',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 2,
      status: false,
      todo: '2',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 3,
      status: false,
      todo: '3',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 4,
      status: false,
      todo: '4',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 5,
      status: false,
      todo: '5',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 6,
      status: false,
      todo: '6',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 7,
      status: false,
      todo: '7',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 8,
      status: false,
      todo: '8',
    },
    {
      createdTime: '5:36 12.05.2023',
      id: 9,
      status: false,
      todo: '9',
    },
  ])
  const [type, setType] = useState('all')

  return (
    <div className={styles.wrapper} id="wrapper">
      <div className={styles.wrapper__container}>
        <div className={styles.title}>
          <h1 data-text="TODO LIST APP">TODO LIST APP</h1>
        </div>
        <div className={styles.hero}>
          <Form setTodos={setTodos} />
          <Filter setType={setType} />
          <List type={type} todos={todos} setTodos={setTodos} />
          <button className={styles.clear} onClick={() => setTodos([])}>
            Clear All
          </button>
        </div>
      </div>
      <OnOffButton />
    </div>
  )
}
