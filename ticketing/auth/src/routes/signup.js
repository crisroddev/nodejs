const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const signUp = Router();

require('dotenv').config();


signUp.post('/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20})
            .withMessage('Password must have between 4 and 20 characters')

    ], 
    async (req, res ) => {
        const errors = validationResult(req);
        try {
            if(!errors.isEmpty()) {
                const error = new Error('Invalid password or email');
                throw error;
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            
            if (existingUser) {
                // console.log('User Already exists');
                return res.send({ message: 'User Exists'});
            }

            const newUser = new User({
                email,
                password
            });

            await newUser.save();

            // JWT
            const userJWT = jwt.sign({
                id: newUser.id,
                email: newUser.email,
                },
                process.env.JWT_KEY
            );

            // Store on Session
            const session = req.session.jwt = userJWT
            // console.log(session)

            res.status(201).send(newUser);

        } catch(err){
            console.log(err)
            throw err;
        }
});

module.exports = signUp;