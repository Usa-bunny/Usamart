const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    id_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);