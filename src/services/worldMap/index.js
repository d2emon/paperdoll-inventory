const WORLD_MAP = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 3, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 1, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const X_OFFSET = 9
const Y_OFFSET = 4

const X_MAX = 255
const Y_MAX = 255

export default {
  X_OFFSET,
  Y_OFFSET,
  X_MAX,
  Y_MAX,
  getLocalMap: (playerX, playerY) => new Promise((resolve) => {
    const localMap = []
    const minY = Math.max(0, playerY - Y_OFFSET)
    const maxY = Math.min(WORLD_MAP.length, playerY + Y_OFFSET + 1)
    WORLD_MAP.slice(minY, maxY).forEach((row, y) => {
      const minX = Math.max(0, playerX - X_OFFSET)
      const maxX = Math.min(row.length, playerX + X_OFFSET + 1)
      return row.slice(minX, maxX).forEach((locationType, x) => {
        localMap.push({
          x: x + minX,
          y: y + minY,
          locationType
        })
      })
    })
    resolve({ localMap })
  })
}
