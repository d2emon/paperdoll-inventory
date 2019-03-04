import RACES from "./racesData.json";
import SEXES from "./sexesData.json";
import CLASSES from "./classesData.json";

const prepare = items => {
  const data = []
  Object.keys(items)
    .forEach(id => {
      data[id] = { id, ...items[id] }
    })
  return data
}

const player = {
  id: 1,
  name: 'Kikoskia',

  strength: 25,
  agility: 20,
  stamina: 15,
  charisma: 10,
  wisdom: 10,
  intelligence: 10,

  race: prepare(RACES)['a'],
  sex: prepare(SEXES)['a'],
  characterClass: prepare(CLASSES)['a'],

  hp: 150,
  food: 200,
  xp: 0,
  coin: 100,

  position: {
    x: 9, // START_X,
    y: 4 // START_Y
  }
}

export default [
  player,
]
