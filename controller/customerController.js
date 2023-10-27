import {customer_db} from '../db/db.js';
import {CustomerModel} from '../model/customerModel.js';

const sriLankaMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;

const addressRegex = /^[a-zA-Z0-9\s\,\''\-]*$/;

// clean inputs
const cleanInputs = () => {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#contactNo').val('');
};

// load customers
const loadCustomer = () =>{

      $('#customer-tbl-body').empty();

      customer_db.map((item, index) =>{
          let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_name">${item.customer_name}</td><td class="customer_address">${item.customer_address}</td><td class="contactNo">${item.contactNo}</td></tr>`;
          $('#customer-tbl-body').append(tbl_row);
      });
};

// btn variables

let submit = $('#button>button').first();
let delete_btn = $('#button>button').eq(2);
let update = $('#button>button').eq(1);

// add customers
submit.on('click', ()=>{
    let customer_id = $('#customerId').val();
    let customer_name = $('#customerName').val();
    let customer_address = $('#customerAddress').val();
    let contactNo = $('#contactNo').val();

    if (customer_id){
        if (customer_name){
            let isValidAddress = addressRegex.test(customer_address);
            if (customer_address && isValidAddress){
                let isValidMobileNumber = sriLankaMobileNumberRegex.test(contactNo);
                if (contactNo && isValidMobileNumber){
                    let customer = new CustomerModel(customer_id,customer_name,customer_address,contactNo);
                    customer_db.push(customer);

                    Swal.fire(
                        'Success!',
                        'Customer has been saved successfully!',
                        'success'
                    );

                    cleanInputs();
                    loadCustomer();
                }else {
                    toastr.error('Invalid Customer Mobile Number')
                }
            }else {
                toastr.error('Invalid Customer Address');
            }
        }else {
            toastr.error('Invalid Customer Name')
        }
    }else {
        toastr.error('Invalid Customer Id');
    }
});

$('#customer-tbl-body').on('click', 'tr', ()=>{
    let index = $('#customer-tbl-body').index();

    let customer_id = $('#customer-tbl-body').find('.customer_id').text();
    let customer_name = $('#customer-tbl-body').find('.customer_name').text();
    let customer_address = $('#customer-tbl-body').find('.customer_address').text();
    let contactNo = $('#customer-tbl-body').find('.contactNo').text();

    $('#customerId').val(customer_id);
    $('#customerName').val(customer_name);
    $('#customerAddress').val(customer_address);
    $('#contactNo').val(contactNo);

    console.log(index);
    console.log( customer_id);
});

delete_btn.on('click', ()=>{
    $('#customer-tbl-body').each(()=>{
        let customer_id_val = $('#customerId').val();
        let customer_id = $('#customer-tbl-body').find('.customer_id').text();

        if (customer_id === customer_id_val){
            $('#customer-tbl-body').remove();

            Swal.fire(
                'Success!',
                'Customer has been deleted successfully!',
                'success'
            );

            cleanInputs();
        }
    });
});

update.on('click', ()=>{
    let customer_id_val = $('#customerId').val();
    let customer_id = $('#customer-tbl-body').find('.customer_id').text();
    let customer_name = $('#customerName').val();
    let customer_address = $('#customerAddress').val();
    let contactNo = $('#contactNo').val();

    if (customer_id === customer_id_val){
        $('#customer-tbl-body').find('.customer_name').text(customer_name);
        $('#customer-tbl-body').find('.customer_address').text(customer_address);
        $('#customer-tbl-body').find('.contactNo').text(contactNo);

        Swal.fire(
            'Success!',
            'Customer has been deleted successfully!',
            'success'
        );

        cleanInputs();
    }
});