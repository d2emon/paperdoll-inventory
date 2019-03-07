import Api from "./api";

export default {
  fetchCastle: castleId => Api.get(`/castles/${castleId}/`).then(({ data }) => data),
}
