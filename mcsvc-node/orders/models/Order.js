const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    CustomerId: { type: Schema.Types.ObjectId, required: true },
    BookId: { type: Schema.Types.ObjectId, required: true },
    initialDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", OrderSchema);
