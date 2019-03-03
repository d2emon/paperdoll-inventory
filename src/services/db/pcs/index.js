import {
  crud,
  addRecord,
  fill
} from '../helpers'

import RACES from "../pcs/races";
import SEXES from "../pcs/sexes";
import CLASSES from "../pcs/classes";
import init from "../pcs/savedData";

const NO_CHARACTERS_ERROR = 'There are no Ultima I characters saved on this disk.'
const START_X = 18
const START_Y = 6

const DATA = {}
const Item = (record) => ({
  name: '',

  strength: 10,
  agility: 10,
  stamina: 10,
  charisma: 10,
  wisdom: 10,
  intelligence: 10,

  race: null,
  sex: null,
  characterClass: null,

  hp: 150,
  food: 200,
  xp: 0,
  coin: 100,

  position: {
    x: START_X,
    y: START_Y
  },

  ...record
})

fill(init, Item, DATA);
// (function () { fill(init, Item, DATA); }())

export default {
  ...crud(Item, 'character', DATA),

  fetchRaces: () => new Promise(resolve => resolve({ races: RACES })),
  fetchSexes: () => new Promise(resolve => resolve({ sexes: SEXES })),
  fetchClasses: () => new Promise(resolve => resolve({ classes: CLASSES })),

  fetchSaved: () => new Promise((resolve) => {
    if (Object.keys(DATA).length <= 0)
      throw new Error(NO_CHARACTERS_ERROR)

    const keys = Object.keys(DATA).slice(Math.max(0, DATA.length - 4))
    resolve({ characters: keys.map(id => DATA[id]) })
  }),
  saveCharacter: character => new Promise((resolve) => {
    const item = addRecord(character, DATA)
    console.log(character, item)
    resolve({ character_id: item.character_id })
  })
}
