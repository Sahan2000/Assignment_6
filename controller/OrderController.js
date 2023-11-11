import {order_db} from "../db/db.js";
import {OrderModel} from "../model/OrderModel.js";

import {order_details_db} from "../db/db.js";
import {OrderDetailsModel} from "../model/OrderDetailsModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/CustomerModel.js";

import {item_db} from "../db/db.js";
import {ItemModel} from "../model/ItemModel.js";

let purchase = $("#order_btn>button").eq(0);
let update = $("#order_btn>button").eq(1);
let delete_btn = $("#order_btn>button").eq(2);
let reset = $("#resetBtn").eq(0);

let orderId = $("#orderId");
let orderDate = $("#orderDate");
let customerIdCB = $("#customerId1");
let customerName = $("#customerName1");
let total = $("#total");
let discount = $("#discount");
let subTotal = $("#subTotal");
let cash = $("#cash");
let balance = $("#balance");

let add = $("#order_item_btn>button").eq(0);
let updateItem = $("#order_item_btn>button").eq(1);
let remove = $("#order_item_btn>button").eq(2);
let resetItem = $("#order_item_btn>button").eq(3);

let itemCodeCB = $("#item_code1");
let itemName = $("#item_name1");
let price = $("#price1");
let qtyOnHand = $("#qty_on_hand");
let getOrderQty = $("#getQty");

let searchBtn = $("#search");
let searchInput = $("#searchField");

let items = [];

let search_order=true;

