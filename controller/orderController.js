import {customer_db, order_db} from "../db/db.js";
import {OrderModel} from "../model/orderModel";
import {CustomerModel} from "../model/customerModel";

const selectEl = $('#customerId1');
const btnSugar = $('#btnSugar');

selectEl.on('change', () => {
    console.log('changed');
});

btnSugar.on('click', () => {
    selectEl.val('sugar').change();
});

window.addEventListener('load', ()=>{
    console.log("hi");
    for (let i=0; i<customer_db.length; i++){
        $('#customerId1').eq(0).append(
            `<option value=i>${customer_db.customer_id}</option>`
        )
    }

})