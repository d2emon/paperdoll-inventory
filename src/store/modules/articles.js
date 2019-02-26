import articlesService from '../../services/articles'

const state = {
  articles: []
}

const getters = {
  categories: (state) => {
    const categories = []

    for (const article of state.articles) {
      if (
        !article.category ||
        categories.find(category => category.text === article.category)
      ) continue

      categories.push({
        text: article.category,
        to: `/category/${article.category}`
      })
    }

    return categories.sort().slice(0, 4)
  }
}

const mutations = {
  setArticles: (state, articles) => { state.articles = articles }
}

const actions = {
  fetchArticles: ({ commit }) => {
    articlesService
      .fetchArticles()
      .then(({ articles }) => commit('setArticles', articles))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
