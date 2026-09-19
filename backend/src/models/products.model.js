const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    image:{
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    rating: {
        stars: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            default: 0
        }
    },

     priceCents: {
            type: Number,
            required: true
        },

    keywords: {
        type: [String],
        required: true
    }

});


module.exports = mongoose.model("Product", productSchema);

