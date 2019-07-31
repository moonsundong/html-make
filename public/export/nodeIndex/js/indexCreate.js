
(function () {
    /*----size-----*/

    /*尺寸配置*/
    function createIndexHtml(el,w,h) {
        this.el = $(el);
        this.w  = w;
        this.h =h;
        this.createResponse();
        this.resetDiv();
    }

    createIndexHtml.prototype.createResponse = function () {
        var that = this;
        that.el.css('height',that.el.width()/1920*1080);
    };

    createIndexHtml.prototype.resetDiv=function () {
        var that = this;
        $(that.el).find('div').each(function (item) {
            var height = $(this).height();
            var width = $(this).width();
            var left =parseInt($(this).css('left'));
            var top =parseInt($(this).css('top'));
            $(this).attr('size',JSON.stringify({height:height,width:width}))
            $(this).css('height',height/that.h*100+'%');
            $(this).css('width',width/that.w*100+'%');
            $(this).css('left',left/that.w*100+'%');
            $(this).css('top',top/that.h*100+'%');
        })
    };
    new createIndexHtml('.wrap',1920,1080);
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
                $('.wrap').html(localStorage.getItem('phoneData'))
                animateReset();
                mouseRightWvent();
                $('.wrap div').on('click',function () {
                    $('#menu').hide()
                    $('.act').removeClass('act');
                    $(this).addClass('act')
                    console.log('m')

                });
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
        var aniFunStr='';
        var loopFunStr='';
        $('.animate').each(function (index,item) {
            var size= JSON.parse($(item).attr('size'))
            if(size.width>=1920 && size.height>=1080){
                $(item).removeClass('animate')
            }else {
                var id = $(item).attr('id');
                var  animate = $(item).attr('animate') || 'transition.bounceUpIn';
                var  duration = $(item).attr('duration') || 1000;
                var  delay = $(item).attr('delay') || 750;
                if(animate){
                    aniFunStr+= `$('[id="`+id+`"]').velocity("`+animate+`",{duration:`+duration+`,delay:`+delay+`});`
                }
            }

        });
        $('.loop').each(function (index,item) {
            if($(this).attr('animateLoop')){
                var id = $(item).attr('id');
                var loopObj = JSON.parse($(this).attr('animateLoop'));
                if(loopObj.runStatus){
                    $(this).velocity(loopObj.animate,loopObj.opt)
                }else {
                    var animate = JSON.stringify(loopObj.animate);
                    var opt= JSON.stringify(loopObj.opt);
                    loopFunStr+= `$('[id="`+id+`"]').velocity(`+animate+`,`+opt+`);`
                }
            }
        });
        animateSet.animate = new Function('',aniFunStr);
        animateSet.loop = new Function('',loopFunStr);
    }
    animateReset();


    /*-------------------left tool-----------------------------*/

    /*隐藏元素*/
    $('#hide_ele').on('click',function () {
        $('.act').addClass('dn');
        localStorage.setItem('phoneData',$('.wrap').html())
    });
    $('#show_ele').on('click',function () {
        $('.dn').removeClass('dn')
        localStorage.setItem('phoneData',$('.wrap').html())
    });
    $('#copy_ele').on('click',function () {
        CLONE_ELE = $('.act').clone();
    });
    $('#insert_ele').on('click',function () {
        if(!CLONE_ELE){
            return swal('并没有复制dom！！！')
        }
        $('.wrap .swiper-slide').removeClass('active');
        $('.wrap .swiper-slide').eq(mySwiper.activeIndex).append(CLONE_ELE);
        var newSrc = $('.wrap .swiper-slide').eq(mySwiper.activeIndex).find('.act').attr('src')+'?'+new Date().getTime()
        $('.act').attr('src',newSrc)
        localStorage.setItem('phoneData',$('.wrap').html())
    });
    $('#delete_ele').on('click',function () {
        $('.act').remove();
        localStorage.setItem('phoneData',$('.wrap').html())
    });

    /*选中状态*/
    $('.wrap div').on('click',function () {
        $('#menu').hide()
        $('.act').removeClass('act');
        $(this).addClass('act')
        console.log('m')

    });
    /*鼠标右键*/
    function mouseRightWvent(){
        var oMenu = document.getElementById("menu");
        $('.animate').each(function () {
            $(this)[0].oncontextmenu = function(e) {
                if(e.button == 2) {
                    e.preventDefault();
                    var _x = e.clientX,
                        _y = e.clientY;
                    oMenu.style.display = "block";
                    oMenu.style.left = _x + "px";
                    oMenu.style.top = _y + "px";
                    $('#durations').text($('.act').attr('duration') || 1000);
                    $('#delays').text($('.act').attr('delay') || 750);
                    $('#animate').text($('.act').attr('animate') || 'transition.bounceUpIn');
                    $('#loop').text($('.act').attr('loop') || null);
                }
            }
        });
        window.addEventListener('mousedown',function (event) {
            if(event.button === 0){
                $('#menu').hide()
            }
        },false)
    }
    mouseRightWvent()
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
        localStorage.setItem('phoneData',$('.wrap').html())

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
        localStorage.setItem('phoneData',$('.wrap').html());
    });
    /*选择基本动画*/
    $('.js-example-basic-single').on('change',function () {
        $('.act').addClass('animate');
        $('.act').attr('animate',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('.wrap').html())
    })
    /*配置动画时间*/
    $('#duration').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('duration',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('.wrap').html())
    });
    /*配置动画延迟*/
    $('#delay').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('delay',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('.wrap').html())
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
        localStorage.setItem('phoneData',$('.wrap').html())
    });
    /*循环动画模态框打开*/
    $('#add_animate_loop').on('click',function (e) {
        e.preventDefault();
        if(!$('.act').attr('class')){
            return swal('并未选择元素')
        }else {
            $('#operate_img').html($('.act').clone())
            $('#operate_img div').removeClass('act animate');

            $('#animate_loop_modal').modal('open')
        }

    });
    /*循环动画添加*/
    $('#loop_pre').on('click',function (e) {

        e.preventDefault();
        delete LOOP;
        $('#operate_img').velocity('stop',true).velocity('finish',true);
        $('#operate_img').removeAttr('style')

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
        $('#operate_img div').velocity('finish',true)
        $('#operate_img div').velocity(LOOP.animate,LOOP.opt)
    })
    /*循环动画重置*/
    $('#loop_rest').on('click',function () {
        $('#operate_img div').velocity('stop',true).velocity('finish',true);
        $('#operate_img div').removeAttr('style')
    });
    /*循环动画使用*/
    $('#loop_apply').on('click',function () {
        $('#operate_img div').velocity('stop',true).velocity('finish',true);
        $('#operate_img div').removeAttr('style');
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
        localStorage.setItem('phoneData',$('.wrap').html())
        animateReset()
    });
    /*重置循环动画*/
    $('#reset_animate_loop').on('click',function (e) {
        e.preventDefault();
        $('.act').velocity('stop',true).velocity('finish',true);
        $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0});
        $('.act').removeClass('loop').removeAttr('animateloop');
        animateReset();
        localStorage.setItem('phoneData',$('.wrap').html())
    });



    /*下载*/
    $('#downloadHtml').on('click',function (e) {
        e.preventDefault();
        $('.html').html($('.wrap').html());
        $('.html img').removeAttr('style');
        $('.html div').removeClass('act');
        $('.html div').removeAttr('style');
        $('.html div').removeAttr('size');
        var html =  $('.html').html()
        axios.post('/page_index/download', {
            html:html
        })
            .then(function (response) {
                if(response.status == 200){
                    console.log(response.data.url)
                    window.location.href = response.data.url
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })
    $('#previe_view').on('click',function (e) {

        $('.wrap .animate').velocity('stop',true).velocity('finish',true);
        $('.wrap .animate').hide();
        animateSet.animate()
        animateSet.loop();

    })

})();


