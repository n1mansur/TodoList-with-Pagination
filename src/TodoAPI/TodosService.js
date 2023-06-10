import axios from 'axios'
import { url } from '../App'

export const todosService = {
  get: (value) =>
    axios
      .get(typeof value == 'string' ? url + '?todo=' + value : url)
      .then((res) => res.data.reverse())
      .catch((err) => err),
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
  delete: (id) =>
    axios.delete(url + '/' + id).then((res) => {
      todosService
        .get()
        .then((res) => res.reverse())
        .catch((e) => console.error(e))
        .finally(() => console.log('deleted'))
    }),
  clear: (arr) => {
    arr.map((el) =>
      axios.delete(url + '/' + el.id).finally(() => console.log('uchdi'))
    )
  },
}
