import Api from './api'

export default {
  getLocalMap: (x, y) => Api.get(`/locations/map-${x}-${y}`)
    .then(({ data }) => data),
}
