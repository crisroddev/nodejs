const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: {type: String},
    createdAt: {
        type: String,
        default: Date. now()
    },
});

module.exports = User = mongoose.model('user', UserSchema);