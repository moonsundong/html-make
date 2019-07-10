
/*自定义动画集合*/
var registerTime=3;
$.Velocity
    .RegisterEffect( "self_transition.scaleIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1, 0 ], scaleY: [1,0] },3,{easing:"easeInOutBack"}],
            [ { opacity: [ 1, 1 ]},registerTime]
        ]
    })
    .RegisterEffect( "self_transition.scaleSmallIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1, 0 ], scaleY: [1,0] },1,{easing:"linear"}],
            [ { opacity: [ 1, 1 ]},0]
        ]
    })
    .RegisterEffect( "self_transition.scaleSmallBigIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1, 4 ], scaleY: [1,4 ]},2,{easing:"easeInOutBack"}],
            [ { opacity: [ 1, 1 ]},0]
        ]
    })
    .RegisterEffect( "self_transition.scaleFadeOut",{

        calls: [
            [ { opacity: [ 0, 1 ], scaleX: [ 1.4, 1 ], scaleY: [1.4,1] },2,{ easing: [.68, -.55, .265, 1.55]}]
        ],
        reset:{opacity:1,scaleX:1,scaleY:1}
    })
    .RegisterEffect( "self_transition.slideRightOut", {
        calls: [
            [ { opacity: [ 0, 1 ], translateX: [-400,0]} ,2,{easing:[.68, -.55, .265, 1.55]}]
        ],
        reset: { translateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveDownOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateX: 90 } ,2]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveLeftUpIn", {

        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateZ: [0,-90] },3 ],
            [ { opacity: [ 1, 1 ]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveLeftUpOut", {

        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateZ: [-90,0] },2 ]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveLeftDownIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateZ: [0,90] } ,3],
            [ { opacity: [ 1, 1 ]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveLeftDownOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateZ: 90 },2 ]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateZ: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveRightDownOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ "-100%","50%" ], transformOriginY: [ "100%", "50%"], rotateZ: 90 } ,2]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.scrollScaleIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1, .2 ], scaleY: [1,.2] ,rotateZ:[0,-180]},3,{easing:"linear"} ],
            [ { opacity: [ 1, 1 ]},registerTime]
        ],
        reset:{rotateZ:0}
    })
    .RegisterEffect( "self_transition.scrollBigIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1,0.2], scaleY: [1,.2] ,rotateZ:[0,-360]},3,{easing:"linear"} ],
            [ { opacity: [ 1, 1 ]},registerTime]
        ],
        reset:{rotateZ:0}
    })
    .RegisterEffect( "self_transition.slideLeftOut",{
        calls: [
            [ { opacity: [ 0, 1 ] ,translateX:[400,0]} ,2,{ easing: [.68, -.55, .265, 1.55]}],
        ],
        reset:{rotateZ:0,translateX:0,opacity:1}
    })
    .RegisterEffect( "self_transition.slideUpOut",{
        calls: [
            [ { opacity: [ 0, 1 ] ,translateY:[800,0]},2,{easing:[.9,.05,.12,.26]}],
        ],
        reset:{translateY:0}
    })
    .RegisterEffect( "self_transition.slideLeftIn",{
        calls: [
            [ { opacity: [ 1, 0 ] ,translateX:[0,-400]} ,3,{ easing: 'linear'}],
            [ { opacity: [ 1, 1 ]},registerTime]
        ],
        reset:{translateX:0}
    })
    .RegisterEffect( "self_transition.fadeIn",{
        calls: [
            [ { opacity: [ 1, 0 ]},3],
            [ { opacity: [ 1, 1 ]},registerTime]
        ]
    })
    .RegisterEffect( "self_transition.slideDownIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateY:[0,100]},3,{easing:[.755, .05, .855, .06]}],
            [ { opacity: [ 1, 1 ]},registerTime]
        ]
    })
    .RegisterEffect( "self_transition.slideRightIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateX:[0,200]},2,{easing:[.455, .03, .515, .955]}],
            [ { opacity: [ 1, 1 ]},.5]
        ]
    })
    .RegisterEffect( "self_transition.slideRightScaleIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateX:[0,200],scaleX:[1,0.2],scaleY:[1,0.2]},2,{easing:[.455, .03, .515, .955]}],
            [ { opacity: [ 1, 1 ]},.5]
        ]
    })
    .RegisterEffect( "self_transition.slideLeftDownIn",{
    calls: [
        [ { opacity: [ 1, 0 ],translateX:[0,-200],translateY:[0,200],scaleX:[1,0.4],scaleY:[1,0.4]},.9,{easing:[.455, .03, .515, .955]}],
        [ { opacity: [ 1, 1 ]},.5]
    ]
    })
    .RegisterEffect( "self_transition.slideLeftUpIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateX:[0,-200],translateY:[0,-200],scaleX:[1,0.4],scaleY:[1,0.4]},.9,{easing:[.455, .03, .515, .955]}],
            [ { opacity: [ 1, 1 ]},.5]
        ]
    })

    .RegisterEffect( "self_transition.slideRightDownIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateX:[0,200],translateY:[0,200],scaleX:[1,0.2],scaleY:[1,0.2]},.9,{easing:[.455, .03, .515, .955]}],
            [ { opacity: [ 1, 1 ]},.5]
        ]
    })
    .RegisterEffect( "self_transition.slideRightUpIn",{
        calls: [
            [ { opacity: [ 1, 0 ],translateX:[0,200],translateY:[0,-200],scaleX:[1,0.2],scaleY:[1,0.2]},.9,{easing:[.455, .03, .515, .955]}],
            [ { opacity: [ 1, 1 ]},.5]
        ]
    })
    .RegisterEffect( "self_transition.rotateLeftUpIn", {
        calls: [
            [ { opacity: [ 1, 0 ],transformOriginY:"0%",transformOriginX:"-50%",rotateZ:[0,-45] },3],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "0%", transformOriginY: "0%", rotateZ: 0 }
    })
    .RegisterEffect( "self_transition.rotateRightDownIn", {
        calls: [
            [ { opacity: [ 1, 0 ],transformOriginY:"10%",transformOriginX:"50%",rotateZ:[0,-90] },3],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "0%", transformOriginY: "0%", rotateZ:0}
    })
    .RegisterEffect( "self_transition.rotateLeftUpOut", {
        calls: [
            [ { opacity: [ 0, 1 ],transformOriginY:"0%",transformOriginX:"0%",rotateZ:[90,0],scaleX:[0,1],scaleY:[0,1] },2],

        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateZ: 0 ,scaleX:1,scaleY:1,opacity:1}
    })
    .RegisterEffect( "self_transition.slideUpIn", {
        calls: [
            [ { opacity: [ 1, 0 ],translateY:[0,-300]},3,{easing:[.6, .04, .98, .335]}],
            [{opacity:[1,1]},registerTime]
        ]

    })
    .RegisterEffect( "self_transition.slideDownOut", {
        calls: [
            [ { opacity: [ 0, 1],translateY:[-600,0]},2]

        ],
        reset: { opacity:0,translateY:0}
    })
    .RegisterEffect( "self_transition.scaleRotateIn", {
        calls: [
            [ { opacity: [ 1, 0],scaleY:[1,0],scaleX:[1,0],rotateZ:[360,0]},3],
            [{rotateZ:[0,0]},registerTime]
        ],
        reset: { opacity:1,rotateZ:[0]}
    })
    .RegisterEffect( "self_transition.scaleRotateOut", {

        calls: [
            [ { opacity: [ 0, 1],scaleY:[0,1],scaleX:[0,1],rotateZ:[360,0]},2]
        ],
        reset: { opacity:1,rotateZ:0}
    })
    .RegisterEffect( "self_transition.scaleOut", {
        calls: [
            [ { opacity: [ 0, 1],scaleY:[1.4,1],scaleX:[1.4,1],translateY: [900,0]},2]
        ],
        reset: { opacity:1,translateY:0}
    })
    .RegisterEffect( "self_transition.pulseIn", {
        calls: [
            [ { scaleX: [1.1,0], scaleY: [1.1,0] ,opacity:[1,1]},3 ,{easing: "easeInExpo"}],
            [ { scaleX: 1, scaleY: 1 }, registerTime]
        ]
    })
    .RegisterEffect( "self_transition.slideUpScaleIn", {
        calls: [
            [ { scaleX: [1.1,0], scaleY: [1.1,0] ,opacity:[1,0],translateY:[0,-200]}  ,3],
            [ { scaleX: 1, scaleY: 1 }, registerTime]
        ]
    })
    .RegisterEffect( "self_transition.slideUpScaleOut", {
        calls: [
            [ { scaleX: [0.4,1], scaleY: [0.4,1] ,opacity:[0,1],translateY:[-200,0]},2]
        ],
        reset: { opacity:1,translateY:0,scaleX:0,scaleY:0}
    })
    .RegisterEffect( "self_transition.slideDownScaleIn", {
        calls: [
            [ { scaleX: [1.1,0], scaleY: [1.1,0] ,opacity:[1,0],translateY:[0,200]} ,3 ],
            [ { scaleX: 1, scaleY: 1 }, registerTime]
        ]
    })
    .RegisterEffect( "self_transition.slideDownScaleOut", {
        calls: [
            [ { scaleX: [0.4,1], scaleY: [0.4,1] ,opacity:[0,1],translateY:[200,0]},2]
        ],
        reset: { opacity:1,translateY:0,scaleX:0,scaleY:0}
    })
    .RegisterEffect( "self_transition.ScaleBigOut", {
        calls: [
            [ { scaleX: [1.4,1], scaleY: [1.4,1] ,opacity:[0,1]},2]
        ],
        reset: { opacity:1,translateY:0,scaleX:0,scaleY:0}
    })
    .RegisterEffect( "self_transition.textIn", {
        calls: [
            [ {opacity:[1,1]},5]
        ]
    })
    .RegisterEffect( "self_transition.meteorFirstIn", {
        calls: [
            [ {opacity:[1,1],translateX:["-200%","200%"],translateY:["200%","-200%"]},4,{ easing: "easeInExpo"}]
        ]
    })
    .RegisterEffect( "self_transition.meteorSecondIn", {
        calls: [
            [ {opacity:[0,1],translateX:["-100%","300%"],translateY:["200%","-200%"]},5,{ easing: "easeInExpo"}]
        ]
    })
    .RegisterEffect( "self_transition.meteorThirdIn", {
        calls: [
            [ {opacity:[0,1],translateX:["-100%","300%"],translateY:["200%","-200%"]},4,{ easing: "easeInExpo"}]
        ]
    })
    .RegisterEffect( "self_transition.meteorThirdIn", {
        calls: [
            [ {opacity:[0,1],translateX:["-300%","100%"],translateY:["200%","-200%"]},6,{ easing: "easeInExpo"}]
        ]
    })
    .RegisterEffect( "self_transition.translateXIn", {
        calls: [
            [ {translateX:[500,0]},3,{ easing: [.68, -.55, .265, 1.55]}],
            [{opacity:"1"},6],
            [ {translateX:[500,0]},3,{ easing: [.68, -.55, .265, 1.55]}]
        ]
    })
    .RegisterEffect( "self_transition.translateXIn", {
        calls: [
            [ {translateX:[500,0]},3,{ easing: [.68, -.55, .265, 1.55]}],
            [{opacity:"1"},6],
            [ {translateX:[500,0]},3,{ easing: [.68, -.55, .265, 1.55]}]
        ]
    })
    .RegisterEffect("self_transition.perspectiveLeftIn", {

        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateY: [ 0, -180 ] },3,{easing:[.86, 0, .07, 1]}],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect("self_transition.perspectiveLeftOut", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateY: 180 },2,{easing:[.645, .045, .355, 1]} ]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0,opacity:1 }
    })
    .RegisterEffect("self_transition.perspectiveRightIn", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ "100%", "100%" ], transformOriginY: [ 0, 0 ], rotateY: [ 0, 180 ] },3,{easing:[.55, .085, .68, .53]}],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect("self_transition.perspectiveRightOut", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ "100%", "100%" ], transformOriginY: [ 0, 0 ], rotateY: -180 } ,2,{easing:[.25, .46, .45, .94]}],
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0,opacity:1 }
    })
    .RegisterEffect( "self_transition.perspectiveUpIn", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ "100%", "100%" ], rotateX: [ 0, -180 ] },3],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.perspectiveUpOut", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ "100%", "100%" ], rotateX: 180 },2]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.perspectiveDownIn", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 1, 0], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateX: [ 0, -90] },3],
            [{opacity:[1,1]},registerTime]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.perspectiveDownOut", {
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateX: 90 },2 ]
        ],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.flipBounceXIn", {
        calls: [
            [ { opacity: [ 0.725, 0 ], transformPerspective: [ 400, 400 ], rotateY: [ -10, 90 ] }, 1.5 ,{easing:"easeInQuart"}],
            [ { opacity: 0.80, rotateY: 10 }, 0.325,{easing:"linear"} ],
            [ { opacity: 1, rotateY: 0 }, 0.325 ,{easing:"linear"}],
            [ { opacity: 0.80, rotateY: 10 }, 0.35,{easing:"linear"} ],
            [ { opacity: 1, rotateY: 0 }, 0.325,{easing:"linear"} ],
            [ { opacity: 1}, registerTime ]

        ],
        reset :{transformPerspective:0}
    })
    .RegisterEffect( "self_transition.flipBounceXOut", {
        calls: [

            [ { opacity: 0.80, rotateY: 10 }, 0.25,{easing:"linear"} ],
            [ { opacity: 1, rotateY: 0 }, 0.25 ,{easing:"linear"}],
            [ { opacity: 0.80, rotateY: 10 }, 0.25,{easing:"linear"} ],
            [ { opacity: 1, rotateY: 0 }, 0.25,{easing:"linear"} ],
            [ { opacity: [ 0.9, 1 ], transformPerspective: [ 400, 400 ], rotateY: [90,-10] }, 1 ],
        ],
        reset: { transformPerspective: 0, rotateY: 0 }
    })
    .RegisterEffect( "self_transition.flyLeafIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateX: [60,90],translateX:[200,-200],translateY: [200,-200],translateZ:[200,-200] },2,{easing:"linear"}],
            [ { rotateX: [30,60],translateX:[100,200],translateY: [100,200],translateZ:[100,200] },0.5,{easing:"linear" }],
            [ { rotateX: [0,30],translateX:[0,100],translateY: [0,100],translateZ:[0,100] },0.5,{easing:"linear" }],
            [ { opacity: 1}, registerTime ]
        ],
        reset: { transformPerspective: 0 }
    })
    .RegisterEffect( "self_transition.flyLeafOut", {
        calls: [
            [ { opacity: [ 0.8, 1 ], transformPerspective: [ 800, 800 ], rotateX: [30,0],translateX:[200,0],translateY: [-200,0],translateZ:[-200,0] },1,{easing:"linear"}],
            [ {opacity: [ 0.4, 0.8 ], rotateX: [60,30],translateX:[0,200],translateY: [-400,-200],translateZ:[-400,-200] },0.5,{easing:"linear" }],
            [ { rotateX: [0,0.4],rotateX: [90,60],translateX:[-200,0],translateY: [-600,-400],translateZ:[-600,-400] },0.5,{easing:"linear" }]
        ],
        reset: { transformPerspective: 0, translateX:0,translateY:0,translateZ:0 ,opacity:1}
    })
    .RegisterEffect( "self_transition.DropIn", {
        calls: [
            [ { opacity: [ 1, 0 ],transformPerspective: [ 800, 800 ], translateY:[0,-300] },1,{easing:"easeInExpo"}],
            [ { opacity: 1}, registerTime ]
        ]
    })
    .RegisterEffect( "self_transition.DropOut", {
        calls: [
            [ { opacity: [ 0, 1 ], translateY:[200,0] },2,{easing:"easeInExpo"}]
        ],
        reset: { opacity:0,translateY:0 }
    })
    .RegisterEffect( "self_transition.jumpIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ],scaleX:[0.4,0],scaleY:[0.4,0],rotateX: [60,90],translateZ:[-500,-900],translateY:[-500,-900] },1,{easing:"linear"}],
            [ {  scaleX:[0.8,0.4],scaleY:[0.8,0.4] ,rotateX: [30,60],translateZ:[-100,-500],translateY:[-100,-500] },0.75,{easing:"linear"}],
            [ {  scaleX:[1.1,0.8],scaleY:[1.1,.8] ,rotateX: [0,30],translateZ:[300,-100],translateY:[100,-100] },0.75,{easing:"linear"}],
            [ {  scaleX:[1,1.1],scaleY:[1,1.1],translateZ:[-100,300],translateY:[0,100] },0.5,{easing:"linear"}],
            [ { opacity: 1}, registerTime ]
        ],
        reset: { transformPerspective: 0 ,translateZ:0}
    })
    .RegisterEffect( "self_transition.jumpOut", {
        calls: [
            [ {  opacity: [ 0.8, 1 ],  transformPerspective: [ 800, 800 ],scaleX:[1.1,1],scaleY:[1.1,1],translateZ:[300,-100],translateY:[100,0] },0.25,{easing:"linear"}],
            [ {  scaleX:[0.5,0.8],scaleY:[0.8,1.1] ,rotateX: [30,0],translateZ:[-100,300],translateY:[-100,100] },0.25,{easing:"linear"}],
            [ {  scaleX:[0.3,0.5],scaleY:[0.4,0.8] ,rotateX: [60,30],translateZ:[-500,-100],translateY:[-500,-100] },0.25,{easing:"linear"}],
            [ { opacity: [ 0, 0.3 ],scaleX:[0,0.4],scaleY:[0,0.4],rotateX: [90,60],translateZ:[-900,-500],translateY:[-900,-500] },0.25,{easing:"linear"}],

        ],
        reset: { transformPerspective: 0 ,translateZ:0,opacity:1,scaleX:1,scaleY:1,translateZ:0,translateX:0,translateY:0,rotateX:0}
    })
    .RegisterEffect( "self_transition.DropThreeIn", {
        calls: [
            [ { opacity: [ 1, 0 ],transformPerspective: [ 800, 800 ], translateY:[0,-300] },1,{easing:"easeInExpo"}],
            [ {   rotateZ:[5,0] },0.5,{easing:"linear" }],
            [ {   rotateZ:[-5,5] },1,{easing:"linear" }],
            [ {   rotateZ:[0,-5]},0.5,{easing:"linear" }],
            [ { opacity: 1}, 2.4 ]
        ]
    })
    .RegisterEffect( "self_transition.DropThreeOut", {
        calls: [
            [ { opacity: [ 0, 1 ], translateY:[200,0] },1.4,{easing:"easeInExpo"}]
        ],
        reset: { opacity:0,translateY:0 }
    })
    .RegisterEffect( "self_transition.swoopLeftIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], translateX: [ 0, 1700 ], translateZ: 0 },3,{easing:[.17,.67,.83,.67]} ],
            [ { opacity: [ 1]},registerTime]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.swoopLeftOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "100%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateX: 700, translateZ: 0 },2 ]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
    })
    .RegisterEffect( "self_transition.swoopRightIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], translateX: [ 0, 700 ], translateZ: 0 },3 ,{easing:[.17,.67,.83,.67]}],
            [ { opacity: [ 1]},registerTime]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.swoopRightOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "100%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0 },2 ]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
    })
    .RegisterEffect( "self_transition.swoopUpIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], translateY: [ 0, -700 ], translateZ: 0 },3 ,{easing:[.17,.67,.83,.67]}],
            [ { opacity: [ 1]},registerTime]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.swoopUpOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "100%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateY: 700, translateZ: 0 },2 ]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateY: 0 }

    })
    .RegisterEffect( "self_transition.swoopDownIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], translateY: [ 0, 700 ], translateZ: 0 },3 ,{easing:[.17,.67,.83,.67]}],
            [ { opacity: [ 1]},registerTime]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%" }
    })
    .RegisterEffect( "self_transition.swoopDownOut", {
        calls: [
            [ { opacity: [ 0, 1 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateY: -700, translateZ: 0 },2 ]
        ],
        reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateY: 0 }

    })
    .RegisterEffect( "self_transition.whirlIn", {
        calls: [
            [ { opacity: [ 1, 0 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], rotateY: [ 0, 160 ] }, 3, { easing: "easeInOutSine" } ],
            [{opacity:[1,1]},registerTime]
        ],
        reset:{rotateY:0}
    })
    .RegisterEffect( "self_transition.whirlOut", {
        calls: [
            [ { opacity: [ 0, "easeInOutQuint", 1 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: 0, scaleY: 0, rotateY: 160 }, 2, { easing: "swing" } ]
        ],
        reset: { scaleX: 1, scaleY: 1, rotateY: 0 }
    })
    .RegisterEffect( "self_transition.bounceIn", {
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1.05, 0.3 ], scaleY: [ 1.05, 0.3 ] }, 2,{easing:[.17,.67,.83,.67]} ],
            [ { scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.20 ],
            [ { scaleX: 1, scaleY: 1 }, 0.50 ],
            [{opacity:[1,1]},registerTime]
        ]
    })
    .RegisterEffect( "self_transition.bounceOut", {
        calls: [
            [ { scaleX: 0.95, scaleY: 0.95 }, 0.35],
            [ { scaleX: 1.1, scaleY: 1.1, translateZ: 0 }, 0.35 ],
            [ { opacity: [ 0, 1 ], scaleX: 0.3, scaleY: 0.3 }, 1.30 ]
        ],
        reset: { scaleX: 1, scaleY: 1 }
    })
    .RegisterEffect( "self_transition.scrollScaleOut",{
        calls: [
            [ { opacity: [ 0, 1], scaleX: [ 0.3, 1 ], scaleY: [0.3,1,] ,rotateZ:[180,0]},2 ],

        ],
        reset:{rotateZ:0,opacity:1,scaleX:1,scaleY:1}
    })
    .RegisterEffect( "self_transition.scaleTreeIn",{
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1, 0 ], scaleY: [1,0] },3,{easing:"easeInOutBack"}],
            [ { opacity: [ 1, 1 ]},1.1]
        ]
    })
    .RegisterEffect( "self_transition.slideLeftThreeOut", {
        calls: [
            [ { opacity: [ 0, 1 ], translateX: [400,0]} ,1.1,{easing:[.68, -.55, .265, 1.55]}]
        ],
        reset: { translateX: 0 ,opacity:0}
    })

;


