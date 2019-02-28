import castles from '../castles'

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

const location = (x, y, locationType) => ({
  x,
  y,
  locationType,
  castle: castles.getCastleAt(x, y)
})

export default {
  X_OFFSET,
  Y_OFFSET,
  X_MAX,
  Y_MAX,
  getLocalMap: (playerX, playerY) => new Promise((resolve) => {
    const x0 = playerX - X_OFFSET
    const x1 = playerX + X_OFFSET + 1
    const y0 = playerY - Y_OFFSET
    const y1 = playerY + Y_OFFSET + 1
    const localMap = []
    const minY = Math.max(0, y0)
    const maxY = Math.min(WORLD_MAP.length, y1)
    WORLD_MAP.slice(minY, maxY).forEach((row, j) => {
      const minX = Math.max(0, x0)
      const maxX = Math.min(row.length, x1)
      row.slice(minX, maxX).forEach((locationType, i) => {
        localMap.push(location(i + minX, j + minY, locationType))
      })
    })
    resolve({
      localMap,
      castles: castles.getCastlesIn(x0, x1, y0, y1)
    })
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
  getLocation: (x, y) => new Promise(resolve => resolve({ location: location(x, y, WORLD_MAP[y][x]) }))
}
