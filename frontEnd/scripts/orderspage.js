import { loadOrdersList } from "../data/orders.js";
import { getProduct, loadProductsFetch } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity, loadCart, addToCart } from "../data/cart.js";


async function loadOrdersPage() {



  await loadProductsFetch();
  await loadCart();
  const orders = await loadOrdersList();
  renderOrdersList(orders);

}


function renderOrdersList(orderList) {

  let ordersHTML = '';

  if (orderList.length === 0) {
    return document.querySelector('.page-title').innerHTML = 'No orders found.'
  }


  orderList.forEach((order) => {

    ordersHTML += `
      <div class="order-container">

        <div class="order-header">

          <div class="order-header-left-section">

            <div class="order-date">
              <div class="order-header-label">
                Order Placed:
              </div>
              <div>
                ${order.orderDate}
              </div>
            </div>

            <div class="order-total">
              <div class="order-header-label">
                Total:
              </div>
              <div>
                ${formatCurrency(order.totalCents)}
              </div>
            </div>

          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">
              Order ID:
            </div>

            <div>
              ${order.id}
            </div>
          </div>

        </div>


        <div class="order-details-grid">

          ${order.products.map((cartItem) => {

      const product = getProduct(cartItem.productId);


      return `
                <div class="product-image-container">
                  <img src="${product.image}">
                </div>

                <div class="product-details">

                  <div class="product-name">
                    ${product.name}
                  </div>

                  <div class="product-delivery-date">
                    Arriving soon
                  </div>

                  <div class="product-quantity">
                    Quantity: ${cartItem.quantity}
                  </div>

                    <button class="buy-again-button button-primary js-buy-again"
                        data-product-id="${cartItem.productId}"
                      >
                      <img
                        class="buy-again-icon"
                        src="images/icons/buy-again.png"
                      >
                          <span class="buy-again-message">
                            Buy it again
                          </span>
                      </button>
                </div>

                <div class="product-actions">
                 <a href="tracking.html?orderId=${order._id}&productId=${cartItem.productId}">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
              `;
    }).join('')
      }

        </div>
      </div>
    `;
  });



  // IMPORTANT: outside the forEach
  document.querySelector('.js-cart-quantity').innerHTML = `${updateCartQuantity()}`;

  document.querySelector('.order-grid-js').innerHTML = ordersHTML;


  document.querySelectorAll('.js-buy-again').forEach((button) => {

    button.addEventListener('click', async () => {

      const productId = button.dataset.productId;

      try {

        await addToCart(productId, 1);

        button.querySelector('.buy-again-message').innerHTML =
          'Added ✓';

        setTimeout(() => {
          button.querySelector('.buy-again-message').innerHTML =
            'Buy it again';
        }, 1000);

      } catch (error) {

        console.log('Failed to add product to cart:', error);

      }

    });

  });

}

loadOrdersPage();












