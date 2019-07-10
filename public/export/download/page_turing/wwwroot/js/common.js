document.getElementsByClassName('swiper-container')[0].style.height=window.innerHeight+'px';
document.getElementsByClassName('swiper-container')[0].style.width=window.innerWidth+'px';


    /**
     * Created by 董浩 on 2017/6/8.
     */
//design size;
    var H5_psd_width =75;



    /*图片加载*/
    var images = document.getElementsByTagName('img');
    var imagesLength = images.length;

    var checkAndResetImageTimer = setInterval(checkAndResetImage,60);
    function checkAndResetImage() {
        var count = 0;
        for(var i=0;i<imagesLength;i++){
            if(images[i].complete){
                count++;
                var per = Math.floor(count/imagesLength*100);
                $('.loading span').text(per);
                if(count==imagesLength){
                    clearInterval(checkAndResetImageTimer)
                    setTimeout(begin,500);
                    for(var i=0;i<imagesLength;i++){
                        if(images[i].getAttribute('lt')){
                            var data = images[i].getAttribute('lt').split('/');
                            if(data){
                                if(data[1] === 'b'){
                                    images[i].style.width = parseFloat(images[i].naturalWidth).toFixed(2)/H5_psd_width+'rem';
                                    images[i].style.left = data[0]+'rem';
                                    images[i].style.bottom = '0rem';
                                }else if(data[0] === 'm'){
                                    var natural_width = parseFloat(images[i].naturalWidth).toFixed(2)/H5_psd_width;
                                    images[i].style.width = natural_width+'rem';
                                    images[i].style.left = '50%';
                                    images[i].style.marginLeft = natural_width*(-1)/2 + 'rem';
                                    images[i].style.top = data[1]+'rem';
                                }
                                else{
                                    images[i].style.width = parseFloat(images[i].naturalWidth).toFixed(2)/H5_psd_width+'rem';
                                    images[i].style.left = data[0]+'rem';
                                    images[i].style.top = data[1]+'rem';
                                }
                            }
                        }
                    }
                    function begin(){
                        var song = document.getElementById("audio");
                        if( song !=null ){
                            //  $("#m_ctrl").hide();
                            song.play();
                            song.addEventListener("ended",function(){
                                song.play();
                            })
                        }
                        $('.loadwrap').fadeOut(100,function(){
                            $('.cont section').eq(0).addClass('cur');
                        });
                        $(".circlebg").addClass("circlebgAni");

                    }
                }
            }

        }
    }





//music
    document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio.play();
        });
    }, false);

    var audio = $("#audio")[0];

    audio.loop = !0;
    document.getElementById("m_ctrl").addEventListener("touchend", function (b) {
        "off" == $(this).attr("class") ? ($(this).attr("class", "on"), audio.play()) : ($(this).attr("class", "off"), audio.pause())
    });

