const { Router } = require('express');
const ticketsStatus = Router();

ticketsStatus.post('/api/tickets/status', (req, res ) => {
    try {
        res.status(200).send({ status: 'UP'});
    } catch(err) {
        console.log(err)
    }
});


module.exports = ticketsStatus;