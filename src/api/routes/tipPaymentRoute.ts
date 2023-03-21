module.exports = (server) => {
    const tipPaymentController = require("../controllers/tipPaymentController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");
    
    server.route("/tipPayments")
    .get(tipPaymentController.findAll)
    .post(jwtMiddleware.verifyToken,tipPaymentController.create)

    server.route("/tipPayment/:id")
    .get(tipPaymentController.findOne)
    .put(jwtMiddleware.verifyToken,tipPaymentController.update)
    .delete(jwtMiddleware.verifyToken,tipPaymentController.delete)

}