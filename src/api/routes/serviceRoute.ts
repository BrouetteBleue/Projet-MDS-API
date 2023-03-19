module.exports = (server) => {
    const serviceController = require("../controllers/serviceController");

    server.route("/services")
    .get(serviceController.list_all_services)
    .post(serviceController.create_a_service);

    server.route("/service/:id")
    .get(serviceController.read_a_service)
    .put(serviceController.update_a_service)
    .delete(serviceController.delete_a_service);

}