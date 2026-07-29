function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];
            }
        },

        saveTostorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cart));
        },


        addToCart(productId, number) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += Number(number);
            }
            else {
                this.cartItems.push({
                    productId: productId,
                    quantity: Number(number),
                    deliveryOptionId: '1'
                });
            }
            // document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity() || 0;

            this.saveTostorage();
        },



        removeFromCart(productId) {
            const newCart = [];

            this.cartItmes.forEach((cartItem) => {
                if (cartItem.productId != productId) {
                    newCart.push(cartItem);
                }
            });

            this.cartItems = newCart;
            document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
            this.saveTostorage();
        },



        updateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },



        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveTostorage();
        },




        updateQuantity(productId, newQuantity) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.saveTostorage();
        },



        totalCartQuantity() {
            let totalQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                totalQuantity += Number(cartItem.quantity);
            })

            return totalQuantity;
        }
    };

    return cart;
};


const cart = Cart('cart-opp');
const businessCart = Cart('cart-business');

cart.loadFromStorage();




businessCart.loadFromStorage();


cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add', 2);
console.log(cart);

console.log(businessCart);
























