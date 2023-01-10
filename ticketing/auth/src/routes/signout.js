const { Router } = require('express');
const signOut = Router();

signOut.post('/api/users/signout', (req, res ) => {
    req.session = null;
    res.send({})
    
});

module.exports = signOut;