const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const Sockets   = require('./sockets');
const path      = require('path');
const cors      = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    this.io = socketio( this.server );
  }

  middlewares() {
    this.app.use( express.static( path.resolve( __dirname, '../public' )));
    this.app.use( cors() );
  }

  configurarSockets() {
    new Sockets( this.io );
  }

  execute() {
    this.middlewares();

    this.configurarSockets();

    this.server.listen(8080, () => {
      console.log(`Listening on port ${this.port}`)
    });
  }
}

module.exports = Server;