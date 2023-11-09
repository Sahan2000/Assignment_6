import {customer_db, item_db, order_db} from "../db/db.js";

let customerIdCB = $("#customer_id1");
let customer_name = $("#customerName1");
let customer_address = $("#address1");
let contact = $("#contactNo1");

let itemIdCB= $("#selectItemId");
let itemDescription = $("#selectItemDescription");
let itemPrice = $("#selectItemPrice");
let itemQty = $("#selectItemQty");

let orderId = $("#orderId");
let orderQty = $("#selectItemOrderQty");
let total = $("#totalValue");
let discountInput = $("#discount");
let subTotal = $("#subTotalInput");

let addItemBtn = $("#addItemBtn>button");

let items = [];

function populateCustomerIDs() {
    console.log("hi");
    // Clear existing options except the default one
    customerIdCB.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < customer_db.length; i++) {
        customerIdCB.append($("<option>", {
            value: customer_db[i].customer_id,
            text: customer_db[i].customer_id
        }));
    }
}

function populateItemIDs() {
    // Clear existing options except the default one
    itemIdCB.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < customer_db.length; i++) {
        itemIdCB.append($("<option>", {
            value: item_db[i].item_id,
            text: item_db[i].item_id
        }));
    }
}

$('#navbar-nav>a').eq(3).on('click', ()=>{
    populateCustomerIDs();
    populateItemIDs();
    generateCurrentDate();
    orderId.val(generateOrderId());
    console.log(generateOrderId());
})
customerIdCB.on('change', function () {
    let selectElement = document.getElementById("customer_id1");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let selectedValue = selectedOption.value;

    for (let i = 0; i < customer_db.length; i++) {
        if (Number(selectedValue) === customer_db[i].customer_id){
            customer_name.val(customer_db[i].customer_name);
            customer_address.val(customer_db[i].customer_address);
            contact.val(customer_db[i].contactNo);
        }
    }
});

itemIdCB.on('change', function () {
    let selectElement = document.getElementById("selectItemId");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let selectedValue = selectedOption.value;

    for (let i = 0; i < item_db.length; i++) {
        if (Number(selectedValue) === item_db[i].item_id){
            itemDescription.val(item_db[i].item_description);
            itemPrice.val(item_db[i].item_price);
            itemQty.val(item_db[i].item_qty);
        }
    }
});

function generateCurrentDate(){
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
}

function generateOrderId() {
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

addItemBtn.on('click', function (){
    let itemCodeValue = itemIdCB.val();
    let orderQtyValue = orderQty.val();
    let itemQtyValue = itemQty.val();
    if (Number(orderQtyValue) <= itemQtyValue){
        let itemDescriptionValue = itemDescription.val();
        let itemPriceValue = itemPrice.val();

        /*Add a new item to the items array*/
        items.push({
            itemCode: itemCodeValue,
            itemName: itemDescriptionValue,
            priceValue: itemPriceValue,
            qtyValue: orderQtyValue
        });
        populateItemCartTable();
    }else {
        showValidationError('Invalid Input', 'Out of stock');
    }

    console.log(total);
    total[0].innerText= calculateTotal();

})

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function populateItemCartTable() {
    console.log("jar");
    $('tbody').eq(2).empty();
    items.map((item) => {
        $('tbody').eq(2).append(
            `<tr>
                <th scope="row">${item.itemCode}</th>
                <td>${item.itemName}</td>
                <td>${item.priceValue}</td>
                <td>${item.qtyValue}</td>
            </tr>`
        );
    });
}

function calculateTotal(){
    let total = 0;
    items.forEach((item) => {
        total += item.priceValue * item.qtyValue;
    });
    return total;
}

discountInput.on('input', function (){
    const discountValue = parseFloat(discountInput.val()) || 0; // Get the discount value as a float
    const totalValue = calculateTotal(); // Calculate the total based on your logic
    // Update the sub-total input field
    subTotal[0].innerText = totalValue - (totalValue * (discountValue / 100));
})

