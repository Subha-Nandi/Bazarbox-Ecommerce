import { getProduct, loadProductsFetch } from '../data/products.js';
import { loadOrdersList } from '../data/orders.js'

async function loadTrackingPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');




  const orderList = await loadOrdersList();

  const order = orderList.find((order) => {
    return order._id === orderId;
  });


  if (!order) {

    document.querySelector('.order-tracking').innerHTML = `
      <p>Order not found.</p>
    `;

  } else {

    const cartItem = order.products.find((cartItem) => {
      return cartItem.productId === productId;
    });


    if (!cartItem) {

      document.querySelector('.order-tracking').innerHTML = `
        <p>Product not found in this order.</p>
      `;

    } else {

      const product = getProduct(cartItem.productId);

      document.querySelector('.js-product-name').innerHTML =
        product.name;


      document.querySelector('.js-product-quantity').innerHTML =
        `Quantity: ${cartItem.quantity}`;


      document.querySelector('.js-product-image').src =
        product.image;


      document.querySelector('.delivery-date').innerHTML =
        'Arriving soon';
    }
  }
}

loadTrackingPage();