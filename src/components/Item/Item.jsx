import axios from 'axios'
import styles from './Item.module.scss'
import React, { useRef, useState } from 'react'
import { url } from '../../App'
import dateFormatter from '../../functions/dateFormater'
import { useDispatch } from 'react-redux'
import { checkedACtionCreator, getActionCreate } from '../../redux/todoReducer'

export default function Item({ el, id, setTodos, firstPostIndex }) {
  const dispatch = useDispatch()
  const [changeValue, setChangeValue] = useState(el.todo)
  const [disabled, setDisabled] = useState(false)
  const inpRef = useRef()
  const edit = () => {
    setDisabled(true)
    inpRef.current.disabled = false
    inpRef.current.focus()
    keyDownSave()
  }
  const cancel = () => {
    setDisabled(false)
    setChangeValue(el.todo)
  }
  const save = () => {
    setDisabled(false)
    axios
      .put(`${url}/${el.id}`, {
        todo: changeValue,
        status: false,
        createdTime: dateFormatter(new Date()),
      })
      .then((res) => {
        axios(`${url}`).then((res) => {
          dispatch(getActionCreate(res.data))
        })
      })
      .catch((e) => console.error(e))
      .finally(() => {})
  }
  const keyDownSave = (e) => {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        console.log('e')
        axios
          .put(`${url}/${el.id}`, {
            todo: changeValue,
            status: false,
            createdTime: dateFormatter(new Date()),
          })
          .then((res) => {
            axios(`${url}`)
              .then((res) => {
                console.log(res.data)
                setTodos(res.data)
              })
              .catch((e) => console.error(e))
              .finally(() => {})
          })
          .catch((e) => console.error(e))
          .finally(() => {})
        setDisabled(false)
      }
      if (e.code == 'Escape') {
        setDisabled(false)
        setChangeValue(el.todo)
      }
    })
  }
  const checked = (id) => {
    dispatch(checkedACtionCreator(id))
  }

  const deleteFn = () => {
    axios({
      method: 'delete',
      url: `${url}/${el.id}`,
    })
      .then((todo) => {
        axios({
          method: 'get',
          url: `${url}`,
        }).then((res) => {
          dispatch(getActionCreate(res.data))
        })
      })
      .catch((e) => console.error(e))
      .finally(() => {})
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
        <button onClick={deleteFn} id="${v.id}">
          <box-icon size="30px" color="#fff" name="x"></box-icon>
        </button>
      </div>
    </li>
  )
}
