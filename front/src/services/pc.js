import Api from './api'

const makeForm = params => {
  const data = new FormData()
  if (params)
    Object.keys(params).forEach(param => data.append(param, params[param]))
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

  doAction: (id, action, params) => Api.post(`/characters/${id}/do/${action}/`, makeForm(params))
    .then(({ data }) => data)
}
