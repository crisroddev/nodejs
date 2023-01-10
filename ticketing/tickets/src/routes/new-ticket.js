const { Router } = require('express');
const { body } = require('express-validator');
const {requireAuth} = require('@crisroddev-js/common');
const Ticket = require('../../models/ticket');
const newTicket = Router();

newTicket.post('/api/tickets/new', requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is Required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0')
    ],
    async (req, res ) => {
    try {
        const { title, price } = req.body;
        const ticket = new Ticket({
            title,
            price,
            userId: req.currentUser.id
        })

        await ticket.save();
        res.status(200).send(ticket);
    } catch(err) {
        console.log(err)
    }
});


module.exports = newTicket;