$(document).ready(function () {

    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'none';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'none';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'none';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'none';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'none';


    var counter = 0;
    var c = 0;
    var i = setInterval(function () {
        $(".loading-page>.counter>h1").html(c + "%");
        $(".loading-page>.counter>hr").css("width", c + "%");
        counter++;
        c++;

        if (counter == 102) {
            clearInterval(i);
            const loadingScreen = document.querySelector('.loading-page');
            loadingScreen.style.display = 'none';
            myFunction();

        }
    }, 50);
});


const myFunction = function () {
    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'block';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'block';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'none';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'none';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'none';

}

const myFunction1 = function () {
    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'none';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'block';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'block';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'none';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'none';

}

const myFunction2 = function () {
    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'none';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'block';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'none';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'block';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'none';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'none';

}

const myFunction3 = function () {
    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'none';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'block';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'none';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'block';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'none';

}

const myFunction4 = function () {
    const loadingScreen = document.querySelector('.home');
    loadingScreen.style.display = 'none';

    const loadingScreen3 = document.querySelector('#navBar');
    loadingScreen3.style.display = 'block';

    const loadingScreen2 = document.querySelector('.customer');
    loadingScreen2.style.display = 'none';

    const loadingScreen4 = document.querySelector('.item');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.order');
    loadingScreen5.style.display = 'none';

    const loadingScreen6 = document.querySelector('.order_Details');
    loadingScreen6.style.display = 'block';

}

$("#home_page").eq(0).on('click', function (){
    myFunction();
    $("#home_page").eq(0).css("color","black");
    $("#customer_page").eq(0).css("color","white");
    $("#item_page").eq(0).css("color", "white");
    $("#order_page").eq(0).css("color","white");
})

$("#customer_page").eq(0).on('click', function (){
    myFunction1();
    $("#home_page").eq(0).css("color","white");
    $("#customer_page").eq(0).css("color","black");
    $("#item_page").eq(0).css("color", "white");
    $("#order_page").eq(0).css("color","white");
})

$("#item_page").eq(0).on('click', function (){
    myFunction2();
    $("#home_page").eq(0).css("color","white");
    $("#customer_page").eq(0).css("color","white");
    $("#item_page").eq(0).css("color", "black");
    $("#order_page").eq(0).css("color","white");
})

$("#order_page").eq(0).on('click', function (){
    myFunction3();
    $("#home_page").eq(0).css("color","white");
    $("#customer_page").eq(0).css("color","white");
    $("#item_page").eq(0).css("color", "white");
    $("#order_page").eq(0).css("color","black");
})

$("#order_details_page").eq(0).on('click', function (){
    myFunction4();
    $("#home_page").eq(0).css("color","white");
    $("#customer_page").eq(0).css("color","white");
    $("#item_page").eq(0).css("color", "white");
    $("#order_page").eq(0).css("color","white");
})
