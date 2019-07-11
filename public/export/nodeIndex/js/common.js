/*
$('.am-slider').flexslider({
    slideshowSpeed: 2000,
    controlNav: false,
});

*/


$('.nav-icon').on('mouseenter',function () {
    $('.nav').fadeIn()
});

$('.nav').on('mouseleave',function () {

    setTimeout(function () {
        $('.nav').fadeOut()
    },500)

})