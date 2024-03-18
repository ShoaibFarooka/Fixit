const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: 'Service'
    },
    message: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    date: {
        type: Date,
        required: true
    }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request
