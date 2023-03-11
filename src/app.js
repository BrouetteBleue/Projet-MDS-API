const express = require("express");
const dotenv = require('dotenv'); // load environment variables from a .env file into process.env
dotenv.config({path: '../.env'}); // path to your .env file 

const hostname = "0.0.0.0";
const port = 3000;

const server = express();


server.use(express.urlencoded());
server.use(express.json());

server.listen(port, hostname, () => {
    console.log("environnement de node = "+process.env.NODE_ENV);
})