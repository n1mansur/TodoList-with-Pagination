import React, { useContext, useState } from 'react'
import styles from './List.module.scss'
import filteredByType from '../../functions/filteredByType'
import Item from '../Item/Item'
import Pagination from '../Pagination/Pagination'
import { Context } from '../../App'
import { useSelector } from 'react-redux'

export default function List() {
  const { type } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(4)

  const lastPostIndex = currentPage * count
  const firstPostIndex = lastPostIndex - count
  const todos = useSelector((state) => state.todos)

  return (
    <>
      <ul className={styles.list}>
        {filteredByType(type, todos)
          .slice(firstPostIndex, lastPostIndex)
          .map((el, i) => (
            <Item
              el={el}
              id={i}
              key={el.id}
              todos={todos}
              firstPostIndex={firstPostIndex}
            />
          ))}
      </ul>
      <Pagination
        totalTodos={filteredByType(type, todos).length}
        count={count}
        setCurrentPage={setCurrentPage}
        setCount={setCount}
        currentPage={currentPage}
      />
    </>
  )
}
