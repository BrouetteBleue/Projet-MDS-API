module.exports = (server) => {
    const statsController = require("../controllers/statsController");

    server.route("/stats/sumtips")
    .get(statsController.getSumTips)

    server.route("/stats/sumtips/:month")
    .get(statsController.getSumTipsByMonth)

    server.route("/stats/availabletips/:month")
    .get(statsController.getAvailableTipsByMonth)

    server.route("/stats/sumtipsbyuser/:id")
    .get(statsController.getSumTipsByUser)
    

}