const cartModel = require('../models/cart.model');


async function getCart(req, res) {
    try {
        const cart = await cartModel.find();

        if (!cart) {
            return res.status(404).json({
                message: "can't find cart"
            })
        }

        if (cart.length === 0) {
            return res.status(404).json({
                message: "cart is empty"
            })
        }


        res.status(200).json({
            message: "fetched cart items successfully",
             cart
        });

    } catch (err) {
        res.status(500).json({
            message: "failed to fetched cart",
            Error: err.message
        })
    }
}

async function addToCart(req, res) {

    try {
        const { productId, deliveryOptionId } = req.body;

        let {quantity} = req.body

        if(quantity === undefined){
            quantity = 1
        }

        let cart = await cartModel.findOne();

        if (!cart) {
            cart = await cartModel.create({
                products: [
                    {
                        productId,
                        quantity,
                        deliveryOptionId
                    }
                ]
            });

            res.status(201).json({
                message: "product added to the cart"
            })
        }

        const existingProduct = cart.products.find(
            product => product.productId === productId
        );


        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({
                productId,
                quantity,
                deliveryOptionId
            })
        }

        await cart.save();

        res.status(201).json({
            message: "products added to the cart",
            cart
        });
    } catch (err) {
        res.status(500).json({
            message: "failed to add",
            error: err.message
        })
    }
}


async function deleteCartItem(req, res) {

    try {
        const { productId } = req.body;

        const cart = await cartModel.findOne();

        if (!cart) {
            return res.status(404).json({
                message: "couldn't find cart"
            })
        }

        const productExist = cart.products.some(
            product => product.productId === productId
        );


        if (!productExist) {
            return res.status(404).json({
                message: "couldn't find product"
            })
        } else {
            cart.products = cart.products.filter(
                product => product.productId != productId
            );

            await cart.save();
        }

        res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "failed to delete",
            error: err.message
        })
    }

}


async function updateProductQuantity(req, res) {
    try {
        const { productId, quantity } = req.body;

        let cart = await cartModel.findOne();

        if (!cart) {
            return res.status(404).json({
                message: "can't find the cart"
            });
        }

        const product = cart.products.find(
            product => product.productId === productId
        );

        if (!product) {
            return res.status(404).json({
                message: "there is no product to update"
            })
        } else {
            product.quantity = quantity;

            res.status(200).json({
                message: "quantity updated successfully"
            });

            await cart.save();
        }

    } catch (err) {
        res.status(500).json({ message: "Failed to update cart quantity", error: err.message });
    }
}


const updateDeliveryOption = async (req, res) => {
    try {
        const { productId, deliveryOptionId } = req.body;

        const cart = await cartModel.findOne();

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const matchingItem = cart.products.find(
            (cartItem) => cartItem.productId === productId
        );

        if (!matchingItem) {
            return res.status(404).json({
                message: 'Product not found in cart'
            });
        }

        matchingItem.deliveryOptionId = deliveryOptionId;

        await cart.save();

        res.status(200).json({
            message: 'Delivery option updated successfully',
            cart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to update delivery option'
        });
    }
};


module.exports = { getCart, addToCart, deleteCartItem, updateProductQuantity, updateDeliveryOption };


