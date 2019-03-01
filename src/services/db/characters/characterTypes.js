import {
  fill,
  crud,
  addRecord
} from '../helpers'
import init from './characterTypesData'

const DATA = []
const NAME = 'characterType'
const Item = record => addRecord(record, DATA)

(function () { fill(Item, init) }())

export default {
  ...crud(Item, NAME)
}
