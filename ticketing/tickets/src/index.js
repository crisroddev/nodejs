const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const ticketsStatus = require('./routes/tickets-status');
const newTicket = require('./routes/new-ticket');
const getTicket = require('./routes/get-ticket');
const getTickets = require('./routes/get-tickets');
const updateTicket = require('./routes/update-ticket');
const { isCurrentUser } = require('@crisroddev-js/common');

require('dotenv').config();

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(cookieSession({
        signed: false,
        secure: true
    })
);

app.use(isCurrentUser);
app.use(ticketsStatus);
app.use(newTicket);
app.use(getTicket);
app.use(getTickets);
app.use(updateTicket);

const start = async() => {
    try{
        // mongoose.connect(process.env.MONGO_DB, {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`Tickets-Service DB Connector`)
        });

    } catch(err){
        console.error(err)
    }
    
    app.listen(process.env.PORT, () => {
        console.log(`Listening on PORT ${process.env.PORT}`)
    })
}

start();
