import { } from "../data/orders.js";
import { getProduct, loadProductsFetch } from '../../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';
import { updateCartQuantity,loadFromStorage as loadCart } from "../../data/cart.js";

loadOrdersPage();

async function loadOrdersPage() {
  await loadProductsFetch();
  await loadCart();
  await loadOrdersList();
console.log(updateCartQuantity())
  

}



export async function loadOrdersList() {
  try {
    const response = await fetch(
      'http://localhost:3000/api/orderList/view-orders'
    );

    if (!response.ok) {
      throw new Error("Failed to fetched products");
    }

    const data = await response.json();

    const orderList = data.ordersList;
    console.log(orderList)
    


     renderOrdersList(orderList);


  } catch (error) {
    console.log('failed to fetched products', error);
  }
}



function renderOrdersList(orderList) {

  let ordersHTML = '';

  // const orderList =
  // JSON.parse(localStorage.getItem('orderList')) || [];

  if (orderList.length === 0) {
    return document.querySelector('.order-grid-js').innerHTML = `
        <div>
            <p>No orders found.</p>
        </div>
    `;
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
  document.querySelector('.js-cart-quantity').innerHTML = `${updateCartQuantity()}`;

  document.querySelector('.order-grid-js').innerHTML = ordersHTML;

}











