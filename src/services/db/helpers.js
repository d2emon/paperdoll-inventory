import locationsData from "./cities/locations";
import init from "./cities/citiesData";

const makeQuery = records => new Promise(resolve => resolve([...records]))
const filterLocation = ({ x, y }) => item => {
  if (item.x !== x) return false
  if (item.y !== y) return false

  return true
}
const filterRect = ({ x0, x1, y0, y1 }) => item => {
  if (item.x < x0 || item.x > x1) return false
  if (item.y < y0 || item.y > y1) return false

  return true
}

export const  addRecord = (record, records) => {
  const item = {
    id: records.length + 1,
    ...record
  }
  records.push(item)
  return item
}

export const getRecord = (id, records) => {
  if (id <= 0 || id >= records.length) return null

  return records[id]
}

export const selectRecords = ({
  filter,
  location,
  rect
}, records) => makeQuery(records)
  .then(result => filter
    ? result.filter(filter)
    : result
  )
  .then(result => location
    ? result.filter(filterLocation(location))
    : result
  )
  .then(result => rect
    ? result.filter(filterRect(rect))
    : result
  )

export const selectRecord = (query, records) => selectRecords(query, records)
  .then(result => result.length > 0 ? result[0] : null)

export const parseMap = (data, callback) => {
  const result = []
  data.forEach((row, y) => {
    row.forEach((id, x) => {
      result.push(callback(x, y, id))
    })
  })
  return result
}

export const crud = (table, name, records) => {
  const names = `${name}s`
  return {
    addItem: data => new Promise(resolve => resolve({ result: true, [name]: table(data) })),
    getItem: id => new Promise(resolve => resolve({ [name]: getRecord(id, records) })),
    selectItem: query => selectRecord(query, records).then(result => ({ [name]: result })),
    selectItems: query => selectRecords(query, records).then(result => ({ [names]: result }))
  }
}

export const fill = (table, data) => Object.keys(data).forEach(id => table({ id, ...data[id]}))
