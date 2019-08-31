import orders from 'mockData/orders';

const normalize = (order: any) => ({
    ...order,
    position: [parseFloat(order.long), parseFloat(order.lat)],
});

export const getOrderList = () => {
    return orders.map(normalize)
}