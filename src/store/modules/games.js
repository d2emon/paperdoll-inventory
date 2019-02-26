const imageRoot = process.env.BASE_URL + 'games/';

const state = {
  games: [
    {
      title: 'Dungeon Master',
      link: '/dungeon-master',
      image: `${imageRoot}ultima.jpg`
    },
    {
      title: 'Ultima',
      link: '/ultima',
      image: `${imageRoot}ultima.jpg`
    },
  ]
};

const getters = {};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
