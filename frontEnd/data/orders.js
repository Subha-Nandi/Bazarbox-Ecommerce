
import { getProduct } from "./products.js";



// const orderList = JSON.parse(localStorage.getItem('orderList')) || [];

// function saveOrderList(orderList) {
//     localStorage.setItem("orderList", JSON.stringify(orderList));
// }


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
   

    return orderList;

    // renderOrdersList(orderList);


  } catch (error) {
    console.log('failed to fetched products', error);
    return [];
  }
}

// export function addOrder(order) {
//     if (!order || order.length === 0) {
//         alert("Your cart is empty.");
//         return null;
//     }

//     let totalCents = 0;

    
//   order.forEach((cartItem) => {
//         const product = getProduct(cartItem.productId);

//         if (product) {
//             totalCents += product.priceCents * cartItem.quantity;
//         }

//     });


//     const newOrder = {
//         id: crypto.randomUUID(),
//         orderDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),

//         products: [...order],

//         totalCents: totalCents
//     };

//     orderList.unshift(newOrder);
//     saveOrderList(orderList);
    

//     return newOrder;


// }



export async function placeOrder() {
    try {
        const response = await fetch(
            'http://localhost:3000/api/orderList/placeOrder',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to place order');
        }


        return data.order;

    } catch (error) {
        console.log('Error placing order:', error);
        throw error;
    }
}