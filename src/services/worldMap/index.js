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
const CASTLES = [
  {
    x: 9,
    y: 4,
    name: 'The Castle of Lord British'
  },
  {
    x: 8,
    y: 5,
    name: ''
  }
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

const castleAt = (x, y) => {
  const castles = CASTLES.filter(item => {
    if (item.x !== x) return false
    if (item.y !== y) return false

    return true
  })

  return castles.length > 0 ? castles[0] : null
}

const location = (x, y, locationType) => ({
  x,
  y,
  locationType,
  castle: castleAt(x, y)
})

export default {
  X_OFFSET,
  Y_OFFSET,
  X_MAX,
  Y_MAX,
  getLocalMap: (playerX, playerY) => new Promise((resolve) => {
    const castles = CASTLES.filter(item => {
      if (item.x < playerX - X_OFFSET) return false
      if (item.x > playerX + X_OFFSET + 1) return false

      if (item.y < playerY - Y_OFFSET) return false
      if (item.y > playerY + Y_OFFSET + 1) return false

      return true
    })
    const localMap = []
    const minY = Math.max(0, playerY - Y_OFFSET)
    const maxY = Math.min(WORLD_MAP.length, playerY + Y_OFFSET + 1)
    WORLD_MAP.slice(minY, maxY).forEach((row, j) => {
      const minX = Math.max(0, playerX - X_OFFSET)
      const maxX = Math.min(row.length, playerX + X_OFFSET + 1)
      row.slice(minX, maxX).forEach((locationType, i) => {
        localMap.push(location(i + minX, j + minY, locationType))
      })
    })
    resolve({
      localMap,
      castles
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
  getLocation: (x, y) => new Promise((resolve) => resolve({ location: location(x, y, WORLD_MAP[y][x]) }))
}
