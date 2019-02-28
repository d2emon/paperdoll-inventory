import worldMapService from '@/services/worldMap'
import castleService from '@/services/castles'

const state = {
  localMap: [],
  people: [],
  castle: null,
}

const getters = {}

const mutations = {
  setCastle: (state, castle) => {
    state.castle = castle

    if (!castle) {
      state.localMap = []
      state.people = []
      return
    }

    state.localMap = castle.localMap.map(item => ({
      ...item
    }))
    state.people = castle.people.map(item => ({
      ...item
    }))
  }
}

const actions = {
  fetchCastle: ({ commit, dispatch }, castleId) => {
    if (!castleId) return commit('setCastle', null)

    return castleService
      .fetchCastle(castleId)
      .then(({ castle }) => commit('setCastle', castle))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
