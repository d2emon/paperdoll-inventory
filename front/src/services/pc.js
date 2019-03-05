import Api from './api'

export default {
  fetchRaces: () => Api.get('/character/races/').then(({ data }) => data),
  fetchSexes: () => Api.get('/character/sexes/').then(({ data }) => data),
  fetchClasses: () => Api.get('/character/classes/').then(({ data }) => data),

  fetchCharacters: () => Api.get('/character/').then(({ data }) => data),
  saveCharacter: character => Api.put('/character/', { character }).then(({ data }) => data),

  addCharacter: () => Api.get('/character/add/').then(({ data }) => data),
  getCharacter: id => Api.get(`/character/${id}/`).then(({ data }) => data),
}
