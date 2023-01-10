const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Customer", CustomerSchema);
