window.addEventListener('load', ()=>{
    $('#navbar-nav>a').eq(0).css("color", "black");
    $('#navbar-nav>a').eq(1).css("color", "white");
    $('#navbar-nav>a').eq(2).css("color", "white");
    $('#navbar-nav>a').eq(3).css("color", "white");
});

const myFunction = function () {
    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'block';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'none';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'none';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'block';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'none';
}

const myFunction1 = function () {
    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'block';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'none';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'block';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'none';
}

const myFunction2 = function () {
    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'none';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'block';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'block';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'none';
}

const myFunction3 = function () {
    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'none';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'none';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'block';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'block';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'none';
}

const myFunction4 = function () {
    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'none';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'none';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'block';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'block';
}

$(document).ready(function () {

    const loadingScreen = document.querySelector('.home_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('.customer_manage');
    loadingScreen1.style.display = 'none';

    const loadingScreen2 = document.querySelector('.itemManage');
    loadingScreen2.style.display = 'none';

    const loadingScreen3 = document.querySelector('.header');
    loadingScreen3.style.display = 'none';

    const loadingScreen4 = document.querySelector('.orderForm');
    loadingScreen4.style.display = 'none';

    const loadingScreen5 = document.querySelector('.orderDetailsForm');
    loadingScreen5.style.display = 'none';

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

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById('barChart').getContext('2d');
    var data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
        datasets: [{
            label: 'Data Set 1',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [12, 19, 3, 5]
        }]
    };

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false, // Allow chart to be responsive
            responsive: true,           // Enable responsiveness
        }
    });
});

$('#navbar-nav>a').eq(0).on('click', function (){
    myFunction();
    $('#navbar-nav>a').eq(0).css("color", "black");
    $('#navbar-nav>a').eq(1).css("color", "white");
    $('#navbar-nav>a').eq(2).css("color", "white");
    $('#navbar-nav>a').eq(3).css("color", "white");
});

$('#navbar-nav>a').eq(1).on('click', function (){
    myFunction1();
    $('#navbar-nav>a').eq(0).css("color", "white");
    $('#navbar-nav>a').eq(1).css("color", "black");
    $('#navbar-nav>a').eq(2).css("color", "white");
    $('#navbar-nav>a').eq(3).css("color", "white");
});

$('#navbar-nav>a').eq(2).on('click', function (){
    myFunction2();
    $('#navbar-nav>a').eq(0).css("color", "white");
    $('#navbar-nav>a').eq(1).css("color", "white");
    $('#navbar-nav>a').eq(2).css("color", "black");
    $('#navbar-nav>a').eq(3).css("color", "white");
});

$('#navbar-nav>a').eq(3).on('click', function (){
    myFunction3();
    $('#navbar-nav>a').eq(0).css("color", "white");
    $('#navbar-nav>a').eq(1).css("color", "white");
    $('#navbar-nav>a').eq(2).css("color", "white");
    $('#navbar-nav>a').eq(3).css("color", "black");
});

$('#navbar-nav>a>button').on('click', function (){
    myFunction4();
    $('#navbar-nav>a').eq(0).css("color", "white");
    $('#navbar-nav>a').eq(1).css("color", "white");
    $('#navbar-nav>a').eq(2).css("color", "white");
    $('#navbar-nav>a').eq(3).css("color", "white");
});