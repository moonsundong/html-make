(function () {

    if(localStorage.getItem('phoneData')){
        swal({
            title: '是否恢复最近的操作金鹿?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '取消',
            confirmButtonText: '恢复'
        }).then((result) => {
            if (result.value) {

                $('#swiperView').html(localStorage.getItem('phoneData'))
                animateReset()

                swal(
                    '恢复成功',
                    '页面已恢复',
                    'success'
                )
            }
        })
    }

    var  animateSet={};
    function animateReset(){
        $('#swiperView').children('.swiper-slide').each(function (index,item) {
            var funStr='';
            $(item).find('.animate').each(function () {
                var imgSrc=$(this).attr('src');
                var  animate = $(this).attr('animate') || 'transition.bounceUpIn';
                var  duration = $(this).attr('duration') || 750;
                var  delay = $(this).attr('delay') || 500;
                if(animate){
                    funStr+= `$('[src="`+imgSrc+`"]').velocity("`+animate+`",{duration:`+duration+`,delay:`+delay+`});`
                }
            });
            animateSet['animate'+index] = new Function('',funStr);
        });
    }


    animateReset()
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        initialSlide :0,
        loop: false,
        hashnav:window.location.href.indexOf('special')<0,
        noSwiping:true,
        noSwipingClass:'stop-swiping',
        onSlideChangeStart:function(swiper){


        },
        onSlidePrevStart:function(swiper){
            $('.swiper-slide').eq(swiper.realIndex+1).find('.animate').velocity('finish',true).velocity({opacity:0}, {"display":"none",duration:0});
            eval("animateSet.animate"+swiper.realIndex +'()');
        },
        onSlideNextStart:function(swiper){

            $('.swiper-slide').eq(swiper.realIndex-1).find('.animate').velocity("finish",true).velocity({opacity:0}, {"display":"none",duration:0});
            eval("animateSet.animate"+swiper.realIndex +'()');
        },
    });






    /*H5尺寸切换*/
    var H5_psd_width=750;
    $("input[name='applicationSystem']").on('click',function () {

        var type = $(this).val();
        if (type == '1'){
            $('#phone').css({
                width:640,
                height:1250
            });
            H5_psd_width=640;
            $('.content-line').css('top',1040);

        }else {
            $('#phone').css({
                width:750,
                height:1460
            });
            H5_psd_width=750;
            $('.content-line').css('top',1220)
        };
        mySwiper.update()
    });
    /*H5 element options*/

    $("input[name='animate']").on('click',function () {
        var type = $(this).val();
        if (type == '1'){
           $('.animate-set').hide()
            $('.animate-set').eq(0).show()
        }else {
            $('.animate-set').hide()
            $('.animate-set').eq(1).show()

        };
    });
    /*代码复制*/
    var  clipboard = new ClipboardJS('#createHtml', {
        text: function(trigger) {
            $('.html').html($('#swiperView').html());
            $('.html img').removeAttr('style');
            $('.html .swiper-slide').removeClass('swiper-slide-active swiper-slide-next swiper-slide-prev');
            $('.html .swiper-slide').removeAttr('style');

            return   $('.html').html()
        }
    });
    clipboard.on('success', function(e) {
        swal('复制成功')

        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

   //点击拖动的图片添加class，并给图片设置动画选项，右侧按钮
   $("#phone").on('click','img',function () {
       $("#phone").find("img").removeClass('act');
       $(this).addClass('act');
       $('.js--triggerAnimation').attr("disabled",false);
   });
    $("#phone").on('mousedown','img',function () {
        $("#phone").find("img").removeClass('act');
        $(this).addClass('act');
        $('.js--triggerAnimation').attr("disabled",false);
    });
    $("#phone").on('mouseup','img',function () {
        $("#phone").find("img").removeClass('act');
        $(this).addClass('act');
        $('.js--triggerAnimation').attr("disabled",false);
    });
    $('.js--triggerAnimation').on('click',function () {
        var animations=$('.js--animations').val()

        $("#phone").find('.act').addClass("animated");
        $("#phone").find('.act').addClass(animations);

        $("#phone").find('.act').attr('swiper-animate-effect',animations);
        var timer=setTimeout(function () {
            $("#phone").find('.act').removeClass(animations);
            $("#phone").find('.act').removeClass("animated");
            clearTimeout(timer)
        },800)
    });






/*select2*/
    /*常用选项配置*/
    var arrDefault=["callout.bounce", "callout.shake", "callout.flash", "callout.pulse", "callout.swing", "callout.tada", "transition.fadeIn", "transition.flipXIn", "transition.flipYIn", "transition.flipBounceXIn", "transition.flipBounceYIn", "transition.swoopIn", "transition.whirlIn", "transition.whirlOut", "transition.shrinkIn", "transition.shrinkOut", "transition.expandIn", "transition.bounceIn", "transition.bounceUpIn",  "transition.bounceDownIn", "transition.bounceDownOut", "transition.bounceLeftIn",  "transition.bounceRightIn", "transition.slideUpIn", "transition.slideDownIn", "transition.slideLeftIn",  "transition.slideRightIn",  "transition.slideUpBigIn", "transition.slideDownBigIn", "transition.slideLeftBigIn", "transition.slideRightBigIn", "transition.perspectiveUpIn", "transition.perspectiveUpOut", "transition.perspectiveDownIn", "transition.perspectiveDownOut", "transition.perspectiveLeftIn",  "transition.perspectiveRightIn"]
    arrDefault.forEach(function (item) {

        $('#default_select_option').append($('<option>'+item +'</option>'))
    })
    var arrMy=["self_transition.scaleIn","self_transition.scaleSmallIn","self_transition.scaleSmallBigIn","self_transition.perspectiveLeftUpIn","self_transition.perspectiveLeftDownIn","self_transition.perspectiveLeftDownOut","self_transition.scrollScaleIn","self_transition.scrollBigIn","self_transition.slideLeftOut", "self_transition.slideLeftIn","self_transition.fadeIn","self_transition.slideDownIn","self_transition.slideRightIn","self_transition.slideRightScaleIn","self_transition.slideLeftDownIn","self_transition.slideLeftUpIn","self_transition.slideRightDownIn", "self_transition.slideRightUpIn","self_transition.rotateLeftUpIn","self_transition.rotateRightDownIn", "self_transition.slideUpIn","self_transition.scaleRotateIn", "self_transition.pulseIn","self_transition.slideUpScaleIn","self_transition.slideDownScaleIn", "self_transition.textIn","self_transition.meteorFirstIn","self_transition.meteorSecondIn","self_transition.meteorThirdIn","self_transition.meteorThirdIn","self_transition.translateXIn","self_transition.translateXIn","self_transition.perspectiveLeftIn","self_transition.perspectiveLeftOut","self_transition.perspectiveRightIn","self_transition.perspectiveRightOut","self_transition.perspectiveUpIn","self_transition.perspectiveDownIn","self_transition.flipBounceXIn","self_transition.flipBounceXOut","self_transition.flyLeafIn", "self_transition.flyLeafOut","self_transition.DropIn","self_transition.DropOut","self_transition.jumpIn","self_transition.jumpOut","self_transition.DropThreeIn","self_transition.swoopLeftIn","self_transition.swoopRightIn","self_transition.swoopUpIn", "self_transition.swoopDownIn", "self_transition.whirlIn","self_transition.bounceIn","self_transition.scaleTreeIn"]
    arrMy.forEach(function (item) {
        $('#my_select_option').append($('<option>'+item +'</option>'))
    })
    function matchStart(params, data) {
        // If there are no search terms, return all of the data
        if ($.trim(params.term) === '') {
            return data;
        }

        // Skip if there is no 'children' property
        if (typeof data.children === 'undefined') {
            return null;
        }

        // `data.children` contains the actual options that we are matching against
        var filteredChildren = [];
        $.each(data.children, function (idx, child) {
            if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) >= 0) {
                filteredChildren.push(child);
            }
        });

        // If we matched any of the timezone group's children, then set the matched children on the group
        // and return the group object
        if (filteredChildren.length) {
            var modifiedData = $.extend({}, data, true);
            modifiedData.children = filteredChildren;

            // You can return modified objects from here
            // This includes matching the `children` how you want in nested data sets
            return modifiedData;
        }

        // Return `null` if the term should not be displayed
        return null;
    }

    $(".js-example-basic-single").select2({
        matcher:matchStart
    });
    /*删除动画*/
    $('#delete_animate').on('click',function () {
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html());
       $('.act').removeClass('animate');
       $('.act').removeAttr('animate delay duration');
    });
   // '.data-animate='{"name":"transition.bounceIn","time":"550","delay":"500"}'
    $('.js-example-basic-single').on('change',function () {

        $('.act').attr('animate',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    })

    /*配置动画时间*/
    $('#duration').on('blur',function () {

        $('.act').attr('duration',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    })
    /*配置动画延迟*/
    $('#delay').on('blur',function () {
        $('.act').attr('delay',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    $('.apply-animate-last').on('click',function () {
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
        $('.act').attr('duration',$('#duration').val());
        $('.act').attr('animate',$('.js-example-basic-single').val());
        var newDelay=parseInt($('#delay').val())+parseInt($(this).attr('data')) || (500+parseInt($(this).attr('data')))
        $('#delay').val(newDelay);
        $('.act').attr('delay',newDelay);
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
    });




})();