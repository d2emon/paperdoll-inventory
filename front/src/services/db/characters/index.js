import {
  crud,
  addRecord
} from '../helpers'
import characterTypes from './characterTypes'

const DATA = []
const Item = ({characterType, ...record}) => {
  addRecord({
    ...characterTypes.getItem(characterType),
    ...record
  }, DATA)
}

// (function () {}())

export default {
  ...crud(Item, 'character', DATA)
}
