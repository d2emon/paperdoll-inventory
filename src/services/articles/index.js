export default {
  fetchArticles: () => new Promise((resolve, reject) => {
    return resolve({
      articles: require('./data/articles.json')
    })
  })
}
