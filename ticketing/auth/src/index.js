const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const currentUser = require('./routes/current-user');
const signIn = require('./routes/signin');
const signOut = require('./routes/signout');
const signUp = require('./routes/signup');
const apiStatus = require('./routes/api-status');
const  errorHandler = require('../middlewares/error-handeler');
require('dotenv').config();

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(cookieSession({
        signed: false,
        secure: true
    })
);

app.use(apiStatus);
app.use(currentUser);
app.use(signIn);
app.use(signOut);
app.use(signUp);

app.use(errorHandler);

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
