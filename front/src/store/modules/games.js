import gamesService from '../../services/games';

const state = {
  games: []
};

const getters = {};

const mutations = {
  setGames: (state, games) => { state.games = games }
};

const actions = {
  fetchGames: ({ commit }) => {
    gamesService
      .fetchGames()
      .then(({ games }) => commit('setGames', games));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
