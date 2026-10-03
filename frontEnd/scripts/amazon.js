import { loadCart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";



// loadProducts(renderProductsGrid);
async function loadPage() {
  await loadProductsFetch();
  await loadCart();
  await renderProductsGrid(products);
}

loadPage();

const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');


function searchProducts() {

  const searchText = searchInput.value.toLowerCase().trim();

  if (searchText === '') {
    renderProductsGrid(products);
    return;
  }

  const matchingProducts = products.filter((product) => {
    return product.keywords.some((keyword) => {
      return keyword.toLowerCase().includes(searchText);
    });
  });

  if (matchingProducts.length === 0) {
    document.querySelector('.js-products-grid').innerHTML = `
      <div class="no-results">
        No searched products found.
      </div>
    `;
    return;
  }

  renderProductsGrid(matchingProducts);

  if (searchText === '') {
    renderProductsGrid(products);
    return;
  }

}

searchButton.addEventListener('click', () => {
  searchProducts();
});

searchInput.addEventListener('input', () => {
  searchProducts();
});




function renderProductsGrid(products) {

  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();


  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
     <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
               $${(formatCurrency(product.priceCents))}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector" data-product-id = ${product.id}>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>


            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
            `;
  })


  document.querySelector('.js-products-grid').innerHTML = productsHTML;


  document.querySelectorAll('.js-add-to-cart').
  forEach((button) => {

    button.addEventListener('click', () => {

      const productId = button.dataset.productId;

      // Current product container
      const productContainer = button.closest('.product-container');
      const selectElement = productContainer.querySelector('.js-quantity-selector');

      const quantity = Number(selectElement.value) || 1;
      addToCart(productId, quantity);
      selectElement.value = "1";

      console.log(productId);
      console.log(quantity)

      // Update cart UI
      updateCartQuantity();
    });

  });



}