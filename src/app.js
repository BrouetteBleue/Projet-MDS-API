const express = require("express");

const hostname = "0.0.0.0";
const port = 3000;

const server = express();


server.use(express.urlencoded());
server.use(express.json());


server.listen(port, hostname, () => {
    console.log("caca");
})