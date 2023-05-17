import React, { useContext, useState } from 'react'
import styles from './Form.module.scss'
import st from '../../App.module.scss'
import dateFormatter from '../../functions/dateFormater'
import axios from 'axios'
import { Context, url } from '../../App'
import { getActionCreate, searchActionCreate } from '../../redux/todoReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function Form() {
  const dispatch = useDispatch()
  const [searchStatus, setSearchStatus] = useState(false)
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
              dispatch(getActionCreate(todos.data))
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
  const X = () => {
    setSearchStatus((old) => !old)
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
    document.getElementById('form__inp').value = ''
  }
  //****************************  search  ***************************************/
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
      setSearchStatus((old) => !old)
      axios({
        method: 'get',
        url,
      })
        .then((todos) => {
          dispatch(
            searchActionCreate(
              todos.data.filter((el) => el.todo == value || el.id == value)
            )
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
      <label className={styles.label}>
        <input
          placeholder="Text input"
          className={styles.formInp}
          type="text"
          name="todo"
          id="form__inp"
        />
        {!searchStatus ? (
          <button
            className={styles.search}
            type="button"
            onClick={() => search()}
          >
            <box-icon color="#fff" name="search-alt-2"></box-icon>
          </button>
        ) : (
          <button className={styles.x} type="button" onClick={() => X()}>
            X
          </button>
        )}
      </label>
      <span className={styles.span} id="span">
        ENTER YOUR TEXT!
      </span>
      <button type="submit">ADD</button>
    </form>
  )
}
