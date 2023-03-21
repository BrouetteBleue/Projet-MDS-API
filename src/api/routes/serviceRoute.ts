module.exports = (server) => {
    const serviceController = require("../controllers/serviceController");

    server.route("/services")
    .get(serviceController.list_all_services)

}