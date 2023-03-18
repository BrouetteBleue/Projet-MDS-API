module.exports = (server) => {
    const tableTipController = require("../controllers/tableTipController");

    server.route("/tabletips")
    .get(tableTipController.list_all_tableTips)
    .post(tableTipController.create_a_tableTip);

}