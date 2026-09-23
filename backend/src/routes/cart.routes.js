const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');


router.post('/add', cartController.addToCart);

router.post('/delete', cartController.deleteCartItem);

router.post('/update-quantity', cartController.updateProductQuantity);

router.get('/get-all-carts', cartController.getCart);


module.exports = router;