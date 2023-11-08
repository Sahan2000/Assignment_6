export class OrderModel{
    constructor(order_id, order_date, customer_id, item_id, item_price, order_qty, total, discount, sub_total) {
        this.order_id = order_id;
        this.order_date = order_date;
        this.customer_id = customer_id;
        this.item_id = item_id;
        this.item_price = item_price;
        this.order_qty = order_qty;
        this.total = total;
        this.discount = discount;
        this.subtotal = sub_total;
    }
}