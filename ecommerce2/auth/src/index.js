const express = require('express');
// const Logger = require('./lib/logger');
require('dotenv').config();

const app = express();
app.use(express.json());

// const logger = new Logger();

app.listen(process.env.PORT || '3000', 10, () => {
    console.log(`Listening on PORT ${process.env.PORT}`)
})

