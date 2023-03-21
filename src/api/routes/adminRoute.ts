module.exports = (server) => {
    const adminController = require("../controllers/adminController");

    server.route("/admin/login")
    .post(adminController.login)

}