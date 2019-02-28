import pcService from '../../services/pc'
import worldMapService from '@/services/worldMap'

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

    state.ready = character.character_id > 0

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

  recalcPoints: (state) => {
    state.points = 30
    Object.keys(state.stats).forEach(stat => {
      state.points -= state.stats[stat] - 10
    })
  },

  eatFood: (state) => { state.food -= 0.5 }
}

const actions = {
  fetchRaces: ({ state, commit }) => {
    return pcService
      .fetchRaces()
      .then(({ races }) => commit('setRaces', races))
  },
  fetchSexes: ({ state, commit }) => {
    return pcService
      .fetchSexes()
      .then(({ sexes }) => commit('setSexes', sexes))
  },
  fetchClasses: ({ state, commit }) => {
    return pcService
      .fetchClasses()
      .then(({ classes }) => commit('setClasses', classes))
  },

  createCharacter: ({ commit }) => {
    return pcService
      .addCharacter()
      .then(({ character }) => {
        commit('setCharacter', character)
        commit('recalcPoints')
      })
  },
  fetchCharacters: ({ state, commit }) => {
    return pcService
      .fetchCharacters()
      .then(({ characters }) => commit('setCharacters', characters))
      .catch(e => commit('setError', e.message))
  },
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
        race: state.race,
        sex: state.sex,
        characterClass: state.characterClass,
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
    if (directionId === 0) return dispatch('goBy', { x: 0, y: -1 })
    if (directionId === 1) return dispatch('goBy', { x: 1, y: 0 })
    if (directionId === 2) return dispatch('goBy', { x: 0, y: 1 })
    if (directionId === 3) return dispatch('goBy', { x: -1, y: 0 })
  },
  goBy: ({ state, commit }, position) => {
    const x = (state.position.x || 0) + position.x
    const y = (state.position.y || 0) + position.y
    return worldMapService
      .canGo(x, y)
      .then(canGo => {
        if (!canGo) return false

        commit('setPosition', { x, y })
        commit('eatFood')
        return true
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
