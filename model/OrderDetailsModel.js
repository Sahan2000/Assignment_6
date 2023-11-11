export class OrderDetailsModel{
    constructor(orderId,itemId,price,qty) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.price = price;
        this.qty = qty;
    }
}