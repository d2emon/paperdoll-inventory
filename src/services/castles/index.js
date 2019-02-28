import { CASTLES } from './data/castleMap'
import { getDirection } from '@/helpers/directions'

const messages = []

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
  ...data,
})

const performAction = (person, castleId) => {
  const actionsCount = person.sing && person.sing.length > 0
    ? 5
    : 4
  const actionId = Math.floor(Math.random() * actionsCount)

  if (actionId < 4) {
    const direction = getDirection(actionId)
    const x = direction.x + person.x
    const y = direction.y + person.y
    if (!canGo(castleId, x, y)) return;

    person.x = x
    person.y = y
    return person
  }

  if (actionId == 4) {
    if (!person.sing || person.sing.length <= 0) return person

    const songId = Math.floor(Math.random() * person.sing.length)
    const song = person.sing[songId]
    messages.push(`${person.name} sings:<br />${song}`)

    return person
  }
}

const castle = ({ castleMap, people, ...data }) => {
  return {
    ...data,
    localMap: getCastleMap(castleMap),
    people: people ? people.map(npc) : [],
    entrance: { x: 0, y: 9 }
  }
}

const canGo = (castleId, x, y) => {
  const item = CASTLES[castleId - 1]
  if (!item) return false

  const location = item.castleMap[y][x]
  if (location === 1) return false
  if (location === 2) return false
  if (location === 3) return false

  const collisions = item.people.filter(person => person.x === x && person.y === y)
  if (collisions.length > 0) return false

  return true
}

export default {
  getCastleAt: (x, y) => new Promise(resolve => {
    const castles = CASTLES.filter(item => {
      if (item.x !== x) return false
      if (item.y !== y) return false

      return true
    })

    return resolve({ castle: castles.length > 0 ? castle(castles[0]) : null })
  }),
  getCastlesIn: (x0, x1, y0, y1) => new Promise(resolve => resolve({
    castles: CASTLES
      .filter(item => {
        if (item.x < x0 || item.x > x1) return false
        if (item.y < y0 || item.y > y1) return false

        return true
      })
      .map(castle)
  })),
  fetchCastle: castleId => new Promise(resolve => resolve({ castle: castle(CASTLES[castleId - 1]) })),
  canGo: (castleId, x, y) => new Promise((resolve) => resolve(canGo(castleId, x, y))),
  movePeople: castleId => new Promise(resolve => {
    CASTLES[castleId - 1].people
      .filter(item => item.moving)
      .forEach(item => performAction(item, castleId))
    resolve({ castle: castle(CASTLES[castleId - 1]) })
  })
}
