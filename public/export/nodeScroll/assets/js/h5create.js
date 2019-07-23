
(function () {
    /*初始化/恢复原始状态*/
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
               // $('#scroll_content').html(localStorage.getItem('phoneData'))

               var data = localStorage.getItem('phoneData').split('*');
               data.forEach(function (value, index, array) {
                   if(value){
                       animateScroll.push(JSON.parse(value))
                   }
               });
               animateReset()
                swal(
                    '恢复成功',
                    '页面已恢复',
                    'success'
                )
            }
        })
    }
    var TimeLine = null
    var tmpObj= {x:parseFloat($('.time-line').val()) || 10 }
    var animateScroll = [];
    function animateReset(){

        if(TimeLine){
            TimeLine.clear()
           /* TimeLine.kill()
            TimeLine.remove();*/
        }else{
            TimeLine = new TimelineLite({
                onUpdate:function () {
                    $('#scroll_time_show').text(TimeLine.time().toFixed(3)+'s')
                },
                onStart:function () {
                    TimeLine.pause();
                }});
        }
        animateScroll.forEach(function (value, index, array) {
            $(value.dom).velocity({opacity:1,translateX:0,translateY:0,scaleX:1,scaleY:1,rotateZ:0,skewX:0,skewY:0},{duration:0})
            value.frame.forEach(function (value1,index1,array1) {
                var temp = JSON.parse(JSON.stringify(value1));
                if(index1==0){
                    TimeLine.from($(value.dom),value1.duration,temp.animate,value1.position)
                }else {
                    TimeLine.staggerTo($(value.dom),value1.duration,temp.animate,value1.position)
                }
            })
        });
        TimeLine.to(tmpObj,1,{y:0},tmpObj.x)
        console.log(TimeLine.getChildren())
    }
    function animateApply() {
        animateReset();
       var str=''
        animateScroll.forEach(function (value, index, array) {
           str+=JSON.stringify(value)+'*'
        });

        localStorage.setItem('phoneData',str)
    }

    /*初始化betterscroll*/
    let bs = new BScroll('#scroll', {
        bounce: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },
        //preventDefault:true,
        deceleration:0.005,
        probeType: 3,
        tap:'tap',
        //click:true

    });
