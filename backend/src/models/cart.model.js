const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            deliveryOptionId: {
                type: String,
                default:1,
            }
        }
    ],
     createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;