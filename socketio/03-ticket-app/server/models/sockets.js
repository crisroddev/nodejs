const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear instancia de nuestro ticketlist
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado');
            socket.on('solicitar-ticket', (data, ticket) => {
                // console.log('Nuevo Ticket en BE');
                const nuevoTicket = this.ticketList.crearTicket();
                ticket(nuevoTicket)
            });

            socket.on('siguiente-ticket-trabajar', (usuario, ticket) => {
                const { agente, escritorio } = usuario;
                // console.log(agente, escritorio)
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                ticket( suTicket )

                this.io.emit('ticket-asignado', this.ticketList.utlimos13);
            })
        });
    }
}


module.exports = Sockets;