import axios from 'axios'
import { url } from '../App'
import dateFormatter from '../functions/dateFormater'

const ADD = 'ADD'
const DELETE = 'DELETE'
const SEARCH = 'SEARCH'
const SAVE = 'SAVE'
const CHECKED = 'CHECKED'
const CLEAR = 'CLEAR'
const GET_INITIAL_STATE = 'GET_INITIAL_STATE'

const initialState = []

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.newTodo]
    case GET_INITIAL_STATE:
      return action.todos
    case SEARCH:
      return action.todos
    case CHECKED:
      const filter = state.filter((el) => {
        return el.id == action.id
      })
      axios
        .put(`${url}/${action.id}`, {
          ...filter,
          status: !filter[0].status,
          createdTime: dateFormatter(new Date()),
        })
        .then(() => {
          axios(`${url}`).then((res) => {
            getActionCreate(res.data)
          })
        })
        .catch((e) => console.error(e))
        .finally(() => {})

      return state.map((el) => {
        return el.id == action.id ? { ...el, status: !el.status } : el
      })

    case CLEAR:
      return []
    default:
      return state
  }
}

export const addACtionCreator = (newTodo) => {
  return {
    type: ADD,
    newTodo,
  }
}
export const saveACtionCreator = (newTodo) => {
  return {
    type: SAVE,
    newTodo,
  }
}
export const getActionCreate = (todos) => {
  return {
    type: GET_INITIAL_STATE,
    todos,
  }
}
export const searchActionCreate = (todos) => {
  return {
    type: SEARCH,
    todos,
  }
}
export const checkedACtionCreator = (id) => {
  return {
    type: CHECKED,
    id,
  }
}
export const clearACtionCreator = () => {
  return {
    type: CLEAR,
  }
}
