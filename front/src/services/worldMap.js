import Api from './api'

// const X_MAX_CASTLE = 38
// const Y_MAX_CASTLE = 18

export default {
  getLocalMap: (x, y) => Api.get(`/locations/map-${x}-${y}`)
    .then(({ data }) => data),
}
