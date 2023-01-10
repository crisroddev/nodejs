const express = require('express');
const app = express();
const PORT = process.env.PORT_ONE || 7070;
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

app.use(express.json());

mongoose.connect("mongodb+srv://cris:1234@cluster0.nsijl.mongodb.net/auth-service?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Auth-Service DB Connector`)
});

// Login
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: 'User does not exist'})
    } else {
        // Check Password
        if (password !== user.password) {
            return res.json({ message: 'Incorrect Password'});
        }

        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else {
                return res.json({ token: token });
            }
        });
        }
    } catch (error){
        console.log(error);
    }
    
})

// Register
app.post('/auth/register', async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
        return res.json({ message: "User Already Exists" });
    } else {
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save();
        return res.json(newUser);
    }
});

app.listen(PORT, () => {
    console.log(`Auth Service at ${PORT}`)
})