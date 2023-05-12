import React from 'react'
import styles from './Filter.module.scss'

export default function Filter({ setType }) {
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
