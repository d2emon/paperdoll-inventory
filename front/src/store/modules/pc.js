import pcService from '../../services/pc'
import worldMapService from '@/services/worldMap'
import castleService from '@/services/castles'

const NO_CHARACTERS_ERROR = 'There are no Ultima I characters saved on this disk.'

const state = {
  ready: false,

  characters: [],

  races: [],
  sexes: [],
  classes: [],

  points: 30,

  stats: {},
  race: null,
  sex: null,
  characterClass: null,
  name: '',

  hp: 0,
  food: 0,
  xp: 0,
  coin: 0,

  castleId: 0,
  position: {},

  error: null
}

const getters = {}

const mutations = {
  setError: (state, error) => { state.error = error },

  setCharacters: (state, characters) => { state.characters = characters },

  setRaces: (state, races) => { state.races = races },
  setSexes: (state, sexes) => { state.sexes = sexes },
  setClasses: (state, classes) => { state.classes = classes },

  setCharacter: (state, character) => {
    if (!character) {
      state.ready = false
      return
    }

    state.ready = character.id > 0

    state.name = character.name

    state.stats = {
      strength: character.strength,
      agility: character.agility,
      stamina: character.stamina,
      charisma: character.charisma,
      wisdom: character.wisdom,
      intelligence: character.intelligence
    }

    state.race = character.race
    state.sex = character.sex
    state.characterClass = character.characterClass

    state.hp = character.hp
    state.food = character.food
    state.xp = character.xp
    state.coin = character.coin

    state.position = character.position
  },
  setStat: (state, { stat, value }) => { state.stats[stat] = value },
  setRace: (state, race) => { state.race = race },
  setSex: (state, sex) => { state.sex = sex },
  setClass: (state, characterClass) => { state.characterClass = characterClass },
  setName: (state, name) => { state.name = name },
  setPosition: (state, position) => { state.position = position },

  setCastle: (state, castleId) => { state.castleId = castleId },

  recalcPoints: (state) => {
    state.points = 30
    Object.keys(state.stats).forEach(stat => {
      state.points -= state.stats[stat] - 10
    })
  },

  eatFood: (state) => { state.food -= 0.5 }
}

const actions = {
  fetchRaces: ({ state, commit }) => pcService
    .fetchRaces()
    .then(({ races }) => commit('setRaces', races)),
  fetchSexes: ({ state, commit }) => pcService
    .fetchSexes()
    .then(({ sexes }) => commit('setSexes', sexes)),
  fetchClasses: ({ state, commit }) => pcService
    .fetchClasses()
    .then(({ classes }) => commit('setClasses', classes)),

  createCharacter: ({ commit }) => pcService
    .addCharacter()
    .then(({ character }) => {
      commit('setCharacter', character)
      commit('recalcPoints')
    }),
  fetchCharacters: ({ state, commit }) => pcService
    .fetchCharacters()
    .then(({ characters }) => {
      commit('setCharacters', characters)
      if (characters.length <= 0) throw new Error(NO_CHARACTERS_ERROR)
      commit('setError', null)
    })
    .catch(e => commit('setError', e.message)),
  loadCharacter: ({ state, commit }, characterId) => {
    return pcService
      .getCharacter(characterId)
      .then(({ character }) => commit('setCharacter', character))
  },
  saveCharacter: ({ state }) => {
    return pcService
      .saveCharacter({
        name: state.name,
        ...state.stats,
        race_id: state.race.id,
        sex_id: state.sex.id,
        class_id: state.characterClass.id,
        hp: state.hp,
        food: state.food,
        xp: state.xp,
        coin: state.coin,
        position: state.position
      })
  },
  usePoints: ({ state, commit }, { stat, value }) => {
    const oldValue = state.stats[stat]
    if (value - oldValue > state.points) {
      value = oldValue + state.points
    }
    commit('setStat', { stat, value })
    commit('recalcPoints')
  },
  goDirection: ({ state, dispatch }, directionId) => {
    if (directionId === 'North') return dispatch('goBy', { x: 0, y: -1 })
    if (directionId === 'East') return dispatch('goBy', { x: 1, y: 0 })
    if (directionId === 'South') return dispatch('goBy', { x: 0, y: 1 })
    if (directionId === 'West') return dispatch('goBy', { x: -1, y: 0 })
  },
  goBy: ({ state, commit }, position) => {
    const x = (state.position.x || 0) + position.x
    const y = (state.position.y || 0) + position.y

    const canGo = state.castleId
      ? castleService.canGo(state.castleId, x, y)
      : worldMapService.canGo(x, y)

    return canGo.then(result => {
        if (!result) return false

        commit('setPosition', { x, y })
        commit('eatFood')
        return true
      })
  },
  enterCastle: ({ commit, dispatch }, castle) => {
    if (!castle) return

    commit('setCastle', castle.castleId)
    commit('setPosition', castle.entrance)
  },
  exitCastle: ({ commit }, castle) => {
    commit('setCastle', null)

    if (!castle) return
    commit('setPosition', { x: castle.x, y: castle.y })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
