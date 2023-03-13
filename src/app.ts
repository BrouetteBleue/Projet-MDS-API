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


server.use(express.urlencoded());
server.use(express.json());

const serviceRoute = require("./api/routes/serviceRoute");
serviceRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);


server.listen(port, hostname, () => {
    console.log("environnement de node = "+pipi);
}) 