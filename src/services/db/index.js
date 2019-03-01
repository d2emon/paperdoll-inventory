import {
  fill,
  crud,
  addRecord,
  parseMap
} from '../helpers'
import castles from './castles'
import Character from './characters'
import City from './cities'

export default {
  castles,
  characters: crud(Character, 'character', []),
  cities: crud(City, 'city', []),

  locations: [],
  messages: [],
}
