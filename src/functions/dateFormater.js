function dateFormatter(date) {
  const h = date.getHours()
  const min = date.getMinutes()
  const d = date.getDate()
  const m =
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const y = date.getFullYear()
  return `${h}:${min} ${d}.${m}.${y}`
}

export default dateFormatter