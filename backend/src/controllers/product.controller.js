const productsModel = require('../models/products.model');

async function createProducts(req, res) {
    try {
        const products = await productsModel.insertMany(req.body);

        res.status(201).json({
            message: 'Product inserted successfully',
            products
        });
    } catch (err) {
        res.status(500).json({
            message: ' Failed to insert products',
            error: err.message
        });
    }
}


async function getProducts(req, res) {
    try {
        const products = await productsModel.find();

        if (products.length === 0) {
            res.status(400).json({
                message: "there in no products to show"
            })
        }
        res.status(200).json({
            message: "Products fetched successfully",
            products
        })

    } catch (e) {
        res.status(400).json({
            message: "Can't fetched",
            error: e.message
        })
    }

}

module.exports = { createProducts, getProducts }