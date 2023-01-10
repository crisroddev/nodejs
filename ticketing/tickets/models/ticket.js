const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true},
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v
        }
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);

