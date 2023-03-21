module.exports = (server) => {
    const statsController = require("../controllers/statsController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/stats/sumtips")
    .get(jwtMiddleware.verifyToken,statsController.getSumTips)

    server.route("/stats/sumtips/:month")
    .get(jwtMiddleware.verifyToken,statsController.getSumTipsByMonth)

    server.route("/stats/availabletips/:month")
    .get(jwtMiddleware.verifyToken,statsController.getAvailableTipsByMonth)

    server.route("/stats/sumtipsbyuser/:id")
    .get(jwtMiddleware.verifyToken,statsController.getSumTipsByUser)

    server.route("/stats/sumtipsbyservice/:id")
    .get(jwtMiddleware.verifyToken,statsController.getSumTipsByService)

    

}