function generateOrderId(){
    let highestOrderId = 0;

    for (let i = 0; i < order_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(order_db[i].order_id.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestOrderId) {
            highestOrderId = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `order-${String(highestOrderId + 1).padStart(3, '0')}`;
}

$("#order_page").eq(0).on('click', function (){
    reset.click();
    update.prop("disabled", true);
    delete_btn.prop("disabled", true);
    remove.prop("disabled",true);
    updateItem.prop("disabled",true);
    /*searchField.attr("placeholder", "Search Order Id Here");*/
})

function generateCurrentDate() {
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
}

function populateCustomerIDs() {
    customerIdCB.find("option:not(:first-child)").remove();
    for (let i = 0; i < customer_db.length; i++) {
        customerIdCB.append($("<option>", {
            value: customer_db[i].customer_id,
            text: customer_db[i].customer_id
        }));
    }
}

customerIdCB.on('change', function (){
    let selectedValue = $(this).val();

    let customerObj = $.grep(customer_db, function (customer){
        return customer.customer_id === selectedValue;
    })

    if (customerObj.length > 0){
        customerName.val(customerObj[0].customer_name);
    }
})

function populateItemIDs() {
    itemCodeCB.find("option:not(:first-child)").remove();
    for (let i= 0; i < item_db.length; i++){
        itemCodeCB.append($("<option>", {
            value: item_db[i].itemCode,
            text: item_db[i].itemCode
        }));
    }
}

itemCodeCB.on('change', function (){
    let selectedValue = $(this).val();

    let itemObj = $.grep(item_db, function (item){
        return item.itemCode === selectedValue;
    });

    if (itemObj.length > 0){
        itemName.val(itemObj[0].itemName);
        price.val(itemObj[0].price);
        qtyOnHand.val(itemObj[0].qty);
    }
})

function resetSelectItemColumns(){
    itemCodeCB.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    getOrderQty.val('');
}

reset.on("click", function () {
    // Reset the form fields to their initial state
    generateCurrentDate();
    populateCustomerIDs();
    populateItemIDs();
    orderId.val(generateOrderId());
    $("#total").val('');       // Reset the total
    $("#discount").val('');    // Reset the discount
    $("#cash").val('');        // Reset the cash input
    customerName.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    total.val('');
    discount.val('');
    cash.val('');
    subTotal.val('');
    balance.val('');

    /*Clear the items array*/
    items = [];

    /*Clear the item order table*/
    $("#item-order-table tbody").empty();

    update.prop("disabled", true);
    delete_btn.prop("disabled", true);
    purchase.prop("disabled",false);

});

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

add.on('click', function (){
    let itemCodeValue = itemCodeCB.val();
    let qtyValue = parseInt(getOrderQty.val());

    if (qtyOnHand.val() >= qtyValue) {
        let itemNameValue = itemName.val();
        let priceValue = price.val();
        let qtyOnHandValue = qtyOnHand.val();

        /*Add a new item to the items array*/
        items.push({
            itemCode: itemCodeValue,
            itemName: itemNameValue,
            priceValue: priceValue,
            qtyOnHand: qtyOnHandValue,
            qtyValue: qtyValue
        });

        /*Populate the Item table*/
        populateItemTable();
    } else {
        showValidationError('Invalid Input', 'Out of stock');
    }

    total.val(calculateTotal());
    /*Reset the item details*/
    resetSelectItemColumns();
})

function populateItemTable() {
    $('tbody').eq(2).empty();
    items.map((item) => {
        $('tbody').eq(2).append(
            `<tr>
                <th scope="row">${item.itemCode}</th>
                <td>${item.itemName}</td>
                <td>${item.priceValue}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.qtyValue}</td>
            </tr>`
        );
    });
}

function calculateTotal(){
    let total = 0;
    items.forEach((item)=>{
        total += item.priceValue * item.qtyValue;
    });
    return total;
}

discount.on('input', function (){
    const discountValue = parseFloat(discount.val()) || 0; // Get the discount value as a float
    const totalValue = calculateTotal(); // Calculate the total based on your logic
    const subtotalValue = totalValue - (totalValue * (discountValue / 100)); // Calculate the subtotal

    // Update the sub-total input field
    subTotal.val(subtotalValue);
})

cash.on('input', function (){
    const cashValue = parseFloat(cash.val()) || 0;
    const totalValue = parseFloat(subTotal.val()) || 0;
    const balanceValue = cashValue - totalValue;

    balance.val(balanceValue);
})

function resetInvoiceDetails(){
    // Reset the form fields to their initial state
    generateCurrentDate();
    populateCustomerIDs();
    populateItemIDs();
    orderId.val(generateOrderId());
    $("#total").val('');       // Reset the total
    $("#discount").val('');    // Reset the discount
    $("#cash").val('');        // Reset the cash input
    customerName.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    total.val('');
    discount.val('');
    cash.val('');
    subTotal.val('');
    balance.val('');

    /*Clear the items array*/
    items = [];

    /*Clear the item order table*/
    $("#item-order-table tbody").empty();

    update.prop("disabled", true);
    delete_btn.prop("disabled", true);
    purchase.prop("disabled",false);
}

purchase.on('click', function (){
    let orderIdValue = orderId.val();
    let orderDateValue = orderDate.val();
    let customerIdValue = customerIdCB.val();
    let totalValue = total.val();
    let discountValue = discount.val();
    let cashValue = cash.val();

    // Validate order data
    if (!orderDateValue) {
        showValidationError('Null Input', 'Please select an order date');
        return;
    }

    if (!orderIdValue) {
        showValidationError('Null Input', 'Please generate an order ID');
        return;
    }

    if (customerIdValue === "Select Customer Id") {
        showValidationError('Invalid Input', 'Please select a customer');
        return;
    }

    if (!totalValue || parseFloat(total) <= 0) {
        showValidationError('Invalid Input', 'Total must be a positive number');
        return;
    }

    if (!cashValue || parseFloat(cash) < 0) {
        showValidationError('Invalid Input', 'Cash amount must be a positive number');
        return;
    }

    const discountValue1 = parseFloat(discountValue);
    if (isNaN(discountValue1) || discountValue1 < 0 || discountValue1 > 100) {
        showValidationError('Invalid Input', 'Discount must be a number between 0 and 100');
        return;
    }

    const order = new OrderModel(orderIdValue,orderDateValue,customerIdValue,totalValue,discountValue,cashValue);

    order_db.push(order);

    items.forEach((item)=>{
        const orderDetails = new OrderDetailsModel(orderIdValue,item.itemCode,item.priceValue,item.qtyValue);
        order_details_db.push(orderDetails);

        item_db.forEach((itemObj)=>{
            if (itemObj.itemCode === item.itemCode){
                itemObj.qty -= item.qtyValue;
            }
        });
    });

    Swal.fire(
        'Order Placed Successfully!',
        'The order has been saved.',
        'success'
    );

    resetInvoiceDetails();
})

function populateFields(orderIdValue) {
    /*Find the corresponding order in the order_db array*/
    let order = order_db.find(order => order.orderId === orderIdValue);

    /*Check if the order is found*/
    if (order) {
        /*Populate the order details on the order page*/
        orderId.val(order.orderId);
        orderDate.val(order.orderDate);
        customerIdCB.val(order.customer_id);
        total.val(order.total);
        discount.val(order.discount);

        /*Calculate the subtotal and update the input*/
        const discountValue = parseFloat(discount.val()) || 0;
        const totalValue = parseFloat(total.val()) || 0;

        const subtotalValue = totalValue - (totalValue * (discountValue / 100));
        subTotal.val(subtotalValue.toFixed(2)); // Use toFixed to round to two decimal places

        cash.val(order.cash);

        /*Calculate the balance and update the input*/
        const cashValue = parseFloat(cash.val()) || 0;
        const balanceValue = cashValue - subtotalValue;
        balance.val(balanceValue.toFixed(2)); // Use toFixed to round to two decimal places

        /*Populate the customer name based on the selected customer ID*/
        let customerObj = $.grep(customer_db, function(customer) {
            return customer.customer_id === order.customerId;
        });

        if (customerObj.length > 0) {
            /*Access the first element in the filtered array*/
            customerName.val(customerObj[0].customer_name);
        }

        /*Populate the items table on the order page*/
        items = order_details_db
            .filter(orderDetail => orderDetail.orderId === orderIdValue)
            .map(orderDetail => {
                /*Find the corresponding item in the item_db array*/
                let item = item_db.find(item => item && item.itemCode === orderDetail.itemCode);

                if (item) {
                    return {
                        itemCode: item.itemCode,
                        itemName: item.itemName,
                        priceValue: item.price,
                        qtyOnHand: item.qty,
                        qtyValue: orderDetail.qty
                    };
                } else {
                    /*Handle the case where the item is not found*/
                    console.error(`Item not found for item code: ${orderDetail.itemCode}`);
                    return null; /*or handle it accordingly*/
                }
            });

        /*Filter out items that are null (not found)*/
        items = items.filter(item => item !== null);

        populateItemTable();

        update.prop("disabled", false);
        delete_btn.prop("disabled", false);
        purchase.prop("disabled",true);

    } else {
        /*Show an error message if the order is not found*/
        showValidationError('Order Not Found', 'The selected order details could not be found.');
    }
}

searchBtn.on("click",function (e){
    if(search_order){
        populateFields(searchInput.val());
        searchInput.val('');
    }
});
