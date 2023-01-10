const { Router } = require('express');
const {requireAuth} = require('@crisroddev-js/common');
const Ticket = require('../../models/ticket');
const getTicket = Router();

getTicket.get('/api/tickets/get/:id', requireAuth,
    async (req, res ) => {
        try {
            const id = req.params.id;
            const ticket = await Ticket.findById(id);

            if (!ticket) {
                res.status(400).send({ message: 'Ticket does not exists'});
            }

            res.status(201).send(ticket);

        } catch(err) {
            console.log(err)
            throw err;
        }
});


module.exports = getTicket;