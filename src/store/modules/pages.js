const state = {
  pages: [
    {
      text: 'Главная',
      to: '/',
      action: 'mdi-home'
    },
    {
      text: 'Блог',
      to: '/blog',
      action: 'mdi-home'
    },
    {
      text: 'About',
      href: '#about',
      action: 'mdi-home'
    }
  ]
}

const getters = {}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
