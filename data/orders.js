
import { getProduct } from "./products.js";



const orderList = JSON.parse(localStorage.getItem('ordersList')) || [];

function saveOrderList(orderList) {
    localStorage.setItem("orderList", JSON.stringify(orderList));
}

export function addOrder(order) {
    if (!order || order.length === 0) {
        alert("Your cart is empty.");
        return null;
    }

    let totalCents = 0;

    
  order.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        if (product) {
            totalCents += product.priceCents * cartItem.quantity;
        }

    });


    const newOrder = {
        id: crypto.randomUUID(),
        orderDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),

        products: [...order],

        totalCents: totalCents
    };

    orderList.unshift(newOrder);
    saveOrderList(orderList);
    

    return newOrder;


}

