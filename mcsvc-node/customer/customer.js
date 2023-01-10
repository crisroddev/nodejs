const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://cris:1234@cluster0.nsijl.mongodb.net/customer-service?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Customer-Service DB Connector`)
});

app.post('/customer/new', async (req, res) => {
    const { name, age, address } = req.body;
    try {
        const newCustomer = new Customer({
            name,
            age,
            address
        })

        await newCustomer.save();
        res.json(newCustomer);

    } catch(err){
        console.log(err)
        throw err;
    }
})

app.get('/customer/getAll', async (req, res) => {
    try {
        const find = await Customer.find();
        if (find) {
            res.json(find);
        } else {
            res.json({ message: 'Error'})
        }
    }catch(err) {
        console.log(err);
        throw err;
    }
})

app.get('/customer/:id', async (req, res) => {
        const { id } = req.params;
    try {
        const find = await Customer.findById(id);
        if (find) {
            res.json(find);
        } else {
            res.json({ message: `Customer ${id} does not exists`});
        }
    }catch(err) {
        console.log(err);
        throw err;
    }
})

app.delete('/customer/delete/:id', async(req, res) => {
    const { id } = req.params; 
    try {
        const find = await Customer.findById(id);
        if(find){
            await Customer.findByIdAndRemove(id);
            res.json({ message: `Customer deleted ${id}`});
        }else {
            res.json({ message: `Customer ${id} does not exists`});
        }
    }catch(err){
        console.log(err)
        throw err;
    }
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})