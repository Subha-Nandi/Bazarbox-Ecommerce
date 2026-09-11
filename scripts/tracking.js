import { getProduct } from '../../data/products.js';


// Get the parameters from the URL
const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

console.log('Order ID:', orderId);
console.log('Product ID:', productId);


// Get orders from localStorage
const orderList =
  JSON.parse(localStorage.getItem('orderList')) || [];


// Find the correct order
const order = orderList.find((order) => {
  return order.id === orderId;
});


// Check if order exists
if (!order) {

  document.querySelector('.order-tracking').innerHTML = `
    <p>Order not found.</p>
  `;

} else {

  // Find the correct product inside this order
  const cartItem = order.products.find((cartItem) => {
    return cartItem.productId === productId;
  });


  // Check if product exists
  if (!cartItem) {

    document.querySelector('.order-tracking').innerHTML = `
      <p>Product not found in this order.</p>
    `;

  } else {

    // Get the full product information
    const product = getProduct(cartItem.productId);


    // Display product name
    document.querySelector('.js-product-name').innerHTML =
      product.name;


    // Display quantity
    document.querySelector('.js-product-quantity').innerHTML =
      `Quantity: ${cartItem.quantity}`;


    // Display product image
    document.querySelector('.js-product-image').src =
      product.image;


    // Display delivery date
    document.querySelector('.delivery-date').innerHTML =
      'Arriving soon';
  }
}
