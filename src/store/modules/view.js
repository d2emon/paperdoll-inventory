import worldMapService from '@/services/worldMap'

const state = {
  localMap: []
}

const getters = {}

const mutations = {
  setView: (state, view) => { state.localMap = view }
}

const actions = {
  fetchView: ({ state, commit }, { x, y }) => {
    return worldMapService
      .getLocalMap(x, y)
      .then(({ localMap }) => {
        commit('setView', localMap.map(item => {
          return {
            ...item,
            x: item.x + worldMapService.X_OFFSET - x,
            y: item.y + worldMapService.Y_OFFSET - y
          }
        }))
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
