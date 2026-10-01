const orderModel = require('../models/orderList.model');
const cartModel = require('../models/cart.model');
const productModel = require('../models/products.model');
const orderListModel = require('../models/orderList.model');


async function createOrder(req, res) {
    
    try {
        const cart = await cartModel.findOne();

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        if (cart.products.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        let totalCents = 0;

        for (const cartItem of cart.products) {

            const product = await productModel.findOne({
                id: cartItem.productId
            });

            if (!product) {
                return res.status(404).json({
                    message: `Product ${cartItem.productId} not found`
                });
            }

            totalCents += product.priceCents * cartItem.quantity;
        }

        const order = await orderModel.create({
            products: cart.products,
            totalCents: totalCents
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to place order",
            error: err.message
        });
    }
}



async function getOrdersList(req, res) {

    try {
        const ordersList = await orderModel.find();

        res.status(200).json({
            message: "Orders fetched successfully",
            ordersList
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: err.message
        });
    }
}


module.exports = { createOrder, getOrdersList }