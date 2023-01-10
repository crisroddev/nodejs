const jwt = require('jsonwebtoken');

async function isCurrentUser(req, res, next) {
    if(!req.session?.jwt){
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, 'asdf');
        req.currentUser = payload;
        // console.log(payload);

    }catch(err){}

    next();
}

module.exports = isCurrentUser;