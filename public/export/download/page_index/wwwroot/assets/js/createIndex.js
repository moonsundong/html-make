function createIndexHtml(el,w,h) {
    this.el = $(el);
    this.w  = w;
    this.h =h;
    this.createResponse();
    this.resetDiv();
}
console.log(document.body.clientWidth)
createIndexHtml.prototype.createResponse = function () {
    var that = this;
    $(window).resize(function () {
        var w = window.innerWidth || document.body.clientWidth;
        that.el.css({
            'width':w,
            'height':w*that.h/that.w
        })
    });
    that.el.css({
        'width':window.innerWidth || document.body.clientWidth,
        'height':(window.innerWidth || document.body.clientWidth)*that.h/that.w
    })
};

createIndexHtml.prototype.resetDiv=function () {
    var that = this;
    $(that.el).find('div').each(function (index,item) {
        var height = $(item).height();
        var width = $(item).width();

        var left =parseInt($(item).css('left'));
        var top =parseInt($(item).css('top'));
        $(item).css('height',height/that.h*100+'%');
        $(item).css('width',width/that.w*100+'%');
        $(item).css('left',left/that.w*100+'%');
        $(item).css('top',top/that.h*100+'%');
    })
};
new createIndexHtml('.wrap',1920,1080);
var  animateSet={};
function animateReset(){
    var aniFunStr='';
    var loopFunStr='';
    $('.animate').each(function (index,item) {
        var id = $(item).attr('id');
        var  animate = $(item).attr('animate') || 'transition.bounceUpIn';
        var  duration = $(item).attr('duration') || 1000;
        var  delay = $(item).attr('delay') || 750;
        if(animate){
            aniFunStr+= '$(\'[id=\"'+id+'\"]\').velocity(\"'+animate+'\",{duration:'+duration+',delay:'+delay+'});'
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
                loopFunStr+= '$(\'[id=\"'+id+'\"]\').velocity('+animate+','+opt+');'
            }
        }
    });
    animateSet.animate = new Function('',aniFunStr);
    animateSet.loop = new Function('',loopFunStr);
}
animateReset();
animateSet.animate()
animateSet.loop()
