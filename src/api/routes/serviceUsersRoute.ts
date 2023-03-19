module.exports = (server) => {
    const serviceUsersController = require("../controllers/serviceUsersController");

    server.route("/service/:id/users")
    .get(serviceUsersController.findAllUsersFromService);

    server.route("/service/:idService/user/:idUser")
    .get(serviceUsersController.findUserInService)
    .post(serviceUsersController.addUserToService)
    .delete(serviceUsersController.removeUserFromService);

    server.route("/user/:id/services")
    .get(serviceUsersController.findAllServicesFromUser);
}