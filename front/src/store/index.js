import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    drawer: false,
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  }
})
