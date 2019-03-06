// import DB from './db'
// import actions from './db/actions'

import Api from "./api";

export default {
  fetchCastle: castleId => Api.get(`/castles/${castleId}/`).then(({ data }) => data),
  /*
  getCastleAt: (x, y) => DB.castles.selectItem({ location: { x, y } }),
  getCastlesIn: (x0, x1, y0, y1) => DB.castles.selectItems({ rect: { x0, x1, y0, y1 } }),

  canGo: (id, x, y) => DB.castles.canGo(id, x, y),
  movePeople: castleId => DB.castles.getItem(castleId)
    .then(castle => {
      actions.onTick(castle)
      return castle
    })
  */
}