/*    var tl = new TimelineLite({
        onUpdate:function () {
            console.log('ss')
            $('#scroll_time_show').text()
        },
        onStart:function () {
            tl.pause();
        }});*/


   $('.time-line').on('blur',function () {
       tmpObj= {x:parseFloat($('.time-line').val()) || 10 ,y:0}
       animateReset()
   });


    bs.on('scroll',function (pos) {
        $('#scroll_pos_show').text(Math.abs(pos.y)+'px')
        if(TimeLine){
            console.log(animateScroll);
            TimeLine.progress(Math.floor(((pos.y/bs.maxScrollY)*1000))/1000).pause();
        }
    });

    /*-------------------left tool-----------------------------*/

    /*隐藏元素*/
    $('#hide_ele').on('click',function () {
        $('.act').addClass('dn');
        localStorage.setItem('phoneData',$('#scroll_content').html())
    });
    $('#show_ele').on('click',function () {
        $('#scroll_content .dn').removeClass('dn')
        localStorage.setItem('phoneData',$('#scroll_content').html())
    });

   //点击拖动的图片添加class，并给图片设置动画选项，右侧按钮
    $("#phone img").on('tap',function (e) {
        e.preventDefault();
       $("#phone").find("img").removeClass('act');
       $(this).addClass('act');
       var index = _.findIndex(animateScroll,{dom:'#'+$(this).attr('id')});
        $('.frame').html('');
        $('#s_input input').val('');
       if(index>=0){
           var animateobj =  animateScroll[index];
           for(var i=0;i<animateobj.frame.length;i++){
               $('.frame').append('<span class="am-badge am-badge-primary am-round">'+ (i+1) +'</span>')
           }
           $('.am-badge').first().addClass('am-badge-danger').removeClass('am-badge-primary')
           setScroInput(animateobj.frame[0]);

       }
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
    });
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
        localStorage.setItem('phoneData',$('#scroll_content').html());
    });
    /*选择基本动画*/
    $('.js-example-basic-single').on('change',function () {
        $('.act').addClass('animate');
        $('.act').attr('animate',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#scroll_content').html())
    })
    /*配置动画时间*/
    $('#duration').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('duration',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#scroll_content').html())
    });
    /*配置动画延迟*/
    $('#delay').on('blur',function (e) {
        e.preventDefault()
        $('.act').attr('delay',$(this).val());
        $('.act').velocity($('.act').attr('animate') || 'transition.bounceUpIn' ,{duration:$('.act').attr('duration') || 750,delay:$('.act').attr('delay') || 500});
        animateReset();
        localStorage.setItem('phoneData',$('#scroll_content').html())
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
        localStorage.setItem('phoneData',$('#scroll_content').html())
        animateReset()
    });
    /*重置循环动画*/
    $('#reset_animate_loop').on('click',function (e) {
        e.preventDefault();
        $('.act').velocity('stop',true).velocity('finish',true);
        $('.act').velocity({translateX:0,translateY:0,scaleX:1,scaleY:1,opacity:1,rotateZ:0},{duration:0});
        $('.act').removeClass('loop').removeAttr('animateloop');
        animateReset();
        localStorage.setItem('phoneData',$('#scroll_content').html())
    });
    /*帧动画*/
    $('#add_frame').on('click',function () {
        if(!$('.act').attr('src')){
            return swal('请选择目标')
        }
        $('#s_input input').val('');
        var id = '#' + $('.act').attr('id');
        var aimIndex = _.findIndex(animateScroll,{dom:id});
        if(aimIndex>=0){
            var len= $('.am-badge').length+1;
            $('.frame').append('<span class="am-badge am-badge-danger am-round">'+ len +'</span>')
            $('.am-badge-danger').addClass('am-badge-primary').removeClass('am-badge-danger')
            $('.am-badge').last().addClass('am-badge-danger');
            $('#s_input').val('')
        }else{
            $('.frame').html('<span class="am-badge am-badge-danger am-round">1</span>')
        }
    });
    function getScroInput(){
        var animate = {};
        var flag = false;
        if($('#s_translateX').val()){
            animate.x= parseFloat($('#s_translateX').val())
            flag = true
        }
        if($('#s_translateY').val()){
            animate.y= parseFloat($('#s_translateY').val())
            flag = true
        }
        if($('#s_scaleX').val()){
            animate.scaleX= parseFloat($('#s_scaleX').val())
            flag = true
        }
        if($('#s_scaleY').val()){
            animate.scaleY= parseFloat($('#s_scaleY').val())
            flag = true
        }
        if($('#s_skewX').val()){
            animate.skewX= parseFloat($('#s_skewX').val())
            flag = true
        }
        if($('#s_skewY').val()){
            animate.skewY= parseFloat($('#s_skewY').val())
            flag = true
        }
        if($('#s_rotation').val()){
            animate.rotation= parseFloat($('#s_rotation').val())
            flag = true
        }
        if($('#s_opacity').val()){
            animate.opacity = parseFloat($('#s_opacity').val())
            flag = true
        }
        if(flag){
            animate.ease = 'Linear.easeNone';
            return animate;
        }else {
            return flag;
        }

    }
    function setScroInput(obj){
        $('#s_input input').val('')
        $('#s_duration').val(obj.duration)
        $('#s_position').val(obj.position)
        var arr = Object.keys(obj.animate);
        arr.forEach(function (value, index, array) {
            if(value == 'x'){
                $('#s_translateX').val(obj.animate.x)
            }else if(value == 'y'){
                $('#s_translateY').val(obj.animate.y)
            }else if(value == 'ease'){

            }else {
                $('#s_'+value).val(obj.animate[value])
            }
        });

        console.log(arr); //6
    }
    $('#apply_frame').on('click',function () {
        if(!$('.act').attr('src') || !$('.am-badge').length){
            return swal('操作错误，请先添加动画')
        }else {
            var id = '#' + $('.act').attr('id');
            var aimIndex = _.findIndex(animateScroll,{dom:id});
                console.log(aimIndex)
            if(aimIndex>=0){
                var animate = getScroInput();
                if(animate){
                    animateScroll[aimIndex].frame[$('.am-badge-danger').index()] = {
                        duration:parseFloat($('#s_duration').val()) || 1,
                        animate:animate,
                        position:parseFloat($('#s_position').val()) || 1
                    }
                    animateApply()
                }else{
                    return swal('请先配置动画变化属性')
                }

            }else{
                var animate = getScroInput();
                if(animate){
                    animateScroll.push({
                        dom:id,
                        frame:[
                            {
                                duration:parseFloat($('#s_duration').val()) || 1,
                                animate:animate,
                                position:parseFloat($('#s_position').val()) || 1
                            }
                        ]
                    });

                    animateApply()
                }else {
                    return swal('请先配置动画变化属性')
                }


            }
            console.log(animateScroll)
        }
    });
    $('.frame').on('click','.am-badge',function () {
        console.log('mm')
       $('.am-badge-danger').addClass('am-badge-primary').removeClass('am-badge-danger');
       $(this).addClass('am-badge-danger');
       var id ='#' +  $('.act').attr('id');
       var animateobj = _.find(animateScroll,{dom:id})
        setScroInput(animateobj.frame[$(this).index()]);
    });
    /*下载*/
    $('#downloadHtml').on('click',function (e) {
        e.preventDefault();
        $('.html').html($('#scroll_content').html());
        $('.html img').removeAttr('style');
        $('.html .swiper-slide').removeClass('swiper-slide-active swiper-slide-next swiper-slide-prev');
        $('.html .swiper-slide').removeAttr('style');

       var html =  $('.html').html()
        axios.post('/page_turning/download', {
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
})();