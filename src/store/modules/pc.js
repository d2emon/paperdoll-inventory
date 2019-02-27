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
  fetchCharacters: ({ state, commit }) => {
    return pcService
      .fetchCharacters()
      .then(({ characters }) => commit('setCharacters', characters))
      .catch(e => commit('setError', e.message))
  },
  loadCharacter: ({ state, commit }, characterId) => {
    console.log(characterId)
    return pcService
      .getCharacter(characterId)
      .then(({ character }) => commit('setCharacter', character))
  },
  saveCharacter: ({ state }) => {
    const {
      name,
      stats,
      race,
      sex,
      characterClass
    } = state
    return pcService
      .saveCharacter({
        name,
        ...stats,
        race,
        sex,
        characterClass
      })
  },
  usePoints: ({ state, commit }, { stat, value }) => {
    const oldValue = state.stats[stat]
    if (value - oldValue > state.points) {
      value = oldValue + state.points
    }
    commit('setStat', { stat, value })
    commit('recalcPoints')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
