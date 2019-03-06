import Api from './api'

const makeForm = direction => {
  const data = new FormData()
  data.append('direction', direction)
  return data
}

export default {
  fetchRaces: () => Api.get('/characters/races/').then(({ data }) => data),
  fetchSexes: () => Api.get('/characters/sexes/').then(({ data }) => data),
  fetchClasses: () => Api.get('/characters/classes/').then(({ data }) => data),

  fetchCharacters: () => Api.get('/characters/').then(({ data }) => data),
  saveCharacter: character => Api.put('/characters/', { character })
    .then(({ data }) => data),

  addCharacter: () => Api.get('/characters/add/').then(({ data }) => data),
  getCharacter: id => Api.get(`/characters/${id}/`).then(({ data }) => data),

  moveCharacter: (id, direction) => Api.post(`/characters/${id}/go/`, makeForm(direction))
    .then(({ data }) => data)
}
