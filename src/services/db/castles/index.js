import {
  crud,
  fill,
  addRecord,
  getRecord,
  selectRecord,
  parseMap
} from '../helpers'
import init from './castlesData'
import locations from './locations'
import characters from '../characters'

const DATA = []
const Item = ({
  castleMap,
  charactersData,
  ...record
}) => addRecord({
  name: '',
  entrance: {
    x: 0,
    y: 9
  },
  locations: parseMap(castleMap, (x, y, tileId) => locations.addItem({
    castleId: DATA.length + 1,
    x,
    y,
    tileId
  })),
  characters: charactersData.map(character => characters.addItem({
    castleId: DATA.length + 1,
    ...character
  })),
  ...record
}, DATA)

const passable = (castle, location) => new Promise(resolve => Promise.all([
    selectRecord({ location }, castle.locations),
    selectRecord({ location }, castle.characters)
  ])
    .then(([
      location,
      character
    ]) => {
      if (location && !location.passable) return false
      if (character) return false
      return true
    })

(function () { fill(Item, init) }())

export default {
  ...crud(Item, 'castle', DATA),
  passable: (id, x, y) => passable(getRecord(id, DATA), { x, y })
}
