
setTimeout(function () {
   $('.am-slider-default .am-control-nav li a').css('display','block')
},500);

$('.am-slider').flexslider({
    slideshowSpeed: 3000,
    pauseOnAction: false,
    playAfterPaused: 5,
    controlNav: false,               // Boolean: 是否创建控制点
    directionNav: true,

});

$("#marquee1").kxbdMarquee({direction:"right"});
$(window).on('scroll',function () {

    if($(this).scrollTop() >600){
       $('.boy,.girl').fadeIn()
    }else {
        $('.boy,.girl').fadeOut()
    }
})

$('.abc').velocity({opacity:[1,0],scaleX:[1,0],scaleY:[1,0]},{loop:true,duration:1000,easing:'linear'});

$('.mouse').velocity({translateY:[3,-3]},{loop:true,duration:1000,easing:'linear'})



