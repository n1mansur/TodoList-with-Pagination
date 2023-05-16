import React from 'react'
import styles from './Pagination.module.scss'

export default function Pagination({
  totalTodos,
  count,
  setCurrentPage,
  setCount,
  currentPage,
}) {
  let arr = []

  for (let i = 1; i <= Math.ceil(totalTodos / count); i++) {
    arr.push(i)
  }

  return (
    <div className={styles.pagination}>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        max={4}
      />
      <button
        onClick={() =>
          setCurrentPage((old) => (currentPage > 1 ? old - 1 : old))
        }
      >
        prev
      </button>
      {arr.slice(currentPage - 1, currentPage + 4).map((el, i) => {
        return (
          <button
            key={i}
            onClick={() => setCurrentPage(el)}
            className={el == currentPage ? 'active' : ''}
          >
            {el}
          </button>
        )
      })}
      <button
        onClick={() =>
          setCurrentPage((old) => (currentPage < arr.length ? old + 1 : old))
        }
      >
        next
      </button>
    </div>
  )
}
