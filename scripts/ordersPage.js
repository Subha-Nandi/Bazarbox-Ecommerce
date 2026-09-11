import {} from "../data/orders.js";
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../scripts/utils/money.js';
import { updateCartQuantity, saveTostorage } from "../../data/cart.js";


function renderOrdersList() {

  let ordersHTML = '';

  const orderList =
    JSON.parse(localStorage.getItem('orderList')) || [];


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

          ${
            order.products.map((cartItem) => {

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

                  <button class="buy-again-button button-primary">
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
                 <a href="tracking.html?orderId=${order.id}&productId=${cartItem.productId}">
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
  document.querySelector('.order-grid-js').innerHTML = ordersHTML;

  document.querySelector('.js-cart-quantity').innerHTML = `${updateCartQuantity()}`;
    saveTostorage();
}


renderOrdersList();









