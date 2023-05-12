import React, { useState } from 'react'
import styles from './List.module.scss'
import filteredByType from '../../functions/filteredByType'
import Item from '../Item/Item'
import Pagination from '../Pagination/Pagination'

export default function List({ type, todos, setTodos }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [todosPerPage, setTodosPerPage] = useState(4) 

  const lastPostIndex = currentPage * todosPerPage
  const firstPostIndex = lastPostIndex - todosPerPage

  return (
    <>
      <ul className={styles.list}>
        {filteredByType(type, todos)
          .slice(firstPostIndex, lastPostIndex)
          .map((el, i) => (
            <Item el={el} id={i} key={el.id} setTodos={setTodos} />
          ))}
      </ul>
      <Pagination
        totalTodos={filteredByType(type, todos).length}
        todosPerPage={todosPerPage}
        setCurrentPage={setCurrentPage}
        setTodosPerPage={setTodosPerPage}
        currentPage={currentPage}
      />
    </>
  )
}
