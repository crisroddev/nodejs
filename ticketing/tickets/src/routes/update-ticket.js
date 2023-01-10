const { Router } = require('express');
const {requireAuth} = require('@crisroddev-js/common');
const Ticket = require('../../models/ticket');
const updateTicket = Router();

updateTicket.put('/api/tickets/update/:id', requireAuth,
    async (req, res ) => {
        try {
            const id = req.params.id;
            const { title, price } = req.body;
            const ticket = await Ticket.findById(id);

            if (!ticket) {
                res.status(400).send({ message: 'Ticket does not exists'});
            }

            if (ticket.userId !== req.currentUser.id) {
                res.status(400).send({ message: 'Not Authorized' });
            }

            ticket.set({
                title,
                price
            });

            await ticket.save();

            res.status(201).send(ticket);

        } catch(err) {
            console.log(err)
            throw err;
        }
});


module.exports = updateTicket;