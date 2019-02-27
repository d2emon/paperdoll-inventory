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
    return worldMapService
      .getLocalMap(0, 0)
      .then(({ localMap }) => {
        commit('setView', localMap.map((row) => {
          return row.map(item => {
            if (item === 0) return { image: require('@/assets/ultima/grass.png') }
            if (item === 1) return { image: require('@/assets/ultima/water.png') }
            if (item === 2) return { image: require('@/assets/ultima/trees.png') }
            if (item === 3) return { image: require('@/assets/ultima/castle.png') }
            return { image_id: item + 1 }
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
