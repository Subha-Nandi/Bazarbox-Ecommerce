const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderList.controller')

router.post("/placeOrder", orderController.createOrder);

router.get("/view-orders", orderController.getOrdersList);


module.exports = router;