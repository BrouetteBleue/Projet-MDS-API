module.exports = (server) => {
    const serviceController = require("../controllers/serviceController");

    server.route("/services")
    .get(serviceController.findAll)
    .post(serviceController.create);

    server.route("/service/:id")
    .get(serviceController.findOne)
    .put(serviceController.update)
    .delete(serviceController.delete);

}