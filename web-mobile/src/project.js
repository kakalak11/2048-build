window.__require=function t(e,n,i){function o(s,r){if(!n[s]){if(!e[s]){var a=s.split("/");if(a=a[a.length-1],!e[a]){var h="function"==typeof __require&&__require;if(!r&&h)return h(a,!0);if(c)return c(a,!0);throw new Error("Cannot find module '"+s+"'")}}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){return o(e[s][1][t]||t)},u,u.exports,t,e,n,i)}return n[s].exports}for(var c="function"==typeof __require&&__require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(t,e,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(t){return"function"==typeof t}function c(t){return"number"==typeof t}function s(t){return"object"==typeof t&&null!==t}function r(t){return void 0===t}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!c(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,n,i,c,a,h;if(this._events||(this._events={}),"error"===t&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var u=new Error('Uncaught, unspecified "error" event. ('+e+")");throw u.context=e,u}if(r(n=this._events[t]))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:c=Array.prototype.slice.call(arguments,1),n.apply(this,c)}else if(s(n))for(c=Array.prototype.slice.call(arguments,1),i=(h=n.slice()).length,a=0;a<i;a++)h[a].apply(this,c);return!0},i.prototype.addListener=function(t,e){var n;if(!o(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,o(e.listener)?e.listener:e),this._events[t]?s(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,s(this._events[t])&&!this._events[t].warned&&(n=r(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){if(!o(e))throw TypeError("listener must be a function");var n=!1;function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var n,i,c,r;if(!o(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(c=(n=this._events[t]).length,i=-1,n===e||o(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(s(n)){for(r=c;r-- >0;)if(n[r]===e||n[r].listener&&n[r].listener===e){i=r;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(o(n=this._events[t]))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){return this._events&&this._events[t]?o(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(o(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},{}],gameBoard:[function(t,e,n){"use strict";cc._RF.push(e,"c9880hN7mtKJIkIbcmDncBl","gameBoard");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{tilePrefab:cc.Prefab,winBoard:cc.Node,loseBoard:cc.Node,_tilesMatrix:[],_time:.25/8,_check:!0,_combined:!1,_skip:!1},_moveRow:function(t){var e=this;this._tilesMatrix.forEach(function(n,i){var o=n.filter(function(t){return t.active}),c=n.filter(function(t){return!t.active});n=t?c.concat(o):o.concat(c);for(var s=0;s<4;s++)e._tilesMatrix[i][s]=n.shift()})},_moveCollumn:function(t,e){for(var n=0;n<4;n++){for(var i=[],o=0;o<4;o++)i.push(this._tilesMatrix[o][n]);var c=i.filter(function(t){return t.active}),s=i.filter(function(t){return!t.active});i=t?s.concat(c):c.concat(s);for(var r=0;r<4;r++)this._tilesMatrix[r][n]=i.shift()}},_combineRow:function(t){var e=this;this._tilesMatrix.forEach(function(n,i){e.array=t?n.reverse():n,e.array.forEach(function(t,n,i){e.skip?e.skip=!1:(e.nextElement=i[n+1],e.elementScript=t.getComponent("tilesScript"),void 0!==e.nextElement&&(e.nextElementScript=e.nextElement.getComponent("tilesScript"),0!==e.elementScript.number&&e.elementScript.number===e.nextElementScript.number&&(e.skip=!0,e.elementScript.setNumber(e.elementScript.number*=2),t.runAction(cc.sequence(cc.scaleTo(e._time/2,1.25),cc.scaleTo(e._time/2,1))),e.nextElementScript.moveCombine(t.getPosition(cc.v2()),e._time/2),e._combined=!0)))}),t&&e.array.reverse()})},_combineCollumn:function(t){for(var e=this,n=0;n<4;n++){this.collumn=[];for(var i=0;i<4;i++)this.collumn.push(this._tilesMatrix[i][n]);t&&this.collumn.reverse(),this.collumn.forEach(function(t,n,i){e.skip?e.skip=!1:(e.nextElement=i[n+1],e.elementScript=t.getComponent("tilesScript"),void 0!==e.nextElement&&(e.nextElementScript=e.nextElement.getComponent("tilesScript"),0!==e.elementScript.number&&e.elementScript.number===e.nextElementScript.number&&(e.skip=!0,e.elementScript.setNumber(e.elementScript.number*=2),t.runAction(cc.sequence(cc.scaleTo(e._time/2,1.25),cc.scaleTo(e._time/2,1))),e.nextElementScript.moveCombine(t.getPosition(cc.v2()),e._time/2),e._combined=!0)))}),t&&this.collumn.reverse()}},_adjustPosition:function(){var t=this;this._tilesMatrix.forEach(function(e,n){return e.forEach(function(e,i){if(e.active){var o=e.getPosition(cc.v2());return t.action=cc.sequence(cc.moveTo(t._time,105*i-157.5,157.5-105*n),cc.callFunc(function(){var n=e.getPosition(cc.v2());(Math.abs(Math.floor(o.x-n.x))>25||Math.abs(Math.floor(o.y-n.y))>25)&&(t._check=!0)})),void e.runAction(t.action)}e.setPosition(cc.v2(105*i-157.5,157.5-105*n))})}),this.scheduleOnce(function(){t._combined&&(i.instance.emit("sound","combine"),t._combined=!1),t._generateRandomValue(),t.node.dispatchEvent(new cc.Event.EventCustom("updateScore",!0)),i.instance.emit("canMove")},2*this._time)},_generateRandomValue:function(){var t=this;if(this._check){do{if(this.randomCollumn=Math.floor(4*Math.random()),this.randomRow=Math.floor(4*Math.random()),this._tilesMatrix.flat().every(function(t){return t.active}))return}while(this._tilesMatrix[this.randomRow][this.randomCollumn].active);this.randomTile=this._tilesMatrix[this.randomRow][this.randomCollumn],this.number=this.randomTile.getComponent("tilesScript"),this.randomTile.active=!0,this.randomTile.scale=0,this.number.setNumber(Math.random()>.7?4:2),this.randomTile.setPosition(cc.v2(105*this.randomCollumn-157.5,157.5-105*this.randomRow)),this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time,1),cc.callFunc(function(){t.node.emit("checkWin"),t.node.emit("checkLose")}))),this._check=!1}},_setupGrid:function(){var t=1;this._tilesMatrix.push([],[],[],[]);for(var e=0;e<4;e++)for(var n=0;n<4;n++)this.tile=cc.instantiate(this.tilePrefab),this.tile.active=!1,this.tile.on("mousedown",this._onClick,this.tile),this.tile.name="tile "+t++,this.tile.setPosition(cc.v2(105*n-157.5,157.5-105*e)),this._tilesMatrix[Number(String(-1*(this.tile.getPosition().y-157.5))[0])][Number(String(this.tile.getPosition().x+157.5)[0])]=this.tile,this.node.addChild(this.tile);for(var o=0;o<2;o++)this._check=!0,this._generateRandomValue();i.instance.emit("canMove",!1),this._check=!1},_checkWin:function(){var t=this,e=!1;return this._tilesMatrix.flat().forEach(function(t){return 2048===t.getComponent("tilesScript").number?e=!0:null}),!!e&&(cc.log("you have won"),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this._onKeyDown,this),this.scheduleOnce(function(){t.node.dispatchEvent(new cc.Event.EventCustom("win",!0)),i.instance.emit("canMove",!1)},.5),!0)},_checkLose:function(){var t=this;if(this._tilesMatrix.flat().every(function(t){return t.active}))return this.checkRow=this._tilesMatrix.every(function(e){return!!e.every(function(e,n,i){return void 0===i[n+1]||(t.number=e.getComponent("tilesScript").number,t.nextNumber=i[n+1].getComponent("tilesScript").number,t.number!==t.nextNumber)})}),this.checkCollumn=this._tilesMatrix.flat().every(function(e,n,i){return void 0===i[n+4]||(t.number=e.getComponent("tilesScript").number,t.nextNumber=i[n+4].getComponent("tilesScript").number,t.number!==t.nextNumber)}),!(!this.checkCollumn||!this.checkRow)&&(cc.log("you have lost"),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this._onKeyDown,this),this.scheduleOnce(function(){t.node.dispatchEvent(new cc.Event.EventCustom("lose",!0)),i.instance.emit("canMove",!1)},.5),!0)},_reset:function(){this.node.children.forEach(function(t){return t.stopAllActions()}),this.node.children.forEach(function(t){return t.destroy()}),this.node.removeAllChildren(!0),this._tilesMatrix=[],this.node.dispatchEvent(new cc.Event.EventCustom("updateScore",!0)),this.node.emit("reset"),i.instance.emit("canMove",!1)},_onClick:function(){cc.log(this.name),this.script=this.getComponent("tilesScript"),this.script.setNumber(2048)},_addEvent:function(){var t=this;this.node.on("moveRow",function(e){t._moveRow(e),t._combineRow(e),t.scheduleOnce(function(){t._moveRow(e),t._adjustPosition()},t._time)},this),this.node.on("moveCollumn",function(e){t._moveCollumn(e),t._combineCollumn(e),t.scheduleOnce(function(){t._moveCollumn(e),t._adjustPosition()},t._time)},this),this.node.on("checkWin",this._checkWin,this),this.node.on("checkLose",this._checkLose,this),this.node.on("move",function(e){e.stopPropagation(),t._check=!0},this)},onLoad:function(){var t=this;this._addEvent(),i.instance.registerEvent("playing",function(){return t._playing=!0}),i.instance.registerEvent("notPlaying",function(){return t._playing=!1}),i.instance.registerEvent("start",this._setupGrid.bind(this))},start:function(){},update:function(t){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],instructionScript:[function(t,e,n){"use strict";cc._RF.push(e,"7d386LJraBC4LmolXtj0ui1","instructionScript"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],keyboardScript:[function(t,e,n){"use strict";cc._RF.push(e,"4ff70AxTrFBG6TaGPkydtY3","keyboardScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{_canMove:!0},_onKeyDown:function(t){if(this.node.emit("setInput",!1),this._canMove)switch(i.instance.emit("canMove",!1),t.keyCode){case cc.macro.KEY.a:this.node.emit("moveRow",!1),i.instance.emit("sound","swipe");break;case cc.macro.KEY.d:this.node.emit("moveRow",!0),i.instance.emit("sound","swipe");break;case cc.macro.KEY.w:this.node.emit("moveCollumn",!1),i.instance.emit("sound","swipe");break;case cc.macro.KEY.s:this.node.emit("moveCollumn",!0),i.instance.emit("sound","swipe");break;default:i.instance.emit("canMove")}},_reset:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this._onKeyDown,this)},onLoad:function(){var t=this;i.instance.registerEvent("canMove",function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return t._canMove=e}),this.node.on("reset",this._reset,this),this.node.on("setInput",function(e){e&&(t._canMove=!1)},this),i.instance.registerEvent("start",function(){return cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,t._onKeyDown,t)})},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],leaderBoardScript:[function(t,e,n){"use strict";cc._RF.push(e,"030e4gof9lNbKPtSyK/7YCc","leaderBoardScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{content:cc.Node,itemPrefab:cc.Prefab,userNameBox:cc.EditBox,score:cc.Label,_highScoreList:[],_data:null,_bestScore:0,_bestPlayer:"",_playing:null},onClickLeaderBoardButton:function(){i.instance.emit("showLeaderBoard"),i.instance.emit("hideMenu")},onClickReturn:function(){i.instance.emit("hideLeaderBoard"),i.instance.emit("showMenu")},onClickSave:function(){var t=this.userNameBox.string+":"+this.score.string;this._highScoreList.push(t),this.userNameBox.string="",this._data.setItem(this._highScoreList.length-1,t),cc.log(this._data)},_loadData:function(){for(var t=0;t<this._data.length;t++)null!==this._data.getItem(t)&&this._highScoreList.push(this._data.getItem(t));cc.log(this._highScoreList),this._sortData()},_sortData:function(){var t=this;this._highScoreList.forEach(function(e,n,i){if(t.number=parseInt(e.split(":")[1]),t._bestScore<t.number)return t._bestScore=t.number,void(t._bestPlayer=e.split(":")[0])});var e=this._highScoreList[0];this._highScoreList[this._highScoreList.indexOf(this._bestPlayer+":"+this._bestScore)]=e,this._highScoreList[0]=this._bestPlayer+":"+this._bestScore,cc.log(this._highScoreList),this._updateLeaderBoard()},_updateLeaderBoard:function(){var t=this;this.content.removeAllChildren(),this._highScoreList.forEach(function(e,n){var i=cc.instantiate(t.itemPrefab),o=i.getComponent(cc.Label);t.content.addChild(i),o.string=0!==n?"__________"+(n+1)+"__________\n"+e.split(":")[0]+"\n"+e.split(":")[1]:"_____UWU_____"+(n+1)+"_____UWU_____\n"+e.split(":")[0]+"\n"+e.split(":")[1]})},_show:function(){this.node.runAction(cc.moveTo(.5,cc.v2(0,0)).easing(cc.easeExponentialInOut(.5)))},_hide:function(){this.node.runAction(cc.moveTo(.5,cc.v2(500,0)).easing(cc.easeExponentialInOut(.5)))},onLoad:function(){var t=this;this._data=cc.sys.localStorage,this._data.removeItem("debug"),cc.log(this._data),this._loadData(),i.instance.registerEvent("showLeaderBoard",this._show.bind(this)),i.instance.registerEvent("hideLeaderBoard",this._hide.bind(this)),i.instance.registerEvent("playing",function(){return t._playing=!0}),i.instance.registerEvent("notPlaying",function(){return t._playing=!1})},start:function(){i.instance.emit("notify",{player:this._bestPlayer,score:this._bestScore})}}),cc._RF.pop()},{mEmitter:"mEmitter"}],loseBoardScript:[function(t,e,n){"use strict";cc._RF.push(e,"4e973i4LAhKiIcut4t1zfFh","loseBoardScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{gameScore:cc.Node},_lose:function(){this.node.getChildByName("score").getComponent(cc.Label).string=this.gameScore.getComponent(cc.Label).string,this.node.runAction(this.node.runAction(cc.moveTo(.5,0,0).easing(cc.easeExponentialInOut(.5))))},onClickReturnButton:function(){this.node.runAction(this.node.runAction(cc.moveTo(.5,0,-800).easing(cc.easeExponentialInOut(.5)))),i.instance.emit("showMenu"),i.instance.emit("hideWindow")},onLoad:function(){this.node.on("loseBoard",this._lose,this)},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],mEmitter:[function(t,e,n){"use strict";cc._RF.push(e,"b2ab7P6jp1D2ZYRvnIbRRi4","mEmitter");var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var c=t("events"),s=function(){function t(){o(this,t),this._emiter=new c,this._emiter.setMaxListeners(100)}return i(t,[{key:"emit",value:function(){var t;(t=this._emiter).emit.apply(t,arguments)}},{key:"registerEvent",value:function(t,e){this._emiter.on(t,e)}},{key:"registerOnce",value:function(t,e){this._emiter.once(t,e)}},{key:"removeEvent",value:function(t,e){this._emiter.removeListener(t,e)}},{key:"destroy",value:function(){this._emiter.removeAllListeners(),this._emiter=null,t.instance=null}}]),t}();s.instance=null,e.exports=s,cc._RF.pop()},{events:1}],mainScript:[function(t,e,n){"use strict";cc._RF.push(e,"8fac4OIPJpNUYU/SJM4C9F8","mainScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{},onLoad:function(){i.instance=new i},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],menuScript:[function(t,e,n){"use strict";cc._RF.push(e,"0b34cd7T+5Gz44/fbqD5O3W","menuScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{},onClickPlayButton:function(){i.instance.emit("hideMenu")},onClickMenuButton:function(){i.instance.emit("showMenu")},_show:function(){this.node.runAction(cc.moveTo(.5,0,0).easing(cc.easeExponentialInOut(.5)))},_hide:function(){this.node.runAction(cc.moveTo(.5,500,0).easing(cc.easeExponentialInOut(.5)))},onLoad:function(){i.instance.registerEvent("showMenu",this._show.bind(this)),i.instance.registerEvent("hideMenu",this._hide.bind(this))},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],notificationScript:[function(t,e,n){"use strict";cc._RF.push(e,"688deAYbdlDr4V81CNkMKEy","notificationScript");var i=t("mEmitter"),o=t("./utils");cc.Class({extends:cc.Component,properties:{label:cc.RichText,_player:"",_score:0},onLoad:function(){var t=this;i.instance.registerEvent("notify",function(e){t._player=e.player,t._score=e.score,cc.log(e)})},start:function(){this.label.string=o.generateRainbowText("The best player is "+this._player+" with the score of "+this._score);var t=cc.repeatForever(cc.sequence(cc.moveTo(5,-500,0),cc.moveTo(0,500,0)));this.label.node.runAction(t)}}),cc._RF.pop()},{"./utils":"utils",mEmitter:"mEmitter"}],prefabScript:[function(t,e,n){"use strict";cc._RF.push(e,"6cd4anyT4xKLqNnUPS5brir","prefabScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{nodeSprite:cc.Node,nodeLabel:cc.Label,_pos:cc.Vec2,_index:null,_time:.25,_moving:null,number:0},_setPosition:function(t){var e=this;this._moving||(t?this.node.setPosition(this._pos):0!==this.node.opacity?(this.node.once("position-changed",function(){e.node.dispatchEvent(new cc.Event.EventCustom("moved",!0)),cc.log("pos change")},this),this._moving=!0,this.action=cc.sequence(cc.moveTo(this._time,cc.v2(this._pos)),cc.callFunc(function(){e._moving=!1,e.node.dispatchEvent(new cc.Event.EventCustom("canMove",!0)),e.node.dispatchEvent(new cc.Event.EventCustom("stop",!0))})),this.node.runAction(this.action)):this.node.setPosition(this._pos))},_setActive:function(){if((arguments.length>0&&void 0!==arguments[0]?arguments[0]:null)===this._index&&0===this.node.opacity){this.node.opacity=255,this.number=Math.random()>.5?2:4,this.nodeLabel.string=this.number;var t=cc.sequence(cc.scaleTo(this._time/2,1.2),cc.callFunc(function(){}),cc.scaleTo(this._time/2,1));this.node.runAction(t)}},setNumber:function(t){this.number=t,this.nodeLabel.string=this.number},_getCombine:function(t){if(t.key===this._index){this.number*=2,this.nodeLabel.string=this.number;var e=cc.sequence(cc.scaleTo(this._time/2,1.2),cc.callFunc(function(){}),cc.scaleTo(this._time/2,1));this.node.runAction(e)}},_setCombine:function(t){var e=this;if(t.key===this._index){this.number=0,this.node.opacity=0,this.nodeLabel.string=this.number;var n=cc.sequence(cc.moveTo(this._time,t.pos),cc.callFunc(function(){e.node.setPosition(e._pos)}));this.node.runAction(n)}},onLoad:function(){i.instance.registerEvent("setPosition",this._setPosition.bind(this)),i.instance.registerEvent("setActive",this._setActive.bind(this)),i.instance.registerEvent("getCombine",this._getCombine.bind(this)),i.instance.registerEvent("setCombine",this._setCombine.bind(this))},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],soundScript:[function(t,e,n){"use strict";cc._RF.push(e,"672b0CRpudHdImKuG8hyh1D","soundScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{soundButtonText:cc.Label,swipeSound:cc.AudioSource,combineSound:cc.AudioSource,_muted:!1},onClickSound:function(){if(!this._muted)return this.node.children.forEach(function(t){return t.getComponent(cc.AudioSource).volume=0}),this.soundButtonText.string="Sounds OFF",void(this._muted=!0);this.node.children.forEach(function(t){return t.getComponent(cc.AudioSource).volume=1}),this.soundButtonText.string="Sounds ON",this._muted=!1},_playSound:function(t){"swipe"!==t?"combine"!==t||this.combineSound.play():this.swipeSound.play()},onLoad:function(){i.instance.registerEvent("sound",this._playSound.bind(this))},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],test:[function(t,e,n){"use strict";cc._RF.push(e,"4637dhzvQlAk5DmzV/fSdc6","test"),cc.Class({extends:cc.Component,properties:{nodePrefab:cc.Prefab,_canMove:!0,_tileArray:[],_moved:!0},_createTile:function(t){this._tileArray.push([],[],[],[]);for(var e=0,n=0;n<t;n++)for(var i=0;i<t;i++)this.tile=cc.instantiate(this.nodePrefab),this.tile.opacity=0,this.tile.name="tile "+(e+1),this.node.addChild(this.tile),this._tileArray[n].push(this.tile),this.script=this.tile.getComponent("prefabScript"),this.xPos=105*i-157.5,this.yPos=157.5-105*n,this.script._pos=cc.v2(this.xPos,this.yPos),this.script._index=e,e++;for(var o=0;o<2;o++){do{this.random=Math.floor(16*Math.random())}while(0!==this._tileArray.flat()[this.random].opacity);Emitter.instance.emit("setActive",this.random)}Emitter.instance.emit("setPosition",!0)},_onKeyDown:function(t){if(this._canMove)switch(this._canMove=!1,t.keyCode){case cc.macro.KEY.d:this._moveRow(!0),this._combineRow(!0),this._moveRow(!0),Emitter.instance.emit("setPosition"),this._generateRandomtile();break;case cc.macro.KEY.a:this._moveRow(!1),this._combineRow(!1),this._moveRow(!1),Emitter.instance.emit("setPosition"),this._generateRandomtile();break;case cc.macro.KEY.w:this._moveCollumn(!1),this._combineCollumn(!1),this._moveCollumn(!1),Emitter.instance.emit("setPosition"),this._generateRandomtile();break;case cc.macro.KEY.s:this._moveCollumn(!0),this._combineCollumn(!0),this._moveCollumn(!0),Emitter.instance.emit("setPosition"),this._generateRandomtile();break;default:this._canMove=!0}},_onClick:function(){this.opacity&&(this.script=this.getComponent("prefabScript"),2===this.script.number?this.script.setNumber(4):this.script.setNumber(2))},_moveRow:function(t){var e=this;this._tileArray.forEach(function(n,i){e.numbers=n.filter(function(t){return 0!==t.opacity}),e.zeros=n.filter(function(t){return 0===t.opacity}),(n=t?e.zeros.concat(e.numbers):e.numbers.concat(e.zeros)).forEach(function(t,n){e.script=t.getComponent("prefabScript"),e.script._pos.x=105*n-157.5});for(var o=0;o<4;o++)e._tileArray[i][o]=n.shift()})},_moveCollumn:function(t){for(var e=this,n=0;n<4;n++){this.collumn=[];for(var i=0;i<4;i++)this.collumn.push(this._tileArray[i][n]);this.numbers=this.collumn.filter(function(t){return 0!==t.opacity}),this.zeros=this.collumn.filter(function(t){return 0===t.opacity}),this.collumn=t?this.zeros.concat(this.numbers):this.numbers.concat(this.zeros),this.collumn.forEach(function(t,n){e.script=t.getComponent("prefabScript"),e.script._pos.y=157.5-105*n});for(var o=0;o<4;o++)this._tileArray[o][n]=this.collumn.shift()}},_combineRow:function(t){var e=this;this._tileArray.forEach(function(n,i){t&&n.reverse(),n.forEach(function(t,n,i){if(e.skip)e.skip=!1;else if(e.currentScript=t.getComponent("prefabScript"),void 0!==i[n+1]&&(e.nextElement=i[n+1],e.nextScript=e.nextElement.getComponent("prefabScript"),0!==e.nextScript.number&&0!==e.currentScript))return e.currentScript.number===e.nextScript.number?(Emitter.instance.emit("getCombine",{key:e.currentScript._index}),Emitter.instance.emit("setCombine",{key:e.nextScript._index,pos:e.currentScript._pos}),void(e.skip=!0)):void 0}),t&&n.reverse()})},_combineCollumn:function(t){for(var e=this,n=0;n<4;n++){this.collumn=[];for(var i=0;i<4;i++)this.collumn.push(this._tileArray[i][n]);t?this.collumn.reverse():this.collumn,this.collumn.forEach(function(t,n,i){if(e.skip)e.skip=!1;else if(e.currentElement=t,e.currentScript=e.currentElement.getComponent("prefabScript"),void 0!==i[n+1]&&(e.nextElement=i[n+1],e.nextScript=e.nextElement.getComponent("prefabScript"),0!==e.nextScript.number&&0!==e.currentScript))return e.currentScript.number===e.nextScript.number?(Emitter.instance.emit("getCombine",{key:e.currentScript._index}),Emitter.instance.emit("setCombine",{key:e.nextScript._index,pos:e.currentScript._pos}),void(e.skip=!0)):void 0}),t&&this.collumn.reverse()}},_generateRandomtile:function(){if(this._moved){do{if(this.random=Math.floor(16*Math.random()),this._tileArray.flat().every(function(t){return 0!==t.opacity}))return}while(0!==this._tileArray.flat()[this.random].opacity);this.script=this._tileArray.flat()[this.random].getComponent("prefabScript"),Emitter.instance.emit("setActive",this.script._index),this._moved=!1}},_addEvent:function(){var t=this;Emitter.instance.registerEvent("setPosition",this._generateRandomtile.bind(this)),this.node.on("moved",function(){t._moved=!0,cc.log("move")},this),this.node.on("canMove",function(e){e.stopPropagation(),t._canMove=!0},this)},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this._onKeyDown,this),this._createTile(4),this._addEvent()},start:function(){},update:function(t){}}),cc._RF.pop()},{}],tilesScript:[function(t,e,n){"use strict";cc._RF.push(e,"d5151/jsIBEQas95Jda5jHI","tilesScript"),cc.Class({extends:cc.Component,properties:{number:0,position:cc.Vec2,_index:null,_color:[]},setNumber:function(t){this.number=t,this.node.getComponentInChildren(cc.Label).string=this.number,parseInt(Math.log(this.number)/Math.log(2))&&(this.node.color=this._color[Math.log(this.number)/Math.log(2)-1])},moveCombine:function(t,e){var n=this,i=this.node.getPosition(cc.v2());this.node.dispatchEvent(new cc.Event.EventCustom("move",!0));var o=cc.sequence(cc.moveTo(e,t),cc.callFunc(function(){n.setNumber(0),n.node.active=!1,n.node.setPosition(i)}));this.node.runAction(o)},onLoad:function(){this._color=[cc.Color.GRAY,cc.Color.RED,cc.Color.GREEN,cc.Color.BLUE,cc.Color.YELLOW,cc.Color.ORANGE,cc.Color.CYAN,cc.Color.MAGENTA,cc.Color.YELLOW,cc.Color.RED,cc.Color.BLACK]},start:function(){},update:function(t){}}),cc._RF.pop()},{}],touchScript:[function(t,e,n){"use strict";cc._RF.push(e,"291ba7yH55PIYXyaG791xwA","touchScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{touchNode:cc.Node,_xDelta:0,_yDelta:0,_canTouch:!0},_onTouchStart:function(t){i.instance.emit("sound","swipe"),this.node.emit("setInput",!0),this._canTouch&&(this._canTouch=!1,this.touchNode.once("touchend",function(t){var e=t.getLocation().x-t.getStartLocation().x,n=t.getLocation().y-t.getStartLocation().y;cc.log("x delta is: ",e,", y delta is: ",n),0!==Math.abs(e)||0!==Math.abs(n)?(Math.abs(e)>Math.abs(n)?e>0?(this.node.emit("moveRow",!0),cc.log("move right")):(this.node.emit("moveRow",!1),cc.log("move left")):n>0?(this.node.emit("moveCollumn",!1),cc.log("move down")):(this.node.emit("moveCollumn",!0),cc.log("move up")),i.instance.emit("canMove")):i.instance.emit("canMove")},this),this.touchNode.on("touchcancel",function(t){i.instance.emit("canMove")},this))},onLoad:function(){var t=this;this.touchNode.on("touchstart",this._onTouchStart,this),i.instance.registerEvent("canMove",function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return t._canTouch=e}),this.node.on("setInput",function(e){e||(t._canTouch=!1)},this)},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],utils:[function(t,e,n){"use strict";cc._RF.push(e,"6c79bJJuWlPULfXU6VvBjx9","utils"),console.log("Utilities");var i={check:function(){return console.log("utilities has run")},passWordCheck:function(t){var e=t.split(""),n=0,i=0;if(!function(t){return t.forEach(function(t){parseInt(t)||t===t.toUpperCase()&&n++}),!!n}(e)||!function(t){return t.forEach(function(t){parseInt(t)||t===t.toLowerCase()&&i++}),!!i}(e))return!1;return!0},userNameCheck:function(t){return!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(t)},checkUserNameAvailable:function(t,e){var n=!0;return e.forEach(function(e){e.split(":")[0]===t&&(n=!1)}),!!n},emailCheck:function(t){var e=t.slice(t.indexOf("@"));return["@gmail.com","@yahoo.com"].includes(e)},checkStringLength:function(t,e){return!(t.length<e)},displayError:function(t,e){t.color=cc.Color.RED,t.parent.active=!0,t.getComponent("cc.Label").string=e},displayCorrect:function(t,e){t.color=cc.Color.GREEN,t.parent.active=!0,t.getComponent("cc.Label").string=e},primeNumber:function(t){for(var e=Array(t).fill(!0),n=[],i=2;i<t;i++)if(!0===e[i]){n.push(i);for(var o=i*i;o<t;o+=i)e[o]=0}return n},factorial:function(t){return 0===t||1===t?1:t*this.factorial(t-1)},generateRainbowText:function(t){var e=["#ff0000","#ff4000","#ff8000","#ffbf00","#ffff00","#bfff00","#80ff00","#40ff00","#00ff00","#00ff40","#00ff80","#00ffbf","#00ffff","#00bfff","#0080ff","#0040ff","\t#0000ff","#4000ff","#8000ff","#bf00ff","#ff00ff","#ff00bf","#ff0080","#ff0040","#ff0000"],n="";return t.split("").forEach(function(t,i){n+="<color="+e[i%e.length]+">"+t+"</c>"}),n}};e.exports=i,cc._RF.pop()},{}],winBoardScript:[function(t,e,n){"use strict";cc._RF.push(e,"84aaeTPbc1OtIO6+e+skMbm","winBoardScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{gameScore:cc.Node},_win:function(){this.node.getChildByName("score").getComponent(cc.Label).string=this.gameScore.getComponent(cc.Label).string,this.node.runAction(this.node.runAction(cc.moveTo(.5,0,0).easing(cc.easeExponentialInOut(.5))))},onClickReturnButton:function(){this.node.runAction(this.node.runAction(cc.moveTo(.5,0,800).easing(cc.easeExponentialInOut(.5)))),i.instance.emit("showMenu"),i.instance.emit("hideWindow")},onLoad:function(){this.node.on("winBoard",this._win,this)},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],windowScript:[function(t,e,n){"use strict";cc._RF.push(e,"795456T5e5BEYLQF5gO+zNh","windowScript");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{score:cc.Node,bestScoreNumber:cc.Label,gameBoard:cc.Node,leaderBoard:cc.Node,winBoard:cc.Node,loseBoard:cc.Node,_playing:!1},onClickPlayButton:function(){i.instance.emit("showWindow"),this._playing||i.instance.emit("start"),i.instance.emit("canMove"),i.instance.emit("playing")},onClickMenuButton:function(){i.instance.emit("hideWindow")},_scoreUpdate:function(){var t=this;this.gameMatrix=this.gameBoard.getComponent("gameBoard")._tilesMatrix.flat(),this.gameMatrix?(this.scoreNumber=0,this.gameMatrix.forEach(function(e){return t.scoreNumber+=e.getComponent("tilesScript").number}),this.score.getComponent("cc.Label").string=this.scoreNumber):this.score.getComponent("cc.Label").string=0},_win:function(){this.winBoard.emit("winBoard"),i.instance.emit("notPlaying")},_lose:function(){this.loseBoard.emit("loseBoard"),i.instance.emit("notPlaying")},onClickReturnButton:function(){this.gameBoard.getComponent("gameBoard")._reset(),this._playing&&i.instance.emit("notPlaying"),i.instance.emit("start"),i.instance.emit("canMove"),i.instance.emit("playing")},_show:function(){this.node.runAction(cc.moveTo(.5,0,0).easing(cc.easeExponentialInOut(.5)))},_hide:function(){this.node.runAction(cc.moveTo(.5,-500,0).easing(cc.easeExponentialInOut(.5)))},onLoad:function(){var t=this;this.node.on("updateScore",this._scoreUpdate,this),this.node.on("win",this._win,this),this.node.on("lose",this._lose,this),this.leaderBoardScript=this.leaderBoard.getComponent("leaderBoardScript"),this.leaderBoardScript.active=!1,cc.log(this.leaderBoardScript._bestScore),this.bestScoreNumber.string=this.leaderBoardScript._bestScore,i.instance.registerEvent("showWindow",this._show.bind(this)),i.instance.registerEvent("hideWindow",this._hide.bind(this)),i.instance.registerEvent("playing",function(){return t._playing=!0}),i.instance.registerEvent("notPlaying",function(){return t._playing=!1})},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}]},{},["prefabScript","test","gameBoard","instructionScript","keyboardScript","leaderBoardScript","loseBoardScript","mEmitter","mainScript","menuScript","notificationScript","soundScript","tilesScript","touchScript","utils","winBoardScript","windowScript"]);