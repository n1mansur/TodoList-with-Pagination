import React, { useContext } from 'react'
import styles from './Filter.module.scss'
import { Context } from '../../App'

export default function Filter() {
  const { setType } = useContext(Context)
  return (
    <div className={styles.Filter}>
      <span className={styles.span}>Filter by status:</span>
      <select onChange={(e) => setType(e.target.value)} name="status">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="proccess">Proccess</option>
      </select>
    </div>
  )
}
