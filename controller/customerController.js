import {customer_db} from '../db/db.js';
import {CustomerModel} from '../model/customerModel.js';

let submit = $('#button>button').first();
let update = $('#button>button').eq(1);
let delete_btn = $('#button>button').eq(2);
let reset = $('#button>button').eq(3);

let customer_id = $('#customerId');
let name = $('#customerName');
let address = $('#customerAddress');
let contact = $('#contactNo');

/*Validation*/
const emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
const mobilePattern = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

// clean inputs
const cleanInputs = () => {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#contactNo').val('');
};

/*Function to generate the next customer ID*/
function generateCustomerId() {
    let custId = 0;
    for (let i = 0; i < customer_db.length; i++) {
        if (customer_db[i].customer_id > custId) {
            custId = customer_db[i].customer_id;
        }
    }
    return custId + 1;
}

function populateCustomerTable() {
    $('#customer-tbl-body').eq(0).empty();
    customer_db.map((customer) => {
        $('#customer-tbl-body').eq(0).append(
            `<tr>
                <th scope="row">${customer.customer_id}</th>
                <td>${customer.customer_name}</td>
                <td>${customer.customer_address}</td>
                <td>${customer.contactNo}</td>
            </tr>`
        );
    });
}

/*Auto-generate the customer ID when navigating to the main section*/
$('.nav-link').eq(1).on('click', function() {
    customer_id.val(generateCustomerId());
    populateCustomerTable();
});

/*Reset Columns*/
function resetColumns() {
    reset.click();
    customer_id.val(generateCustomerId());
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

/*Validation*/
function validation(value,message,test) {
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

/*Customer Form Submit*/
submit.on('click', () => {

    let customerIdValue = parseInt(customer_id.val(), 10);
    let nameValue = name.val().trim();
    let addressValue = address.val().trim();
    let contactValue = contact.val().trim();

    if(
        validation(nameValue, "customer name", null) &&
        validation(addressValue, "Address", null) &&
        validation(contactValue, "Contact", mobilePattern.test(contactValue))){
        let customer = new CustomerModel(
            customerIdValue,
            nameValue,
            addressValue,
            contactValue
        );

        Swal.fire(
            'Save Successfully !',
            'Successful',
            'success'
        )

        customer_db.push(customer);

        populateCustomerTable();

        resetColumns();
    }

});

// Function to populate the form fields with data from a clicked table row
$('.table').on('click', 'tbody tr', function() {
    let customerIdValue = $(this).find('th').text();
    let nameValue = $(this).find('td:eq(0)').text();
    let addressValue = $(this).find('td:eq(1)').text();
    let contactValue = $(this).find('td:eq(2)').text();

    customer_id.val(customerIdValue);
    name.val(nameValue);
    address.val(addressValue);
    contact.val(contactValue);
});

update.on('click', function (){
    let customerIdValue = parseInt(customer_id.val(), 10);
    let nameValue = name.val().trim();
    let addressValue = address.val().trim();
    let contactValue = contact.val().trim();

    if(
        validation(nameValue, "customer name", null) &&
        validation(addressValue, "Address", null) &&
        validation(contactValue, "Contact", mobilePattern.test(contactValue))) {

        customer_db.map((customer) => {
            if (customer.customer_id === customerIdValue) {
                customer.customer_name = nameValue;
                customer.customer_address = addressValue;
                customer.contactNo = contactValue;
            }
        });

        Swal.fire(
            'Update Successfully !',
            'Successful',
            'success'
        )
        populateCustomerTable();
        resetColumns();

    }
})

/*Customer Form Reset*/
reset.on('click', function(e) {
    e.preventDefault();
    customer_id.val(generateCustomerId());
    name.val('');
    address.val('');
    contact.val('');
});

/*Customer Form Delete*/
delete_btn.on('click', () => {

    let customerIdValue = parseInt(customer_id.val(), 10);

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
            let index = customer_db.findIndex(customer => customer.customer_id === customerIdValue);
            customer_db.splice(index, 1);
            populateCustomerTable();
            reset.click();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    });


});

