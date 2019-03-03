import RACES from "./races";
import SEXES from "./sexes";
import CLASSES from "./classes";

const player = {
  id: 1,
  name: 'Kikoskia',

  strength: 25,
  agility: 20,
  stamina: 15,
  charisma: 10,
  wisdom: 10,
  intelligence: 10,

  race: RACES[0],
  sex: SEXES[0],
  characterClass: CLASSES[0],

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
