const state = {
  articles: [],  // require('@/data/articles.json')
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
};

const getters = {
  categories: (state) => {
    const categories = [];

    for (const article of state.articles) {
      if (
        !article.category ||
        categories.find(category => category.text === article.category)
      ) continue;

      categories.push({
        text: article.category,
        to: `/category/${text}`
      })
    }

    return categories.sort().slice(0, 4)
  },
  links: (state, getters) => state.pages.concat(getters.categories)
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
