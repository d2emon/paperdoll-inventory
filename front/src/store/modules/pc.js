import pcService from '@/services/pc'

const NO_CHARACTERS_ERROR = 'There are no Ultima I characters saved on this disk.'

const state = {
  characters: [],

  characterId: null,

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
  nesw: {},
  transactables: [],

  weapons: [],
  activeWeapon: 0,

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
      state.characterId = null
      return
    }

    state.ready = character.id > 0

    state.characterId = character.id
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

    state.position = {
      x: character.x,
      y: character.y
    }

    state.castleId = character.castle_id
    state.nesw = character.nesw
    state.transactables = character.transactables

    state.weapons = character.weapons
    state.activeWeapon = character.active_weapon
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
  }
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
        x: state.position.x,
        y: state.position.y,
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

  doAction: ({ state, dispatch }, { action, params }) => pcService
    .doAction(state.characterId, action, params)
    .then(() => dispatch('loadCharacter', state.characterId))
    .then(() => { if (state.castleId) return dispatch('castle/fetchCastle', state.castleId, { root: true }) })
    .then(() => Promise.all([
      dispatch('gameConsole/receiveMessages', state.characterId, { root: true }),
      dispatch('view/fetchView', state.position, { root: true }),
    ])),
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
