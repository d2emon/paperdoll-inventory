const NO_CHARACTERS_ERROR = 'There are no Ultima I characters saved on this disk.'
const RACES = [
  { id: 'a', name: 'Human' },
  { id: 'b', name: 'Elf' },
  { id: 'c', name: 'Dwarf' },
  { id: 'd', name: 'Bobbit' }
]
const SEXES = [
  { id: 'a', name: 'Male' },
  { id: 'b', name: 'Female' }
]
const CLASSES = [
  { id: 'a', name: 'Fighter' },
  { id: 'b', name: 'Cleric' },
  { id: 'c', name: 'Wizard' },
  { id: 'd', name: 'Thief' }
]

const player = {
  character_id: 1,
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

  location: { x: 10, y: 5 }
}

const saved = [
  player
]

export default {
  fetchRaces: () => new Promise((resolve) => resolve({ races: RACES })),

  fetchSexes: () => new Promise((resolve) => resolve({ sexes: SEXES })),

  fetchClasses: () => new Promise((resolve) => resolve({ classes: CLASSES })),

  fetchCharacters: () => new Promise((resolve) => {
    if (saved.length <= 0) throw Error(NO_CHARACTERS_ERROR)

    resolve({ characters: saved.slice(Math.max(0, saved.length - 4)) })
  }),

  addCharacter: () => new Promise((resolve) => resolve({
    character: {
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

      location: { x: 10, y: 5 }
    }
  })),

  getCharacter: (characterId) => new Promise((resolve) => resolve({ character: saved[characterId - 1] })),

  saveCharacter: (character) => new Promise((resolve) => {
    character.character_id = saved.length + 1
    saved.push(character)
    resolve({ character_id: character.character_id })
  })
}