export class OrderModel{
    constructor(orderId,orderDate,customerId,total,discount,cash) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.total = total;
        this.discount = discount;
        this.cash = cash;
    }
}