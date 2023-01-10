const { Router } = require('express');
const {requireAuth} = require('@crisroddev-js/common');
const Ticket = require('../../models/ticket');
const getTickets = Router();

getTickets.get('/api/tickets/get/', requireAuth,
    async (req, res ) => {
        try {
            const ticket = await Ticket.find({});

            if (!ticket) {
                res.status(400).send({ message: 'There is any ticket'});
            }

            res.status(201).send(ticket);

        } catch(err) {
            console.log(err)
            throw err;
        }
});


module.exports = getTickets;