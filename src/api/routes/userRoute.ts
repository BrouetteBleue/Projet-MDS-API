module.exports = (server) => {
    const userController = require("../controllers/userController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/users")
    .get(userController.findAll)
    .post(jwtMiddleware.verifyToken,userController.create);

    server.route("/user/:id")
    .get(userController.findOne)
    .put(jwtMiddleware.verifyToken,userController.update)
    // .delete(jwtMiddleware.verifyToken,userController.delete);

    server.route("/user/:id/solde")
    .get(jwtMiddleware.verifyToken,userController.getSolde);

    server.route("/user/:id/delete")
    .put(jwtMiddleware.verifyToken,userController.deleteUser);
}