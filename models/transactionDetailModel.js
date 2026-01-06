const mongoose = require('mongoose');

const transactionDetailSchema = new mongoose.Schema({
    id_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    id_sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('TransactionDetail', transactionDetailSchema);