import styles from './Item.module.scss'
import React, { useRef, useState } from 'react'
import dateFormatter from '../../functions/dateFormater'
import { todosService } from '../../TodoAPI/TodosService'
import { useMutation, useQuery } from 'react-query'

export default function Item({ el, id, firstPostIndex }) {
  const { refetch } = useQuery('getTodos', todosService.get)
  const saveMutation = useMutation(todosService.put)
  const deleteMutation = useMutation(todosService.delete)
  const checkedMutation = useMutation(todosService.checked)
  const [changeValue, setChangeValue] = useState(el.todo)
  const [disabled, setDisabled] = useState(false)
  const inpRef = useRef()
  const edit = () => {
    setDisabled(true)
    inpRef.current.disabled = false
    inpRef.current.focus()
    const item = document.getElementById(el.id)
    item.classList.add(styles.activeItem)
  }
  const cancel = () => {
    const item = document.getElementById(el.id)
    item.classList.remove(styles.activeItem)
    setDisabled(false)
    setChangeValue(el.todo)
  }
  const save = () => {
    setDisabled(false)
    const item = document.getElementById(el.id)
    item.classList.remove(styles.activeItem)
    saveMutation.mutate({
      id: el.id,
      todo: changeValue,
      status: false,
      createdTime: dateFormatter(new Date()),
    })
    setTimeout(() => {
      refetch()
    }, 300)
  }

  const checked = (id) => {
    const item = document.getElementById(el.id)
    item.classList.remove(styles.activeItem)
    checkedMutation.mutate({
      ...el,
      id: el.id,
      status: !el.status,
      createdTime: dateFormatter(new Date()),
    })
    setTimeout(() => {
      refetch()
    }, 300)
  }

  const deleteFn = (id) => {
    const item = document.getElementById(el.id)
    item.classList.remove(styles.activeItem)
    deleteMutation.mutate(id)
    setTimeout(() => {
      refetch()
    }, 300)
  }

  const onChange = (e) => {
    setChangeValue(e.target.value)
  }

  const btns = disabled ? (
    <>
      <button onClick={save}>
        <box-icon size="30px" color="#fff" name="check"></box-icon>
      </button>
      <button onClick={cancel}>
        <box-icon size="25px" color="#fff" name="undo"></box-icon>
      </button>
    </>
  ) : (
    <button onClick={edit}>
      <box-icon size="25px" color="#fff" name="pencil"></box-icon>
    </button>
  )

  const label = el.status ? (
    <>
      <label className={styles.label}>
        <box-icon size="30px" color="#fff" name="check"></box-icon>
        <input
          onClick={() => checked(el.id)}
          type="checkbox"
          style={{ display: 'none' }}
        />
      </label>
    </>
  ) : (
    <>
      <label className={styles.label}>
        <input
          onClick={() => checked(el.id)}
          type="checkbox"
          style={{ display: 'none' }}
        />
      </label>
    </>
  )
  return (
    <li className={styles.item} id={el.id}>
      <span className={styles.nth}>{++firstPostIndex + id}</span>
      <div className={styles.item__section}>
        <div className={styles.date}>
          <span className={styles.hours}>
            date of creation {el.createdTime}
          </span>
        </div>
        <div className={styles.section__form}>
          {label}
          <input
            ref={inpRef}
            disabled={!disabled}
            className={styles.inp}
            value={changeValue}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className={styles.item__btns}>
        {el.status ? <></> : btns}
        <button onClick={() => deleteFn(el.id)} id="${v.id}">
          <box-icon size="30px" color="#fff" name="x"></box-icon>
        </button>
      </div>
    </li>
  )
}
