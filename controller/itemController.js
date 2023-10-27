import {ItemModel} from '../model/itemModel.js';
import {item_db} from '../db/db.js';

const itemPriceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;

const cleanInputs = ()=>{
    $('#itemId').val('');
    $('#itemDescription').val('');
    $('#itemPrice').val('');
    $('#itemQty').val('');
};

const loadItems = ()=>{
    $('#item-tbl-body').empty();

    item_db.map((item, index) =>{
        let tbl_row = `<tr><td class="item_id">${item.item_id}</td>
        <td class="item_description">${item.item_description}</td><td class="item_price">${item.item_price}</td>
        <td class="item_price">${item.item_qty}</td></tr>`;

        $('#item-tbl-body').append(tbl_row);
    });
};

let submit = $('#button>button').first();

submit.on('click', ()=>{
    let item_id = $('#itemId').val();
    let item_description = $('#itemDescription').val();
    let item_price = $('#itemPrice').val();
    let item_qty = $('#itemQty').val();

    if (item_id){
        if (item_description){
            let isValidPrice = itemPriceRegex.test(item_price);

            if (item_price && isValidPrice){
                if (item_qty){
                    let items = new ItemModel(item_id,item_description,item_price,item_qty);
                    item_db.push(items);

                    swal.fire(
                        'Success!',
                        'Customer has been saved successfully!',
                        'success'
                    );

                    cleanInputs();
                    loadItems();
                }else {
                    toastr.error('Invalid item qty');
                }
            }else {
                toastr.error('Invalid item price');
            }
        }else {
            toastr.error('Invalid item description');
        }
    }else {
        toastr.error('Invalid item id');
    }
});



