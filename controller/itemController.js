import {ItemModel} from '../model/itemModel.js';
import {item_db} from '../db/db.js';

const itemPriceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;

let submit = $('#button1>button').first();
let update = $('#button1>button').eq(1);
let delete_btn = $('#button1>button').eq(2);
let reset = $('#button1>button').eq(3);

let itemId = $('#itemId');
let itemDescription = $('#itemDescription');
let itemPrice = $('#itemPrice');
let itemQty = $('#itemQty');

const cleanInputs = () => {
    $('#itemId').val('');
    $('#itemDescription').val('');
    $('#itemPrice').val('');
    $('#itemQty').val('');
};

/*Function to generate the next Item ID*/
function generateItemCode() {
    let itId = 0;
    for (let i = 0; i < item_db.length; i++) {
        if (item_db[i].item_id > itId) {
            itId = item_db[i].item_id;
        }
    }
    return itId + 1;
}

$('.nav-link').eq(2).on('click', function (){
    itemId.val(generateItemCode());
    populateItemTable();
})

function populateItemTable(){
    console.log("Item table populate");
    $('#item-tbl-body').eq(0).empty();
    item_db.map((item) => {
        $('#item-tbl-body').eq(0).append(
            `<tr>
                <th scope="row">${item.item_id}</th>
                <td>${item.item_description}</td>
                <td>${item.item_price}</td>
                <td>${item.item_qty}</td>
            </tr>`
        );
    });
}

function resetColumns(){
    reset.click();
    itemId.val(generateItemCode());
}

/*Validation*/
function validation(value,message,test){
    if(!value){
        showValidationError('Null Input','Input '+message);
        return false;
    }
    if(test===null){
        return true;
    }
    if(!test){
        showValidationError('Invalid Input','Invalid Input '+message);
        return false;
    }
    return true;
}

/*Show Validation Error*/
function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

submit.on('click', function (){
    let itemIdValue = parseInt(itemId.val(), 10);
    let itemDescriptionValue = itemDescription.val().trim();
    let itemPriceValue = parseFloat(itemPrice.val());
    let itemQtyValue = parseInt(itemQty.val(), 10);

    if (validation(itemDescriptionValue, "item description", null) &&
        validation(itemPriceValue, "Price", null) &&
        validation(itemQtyValue, "Qty On Hand",null)){

        let items = new ItemModel(
            itemIdValue,
            itemDescriptionValue,
            itemPriceValue,
            itemQtyValue
        );

        Swal.fire(
            'Save Successfully !',
            'Successful',
            'success'
        )

        item_db.push(items);
        populateItemTable();
        resetColumns();
    }
})

$('#table1').on('click', '#item-tbl-body tr', function() {

    let itemIdValue = $(this).find('th').text();
    let itemDescriptionValue = $(this).find('td:eq(0)').text();
    let itemPriceValue = $(this).find('td:eq(1)').text();
    let itemQtyValue = $(this).find('td:eq(2)').text();

    console.log(itemDescriptionValue);

    itemId.val(itemIdValue);
    itemDescription.val(itemDescriptionValue);
    itemPrice.val(itemPriceValue);
    itemQty.val(itemQtyValue);

});

update.on('click', function (){
    let itemIdValue = parseInt(itemId.val(), 10);
    let itemDescriptionValue = itemDescription.val().trim();
    let itemPriceValue = parseFloat(itemPrice.val());
    let itemQtyValue = parseInt(itemQty.val(), 10);

    if (
        validation(itemDescriptionValue, "item description", null) &&
        validation(itemPriceValue, "Price", null) &&
        validation(itemQtyValue, "Qty On Hand",null)){

        item_db.map((item) => {
            if (item.item_id === itemIdValue){
                item.item_description = itemDescriptionValue;
                item.item_price = itemPriceValue;
                item.item_qty = itemQtyValue;
            }
        })

        Swal.fire(
            'Update Successfully !',
            'Successful',
            'success'
        )

        populateItemTable();

        resetColumns();
    }
})

delete_btn.on('click', function (){
    let itemIdValue = parseInt(itemId.val(), 10);

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            let index = item_db.findIndex(item => item.item_id === itemIdValue);
            item_db.splice(index, 1);
            populateItemTable();
            reset.click();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    });
})

