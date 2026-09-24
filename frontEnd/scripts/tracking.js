import { getProduct, loadProductsFetch } from '../data/products.js';
import { loadOrdersList } from '../data/orders.js'

async function loadTrackingPage() {
  await loadProductsFetch();

  // Get the parameters from the URL
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');




  const orderList = await loadOrdersList();

  // Find the correct order
  const order = orderList.find((order) => {
    return order._id === orderId;
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
}

loadTrackingPage();