module.exports = (server) => {
    const userController = require("../controllers/userController");

    server.route("/users")
    .get(userController.list_all_services)
    .post(userController.create_a_user);

}