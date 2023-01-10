// Dependencies
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors = require('cors');

// Imports 
const Sockets           = require('./sockets');
const { dbConnection }  = require('../database/config');

// Import Routes
const auth              = require('../routes/auth');
const mensajes              = require('../routes/mensajes');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // MongoDB
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // Cors
        this.app.use( cors() );

        // BodyParse
        this.app.use( express.json() );

        // API Endpoints
        this.app.use( '/api/login', auth);
        this.app.use( '/api/mensajes', mensajes);
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( 8080, () => {
            console.log('Server corriendo en puerto:', 8080 );
        });
    }

}


module.exports = Server;