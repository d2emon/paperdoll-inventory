import { CASTLES } from './data/castleMap'

const getCastleMap = castleMap => {
  if (!castleMap) return []

  const items = []
  castleMap.forEach((row, y) => {
    row.forEach((locationType, x) => {
      items.push({
        x,
        y,
        locationType
      })
    })
  })
  return items
}

const npc = ({ ...data }) => ({
  ...data
})

const castle = ({ castleMap, people, ...data }) => {
  return {
    ...data,
    localMap: getCastleMap(castleMap),
    people: people ? people.map(npc) : [],
    entrance: { x: 0, y: 9 }
  }
}

export default {
  getCastleAt: (x, y) => {
    const castles = CASTLES.filter(item => {
      if (item.x !== x) return false
      if (item.y !== y) return false

      return true
    })

    return castles.length > 0 ? castle(castles[0]) : null
  },
  getCastlesIn: (x0, x1, y0, y1) => CASTLES
    .filter(item => {
      if (item.x < x0 || item.x > x1) return false
      if (item.y < y0 || item.y > y1) return false

      return true
    })
    .map(castle),
  fetchCastle: castleId => new Promise(resolve => resolve({ castle: castle(CASTLES[castleId - 1]) }))
}
