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