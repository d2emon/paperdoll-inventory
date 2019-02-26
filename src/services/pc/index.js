const NO_CHARACTERS_ERROR = 'There are no Ultima I characters saved on this disk.'
const RACES = [
  { id: 'a', name: 'Human' },
  { id: 'b', name: 'Elf' },
  { id: 'c', name: 'Dwarf' },
  { id: 'd', name: 'Bobbit' }
]
const SEXES = [
  { id: 'a', name: 'Male' },
  { id: 'b', name: 'Female' },
]
const CLASSES = [
  { id: 'a', name: 'Fighter' },
  { id: 'b', name: 'Cleric' },
  { id: 'c', name: 'Wizard' },
  { id: 'd', name: 'Thief' }
]

// const saved = []

export default {
  fetchCharacters: () => new Promise((resolve) => {
    throw Error(NO_CHARACTERS_ERROR)
  }),

  addCharacter: () => new Promise((resolve) => resolve({
    character: {
      strength: 10,
      agility: 10,
      stamina: 10,
      charisma: 10,
      wisdom: 10,
      intelligence: 10,

      race: null,
      sex: null
    }
  })),

  fetchRaces: () => new Promise((resolve) => resolve({ races: RACES })),

  fetchSexes: () => new Promise((resolve) => resolve({ sexes: SEXES })),

  fetchClasses: () => new Promise((resolve) => resolve({ races: CLASSES }))
}
