import DB from './index'
import { selectRecord } from './helpers'

const doWalk = direction => character => new Promise(resolve => {
  const x = direction.x + character.x
  const y = direction.y + character.y
  return DB.castles.passable(character.castleId, x, y)
    .then(passable => {
      if (!passable) return resolve(character)

      character.x = x
      character.y = y
      return resolve(character)
    })
})

const doSing = character => new Promise(resolve => {
  if (!character.songs || character.songs.length <= 0) return resolve(character)

  const songId = Math.floor(Math.random() * character.songs.length)
  const song = character.songs[songId]
  messages.push(`${character.name} sings:<br />${song}`)

  return resolve(character)
})

const doNone = character => new Promise(resolve => resolve(character))

const getActionId = character => {
  const actionsCount = character.sing && character.sing.length > 0 ? 5 : 4
  return Math.floor(Math.random() * actionsCount)
}

const getAction = actionId => {
  if (actionId < 4) return doWalk(getDirection(actionId))
  if (actionId === 4) return doSing
  return doNone
}

const randomAction = character => getAction(getActionId(character))(character)

export default {
  onTick: castle => selectRecord({ filter: item => item.moving }, castle.people)
    .then(result => result.map(randomAction))
}
