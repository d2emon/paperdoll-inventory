import DB from './db'

export default {
  fetchRaces: DB.saved.fetchRaces,
  fetchSexes: DB.saved.fetchSexes,
  fetchClasses: DB.saved.fetchClasses,

  fetchCharacters: DB.saved.fetchSaved,
  addCharacter: () => DB.saved.addItem({}),
  getCharacter: DB.saved.getItem,
  saveCharacter: DB.saved.saveCharacter,
}
