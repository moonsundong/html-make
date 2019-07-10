var Href = window.location.href.split('?')[0].replace('index.html','');
var ShareImg= Href+'images/share.jpg';
Href.indexOf('/test')>=0 ? (ShareImg= Href+'images/sharetest.jpg') : ShareImg = ShareImg;

var ajax = function(){
	    $.ajax({
	        url:'//dscwx.zhaopin.com/TokenHandler.ashx?cmd=GetTicket',
	        type: 'get',
	        dataType: "jsonp",
	        jsonpCallback: "jsonp_success",
	        success: function(data) {
	            setWeixin(data)
	        }
	    })	    	
    };
	ajax();
    window.addEventListener("hashchange",function(){
        console.log( location.href)
        ajax();
    },false)

    function setWeixin(data) {
        var _gticket = data.msg;
        var _gUrl = window.location.href;
        var _arr1 = _gticket.split('=');
        var _arr2 = [];
        for (var i = 0; i < _arr1.length; i++) {
            var s = _arr1[i].split('&')
            _arr2.push(s);
        };
        var _newticket = "jsapi_ticket=" + _arr2[1][0] + "&noncestr=" + _arr2[2][0] + "&timestamp=" + _arr2[3][0] + "&url=" + _gUrl
        var sig = hex_sha1(_newticket)
        wx.config({
            debug: false,
            appId: 'wxe60091deeb1eac11',
            timestamp: _arr2[3][0],
            nonceStr: _arr2[2][0],
            signature: sig,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems'
            ]
        });
             
        wx.ready(function() {
            var wxData = {
                title:'中国邮政储蓄银行总行2020校园招聘',
                desc:'期待你的加入',
	            link:Href,
	            imgUrl:ShareImg
            };
            wx.checkJsApi({
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems'
                ],
                success: function(res) {
                    console.log(JSON.stringify(res));
                }
            });
            wx.onMenuShareAppMessage({
                title: wxData.title,
                desc: wxData.desc,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                trigger: function(res) {
                },
                success: function(res) {
                    _hmt.push(['_trackEvent', wxData.title, 'onMenuShareAppMessage']);
                },
                fail: function(res) {
                    console.log(JSON.stringify(res));
                }
            });
            wx.onMenuShareTimeline({
                title: wxData.title, // 分享标题
                link: wxData.link, // 分享链接
                imgUrl: wxData.imgUrl, // 分享图标
                success: function() {
                    _hmt.push(['_trackEvent', wxData.title, 'onMenuShareTimeline']);
                }
            });

        });
    }