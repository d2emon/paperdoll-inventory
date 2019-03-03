export default {
  fetchArticles: () => new Promise(resolve => resolve({
    articles: require('./data/articles.json')
  }))
}
