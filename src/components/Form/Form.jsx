import React, { useState } from 'react'
import styles from './Form.module.scss'
import st from '../../App.module.scss'
import dateFormatter from '../../functions/dateFormater'
import { todosService } from '../../TodoAPI/TodosService'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

export default function Form({ setSearchState }) {
  const client = useQueryClient()
  const { mutate: searchTodo } = useMutation(todosService.get, {
    onSuccess: (res) => {
      res.length > 0
        ? setSearchState(res)
        : toast.warning('NOT FOUND', {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            draggable: true,
            theme: 'colored',
          })
    },
  })
  const mutate = useMutation(todosService.post, {
    onSuccess: () => {
      client.invalidateQueries('getTodos', todosService.get)
    },
  })
  //console.log(mutate)
  const [searchStatus, setSearchStatus] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setSearchStatus(() => false)
    const value = e.target['todo'].value
    if (value) {
      const newTodo = {
        createdTime: dateFormatter(new Date()),
        id: new Date().getTime(),
        status: false,
        todo: value,
      }
      mutate.mutate(newTodo)
      e.target.reset()
      toast.success('TODO ADDED', {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: true,
        draggable: true,
        theme: 'colored',
      })
    } else {
      document.getElementById('form__inp').classList.add(st.emptyInp)
      document.getElementById('form__inp').placeholder = 'Enter your todo'
      setTimeout(() => {
        document.getElementById('form__inp').placeholder = 'Text input'
        document.getElementById('form__inp').classList.remove(st.emptyInp)
      }, 1200)
    }
  }
  const X = () => {
    setSearchStatus((old) => !old)
    document.getElementById('form__inp').value = ''
    //client.invalidateQueries('getTodos', todosService.get)
    setSearchState([])
  }
  //****************************  search  ***************************************/
  const search = () => {
    const value = document.getElementById('form__inp').value
    if (!value) {
      document.getElementById('form__inp').classList.add(st.emptyInp)
      document.getElementById('form__inp').placeholder = 'Enter your TEXT'
      setTimeout(() => {
        document.getElementById('form__inp').placeholder = 'Text input'
        document.getElementById('form__inp').classList.remove(st.emptyInp)
      }, 1200)
    } else {
      setSearchStatus((old) => !old)
      searchTodo(value)
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
      <button type="submit">ADD</button>
    </form>
  )
}
