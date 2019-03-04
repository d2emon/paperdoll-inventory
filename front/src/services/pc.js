import DB from './db'
import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export default {
  fetchRaces: () => Axios.get('races')
    .then(({ data }) => data),
  fetchSexes: () => Axios.get('sexes')
    .then(({ data }) => data),
  fetchClasses: () => Axios.get('classes')
    .then(({ data }) => data),

  fetchCharacters: () => Axios.get('characters')
    .then(({ data }) => data),
  addCharacter: () => Axios.get('character/new')
    .then(({ data }) => data),
  getCharacter: id => Axios.get('character', { params: { id } })
    .then(({ data }) => data),
  saveCharacter: (character) => Axios.put('characters', { character })
    .then(({ data }) => data),
}
