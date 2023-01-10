const { Router } = require('express');
const {isCurrentUser} = require('@crisroddev-js/common');
const {requireAuth} = require('@crisroddev-js/common');

// const isCurrentUser = require('../../middlewares/current-user');
// const requireAuth = require('../../middlewares/require-auth');

const currentUser = Router();

require('dotenv').config();

currentUser.get('/api/users/currentUser', isCurrentUser, requireAuth, (req, res ) => {
    res.send({ currentUser: req.currentUser || null });
});

module.exports = currentUser;