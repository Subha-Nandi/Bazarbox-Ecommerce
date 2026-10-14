export let cart = [];


export async function loadCart() {
   
    try {
        const response = await fetch(
            'https://bazarbox-ecommerce-1.onrender.com/api/cart/get-all-carts'
        );

        if (!response.ok) {
            throw new Error("Failed to fetched products");
        }

        const productsData = await response.json();

        cart = productsData.cart[0].products;


    } catch (error) {
        console.log('failed to fetched products', error);
    }

}


export async function addToCart(productId, number) {

    const quantity = Number(number);

    try {
        const response = await fetch('https://bazarbox-ecommerce-1.onrender.com/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add product to cart');
        }

        await loadCart();

        document.querySelector('.js-cart-quantity').innerHTML =
            updateCartQuantity() || 0;




    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}



export async function removeFromCart(productId) {

    try {
        const response = await fetch('https://bazarbox-ecommerce-1.onrender.com/api/cart/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete product to cart');
        }




        await loadCart();

        const headerHtml = `Checkout (<a class="return-to-home-link "
                     href="bazarbox.html">  ${updateCartQuantity()} items</a>)`;


        document.querySelector('.js-checkout-cart-quantity').innerHTML = headerHtml;


    } catch (error) {
        console.error('Error delete product to cart:', error);
    }

}





export async function updateDeliveryOption(productId, deliveryOptionId) {

    try {
        const response = await fetch('https://bazarbox-ecommerce-1.onrender.com/api/cart/update-delivery-option', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                deliveryOptionId: deliveryOptionId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update product delivery option');
        }

        await loadCart();

        const headerHtml = `Checkout (<a class="return-to-home-link "
                     href="bazarbox.html">  ${updateCartQuantity()} items</a>)`;


        document.querySelector('.js-checkout-cart-quantity').innerHTML = headerHtml;





    } catch (error) {
        console.error('Error adding product to cart:', error);
    }

}


export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}


export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

}





