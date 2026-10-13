import formatCurrency from "../scripts/utils/money.js";
import { showLoading, hideLoading }
    from '../scripts/utils/loadingSpinner.js';

export let products = [];

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords


  constructor(productsDetails) {
    this.id = productsDetails.id;
    this.image = productsDetails.image;
    this.name = productsDetails.name;
    this.rating = productsDetails.rating;
    this.priceCents = productsDetails.priceCents;
    this.keywords = productsDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return ' ';
  }
}


class Clothing extends Product {
  sizeChartLink;

  constructor(productsDetails) {
    super(productsDetails);
    this.sizeChartLink = productsDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href='${this.sizeChartLink}' target="_blank">
    Size chart
    </a>`;
  }
}


export async function loadProductsFetch() {

  showLoading();


  try {
    const response = await fetch(
      'https://bazarbox-ecommerce-1.onrender.com/api/product/all-products'
    );

    if (!response.ok) {
      throw new Error("Failed to fetched products");
    }

    const productsData = await response.json();

    products = productsData.products.map((productsDetails) => {
      if (productsDetails.type === 'clothing') {
        return new Clothing(productsDetails);
      }
      return new Product(productsDetails);
    });



  } catch (error) {
    console.log('failed to fetched products', error);
  }finally {

        hideLoading();

    }
}

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });


  return matchingProduct;
}

