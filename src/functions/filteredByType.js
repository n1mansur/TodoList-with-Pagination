const filteredByType = (type, todos) => {
  return todos.filter((el) => {
    if (type == 'all') return true
    if (type == 'completed') return el.status
    if (type == 'proccess') return !el.status
  })
}
export default filteredByType
