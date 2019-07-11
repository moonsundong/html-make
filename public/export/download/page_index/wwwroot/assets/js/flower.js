

/*create state*/
    function state1() {
        this.init = function() {
            game1.scale.pageAlignHorizontally = true;
            game1.scale.pageAlignVertically =true;
            game1.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        this.preload = function () {
            game1.load.atlasXML('meteor','images/sprites.png','images/sprites.xml');
        };
        this.create = function () {
            this.emitter = game1.add.emitter(game1.width-200,0,5000);
            this.emitter.makeParticles('meteor',creatIntArr(0,4));
            this.emitter.setXSpeed(-10,-800);
            this.emitter.setYSpeed(50,100);
            this.emitter.setScale(0,0.5,0,0.5,3000);
            this.emitter.setAlpha(0,1,3000);
            this.emitter.setRotation(0,0)
            this.emitter.start(false,3500,50,-1);
        };

    }



    function creatIntArr(a,b) {
        var arr = [];
        for(var i=a;i<b;i++){
            arr.push(i)
        }

        return arr;
    }


var game1 = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,'meteor',state1,true);

