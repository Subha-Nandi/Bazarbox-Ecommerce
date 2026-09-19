const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/orderList.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/orderList", orderRouter)

module.exports = app;