import Api from './api'

export default {
  fetchRaces: () => Api.get('races').then(({ data }) => data),
  fetchSexes: () => Api.get('sexes').then(({ data }) => data),
  fetchClasses: () => Api.get('classes').then(({ data }) => data),

  fetchCharacters: () => Api.get('characters').then(({ data }) => data),
  addCharacter: () => Api.get('character/new').then(({ data }) => data),
  getCharacter: id => Api.get(`character/${id}`).then(({ data }) => data),
  saveCharacter: character => Api.put('characters', { character }).then(({ data }) => data),
}
