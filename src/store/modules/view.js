import worldMapService from '@/services/worldMap'

const state = {
  localMap: []
}

const getters = {}

const mutations = {
  setView: (state, view) => { state.localMap = view }
}

const actions = {
  fetchView: ({ state, commit }) => {
    const getImage = (locationType) => {
      if (locationType === 0) return require('@/assets/ultima/grass.png')
      if (locationType === 1) return require('@/assets/ultima/water.png')
      if (locationType === 2) return require('@/assets/ultima/trees.png')
      if (locationType === 3) return require('@/assets/ultima/castle.png')
    }

    return worldMapService
      .getLocalMap(0, 0)
      .then(({ localMap }) => {
        commit('setView', localMap.map((row) => {
          return row.map(item => {
            return {
              ...item,
              image: getImage(item.locationType)
            }
          })
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
