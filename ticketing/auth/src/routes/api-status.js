const { Router } = require('express');
const apiStatus = Router();

apiStatus.get('/api/users/status', (req, res ) => {
    try {
        res.status(200).send({ status: 'UP'});
    } catch(err) {
        console.log(err)
    }

});


module.exports = apiStatus;