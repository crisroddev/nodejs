const { Router } = require('express');
const { body } = require('express-validator');
const User = require('../../models/user');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signIn = Router();

require('dotenv').config();


signIn.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Must enter a password')
    ],
    async(req, res ) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new Error('User does not exists');
        }
        passwordMatch = await brcypt.compare(password, existingUser.password);
        if (!passwordMatch){
            throw new Error('Invalid Password');
        }

        const userJWT = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY
        );

        const session = req.session = {
            jwt: userJWT
        }
        
        res.status(201).send({
            id: existingUser.id,
            email: existingUser.email
        });


    }catch(err){
        console.log(err);
        throw err;
    }
});

module.exports = signIn;