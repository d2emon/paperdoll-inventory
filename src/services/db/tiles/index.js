import {
  fill,
  crud,
  addRecord
} from '../helpers'
import init from './tilesData'

const DATA = []
const NAME = 'tile'
const Item = record => addRecord(record, DATA)

(function () { fill(Item, init) }())

export default {
  ...crud(Item, NAME)
}
