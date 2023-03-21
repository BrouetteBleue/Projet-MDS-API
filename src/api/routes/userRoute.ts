module.exports = (server) => {
    const userController = require("../controllers/userController");

    server.route("/users")
    .get(userController.findAll)
    .post(userController.create);

    server.route("/user/:id")
    .get(userController.findOne)
    .put(userController.update)
    .delete(userController.delete);

}