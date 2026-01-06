const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    payment: {
        type: String,
        enum: ['Gopay', 'Dana', 'Cod'],
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    transaction_status: {
        type: String,
        enum: ['Unpaid', 'In Progress', 'Finished', 'Cancel'],
        required: true
    }
});

module.exports = mongoose.model('Sale', saleSchema);