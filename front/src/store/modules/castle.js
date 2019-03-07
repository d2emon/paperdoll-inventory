import castleService from '@/services/castles'
import { getDirection } from '@/helpers/directions'

const state = {
  locations: [],
  people: [],
  castle: null,
}

const getters = {}

const mutations = {
  setCastle: (state, castle) => {
    state.castle = castle

    if (!castle) {
      state.locations = []
      state.people = []
      return
    }

    state.locations = castle.locations.map(item => ({
      ...item,
      imageId: item.location_type.image_id
    }))
    if (castle.characters) {
      state.people = castle.characters.map((item, personId) => ({
        ...item,
        personId
      }))
    }
  }
}

const actions = {
  fetchCastle: ({ commit, dispatch }, castleId) => castleService.fetchCastle(castleId)
    .then(({ castle }) => commit('setCastle', castle))
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
