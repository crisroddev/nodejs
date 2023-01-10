const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://cris:1234@cluster0.nsijl.mongodb.net/books-service?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Books-Service DB Connector`)
});

app.post('/book/new', async (req, res) => {
    const { title, author, numberPages, publisher } = req.body;
    try {
        const newBook = new Book ({
            title,
            author,
            numberPages, 
            publisher
        })
        await newBook.save();
        res.json(newBook);
    }catch(err){
        console.log(err)
        throw err;
    }
});

app.get('/book/getAll', async (req, res) => {
    try {
        const getBooks = await Book.find();
        res.json(getBooks)
    } catch(err) {
        console.log(err)
        throw err;
    }
})

app.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if(book) {
            res.json(book);
        } else {
            res.json({ message: 'Book does not exists'});
        }

    }catch(err){
        console.log(err)
        throw err;
    }
});

app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removeBook = await Book.findByIdAndDelete(id);
        if (removeBook) {
            res.json({ message: `Book with id ${id} has been deleted`});
        } else {
            res.json({ message: 'Book does not exists' });
        }
    }catch(err) {
        console.log(err)
        throw err;
    }
});

app.listen(4000, () => {
    console.log('Listening on 4000')
})