import {
  fill,
  addRecord,
  parseMap
} from '../helpers'
import init from './citiesData'
import locations from './locations'
import characters from '../characters'

const DATA = []
const Item = ({
  cityMap,
  charactersData,
  ...record
}) => addRecord({
  name: '',
  locations: parseMap(cityMap, (x, y, tileId) => locations.addItem({
    cityId: DATA.length + 1,
    x,
    y,
    tileId
  })),
  characters: charactersData.map(character => characters.addItem({
    cityId: DATA.length + 1,
    ...character
  })),
  ...record
}, DATA)

(function () { fill(Item, init) }())

export default Item
