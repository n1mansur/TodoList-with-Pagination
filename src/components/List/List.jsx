import React, { useContext, useState } from 'react'
import styles from './List.module.scss'
import filteredByType from '../../functions/filteredByType'
import Item from '../Item/Item'
import Pagination from '../Pagination/Pagination'
import { Context } from '../../App'

export default function List() {
  const { type, todos, setTodos } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(4)

  const lastPostIndex = currentPage * count
  const firstPostIndex = lastPostIndex - count
  //console.log(currentPage, 'currentPage')
  //console.log(count, 'count')
  //console.log(lastPostIndex, 'currentPage * count')
  //console.log(firstPostIndex, 'lastPostIndex - count')
  //console.log(lastPostIndex, 'lastPostIndex')
  //console.log(count, 'count')
  //console.log('  ')

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
              setTodos={setTodos}
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
