const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    public_id: {
        type: String,
        required: false,
        default: null
    },
    item_name: {
        type: String,
        required: true
    },
    item_image: {
        type: String,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_detail: {
        type: String,
        required: true
    },
    item_stock: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Empty', 'Pre-Order'],
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);