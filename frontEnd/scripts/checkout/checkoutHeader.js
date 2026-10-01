import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    const  headerHtml = `Checkout (<a class="return-to-home-link "
            href="amazon.html">  ${updateCartQuantity()} items</a>)`;


        document.querySelector('.js-checkout-cart-quantity').innerHTML = headerHtml;

    
}



