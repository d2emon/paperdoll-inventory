import DB from './db'

export default {
  fetchGames: () => DB.games.selectItems({})
}
