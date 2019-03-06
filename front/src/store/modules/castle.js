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
    /*
    state.people = castle.people.map((item, personId) => ({
      ...item,
      personId
    }))
    */
  },
  movePerson: (state, { personId, x, y }) => {
    const person = state.people[personId]
    state.people[personId] = {
      ...person,
      x,
      y,
    }
  }
}

const actions = {
  fetchCastle: ({ commit, dispatch }, castleId) => {
    if (!castleId) return commit('setCastle', null)

    return castleService
      .fetchCastle(castleId)
      .then(({ castle }) => commit('setCastle', castle))
  },
  movePeople: ({ state, commit }) => {
    if (!state.castle) return

    return castleService
      .movePeople(state.castle.castleId)
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
