
var express = require('express');
var router = express.Router();
var compressing = require('compressing');
var beautify_html = require('js-beautify').html;
var PSD = require('psd');
var fs = require("fs");
var cheerio=require('cheerio');
var fse = require('fs-extra')
var http = require('http');
var path = require('path');
var rimraf = require('rimraf');
var psd = null;
var $ = null;
var $wrap = null;
var content = null;
var PSD_WIDTH = 75;
var url ='/';
router.post('/page_scroll',function (req,res,next) {
    var pspath = req.body.path;
    class exportPSD {
        constructor(){
            this.exportPath = "./public/export/";
            this.exportAppPath = "";
            this.saveImgPath = this.exportPath + "app/images/";
            this.saveCssPath = this.exportPath + "app/css/";
            this.oldTime = new Date();
            this.pngId = 0;
            this.groupId = 0;
            this.serverRes = null;
            this.cssStyle = ''; //css字符串
            this.file = pspath;
            this.appName = '';
            this.fileName = 'page_scroll';
            this.viewRect = {};
            this.height=[];
        };

        /**
         * 创建目录
         * @param dirName
         */
        mkdir(dirName){
            var _self = this;
            var dir = _self.fileName;
            rimraf(path.join(__dirname, _self.exportPath + dir), err => {
                if (err) throw err;
                fs.mkdir(_self.exportPath + dir + "/", function(d){
                    console.log("mkdir ok!");
                    _self.exportAppPath = _self.exportPath + dir + "/";
                    fs.mkdir(_self.exportAppPath + "images", function(){
                        _self.saveImgPath = _self.exportAppPath + "images/";
                        _self.emptyDir(_self.saveImgPath);
                    });
                    fs.mkdir(_self.exportAppPath + "css", function(){
                        _self.saveCssPath = _self.exportAppPath + "css/";
                        _self.emptyDir(_self.saveCssPath);
                    });
                    _self.openPSD();
                });

            });



        };

        /**
         * 删除所有的文件(将所有文件夹置空) 暂弃用
         * @param fileUrl
         */
        emptyDir(fileUrl){
            var _self = this;
            var files = fs.readdirSync(fileUrl);//读取该文件夹
            files.forEach(function(file){
                var stats = fs.statSync(fileUrl+'/'+file);
                if(stats.isDirectory()){
                    _self.emptyDir(fileUrl+'/'+file);
                }else{
                    fs.unlinkSync(fileUrl+'/'+file);
                    console.log("del ["+fileUrl+'/'+file+"] ok!");
                }
            });
        };
        /**
         * 读取模板html文件，在此基础上生成新的结构
         */
        getPageHTML(){
            var _self = this;
            var divRoot = _self.file.replace(".", "");
            fs.readFile("./API/page_scroll/tmp.html", function (err, data) {
                var htmlString = data.toString();
                $ = cheerio.load(htmlString);
                $wrap = $("#scroll");
                content = $wrap
                console.log("export start...");
                psd = PSD.fromFile(_self.file);
                _self.mkdir(_self.file);

            });
        };
        /**
         * 打开psd文件，分析文件
         * 导出psd图层图片，导出前需要先合并下psd图层，删掉不显示的图层等
         */
        openPSD(){
            var _self = this;
            psd.parse();
            PSD.open(_self.file).then(function (psd) {
                var tree = psd.tree();
                var treeJson = tree.export();
                _self.viewRect = {
                    width:treeJson.document.width,
                    height:treeJson.document.height
                };
                _self.findArrAndReverse(tree);
                tree.descendants().forEach(function (node) {
                    if (node.isGroup()){
                        node.name = "group_"+_self.groupId;
                        _self.groupId++;
                        return false;
                    }
                    if (node.layer.visible){
                        node.name = _self.appName + _self.pngId;
                        node.saveAsPng(_self.saveImgPath + node.name + ".png").catch(function (err) {
                            //console.log(err.stack);
                        });
                        _self.pngId++;
                    }else{
                    }

                });
                //serverRes.end(JSON.stringify(tree.export(), undefined, 2));
                fs.writeFile("json.txt", JSON.stringify(treeJson, undefined, 2), {
                    encoding:"utf8"
                }, function (err) {
                    //console.log(err);
                });

                //生成结构
                var domJSON = tree.export();
                console.log(domJSON)
                _self.createDivByJson(domJSON);
                var common = content.find('.swiper-wrapper>img');
                content.find('.swiper-wrapper>img').remove();
                content.find('.swiper-slide').prepend(common)
                //写入生成好的html结构
                fs.writeFile(_self.exportAppPath+"index.html", $.html(), {
                    encoding:"utf8"
                }, function (err) {
                    //console.log(err);
                });

                //写入css到style.css
                fs.writeFile(_self.saveCssPath+"style.css", _self.cssStyle, {
                    encoding:"utf8"
                }, function (err) {
                    //console.log(err);
                });

                //return psd.image.saveAsPng('./output.png');
            }).then(function () {
                var time = (new Date()) - _self.oldTime;
                url= _self.appName;
                res.send({url:'/export/page_scroll'})
                console.log("export end!");
                console.log("end time:"+time+"ms");
            }).catch(function (err) {
                res.send(err)
            });
        };

        /**
         * 根据json数据生成结构
         * @param jsons
         */

        createDivByJson(jsons) {
            var _self = this;
            var domJSON = jsons;
            var imgSrcUrl = "images/";
            var childrenLen = domJSON.children.length;
            for (var i=0; i<domJSON.children.length; i++){
                var item = domJSON.children[i];
               // console.log(item)
                if (item.type == "layer" && item.visible && item.width && item.height){
                    this.height.push(item.height)
                    var layer = '<img src="'+ imgSrcUrl+item.name +'.png" width="'+ item.width/2+'" id="'+item.name + '" class="image"  style="left:'+item.left/2+'px;'+'top:'+item.top/2 +  'px;"  lt="'+(item.left/PSD_WIDTH).toFixed(2) +'/'+ (item.top/PSD_WIDTH).toFixed(2) +'">\n';
                    //_self.cssStyle+='.page_'+ _self.appName + ' .' + item.name +' { position: absolute; top:50%; width:'+ item.width/100 +'rem; height:'+ item.height/100 +'rem; left:'+ item.left/100 +'rem; margin-top:'+ -(_self.viewRect.height/100/2 - item.top/100) +'rem; background:url(../'+ (backGroundImgUrl+item.name) +'.png); background-size:100% auto; }\n';
                    content.append(layer);
                }else if (item.type == "group" && item.visible){

                    content.append('<div id="scroll_content"></div>\n');
                    content = content.find('#scroll_content');
                    _self.createDivByJson(item);
                }
                //当前循环结束，重置$wrap
                if ( i == childrenLen-1){
                    content = content.parent();
                    content.find('#scroll_content').css('height',this.height[0]/2+'px')
                }
            }

        };

        /**
         * 查询所有子对象，倒序赋值
         * @param obj {Object}
         */
        findArrAndReverse(obj) {
            var _self = this;
            var datas = obj;
            if (datas._children && datas._children.length > 0){
                _self.reverseALl(datas._children);
                for ( var i=0; i<datas._children.length; i++){
                    var item = datas._children[i];
                    _self.findArrAndReverse(item);
                }
            }else{
            }
        };
        /**
         * 倒序并赋值方法
         * @param children
         */
        reverseALl(children) {
            var newArr = children.reverse();
            children = newArr;
        };
        start(){
            console.log(this)
            var _self = this;
            if(_self.file){
                fs.exists(_self.file, function (res) {
                    if (res){
                        var arr = _self.file.split("\\");
                        _self.appName =arr[arr.length-1].replace(".", "");
                        _self.getPageHTML();
                    }else{
                        console.log("psd文件路径不正确");
                    }
                });
            }else{
                console.log("需要指定PSD文件哦");
            }
        }
    }
    var exportPsdFile = new exportPSD();
        exportPsdFile.start();

});
router.post('/page_scroll/download',function (req,res,next) {
    var html = req.body.html;
    function delDir(path){
        let files = [];
        if(fs.existsSync(path)){
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()){
                    delDir(curPath); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
            fs.rmdirSync(path);
        }
    }
    fs.readFile("./public/export/download/page_scroll/wwwroot/index.html", function (err, data) {
        var htmlString = data.toString();
        var $$ = cheerio.load(htmlString);
        var $insertArea = $$("#swiperView");
        $insertArea.html(html);
        fs.writeFile('./public/export/download/page_scroll/wwwroot/index.html',beautify_html($$.html(), { indent_size: 4, space_in_empty_paren: true }), {
        }, function (err) {
            if(err) throw err;
             if(!err){
                 delDir('./public/export/download/page_scroll/wwwroot/images')
                 fse.copy('./public/export/page_scroll/images', './public/export/download/page_scroll/wwwroot/images')
                         .then(() => {
                             fse.copy('./public/export/download/page_scroll/commonimages','./public/export/download/page_scroll/wwwroot/images')
                                 .then(()=>{
                                     compressing.zip.compressDir('./public/export/download/page_scroll/wwwroot', './public/export/download/page_scroll/wwwwroot.zip')
                                         .then(()=>{
                                             res.send({url:'/export/download/page_scroll/wwwwroot.zip'})
                                         })
                                         .catch()
                                 })
                                 .catch(error=>{
                                     console.log(error)
                                 })

                         })
                         .catch(err => {
                             console.error(err)
                         })
                 }

        });

    });


})
module.exports=router