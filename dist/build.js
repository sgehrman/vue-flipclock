!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.flipclock=n():t.flipclock=n()}(window,function(){return function(e){var i={}
function o(t){if(i[t])return i[t].exports
var n=i[t]={i:t,l:!1,exports:{}}
return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=i,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n
if(4&t&&"object"==typeof n&&n&&n.__esModule)return n
var e=Object.create(null)
if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)o.d(e,i,function(t){return n[t]}.bind(null,i))
return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t}
return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="/",o(o.s=5)}([function(t,n,e){var i=e(3)
"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,e(6).default)("666a2b21",i,!0,{})},function(t,n,e){function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var l=function(){}
l.createDom=function(t){if("string"!=typeof t)return t
var n=document.createElement("span")
return n.innerHTML=t,n.childNodes[0]},l.insertBefore=function(t,n){t="string"==typeof t?l.createDom(t):t,(n="string"==typeof n?l.createDom(n):n).parentNode.insertBefore(t,n)},l.extend=function(t,n){var e=l.prototype.extend
l._prototyping=!0
var i=new this
e.call(i,t),i.base=function(){},delete l._prototyping
var o=i.constructor,s=i.constructor=function(){if(!l._prototyping)if(this._constructing||this.constructor===s)this._constructing=!0,o.apply(this,arguments),delete this._constructing
else if(null!==arguments[0])return(arguments[0].extend||e).call(arguments[0],i)}
return s.ancestor=this,s.extend=this.extend,s.createDom=this.createDom,s.insertBefore=this.insertBefore,s.forEach=this.forEach,s.implement=this.implement,s.prototype=i,s.toString=this.toString,s.valueOf=function(t){return"object"===t?s:o.valueOf()},e.call(s,n),"function"==typeof s.init&&s.init(),s},l.prototype={extend:function(t,n){if(1<arguments.length){var e=this[t]
if(e&&"function"==typeof n&&(!e.valueOf||e.valueOf()!==n.valueOf())&&/\bbase\b/.test(n)){var i=n.valueOf();(n=function(){var t=this.base||l.prototype.base
this.base=e
var n=i.apply(this,arguments)
return this.base=t,n}).valueOf=function(t){return"object"===t?n:i},n.toString=l.toString}this[t]=n}else if(t){var o=l.prototype.extend
l._prototyping||"function"==typeof this||(o=this.extend||o)
for(var s={toSource:null},a=["constructor","toString","valueOf"],r=l._prototyping?0:1;key=a[r++];)t[key]!==s[key]&&o.call(this,key,t[key])
for(var c in t)s[c]||o.call(this,c,t[c])}return this}},l=l.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(t,n,e){for(var i in t)void 0===this.prototype[i]&&n.call(e,t[i],i,t)},implement:function(){for(var t=0;t<arguments.length;t++)"function"==typeof arguments[t]?arguments[t](this.prototype):this.prototype.extend(arguments[t])
return this},toString:function(){return String(this.valueOf())}})
var s=function t(n,e,i){return e instanceof Object&&e instanceof Date==!1&&(i=e,e=0),new t.Factory(n,e,i)}
s.Lang={},s.Base=l.extend({buildDate:"2018-10-18",version:"1.7.7",constructor:function(t,n){"object"!==o(t)&&(t={}),"object"!==o(n)&&(n={}),this.setOptions(Object.assign({},t,n))},callback:function(t){if("function"==typeof t){for(var n=[],e=1;e<=arguments.length;e++)arguments[e]&&n.push(arguments[e])
t.apply(this,n)}},log:function(t){window.console&&console.log&&console.log(t)},getOption:function(t){return!!this[t]&&this[t]},getOptions:function(){return this},setOption:function(t,n){this[t]=n},setOptions:function(t){for(var n in t)void 0!==t[n]&&this.setOption(n,t[n])}}),s.Face=s.Base.extend({autoStart:!0,dividers:[],dot:!0,factory:!1,lists:[],constructor:function(t,n){this.dividers=[],this.lists=[],this.base(n),this.factory=t},build:function(){this.autoStart&&this.start()},createDivider:function(){var t=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join(""),n=['<span class="'+this.factory.classes.divider+'">',t,"</span>"],e=l.createDom(n.join(""))
return this.dividers.push(e),e},createList:function(t,n,e){"object"===o(t)&&(n=t,t=0)
var i=new s.List(this.factory,t,n,e)
return this.lists.push(i),i},reset:function(){this.factory.time=new s.Time(this.factory,this.factory.original?Math.round(this.factory.original):0,{}),this.flip(this.factory.original,!1)},appendDigitToClock:function(t){},addDigit:function(t){var n=this.createList(t,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}})
this.appendDigitToClock(n)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0===this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(t,i){var o=this
Array.isArray(t)&&t.forEach(function(t,n){var e=o.lists[n]
e?(i||t===e.digit||e.play(),e.select(t)):o.addDigit(t)})}}),s.Factory=s.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"DailyCounter",countdown:!1,defaultClockFace:"DailyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(t,n,e){e||(e={}),this.lists=[],this.running=!1,this.base(e),this.$el=this.base.createDom(t),this.$el.classList.add(this.classes.wrapper),this.$wrapper=this.$el,this.original=n instanceof Date?n:n?Math.round(n):0,this.time=new s.Time(this,this.original,{animationRate:this.animationRate}),this.timer=new s.Timer(this,e),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,e),this.autoStart&&this.start()},loadClockFace:function(t,n){var e,i=!1
return t=t.ucfirst()+"Face",this.face.stop&&(this.stop(),i=!0),this.$el.innerHTML="",(e=s[t]?new s[t](this,n):new s[this.defaultClockFace+"Face"](this,n)).build(),this.face=e,i&&this.start(),this.face},loadLanguage:function(t){var n
return n=s.Lang[t.ucfirst()]?s.Lang[t.ucfirst()]:s.Lang[t]?s.Lang[t]:s.Lang[this.defaultLanguage],this.lang=n},localize:function(t,n){var e=this.lang
if(!t)return null
var i=t.toLowerCase()
return"object"===o(n)&&(e=n),e&&e[i]?e[i]:t},start:function(t){var n=this
n.running||n.countdown&&!(n.countdown&&0<n.time.time)?n.log("Trying to start timer when countdown already at 0"):(n.face.start(n.time),n.timer.start(function(){n.flip(),"function"==typeof t&&t()}))},stop:function(t){for(var n in this.face.stop(),this.timer.stop(t),this.lists)this.lists.hasOwnProperty(n)&&this.lists[n].stop()},reset:function(t){this.timer.reset(t),this.face.reset()},setTime:function(t){this.time.time=t,this.flip(!0)},getTime:function(t){return this.time},setCountdown:function(t){var n=this.running
this.countdown=Boolean(t),n&&(this.stop(),this.start())},flip:function(t){this.face.flip(!1,t)}}),s.List=s.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,items:[],lastDigit:0,constructor:function(t,n,e){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
this.factory=t,this.digit=n,this.lastDigit=n,this.$el=this.createList(),0<n&&this.select(n),i?i.appendChild(this.$el):this.factory.$el.appendChild(this.$el)},select:function(t){if(void 0===t?t=this.digit:this.digit=t,this.digit!==this.lastDigit){var n=this.$el.querySelector("."+this.classes.before)
n&&n.classList.remove(this.classes.before)
var e=this.$el.querySelector("."+this.classes.active)
e.classList.remove(this.classes.active),e.classList.add(this.classes.before),this.appendListItem(this.classes.active,this.digit),n&&n.remove(),this.lastDigit=this.digit}},play:function(){this.$el.classList.add(this.factory.classes.play)},stop:function(){var t=this
setTimeout(function(){t.$el.classList.remove(t.factory.classes.play)},this.factory.timer.interval)},createListItem:function(t,n){return['<li class="'+(t||"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(n||"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(n||"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(t,n){this.$el.appendChild(l.createDom(this.createListItem(t,n)))},createList:function(){var t=this.getPrevDigit()?this.getPrevDigit():this.digit
return l.createDom(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,t),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""))},getNextDigit:function(){return 9===this.digit?0:this.digit+1},getPrevDigit:function(){return 0===this.digit?9:this.digit-1}}),String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},s.Time=s.Base.extend({time:0,factory:!1,constructor:function(t,n,e){"object"!==o(e)&&(e={}),this.base(e),this.factory=t,n&&(this.time=n)},convertDigitsToArray:function(t){var n=[]
t=t.toString()
for(var e=0;e<t.length;e++)t[e].match(/^\d*$/g)&&n.push(t[e])
return n},digit:function(t){var n=this.toString(),e=n.length
return!!n[e-t]&&n[e-t]},digitize:function(t){var o=1<arguments.length&&void 0!==arguments[1]&&arguments[1],s=[]
return t.forEach(function(t,n){var e=s
o&&(e=[]),1===(t=t.toString()).length&&(t="0"+t)
for(var i=0;i<t.length;i++)e.push(t.charAt(i))
o&&s.push(e)}),s},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],n=[this.getDays(),this.getHours(!0),this.getMinutes(!0),this.getSeconds(!0)]
return{names:[this.factory.localize("Days"),this.factory.localize("Hours"),this.factory.localize("Minutes"),this.factory.localize("Seconds")],digits:this.digitize(n,t)}},getDays:function(t){var n=this.getTimeSeconds()/60/60/24
return t&&(n%=7),Math.floor(n)},getHourCounter:function(){return this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)])},getHourly:function(){return this.getHourCounter()},getHours:function(t){var n=this.getTimeSeconds()/60/60
return t&&(n%=24),Math.floor(n)},getMilitaryTime:function(t){t||(t=this.getDateObject())
var n=[t.getHours(),t.getMinutes(),t.getSeconds()]
return this.digitize(n)},getMinutes:function(t){var n=this.getTimeSeconds()/60
return t&&(n%=60),Math.floor(n)},getMinuteCounter:function(){return this.digitize([this.getMinutes(),this.getSeconds(!0)])},getTimeSeconds:function(t){return t||(t=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-t.getTime()/1e3,0):t.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(t){t||(t=this.getDateObject())
var n=t.getHours(),e=[12<n?n-12:0===n?12:n,t.getMinutes()]
return e.push(t.getSeconds()),this.digitize(e)},getSeconds:function(t){var n=this.getTimeSeconds()
return t&&(60===n?n=0:n%=60),Math.ceil(n)},getWeeks:function(t){var n=this.getTimeSeconds()/60/60/24/7
return t&&(n%=52),Math.floor(n)},removeLeadingZeros:function(e,i){var o=0,s=[]
return i.forEach(function(t,n){n<e?o+=parseInt(i[n],10):s.push(i[n])}),0===o?s:i},addSeconds:function(t){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+t):this.time+=t},addSecond:function(){this.addSeconds(1)},subSeconds:function(t){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-t):this.time-=t},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}}),s.Timer=s.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(t,n){this.base(n),this.factory=t,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(t){clearInterval(this.timer),this.count=0,this._setInterval(t),this.callback(this.callbacks.reset)},start:function(t){this.factory.running=!0,this._createTimer(t),this.callback(this.callbacks.start)},stop:function(t){this.factory.running=!1,this._clearInterval(t),this.callback(this.callbacks.stop),this.callback(t)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(t){this._setInterval(t)},_destroyTimer:function(t){this._clearInterval(),this.timer=!1,this.callback(t),this.callback(this.callbacks.destroy)},_interval:function(t){this.callback(this.callbacks.interval),this.callback(t),this.count++},_setInterval:function(t){var n=this
n._interval(t),n.timer=setInterval(function(){n._interval(t)},this.interval)}}),s.DailyCounterFace=s.Face.extend({constructor:function(t,n){this.base(t,n)},build:function(t){var s=this,a=this,n=this.factory.$el.querySelectorAll("ul"),r=this.factory.time.getDayCounter(!0),e=r.digits
e.length>n.length&&e.forEach(function(t,n){var e=s.factory.$el.appendChild(l.createDom('<div style="display: flex;"></div>'))
0!==n&&e.appendChild(s.createDivider())
var i=e.appendChild(l.createDom('<div style="display: flex; flex-direction: column;"></div>')),o=i.appendChild(l.createDom('<div style="display: flex;"></div>'))
i.appendChild(l.createDom('<div class="'+s.factory.classes.label+'">'+r.names[n]+"</div>")),t.forEach(function(t,n){a.createList(t,{},o)})}),this.base()},flip:function(t,n){t||(t=this.factory.time.getDayCounter().digits),this.autoIncrement(),this.base(t,n)}}),s.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},s.Lang.ar=s.Lang.Arabic,s.Lang["ar-ar"]=s.Lang.Arabic,s.Lang.arabic=s.Lang.Arabic,s.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},s.Lang.da=s.Lang.Danish,s.Lang["da-dk"]=s.Lang.Danish,s.Lang.danish=s.Lang.Danish,s.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},s.Lang.de=s.Lang.German,s.Lang["de-de"]=s.Lang.German,s.Lang.german=s.Lang.German,s.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},s.Lang.en=s.Lang.English,s.Lang["en-us"]=s.Lang.English,s.Lang.english=s.Lang.English,s.Lang.Spanish={years:"Años",months:"Meses",days:"Días",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},s.Lang.es=s.Lang.Spanish,s.Lang["es-es"]=s.Lang.Spanish,s.Lang.spanish=s.Lang.Spanish,s.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},s.Lang.fi=s.Lang.Finnish,s.Lang["fi-fi"]=s.Lang.Finnish,s.Lang.finnish=s.Lang.Finnish,s.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},s.Lang.fr=s.Lang.French,s.Lang["fr-ca"]=s.Lang.French,s.Lang.french=s.Lang.French,s.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},s.Lang.it=s.Lang.Italian,s.Lang["it-it"]=s.Lang.Italian,s.Lang.italian=s.Lang.Italian,s.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},s.Lang.lv=s.Lang.Latvian,s.Lang["lv-lv"]=s.Lang.Latvian,s.Lang.latvian=s.Lang.Latvian,s.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},s.Lang.nl=s.Lang.Dutch,s.Lang["nl-be"]=s.Lang.Dutch,s.Lang.dutch=s.Lang.Dutch,s.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},s.Lang.no=s.Lang.Norwegian,s.Lang.nb=s.Lang.Norwegian,s.Lang["no-nb"]=s.Lang.Norwegian,s.Lang.norwegian=s.Lang.Norwegian,s.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},s.Lang.pt=s.Lang.Portuguese,s.Lang["pt-br"]=s.Lang.Portuguese,s.Lang.portuguese=s.Lang.Portuguese,s.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},s.Lang.ru=s.Lang.Russian,s.Lang["ru-ru"]=s.Lang.Russian,s.Lang.russian=s.Lang.Russian,s.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},s.Lang.sv=s.Lang.Swedish,s.Lang["sv-se"]=s.Lang.Swedish,s.Lang.swedish=s.Lang.Swedish,s.Lang.Chinese={years:"年",months:"月",days:"日",hours:"时",minutes:"分",seconds:"秒"},s.Lang.zh=s.Lang.Chinese,s.Lang["zh-cn"]=s.Lang.Chinese,s.Lang.chinese=s.Lang.Chinese,"object"===o(n)&&void 0!==t?t.exports=s:window.FlipClock=s},function(t,n,e){"use strict"
var i=e(0)
e.n(i).a},function(t,n,e){(t.exports=e(4)(!1)).push([t.i,"\n.flip-clock-wrapper * {\n  box-sizing: border-box;\n  backface-visibility: hidden;\n}\n.flip-clock-wrapper a {\n  cursor: pointer;\n  text-decoration: none;\n  color: white;\n}\n.flip-clock-wrapper a:hover {\n  color: #fff;\n}\n.flip-clock-wrapper ul {\n  list-style: none;\n}\n.flip-clock-wrapper.clearfix:after,\n.flip-clock-wrapper.clearfix:before {\n  content: ' ';\n  display: table;\n}\n.flip-clock-wrapper.clearfix:after {\n  clear: both;\n}\n.flip-clock-wrapper.clearfix {\n  *zoom: 1;\n}\n.flip-clock-wrapper {\n  font: normal 11px 'Helvetica Neue', Helvetica, sans-serif;\n  user-select: none;\n  margin: 0 auto;\n  display: flex;\n  box-orient: horizontal;\n  box-pack: center;\n  box-align: center;\n  justify-content: center;\n}\n.flip-clock-meridium {\n  background: none !important;\n  box-shadow: 0 0 0 !important;\n  font-size: 36px !important;\n}\n.flip-clock-meridium a {\n  color: #313333;\n}\n.flip-clock-wrapper {\n  text-align: center;\n  position: relative;\n  width: 100%;\n}\n.flip-clock-wrapper:after,\n.flip-clock-wrapper:before {\n  content: ' ';\n  display: table;\n}\n.flip-clock-wrapper:after {\n  clear: both;\n}\n.flip-clock-wrapper ul {\n  position: relative;\n  margin: 5px;\n  width: 60px;\n  height: 90px;\n  font-size: 80px;\n  font-weight: bold;\n  line-height: 87px;\n  border-radius: 6px;\n  background: #000;\n}\n.flip-clock-wrapper ul li {\n  z-index: 1;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  line-height: 87px;\n  text-decoration: none !important;\n}\n.flip-clock-wrapper ul li:first-child {\n  z-index: 2;\n}\n.flip-clock-wrapper ul li a {\n  display: block;\n  height: 100%;\n  perspective: 200px;\n  margin: 0 !important;\n  overflow: visible !important;\n  cursor: default !important;\n}\n.flip-clock-wrapper ul li a div {\n  z-index: 1;\n  position: absolute;\n  left: 0;\n  width: 100%;\n  height: 50%;\n  font-size: 80px;\n  overflow: hidden;\n  outline: 1px solid transparent;\n}\n.flip-clock-wrapper ul li a div .shadow {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n}\n.flip-clock-wrapper ul li a div.up {\n  transform-origin: 50% 100%;\n  top: 0;\n}\n.flip-clock-wrapper ul li a div.up:after {\n  content: '';\n  position: absolute;\n  top: 44px;\n  left: 0;\n  z-index: 5;\n  width: 100%;\n  height: 3px;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n.flip-clock-wrapper ul li a div.down {\n  transform-origin: 50% 0;\n  bottom: 0;\n  border-bottom-left-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n.flip-clock-wrapper ul li a div div.inn {\n  position: absolute;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  height: 200%;\n  color: white;\n  text-shadow: 0 1px 2px #000;\n  text-align: center;\n  background-color: #333;\n  border-radius: 6px;\n  border-radius: 6px;\n  font-size: 70px;\n}\n.flip-clock-wrapper ul li a div.up div.inn {\n  top: 0;\n}\n.flip-clock-wrapper ul li a div.down div.inn {\n  bottom: 0;\n}\n\n/* PLAY */\n.flip-clock-wrapper ul.play li.flip-clock-before {\n  z-index: 3;\n}\n.flip-clock-wrapper .flip {\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);\n}\n.flip-clock-wrapper ul.play li.flip-clock-active {\n  animation: asd 0.5s 0.5s linear both;\n  z-index: 5;\n}\n.flip-clock-divider {\n  display: inline-block;\n  position: relative;\n  width: 20px;\n  height: 100px;\n}\n.flip-clock-dot {\n  display: block;\n  background: #323434;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  border-radius: 50%;\n  left: 5px;\n}\n.flip-clock-label {\n  color: rgba(0, 0, 0, 0.6);\n  margin-top: 8px;\n  font-size: 2em;\n  font-weight: bold;\n}\n.flip-clock-dot.top {\n  top: 30px;\n}\n.flip-clock-dot.bottom {\n  bottom: 30px;\n}\n@keyframes asd {\n0% {\n    z-index: 2;\n}\n20% {\n    z-index: 4;\n}\n100% {\n    z-index: 4;\n}\n}\n.flip-clock-wrapper ul.play li.flip-clock-active .down {\n  z-index: 2;\n  animation: turn 0.5s 0.5s linear both;\n}\n@keyframes turn {\n0% {\n    transform: rotateX(90deg);\n}\n100% {\n    transform: rotateX(0deg);\n}\n}\n.flip-clock-wrapper ul.play li.flip-clock-before .up {\n  z-index: 2;\n  animation: turn2 0.5s linear both;\n}\n@keyframes turn2 {\n0% {\n    transform: rotateX(0deg);\n}\n100% {\n    transform: rotateX(-90deg);\n}\n}\n.flip-clock-wrapper ul li.flip-clock-active {\n  z-index: 3;\n}\n.flip-clock-wrapper ul.play li.flip-clock-before .up .shadow {\n  background: linear, top, rgba(0, 0, 0, 0.1) 0%, black 100%;\n  background: linear, to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%;\n  animation: show 0.5s linear both;\n}\n.flip-clock-wrapper ul.play li.flip-clock-active .up .shadow {\n  background: linear, to bottom, rgba(0, 0, 0, 0.1) 0%, #bdd0ff 100%;\n  animation: hide 0.5s 0.3s linear both;\n}\n.flip-clock-wrapper ul.play li.flip-clock-before .down .shadow {\n  background: linear, to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%;\n  animation: show 0.5s linear both;\n}\n.flip-clock-wrapper ul.play li.flip-clock-active .down .shadow {\n  background: linear, to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%;\n  animation: hide 0.5s 0.2s linear both;\n}\n@keyframes show {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n@keyframes hide {\n0% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n",""])},function(t,n){t.exports=function(e){var a=[]
return a.toString=function(){return this.map(function(t){var n=function(t,n){var e=t[1]||"",i=t[3]
if(!i)return e
if(n&&"function"==typeof btoa){var o=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),s=i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})
return[e].concat(s).concat([o]).join("\n")}var a
return[e].join("\n")}(t,e)
return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},a.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]])
for(var e={},i=0;i<this.length;i++){var o=this[i][0]
"number"==typeof o&&(e[o]=!0)}for(i=0;i<t.length;i++){var s=t[i]
"number"==typeof s[0]&&e[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),a.push(s))}},a}},function(t,n,e){"use strict"
e.r(n)
var i=e(1),o=e.n(i),s={props:{digit:Number,options:{type:Object,default:function(){return{}}}},data:function(){return{clock:null,convert:{days:"hours",hours:"minutes",minutes:"seconds",seconds:"last"}}},created:function(){var t=this
this.$nextTick(function(){t.init(t.options)})},watch:{options:{handler:function(t){this.reset(t)},deep:!0},digit:function(t){console.warn("deprecated. please use `options.digit` instead")}},methods:{init:function(t){if(t=t||{},this.destroyClock(),this.clock=new o.a(this.$refs.flipclock,void 0!==t.digit?t.digit:this.digit,Object.assign({},t,{autoStart:!t.hasOwnProperty("autoStart")||t.autoStart})),t.divider&&"[object Object]"===Object.prototype.toString.call(t.divider))for(var n in t.divider){var e=document.querySelector(".flip-clock-divider.".concat(this.convert[n]))
e?e.innerHTML=t.divider[n]:"last"===this.convert[n]&&this.$refs.flipclock.appendChild(o.a.Base.createDom('<span class="flip-clock-divider">'.concat(t.divider[n],"</span>")))}t.time&&this.clock.setTime(t.time),t.time&&this.clock.autoStart&&this.clock.start()},instance:function(){return this.clock},trigger:function(t,n){this.clock&&this.clock[t]&&this.clock[t](arguments.slice(1))},start:function(t){this.clock&&this.clock.start(t)},stop:function(t){this.clock&&this.clock.stop(t)},reset:function(t,n){"function"==typeof t&&(n=t,t=null),this.clock&&this.clock.reset(n),t&&(t.digit=void 0!==t.digit?t.digit:0,this.init(t))},increment:function(){this.clock&&this.clock.increment()},decrement:function(){this.clock&&this.clock.decrement()},loadClockFace:function(t,n){this.clock&&this.clock.loadClockFace(t,n)},loadLanguage:function(t){this.clock&&this.clock.loadLanguage(t)},setCountdown:function(t){this.clock&&this.clock.setCountdown(t)},getTime:function(){this.clock&&this.clock.getTime()},setTime:function(t){this.clock&&this.clock.setTime(t)},setOptions:function(t){this.clock&&this.clock.setOptions(t)},destroyClock:function(){this.clock&&(this.clock.stop(),this.clock=null)}},beforeDestroy:function(){this.destroyClock()}}
e(2)
var a=function(t,n,e,i,o,s,a,r){var c,l="function"==typeof t?t.options:t
if(n&&(l.render=n,l.staticRenderFns=e,l._compiled=!0),i&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=c):o&&(c=r?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c
var u=l.render
l.render=function(t,n){return c.call(n),u(t,n)}}else{var h=l.beforeCreate
l.beforeCreate=h?[].concat(h,c):[c]}return{exports:t,options:l}}(s,function(){var t=this.$createElement
return(this._self._c||t)("div",{ref:"flipclock",staticClass:"flip-clock"})},[],!1,null,null,null)
a.options.__file="flipclock.vue"
var r=a.exports
n.default=r},function(t,n,e){"use strict"
function c(t,n){for(var e=[],i={},o=0;o<n.length;o++){var s=n[o],a=s[0],r={id:t+":"+o,css:s[1],media:s[2],sourceMap:s[3]}
i[a]?i[a].parts.push(r):e.push(i[a]={id:a,parts:[r]})}return e}e.r(n),e.d(n,"default",function(){return p})
var i="undefined"!=typeof document
if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.")
var l={},o=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,a=0,u=!1,r=function(){},h=null,f="data-vue-ssr-id",d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase())
function p(a,t,n,e){u=n,h=e||{}
var r=c(a,t)
return g(r),function(t){for(var n=[],e=0;e<r.length;e++){var i=r[e];(o=l[i.id]).refs--,n.push(o)}t?g(r=c(a,t)):r=[]
for(e=0;e<n.length;e++){var o
if(0===(o=n[e]).refs){for(var s=0;s<o.parts.length;s++)o.parts[s]()
delete l[o.id]}}}}function g(t){for(var n=0;n<t.length;n++){var e=t[n],i=l[e.id]
if(i){i.refs++
for(var o=0;o<i.parts.length;o++)i.parts[o](e.parts[o])
for(;o<e.parts.length;o++)i.parts.push(v(e.parts[o]))
i.parts.length>e.parts.length&&(i.parts.length=e.parts.length)}else{var s=[]
for(o=0;o<e.parts.length;o++)s.push(v(e.parts[o]))
l[e.id]={id:e.id,refs:1,parts:s}}}}function m(){var t=document.createElement("style")
return t.type="text/css",o.appendChild(t),t}function v(n){var e,i,t=document.querySelector("style["+f+'~="'+n.id+'"]')
if(t){if(u)return r
t.parentNode.removeChild(t)}if(d){var o=a++
t=s||(s=m()),e=k.bind(null,t,o,!1),i=k.bind(null,t,o,!0)}else t=m(),e=function(t,n){var e=n.css,i=n.media,o=n.sourceMap
i&&t.setAttribute("media",i)
h.ssrId&&t.setAttribute(f,n.id)
o&&(e+="\n/*# sourceURL="+o.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */")
if(t.styleSheet)t.styleSheet.cssText=e
else{for(;t.firstChild;)t.removeChild(t.firstChild)
t.appendChild(document.createTextNode(e))}}.bind(null,t),i=function(){t.parentNode.removeChild(t)}
return e(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return
e(n=t)}else i()}}var y,b=(y=[],function(t,n){return y[t]=n,y.filter(Boolean).join("\n")})
function k(t,n,e,i){var o=e?"":i.css
if(t.styleSheet)t.styleSheet.cssText=b(n,o)
else{var s=document.createTextNode(o),a=t.childNodes
a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(s,a[n]):t.appendChild(s)}}}])})
