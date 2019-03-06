import worldMapService from '@/services/worldMap'

const state = {
  localMap: [],
  castles: [],
  cities: [],
  location: null,
  castle: null
}

const getters = {}

const mutations = {
  setLocation: (state, location) => { state.location = location },
  setCastle: (state, castle) => { state.castle = castle },
  setLocal: (state, { x, y, localMap }) => {
    state.localMap = localMap.map(item => ({
      ...item,
      x: item.x - x,
      y: item.y - y
    }))
  },
  setCastles: (state, { x, y, castles }) => {
    state.castles = castles.map(item => ({
      ...item,
      x: item.x - x,
      y: item.y - y
    }))
  },
  setCities: (state, { x, y, cities }) => {
    state.cities = cities.map(item => ({
      ...item,
      x: item.x - x,
      y: item.y - y
    }))
  }
}

const actions = {
  fetchView: ({ state, commit }, { x, y }) => {
    return worldMapService
      .getLocalMap(x, y)
      .then(({
        localMap,
        castles,
        cities,

        location,
        castle,
      }) => {
        commit('setLocal', { x, y, localMap })
        commit('setCastles', { x, y, castles })
        commit('setCities', { x, y, cities })
        commit('setLocation', location)
        commit('setCastle', castle)
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
