const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = Product = mongoose.model('product', ProductSchema);