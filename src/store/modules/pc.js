import pcService from '../../services/pc'

const state = {
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
  },
  setStat: (state, { stat, value }) => { state.stats[stat] = value },
  setRace: (state, race) => { state.race = race },
  setSex: (state, sex) => { state.sex = sex },
  setClass: (state, characterClass) => { state.characterClass = characterClass },
  setName: (state, name) => { state.name = name },

  recalcPoints: (state) => {
    state.points = 30
    Object.keys(state.stats).forEach(stat => {
      state.points -= state.stats[stat] - 10
    })
  }
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
  loadCharacter: ({ state, commit }) => {
    return pcService
      .fetchCharacters()
      .then(({ characters }) => commit('setCharacters', characters))
      .catch(e => commit('setError', e.message))
  },
  usePoints: ({ state, commit }, { stat, value }) => {
    const oldValue = state.stats[stat]
    if (value - oldValue > state.points) {
      value = oldValue + state.points
    }
    commit('setStat', { stat, value })
    commit('recalcPoints')
  },
  save: ({ state }) => {
    const {
      name,
      stats,
      race,
      sex,
      characterClass
    } = state
    alert(JSON.stringify({
      name,
      stats,
      race_id: race.id,
      sex: sex.id,
      characterClass: characterClass.id
    }))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
