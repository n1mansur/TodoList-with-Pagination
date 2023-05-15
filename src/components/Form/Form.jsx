import React, { useContext } from 'react'
import styles from './Form.module.scss'
import st from '../../App.module.scss'
import dateFormatter from '../../functions/dateFormater'
import axios from 'axios'
import { Context, url } from '../../App'
//import Button from './Button'

export default function Form() {
  const { setTodos } = useContext(Context)
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
      axios
        .post(url, newTodo)
        .then(() => {
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
        })
        .catch((e) => console.error(e))
        .finally(() => {
          console.log('add end')
        })
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
  //*******************************************************************/
  const search = () => {
    const value = document.getElementById('form__inp').value
    if (!value) {
      document.getElementById('form__inp').classList.add(st.emptyInp)
      document.getElementById('form__inp').placeholder = 'Enter your TEXT'
      document.getElementById('span').classList.add(styles.emptySpan)
      setTimeout(() => {
        document.getElementById('form__inp').placeholder = 'Text input'
        document.getElementById('form__inp').classList.remove(st.emptyInp)
      }, 1200)
      setTimeout(() => {
        document.getElementById('span').classList.remove(styles.emptySpan)
      }, 3000)
    } else {
      axios({
        method: 'get',
        url,
      })
        .then((todos) => {
          setTodos(
            todos.data.filter((el) => el.todo == value || el.id == value)
          )
        })
        .catch((e) => console.error(e))
        .finally(() => {
          console.log('search end')
        })
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
        ENTER YOUR TEXT!
      </span>
      <button id="btn" type="submit">
        ADD
      </button>
      <button id="btn" type="button" onClick={() => search()}>
        SEARCH
      </button>
    </form>
  )
}
