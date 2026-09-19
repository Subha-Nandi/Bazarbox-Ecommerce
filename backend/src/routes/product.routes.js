const express = require('express');
const router = express.Router();


const productController = require('../controllers/product.controller');

router.post('/create-product', productController.createProducts);



router.get('/all-products', productController.getProducts);

module.exports = router;