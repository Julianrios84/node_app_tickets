const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

let server = http.createServer(app);

// Creando una carpeta publica
const publicPath = path.resolve(__dirname, '../public');
//  Definimos el puerto o tomamos el que el servidor nos da
const port = process.env.PORT || 3000;
// Middlewares para habilitar l acarpeta public
app.use(express.static(publicPath));

// IO = comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');
// Escuchando el puerto
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});