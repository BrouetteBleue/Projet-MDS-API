const express = require("express");
//const dotenv = require('dotenv');
import dotenv from "dotenv";// load environment variables from a .env file into process.env
import config from "./api/config/config";

 
dotenv.config({path: '../.env'}); // path to your .env file 

const hostname = config.HOSTNAME;
const port = config.PORT;

const server = express();

server.use(express.urlencoded())
    .use(express.json())

const serviceRoute = require("./api/routes/serviceRoute");
serviceRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);

const tableTipRoute = require("./api/routes/tableTipsRoute");
tableTipRoute(server);

const serviceUsersRoute = require("./api/routes/serviceUsersRoute");
serviceUsersRoute(server);

const tipPaymentRoute = require("./api/routes/tipPaymentRoute");
tipPaymentRoute(server);

const statsRoute = require("./api/routes/statsRoute");
statsRoute(server);

const adminRoute = require("./api/routes/adminRoute");
adminRoute(server);

server.listen(port, hostname, () => {
    console.log(`Notre application Node est démarée sur : http://localhost:${port} `);
}) 