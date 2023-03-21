module.exports = (server) => {
    const serviceController = require("../controllers/serviceController");

    server.route("/services")
    .get(serviceController.findAll)
    .post(serviceController.create);

    server.route("/service/:id")
    .get(serviceController.findOne)
    .put(serviceController.update)
    .delete(serviceController.delete);

    server.route("/services/:date")
    .get(serviceController.findServicesByDate)


    server.route("/service/:id/tips")
    .get(serviceController.findAllTipsFromService);

    server.route("/service/:id/close")
    .put(serviceController.closeService);


}