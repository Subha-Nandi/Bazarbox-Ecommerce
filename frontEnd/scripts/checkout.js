




import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


export async function loadCheckoutPage() {

    console.log('🔥 CHECKOUT.JS LOADED:', window.location.pathname);

    // First load products
    await loadProductsFetch();

    // Then load cart
    await loadCart();

    // Only after both are loaded, render the page
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadCheckoutPage();