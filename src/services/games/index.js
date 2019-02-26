const imageRoot = process.env.BASE_URL + 'games/'

export default {
  fetchGames: () => new Promise((resolve, reject) => {
    const games = require('./data/games.json')
    return resolve({
      games: games.map((game) => ({
        ...game,
        image: `${imageRoot}${game.image}`
      }))
    })
  })
}
