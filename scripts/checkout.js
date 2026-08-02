import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';



/*
async function loadPage() {
    await loadProductsFetch();

   await new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
    });

    renderCheckoutHeader()
        renderOrderSummary();
        renderPaymentSummary();
}*/

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
    }).then(() => {
        renderCheckoutHeader()
        renderOrderSummary();
        renderPaymentSummary();
});


/* loadProducts(() => {
   
// });

*/