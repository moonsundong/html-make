
(function () {

    /*初始化/恢复原始状态*/
    var CLONE_ELE;
    var CLONE_ANI;
    var LOOP;
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
                eval("animateSet.animate"+mySwiper.realIndex +'()');
                eval("animateSet.loop"+mySwiper.realIndex +'()');
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
            var aniFunStr='';
            var loopFunStr='';
            $(item).find('.animate').each(function () {
                if($(this).width()>=750 && $(this).height()>=1460){
                    $(this).removeClass('animate')
                }else {
                    var imgSrc=$(this).attr('src');
                    var  animate = $(this).attr('animate') || 'transition.bounceUpIn';
                    var  duration = $(this).attr('duration') || 750;
                    var  delay = $(this).attr('delay') || 500;
                    if(animate){
                        aniFunStr+= `$('[src="`+imgSrc+`"]').velocity("`+animate+`",{duration:`+duration+`,delay:`+delay+`});`
                    }
                }

            });
            $(item).find('.loop').each(function () {
                if($(this).attr('animateLoop')){
                    var imgSrc=$(this).attr('src');
                    var loopObj = JSON.parse($(this).attr('animateLoop'));
                    if(loopObj.runStatus){
                        $(this).velocity(loopObj.animate,loopObj.opt)
                    }else {
                        var animate = JSON.stringify(loopObj.animate)
                        var opt= JSON.stringify(loopObj.opt);
                        console.log(animate,opt);
                        loopFunStr+= `$('[src="`+imgSrc+`"]').velocity(`+animate+`,`+opt+`);`
                    }
                }
            });
            animateSet['animate'+index] = new Function('',aniFunStr);
            animateSet['loop'+index] = new Function('',loopFunStr);
        });
        console.log(animateSet)
    }
    animateReset();
    /*初始化swiper*/
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        initialSlide :0,
        onInit:function(swiper){
        },
        loop: false,
        hashnav:window.location.href.indexOf('special')<0,
        noSwiping:true,
        noSwipingClass:'stop-swiping',
        onSlideChangeEnd:function(swiper){
            eval("animateSet.loop"+swiper.realIndex +'()');
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
/*-------------------left tool-----------------------------*/
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
    /*隐藏元素*/
    $('#hide_ele').on('click',function () {
        $('.act').addClass('dn');
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    $('#show_ele').on('click',function () {
       $('#swiperView .swiper-slide').eq(mySwiper.activeIndex).find('.dn').removeClass('dn')
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    $('#copy_ele').on('click',function () {
        CLONE_ELE = $('.act').clone();
    });
    $('#insert_ele').on('click',function () {
        if(!CLONE_ELE){
            return swal('并没有复制dom！！！')
        }
        $('#swiperView .swiper-slide').removeClass('active');
        $('#swiperView .swiper-slide').eq(mySwiper.activeIndex).append(CLONE_ELE);
        var newSrc = $('#swiperView .swiper-slide').eq(mySwiper.activeIndex).find('.act').attr('src')+'?'+new Date().getTime()
        $('.act').attr('src',newSrc)
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    $('#delete_ele').on('click',function () {
        $('.act').remove();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
   //点击拖动的图片添加class，并给图片设置动画选项，右侧按钮
    $("#phone").on('click','img',function (e) {
        e.preventDefault();
       $("#phone").find("img").removeClass('act');
       $(this).addClass('act');
   });
    /*复制动画*/
    $('#copy_animate').on('click',function (e) {
        e.preventDefault();
        var animate = $('.act').attr('animate');
        var duration = $('.act').attr('duration');
        var delay = $('.act').attr('duration');
        var animateLoop = $('.act').attr('animateLoop') || null;
        CLONE_ANI={
            animate:{
                delay:delay || 500,duration:duration || 500,animate:animate || 'transition.bounceUpIn'
            },
            animateLoop:animateLoop
        };
        console.log(CLONE_ANI)
    });
    /*复制应用动画*/
    $('#apply_animate').on('click',function (e) {
        e.preventDefault();
        console.log(CLONE_ANI);
        if(!CLONE_ANI.animateLoop){
            $('.act').attr(CLONE_ANI.animate);
            $('.act').velocity(CLONE_ANI.animate.animate,{duration:CLONE_ANI.animate.duration,delay:CLONE_ANI.animate.delay});
        }else {
            var loopAnimate = JSON.parse(CLONE_ANI.animateLoop);

           if(loopAnimate.runStatus == 1 && $('.act').attr('class').indexOf('animate')>=0){
               return swal('不能添加,有入场动画元素不能添加永久循环动画')
           }else {
                 $('.act').attr(CLONE_ANI.animate);
                 $('.act').attr('animateLoop',CLONE_ANI.animateLoop);
                 $('.act').addClass('loop');
                 $('.act').velocity('stop',true).velocity('finish',true);
                 $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0,complete:function () {
                     $('.act').velocity(CLONE_ANI.animate.animate,{duration:CLONE_ANI.animate.duration,delay:CLONE_ANI.animate.delay});
                     var loopAnimate = JSON.parse(CLONE_ANI.animateLoop)
                     $('.act').velocity(loopAnimate.animate,loopAnimate.opt)
               }});
           }


        }
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())

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

       $('.act').removeClass('animate loop');
       $('.act').removeAttr('animate delay duration animateLoop');
       $('.act').velocity('stop',true).velocity('finish',true);
       $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0})
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html());
    });
    /*选择基本动画*/
    $('.js-example-basic-single').on('change',function () {
        $('.act').addClass('animate');
        $('.act').attr('animate',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    })
    /*配置动画时间*/
    $('#duration').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('duration',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    /*配置动画延迟*/
    $('#delay').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('delay',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    /*应用上次动画*/
    $('.apply-animate-last').on('click',function (e) {
        e.preventDefault()
        $('.act').attr('duration',$('#duration').val());
        $('.act').attr('animate',$('.js-example-basic-single').val());
        var newDelay=parseInt($('#delay').val())+parseInt($(this).attr('data')) || (parseInt($(this).attr('data')))
        $('#delay').val(newDelay);
        $('.act').attr('delay',newDelay);
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    /*循环动画模态框打开*/
    $('#add_animate_loop').on('click',function (e) {
        e.preventDefault();
        if(!$('.act').attr('src')){
            return swal('并未选择元素')
        }else {
            $('#operate_img').attr('src',$('.act').attr('src'))
            $('#animate_loop_modal').modal('open')
        }

    });
    /*循环动画添加*/
    $('#loop_pre').on('click',function (e) {

        e.preventDefault();
        delete LOOP;
        $('#operate_img').velocity('stop',true).velocity('finish',true);
        $('#operate_img').removeAttr('style')
        console.log(parseInt($('.opacity').eq(1).val()),$('.opacity').eq(0).val())
        LOOP={
           animate:{
               translateX:[$('.translateX').eq(1).val() ? $('.translateX').eq(1).val()+'%' : 0+'%',$('.translateX').eq(0).val() ?  $('.translateX').eq(0).val()+ '%' : 0+'%'],
               translateY:[$('.translateY').eq(1).val() ? $('.translateY').eq(1).val()+'%' : 0+'%',$('.translateY').eq(0).val() ?  $('.translateY').eq(0).val()+ '%' : 0+'%'],
               scaleX:[$('.scaleX').eq(1).val() || 1 ,$('.scaleX').eq(0).val() || 1 ],
               scaleY:[$('.scaleY').eq(1).val() || 1 ,$('.scaleY').eq(0).val() || 1 ],
               opacity:[$('.opacity').eq(1).val() ? parseFloat($('.opacity').eq(1).val()) : 1 ,$('.opacity').eq(0).val() ? parseFloat($('.opacity').eq(0).val()) : 1 ],
               rotateZ:[$('.rotateZ').eq(1).val() || 0  ,$('.rotateZ').eq(0).val() || 0 ],
           },
           opt:{
               duration:parseInt($('#loop_duration').val()) || 1000,
               easing:$('#loop_easing').val() || 'easing',
               loop: (function () {
                   if(!$('#loop_loop').val()){
                       return 200
                   }else if($('#loop_loop').val() == '0'){
                       return  true
                   }else {
                       return parseInt($('#loop_loop').val())
                   }

               })(),
           },
            runStatus : (function () {
                if($('#loop_loop').val() == '0'){
                    return  1
                }else {
                    return 0
                }
            })()
        };
        console.log(LOOP)
        $('#operate_img').velocity('finish',true)
        $('#operate_img').velocity(LOOP.animate,LOOP.opt)
    })
    /*循环动画重置*/
    $('#loop_rest').on('click',function () {
        $('#operate_img').velocity('stop',true).velocity('finish',true);
        $('#operate_img').removeAttr('style')
    });
    /*循环动画使用*/
    $('#loop_apply').on('click',function () {
        $('#operate_img').velocity('stop',true).velocity('finish',true);
        $('#operate_img').removeAttr('style');
        $('.act').velocity('stop',true).velocity('finish',true);
        $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0});
        $('.act').attr('animateLoop',JSON.stringify(LOOP));
        console.log(LOOP.runStatus)
        if(LOOP.runStatus){
            $('.act').removeClass('animate');
            $( '.act').removeAttr('animate');
            $('.act').removeAttr('delay');
            $('.act').removeAttr('duration');
            $('.act').addClass('loop');
        }else {
           if($('.act').attr('class').indexOf('animate')<0){
               $('#animate_loop_modal').modal('close')
               return swal('请先先添加入场动画');
           }else {
               $('#animate_loop_modal').modal('close')
               $('.act').addClass('loop');
           }
        }
        $('#animate_loop_modal').modal('close')
        localStorage.setItem('phoneData',$('#swiperView').html())
        animateReset()
    });
    /*重置循环动画*/
    $('#reset_animate_loop').on('click',function (e) {
        e.preventDefault();
        $('.act').velocity('stop',true).velocity('finish',true);
        $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0});
        $('.act').removeClass('loop').removeAttr('animateloop');

        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    });
    /*模板动画智能解析*/

    function aIAnimate() {
        var saveAnimate;

        $('#swiperView').children('.swiper-slide').each(function (index,item) {
            var delay=0;
            var setDelay = parseInt($('#ai_delay').val()) || 750
            var duration = parseInt($('#ai_duration').val()) || 1000;
            var domSave = []
            $(item).find('.animate').each(function () {
                var h = $(this).height();
                var t = parseFloat($(this).css('top'));
               domSave.push({
                   img:$(this).attr('src'),
                   distance:750-(h/2+t)
               })
            });
            var arr = _.sortBy(domSave,'distance');
            var arr1 = _.reverse(arr)
            arr1.forEach(function (item1,index1) {
                var dom = $('[src="'+ item1.img+'"]');
                var animate;
                console.log(dom.width(),dom.height())
                if(dom.width()>=750 && dom.height()>=1460){
                    $(dom).removeClass('animate')
                }else {
                    var h = dom.height();
                    var w = dom.width();
                    var l = parseFloat(dom.css('left'));
                    var t = parseFloat(dom.css('top'));
                    var centerPos = [w/2+l,h/2+t];
                    var centerPosPer = [centerPos[1]/1460,1-centerPos[0]/750,1-centerPos[1]/1460,centerPos[0]/750];/*padding规则*/
                    var min =_.min(centerPosPer);
                    var index =  _.indexOf(centerPosPer,min);
                    var area = h*w;
                    if(area<10000){
                        delay+= setDelay;
                        animate = 'transition.expandIn';
                        var attr = {
                            delay:delay,
                            animate:animate,
                            duration:duration
                        };
                        dom.attr(attr);
                    }else if(area>750*750){
                        animate = 'transition.shrinkIn';
                        var attr = {
                            delay:Math.random()*2000,
                            animate:animate,
                            duration:duration
                        };
                        dom.attr(attr);
                    }else {
                        switch (index){
                            case 0:
                                delay+= setDelay;
                                animate = 'transition.slideDownBigIn';
                                var attr = {
                                    delay:delay,
                                    animate:animate,
                                    duration:duration
                                };
                                dom.attr(attr);
                                break;
                            case 1:
                                delay+=setDelay;
                                animate = 'transition.slideRightBigIn';
                                var attr = {
                                    delay:delay,
                                    animate:animate,
                                    duration:duration
                                };
                                dom.attr(attr);
                                break;
                            case 2:
                                delay+=setDelay;
                                animate = 'transition.slideUpBigIn';
                                var attr = {
                                    delay:delay,
                                    animate:animate,
                                    duration:duration
                                };
                                dom.attr(attr);
                                break;
                            case 3:
                                delay+=setDelay;
                                animate = 'transition.slideLeftBigIn';
                                var attr = {
                                    delay:delay,
                                    animate:animate,
                                    duration:duration
                                };
                                dom.attr(attr);
                                break;
                        }
                    }


                }
            })
        });
        animateReset();
        localStorage.setItem('phoneData',$('#swiperView').html())
    }
    $('#ai_animate').on('click',function () {
        aIAnimate()
    })


    /*下载*/
    $('#downloadHtml').on('click',function (e) {
        e.preventDefault();
        $('.html').html($('#swiperView').html());
        $('.html img').removeAttr('style');
        $('.html .swiper-slide').removeClass('swiper-slide-active swiper-slide-next swiper-slide-prev');
        $('.html .swiper-slide').removeAttr('style');
        var html =  $('.html').html();
        $('#my-modal-loading').modal('open')
        axios.post('/page_turning/download', {
            html:html,
            compress:$('#compress_img').val() || 100,
        })
            .then(function (response) {
                if(response.status == 200){
                    $('#my-modal-loading').modal('close');
                    console.log(response.data.url);
                    window.location.href = response.data.url
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })

})();