async function requireAuth(req, res, next) {
   if (!req.currentUser) {
       return res.status(401).send({ message: 'Not Authorized'});
   }

   next();
}

module.exports = requireAuth;