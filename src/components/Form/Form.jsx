import React from 'react'
import styles from './Form.module.scss'
import st from '../../App.module.scss'
import dateFormatter from '../../functions/dateFormater'
//import Button from './Button'

export default function Form({ setTodos }) {
  const submit = (e) => {
    e.preventDefault()
    const value = e.target['todo'].value
    if (value) {
      const newTodo = {
        createdTime: dateFormatter(new Date()),
        id: new Date().getTime(),
        status: false,
        todo: value,
      }
      setTodos((old) => [newTodo, ...old])
      e.target.reset()
    } else {
      document.getElementById('form__inp').classList.add(st.emptyInp)
      document.getElementById('form__inp').placeholder = 'Enter your todo'
      document.getElementById('span').classList.add(styles.emptySpan)
      setTimeout(() => {
        document.getElementById('form__inp').placeholder = 'Text input'
        document.getElementById('form__inp').classList.remove(st.emptyInp)
      }, 1200)
      setTimeout(() => {
        document.getElementById('span').classList.remove(styles.emptySpan)
      }, 3000)
    }
  }
  return (
    <form className={styles.addForm} onSubmit={(e) => submit(e)}>
      <input
        placeholder="Text input"
        className={styles.formInp}
        type="text"
        name="todo"
        id="form__inp"
      />
      <span className={styles.span} id="span">
        ENTER YOUR TODO!
      </span>
      <button id="btn" type="submit">
        ADD
      </button>
      {/*<Button />*/}
    </form>
  )
}
