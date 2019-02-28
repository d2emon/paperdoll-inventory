import worldMapService from '@/services/worldMap'

const state = {
  localMap: [],
  castles: [],
  location: {}
}

const getters = {}

const mutations = {
  setLocal: (state, { x, y, localMap, castles }) => {
    state.localMap = localMap.map(item => ({
      ...item,
      x: item.x + worldMapService.X_OFFSET - x,
      y: item.y + worldMapService.Y_OFFSET - y
    }))
    state.castles = castles.map(item => ({
      ...item,
      x: item.x + worldMapService.X_OFFSET - x,
      y: item.y + worldMapService.Y_OFFSET - y
    }))
  },
  setLocation: (state, location) => { state.location = location }
}

const actions = {
  fetchView: ({ state, commit }, { x, y }) => {
    return worldMapService
      .getLocalMap(x, y)
      .then(({ localMap, castles }) => {
        commit('setLocal', { x, y, localMap, castles })
        return worldMapService.getLocation(x, y)
      })
      .then(({ location }) => commit('setLocation', location))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
