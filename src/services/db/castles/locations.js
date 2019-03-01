import {
  crud,
  addRecord,
} from '../helpers'
import tiles from '../tiles'

const DATA = []
const NAME = 'location'
const Item = ({ tileId, ...record }) => {
  const template = tiles.getItem(tileId)
  if (!template) return

  return addRecord({
    passable: true,
    ...tile,
    ...record
  }, DATA)
}

// (function () {}())

export default {
  ...crud(Item, NAME)
}
