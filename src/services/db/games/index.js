import {
  crud,
  fill,
  addRecord,
  parseMap
} from '../helpers'

const IMAGE_ROOT = process.env.BASE_URL + 'games/'
const DATA = []
const Item = ({
  image,
  ...record
}) => addRecord({
  image: `${IMAGE_ROOT}${image}`,
  ...record
}, DATA)

(function () { fill(Item, require('./gamesData.json')) }())

export default {
  ...crud(Item, 'game', DATA),
}
