import axios from 'axios'
import { url } from '../App'

export const todosService = {
  get: () => axios.get(url).then((res) => res.data.reverse()),
  post: (newBody) =>
    axios.post(url, newBody).then((res) =>
      todosService
        .get()
        .then((res) => res)
        .catch((e) => console.error(e))
        .finally(() => console.log('posted'))
    ),
  put: (body) =>
    axios.put(`${url}/${body.id}`, body).then((res) =>
      todosService
        .get()
        .then((res) => res)
        .catch((e) => console.error(e))
        .finally(() => console.log('changed'))
    ),
  checked: (body) =>
    axios.put(`${url}/${body.id}`, body).then((body) =>
      todosService
        .get()
        .then((res) => {
          return { res, bodyData: body.data }
        })
        .catch((e) => console.error(e))
        .finally()
    ),
  delete: (id) =>
    axios.delete(url + '/' + id).then((res) => {
      todosService
        .get()
        .then((res) => res.reverse())
        .catch((e) => console.error(e))
        .finally(() => console.log('deleted'))
    }),
  search: (value) =>
    axios.get(url).then((res) => res.data.filter((el) => el.todo == value)),
  clear: (arr) => {
    arr.map((el) =>
      axios.delete(url + '/' + el.id).finally(() => console.log('uchdi'))
    )
  },
}
