webpackJsonp([2],{"0ugj":function(t,e,n){"use strict";function i(t){n("fcsB")}var o=n("8sDa"),s=n("1AqO"),r=n("VU/8"),a=i,c=r(o.a,s.a,!1,a,"data-v-630b8117",null);e.a=c.exports},"1AqO":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"ground collision",style:{top:t.vTop,left:t.vLeft,right:t.vRight,width:t.vWidth}})},o=[],s={render:i,staticRenderFns:o};e.a=s},"6Lpl":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("/5sW"),o=n("QWXC"),s=n("qhw0"),r=(n("ZE52"),n("DYlf"));n.n(r);i.a.config.productionTip=!1,new i.a({el:"#app",store:s.a,render:function(t){return t(o.a)}})},"8sDa":function(t,e,n){"use strict";e.a={props:{vTop:String,vLeft:{type:String,default:"auto"},vRight:{type:String,default:"auto"},vWidth:String}}},"9A3U":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"bullet",style:{top:t.vTop,left:t.vLeft}})},o=[],s={render:i,staticRenderFns:o};e.a=s},DYlf:function(t,e){},"I+8I":function(t,e){},LCuk:function(t,e,n){"use strict";function i(t){n("bkct")}var o=n("hyP7"),s=n("QLG4"),r=n("VU/8"),a=i,c=r(o.a,s.a,!1,a,"data-v-a13c77ec",null);e.a=c.exports},QLG4:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{ref:"hero",class:t.action,style:{position:"absolute",left:t.movementX+"px",top:t.movementY+"px"},attrs:{id:"hero"}}),t._v(" "),t._l(t.bullets,function(t){return n("bullet",{key:t.key,attrs:{vTop:t.top,vLeft:t.left}})})],2)},o=[],s={render:i,staticRenderFns:o};e.a=s},QWXC:function(t,e,n){"use strict";function i(t){n("vfDi")}var o=n("tymf"),s=n("q6Lf"),r=n("VU/8"),a=i,c=r(o.a,s.a,!1,a,null,null);e.a=c.exports},Vbza:function(t,e,n){"use strict";function i(t){n("I+8I")}var o=n("uctc"),s=n("ciPh"),r=n("VU/8"),a=i,c=r(o.a,s.a,!1,a,"data-v-30d9c44c",null);e.a=c.exports},Vm1c:function(t,e,n){"use strict";function i(t){n("s7Ld")}var o=n("wtBW"),s=n("9A3U"),r=n("VU/8"),a=i,c=r(o.a,s.a,!1,a,"data-v-3833d712",null);e.a=c.exports},ZE52:function(t,e,n){"use strict";function i(t,e){return parseFloat(window.getComputedStyle(t)[e])}function o(){v.forEach(function(t){t.callback(),1===t.type&&t.remove()})}function s(t){requestAnimationFrame(s),h||(h=t),(g=t-h)>m&&(document.getElementById("fps")&&0===l?(document.getElementById("fps").innerHTML=(1e3/g).toFixed(0)+"fps",l=30):l--,h=t,o())}n.d(e,"c",function(){return f}),n.d(e,"a",function(){return p}),n.d(e,"b",function(){return d});var r=n("Zrlr"),a=n.n(r),c=n("wxAW"),u=n.n(c),l=30,v=[],f=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;a()(this,t),this.callback=e,this.type=n,v.push(this)}return u()(t,[{key:"remove",value:function(){v.splice(v.indexOf(this),1)}}]),t}(),p=function(t,e,n,o){if("top"===n){o(i(e,"top")-i(t,"height")+1)}else if("bottom"===n){var s=i(e,"top")+i(e,"height")+1;o(s)}else if("left"===n){var r=i(e,"left")-i(t,"width")-1;o(r)}else if("right"===n){var a=i(e,"left")+i(e,"width")+1;o(a)}},d=function(t,e,n){var o={x:i(t,"left"),y:i(t,"top"),w:i(t,"width"),h:i(t,"height")},s={x:i(e,"left"),y:i(e,"top"),w:i(e,"width"),h:i(e,"height")};return o.y+o.h<=s.y?(n.where="top",!1):s.y+s.h<=o.y?(n.where="bottom",!1):o.x+o.w<=s.x?(n.where="left",!1):!(s.x+s.w<=o.x)||(n.where="right",!1)},h=null,m=1e3/30,g=void 0;requestAnimationFrame(s)},bkct:function(t,e){},ciPh:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"wall collision",style:{top:t.vTop,left:t.vLeft,right:t.vRight,height:t.vHeight}})},o=[],s={render:i,staticRenderFns:o};e.a=s},fcsB:function(t,e){},hyP7:function(t,e,n){"use strict";var i=n("ZE52"),o=n("Vm1c");e.a={name:"hero",data:function(){return{action:"hero_idel",movementX:100,movementY:0,velocityY:0,velocityX:0,keysDown:{},updates:{},runningLeft:!1,inAir:!1,bullets:[]}},components:{bullet:o.a},props:["speed","g","force"],computed:{g_toFloat:function(){return isNaN(this.g)||""===this.g?0:parseFloat(this.g)},force_toFloat:function(){return isNaN(this.force)||""===this.force?0:parseFloat(this.force)}},methods:{addBullet:function(){var t={key:Math.random(),top:this.movementY+40+"px",left:this.movementX+30+"px"};this.bullets.push(t)},keysDownEvent:function(t){var e=this;switch(t){case 37:this.action="hero_walking back",this.runningLeft=!0,this.updates[t]=new i.c(function(){e.velocityX=isNaN(e.speed)||""===e.speed?0:parseFloat(e.speed),e.movementX=e.movementX-e.velocityX/10},"keypress");break;case 39:this.action="hero_walking",this.runningRight=!0,this.updates[t]=new i.c(function(){e.velocityX=isNaN(e.speed)||""===e.speed?0:parseFloat(e.speed),e.movementX=e.movementX+e.velocityX/10},"keypress");break;case 67:!1===this.inAir&&new i.c(function(){e.velocityY=-e.force_toFloat/10,e.movementY-=2,e.inAir=!0},1);break;case 88:this.addBullet()}},keysUpEvent:function(t){switch(t){case 37:this.runningLeft=!1,this.velocityX=0,this.runningRight?this.action="hero_walking":this.action="hero_idel back";break;case 39:this.runningRight=!1,this.velocityX=0,this.runningLeft?this.action="hero_walking back":this.action="hero_idel"}this.updates[t]&&(this.updates[t].remove(),delete this.updates[t])}},mounted:function(){var t=this;window.addEventListener("keydown",function(e){t.keysDown[e.keyCode]||(t.keysDownEvent(e.keyCode),t.keysDown[e.keyCode]=!0)}),window.addEventListener("keyup",function(e){t.keysDown[e.keyCode]&&(t.keysUpEvent(e.keyCode),delete t.keysDown[e.keyCode])});for(var e=document.getElementsByClassName("collision"),n=[],o=0;o<e.length;o++)n[o]={};new i.c(function(){t.velocityY+=t.g_toFloat/60,t.movementY+=t.velocityY/10;for(var o=0;o<e.length;o++)!function(o){Object(i.b)(t.$refs.hero,e[o],n[o])&&("top"===n[o].where&&(t.inAir=!1),"top"!==n[o].where&&"bottom"!==n[o].where||(t.velocityY=0),Object(i.a)(t.$refs.hero,e[o],n[o].where,function(e){"top"===n[o].where||"bottom"===n[o].where?t.movementY=e:"left"!==n[o].where&&"right"!==n[o].where||(t.movementX=e)}))}(o)},"init press")}}},q6Lf:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"background"}},[n("hero",{attrs:{speed:t.speed,force:t.force,g:t.g}}),t._v(" "),n("span",{attrs:{id:"fps"}}),t._v(" "),n("ground",{attrs:{vTop:"376px",vWidth:"30%",vLeft:"0px"}}),t._v(" "),n("ground",{attrs:{vTop:"438px",vWidth:"60%",vLeft:"0px"}}),t._v(" "),n("ground",{attrs:{vTop:"500px",vWidth:"100%",vLeft:"0px"}}),t._v(" "),n("wall",{attrs:{vTop:"0px",vHeight:"377px",vLeft:"0px"}}),t._v(" "),n("wall",{attrs:{vTop:"0px",vHeight:"501px",vRight:"0px"}}),t._v(" "),n("div",{staticClass:"game-info"},[n("label",[t._v("SPEED")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.speed,expression:"speed"}],domProps:{value:t.speed},on:{input:function(e){e.target.composing||(t.speed=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"game-info",staticStyle:{left:"230px"}},[n("label",[t._v("FORCE")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.force,expression:"force"}],domProps:{value:t.force},on:{input:function(e){e.target.composing||(t.force=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"game-info",staticStyle:{left:"460px"}},[n("label",[t._v("G")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.g,expression:"g"}],domProps:{value:t.g},on:{input:function(e){e.target.composing||(t.g=e.target.value)}}})])],1)},o=[],s={render:i,staticRenderFns:o};e.a=s},qhw0:function(t,e,n){"use strict";var i=n("/5sW"),o=n("NYxO");i.a.use(o.a),e.a=new o.a.Store({state:{fps:0},mutations:{}})},s7Ld:function(t,e){},tymf:function(t,e,n){"use strict";var i=n("LCuk"),o=n("0ugj"),s=n("Vbza");e.a={data:function(){return{speed:100,force:3e3,g:1600}},components:{hero:i.a,ground:o.a,wall:s.a}}},uctc:function(t,e,n){"use strict";e.a={props:{vTop:String,vLeft:{type:String,default:"auto"},vRight:{type:String,default:"auto"},vHeight:String}}},vfDi:function(t,e){},wtBW:function(t,e,n){"use strict";n("ZE52");e.a={props:["vTop","vLeft"]}}},["6Lpl"]);
//# sourceMappingURL=basicGame.69c70efc5bbcef171278.js.map