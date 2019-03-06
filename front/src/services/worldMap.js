import Api from './api'

// const X_OFFSET = 9
// const Y_OFFSET = 4

// const X_MAX_CASTLE = 38
// const Y_MAX_CASTLE = 18

export default {
  // X_OFFSET,
  // Y_OFFSET,
  getLocalMap: (x, y) => Api.get(`/locations/map-${x}-${y}`)
    .then(({ data }) => {
      const {
        location,
        localMap,
        castles,
      } = data
      return {
        location,
        localMap,
        castles,
        cities: [],
      }
    }),
}
