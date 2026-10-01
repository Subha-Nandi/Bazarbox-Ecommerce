const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');


router.post('/add', cartController.addToCart);

router.delete('/delete', cartController.deleteCartItem);

router.patch('/update-quantity', cartController.updateProductQuantity);

router.patch('/update-delivery-option', cartController.updateDeliveryOption);


router.get('/get-all-carts', cartController.getCart);


module.exports = router;