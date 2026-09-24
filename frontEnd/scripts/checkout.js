// import { renderOrderSummary } from "./checkout/orderSummary.js";
// import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// // import { loadProducts, loadProductsFetch } from "../data/products.js";

// import { products,  } from "../data/products.js";


// // import '../data/cart-class.js';
// // import '../data/backend-practice.js';



// /*
// async function loadPage() {
//     await loadProductsFetch();

//    await new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
//     });

//     renderCheckoutHeader()
//         renderOrderSummary();
//         renderPaymentSummary();
// }*/

// // new Promise((resolve) => {
// //     products(() => {
// //         resolve();
// //     });
// //     }).then(() => {
// //         renderCheckoutHeader()
// //         renderOrderSummary();
// //         renderPaymentSummary();
// // });


// renderCheckoutHeader();
// renderOrderSummary();
// renderPaymentSummary();


// /* loadProducts(() => {
   
// // });

// */




import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { loadProductsFetch } from "../data/products.js";
import { loadFromStorage } from "../data/cart.js";


async function loadCheckoutPage() {

    // First load products
    await loadProductsFetch();

    // Then load cart
    await loadFromStorage();

    // Only after both are loaded, render the page
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadCheckoutPage();