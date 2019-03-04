import {
  crud,
  fill
} from '../helpers'

const IMAGE_ROOT = process.env.BASE_URL + 'games/'
const DATA = []
const Item = ({ image, ...record }) => ({
  image: `${IMAGE_ROOT}${image}`,
  ...record
})

fill(require('./gamesData.json'), Item, DATA)
// (function () { fill(require('./gamesData.json'), Item, DATA) }())

export default {
  ...crud(Item, 'game', DATA),
}
