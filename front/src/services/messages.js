import Api from './api'

export default {
  fetchMessages: playerId => Api.get(`messages/${playerId}/`).then(({ data }) => data),
  addMessage: (playerId, message) => Api.put(`messages/${playerId}/`, { message }).then(({ data }) => data)
}
