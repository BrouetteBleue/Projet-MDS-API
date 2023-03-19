module.exports = (server) => {
    const tipPaymentController = require("../controllers/tipPaymentController");

    server.route("/tipPayments")
    .get(tipPaymentController.findAll)
    .post(tipPaymentController.create)

    server.route("/tipPayment/:id")
    .get(tipPaymentController.findOne)
    .put(tipPaymentController.update)
    .delete(tipPaymentController.delete)

}