const Subjects = require('./subjects');

const TicketCreatedEvent = {
  subject = Subjects.TicketCreated,
  data: {
    id: '',
    title: '',
    price: ''
  }
}

module.exports = TicketCreatedEvent;