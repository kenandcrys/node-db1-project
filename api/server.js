const express = require("express");

const accRoutes = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', accRoutes)


// server.use('*', (_req, res) => {
//     res.status(404).json({
//         message: "not found"
//     });
// });


module.exports = server;
