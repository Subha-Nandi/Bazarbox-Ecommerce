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
    ]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;