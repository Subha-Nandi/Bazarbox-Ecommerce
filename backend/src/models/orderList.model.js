const mongoose = require('mongoose');

const orderListSchema = mongoose.Schema({
    id: {
        type: String,
        dafault: () => crypto.randomUUID()
    },

    orderDate: {
        type: String,
        default: () => new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric"
        })
    },

    products: {
        type: Array,
        required: true
    },

    totalCents: {
        type: Number,
        required: true
    }
})

const orderListModel = mongoose.model("orderList", orderListSchema);

module.exports = orderListModel;