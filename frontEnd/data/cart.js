export let cart = [];


export async function loadFromStorage(){
    // cart = JSON.parse(localStorage.getItem('cart')) || [];

 try {
    const response = await fetch(
      'http://localhost:3000/api/cart/get-all-carts'
    );

    if (!response.ok) {
      throw new Error("Failed to fetched products");
    }

    const productsData = await response.json();

    cart = productsData.cart[0].products;

    // const updateCartQuantity = () => {
    //     let cartQuantity = 0;
    //     cart.forEach((cartItem) => {
    //         cartQuantity += cartItem.quantity;
    //     });
    //     return cartQuantity; 
    // }


  } catch (error) {
    console.log('failed to fetched products', error);
  }

}


// export function saveTostorage() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }


export function addToCart(productId,number) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += Number(number);
    }
    else {
        cart.push({
            productId: productId,
            quantity: Number(number),
            deliveryOptionId: '1'
        });
    }
    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity() || 0;

}


export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId != productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
}


export function updateCartQuantity(){
    let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;  
}


 export  function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

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


export function totalCartQuantity(){
   let  totalQuantity  = 0;
    cart.forEach((cartItem) => {
        totalQuantity += Number(cartItem.quantity);
    })

    return totalQuantity;
}
