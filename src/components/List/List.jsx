import React, { useContext, useEffect, useState } from 'react'
import styles from './List.module.scss'
import filteredByType from '../../functions/filteredByType'
import Item from '../Item/Item'
import Pagination from '../Pagination/Pagination'
import { Context } from '../../App'
import { todosService } from '../../TodoAPI/TodosService'
import { useQuery } from 'react-query'

export default function List({ searchState, setSearchState }) {
  const { type } = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(4)
  const lastPostIndex = currentPage * count
  const firstPostIndex = lastPostIndex - count
  const { data: todos } = useQuery('getTodos', todosService.get)

  const state = searchState.length > 0 ? searchState : todos

  return (
    <>
      <ul className={styles.list}>
        {filteredByType(type, state)
          ?.slice(firstPostIndex, lastPostIndex)
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
        totalTodos={filteredByType(type, todos)?.length}
        count={count}
        setCurrentPage={setCurrentPage}
        setCount={setCount}
        currentPage={currentPage}
      />
    </>
  )
}
