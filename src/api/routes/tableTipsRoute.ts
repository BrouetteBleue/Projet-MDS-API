module.exports = (server) => {
    const tableTipController = require("../controllers/tableTipController");

    server.route("/tabletips")
    .get(tableTipController.findAll)
    .post(tableTipController.create)

    server.route("/tabletip/:id")
    .get(tableTipController.findOne)
    .put(tableTipController.update)
    .delete(tableTipController.delete)

}