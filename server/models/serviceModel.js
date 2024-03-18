const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
