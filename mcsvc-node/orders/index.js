const express = require('express');
const Order = require('./models/Order');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://cris:1234@cluster0.nsijl.mongodb.net/order-service?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Order-Service DB Connector`)
});

app.post('/order/new', async(req, res) => {
    const { CustomerId, BookId, initialDate, deliveryDate } = req.body;

    try {
        const newOrder = {
            CustomerId,
            BookId,
            initialDate,
            deliveryDate
        };
    
        const order = await new Order(newOrder);
        order.save();
        res.json(order);

    }catch(err) {
        console.log(err)
        throw err;
    }
})

app.get('/order/getAll', async(req, res) => {
    try {
        const find = await Order.find();
        res.json(find)
    } catch(err){
        console.log(err);
        throw err;
    }
})

app.get('/order/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const find = await Order.findById(id);
        console.log(find);
        if(find) {
            const resCus = await axios.get(`http://localhost:4001/customer/${find.CustomerId}`);
            // console.log(res.data)
            const { name } = resCus.data;
            const resBook = await axios.get(`http://localhost:4000/book/${find.BookId}`);
            const { title } = resBook.data;
            const order = {
                customerName: name,
                bookTitle: title
            };
            res.json(order);
        } else {
            res.json({ message: 'Order does not exist'});
        }

    } catch(err){
        console.log(err);
        throw err;
    }
});

app.listen(4002, () => {
    console.log('Listening on 4002');
});