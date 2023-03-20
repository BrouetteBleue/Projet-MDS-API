const express = require("express");
//const dotenv = require('dotenv');
import dotenv from "dotenv";// load environment variables from a .env file into process.env
import config from "./api/config/config";
import { User } from "./api/models/userModel";

 
dotenv.config({path: '../.env'}); // path to your .env file 

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = express();

const caca = new User(null);

const pipi = config.PORT;


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


server.listen(port, hostname, () => {
    console.log(`Notre application Node est démarée sur : http://localhost:${port} `);
}) 