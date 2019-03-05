import Api from './api'
import castles from './castles'

const WORLD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1, 1, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// const GRASS = 0
const WATER = 1
const TREES = 2
const MOUNTAINS = 3
// const CASTLE = 4

const X_OFFSET = 9
const Y_OFFSET = 4

const X_MAX = 255
const Y_MAX = 255

const X_MAX_CASTLE = 38
const Y_MAX_CASTLE = 18

/*
const location = (x, y, locationType) => castles
  .getCastleAt(x, y)
  .then(({ castle }) => ({
    x,
    y,
    locationType,
    castle
  }))
*/

export default {
  X_OFFSET,
  Y_OFFSET,
  X_MAX,
  Y_MAX,
  getLocalMap: (x, y) => Api.get(`/map-${x}-${y}`)
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
  canGo: (x, y) => new Promise((resolve) => {
    if (x < 0) return resolve(false)
    if (x > X_MAX) return resolve(false)

    if (y < 0) return resolve(false)
    if (y > Y_MAX) return resolve(false)

    const location = WORLD_MAP[y][x]
    if (location === WATER) return resolve(false)
    if (location === TREES) return resolve(false)
    if (location === MOUNTAINS) return resolve(false)

    return resolve(true)
  }),
  // getLocation: (x, y) => location(x, y, WORLD_MAP[y][x]).then(location => ({ location }))
}
