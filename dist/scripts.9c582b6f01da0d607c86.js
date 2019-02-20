declare namespace typestate {
    /**
     * Transition grouping to faciliate fluent api
     */
    class Transitions<T> {
        fsm: FiniteStateMachine<T>;
        constructor(fsm: FiniteStateMachine<T>);
        fromStates: T[];
        toStates: T[];
        /**
         * Specify the end state(s) of a transition function
         */
        to(...states: T[]): void;
        /**
         * Specify that any state in the state enum is value
         * Takes the state enum as an argument
         */
        toAny(states: any): void;
    }
    /**
     * Internal representation of a transition function
     */
    class TransitionFunction<T> {
        fsm: FiniteStateMachine<T>;
        from: T;
        to: T;
        constructor(fsm: FiniteStateMachine<T>, from: T, to: T);
    }
    /**
     * A simple finite state machine implemented in TypeScript, the templated argument is meant to be used
     * with an enumeration.
     */
    class FiniteStateMachine<T> {
        currentState: T;
        private _startState;
        private _allowImplicitSelfTransition;
        private _transitionFunctions;
        private _onCallbacks;
        private _exitCallbacks;
        private _enterCallbacks;
        private _invalidTransitionCallback;
        constructor(startState: T, allowImplicitSelfTransition?: boolean);
        addTransitions(fcn: Transitions<T>): void;
        /**
         * Listen for the transition to this state and fire the associated callback
         */
        on(state: T, callback: (from?: T, event?: any) => any): FiniteStateMachine<T>;
        /**
         * Listen for the transition to this state and fire the associated callback, returning
         * false in the callback will block the transition to this state.
         */
        onEnter(state: T, callback: (from?: T, event?: any) => boolean): FiniteStateMachine<T>;
        /**
         * Listen for the transition to this state and fire the associated callback, returning
         * false in the callback will block the transition from this state.
         */
        onExit(state: T, callback: (to?: T) => boolean): FiniteStateMachine<T>;
        /**
         * List for an invalid transition and handle the error, returning a falsy value will throw an
         * exception, a truthy one will swallow the exception
         */
        onInvalidTransition(callback: (from?: T, to?: T) => boolean): FiniteStateMachine<T>;
        /**
         * Declares the start state(s) of a transition function, must be followed with a '.to(...endStates)'
         */
        from(...states: T[]): Transitions<T>;
        fromAny(states: any): Transitions<T>;
        private _validTransition(from, to);
        /**
         * Check whether a transition between any two states is valid.
         *    If allowImplicitSelfTransition is true, always allow transitions from a state back to itself.
         *     Otherwise, check if it's a valid transition.
         */
        private _canGo(fromState, toState);
        /**
         * Check whether a transition to a new state is valid
         */
        canGo(state: T): boolean;
        /**
         * Transition to another valid state
         */
        go(state: T, event?: any): void;
        /**
         * This method is availble for overridding for the sake of extensibility.
         * It is called in the event of a successful transition.
         */
        onTransition(from: T, to: T): void;
        /**
        * Reset the finite state machine back to the start state, DO NOT USE THIS AS A SHORTCUT for a transition.
        * This is for starting the fsm from the beginning.
        */
        reset(): void;
        /**
         * Whether or not the current state equals the given state
         */
        is(state: T): boolean;
        private _transitionTo(state, event?);
    }
}
declare var TypeState: typeof typestate;

;/**
 * Copyright (c) 2016-2019, The Cytoscape Consortium.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the “Software”), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).cytoscape=t()}(this,function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var a="undefined"==typeof window?null:window,o=a?a.navigator:null,s=(a&&a.document,e("")),l=e({}),u=e(function(){}),c="undefined"==typeof HTMLElement?"undefined":e(HTMLElement),h=function(e){return e&&e.instanceString&&p(e.instanceString)?e.instanceString():null},d=function(t){return null!=t&&e(t)==s},p=function(t){return null!=t&&e(t)===u},f=function(e){return Array.isArray?Array.isArray(e):null!=e&&e instanceof Array},g=function(t){return null!=t&&e(t)===l&&!f(t)&&t.constructor===Object},v=function(t){return null!=t&&e(t)===e(1)&&!isNaN(t)},y=function(e){return"undefined"===c?void 0:null!=e&&e instanceof HTMLElement},m=function(e){return b(e)||x(e)},b=function(e){return"collection"===h(e)&&e._private.single},x=function(e){return"collection"===h(e)&&!e._private.single},w=function(e){return"core"===h(e)},E=function(e){return"stylesheet"===h(e)},k=function(e){return null==e||!(""!==e&&!e.match(/^\s+$/))},C=function(t){return function(t){return null!=t&&e(t)===l}(t)&&p(t.then)},S=function(){return o&&o.userAgent.match(/msie|trident|edge/i)},D=function(e,t){t||(t=function(){if(1===arguments.length)return arguments[0];if(0===arguments.length)return"undefined";for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);return e.join("$")});var n=function n(){var r,i=arguments,a=t.apply(this,i),o=n.cache;return(r=o[a])||(r=o[a]=e.apply(this,i)),r};return n.cache={},n},T=D(function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}),P=D(function(e){return e.replace(/(-\w)/g,function(e){return e[1].toUpperCase()})}),M=D(function(e,t){return e+t[0].toUpperCase()+t.substring(1)},function(e,t){return e+"$"+t}),_=function(e){return k(e)?e:e.charAt(0).toUpperCase()+e.substring(1)},B="(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))",N=function(e,t){return e<t?-1:e>t?1:0},I=null!=Object.assign?Object.assign.bind(Object):function(e){for(var t=arguments,n=1;n<t.length;n++){var r=t[n];if(null!=r)for(var i=Object.keys(r),a=0;a<i.length;a++){var o=i[a];e[o]=r[o]}}return e},A=function(e){return(f(e)?e:null)||function(e){return z[e.toLowerCase()]}(e)||function(e){if((4===e.length||7===e.length)&&"#"===e[0]){var t,n,r;return 4===e.length?(t=parseInt(e[1]+e[1],16),n=parseInt(e[2]+e[2],16),r=parseInt(e[3]+e[3],16)):(t=parseInt(e[1]+e[2],16),n=parseInt(e[3]+e[4],16),r=parseInt(e[5]+e[6],16)),[t,n,r]}}(e)||function(e){var t,n=new RegExp("^rgb[a]?\\(((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)(?:\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))))?\\)$").exec(e);if(n){t=[];for(var r=[],i=1;i<=3;i++){var a=n[i];if("%"===a[a.length-1]&&(r[i]=!0),a=parseFloat(a),r[i]&&(a=a/100*255),a<0||a>255)return;t.push(Math.floor(a))}var o=r[1]||r[2]||r[3],s=r[1]&&r[2]&&r[3];if(o&&!s)return;var l=n[4];if(void 0!==l){if((l=parseFloat(l))<0||l>1)return;t.push(l)}}return t}(e)||function(e){var t,n,r,i,a,o,s,l;function u(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}var c=new RegExp("^hsl[a]?\\(((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?)))\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%])\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%])(?:\\s*,\\s*((?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))))?\\)$").exec(e);if(c){if((n=parseInt(c[1]))<0?n=(360- -1*n%360)%360:n>360&&(n%=360),n/=360,(r=parseFloat(c[2]))<0||r>100)return;if(r/=100,(i=parseFloat(c[3]))<0||i>100)return;if(i/=100,void 0!==(a=c[4])&&((a=parseFloat(a))<0||a>1))return;if(0===r)o=s=l=Math.round(255*i);else{var h=i<.5?i*(1+r):i+r-i*r,d=2*i-h;o=Math.round(255*u(d,h,n+1/3)),s=Math.round(255*u(d,h,n)),l=Math.round(255*u(d,h,n-1/3))}t=[o,s,l,a]}return t}(e)},z={transparent:[0,0,0,0],aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},L=function(e){for(var t=e.map,n=e.keys,r=n.length,i=0;i<r;i++){var a=n[i];if(g(a))throw Error("Tried to set map with object key");i<n.length-1?(null==t[a]&&(t[a]={}),t=t[a]):t[a]=e.value}},O=function(e){for(var t=e.map,n=e.keys,r=n.length,i=0;i<r;i++){var a=n[i];if(g(a))throw Error("Tried to get map with object key");if(null==(t=t[a]))return t}return t},R="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var F="Expected a function",V=NaN,q="[object Symbol]",Y=/^\s+|\s+$/g,X=/^[-+]0x[0-9a-f]+$/i,j=/^0b[01]+$/i,W=/^0o[0-7]+$/i,H=parseInt,K="object"==typeof R&&R&&R.Object===Object&&R,G="object"==typeof self&&self&&self.Object===Object&&self,Z=K||G||Function("return this")(),U=Object.prototype.toString,$=Math.max,Q=Math.min,J=function(){return Z.Date.now()};function ee(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function te(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&U.call(e)==q}(e))return V;if(ee(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=ee(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(Y,"");var n=j.test(e);return n||W.test(e)?H(e.slice(2),n?2:8):X.test(e)?V:+e}var ne=function(e,t,n){var r,i,a,o,s,l,u=0,c=!1,h=!1,d=!0;if("function"!=typeof e)throw new TypeError(F);function p(t){var n=r,a=i;return r=i=void 0,u=t,o=e.apply(a,n)}function f(e){var n=e-l;return void 0===l||n>=t||n<0||h&&e-u>=a}function g(){var e=J();if(f(e))return v(e);s=setTimeout(g,function(e){var n=t-(e-l);return h?Q(n,a-(e-u)):n}(e))}function v(e){return s=void 0,d&&r?p(e):(r=i=void 0,o)}function y(){var e=J(),n=f(e);if(r=arguments,i=this,l=e,n){if(void 0===s)return function(e){return u=e,s=setTimeout(g,t),c?p(e):o}(l);if(h)return s=setTimeout(g,t),p(l)}return void 0===s&&(s=setTimeout(g,t)),o}return t=te(t)||0,ee(n)&&(c=!!n.leading,a=(h="maxWait"in n)?$(te(n.maxWait)||0,t):a,d="trailing"in n?!!n.trailing:d),y.cancel=function(){void 0!==s&&clearTimeout(s),u=0,r=l=i=s=void 0},y.flush=function(){return void 0===s?o:v(J())},y},re=a?a.performance:null,ie=re&&re.now?function(){return re.now()}:function(){return Date.now()},ae=function(){if(a){if(a.requestAnimationFrame)return function(e){a.requestAnimationFrame(e)};if(a.mozRequestAnimationFrame)return function(e){a.mozRequestAnimationFrame(e)};if(a.webkitRequestAnimationFrame)return function(e){a.webkitRequestAnimationFrame(e)};if(a.msRequestAnimationFrame)return function(e){a.msRequestAnimationFrame(e)}}return function(e){e&&setTimeout(function(){e(ie())},1e3/60)}}(),oe=function(e){return ae(e)},se=ie,le=function(e){for(var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5381;!(t=e.next()).done;)n=33*n^t.value;return n>>>0},ue=function(e){return(33*(arguments.length>1&&void 0!==arguments[1]?arguments[1]:5381)^e)>>>0},ce=function(e,t){var n={value:0,done:!1},r=0,i=e.length;return le({next:function(){return r<i?n.value=e[r++]:n.done=!0,n}},t)},he=function(e,t){var n={value:0,done:!1},r=0,i=e.length;return le({next:function(){return r<i?n.value=e.charCodeAt(r++):n.done=!0,n}},t)},de=function(){return pe(arguments)},pe=function(e){for(var t,n=0;n<e.length;n++){var r=e[n];t=0===n?he(r):he(r,t)}return t},fe=null!=console.warn,ge=null!=console.trace,ve=Number.MAX_SAFE_INTEGER||9007199254740991,ye=function(){return!0},me=function(){return!1},be=function(){return 0},xe=function(){},we=function(e){throw new Error(e)},Ee=function(e){fe?console.warn(e):(console.log(e),ge&&console.trace())},ke=function(e){return null==e?e:f(e)?e.slice():g(e)?function(e){return I({},e)}(e):e},Ce=function(e,t){for(t=e="";e++<36;t+=51*e&52?(15^e?8^Math.random()*(20^e?16:4):4).toString(16):"-");return t},Se={},De=function(){return Se},Te=function(e){var t=Object.keys(e);return function(n){for(var r={},i=0;i<t.length;i++){var a=t[i],o=null==n?void 0:n[a];r[a]=void 0===o?e[a]:o}return r}},Pe=function(e,t,n){for(var r=e.length;r>=0&&(e[r]!==t||(e.splice(r,1),n));r--);},Me=function(e){e.splice(0,e.length)},_e=function(e,t,n){return n&&(t=M(n,t)),e[t]},Be=function(e,t,n,r){n&&(t=M(n,t)),e[t]=r},Ne="undefined"!=typeof Map?Map:function(){function e(){t(this,e),this._obj={}}return r(e,[{key:"set",value:function(e,t){return this._obj[e]=t,this}},{key:"delete",value:function(e){return this._obj[e]=void 0,this}},{key:"clear",value:function(){this._obj={}}},{key:"has",value:function(e){return void 0!==this._obj[e]}},{key:"get",value:function(e){return this._obj[e]}}]),e}(),Ie=function(){function e(n){if(t(this,e),this._obj=Object.create(null),this.size=0,null!=n){var r;r=null!=n.instanceString&&n.instanceString()===this.instanceString()?n.toArray():n;for(var i=0;i<r.length;i++)this.add(r[i])}}return r(e,[{key:"instanceString",value:function(){return"set"}},{key:"add",value:function(e){var t=this._obj;1!==t[e]&&(t[e]=1,this.size++)}},{key:"delete",value:function(e){var t=this._obj;1===t[e]&&(t[e]=0,this.size--)}},{key:"clear",value:function(){this._obj=Object.create(null)}},{key:"has",value:function(e){return 1===this._obj[e]}},{key:"toArray",value:function(){var e=this;return Object.keys(this._obj).filter(function(t){return e.has(t)})}},{key:"forEach",value:function(e,t){return this.toArray().forEach(e,t)}}]),e}(),Ae="undefined"!==("undefined"==typeof Set?"undefined":e(Set))?Set:Ie,ze=function(e,t,n){if(n=!(void 0!==n&&!n),void 0!==e&&void 0!==t&&w(e)){var r=t.group;if(null==r&&(r=t.data&&null!=t.data.source&&null!=t.data.target?"edges":"nodes"),"nodes"===r||"edges"===r){this.length=1,this[0]=this;var i=this._private={cy:e,single:!0,data:t.data||{},position:t.position||{x:0,y:0},autoWidth:void 0,autoHeight:void 0,autoPadding:void 0,compoundBoundsClean:!1,listeners:[],group:r,style:{},rstyle:{},styleCxts:[],styleKeys:{},removed:!0,selected:!!t.selected,selectable:void 0===t.selectable||!!t.selectable,locked:!!t.locked,grabbed:!1,grabbable:void 0===t.grabbable||!!t.grabbable,active:!1,classes:new Ae,animation:{current:[],queue:[]},rscratch:{},scratch:t.scratch||{},edges:[],children:[],parent:null,traversalCache:{},backgrounding:!1,bbCache:null,bbCacheShift:{x:0,y:0}};if(null==i.position.x&&(i.position.x=0),null==i.position.y&&(i.position.y=0),t.renderedPosition){var a=t.renderedPosition,o=e.pan(),s=e.zoom();i.position={x:(a.x-o.x)/s,y:(a.y-o.y)/s}}var l=[];f(t.classes)?l=t.classes:d(t.classes)&&(l=t.classes.split(/\s+/));for(var u=0,c=l.length;u<c;u++){var h=l[u];h&&""!==h&&i.classes.add(h)}var p=t.style||t.css;p&&(Ee("Setting a `style` bypass at element creation is deprecated"),e.style().applyBypass(this,p)),this.createEmitter(),(void 0===n||n)&&this.restore()}else we("An element must be of type `nodes` or `edges`; you specified `"+r+"`")}else we("An element must have a core reference and parameters set")},Le=function(e){return e={bfs:e.bfs||!e.dfs,dfs:e.dfs||!e.bfs},function(t,n,r){var i;g(t)&&!m(t)&&(t=(i=t).roots||i.root,n=i.visit,r=i.directed),r=2!==arguments.length||p(n)?r:n,n=p(n)?n:function(){};for(var a,o=this._private.cy,s=t=d(t)?this.filter(t):t,l=[],u=[],c={},h={},f={},v=0,y=this.byGroup(),b=y.nodes,x=y.edges,w=0;w<s.length;w++){var E=s[w],k=E.id();E.isNode()&&(l.unshift(E),e.bfs&&(f[k]=!0,u.push(E)),h[k]=0)}var C=function(){var t=e.bfs?l.shift():l.pop(),i=t.id();if(e.dfs){if(f[i])return"continue";f[i]=!0,u.push(t)}var o,s=h[i],d=c[i],p=null!=d?d.source():null,g=null!=d?d.target():null,y=null==d?void 0:t.same(p)?g[0]:p[0];if(!0===(o=n(t,d,y,v++,s)))return a=t,"break";if(!1===o)return"break";for(var m=t.connectedEdges().filter(function(e){return(!r||e.source().same(t))&&x.has(e)}),w=0;w<m.length;w++){var E=m[w],k=E.connectedNodes().filter(function(e){return!e.same(t)&&b.has(e)}),C=k.id();0===k.length||f[C]||(k=k[0],l.push(k),e.bfs&&(f[C]=!0,u.push(k)),c[C]=E,h[C]=h[i]+1)}};e:for(;0!==l.length;){switch(C()){case"continue":continue;case"break":break e}}for(var S=o.collection(),D=0;D<u.length;D++){var T=u[D],P=c[T.id()];null!=P&&S.merge(P),S.merge(T)}return{path:o.collection(S),found:o.collection(a)}}},Oe={breadthFirstSearch:Le({bfs:!0}),depthFirstSearch:Le({dfs:!0})};Oe.bfs=Oe.breadthFirstSearch,Oe.dfs=Oe.depthFirstSearch;var Re=function(e,t){return e(t={exports:{}},t.exports),t.exports}(function(e,t){(function(){var t,n,r,i,a,o,s,l,u,c,h,d,p,f,g;r=Math.floor,c=Math.min,n=function(e,t){return e<t?-1:e>t?1:0},u=function(e,t,i,a,o){var s;if(null==i&&(i=0),null==o&&(o=n),i<0)throw new Error("lo must be non-negative");for(null==a&&(a=e.length);i<a;)o(t,e[s=r((i+a)/2)])<0?a=s:i=s+1;return[].splice.apply(e,[i,i-i].concat(t)),t},o=function(e,t,r){return null==r&&(r=n),e.push(t),f(e,0,e.length-1,r)},a=function(e,t){var r,i;return null==t&&(t=n),r=e.pop(),e.length?(i=e[0],e[0]=r,g(e,0,t)):i=r,i},l=function(e,t,r){var i;return null==r&&(r=n),i=e[0],e[0]=t,g(e,0,r),i},s=function(e,t,r){var i;return null==r&&(r=n),e.length&&r(e[0],t)<0&&(t=(i=[e[0],t])[0],e[0]=i[1],g(e,0,r)),t},i=function(e,t){var i,a,o,s,l,u;for(null==t&&(t=n),l=[],a=0,o=(s=function(){u=[];for(var t=0,n=r(e.length/2);0<=n?t<n:t>n;0<=n?t++:t--)u.push(t);return u}.apply(this).reverse()).length;a<o;a++)i=s[a],l.push(g(e,i,t));return l},p=function(e,t,r){var i;if(null==r&&(r=n),-1!==(i=e.indexOf(t)))return f(e,0,i,r),g(e,i,r)},h=function(e,t,r){var a,o,l,u,c;if(null==r&&(r=n),!(o=e.slice(0,t)).length)return o;for(i(o,r),l=0,u=(c=e.slice(t)).length;l<u;l++)a=c[l],s(o,a,r);return o.sort(r).reverse()},d=function(e,t,r){var o,s,l,h,d,p,f,g,v;if(null==r&&(r=n),10*t<=e.length){if(!(l=e.slice(0,t).sort(r)).length)return l;for(s=l[l.length-1],h=0,p=(f=e.slice(t)).length;h<p;h++)r(o=f[h],s)<0&&(u(l,o,0,null,r),l.pop(),s=l[l.length-1]);return l}for(i(e,r),v=[],d=0,g=c(t,e.length);0<=g?d<g:d>g;0<=g?++d:--d)v.push(a(e,r));return v},f=function(e,t,r,i){var a,o,s;for(null==i&&(i=n),a=e[r];r>t&&i(a,o=e[s=r-1>>1])<0;)e[r]=o,r=s;return e[r]=a},g=function(e,t,r){var i,a,o,s,l;for(null==r&&(r=n),a=e.length,l=t,o=e[t],i=2*t+1;i<a;)(s=i+1)<a&&!(r(e[i],e[s])<0)&&(i=s),e[t]=e[i],i=2*(t=i)+1;return e[t]=o,f(e,l,t,r)},t=function(){function e(e){this.cmp=null!=e?e:n,this.nodes=[]}return e.push=o,e.pop=a,e.replace=l,e.pushpop=s,e.heapify=i,e.updateItem=p,e.nlargest=h,e.nsmallest=d,e.prototype.push=function(e){return o(this.nodes,e,this.cmp)},e.prototype.pop=function(){return a(this.nodes,this.cmp)},e.prototype.peek=function(){return this.nodes[0]},e.prototype.contains=function(e){return-1!==this.nodes.indexOf(e)},e.prototype.replace=function(e){return l(this.nodes,e,this.cmp)},e.prototype.pushpop=function(e){return s(this.nodes,e,this.cmp)},e.prototype.heapify=function(){return i(this.nodes,this.cmp)},e.prototype.updateItem=function(e){return p(this.nodes,e,this.cmp)},e.prototype.clear=function(){return this.nodes=[]},e.prototype.empty=function(){return 0===this.nodes.length},e.prototype.size=function(){return this.nodes.length},e.prototype.clone=function(){var t;return(t=new e).nodes=this.nodes.slice(0),t},e.prototype.toArray=function(){return this.nodes.slice(0)},e.prototype.insert=e.prototype.push,e.prototype.top=e.prototype.peek,e.prototype.front=e.prototype.peek,e.prototype.has=e.prototype.contains,e.prototype.copy=e.prototype.clone,e}(),e.exports=t}).call(R)}),Fe=Te({root:null,weight:function(e){return 1},directed:!1}),Ve={dijkstra:function(e){if(!g(e)){var t=arguments;e={root:t[0],weight:t[1],directed:t[2]}}var n=Fe(e),r=n.root,i=n.weight,a=n.directed,o=this,s=i,l=d(r)?this.filter(r)[0]:r[0],u={},c={},h={},p=this.byGroup(),f=p.nodes,v=p.edges;v.unmergeBy(function(e){return e.isLoop()});for(var y=function(e){return u[e.id()]},m=function(e,t){u[e.id()]=t,b.updateItem(e)},b=new Re(function(e,t){return y(e)-y(t)}),x=0;x<f.length;x++){var w=f[x];u[w.id()]=w.same(l)?0:1/0,b.push(w)}for(var E=function(e,t){for(var n,r=(a?e.edgesTo(t):e.edgesWith(t)).intersect(v),i=1/0,o=0;o<r.length;o++){var l=r[o],u=s(l);(u<i||!n)&&(i=u,n=l)}return{edge:n,dist:i}};b.size()>0;){var k=b.pop(),C=y(k),S=k.id();if(h[S]=C,C!==1/0)for(var D=k.neighborhood().intersect(f),T=0;T<D.length;T++){var P=D[T],M=P.id(),_=E(k,P),B=C+_.dist;B<y(P)&&(m(P,B),c[M]={node:k,edge:_.edge})}}return{distanceTo:function(e){var t=d(e)?f.filter(e)[0]:e[0];return h[t.id()]},pathTo:function(e){var t=d(e)?f.filter(e)[0]:e[0],n=[],r=t,i=r.id();if(t.length>0)for(n.unshift(t);c[i];){var a=c[i];n.unshift(a.edge),n.unshift(a.node),i=(r=a.node).id()}return o.spawn(n)}}}},qe={kruskal:function(e){e=e||function(e){return 1};for(var t=this.byGroup(),n=t.nodes,r=t.edges,i=n.length,a=new Array(i),o=n,s=function(e){for(var t=0;t<a.length;t++){if(a[t].has(e))return t}},l=0;l<i;l++)a[l]=this.spawn(n[l]);for(var u=r.sort(function(t,n){return e(t)-e(n)}),c=0;c<u.length;c++){var h=u[c],d=h.source()[0],p=h.target()[0],f=s(d),g=s(p),v=a[f],y=a[g];f!==g&&(o.merge(h),v.merge(y),a.splice(g,1))}return o}},Ye=Te({root:null,goal:null,weight:function(e){return 1},heuristic:function(e){return 0},directed:!1}),Xe={aStar:function(e){var t=this.cy(),n=Ye(e),r=n.root,i=n.goal,a=n.heuristic,o=n.directed,s=n.weight;r=t.collection(r)[0],i=t.collection(i)[0];var l,u,c=r.id(),h=i.id(),d={},p={},f={},g=new Re(function(e,t){return p[e.id()]-p[t.id()]}),v=new Ae,y={},m={},b=function(e,t){g.push(e),v.add(t)};b(r,c),d[c]=0,p[c]=a(r);for(var x,w=0;g.size()>0;){if(l=g.pop(),u=l.id(),v.delete(u),w++,u===h){for(var E=[],k=i,C=h,S=m[C];E.unshift(k),null!=S&&E.unshift(S),null!=(k=y[C]);)S=m[C=k.id()];return{found:!0,distance:d[u],path:this.spawn(E),steps:w}}f[u]=!0;for(var D=l._private.edges,T=0;T<D.length;T++){var P=D[T];if(this.hasElementWithId(P.id())&&(!o||P.data("source")===u)){var M=P.source(),_=P.target(),B=M.id()!==u?M:_,N=B.id();if(this.hasElementWithId(N)&&!f[N]){var I=d[u]+s(P);x=N,v.has(x)?I<d[N]&&(d[N]=I,p[N]=I+a(B),y[N]=l):(d[N]=I,p[N]=I+a(B),b(B,N),y[N]=l,m[N]=P)}}}}return{found:!1,distance:void 0,path:void 0,steps:w}}},je=Te({weight:function(e){return 1},directed:!1}),We={floydWarshall:function(e){for(var t=this.cy(),n=je(e),r=n.weight,i=n.directed,a=r,o=this.byGroup(),s=o.nodes,l=o.edges,u=s.length,c=u*u,h=function(e){return s.indexOf(e)},p=function(e){return s[e]},f=new Array(c),g=0;g<c;g++){var v=g%u,y=(g-v)/u;f[g]=y===v?0:1/0}for(var m=new Array(c),b=new Array(c),x=0;x<l.length;x++){var w=l[x],E=w.source()[0],k=w.target()[0];if(E!==k){var C=h(E),S=h(k),D=C*u+S,T=a(w);if(f[D]>T&&(f[D]=T,m[D]=S,b[D]=w),!i){var P=S*u+C;!i&&f[P]>T&&(f[P]=T,m[P]=C,b[P]=w)}}}for(var M=0;M<u;M++)for(var _=0;_<u;_++)for(var B=_*u+M,N=0;N<u;N++){var I=_*u+N,A=M*u+N;f[B]+f[A]<f[I]&&(f[I]=f[B]+f[A],m[I]=m[B])}var z=function(e){return h(function(e){return(d(e)?t.filter(e):e)[0]}(e))};return{distance:function(e,t){var n=z(e),r=z(t);return f[n*u+r]},path:function(e,n){var r=z(e),i=z(n),a=p(r);if(r===i)return a.collection();if(null==m[r*u+i])return t.collection();var o,s=t.collection(),l=r;for(s.merge(a);r!==i;)l=r,r=m[r*u+i],o=b[l*u+r],s.merge(o),s.merge(p(r));return s}}}},He=Te({weight:function(e){return 1},directed:!1,root:null}),Ke={bellmanFord:function(e){var t=this,n=He(e),r=n.weight,i=n.directed,a=n.root,o=r,s=this,l=this.cy(),u=this.byGroup(),c=u.edges,h=u.nodes,p=h.length,f=new Ne,g=!1;a=l.collection(a)[0],c.unmergeBy(function(e){return e.isLoop()});for(var v=c.length,y=function(e){var t=f.get(e.id());return t||(t={},f.set(e.id(),t)),t},m=function(e){return(d(e)?l.$(e):e)[0]},b=0;b<p;b++){var x=h[b],w=y(x);x.same(a)?w.dist=0:w.dist=1/0,w.pred=null,w.edge=null}for(var E=!1,k=function(e,t,n,r,i,a){var o=r.dist+a;o<i.dist&&!n.same(r.edge)&&(i.dist=o,i.pred=e,i.edge=n,E=!0)},C=1;C<p;C++){E=!1;for(var S=0;S<v;S++){var D=c[S],T=D.source(),P=D.target(),M=o(D),_=y(T),B=y(P);k(T,0,D,_,B,M),i||k(P,0,D,B,_,M)}if(!E)break}if(E)for(var N=0;N<v;N++){var I=c[N],A=I.source(),z=I.target(),L=o(I),O=y(A).dist,R=y(z).dist;if(O+L<R||!i&&R+L<O){Ee("Graph contains a negative weight cycle for Bellman-Ford"),g=!0;break}}return{distanceTo:function(e){return y(m(e)).dist},pathTo:function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,r=[],i=m(e);;){if(null==i)return t.spawn();var o=y(i),l=o.edge,u=o.pred;if(r.unshift(i[0]),i.same(n)&&r.length>0)break;null!=l&&r.unshift(l),i=u}return s.spawn(r)},hasNegativeWeightCycle:g,negativeWeightCycles:[]}}},Ge=Math.sqrt(2),Ze=function(e,t,n){0===n.length&&we("Karger-Stein must be run on a connected (sub)graph");for(var r=n[e],i=r[1],a=r[2],o=t[i],s=t[a],l=n,u=l.length-1;u>=0;u--){var c=l[u],h=c[1],d=c[2];(t[h]===o&&t[d]===s||t[h]===s&&t[d]===o)&&l.splice(u,1)}for(var p=0;p<l.length;p++){var f=l[p];f[1]===s?(l[p]=f.slice(),l[p][1]=o):f[2]===s&&(l[p]=f.slice(),l[p][2]=o)}for(var g=0;g<t.length;g++)t[g]===s&&(t[g]=o);return l},Ue=function(e,t,n,r){for(;n>r;){var i=Math.floor(Math.random()*t.length);t=Ze(i,e,t),n--}return t},$e={kargerStein:function(){var e=this.byGroup(),t=e.nodes,n=e.edges;n.unmergeBy(function(e){return e.isLoop()});var r=t.length,i=n.length,a=Math.ceil(Math.pow(Math.log(r)/Math.LN2,2)),o=Math.floor(r/Ge);if(!(r<2)){for(var s=[],l=0;l<i;l++){var u=n[l];s.push([l,t.indexOf(u.source()),t.indexOf(u.target())])}for(var c=1/0,h=[],d=new Array(r),p=new Array(r),f=new Array(r),g=function(e,t){for(var n=0;n<r;n++)t[n]=e[n]},v=0;v<=a;v++){for(var y=0;y<r;y++)p[y]=y;var m=Ue(p,s.slice(),r,o),b=m.slice();g(p,f);var x=Ue(p,m,o,2),w=Ue(f,b,o,2);x.length<=w.length&&x.length<c?(c=x.length,h=x,g(p,d)):w.length<=x.length&&w.length<c&&(c=w.length,h=w,g(f,d))}for(var E=this.spawn(h.map(function(e){return n[e[0]]})),k=this.spawn(),C=this.spawn(),S=d[0],D=0;D<d.length;D++){var T=d[D],P=t[D];T===S?k.merge(P):C.merge(P)}return{cut:E,partition1:k,partition2:C}}we("At least 2 nodes are required for Karger-Stein algorithm")}},Qe=function(e,t,n){return{x:e.x*t+n.x,y:e.y*t+n.y}},Je=function(e,t,n){return{x:(e.x-n.x)/t,y:(e.y-n.y)/t}},et=function(e){return{x:e[0],y:e[1]}},tt=function(e,t){return Math.atan2(t,e)-Math.PI/2},nt=Math.log2||function(e){return Math.log(e)/Math.log(2)},rt=function(e,t){return Math.sqrt(it(e,t))},it=function(e,t){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r},at=function(e){for(var t=e.length,n=0,r=0;r<t;r++)n+=e[r];for(var i=0;i<t;i++)e[i]=e[i]/n;return e},ot=function(e,t,n,r){return(1-r)*(1-r)*e+2*(1-r)*r*t+r*r*n},st=function(e,t,n,r){return{x:ot(e.x,t.x,n.x,r),y:ot(e.y,t.y,n.y,r)}},lt=function(e,t,n){return Math.max(e,Math.min(n,t))},ut=function(e){if(null==e)return{x1:1/0,y1:1/0,x2:-1/0,y2:-1/0,w:0,h:0};if(null!=e.x1&&null!=e.y1){if(null!=e.x2&&null!=e.y2&&e.x2>=e.x1&&e.y2>=e.y1)return{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,w:e.x2-e.x1,h:e.y2-e.y1};if(null!=e.w&&null!=e.h&&e.w>=0&&e.h>=0)return{x1:e.x1,y1:e.y1,x2:e.x1+e.w,y2:e.y1+e.h,w:e.w,h:e.h}}},ct=function(e,t,n){e.x1=Math.min(e.x1,t),e.x2=Math.max(e.x2,t),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,n),e.y2=Math.max(e.y2,n),e.h=e.y2-e.y1},ht=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.x1-=t,e.x2+=t,e.y1-=t,e.y2+=t,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},dt=function(e,t){e.x1=t.x1,e.y1=t.y1,e.x2=t.x2,e.y2=t.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1},pt=function(e,t){e.x1+=t.x,e.x2+=t.x,e.y1+=t.y,e.y2+=t.y},ft=function(e,t){return!(e.x1>t.x2)&&(!(t.x1>e.x2)&&(!(e.x2<t.x1)&&(!(t.x2<e.x1)&&(!(e.y2<t.y1)&&(!(t.y2<e.y1)&&(!(e.y1>t.y2)&&!(t.y1>e.y2)))))))},gt=function(e,t,n){return e.x1<=t&&t<=e.x2&&e.y1<=n&&n<=e.y2},vt=function(e,t){return gt(e,t.x1,t.y1)&&gt(e,t.x2,t.y2)},yt=function(e,t,n,r,i,a,o){var s,l=zt(i,a),u=i/2,c=a/2,h=r-c-o;if((s=Mt(e,t,n,r,n-u+l-o,h,n+u-l+o,h,!1)).length>0)return s;var d=n+u+o;if((s=Mt(e,t,n,r,d,r-c+l-o,d,r+c-l+o,!1)).length>0)return s;var p=r+c+o;if((s=Mt(e,t,n,r,n-u+l-o,p,n+u-l+o,p,!1)).length>0)return s;var f,g=n-u-o;if((s=Mt(e,t,n,r,g,r-c+l-o,g,r+c-l+o,!1)).length>0)return s;var v=n-u+l,y=r-c+l;if((f=Tt(e,t,n,r,v,y,l+o)).length>0&&f[0]<=v&&f[1]<=y)return[f[0],f[1]];var m=n+u-l,b=r-c+l;if((f=Tt(e,t,n,r,m,b,l+o)).length>0&&f[0]>=m&&f[1]<=b)return[f[0],f[1]];var x=n+u-l,w=r+c-l;if((f=Tt(e,t,n,r,x,w,l+o)).length>0&&f[0]>=x&&f[1]>=w)return[f[0],f[1]];var E=n-u+l,k=r+c-l;return(f=Tt(e,t,n,r,E,k,l+o)).length>0&&f[0]<=E&&f[1]>=k?[f[0],f[1]]:[]},mt=function(e,t,n,r,i,a,o){var s=o,l=Math.min(n,i),u=Math.max(n,i),c=Math.min(r,a),h=Math.max(r,a);return l-s<=e&&e<=u+s&&c-s<=t&&t<=h+s},bt=function(e,t,n,r,i,a,o,s,l){var u=Math.min(n,o,i)-l,c=Math.max(n,o,i)+l,h=Math.min(r,s,a)-l,d=Math.max(r,s,a)+l;return!(e<u||e>c||t<h||t>d)},xt=function(e,t,n,r,i,a,o,s){var l=[];!function(e,t,n,r,i){var a,o,s,l,u,c,h,d;s=-27*(r/=e)+(t/=e)*(9*(n/=e)-t*t*2),a=(o=(3*n-t*t)/9)*o*o+(s/=54)*s,i[1]=0,h=t/3,a>0?(u=(u=s+Math.sqrt(a))<0?-Math.pow(-u,1/3):Math.pow(u,1/3),c=(c=s-Math.sqrt(a))<0?-Math.pow(-c,1/3):Math.pow(c,1/3),i[0]=-h+u+c,h+=(u+c)/2,i[4]=i[2]=-h,h=Math.sqrt(3)*(-c+u)/2,i[3]=h,i[5]=-h):(i[5]=i[3]=0,0===a?(d=s<0?-Math.pow(-s,1/3):Math.pow(s,1/3),i[0]=2*d-h,i[4]=i[2]=-(d+h)):(l=(o=-o)*o*o,l=Math.acos(s/Math.sqrt(l)),d=2*Math.sqrt(o),i[0]=-h+d*Math.cos(l/3),i[2]=-h+d*Math.cos((l+2*Math.PI)/3),i[4]=-h+d*Math.cos((l+4*Math.PI)/3)))}(1*n*n-4*n*i+2*n*o+4*i*i-4*i*o+o*o+r*r-4*r*a+2*r*s+4*a*a-4*a*s+s*s,9*n*i-3*n*n-3*n*o-6*i*i+3*i*o+9*r*a-3*r*r-3*r*s-6*a*a+3*a*s,3*n*n-6*n*i+n*o-n*e+2*i*i+2*i*e-o*e+3*r*r-6*r*a+r*s-r*t+2*a*a+2*a*t-s*t,1*n*i-n*n+n*e-i*e+r*a-r*r+r*t-a*t,l);for(var u=[],c=0;c<6;c+=2)Math.abs(l[c+1])<1e-7&&l[c]>=0&&l[c]<=1&&u.push(l[c]);u.push(1),u.push(0);for(var h,d,p,f=-1,g=0;g<u.length;g++)h=Math.pow(1-u[g],2)*n+2*(1-u[g])*u[g]*i+u[g]*u[g]*o,d=Math.pow(1-u[g],2)*r+2*(1-u[g])*u[g]*a+u[g]*u[g]*s,p=Math.pow(h-e,2)+Math.pow(d-t,2),f>=0?p<f&&(f=p):f=p;return f},wt=function(e,t,n,r,i,a){var o=[e-n,t-r],s=[i-n,a-r],l=s[0]*s[0]+s[1]*s[1],u=o[0]*o[0]+o[1]*o[1],c=o[0]*s[0]+o[1]*s[1],h=c*c/l;return c<0?u:h>l?(e-i)*(e-i)+(t-a)*(t-a):u-h},Et=function(e,t,n){for(var r,i,a,o,s=0,l=0;l<n.length/2;l++)if(r=n[2*l],i=n[2*l+1],l+1<n.length/2?(a=n[2*(l+1)],o=n[2*(l+1)+1]):(a=n[2*(l+1-n.length/2)],o=n[2*(l+1-n.length/2)+1]),r==e&&a==e);else{if(!(r>=e&&e>=a||r<=e&&e<=a))continue;(e-r)/(a-r)*(o-i)+i>t&&s++}return s%2!=0},kt=function(e,t,n,r,i,a,o,s,l){var u,c=new Array(n.length);null!=s[0]?(u=Math.atan(s[1]/s[0]),s[0]<0?u+=Math.PI/2:u=-u-Math.PI/2):u=s;for(var h,d=Math.cos(-u),p=Math.sin(-u),f=0;f<c.length/2;f++)c[2*f]=a/2*(n[2*f]*d-n[2*f+1]*p),c[2*f+1]=o/2*(n[2*f+1]*d+n[2*f]*p),c[2*f]+=r,c[2*f+1]+=i;if(l>0){var g=St(c,-l);h=Ct(g)}else h=c;return Et(e,t,h)},Ct=function(e){for(var t,n,r,i,a,o,s,l,u=new Array(e.length/2),c=0;c<e.length/4;c++){t=e[4*c],n=e[4*c+1],r=e[4*c+2],i=e[4*c+3],c<e.length/4-1?(a=e[4*(c+1)],o=e[4*(c+1)+1],s=e[4*(c+1)+2],l=e[4*(c+1)+3]):(a=e[0],o=e[1],s=e[2],l=e[3]);var h=Mt(t,n,r,i,a,o,s,l,!0);u[2*c]=h[0],u[2*c+1]=h[1]}return u},St=function(e,t){for(var n,r,i,a,o=new Array(2*e.length),s=0;s<e.length/2;s++){n=e[2*s],r=e[2*s+1],s<e.length/2-1?(i=e[2*(s+1)],a=e[2*(s+1)+1]):(i=e[0],a=e[1]);var l=a-r,u=-(i-n),c=Math.sqrt(l*l+u*u),h=l/c,d=u/c;o[4*s]=n+h*t,o[4*s+1]=r+d*t,o[4*s+2]=i+h*t,o[4*s+3]=a+d*t}return o},Dt=function(e,t,n,r,i,a,o){return e-=i,t-=a,(e/=n/2+o)*e+(t/=r/2+o)*t<=1},Tt=function(e,t,n,r,i,a,o){var s=[n-e,r-t],l=[e-i,t-a],u=s[0]*s[0]+s[1]*s[1],c=2*(l[0]*s[0]+l[1]*s[1]),h=c*c-4*u*(l[0]*l[0]+l[1]*l[1]-o*o);if(h<0)return[];var d=(-c+Math.sqrt(h))/(2*u),p=(-c-Math.sqrt(h))/(2*u),f=Math.min(d,p),g=Math.max(d,p),v=[];if(f>=0&&f<=1&&v.push(f),g>=0&&g<=1&&v.push(g),0===v.length)return[];var y=v[0]*s[0]+e,m=v[0]*s[1]+t;return v.length>1?v[0]==v[1]?[y,m]:[y,m,v[1]*s[0]+e,v[1]*s[1]+t]:[y,m]},Pt=function(e,t,n){return t<=e&&e<=n||n<=e&&e<=t?e:e<=t&&t<=n||n<=t&&t<=e?t:n},Mt=function(e,t,n,r,i,a,o,s,l){var u=e-i,c=n-e,h=o-i,d=t-a,p=r-t,f=s-a,g=h*d-f*u,v=c*d-p*u,y=f*c-h*p;if(0!==y){var m=g/y,b=v/y;return-.001<=m&&m<=1.001&&-.001<=b&&b<=1.001?[e+m*c,t+m*p]:l?[e+m*c,t+m*p]:[]}return 0===g||0===v?Pt(e,n,o)===o?[o,s]:Pt(e,n,i)===i?[i,a]:Pt(i,o,n)===n?[n,r]:[]:[]},_t=function(e,t,n,r,i,a,o,s){var l,u,c,h,d,p,f=[],g=new Array(n.length),v=!0;if(null==a&&(v=!1),v){for(var y=0;y<g.length/2;y++)g[2*y]=n[2*y]*a+r,g[2*y+1]=n[2*y+1]*o+i;if(s>0){var m=St(g,-s);u=Ct(m)}else u=g}else u=n;for(var b=0;b<u.length/2;b++)c=u[2*b],h=u[2*b+1],b<u.length/2-1?(d=u[2*(b+1)],p=u[2*(b+1)+1]):(d=u[0],p=u[1]),0!==(l=Mt(e,t,r,i,c,h,d,p)).length&&f.push(l[0],l[1]);return f},Bt=function(e,t,n){var r=[e[0]-t[0],e[1]-t[1]],i=Math.sqrt(r[0]*r[0]+r[1]*r[1]),a=(i-n)/i;return a<0&&(a=1e-5),[t[0]+a*r[0],t[1]+a*r[1]]},Nt=function(e,t){var n=At(e,t);return n=It(n)},It=function(e){for(var t,n,r=e.length/2,i=1/0,a=1/0,o=-1/0,s=-1/0,l=0;l<r;l++)t=e[2*l],n=e[2*l+1],i=Math.min(i,t),o=Math.max(o,t),a=Math.min(a,n),s=Math.max(s,n);for(var u=2/(o-i),c=2/(s-a),h=0;h<r;h++)t=e[2*h]=e[2*h]*u,n=e[2*h+1]=e[2*h+1]*c,i=Math.min(i,t),o=Math.max(o,t),a=Math.min(a,n),s=Math.max(s,n);if(a<-1)for(var d=0;d<r;d++)n=e[2*d+1]=e[2*d+1]+(-1-a);return e},At=function(e,t){var n=1/e*2*Math.PI,r=e%2==0?Math.PI/2+n/2:Math.PI/2;r+=t;for(var i,a=new Array(2*e),o=0;o<e;o++)i=o*n+r,a[2*o]=Math.cos(i),a[2*o+1]=Math.sin(-i);return a},zt=function(e,t){return Math.min(e/4,t/4,8)},Lt=function(e,t){return{heightOffset:Math.min(15,.05*t),widthOffset:Math.min(100,.25*e),ctrlPtOffsetPct:.05}},Ot=Te({dampingFactor:.8,precision:1e-6,iterations:200,weight:function(e){return 1}}),Rt={pageRank:function(e){for(var t=Ot(e),n=t.dampingFactor,r=t.precision,i=t.iterations,a=t.weight,o=this._private.cy,s=this.byGroup(),l=s.nodes,u=s.edges,c=l.length,h=c*c,d=u.length,p=new Array(h),f=new Array(c),g=(1-n)/c,v=0;v<c;v++){for(var y=0;y<c;y++){p[v*c+y]=0}f[v]=0}for(var m=0;m<d;m++){var b=u[m],x=b.data("source"),w=b.data("target");if(x!==w){var E=l.indexOfId(x),k=l.indexOfId(w),C=a(b);p[k*c+E]+=C,f[E]+=C}}for(var S=1/c+g,D=0;D<c;D++)if(0===f[D])for(var T=0;T<c;T++){p[T*c+D]=S}else for(var P=0;P<c;P++){var M=P*c+D;p[M]=p[M]/f[D]+g}for(var _,B=new Array(c),N=new Array(c),I=0;I<c;I++)B[I]=1;for(var A=0;A<i;A++){for(var z=0;z<c;z++)N[z]=0;for(var L=0;L<c;L++)for(var O=0;O<c;O++){var R=L*c+O;N[L]+=p[R]*B[O]}at(N),_=B,B=N,N=_;for(var F=0,V=0;V<c;V++){var q=_[V]-B[V];F+=q*q}if(F<r)break}return{rank:function(e){return e=o.collection(e)[0],B[l.indexOf(e)]}}}},Ft=Te({root:null,weight:function(e){return 1},directed:!1,alpha:0}),Vt={degreeCentralityNormalized:function(e){e=Ft(e);var t=this.cy(),n=this.nodes(),r=n.length;if(e.directed){for(var i={},a={},o=0,s=0,l=0;l<r;l++){var u=n[l],c=u.id();e.root=u;var h=this.degreeCentrality(e);o<h.indegree&&(o=h.indegree),s<h.outdegree&&(s=h.outdegree),i[c]=h.indegree,a[c]=h.outdegree}return{indegree:function(e){return 0==o?0:(d(e)&&(e=t.filter(e)),i[e.id()]/o)},outdegree:function(e){return 0===s?0:(d(e)&&(e=t.filter(e)),a[e.id()]/s)}}}for(var p={},f=0,g=0;g<r;g++){var v=n[g];e.root=v;var y=this.degreeCentrality(e);f<y.degree&&(f=y.degree),p[v.id()]=y.degree}return{degree:function(e){return 0===f?0:(d(e)&&(e=t.filter(e)),p[e.id()]/f)}}},degreeCentrality:function(e){e=Ft(e);var t=this.cy(),n=this,r=e,i=r.root,a=r.weight,o=r.directed,s=r.alpha;if(i=t.collection(i)[0],o){for(var l=i.connectedEdges(),u=l.filter(function(e){return e.target().same(i)&&n.has(e)}),c=l.filter(function(e){return e.source().same(i)&&n.has(e)}),h=u.length,d=c.length,p=0,f=0,g=0;g<u.length;g++)p+=a(u[g]);for(var v=0;v<c.length;v++)f+=a(c[v]);return{indegree:Math.pow(h,1-s)*Math.pow(p,s),outdegree:Math.pow(d,1-s)*Math.pow(f,s)}}for(var y=i.connectedEdges().intersection(n),m=y.length,b=0,x=0;x<y.length;x++)b+=a(y[x]);return{degree:Math.pow(m,1-s)*Math.pow(b,s)}}};Vt.dc=Vt.degreeCentrality,Vt.dcn=Vt.degreeCentralityNormalised=Vt.degreeCentralityNormalized;var qt=Te({harmonic:!0,weight:function(){return 1},directed:!1,root:null}),Yt={closenessCentralityNormalized:function(e){for(var t=qt(e),n=t.harmonic,r=t.weight,i=t.directed,a=this.cy(),o={},s=0,l=this.nodes(),u=this.floydWarshall({weight:r,directed:i}),c=0;c<l.length;c++){for(var h=0,p=l[c],f=0;f<l.length;f++)if(c!==f){var g=u.distance(p,l[f]);h+=n?1/g:g}n||(h=1/h),s<h&&(s=h),o[p.id()]=h}return{closeness:function(e){return 0==s?0:(e=d(e)?a.filter(e)[0].id():e.id(),o[e]/s)}}},closenessCentrality:function(e){var t=qt(e),n=t.root,r=t.weight,i=t.directed,a=t.harmonic;n=this.filter(n)[0];for(var o=this.dijkstra({root:n,weight:r,directed:i}),s=0,l=this.nodes(),u=0;u<l.length;u++){var c=l[u];if(!c.same(n)){var h=o.distanceTo(c);s+=a?1/h:h}}return a?s:1/s}};Yt.cc=Yt.closenessCentrality,Yt.ccn=Yt.closenessCentralityNormalised=Yt.closenessCentralityNormalized;var Xt=Te({weight:null,directed:!1}),jt={betweennessCentrality:function(e){for(var t=Xt(e),n=t.directed,r=t.weight,i=null!=r,a=this.cy(),o=this.nodes(),s={},l={},u=0,c=function(e,t){l[e]=t,t>u&&(u=t)},h=function(e){return l[e]},d=0;d<o.length;d++){var p=o[d],f=p.id();s[f]=n?p.outgoers().nodes():p.openNeighborhood().nodes(),c(f,0)}for(var g=function(e){for(var t=o[e].id(),n=[],l={},u={},d={},p=new Re(function(e,t){return d[e]-d[t]}),f=0;f<o.length;f++){var g=o[f].id();l[g]=[],u[g]=0,d[g]=1/0}for(u[t]=1,d[t]=0,p.push(t);!p.empty();){var v=p.pop();if(n.push(v),i)for(var y=0;y<s[v].length;y++){var m=s[v][y],b=a.getElementById(v),x=void 0;x=b.edgesTo(m).length>0?b.edgesTo(m)[0]:m.edgesTo(b)[0];var w=r(x);m=m.id(),d[m]>d[v]+w&&(d[m]=d[v]+w,p.nodes.indexOf(m)<0?p.push(m):p.updateItem(m),u[m]=0,l[m]=[]),d[m]==d[v]+w&&(u[m]=u[m]+u[v],l[m].push(v))}else for(var E=0;E<s[v].length;E++){var k=s[v][E].id();d[k]==1/0&&(p.push(k),d[k]=d[v]+1),d[k]==d[v]+1&&(u[k]=u[k]+u[v],l[k].push(v))}}for(var C={},S=0;S<o.length;S++)C[o[S].id()]=0;for(;n.length>0;)for(var D=n.pop(),T=0;T<l[D].length;T++){var P=l[D][T];C[P]=C[P]+u[P]/u[D]*(1+C[D]),D!=o[e].id()&&c(D,h(D)+C[D])}},v=0;v<o.length;v++)g(v);var y={betweenness:function(e){var t=a.collection(e).id();return h(t)},betweennessNormalized:function(e){if(0==u)return 0;var t=a.collection(e).id();return h(t)/u}};return y.betweennessNormalised=y.betweennessNormalized,y}};jt.bc=jt.betweennessCentrality;var Wt=Te({expandFactor:2,inflateFactor:2,multFactor:1,maxIterations:20,attributes:[function(e){return 1}]}),Ht=function(e,t){for(var n=0,r=0;r<t.length;r++)n+=t[r](e);return n},Kt=function(e,t){for(var n,r=0;r<t;r++){n=0;for(var i=0;i<t;i++)n+=e[i*t+r];for(var a=0;a<t;a++)e[a*t+r]=e[a*t+r]/n}},Gt=function(e,t,n){for(var r=new Array(n*n),i=0;i<n;i++){for(var a=0;a<n;a++)r[i*n+a]=0;for(var o=0;o<n;o++)for(var s=0;s<n;s++)r[i*n+s]+=e[i*n+o]*t[o*n+s]}return r},Zt=function(e,t,n){for(var r=e.slice(0),i=1;i<n;i++)e=Gt(e,r,t);return e},Ut=function(e,t,n){for(var r=new Array(t*t),i=0;i<t*t;i++)r[i]=Math.pow(e[i],n);return Kt(r,t),r},$t=function(e,t,n,r){for(var i=0;i<n;i++){if(Math.round(e[i]*Math.pow(10,r))/Math.pow(10,r)!==Math.round(t[i]*Math.pow(10,r))/Math.pow(10,r))return!1}return!0},Qt=function(e,t){for(var n=0;n<e.length;n++)if(!t[n]||e[n].id()!==t[n].id())return!1;return!0},Jt=function(e){for(var t=this.nodes(),n=this.edges(),r=this.cy(),i=function(e){return Wt(e)}(e),a={},o=0;o<t.length;o++)a[t[o].id()]=o;for(var s,l=t.length,u=l*l,c=new Array(u),h=0;h<u;h++)c[h]=0;for(var d=0;d<n.length;d++){var p=n[d],f=a[p.source().id()],g=a[p.target().id()],v=Ht(p,i.attributes);c[f*l+g]+=v,c[g*l+f]+=v}!function(e,t,n){for(var r=0;r<t;r++)e[r*t+r]=n}(c,l,i.multFactor),Kt(c,l);for(var y=!0,m=0;y&&m<i.maxIterations;)y=!1,s=Zt(c,l,i.expandFactor),c=Ut(s,l,i.inflateFactor),$t(c,s,u,4)||(y=!0),m++;var b=function(e,t,n,r){for(var i=[],a=0;a<t;a++){for(var o=[],s=0;s<t;s++)Math.round(1e3*e[a*t+s])/1e3>0&&o.push(n[s]);0!==o.length&&i.push(r.collection(o))}return i}(c,l,t,r);return b=function(e){for(var t=0;t<e.length;t++)for(var n=0;n<e.length;n++)t!=n&&Qt(e[t],e[n])&&e.splice(n,1);return e}(b)},en={markovClustering:Jt,mcl:Jt},tn=function(e){return e},nn=function(e,t){return Math.abs(t-e)},rn=function(e,t,n){return e+nn(t,n)},an=function(e,t,n){return e+Math.pow(n-t,2)},on=function(e){return Math.sqrt(e)},sn=function(e,t,n){return Math.max(e,nn(t,n))},ln=function(e,t,n,r,i){for(var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:tn,o=r,s=0;s<e;s++)o=i(o,t(s),n(s));return a(o)},un={euclidean:function(e,t,n){return e>=2?ln(e,t,n,0,an,on):ln(e,t,n,0,rn)},squaredEuclidean:function(e,t,n){return ln(e,t,n,0,an)},manhattan:function(e,t,n){return ln(e,t,n,0,rn)},max:function(e,t,n){return ln(e,t,n,-1/0,sn)}};function cn(e,t,n,r,i,a){var o;return o=p(e)?e:un[e]||un.euclidean,0===t&&p(e)?o(i,a):o(t,n,r,i,a)}un["squared-euclidean"]=un.squaredEuclidean,un.squaredeuclidean=un.squaredEuclidean;var hn=Te({k:2,m:2,sensitivityThreshold:1e-4,distance:"euclidean",maxIterations:10,attributes:[],testMode:!1,testCentroids:null}),dn=function(e){return hn(e)},pn=function(e,t,n,r,i){var a="kMedoids"===i?function(e){return r[e](n)}:function(e){return n[e]};return cn(e,r.length,a,function(e){return r[e](t)})},fn=function(e,t,n){for(var r=n.length,i=new Array(r),a=new Array(r),o=new Array(t),s=null,l=0;l<r;l++)i[l]=e.min(n[l]).value,a[l]=e.max(n[l]).value;for(var u=0;u<t;u++){s=[];for(var c=0;c<r;c++)s[c]=Math.random()*(a[c]-i[c])+i[c];o[u]=s}return o},gn=function(e,t,n,r,i){for(var a=1/0,o=0,s=0;s<t.length;s++){var l=pn(n,e,t[s],r,i);l<a&&(a=l,o=s)}return o},vn=function(e,t,n){for(var r=[],i=null,a=0;a<t.length;a++)n[(i=t[a]).id()]===e&&r.push(i);return r},yn=function(e,t,n){for(var r=0;r<e.length;r++)for(var i=0;i<e[r].length;i++){if(Math.abs(e[r][i]-t[r][i])>n)return!1}return!0},mn=function(e,t,n){for(var r=0;r<n;r++)if(e===t[r])return!0;return!1},bn=function(e,t){var n=new Array(t);if(e.length<50)for(var r=0;r<t;r++){for(var i=e[Math.floor(Math.random()*e.length)];mn(i,n,r);)i=e[Math.floor(Math.random()*e.length)];n[r]=i}else for(var a=0;a<t;a++)n[a]=e[Math.floor(Math.random()*e.length)];return n},xn=function(e,t,n){for(var r=0,i=0;i<t.length;i++)r+=pn("manhattan",t[i],e,n,"kMedoids");return r},wn=function(e,t,n,r,i){for(var a,o,s=0;s<t.length;s++)for(var l=0;l<e.length;l++)r[s][l]=Math.pow(n[s][l],i.m);for(var u=0;u<e.length;u++)for(var c=0;c<i.attributes.length;c++){a=0,o=0;for(var h=0;h<t.length;h++)a+=r[h][u]*i.attributes[c](t[h]),o+=r[h][u];e[u][c]=a/o}},En=function(e,t,n,r,i){for(var a=0;a<e.length;a++)t[a]=e[a].slice();for(var o,s,l,u=2/(i.m-1),c=0;c<n.length;c++)for(var h=0;h<r.length;h++){o=0;for(var d=0;d<n.length;d++)s=pn(i.distance,r[h],n[c],i.attributes,"cmeans"),l=pn(i.distance,r[h],n[d],i.attributes,"cmeans"),o+=Math.pow(s/l,u);e[h][c]=1/o}},kn=function(e){var t,n,r,i,a=this.cy(),o=this.nodes(),s=dn(e);r=new Array(o.length);for(var l=0;l<o.length;l++)r[l]=new Array(s.k);n=new Array(o.length);for(var u=0;u<o.length;u++)n[u]=new Array(s.k);for(var c=0;c<o.length;c++){for(var h=0,d=0;d<s.k;d++)n[c][d]=Math.random(),h+=n[c][d];for(var p=0;p<s.k;p++)n[c][p]=n[c][p]/h}t=new Array(s.k);for(var f=0;f<s.k;f++)t[f]=new Array(s.attributes.length);i=new Array(o.length);for(var g=0;g<o.length;g++)i[g]=new Array(s.k);for(var v=!0,y=0;v&&y<s.maxIterations;)v=!1,wn(t,o,n,i,s),En(n,r,t,o,s),yn(n,r,s.sensitivityThreshold)||(v=!0),y++;return{clusters:function(e,t,n,r){for(var i,a,o=new Array(n.k),s=0;s<o.length;s++)o[s]=[];for(var l=0;l<t.length;l++){i=-1/0,a=-1;for(var u=0;u<t[0].length;u++)t[l][u]>i&&(i=t[l][u],a=u);o[a].push(e[l])}for(var c=0;c<o.length;c++)o[c]=r.collection(o[c]);return o}(o,n,s,a),degreeOfMembership:n}},Cn={kMeans:function(t){var n,r=this.cy(),i=this.nodes(),a=null,o=dn(t),s=new Array(o.k),l={};o.testMode?"number"==typeof o.testCentroids?(o.testCentroids,n=fn(i,o.k,o.attributes)):n="object"===e(o.testCentroids)?o.testCentroids:fn(i,o.k,o.attributes):n=fn(i,o.k,o.attributes);for(var u,c,h,d=!0,p=0;d&&p<o.maxIterations;){for(var f=0;f<i.length;f++)l[(a=i[f]).id()]=gn(a,n,o.distance,o.attributes,"kMeans");d=!1;for(var g=0;g<o.k;g++){var v=vn(g,i,l);if(0!==v.length){for(var y=o.attributes.length,m=n[g],b=new Array(y),x=new Array(y),w=0;w<y;w++){x[w]=0;for(var E=0;E<v.length;E++)a=v[E],x[w]+=o.attributes[w](a);b[w]=x[w]/v.length,u=b[w],c=m[w],h=o.sensitivityThreshold,Math.abs(c-u)<=h||(d=!0)}n[g]=b,s[g]=r.collection(v)}}p++}return s},kMedoids:function(t){var n,r,i=this.cy(),a=this.nodes(),o=null,s=dn(t),l=new Array(s.k),u={},c=new Array(s.k);s.testMode?"number"==typeof s.testCentroids||(n="object"===e(s.testCentroids)?s.testCentroids:bn(a,s.k)):n=bn(a,s.k);for(var h=!0,d=0;h&&d<s.maxIterations;){for(var p=0;p<a.length;p++)u[(o=a[p]).id()]=gn(o,n,s.distance,s.attributes,"kMedoids");h=!1;for(var f=0;f<n.length;f++){var g=vn(f,a,u);if(0!==g.length){c[f]=xn(n[f],g,s.attributes);for(var v=0;v<g.length;v++)(r=xn(g[v],g,s.attributes))<c[f]&&(c[f]=r,n[f]=g[v],h=!0);l[f]=i.collection(g)}}d++}return l},fuzzyCMeans:kn,fcm:kn},Sn=Te({distance:"euclidean",linkage:"min",mode:"threshold",threshold:1/0,addDendrogram:!1,dendrogramDepth:0,attributes:[]}),Dn={single:"min",complete:"max"},Tn=function(e,t,n,r,i){for(var a,o=0,s=1/0,l=i.attributes,u=function(e,t){return cn(i.distance,l.length,function(t){return l[t](e)},function(e){return l[e](t)})},c=0;c<e.length;c++){var h=e[c].key,d=n[h][r[h]];d<s&&(o=h,s=d)}if("threshold"===i.mode&&s>=i.threshold||"dendrogram"===i.mode&&1===e.length)return!1;var p,f=t[o],g=t[r[o]];p="dendrogram"===i.mode?{left:f,right:g,key:f.key}:{value:f.value.concat(g.value),key:f.key},e[f.index]=p,e.splice(g.index,1),t[f.key]=p;for(var v=0;v<e.length;v++){var y=e[v];f.key===y.key?a=1/0:"min"===i.linkage?(a=n[f.key][y.key],n[f.key][y.key]>n[g.key][y.key]&&(a=n[g.key][y.key])):"max"===i.linkage?(a=n[f.key][y.key],n[f.key][y.key]<n[g.key][y.key]&&(a=n[g.key][y.key])):a="mean"===i.linkage?(n[f.key][y.key]*f.size+n[g.key][y.key]*g.size)/(f.size+g.size):"dendrogram"===i.mode?u(y.value,f.value):u(y.value[0],f.value[0]),n[f.key][y.key]=n[y.key][f.key]=a}for(var m=0;m<e.length;m++){var b=e[m].key;if(r[b]===f.key||r[b]===g.key){for(var x=b,w=0;w<e.length;w++){var E=e[w].key;n[b][E]<n[b][x]&&(x=E)}r[b]=x}e[m].index=m}return f.key=g.key=f.index=g.index=null,!0},Pn=function e(t,n,r){t&&(t.value?n.push(t.value):(t.left&&e(t.left,n,r),t.right&&e(t.right,n,r)))},Mn=function(e){for(var t=this.cy(),n=this.nodes(),r=function(e){var t=Sn(e),n=Dn[t.linkage];return null!=n&&(t.linkage=n),t}(e),i=r.attributes,a=function(e,t){return cn(r.distance,i.length,function(t){return i[t](e)},function(e){return i[e](t)})},o=[],s=[],l=[],u=[],c=0;c<n.length;c++){var h={value:"dendrogram"===r.mode?n[c]:[n[c]],key:c,index:c};o[c]=h,u[c]=h,s[c]=[],l[c]=0}for(var d=0;d<o.length;d++)for(var p=0;p<=d;p++){var f=void 0;f="dendrogram"===r.mode?d===p?1/0:a(o[d].value,o[p].value):d===p?1/0:a(o[d].value[0],o[p].value[0]),s[d][p]=f,s[p][d]=f,f<s[d][l[d]]&&(l[d]=p)}for(var g,v=Tn(o,u,s,l,r);v;)v=Tn(o,u,s,l,r);return"dendrogram"===r.mode?(g=function e(t,n,r){if(!t)return[];var i=[],a=[],o=[];return 0===n?(t.left&&Pn(t.left,i,r),t.right&&Pn(t.right,a,r),o=i.concat(a),[r.collection(o)]):1===n?t.value?[r.collection(t.value)]:(t.left&&Pn(t.left,i,r),t.right&&Pn(t.right,a,r),[r.collection(i),r.collection(a)]):t.value?[r.collection(t.value)]:(t.left&&(i=e(t.left,n-1,r)),t.right&&(a=e(t.right,n-1,r)),i.concat(a))}(o[0],r.dendrogramDepth,t),r.addDendrogram&&function e(t,n){if(!t)return"";if(t.left&&t.right){var r=e(t.left,n),i=e(t.right,n),a=n.add({group:"nodes",data:{id:r+","+i}});return n.add({group:"edges",data:{source:r,target:a.id()}}),n.add({group:"edges",data:{source:i,target:a.id()}}),a.id()}return t.value?t.value.id():void 0}(o[0],t)):(g=new Array(o.length),o.forEach(function(e,n){e.key=e.index=null,g[n]=t.collection(e.value)})),g},_n={hierarchicalClustering:Mn,hca:Mn},Bn=Te({distance:"euclidean",preference:"median",damping:.8,maxIterations:1e3,minIterations:100,attributes:[]}),Nn=function(e,t,n,r){var i=function(e,t){return r[t](e)};return-cn(e,r.length,function(e){return i(t,e)},function(e){return i(n,e)},t,n)},In=function(e,t){return"median"===t?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];r?e=e.slice(t,n):(n<e.length&&e.splice(n,e.length-n),t>0&&e.splice(0,t));for(var o=0,s=e.length-1;s>=0;s--){var l=e[s];a?isFinite(l)||(e[s]=-1/0,o++):e.splice(s,1)}i&&e.sort(function(e,t){return e-t});var u=e.length,c=Math.floor(u/2);return u%2!=0?e[c+1+o]:(e[c-1+o]+e[c+o])/2}(e):"mean"===t?function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length,r=0,i=0,a=t;a<n;a++){var o=e[a];isFinite(o)&&(r+=o,i++)}return r/i}(e):"min"===t?function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length,r=1/0,i=t;i<n;i++){var a=e[i];isFinite(a)&&(r=Math.min(a,r))}return r}(e):"max"===t?function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length,r=-1/0,i=t;i<n;i++){var a=e[i];isFinite(a)&&(r=Math.max(a,r))}return r}(e):t},An=function(e,t,n){for(var r=[],i=0;i<e;i++){for(var a=-1,o=-1/0,s=0;s<n.length;s++){var l=n[s];t[i*e+l]>o&&(a=l,o=t[i*e+l])}a>0&&r.push(a)}for(var u=0;u<n.length;u++)r[n[u]]=n[u];return r},zn=function(e){for(var t,n,r,i,a,o,s=this.cy(),l=this.nodes(),u=function(e){var t=e.damping,n=e.preference;.5<=t&&t<1||we("Damping must range on [0.5, 1).  Got: ".concat(t));var r=["median","mean","min","max"];return r.some(function(e){return e===n})||v(n)||we("Preference must be one of [".concat(r.map(function(e){return"'".concat(e,"'")}).join(", "),"] or a number.  Got: ").concat(n)),Bn(e)}(e),c={},h=0;h<l.length;h++)c[l[h].id()]=h;n=(t=l.length)*t,r=new Array(n);for(var d=0;d<n;d++)r[d]=-1/0;for(var p=0;p<t;p++)for(var f=0;f<t;f++)p!==f&&(r[p*t+f]=Nn(u.distance,l[p],l[f],u.attributes));i=In(r,u.preference);for(var g=0;g<t;g++)r[g*t+g]=i;a=new Array(n);for(var y=0;y<n;y++)a[y]=0;o=new Array(n);for(var m=0;m<n;m++)o[m]=0;for(var b=new Array(t),x=new Array(t),w=new Array(t),E=0;E<t;E++)b[E]=0,x[E]=0,w[E]=0;for(var k,C=new Array(t*u.minIterations),S=0;S<C.length;S++)C[S]=0;for(k=0;k<u.maxIterations;k++){for(var D=0;D<t;D++){for(var T=-1/0,P=-1/0,M=-1,_=0,B=0;B<t;B++)b[B]=a[D*t+B],(_=o[D*t+B]+r[D*t+B])>=T?(P=T,T=_,M=B):_>P&&(P=_);for(var N=0;N<t;N++)a[D*t+N]=(1-u.damping)*(r[D*t+N]-T)+u.damping*b[N];a[D*t+M]=(1-u.damping)*(r[D*t+M]-P)+u.damping*b[M]}for(var I=0;I<t;I++){for(var A=0,z=0;z<t;z++)b[z]=o[z*t+I],x[z]=Math.max(0,a[z*t+I]),A+=x[z];A-=x[I],x[I]=a[I*t+I],A+=x[I];for(var L=0;L<t;L++)o[L*t+I]=(1-u.damping)*Math.min(0,A-x[L])+u.damping*b[L];o[I*t+I]=(1-u.damping)*(A-x[I])+u.damping*b[I]}for(var O=0,R=0;R<t;R++){var F=o[R*t+R]+a[R*t+R]>0?1:0;C[k%u.minIterations*t+R]=F,O+=F}if(O>0&&(k>=u.minIterations-1||k==u.maxIterations-1)){for(var V=0,q=0;q<t;q++){w[q]=0;for(var Y=0;Y<u.minIterations;Y++)w[q]+=C[Y*t+q];0!==w[q]&&w[q]!==u.minIterations||V++}if(V===t)break}}for(var X=function(e,t,n){for(var r=[],i=0;i<e;i++)t[i*e+i]+n[i*e+i]>0&&r.push(i);return r}(t,a,o),j=function(e,t,n){for(var r=An(e,t,n),i=0;i<n.length;i++){for(var a=[],o=0;o<r.length;o++)r[o]===n[i]&&a.push(o);for(var s=-1,l=-1/0,u=0;u<a.length;u++){for(var c=0,h=0;h<a.length;h++)c+=t[a[h]*e+a[u]];c>l&&(s=u,l=c)}n[i]=a[s]}return r=An(e,t,n)}(t,r,X),W={},H=0;H<X.length;H++)W[X[H]]=[];for(var K=0;K<l.length;K++){var G=j[c[l[K].id()]];null!=G&&W[G].push(l[K])}for(var Z=new Array(X.length),U=0;U<X.length;U++)Z[U]=s.collection(W[X[U]]);return Z},Ln={};[Oe,Ve,qe,Xe,We,Ke,$e,Rt,Vt,Yt,jt,en,Cn,_n,{affinityPropagation:zn,ap:zn}].forEach(function(e){I(Ln,e)});var On=function e(t){if(!(this instanceof e))return new e(t);this.id="Thenable/1.0.7",this.state=0,this.fulfillValue=void 0,this.rejectReason=void 0,this.onFulfilled=[],this.onRejected=[],this.proxy={then:this.then.bind(this)},"function"==typeof t&&t.call(this,this.fulfill.bind(this),this.reject.bind(this))};On.prototype={fulfill:function(e){return Rn(this,1,"fulfillValue",e)},reject:function(e){return Rn(this,2,"rejectReason",e)},then:function(e,t){var n=new On;return this.onFulfilled.push(qn(e,n,"fulfill")),this.onRejected.push(qn(t,n,"reject")),Fn(this),n.proxy}};var Rn=function(e,t,n,r){return 0===e.state&&(e.state=t,e[n]=r,Fn(e)),e},Fn=function(e){1===e.state?Vn(e,"onFulfilled",e.fulfillValue):2===e.state&&Vn(e,"onRejected",e.rejectReason)},Vn=function(e,t,n){if(0!==e[t].length){var r=e[t];e[t]=[];var i=function(){for(var e=0;e<r.length;e++)r[e](n)};"function"==typeof setImmediate?setImmediate(i):setTimeout(i,0)}},qn=function(e,t,n){return function(r){if("function"!=typeof e)t[n].call(t,r);else{var i;try{i=e(r)}catch(e){return void t.reject(e)}Yn(t,i)}}},Yn=function t(n,r){if(n!==r&&n.proxy!==r){var i;if("object"===e(r)&&null!==r||"function"==typeof r)try{i=r.then}catch(e){return void n.reject(e)}if("function"!=typeof i)n.fulfill(r);else{var a=!1;try{i.call(r,function(e){a||(a=!0,e===r?n.reject(new TypeError("circular thenable chain")):t(n,e))},function(e){a||(a=!0,n.reject(e))})}catch(e){a||n.reject(e)}}}else n.reject(new TypeError("cannot resolve promise with itself"))};On.all=function(e){return new On(function(t,n){for(var r=new Array(e.length),i=0,a=function(n,a){r[n]=a,++i===e.length&&t(r)},o=0;o<e.length;o++)!function(t){var r=e[t];null!=r&&null!=r.then?r.then(function(e){a(t,e)},function(e){n(e)}):a(t,r)}(o)})},On.resolve=function(e){return new On(function(t,n){t(e)})},On.reject=function(e){return new On(function(t,n){n(e)})};var Xn="undefined"!=typeof Promise?Promise:On,jn=function(e,t,n){var r=w(e),i=!r,a=this._private=I({duration:1e3},t,n);if(a.target=e,a.style=a.style||a.css,a.started=!1,a.playing=!1,a.hooked=!1,a.applying=!1,a.progress=0,a.completes=[],a.frames=[],a.complete&&p(a.complete)&&a.completes.push(a.complete),i){var o=e.position();a.startPosition=a.startPosition||{x:o.x,y:o.y},a.startStyle=a.startStyle||e.cy().style().getAnimationStartStyle(e,a.style)}if(r){var s=e.pan();a.startPan={x:s.x,y:s.y},a.startZoom=e.zoom()}this.length=1,this[0]=this},Wn=jn.prototype;I(Wn,{instanceString:function(){return"animation"},hook:function(){var e=this._private;if(!e.hooked){var t=e.target._private.animation;(e.queue?t.queue:t.current).push(this),m(e.target)&&e.target.cy().addToAnimationPool(e.target),e.hooked=!0}return this},play:function(){var e=this._private;return 1===e.progress&&(e.progress=0),e.playing=!0,e.started=!1,e.stopped=!1,this.hook(),this},playing:function(){return this._private.playing},apply:function(){var e=this._private;return e.applying=!0,e.started=!1,e.stopped=!1,this.hook(),this},applying:function(){return this._private.applying},pause:function(){var e=this._private;return e.playing=!1,e.started=!1,this},stop:function(){var e=this._private;return e.playing=!1,e.started=!1,e.stopped=!0,this},rewind:function(){return this.progress(0)},fastforward:function(){return this.progress(1)},time:function(e){var t=this._private;return void 0===e?t.progress*t.duration:this.progress(e/t.duration)},progress:function(e){var t=this._private,n=t.playing;return void 0===e?t.progress:(n&&this.pause(),t.progress=e,t.started=!1,n&&this.play(),this)},completed:function(){return 1===this._private.progress},reverse:function(){var e=this._private,t=e.playing;t&&this.pause(),e.progress=1-e.progress,e.started=!1;var n=function(t,n){var r=e[t];null!=r&&(e[t]=e[n],e[n]=r)};if(n("zoom","startZoom"),n("pan","startPan"),n("position","startPosition"),e.style)for(var r=0;r<e.style.length;r++){var i=e.style[r],a=i.name,o=e.startStyle[a];e.startStyle[a]=i,e.style[r]=o}return t&&this.play(),this},promise:function(e){var t,n=this._private;switch(e){case"frame":t=n.frames;break;default:case"complete":case"completed":t=n.completes}return new Xn(function(e,n){t.push(function(){e()})})}}),Wn.complete=Wn.completed,Wn.run=Wn.play,Wn.running=Wn.playing;var Hn={};[{animated:function(){return function(){var e=void 0!==this.length?this:[this];if(!(this._private.cy||this).styleEnabled())return!1;var t=e[0];return t?t._private.animation.current.length>0:void 0}},clearQueue:function(){return function(){var e=void 0!==this.length?this:[this];if(!(this._private.cy||this).styleEnabled())return this;for(var t=0;t<e.length;t++){e[t]._private.animation.queue=[]}return this}},delay:function(){return function(e,t){return(this._private.cy||this).styleEnabled()?this.animate({delay:e,duration:e,complete:t}):this}},delayAnimation:function(){return function(e,t){return(this._private.cy||this).styleEnabled()?this.animation({delay:e,duration:e,complete:t}):this}},animation:function(){return function(e,t){var n=void 0!==this.length,r=n?this:[this],i=this._private.cy||this,a=!n,o=!a;if(!i.styleEnabled())return this;var s=i.style();if(e=I({},e,t),0===Object.keys(e).length)return new jn(r[0],e);switch(void 0===e.duration&&(e.duration=400),e.duration){case"slow":e.duration=600;break;case"fast":e.duration=200}if(o&&(e.style=s.getPropsList(e.style||e.css),e.css=void 0),o&&null!=e.renderedPosition){var l=e.renderedPosition,u=i.pan(),c=i.zoom();e.position=Je(l,c,u)}if(a&&null!=e.panBy){var h=e.panBy,d=i.pan();e.pan={x:d.x+h.x,y:d.y+h.y}}var p=e.center||e.centre;if(a&&null!=p){var f=i.getCenterPan(p.eles,e.zoom);null!=f&&(e.pan=f)}if(a&&null!=e.fit){var v=e.fit,y=i.getFitViewport(v.eles||v.boundingBox,v.padding);null!=y&&(e.pan=y.pan,e.zoom=y.zoom)}if(a&&g(e.zoom)){var m=i.getZoomedViewport(e.zoom);null!=m&&(m.zoomed&&(e.zoom=m.zoom),m.panned&&(e.pan=m.pan))}return new jn(r[0],e)}},animate:function(){return function(e,t){var n=void 0!==this.length?this:[this];if(!(this._private.cy||this).styleEnabled())return this;t&&(e=I({},e,t));for(var r=0;r<n.length;r++){var i=n[r],a=i.animated()&&(void 0===e.queue||e.queue);i.animation(e,a?{queue:!0}:void 0).play()}return this}},stop:function(){return function(e,t){var n=void 0!==this.length?this:[this],r=this._private.cy||this;if(!r.styleEnabled())return this;for(var i=0;i<n.length;i++){for(var a=n[i]._private,o=a.animation.current,s=0;s<o.length;s++){var l=o[s]._private;t&&(l.duration=0)}e&&(a.animation.queue=[]),t||(a.animation.current=[])}return r.notify("draw"),this}}},{data:function(e){return e=I({},{field:"data",bindingEvent:"data",allowBinding:!1,allowSetting:!1,allowGetting:!1,settingEvent:"data",settingTriggersEvent:!1,triggerFnName:"trigger",immutableKeys:{},updateStyle:!1,beforeGet:function(e){},beforeSet:function(e,t){},onSet:function(e){},canSet:function(e){return!0}},e),function(t,n){var r=e,i=void 0!==this.length,a=i?this:[this],o=i?this[0]:this;if(d(t)){var s;if(r.allowGetting&&void 0===n)return o&&(r.beforeGet(o),s=o._private[r.field][t]),s;if(r.allowSetting&&void 0!==n&&!r.immutableKeys[t]){var l=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},t,n);r.beforeSet(this,l);for(var u=0,c=a.length;u<c;u++){var h=a[u];r.canSet(h)&&(h._private[r.field][t]=n)}r.updateStyle&&this.updateStyle(),r.onSet(this),r.settingTriggersEvent&&this[r.triggerFnName](r.settingEvent)}}else if(r.allowSetting&&g(t)){var f,v,y=t,m=Object.keys(y);r.beforeSet(this,y);for(var b=0;b<m.length;b++){if(v=y[f=m[b]],!r.immutableKeys[f])for(var x=0;x<a.length;x++){var w=a[x];r.canSet(w)&&(w._private[r.field][f]=v)}}r.updateStyle&&this.updateStyle(),r.onSet(this),r.settingTriggersEvent&&this[r.triggerFnName](r.settingEvent)}else if(r.allowBinding&&p(t)){var E=t;this.on(r.bindingEvent,E)}else if(r.allowGetting&&void 0===t){var k;return o&&(r.beforeGet(o),k=o._private[r.field]),k}return this}},removeData:function(e){return e=I({},{field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!1,immutableKeys:{}},e),function(t){var n=e,r=void 0!==this.length?this:[this];if(d(t)){for(var i=t.split(/\s+/),a=i.length,o=0;o<a;o++){var s=i[o];if(!k(s))if(!n.immutableKeys[s])for(var l=0,u=r.length;l<u;l++)r[l]._private[n.field][s]=void 0}n.triggerEvent&&this[n.triggerFnName](n.event)}else if(void 0===t){for(var c=0,h=r.length;c<h;c++)for(var p=r[c]._private[n.field],f=Object.keys(p),g=0;g<f.length;g++){var v=f[g];!n.immutableKeys[v]&&(p[v]=void 0)}n.triggerEvent&&this[n.triggerFnName](n.event)}return this}}},{eventAliasesOn:function(e){var t=e;t.addListener=t.listen=t.bind=t.on,t.unlisten=t.unbind=t.off=t.removeListener,t.trigger=t.emit,t.pon=t.promiseOn=function(e,t){var n=this,r=Array.prototype.slice.call(arguments,0);return new Xn(function(e,t){var i=r.concat([function(t){n.off.apply(n,a),e(t)}]),a=i.concat([]);n.on.apply(n,i)})}}}].forEach(function(e){I(Hn,e)});var Kn={animate:Hn.animate(),animation:Hn.animation(),animated:Hn.animated(),clearQueue:Hn.clearQueue(),delay:Hn.delay(),delayAnimation:Hn.delayAnimation(),stop:Hn.stop()},Gn={classes:function(e){f(e)||(e=(e||"").match(/\S+/g)||[]);for(var t=[],n=new Ae(e),r=0;r<this.length;r++){for(var i=this[r],a=i._private,o=a.classes,s=!1,l=0;l<e.length;l++){var u=e[l];if(!o.has(u)){s=!0;break}}s||(s=o.size!==e.length),s&&(a.classes=n,t.push(i))}return t.length>0&&this.spawn(t).updateStyle().emit("class"),this},addClass:function(e){return this.toggleClass(e,!0)},hasClass:function(e){var t=this[0];return null!=t&&t._private.classes.has(e)},toggleClass:function(e,t){f(e)||(e=e.match(/\S+/g)||[]);for(var n=void 0===t,r=[],i=0,a=this.length;i<a;i++)for(var o=this[i],s=o._private.classes,l=!1,u=0;u<e.length;u++){var c=e[u],h=s.has(c),d=!1;t||n&&!h?(s.add(c),d=!0):(!t||n&&h)&&(s.delete(c),d=!0),!l&&d&&(r.push(o),l=!0)}return r.length>0&&this.spawn(r).updateStyle().emit("class"),this},removeClass:function(e){return this.toggleClass(e,!1)},flashClass:function(e,t){var n=this;if(null==t)t=250;else if(0===t)return n;return n.addClass(e),setTimeout(function(){n.removeClass(e)},t),n}},Zn={metaChar:"[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",comparatorOp:"=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",boolOp:"\\?|\\!|\\^",string:'"(?:\\\\"|[^"])*"|'+"'(?:\\\\'|[^'])*'",number:B,meta:"degree|indegree|outdegree",separator:"\\s*,\\s*",descendant:"\\s+",child:"\\s+>\\s+",subject:"\\$",group:"node|edge|\\*",directedEdge:"\\s+->\\s+",undirectedEdge:"\\s+<->\\s+"};Zn.variable="(?:[\\w-]|(?:\\\\"+Zn.metaChar+"))+",Zn.value=Zn.string+"|"+Zn.number,Zn.className=Zn.variable,Zn.id=Zn.variable,function(){var e,t,n;for(e=Zn.comparatorOp.split("|"),n=0;n<e.length;n++)t=e[n],Zn.comparatorOp+="|@"+t;for(e=Zn.comparatorOp.split("|"),n=0;n<e.length;n++)(t=e[n]).indexOf("!")>=0||"="!==t&&(Zn.comparatorOp+="|\\!"+t)}();var Un=0,$n=1,Qn=2,Jn=3,er=4,tr=5,nr=6,rr=7,ir=8,ar=9,or=10,sr=11,lr=12,ur=13,cr=14,hr=15,dr=16,pr=17,fr=18,gr=19,vr=20,yr=[{selector:":selected",matches:function(e){return e.selected()}},{selector:":unselected",matches:function(e){return!e.selected()}},{selector:":selectable",matches:function(e){return e.selectable()}},{selector:":unselectable",matches:function(e){return!e.selectable()}},{selector:":locked",matches:function(e){return e.locked()}},{selector:":unlocked",matches:function(e){return!e.locked()}},{selector:":visible",matches:function(e){return e.visible()}},{selector:":hidden",matches:function(e){return!e.visible()}},{selector:":transparent",matches:function(e){return e.transparent()}},{selector:":grabbed",matches:function(e){return e.grabbed()}},{selector:":free",matches:function(e){return!e.grabbed()}},{selector:":removed",matches:function(e){return e.removed()}},{selector:":inside",matches:function(e){return!e.removed()}},{selector:":grabbable",matches:function(e){return e.grabbable()}},{selector:":ungrabbable",matches:function(e){return!e.grabbable()}},{selector:":animated",matches:function(e){return e.animated()}},{selector:":unanimated",matches:function(e){return!e.animated()}},{selector:":parent",matches:function(e){return e.isParent()}},{selector:":childless",matches:function(e){return e.isChildless()}},{selector:":child",matches:function(e){return e.isChild()}},{selector:":orphan",matches:function(e){return e.isOrphan()}},{selector:":nonorphan",matches:function(e){return e.isChild()}},{selector:":compound",matches:function(e){return e.isNode()?e.isParent():e.source().isParent()||e.target().isParent()}},{selector:":loop",matches:function(e){return e.isLoop()}},{selector:":simple",matches:function(e){return e.isSimple()}},{selector:":active",matches:function(e){return e.active()}},{selector:":inactive",matches:function(e){return!e.active()}},{selector:":backgrounding",matches:function(e){return e.backgrounding()}},{selector:":nonbackgrounding",matches:function(e){return!e.backgrounding()}}].sort(function(e,t){return function(e,t){return-1*N(e,t)}(e.selector,t.selector)}),mr=function(){for(var e,t={},n=0;n<yr.length;n++)t[(e=yr[n]).selector]=e.matches;return t}(),br="("+yr.map(function(e){return e.selector}).join("|")+")",xr=function(e){return e.replace(new RegExp("\\\\("+Zn.metaChar+")","g"),function(e,t){return t})},wr=function(e,t,n){e[e.length-1]=n},Er=[{name:"group",query:!0,regex:"("+Zn.group+")",populate:function(e,t,n){var r=i(n,1)[0];t.checks.push({type:Un,value:"*"===r?r:r+"s"})}},{name:"state",query:!0,regex:br,populate:function(e,t,n){var r=i(n,1)[0];t.checks.push({type:rr,value:r})}},{name:"id",query:!0,regex:"\\#("+Zn.id+")",populate:function(e,t,n){var r=i(n,1)[0];t.checks.push({type:ir,value:xr(r)})}},{name:"className",query:!0,regex:"\\.("+Zn.className+")",populate:function(e,t,n){var r=i(n,1)[0];t.checks.push({type:ar,value:xr(r)})}},{name:"dataExists",query:!0,regex:"\\[\\s*("+Zn.variable+")\\s*\\]",populate:function(e,t,n){var r=i(n,1)[0];t.checks.push({type:er,field:xr(r)})}},{name:"dataCompare",query:!0,regex:"\\[\\s*("+Zn.variable+")\\s*("+Zn.comparatorOp+")\\s*("+Zn.value+")\\s*\\]",populate:function(e,t,n){var r=i(n,3),a=r[0],o=r[1],s=r[2];s=null!=new RegExp("^"+Zn.string+"$").exec(s)?s.substring(1,s.length-1):parseFloat(s),t.checks.push({type:Jn,field:xr(a),operator:o,value:s})}},{name:"dataBool",query:!0,regex:"\\[\\s*("+Zn.boolOp+")\\s*("+Zn.variable+")\\s*\\]",populate:function(e,t,n){var r=i(n,2),a=r[0],o=r[1];t.checks.push({type:tr,field:xr(o),operator:a})}},{name:"metaCompare",query:!0,regex:"\\[\\[\\s*("+Zn.meta+")\\s*("+Zn.comparatorOp+")\\s*("+Zn.number+")\\s*\\]\\]",populate:function(e,t,n){var r=i(n,3),a=r[0],o=r[1],s=r[2];t.checks.push({type:nr,field:xr(a),operator:o,value:parseFloat(s)})}},{name:"nextQuery",separator:!0,regex:Zn.separator,populate:function(e,t){var n=e.currentSubject,r=e.edgeCount,i=e.compoundCount,a=e[e.length-1];return null!=n&&(a.subject=n,e.currentSubject=null),a.edgeCount=r,a.compoundCount=i,e.edgeCount=0,e.compoundCount=0,e[e.length++]={checks:[]}}},{name:"directedEdge",separator:!0,regex:Zn.directedEdge,populate:function(e,t){if(null==e.currentSubject){var n={checks:[]},r=t,i={checks:[]};return n.checks.push({type:sr,source:r,target:i}),wr(e,0,n),e.edgeCount++,i}var a={checks:[]},o=t,s={checks:[]};return a.checks.push({type:lr,source:o,target:s}),wr(e,0,a),e.edgeCount++,s}},{name:"undirectedEdge",separator:!0,regex:Zn.undirectedEdge,populate:function(e,t){if(null==e.currentSubject){var n={checks:[]},r=t,i={checks:[]};return n.checks.push({type:or,nodes:[r,i]}),wr(e,0,n),e.edgeCount++,i}var a={checks:[]},o=t,s={checks:[]};return a.checks.push({type:cr,node:o,neighbor:s}),wr(e,0,a),s}},{name:"child",separator:!0,regex:Zn.child,populate:function(e,t){if(null==e.currentSubject){var n={checks:[]},r={checks:[]},i=e[e.length-1];return n.checks.push({type:hr,parent:i,child:r}),wr(e,0,n),e.compoundCount++,r}if(e.currentSubject===t){var a={checks:[]},o=e[e.length-1],s={checks:[]},l={checks:[]},u={checks:[]},c={checks:[]};return a.checks.push({type:gr,left:o,right:s,subject:l}),l.checks=t.checks,t.checks=[{type:vr}],c.checks.push({type:vr}),s.checks.push({type:pr,parent:c,child:u}),wr(e,0,a),e.currentSubject=l,e.compoundCount++,u}var h={checks:[]},d={checks:[]},p=[{type:pr,parent:h,child:d}];return h.checks=t.checks,t.checks=p,e.compoundCount++,d}},{name:"descendant",separator:!0,regex:Zn.descendant,populate:function(e,t){if(null==e.currentSubject){var n={checks:[]},r={checks:[]},i=e[e.length-1];return n.checks.push({type:dr,ancestor:i,descendant:r}),wr(e,0,n),e.compoundCount++,r}if(e.currentSubject===t){var a={checks:[]},o=e[e.length-1],s={checks:[]},l={checks:[]},u={checks:[]},c={checks:[]};return a.checks.push({type:gr,left:o,right:s,subject:l}),l.checks=t.checks,t.checks=[{type:vr}],c.checks.push({type:vr}),s.checks.push({type:fr,ancestor:c,descendant:u}),wr(e,0,a),e.currentSubject=l,e.compoundCount++,u}var h={checks:[]},d={checks:[]},p=[{type:fr,ancestor:h,descendant:d}];return h.checks=t.checks,t.checks=p,e.compoundCount++,d}},{name:"subject",modifier:!0,regex:Zn.subject,populate:function(e,t){if(null!=e.currentSubject&&e.currentSubject!==t)return Ee("Redefinition of subject in selector `"+e.toString()+"`"),!1;e.currentSubject=t;var n=e[e.length-1].checks[0],r=null==n?null:n.type;r===sr?n.type=ur:r===or&&(n.type=cr,n.node=n.nodes[1],n.neighbor=n.nodes[0],n.nodes=null)}}];Er.forEach(function(e){return e.regexObj=new RegExp("^"+e.regex)});var kr=function(e){for(var t,n,r,i=0;i<Er.length;i++){var a=Er[i],o=a.name,s=e.match(a.regexObj);if(null!=s){n=s,t=a,r=o;var l=s[0];e=e.substring(l.length);break}}return{expr:t,match:n,name:r,remaining:e}},Cr={parse:function(e){var t=this.inputText=e,n=this[0]={checks:[]};for(this.length=1,t=function(e){var t=e.match(/^\s+/);if(t){var n=t[0];e=e.substring(n.length)}return e}(t);;){var r=kr(t);if(null==r.expr)return Ee("The selector `"+e+"`is invalid"),!1;var i=r.match.slice(1),a=r.expr.populate(this,n,i);if(!1===a)return!1;if(null!=a&&(n=a),(t=r.remaining).match(/^\s*$/))break}var o=this[this.length-1];null!=this.currentSubject&&(o.subject=this.currentSubject),o.edgeCount=this.edgeCount,o.compoundCount=this.compoundCount;for(var s=0;s<this.length;s++){var l=this[s];if(l.compoundCount>0&&l.edgeCount>0)return Ee("The selector `"+e+"` is invalid because it uses both a compound selector and an edge selector"),!1;if(l.edgeCount>1)return Ee("The selector `"+e+"` is invalid because it uses multiple edge selectors"),!1;1===l.edgeCount&&Ee("The selector `"+e+"` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.")}return!0},toString:function(){if(null!=this.toStringCache)return this.toStringCache;for(var e=function(e){return null==e?"":e},t=function(t){return d(t)?'"'+t+'"':e(t)},n=function(e){return" "+e+" "},r=function(r,a){var o=r.type,s=r.value;switch(o){case Un:var l=e(s);return l.substring(0,l.length-1);case Jn:var u=r.field,c=r.operator;return"["+u+n(e(c))+t(s)+"]";case tr:var h=r.operator,d=r.field;return"["+e(h)+d+"]";case er:return"["+r.field+"]";case nr:var p=r.operator;return"[["+r.field+n(e(p))+t(s)+"]]";case rr:return s;case ir:return"#"+s;case ar:return"."+s;case pr:case hr:return i(r.parent,a)+n(">")+i(r.child,a);case fr:case dr:return i(r.ancestor,a)+" "+i(r.descendant,a);case gr:var f=i(r.left,a),g=i(r.subject,a),v=i(r.right,a);return f+(f.length>0?" ":"")+g+v;case vr:return""}},i=function(e,t){return e.checks.reduce(function(n,i,a){return n+(t===e&&0===a?"$":"")+r(i,t)},"")},a="",o=0;o<this.length;o++){var s=this[o];a+=i(s,s.subject),this.length>1&&o<this.length-1&&(a+=", ")}return this.toStringCache=a,a}},Sr=function(e,t,n){var r,i,a,o=d(e),s=v(e),l=d(n),u=!1,c=!1,h=!1;switch(t.indexOf("!")>=0&&(t=t.replace("!",""),c=!0),t.indexOf("@")>=0&&(t=t.replace("@",""),u=!0),(o||l||u)&&(i=o||s?""+e:"",a=""+n),u&&(e=i=i.toLowerCase(),n=a=a.toLowerCase()),t){case"*=":r=i.indexOf(a)>=0;break;case"$=":r=i.indexOf(a,i.length-a.length)>=0;break;case"^=":r=0===i.indexOf(a);break;case"=":r=e===n;break;case">":h=!0,r=e>n;break;case">=":h=!0,r=e>=n;break;case"<":h=!0,r=e<n;break;case"<=":h=!0,r=e<=n;break;default:r=!1}return!c||null==e&&h||(r=!r),r},Dr=function(e,t){return e.data(t)},Tr=[],Pr=function(e,t){return e.checks.every(function(e){return Tr[e.type](e,t)})};Tr[Un]=function(e,t){var n=e.value;return"*"===n||n===t.group()},Tr[rr]=function(e,t){return function(e,t){return mr[e](t)}(e.value,t)},Tr[ir]=function(e,t){var n=e.value;return t.id()===n},Tr[ar]=function(e,t){var n=e.value;return t.hasClass(n)},Tr[nr]=function(e,t){var n=e.field,r=e.operator,i=e.value;return Sr(function(e,t){return e[t]()}(t,n),r,i)},Tr[Jn]=function(e,t){var n=e.field,r=e.operator,i=e.value;return Sr(Dr(t,n),r,i)},Tr[tr]=function(e,t){var n=e.field,r=e.operator;return function(e,t){switch(t){case"?":return!!e;case"!":return!e;case"^":return void 0===e}}(Dr(t,n),r)},Tr[er]=function(e,t){var n=e.field;e.operator;return void 0!==Dr(t,n)},Tr[or]=function(e,t){var n=e.nodes[0],r=e.nodes[1],i=t.source(),a=t.target();return Pr(n,i)&&Pr(r,a)||Pr(r,i)&&Pr(n,a)},Tr[cr]=function(e,t){return Pr(e.node,t)&&t.neighborhood().some(function(t){return t.isNode()&&Pr(e.neighbor,t)})},Tr[sr]=function(e,t){return Pr(e.source,t.source())&&Pr(e.target,t.target())},Tr[lr]=function(e,t){return Pr(e.source,t)&&t.outgoers().some(function(t){return t.isNode()&&Pr(e.target,t)})},Tr[ur]=function(e,t){return Pr(e.target,t)&&t.incomers().some(function(t){return t.isNode()&&Pr(e.source,t)})},Tr[hr]=function(e,t){return Pr(e.child,t)&&Pr(e.parent,t.parent())},Tr[pr]=function(e,t){return Pr(e.parent,t)&&t.children().some(function(t){return Pr(e.child,t)})},Tr[dr]=function(e,t){return Pr(e.descendant,t)&&t.ancestors().some(function(t){return Pr(e.ancestor,t)})},Tr[fr]=function(e,t){return Pr(e.ancestor,t)&&t.descendants().some(function(t){return Pr(e.descendant,t)})},Tr[gr]=function(e,t){return Pr(e.subject,t)&&Pr(e.left,t)&&Pr(e.right,t)},Tr[vr]=function(){return!0},Tr[$n]=function(e,t){return e.value.has(t)},Tr[Qn]=function(e,t){return(0,e.value)(t)};var Mr=function(e){this.inputText=e,this.currentSubject=null,this.compoundCount=0,this.edgeCount=0,this.length=0,null==e||d(e)&&e.match(/^\s*$/)||(m(e)?this.addQuery({checks:[{type:$n,value:e.collection()}]}):p(e)?this.addQuery({checks:[{type:Qn,value:e}]}):d(e)?this.parse(e)||(this.invalid=!0):we("A selector must be created from a string; found ",e))},_r=Mr.prototype;[Cr,{matches:function(e){for(var t=0;t<this.length;t++){var n=this[t];if(Pr(n,e))return!0}return!1},filter:function(e){var t=this;if(1===t.length&&1===t[0].checks.length&&t[0].checks[0].type===ir)return e.getElementById(t[0].checks[0].value).collection();var n=function(e){for(var n=0;n<t.length;n++){var r=t[n];if(Pr(r,e))return!0}return!1};return null==t.text()&&(n=function(){return!0}),e.filter(n)}}].forEach(function(e){return I(_r,e)}),_r.text=function(){return this.inputText},_r.size=function(){return this.length},_r.eq=function(e){return this[e]},_r.sameText=function(e){return!this.invalid&&!e.invalid&&this.text()===e.text()},_r.addQuery=function(e){this[this.length++]=e},_r.selector=_r.toString;var Br={allAre:function(e){var t=new Mr(e);return this.every(function(e){return t.matches(e)})},is:function(e){var t=new Mr(e);return this.some(function(e){return t.matches(e)})},some:function(e,t){for(var n=0;n<this.length;n++){if(t?e.apply(t,[this[n],n,this]):e(this[n],n,this))return!0}return!1},every:function(e,t){for(var n=0;n<this.length;n++){if(!(t?e.apply(t,[this[n],n,this]):e(this[n],n,this)))return!1}return!0},same:function(e){if(this===e)return!0;e=this.cy().collection(e);var t=this.length;return t===e.length&&(1===t?this[0]===e[0]:this.every(function(t){return e.hasElementWithId(t.id())}))},anySame:function(e){return e=this.cy().collection(e),this.some(function(t){return e.hasElementWithId(t.id())})},allAreNeighbors:function(e){e=this.cy().collection(e);var t=this.neighborhood();return e.every(function(e){return t.hasElementWithId(e.id())})},contains:function(e){e=this.cy().collection(e);var t=this;return e.every(function(e){return t.hasElementWithId(e.id())})}};Br.allAreNeighbours=Br.allAreNeighbors,Br.has=Br.contains,Br.equal=Br.equals=Br.same;var Nr,Ir,Ar=function(e,t){return function(n,r,i,a){var o,s=n;if(null==s?o="":m(s)&&1===s.length&&(o=s.id()),1===this.length&&o){var l=this[0]._private,u=l.traversalCache=l.traversalCache||{},c=u[t]=u[t]||[],h=he(o),d=c[h];return d||(c[h]=e.call(this,n,r,i,a))}return e.call(this,n,r,i,a)}},zr={parent:function(e){var t=[];if(1===this.length){var n=this[0]._private.parent;if(n)return n}for(var r=0;r<this.length;r++){var i=this[r]._private.parent;i&&t.push(i)}return this.spawn(t,{unique:!0}).filter(e)},parents:function(e){for(var t=[],n=this.parent();n.nonempty();){for(var r=0;r<n.length;r++){var i=n[r];t.push(i)}n=n.parent()}return this.spawn(t,{unique:!0}).filter(e)},commonAncestors:function(e){for(var t,n=0;n<this.length;n++){var r=this[n].parents();t=(t=t||r).intersect(r)}return t.filter(e)},orphans:function(e){return this.stdFilter(function(e){return e.isOrphan()}).filter(e)},nonorphans:function(e){return this.stdFilter(function(e){return e.isChild()}).filter(e)},children:Ar(function(e){for(var t=[],n=0;n<this.length;n++)for(var r=this[n]._private.children,i=0;i<r.length;i++)t.push(r[i]);return this.spawn(t,{unique:!0}).filter(e)},"children"),siblings:function(e){return this.parent().children().not(this).filter(e)},isParent:function(){var e=this[0];if(e)return e.isNode()&&0!==e._private.children.length},isChildless:function(){var e=this[0];if(e)return e.isNode()&&0===e._private.children.length},isChild:function(){var e=this[0];if(e)return e.isNode()&&null!=e._private.parent},isOrphan:function(){var e=this[0];if(e)return e.isNode()&&null==e._private.parent},descendants:function(e){var t=[];return function e(n){for(var r=0;r<n.length;r++){var i=n[r];t.push(i),i.children().nonempty()&&e(i.children())}}(this.children()),this.spawn(t,{unique:!0}).filter(e)}};function Lr(e,t,n,r){for(var i=[],a=new Ae,o=e.cy().hasCompoundNodes(),s=0;s<e.length;s++){var l=e[s];n?i.push(l):o&&r(i,a,l)}for(;i.length>0;){var u=i.shift();t(u),a.add(u.id()),o&&r(i,a,u)}return e}function Or(e,t,n){if(n.isParent())for(var r=n._private.children,i=0;i<r.length;i++){var a=r[i];t.has(a.id())||e.push(a)}}function Rr(e,t,n){if(n.isChild()){var r=n._private.parent;t.has(r.id())||e.push(r)}}function Fr(e,t,n){Rr(e,t,n),Or(e,t,n)}zr.forEachDown=function(e){return Lr(this,e,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],Or)},zr.forEachUp=function(e){return Lr(this,e,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],Rr)},zr.forEachUpAndDown=function(e){return Lr(this,e,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],Fr)},zr.ancestors=zr.parents,(Nr=Ir={data:Hn.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),removeData:Hn.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),scratch:Hn.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:Hn.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),rscratch:Hn.data({field:"rscratch",allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!0}),removeRscratch:Hn.removeData({field:"rscratch",triggerEvent:!1}),id:function(){var e=this[0];if(e)return e._private.data.id}}).attr=Nr.data,Nr.removeAttr=Nr.removeData;var Vr,qr,Yr=Ir,Xr={};function jr(e){return function(t){if(void 0===t&&(t=!0),0!==this.length&&this.isNode()&&!this.removed()){for(var n=0,r=this[0],i=r._private.edges,a=0;a<i.length;a++){var o=i[a];!t&&o.isLoop()||(n+=e(r,o))}return n}}}function Wr(e,t){return function(n){for(var r,i=this.nodes(),a=0;a<i.length;a++){var o=i[a][e](n);void 0===o||void 0!==r&&!t(o,r)||(r=o)}return r}}I(Xr,{degree:jr(function(e,t){return t.source().same(t.target())?2:1}),indegree:jr(function(e,t){return t.target().same(e)?1:0}),outdegree:jr(function(e,t){return t.source().same(e)?1:0})}),I(Xr,{minDegree:Wr("degree",function(e,t){return e<t}),maxDegree:Wr("degree",function(e,t){return e>t}),minIndegree:Wr("indegree",function(e,t){return e<t}),maxIndegree:Wr("indegree",function(e,t){return e>t}),minOutdegree:Wr("outdegree",function(e,t){return e<t}),maxOutdegree:Wr("outdegree",function(e,t){return e>t})}),I(Xr,{totalDegree:function(e){for(var t=0,n=this.nodes(),r=0;r<n.length;r++)t+=n[r].degree(e);return t}});var Hr=function(e,t,n){for(var r=0;r<e.length;r++){var i=e[r];if(!i.locked()){var a=i._private.position,o={x:null!=t.x?t.x-a.x:0,y:null!=t.y?t.y-a.y:0};!i.isParent()||0===o.x&&0===o.y||i.children().shift(o,n),i.shiftCachedBoundingBox(o)}}},Kr={field:"position",bindingEvent:"position",allowBinding:!0,allowSetting:!0,settingEvent:"position",settingTriggersEvent:!0,triggerFnName:"emitAndNotify",allowGetting:!0,validKeys:["x","y"],beforeGet:function(e){e.updateCompoundBounds()},beforeSet:function(e,t){Hr(e,t,!1)},onSet:function(e){e.dirtyCompoundBoundsCache()},canSet:function(e){return!e.locked()}};(Vr=qr={position:Hn.data(Kr),silentPosition:Hn.data(I({},Kr,{allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!1,beforeSet:function(e,t){Hr(e,t,!0)}})),positions:function(e,t){if(g(e))t?this.silentPosition(e):this.position(e);else if(p(e)){var n=e,r=this.cy();r.startBatch();for(var i=0;i<this.length;i++){var a,o=this[i];(a=n(o,i))&&(t?o.silentPosition(a):o.position(a))}r.endBatch()}return this},silentPositions:function(e){return this.positions(e,!0)},shift:function(e,t,n){var r;if(g(e)?(r=e,n=t):d(e)&&v(t)&&((r={x:0,y:0})[e]=t),null!=r){var i=this.cy();i.startBatch();for(var a=0;a<this.length;a++){var o=this[a],s=o.position(),l={x:s.x+r.x,y:s.y+r.y};n?o.silentPosition(l):o.position(l)}i.endBatch()}return this},silentShift:function(e,t){return g(e)?this.shift(e,!0):d(e)&&v(t)&&this.shift(e,t,!0),this},renderedPosition:function(e,t){var n=this[0],r=this.cy(),i=r.zoom(),a=r.pan(),o=g(e)?e:void 0,s=void 0!==o||void 0!==t&&d(e);if(n&&n.isNode()){if(!s){var l=n.position();return o=Qe(l,i,a),void 0===e?o:o[e]}for(var u=0;u<this.length;u++){var c=this[u];void 0!==t?c.position(e,(t-a[e])/i):void 0!==o&&c.position(Je(o,i,a))}}else if(!s)return;return this},relativePosition:function(e,t){var n=this[0],r=this.cy(),i=g(e)?e:void 0,a=void 0!==i||void 0!==t&&d(e),o=r.hasCompoundNodes();if(n&&n.isNode()){if(!a){var s=n.position(),l=o?n.parent():null,u=l&&l.length>0,c=u;u&&(l=l[0]);var h=c?l.position():{x:0,y:0};return i={x:s.x-h.x,y:s.y-h.y},void 0===e?i:i[e]}for(var p=0;p<this.length;p++){var f=this[p],v=o?f.parent():null,y=v&&v.length>0,m=y;y&&(v=v[0]);var b=m?v.position():{x:0,y:0};void 0!==t?f.position(e,t+b[e]):void 0!==i&&f.position({x:i.x+b.x,y:i.y+b.y})}}else if(!a)return;return this}}).modelPosition=Vr.point=Vr.position,Vr.modelPositions=Vr.points=Vr.positions,Vr.renderedPoint=Vr.renderedPosition,Vr.relativePoint=Vr.relativePosition;var Gr,Zr,Ur=qr;Gr=Zr={},Zr.renderedBoundingBox=function(e){var t=this.boundingBox(e),n=this.cy(),r=n.zoom(),i=n.pan(),a=t.x1*r+i.x,o=t.x2*r+i.x,s=t.y1*r+i.y,l=t.y2*r+i.y;return{x1:a,x2:o,y1:s,y2:l,w:o-a,h:l-s}},Zr.dirtyCompoundBoundsCache=function(){var e=this.cy();return e.styleEnabled()&&e.hasCompoundNodes()?(this.forEachUp(function(e){if(e.isParent()){var t=e._private;t.compoundBoundsClean=!1,t.bbCache=null,e.emitAndNotify("bounds")}}),this):this},Zr.updateCompoundBounds=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.cy();if(!t.styleEnabled()||!t.hasCompoundNodes())return this;if(!e&&t.batching())return this;function n(e){if(e.isParent()){var t=e._private,n=e.children(),r="include"===e.pstyle("compound-sizing-wrt-labels").value,i={width:{val:e.pstyle("min-width").pfValue,left:e.pstyle("min-width-bias-left"),right:e.pstyle("min-width-bias-right")},height:{val:e.pstyle("min-height").pfValue,top:e.pstyle("min-height-bias-top"),bottom:e.pstyle("min-height-bias-bottom")}},a=n.boundingBox({includeLabels:r,includeOverlays:!1,useCache:!1}),o=t.position;0!==a.w&&0!==a.h||((a={w:e.pstyle("width").pfValue,h:e.pstyle("height").pfValue}).x1=o.x-a.w/2,a.x2=o.x+a.w/2,a.y1=o.y-a.h/2,a.y2=o.y+a.h/2);var s=i.width.left.value;"px"===i.width.left.units&&i.width.val>0&&(s=100*s/i.width.val);var l=i.width.right.value;"px"===i.width.right.units&&i.width.val>0&&(l=100*l/i.width.val);var u=i.height.top.value;"px"===i.height.top.units&&i.height.val>0&&(u=100*u/i.height.val);var c=i.height.bottom.value;"px"===i.height.bottom.units&&i.height.val>0&&(c=100*c/i.height.val);var h=y(i.width.val-a.w,s,l),d=h.biasDiff,p=h.biasComplementDiff,f=y(i.height.val-a.h,u,c),g=f.biasDiff,v=f.biasComplementDiff;t.autoPadding=function(e,t,n,r){if("%"!==n.units)return"px"===n.units?n.pfValue:0;switch(r){case"width":return e>0?n.pfValue*e:0;case"height":return t>0?n.pfValue*t:0;case"average":return e>0&&t>0?n.pfValue*(e+t)/2:0;case"min":return e>0&&t>0?e>t?n.pfValue*t:n.pfValue*e:0;case"max":return e>0&&t>0?e>t?n.pfValue*e:n.pfValue*t:0;default:return 0}}(a.w,a.h,e.pstyle("padding"),e.pstyle("padding-relative-to").value),t.autoWidth=Math.max(a.w,i.width.val),o.x=(-d+a.x1+a.x2+p)/2,t.autoHeight=Math.max(a.h,i.height.val),o.y=(-g+a.y1+a.y2+v)/2}function y(e,t,n){var r=0,i=0,a=t+n;return e>0&&a>0&&(r=t/a*e,i=n/a*e),{biasDiff:r,biasComplementDiff:i}}}for(var r=0;r<this.length;r++){var i=this[r],a=i._private;a.compoundBoundsClean||(n(i),t.batching()||(a.compoundBoundsClean=!0))}return this};var $r=function(e){return e===1/0||e===-1/0?0:e},Qr=function(e,t,n,r,i){r-t!=0&&i-n!=0&&null!=t&&null!=n&&null!=r&&null!=i&&(e.x1=t<e.x1?t:e.x1,e.x2=r>e.x2?r:e.x2,e.y1=n<e.y1?n:e.y1,e.y2=i>e.y2?i:e.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1)},Jr=function(e,t){return Qr(e,t.x1,t.y1,t.x2,t.y2)},ei=function(e,t,n){return _e(e,t,n)},ti=function(e,t,n){if(!t.cy().headless()){var r,i,a=t._private,o=a.rstyle,s=o.arrowWidth/2;if("none"!==t.pstyle(n+"-arrow-shape").value){"source"===n?(r=o.srcX,i=o.srcY):"target"===n?(r=o.tgtX,i=o.tgtY):(r=o.midX,i=o.midY);var l=a.arrowBounds=a.arrowBounds||{},u=l[n]=l[n]||{};u.x1=r-s,u.y1=i-s,u.x2=r+s,u.y2=i+s,u.w=u.x2-u.x1,u.h=u.y2-u.y1,ht(u,1),Qr(e,u.x1,u.y1,u.x2,u.y2)}}},ni=function(e,t,n){if(!t.cy().headless()){var r;r=n?n+"-":"";var i=t._private,a=i.rstyle;if(t.pstyle(r+"label").strValue){var o,s,l,u,c=t.pstyle("text-halign"),h=t.pstyle("text-valign"),d=ei(a,"labelWidth",n),p=ei(a,"labelHeight",n),f=ei(a,"labelX",n),g=ei(a,"labelY",n),v=t.pstyle(r+"text-margin-x").pfValue,y=t.pstyle(r+"text-margin-y").pfValue,m=t.isEdge(),b=t.pstyle(r+"text-rotation"),x=t.pstyle("text-outline-width").pfValue,w=t.pstyle("text-border-width").pfValue/2,E=t.pstyle("text-background-padding").pfValue,k=p+2*E,C=d+2*E,S=C/2,D=k/2;if(m)o=f-S,s=f+S,l=g-D,u=g+D;else{switch(c.value){case"left":o=f-C,s=f;break;case"center":o=f-S,s=f+S;break;case"right":o=f,s=f+C}switch(h.value){case"top":l=g-k,u=g;break;case"center":l=g-D,u=g+D;break;case"bottom":l=g,u=g+k}}o+=v-Math.max(x,w),s+=v+Math.max(x,w),l+=y-Math.max(x,w),u+=y+Math.max(x,w);var T=n||"main",P=i.labelBounds,M=P[T]=P[T]||{};M.x1=o,M.y1=l,M.x2=s,M.y2=u,M.w=s-o,M.h=u-l,ht(M,1);var _=m&&"autorotate"===b.strValue,B=null!=b.pfValue&&0!==b.pfValue;if(_||B){var N=_?ei(i.rstyle,"labelAngle",n):b.pfValue,I=Math.cos(N),A=Math.sin(N),z=(o+s)/2,L=(l+u)/2;if(!m){switch(c.value){case"left":z=s;break;case"right":z=o}switch(h.value){case"top":L=u;break;case"bottom":L=l}}var O=function(e,t){return{x:(e-=z)*I-(t-=L)*A+z,y:e*A+t*I+L}},R=O(o,l),F=O(o,u),V=O(s,l),q=O(s,u);o=Math.min(R.x,F.x,V.x,q.x),s=Math.max(R.x,F.x,V.x,q.x),l=Math.min(R.y,F.y,V.y,q.y),u=Math.max(R.y,F.y,V.y,q.y)}Qr(e,o,l,s,u),Qr(i.labelBounds.all,o,l,s,u)}return e}},ri=function(e){var t=0,n=function(e){return(e?1:0)<<t++},r=0;return r+=n(e.incudeNodes),r+=n(e.includeEdges),r+=n(e.includeLabels),r+=n(e.includeOverlays)},ii=function(e){if(e.isEdge()){var t=e.source().position(),n=e.target().position(),r=function(e){return Math.round(e)};return ce([r(t.x),r(t.y),r(n.x),r(n.y)])}return 0},ai=function(e,t){var n,r=e._private,i=(null==t?si:ri(t))===si,a=ii(e),o=r.bbCachePosKey===a,s=!(t.useCache&&o)||null==r.bbCache;if(s?(o||e.recalculateRenderedStyle(!1),n=function(e,t){var n,r,i,a,o,s,l,u=e._private.cy,c=u.styleEnabled(),h=u.headless(),d=ut(),p=e._private,f=c?e.pstyle("display").value:"element",g=e.isNode(),v=e.isEdge(),y="none"!==f,m=p.rstyle,b=g&&c?e.pstyle("bounds-expansion").pfValue:0;if(y){var x=0;c&&t.includeOverlays&&0!==e.pstyle("overlay-opacity").value&&(x=e.pstyle("overlay-padding").value);var w=0;if(c&&(w=e.pstyle("width").pfValue/2),g&&t.includeNodes){var E=e.position();o=E.x,s=E.y;var k=e.outerWidth()/2,C=e.outerHeight()/2;Qr(d,n=o-k,i=s-C,r=o+k,a=s+C)}else if(v&&t.includeEdges)if(c&&!h&&(n=Math.min(m.srcX,m.midX,m.tgtX),r=Math.max(m.srcX,m.midX,m.tgtX),i=Math.min(m.srcY,m.midY,m.tgtY),a=Math.max(m.srcY,m.midY,m.tgtY),Qr(d,n-=w,i-=w,r+=w,a+=w)),c&&!h&&"haystack"===e.pstyle("curve-style").strValue){var S=m.haystackPts||[];if(n=S[0].x,i=S[0].y,n>(r=S[1].x)){var D=n;n=r,r=D}if(i>(a=S[1].y)){var T=i;i=a,a=T}Qr(d,n-w,i-w,r+w,a+w)}else{for(var P=m.bezierPts||m.linePts||[],M=0;M<P.length;M++){var _=P[M];n=_.x-w,r=_.x+w,i=_.y-w,a=_.y+w,Qr(d,n,i,r,a)}if(0===P.length){var B=e.source().position(),N=e.target().position();if((n=B.x)>(r=N.x)){var I=n;n=r,r=I}if((i=B.y)>(a=N.y)){var A=i;i=a,a=A}Qr(d,n-=w,i-=w,r+=w,a+=w)}}if(c&&t.includeEdges&&v&&(ti(d,e,"mid-source"),ti(d,e,"mid-target"),ti(d,e,"source"),ti(d,e,"target")),c&&"yes"===e.pstyle("ghost").value){var z=e.pstyle("ghost-offset-x").pfValue,L=e.pstyle("ghost-offset-y").pfValue;Qr(d,d.x1+z,d.y1+L,d.x2+z,d.y2+L)}var O=p.bodyBounds=p.bodyBounds||{};dt(O,d),ht(O,b),ht(O,1),c&&(n=d.x1,r=d.x2,i=d.y1,a=d.y2,Qr(d,n-x,i-x,r+x,a+x));var R=p.overlayBounds=p.overlayBounds||{};dt(R,d),ht(R,b),ht(R,1);var F=p.labelBounds=p.labelBounds||{};null!=F.all?((l=F.all).x1=1/0,l.y1=1/0,l.x2=-1/0,l.y2=-1/0,l.w=0,l.h=0):F.all=ut(),c&&t.includeLabels&&(ni(d,e,null),v&&(ni(d,e,"source"),ni(d,e,"target")))}return d.x1=$r(d.x1),d.y1=$r(d.y1),d.x2=$r(d.x2),d.y2=$r(d.y2),d.w=$r(d.x2-d.x1),d.h=$r(d.y2-d.y1),d.w>0&&d.h>0&&y&&(ht(d,b),ht(d,1)),d}(e,oi),r.bbCache=n,r.bbCacheShift.x=r.bbCacheShift.y=0,r.bbCachePosKey=a):n=r.bbCache,!s&&(0!==r.bbCacheShift.x||0!==r.bbCacheShift.y)){var l=pt,u=r.bbCacheShift,c=function(e,t){null!=e&&l(e,t)};l(n,u);var h=r.bodyBounds,d=r.overlayBounds,p=r.labelBounds,f=r.arrowBounds;c(h,u),c(d,u),null!=f&&(c(f.source,u),c(f.target,u),c(f["mid-source"],u),c(f["mid-target"],u)),null!=p&&(c(p.main,u),c(p.all,u),c(p.source,u),c(p.target,u))}if(r.bbCacheShift.x=r.bbCacheShift.y=0,!i){var g=e.isNode();n=ut(),(t.includeNodes&&g||t.includeEdges&&!g)&&(t.includeOverlays?Jr(n,r.overlayBounds):Jr(n,r.bodyBounds)),t.includeLabels&&Jr(n,r.labelBounds.all),n.w=n.x2-n.x1,n.h=n.y2-n.y1}return n},oi={includeNodes:!0,includeEdges:!0,includeLabels:!0,includeOverlays:!0,useCache:!0},si=ri(oi),li=Te(oi);Zr.boundingBox=function(e){if(1===this.length&&null!=this[0]._private.bbCache&&(void 0===e||void 0===e.useCache||!0===e.useCache))return e=void 0===e?oi:li(e),ai(this[0],e);var t=ut(),n=li(e=e||oi);if(this.cy().styleEnabled())for(var r=0;r<this.length;r++){var i=this[r],a=i._private,o=ii(i),s=a.bbCachePosKey===o,l=n.useCache&&s;i.recalculateRenderedStyle(l)}this.updateCompoundBounds();for(var u=0;u<this.length;u++){var c=this[u];Jr(t,ai(c,n))}return t.x1=$r(t.x1),t.y1=$r(t.y1),t.x2=$r(t.x2),t.y2=$r(t.y2),t.w=$r(t.x2-t.x1),t.h=$r(t.y2-t.y1),t},Zr.dirtyBoundingBoxCache=function(){for(var e=0;e<this.length;e++){var t=this[e]._private;t.bbCache=null,t.bbCacheShift.x=t.bbCacheShift.y=0,t.bbCachePosKey=null}return this.emitAndNotify("bounds"),this},Zr.shiftCachedBoundingBox=function(e){for(var t=0;t<this.length;t++){var n=this[t]._private;null!=n.bbCache&&(n.bbCacheShift.x+=e.x,n.bbCacheShift.y+=e.y)}return this.emitAndNotify("bounds"),this},Zr.boundingBoxAt=function(e){var t=this.nodes(),n=this.cy(),r=n.hasCompoundNodes();if(r&&(t=t.filter(function(e){return!e.isParent()})),g(e)){var i=e;e=function(){return i}}n.startBatch(),t.forEach(function(t,n){return t._private.bbAtOldPos=e(t,n)}).silentPositions(e),r&&this.updateCompoundBounds(!0);var a=this.boundingBox({useCache:!1});return t.silentPositions(function(e){return e._private.bbAtOldPos}),n.endBatch(),a},Gr.boundingbox=Gr.bb=Gr.boundingBox,Gr.renderedBoundingbox=Gr.renderedBoundingBox;var ui,ci,hi=Zr;ui=ci={};var di=function(e){e.uppercaseName=_(e.name),e.autoName="auto"+e.uppercaseName,e.labelName="label"+e.uppercaseName,e.outerName="outer"+e.uppercaseName,e.uppercaseOuterName=_(e.outerName),ui[e.name]=function(){var t=this[0],n=t._private,r=n.cy._private.styleEnabled;if(t){if(!r)return 1;if(t.isParent())return t.updateCompoundBounds(),n[e.autoName]||0;var i=t.pstyle(e.name);switch(i.strValue){case"label":return t.recalculateRenderedStyle(),n.rstyle[e.labelName]||0;default:return i.pfValue}}},ui["outer"+e.uppercaseName]=function(){var t=this[0],n=t._private.cy._private.styleEnabled;if(t)return n?t[e.name]()+t.pstyle("border-width").pfValue+2*t.padding():1},ui["rendered"+e.uppercaseName]=function(){var t=this[0];if(t)return t[e.name]()*this.cy().zoom()},ui["rendered"+e.uppercaseOuterName]=function(){var t=this[0];if(t)return t[e.outerName]()*this.cy().zoom()}};di({name:"width"}),di({name:"height"}),ci.padding=function(){var e=this[0],t=e._private;return e.isParent()?(e.updateCompoundBounds(),void 0!==t.autoPadding?t.autoPadding:e.pstyle("padding").pfValue):e.pstyle("padding").pfValue};var pi=ci,fi={controlPoints:{get:function(e){return e.renderer().getControlPoints(e)},mult:!0},segmentPoints:{get:function(e){return e.renderer().getSegmentPoints(e)},mult:!0},sourceEndpoint:{get:function(e){return e.renderer().getSourceEndpoint(e)}},targetEndpoint:{get:function(e){return e.renderer().getTargetEndpoint(e)}},midpoint:{get:function(e){return e.renderer().getEdgeMidpoint(e)}}},gi=Object.keys(fi).reduce(function(e,t){var n=fi[t],r=function(e){return"rendered"+e[0].toUpperCase()+e.substr(1)}(t);return e[t]=function(){return function(e,t){if(e.isEdge())return t(e)}(this,n.get)},n.mult?e[r]=function(){return function(e,t){if(e.isEdge()){var n=e.cy(),r=n.pan(),i=n.zoom();return t(e).map(function(e){return Qe(e,i,r)})}}(this,n.get)}:e[r]=function(){return function(e,t){if(e.isEdge()){var n=e.cy();return Qe(t(e),n.zoom(),n.pan())}}(this,n.get)},e},{}),vi=I({},Ur,hi,pi,gi),yi=function(e,t){this.recycle(e,t)};function mi(){return!1}function bi(){return!0}yi.prototype={instanceString:function(){return"event"},recycle:function(e,t){if(this.isImmediatePropagationStopped=this.isPropagationStopped=this.isDefaultPrevented=mi,null!=e&&e.preventDefault?(this.type=e.type,this.isDefaultPrevented=e.defaultPrevented?bi:mi):null!=e&&e.type?t=e:this.type=e,null!=t&&(this.originalEvent=t.originalEvent,this.type=null!=t.type?t.type:this.type,this.cy=t.cy,this.target=t.target,this.position=t.position,this.renderedPosition=t.renderedPosition,this.namespace=t.namespace,this.layout=t.layout),null!=this.cy&&null!=this.position&&null==this.renderedPosition){var n=this.position,r=this.cy.zoom(),i=this.cy.pan();this.renderedPosition={x:n.x*r+i.x,y:n.y*r+i.y}}this.timeStamp=e&&e.timeStamp||Date.now()},preventDefault:function(){this.isDefaultPrevented=bi;var e=this.originalEvent;e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.isPropagationStopped=bi;var e=this.originalEvent;e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bi,this.stopPropagation()},isDefaultPrevented:mi,isPropagationStopped:mi,isImmediatePropagationStopped:mi};var xi=/^([^.]+)(\.(?:[^.]+))?$/,wi={qualifierCompare:function(e,t){return e===t},eventMatches:function(){return!0},addEventFields:function(){},callbackContext:function(e){return e},beforeEmit:function(){},afterEmit:function(){},bubble:function(){return!1},parent:function(){return null},context:null},Ei=Object.keys(wi);function ki(e,t){for(var n=0;n<Ei.length;n++){var r=Ei[n];this[r]=e[r]||wi[r]}this.context=t||this.context,this.listeners=[],this.emitting=0}var Ci=ki.prototype,Si=function(e,t,n,r,i,a,o){p(r)&&(i=r,r=null),o&&(a=null==a?o:I({},a,o));for(var s=f(n)?n:n.split(/\s+/),l=0;l<s.length;l++){var u=s[l];if(!k(u)){var c=u.match(xi);if(c)if(!1===t(e,u,c[1],c[2]?c[2]:null,r,i,a))break}}},Di=function(e,t){return e.addEventFields(e.context,t),new yi(t.type,t)},Ti=function(e,t,n){if("event"!==h(n))if(g(n))t(e,Di(e,n));else for(var r=f(n)?n:n.split(/\s+/),i=0;i<r.length;i++){var a=r[i];if(!k(a)){var o=a.match(xi);if(o){var s=o[1],l=o[2]?o[2]:null;t(e,Di(e,{type:s,namespace:l,target:e.context}))}}}else t(e,n)};Ci.on=Ci.addListener=function(e,t,n,r,i){return Si(this,function(e,t,n,r,i,a,o){p(a)&&e.listeners.push({event:t,callback:a,type:n,namespace:r,qualifier:i,conf:o})},e,t,n,r,i),this},Ci.one=function(e,t,n,r){return this.on(e,t,n,r,{one:!0})},Ci.removeListener=Ci.off=function(e,t,n,r){var i=this;0!==this.emitting&&(this.listeners=this.listeners.slice());for(var a=this.listeners,o=function(o){var s=a[o];Si(i,function(e,t,n,r,i,l){if(s.type===n&&(!r||s.namespace===r)&&(!i||e.qualifierCompare(s.qualifier,i))&&(!l||s.callback===l))return a.splice(o,1),!1},e,t,n,r)},s=a.length-1;s>=0;s--)o(s);return this},Ci.emit=Ci.trigger=function(e,t,n){var r=this.listeners,i=r.length;return this.emitting++,f(t)||(t=[t]),Ti(this,function(e,a){null!=n&&(r=[{event:a.event,type:a.type,namespace:a.namespace,callback:n}],i=r.length);for(var o=function(n){var i=r[n];if(i.type===a.type&&(!i.namespace||i.namespace===a.namespace||".*"===i.namespace)&&e.eventMatches(e.context,i,a)){var o=[a];null!=t&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.push(r)}}(o,t),e.beforeEmit(e.context,i,a),i.conf&&i.conf.one&&(e.listeners=e.listeners.filter(function(e){return e!==i}));var s=e.callbackContext(e.context,i,a),l=i.callback.apply(s,o);e.afterEmit(e.context,i,a),!1===l&&(a.stopPropagation(),a.preventDefault())}},s=0;s<i;s++)o(s);e.bubble(e.context)&&!a.isPropagationStopped()&&e.parent(e.context).emit(a,t)},e),this.emitting--,this};var Pi={qualifierCompare:function(e,t){return null==e||null==t?null==e&&null==t:e.sameText(t)},eventMatches:function(e,t,n){var r=t.qualifier;return null==r||e!==n.target&&b(n.target)&&r.matches(n.target)},addEventFields:function(e,t){t.cy=e.cy(),t.target=e},callbackContext:function(e,t,n){return null!=t.qualifier?n.target:e},beforeEmit:function(e,t){t.conf&&t.conf.once&&t.conf.onceCollection.removeListener(t.event,t.qualifier,t.callback)},bubble:function(){return!0},parent:function(e){return e.isChild()?e.parent():e.cy()}},Mi=function(e){return d(e)?new Mr(e):e},_i={createEmitter:function(){for(var e=0;e<this.length;e++){var t=this[e],n=t._private;n.emitter||(n.emitter=new ki(Pi,t))}return this},emitter:function(){return this._private.emitter},on:function(e,t,n){for(var r=Mi(t),i=0;i<this.length;i++){this[i].emitter().on(e,r,n)}return this},removeListener:function(e,t,n){for(var r=Mi(t),i=0;i<this.length;i++){this[i].emitter().removeListener(e,r,n)}return this},one:function(e,t,n){for(var r=Mi(t),i=0;i<this.length;i++){this[i].emitter().one(e,r,n)}return this},once:function(e,t,n){for(var r=Mi(t),i=0;i<this.length;i++){this[i].emitter().on(e,r,n,{once:!0,onceCollection:this})}},emit:function(e,t){for(var n=0;n<this.length;n++){this[n].emitter().emit(e,t)}return this},emitAndNotify:function(e,t){if(0!==this.length)return this.cy().notify(e,this),this.emit(e,t),this}};Hn.eventAliasesOn(_i);var Bi={nodes:function(e){return this.filter(function(e){return e.isNode()}).filter(e)},edges:function(e){return this.filter(function(e){return e.isEdge()}).filter(e)},byGroup:function(){for(var e=this.spawn(),t=this.spawn(),n=0;n<this.length;n++){var r=this[n];r.isNode()?e.merge(r):t.merge(r)}return{nodes:e,edges:t}},filter:function(e,t){if(void 0===e)return this;if(d(e)||m(e))return new Mr(e).filter(this);if(p(e)){for(var n=this.spawn(),r=0;r<this.length;r++){var i=this[r];(t?e.apply(t,[i,r,this]):e(i,r,this))&&n.merge(i)}return n}return this.spawn()},not:function(e){if(e){d(e)&&(e=this.filter(e));for(var t=[],n=e._private.map,r=0;r<this.length;r++){var i=this[r];n.has(i.id())||t.push(i)}return this.spawn(t)}return this},absoluteComplement:function(){return this.cy().mutableElements().not(this)},intersect:function(e){if(d(e)){var t=e;return this.filter(t)}for(var n=[],r=e,i=this.length<e.length,a=i?r._private.map:this._private.map,o=i?this:r,s=0;s<o.length;s++){var l=o[s]._private.data.id,u=a.get(l);u&&n.push(u.ele)}return this.spawn(n)},xor:function(e){var t=this._private.cy;d(e)&&(e=t.$(e));var n=[],r=e,i=function(e,t){for(var r=0;r<e.length;r++){var i=e[r],a=i._private.data.id;t.hasElementWithId(a)||n.push(i)}};return i(this,r),i(r,this),this.spawn(n)},diff:function(e){var t=this._private.cy;d(e)&&(e=t.$(e));var n=[],r=[],i=[],a=e,o=function(e,t,n){for(var r=0;r<e.length;r++){var a=e[r],o=a._private.data.id;t.hasElementWithId(o)?i.push(a):n.push(a)}};return o(this,a,n),o(a,this,r),{left:this.spawn(n,{unique:!0}),right:this.spawn(r,{unique:!0}),both:this.spawn(i,{unique:!0})}},add:function(e){var t=this._private.cy;if(!e)return this;if(d(e)){var n=e;e=t.mutableElements().filter(n)}for(var r=[],i=0;i<this.length;i++)r.push(this[i]);for(var a=this._private.map,o=0;o<e.length;o++){var s=!a.has(e[o].id());s&&r.push(e[o])}return this.spawn(r)},merge:function(e){var t=this._private,n=t.cy;if(!e)return this;if(e&&d(e)){var r=e;e=n.mutableElements().filter(r)}for(var i=t.map,a=0;a<e.length;a++){var o=e[a],s=o._private.data.id;if(!i.has(s)){var l=this.length++;this[l]=o,i.set(s,{ele:o,index:l})}else{var u=i.get(s).index;this[u]=o,i.set(s,{ele:o,index:u})}}return this},unmergeAt:function(e){var t=this[e].id(),n=this._private.map;this[e]=void 0,n.delete(t);var r=e===this.length-1;if(this.length>1&&!r){var i=this.length-1,a=this[i],o=a._private.data.id;this[i]=void 0,this[e]=a,n.set(o,{ele:a,index:e})}return this.length--,this},unmergeOne:function(e){e=e[0];var t=this._private,n=e._private.data.id,r=t.map.get(n);if(!r)return this;var i=r.index;return this.unmergeAt(i),this},unmerge:function(e){var t=this._private.cy;if(!e)return this;if(e&&d(e)){var n=e;e=t.mutableElements().filter(n)}for(var r=0;r<e.length;r++)this.unmergeOne(e[r]);return this},unmergeBy:function(e){for(var t=this.length-1;t>=0;t--){e(this[t])&&this.unmergeAt(t)}return this},map:function(e,t){for(var n=[],r=0;r<this.length;r++){var i=this[r],a=t?e.apply(t,[i,r,this]):e(i,r,this);n.push(a)}return n},reduce:function(e,t){for(var n=t,r=0;r<this.length;r++)n=e(n,this[r],r,this);return n},max:function(e,t){for(var n,r=-1/0,i=0;i<this.length;i++){var a=this[i],o=t?e.apply(t,[a,i,this]):e(a,i,this);o>r&&(r=o,n=a)}return{value:r,ele:n}},min:function(e,t){for(var n,r=1/0,i=0;i<this.length;i++){var a=this[i],o=t?e.apply(t,[a,i,this]):e(a,i,this);o<r&&(r=o,n=a)}return{value:r,ele:n}}},Ni=Bi;Ni.u=Ni["|"]=Ni["+"]=Ni.union=Ni.or=Ni.add,Ni["\\"]=Ni["!"]=Ni["-"]=Ni.difference=Ni.relativeComplement=Ni.subtract=Ni.not,Ni.n=Ni["&"]=Ni["."]=Ni.and=Ni.intersection=Ni.intersect,Ni["^"]=Ni["(+)"]=Ni["(-)"]=Ni.symmetricDifference=Ni.symdiff=Ni.xor,Ni.fnFilter=Ni.filterFn=Ni.stdFilter=Ni.filter,Ni.complement=Ni.abscomp=Ni.absoluteComplement;var Ii=function(e,t){var n=e.cy().hasCompoundNodes();function r(e){var t=e.pstyle("z-compound-depth");return"auto"===t.value?n?e.zDepth():0:"bottom"===t.value?-1:"top"===t.value?ve:0}var i=r(e)-r(t);if(0!==i)return i;function a(e){return"auto"===e.pstyle("z-index-compare").value&&e.isNode()?1:0}var o=a(e)-a(t);if(0!==o)return o;var s=e.pstyle("z-index").value-t.pstyle("z-index").value;return 0!==s?s:e.poolIndex()-t.poolIndex()},Ai={forEach:function(e,t){if(p(e))for(var n=this.length,r=0;r<n;r++){var i=this[r];if(!1===(t?e.apply(t,[i,r,this]):e(i,r,this)))break}return this},toArray:function(){for(var e=[],t=0;t<this.length;t++)e.push(this[t]);return e},slice:function(e,t){var n=[],r=this.length;null==t&&(t=r),null==e&&(e=0),e<0&&(e=r+e),t<0&&(t=r+t);for(var i=e;i>=0&&i<t&&i<r;i++)n.push(this[i]);return this.spawn(n)},size:function(){return this.length},eq:function(e){return this[e]||this.spawn()},first:function(){return this[0]||this.spawn()},last:function(){return this[this.length-1]||this.spawn()},empty:function(){return 0===this.length},nonempty:function(){return!this.empty()},sort:function(e){if(!p(e))return this;var t=this.toArray().sort(e);return this.spawn(t)},sortByZIndex:function(){return this.sort(Ii)},zDepth:function(){var e=this[0];if(e){var t=e._private;if("nodes"===t.group){var n=t.data.parent?e.parents().size():0;return e.isParent()?n:ve-1}var r=t.source,i=t.target,a=r.zDepth(),o=i.zDepth();return Math.max(a,o,0)}}};Ai.each=Ai.forEach;var zi=Te({nodeDimensionsIncludeLabels:!1}),Li={layoutDimensions:function(e){if((e=zi(e)).nodeDimensionsIncludeLabels){var t=this.boundingBox();return{w:t.w,h:t.h}}return{w:this.outerWidth(),h:this.outerHeight()}},layoutPositions:function(e,t,n){var r=this.nodes(),i=this.cy(),a=t.eles,o=function(e){return e.id()},s=D(n,o);e.emit({type:"layoutstart",layout:e}),e.animations=[];var l=t.spacingFactor&&1!==t.spacingFactor,u=function(){if(!l)return null;for(var e=ut(),t=0;t<r.length;t++){var n=r[t],i=s(n,t);ct(e,i.x,i.y)}return e}(),c=D(function(e,n){var r=s(e,n);l&&(r=function(e,t,n){var r=t.x1+t.w/2,i=t.y1+t.h/2;return{x:r+(n.x-r)*e,y:i+(n.y-i)*e}}(Math.abs(t.spacingFactor),u,r));return null!=t.transform&&(r=t.transform(e,r)),r},o);if(t.animate){for(var h=0;h<r.length;h++){var d=r[h],p=c(d,h);if(null==t.animateFilter||t.animateFilter(d,h)){var f=d.animation({position:p,duration:t.animationDuration,easing:t.animationEasing});e.animations.push(f)}else d.position(p)}if(t.fit){var g=i.animation({fit:{boundingBox:a.boundingBoxAt(c),padding:t.padding},duration:t.animationDuration,easing:t.animationEasing});e.animations.push(g)}else if(void 0!==t.zoom&&void 0!==t.pan){var v=i.animation({zoom:t.zoom,pan:t.pan,duration:t.animationDuration,easing:t.animationEasing});e.animations.push(v)}e.animations.forEach(function(e){return e.play()}),e.one("layoutready",t.ready),e.emit({type:"layoutready",layout:e}),Xn.all(e.animations.map(function(e){return e.promise()})).then(function(){e.one("layoutstop",t.stop),e.emit({type:"layoutstop",layout:e})})}else r.positions(c),t.fit&&i.fit(t.eles,t.padding),null!=t.zoom&&i.zoom(t.zoom),t.pan&&i.pan(t.pan),e.one("layoutready",t.ready),e.emit({type:"layoutready",layout:e}),e.one("layoutstop",t.stop),e.emit({type:"layoutstop",layout:e});return this},layout:function(e){return this.cy().makeLayout(I({},e,{eles:this}))}};function Oi(e,t,n){var r,i=n._private,a=i.styleCache=i.styleCache||[];return null!=(r=a[e])?r:r=a[e]=t(n)}function Ri(e,t){return e=he(e),function(n){return Oi(e,t,n)}}function Fi(e,t){e=he(e);var n=function(e){return t.call(e)};return function(){var t=this[0];if(t)return Oi(e,n,t)}}Li.createLayout=Li.makeLayout=Li.layout;var Vi={recalculateRenderedStyle:function(e){var t=this.cy(),n=t.renderer(),r=t.styleEnabled();return n&&r&&n.recalculateRenderedStyle(this,e),this},dirtyStyleCache:function(){var e,t=this.cy(),n=function(e){return e._private.styleCache=null};t.hasCompoundNodes()?((e=this.spawnSelf().merge(this.descendants()).merge(this.parents())).merge(e.connectedEdges()),e.forEach(n)):this.forEach(function(e){n(e),e.connectedEdges().forEach(n)});return this},updateStyle:function(e){var t=this._private.cy;if(!t.styleEnabled())return this;if(t.batching())return t._private.batchStyleEles.merge(this),this;var n=t.hasCompoundNodes(),r=t.style(),i=this;e=!(!e&&void 0!==e),n&&(i=this.spawnSelf().merge(this.descendants()).merge(this.parents()));var a=r.apply(i);return e?a.emitAndNotify("style"):a.emit("style"),this},parsedStyle:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this[0],r=n.cy();if(r.styleEnabled()&&n){var i=n._private.style[e];return null!=i?i:t?r.style().getDefaultProperty(e):null}},numericStyle:function(e){var t=this[0];if(t.cy().styleEnabled()&&t){var n=t.pstyle(e);return void 0!==n.pfValue?n.pfValue:n.value}},numericStyleUnits:function(e){var t=this[0];if(t.cy().styleEnabled())return t?t.pstyle(e).units:void 0},renderedStyle:function(e){var t=this.cy();if(!t.styleEnabled())return this;var n=this[0];return n?t.style().getRenderedStyle(n,e):void 0},style:function(e,t){var n=this.cy();if(!n.styleEnabled())return this;var r=n.style();if(g(e)){var i=e;r.applyBypass(this,i,!1),this.emitAndNotify("style")}else if(d(e)){if(void 0===t){var a=this[0];return a?r.getStylePropertyValue(a,e):void 0}r.applyBypass(this,e,t,!1),this.emitAndNotify("style")}else if(void 0===e){var o=this[0];return o?r.getRawStyle(o):void 0}return this},removeStyle:function(e){var t=this.cy();if(!t.styleEnabled())return this;var n=t.style();if(void 0===e)for(var r=0;r<this.length;r++){var i=this[r];n.removeAllBypasses(i,!1)}else{e=e.split(/\s+/);for(var a=0;a<this.length;a++){var o=this[a];n.removeBypasses(o,e,!1)}}return this.emitAndNotify("style"),this},show:function(){return this.css("display","element"),this},hide:function(){return this.css("display","none"),this},effectiveOpacity:function(){var e=this.cy();if(!e.styleEnabled())return 1;var t=e.hasCompoundNodes(),n=this[0];if(n){var r=n._private,i=n.pstyle("opacity").value;if(!t)return i;var a=r.data.parent?n.parents():null;if(a)for(var o=0;o<a.length;o++){i*=a[o].pstyle("opacity").value}return i}},transparent:function(){if(!this.cy().styleEnabled())return!1;var e=this[0],t=e.cy().hasCompoundNodes();return e?t?0===e.effectiveOpacity():0===e.pstyle("opacity").value:void 0},backgrounding:function(){return!!this.cy().styleEnabled()&&!!this[0]._private.backgrounding}};function qi(e,t){var n=e._private.data.parent?e.parents():null;if(n)for(var r=0;r<n.length;r++){if(!t(n[r]))return!1}return!0}function Yi(e){var t=e.ok,n=e.edgeOkViaNode||e.ok,r=e.parentOk||e.ok;return function(){var e=this.cy();if(!e.styleEnabled())return!0;var i=this[0],a=e.hasCompoundNodes();if(i){var o=i._private;if(!t(i))return!1;if(i.isNode())return!a||qi(i,r);var s=o.source,l=o.target;return n(s)&&(!a||qi(s,n))&&(s===l||n(l)&&(!a||qi(l,n)))}}}var Xi=Ri("eleTakesUpSpace",function(e){return"element"===e.pstyle("display").value&&0!==e.width()&&(!e.isNode()||0!==e.height())});Vi.takesUpSpace=Fi("takesUpSpace",Yi({ok:Xi}));var ji=Ri("eleInteractive",function(e){return"yes"===e.pstyle("events").value&&"visible"===e.pstyle("visibility").value&&Xi(e)}),Wi=Ri("parentInteractive",function(e){return"visible"===e.pstyle("visibility").value&&Xi(e)});Vi.interactive=Fi("interactive",Yi({ok:ji,parentOk:Wi,edgeOkViaNode:Xi})),Vi.noninteractive=function(){var e=this[0];if(e)return!e.interactive()};var Hi=Ri("eleVisible",function(e){return"visible"===e.pstyle("visibility").value&&0!==e.pstyle("opacity").pfValue&&Xi(e)}),Ki=Xi;Vi.visible=Fi("visible",Yi({ok:Hi,edgeOkViaNode:Ki})),Vi.hidden=function(){var e=this[0];if(e)return!e.visible()},Vi.bypass=Vi.css=Vi.style,Vi.renderedCss=Vi.renderedStyle,Vi.removeBypass=Vi.removeCss=Vi.removeStyle,Vi.pstyle=Vi.parsedStyle;var Gi={};function Zi(e){return function(){var t=arguments,n=[];if(2===t.length){var r=t[0],i=t[1];this.on(e.event,r,i)}else if(1===t.length&&p(t[0])){var a=t[0];this.on(e.event,a)}else if(0===t.length||1===t.length&&f(t[0])){for(var o=1===t.length?t[0]:null,s=0;s<this.length;s++){var l=this[s],u=!e.ableField||l._private[e.ableField],c=l._private[e.field]!=e.value;if(e.overrideAble){var h=e.overrideAble(l);if(void 0!==h&&(u=h,!h))return this}u&&(l._private[e.field]=e.value,c&&n.push(l))}var d=this.spawn(n);d.updateStyle(),d.emit(e.event),o&&d.emit(o)}return this}}function Ui(e){Gi[e.field]=function(){var t=this[0];if(t){if(e.overrideField){var n=e.overrideField(t);if(void 0!==n)return n}return t._private[e.field]}},Gi[e.on]=Zi({event:e.on,field:e.field,ableField:e.ableField,overrideAble:e.overrideAble,value:!0}),Gi[e.off]=Zi({event:e.off,field:e.field,ableField:e.ableField,overrideAble:e.overrideAble,value:!1})}Ui({field:"locked",overrideField:function(e){return!!e.cy().autolock()||void 0},on:"lock",off:"unlock"}),Ui({field:"grabbable",overrideField:function(e){return!e.cy().autoungrabify()&&void 0},on:"grabify",off:"ungrabify"}),Ui({field:"selected",ableField:"selectable",overrideAble:function(e){return!e.cy().autounselectify()&&void 0},on:"select",off:"unselect"}),Ui({field:"selectable",overrideField:function(e){return!e.cy().autounselectify()&&void 0},on:"selectify",off:"unselectify"}),Gi.deselect=Gi.unselect,Gi.grabbed=function(){var e=this[0];if(e)return e._private.grabbed},Ui({field:"active",on:"activate",off:"unactivate"}),Gi.inactive=function(){var e=this[0];if(e)return!e._private.active};var $i={},Qi=function(e){return function(t){for(var n=[],r=0;r<this.length;r++){var i=this[r];if(i.isNode()){for(var a=!1,o=i.connectedEdges(),s=0;s<o.length;s++){var l=o[s],u=l.source(),c=l.target();if(e.noIncomingEdges&&c===i&&u!==i||e.noOutgoingEdges&&u===i&&c!==i){a=!0;break}}a||n.push(i)}}return this.spawn(n,{unique:!0}).filter(t)}},Ji=function(e){return function(t){for(var n=[],r=0;r<this.length;r++){var i=this[r];if(i.isNode())for(var a=i.connectedEdges(),o=0;o<a.length;o++){var s=a[o],l=s.source(),u=s.target();e.outgoing&&l===i?(n.push(s),n.push(u)):e.incoming&&u===i&&(n.push(s),n.push(l))}}return this.spawn(n,{unique:!0}).filter(t)}},ea=function(e){return function(t){for(var n=this,r=[],i={};;){var a=e.outgoing?n.outgoers():n.incomers();if(0===a.length)break;for(var o=!1,s=0;s<a.length;s++){var l=a[s],u=l.id();i[u]||(i[u]=!0,r.push(l),o=!0)}if(!o)break;n=a}return this.spawn(r,{unique:!0}).filter(t)}};function ta(e){return function(t){for(var n=[],r=0;r<this.length;r++){var i=this[r]._private[e.attr];i&&n.push(i)}return this.spawn(n,{unique:!0}).filter(t)}}function na(e){return function(t){var n=[],r=this._private.cy,i=e||{};d(t)&&(t=r.$(t));for(var a=0;a<t.length;a++)for(var o=t[a]._private.edges,s=0;s<o.length;s++){var l=o[s],u=l._private.data,c=this.hasElementWithId(u.source)&&t.hasElementWithId(u.target),h=t.hasElementWithId(u.source)&&this.hasElementWithId(u.target);if(c||h){if(i.thisIsSrc||i.thisIsTgt){if(i.thisIsSrc&&!c)continue;if(i.thisIsTgt&&!h)continue}n.push(l)}}return this.spawn(n,{unique:!0})}}function ra(e){return e=I({},{codirected:!1},e),function(t){for(var n=[],r=this.edges(),i=e,a=0;a<r.length;a++)for(var o=r[a]._private,s=o.source,l=s._private.data.id,u=o.data.target,c=s._private.edges,h=0;h<c.length;h++){var d=c[h],p=d._private.data,f=p.target,g=p.source,v=f===u&&g===l,y=l===f&&u===g;(i.codirected&&v||!i.codirected&&(v||y))&&n.push(d)}return this.spawn(n,{unique:!0}).filter(t)}}$i.clearTraversalCache=function(){for(var e=0;e<this.length;e++)this[e]._private.traversalCache=null},I($i,{roots:Qi({noIncomingEdges:!0}),leaves:Qi({noOutgoingEdges:!0}),outgoers:Ar(Ji({outgoing:!0}),"outgoers"),successors:ea({outgoing:!0}),incomers:Ar(Ji({incoming:!0}),"incomers"),predecessors:ea({incoming:!0})}),I($i,{neighborhood:Ar(function(e){for(var t=[],n=this.nodes(),r=0;r<n.length;r++)for(var i=n[r],a=i.connectedEdges(),o=0;o<a.length;o++){var s=a[o],l=s.source(),u=s.target(),c=i===l?u:l;c.length>0&&t.push(c[0]),t.push(s[0])}return this.spawn(t,{unique:!0}).filter(e)},"neighborhood"),closedNeighborhood:function(e){return this.neighborhood().add(this).filter(e)},openNeighborhood:function(e){return this.neighborhood(e)}}),$i.neighbourhood=$i.neighborhood,$i.closedNeighbourhood=$i.closedNeighborhood,$i.openNeighbourhood=$i.openNeighborhood,I($i,{source:Ar(function(e){var t,n=this[0];return n&&(t=n._private.source||n.cy().collection()),t&&e?t.filter(e):t},"source"),target:Ar(function(e){var t,n=this[0];return n&&(t=n._private.target||n.cy().collection()),t&&e?t.filter(e):t},"target"),sources:ta({attr:"source"}),targets:ta({attr:"target"})}),I($i,{edgesWith:Ar(na(),"edgesWith"),edgesTo:Ar(na({thisIsSrc:!0}),"edgesTo")}),I($i,{connectedEdges:Ar(function(e){for(var t=[],n=0;n<this.length;n++){var r=this[n];if(r.isNode())for(var i=r._private.edges,a=0;a<i.length;a++){var o=i[a];t.push(o)}}return this.spawn(t,{unique:!0}).filter(e)},"connectedEdges"),connectedNodes:Ar(function(e){for(var t=[],n=0;n<this.length;n++){var r=this[n];r.isEdge()&&(t.push(r.source()[0]),t.push(r.target()[0]))}return this.spawn(t,{unique:!0}).filter(e)},"connectedNodes"),parallelEdges:Ar(ra(),"parallelEdges"),codirectedEdges:Ar(ra({codirected:!0}),"codirectedEdges")}),I($i,{components:function(e){var t=this,n=t.cy(),r=n.collection(),i=null==e?t.nodes():e.nodes(),a=[];null!=e&&i.empty()&&(i=e.sources());var o=function(e,t){r.merge(e),i.unmerge(e),t.merge(e)};if(i.empty())return t.spawn();var s=function(){var e=n.collection();a.push(e);var r=i[0];o(r,e),t.bfs({directed:!1,roots:r,visit:function(t){return o(t,e)}}),e.forEach(function(t){t.connectedEdges().forEach(function(t){e.has(t.source())&&e.has(t.target())&&e.merge(t)})})};do{s()}while(i.length>0);return a},component:function(){var e=this[0];return e.cy().mutableElements().components(e)[0]}}),$i.componentsOf=$i.components;var ia=function(e,t,n){for(var r=null!=n?n:Ce();e.hasElementWithId(r);)r=Ce();return r},aa=function(e,t,n){if(void 0!==e&&w(e)){var r=new Ne,i=!1;if(t){if(t.length>0&&g(t[0])&&!b(t[0])){i=!0;for(var a=[],o=new Ae,s=0,l=t.length;s<l;s++){var u=t[s];null==u.data&&(u.data={});var c=u.data;if(null==c.id)c.id=ia(e,u);else if(e.hasElementWithId(c.id)||o.has(c.id))continue;var h=new ze(e,u,!1);a.push(h),o.add(c.id)}t=a}}else t=[];this.length=0;for(var d=0,p=t.length;d<p;d++){var f=t[d];if(null!=f){var v=f._private.data.id;(null==n||n.unique&&!r.has(v))&&(r.set(v,{index:this.length,ele:f}),this[this.length]=f,this.length++)}}this._private={cy:e,map:r},i&&this.restore()}else we("A collection must have a reference to the core")},oa=ze.prototype=aa.prototype;oa.instanceString=function(){return"collection"},oa.spawn=function(e,t,n){return w(e)||(n=t,t=e,e=this.cy()),new aa(e,t,n)},oa.spawnSelf=function(){return this.spawn(this)},oa.cy=function(){return this._private.cy},oa.renderer=function(){return this._private.cy.renderer()},oa.element=function(){return this[0]},oa.collection=function(){return x(this)?this:new aa(this._private.cy,[this])},oa.unique=function(){return new aa(this._private.cy,this,{unique:!0})},oa.hasElementWithId=function(e){return this._private.map.has(e)},oa.getElementById=function(e){var t=this._private.cy,n=this._private.map.get(e);return n?n.ele:new aa(t)},oa.$id=oa.getElementById,oa.poolIndex=function(){var e=this._private.cy._private.elements,t=this[0]._private.data.id;return e._private.map.get(t).index},oa.indexOf=function(e){var t=e[0]._private.data.id;return this._private.map.get(t).index},oa.indexOfId=function(e){return this._private.map.get(e).index},oa.json=function(e){var t=this.element(),n=this.cy();if(null==t&&e)return this;if(null!=t){var r=t._private;if(g(e)){if(n.startBatch(),e.data){t.data(e.data);var i=r.data;if(t.isEdge()){var a=!1,o={},s=e.data.source,l=e.data.target;null!=s&&s!==i.source&&(o.source=s,a=!0),null!=l&&l!==i.target&&(o.target=l,a=!0),a&&(t=t.move(o))}else{var u=e.data.parent;null==u&&null==i.parent||u===i.parent||(void 0===u&&(u=null),t=t.move({parent:u}))}}e.position&&t.position(e.position);var c=function(n,i,a){var o=e[n];null!=o&&o!==r[n]&&(o?t[i]():t[a]())};return c("removed","remove","restore"),c("selected","select","unselect"),c("selectable","selectify","unselectify"),c("locked","lock","unlock"),c("grabbable","grabify","ungrabify"),null!=e.classes&&t.classes(e.classes),n.endBatch(),this}if(void 0===e){var h={data:ke(r.data),position:ke(r.position),group:r.group,removed:r.removed,selected:r.selected,selectable:r.selectable,locked:r.locked,grabbable:r.grabbable,classes:null};h.classes="";var d=0;return r.classes.forEach(function(e){return h.classes+=0==d++?e:" "+e}),h}}},oa.jsons=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t].json();e.push(n)}return e},oa.clone=function(){for(var e=this.cy(),t=[],n=0;n<this.length;n++){var r=this[n].json(),i=new ze(e,r,!1);t.push(i)}return new aa(e,t)},oa.copy=oa.clone,oa.restore=function(){for(var e,t,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this.cy(),a=i._private,o=[],s=[],l=0,u=this.length;l<u;l++){var c=this[l];r&&!c.removed()||(c.isNode()?o.push(c):s.push(c))}e=o.concat(s);var h=function(){e.splice(t,1),t--};for(t=0;t<e.length;t++){var p=e[t],f=p._private,g=f.data;if(p.clearTraversalCache(),r||f.removed)if(void 0===g.id)g.id=ia(i,p);else if(v(g.id))g.id=""+g.id;else{if(k(g.id)||!d(g.id)){we("Can not create element with invalid string ID `"+g.id+"`"),h();continue}if(i.hasElementWithId(g.id)){we("Can not create second element with ID `"+g.id+"`"),h();continue}}else;var y=g.id;if(p.isNode()){var m=f.position;null==m.x&&(m.x=0),null==m.y&&(m.y=0)}if(p.isEdge()){for(var b=p,x=["source","target"],w=x.length,E=!1,C=0;C<w;C++){var S=x[C],D=g[S];v(D)&&(D=g[S]=""+g[S]),null==D||""===D?(we("Can not create edge `"+y+"` with unspecified "+S),E=!0):i.hasElementWithId(D)||(we("Can not create edge `"+y+"` with nonexistant "+S+" `"+D+"`"),E=!0)}if(E){h();continue}var T=i.getElementById(g.source),P=i.getElementById(g.target);T._private.edges.push(b),P._private.edges.push(b),b._private.source=T,b._private.target=P}f.map=new Ne,f.map.set(y,{ele:p,index:0}),f.removed=!1,r&&i.addToPool(p)}for(var M=0;M<o.length;M++){var _=o[M],B=_._private.data;v(B.parent)&&(B.parent=""+B.parent);var N=B.parent;if(null!=N){var I=i.getElementById(N);if(I.empty())B.parent=void 0;else{for(var A=!1,z=I;!z.empty();){if(_.same(z)){A=!0,B.parent=void 0;break}z=z.parent()}A||(I[0]._private.children.push(_),_._private.parent=I[0],a.hasCompoundNodes=!0)}}}if(e.length>0){for(var L=new aa(i,e),O=0;O<L.length;O++){var R=L[O];R.isNode()||(R.parallelEdges().clearTraversalCache(),R.source().clearTraversalCache(),R.target().clearTraversalCache())}(a.hasCompoundNodes?i.collection().merge(L).merge(L.connectedNodes()).merge(L.parent()):L).dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(n),n?L.emitAndNotify("add"):r&&L.emit("add")}return this},oa.removed=function(){var e=this[0];return e&&e._private.removed},oa.inside=function(){var e=this[0];return e&&!e._private.removed},oa.remove=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[],r=[],i={},a=this._private.cy;function o(e){var n=i[e.id()];t&&e.removed()||n||(i[e.id()]=!0,e.isNode()?(r.push(e),function(e){for(var t=e._private.edges,n=0;n<t.length;n++)o(t[n])}(e),function(e){for(var t=e._private.children,n=0;n<t.length;n++)o(t[n])}(e)):r.unshift(e))}for(var s=0,l=this.length;s<l;s++){o(this[s])}function u(e,t){var n=e._private.edges;Pe(n,t),e.clearTraversalCache()}var c=[];function h(e,t){t=t[0];var n=(e=e[0])._private.children,r=e.id();Pe(n,t),t._private.parent=null,c.ids[r]||(c.ids[r]=!0,c.push(e))}c.ids={},this.dirtyCompoundBoundsCache(),t&&a.removeFromPool(r);for(var d=0;d<r.length;d++){var p=r[d];if(t&&(p._private.removed=!0),n.push(p),p.isEdge()){var f=p.source()[0],g=p.target()[0];u(f,p),u(g,p),p.parallelEdges().clearTraversalCache()}else{var v=p.parent();0!==v.length&&h(v,p)}}var y=a._private.elements;a._private.hasCompoundNodes=!1;for(var m=0;m<y.length;m++){if(y[m].isParent()){a._private.hasCompoundNodes=!0;break}}var b=new aa(this.cy(),n);b.size()>0&&(e?b.emitAndNotify("remove"):t&&b.emit("remove"));for(var x=0;x<c.length;x++){var w=c[x];t&&w.removed()||w.updateStyle()}return b},oa.move=function(e){var t=this._private.cy,n=this;if(void 0!==e.source||void 0!==e.target){var r=e.source,i=e.target,a=null!=r&&t.hasElementWithId(r),o=null!=i&&t.hasElementWithId(i);(a||o)&&(t.batch(function(){n.remove(!1,!1);for(var e=0;e<n.length;e++){var t=n[e],s=t._private.data;t.isEdge()&&(a&&(s.source=r),o&&(s.target=i))}n.restore(!1,!1)}),n.emitAndNotify("move"))}else if(void 0!==e.parent){var s=e.parent;if(null===s||t.hasElementWithId(s)){var l=null===s?void 0:s;t.batch(function(){for(var e=n.remove(!1,!1),t=0;t<n.length;t++){var r=n[t],i=r._private.data;r.isNode()&&(i.parent=l)}e.restore(!1,!1)}),n.emitAndNotify("move")}}return this},[Ln,Kn,Gn,Br,zr,Yr,Xr,vi,_i,Bi,{isNode:function(){return"nodes"===this.group()},isEdge:function(){return"edges"===this.group()},isLoop:function(){return this.isEdge()&&this.source()[0]===this.target()[0]},isSimple:function(){return this.isEdge()&&this.source()[0]!==this.target()[0]},group:function(){var e=this[0];if(e)return e._private.group}},Ai,Li,Vi,Gi,$i].forEach(function(e){I(oa,e)});var sa={add:function(e){var t,n=this;if(m(e)){var r=e;if(r._private.cy===n)t=r.restore();else{for(var i=[],a=0;a<r.length;a++){var o=r[a];i.push(o.json())}t=new aa(n,i)}}else if(f(e)){t=new aa(n,e)}else if(g(e)&&(f(e.nodes)||f(e.edges))){for(var s=e,l=[],u=["nodes","edges"],c=0,h=u.length;c<h;c++){var d=u[c],p=s[d];if(f(p))for(var v=0,y=p.length;v<y;v++){var b=I({group:d},p[v]);l.push(b)}}t=new aa(n,l)}else{t=new ze(n,e).collection()}return t},remove:function(e){if(m(e));else if(d(e)){var t=e;e=this.$(t)}return e.remove()}};function la(e,t,n,r){var i=4,a=.001,o=1e-7,s=10,l=11,u=1/(l-1),c="undefined"!=typeof Float32Array;if(4!==arguments.length)return!1;for(var h=0;h<4;++h)if("number"!=typeof arguments[h]||isNaN(arguments[h])||!isFinite(arguments[h]))return!1;e=Math.min(e,1),n=Math.min(n,1),e=Math.max(e,0),n=Math.max(n,0);var d=c?new Float32Array(l):new Array(l);function p(e,t){return 1-3*t+3*e}function f(e,t){return 3*t-6*e}function g(e){return 3*e}function v(e,t,n){return((p(t,n)*e+f(t,n))*e+g(t))*e}function y(e,t,n){return 3*p(t,n)*e*e+2*f(t,n)*e+g(t)}function m(t){for(var r=0,c=1,h=l-1;c!==h&&d[c]<=t;++c)r+=u;var p=r+(t-d[--c])/(d[c+1]-d[c])*u,f=y(p,e,n);return f>=a?function(t,r){for(var a=0;a<i;++a){var o=y(r,e,n);if(0===o)return r;r-=(v(r,e,n)-t)/o}return r}(t,p):0===f?p:function(t,r,i){var a,l,u=0;do{(a=v(l=r+(i-r)/2,e,n)-t)>0?i=l:r=l}while(Math.abs(a)>o&&++u<s);return l}(t,r,r+u)}var b=!1;function x(){b=!0,e===t&&n===r||function(){for(var t=0;t<l;++t)d[t]=v(t*u,e,n)}()}var w=function(i){return b||x(),e===t&&n===r?i:0===i?0:1===i?1:v(m(i),t,r)};w.getControlPoints=function(){return[{x:e,y:t},{x:n,y:r}]};var E="generateBezier("+[e,t,n,r]+")";return w.toString=function(){return E},w}var ua=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,r){var i={x:t.x+r.dx*n,v:t.v+r.dv*n,tension:t.tension,friction:t.friction};return{dx:i.v,dv:e(i)}}function n(n,r){var i={dx:n.v,dv:e(n)},a=t(n,.5*r,i),o=t(n,.5*r,a),s=t(n,r,o),l=1/6*(i.dx+2*(a.dx+o.dx)+s.dx),u=1/6*(i.dv+2*(a.dv+o.dv)+s.dv);return n.x=n.x+l*r,n.v=n.v+u*r,n}return function e(t,r,i){var a,o,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0;for(t=parseFloat(t)||500,r=parseFloat(r)||20,i=i||null,l.tension=t,l.friction=r,o=(a=null!==i)?(c=e(t,r))/i*.016:.016;s=n(s||l,o),u.push(1+s.x),c+=16,Math.abs(s.x)>1e-4&&Math.abs(s.v)>1e-4;);return a?function(e){return u[e*(u.length-1)|0]}:c}}(),ca=function(e,t,n,r){var i=la(e,t,n,r);return function(e,t,n){return e+(t-e)*i(n)}},ha={linear:function(e,t,n){return e+(t-e)*n},ease:ca(.25,.1,.25,1),"ease-in":ca(.42,0,1,1),"ease-out":ca(0,0,.58,1),"ease-in-out":ca(.42,0,.58,1),"ease-in-sine":ca(.47,0,.745,.715),"ease-out-sine":ca(.39,.575,.565,1),"ease-in-out-sine":ca(.445,.05,.55,.95),"ease-in-quad":ca(.55,.085,.68,.53),"ease-out-quad":ca(.25,.46,.45,.94),"ease-in-out-quad":ca(.455,.03,.515,.955),"ease-in-cubic":ca(.55,.055,.675,.19),"ease-out-cubic":ca(.215,.61,.355,1),"ease-in-out-cubic":ca(.645,.045,.355,1),"ease-in-quart":ca(.895,.03,.685,.22),"ease-out-quart":ca(.165,.84,.44,1),"ease-in-out-quart":ca(.77,0,.175,1),"ease-in-quint":ca(.755,.05,.855,.06),"ease-out-quint":ca(.23,1,.32,1),"ease-in-out-quint":ca(.86,0,.07,1),"ease-in-expo":ca(.95,.05,.795,.035),"ease-out-expo":ca(.19,1,.22,1),"ease-in-out-expo":ca(1,0,0,1),"ease-in-circ":ca(.6,.04,.98,.335),"ease-out-circ":ca(.075,.82,.165,1),"ease-in-out-circ":ca(.785,.135,.15,.86),spring:function(e,t,n){if(0===n)return ha.linear;var r=ua(e,t,n);return function(e,t,n){return e+(t-e)*r(n)}},"cubic-bezier":ca};function da(e,t,n,r,i){if(1===r)return n;var a=i(t,n,r);return null==e?a:((e.roundValue||e.color)&&(a=Math.round(a)),void 0!==e.min&&(a=Math.max(a,e.min)),void 0!==e.max&&(a=Math.min(a,e.max)),a)}function pa(e,t){return null!=e.pfValue||null!=e.value?null==e.pfValue||null!=t&&"%"===t.type.units?e.value:e.pfValue:e}function fa(e,t,n,r,i){var a=null!=i?i.type:null;n<0?n=0:n>1&&(n=1);var o=pa(e,i),s=pa(t,i);if(v(o)&&v(s))return da(a,o,s,n,r);if(f(o)&&f(s)){for(var l=[],u=0;u<s.length;u++){var c=o[u],h=s[u];if(null!=c&&null!=h){var d=da(a,c,h,n,r);l.push(d)}else l.push(h)}return l}}function ga(e,t,n,r){var i=!r,a=e._private,o=t._private,s=o.easing,l=o.startTime,u=(r?e:e.cy()).style();if(!o.easingImpl)if(null==s)o.easingImpl=ha.linear;else{var c,h,p;if(d(s))c=u.parse("transition-timing-function",s).value;else c=s;d(c)?(h=c,p=[]):(h=c[1],p=c.slice(2).map(function(e){return+e})),p.length>0?("spring"===h&&p.push(o.duration),o.easingImpl=ha[h].apply(null,p)):o.easingImpl=ha[h]}var f,g=o.easingImpl;if(f=0===o.duration?1:(n-l)/o.duration,o.applying&&(f=o.progress),f<0?f=0:f>1&&(f=1),null==o.delay){var v=o.startPosition,y=o.position;if(y&&i&&!e.locked()){var m={};va(v.x,y.x)&&(m.x=fa(v.x,y.x,f,g)),va(v.y,y.y)&&(m.y=fa(v.y,y.y,f,g)),e.position(m)}var b=o.startPan,x=o.pan,w=a.pan,E=null!=x&&r;E&&(va(b.x,x.x)&&(w.x=fa(b.x,x.x,f,g)),va(b.y,x.y)&&(w.y=fa(b.y,x.y,f,g)),e.emit("pan"));var k=o.startZoom,C=o.zoom,S=null!=C&&r;S&&(va(k,C)&&(a.zoom=fa(k,C,f,g)),e.emit("zoom")),(E||S)&&e.emit("viewport");var D=o.style;if(D&&D.length>0&&i){for(var T=0;T<D.length;T++){var P=D[T],M=P.name,_=P,B=o.startStyle[M],N=fa(B,_,f,g,u.properties[B.name]);u.overrideBypass(e,M,N)}e.emit("style")}}return o.progress=f,f}function va(e,t){return null!=e&&null!=t&&(!(!v(e)||!v(t))||!(!e||!t))}function ya(e,t,n,r){var i=t._private;i.started=!0,i.startTime=n-i.progress*i.duration}function ma(e,t){var n=t._private.aniEles,r=[];function i(t,n){var i=t._private,a=i.animation.current,o=i.animation.queue,s=!1;if(!n&&"none"===t.pstyle("display").value){a=a.splice(0,a.length).concat(o.splice(0,o.length));for(var l=0;l<a.length;l++)a[l].stop()}if(0===a.length){var u=o.shift();u&&a.push(u)}for(var c=function(e){for(var t=e.length-1;t>=0;t--){(0,e[t])()}e.splice(0,e.length)},h=a.length-1;h>=0;h--){var d=a[h],p=d._private;p.stopped?(a.splice(h,1),p.hooked=!1,p.playing=!1,p.started=!1,c(p.frames)):(p.playing||p.applying)&&(p.playing&&p.applying&&(p.applying=!1),p.started||ya(0,d,e),ga(t,d,e,n),p.applying&&(p.applying=!1),c(p.frames),null!=p.step&&p.step(e),d.completed()&&(a.splice(h,1),p.hooked=!1,p.playing=!1,p.started=!1,c(p.completes)),s=!0)}return n||0!==a.length||0!==o.length||r.push(t),s}for(var a=!1,o=0;o<n.length;o++){var s=i(n[o]);a=a||s}var l=i(t,!0);(a||l)&&(n.length>0?t.notify("draw",n):t.notify("draw")),n.unmerge(r),t.emit("step")}var ba={animate:Hn.animate(),animation:Hn.animation(),animated:Hn.animated(),clearQueue:Hn.clearQueue(),delay:Hn.delay(),delayAnimation:Hn.delayAnimation(),stop:Hn.stop(),addToAnimationPool:function(e){this.styleEnabled()&&this._private.aniEles.merge(e)},stopAnimationLoop:function(){this._private.animationsRunning=!1},startAnimationLoop:function(){var e=this;if(e._private.animationsRunning=!0,e.styleEnabled()){var t=e.renderer();t&&t.beforeRender?t.beforeRender(function(t,n){ma(n,e)},t.beforeRenderPriorities.animations):function t(){e._private.animationsRunning&&oe(function(n){ma(n,e),t()})}()}}},xa={qualifierCompare:function(e,t){return null==e||null==t?null==e&&null==t:e.sameText(t)},eventMatches:function(e,t,n){var r=t.qualifier;return null==r||e!==n.target&&b(n.target)&&r.matches(n.target)},addEventFields:function(e,t){t.cy=e,t.target=e},callbackContext:function(e,t,n){return null!=t.qualifier?n.target:e}},wa=function(e){return d(e)?new Mr(e):e},Ea={createEmitter:function(){var e=this._private;return e.emitter||(e.emitter=new ki(xa,this)),this},emitter:function(){return this._private.emitter},on:function(e,t,n){return this.emitter().on(e,wa(t),n),this},removeListener:function(e,t,n){return this.emitter().removeListener(e,wa(t),n),this},one:function(e,t,n){return this.emitter().one(e,wa(t),n),this},once:function(e,t,n){return this.emitter().one(e,wa(t),n),this},emit:function(e,t){return this.emitter().emit(e,t),this},emitAndNotify:function(e,t){return this.emit(e),this.notify(e,t),this}};Hn.eventAliasesOn(Ea);var ka={png:function(e){return e=e||{},this._private.renderer.png(e)},jpg:function(e){var t=this._private.renderer;return(e=e||{}).bg=e.bg||"#fff",t.jpg(e)}};ka.jpeg=ka.jpg;var Ca={layout:function(e){if(null!=e)if(null!=e.name){var t=e.name,n=this.extension("layout",t);if(null!=n){var r;r=d(e.eles)?this.$(e.eles):null!=e.eles?e.eles:this.$();var i=new n(I({},e,{cy:this,eles:r}));return i}we("No such layout `"+t+"` found.  Did you forget to import it and `cytoscape.use()` it?")}else we("A `name` must be specified to make a layout");else we("Layout options must be specified to make a layout")}};Ca.createLayout=Ca.makeLayout=Ca.layout;var Sa={notify:function(e,t){var n=this._private;if(this.batching()){n.batchNotifications=n.batchNotifications||{};var r=n.batchNotifications[e]=n.batchNotifications[e]||this.collection();null!=t&&r.merge(t)}else if(n.notificationsEnabled){var i=this.renderer();!this.isDestroyed()&&i&&i.notify(e,t)}},notifications:function(e){var t=this._private;return void 0===e?t.notificationsEnabled:(t.notificationsEnabled=!!e,this)},noNotifications:function(e){this.notifications(!1),e(),this.notifications(!0)},batching:function(){return this._private.batchCount>0},startBatch:function(){var e=this._private;return null==e.batchCount&&(e.batchCount=0),0===e.batchCount&&(e.batchStyleEles=this.collection(),e.batchNotifications={}),e.batchCount++,this},endBatch:function(){var e=this._private;if(0===e.batchCount)return this;if(e.batchCount--,0===e.batchCount){e.batchStyleEles.updateStyle();var t=this.renderer();Object.keys(e.batchNotifications).forEach(function(n){var r=e.batchNotifications[n];r.empty()?t.notify(n):t.notify(n,r)})}return this},batch:function(e){return this.startBatch(),e(),this.endBatch(),this},batchData:function(e){var t=this;return this.batch(function(){for(var n=Object.keys(e),r=0;r<n.length;r++){var i=n[r],a=e[i];t.getElementById(i).data(a)}})}},Da=Te({motionBlur:!1,motionBlurOpacity:.05,pixelRatio:void 0,desktopTapThreshold:4,touchTapThreshold:8,wheelSensitivity:1}),Ta={renderTo:function(e,t,n,r){return this._private.renderer.renderTo(e,t,n,r),this},renderer:function(){return this._private.renderer},forceRender:function(){return this.notify("draw"),this},resize:function(){return this.invalidateSize(),this.emitAndNotify("resize"),this},initRenderer:function(e){var t=this.extension("renderer",e.name);if(null!=t){void 0!==e.wheelSensitivity&&Ee("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");var n=Da(e);n.cy=this,this._private.renderer=new t(n),this.notify("init")}else we("Can not initialise: No such renderer `".concat(e.name,"` found. Did you forget to import it and `cytoscape.use()` it?"))},destroyRenderer:function(){this.notify("destroy");var e=this.container();if(e)for(e._cyreg=null;e.childNodes.length>0;)e.removeChild(e.childNodes[0]);this._private.renderer=null,this.mutableElements().forEach(function(e){var t=e._private;t.rscratch={},t.rstyle={},t.animation.current=[],t.animation.queue=[]})},onRender:function(e){return this.on("render",e)},offRender:function(e){return this.off("render",e)}};Ta.invalidateDimensions=Ta.resize;var Pa={collection:function(e,t){return d(e)?this.$(e):m(e)?e.collection():f(e)?new aa(this,e,t):new aa(this)},nodes:function(e){var t=this.$(function(e){return e.isNode()});return e?t.filter(e):t},edges:function(e){var t=this.$(function(e){return e.isEdge()});return e?t.filter(e):t},$:function(e){var t=this._private.elements;return e?t.filter(e):t.spawnSelf()},mutableElements:function(){return this._private.elements}};Pa.elements=Pa.filter=Pa.$;var Ma={};Ma.apply=function(e){var t=this._private,n=t.cy.collection();t.newStyle&&(t.contextStyles={},t.propDiffs={},this.cleanElements(e,!0));for(var r=0;r<e.length;r++){var i=e[r],a=this.getContextMeta(i);if(!a.empty){var o=this.getContextStyle(a),s=this.applyContextStyle(a,o,i);t.newStyle||this.updateTransitions(i,s.diffProps),this.updateStyleHints(i)&&n.merge(i)}}return t.newStyle=!1,n},Ma.getPropertiesDiff=function(e,t){var n=this._private.propDiffs=this._private.propDiffs||{},r=e+"-"+t,i=n[r];if(i)return i;for(var a=[],o={},s=0;s<this.length;s++){var l=this[s],u="t"===e[s],c="t"===t[s],h=u!==c,d=l.mappedProperties.length>0;if(h||c&&d){var p=void 0;h&&d?p=l.properties:h?p=l.properties:d&&(p=l.mappedProperties);for(var f=0;f<p.length;f++){for(var g=p[f],v=g.name,y=!1,m=s+1;m<this.length;m++){var b=this[m];if("t"===t[m]&&(y=null!=b.properties[g.name]))break}o[v]||y||(o[v]=!0,a.push(v))}}}return n[r]=a,a},Ma.getContextMeta=function(e){var t,n="",r=e._private.styleCxtKey||"";this._private.newStyle&&(r="");for(var i=0;i<this.length;i++){var a=this[i];n+=a.selector&&a.selector.matches(e)?"t":"f"}return t=this.getPropertiesDiff(r,n),e._private.styleCxtKey=n,{key:n,diffPropNames:t,empty:0===t.length}},Ma.getContextStyle=function(e){var t=e.key,n=this._private.contextStyles=this._private.contextStyles||{};if(n[t])return n[t];for(var r={_private:{key:t}},i=0;i<this.length;i++){var a=this[i];if("t"===t[i])for(var o=0;o<a.properties.length;o++){var s=a.properties[o];r[s.name]=s}}return n[t]=r,r},Ma.applyContextStyle=function(e,t,n){for(var r=e.diffPropNames,i={},a=this.types,o=0;o<r.length;o++){var s=r[o],l=t[s],u=n.pstyle(s);if(!l){if(!u)continue;l=u.bypass?{name:s,deleteBypassed:!0}:{name:s,delete:!0}}if(u!==l&&(l.mapped!==a.fn||u.mapping!==l||(l.fnValue=l.value(n),l.fnValue!==l.prevFnValue))){var c=i[s]={prev:u};this.applyParsedProperty(n,l),c.next=n.pstyle(s),c.next&&c.next.bypass&&(c.next=c.next.bypassed)}}return{diffProps:i}},Ma.updateStyleHints=function(e){var t=e._private,n=this,r=n.propertyGroupNames,i=n.propertyGroupKeys,a=function(e,t,r){return n.getPropertiesHash(e,t,r)},o=t.styleKey;if(e.removed())return!1;var s="nodes"===t.group,l=e._private.style;r=Object.keys(l);for(var u=0;u<i.length;u++){var c=i[u];t.styleKeys[c]=0}for(var h=function(e,n){return t.styleKeys[n]=ue(e,t.styleKeys[n])},d=function(e){return-128<e&&e<128&&Math.floor(e)!==e?-(1024*e|0):e},p=0;p<r.length;p++){var f=r[p],g=l[f];if(null!=g){var v=this.properties[f],y=v.type,m=v.groupKey;if(y.number){var b=null!=g.pfValue?g.pfValue:g.value;if(y.multiple)for(var x=0;x<b.length;x++)h(d(b[x]),m);else h(d(b),m)}else for(var w=g.strValue,E=0;E<w.length;E++)h(w.charCodeAt(E),m)}}for(var k=0,C=0;C<i.length;C++){var S=i[C],D=t.styleKeys[S];k=ue(D,k)}t.styleKey=k;var T=t.labelDimsKey=t.styleKeys.labelDimensions;if(t.labelKey=a(e,["label"],T),t.labelStyleKey=ue(t.styleKeys.commonLabel,t.labelKey),s||(t.sourceLabelKey=a(e,["source-label"],T),t.sourceLabelStyleKey=ue(t.styleKeys.commonLabel,t.sourceLabelKey),t.targetLabelKey=a(e,["target-label"],T),t.targetLabelStyleKey=ue(t.styleKeys.commonLabel,t.targetLabelKey)),s){var P=t.styleKeys,M=P.nodeBody,_=P.nodeBorder,B=P.backgroundImage,N=P.compound,I=P.pie;t.nodeKey=ce([_,B,N,I],M),t.hasPie=0!=I}return o!==t.styleKey},Ma.clearStyleHints=function(e){var t=e._private;t.styleKeys={},t.styleKey=null,t.labelKey=null,t.labelStyleKey=null,t.sourceLabelKey=null,t.sourceLabelStyleKey=null,t.targetLabelKey=null,t.targetLabelStyleKey=null,t.nodeKey=null,t.hasPie=null},Ma.applyParsedProperty=function(e,t){var n,r=this,i=t,a=e._private.style,o=r.types,s=r.properties[i.name].type,l=i.bypass,u=a[i.name],c=u&&u.bypass,h=e._private,d=function(e){return null==e?null:null!=e.pfValue?e.pfValue:e.value},p=function(){var t=d(u),n=d(i);r.checkTriggers(e,i.name,t,n)};if("curve-style"===t.name&&e.isEdge()&&("bezier"!==t.value&&e.isLoop()||"haystack"===t.value&&(e.source().isParent()||e.target().isParent()))&&(i=t=this.parse(t.name,"bezier",l)),i.delete)return a[i.name]=void 0,p(),!0;if(i.deleteBypassed)return u?!!u.bypass&&(u.bypassed=void 0,p(),!0):(p(),!0);if(i.deleteBypass)return u?!!u.bypass&&(a[i.name]=u.bypassed,p(),!0):(p(),!0);var f=function(){Ee("Do not assign mappings to elements without corresponding data (i.e. ele `"+e.id()+"` has no mapping for property `"+i.name+"` with data field `"+i.field+"`); try a `["+i.field+"]` selector to limit scope to elements with `"+i.field+"` defined")};switch(i.mapped){case o.mapData:for(var g,y=i.field.split("."),m=h.data,b=0;b<y.length&&m;b++){m=m[y[b]]}if(null==m)return f(),!1;if(!v(m))return Ee("Do not use continuous mappers without specifying numeric data (i.e. `"+i.field+": "+m+"` for `"+e.id()+"` is non-numeric)"),!1;var x=i.fieldMax-i.fieldMin;if((g=0===x?0:(m-i.fieldMin)/x)<0?g=0:g>1&&(g=1),s.color){var w=i.valueMin[0],E=i.valueMax[0],k=i.valueMin[1],C=i.valueMax[1],S=i.valueMin[2],D=i.valueMax[2],T=null==i.valueMin[3]?1:i.valueMin[3],P=null==i.valueMax[3]?1:i.valueMax[3],M=[Math.round(w+(E-w)*g),Math.round(k+(C-k)*g),Math.round(S+(D-S)*g),Math.round(T+(P-T)*g)];n={bypass:i.bypass,name:i.name,value:M,strValue:"rgb("+M[0]+", "+M[1]+", "+M[2]+")"}}else{if(!s.number)return!1;var _=i.valueMin+(i.valueMax-i.valueMin)*g;n=this.parse(i.name,_,i.bypass,"mapping")}if(!n)return f(),!1;n.mapping=i,i=n;break;case o.data:for(var B=i.field.split("."),N=h.data,I=0;I<B.length&&N;I++){N=N[B[I]]}if(null!=N&&(n=this.parse(i.name,N,i.bypass,"mapping")),!n)return f(),!1;n.mapping=i,i=n;break;case o.fn:var A=i.value,z=i.fnValue||A(e);if(i.prevFnValue=z,null==z)return Ee("Custom function mappers may not return null (i.e. `"+i.name+"` for ele `"+e.id()+"` is null)"),!1;if(!(n=this.parse(i.name,z,i.bypass,"mapping")))return Ee("Custom function mappers may not return invalid values for the property type (i.e. `"+i.name+"` for ele `"+e.id()+"` is invalid)"),!1;n.mapping=i,i=n;break;case void 0:break;default:return!1}return l?(i.bypassed=c?u.bypassed:u,a[i.name]=i):c?u.bypassed=i:a[i.name]=i,p(),!0},Ma.cleanElements=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(this.clearStyleHints(r),r.dirtyCompoundBoundsCache(),r.dirtyBoundingBoxCache(),t)for(var i=r._private.style,a=Object.keys(i),o=0;o<a.length;o++){var s=a[o],l=i[s];null!=l&&(l.bypass?l.bypassed=null:i[s]=null)}else r._private.style={}}},Ma.update=function(){this._private.cy.mutableElements().updateStyle()},Ma.updateTransitions=function(e,t){var n=this,r=e._private,i=e.pstyle("transition-property").value,a=e.pstyle("transition-duration").pfValue,o=e.pstyle("transition-delay").pfValue;if(i.length>0&&a>0){for(var s={},l=!1,u=0;u<i.length;u++){var c=i[u],h=e.pstyle(c),d=t[c];if(d){var p=d.prev,g=null!=d.next?d.next:h,y=!1,m=void 0;p&&(v(p.pfValue)&&v(g.pfValue)?(y=g.pfValue-p.pfValue,m=p.pfValue+1e-6*y):v(p.value)&&v(g.value)?(y=g.value-p.value,m=p.value+1e-6*y):f(p.value)&&f(g.value)&&(y=p.value[0]!==g.value[0]||p.value[1]!==g.value[1]||p.value[2]!==g.value[2],m=p.strValue),y&&(s[c]=g.strValue,this.applyBypass(e,c,m),l=!0))}}if(!l)return;r.transitioning=!0,new Xn(function(t){o>0?e.delayAnimation(o).play().promise().then(t):t()}).then(function(){return e.animation({style:s,duration:a,easing:e.pstyle("transition-timing-function").value,queue:!1}).play().promise()}).then(function(){n.removeBypasses(e,i),e.emitAndNotify("style"),r.transitioning=!1})}else r.transitioning&&(this.removeBypasses(e,i),e.emitAndNotify("style"),r.transitioning=!1)},Ma.checkTrigger=function(e,t,n,r,i,a){var o=i(this.properties[t]);null!=o&&o(n,r)&&a()},Ma.checkZOrderTrigger=function(e,t,n,r){var i=this;this.checkTrigger(e,t,n,r,function(e){return e.triggersZOrder},function(){i._private.cy.notify("zorder",e)})},Ma.checkBoundsTrigger=function(e,t,n,r){this.checkTrigger(e,t,n,r,function(e){return e.triggersBounds},function(){e.dirtyCompoundBoundsCache(),e.dirtyBoundingBoxCache()})},Ma.checkTriggers=function(e,t,n,r){e.dirtyStyleCache(),this.checkZOrderTrigger(e,t,n,r),this.checkBoundsTrigger(e,t,n,r)};var _a={applyBypass:function(e,t,n,r){var i=[];if("*"===t||"**"===t){if(void 0!==n)for(var a=0;a<this.properties.length;a++){var o=this.properties[a].name,s=this.parse(o,n,!0);s&&i.push(s)}}else if(d(t)){var l=this.parse(t,n,!0);l&&i.push(l)}else{if(!g(t))return!1;var u=t;r=n;for(var c=Object.keys(u),h=0;h<c.length;h++){var p=c[h],f=u[p];if(void 0===f&&(f=u[P(p)]),void 0!==f){var v=this.parse(p,f,!0);v&&i.push(v)}}}if(0===i.length)return!1;for(var y=!1,m=0;m<e.length;m++){for(var b=e[m],x={},w=void 0,E=0;E<i.length;E++){var k=i[E];if(r){var C=b.pstyle(k.name);w=x[k.name]={prev:C}}y=this.applyParsedProperty(b,k)||y,r&&(w.next=b.pstyle(k.name))}y&&this.updateStyleHints(b),r&&this.updateTransitions(b,x,!0)}return y},overrideBypass:function(e,t,n){t=T(t);for(var r=0;r<e.length;r++){var i=e[r],a=i._private.style[t],o=this.properties[t].type,s=o.color,l=o.mutiple,u=a?null!=a.pfValue?a.pfValue:a.value:null;a&&a.bypass?(a.value=n,null!=a.pfValue&&(a.pfValue=n),a.strValue=s?"rgb("+n.join(",")+")":l?n.join(" "):""+n,this.updateStyleHints(i)):this.applyBypass(i,t,n),this.checkTriggers(i,t,u,n)}},removeAllBypasses:function(e,t){return this.removeBypasses(e,this.propertyNames,t)},removeBypasses:function(e,t,n){for(var r=0;r<e.length;r++){for(var i=e[r],a={},o=0;o<t.length;o++){var s=t[o],l=this.properties[s],u=i.pstyle(l.name);if(u&&u.bypass){var c=this.parse(s,"",!0),h=a[l.name]={prev:u};this.applyParsedProperty(i,c),h.next=i.pstyle(l.name)}}this.updateStyleHints(i),n&&this.updateTransitions(i,a,!0)}}},Ba={getEmSizeInPixels:function(){var e=this.containerCss("font-size");return null!=e?parseFloat(e):1},containerCss:function(e){var t=this._private.cy.container();if(a&&t&&a.getComputedStyle)return a.getComputedStyle(t).getPropertyValue(e)}},Na={getRenderedStyle:function(e,t){return t?this.getStylePropertyValue(e,t,!0):this.getRawStyle(e,!0)},getRawStyle:function(e,t){if(e=e[0]){for(var n={},r=0;r<this.properties.length;r++){var i=this.properties[r],a=this.getStylePropertyValue(e,i.name,t);null!=a&&(n[i.name]=a,n[P(i.name)]=a)}return n}},getIndexedStyle:function(e,t,n,r){var i=e.pstyle(t)[n][r];return null!=i?i:e.cy().style().getDefaultProperty(t)[n][0]},getStylePropertyValue:function(e,t,n){if(e=e[0]){var r=this.properties[t];r.alias&&(r=r.pointsTo);var i=r.type,a=e.pstyle(r.name);if(a){var o=a.value,s=a.units,l=a.strValue;if(n&&i.number&&null!=o&&v(o)){var u=e.cy().zoom(),c=function(e){return e*u},h=function(e,t){return c(e)+t},p=f(o);return(p?s.every(function(e){return null!=e}):null!=s)?p?o.map(function(e,t){return h(e,s[t])}).join(" "):h(o,s):p?o.map(function(e){return d(e)?e:""+c(e)}).join(" "):""+c(o)}if(null!=l)return l}return null}},getAnimationStartStyle:function(e,t){for(var n={},r=0;r<t.length;r++){var i=t[r].name,a=e.pstyle(i);void 0!==a&&(a=g(a)?this.parse(i,a.strValue):this.parse(i,a)),a&&(n[i]=a)}return n},getPropsList:function(e){var t=[],n=e,r=this.properties;if(n)for(var i=Object.keys(n),a=0;a<i.length;a++){var o=i[a],s=n[o],l=r[o]||r[T(o)],u=this.parse(l.name,s);u&&t.push(u)}return t},getNonDefaultPropertiesHash:function(e,t,n){var r,i,a,o,s,l,u=n;for(s=0;s<t.length;s++)if(r=t[s],null!=(i=e.pstyle(r,!1)))if(null!=i.pfValue)u=ue(o,u);else for(a=i.strValue,l=0;l<a.length;l++)o=a.charCodeAt(l),u=ue(o,u);return u}};Na.getPropertiesHash=Na.getNonDefaultPropertiesHash;var Ia={appendFromJson:function(e){for(var t=0;t<e.length;t++){var n=e[t],r=n.selector,i=n.style||n.css,a=Object.keys(i);this.selector(r);for(var o=0;o<a.length;o++){var s=a[o],l=i[s];this.css(s,l)}}return this},fromJson:function(e){return this.resetToDefault(),this.appendFromJson(e),this},json:function(){for(var e=[],t=this.defaultLength;t<this.length;t++){for(var n=this[t],r=n.selector,i=n.properties,a={},o=0;o<i.length;o++){var s=i[o];a[s.name]=s.strValue}e.push({selector:r?r.toString():"core",style:a})}return e}},Aa={appendFromString:function(e){var t,n,r,i=""+e;function a(){i=i.length>t.length?i.substr(t.length):""}function o(){n=n.length>r.length?n.substr(r.length):""}for(i=i.replace(/[\/][*](\s|.)+?[*][\/]/g,"");;){if(i.match(/^\s*$/))break;var s=i.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);if(!s){Ee("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: "+i);break}t=s[0];var l=s[1];if("core"!==l)if(new Mr(l).invalid){Ee("Skipping parsing of block: Invalid selector found in string stylesheet: "+l),a();continue}var u=s[2],c=!1;n=u;for(var h=[];;){if(n.match(/^\s*$/))break;var d=n.match(/^\s*(.+?)\s*:\s*(.+?)\s*;/);if(!d){Ee("Skipping parsing of block: Invalid formatting of style property and value definitions found in:"+u),c=!0;break}r=d[0];var p=d[1],f=d[2];if(this.properties[p])this.parse(p,f)?(h.push({name:p,val:f}),o()):(Ee("Skipping property: Invalid property definition in: "+r),o());else Ee("Skipping property: Invalid property name in: "+r),o()}if(c){a();break}this.selector(l);for(var g=0;g<h.length;g++){var v=h[g];this.css(v.name,v.val)}a()}return this},fromString:function(e){return this.resetToDefault(),this.appendFromString(e),this}},za={};!function(){var e=B,t=function(e){return"^"+e+"\\s*\\(\\s*([\\w\\.]+)\\s*\\)$"},n=function(t){var n=e+"|\\w+|rgb[a]?\\((?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%]?)(?:\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))))?\\)|hsl[a]?\\((?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?)))\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%])\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))[%])(?:\\s*,\\s*(?:(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))))?\\)|\\#[0-9a-fA-F]{3}|\\#[0-9a-fA-F]{6}";return"^"+t+"\\s*\\(([\\w\\.]+)\\s*\\,\\s*("+e+")\\s*\\,\\s*("+e+")\\s*,\\s*("+n+")\\s*\\,\\s*("+n+")\\)$"},r=["^url\\s*\\(\\s*['\"]?(.+?)['\"]?\\s*\\)$","^(none)$","^(.+)$"];za.types={time:{number:!0,min:0,units:"s|ms",implicitUnits:"ms"},percent:{number:!0,min:0,max:100,units:"%",implicitUnits:"%"},percentages:{number:!0,min:0,max:100,units:"%",implicitUnits:"%",multiple:!0},zeroOneNumber:{number:!0,min:0,max:1,unitless:!0},zeroOneNumbers:{number:!0,min:0,max:1,unitless:!0,multiple:!0},nOneOneNumber:{number:!0,min:-1,max:1,unitless:!0},nonNegativeInt:{number:!0,min:0,integer:!0,unitless:!0},position:{enums:["parent","origin"]},nodeSize:{number:!0,min:0,enums:["label"]},number:{number:!0,unitless:!0},numbers:{number:!0,unitless:!0,multiple:!0},positiveNumber:{number:!0,unitless:!0,min:0,strictMin:!0},size:{number:!0,min:0},bidirectionalSize:{number:!0},bidirectionalSizes:{number:!0,multiple:!0},sizeMaybePercent:{number:!0,min:0,allowPercent:!0},paddingRelativeTo:{enums:["width","height","average","min","max"]},bgWH:{number:!0,min:0,allowPercent:!0,enums:["auto"],multiple:!0},bgPos:{number:!0,allowPercent:!0,multiple:!0},bgRelativeTo:{enums:["inner","include-padding"],multiple:!0},bgRepeat:{enums:["repeat","repeat-x","repeat-y","no-repeat"],multiple:!0},bgFit:{enums:["none","contain","cover"],multiple:!0},bgCrossOrigin:{enums:["anonymous","use-credentials"],multiple:!0},bgClip:{enums:["none","node"]},color:{color:!0},colors:{color:!0,multiple:!0},fill:{enums:["solid","linear-gradient","radial-gradient"]},bool:{enums:["yes","no"]},lineStyle:{enums:["solid","dotted","dashed"]},lineCap:{enums:["butt","round","square"]},borderStyle:{enums:["solid","dotted","dashed","double"]},curveStyle:{enums:["bezier","unbundled-bezier","haystack","segments","straight"]},fontFamily:{regex:'^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'},fontStyle:{enums:["italic","normal","oblique"]},fontWeight:{enums:["normal","bold","bolder","lighter","100","200","300","400","500","600","800","900",100,200,300,400,500,600,700,800,900]},textDecoration:{enums:["none","underline","overline","line-through"]},textTransform:{enums:["none","uppercase","lowercase"]},textWrap:{enums:["none","wrap","ellipsis"]},textBackgroundShape:{enums:["rectangle","roundrectangle","round-rectangle"]},nodeShape:{enums:["rectangle","roundrectangle","round-rectangle","cutrectangle","cut-rectangle","bottomroundrectangle","bottom-round-rectangle","barrel","ellipse","triangle","square","pentagon","hexagon","concavehexagon","concave-hexagon","heptagon","octagon","tag","star","diamond","vee","rhomboid","polygon"]},compoundIncludeLabels:{enums:["include","exclude"]},arrowShape:{enums:["tee","triangle","triangle-tee","triangle-cross","triangle-backcurve","vee","square","circle","diamond","chevron","none"]},arrowFill:{enums:["filled","hollow"]},display:{enums:["element","none"]},visibility:{enums:["hidden","visible"]},zCompoundDepth:{enums:["bottom","orphan","auto","top"]},zIndexCompare:{enums:["auto","manual"]},valign:{enums:["top","center","bottom"]},halign:{enums:["left","center","right"]},text:{string:!0},data:{mapping:!0,regex:t("data")},layoutData:{mapping:!0,regex:t("layoutData")},scratch:{mapping:!0,regex:t("scratch")},mapData:{mapping:!0,regex:n("mapData")},mapLayoutData:{mapping:!0,regex:n("mapLayoutData")},mapScratch:{mapping:!0,regex:n("mapScratch")},fn:{mapping:!0,fn:!0},url:{regexes:r,singleRegexMatchValue:!0},urls:{regexes:r,singleRegexMatchValue:!0,multiple:!0},propList:{propList:!0},angle:{number:!0,units:"deg|rad",implicitUnits:"rad"},textRotation:{number:!0,units:"deg|rad",implicitUnits:"rad",enums:["none","autorotate"]},polygonPointList:{number:!0,multiple:!0,evenMultiple:!0,min:-1,max:1,unitless:!0},edgeDistances:{enums:["intersection","node-position"]},edgeEndpoint:{number:!0,multiple:!0,units:"%|px|em|deg|rad",implicitUnits:"px",enums:["inside-to-node","outside-to-node","outside-to-node-or-label","outside-to-line","outside-to-line-or-label"],singleEnum:!0,validate:function(e,t){switch(e.length){case 2:return"deg"!==t[0]&&"rad"!==t[0]&&"deg"!==t[1]&&"rad"!==t[1];case 1:return d(e[0])||"deg"===t[0]||"rad"===t[0];default:return!1}}},easing:{regexes:["^(spring)\\s*\\(\\s*("+e+")\\s*,\\s*("+e+")\\s*\\)$","^(cubic-bezier)\\s*\\(\\s*("+e+")\\s*,\\s*("+e+")\\s*,\\s*("+e+")\\s*,\\s*("+e+")\\s*\\)$"],enums:["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine","ease-out-sine","ease-in-out-sine","ease-in-quad","ease-out-quad","ease-in-out-quad","ease-in-cubic","ease-out-cubic","ease-in-out-cubic","ease-in-quart","ease-out-quart","ease-in-out-quart","ease-in-quint","ease-out-quint","ease-in-out-quint","ease-in-expo","ease-out-expo","ease-in-out-expo","ease-in-circ","ease-out-circ","ease-in-out-circ"]},gradientDirection:{enums:["to-bottom","to-top","to-left","to-right","to-bottom-right","to-bottom-left","to-top-right","to-top-left","to-right-bottom","to-left-bottom","to-right-top","to-left-top"]}};var i={zeroNonZero:function(e,t){return(null==e||null==t)&&e!==t||(0==e&&0!=t||0!=e&&0==t)},any:function(e,t){return e!=t}},a=za.types,o=[{name:"label",type:a.text,triggersBounds:i.any},{name:"text-rotation",type:a.textRotation,triggersBounds:i.any},{name:"text-margin-x",type:a.bidirectionalSize,triggersBounds:i.any},{name:"text-margin-y",type:a.bidirectionalSize,triggersBounds:i.any}],s=[{name:"source-label",type:a.text,triggersBounds:i.any},{name:"source-text-rotation",type:a.textRotation,triggersBounds:i.any},{name:"source-text-margin-x",type:a.bidirectionalSize,triggersBounds:i.any},{name:"source-text-margin-y",type:a.bidirectionalSize,triggersBounds:i.any},{name:"source-text-offset",type:a.size,triggersBounds:i.any}],l=[{name:"target-label",type:a.text,triggersBounds:i.any},{name:"target-text-rotation",type:a.textRotation,triggersBounds:i.any},{name:"target-text-margin-x",type:a.bidirectionalSize,triggersBounds:i.any},{name:"target-text-margin-y",type:a.bidirectionalSize,triggersBounds:i.any},{name:"target-text-offset",type:a.size,triggersBounds:i.any}],u=[{name:"font-family",type:a.fontFamily,triggersBounds:i.any},{name:"font-style",type:a.fontStyle,triggersBounds:i.any},{name:"font-weight",type:a.fontWeight,triggersBounds:i.any},{name:"font-size",type:a.size,triggersBounds:i.any},{name:"text-transform",type:a.textTransform,triggersBounds:i.any},{name:"text-wrap",type:a.textWrap,triggersBounds:i.any},{name:"text-max-width",type:a.size,triggersBounds:i.any},{name:"text-outline-width",type:a.size,triggersBounds:i.any}],c=[{name:"text-valign",type:a.valign,triggersBounds:i.any},{name:"text-halign",type:a.halign,triggersBounds:i.any},{name:"color",type:a.color},{name:"text-outline-color",type:a.color},{name:"text-outline-opacity",type:a.zeroOneNumber},{name:"text-background-color",type:a.color},{name:"text-background-opacity",type:a.zeroOneNumber},{name:"text-background-padding",type:a.size,triggersBounds:i.any},{name:"text-border-opacity",type:a.zeroOneNumber},{name:"text-border-color",type:a.color},{name:"text-border-width",type:a.size,triggersBounds:i.any},{name:"text-border-style",type:a.borderStyle,triggersBounds:i.any},{name:"text-background-shape",type:a.textBackgroundShape,triggersBounds:i.any}],h=[{name:"events",type:a.bool},{name:"text-events",type:a.bool}],p=[{name:"display",type:a.display,triggersZOrder:i.any,triggersBounds:i.any},{name:"visibility",type:a.visibility,triggersZOrder:i.any},{name:"opacity",type:a.zeroOneNumber,triggersZOrder:i.zeroNonZero},{name:"text-opacity",type:a.zeroOneNumber},{name:"min-zoomed-font-size",type:a.size},{name:"z-compound-depth",type:a.zCompoundDepth,triggersZOrder:i.any},{name:"z-index-compare",type:a.zIndexCompare,triggersZOrder:i.any},{name:"z-index",type:a.nonNegativeInt,triggersZOrder:i.any}],f=[{name:"overlay-padding",type:a.size,triggersBounds:i.any},{name:"overlay-color",type:a.color},{name:"overlay-opacity",type:a.zeroOneNumber,triggersBounds:i.zeroNonZero}],g=[{name:"transition-property",type:a.propList},{name:"transition-duration",type:a.time},{name:"transition-delay",type:a.time},{name:"transition-timing-function",type:a.easing}],v=[{name:"height",type:a.nodeSize,triggersBounds:i.any},{name:"width",type:a.nodeSize,triggersBounds:i.any},{name:"shape",type:a.nodeShape,triggersBounds:i.any},{name:"shape-polygon-points",type:a.polygonPointList,triggersBounds:i.any},{name:"background-color",type:a.color},{name:"background-fill",type:a.fill},{name:"background-opacity",type:a.zeroOneNumber},{name:"background-blacken",type:a.nOneOneNumber},{name:"background-gradient-stop-colors",type:a.colors},{name:"background-gradient-stop-positions",type:a.percentages},{name:"background-gradient-direction",type:a.gradientDirection},{name:"padding",type:a.sizeMaybePercent,triggersBounds:i.any},{name:"padding-relative-to",type:a.paddingRelativeTo,triggersBounds:i.any},{name:"bounds-expansion",type:a.size,triggersBounds:i.any}],y=[{name:"border-color",type:a.color},{name:"border-opacity",type:a.zeroOneNumber},{name:"border-width",type:a.size,triggersBounds:i.any},{name:"border-style",type:a.borderStyle}],m=[{name:"background-image",type:a.urls},{name:"background-image-crossorigin",type:a.bgCrossOrigin},{name:"background-image-opacity",type:a.zeroOneNumbers},{name:"background-position-x",type:a.bgPos},{name:"background-position-y",type:a.bgPos},{name:"background-width-relative-to",type:a.bgRelativeTo},{name:"background-height-relative-to",type:a.bgRelativeTo},{name:"background-repeat",type:a.bgRepeat},{name:"background-fit",type:a.bgFit},{name:"background-clip",type:a.bgClip},{name:"background-width",type:a.bgWH},{name:"background-height",type:a.bgWH},{name:"background-offset-x",type:a.bgPos},{name:"background-offset-y",type:a.bgPos}],b=[{name:"position",type:a.position,triggersBounds:i.any},{name:"compound-sizing-wrt-labels",type:a.compoundIncludeLabels,triggersBounds:i.any},{name:"min-width",type:a.size,triggersBounds:i.any},{name:"min-width-bias-left",type:a.sizeMaybePercent,triggersBounds:i.any},{name:"min-width-bias-right",type:a.sizeMaybePercent,triggersBounds:i.any},{name:"min-height",type:a.size,triggersBounds:i.any},{name:"min-height-bias-top",type:a.sizeMaybePercent,triggersBounds:i.any},{name:"min-height-bias-bottom",type:a.sizeMaybePercent,triggersBounds:i.any}],x=[{name:"line-style",type:a.lineStyle},{name:"line-color",type:a.color},{name:"line-fill",type:a.fill},{name:"line-cap",type:a.lineCap},{name:"line-dash-pattern",type:a.numbers},{name:"line-dash-offset",type:a.number},{name:"line-gradient-stop-colors",type:a.colors},{name:"line-gradient-stop-positions",type:a.percentages},{name:"curve-style",type:a.curveStyle,triggersBounds:i.any},{name:"haystack-radius",type:a.zeroOneNumber,triggersBounds:i.any},{name:"source-endpoint",type:a.edgeEndpoint,triggersBounds:i.any},{name:"target-endpoint",type:a.edgeEndpoint,triggersBounds:i.any},{name:"control-point-step-size",type:a.size,triggersBounds:i.any},{name:"control-point-distances",type:a.bidirectionalSizes,triggersBounds:i.any},{name:"control-point-weights",type:a.numbers,triggersBounds:i.any},{name:"segment-distances",type:a.bidirectionalSizes,triggersBounds:i.any},{name:"segment-weights",type:a.numbers,triggersBounds:i.any},{name:"edge-distances",type:a.edgeDistances,triggersBounds:i.any},{name:"arrow-scale",type:a.positiveNumber,triggersBounds:i.any},{name:"loop-direction",type:a.angle,triggersBounds:i.any},{name:"loop-sweep",type:a.angle,triggersBounds:i.any},{name:"source-distance-from-node",type:a.size,triggersBounds:i.any},{name:"target-distance-from-node",type:a.size,triggersBounds:i.any}],w=[{name:"ghost",type:a.bool,triggersBounds:i.any},{name:"ghost-offset-x",type:a.bidirectionalSize,triggersBounds:i.any},{name:"ghost-offset-y",type:a.bidirectionalSize,triggersBounds:i.any},{name:"ghost-opacity",type:a.zeroOneNumber}],E=[{name:"selection-box-color",type:a.color},{name:"selection-box-opacity",type:a.zeroOneNumber},{name:"selection-box-border-color",type:a.color},{name:"selection-box-border-width",type:a.size},{name:"active-bg-color",type:a.color},{name:"active-bg-opacity",type:a.zeroOneNumber},{name:"active-bg-size",type:a.size},{name:"outside-texture-bg-color",type:a.color},{name:"outside-texture-bg-opacity",type:a.zeroOneNumber}],k=[];za.pieBackgroundN=16,k.push({name:"pie-size",type:a.sizeMaybePercent});for(var C=1;C<=za.pieBackgroundN;C++)k.push({name:"pie-"+C+"-background-color",type:a.color}),k.push({name:"pie-"+C+"-background-size",type:a.percent}),k.push({name:"pie-"+C+"-background-opacity",type:a.zeroOneNumber});var S=[],D=za.arrowPrefixes=["source","mid-source","target","mid-target"];[{name:"arrow-shape",type:a.arrowShape},{name:"arrow-color",type:a.color},{name:"arrow-fill",type:a.arrowFill}].forEach(function(e){D.forEach(function(t){var n=t+"-"+e.name,r=e.type;S.push({name:n,type:r})})},{});var T=za.properties=h.concat(g,p,f,w,c,u,o,s,l,v,y,m,k,b,x,S,E),P=za.propertyGroups={behavior:h,transition:g,visibility:p,overlay:f,ghost:w,commonLabel:c,labelDimensions:u,mainLabel:o,sourceLabel:s,targetLabel:l,nodeBody:v,nodeBorder:y,backgroundImage:m,pie:k,compound:b,edgeLine:x,edgeArrow:S,core:E},M=za.propertyGroupNames={};(za.propertyGroupKeys=Object.keys(P)).forEach(function(e){M[e]=P[e].map(function(e){return e.name}),P[e].forEach(function(t){return t.groupKey=e})});var _=za.aliases=[{name:"content",pointsTo:"label"},{name:"control-point-distance",pointsTo:"control-point-distances"},{name:"control-point-weight",pointsTo:"control-point-weights"},{name:"edge-text-rotation",pointsTo:"text-rotation"},{name:"padding-left",pointsTo:"padding"},{name:"padding-right",pointsTo:"padding"},{name:"padding-top",pointsTo:"padding"},{name:"padding-bottom",pointsTo:"padding"}];za.propertyNames=T.map(function(e){return e.name});for(var N=0;N<T.length;N++){var I=T[N];T[I.name]=I}for(var A=0;A<_.length;A++){var z=_[A],L=T[z.pointsTo],O={name:z.name,alias:!0,pointsTo:L};T.push(O),T[z.name]=O}}(),za.getDefaultProperty=function(e){return this.getDefaultProperties()[e]},za.getDefaultProperties=function(){var e=this._private;if(null!=e.defaultProperties)return e.defaultProperties;for(var t=I({"selection-box-color":"#ddd","selection-box-opacity":.65,"selection-box-border-color":"#aaa","selection-box-border-width":1,"active-bg-color":"black","active-bg-opacity":.15,"active-bg-size":30,"outside-texture-bg-color":"#000","outside-texture-bg-opacity":.125,events:"yes","text-events":"no","text-valign":"top","text-halign":"center",color:"#000","text-outline-color":"#000","text-outline-width":0,"text-outline-opacity":1,"text-opacity":1,"text-decoration":"none","text-transform":"none","text-wrap":"none","text-max-width":9999,"text-background-color":"#000","text-background-opacity":0,"text-background-shape":"rectangle","text-background-padding":0,"text-border-opacity":0,"text-border-width":0,"text-border-style":"solid","text-border-color":"#000","font-family":"Helvetica Neue, Helvetica, sans-serif","font-style":"normal","font-weight":"normal","font-size":16,"min-zoomed-font-size":0,"text-rotation":"none","source-text-rotation":"none","target-text-rotation":"none",visibility:"visible",display:"element",opacity:1,"z-compound-depth":"auto","z-index-compare":"auto","z-index":0,label:"","text-margin-x":0,"text-margin-y":0,"source-label":"","source-text-offset":0,"source-text-margin-x":0,"source-text-margin-y":0,"target-label":"","target-text-offset":0,"target-text-margin-x":0,"target-text-margin-y":0,"overlay-opacity":0,"overlay-color":"#000","overlay-padding":10,"transition-property":"none","transition-duration":0,"transition-delay":0,"transition-timing-function":"linear","background-blacken":0,"background-color":"#999","background-fill":"solid","background-opacity":1,"background-image":"none","background-image-crossorigin":"anonymous","background-image-opacity":1,"background-position-x":"50%","background-position-y":"50%","background-offset-x":0,"background-offset-y":0,"background-width-relative-to":"include-padding","background-height-relative-to":"include-padding","background-repeat":"no-repeat","background-fit":"none","background-clip":"node","background-width":"auto","background-height":"auto","border-color":"#000","border-opacity":1,"border-width":0,"border-style":"solid",height:30,width:30,shape:"ellipse","shape-polygon-points":"-1, -1,   1, -1,   1, 1,   -1, 1","bounds-expansion":0,"background-gradient-direction":"to-bottom","background-gradient-stop-colors":"#999","background-gradient-stop-positions":"0%",ghost:"no","ghost-offset-y":0,"ghost-offset-x":0,"ghost-opacity":0,padding:0,"padding-relative-to":"width",position:"origin","compound-sizing-wrt-labels":"include","min-width":0,"min-width-bias-left":0,"min-width-bias-right":0,"min-height":0,"min-height-bias-top":0,"min-height-bias-bottom":0},{"pie-size":"100%"},[{name:"pie-{{i}}-background-color",value:"black"},{name:"pie-{{i}}-background-size",value:"0%"},{name:"pie-{{i}}-background-opacity",value:1}].reduce(function(e,t){for(var n=1;n<=za.pieBackgroundN;n++){var r=t.name.replace("{{i}}",n),i=t.value;e[r]=i}return e},{}),{"line-style":"solid","line-color":"#999","line-fill":"solid","line-cap":"butt","line-gradient-stop-colors":"#999","line-gradient-stop-positions":"0%","control-point-step-size":40,"control-point-weights":.5,"segment-weights":.5,"segment-distances":20,"edge-distances":"intersection","curve-style":"haystack","haystack-radius":0,"arrow-scale":1,"loop-direction":"-45deg","loop-sweep":"-90deg","source-distance-from-node":0,"target-distance-from-node":0,"source-endpoint":"outside-to-node","target-endpoint":"outside-to-node","line-dash-pattern":[6,3],"line-dash-offset":0},[{name:"arrow-shape",value:"none"},{name:"arrow-color",value:"#999"},{name:"arrow-fill",value:"filled"}].reduce(function(e,t){return za.arrowPrefixes.forEach(function(n){var r=n+"-"+t.name,i=t.value;e[r]=i}),e},{})),n={},r=0;r<this.properties.length;r++){var i=this.properties[r];if(!i.pointsTo){var a=i.name,o=t[a],s=this.parse(a,o);n[a]=s}}return e.defaultProperties=n,e.defaultProperties},za.addDefaultStylesheet=function(){this.selector(":parent").css({shape:"rectangle",padding:10,"background-color":"#eee","border-color":"#ccc","border-width":1}).selector("edge").css({width:3}).selector(":loop").css({"curve-style":"bezier"}).selector("edge:compound").css({"curve-style":"bezier","source-endpoint":"outside-to-line","target-endpoint":"outside-to-line"}).selector(":selected").css({"background-color":"#0169D9","line-color":"#0169D9","source-arrow-color":"#0169D9","target-arrow-color":"#0169D9","mid-source-arrow-color":"#0169D9","mid-target-arrow-color":"#0169D9"}).selector(":parent:selected").css({"background-color":"#CCE1F9","border-color":"#aec8e5"}).selector(":active").css({"overlay-color":"black","overlay-padding":10,"overlay-opacity":.25}),this.defaultLength=this.length};var La={parse:function(e,t,n,r){if(p(t))return this.parseImplWarn(e,t,n,r);var i,a=de(e,""+t,n?"t":"f","mapping"===r||!0===r||!1===r||null==r?"dontcare":r),o=this.propCache=this.propCache||[];return(i=o[a])||(i=o[a]=this.parseImplWarn(e,t,n,r)),(n||"mapping"===r)&&(i=ke(i))&&(i.value=ke(i.value)),i},parseImplWarn:function(e,t,n,r){var i=this.parseImpl(e,t,n,r);return i||null==t||Ee("The style property `".concat(e,": ").concat(t,"` is invalid")),i}};La.parseImpl=function(e,t,n,r){e=T(e);var i=this.properties[e],a=t,o=this.types;if(!i)return null;if(void 0===t)return null;i.alias&&(i=i.pointsTo,e=i.name);var s=d(t);s&&(t=t.trim());var l,u,c=i.type;if(!c)return null;if(n&&(""===t||null===t))return{name:e,value:t,bypass:!0,deleteBypass:!0};if(p(t))return{name:e,value:t,strValue:"fn",mapped:o.fn,bypass:n};if(!s||r||t.length<7||"a"!==t[1]);else{if(t.length>=7&&"d"===t[0]&&(l=new RegExp(o.data.regex).exec(t))){if(n)return!1;var h=o.data;return{name:e,value:l,strValue:""+t,mapped:h,field:l[1],bypass:n}}if(t.length>=10&&"m"===t[0]&&(u=new RegExp(o.mapData.regex).exec(t))){if(n)return!1;if(c.multiple)return!1;var g=o.mapData;if(!c.color&&!c.number)return!1;var y=this.parse(e,u[4]);if(!y||y.mapped)return!1;var m=this.parse(e,u[5]);if(!m||m.mapped)return!1;if(y.pfValue===m.pfValue||y.strValue===m.strValue)return Ee("`"+e+": "+t+"` is not a valid mapper because the output range is zero; converting to `"+e+": "+y.strValue+"`"),this.parse(e,y.strValue);if(c.color){var b=y.value,x=m.value;if(!(b[0]!==x[0]||b[1]!==x[1]||b[2]!==x[2]||b[3]!==x[3]&&(null!=b[3]&&1!==b[3]||null!=x[3]&&1!==x[3])))return!1}return{name:e,value:u,strValue:""+t,mapped:g,field:u[1],fieldMin:parseFloat(u[2]),fieldMax:parseFloat(u[3]),valueMin:y.value,valueMax:m.value,bypass:n}}}if(c.multiple&&"multiple"!==r){var w;if(w=s?t.split(/\s+/):f(t)?t:[t],c.evenMultiple&&w.length%2!=0)return null;for(var E=[],k=[],C=[],S="",D=!1,P=0;P<w.length;P++){var M=this.parse(e,w[P],n,"multiple");D=D||d(M.value),E.push(M.value),C.push(null!=M.pfValue?M.pfValue:M.value),k.push(M.units),S+=(P>0?" ":"")+M.strValue}return c.validate&&!c.validate(E,k)?null:c.singleEnum&&D?1===E.length&&d(E[0])?{name:e,value:E[0],strValue:E[0],bypass:n}:null:{name:e,value:E,pfValue:C,strValue:S,bypass:n,units:k}}var _,N,I=function(){for(var r=0;r<c.enums.length;r++){if(c.enums[r]===t)return{name:e,value:t,strValue:""+t,bypass:n}}return null};if(c.number){var z,L="px";if(c.units&&(z=c.units),c.implicitUnits&&(L=c.implicitUnits),!c.unitless)if(s){var O="px|em"+(c.allowPercent?"|\\%":"");z&&(O=z);var R=t.match("^("+B+")("+O+")?$");R&&(t=R[1],z=R[2]||L)}else z&&!c.implicitUnits||(z=L);if(t=parseFloat(t),isNaN(t)&&void 0===c.enums)return null;if(isNaN(t)&&void 0!==c.enums)return t=a,I();if(c.integer&&(!v(N=t)||Math.floor(N)!==N))return null;if(void 0!==c.min&&(t<c.min||c.strictMin&&t===c.min)||void 0!==c.max&&(t>c.max||c.strictMax&&t===c.max))return null;var F={name:e,value:t,strValue:""+t+(z||""),units:z,bypass:n};return c.unitless||"px"!==z&&"em"!==z?F.pfValue=t:F.pfValue="px"!==z&&z?this.getEmSizeInPixels()*t:t,"ms"!==z&&"s"!==z||(F.pfValue="ms"===z?t:1e3*t),"deg"!==z&&"rad"!==z||(F.pfValue="rad"===z?t:(_=t,Math.PI*_/180)),"%"===z&&(F.pfValue=t/100),F}if(c.propList){var V=[],q=""+t;if("none"===q);else{for(var Y=q.split(/\s*,\s*|\s+/),X=0;X<Y.length;X++){var j=Y[X].trim();this.properties[j]?V.push(j):Ee("`"+j+"` is not a valid property name")}if(0===V.length)return null}return{name:e,value:V,strValue:0===V.length?"none":V.join(" "),bypass:n}}if(c.color){var W=A(t);return W?{name:e,value:W,pfValue:W,strValue:"rgb("+W[0]+","+W[1]+","+W[2]+")",bypass:n}:null}if(c.regex||c.regexes){if(c.enums){var H=I();if(H)return H}for(var K=c.regexes?c.regexes:[c.regex],G=0;G<K.length;G++){var Z=new RegExp(K[G]).exec(t);if(Z)return{name:e,value:c.singleRegexMatchValue?Z[1]:Z,strValue:""+t,bypass:n}}return null}return c.string?{name:e,value:""+t,strValue:""+t,bypass:n}:c.enums?I():null};var Oa=function e(t){if(!(this instanceof e))return new e(t);w(t)?(this._private={cy:t,coreStyle:{}},this.length=0,this.resetToDefault()):we("A style must have a core reference")},Ra=Oa.prototype;Ra.instanceString=function(){return"style"},Ra.clear=function(){for(var e=0;e<this.length;e++)this[e]=void 0;return this.length=0,this._private.newStyle=!0,this},Ra.resetToDefault=function(){return this.clear(),this.addDefaultStylesheet(),this},Ra.core=function(e){return this._private.coreStyle[e]||this.getDefaultProperty(e)},Ra.selector=function(e){var t="core"===e?null:new Mr(e),n=this.length++;return this[n]={selector:t,properties:[],mappedProperties:[],index:n},this},Ra.css=function(){var e=arguments;if(1===e.length)for(var t=e[0],n=0;n<this.properties.length;n++){var r=this.properties[n],i=t[r.name];void 0===i&&(i=t[P(r.name)]),void 0!==i&&this.cssRule(r.name,i)}else 2===e.length&&this.cssRule(e[0],e[1]);return this},Ra.style=Ra.css,Ra.cssRule=function(e,t){var n=this.parse(e,t);if(n){var r=this.length-1;this[r].properties.push(n),this[r].properties[n.name]=n,n.name.match(/pie-(\d+)-background-size/)&&n.value&&(this._private.hasPie=!0),n.mapped&&this[r].mappedProperties.push(n),!this[r].selector&&(this._private.coreStyle[n.name]=n)}return this},Ra.append=function(e){return E(e)?e.appendToStyle(this):f(e)?this.appendFromJson(e):d(e)&&this.appendFromString(e),this},Oa.fromJson=function(e,t){var n=new Oa(e);return n.fromJson(t),n},Oa.fromString=function(e,t){return new Oa(e).fromString(t)},[Ma,_a,Ba,Na,Ia,Aa,za,La].forEach(function(e){I(Ra,e)}),Oa.types=Ra.types,Oa.properties=Ra.properties,Oa.propertyGroups=Ra.propertyGroups,Oa.propertyGroupNames=Ra.propertyGroupNames,Oa.propertyGroupKeys=Ra.propertyGroupKeys;var Fa={style:function(e){e&&this.setStyle(e).update();return this._private.style},setStyle:function(e){var t=this._private;return E(e)?t.style=e.generateStyle(this):f(e)?t.style=Oa.fromJson(this,e):d(e)?t.style=Oa.fromString(this,e):t.style=Oa(this),t.style}},Va={autolock:function(e){return void 0===e?this._private.autolock:(this._private.autolock=!!e,this)},autoungrabify:function(e){return void 0===e?this._private.autoungrabify:(this._private.autoungrabify=!!e,this)},autounselectify:function(e){return void 0===e?this._private.autounselectify:(this._private.autounselectify=!!e,this)},selectionType:function(e){var t=this._private;return null==t.selectionType&&(t.selectionType="single"),void 0===e?t.selectionType:("additive"!==e&&"single"!==e||(t.selectionType=e),this)},panningEnabled:function(e){return void 0===e?this._private.panningEnabled:(this._private.panningEnabled=!!e,this)},userPanningEnabled:function(e){return void 0===e?this._private.userPanningEnabled:(this._private.userPanningEnabled=!!e,this)},zoomingEnabled:function(e){return void 0===e?this._private.zoomingEnabled:(this._private.zoomingEnabled=!!e,this)},userZoomingEnabled:function(e){return void 0===e?this._private.userZoomingEnabled:(this._private.userZoomingEnabled=!!e,this)},boxSelectionEnabled:function(e){return void 0===e?this._private.boxSelectionEnabled:(this._private.boxSelectionEnabled=!!e,this)},pan:function(){var e,t,n,r,i,a=arguments,o=this._private.pan;switch(a.length){case 0:return o;case 1:if(d(a[0]))return o[e=a[0]];if(g(a[0])){if(!this._private.panningEnabled)return this;r=(n=a[0]).x,i=n.y,v(r)&&(o.x=r),v(i)&&(o.y=i),this.emit("pan viewport")}break;case 2:if(!this._private.panningEnabled)return this;e=a[0],t=a[1],"x"!==e&&"y"!==e||!v(t)||(o[e]=t),this.emit("pan viewport")}return this.notify("viewport"),this},panBy:function(e,t){var n,r,i,a,o,s=arguments,l=this._private.pan;if(!this._private.panningEnabled)return this;switch(s.length){case 1:g(e)&&(a=(i=s[0]).x,o=i.y,v(a)&&(l.x+=a),v(o)&&(l.y+=o),this.emit("pan viewport"));break;case 2:r=t,"x"!==(n=e)&&"y"!==n||!v(r)||(l[n]+=r),this.emit("pan viewport")}return this.notify("viewport"),this},fit:function(e,t){var n=this.getFitViewport(e,t);if(n){var r=this._private;r.zoom=n.zoom,r.pan=n.pan,this.emit("pan zoom viewport"),this.notify("viewport")}return this},getFitViewport:function(e,t){if(v(e)&&void 0===t&&(t=e,e=void 0),this._private.panningEnabled&&this._private.zoomingEnabled){var n,r;if(d(e)){var i=e;e=this.$(i)}else if(g(r=e)&&v(r.x1)&&v(r.x2)&&v(r.y1)&&v(r.y2)){var a=e;(n={x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2}).w=n.x2-n.x1,n.h=n.y2-n.y1}else m(e)||(e=this.mutableElements());if(!m(e)||!e.empty()){n=n||e.boundingBox();var o,s=this.width(),l=this.height();if(t=v(t)?t:0,!isNaN(s)&&!isNaN(l)&&s>0&&l>0&&!isNaN(n.w)&&!isNaN(n.h)&&n.w>0&&n.h>0)return{zoom:o=(o=(o=Math.min((s-2*t)/n.w,(l-2*t)/n.h))>this._private.maxZoom?this._private.maxZoom:o)<this._private.minZoom?this._private.minZoom:o,pan:{x:(s-o*(n.x1+n.x2))/2,y:(l-o*(n.y1+n.y2))/2}}}}},zoomRange:function(e,t){var n=this._private;if(null==t){var r=e;e=r.min,t=r.max}return v(e)&&v(t)&&e<=t?(n.minZoom=e,n.maxZoom=t):v(e)&&void 0===t&&e<=n.maxZoom?n.minZoom=e:v(t)&&void 0===e&&t>=n.minZoom&&(n.maxZoom=t),this},minZoom:function(e){return void 0===e?this._private.minZoom:this.zoomRange({min:e})},maxZoom:function(e){return void 0===e?this._private.maxZoom:this.zoomRange({max:e})},getZoomedViewport:function(e){var t,n,r=this._private,i=r.pan,a=r.zoom,o=!1;if(r.zoomingEnabled||(o=!0),v(e)?n=e:g(e)&&(n=e.level,null!=e.position?t=Qe(e.position,a,i):null!=e.renderedPosition&&(t=e.renderedPosition),null==t||r.panningEnabled||(o=!0)),n=(n=n>r.maxZoom?r.maxZoom:n)<r.minZoom?r.minZoom:n,o||!v(n)||n===a||null!=t&&(!v(t.x)||!v(t.y)))return null;if(null!=t){var s=i,l=a,u=n;return{zoomed:!0,panned:!0,zoom:u,pan:{x:-u/l*(t.x-s.x)+t.x,y:-u/l*(t.y-s.y)+t.y}}}return{zoomed:!0,panned:!1,zoom:n,pan:i}},zoom:function(e){if(void 0===e)return this._private.zoom;var t=this.getZoomedViewport(e),n=this._private;return null!=t&&t.zoomed?(n.zoom=t.zoom,t.panned&&(n.pan.x=t.pan.x,n.pan.y=t.pan.y),this.emit("zoom"+(t.panned?" pan":"")+" viewport"),this.notify("viewport"),this):this},viewport:function(e){var t=this._private,n=!0,r=!0,i=[],a=!1,o=!1;if(!e)return this;if(v(e.zoom)||(n=!1),g(e.pan)||(r=!1),!n&&!r)return this;if(n){var s=e.zoom;s<t.minZoom||s>t.maxZoom||!t.zoomingEnabled?a=!0:(t.zoom=s,i.push("zoom"))}if(r&&(!a||!e.cancelOnFailedZoom)&&t.panningEnabled){var l=e.pan;v(l.x)&&(t.pan.x=l.x,o=!1),v(l.y)&&(t.pan.y=l.y,o=!1),o||i.push("pan")}return i.length>0&&(i.push("viewport"),this.emit(i.join(" ")),this.notify("viewport")),this},center:function(e){var t=this.getCenterPan(e);return t&&(this._private.pan=t,this.emit("pan viewport"),this.notify("viewport")),this},getCenterPan:function(e,t){if(this._private.panningEnabled){if(d(e)){var n=e;e=this.mutableElements().filter(n)}else m(e)||(e=this.mutableElements());if(0!==e.length){var r=e.boundingBox(),i=this.width(),a=this.height();return{x:(i-(t=void 0===t?this._private.zoom:t)*(r.x1+r.x2))/2,y:(a-t*(r.y1+r.y2))/2}}}},reset:function(){return this._private.panningEnabled&&this._private.zoomingEnabled?(this.viewport({pan:{x:0,y:0},zoom:1}),this):this},invalidateSize:function(){this._private.sizeCache=null},size:function(){var e,t,n=this._private,r=n.container;return n.sizeCache=n.sizeCache||(r?(e=a.getComputedStyle(r),t=function(t){return parseFloat(e.getPropertyValue(t))},{width:r.clientWidth-t("padding-left")-t("padding-right"),height:r.clientHeight-t("padding-top")-t("padding-bottom")}):{width:1,height:1})},width:function(){return this.size().width},height:function(){return this.size().height},extent:function(){var e=this._private.pan,t=this._private.zoom,n=this.renderedExtent(),r={x1:(n.x1-e.x)/t,x2:(n.x2-e.x)/t,y1:(n.y1-e.y)/t,y2:(n.y2-e.y)/t};return r.w=r.x2-r.x1,r.h=r.y2-r.y1,r},renderedExtent:function(){var e=this.width(),t=this.height();return{x1:0,y1:0,x2:e,y2:t,w:e,h:t}}};Va.centre=Va.center,Va.autolockNodes=Va.autolock,Va.autoungrabifyNodes=Va.autoungrabify;var qa=function(e){var t=this,n=(e=I({},e)).container;n&&!y(n)&&y(n[0])&&(n=n[0]);var r=n?n._cyreg:null;(r=r||{})&&r.cy&&(r.cy.destroy(),r={});var i=r.readies=r.readies||[];n&&(n._cyreg=r),r.cy=t;var o=void 0!==a&&void 0!==n&&!e.headless,s=e;s.layout=I({name:o?"grid":"null"},s.layout),s.renderer=I({name:o?"canvas":"null"},s.renderer);var l=function(e,t,n){return void 0!==t?t:void 0!==n?n:e},u=this._private={container:n,ready:!1,options:s,elements:new aa(this),listeners:[],aniEles:new aa(this),scratch:{},layout:null,renderer:null,destroyed:!1,notificationsEnabled:!0,minZoom:1e-50,maxZoom:1e50,zoomingEnabled:l(!0,s.zoomingEnabled),userZoomingEnabled:l(!0,s.userZoomingEnabled),panningEnabled:l(!0,s.panningEnabled),userPanningEnabled:l(!0,s.userPanningEnabled),boxSelectionEnabled:l(!0,s.boxSelectionEnabled),autolock:l(!1,s.autolock,s.autolockNodes),autoungrabify:l(!1,s.autoungrabify,s.autoungrabifyNodes),autounselectify:l(!1,s.autounselectify),styleEnabled:void 0===s.styleEnabled?o:s.styleEnabled,zoom:v(s.zoom)?s.zoom:1,pan:{x:g(s.pan)&&v(s.pan.x)?s.pan.x:0,y:g(s.pan)&&v(s.pan.y)?s.pan.y:0},animation:{current:[],queue:[]},hasCompoundNodes:!1};this.createEmitter(),this.selectionType(s.selectionType),this.zoomRange({min:s.minZoom,max:s.maxZoom});u.styleEnabled&&t.setStyle([]);var c=I({},s,s.renderer);t.initRenderer(c);!function(e,t){if(e.some(C))return Xn.all(e).then(t);t(e)}([s.style,s.elements],function(e){var n=e[0],a=e[1];u.styleEnabled&&t.style().append(n),function(e,n,r){t.notifications(!1);var i=t.mutableElements();i.length>0&&i.remove(),null!=e&&(g(e)||f(e))&&t.add(e),t.one("layoutready",function(e){t.notifications(!0),t.emit(e),t.one("load",n),t.emitAndNotify("load")}).one("layoutstop",function(){t.one("done",r),t.emit("done")});var a=I({},t._private.options.layout);a.eles=t.elements(),t.layout(a).run()}(a,function(){t.startAnimationLoop(),u.ready=!0,p(s.ready)&&t.on("ready",s.ready);for(var e=0;e<i.length;e++){var n=i[e];t.on("ready",n)}r&&(r.readies=[]),t.emit("ready")},s.done)})},Ya=qa.prototype;I(Ya,{instanceString:function(){return"core"},isReady:function(){return this._private.ready},isDestroyed:function(){return this._private.destroyed},ready:function(e){return this.isReady()?this.emitter().emit("ready",[],e):this.on("ready",e),this},destroy:function(){var e=this;if(!e.isDestroyed())return e.stopAnimationLoop(),e.destroyRenderer(),this.emit("destroy"),e._private.destroyed=!0,e},hasElementWithId:function(e){return this._private.elements.hasElementWithId(e)},getElementById:function(e){return this._private.elements.getElementById(e)},hasCompoundNodes:function(){return this._private.hasCompoundNodes},headless:function(){return this._private.renderer.isHeadless()},styleEnabled:function(){return this._private.styleEnabled},addToPool:function(e){return this._private.elements.merge(e),this},removeFromPool:function(e){return this._private.elements.unmerge(e),this},container:function(){return this._private.container||null},mount:function(e,t){if(null!=e){var n=this,r=n._private,i=r.options,a=t||{name:"canvas"};return i.renderer=a,!y(e)&&y(e[0])&&(e=e[0]),n.stopAnimationLoop(),n.destroyRenderer(),r.container=e,r.styleEnabled=!0,n.initRenderer(a),n.startAnimationLoop(),n.style(i.style),n.emit("mount"),n}},unmount:function(){var e=this;return e.stopAnimationLoop(),e.destroyRenderer(),e.initRenderer({name:"null"}),e.emit("unmount"),e},options:function(){return ke(this._private.options)},json:function(e){var t=this,n=t._private,r=t.mutableElements();if(g(e)){if(t.startBatch(),e.elements){var i={},a=function(e,n){for(var r=[],a=[],o=0;o<e.length;o++){var s=e[o],l=s.data.id,u=t.getElementById(l);i[l]=!0,0!==u.length?a.push({ele:u,json:s}):n?(s.group=n,r.push(s)):r.push(s)}t.add(r);for(var c=0;c<a.length;c++){var h=a[c],d=h.ele,p=h.json;d.json(p)}};if(f(e.elements))a(e.elements);else for(var o=["nodes","edges"],s=0;s<o.length;s++){var l=o[s],u=e.elements[l];f(u)&&a(u,l)}var c=t.collection();r.filter(function(e){return!i[e.id()]}).forEach(function(e){e.isParent()?c.merge(e):e.remove()}),c.forEach(function(e){return e.children().move({parent:null})}),c.forEach(function(e){return function(e){return t.getElementById(e.id())}(e).remove()})}e.style&&t.style(e.style),null!=e.zoom&&e.zoom!==n.zoom&&t.zoom(e.zoom),e.pan&&(e.pan.x===n.pan.x&&e.pan.y===n.pan.y||t.pan(e.pan));for(var h=["minZoom","maxZoom","zoomingEnabled","userZoomingEnabled","panningEnabled","userPanningEnabled","boxSelectionEnabled","autolock","autoungrabify","autounselectify"],d=0;d<h.length;d++){var p=h[d];null!=e[p]&&t[p](e[p])}return t.endBatch(),this}var v={};!!e?v.elements=this.elements().map(function(e){return e.json()}):(v.elements={},r.forEach(function(e){var t=e.group();v.elements[t]||(v.elements[t]=[]),v.elements[t].push(e.json())})),this._private.styleEnabled&&(v.style=t.style().json());var y=n.options;return v.zoomingEnabled=n.zoomingEnabled,v.userZoomingEnabled=n.userZoomingEnabled,v.zoom=n.zoom,v.minZoom=n.minZoom,v.maxZoom=n.maxZoom,v.panningEnabled=n.panningEnabled,v.userPanningEnabled=n.userPanningEnabled,v.pan=ke(n.pan),v.boxSelectionEnabled=n.boxSelectionEnabled,v.renderer=ke(y.renderer),v.hideEdgesOnViewport=y.hideEdgesOnViewport,v.textureOnViewport=y.textureOnViewport,v.wheelSensitivity=y.wheelSensitivity,v.motionBlur=y.motionBlur,v},scratch:Hn.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0}),removeScratch:Hn.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0})}),Ya.$id=Ya.getElementById,[sa,ba,Ea,ka,Ca,Sa,Ta,Pa,Fa,Va].forEach(function(e){I(Ya,e)});var Xa={fit:!0,directed:!1,padding:30,circle:!1,grid:!1,spacingFactor:1.75,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,roots:void 0,maximal:!1,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}},ja=function(e){return e.scratch("breadthfirst")},Wa=function(e,t){return e.scratch("breadthfirst",t)};function Ha(e){this.options=I({},Xa,e)}Ha.prototype.run=function(){var e,t=this.options,n=t,r=t.cy,i=n.eles,a=i.nodes().filter(function(e){return!e.isParent()}),o=i,s=n.directed,l=n.maximal||n.maximalAdjustments>0,u=ut(n.boundingBox?n.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()});if(m(n.roots))e=n.roots;else if(f(n.roots)){for(var c=[],h=0;h<n.roots.length;h++){var p=n.roots[h],g=r.getElementById(p);c.push(g)}e=r.collection(c)}else if(d(n.roots))e=r.$(n.roots);else if(s)e=a.roots();else{var v=i.components();e=r.collection();for(var y=function(t){var n=v[t],r=n.maxDegree(!1),i=n.filter(function(e){return e.degree(!1)===r});e=e.add(i)},b=0;b<v.length;b++)y(b)}var x=[],w={},E=function(e,t){null==x[t]&&(x[t]=[]);var n=x[t].length;x[t].push(e),Wa(e,{index:n,depth:t})};o.bfs({roots:e,directed:n.directed,visit:function(e,t,n,r,i){var a=e[0],o=a.id();E(a,i),w[o]=!0}});for(var k=[],C=0;C<a.length;C++){var S=a[C];w[S.id()]||k.push(S)}var D=function(e){for(var t=x[e],n=0;n<t.length;n++){var r=t[n];null!=r?Wa(r,{depth:e,index:n}):(t.splice(n,1),n--)}},T=function(){for(var e=0;e<x.length;e++)D(e)},P=function(e,t){for(var n=ja(e),r=e.incomers().filter(function(e){return e.isNode()&&i.has(e)}),a=-1,o=e.id(),s=0;s<r.length;s++){var l=r[s],u=ja(l);a=Math.max(a,u.depth)}return n.depth<=a&&(t[o]?null:(function(e,t){var n=ja(e),r=n.depth,i=n.index;x[r][i]=null,E(e,t)}(e,a+1),t[o]=!0,!0))};if(s&&l){var M=[],_={},B=function(e){return M.push(e)};for(a.forEach(function(e){return M.push(e)});M.length>0;){var I=M.shift(),A=P(I,_);if(A)I.outgoers().filter(function(e){return e.isNode()&&i.has(e)}).forEach(B);else if(null===A){Ee("Detected double maximal shift for node `"+I.id()+"`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");break}}}T();var z=0;if(n.avoidOverlap)for(var L=0;L<a.length;L++){var O=a[L].layoutDimensions(n),R=O.w,F=O.h;z=Math.max(z,R,F)}for(var V={},q=function(e){if(V[e.id()])return V[e.id()];for(var t=ja(e).depth,n=e.neighborhood(),r=0,i=0,o=0;o<n.length;o++){var s=n[o];if(!s.isEdge()&&!s.isParent()&&a.has(s)){var l=ja(s),u=l.index,c=l.depth;if(null!=u&&null!=c){var h=x[c].length;c<t&&(r+=u/(h-1),i++)}}}return r/=i=Math.max(1,i),0===i&&(r=0),V[e.id()]=r,r},Y=function(e,t){var n=q(e)-q(t);return 0===n?N(e.id(),t.id()):n},X=0;X<x.length;X++)x[X].sort(Y),D(X);for(var j=[],W=0;W<k.length;W++)j.push(k[W]);x.unshift(j),T();for(var H=0,K=0;K<x.length;K++)H=Math.max(x[K].length,H);var G=u.x1+u.w/2,Z=u.x1+u.h/2,U=x.reduce(function(e,t){return Math.max(e,t.length)},0);return a.layoutPositions(this,n,function(e){var t=ja(e),r=t.depth,i=t.index,a=x[r].length,o=Math.max(u.w/((n.grid?U:a)+1),z),s=Math.max(u.h/(x.length+1),z),l=Math.min(u.w/2/x.length,u.h/2/x.length);if(l=Math.max(l,z),n.circle){var c=l*r+l-(x.length>0&&x[0].length<=3?l/2:0),h=2*Math.PI/x[r].length*i;return 0===r&&1===x[0].length&&(c=1),{x:G+c*Math.cos(h),y:Z+c*Math.sin(h)}}return{x:G+(i+1-(a+1)/2)*o,y:(r+1)*s}}),this};var Ka={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,radius:void 0,startAngle:1.5*Math.PI,sweep:void 0,clockwise:!0,sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}};function Ga(e){this.options=I({},Ka,e)}Ga.prototype.run=function(){var e=this.options,t=e,n=e.cy,r=t.eles,i=void 0!==t.counterclockwise?!t.counterclockwise:t.clockwise,a=r.nodes().not(":parent");t.sort&&(a=a.sort(t.sort));for(var o,s=ut(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:n.width(),h:n.height()}),l=s.x1+s.w/2,u=s.y1+s.h/2,c=(void 0===t.sweep?2*Math.PI-2*Math.PI/a.length:t.sweep)/Math.max(1,a.length-1),h=0,d=0;d<a.length;d++){var p=a[d].layoutDimensions(t),f=p.w,g=p.h;h=Math.max(h,f,g)}if(o=v(t.radius)?t.radius:a.length<=1?0:Math.min(s.h,s.w)/2-h,a.length>1&&t.avoidOverlap){h*=1.75;var y=Math.cos(c)-Math.cos(0),m=Math.sin(c)-Math.sin(0),b=Math.sqrt(h*h/(y*y+m*m));o=Math.max(b,o)}return a.layoutPositions(this,t,function(e,n){var r=t.startAngle+n*c*(i?1:-1),a=o*Math.cos(r),s=o*Math.sin(r);return{x:l+a,y:u+s}}),this};var Za,Ua={fit:!0,padding:30,startAngle:1.5*Math.PI,sweep:void 0,clockwise:!0,equidistant:!1,minNodeSpacing:10,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,height:void 0,width:void 0,spacingFactor:void 0,concentric:function(e){return e.degree()},levelWidth:function(e){return e.maxDegree()/4},animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}};function $a(e){this.options=I({},Ua,e)}$a.prototype.run=function(){for(var e=this.options,t=e,n=void 0!==t.counterclockwise?!t.counterclockwise:t.clockwise,r=e.cy,i=t.eles.nodes().not(":parent"),a=ut(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()}),o=a.x1+a.w/2,s=a.y1+a.h/2,l=[],u=0,c=0;c<i.length;c++){var h,d=i[c];h=t.concentric(d),l.push({value:h,node:d}),d._private.scratch.concentric=h}i.updateStyle();for(var p=0;p<i.length;p++){var f=i[p].layoutDimensions(t);u=Math.max(u,f.w,f.h)}l.sort(function(e,t){return t.value-e.value});for(var g=t.levelWidth(i),v=[[]],y=v[0],m=0;m<l.length;m++){var b=l[m];if(y.length>0)Math.abs(y[0].value-b.value)>=g&&(y=[],v.push(y));y.push(b)}var x=u+t.minNodeSpacing;if(!t.avoidOverlap){var w=v.length>0&&v[0].length>1,E=(Math.min(a.w,a.h)/2-x)/(v.length+w?1:0);x=Math.min(x,E)}for(var k=0,C=0;C<v.length;C++){var S=v[C],D=void 0===t.sweep?2*Math.PI-2*Math.PI/S.length:t.sweep,T=S.dTheta=D/Math.max(1,S.length-1);if(S.length>1&&t.avoidOverlap){var P=Math.cos(T)-Math.cos(0),M=Math.sin(T)-Math.sin(0),_=Math.sqrt(x*x/(P*P+M*M));k=Math.max(_,k)}S.r=k,k+=x}if(t.equidistant){for(var B=0,N=0,I=0;I<v.length;I++){var A=v[I].r-N;B=Math.max(B,A)}N=0;for(var z=0;z<v.length;z++){var L=v[z];0===z&&(N=L.r),L.r=N,N+=B}}for(var O={},R=0;R<v.length;R++)for(var F=v[R],V=F.dTheta,q=F.r,Y=0;Y<F.length;Y++){var X=F[Y],j=t.startAngle+(n?1:-1)*V*Y,W={x:o+q*Math.cos(j),y:s+q*Math.sin(j)};O[X.node.id()]=W}return i.layoutPositions(this,t,function(e){var t=e.id();return O[t]}),this};var Qa={ready:function(){},stop:function(){},animate:!0,animationEasing:void 0,animationDuration:void 0,animateFilter:function(e,t){return!0},animationThreshold:250,refresh:20,fit:!0,padding:30,boundingBox:void 0,nodeDimensionsIncludeLabels:!1,randomize:!1,componentSpacing:40,nodeRepulsion:function(e){return 2048},nodeOverlap:4,idealEdgeLength:function(e){return 32},edgeElasticity:function(e){return 32},nestingFactor:1.2,gravity:1,numIter:1e3,initialTemp:1e3,coolingFactor:.99,minTemp:1,weaver:!1};function Ja(e){this.options=I({},Qa,e),this.options.layout=this}Ja.prototype.run=function(){var e=this.options,t=e.cy,n=this,r=this.thread,i=e.weaver?e.weaver.Thread:null,a={listeners:[],on:function(e,t){return this.listeners.push({event:e,callback:t}),this},trigger:function(e){d(e)&&(e={type:e});var t=function(t){t.callback(e)};return this.listeners.filter(function(t){return t.event===e.type}).forEach(t),this},pass:function(e){return this.pass=e,this},run:function(e){var t=this.pass;return new Xn(function(n){n(e(t))})},stop:function(){return this},stopped:function(){return!0}};r&&!r.stopped()||(r=this.thread=i?new i:a),n.stopped=!1,!0!==e.animate&&!1!==e.animate||n.emit({type:"layoutstart",layout:n}),Za=!0===e.debug;var o=eo(t,n,e);Za&&(void 0)(o),e.randomize&&ro(o,t);var s=Date.now(),l=!1,u=function(n){n=n||{},l&&!n.next||!n.force&&Date.now()-s<e.animationThreshold||(l=!0,oe(function(){io(o,t,e),!0===e.fit&&t.fit(e.padding),l=!1,n.next&&n.next()}))};r.on("message",function(e){var t=e.message;o.layoutNodes=t,u()}),r.pass({layoutInfo:o,options:{animate:e.animate,refresh:e.refresh,componentSpacing:e.componentSpacing,nodeOverlap:e.nodeOverlap,nestingFactor:e.nestingFactor,gravity:e.gravity,numIter:e.numIter,initialTemp:e.initialTemp,coolingFactor:e.coolingFactor,minTemp:e.minTemp}}).run(function(e){var t,n,r=e.layoutInfo,i=e.options,o=function(e,t){for(var n=0;n<e.graphSet.length;n++)for(var r=e.graphSet[n],i=r.length,a=0;a<i;a++)for(var o=e.layoutNodes[e.idToIndex[r[a]]],s=a+1;s<i;s++){var u=e.layoutNodes[e.idToIndex[r[s]]];l(o,u,e,t)}},s=function(e){return-e+2*e*Math.random()},l=function(e,t,n,r){if(e.cmptId===t.cmptId||n.isCompound){var i=t.positionX-e.positionX,a=t.positionY-e.positionY;0===i&&0===a&&(i=s(1),a=s(1));var o=u(e,t,i,a);if(o>0)var l=(d=r.nodeOverlap*o)*i/(m=Math.sqrt(i*i+a*a)),h=d*a/m;else{var d,p=c(e,i,a),f=c(t,-1*i,-1*a),g=f.x-p.x,v=f.y-p.y,y=g*g+v*v,m=Math.sqrt(y);l=(d=(e.nodeRepulsion+t.nodeRepulsion)/y)*g/m,h=d*v/m}e.isLocked||(e.offsetX-=l,e.offsetY-=h),t.isLocked||(t.offsetX+=l,t.offsetY+=h)}},u=function(e,t,n,r){if(n>0)var i=e.maxX-t.minX;else i=t.maxX-e.minX;if(r>0)var a=e.maxY-t.minY;else a=t.maxY-e.minY;return i>=0&&a>=0?Math.sqrt(i*i+a*a):0},c=function(e,t,n){var r=e.positionX,i=e.positionY,a=e.height||1,o=e.width||1,s=n/t,l=a/o,u={};return 0===t&&0<n?(u.x=r,u.y=i+a/2,u):0===t&&0>n?(u.x=r,u.y=i+a/2,u):0<t&&-1*l<=s&&s<=l?(u.x=r+o/2,u.y=i+o*n/2/t,u):0>t&&-1*l<=s&&s<=l?(u.x=r-o/2,u.y=i-o*n/2/t,u):0<n&&(s<=-1*l||s>=l)?(u.x=r+a*t/2/n,u.y=i+a/2,u):0>n&&(s<=-1*l||s>=l)?(u.x=r-a*t/2/n,u.y=i-a/2,u):u},h=function(e,t){for(var n=0;n<e.edgeSize;n++){var r=e.layoutEdges[n],i=e.idToIndex[r.sourceId],a=e.layoutNodes[i],o=e.idToIndex[r.targetId],s=e.layoutNodes[o],l=s.positionX-a.positionX,u=s.positionY-a.positionY;if(0!==l||0!==u){var h=c(a,l,u),d=c(s,-1*l,-1*u),p=d.x-h.x,f=d.y-h.y,g=Math.sqrt(p*p+f*f),v=Math.pow(r.idealLength-g,2)/r.elasticity;if(0!==g)var y=v*p/g,m=v*f/g;else y=0,m=0;a.isLocked||(a.offsetX+=y,a.offsetY+=m),s.isLocked||(s.offsetX-=y,s.offsetY-=m)}}},d=function(e,t){for(var n=0;n<e.graphSet.length;n++){var r=e.graphSet[n],i=r.length;if(0===n)var a=e.clientHeight/2,o=e.clientWidth/2;else{var s=e.layoutNodes[e.idToIndex[r[0]]],l=e.layoutNodes[e.idToIndex[s.parentId]];a=l.positionX,o=l.positionY}for(var u=0;u<i;u++){var c=e.layoutNodes[e.idToIndex[r[u]]];if(!c.isLocked){var h=a-c.positionX,d=o-c.positionY,p=Math.sqrt(h*h+d*d);if(p>1){var f=t.gravity*h/p,g=t.gravity*d/p;c.offsetX+=f,c.offsetY+=g}}}}},p=function(e,t){var n=[],r=0,i=-1;for(n.push.apply(n,e.graphSet[0]),i+=e.graphSet[0].length;r<=i;){var a=n[r++],o=e.idToIndex[a],s=e.layoutNodes[o],l=s.children;if(0<l.length&&!s.isLocked){for(var u=s.offsetX,c=s.offsetY,h=0;h<l.length;h++){var d=e.layoutNodes[e.idToIndex[l[h]]];d.offsetX+=u,d.offsetY+=c,n[++i]=l[h]}s.offsetX=0,s.offsetY=0}}},f=function(e,t){for(var n=0;n<e.nodeSize;n++){0<(i=e.layoutNodes[n]).children.length&&(i.maxX=void 0,i.minX=void 0,i.maxY=void 0,i.minY=void 0)}for(n=0;n<e.nodeSize;n++){if(!(0<(i=e.layoutNodes[n]).children.length||i.isLocked)){var r=g(i.offsetX,i.offsetY,e.temperature);i.positionX+=r.x,i.positionY+=r.y,i.offsetX=0,i.offsetY=0,i.minX=i.positionX-i.width,i.maxX=i.positionX+i.width,i.minY=i.positionY-i.height,i.maxY=i.positionY+i.height,v(i,e)}}for(n=0;n<e.nodeSize;n++){var i;0<(i=e.layoutNodes[n]).children.length&&!i.isLocked&&(i.positionX=(i.maxX+i.minX)/2,i.positionY=(i.maxY+i.minY)/2,i.width=i.maxX-i.minX,i.height=i.maxY-i.minY)}},g=function(e,t,n){var r=Math.sqrt(e*e+t*t);if(r>n)var i={x:n*e/r,y:n*t/r};else i={x:e,y:t};return i},v=function e(t,n){var r=t.parentId;if(null!=r){var i=n.layoutNodes[n.idToIndex[r]],a=!1;return(null==i.maxX||t.maxX+i.padRight>i.maxX)&&(i.maxX=t.maxX+i.padRight,a=!0),(null==i.minX||t.minX-i.padLeft<i.minX)&&(i.minX=t.minX-i.padLeft,a=!0),(null==i.maxY||t.maxY+i.padBottom>i.maxY)&&(i.maxY=t.maxY+i.padBottom,a=!0),(null==i.minY||t.minY-i.padTop<i.minY)&&(i.minY=t.minY-i.padTop,a=!0),a?e(i,n):void 0}},y=function(e){return function(e,t,n){o(e,t),h(e,t),d(e,t),p(e,t),f(e,t)}(r,i),r.temperature=r.temperature*i.coolingFactor,!(r.temperature<i.minTemp)},m=0;do{for(var b=0;(b<i.refresh||0===i.refresh)&&m<i.numIter;){var x;if(!(x=y()))break;b++,m++}!0===i.animate&&(t=r.layoutNodes,n=void 0,n={type:"message",message:t},a.trigger(n))}while(x&&m+1<i.numIter);return function(e,t){for(var n=r.layoutNodes,i=[],a=0;a<n.length;a++){var o=n[a],s=o.cmptId;(i[s]=i[s]||[]).push(o)}var l=0;for(a=0;a<i.length;a++)if(v=i[a]){v.x1=1/0,v.x2=-1/0,v.y1=1/0,v.y2=-1/0;for(var u=0;u<v.length;u++){var c=v[u];v.x1=Math.min(v.x1,c.positionX-c.width/2),v.x2=Math.max(v.x2,c.positionX+c.width/2),v.y1=Math.min(v.y1,c.positionY-c.height/2),v.y2=Math.max(v.y2,c.positionY+c.height/2)}v.w=v.x2-v.x1,v.h=v.y2-v.y1,l+=v.w*v.h}i.sort(function(e,t){return t.w*t.h-e.w*e.h});var h=0,d=0,p=0,f=0,g=Math.sqrt(l)*r.clientWidth/r.clientHeight;for(a=0;a<i.length;a++){var v;if(v=i[a]){for(u=0;u<v.length;u++)(c=v[u]).isLocked||(c.positionX+=h,c.positionY+=d);h+=v.w+t.componentSpacing,p+=v.w+t.componentSpacing,f=Math.max(f,v.h),p>g&&(d+=f+t.componentSpacing,h=0,p=0,f=0)}}}(0,i),r}).then(function(e){o.layoutNodes=e.layoutNodes,r.stop(),c()});var c=function(){!0===e.animate||!1===e.animate?u({force:!0,next:function(){n.one("layoutstop",e.stop),n.emit({type:"layoutstop",layout:n})}}):e.eles.nodes().layoutPositions(n,e,function(e){var t=o.layoutNodes[o.idToIndex[e.data("id")]];return{x:t.positionX,y:t.positionY}})};return this},Ja.prototype.stop=function(){return this.stopped=!0,this.thread&&this.thread.stop(),this.emit("layoutstop"),this},Ja.prototype.destroy=function(){return this.thread&&this.thread.stop(),this};var eo=function(e,t,n){for(var r=n.eles.edges(),i=n.eles.nodes(),a={isCompound:e.hasCompoundNodes(),layoutNodes:[],idToIndex:{},nodeSize:i.size(),graphSet:[],indexToGraph:[],layoutEdges:[],edgeSize:r.size(),temperature:n.initialTemp,clientWidth:e.width(),clientHeight:e.width(),boundingBox:ut(n.boundingBox?n.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()})},o=n.eles.components(),s={},l=0;l<o.length;l++)for(var u=o[l],c=0;c<u.length;c++){s[u[c].id()]=l}for(l=0;l<a.nodeSize;l++){var h=(y=i[l]).layoutDimensions(n);(I={}).isLocked=y.locked(),I.id=y.data("id"),I.parentId=y.data("parent"),I.cmptId=s[y.id()],I.children=[],I.positionX=y.position("x"),I.positionY=y.position("y"),I.offsetX=0,I.offsetY=0,I.height=h.w,I.width=h.h,I.maxX=I.positionX+I.width/2,I.minX=I.positionX-I.width/2,I.maxY=I.positionY+I.height/2,I.minY=I.positionY-I.height/2,I.padLeft=parseFloat(y.style("padding")),I.padRight=parseFloat(y.style("padding")),I.padTop=parseFloat(y.style("padding")),I.padBottom=parseFloat(y.style("padding")),I.nodeRepulsion=p(n.nodeRepulsion)?n.nodeRepulsion(y):n.nodeRepulsion,a.layoutNodes.push(I),a.idToIndex[I.id]=l}var d=[],f=0,g=-1,v=[];for(l=0;l<a.nodeSize;l++){var y,m=(y=a.layoutNodes[l]).parentId;null!=m?a.layoutNodes[a.idToIndex[m]].children.push(y.id):(d[++g]=y.id,v.push(y.id))}for(a.graphSet.push(v);f<=g;){var b=d[f++],x=a.idToIndex[b],w=a.layoutNodes[x].children;if(w.length>0){a.graphSet.push(w);for(l=0;l<w.length;l++)d[++g]=w[l]}}for(l=0;l<a.graphSet.length;l++){var E=a.graphSet[l];for(c=0;c<E.length;c++){var k=a.idToIndex[E[c]];a.indexToGraph[k]=l}}for(l=0;l<a.edgeSize;l++){var C=r[l],S={};S.id=C.data("id"),S.sourceId=C.data("source"),S.targetId=C.data("target");var D=p(n.idealEdgeLength)?n.idealEdgeLength(C):n.idealEdgeLength,T=p(n.edgeElasticity)?n.edgeElasticity(C):n.edgeElasticity,P=a.idToIndex[S.sourceId],M=a.idToIndex[S.targetId];if(a.indexToGraph[P]!=a.indexToGraph[M]){for(var _=to(S.sourceId,S.targetId,a),B=a.graphSet[_],N=0,I=a.layoutNodes[P];-1===B.indexOf(I.id);)I=a.layoutNodes[a.idToIndex[I.parentId]],N++;for(I=a.layoutNodes[M];-1===B.indexOf(I.id);)I=a.layoutNodes[a.idToIndex[I.parentId]],N++;D*=N*n.nestingFactor}S.idealLength=D,S.elasticity=T,a.layoutEdges.push(S)}return a},to=function(e,t,n){var r=no(e,t,0,n);return 2>r.count?0:r.graph},no=function e(t,n,r,i){var a=i.graphSet[r];if(-1<a.indexOf(t)&&-1<a.indexOf(n))return{count:2,graph:r};for(var o=0,s=0;s<a.length;s++){var l=a[s],u=i.idToIndex[l],c=i.layoutNodes[u].children;if(0!==c.length){var h=e(t,n,i.indexToGraph[i.idToIndex[c[0]]],i);if(0!==h.count){if(1!==h.count)return h;if(2===++o)break}}}return{count:o,graph:r}},ro=function(e,t){for(var n=e.clientWidth,r=e.clientHeight,i=0;i<e.nodeSize;i++){var a=e.layoutNodes[i];0!==a.children.length||a.isLocked||(a.positionX=Math.random()*n,a.positionY=Math.random()*r)}},io=function(e,t,n){var r=n.layout,i=n.eles.nodes(),a=e.boundingBox,o={x1:1/0,x2:-1/0,y1:1/0,y2:-1/0};n.boundingBox&&(i.forEach(function(t){var n=e.layoutNodes[e.idToIndex[t.data("id")]];o.x1=Math.min(o.x1,n.positionX),o.x2=Math.max(o.x2,n.positionX),o.y1=Math.min(o.y1,n.positionY),o.y2=Math.max(o.y2,n.positionY)}),o.w=o.x2-o.x1,o.h=o.y2-o.y1),i.positions(function(t,r){var i=e.layoutNodes[e.idToIndex[t.data("id")]];if(n.boundingBox){var s=(i.positionX-o.x1)/o.w,l=(i.positionY-o.y1)/o.h;return{x:a.x1+s*a.w,y:a.y1+l*a.h}}return{x:i.positionX,y:i.positionY}}),!0!==e.ready&&(e.ready=!0,r.one("layoutready",n.ready),r.emit({type:"layoutready",layout:this}))},ao={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,avoidOverlapPadding:10,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,condense:!1,rows:void 0,cols:void 0,position:function(e){},sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}};function oo(e){this.options=I({},ao,e)}oo.prototype.run=function(){var e=this.options,t=e,n=e.cy,r=t.eles.nodes().not(":parent");t.sort&&(r=r.sort(t.sort));var i=ut(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:n.width(),h:n.height()});if(0===i.h||0===i.w)r.layoutPositions(this,t,function(e){return{x:i.x1,y:i.y1}});else{var a=r.size(),o=Math.sqrt(a*i.h/i.w),s=Math.round(o),l=Math.round(i.w/i.h*o),u=function(e){if(null==e)return Math.min(s,l);Math.min(s,l)==s?s=e:l=e},c=function(e){if(null==e)return Math.max(s,l);Math.max(s,l)==s?s=e:l=e},h=t.rows,d=null!=t.cols?t.cols:t.columns;if(null!=h&&null!=d)s=h,l=d;else if(null!=h&&null==d)s=h,l=Math.ceil(a/s);else if(null==h&&null!=d)l=d,s=Math.ceil(a/l);else if(l*s>a){var p=u(),f=c();(p-1)*f>=a?u(p-1):(f-1)*p>=a&&c(f-1)}else for(;l*s<a;){var g=u(),v=c();(v+1)*g>=a?c(v+1):u(g+1)}var y=i.w/l,m=i.h/s;if(t.condense&&(y=0,m=0),t.avoidOverlap)for(var b=0;b<r.length;b++){var x=r[b],w=x._private.position;null!=w.x&&null!=w.y||(w.x=0,w.y=0);var E=x.layoutDimensions(t),k=t.avoidOverlapPadding,C=E.w+k,S=E.h+k;y=Math.max(y,C),m=Math.max(m,S)}for(var D={},T=function(e,t){return!!D["c-"+e+"-"+t]},P=function(e,t){D["c-"+e+"-"+t]=!0},M=0,_=0,B=function(){++_>=l&&(_=0,M++)},N={},I=0;I<r.length;I++){var A=r[I],z=t.position(A);if(z&&(void 0!==z.row||void 0!==z.col)){var L={row:z.row,col:z.col};if(void 0===L.col)for(L.col=0;T(L.row,L.col);)L.col++;else if(void 0===L.row)for(L.row=0;T(L.row,L.col);)L.row++;N[A.id()]=L,P(L.row,L.col)}}r.layoutPositions(this,t,function(e,t){var n,r;if(e.locked()||e.isParent())return!1;var a=N[e.id()];if(a)n=a.col*y+y/2+i.x1,r=a.row*m+m/2+i.y1;else{for(;T(M,_);)B();n=_*y+y/2+i.x1,r=M*m+m/2+i.y1,P(M,_),B()}return{x:n,y:r}})}return this};var so={ready:function(){},stop:function(){}};function lo(e){this.options=I({},so,e)}lo.prototype.run=function(){var e=this.options,t=e.eles;e.cy;return this.emit("layoutstart"),t.nodes().positions(function(){return{x:0,y:0}}),this.one("layoutready",e.ready),this.emit("layoutready"),this.one("layoutstop",e.stop),this.emit("layoutstop"),this},lo.prototype.stop=function(){return this};var uo={positions:void 0,zoom:void 0,pan:void 0,fit:!0,padding:30,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}};function co(e){this.options=I({},uo,e)}co.prototype.run=function(){var e=this.options,t=e.eles.nodes(),n=p(e.positions);return t.layoutPositions(this,e,function(t,r){var i=function(t){if(null==e.positions)return null;if(n)return e.positions(t);var r=e.positions[t._private.data.id];return null==r?null:r}(t);return!t.locked()&&null!=i&&i}),this};var ho={fit:!0,padding:30,boundingBox:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}};function po(e){this.options=I({},ho,e)}po.prototype.run=function(){var e=this.options,t=e.cy,n=e.eles.nodes().not(":parent"),r=ut(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:t.width(),h:t.height()});return n.layoutPositions(this,e,function(e,t){return{x:r.x1+Math.round(Math.random()*r.w),y:r.y1+Math.round(Math.random()*r.h)}}),this};var fo=[{name:"breadthfirst",impl:Ha},{name:"circle",impl:Ga},{name:"concentric",impl:$a},{name:"cose",impl:Ja},{name:"grid",impl:oo},{name:"null",impl:lo},{name:"preset",impl:co},{name:"random",impl:po}];function go(e){this.options=e,this.notifications=0}var vo=function(){};go.prototype={recalculateRenderedStyle:vo,notify:function(){this.notifications++},init:vo,isHeadless:function(){return!0}};var yo={arrowShapeWidth:.3,registerArrowShapes:function(){var e=this.arrowShapes={},t=this,n=function(e,t,n,r,i,a,o){var s=i.x-n/2-o,l=i.x+n/2+o,u=i.y-n/2-o,c=i.y+n/2+o;return s<=e&&e<=l&&u<=t&&t<=c},r=function(e,t,n,r,i){var a=e*Math.cos(r)-t*Math.sin(r),o=(e*Math.sin(r)+t*Math.cos(r))*n;return{x:a*n+i.x,y:o+i.y}},i=function(e,t,n,i){for(var a=[],o=0;o<e.length;o+=2){var s=e[o],l=e[o+1];a.push(r(s,l,t,n,i))}return a},a=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r.x,r.y)}return t},o=function(e){return e.pstyle("width").pfValue*e.pstyle("arrow-scale").pfValue*2},s=function(r,s){d(s)&&(s=e[s]),e[r]=I({name:r,points:[-.15,-.3,.15,-.3,.15,.3,-.15,.3],collide:function(e,t,n,r,o,s){var l=a(i(this.points,n+2*s,r,o));return Et(e,t,l)},roughCollide:n,draw:function(e,n,r,a){var o=i(this.points,n,r,a);t.arrowShapeImpl("polygon")(e,o)},spacing:function(e){return 0},gap:o},s)};s("none",{collide:me,roughCollide:me,draw:xe,spacing:be,gap:be}),s("triangle",{points:[-.15,-.3,0,0,.15,-.3]}),s("arrow","triangle"),s("triangle-backcurve",{points:e.triangle.points,controlPoint:[0,-.15],roughCollide:n,draw:function(e,n,a,o,s){var l=i(this.points,n,a,o),u=this.controlPoint,c=r(u[0],u[1],n,a,o);t.arrowShapeImpl(this.name)(e,l,c)},gap:function(e){return.8*o(e)}}),s("triangle-tee",{points:[0,0,.15,-.3,-.15,-.3,0,0],pointsTee:[-.15,-.4,-.15,-.5,.15,-.5,.15,-.4],collide:function(e,t,n,r,o,s,l){var u=a(i(this.points,n+2*l,r,o)),c=a(i(this.pointsTee,n+2*l,r,o));return Et(e,t,u)||Et(e,t,c)},draw:function(e,n,r,a,o){var s=i(this.points,n,r,a),l=i(this.pointsTee,n,r,a);t.arrowShapeImpl(this.name)(e,s,l)}}),s("triangle-cross",{points:[0,0,.15,-.3,-.15,-.3,0,0],baseCrossLinePts:[-.15,-.4,-.15,-.4,.15,-.4,.15,-.4],crossLinePts:function(e,t){var n=this.baseCrossLinePts.slice(),r=t/e;return n[3]=n[3]-r,n[5]=n[5]-r,n},collide:function(e,t,n,r,o,s,l){var u=a(i(this.points,n+2*l,r,o)),c=a(i(this.crossLinePts(n,s),n+2*l,r,o));return Et(e,t,u)||Et(e,t,c)},draw:function(e,n,r,a,o){var s=i(this.points,n,r,a),l=i(this.crossLinePts(n,o),n,r,a);t.arrowShapeImpl(this.name)(e,s,l)}}),s("vee",{points:[-.15,-.3,0,0,.15,-.3,0,-.15],gap:function(e){return.525*o(e)}}),s("circle",{radius:.15,collide:function(e,t,n,r,i,a,o){var s=i;return Math.pow(s.x-e,2)+Math.pow(s.y-t,2)<=Math.pow((n+2*o)*this.radius,2)},draw:function(e,n,r,i,a){t.arrowShapeImpl(this.name)(e,i.x,i.y,this.radius*n)},spacing:function(e){return t.getArrowWidth(e.pstyle("width").pfValue,e.pstyle("arrow-scale").value)*this.radius}}),s("tee",{points:[-.15,0,-.15,-.1,.15,-.1,.15,0],spacing:function(e){return 1},gap:function(e){return 1}}),s("square",{points:[-.15,0,.15,0,.15,-.3,-.15,-.3]}),s("diamond",{points:[-.15,-.15,0,-.3,.15,-.15,0,0],gap:function(e){return e.pstyle("width").pfValue*e.pstyle("arrow-scale").value}}),s("chevron",{points:[0,0,-.15,-.15,-.1,-.2,0,-.1,.1,-.2,.15,-.15],gap:function(e){return.95*e.pstyle("width").pfValue*e.pstyle("arrow-scale").value}})}},mo={projectIntoViewport:function(e,t){var n=this.cy,r=this.findContainerClientCoords(),i=r[0],a=r[1],o=r[4],s=n.pan(),l=n.zoom();return[((e-i)/o-s.x)/l,((t-a)/o-s.y)/l]},findContainerClientCoords:function(){if(this.containerBB)return this.containerBB;var e=this.container,t=e.getBoundingClientRect(),n=a.getComputedStyle(e),r=function(e){return parseFloat(n.getPropertyValue(e))},i=r("padding-left"),o=r("padding-right"),s=r("padding-top"),l=r("padding-bottom"),u=r("border-left-width"),c=r("border-right-width"),h=r("border-top-width"),d=(r("border-bottom-width"),e.clientWidth),p=e.clientHeight,f=i+o,g=s+l,v=u+c,y=t.width/(d+v),m=d-f,b=p-g,x=t.left+i+u,w=t.top+s+h;return this.containerBB=[x,w,m,b,y]},invalidateContainerClientCoordsCache:function(){this.containerBB=null},findNearestElement:function(e,t,n,r){return this.findNearestElements(e,t,n,r)[0]},findNearestElements:function(e,t,n,r){var i,a,o=this,s=this,l=s.getCachedZSortedEles(),u=[],c=s.cy.zoom(),h=s.cy.hasCompoundNodes(),d=(r?24:8)/c,p=(r?8:2)/c,f=(r?8:2)/c,g=1/0;function v(e,t){if(e.isNode()){if(a)return;a=e,u.push(e)}if(e.isEdge()&&(null==t||t<g))if(i){if(i.pstyle("z-compound-depth").value===e.pstyle("z-compound-depth").value&&i.pstyle("z-compound-depth").value===e.pstyle("z-compound-depth").value)for(var n=0;n<u.length;n++)if(u[n].isEdge()){u[n]=e,i=e,g=null!=t?t:g;break}}else u.push(e),i=e,g=null!=t?t:g}function y(n){var r=n.outerWidth()+2*p,i=n.outerHeight()+2*p,a=r/2,l=i/2,u=n.position();if(u.x-a<=e&&e<=u.x+a&&u.y-l<=t&&t<=u.y+l&&s.nodeShapes[o.getNodeShape(n)].checkPoint(e,t,0,r,i,u.x,u.y))return v(n,0),!0}function m(n){var r,i=n._private,a=i.rscratch,l=n.pstyle("width").pfValue,c=n.pstyle("arrow-scale").value,p=l/2+d,f=p*p,g=2*p,m=i.source,b=i.target;if("segments"===a.edgeType||"straight"===a.edgeType||"haystack"===a.edgeType){for(var x=a.allpts,w=0;w+3<x.length;w+=2)if(mt(e,t,x[w],x[w+1],x[w+2],x[w+3],g)&&f>(r=wt(e,t,x[w],x[w+1],x[w+2],x[w+3])))return v(n,r),!0}else if("bezier"===a.edgeType||"multibezier"===a.edgeType||"self"===a.edgeType||"compound"===a.edgeType)for(x=a.allpts,w=0;w+5<a.allpts.length;w+=4)if(bt(e,t,x[w],x[w+1],x[w+2],x[w+3],x[w+4],x[w+5],g)&&f>(r=xt(e,t,x[w],x[w+1],x[w+2],x[w+3],x[w+4],x[w+5])))return v(n,r),!0;m=m||i.source,b=b||i.target;var E=o.getArrowWidth(l,c),k=[{name:"source",x:a.arrowStartX,y:a.arrowStartY,angle:a.srcArrowAngle},{name:"target",x:a.arrowEndX,y:a.arrowEndY,angle:a.tgtArrowAngle},{name:"mid-source",x:a.midX,y:a.midY,angle:a.midsrcArrowAngle},{name:"mid-target",x:a.midX,y:a.midY,angle:a.midtgtArrowAngle}];for(w=0;w<k.length;w++){var C=k[w],S=s.arrowShapes[n.pstyle(C.name+"-arrow-shape").value],D=n.pstyle("width").pfValue;if(S.roughCollide(e,t,E,C.angle,{x:C.x,y:C.y},D,d)&&S.collide(e,t,E,C.angle,{x:C.x,y:C.y},D,d))return v(n),!0}h&&u.length>0&&(y(m),y(b))}function b(e,t,n){return _e(e,t,n)}function x(n,r){var i,a=n._private,o=f;i=r?r+"-":"";var s=n.pstyle(i+"label").value;if("yes"===n.pstyle("text-events").strValue&&s){var l=a.rstyle,u=n.pstyle("text-border-width").pfValue,c=n.pstyle("text-background-padding").pfValue,h=b(l,"labelWidth",r)+u+2*o+2*c,d=b(l,"labelHeight",r)+u+2*o+2*c,p=b(l,"labelX",r),g=b(l,"labelY",r),y=b(a.rscratch,"labelAngle",r),m=p-h/2,x=p+h/2,w=g-d/2,E=g+d/2;if(y){var k=Math.cos(y),C=Math.sin(y),S=function(e,t){return{x:(e-=p)*k-(t-=g)*C+p,y:e*C+t*k+g}},D=S(m,w),T=S(m,E),P=S(x,w),M=S(x,E),_=[D.x,D.y,P.x,P.y,M.x,M.y,T.x,T.y];if(Et(e,t,_))return v(n),!0}else{if(gt({w:h,h:d,x1:m,x2:x,y1:w,y2:E},e,t))return v(n),!0}}}n&&(l=l.interactive);for(var w=l.length-1;w>=0;w--){var E=l[w];E.isNode()?y(E)||x(E):m(E)||x(E)||x(E,"source")||x(E,"target")}return u},getAllInBox:function(e,t,n,r){for(var i,a,o=this.getCachedZSortedEles().interactive,s=[],l=Math.min(e,n),u=Math.max(e,n),c=Math.min(t,r),h=Math.max(t,r),d=ut({x1:e=l,y1:t=c,x2:n=u,y2:r=h}),p=0;p<o.length;p++){var f=o[p];if(f.isNode()){var g=f,v=g.boundingBox({includeNodes:!0,includeEdges:!1,includeLabels:!1});ft(d,v)&&!vt(v,d)&&s.push(g)}else{var y=f,m=y._private,b=m.rscratch;if(null!=b.startX&&null!=b.startY&&!gt(d,b.startX,b.startY))continue;if(null!=b.endX&&null!=b.endY&&!gt(d,b.endX,b.endY))continue;if("bezier"===b.edgeType||"multibezier"===b.edgeType||"self"===b.edgeType||"compound"===b.edgeType||"segments"===b.edgeType||"haystack"===b.edgeType){for(var x=m.rstyle.bezierPts||m.rstyle.linePts||m.rstyle.haystackPts,w=!0,E=0;E<x.length;E++)if(i=d,a=x[E],!gt(i,a.x,a.y)){w=!1;break}w&&s.push(y)}else"haystack"!==b.edgeType&&"straight"!==b.edgeType||s.push(y)}}return s}},bo={calculateArrowAngles:function(e){var t,n,r,i,a,o,s=e._private.rscratch,l="haystack"===s.edgeType,u="bezier"===s.edgeType,c="multibezier"===s.edgeType,h="segments"===s.edgeType,d="compound"===s.edgeType,p="self"===s.edgeType;if(l?(r=s.haystackPts[0],i=s.haystackPts[1],a=s.haystackPts[2],o=s.haystackPts[3]):(r=s.arrowStartX,i=s.arrowStartY,a=s.arrowEndX,o=s.arrowEndY),g=s.midX,v=s.midY,h)t=r-s.segpts[0],n=i-s.segpts[1];else if(c||d||p||u){var f=s.allpts;t=r-ot(f[0],f[2],f[4],.1),n=i-ot(f[1],f[3],f[5],.1)}else t=r-g,n=i-v;s.srcArrowAngle=tt(t,n);var g=s.midX,v=s.midY;if(l&&(g=(r+a)/2,v=(i+o)/2),t=a-r,n=o-i,h)if((f=s.allpts).length/2%2==0){var y=(m=f.length/2)-2;t=f[m]-f[y],n=f[m+1]-f[y+1]}else{y=(m=f.length/2-1)-2;var m,b=m+2;t=f[m]-f[y],n=f[m+1]-f[y+1]}else if(c||d||p){var x,w,E,k,f=s.allpts;if(s.ctrlpts.length/2%2==0){var C=(S=(D=f.length/2-1)+2)+2;x=ot(f[D],f[S],f[C],0),w=ot(f[D+1],f[S+1],f[C+1],0),E=ot(f[D],f[S],f[C],1e-4),k=ot(f[D+1],f[S+1],f[C+1],1e-4)}else{var S,D;C=(S=f.length/2-1)+2;x=ot(f[D=S-2],f[S],f[C],.4999),w=ot(f[D+1],f[S+1],f[C+1],.4999),E=ot(f[D],f[S],f[C],.5),k=ot(f[D+1],f[S+1],f[C+1],.5)}t=E-x,n=k-w}(s.midtgtArrowAngle=tt(t,n),s.midDispX=t,s.midDispY=n,t*=-1,n*=-1,h)&&((f=s.allpts).length/2%2==0||(t=-(f[b=(m=f.length/2-1)+2]-f[m]),n=-(f[b+1]-f[m+1])));if(s.midsrcArrowAngle=tt(t,n),h)t=a-s.segpts[s.segpts.length-2],n=o-s.segpts[s.segpts.length-1];else if(c||d||p||u){var T=(f=s.allpts).length;t=a-ot(f[T-6],f[T-4],f[T-2],.9),n=o-ot(f[T-5],f[T-3],f[T-1],.9)}else t=a-g,n=o-v;s.tgtArrowAngle=tt(t,n)}};bo.getArrowWidth=bo.getArrowHeight=function(e,t){var n=this.arrowWidthCache=this.arrowWidthCache||{},r=n[e+", "+t];return r||(r=Math.max(Math.pow(13.37*e,.9),29)*t,n[e+", "+t]=r,r)};var xo={};function wo(e){var t=[];if(null!=e){for(var n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];t.push({x:r,y:i})}return t}}xo.findHaystackPoints=function(e){for(var t=0;t<e.length;t++){var n=e[t],r=n._private,i=r.rscratch;if(!i.haystack){var a=2*Math.random()*Math.PI;i.source={x:Math.cos(a),y:Math.sin(a)};a=2*Math.random()*Math.PI;i.target={x:Math.cos(a),y:Math.sin(a)}}var o=r.source,s=r.target,l=o.position(),u=s.position(),c=o.width(),h=s.width(),d=o.height(),p=s.height(),f=n.pstyle("haystack-radius").value/2;i.haystackPts=i.allpts=[i.source.x*c*f+l.x,i.source.y*d*f+l.y,i.target.x*h*f+u.x,i.target.y*p*f+u.y],i.midX=(i.allpts[0]+i.allpts[2])/2,i.midY=(i.allpts[1]+i.allpts[3])/2,i.edgeType=i.lastCurveStyle="haystack",i.haystack=!0,this.storeEdgeProjections(n),this.calculateArrowAngles(n),this.recalculateEdgeLabelProjections(n),this.calculateLabelAngles(n)}},xo.storeAllpts=function(e){var t=e._private.rscratch;if("multibezier"===t.edgeType||"bezier"===t.edgeType||"self"===t.edgeType||"compound"===t.edgeType){t.allpts=[],t.allpts.push(t.startX,t.startY);for(var n=0;n+1<t.ctrlpts.length;n+=2)t.allpts.push(t.ctrlpts[n],t.ctrlpts[n+1]),n+3<t.ctrlpts.length&&t.allpts.push((t.ctrlpts[n]+t.ctrlpts[n+2])/2,(t.ctrlpts[n+1]+t.ctrlpts[n+3])/2);var r;t.allpts.push(t.endX,t.endY),t.ctrlpts.length/2%2==0?(r=t.allpts.length/2-1,t.midX=t.allpts[r],t.midY=t.allpts[r+1]):(r=t.allpts.length/2-3,.5,t.midX=ot(t.allpts[r],t.allpts[r+2],t.allpts[r+4],.5),t.midY=ot(t.allpts[r+1],t.allpts[r+3],t.allpts[r+5],.5))}else if("straight"===t.edgeType)t.allpts=[t.startX,t.startY,t.endX,t.endY],t.midX=(t.startX+t.endX+t.arrowStartX+t.arrowEndX)/4,t.midY=(t.startY+t.endY+t.arrowStartY+t.arrowEndY)/4;else if("segments"===t.edgeType)if(t.allpts=[],t.allpts.push(t.startX,t.startY),t.allpts.push.apply(t.allpts,t.segpts),t.allpts.push(t.endX,t.endY),t.segpts.length%4==0){var i=t.segpts.length/2,a=i-2;t.midX=(t.segpts[a]+t.segpts[i])/2,t.midY=(t.segpts[a+1]+t.segpts[i+1])/2}else{a=t.segpts.length/2-1;t.midX=t.segpts[a],t.midY=t.segpts[a+1]}},xo.checkForInvalidEdgeWarning=function(e){var t=e._private.rscratch;v(t.startX)&&v(t.startY)&&v(t.endX)&&v(t.endY)?t.loggedErr=!1:t.loggedErr||(t.loggedErr=!0,Ee("Edge `"+e.id()+"` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."))},xo.findEdgeControlPoints=function(e){if(e&&0!==e.length){for(var t,n,r,i,a,o,s,l,u,c,h,d,p,f,g=this,y=g.cy.hasCompoundNodes(),m={},b=[],x=[],w=0;w<e.length;w++){var E=(M=e[w])._private.data,k="unbundled-bezier"===(j=M.pstyle("curve-style").value)||"segments"===j||"straight"===j,C="unbundled-bezier"===j||"bezier"===j;if("none"!==M.pstyle("display").value)if("haystack"!==j){var S=E.source,D=E.target;t=S>D?D+"$-$"+S:S+"$-$"+D,k&&(t="unbundled$-$"+E.id);var T=m[t];null==T&&(T=m[t]=[],b.push(t)),T.push(M),k&&(T.hasUnbundled=!0),C&&(T.hasBezier=!0)}else x.push(M)}for(var P=0;P<b.length;P++){var M,_,B=m[t=b[P]];if(!B.hasUnbundled){var N=B[0].parallelEdges();Me(B),N.forEach(function(e){return B.push(e)}),B.sort(function(e,t){return e.poolIndex()-t.poolIndex()})}if(n=B[0]._private.source,r=B[0]._private.target,!B.hasUnbundled&&n.id()>r.id()){var I=n;n=r,r=I}i=n.position(),a=r.position(),o=n.outerWidth(),s=n.outerHeight(),l=r.outerWidth(),u=r.outerHeight(),c=g.nodeShapes[this.getNodeShape(n)],h=g.nodeShapes[this.getNodeShape(r)],p=!1;var A={north:0,west:0,south:0,east:0,northwest:0,southwest:0,northeast:0,southeast:0},z=i.x,L=i.y,O=o,R=s,F=a.x,V=a.y,q=l,Y=u,X=B.length;for(w=0;w<B.length;w++){var j,W,H=(_=(M=B[w])._private.rscratch).lastEdgeIndex,K=w,G=_.lastNumEdges,Z=(k="unbundled-bezier"===(j=M.pstyle("curve-style").value)||"segments"===j,n.id()!==M.source().id()),U=M.pstyle("control-point-distances"),$=M.pstyle("loop-direction").pfValue,Q=M.pstyle("loop-sweep").pfValue,J=M.pstyle("control-point-weights"),ee=U&&J?Math.min(U.value.length,J.value.length):1,te=M.pstyle("control-point-step-size").pfValue,ne=U?U.pfValue[0]:void 0,re=J.value[0],ie=M.pstyle("edge-distances").value,ae=M.pstyle("source-distance-from-node").pfValue,oe=M.pstyle("target-distance-from-node").pfValue,se=M.pstyle("segment-weights"),le=M.pstyle("segment-distances"),ue=Math.min(se.pfValue.length,le.pfValue.length),ce=M.pstyle("source-endpoint").value,he=M.pstyle("target-endpoint").value,de=M.pstyle("source-arrow-shape").value,pe=M.pstyle("target-arrow-shape").value,fe=M.pstyle("arrow-scale").value,ge=M.pstyle("width").pfValue,ve=_.lastSrcCtlPtX,ye=_.lastSrcCtlPtY,me=_.lastSrcCtlPtW,be=_.lastSrcCtlPtH,xe=_.lastTgtCtlPtX,we=_.lastTgtCtlPtY,Ee=_.lastTgtCtlPtW,ke=_.lastTgtCtlPtH,Ce=_.lastCurveStyle,Se=j,De=_.lastCtrlptDists,Te=U?U.strValue:null,Pe=_.lastCtrlptWs,_e=J.strValue,Be=_.lastSegmentWs,Ne=se.strValue,Ie=_.lastSegmentDs,Ae=le.strValue,ze=_.lastStepSize,Le=te,Oe=_.lastLoopDir,Re=$,Fe=_.lastLoopSwp,Ve=Q,qe=_.lastEdgeDistances,Ye=ie,Xe=_.lastSrcDistFNode,je=ae,We=_.lastTgtDistFNode,He=oe,Ke=_.lastSrcEndpt,Ge=ce,Ze=_.lastTgtEndpt,Ue=he,$e=_.lastSrcArr,Qe=de,Je=_.lastTgtArr,et=pe,tt=_.lastLineW,nt=ge,it=_.lastArrScl,at=fe;if(_.badBezier=!!p,ve===z&&ye===L&&me===O&&be===R&&xe===F&&we===V&&Ee===q&&ke===Y&&Ce===Se&&De===Te&&Pe===_e&&Be===Ne&&Ie===Ae&&ze===Le&&Oe===Re&&Fe===Ve&&qe===Ye&&Xe===je&&We===He&&Ke===Ge&&Ze===Ue&&$e===Qe&&Je===et&&tt===nt&&it===at&&(H===K&&G===X||k)?W=!0:(W=!1,_.lastSrcCtlPtX=z,_.lastSrcCtlPtY=L,_.lastSrcCtlPtW=O,_.lastSrcCtlPtH=R,_.lastTgtCtlPtX=F,_.lastTgtCtlPtY=V,_.lastTgtCtlPtW=q,_.lastTgtCtlPtH=Y,_.lastEdgeIndex=K,_.lastNumEdges=X,_.lastCurveStyle=Se,_.lastCtrlptDists=Te,_.lastCtrlptWs=_e,_.lastSegmentDs=Ae,_.lastSegmentWs=Ne,_.lastStepSize=Le,_.lastLoopDir=Re,_.lastLoopSwp=Ve,_.lastEdgeDistances=Ye,_.lastSrcDistFNode=je,_.lastTgtDistFNode=He,_.lastSrcEndpt=Ge,_.lastTgtEndpt=Ue,_.lastSrcArr=Qe,_.lastTgtArr=et,_.lastLineW=nt,_.lastArrScl=at),!W){if(!B.calculatedIntersection&&n!==r&&(B.hasBezier||B.hasUnbundled)){B.calculatedIntersection=!0;var ot=c.intersectLine(i.x,i.y,o,s,a.x,a.y,0);B.srcIntn=ot;var st=h.intersectLine(a.x,a.y,l,u,i.x,i.y,0);B.tgtIntn=st;var lt={x1:ot[0],x2:st[0],y1:ot[1],y2:st[1]},ut={x1:i.x,x2:a.x,y1:i.y,y2:a.y},ct=st[1]-ot[1],ht=st[0]-ot[0],dt=Math.sqrt(ht*ht+ct*ct),pt={x:ht,y:ct},ft={x:pt.x/dt,y:pt.y/dt};d={x:-ft.y,y:ft.x},h.checkPoint(ot[0],ot[1],0,l,u,a.x,a.y)&&c.checkPoint(st[0],st[1],0,o,s,i.x,i.y)&&(d={},p=!0)}if(Z?(_.srcIntn=B.tgtIntn,_.tgtIntn=B.srcIntn):(_.srcIntn=B.srcIntn,_.tgtIntn=B.tgtIntn),n===r){_.edgeType="self";var gt=w,vt=te;k&&(gt=0,vt=ne);var yt=$-Math.PI/2,mt=yt-Q/2,bt=yt+Q/2,xt=String($+"_"+Q);gt=void 0===A[xt]?A[xt]=0:++A[xt],_.ctrlpts=[i.x+1.4*Math.cos(mt)*vt*(gt/3+1),i.y+1.4*Math.sin(mt)*vt*(gt/3+1),i.x+1.4*Math.cos(bt)*vt*(gt/3+1),i.y+1.4*Math.sin(bt)*vt*(gt/3+1)]}else if(y&&(n.isParent()||n.isChild()||r.isParent()||r.isChild())&&(n.parents().anySame(r)||r.parents().anySame(n))){_.edgeType="compound",_.badBezier=!1;gt=w,vt=te;k&&(gt=0,vt=ne);var wt={x:i.x-o/2,y:i.y-s/2},Et={x:a.x-l/2,y:a.y-u/2},kt={x:Math.min(wt.x,Et.x),y:Math.min(wt.y,Et.y)},Ct=Math.max(.5,Math.log(.01*o)),St=Math.max(.5,Math.log(.01*l));_.ctrlpts=[kt.x,kt.y-(1+Math.pow(50,1.12)/100)*vt*(gt/3+1)*Ct,kt.x-(1+Math.pow(50,1.12)/100)*vt*(gt/3+1)*St,kt.y]}else if("segments"===j){_.edgeType="segments",_.segpts=[];for(var Dt=0;Dt<ue;Dt++){var Tt=se.pfValue[Dt],Pt=le.pfValue[Dt],Mt=1-Tt,_t=Tt,Bt={x:(Rt="node-position"===ie?ut:lt).x1*Mt+Rt.x2*_t,y:Rt.y1*Mt+Rt.y2*_t};_.segpts.push(Bt.x+d.x*Pt,Bt.y+d.y*Pt)}}else if(B.length%2!=1||w!==Math.floor(B.length/2)||k){var Nt=k;_.edgeType=Nt?"multibezier":"bezier",_.ctrlpts=[];for(var It=0;It<ee;It++){var At,zt=(.5-B.length/2+w)*te,Lt=(f=zt)>0?1:f<0?-1:0;Nt&&(ne=U?U.pfValue[It]:te,re=J.value[It]);var Ot=void 0!==(At=k?ne:void 0!==ne?Lt*ne:void 0)?At:zt;Mt=1-re,_t=re;if(Z){I=Mt;Mt=_t,_t=I}var Rt;Bt={x:(Rt="node-position"===ie?ut:lt).x1*Mt+Rt.x2*_t,y:Rt.y1*Mt+Rt.y2*_t};_.ctrlpts.push(Bt.x+d.x*Ot,Bt.y+d.y*Ot)}}else _.edgeType="straight";this.findEndpoints(M);var Ft=!v(_.startX)||!v(_.startY),Vt=!v(_.arrowStartX)||!v(_.arrowStartY),qt=!v(_.endX)||!v(_.endY),Yt=!v(_.arrowEndX)||!v(_.arrowEndY),Xt=3*(this.getArrowWidth(M.pstyle("width").pfValue,M.pstyle("arrow-scale").value)*this.arrowShapeWidth);if("bezier"===_.edgeType){var jt=rt({x:_.ctrlpts[0],y:_.ctrlpts[1]},{x:_.startX,y:_.startY}),Wt=jt<Xt,Ht=rt({x:_.ctrlpts[0],y:_.ctrlpts[1]},{x:_.endX,y:_.endY}),Kt=Ht<Xt,Gt=!1;if(Ft||Vt||Wt){Gt=!0;var Zt={x:_.ctrlpts[0]-i.x,y:_.ctrlpts[1]-i.y},Ut=Math.sqrt(Zt.x*Zt.x+Zt.y*Zt.y),$t={x:Zt.x/Ut,y:Zt.y/Ut},Qt=Math.max(o,s),Jt={x:_.ctrlpts[0]+2*$t.x*Qt,y:_.ctrlpts[1]+2*$t.y*Qt},en=c.intersectLine(i.x,i.y,o,s,Jt.x,Jt.y,0);Wt?(_.ctrlpts[0]=_.ctrlpts[0]+$t.x*(Xt-jt),_.ctrlpts[1]=_.ctrlpts[1]+$t.y*(Xt-jt)):(_.ctrlpts[0]=en[0]+$t.x*Xt,_.ctrlpts[1]=en[1]+$t.y*Xt)}if(qt||Yt||Kt){Gt=!0;Zt={x:_.ctrlpts[0]-a.x,y:_.ctrlpts[1]-a.y},Ut=Math.sqrt(Zt.x*Zt.x+Zt.y*Zt.y),$t={x:Zt.x/Ut,y:Zt.y/Ut},Qt=Math.max(o,s),Jt={x:_.ctrlpts[0]+2*$t.x*Qt,y:_.ctrlpts[1]+2*$t.y*Qt};var tn=h.intersectLine(a.x,a.y,l,u,Jt.x,Jt.y,0);Kt?(_.ctrlpts[0]=_.ctrlpts[0]+$t.x*(Xt-Ht),_.ctrlpts[1]=_.ctrlpts[1]+$t.y*(Xt-Ht)):(_.ctrlpts[0]=tn[0]+$t.x*Xt,_.ctrlpts[1]=tn[1]+$t.y*Xt)}Gt&&this.findEndpoints(M)}this.checkForInvalidEdgeWarning(M),this.storeAllpts(M),this.storeEdgeProjections(M),this.calculateArrowAngles(M)}this.recalculateEdgeLabelProjections(M),this.calculateLabelAngles(M)}}this.findHaystackPoints(x)}},xo.getSegmentPoints=function(e){var t=e[0]._private.rscratch;if("segments"===t.edgeType)return this.recalculateRenderedStyle(e),wo(t.segpts)},xo.getControlPoints=function(e){var t=e[0]._private.rscratch,n=t.edgeType;if("bezier"===n||"multibezier"===n||"self"===n||"compound"===n)return this.recalculateRenderedStyle(e),wo(t.ctrlpts)},xo.getEdgeMidpoint=function(e){var t=e[0]._private.rscratch;return this.recalculateRenderedStyle(e),{x:t.midX,y:t.midY}};var Eo={manualEndptToPx:function(e,t){var n=e.position(),r=e.outerWidth(),i=e.outerHeight();if(2===t.value.length){var a=[t.pfValue[0],t.pfValue[1]];return"%"===t.units[0]&&(a[0]=a[0]*r),"%"===t.units[1]&&(a[1]=a[1]*i),a[0]+=n.x,a[1]+=n.y,a}var o=t.pfValue[0];o=-Math.PI/2+o;var s=2*Math.max(r,i),l=[n.x+Math.cos(o)*s,n.y+Math.sin(o)*s];return this.nodeShapes[this.getNodeShape(e)].intersectLine(n.x,n.y,r,i,l[0],l[1],0)},findEndpoints:function(e){var t,n,r,i,a,o=this,s=e.source()[0],l=e.target()[0],u=s.position(),c=l.position(),h=e.pstyle("target-arrow-shape").value,d=e.pstyle("source-arrow-shape").value,p=e.pstyle("target-distance-from-node").pfValue,f=e.pstyle("source-distance-from-node").pfValue,g=e._private.rscratch,y=g.edgeType,m="self"===y||"compound"===y,b="bezier"===y||"multibezier"===y||m,x="bezier"!==y,w="straight"===y||"segments"===y,E="segments"===y,k=b||x||w,C=e.pstyle("source-endpoint"),S=m?"outside-to-node":C.value,D=e.pstyle("target-endpoint"),T=m?"outside-to-node":D.value;if(g.srcManEndpt=C,g.tgtManEndpt=D,b){var P=[g.ctrlpts[0],g.ctrlpts[1]];n=x?[g.ctrlpts[g.ctrlpts.length-2],g.ctrlpts[g.ctrlpts.length-1]]:P,r=P}else if(w){var M=E?g.segpts.slice(0,2):[c.x,c.y];n=E?g.segpts.slice(g.segpts.length-2):[u.x,u.y],r=M}if("inside-to-node"===T)t=[c.x,c.y];else if(D.units)t=this.manualEndptToPx(l,D);else if("outside-to-line"===T)t=g.tgtIntn;else if("outside-to-node"===T||"outside-to-node-or-label"===T?i=n:"outside-to-line"!==T&&"outside-to-line-or-label"!==T||(i=[u.x,u.y]),t=o.nodeShapes[this.getNodeShape(l)].intersectLine(c.x,c.y,l.outerWidth(),l.outerHeight(),i[0],i[1],0),"outside-to-node-or-label"===T||"outside-to-line-or-label"===T){var _=l._private.rscratch,B=_.labelWidth,N=_.labelHeight,I=_.labelX,A=_.labelY,z=l.pstyle("text-valign").value;"top"===z?A-=N/2:"bottom"===z&&(A+=N/2);var L=l.pstyle("text-halign").value;"left"===L?I-=B/2:"right"===L&&(I+=B/2);var O=o.nodeShapes.rectangle.intersectLine(I,A,B,N,i[0],i[1],0),R=u,F=it(R,et(t));it(R,et(O))<F&&(t=O)}var V=Bt(t,n,o.arrowShapes[h].spacing(e)+p),q=Bt(t,n,o.arrowShapes[h].gap(e)+p);if(g.endX=q[0],g.endY=q[1],g.arrowEndX=V[0],g.arrowEndY=V[1],"inside-to-node"===S)t=[u.x,u.y];else if(C.units)t=this.manualEndptToPx(s,C);else if("outside-to-line"===S)t=g.srcIntn;else if("outside-to-node"===S||"outside-to-node-or-label"===S?a=r:"outside-to-line"!==S&&"outside-to-line-or-label"!==S||(a=[c.x,c.y]),t=o.nodeShapes[this.getNodeShape(s)].intersectLine(u.x,u.y,s.outerWidth(),s.outerHeight(),a[0],a[1],0),"outside-to-node-or-label"===S||"outside-to-line-or-label"===S){var Y=s._private.rscratch,X=Y.labelWidth,j=Y.labelHeight,W=Y.labelX,H=Y.labelY,K=s.pstyle("text-valign").value;"top"===K?H-=j/2:"bottom"===K&&(H+=j/2);var G=s.pstyle("text-halign").value;"left"===G?W-=X/2:"right"===G&&(W+=X/2);var Z=o.nodeShapes.rectangle.intersectLine(W,H,X,j,a[0],a[1],0),U=c,$=it(U,et(t));it(U,et(Z))<$&&(t=Z)}var Q=Bt(t,r,o.arrowShapes[d].spacing(e)+f),J=Bt(t,r,o.arrowShapes[d].gap(e)+f);g.startX=J[0],g.startY=J[1],g.arrowStartX=Q[0],g.arrowStartY=Q[1],k&&(v(g.startX)&&v(g.startY)&&v(g.endX)&&v(g.endY)?g.badLine=!1:g.badLine=!0)},getSourceEndpoint:function(e){var t=e[0]._private.rscratch;switch(this.recalculateRenderedStyle(e),t.edgeType){case"haystack":return{x:t.haystackPts[0],y:t.haystackPts[1]};default:return{x:t.arrowStartX,y:t.arrowStartY}}},getTargetEndpoint:function(e){var t=e[0]._private.rscratch;switch(this.recalculateRenderedStyle(e),t.edgeType){case"haystack":return{x:t.haystackPts[2],y:t.haystackPts[3]};default:return{x:t.arrowEndX,y:t.arrowEndY}}}},ko={};function Co(e,t,n){for(var r=function(e,t,n,r){return ot(e,t,n,r)},i=t._private.rstyle.bezierPts,a=0;a<e.bezierProjPcts.length;a++){var o=e.bezierProjPcts[a];i.push({x:r(n[0],n[2],n[4],o),y:r(n[1],n[3],n[5],o)})}}ko.storeEdgeProjections=function(e){var t=e._private,n=t.rscratch,r=n.edgeType;if(t.rstyle.bezierPts=null,t.rstyle.linePts=null,t.rstyle.haystackPts=null,"multibezier"===r||"bezier"===r||"self"===r||"compound"===r){t.rstyle.bezierPts=[];for(var i=0;i+5<n.allpts.length;i+=4)Co(this,e,n.allpts.slice(i,i+6))}else if("segments"===r){var a=t.rstyle.linePts=[];for(i=0;i+1<n.allpts.length;i+=2)a.push({x:n.allpts[i],y:n.allpts[i+1]})}else if("haystack"===r){var o=n.haystackPts;t.rstyle.haystackPts=[{x:o[0],y:o[1]},{x:o[2],y:o[3]}]}t.rstyle.arrowWidth=this.getArrowWidth(e.pstyle("width").pfValue,e.pstyle("arrow-scale").value)*this.arrowShapeWidth},ko.recalculateEdgeProjections=function(e){this.findEdgeControlPoints(e)};var So={recalculateNodeLabelProjection:function(e){var t=e.pstyle("label").strValue;if(!k(t)){var n,r,i=e._private,a=e.width(),o=e.height(),s=e.padding(),l=e.position(),u=e.pstyle("text-halign").strValue,c=e.pstyle("text-valign").strValue,h=i.rscratch,d=i.rstyle;switch(u){case"left":n=l.x-a/2-s;break;case"right":n=l.x+a/2+s;break;default:n=l.x}switch(c){case"top":r=l.y-o/2-s;break;case"bottom":r=l.y+o/2+s;break;default:r=l.y}h.labelX=n,h.labelY=r,d.labelX=n,d.labelY=r,this.applyLabelDimensions(e)}}},Do=function(e,t){var n=Math.atan(t/e);return 0===e&&n<0&&(n*=-1),n},To=function(e,t){var n=t.x-e.x,r=t.y-e.y;return Do(n,r)};So.recalculateEdgeLabelProjections=function(e){var t,n=e._private,r=n.rscratch,i=this,a={mid:e.pstyle("label").strValue,source:e.pstyle("source-label").strValue,target:e.pstyle("target-label").strValue};if(a.mid||a.source||a.target){t={x:r.midX,y:r.midY};var o=function(e,t,r){Be(n.rscratch,e,t,r),Be(n.rstyle,e,t,r)};o("labelX",null,t.x),o("labelY",null,t.y);var s=Do(r.midDispX,r.midDispY);o("labelAutoAngle",null,s);var l=function(s){var l,u="source"===s;if(a[s]){var c=e.pstyle(s+"-text-offset").pfValue;switch(r.edgeType){case"self":case"compound":case"bezier":case"multibezier":for(var h,d=function e(){if(e.cache)return e.cache;for(var t=[],a=0;a+5<r.allpts.length;a+=4){var o={x:r.allpts[a],y:r.allpts[a+1]},s={x:r.allpts[a+2],y:r.allpts[a+3]},l={x:r.allpts[a+4],y:r.allpts[a+5]};t.push({p0:o,p1:s,p2:l,startDist:0,length:0,segments:[]})}var u=n.rstyle.bezierPts,c=i.bezierProjPcts.length;function h(e,t,n,r,i){var a=rt(t,n),o=e.segments[e.segments.length-1],s={p0:t,p1:n,t0:r,t1:i,startDist:o?o.startDist+o.length:0,length:a};e.segments.push(s),e.length+=a}for(a=0;a<t.length;a++){var d=t[a],p=t[a-1];p&&(d.startDist=p.startDist+p.length),h(d,d.p0,u[a*c],0,i.bezierProjPcts[0]);for(var f=0;f<c-1;f++)h(d,u[a*c+f],u[a*c+f+1],i.bezierProjPcts[f],i.bezierProjPcts[f+1]);h(d,u[a*c+c-1],d.p2,i.bezierProjPcts[c-1],1)}return e.cache=t}(),p=0,f=0,g=0;g<d.length;g++){for(var v=d[u?g:d.length-1-g],y=0;y<v.segments.length;y++){var m=v.segments[u?y:v.segments.length-1-y],b=g===d.length-1&&y===v.segments.length-1;if(p=f,(f+=m.length)>=c||b){h={cp:v,segment:m};break}}if(h)break}v=h.cp;var x=(c-p)/(m=h.segment).length,w=m.t1-m.t0,E=u?m.t0+w*x:m.t1-w*x;E=lt(0,E,1),t=st(v.p0,v.p1,v.p2,E),l=function(e,t,n,r){var i=lt(0,r-.001,1),a=lt(0,r+.001,1),o=st(e,t,n,i),s=st(e,t,n,a);return To(o,s)}(v.p0,v.p1,v.p2,E);break;case"straight":case"segments":case"haystack":var k,C,S,D,T=0,P=r.allpts.length;for(g=0;g+3<P&&(u?(S={x:r.allpts[g],y:r.allpts[g+1]},D={x:r.allpts[g+2],y:r.allpts[g+3]}):(S={x:r.allpts[P-2-g],y:r.allpts[P-1-g]},D={x:r.allpts[P-4-g],y:r.allpts[P-3-g]}),C=T,!((T+=k=rt(S,D))>=c));g+=2);E=lt(0,E=(c-C)/k,1),t=function(e,t,n,r){var i=t.x-e.x,a=t.y-e.y,o=rt(e,t),s=i/o,l=a/o;return n=null==n?0:n,r=null!=r?r:n*o,{x:e.x+s*r,y:e.y+l*r}}(S,D,E),l=To(S,D)}o("labelX",s,t.x),o("labelY",s,t.y),o("labelAutoAngle",s,l)}};l("source"),l("target"),this.applyLabelDimensions(e)}},So.applyLabelDimensions=function(e){this.applyPrefixedLabelDimensions(e),e.isEdge()&&(this.applyPrefixedLabelDimensions(e,"source"),this.applyPrefixedLabelDimensions(e,"target"))},So.applyPrefixedLabelDimensions=function(e,t){var n=e._private,r=this.getLabelText(e,t),i=this.calculateLabelDimensions(e,r);Be(n.rstyle,"labelWidth",t,i.width),Be(n.rscratch,"labelWidth",t,i.width),Be(n.rstyle,"labelHeight",t,i.height),Be(n.rscratch,"labelHeight",t,i.height)},So.getLabelText=function(e,t){var n=e._private,r=t?t+"-":"",i=e.pstyle(r+"label").strValue,a=e.pstyle("text-transform").value,o=function(e,r){return r?(Be(n.rscratch,e,t,r),r):_e(n.rscratch,e,t)};if(!i)return"";"none"==a||("uppercase"==a?i=i.toUpperCase():"lowercase"==a&&(i=i.toLowerCase()));var s=e.pstyle("text-wrap").value;if("wrap"===s){var l=o("labelKey");if(null!=l&&o("labelWrapKey")===l)return o("labelWrapCachedText");for(var u=i.split("\n"),c=e.pstyle("text-max-width").pfValue,h=[],d=0;d<u.length;d++){var p=u[d];if(this.calculateLabelDimensions(e,p).width>c){for(var f=p.split(/\s+/),g="",v=0;v<f.length;v++){var y=f[v],m=0===g.length?y:g+" "+y;this.calculateLabelDimensions(e,m).width<=c?g+=y+" ":(h.push(g),g=y+" ")}g.match(/^\s+$/)||h.push(g)}else h.push(p)}o("labelWrapCachedLines",h),i=o("labelWrapCachedText",h.join("\n")),o("labelWrapKey",l)}else if("ellipsis"===s){c=e.pstyle("text-max-width").pfValue;for(var b="",x=!1,w=0;w<i.length;w++){if(this.calculateLabelDimensions(e,b+i[w]+"…").width>c)break;b+=i[w],w===i.length-1&&(x=!0)}return x||(b+="…"),b}return i},So.calculateLabelDimensions=function(e,t){var n=he(t,e._private.labelDimsKey),r=this.labelDimCache||(this.labelDimCache=[]),i=r[n];if(null!=i)return i;var a=e.pstyle("font-style").strValue,o=1*e.pstyle("font-size").pfValue+"px",s=e.pstyle("font-family").strValue,l=e.pstyle("font-weight").strValue,u=this.labelCalcDiv;u||(u=this.labelCalcDiv=document.createElement("div"),document.body.appendChild(u));var c=u.style;return c.fontFamily=s,c.fontStyle=a,c.fontSize=o,c.fontWeight=l,c.position="absolute",c.left="-9999px",c.top="-9999px",c.zIndex="-1",c.visibility="hidden",c.pointerEvents="none",c.padding="0",c.lineHeight="1","wrap"===e.pstyle("text-wrap").value?c.whiteSpace="pre":c.whiteSpace="normal",u.textContent=t,r[n]={width:Math.ceil(u.clientWidth/1),height:Math.ceil(u.clientHeight/1)}},So.calculateLabelAngles=function(e){var t=e._private.rscratch,n=e.isEdge(),r=e.pstyle("text-rotation"),i=r.strValue;"none"===i?t.labelAngle=t.sourceLabelAngle=t.targetLabelAngle=0:n&&"autorotate"===i?(t.labelAngle=t.labelAutoAngle,t.sourceLabelAngle=t.sourceLabelAutoAngle,t.targetLabelAngle=t.targetLabelAutoAngle):t.labelAngle=t.sourceLabelAngle=t.targetLabelAngle="autorotate"===i?0:r.pfValue};var Po={},Mo=!1;Po.getNodeShape=function(e){var t=e.pstyle("shape").value;if("cutrectangle"===t&&(e.width()<28||e.height()<28))return Mo||(Ee("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"),Mo=!0),"rectangle";if(e.isParent())return"rectangle"===t||"roundrectangle"===t||"cutrectangle"===t||"barrel"===t?t:"rectangle";if("polygon"===t){var n=e.pstyle("shape-polygon-points").value;return this.nodeShapes.makePolygon(n).name}return t};var _o={registerCalculationListeners:function(){var e=this.cy,t=e.collection(),n=this,r=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(t.merge(e),n)for(var r=0;r<e.length;r++){e[r]._private.rstyle.clean=!1}};n.binder(e).on("bounds.* dirty.*",function(e){var t=e.target;r(t)}).on("style.* background.*",function(e){var t=e.target;r(t,!1)});n.beforeRender(function(i){if(i){for(var a=n.onUpdateEleCalcsFns,o=0;o<t.length;o++)r(t[o].connectedEdges());if(a)for(o=0;o<a.length;o++)(0,a[o])(i,t);n.recalculateRenderedStyle(t),t=e.collection()}},n.beforeRenderPriorities.eleCalcs)},onUpdateEleCalcs:function(e){(this.onUpdateEleCalcsFns=this.onUpdateEleCalcsFns||[]).push(e)},recalculateRenderedStyle:function(e,t){var n=[],r=[];if(!this.destroyed){void 0===t&&(t=!0);for(var i=0;i<e.length;i++){var a=(l=(s=e[i])._private).rstyle;t&&a.clean||s.removed()||"none"!==s.pstyle("display").value&&("nodes"===l.group?r.push(s):n.push(s),a.clean=!0)}for(i=0;i<r.length;i++){a=(l=(s=r[i])._private).rstyle;var o=s.position();this.recalculateNodeLabelProjection(s),a.nodeX=o.x,a.nodeY=o.y,a.nodeW=s.pstyle("width").pfValue,a.nodeH=s.pstyle("height").pfValue}this.recalculateEdgeProjections(n);for(i=0;i<n.length;i++){a=(l=(s=n[i])._private).rstyle;var s,l,u=l.rscratch;this.recalculateEdgeLabelProjections(s),a.srcX=u.arrowStartX,a.srcY=u.arrowStartY,a.tgtX=u.arrowEndX,a.tgtY=u.arrowEndY,a.midX=u.midX,a.midY=u.midY,a.labelAngle=u.labelAngle,a.sourceLabelAngle=u.sourceLabelAngle,a.targetLabelAngle=u.targetLabelAngle}}}},Bo={updateCachedGrabbedEles:function(){var e=this.cachedZSortedEles;if(e){e.drag=[],e.nondrag=[];for(var t=[],n=0;n<e.length;n++){var r=(i=e[n])._private.rscratch;i.grabbed()&&!i.isParent()?t.push(i):r.inDragLayer?e.drag.push(i):e.nondrag.push(i)}for(n=0;n<t.length;n++){var i=t[n];e.drag.push(i)}}},invalidateCachedZSortedEles:function(){this.cachedZSortedEles=null},getCachedZSortedEles:function(e){if(e||!this.cachedZSortedEles){var t=this.cy.mutableElements().toArray();t.sort(Ii),t.interactive=t.filter(function(e){return e.interactive()}),this.cachedZSortedEles=t,this.updateCachedGrabbedEles()}else t=this.cachedZSortedEles;return t}},No={};[mo,bo,xo,Eo,ko,So,Po,_o,Bo].forEach(function(e){I(No,e)});var Io={getCachedImage:function(e,t,n){var r=this.imageCache=this.imageCache||{},i=r[e];if(i)return i.image.complete||i.image.addEventListener("load",n),i.image;var a=(i=r[e]=r[e]||{}).image=new Image;a.addEventListener("load",n),a.addEventListener("error",function(){a.error=!0});return"data:"===e.substring(0,"data:".length).toLowerCase()||(a.crossOrigin=t),a.src=e,a}},Ao={registerBinding:function(e,t,n,r){var i=Array.prototype.slice.apply(arguments,[1]),a=this.binder(e);return a.on.apply(a,i)}};Ao.binder=function(e){var t,n=this,r=e===window||e===document||e===document.body||(t=e,"undefined"!=typeof HTMLElement&&t instanceof HTMLElement);if(null==n.supportsPassiveEvents){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){return i=!0,!0}});window.addEventListener("test",null,a)}catch(e){}n.supportsPassiveEvents=i}var o=function(t,i,a){var o=Array.prototype.slice.call(arguments);return r&&n.supportsPassiveEvents&&(o[2]={capture:null!=a&&a,passive:!1,once:!1}),n.bindings.push({target:e,args:o}),(e.addEventListener||e.on).apply(e,o),this};return{on:o,addEventListener:o,addListener:o,bind:o}},Ao.nodeIsDraggable=function(e){return e&&e.isNode()&&!e.locked()&&e.grabbable()},Ao.nodeIsGrabbable=function(e){return this.nodeIsDraggable(e)&&e.interactive()},Ao.load=function(){var e=this,t=function(e){return e.selected()},n=function(t,n,r,i){null==t&&(t=e.cy);for(var a=0;a<n.length;a++){var o=n[a];t.emit({originalEvent:r,type:o,position:i})}},r=function(e){return e.shiftKey||e.metaKey||e.ctrlKey},i=function(t,n){var r=!0;if(e.cy.hasCompoundNodes()&&t&&t.isEdge())for(var i=0;n&&i<n.length;i++){if((t=n[i]).isNode()&&t.isParent()){r=!1;break}}else r=!0;return r},a=function(e){e[0]._private.rscratch.inDragLayer=!0},o=function(e){e[0]._private.rscratch.isGrabTarget=!0},s=function(e,t){var n=t.addToList;n.has(e)||(n.merge(e),function(e){e[0]._private.grabbed=!0}(e))},l=function(t,n){n=n||{};var r=t.cy().hasCompoundNodes();n.inDragLayer&&(t.forEach(a),t.neighborhood().stdFilter(function(e){return!r||e.isEdge()}).forEach(a)),n.addToList&&t.forEach(function(e){s(e,n)}),function(e,t){if(e.cy().hasCompoundNodes()&&(null!=t.inDragLayer||null!=t.addToList)){var n=e.descendants();t.inDragLayer&&(n.forEach(a),n.connectedEdges().forEach(a)),t.addToList&&t.addToList.unmerge(n)}}(t,n),h(t,{inDragLayer:n.inDragLayer}),e.updateCachedGrabbedEles()},u=l,c=function(t){t&&(e.getCachedZSortedEles().forEach(function(e){!function(e){e[0]._private.grabbed=!1}(e),function(e){e[0]._private.rscratch.inDragLayer=!1}(e),function(e){e[0]._private.rscratch.isGrabTarget=!1}(e)}),e.updateCachedGrabbedEles())},h=function(e,t){if((null!=t.inDragLayer||null!=t.addToList)&&e.cy().hasCompoundNodes()){var n=e.ancestors().orphans();if(!n.same(e)){var r=n.descendants().spawnSelf().merge(n).unmerge(e).unmerge(e.descendants()),i=r.connectedEdges();t.inDragLayer&&(i.forEach(a),r.forEach(a)),t.addToList&&r.forEach(function(e){s(e,t)})}}},d=function(){null!=document.activeElement&&null!=document.activeElement.blur&&document.activeElement.blur()},p="undefined"!=typeof MutationObserver;p?(e.removeObserver=new MutationObserver(function(t){for(var n=0;n<t.length;n++){var r=t[n].removedNodes;if(r)for(var i=0;i<r.length;i++){if(r[i]===e.container){e.destroy();break}}}}),e.container.parentNode&&e.removeObserver.observe(e.container.parentNode,{childList:!0})):e.registerBinding(e.container,"DOMNodeRemoved",function(t){e.destroy()});var f=ne(function(){e.cy.resize()},100);p&&(e.styleObserver=new MutationObserver(f),e.styleObserver.observe(e.container,{attributes:!0})),e.registerBinding(window,"resize",f);var g=function(){e.invalidateContainerClientCoordsCache()};!function(e,t){for(;null!=e;)t(e),e=e.parentNode}(e.container,function(t){e.registerBinding(t,"transitionend",g),e.registerBinding(t,"animationend",g),e.registerBinding(t,"scroll",g)}),e.registerBinding(e.container,"contextmenu",function(e){e.preventDefault()});var y=function(t){for(var n=e.findContainerClientCoords(),r=n[0],i=n[1],a=n[2],o=n[3],s=t.touches?t.touches:[t],l=!1,u=0;u<s.length;u++){var c=s[u];if(r<=c.clientX&&c.clientX<=r+a&&i<=c.clientY&&c.clientY<=i+o){l=!0;break}}if(!l)return!1;for(var h=e.container,d=t.target.parentNode,p=!1;d;){if(d===h){p=!0;break}d=d.parentNode}return!!p};e.registerBinding(e.container,"mousedown",function(t){if(y(t)){t.preventDefault(),d(),e.hoverData.capture=!0,e.hoverData.which=t.which;var r=e.cy,i=[t.clientX,t.clientY],a=e.projectIntoViewport(i[0],i[1]),s=e.selection,c=e.findNearestElements(a[0],a[1],!0,!1),h=c[0],p=e.dragData.possibleDragElements;e.hoverData.mdownPos=a,e.hoverData.mdownGPos=i;if(3==t.which){e.hoverData.cxtStarted=!0;var f={originalEvent:t,type:"cxttapstart",position:{x:a[0],y:a[1]}};h?(h.activate(),h.emit(f),e.hoverData.down=h):r.emit(f),e.hoverData.downTime=(new Date).getTime(),e.hoverData.cxtDragged=!1}else if(1==t.which){if(h&&h.activate(),null!=h&&e.nodeIsGrabbable(h)){var g=function(e){return{originalEvent:t,type:e,position:{x:a[0],y:a[1]}}};if(o(h),h.selected()){p=e.dragData.possibleDragElements=r.collection();var v=r.$(function(t){return t.isNode()&&t.selected()&&e.nodeIsGrabbable(t)});l(v,{addToList:p}),h.emit(g("grabon")),v.forEach(function(e){e.emit(g("grab"))})}else p=e.dragData.possibleDragElements=r.collection(),u(h,{addToList:p}),h.emit(g("grabon")).emit(g("grab"));e.redrawHint("eles",!0),e.redrawHint("drag",!0)}e.hoverData.down=h,e.hoverData.downs=c,e.hoverData.downTime=(new Date).getTime(),n(h,["mousedown","tapstart","vmousedown"],t,{x:a[0],y:a[1]}),null==h?(s[4]=1,e.data.bgActivePosistion={x:a[0],y:a[1]},e.redrawHint("select",!0),e.redraw()):h.isEdge()&&(s[4]=1),e.hoverData.tapholdCancelled=!1,clearTimeout(e.hoverData.tapholdTimeout),e.hoverData.tapholdTimeout=setTimeout(function(){if(!e.hoverData.tapholdCancelled){var n=e.hoverData.down;n?n.emit({originalEvent:t,type:"taphold",position:{x:a[0],y:a[1]}}):r.emit({originalEvent:t,type:"taphold",position:{x:a[0],y:a[1]}})}},e.tapholdDuration)}s[0]=s[2]=a[0],s[1]=s[3]=a[1]}},!1),e.registerBinding(window,"mousemove",function(t){if(e.hoverData.capture||y(t)){var a=!1,o=e.cy,s=o.zoom(),u=[t.clientX,t.clientY],h=e.projectIntoViewport(u[0],u[1]),d=e.hoverData.mdownPos,p=e.hoverData.mdownGPos,f=e.selection,g=null;e.hoverData.draggingEles||e.hoverData.dragging||e.hoverData.selecting||(g=e.findNearestElement(h[0],h[1],!0,!1));var m,b=e.hoverData.last,x=e.hoverData.down,w=[h[0]-f[2],h[1]-f[3]],E=e.dragData.possibleDragElements;if(p){var k=u[0]-p[0],C=k*k,S=u[1]-p[1],D=C+S*S;e.hoverData.isOverThresholdDrag=m=D>=e.desktopTapThreshold2}var T=r(t);m&&(e.hoverData.tapholdCancelled=!0);a=!0,n(g,["mousemove","vmousemove","tapdrag"],t,{x:h[0],y:h[1]});var P=function(){e.data.bgActivePosistion=void 0,e.hoverData.selecting||o.emit({originalEvent:t,type:"boxstart",position:{x:h[0],y:h[1]}}),f[4]=1,e.hoverData.selecting=!0,e.redrawHint("select",!0),e.redraw()};if(3===e.hoverData.which){if(m){var M={originalEvent:t,type:"cxtdrag",position:{x:h[0],y:h[1]}};x?x.emit(M):o.emit(M),e.hoverData.cxtDragged=!0,e.hoverData.cxtOver&&g===e.hoverData.cxtOver||(e.hoverData.cxtOver&&e.hoverData.cxtOver.emit({originalEvent:t,type:"cxtdragout",position:{x:h[0],y:h[1]}}),e.hoverData.cxtOver=g,g&&g.emit({originalEvent:t,type:"cxtdragover",position:{x:h[0],y:h[1]}}))}}else if(e.hoverData.dragging){if(a=!0,o.panningEnabled()&&o.userPanningEnabled()){var _;if(e.hoverData.justStartedPan){var B=e.hoverData.mdownPos;_={x:(h[0]-B[0])*s,y:(h[1]-B[1])*s},e.hoverData.justStartedPan=!1}else _={x:w[0]*s,y:w[1]*s};o.panBy(_),e.hoverData.dragged=!0}h=e.projectIntoViewport(t.clientX,t.clientY)}else if(1!=f[4]||null!=x&&!x.isEdge()){if(x&&x.isEdge()&&x.active()&&x.unactivate(),x&&x.grabbed()||g==b||(b&&n(b,["mouseout","tapdragout"],t,{x:h[0],y:h[1]}),g&&n(g,["mouseover","tapdragover"],t,{x:h[0],y:h[1]}),e.hoverData.last=g),x)if(m){if(o.boxSelectionEnabled()&&T)x&&x.grabbed()&&(c(E),x.emit("freeon"),E.emit("free"),e.dragData.didDrag&&(x.emit("dragfreeon"),E.emit("dragfree"))),P();else if(x&&x.grabbed()&&e.nodeIsDraggable(x)){var N=!e.dragData.didDrag;N&&e.redrawHint("eles",!0),e.dragData.didDrag=!0;var I=o.collection();e.hoverData.draggingEles||l(E,{inDragLayer:!0});var A={x:0,y:0};if(v(w[0])&&v(w[1])&&(A.x+=w[0],A.y+=w[1],N)){var z=e.hoverData.dragDelta;z&&v(z[0])&&v(z[1])&&(A.x+=z[0],A.y+=z[1])}for(var L=0;L<E.length;L++){var O=E[L];e.nodeIsDraggable(O)&&O.grabbed()&&I.merge(O)}e.hoverData.draggingEles=!0,I.silentShift(A).emit("position drag"),e.redrawHint("drag",!0),e.redraw()}}else!function(){var t=e.hoverData.dragDelta=e.hoverData.dragDelta||[];0===t.length?(t.push(w[0]),t.push(w[1])):(t[0]+=w[0],t[1]+=w[1])}();a=!0}else if(m){if(e.hoverData.dragging||!o.boxSelectionEnabled()||!T&&o.panningEnabled()&&o.userPanningEnabled()){if(!e.hoverData.selecting&&o.panningEnabled()&&o.userPanningEnabled()){i(x,e.hoverData.downs)&&(e.hoverData.dragging=!0,e.hoverData.justStartedPan=!0,f[4]=0,e.data.bgActivePosistion=et(d),e.redrawHint("select",!0),e.redraw())}}else P();x&&x.isEdge()&&x.active()&&x.unactivate()}return f[2]=h[0],f[3]=h[1],a?(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),!1):void 0}},!1),e.registerBinding(window,"mouseup",function(i){if(e.hoverData.capture){e.hoverData.capture=!1;var a=e.cy,o=e.projectIntoViewport(i.clientX,i.clientY),s=e.selection,l=e.findNearestElement(o[0],o[1],!0,!1),u=e.dragData.possibleDragElements,h=e.hoverData.down,d=r(i);if(e.data.bgActivePosistion&&(e.redrawHint("select",!0),e.redraw()),e.hoverData.tapholdCancelled=!0,e.data.bgActivePosistion=void 0,h&&h.unactivate(),3===e.hoverData.which){var p={originalEvent:i,type:"cxttapend",position:{x:o[0],y:o[1]}};if(h?h.emit(p):a.emit(p),!e.hoverData.cxtDragged){var f={originalEvent:i,type:"cxttap",position:{x:o[0],y:o[1]}};h?h.emit(f):a.emit(f)}e.hoverData.cxtDragged=!1,e.hoverData.which=null}else if(1===e.hoverData.which){if(n(l,["mouseup","tapend","vmouseup"],i,{x:o[0],y:o[1]}),e.dragData.didDrag||e.hoverData.dragged||e.hoverData.selecting||e.hoverData.isOverThresholdDrag||n(h,["click","tap","vclick"],i,{x:o[0],y:o[1]}),null!=h||e.dragData.didDrag||e.hoverData.selecting||e.hoverData.dragged||r(i)||(a.$(t).unselect(["tapunselect"]),u.length>0&&e.redrawHint("eles",!0),e.dragData.possibleDragElements=u=a.collection()),l!=h||e.dragData.didDrag||e.hoverData.selecting||null!=l&&l._private.selectable&&(e.hoverData.dragging||("additive"===a.selectionType()||d?l.selected()?l.unselect(["tapunselect"]):l.select(["tapselect"]):d||(a.$(t).unmerge(l).unselect(["tapunselect"]),l.select(["tapselect"]))),e.redrawHint("eles",!0)),e.hoverData.selecting){var g=a.collection(e.getAllInBox(s[0],s[1],s[2],s[3]));e.redrawHint("select",!0),g.length>0&&e.redrawHint("eles",!0),a.emit({type:"boxend",originalEvent:i,position:{x:o[0],y:o[1]}});var v=function(e){return e.selectable()&&!e.selected()};"additive"===a.selectionType()?g.emit("box").stdFilter(v).select().emit("boxselect"):(d||a.$(t).unmerge(g).unselect(),g.emit("box").stdFilter(v).select().emit("boxselect")),e.redraw()}if(e.hoverData.dragging&&(e.hoverData.dragging=!1,e.redrawHint("select",!0),e.redrawHint("eles",!0),e.redraw()),!s[4]){e.redrawHint("drag",!0),e.redrawHint("eles",!0);var y=h&&h.grabbed();c(u),y&&(h.emit("freeon"),u.emit("free"),e.dragData.didDrag&&(h.emit("dragfreeon"),u.emit("dragfree")))}}s[4]=0,e.hoverData.down=null,e.hoverData.cxtStarted=!1,e.hoverData.draggingEles=!1,e.hoverData.selecting=!1,e.hoverData.isOverThresholdDrag=!1,e.dragData.didDrag=!1,e.hoverData.dragged=!1,e.hoverData.dragDelta=[],e.hoverData.mdownPos=null,e.hoverData.mdownGPos=null}},!1);var m,b,x,w,E,k,C,S,D,T,P,M,_;e.registerBinding(e.container,"wheel",function(t){if(!e.scrollingPage){var n,r=e.cy,i=e.projectIntoViewport(t.clientX,t.clientY),a=[i[0]*r.zoom()+r.pan().x,i[1]*r.zoom()+r.pan().y];e.hoverData.draggingEles||e.hoverData.dragging||e.hoverData.cxtStarted||0!==e.selection[4]?t.preventDefault():r.panningEnabled()&&r.userPanningEnabled()&&r.zoomingEnabled()&&r.userZoomingEnabled()&&(t.preventDefault(),e.data.wheelZooming=!0,clearTimeout(e.data.wheelTimeout),e.data.wheelTimeout=setTimeout(function(){e.data.wheelZooming=!1,e.redrawHint("eles",!0),e.redraw()},150),n=null!=t.deltaY?t.deltaY/-250:null!=t.wheelDeltaY?t.wheelDeltaY/1e3:t.wheelDelta/1e3,n*=e.wheelSensitivity,1===t.deltaMode&&(n*=33),r.zoom({level:r.zoom()*Math.pow(10,n),renderedPosition:{x:a[0],y:a[1]}}))}},!0),e.registerBinding(window,"scroll",function(t){e.scrollingPage=!0,clearTimeout(e.scrollingPageTimeout),e.scrollingPageTimeout=setTimeout(function(){e.scrollingPage=!1},250)},!0),e.registerBinding(e.container,"mouseout",function(t){var n=e.projectIntoViewport(t.clientX,t.clientY);e.cy.emit({originalEvent:t,type:"mouseout",position:{x:n[0],y:n[1]}})},!1),e.registerBinding(e.container,"mouseover",function(t){var n=e.projectIntoViewport(t.clientX,t.clientY);e.cy.emit({originalEvent:t,type:"mouseover",position:{x:n[0],y:n[1]}})},!1);var B,N,I,A,z=function(e,t,n,r){return Math.sqrt((n-e)*(n-e)+(r-t)*(r-t))},L=function(e,t,n,r){return(n-e)*(n-e)+(r-t)*(r-t)};if(e.registerBinding(e.container,"touchstart",B=function(t){if(y(t)){d(),e.touchData.capture=!0,e.data.bgActivePosistion=void 0;var r=e.cy,i=e.touchData.now,a=e.touchData.earlier;if(t.touches[0]){var s=e.projectIntoViewport(t.touches[0].clientX,t.touches[0].clientY);i[0]=s[0],i[1]=s[1]}if(t.touches[1]){s=e.projectIntoViewport(t.touches[1].clientX,t.touches[1].clientY);i[2]=s[0],i[3]=s[1]}if(t.touches[2]){s=e.projectIntoViewport(t.touches[2].clientX,t.touches[2].clientY);i[4]=s[0],i[5]=s[1]}if(t.touches[1]){c(e.dragData.touchDragEles);var h=e.findContainerClientCoords();D=h[0],T=h[1],P=h[2],M=h[3],m=t.touches[0].clientX-D,b=t.touches[0].clientY-T,x=t.touches[1].clientX-D,w=t.touches[1].clientY-T,_=0<=m&&m<=P&&0<=x&&x<=P&&0<=b&&b<=M&&0<=w&&w<=M;var p=r.pan(),f=r.zoom();E=z(m,b,x,w),k=L(m,b,x,w),S=[((C=[(m+x)/2,(b+w)/2])[0]-p.x)/f,(C[1]-p.y)/f];if(k<4e4&&!t.touches[2]){var g=e.findNearestElement(i[0],i[1],!0,!0),v=e.findNearestElement(i[2],i[3],!0,!0);return g&&g.isNode()?(g.activate().emit({originalEvent:t,type:"cxttapstart",position:{x:i[0],y:i[1]}}),e.touchData.start=g):v&&v.isNode()?(v.activate().emit({originalEvent:t,type:"cxttapstart",position:{x:i[0],y:i[1]}}),e.touchData.start=v):r.emit({originalEvent:t,type:"cxttapstart",position:{x:i[0],y:i[1]}}),e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxt=!0,e.touchData.cxtDragged=!1,e.data.bgActivePosistion=void 0,void e.redraw()}}if(t.touches[2]);else if(t.touches[1]);else if(t.touches[0]){var B=e.findNearestElements(i[0],i[1],!0,!0),N=B[0];if(null!=N&&(N.activate(),e.touchData.start=N,e.touchData.starts=B,e.nodeIsGrabbable(N))){var I=e.dragData.touchDragEles=r.collection(),A=null;e.redrawHint("eles",!0),e.redrawHint("drag",!0),N.selected()?(A=r.$(function(t){return t.selected()&&e.nodeIsGrabbable(t)}),l(A,{addToList:I})):u(N,{addToList:I}),o(N);var O=function(e){return{originalEvent:t,type:e,position:{x:i[0],y:i[1]}}};N.emit(O("grabon")),A?A.forEach(function(e){e.emit(O("grab"))}):N.emit(O("grab"))}n(N,["touchstart","tapstart","vmousedown"],t,{x:i[0],y:i[1]}),null==N&&(e.data.bgActivePosistion={x:s[0],y:s[1]},e.redrawHint("select",!0),e.redraw()),e.touchData.singleTouchMoved=!1,e.touchData.singleTouchStartTime=+new Date,clearTimeout(e.touchData.tapholdTimeout),e.touchData.tapholdTimeout=setTimeout(function(){!1!==e.touchData.singleTouchMoved||e.pinching||e.touchData.selecting||n(e.touchData.start,["taphold"],t,{x:i[0],y:i[1]})},e.tapholdDuration)}if(t.touches.length>=1){for(var R=e.touchData.startPosition=[],F=0;F<i.length;F++)R[F]=a[F]=i[F];var V=t.touches[0];e.touchData.startGPosition=[V.clientX,V.clientY]}}},!1),e.registerBinding(window,"touchmove",N=function(t){var r=e.touchData.capture;if(r||y(t)){var a=e.selection,o=e.cy,s=e.touchData.now,u=e.touchData.earlier,h=o.zoom();if(t.touches[0]){var d=e.projectIntoViewport(t.touches[0].clientX,t.touches[0].clientY);s[0]=d[0],s[1]=d[1]}if(t.touches[1]){d=e.projectIntoViewport(t.touches[1].clientX,t.touches[1].clientY);s[2]=d[0],s[3]=d[1]}if(t.touches[2]){d=e.projectIntoViewport(t.touches[2].clientX,t.touches[2].clientY);s[4]=d[0],s[5]=d[1]}var p,f=e.touchData.startGPosition;if(r&&t.touches[0]&&f){for(var g=[],C=0;C<s.length;C++)g[C]=s[C]-u[C];var P=t.touches[0].clientX-f[0],M=P*P,B=t.touches[0].clientY-f[1];p=M+B*B>=e.touchTapThreshold2}if(r&&e.touchData.cxt){t.preventDefault();var N=t.touches[0].clientX-D,I=t.touches[0].clientY-T,A=t.touches[1].clientX-D,O=t.touches[1].clientY-T,R=L(N,I,A,O);if(R/k>=2.25||R>=22500){e.touchData.cxt=!1,e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);var F={originalEvent:t,type:"cxttapend",position:{x:s[0],y:s[1]}};e.touchData.start?(e.touchData.start.unactivate().emit(F),e.touchData.start=null):o.emit(F)}}if(r&&e.touchData.cxt){F={originalEvent:t,type:"cxtdrag",position:{x:s[0],y:s[1]}};e.data.bgActivePosistion=void 0,e.redrawHint("select",!0),e.touchData.start?e.touchData.start.emit(F):o.emit(F),e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxtDragged=!0;var V=e.findNearestElement(s[0],s[1],!0,!0);e.touchData.cxtOver&&V===e.touchData.cxtOver||(e.touchData.cxtOver&&e.touchData.cxtOver.emit({originalEvent:t,type:"cxtdragout",position:{x:s[0],y:s[1]}}),e.touchData.cxtOver=V,V&&V.emit({originalEvent:t,type:"cxtdragover",position:{x:s[0],y:s[1]}}))}else if(r&&t.touches[2]&&o.boxSelectionEnabled())t.preventDefault(),e.data.bgActivePosistion=void 0,this.lastThreeTouch=+new Date,e.touchData.selecting||o.emit({originalEvent:t,type:"boxstart",position:{x:s[0],y:s[1]}}),e.touchData.selecting=!0,e.redrawHint("select",!0),a&&0!==a.length&&void 0!==a[0]?(a[2]=(s[0]+s[2]+s[4])/3,a[3]=(s[1]+s[3]+s[5])/3):(a[0]=(s[0]+s[2]+s[4])/3,a[1]=(s[1]+s[3]+s[5])/3,a[2]=(s[0]+s[2]+s[4])/3+1,a[3]=(s[1]+s[3]+s[5])/3+1),a[4]=1,e.touchData.selecting=!0,e.redraw();else if(r&&t.touches[1]&&o.zoomingEnabled()&&o.panningEnabled()&&o.userZoomingEnabled()&&o.userPanningEnabled()){if(t.preventDefault(),e.data.bgActivePosistion=void 0,e.redrawHint("select",!0),ee=e.dragData.touchDragEles){e.redrawHint("drag",!0);for(var q=0;q<ee.length;q++){var Y=ee[q]._private;Y.grabbed=!1,Y.rscratch.inDragLayer=!1}}var X=e.touchData.start,j=(N=t.touches[0].clientX-D,I=t.touches[0].clientY-T,A=t.touches[1].clientX-D,O=t.touches[1].clientY-T,z(N,I,A,O)),W=j/E;if(_){var H=(N-m+(A-x))/2,K=(I-b+(O-w))/2,G=o.zoom(),Z=G*W,U=o.pan(),$=S[0]*G+U.x,Q=S[1]*G+U.y,J={x:-Z/G*($-U.x-H)+$,y:-Z/G*(Q-U.y-K)+Q};if(X&&X.active()){var ee=e.dragData.touchDragEles;c(ee),e.redrawHint("drag",!0),e.redrawHint("eles",!0),X.unactivate().emit("freeon"),ee.emit("free"),e.dragData.didDrag&&(X.emit("dragfreeon"),ee.emit("dragfree"))}o.viewport({zoom:Z,pan:J,cancelOnFailedZoom:!0}),E=j,m=N,b=I,x=A,w=O,e.pinching=!0}if(t.touches[0]){d=e.projectIntoViewport(t.touches[0].clientX,t.touches[0].clientY);s[0]=d[0],s[1]=d[1]}if(t.touches[1]){d=e.projectIntoViewport(t.touches[1].clientX,t.touches[1].clientY);s[2]=d[0],s[3]=d[1]}if(t.touches[2]){d=e.projectIntoViewport(t.touches[2].clientX,t.touches[2].clientY);s[4]=d[0],s[5]=d[1]}}else if(t.touches[0]){var te=e.touchData.start,ne=e.touchData.last;if(e.hoverData.draggingEles||e.swipePanning||(V=e.findNearestElement(s[0],s[1],!0,!0)),r&&null!=te&&t.preventDefault(),r&&null!=te&&e.nodeIsDraggable(te))if(p){ee=e.dragData.touchDragEles;var re=!e.dragData.didDrag;re&&l(ee,{inDragLayer:!0}),e.dragData.didDrag=!0;var ie={x:0,y:0};if(v(g[0])&&v(g[1]))if(ie.x+=g[0],ie.y+=g[1],re)e.redrawHint("eles",!0),(ae=e.touchData.dragDelta)&&v(ae[0])&&v(ae[1])&&(ie.x+=ae[0],ie.y+=ae[1]);e.hoverData.draggingEles=!0,ee.silentShift(ie).emit("position drag"),e.redrawHint("drag",!0),e.touchData.startPosition[0]==u[0]&&e.touchData.startPosition[1]==u[1]&&e.redrawHint("eles",!0),e.redraw()}else{var ae;0===(ae=e.touchData.dragDelta=e.touchData.dragDelta||[]).length?(ae.push(g[0]),ae.push(g[1])):(ae[0]+=g[0],ae[1]+=g[1])}if(n(te||V,["touchmove","tapdrag","vmousemove"],t,{x:s[0],y:s[1]}),te&&te.grabbed()||V==ne||(ne&&ne.emit({originalEvent:t,type:"tapdragout",position:{x:s[0],y:s[1]}}),V&&V.emit({originalEvent:t,type:"tapdragover",position:{x:s[0],y:s[1]}})),e.touchData.last=V,r)for(q=0;q<s.length;q++)s[q]&&e.touchData.startPosition[q]&&p&&(e.touchData.singleTouchMoved=!0);if(r&&(null==te||te.isEdge())&&o.panningEnabled()&&o.userPanningEnabled()){i(te,e.touchData.starts)&&(t.preventDefault(),e.swipePanning?o.panBy({x:g[0]*h,y:g[1]*h}):p&&(e.swipePanning=!0,o.panBy({x:P*h,y:B*h}),te&&(te.unactivate(),e.data.bgActivePosistion||(e.data.bgActivePosistion=et(e.touchData.startPosition)),e.redrawHint("select",!0),e.touchData.start=null)));d=e.projectIntoViewport(t.touches[0].clientX,t.touches[0].clientY);s[0]=d[0],s[1]=d[1]}}for(C=0;C<s.length;C++)u[C]=s[C];r&&t.touches.length>0&&!e.hoverData.draggingEles&&!e.swipePanning&&null!=e.data.bgActivePosistion&&(e.data.bgActivePosistion=void 0,e.redrawHint("select",!0),e.redraw())}},!1),e.registerBinding(window,"touchcancel",I=function(t){var n=e.touchData.start;e.touchData.capture=!1,n&&n.unactivate()}),e.registerBinding(window,"touchend",A=function(r){var i=e.touchData.start;if(e.touchData.capture){0===r.touches.length&&(e.touchData.capture=!1),r.preventDefault();var a=e.selection;e.swipePanning=!1,e.hoverData.draggingEles=!1;var o,s=e.cy,l=s.zoom(),u=e.touchData.now,h=e.touchData.earlier;if(r.touches[0]){var d=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);u[0]=d[0],u[1]=d[1]}if(r.touches[1]){d=e.projectIntoViewport(r.touches[1].clientX,r.touches[1].clientY);u[2]=d[0],u[3]=d[1]}if(r.touches[2]){d=e.projectIntoViewport(r.touches[2].clientX,r.touches[2].clientY);u[4]=d[0],u[5]=d[1]}if(i&&i.unactivate(),e.touchData.cxt){if(o={originalEvent:r,type:"cxttapend",position:{x:u[0],y:u[1]}},i?i.emit(o):s.emit(o),!e.touchData.cxtDragged){var p={originalEvent:r,type:"cxttap",position:{x:u[0],y:u[1]}};i?i.emit(p):s.emit(p)}return e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxt=!1,e.touchData.start=null,void e.redraw()}if(!r.touches[2]&&s.boxSelectionEnabled()&&e.touchData.selecting){e.touchData.selecting=!1;var f=s.collection(e.getAllInBox(a[0],a[1],a[2],a[3]));a[0]=void 0,a[1]=void 0,a[2]=void 0,a[3]=void 0,a[4]=0,e.redrawHint("select",!0),s.emit({type:"boxend",originalEvent:r,position:{x:u[0],y:u[1]}});f.emit("box").stdFilter(function(e){return e.selectable()&&!e.selected()}).select().emit("boxselect"),f.nonempty()&&e.redrawHint("eles",!0),e.redraw()}if(null!=i&&i.unactivate(),r.touches[2])e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);else if(r.touches[1]);else if(r.touches[0]);else if(!r.touches[0]){e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);var g=e.dragData.touchDragEles;if(null!=i){var v=i._private.grabbed;c(g),e.redrawHint("drag",!0),e.redrawHint("eles",!0),v&&(i.emit("freeon"),g.emit("free"),e.dragData.didDrag&&(i.emit("dragfreeon"),g.emit("dragfree"))),n(i,["touchend","tapend","vmouseup","tapdragout"],r,{x:u[0],y:u[1]}),i.unactivate(),e.touchData.start=null}else{var y=e.findNearestElement(u[0],u[1],!0,!0);n(y,["touchend","tapend","vmouseup","tapdragout"],r,{x:u[0],y:u[1]})}var m=e.touchData.startPosition[0]-u[0],b=m*m,x=e.touchData.startPosition[1]-u[1],w=(b+x*x)*l*l;e.touchData.singleTouchMoved||(i||s.$(":selected").unselect(["tapunselect"]),n(i,["tap","vclick"],r,{x:u[0],y:u[1]})),null!=i&&!e.dragData.didDrag&&i._private.selectable&&w<e.touchTapThreshold2&&!e.pinching&&("single"===s.selectionType()?(s.$(t).unmerge(i).unselect(["tapunselect"]),i.select(["tapselect"])):i.selected()?i.unselect(["tapunselect"]):i.select(["tapselect"]),e.redrawHint("eles",!0)),e.touchData.singleTouchMoved=!0}for(var E=0;E<u.length;E++)h[E]=u[E];e.dragData.didDrag=!1,0===r.touches.length&&(e.touchData.dragDelta=[],e.touchData.startPosition=null,e.touchData.startGPosition=null),r.touches.length<2&&(e.pinching=!1,e.redrawHint("eles",!0),e.redraw())}},!1),"undefined"==typeof TouchEvent){var O=[],R=function(e){return{clientX:e.clientX,clientY:e.clientY,force:1,identifier:e.pointerId,pageX:e.pageX,pageY:e.pageY,radiusX:e.width/2,radiusY:e.height/2,screenX:e.screenX,screenY:e.screenY,target:e.target}},F=function(e){O.push(function(e){return{event:e,touch:R(e)}}(e))},V=function(e){for(var t=0;t<O.length;t++){if(O[t].event.pointerId===e.pointerId)return void O.splice(t,1)}},q=function(e){e.touches=O.map(function(e){return e.touch})},Y=function(e){return"mouse"===e.pointerType||4===e.pointerType};e.registerBinding(e.container,"pointerdown",function(e){Y(e)||(e.preventDefault(),F(e),q(e),B(e))}),e.registerBinding(e.container,"pointerup",function(e){Y(e)||(V(e),q(e),A(e))}),e.registerBinding(e.container,"pointercancel",function(e){Y(e)||(V(e),q(e),I())}),e.registerBinding(e.container,"pointermove",function(e){Y(e)||(e.preventDefault(),function(e){var t=O.filter(function(t){return t.event.pointerId===e.pointerId})[0];t.event=e,t.touch=R(e)}(e),q(e),N(e))})}};var zo={generatePolygon:function(e,t){return this.nodeShapes[e]={renderer:this,name:e,points:t,draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl("polygon",e,t,n,r,i,this.points)},intersectLine:function(e,t,n,r,i,a,o){return _t(i,a,this.points,e,t,n/2,r/2,o)},checkPoint:function(e,t,n,r,i,a,o){return kt(e,t,this.points,a,o,r,i,[0,-1],n)}}}};zo.generateEllipse=function(){return this.nodeShapes.ellipse={renderer:this,name:"ellipse",draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl(this.name,e,t,n,r,i)},intersectLine:function(e,t,n,r,i,a,o){return function(e,t,n,r,i,a){var o=n-e,s=r-t;o/=i,s/=a;var l=Math.sqrt(o*o+s*s),u=l-1;if(u<0)return[];var c=u/l;return[(n-e)*c+e,(r-t)*c+t]}(i,a,e,t,n/2+o,r/2+o)},checkPoint:function(e,t,n,r,i,a,o){return Dt(e,t,r,i,a,o,n)}}},zo.generateRoundRectangle=function(){return this.nodeShapes["round-rectangle"]=this.nodeShapes.roundrectangle={renderer:this,name:"round-rectangle",points:Nt(4,0),draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl(this.name,e,t,n,r,i)},intersectLine:function(e,t,n,r,i,a,o){return yt(i,a,e,t,n,r,o)},checkPoint:function(e,t,n,r,i,a,o){var s=zt(r,i),l=2*s;return!!kt(e,t,this.points,a,o,r,i-l,[0,-1],n)||(!!kt(e,t,this.points,a,o,r-l,i,[0,-1],n)||(!!Dt(e,t,l,l,a-r/2+s,o-i/2+s,n)||(!!Dt(e,t,l,l,a+r/2-s,o-i/2+s,n)||(!!Dt(e,t,l,l,a+r/2-s,o+i/2-s,n)||!!Dt(e,t,l,l,a-r/2+s,o+i/2-s,n)))))}}},zo.generateCutRectangle=function(){return this.nodeShapes["cut-rectangle"]=this.nodeShapes.cutrectangle={renderer:this,name:"cut-rectangle",cornerLength:8,points:Nt(4,0),draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl(this.name,e,t,n,r,i)},generateCutTrianglePts:function(e,t,n,r){var i=this.cornerLength,a=t/2,o=e/2,s=n-o,l=n+o,u=r-a,c=r+a;return{topLeft:[s,u+i,s+i,u,s+i,u+i],topRight:[l-i,u,l,u+i,l-i,u+i],bottomRight:[l,c-i,l-i,c,l-i,c-i],bottomLeft:[s+i,c,s,c-i,s+i,c-i]}},intersectLine:function(e,t,n,r,i,a,o){var s=this.generateCutTrianglePts(n+2*o,r+2*o,e,t),l=[].concat.apply([],[s.topLeft.splice(0,4),s.topRight.splice(0,4),s.bottomRight.splice(0,4),s.bottomLeft.splice(0,4)]);return _t(i,a,l,e,t)},checkPoint:function(e,t,n,r,i,a,o){if(kt(e,t,this.points,a,o,r,i-2*this.cornerLength,[0,-1],n))return!0;if(kt(e,t,this.points,a,o,r-2*this.cornerLength,i,[0,-1],n))return!0;var s=this.generateCutTrianglePts(r,i,a,o);return Et(e,t,s.topLeft)||Et(e,t,s.topRight)||Et(e,t,s.bottomRight)||Et(e,t,s.bottomLeft)}}},zo.generateBarrel=function(){return this.nodeShapes.barrel={renderer:this,name:"barrel",points:Nt(4,0),draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl(this.name,e,t,n,r,i)},intersectLine:function(e,t,n,r,i,a,o){var s=this.generateBarrelBezierPts(n+2*o,r+2*o,e,t),l=function(e){var t=st({x:e[0],y:e[1]},{x:e[2],y:e[3]},{x:e[4],y:e[5]},.15),n=st({x:e[0],y:e[1]},{x:e[2],y:e[3]},{x:e[4],y:e[5]},.5),r=st({x:e[0],y:e[1]},{x:e[2],y:e[3]},{x:e[4],y:e[5]},.85);return[e[0],e[1],t.x,t.y,n.x,n.y,r.x,r.y,e[4],e[5]]},u=[].concat(l(s.topLeft),l(s.topRight),l(s.bottomRight),l(s.bottomLeft));return _t(i,a,u,e,t)},generateBarrelBezierPts:function(e,t,n,r){var i=t/2,a=e/2,o=n-a,s=n+a,l=r-i,u=r+i,c=Lt(e,t),h=c.heightOffset,d=c.widthOffset,p=c.ctrlPtOffsetPct*e,f={topLeft:[o,l+h,o+p,l,o+d,l],topRight:[s-d,l,s-p,l,s,l+h],bottomRight:[s,u-h,s-p,u,s-d,u],bottomLeft:[o+d,u,o+p,u,o,u-h]};return f.topLeft.isTop=!0,f.topRight.isTop=!0,f.bottomLeft.isBottom=!0,f.bottomRight.isBottom=!0,f},checkPoint:function(e,t,n,r,i,a,o){var s=Lt(r,i),l=s.heightOffset,u=s.widthOffset;if(kt(e,t,this.points,a,o,r,i-2*l,[0,-1],n))return!0;if(kt(e,t,this.points,a,o,r-2*u,i,[0,-1],n))return!0;for(var c=this.generateBarrelBezierPts(r,i,a,o),h=function(e,t,n){var r,i,a=n[4],o=n[2],s=n[0],l=n[5],u=n[1],c=Math.min(a,s),h=Math.max(a,s),d=Math.min(l,u),p=Math.max(l,u);if(c<=e&&e<=h&&d<=t&&t<=p){var f=[(r=a)-2*(i=o)+s,2*(i-r),r],g=function(e,t,n,r){var i=t*t-4*e*(n-=r);if(i<0)return[];var a=Math.sqrt(i),o=2*e;return[(-t+a)/o,(-t-a)/o]}(f[0],f[1],f[2],e).filter(function(e){return 0<=e&&e<=1});if(g.length>0)return g[0]}return null},d=Object.keys(c),p=0;p<d.length;p++){var f=c[d[p]],g=h(e,t,f);if(null!=g){var v=f[5],y=f[3],m=f[1],b=ot(v,y,m,g);if(f.isTop&&b<=t)return!0;if(f.isBottom&&t<=b)return!0}}return!1}}},zo.generateBottomRoundrectangle=function(){return this.nodeShapes["bottom-round-rectangle"]=this.nodeShapes.bottomroundrectangle={renderer:this,name:"bottom-round-rectangle",points:Nt(4,0),draw:function(e,t,n,r,i){this.renderer.nodeShapeImpl(this.name,e,t,n,r,i)},intersectLine:function(e,t,n,r,i,a,o){var s=t-(r/2+o),l=Mt(i,a,e,t,e-(n/2+o),s,e+(n/2+o),s,!1);return l.length>0?l:yt(i,a,e,t,n,r,o)},checkPoint:function(e,t,n,r,i,a,o){var s=zt(r,i),l=2*s;if(kt(e,t,this.points,a,o,r,i-l,[0,-1],n))return!0;if(kt(e,t,this.points,a,o,r-l,i,[0,-1],n))return!0;var u=r/2+2*n,c=i/2+2*n;return!!Et(e,t,[a-u,o-c,a-u,o,a+u,o,a+u,o-c])||(!!Dt(e,t,l,l,a+r/2-s,o+i/2-s,n)||!!Dt(e,t,l,l,a-r/2+s,o+i/2-s,n))}}},zo.registerNodeShapes=function(){var e=this.nodeShapes={},t=this;this.generateEllipse(),this.generatePolygon("triangle",Nt(3,0)),this.generatePolygon("rectangle",Nt(4,0)),e.square=e.rectangle,this.generateRoundRectangle(),this.generateCutRectangle(),this.generateBarrel(),this.generateBottomRoundrectangle(),this.generatePolygon("diamond",[0,1,1,0,0,-1,-1,0]),this.generatePolygon("pentagon",Nt(5,0)),this.generatePolygon("hexagon",Nt(6,0)),this.generatePolygon("heptagon",Nt(7,0)),this.generatePolygon("octagon",Nt(8,0));var n=new Array(20),r=At(5,0),i=At(5,Math.PI/5),a=.5*(3-Math.sqrt(5));a*=1.57;for(var o=0;o<i.length/2;o++)i[2*o]*=a,i[2*o+1]*=a;for(o=0;o<5;o++)n[4*o]=r[2*o],n[4*o+1]=r[2*o+1],n[4*o+2]=i[2*o],n[4*o+3]=i[2*o+1];n=It(n),this.generatePolygon("star",n),this.generatePolygon("vee",[-1,-1,0,-.333,1,-1,0,1]),this.generatePolygon("rhomboid",[-1,-1,.333,-1,1,1,-.333,1]),this.nodeShapes.concavehexagon=this.generatePolygon("concave-hexagon",[-1,-.95,-.75,0,-1,.95,1,.95,.75,0,1,-.95]),this.generatePolygon("tag",[-1,-1,.25,-1,1,0,.25,1,-1,1]),e.makePolygon=function(e){var n,r="polygon-"+e.join("$");return(n=this[r])?n:t.generatePolygon(r,e)}};var Lo={timeToRender:function(){return this.redrawTotalTime/this.redrawCount},redraw:function(e){e=e||De();var t=this;void 0===t.averageRedrawTime&&(t.averageRedrawTime=0),void 0===t.lastRedrawTime&&(t.lastRedrawTime=0),void 0===t.lastDrawTime&&(t.lastDrawTime=0),t.requestedFrame=!0,t.renderOptions=e},beforeRender:function(e,t){if(!this.destroyed){t=t||0;var n=this.beforeRenderCallbacks;n.push({fn:e,priority:t}),n.sort(function(e,t){return t.priority-e.priority})}}},Oo=function(e,t,n){for(var r=e.beforeRenderCallbacks,i=0;i<r.length;i++)r[i].fn(t,n)};Lo.startRenderLoop=function(){var e=this;if(!e.renderLoopStarted){e.renderLoopStarted=!0;oe(function t(n){if(!e.destroyed){if(e.requestedFrame&&!e.skipFrame){Oo(e,!0,n);var r=se();e.render(e.renderOptions);var i=e.lastDrawTime=se();void 0===e.averageRedrawTime&&(e.averageRedrawTime=i-r),void 0===e.redrawCount&&(e.redrawCount=0),e.redrawCount++,void 0===e.redrawTotalTime&&(e.redrawTotalTime=0);var a=i-r;e.redrawTotalTime+=a,e.lastRedrawTime=a,e.averageRedrawTime=e.averageRedrawTime/2+a/2,e.requestedFrame=!1}else Oo(e,!1,n);e.skipFrame=!1,oe(t)}})}};var Ro=function(e){this.init(e)},Fo=Ro.prototype;Fo.clientFunctions=["redrawHint","render","renderTo","matchCanvasSize","nodeShapeImpl","arrowShapeImpl"],Fo.init=function(e){var t=this;t.options=e,t.cy=e.cy;var n=t.container=e.cy.container();if(a){var r=a.document,i=r.head,o="__________cytoscape_container",s=null!=r.getElementById("__________cytoscape_stylesheet");if(n.className.indexOf(o)<0&&(n.className=(n.className||"")+" "+o),!s){var l=r.createElement("style");l.id="__________cytoscape_stylesheet",l.innerHTML="."+o+" { position: relative; }",i.insertBefore(l,i.children[0])}"static"===a.getComputedStyle(n).getPropertyValue("position")&&Ee("A Cytoscape container has style position:static and so can not use UI extensions properly")}t.selection=[void 0,void 0,void 0,void 0,0],t.bezierProjPcts=[.05,.225,.4,.5,.6,.775,.95],t.hoverData={down:null,last:null,downTime:null,triggerMode:null,dragging:!1,initialPan:[null,null],capture:!1},t.dragData={possibleDragElements:[]},t.touchData={start:null,capture:!1,startPosition:[null,null,null,null,null,null],singleTouchStartTime:null,singleTouchMoved:!0,now:[null,null,null,null,null,null],earlier:[null,null,null,null,null,null]},t.redraws=0,t.showFps=e.showFps,t.debug=e.debug,t.hideEdgesOnViewport=e.hideEdgesOnViewport,t.hideLabelsOnViewport=e.hideLabelsOnViewport,t.textureOnViewport=e.textureOnViewport,t.wheelSensitivity=e.wheelSensitivity,t.motionBlurEnabled=e.motionBlur,t.forcedPixelRatio=e.pixelRatio,t.motionBlur=e.motionBlur,t.motionBlurOpacity=e.motionBlurOpacity,t.motionBlurTransparency=1-t.motionBlurOpacity,t.motionBlurPxRatio=1,t.mbPxRBlurry=1,t.minMbLowQualFrames=4,t.fullQualityMb=!1,t.clearedForMotionBlur=[],t.desktopTapThreshold=e.desktopTapThreshold,t.desktopTapThreshold2=e.desktopTapThreshold*e.desktopTapThreshold,t.touchTapThreshold=e.touchTapThreshold,t.touchTapThreshold2=e.touchTapThreshold*e.touchTapThreshold,t.tapholdDuration=500,t.bindings=[],t.beforeRenderCallbacks=[],t.beforeRenderPriorities={animations:400,eleCalcs:300,eleTxrDeq:200,lyrTxrDeq:100},t.registerNodeShapes(),t.registerArrowShapes(),t.registerCalculationListeners()},Fo.notify=function(e,t){var n=this,r=n.cy;this.destroyed||("init"!==e?"destroy"!==e?(("add"===e||"remove"===e||"move"===e&&r.hasCompoundNodes()||"load"===e||"zorder"===e||"mount"===e)&&n.invalidateCachedZSortedEles(),"viewport"===e&&n.redrawHint("select",!0),"load"!==e&&"resize"!==e&&"mount"!==e||(n.invalidateContainerClientCoordsCache(),n.matchCanvasSize(n.container)),n.redrawHint("eles",!0),n.redrawHint("drag",!0),this.startRenderLoop(),this.redraw()):n.destroy():n.load())},Fo.destroy=function(){var e=this;e.destroyed=!0,e.cy.stopAnimationLoop();for(var t=0;t<e.bindings.length;t++){var n=e.bindings[t],r=n.target;(r.off||r.removeEventListener).apply(r,n.args)}if(e.bindings=[],e.beforeRenderCallbacks=[],e.onUpdateEleCalcsFns=[],e.removeObserver&&e.removeObserver.disconnect(),e.styleObserver&&e.styleObserver.disconnect(),e.labelCalcDiv)try{document.body.removeChild(e.labelCalcDiv)}catch(e){}},Fo.isHeadless=function(){return!1},[yo,No,Io,Ao,zo,Lo].forEach(function(e){I(Fo,e)});var Vo=function(e){return function(){var t=this,n=this.renderer;if(!t.dequeueingSetup){t.dequeueingSetup=!0;var r=ne(function(){n.redrawHint("eles",!0),n.redrawHint("drag",!0),n.redraw()},e.deqRedrawThreshold),i=e.priority||xe;n.beforeRender(function(i,a){for(var o=se(),s=n.averageRedrawTime,l=n.lastRedrawTime,u=[],c=n.cy.extent(),h=n.getPixelRatio();;){var d=se(),p=d-o,f=d-a;if(l<1e3/60){var g=1e3/60-(i?s:0);if(f>=e.deqFastCost*g)break}else if(i){if(p>=e.deqCost*l||p>=e.deqAvgCost*s)break}else if(f>=e.deqNoDrawCost*(1e3/60))break;var v=e.deq(t,h,c);if(!(v.length>0))break;for(var y=0;y<v.length;y++)u.push(v[y])}u.length>0&&(e.onDeqd(t,u),!i&&e.shouldRedraw(t,u,h,c)&&r())},i(t))}}},qo=function(){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:me;t(this,e),this.idsByKey=new Ne,this.keyForId=new Ne,this.cachesByLvl=new Ne,this.lvls=[],this.getKey=n,this.doesEleInvalidateKey=r}return r(e,[{key:"getIdsFor",value:function(e){null==e&&we("Can not get id list for null key");var t=this.idsByKey,n=this.idsByKey.get(e);return n||(n=new Ae,t.set(e,n)),n}},{key:"addIdForKey",value:function(e,t){null!=e&&this.getIdsFor(e).add(t)}},{key:"deleteIdForKey",value:function(e,t){null!=e&&this.getIdsFor(e).delete(t)}},{key:"getNumberOfIdsForKey",value:function(e){return null==e?0:this.getIdsFor(e).size}},{key:"updateKeyMappingFor",value:function(e){var t=e.id(),n=this.keyForId.get(t),r=this.getKey(e);this.deleteIdForKey(n,t),this.addIdForKey(r,t),this.keyForId.set(t,r)}},{key:"deleteKeyMappingFor",value:function(e){var t=e.id(),n=this.keyForId.get(t);this.deleteIdForKey(n,t),this.keyForId.delete(t)}},{key:"keyHasChangedFor",value:function(e){var t=e.id();return this.keyForId.get(t)!==this.getKey(e)}},{key:"isInvalid",value:function(e){return this.keyHasChangedFor(e)||this.doesEleInvalidateKey(e)}},{key:"getCachesAt",value:function(e){var t=this.cachesByLvl,n=this.lvls,r=t.get(e);return r||(r=new Ne,t.set(e,r),n.push(e)),r}},{key:"getCache",value:function(e,t){return this.getCachesAt(t).get(e)}},{key:"get",value:function(e,t){var n=this.getKey(e),r=this.getCache(n,t);return null!=r&&this.updateKeyMappingFor(e),r}},{key:"getForCachedKey",value:function(e,t){var n=this.keyForId.get(e.id());return this.getCache(n,t)}},{key:"hasCache",value:function(e,t){return this.getCachesAt(t).has(e)}},{key:"has",value:function(e,t){var n=this.getKey(e);return this.hasCache(n,t)}},{key:"setCache",value:function(e,t,n){n.key=e,this.getCachesAt(t).set(e,n)}},{key:"set",value:function(e,t,n){var r=this.getKey(e);this.setCache(r,t,n),this.updateKeyMappingFor(e)}},{key:"deleteCache",value:function(e,t){this.getCachesAt(t).delete(e)}},{key:"delete",value:function(e,t){var n=this.getKey(e);this.deleteCache(n,t)}},{key:"invalidateKey",value:function(e){var t=this;this.lvls.forEach(function(n){return t.deleteCache(e,n)})}},{key:"invalidate",value:function(e){var t=e.id(),n=this.keyForId.get(t);this.deleteKeyMappingFor(e);var r=this.doesEleInvalidateKey(e);return r&&this.invalidateKey(n),r||0===this.getNumberOfIdsForKey(n)}}]),e}(),Yo={dequeue:"dequeue",downscale:"downscale",highQuality:"highQuality"},Xo=Te({getKey:null,doesEleInvalidateKey:me,drawElement:null,getBoundingBox:null,getRotationPoint:null,getRotationOffset:null,isVisible:ye,allowEdgeTxrCaching:!0,allowParentTxrCaching:!0}),jo=function(e,t){this.renderer=e,this.onDequeues=[];var n=Xo(t);I(this,n),this.lookup=new qo(n.getKey,n.doesEleInvalidateKey),this.setupDequeueing()},Wo=jo.prototype;Wo.reasons=Yo,Wo.getTextureQueue=function(e){return this.eleImgCaches=this.eleImgCaches||{},this.eleImgCaches[e]=this.eleImgCaches[e]||[]},Wo.getRetiredTextureQueue=function(e){var t=this.eleImgCaches.retired=this.eleImgCaches.retired||{};return t[e]=t[e]||[]},Wo.getElementQueue=function(){return this.eleCacheQueue=this.eleCacheQueue||new Re(function(e,t){return t.reqs-e.reqs})},Wo.getElementKeyToQueue=function(){return this.eleKeyToCacheQueue=this.eleKeyToCacheQueue||{}},Wo.getElement=function(e,t,n,r,i){var a=this,o=this.renderer,s=o.cy.zoom(),l=this.lookup;if(0===t.w||0===t.h||isNaN(t.w)||isNaN(t.h)||!e.visible())return null;if(!a.allowEdgeTxrCaching&&e.isEdge()||!a.allowParentTxrCaching&&e.isParent())return null;if(null==r&&(r=Math.ceil(nt(s*n))),r<-4)r=-4;else if(s>=7.99||r>3)return null;var u=Math.pow(2,r),c=t.h*u,h=t.w*u,d=o.eleTextBiggerThanMin(e,u);if(!this.isVisible(e,d))return null;var p,f=l.get(e,r);if(f&&f.invalidated&&(f.invalidated=!1,f.texture.invalidatedWidth-=f.width),f)return f;if(p=c<=25?25:c<=50?50:50*Math.ceil(c/50),c>1024||h>1024)return null;var g=a.getTextureQueue(p),v=g[g.length-2],y=function(){return a.recycleTexture(p,h)||a.addTexture(p,h)};v||(v=g[g.length-1]),v||(v=y()),v.width-v.usedWidth<h&&(v=y());for(var m,b=function(e){return e&&e.scaledLabelShown===d},x=i&&i===Yo.dequeue,w=i&&i===Yo.highQuality,E=i&&i===Yo.downscale,k=r+1;k<=3;k++){var C=l.get(e,k);if(C){m=C;break}}var S=m&&m.level===r+1?m:null,D=function(){v.context.drawImage(S.texture.canvas,S.x,0,S.width,S.height,v.usedWidth,0,h,c)};if(v.context.setTransform(1,0,0,1,0,0),v.context.clearRect(v.usedWidth,0,h,p),b(S))D();else if(b(m)){if(!w)return a.queueElement(e,m.level-1),m;for(var T=m.level;T>r;T--)S=a.getElement(e,t,n,T,Yo.downscale);D()}else{var P;if(!x&&!w&&!E)for(var M=r-1;M>=-4;M--){var _=l.get(e,M);if(_){P=_;break}}if(b(P))return a.queueElement(e,r),P;v.context.translate(v.usedWidth,0),v.context.scale(u,u),this.drawElement(v.context,e,t,d,!1),v.context.scale(1/u,1/u),v.context.translate(-v.usedWidth,0)}return f={x:v.usedWidth,texture:v,level:r,scale:u,width:h,height:c,scaledLabelShown:d},v.usedWidth+=Math.ceil(h+8),v.eleCaches.push(f),l.set(e,r,f),a.checkTextureFullness(v),f},Wo.invalidateElements=function(e){for(var t=0;t<e.length;t++)this.invalidateElement(e[t])},Wo.invalidateElement=function(e){var t=this.lookup,n=[];if(t.isInvalid(e)){for(var r=-4;r<=3;r++){var i=t.getForCachedKey(e,r);i&&n.push(i)}if(t.invalidate(e))for(var a=0;a<n.length;a++){var o=n[a],s=o.texture;s.invalidatedWidth+=o.width,o.invalidated=!0,this.checkTextureUtility(s)}this.removeFromQueue(e)}},Wo.checkTextureUtility=function(e){e.invalidatedWidth>=.2*e.width&&this.retireTexture(e)},Wo.checkTextureFullness=function(e){var t=this.getTextureQueue(e.height);e.usedWidth/e.width>.8&&e.fullnessChecks>=10?Pe(t,e):e.fullnessChecks++},Wo.retireTexture=function(e){var t=e.height,n=this.getTextureQueue(t),r=this.lookup;Pe(n,e),e.retired=!0;for(var i=e.eleCaches,a=0;a<i.length;a++){var o=i[a];r.deleteCache(o.key,o.level)}Me(i),this.getRetiredTextureQueue(t).push(e)},Wo.addTexture=function(e,t){var n={};return this.getTextureQueue(e).push(n),n.eleCaches=[],n.height=e,n.width=Math.max(1024,t),n.usedWidth=0,n.invalidatedWidth=0,n.fullnessChecks=0,n.canvas=this.renderer.makeOffscreenCanvas(n.width,n.height),n.context=n.canvas.getContext("2d"),n},Wo.recycleTexture=function(e,t){for(var n=this.getTextureQueue(e),r=this.getRetiredTextureQueue(e),i=0;i<r.length;i++){var a=r[i];if(a.width>=t)return a.retired=!1,a.usedWidth=0,a.invalidatedWidth=0,a.fullnessChecks=0,Me(a.eleCaches),a.context.setTransform(1,0,0,1,0,0),a.context.clearRect(0,0,a.width,a.height),Pe(r,a),n.push(a),a}},Wo.queueElement=function(e,t){var n=this.getElementQueue(),r=this.getElementKeyToQueue(),i=this.getKey(e),a=r[i];if(a)a.level=Math.max(a.level,t),a.eles.merge(e),a.reqs++,n.updateItem(a);else{var o={eles:e.spawn().merge(e),level:t,reqs:1,key:i};n.push(o),r[i]=o}},Wo.dequeue=function(e){for(var t=this.getElementQueue(),n=this.getElementKeyToQueue(),r=[],i=this.lookup,a=0;a<1&&t.size()>0;a++){var o=t.pop(),s=o.key,l=o.eles[0],u=i.hasCache(l,o.level);if(n[s]=null,!u){r.push(o);var c=this.getBoundingBox(l);this.getElement(l,c,e,o.level,Yo.dequeue)}}return r},Wo.removeFromQueue=function(e){var t=this.getElementQueue(),n=this.getElementKeyToQueue(),r=this.getKey(e),i=n[r];null!=i&&(1===i.eles.length?(i.reqs=ve,t.updateItem(i),t.pop(),n[r]=null):i.eles.unmerge(e))},Wo.onDequeue=function(e){this.onDequeues.push(e)},Wo.offDequeue=function(e){Pe(this.onDequeues,e)},Wo.setupDequeueing=Vo({deqRedrawThreshold:100,deqCost:.15,deqAvgCost:.1,deqNoDrawCost:.9,deqFastCost:.9,deq:function(e,t,n){return e.dequeue(t,n)},onDeqd:function(e,t){for(var n=0;n<e.onDequeues.length;n++){(0,e.onDequeues[n])(t)}},shouldRedraw:function(e,t,n,r){for(var i=0;i<t.length;i++)for(var a=t[i].eles,o=0;o<a.length;o++){var s=a[o].boundingBox();if(ft(s,r))return!0}return!1},priority:function(e){return e.renderer.beforeRenderPriorities.eleTxrDeq}});var Ho=function(e){var t=this,n=t.renderer=e,r=n.cy;t.layersByLevel={},t.firstGet=!0,t.lastInvalidationTime=se()-500,t.skipping=!1,t.eleTxrDeqs=r.collection(),t.scheduleElementRefinement=ne(function(){t.refineElementTextures(t.eleTxrDeqs),t.eleTxrDeqs.unmerge(t.eleTxrDeqs)},50),n.beforeRender(function(e,n){n-t.lastInvalidationTime<=250?t.skipping=!0:t.skipping=!1});t.layersQueue=new Re(function(e,t){return t.reqs-e.reqs}),t.setupDequeueing()},Ko=Ho.prototype,Go=0,Zo=Math.pow(2,53)-1;Ko.makeLayer=function(e,t){var n=Math.pow(2,t),r=Math.ceil(e.w*n),i=Math.ceil(e.h*n),a=this.renderer.makeOffscreenCanvas(r,i),o={id:Go=++Go%Zo,bb:e,level:t,width:r,height:i,canvas:a,context:a.getContext("2d"),eles:[],elesQueue:[],reqs:0},s=o.context,l=-o.bb.x1,u=-o.bb.y1;return s.scale(n,n),s.translate(l,u),o},Ko.getLayers=function(e,t,n){var r=this,i=r.renderer.cy.zoom(),a=r.firstGet;if(r.firstGet=!1,null==n)if((n=Math.ceil(nt(i*t)))<-4)n=-4;else if(i>=3.99||n>2)return null;r.validateLayersElesOrdering(n,e);var o,s,l=r.layersByLevel,u=Math.pow(2,n),c=l[n]=l[n]||[];if(r.levelIsComplete(n,e))return c;!function(){var t=function(t){if(r.validateLayersElesOrdering(t,e),r.levelIsComplete(t,e))return s=l[t],!0},i=function(e){if(!s)for(var r=n+e;-4<=r&&r<=2&&!t(r);r+=e);};i(1),i(-1);for(var a=c.length-1;a>=0;a--){var o=c[a];o.invalid&&Pe(c,o)}}();var h=function(t){var i=(t=t||{}).after;if(function(){if(!o){o=ut();for(var t=0;t<e.length;t++)n=o,r=e[t].boundingBox(),n.x1=Math.min(n.x1,r.x1),n.x2=Math.max(n.x2,r.x2),n.w=n.x2-n.x1,n.y1=Math.min(n.y1,r.y1),n.y2=Math.max(n.y2,r.y2),n.h=n.y2-n.y1}var n,r}(),o.w*u*(o.h*u)>16e6)return null;var a=r.makeLayer(o,n);if(null!=i){var s=c.indexOf(i)+1;c.splice(s,0,a)}else(void 0===t.insert||t.insert)&&c.unshift(a);return a};if(r.skipping&&!a)return null;for(var d=null,p=e.length/1,f=!a,g=0;g<e.length;g++){var v=e[g],y=v._private.rscratch,m=y.imgLayerCaches=y.imgLayerCaches||{},b=m[n];if(b)d=b;else{if((!d||d.eles.length>=p||!vt(d.bb,v.boundingBox()))&&!(d=h({insert:!0,after:d})))return null;s||f?r.queueLayer(d,v):r.drawEleInLayer(d,v,n,t),d.eles.push(v),m[n]=d}}return s||(f?null:c)},Ko.getEleLevelForLayerLevel=function(e,t){return e},Ko.drawEleInLayer=function(e,t,n,r){var i=this.renderer,a=e.context,o=t.boundingBox();0!==o.w&&0!==o.h&&t.visible()&&(n=this.getEleLevelForLayerLevel(n,r),i.setImgSmoothing(a,!1),i.drawCachedElement(a,t,null,null,n,!0),i.setImgSmoothing(a,!0))},Ko.levelIsComplete=function(e,t){var n=this.layersByLevel[e];if(!n||0===n.length)return!1;for(var r=0,i=0;i<n.length;i++){var a=n[i];if(a.reqs>0)return!1;if(a.invalid)return!1;r+=a.eles.length}return r===t.length},Ko.validateLayersElesOrdering=function(e,t){var n=this.layersByLevel[e];if(n)for(var r=0;r<n.length;r++){for(var i=n[r],a=-1,o=0;o<t.length;o++)if(i.eles[0]===t[o]){a=o;break}if(a<0)this.invalidateLayer(i);else{var s=a;for(o=0;o<i.eles.length;o++)if(i.eles[o]!==t[s+o]){this.invalidateLayer(i);break}}}},Ko.updateElementsInLayers=function(e,t){for(var n=b(e[0]),r=0;r<e.length;r++)for(var i=n?null:e[r],a=n?e[r]:e[r].ele,o=a._private.rscratch,s=o.imgLayerCaches=o.imgLayerCaches||{},l=-4;l<=2;l++){var u=s[l];u&&(i&&this.getEleLevelForLayerLevel(u.level)!==i.level||t(u,a,i))}},Ko.haveLayers=function(){for(var e=!1,t=-4;t<=2;t++){var n=this.layersByLevel[t];if(n&&n.length>0){e=!0;break}}return e},Ko.invalidateElements=function(e){var t=this;0!==e.length&&(t.lastInvalidationTime=se(),0!==e.length&&t.haveLayers()&&t.updateElementsInLayers(e,function(e,n,r){t.invalidateLayer(e)}))},Ko.invalidateLayer=function(e){if(this.lastInvalidationTime=se(),!e.invalid){var t=e.level,n=e.eles,r=this.layersByLevel[t];Pe(r,e),e.elesQueue=[],e.invalid=!0,e.replacement&&(e.replacement.invalid=!0);for(var i=0;i<n.length;i++){var a=n[i]._private.rscratch.imgLayerCaches;a&&(a[t]=null)}}},Ko.refineElementTextures=function(e){var t=this;t.updateElementsInLayers(e,function(e,n,r){var i=e.replacement;if(i||((i=e.replacement=t.makeLayer(e.bb,e.level)).replaces=e,i.eles=e.eles),!i.reqs)for(var a=0;a<i.eles.length;a++)t.queueLayer(i,i.eles[a])})},Ko.enqueueElementRefinement=function(e){this.eleTxrDeqs.merge(e),this.scheduleElementRefinement()},Ko.queueLayer=function(e,t){var n=this.layersQueue,r=e.elesQueue,i=r.hasId=r.hasId||{};if(!e.replacement){if(t){if(i[t.id()])return;r.push(t),i[t.id()]=!0}e.reqs?(e.reqs++,n.updateItem(e)):(e.reqs=1,n.push(e))}},Ko.dequeue=function(e){for(var t=this.layersQueue,n=[],r=0;r<1&&0!==t.size();){var i=t.peek();if(i.replacement)t.pop();else if(i.replaces&&i!==i.replaces.replacement)t.pop();else if(i.invalid)t.pop();else{var a=i.elesQueue.shift();a&&(this.drawEleInLayer(i,a,i.level,e),r++),0===n.length&&n.push(!0),0===i.elesQueue.length&&(t.pop(),i.reqs=0,i.replaces&&this.applyLayerReplacement(i),this.requestRedraw())}}return n},Ko.applyLayerReplacement=function(e){var t=this.layersByLevel[e.level],n=e.replaces,r=t.indexOf(n);if(!(r<0||n.invalid)){t[r]=e;for(var i=0;i<e.eles.length;i++){var a=e.eles[i]._private,o=a.imgLayerCaches=a.imgLayerCaches||{};o&&(o[e.level]=e)}this.requestRedraw()}},Ko.requestRedraw=ne(function(){var e=this.renderer;e.redrawHint("eles",!0),e.redrawHint("drag",!0),e.redraw()},100),Ko.setupDequeueing=Vo({deqRedrawThreshold:50,deqCost:.15,deqAvgCost:.1,deqNoDrawCost:.9,deqFastCost:.9,deq:function(e,t){return e.dequeue(t)},onDeqd:xe,shouldRedraw:ye,priority:function(e){return e.renderer.beforeRenderPriorities.lyrTxrDeq}});var Uo,$o={};function Qo(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.lineTo(r.x,r.y)}}function Jo(e,t,n){for(var r,i=0;i<t.length;i++){var a=t[i];0===i&&(r=a),e.lineTo(a.x,a.y)}e.quadraticCurveTo(n.x,n.y,r.x,r.y)}function es(e,t,n){e.beginPath&&e.beginPath();for(var r=t,i=0;i<r.length;i++){var a=r[i];e.lineTo(a.x,a.y)}var o=n,s=n[0];e.moveTo(s.x,s.y);for(i=1;i<o.length;i++){a=o[i];e.lineTo(a.x,a.y)}e.closePath&&e.closePath()}function ts(e,t,n,r){e.arc(t,n,r,0,2*Math.PI,!1)}$o.arrowShapeImpl=function(e){return(Uo||(Uo={polygon:Qo,"triangle-backcurve":Jo,"triangle-tee":es,"triangle-cross":es,circle:ts}))[e]};var ns={drawElement:function(e,t,n,r,i,a){t.isNode()?this.drawNode(e,t,n,r,i,a):this.drawEdge(e,t,n,r,i,a)},drawElementOverlay:function(e,t){t.isNode()?this.drawNodeOverlay(e,t):this.drawEdgeOverlay(e,t)},drawCachedElementPortion:function(e,t,n,r,i,a,o){var s=this,l=n.getBoundingBox(t);if(0!==l.w&&0!==l.h){var u=n.getElement(t,l,r,i,a);if(null!=u){var c=t.pstyle("opacity").pfValue;if(0===c)return;var h,d,p,f,g,v,y=o(s,t),m=l.x1,b=l.y1,x=l.w,w=l.h;if(0!==y){var E=n.getRotationPoint(t);p=E.x,f=E.y,e.translate(p,f),e.rotate(y),(g=s.getImgSmoothing(e))||s.setImgSmoothing(e,!0);var k=n.getRotationOffset(t);h=k.x,d=k.y}else h=m,d=b;1!==c&&(v=e.globalAlpha,e.globalAlpha=v*c),e.drawImage(u.texture.canvas,u.x,0,u.width,u.height,h,d,x,w),1!==c&&(e.globalAlpha=v),0!==y&&(e.rotate(-y),e.translate(-p,-f),g||s.setImgSmoothing(e,!1))}else n.drawElement(e,t)}}},rs=function(){return 0},is=function(e,t){return e.getTextAngle(t,null)},as=function(e,t){return e.getTextAngle(t,"source")},os=function(e,t){return e.getTextAngle(t,"target")};ns.drawCachedElement=function(e,t,n,r,i,a){var o=this,s=o.data,l=s.eleTxrCache,u=s.lblTxrCache,c=s.slbTxrCache,h=s.tlbTxrCache,d=t.boundingBox(),p=!0===a?l.reasons.highQuality:null;0!==d.w&&0!==d.h&&t.visible()&&(r&&!ft(d,r)||(o.drawCachedElementPortion(e,t,l,n,i,p,rs),o.drawCachedElementPortion(e,t,u,n,i,p,is),t.isEdge()&&(o.drawCachedElementPortion(e,t,c,n,i,p,as),o.drawCachedElementPortion(e,t,h,n,i,p,os)),o.drawElementOverlay(e,t)))},ns.drawElements=function(e,t){for(var n=0;n<t.length;n++){var r=t[n];this.drawElement(e,r)}},ns.drawCachedElements=function(e,t,n,r){for(var i=0;i<t.length;i++){var a=t[i];this.drawCachedElement(e,a,n,r)}},ns.drawCachedNodes=function(e,t,n,r){for(var i=0;i<t.length;i++){var a=t[i];a.isNode()&&this.drawCachedElement(e,a,n,r)}},ns.drawLayeredElements=function(e,t,n,r){var i=this.data.lyrTxrCache.getLayers(t,n);if(i)for(var a=0;a<i.length;a++){var o=i[a],s=o.bb;0!==s.w&&0!==s.h&&e.drawImage(o.canvas,s.x1,s.y1,s.w,s.h)}else this.drawCachedElements(e,t,n,r)};var ss={drawEdge:function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],o=this,s=t._private.rscratch;if(t.visible()&&!s.badLine&&null!=s.allpts&&!isNaN(s.allpts[0])){var l;n&&(l=n,e.translate(-l.x1,-l.y1));var u=a?t.pstyle("opacity").value:1,c=t.pstyle("line-style").value,h=t.pstyle("width").pfValue,d=t.pstyle("line-cap").value,p=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;e.lineWidth=h,e.lineCap=d,o.eleStrokeStyle(e,t,n),o.drawEdgePath(t,e,s.allpts,c),e.lineCap="butt"},f=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;o.drawArrowheads(e,t,n)};if(e.lineJoin="round","yes"===t.pstyle("ghost").value){var g=t.pstyle("ghost-offset-x").pfValue,v=t.pstyle("ghost-offset-y").pfValue,y=t.pstyle("ghost-opacity").value,m=u*y;e.translate(g,v),p(m),f(m),e.translate(-g,-v)}p(),f(),i&&o.drawEdgeOverlay(e,t),o.drawElementText(e,t,null,r),n&&e.translate(l.x1,l.y1)}},drawEdgeOverlay:function(e,t){if(t.visible()){var n=t.pstyle("overlay-opacity").value;if(0!==n){var r=this,i=r.usePaths(),a=t._private.rscratch,o=2*t.pstyle("overlay-padding").pfValue,s=t.pstyle("overlay-color").value;e.lineWidth=o,"self"!==a.edgeType||i?e.lineCap="round":e.lineCap="butt",r.colorStrokeStyle(e,s[0],s[1],s[2],n),r.drawEdgePath(t,e,a.allpts,"solid")}}},drawEdgePath:function(e,t,n,r){var i,a=e._private.rscratch,o=t,s=!1,l=this.usePaths(),u=e.pstyle("line-dash-pattern").pfValue,c=e.pstyle("line-dash-offset").pfValue;if(l){var h=n.join("$");a.pathCacheKey&&a.pathCacheKey===h?(i=t=a.pathCache,s=!0):(i=t=new Path2D,a.pathCacheKey=h,a.pathCache=i)}if(o.setLineDash)switch(r){case"dotted":o.setLineDash([1,1]);break;case"dashed":o.setLineDash(u),o.lineDashOffset=c;break;case"solid":o.setLineDash([])}if(!s&&!a.badLine)switch(t.beginPath&&t.beginPath(),t.moveTo(n[0],n[1]),a.edgeType){case"bezier":case"self":case"compound":case"multibezier":for(var d=2;d+3<n.length;d+=4)t.quadraticCurveTo(n[d],n[d+1],n[d+2],n[d+3]);break;case"straight":case"segments":case"haystack":for(var p=2;p+1<n.length;p+=2)t.lineTo(n[p],n[p+1])}t=o,l?t.stroke(i):t.stroke(),t.setLineDash&&t.setLineDash([])},drawArrowheads:function(e,t,n){var r=t._private.rscratch,i="haystack"===r.edgeType;i||this.drawArrowhead(e,t,"source",r.arrowStartX,r.arrowStartY,r.srcArrowAngle,n),this.drawArrowhead(e,t,"mid-target",r.midX,r.midY,r.midtgtArrowAngle,n),this.drawArrowhead(e,t,"mid-source",r.midX,r.midY,r.midsrcArrowAngle,n),i||this.drawArrowhead(e,t,"target",r.arrowEndX,r.arrowEndY,r.tgtArrowAngle,n)},drawArrowhead:function(e,t,n,r,i,a,o){if(!(isNaN(r)||null==r||isNaN(i)||null==i||isNaN(a)||null==a)){var s=t.pstyle(n+"-arrow-shape").value;if("none"!==s){var l="hollow"===t.pstyle(n+"-arrow-fill").value?"both":"filled",u=t.pstyle(n+"-arrow-fill").value,c=t.pstyle("width").pfValue,h=t.pstyle("opacity").value;void 0===o&&(o=h);var d=e.globalCompositeOperation;1===o&&"hollow"!==u||(e.globalCompositeOperation="destination-out",this.colorFillStyle(e,255,255,255,1),this.colorStrokeStyle(e,255,255,255,1),this.drawArrowShape(t,e,l,c,s,r,i,a),e.globalCompositeOperation=d);var p=t.pstyle(n+"-arrow-color").value;this.colorFillStyle(e,p[0],p[1],p[2],o),this.colorStrokeStyle(e,p[0],p[1],p[2],o),this.drawArrowShape(t,e,u,c,s,r,i,a)}}},drawArrowShape:function(e,t,n,r,i,a,o,s){var l,u=this,c=this.usePaths()&&"triangle-cross"!==i,h=!1,d=t,p={x:a,y:o},f=e.pstyle("arrow-scale").value,g=this.getArrowWidth(r,f),v=u.arrowShapes[i];if(c){var y=u.arrowPathCache=u.arrowPathCache||[],m=he(i),b=y[m];null!=b?(l=t=b,h=!0):(l=t=new Path2D,y[m]=l)}t.beginPath&&t.beginPath(),h||(c?v.draw(t,1,0,{x:0,y:0},1):v.draw(t,g,s,p,r)),t.closePath&&t.closePath(),t=d,c&&(t.translate(a,o),t.rotate(s),t.scale(g,g)),"filled"!==n&&"both"!==n||(c?t.fill(l):t.fill()),"hollow"!==n&&"both"!==n||(t.lineWidth=(v.matchEdgeWidth?r:1)/(c?g:1),t.lineJoin="miter",c?t.stroke(l):t.stroke()),c&&(t.scale(1/g,1/g),t.rotate(-s),t.translate(-a,-o))}},ls={safeDrawImage:function(e,t,n,r,i,a,o,s,l,u){i<=0||a<=0||l<=0||u<=0||e.drawImage(t,n,r,i,a,o,s,l,u)},drawInscribedImage:function(e,t,n,r,i){var a=this,o=n.position(),s=o.x,l=o.y,u=n.cy().style(),c=u.getIndexedStyle.bind(u),h=c(n,"background-fit","value",r),d=c(n,"background-repeat","value",r),p=n.width(),f=n.height(),g=2*n.padding(),v=p+("inner"===c(n,"background-width-relative-to","value",r)?0:g),y=f+("inner"===c(n,"background-height-relative-to","value",r)?0:g),m=n._private.rscratch,b="node"===n.pstyle("background-clip").value,x=c(n,"background-image-opacity","value",r)*i,w=t.width||t.cachedW,E=t.height||t.cachedH;null!=w&&null!=E||(document.body.appendChild(t),w=t.cachedW=t.width||t.offsetWidth,E=t.cachedH=t.height||t.offsetHeight,document.body.removeChild(t));var k=w,C=E;if("auto"!==c(n,"background-width","value",r)&&(k="%"===c(n,"background-width","units",r)?c(n,"background-width","pfValue",r)*v:c(n,"background-width","pfValue",r)),"auto"!==c(n,"background-height","value",r)&&(C="%"===c(n,"background-height","units",r)?c(n,"background-height","pfValue",r)*y:c(n,"background-height","pfValue",r)),0!==k&&0!==C){if("contain"===h)k*=S=Math.min(v/k,y/C),C*=S;else if("cover"===h){var S;k*=S=Math.max(v/k,y/C),C*=S}var D=s-v/2,T=c(n,"background-position-x","units",r),P=c(n,"background-position-x","pfValue",r);D+="%"===T?(v-k)*P:P;var M=c(n,"background-offset-x","units",r),_=c(n,"background-offset-x","pfValue",r);D+="%"===M?(v-k)*_:_;var B=l-y/2,N=c(n,"background-position-y","units",r),I=c(n,"background-position-y","pfValue",r);B+="%"===N?(y-C)*I:I;var A=c(n,"background-offset-y","units",r),z=c(n,"background-offset-y","pfValue",r);B+="%"===A?(y-C)*z:z,m.pathCache&&(D-=s,B-=l,s=0,l=0);var L=e.globalAlpha;if(e.globalAlpha=x,"no-repeat"===d)b&&(e.save(),m.pathCache?e.clip(m.pathCache):(a.nodeShapes[a.getNodeShape(n)].draw(e,s,l,v,y),e.clip())),a.safeDrawImage(e,t,0,0,w,E,D,B,k,C),b&&e.restore();else{var O=e.createPattern(t,d);e.fillStyle=O,a.nodeShapes[a.getNodeShape(n)].draw(e,s,l,v,y),e.translate(D,B),e.fill(),e.translate(-D,-B)}e.globalAlpha=L}}},us={};us.eleTextBiggerThanMin=function(e,t){if(!t){var n=e.cy().zoom(),r=this.getPixelRatio(),i=Math.ceil(nt(n*r));t=Math.pow(2,i)}return!(e.pstyle("font-size").pfValue*t<e.pstyle("min-zoomed-font-size").pfValue)},us.drawElementText=function(e,t,n,r,i){var a=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],o=this;if(null==r){if(!o.eleTextBiggerThanMin(t))return}else if(!1===r)return;if(t.isNode()){if(!(s=t.pstyle("label"))||!s.value)return;switch(t.pstyle("text-halign").strValue){case"left":e.textAlign="right";break;case"right":e.textAlign="left";break;default:e.textAlign="center"}e.textBaseline="bottom"}else{var s=t.pstyle("label"),l=t.pstyle("source-label"),u=t.pstyle("target-label");if(!(s&&s.value||l&&l.value||u&&u.value))return;e.textAlign="center",e.textBaseline="bottom"}var c,h=!n;n&&(c=n,e.translate(-c.x1,-c.y1)),null==i?(o.drawText(e,t,null,h,a),t.isEdge()&&(o.drawText(e,t,"source",h,a),o.drawText(e,t,"target",h,a))):o.drawText(e,t,i,h,a),n&&e.translate(c.x1,c.y1)},us.getFontCache=function(e){var t;this.fontCaches=this.fontCaches||[];for(var n=0;n<this.fontCaches.length;n++)if((t=this.fontCaches[n]).context===e)return t;return t={context:e},this.fontCaches.push(t),t},us.setupTextStyle=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=t.pstyle("font-style").strValue,i=t.pstyle("font-size").pfValue+"px",a=t.pstyle("font-family").strValue,o=t.pstyle("font-weight").strValue,s=t.pstyle("text-opacity").value*(n?t.effectiveOpacity():1),l=t.pstyle("text-outline-opacity").value*s,u=t.pstyle("color").value,c=t.pstyle("text-outline-color").value;e.font=r+" "+o+" "+i+" "+a,e.lineJoin="round",this.colorFillStyle(e,u[0],u[1],u[2],s),this.colorStrokeStyle(e,c[0],c[1],c[2],l)},us.getTextAngle=function(e,t){var n=e._private.rscratch,r=t?t+"-":"",i=e.pstyle(r+"text-rotation"),a=_e(n,"labelAngle",t);return"autorotate"===i.strValue?e.isEdge()?a:0:"none"===i.strValue?0:i.pfValue},us.drawText=function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=t._private.rscratch,o=i?t.effectiveOpacity():1;if(0!==o&&0!==t.pstyle("text-opacity").value){"main"===n&&(n=null);var s,l,u,c,h,d,p=_e(a,"labelX",n),f=_e(a,"labelY",n),g=this.getLabelText(t,n);if(null!=g&&""!==g&&!isNaN(p)&&!isNaN(f)){this.setupTextStyle(e,t,i);var v,y=n?n+"-":"",m=_e(a,"labelWidth",n),b=_e(a,"labelHeight",n),x=t.pstyle(y+"text-margin-x").pfValue,w=t.pstyle(y+"text-margin-y").pfValue,E=t.isEdge(),k=t.pstyle("text-halign").value,C=t.pstyle("text-valign").value;if(E&&(k="center",C="center"),p+=x,f+=w,0!==(v=r?this.getTextAngle(t,n):0)){var S=p,D=f;e.translate(S,D),e.rotate(v),p=0,f=0}switch(C){case"top":break;case"center":f+=b/2;break;case"bottom":f+=b}var T=t.pstyle("text-background-opacity").value,P=t.pstyle("text-border-opacity").value,M=t.pstyle("text-border-width").pfValue,_=t.pstyle("text-background-padding").pfValue;if(T>0||M>0&&P>0){var B=p-_;switch(k){case"left":B-=m;break;case"center":B-=m/2}var N=f-b-_,I=m+2*_,A=b+2*_;if(T>0){var z=e.fillStyle,L=t.pstyle("text-background-color").value;e.fillStyle="rgba("+L[0]+","+L[1]+","+L[2]+","+T*o+")","roundrectangle"==t.pstyle("text-background-shape").strValue?(l=B,u=N,c=I,h=A,d=(d=2)||5,(s=e).beginPath(),s.moveTo(l+d,u),s.lineTo(l+c-d,u),s.quadraticCurveTo(l+c,u,l+c,u+d),s.lineTo(l+c,u+h-d),s.quadraticCurveTo(l+c,u+h,l+c-d,u+h),s.lineTo(l+d,u+h),s.quadraticCurveTo(l,u+h,l,u+h-d),s.lineTo(l,u+d),s.quadraticCurveTo(l,u,l+d,u),s.closePath(),s.fill()):e.fillRect(B,N,I,A),e.fillStyle=z}if(M>0&&P>0){var O=e.strokeStyle,R=e.lineWidth,F=t.pstyle("text-border-color").value,V=t.pstyle("text-border-style").value;if(e.strokeStyle="rgba("+F[0]+","+F[1]+","+F[2]+","+P*o+")",e.lineWidth=M,e.setLineDash)switch(V){case"dotted":e.setLineDash([1,1]);break;case"dashed":e.setLineDash([4,2]);break;case"double":e.lineWidth=M/4,e.setLineDash([]);break;case"solid":e.setLineDash([])}if(e.strokeRect(B,N,I,A),"double"===V){var q=M/2;e.strokeRect(B+q,N+q,I-2*q,A-2*q)}e.setLineDash&&e.setLineDash([]),e.lineWidth=R,e.strokeStyle=O}}var Y=2*t.pstyle("text-outline-width").pfValue;if(Y>0&&(e.lineWidth=Y),"wrap"===t.pstyle("text-wrap").value){var X=_e(a,"labelWrapCachedLines",n),j=b/X.length;switch(C){case"top":f-=(X.length-1)*j;break;case"center":case"bottom":f-=(X.length-1)*j}for(var W=0;W<X.length;W++)Y>0&&e.strokeText(X[W],p,f),e.fillText(X[W],p,f),f+=j}else Y>0&&e.strokeText(g,p,f),e.fillText(g,p,f);0!==v&&(e.rotate(-v),e.translate(-S,-D))}}};var cs={drawNode:function(e,t,n){var r,i,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],s=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],l=this,u=t._private,c=u.rscratch,h=t.position();if(v(h.x)&&v(h.y)&&t.visible()){var d,p,f=s?t.effectiveOpacity():1,g=l.usePaths(),y=!1,m=t.padding();r=t.width()+2*m,i=t.height()+2*m,n&&(p=n,e.translate(-p.x1,-p.y1));for(var b=t.pstyle("background-image").value,x=new Array(b.length),w=new Array(b.length),E=0,k=0;k<b.length;k++){var C=b[k];if(x[k]=null!=C&&"none"!==C){var S=t.cy().style().getIndexedStyle(t,"background-image-crossorigin","value",k);E++,w[k]=l.getCachedImage(C,S,function(){u.backgroundTimestamp=Date.now(),t.emitAndNotify("background")})}}var D=t.pstyle("background-blacken").value,T=t.pstyle("border-width").pfValue,P=t.pstyle("background-opacity").value*f,M=t.pstyle("border-color").value,_=t.pstyle("border-style").value,B=t.pstyle("border-opacity").value*f;e.lineJoin="miter";var N=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P;l.eleFillStyle(e,t,n)},I=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B;l.colorStrokeStyle(e,M[0],M[1],M[2],t)},A=t.pstyle("shape").strValue,z=t.pstyle("shape-polygon-points").pfValue;if(g){e.translate(h.x,h.y);var L=l.nodePathCache=l.nodePathCache||[],O=de("polygon"===A?A+","+z.join(","):A,""+i,""+r),R=L[O];null!=R?(d=R,y=!0,c.pathCache=d):(d=new Path2D,L[O]=c.pathCache=d)}var F=function(){if(!y){var n=h;g&&(n={x:0,y:0}),l.nodeShapes[l.getNodeShape(t)].draw(d||e,n.x,n.y,r,i)}g?e.fill(d):e.fill()},V=function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,r=u.backgrounding,i=0,a=0;a<w.length;a++)x[a]&&w[a].complete&&!w[a].error&&(i++,l.drawInscribedImage(e,w[a],t,a,n));u.backgrounding=!(i===E),r!==u.backgrounding&&t.updateStyle(!1)},q=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f;l.hasPie(t)&&(l.drawPie(e,t,a),n&&(g||l.nodeShapes[l.getNodeShape(t)].draw(e,h.x,h.y,r,i)))},Y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,n=(D>0?D:-D)*t,r=D>0?0:255;0!==D&&(l.colorFillStyle(e,r,r,r,n),g?e.fill(d):e.fill())},X=function(){if(T>0){if(e.lineWidth=T,e.lineCap="butt",e.setLineDash)switch(_){case"dotted":e.setLineDash([1,1]);break;case"dashed":e.setLineDash([4,2]);break;case"solid":case"double":e.setLineDash([])}if(g?e.stroke(d):e.stroke(),"double"===_){e.lineWidth=T/3;var t=e.globalCompositeOperation;e.globalCompositeOperation="destination-out",g?e.stroke(d):e.stroke(),e.globalCompositeOperation=t}e.setLineDash&&e.setLineDash([])}};if("yes"===t.pstyle("ghost").value){var j=t.pstyle("ghost-offset-x").pfValue,W=t.pstyle("ghost-offset-y").pfValue,H=t.pstyle("ghost-opacity").value,K=H*f;e.translate(j,W),N(H*P),F(),V(K),q(0!==D||0!==T),Y(K),I(H*B),X(),e.translate(-j,-W)}N(),F(),V(),q(0!==D||0!==T),Y(),I(),X(),g&&e.translate(-h.x,-h.y),l.drawElementText(e,t,null,a),o&&l.drawNodeOverlay(e,t,h,r,i),n&&e.translate(p.x1,p.y1)}},drawNodeOverlay:function(e,t,n,r,i){if(t.visible()){var a=t.pstyle("overlay-padding").pfValue,o=t.pstyle("overlay-opacity").value,s=t.pstyle("overlay-color").value;if(o>0){if(n=n||t.position(),null==r||null==i){var l=t.padding();r=t.width()+2*l,i=t.height()+2*l}this.colorFillStyle(e,s[0],s[1],s[2],o),this.nodeShapes.roundrectangle.draw(e,n.x,n.y,r+2*a,i+2*a),e.fill()}}},hasPie:function(e){return(e=e[0])._private.hasPie},drawPie:function(e,t,n,r){t=t[0],r=r||t.position();var i=t.cy().style(),a=t.pstyle("pie-size"),o=r.x,s=r.y,l=t.width(),u=t.height(),c=Math.min(l,u)/2,h=0;this.usePaths()&&(o=0,s=0),"%"===a.units?c*=a.pfValue:void 0!==a.pfValue&&(c=a.pfValue/2);for(var d=1;d<=i.pieBackgroundN;d++){var p=t.pstyle("pie-"+d+"-background-size").value,f=t.pstyle("pie-"+d+"-background-color").value,g=t.pstyle("pie-"+d+"-background-opacity").value*n,v=p/100;v+h>1&&(v=1-h);var y=1.5*Math.PI+2*Math.PI*h,m=y+2*Math.PI*v;0===p||h>=1||h+v>1||(e.beginPath(),e.moveTo(o,s),e.arc(o,s,c,y,m),e.closePath(),this.colorFillStyle(e,f[0],f[1],f[2],g),e.fill(),h+=v)}}},hs={};hs.getPixelRatio=function(){var e=this.data.contexts[0];if(null!=this.forcedPixelRatio)return this.forcedPixelRatio;var t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t},hs.paintCache=function(e){for(var t,n=this.paintCaches=this.paintCaches||[],r=!0,i=0;i<n.length;i++)if((t=n[i]).context===e){r=!1;break}return r&&(t={context:e},n.push(t)),t},hs.createGradientStyleFor=function(e,t,n,r,i){var a,o=this.usePaths(),s=n.pstyle(t+"-gradient-stop-colors").value,l=n.pstyle(t+"-gradient-stop-positions").pfValue;if("radial-gradient"===r)if(n.isEdge()){var u=n.sourceEndpoint(),c=n.targetEndpoint(),h=n.midpoint(),d=rt(u,h),p=rt(c,h);a=e.createRadialGradient(h.x,h.y,0,h.x,h.y,Math.max(d,p))}else{var f=o?{x:0,y:0}:n.position(),g=n.width(),v=n.height();a=e.createRadialGradient(f.x,f.y,0,f.x,f.y,Math.max(g,v))}else if(n.isEdge()){var y=n.sourceEndpoint(),m=n.targetEndpoint();a=e.createLinearGradient(y.x,y.y,m.x,m.y)}else{var b=o?{x:0,y:0}:n.position(),x=n.width()/2,w=n.height()/2;switch(n.pstyle("background-gradient-direction").value){case"to-bottom":a=e.createLinearGradient(b.x,b.y-w,b.x,b.y+w);break;case"to-top":a=e.createLinearGradient(b.x,b.y+w,b.x,b.y-w);break;case"to-left":a=e.createLinearGradient(b.x-x,b.y,b.x+x,b.y);break;case"to-right":a=e.createLinearGradient(b.x+x,b.y,b.x-x,b.y);break;case"to-bottom-right":case"to-right-bottom":a=e.createLinearGradient(b.x-x,b.y-w,b.x+x,b.y+w);break;case"to-top-right":case"to-right-top":a=e.createLinearGradient(b.x-x,b.y+w,b.x+x,b.y-w);break;case"to-bottom-left":case"to-left-bottom":a=e.createLinearGradient(b.x+x,b.y-w,b.x-x,b.y+w);break;case"to-top-left":case"to-left-top":a=e.createLinearGradient(b.x+x,b.y+w,b.x-x,b.y-w)}}if(!a)return null;for(var E=l.length===s.length,k=s.length,C=0;C<k;C++)a.addColorStop(E?l[C]:C/(k-1),"rgba("+s[C][0]+","+s[C][1]+","+s[C][2]+","+i+")");return a},hs.gradientFillStyle=function(e,t,n,r){var i=this.createGradientStyleFor(e,"background",t,n,r);if(!i)return null;e.fillStyle=i},hs.colorFillStyle=function(e,t,n,r,i){e.fillStyle="rgba("+t+","+n+","+r+","+i+")"},hs.eleFillStyle=function(e,t,n){var r=t.pstyle("background-fill").value;if("linear-gradient"===r||"radial-gradient"===r)this.gradientFillStyle(e,t,r,n);else{var i=t.pstyle("background-color").value;this.colorFillStyle(e,i[0],i[1],i[2],n)}},hs.gradientStrokeStyle=function(e,t,n,r){var i=this.createGradientStyleFor(e,"line",t,n,r);if(!i)return null;e.strokeStyle=i},hs.colorStrokeStyle=function(e,t,n,r,i){e.strokeStyle="rgba("+t+","+n+","+r+","+i+")"},hs.eleStrokeStyle=function(e,t,n){var r=t.pstyle("line-fill").value;if("linear-gradient"===r||"radial-gradient"===r)this.gradientStrokeStyle(e,t,r,n);else{var i=t.pstyle("line-color").value;this.colorStrokeStyle(e,i[0],i[1],i[2],n)}},hs.matchCanvasSize=function(e){var t=this,n=t.data,r=t.findContainerClientCoords(),i=r[2],a=r[3],o=t.getPixelRatio(),s=t.motionBlurPxRatio;e!==t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_NODE]&&e!==t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_DRAG]||(o=s);var l,u=i*o,c=a*o;if(u!==t.canvasWidth||c!==t.canvasHeight){t.fontCaches=null;var h=n.canvasContainer;h.style.width=i+"px",h.style.height=a+"px";for(var d=0;d<t.CANVAS_LAYERS;d++)(l=n.canvases[d]).width=u,l.height=c,l.style.width=i+"px",l.style.height=a+"px";for(d=0;d<t.BUFFER_COUNT;d++)(l=n.bufferCanvases[d]).width=u,l.height=c,l.style.width=i+"px",l.style.height=a+"px";t.textureMult=1,o<=1&&(l=n.bufferCanvases[t.TEXTURE_BUFFER],t.textureMult=2,l.width=u*t.textureMult,l.height=c*t.textureMult),t.canvasWidth=u,t.canvasHeight=c}},hs.renderTo=function(e,t,n,r){this.render({forcedContext:e,forcedZoom:t,forcedPan:n,drawAllLayers:!0,forcedPxRatio:r})},hs.render=function(e){var t=(e=e||De()).forcedContext,n=e.drawAllLayers,r=e.drawOnlyNodeLayer,i=e.forcedZoom,a=e.forcedPan,o=this,s=void 0===e.forcedPxRatio?this.getPixelRatio():e.forcedPxRatio,l=o.cy,u=o.data,c=u.canvasNeedsRedraw,h=o.textureOnViewport&&!t&&(o.pinching||o.hoverData.dragging||o.swipePanning||o.data.wheelZooming),d=void 0!==e.motionBlur?e.motionBlur:o.motionBlur,p=o.motionBlurPxRatio,f=l.hasCompoundNodes(),g=o.hoverData.draggingEles,v=!(!o.hoverData.selecting&&!o.touchData.selecting),y=d=d&&!t&&o.motionBlurEnabled&&!v;t||(o.prevPxRatio!==s&&(o.invalidateContainerClientCoordsCache(),o.matchCanvasSize(o.container),o.redrawHint("eles",!0),o.redrawHint("drag",!0)),o.prevPxRatio=s),!t&&o.motionBlurTimeout&&clearTimeout(o.motionBlurTimeout),d&&(null==o.mbFrames&&(o.mbFrames=0),o.mbFrames++,o.mbFrames<3&&(y=!1),o.mbFrames>o.minMbLowQualFrames&&(o.motionBlurPxRatio=o.mbPxRBlurry)),o.clearingMotionBlur&&(o.motionBlurPxRatio=1),o.textureDrawLastFrame&&!h&&(c[o.NODE]=!0,c[o.SELECT_BOX]=!0);var m=l.style(),b=l.zoom(),x=void 0!==i?i:b,w=l.pan(),E={x:w.x,y:w.y},k={zoom:b,pan:{x:w.x,y:w.y}},C=o.prevViewport;void 0===C||k.zoom!==C.zoom||k.pan.x!==C.pan.x||k.pan.y!==C.pan.y||g&&!f||(o.motionBlurPxRatio=1),a&&(E=a),x*=s,E.x*=s,E.y*=s;var S=o.getCachedZSortedEles();function D(e,t,n,r,i){var a=e.globalCompositeOperation;e.globalCompositeOperation="destination-out",o.colorFillStyle(e,255,255,255,o.motionBlurTransparency),e.fillRect(t,n,r,i),e.globalCompositeOperation=a}function T(e,r){var s,l,c,h;o.clearingMotionBlur||e!==u.bufferContexts[o.MOTIONBLUR_BUFFER_NODE]&&e!==u.bufferContexts[o.MOTIONBLUR_BUFFER_DRAG]?(s=E,l=x,c=o.canvasWidth,h=o.canvasHeight):(s={x:w.x*p,y:w.y*p},l=b*p,c=o.canvasWidth*p,h=o.canvasHeight*p),e.setTransform(1,0,0,1,0,0),"motionBlur"===r?D(e,0,0,c,h):t||void 0!==r&&!r||e.clearRect(0,0,c,h),n||(e.translate(s.x,s.y),e.scale(l,l)),a&&e.translate(a.x,a.y),i&&e.scale(i,i)}if(h||(o.textureDrawLastFrame=!1),h){if(o.textureDrawLastFrame=!0,!o.textureCache){o.textureCache={},o.textureCache.bb=l.mutableElements().boundingBox(),o.textureCache.texture=o.data.bufferCanvases[o.TEXTURE_BUFFER];var P=o.data.bufferContexts[o.TEXTURE_BUFFER];P.setTransform(1,0,0,1,0,0),P.clearRect(0,0,o.canvasWidth*o.textureMult,o.canvasHeight*o.textureMult),o.render({forcedContext:P,drawOnlyNodeLayer:!0,forcedPxRatio:s*o.textureMult}),(k=o.textureCache.viewport={zoom:l.zoom(),pan:l.pan(),width:o.canvasWidth,height:o.canvasHeight}).mpan={x:(0-k.pan.x)/k.zoom,y:(0-k.pan.y)/k.zoom}}c[o.DRAG]=!1,c[o.NODE]=!1;var M=u.contexts[o.NODE],_=o.textureCache.texture;k=o.textureCache.viewport;M.setTransform(1,0,0,1,0,0),d?D(M,0,0,k.width,k.height):M.clearRect(0,0,k.width,k.height);var B=m.core("outside-texture-bg-color").value,N=m.core("outside-texture-bg-opacity").value;o.colorFillStyle(M,B[0],B[1],B[2],N),M.fillRect(0,0,k.width,k.height);b=l.zoom();T(M,!1),M.clearRect(k.mpan.x,k.mpan.y,k.width/k.zoom/s,k.height/k.zoom/s),M.drawImage(_,k.mpan.x,k.mpan.y,k.width/k.zoom/s,k.height/k.zoom/s)}else o.textureOnViewport&&!t&&(o.textureCache=null);var I=l.extent(),A=o.pinching||o.hoverData.dragging||o.swipePanning||o.data.wheelZooming||o.hoverData.draggingEles,z=o.hideEdgesOnViewport&&A,L=[];if(L[o.NODE]=!c[o.NODE]&&d&&!o.clearedForMotionBlur[o.NODE]||o.clearingMotionBlur,L[o.NODE]&&(o.clearedForMotionBlur[o.NODE]=!0),L[o.DRAG]=!c[o.DRAG]&&d&&!o.clearedForMotionBlur[o.DRAG]||o.clearingMotionBlur,L[o.DRAG]&&(o.clearedForMotionBlur[o.DRAG]=!0),c[o.NODE]||n||r||L[o.NODE]){var O=d&&!L[o.NODE]&&1!==p;T(M=t||(O?o.data.bufferContexts[o.MOTIONBLUR_BUFFER_NODE]:u.contexts[o.NODE]),d&&!O?"motionBlur":void 0),z?o.drawCachedNodes(M,S.nondrag,s,I):o.drawLayeredElements(M,S.nondrag,s,I),o.debug&&o.drawDebugPoints(M,S.nondrag),n||d||(c[o.NODE]=!1)}if(!r&&(c[o.DRAG]||n||L[o.DRAG])){O=d&&!L[o.DRAG]&&1!==p;T(M=t||(O?o.data.bufferContexts[o.MOTIONBLUR_BUFFER_DRAG]:u.contexts[o.DRAG]),d&&!O?"motionBlur":void 0),z?o.drawCachedNodes(M,S.drag,s,I):o.drawCachedElements(M,S.drag,s,I),o.debug&&o.drawDebugPoints(M,S.drag),n||d||(c[o.DRAG]=!1)}if(o.showFps||!r&&c[o.SELECT_BOX]&&!n){if(T(M=t||u.contexts[o.SELECT_BOX]),1==o.selection[4]&&(o.hoverData.selecting||o.touchData.selecting)){b=o.cy.zoom();var R=m.core("selection-box-border-width").value/b;M.lineWidth=R,M.fillStyle="rgba("+m.core("selection-box-color").value[0]+","+m.core("selection-box-color").value[1]+","+m.core("selection-box-color").value[2]+","+m.core("selection-box-opacity").value+")",M.fillRect(o.selection[0],o.selection[1],o.selection[2]-o.selection[0],o.selection[3]-o.selection[1]),R>0&&(M.strokeStyle="rgba("+m.core("selection-box-border-color").value[0]+","+m.core("selection-box-border-color").value[1]+","+m.core("selection-box-border-color").value[2]+","+m.core("selection-box-opacity").value+")",M.strokeRect(o.selection[0],o.selection[1],o.selection[2]-o.selection[0],o.selection[3]-o.selection[1]))}if(u.bgActivePosistion&&!o.hoverData.selecting){b=o.cy.zoom();var F=u.bgActivePosistion;M.fillStyle="rgba("+m.core("active-bg-color").value[0]+","+m.core("active-bg-color").value[1]+","+m.core("active-bg-color").value[2]+","+m.core("active-bg-opacity").value+")",M.beginPath(),M.arc(F.x,F.y,m.core("active-bg-size").pfValue/b,0,2*Math.PI),M.fill()}var V=o.lastRedrawTime;if(o.showFps&&V){V=Math.round(V);var q=Math.round(1e3/V);M.setTransform(1,0,0,1,0,0),M.fillStyle="rgba(255, 0, 0, 0.75)",M.strokeStyle="rgba(255, 0, 0, 0.75)",M.lineWidth=1,M.fillText("1 frame = "+V+" ms = "+q+" fps",0,20);M.strokeRect(0,30,250,20),M.fillRect(0,30,250*Math.min(q/60,1),20)}n||(c[o.SELECT_BOX]=!1)}if(d&&1!==p){var Y=u.contexts[o.NODE],X=o.data.bufferCanvases[o.MOTIONBLUR_BUFFER_NODE],j=u.contexts[o.DRAG],W=o.data.bufferCanvases[o.MOTIONBLUR_BUFFER_DRAG],H=function(e,t,n){e.setTransform(1,0,0,1,0,0),n||!y?e.clearRect(0,0,o.canvasWidth,o.canvasHeight):D(e,0,0,o.canvasWidth,o.canvasHeight);var r=p;e.drawImage(t,0,0,o.canvasWidth*r,o.canvasHeight*r,0,0,o.canvasWidth,o.canvasHeight)};(c[o.NODE]||L[o.NODE])&&(H(Y,X,L[o.NODE]),c[o.NODE]=!1),(c[o.DRAG]||L[o.DRAG])&&(H(j,W,L[o.DRAG]),c[o.DRAG]=!1)}o.prevViewport=k,o.clearingMotionBlur&&(o.clearingMotionBlur=!1,o.motionBlurCleared=!0,o.motionBlur=!0),d&&(o.motionBlurTimeout=setTimeout(function(){o.motionBlurTimeout=null,o.clearedForMotionBlur[o.NODE]=!1,o.clearedForMotionBlur[o.DRAG]=!1,o.motionBlur=!1,o.clearingMotionBlur=!h,o.mbFrames=0,c[o.NODE]=!0,c[o.DRAG]=!0,o.redraw()},100)),t||l.emit("render")};for(var ds={drawPolygonPath:function(e,t,n,r,i,a){var o=r/2,s=i/2;e.beginPath&&e.beginPath(),e.moveTo(t+o*a[0],n+s*a[1]);for(var l=1;l<a.length/2;l++)e.lineTo(t+o*a[2*l],n+s*a[2*l+1]);e.closePath()},drawRoundRectanglePath:function(e,t,n,r,i){var a=r/2,o=i/2,s=zt(r,i);e.beginPath&&e.beginPath(),e.moveTo(t,n-o),e.arcTo(t+a,n-o,t+a,n,s),e.arcTo(t+a,n+o,t,n+o,s),e.arcTo(t-a,n+o,t-a,n,s),e.arcTo(t-a,n-o,t,n-o,s),e.lineTo(t,n-o),e.closePath()},drawBottomRoundRectanglePath:function(e,t,n,r,i){var a=r/2,o=i/2,s=zt(r,i);e.beginPath&&e.beginPath(),e.moveTo(t,n-o),e.lineTo(t+a,n-o),e.lineTo(t+a,n),e.arcTo(t+a,n+o,t,n+o,s),e.arcTo(t-a,n+o,t-a,n,s),e.lineTo(t-a,n-o),e.lineTo(t,n-o),e.closePath()},drawCutRectanglePath:function(e,t,n,r,i){var a=r/2,o=i/2;e.beginPath&&e.beginPath(),e.moveTo(t-a+8,n-o),e.lineTo(t+a-8,n-o),e.lineTo(t+a,n-o+8),e.lineTo(t+a,n+o-8),e.lineTo(t+a-8,n+o),e.lineTo(t-a+8,n+o),e.lineTo(t-a,n+o-8),e.lineTo(t-a,n-o+8),e.closePath()},drawBarrelPath:function(e,t,n,r,i){var a=r/2,o=i/2,s=t-a,l=t+a,u=n-o,c=n+o,h=Lt(r,i),d=h.widthOffset,p=h.heightOffset,f=h.ctrlPtOffsetPct*d;e.beginPath&&e.beginPath(),e.moveTo(s,u+p),e.lineTo(s,c-p),e.quadraticCurveTo(s+f,c,s+d,c),e.lineTo(l-d,c),e.quadraticCurveTo(l-f,c,l,c-p),e.lineTo(l,u+p),e.quadraticCurveTo(l-f,u,l-d,u),e.lineTo(s+d,u),e.quadraticCurveTo(s+f,u,s,u+p),e.closePath()}},ps=Math.sin(0),fs=Math.cos(0),gs={},vs={},ys=Math.PI/40,ms=0*Math.PI;ms<2*Math.PI;ms+=ys)gs[ms]=Math.sin(ms),vs[ms]=Math.cos(ms);ds.drawEllipsePath=function(e,t,n,r,i){if(e.beginPath&&e.beginPath(),e.ellipse)e.ellipse(t,n,r/2,i/2,0,0,2*Math.PI);else for(var a,o,s=r/2,l=i/2,u=0*Math.PI;u<2*Math.PI;u+=ys)a=t-s*gs[u]*ps+s*vs[u]*fs,o=n+l*vs[u]*ps+l*gs[u]*fs,0===u?e.moveTo(a,o):e.lineTo(a,o);e.closePath()};var bs={};function xs(e){var t=e.indexOf(",");return e.substr(t+1)}function ws(e,t,n){var r=function(){return t.toDataURL(n,e.quality)};switch(e.output){case"blob-promise":return new Xn(function(r,i){try{t.toBlob(function(e){null!=e?r(e):i(new Error("`canvas.toBlob()` sent a null value in its callback"))},n,e.quality)}catch(e){i(e)}});case"blob":return function(e,t){for(var n=atob(e),r=new ArrayBuffer(n.length),i=new Uint8Array(r),a=0;a<n.length;a++)i[a]=n.charCodeAt(a);return new Blob([r],{type:t})}(xs(r()),n);case"base64":return xs(r());case"base64uri":default:return r()}}bs.createBuffer=function(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,[n,n.getContext("2d")]},bs.bufferCanvasImage=function(e){var t=this.cy,n=t.mutableElements().boundingBox(),r=this.findContainerClientCoords(),i=e.full?Math.ceil(n.w):r[2],a=e.full?Math.ceil(n.h):r[3],o=v(e.maxWidth)||v(e.maxHeight),s=this.getPixelRatio(),l=1;if(void 0!==e.scale)i*=e.scale,a*=e.scale,l=e.scale;else if(o){var u=1/0,c=1/0;v(e.maxWidth)&&(u=l*e.maxWidth/i),v(e.maxHeight)&&(c=l*e.maxHeight/a),i*=l=Math.min(u,c),a*=l}o||(i*=s,a*=s,l*=s);var h=document.createElement("canvas");h.width=i,h.height=a,h.style.width=i+"px",h.style.height=a+"px";var d=h.getContext("2d");if(i>0&&a>0){d.clearRect(0,0,i,a),d.globalCompositeOperation="source-over";var p=this.getCachedZSortedEles();if(e.full)d.translate(-n.x1*l,-n.y1*l),d.scale(l,l),this.drawElements(d,p),d.scale(1/l,1/l),d.translate(n.x1*l,n.y1*l);else{var f=t.pan(),g={x:f.x*l,y:f.y*l};l*=t.zoom(),d.translate(g.x,g.y),d.scale(l,l),this.drawElements(d,p),d.scale(1/l,1/l),d.translate(-g.x,-g.y)}e.bg&&(d.globalCompositeOperation="destination-over",d.fillStyle=e.bg,d.rect(0,0,i,a),d.fill())}return h},bs.png=function(e){return ws(e,this.bufferCanvasImage(e),"image/png")},bs.jpg=function(e){return ws(e,this.bufferCanvasImage(e),"image/jpeg")};var Es={nodeShapeImpl:function(e,t,n,r,i,a,o){switch(e){case"ellipse":return this.drawEllipsePath(t,n,r,i,a);case"polygon":return this.drawPolygonPath(t,n,r,i,a,o);case"roundrectangle":case"round-rectangle":return this.drawRoundRectanglePath(t,n,r,i,a);case"cutrectangle":case"cut-rectangle":return this.drawCutRectanglePath(t,n,r,i,a);case"bottomroundrectangle":case"bottom-round-rectangle":return this.drawBottomRoundRectanglePath(t,n,r,i,a);case"barrel":return this.drawBarrelPath(t,n,r,i,a)}}},ks=Ss,Cs=Ss.prototype;function Ss(e){var t=this;t.data={canvases:new Array(Cs.CANVAS_LAYERS),contexts:new Array(Cs.CANVAS_LAYERS),canvasNeedsRedraw:new Array(Cs.CANVAS_LAYERS),bufferCanvases:new Array(Cs.BUFFER_COUNT),bufferContexts:new Array(Cs.CANVAS_LAYERS)};var n="-webkit-tap-highlight-color: rgba(0,0,0,0);";t.data.canvasContainer=document.createElement("div");var r=t.data.canvasContainer.style;t.data.canvasContainer.setAttribute("style",n),r.position="relative",r.zIndex="0",r.overflow="hidden";var i=e.cy.container();i.appendChild(t.data.canvasContainer),(i.getAttribute("style")||"").indexOf(n)<0&&i.setAttribute("style",(i.getAttribute("style")||"")+n);for(var a=0;a<Cs.CANVAS_LAYERS;a++){var o=t.data.canvases[a]=document.createElement("canvas");t.data.contexts[a]=o.getContext("2d"),o.setAttribute("style","-webkit-user-select: none; -moz-user-select: -moz-none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0); outline-style: none;"+(S()?" -ms-touch-action: none; touch-action: none; ":"")),o.style.position="absolute",o.setAttribute("data-id","layer"+a),o.style.zIndex=String(Cs.CANVAS_LAYERS-a),t.data.canvasContainer.appendChild(o),t.data.canvasNeedsRedraw[a]=!1}t.data.topCanvas=t.data.canvases[0],t.data.canvases[Cs.NODE].setAttribute("data-id","layer"+Cs.NODE+"-node"),t.data.canvases[Cs.SELECT_BOX].setAttribute("data-id","layer"+Cs.SELECT_BOX+"-selectbox"),t.data.canvases[Cs.DRAG].setAttribute("data-id","layer"+Cs.DRAG+"-drag");for(a=0;a<Cs.BUFFER_COUNT;a++)t.data.bufferCanvases[a]=document.createElement("canvas"),t.data.bufferContexts[a]=t.data.bufferCanvases[a].getContext("2d"),t.data.bufferCanvases[a].style.position="absolute",t.data.bufferCanvases[a].setAttribute("data-id","buffer"+a),t.data.bufferCanvases[a].style.zIndex=String(-a-1),t.data.bufferCanvases[a].style.visibility="hidden";t.pathsEnabled=!0;var s=ut(),l=function(e){return{x:-e.w/2,y:-e.h/2}},u=function(e){return e.boundingBox(),e[0]._private.bodyBounds},c=function(e){return e.boundingBox(),e[0]._private.labelBounds.main||s},h=function(e){return e.boundingBox(),e[0]._private.labelBounds.source||s},d=function(e){return e.boundingBox(),e[0]._private.labelBounds.target||s},p=function(e,t){return t},f=function(e,t){return{x:e.x+t.pstyle("text-margin-x").pfValue,y:e.y+t.pstyle("text-margin-y").pfValue}},g=function(e,t,n){var r=e[0]._private.rscratch;return{x:r[t],y:r[n]}},v=t.data.eleTxrCache=new jo(t,{getKey:function(e){return e[0]._private.nodeKey},doesEleInvalidateKey:function(e){var t=e[0]._private;return!(t.oldBackgroundTimestamp===t.backgroundTimestamp)},drawElement:function(e,n,r,i,a){return t.drawElement(e,n,r,!1,!1,a)},getBoundingBox:u,getRotationPoint:function(e){return{x:((t=u(e)).x1+t.x2)/2,y:(t.y1+t.y2)/2};var t},getRotationOffset:function(e){return l(u(e))},allowEdgeTxrCaching:!1,allowParentTxrCaching:!1}),y=t.data.lblTxrCache=new jo(t,{getKey:function(e){return e[0]._private.labelStyleKey},drawElement:function(e,n,r,i,a){return t.drawElementText(e,n,r,i,"main",a)},getBoundingBox:c,getRotationPoint:function(e){return f(g(e,"labelX","labelY"),e)},getRotationOffset:function(e){var t=c(e),n=l(c(e));if(e.isNode()){switch(e.pstyle("text-halign").value){case"left":n.x=-t.w;break;case"right":n.x=0}switch(e.pstyle("text-valign").value){case"top":n.y=-t.h;break;case"bottom":n.y=0}}return n},isVisible:p}),m=t.data.slbTxrCache=new jo(t,{getKey:function(e){return e[0]._private.sourceLabelStyleKey},drawElement:function(e,n,r,i,a){return t.drawElementText(e,n,r,i,"source",a)},getBoundingBox:h,getRotationPoint:function(e){return f(g(e,"sourceLabelX","sourceLabelY"),e)},getRotationOffset:function(e){return l(h(e))},isVisible:p}),b=t.data.tlbTxrCache=new jo(t,{getKey:function(e){return e[0]._private.targetLabelStyleKey},drawElement:function(e,n,r,i,a){return t.drawElementText(e,n,r,i,"target",a)},getBoundingBox:d,getRotationPoint:function(e){return f(g(e,"sourceLabelX","sourceLabelY"),e)},getRotationOffset:function(e){return l(d(e))},isVisible:p}),x=t.data.lyrTxrCache=new Ho(t);t.onUpdateEleCalcs(function(e,t){v.invalidateElements(t),y.invalidateElements(t),m.invalidateElements(t),b.invalidateElements(t),x.invalidateElements(t);for(var n=0;n<t.length;n++){var r=t[n]._private;r.oldBackgroundTimestamp=r.backgroundTimestamp}});var w=function(e){for(var t=0;t<e.length;t++)x.enqueueElementRefinement(e[t].ele)};v.onDequeue(w),y.onDequeue(w),m.onDequeue(w),b.onDequeue(w)}Cs.CANVAS_LAYERS=3,Cs.SELECT_BOX=0,Cs.DRAG=1,Cs.NODE=2,Cs.BUFFER_COUNT=3,Cs.TEXTURE_BUFFER=0,Cs.MOTIONBLUR_BUFFER_NODE=1,Cs.MOTIONBLUR_BUFFER_DRAG=2,Cs.redrawHint=function(e,t){var n=this;switch(e){case"eles":n.data.canvasNeedsRedraw[Cs.NODE]=t;break;case"drag":n.data.canvasNeedsRedraw[Cs.DRAG]=t;break;case"select":n.data.canvasNeedsRedraw[Cs.SELECT_BOX]=t}};var Ds="undefined"!=typeof Path2D;Cs.path2dEnabled=function(e){if(void 0===e)return this.pathsEnabled;this.pathsEnabled=!!e},Cs.usePaths=function(){return Ds&&this.pathsEnabled},Cs.setImgSmoothing=function(e,t){null!=e.imageSmoothingEnabled?e.imageSmoothingEnabled=t:(e.webkitImageSmoothingEnabled=t,e.mozImageSmoothingEnabled=t,e.msImageSmoothingEnabled=t)},Cs.getImgSmoothing=function(e){return null!=e.imageSmoothingEnabled?e.imageSmoothingEnabled:e.webkitImageSmoothingEnabled||e.mozImageSmoothingEnabled||e.msImageSmoothingEnabled},Cs.makeOffscreenCanvas=function(t,n){var r;return"undefined"!==("undefined"==typeof OffscreenCanvas?"undefined":e(OffscreenCanvas))?r=new OffscreenCanvas(t,n):((r=document.createElement("canvas")).width=t,r.height=n),r},[$o,ns,ss,ls,us,cs,hs,ds,bs,Es].forEach(function(e){I(Cs,e)});var Ts=[{type:"layout",extensions:fo},{type:"renderer",extensions:[{name:"null",impl:go},{name:"base",impl:Ro},{name:"canvas",impl:ks}]}],Ps={},Ms={};function _s(e,t,n){var r=n,i=function(n){we("Can not register `"+t+"` for `"+e+"` since `"+n+"` already exists in the prototype and can not be overridden")};if("core"===e){if(qa.prototype[t])return i(t);qa.prototype[t]=n}else if("collection"===e){if(aa.prototype[t])return i(t);aa.prototype[t]=n}else if("layout"===e){for(var a=function(e){this.options=e,n.call(this,e),g(this._private)||(this._private={}),this._private.cy=e.cy,this._private.listeners=[],this.createEmitter()},o=a.prototype=Object.create(n.prototype),s=[],l=0;l<s.length;l++){var u=s[l];o[u]=o[u]||function(){return this}}o.start&&!o.run?o.run=function(){return this.start(),this}:!o.start&&o.run&&(o.start=function(){return this.run(),this});var c=n.prototype.stop;o.stop=function(){var e=this.options;if(e&&e.animate){var t=this.animations;if(t)for(var n=0;n<t.length;n++)t[n].stop()}return c?c.call(this):this.emit("layoutstop"),this},o.destroy||(o.destroy=function(){return this}),o.cy=function(){return this._private.cy};var h=function(e){return e._private.cy},d={addEventFields:function(e,t){t.layout=e,t.cy=h(e),t.target=e},bubble:function(){return!0},parent:function(e){return h(e)}};I(o,{createEmitter:function(){return this._private.emitter=new ki(d,this),this},emitter:function(){return this._private.emitter},on:function(e,t){return this.emitter().on(e,t),this},one:function(e,t){return this.emitter().one(e,t),this},once:function(e,t){return this.emitter().one(e,t),this},removeListener:function(e,t){return this.emitter().removeListener(e,t),this},emit:function(e,t){return this.emitter().emit(e,t),this}}),Hn.eventAliasesOn(o),r=a}else if("renderer"===e&&"null"!==t&&"base"!==t){var p=Bs("renderer","base"),f=p.prototype,v=n,y=n.prototype,m=function(){p.apply(this,arguments),v.apply(this,arguments)},b=m.prototype;for(var x in f){var w=f[x];if(null!=y[x])return i(x);b[x]=w}for(var E in y)b[E]=y[E];f.clientFunctions.forEach(function(e){b[e]=b[e]||function(){we("Renderer does not implement `renderer."+e+"()` on its prototype")}}),r=m}return L({map:Ps,keys:[e,t],value:r})}function Bs(e,t){return O({map:Ps,keys:[e,t]})}var Ns=function(){return 2===arguments.length?Bs.apply(null,arguments):3===arguments.length?_s.apply(null,arguments):4===arguments.length?function(e,t,n,r){return O({map:Ms,keys:[e,t,n,r]})}.apply(null,arguments):5===arguments.length?function(e,t,n,r,i){return L({map:Ms,keys:[e,t,n,r],value:i})}.apply(null,arguments):void we("Invalid extension access syntax")};qa.prototype.extension=Ns,Ts.forEach(function(e){e.extensions.forEach(function(t){_s(e.type,t.name,t.impl)})});var Is=function e(){if(!(this instanceof e))return new e;this.length=0},As=Is.prototype;As.instanceString=function(){return"stylesheet"},As.selector=function(e){return this[this.length++]={selector:e,properties:[]},this},As.css=function(e,t){var n=this.length-1;if(d(e))this[n].properties.push({name:e,value:t});else if(g(e))for(var r=e,i=Object.keys(r),a=0;a<i.length;a++){var o=i[a],s=r[o];if(null!=s){var l=Oa.properties[o]||Oa.properties[P(o)];if(null!=l){var u=l.name,c=s;this[n].properties.push({name:u,value:c})}}}return this},As.style=As.css,As.generateStyle=function(e){var t=new Oa(e);return this.appendToStyle(t)},As.appendToStyle=function(e){for(var t=0;t<this.length;t++){var n=this[t],r=n.selector,i=n.properties;e.selector(r);for(var a=0;a<i.length;a++){var o=i[a];e.css(o.name,o.value)}}return e};var zs=function(e){return void 0===e&&(e={}),g(e)?new qa(e):d(e)?Ns.apply(Ns,arguments):void 0};return zs.use=function(e){var t=Array.prototype.slice.call(arguments,1);return t.unshift(zs),e.apply(null,t),this},zs.version="3.4.0",zs.stylesheet=zs.Stylesheet=Is,zs});

;(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dagre=f()}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){
/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
module.exports={graphlib:require("./lib/graphlib"),layout:require("./lib/layout"),debug:require("./lib/debug"),util:{time:require("./lib/util").time,notime:require("./lib/util").notime},version:require("./lib/version")}},{"./lib/debug":6,"./lib/graphlib":7,"./lib/layout":9,"./lib/util":29,"./lib/version":30}],2:[function(require,module,exports){"use strict";var _=require("./lodash"),greedyFAS=require("./greedy-fas");module.exports={run:run,undo:undo};function run(g){var fas=g.graph().acyclicer==="greedy"?greedyFAS(g,weightFn(g)):dfsFAS(g);_.forEach(fas,function(e){var label=g.edge(e);g.removeEdge(e);label.forwardName=e.name;label.reversed=true;g.setEdge(e.w,e.v,label,_.uniqueId("rev"))});function weightFn(g){return function(e){return g.edge(e).weight}}}function dfsFAS(g){var fas=[],stack={},visited={};function dfs(v){if(_.has(visited,v)){return}visited[v]=true;stack[v]=true;_.forEach(g.outEdges(v),function(e){if(_.has(stack,e.w)){fas.push(e)}else{dfs(e.w)}});delete stack[v]}_.forEach(g.nodes(),dfs);return fas}function undo(g){_.forEach(g.edges(),function(e){var label=g.edge(e);if(label.reversed){g.removeEdge(e);var forwardName=label.forwardName;delete label.reversed;delete label.forwardName;g.setEdge(e.w,e.v,label,forwardName)}})}},{"./greedy-fas":8,"./lodash":10}],3:[function(require,module,exports){var _=require("./lodash"),util=require("./util");module.exports=addBorderSegments;function addBorderSegments(g){function dfs(v){var children=g.children(v),node=g.node(v);if(children.length){_.forEach(children,dfs)}if(_.has(node,"minRank")){node.borderLeft=[];node.borderRight=[];for(var rank=node.minRank,maxRank=node.maxRank+1;rank<maxRank;++rank){addBorderNode(g,"borderLeft","_bl",v,node,rank);addBorderNode(g,"borderRight","_br",v,node,rank)}}}_.forEach(g.children(),dfs)}function addBorderNode(g,prop,prefix,sg,sgNode,rank){var label={width:0,height:0,rank:rank,borderType:prop},prev=sgNode[prop][rank-1],curr=util.addDummyNode(g,"border",label,prefix);sgNode[prop][rank]=curr;g.setParent(curr,sg);if(prev){g.setEdge(prev,curr,{weight:1})}}},{"./lodash":10,"./util":29}],4:[function(require,module,exports){"use strict";var _=require("./lodash");module.exports={adjust:adjust,undo:undo};function adjust(g){var rankDir=g.graph().rankdir.toLowerCase();if(rankDir==="lr"||rankDir==="rl"){swapWidthHeight(g)}}function undo(g){var rankDir=g.graph().rankdir.toLowerCase();if(rankDir==="bt"||rankDir==="rl"){reverseY(g)}if(rankDir==="lr"||rankDir==="rl"){swapXY(g);swapWidthHeight(g)}}function swapWidthHeight(g){_.forEach(g.nodes(),function(v){swapWidthHeightOne(g.node(v))});_.forEach(g.edges(),function(e){swapWidthHeightOne(g.edge(e))})}function swapWidthHeightOne(attrs){var w=attrs.width;attrs.width=attrs.height;attrs.height=w}function reverseY(g){_.forEach(g.nodes(),function(v){reverseYOne(g.node(v))});_.forEach(g.edges(),function(e){var edge=g.edge(e);_.forEach(edge.points,reverseYOne);if(_.has(edge,"y")){reverseYOne(edge)}})}function reverseYOne(attrs){attrs.y=-attrs.y}function swapXY(g){_.forEach(g.nodes(),function(v){swapXYOne(g.node(v))});_.forEach(g.edges(),function(e){var edge=g.edge(e);_.forEach(edge.points,swapXYOne);if(_.has(edge,"x")){swapXYOne(edge)}})}function swapXYOne(attrs){var x=attrs.x;attrs.x=attrs.y;attrs.y=x}},{"./lodash":10}],5:[function(require,module,exports){
/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */
module.exports=List;function List(){var sentinel={};sentinel._next=sentinel._prev=sentinel;this._sentinel=sentinel}List.prototype.dequeue=function(){var sentinel=this._sentinel,entry=sentinel._prev;if(entry!==sentinel){unlink(entry);return entry}};List.prototype.enqueue=function(entry){var sentinel=this._sentinel;if(entry._prev&&entry._next){unlink(entry)}entry._next=sentinel._next;sentinel._next._prev=entry;sentinel._next=entry;entry._prev=sentinel};List.prototype.toString=function(){var strs=[],sentinel=this._sentinel,curr=sentinel._prev;while(curr!==sentinel){strs.push(JSON.stringify(curr,filterOutLinks));curr=curr._prev}return"["+strs.join(", ")+"]"};function unlink(entry){entry._prev._next=entry._next;entry._next._prev=entry._prev;delete entry._next;delete entry._prev}function filterOutLinks(k,v){if(k!=="_next"&&k!=="_prev"){return v}}},{}],6:[function(require,module,exports){var _=require("./lodash"),util=require("./util"),Graph=require("./graphlib").Graph;module.exports={debugOrdering:debugOrdering};
/* istanbul ignore next */function debugOrdering(g){var layerMatrix=util.buildLayerMatrix(g);var h=new Graph({compound:true,multigraph:true}).setGraph({});_.forEach(g.nodes(),function(v){h.setNode(v,{label:v});h.setParent(v,"layer"+g.node(v).rank)});_.forEach(g.edges(),function(e){h.setEdge(e.v,e.w,{},e.name)});_.forEach(layerMatrix,function(layer,i){var layerV="layer"+i;h.setNode(layerV,{rank:"same"});_.reduce(layer,function(u,v){h.setEdge(u,v,{style:"invis"});return v})});return h}},{"./graphlib":7,"./lodash":10,"./util":29}],7:[function(require,module,exports){
/* global window */
var graphlib;if(typeof require==="function"){try{graphlib=require("graphlib")}catch(e){}}if(!graphlib){graphlib=window.graphlib}module.exports=graphlib},{graphlib:31}],8:[function(require,module,exports){var _=require("./lodash"),Graph=require("./graphlib").Graph,List=require("./data/list");
/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */module.exports=greedyFAS;var DEFAULT_WEIGHT_FN=_.constant(1);function greedyFAS(g,weightFn){if(g.nodeCount()<=1){return[]}var state=buildState(g,weightFn||DEFAULT_WEIGHT_FN);var results=doGreedyFAS(state.graph,state.buckets,state.zeroIdx);
// Expand multi-edges
return _.flatten(_.map(results,function(e){return g.outEdges(e.v,e.w)}),true)}function doGreedyFAS(g,buckets,zeroIdx){var results=[],sources=buckets[buckets.length-1],sinks=buckets[0];var entry;while(g.nodeCount()){while(entry=sinks.dequeue()){removeNode(g,buckets,zeroIdx,entry)}while(entry=sources.dequeue()){removeNode(g,buckets,zeroIdx,entry)}if(g.nodeCount()){for(var i=buckets.length-2;i>0;--i){entry=buckets[i].dequeue();if(entry){results=results.concat(removeNode(g,buckets,zeroIdx,entry,true));break}}}}return results}function removeNode(g,buckets,zeroIdx,entry,collectPredecessors){var results=collectPredecessors?[]:undefined;_.forEach(g.inEdges(entry.v),function(edge){var weight=g.edge(edge),uEntry=g.node(edge.v);if(collectPredecessors){results.push({v:edge.v,w:edge.w})}uEntry.out-=weight;assignBucket(buckets,zeroIdx,uEntry)});_.forEach(g.outEdges(entry.v),function(edge){var weight=g.edge(edge),w=edge.w,wEntry=g.node(w);wEntry["in"]-=weight;assignBucket(buckets,zeroIdx,wEntry)});g.removeNode(entry.v);return results}function buildState(g,weightFn){var fasGraph=new Graph,maxIn=0,maxOut=0;_.forEach(g.nodes(),function(v){fasGraph.setNode(v,{v:v,in:0,out:0})});
// Aggregate weights on nodes, but also sum the weights across multi-edges
// into a single edge for the fasGraph.
_.forEach(g.edges(),function(e){var prevWeight=fasGraph.edge(e.v,e.w)||0,weight=weightFn(e),edgeWeight=prevWeight+weight;fasGraph.setEdge(e.v,e.w,edgeWeight);maxOut=Math.max(maxOut,fasGraph.node(e.v).out+=weight);maxIn=Math.max(maxIn,fasGraph.node(e.w)["in"]+=weight)});var buckets=_.range(maxOut+maxIn+3).map(function(){return new List});var zeroIdx=maxIn+1;_.forEach(fasGraph.nodes(),function(v){assignBucket(buckets,zeroIdx,fasGraph.node(v))});return{graph:fasGraph,buckets:buckets,zeroIdx:zeroIdx}}function assignBucket(buckets,zeroIdx,entry){if(!entry.out){buckets[0].enqueue(entry)}else if(!entry["in"]){buckets[buckets.length-1].enqueue(entry)}else{buckets[entry.out-entry["in"]+zeroIdx].enqueue(entry)}}},{"./data/list":5,"./graphlib":7,"./lodash":10}],9:[function(require,module,exports){"use strict";var _=require("./lodash"),acyclic=require("./acyclic"),normalize=require("./normalize"),rank=require("./rank"),normalizeRanks=require("./util").normalizeRanks,parentDummyChains=require("./parent-dummy-chains"),removeEmptyRanks=require("./util").removeEmptyRanks,nestingGraph=require("./nesting-graph"),addBorderSegments=require("./add-border-segments"),coordinateSystem=require("./coordinate-system"),order=require("./order"),position=require("./position"),util=require("./util"),Graph=require("./graphlib").Graph;module.exports=layout;function layout(g,opts){var time=opts&&opts.debugTiming?util.time:util.notime;time("layout",function(){var layoutGraph=time("  buildLayoutGraph",function(){return buildLayoutGraph(g)});time("  runLayout",function(){runLayout(layoutGraph,time)});time("  updateInputGraph",function(){updateInputGraph(g,layoutGraph)})})}function runLayout(g,time){time("    makeSpaceForEdgeLabels",function(){makeSpaceForEdgeLabels(g)});time("    removeSelfEdges",function(){removeSelfEdges(g)});time("    acyclic",function(){acyclic.run(g)});time("    nestingGraph.run",function(){nestingGraph.run(g)});time("    rank",function(){rank(util.asNonCompoundGraph(g))});time("    injectEdgeLabelProxies",function(){injectEdgeLabelProxies(g)});time("    removeEmptyRanks",function(){removeEmptyRanks(g)});time("    nestingGraph.cleanup",function(){nestingGraph.cleanup(g)});time("    normalizeRanks",function(){normalizeRanks(g)});time("    assignRankMinMax",function(){assignRankMinMax(g)});time("    removeEdgeLabelProxies",function(){removeEdgeLabelProxies(g)});time("    normalize.run",function(){normalize.run(g)});time("    parentDummyChains",function(){parentDummyChains(g)});time("    addBorderSegments",function(){addBorderSegments(g)});time("    order",function(){order(g)});time("    insertSelfEdges",function(){insertSelfEdges(g)});time("    adjustCoordinateSystem",function(){coordinateSystem.adjust(g)});time("    position",function(){position(g)});time("    positionSelfEdges",function(){positionSelfEdges(g)});time("    removeBorderNodes",function(){removeBorderNodes(g)});time("    normalize.undo",function(){normalize.undo(g)});time("    fixupEdgeLabelCoords",function(){fixupEdgeLabelCoords(g)});time("    undoCoordinateSystem",function(){coordinateSystem.undo(g)});time("    translateGraph",function(){translateGraph(g)});time("    assignNodeIntersects",function(){assignNodeIntersects(g)});time("    reversePoints",function(){reversePointsForReversedEdges(g)});time("    acyclic.undo",function(){acyclic.undo(g)})}
/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */function updateInputGraph(inputGraph,layoutGraph){_.forEach(inputGraph.nodes(),function(v){var inputLabel=inputGraph.node(v),layoutLabel=layoutGraph.node(v);if(inputLabel){inputLabel.x=layoutLabel.x;inputLabel.y=layoutLabel.y;if(layoutGraph.children(v).length){inputLabel.width=layoutLabel.width;inputLabel.height=layoutLabel.height}}});_.forEach(inputGraph.edges(),function(e){var inputLabel=inputGraph.edge(e),layoutLabel=layoutGraph.edge(e);inputLabel.points=layoutLabel.points;if(_.has(layoutLabel,"x")){inputLabel.x=layoutLabel.x;inputLabel.y=layoutLabel.y}});inputGraph.graph().width=layoutGraph.graph().width;inputGraph.graph().height=layoutGraph.graph().height}var graphNumAttrs=["nodesep","edgesep","ranksep","marginx","marginy"],graphDefaults={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},graphAttrs=["acyclicer","ranker","rankdir","align"],nodeNumAttrs=["width","height"],nodeDefaults={width:0,height:0},edgeNumAttrs=["minlen","weight","width","height","labeloffset"],edgeDefaults={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},edgeAttrs=["labelpos"];
/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */function buildLayoutGraph(inputGraph){var g=new Graph({multigraph:true,compound:true}),graph=canonicalize(inputGraph.graph());g.setGraph(_.merge({},graphDefaults,selectNumberAttrs(graph,graphNumAttrs),_.pick(graph,graphAttrs)));_.forEach(inputGraph.nodes(),function(v){var node=canonicalize(inputGraph.node(v));g.setNode(v,_.defaults(selectNumberAttrs(node,nodeNumAttrs),nodeDefaults));g.setParent(v,inputGraph.parent(v))});_.forEach(inputGraph.edges(),function(e){var edge=canonicalize(inputGraph.edge(e));g.setEdge(e,_.merge({},edgeDefaults,selectNumberAttrs(edge,edgeNumAttrs),_.pick(edge,edgeAttrs)))});return g}
/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */function makeSpaceForEdgeLabels(g){var graph=g.graph();graph.ranksep/=2;_.forEach(g.edges(),function(e){var edge=g.edge(e);edge.minlen*=2;if(edge.labelpos.toLowerCase()!=="c"){if(graph.rankdir==="TB"||graph.rankdir==="BT"){edge.width+=edge.labeloffset}else{edge.height+=edge.labeloffset}}})}
/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */function injectEdgeLabelProxies(g){_.forEach(g.edges(),function(e){var edge=g.edge(e);if(edge.width&&edge.height){var v=g.node(e.v),w=g.node(e.w),label={rank:(w.rank-v.rank)/2+v.rank,e:e};util.addDummyNode(g,"edge-proxy",label,"_ep")}})}function assignRankMinMax(g){var maxRank=0;_.forEach(g.nodes(),function(v){var node=g.node(v);if(node.borderTop){node.minRank=g.node(node.borderTop).rank;node.maxRank=g.node(node.borderBottom).rank;maxRank=_.max(maxRank,node.maxRank)}});g.graph().maxRank=maxRank}function removeEdgeLabelProxies(g){_.forEach(g.nodes(),function(v){var node=g.node(v);if(node.dummy==="edge-proxy"){g.edge(node.e).labelRank=node.rank;g.removeNode(v)}})}function translateGraph(g){var minX=Number.POSITIVE_INFINITY,maxX=0,minY=Number.POSITIVE_INFINITY,maxY=0,graphLabel=g.graph(),marginX=graphLabel.marginx||0,marginY=graphLabel.marginy||0;function getExtremes(attrs){var x=attrs.x,y=attrs.y,w=attrs.width,h=attrs.height;minX=Math.min(minX,x-w/2);maxX=Math.max(maxX,x+w/2);minY=Math.min(minY,y-h/2);maxY=Math.max(maxY,y+h/2)}_.forEach(g.nodes(),function(v){getExtremes(g.node(v))});_.forEach(g.edges(),function(e){var edge=g.edge(e);if(_.has(edge,"x")){getExtremes(edge)}});minX-=marginX;minY-=marginY;_.forEach(g.nodes(),function(v){var node=g.node(v);node.x-=minX;node.y-=minY});_.forEach(g.edges(),function(e){var edge=g.edge(e);_.forEach(edge.points,function(p){p.x-=minX;p.y-=minY});if(_.has(edge,"x")){edge.x-=minX}if(_.has(edge,"y")){edge.y-=minY}});graphLabel.width=maxX-minX+marginX;graphLabel.height=maxY-minY+marginY}function assignNodeIntersects(g){_.forEach(g.edges(),function(e){var edge=g.edge(e),nodeV=g.node(e.v),nodeW=g.node(e.w),p1,p2;if(!edge.points){edge.points=[];p1=nodeW;p2=nodeV}else{p1=edge.points[0];p2=edge.points[edge.points.length-1]}edge.points.unshift(util.intersectRect(nodeV,p1));edge.points.push(util.intersectRect(nodeW,p2))})}function fixupEdgeLabelCoords(g){_.forEach(g.edges(),function(e){var edge=g.edge(e);if(_.has(edge,"x")){if(edge.labelpos==="l"||edge.labelpos==="r"){edge.width-=edge.labeloffset}switch(edge.labelpos){case"l":edge.x-=edge.width/2+edge.labeloffset;break;case"r":edge.x+=edge.width/2+edge.labeloffset;break}}})}function reversePointsForReversedEdges(g){_.forEach(g.edges(),function(e){var edge=g.edge(e);if(edge.reversed){edge.points.reverse()}})}function removeBorderNodes(g){_.forEach(g.nodes(),function(v){if(g.children(v).length){var node=g.node(v),t=g.node(node.borderTop),b=g.node(node.borderBottom),l=g.node(_.last(node.borderLeft)),r=g.node(_.last(node.borderRight));node.width=Math.abs(r.x-l.x);node.height=Math.abs(b.y-t.y);node.x=l.x+node.width/2;node.y=t.y+node.height/2}});_.forEach(g.nodes(),function(v){if(g.node(v).dummy==="border"){g.removeNode(v)}})}function removeSelfEdges(g){_.forEach(g.edges(),function(e){if(e.v===e.w){var node=g.node(e.v);if(!node.selfEdges){node.selfEdges=[]}node.selfEdges.push({e:e,label:g.edge(e)});g.removeEdge(e)}})}function insertSelfEdges(g){var layers=util.buildLayerMatrix(g);_.forEach(layers,function(layer){var orderShift=0;_.forEach(layer,function(v,i){var node=g.node(v);node.order=i+orderShift;_.forEach(node.selfEdges,function(selfEdge){util.addDummyNode(g,"selfedge",{width:selfEdge.label.width,height:selfEdge.label.height,rank:node.rank,order:i+ ++orderShift,e:selfEdge.e,label:selfEdge.label},"_se")});delete node.selfEdges})})}function positionSelfEdges(g){_.forEach(g.nodes(),function(v){var node=g.node(v);if(node.dummy==="selfedge"){var selfNode=g.node(node.e.v),x=selfNode.x+selfNode.width/2,y=selfNode.y,dx=node.x-x,dy=selfNode.height/2;g.setEdge(node.e,node.label);g.removeNode(v);node.label.points=[{x:x+2*dx/3,y:y-dy},{x:x+5*dx/6,y:y-dy},{x:x+dx,y:y},{x:x+5*dx/6,y:y+dy},{x:x+2*dx/3,y:y+dy}];node.label.x=node.x;node.label.y=node.y}})}function selectNumberAttrs(obj,attrs){return _.mapValues(_.pick(obj,attrs),Number)}function canonicalize(attrs){var newAttrs={};_.forEach(attrs,function(v,k){newAttrs[k.toLowerCase()]=v});return newAttrs}},{"./acyclic":2,"./add-border-segments":3,"./coordinate-system":4,"./graphlib":7,"./lodash":10,"./nesting-graph":11,"./normalize":12,"./order":17,"./parent-dummy-chains":22,"./position":24,"./rank":26,"./util":29}],10:[function(require,module,exports){
/* global window */
var lodash;if(typeof require==="function"){try{lodash={cloneDeep:require("lodash/cloneDeep"),constant:require("lodash/constant"),defaults:require("lodash/defaults"),each:require("lodash/each"),filter:require("lodash/filter"),find:require("lodash/find"),flatten:require("lodash/flatten"),forEach:require("lodash/forEach"),forIn:require("lodash/forIn"),has:require("lodash/has"),isUndefined:require("lodash/isUndefined"),last:require("lodash/last"),map:require("lodash/map"),mapValues:require("lodash/mapValues"),max:require("lodash/max"),merge:require("lodash/merge"),min:require("lodash/min"),minBy:require("lodash/minBy"),now:require("lodash/now"),pick:require("lodash/pick"),range:require("lodash/range"),reduce:require("lodash/reduce"),sortBy:require("lodash/sortBy"),uniqueId:require("lodash/uniqueId"),values:require("lodash/values"),zipObject:require("lodash/zipObject")}}catch(e){}}if(!lodash){lodash=window._}module.exports=lodash},{"lodash/cloneDeep":227,"lodash/constant":228,"lodash/defaults":229,"lodash/each":230,"lodash/filter":232,"lodash/find":233,"lodash/flatten":235,"lodash/forEach":236,"lodash/forIn":237,"lodash/has":239,"lodash/isUndefined":258,"lodash/last":261,"lodash/map":262,"lodash/mapValues":263,"lodash/max":264,"lodash/merge":266,"lodash/min":267,"lodash/minBy":268,"lodash/now":270,"lodash/pick":271,"lodash/range":273,"lodash/reduce":274,"lodash/sortBy":276,"lodash/uniqueId":286,"lodash/values":287,"lodash/zipObject":288}],11:[function(require,module,exports){var _=require("./lodash"),util=require("./util");module.exports={run:run,cleanup:cleanup};
/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */function run(g){var root=util.addDummyNode(g,"root",{},"_root");var depths=treeDepths(g);var height=_.max(_.values(depths))-1;// Note: depths is an Object not an array
var nodeSep=2*height+1;g.graph().nestingRoot=root;
// Multiply minlen by nodeSep to align nodes on non-border ranks.
_.forEach(g.edges(),function(e){g.edge(e).minlen*=nodeSep});
// Calculate a weight that is sufficient to keep subgraphs vertically compact
var weight=sumWeights(g)+1;
// Create border nodes and link them up
_.forEach(g.children(),function(child){dfs(g,root,nodeSep,weight,height,depths,child)});
// Save the multiplier for node layers for later removal of empty border
// layers.
g.graph().nodeRankFactor=nodeSep}function dfs(g,root,nodeSep,weight,height,depths,v){var children=g.children(v);if(!children.length){if(v!==root){g.setEdge(root,v,{weight:0,minlen:nodeSep})}return}var top=util.addBorderNode(g,"_bt"),bottom=util.addBorderNode(g,"_bb"),label=g.node(v);g.setParent(top,v);label.borderTop=top;g.setParent(bottom,v);label.borderBottom=bottom;_.forEach(children,function(child){dfs(g,root,nodeSep,weight,height,depths,child);var childNode=g.node(child),childTop=childNode.borderTop?childNode.borderTop:child,childBottom=childNode.borderBottom?childNode.borderBottom:child,thisWeight=childNode.borderTop?weight:2*weight,minlen=childTop!==childBottom?1:height-depths[v]+1;g.setEdge(top,childTop,{weight:thisWeight,minlen:minlen,nestingEdge:true});g.setEdge(childBottom,bottom,{weight:thisWeight,minlen:minlen,nestingEdge:true})});if(!g.parent(v)){g.setEdge(root,top,{weight:0,minlen:height+depths[v]})}}function treeDepths(g){var depths={};function dfs(v,depth){var children=g.children(v);if(children&&children.length){_.forEach(children,function(child){dfs(child,depth+1)})}depths[v]=depth}_.forEach(g.children(),function(v){dfs(v,1)});return depths}function sumWeights(g){return _.reduce(g.edges(),function(acc,e){return acc+g.edge(e).weight},0)}function cleanup(g){var graphLabel=g.graph();g.removeNode(graphLabel.nestingRoot);delete graphLabel.nestingRoot;_.forEach(g.edges(),function(e){var edge=g.edge(e);if(edge.nestingEdge){g.removeEdge(e)}})}},{"./lodash":10,"./util":29}],12:[function(require,module,exports){"use strict";var _=require("./lodash"),util=require("./util");module.exports={run:run,undo:undo};
/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */function run(g){g.graph().dummyChains=[];_.forEach(g.edges(),function(edge){normalizeEdge(g,edge)})}function normalizeEdge(g,e){var v=e.v,vRank=g.node(v).rank,w=e.w,wRank=g.node(w).rank,name=e.name,edgeLabel=g.edge(e),labelRank=edgeLabel.labelRank;if(wRank===vRank+1)return;g.removeEdge(e);var dummy,attrs,i;for(i=0,++vRank;vRank<wRank;++i,++vRank){edgeLabel.points=[];attrs={width:0,height:0,edgeLabel:edgeLabel,edgeObj:e,rank:vRank};dummy=util.addDummyNode(g,"edge",attrs,"_d");if(vRank===labelRank){attrs.width=edgeLabel.width;attrs.height=edgeLabel.height;attrs.dummy="edge-label";attrs.labelpos=edgeLabel.labelpos}g.setEdge(v,dummy,{weight:edgeLabel.weight},name);if(i===0){g.graph().dummyChains.push(dummy)}v=dummy}g.setEdge(v,w,{weight:edgeLabel.weight},name)}function undo(g){_.forEach(g.graph().dummyChains,function(v){var node=g.node(v),origLabel=node.edgeLabel,w;g.setEdge(node.edgeObj,origLabel);while(node.dummy){w=g.successors(v)[0];g.removeNode(v);origLabel.points.push({x:node.x,y:node.y});if(node.dummy==="edge-label"){origLabel.x=node.x;origLabel.y=node.y;origLabel.width=node.width;origLabel.height=node.height}v=w;node=g.node(v)}})}},{"./lodash":10,"./util":29}],13:[function(require,module,exports){var _=require("../lodash");module.exports=addSubgraphConstraints;function addSubgraphConstraints(g,cg,vs){var prev={},rootPrev;_.forEach(vs,function(v){var child=g.parent(v),parent,prevChild;while(child){parent=g.parent(child);if(parent){prevChild=prev[parent];prev[parent]=child}else{prevChild=rootPrev;rootPrev=child}if(prevChild&&prevChild!==child){cg.setEdge(prevChild,child);return}child=parent}});
/*
  function dfs(v) {
    var children = v ? g.children(v) : g.children();
    if (children.length) {
      var min = Number.POSITIVE_INFINITY,
          subgraphs = [];
      _.each(children, function(child) {
        var childMin = dfs(child);
        if (g.children(child).length) {
          subgraphs.push({ v: child, order: childMin });
        }
        min = Math.min(min, childMin);
      });
      _.reduce(_.sortBy(subgraphs, "order"), function(prev, curr) {
        cg.setEdge(prev.v, curr.v);
        return curr;
      });
      return min;
    }
    return g.node(v).order;
  }
  dfs(undefined);
  */}},{"../lodash":10}],14:[function(require,module,exports){var _=require("../lodash");module.exports=barycenter;function barycenter(g,movable){return _.map(movable,function(v){var inV=g.inEdges(v);if(!inV.length){return{v:v}}else{var result=_.reduce(inV,function(acc,e){var edge=g.edge(e),nodeU=g.node(e.v);return{sum:acc.sum+edge.weight*nodeU.order,weight:acc.weight+edge.weight}},{sum:0,weight:0});return{v:v,barycenter:result.sum/result.weight,weight:result.weight}}})}},{"../lodash":10}],15:[function(require,module,exports){var _=require("../lodash"),Graph=require("../graphlib").Graph;module.exports=buildLayerGraph;
/*
 * Constructs a graph that can be used to sort a layer of nodes. The graph will
 * contain all base and subgraph nodes from the request layer in their original
 * hierarchy and any edges that are incident on these nodes and are of the type
 * requested by the "relationship" parameter.
 *
 * Nodes from the requested rank that do not have parents are assigned a root
 * node in the output graph, which is set in the root graph attribute. This
 * makes it easy to walk the hierarchy of movable nodes during ordering.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG
 *    2. Base nodes in the input graph have a rank attribute
 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
 *    4. Edges have an assigned weight
 *
 * Post-conditions:
 *
 *    1. Output graph has all nodes in the movable rank with preserved
 *       hierarchy.
 *    2. Root nodes in the movable layer are made children of the node
 *       indicated by the root attribute of the graph.
 *    3. Non-movable nodes incident on movable nodes, selected by the
 *       relationship parameter, are included in the graph (without hierarchy).
 *    4. Edges incident on movable nodes, selected by the relationship
 *       parameter, are added to the output graph.
 *    5. The weights for copied edges are aggregated as need, since the output
 *       graph is not a multi-graph.
 */function buildLayerGraph(g,rank,relationship){var root=createRootNode(g),result=new Graph({compound:true}).setGraph({root:root}).setDefaultNodeLabel(function(v){return g.node(v)});_.forEach(g.nodes(),function(v){var node=g.node(v),parent=g.parent(v);if(node.rank===rank||node.minRank<=rank&&rank<=node.maxRank){result.setNode(v);result.setParent(v,parent||root);
// This assumes we have only short edges!
_.forEach(g[relationship](v),function(e){var u=e.v===v?e.w:e.v,edge=result.edge(u,v),weight=!_.isUndefined(edge)?edge.weight:0;result.setEdge(u,v,{weight:g.edge(e).weight+weight})});if(_.has(node,"minRank")){result.setNode(v,{borderLeft:node.borderLeft[rank],borderRight:node.borderRight[rank]})}}});return result}function createRootNode(g){var v;while(g.hasNode(v=_.uniqueId("_root")));return v}},{"../graphlib":7,"../lodash":10}],16:[function(require,module,exports){"use strict";var _=require("../lodash");module.exports=crossCount;
/*
 * A function that takes a layering (an array of layers, each with an array of
 * ordererd nodes) and a graph and returns a weighted crossing count.
 *
 * Pre-conditions:
 *
 *    1. Input graph must be simple (not a multigraph), directed, and include
 *       only simple edges.
 *    2. Edges in the input graph must have assigned weights.
 *
 * Post-conditions:
 *
 *    1. The graph and layering matrix are left unchanged.
 *
 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
 */function crossCount(g,layering){var cc=0;for(var i=1;i<layering.length;++i){cc+=twoLayerCrossCount(g,layering[i-1],layering[i])}return cc}function twoLayerCrossCount(g,northLayer,southLayer){
// Sort all of the edges between the north and south layers by their position
// in the north layer and then the south. Map these edges to the position of
// their head in the south layer.
var southPos=_.zipObject(southLayer,_.map(southLayer,function(v,i){return i}));var southEntries=_.flatten(_.map(northLayer,function(v){return _.sortBy(_.map(g.outEdges(v),function(e){return{pos:southPos[e.w],weight:g.edge(e).weight}}),"pos")}),true);
// Build the accumulator tree
var firstIndex=1;while(firstIndex<southLayer.length)firstIndex<<=1;var treeSize=2*firstIndex-1;firstIndex-=1;var tree=_.map(new Array(treeSize),function(){return 0});
// Calculate the weighted crossings
var cc=0;_.forEach(southEntries.forEach(function(entry){var index=entry.pos+firstIndex;tree[index]+=entry.weight;var weightSum=0;while(index>0){if(index%2){weightSum+=tree[index+1]}index=index-1>>1;tree[index]+=entry.weight}cc+=entry.weight*weightSum}));return cc}},{"../lodash":10}],17:[function(require,module,exports){"use strict";var _=require("../lodash"),initOrder=require("./init-order"),crossCount=require("./cross-count"),sortSubgraph=require("./sort-subgraph"),buildLayerGraph=require("./build-layer-graph"),addSubgraphConstraints=require("./add-subgraph-constraints"),Graph=require("../graphlib").Graph,util=require("../util");module.exports=order;
/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */function order(g){var maxRank=util.maxRank(g),downLayerGraphs=buildLayerGraphs(g,_.range(1,maxRank+1),"inEdges"),upLayerGraphs=buildLayerGraphs(g,_.range(maxRank-1,-1,-1),"outEdges");var layering=initOrder(g);assignOrder(g,layering);var bestCC=Number.POSITIVE_INFINITY,best;for(var i=0,lastBest=0;lastBest<4;++i,++lastBest){sweepLayerGraphs(i%2?downLayerGraphs:upLayerGraphs,i%4>=2);layering=util.buildLayerMatrix(g);var cc=crossCount(g,layering);if(cc<bestCC){lastBest=0;best=_.cloneDeep(layering);bestCC=cc}}assignOrder(g,best)}function buildLayerGraphs(g,ranks,relationship){return _.map(ranks,function(rank){return buildLayerGraph(g,rank,relationship)})}function sweepLayerGraphs(layerGraphs,biasRight){var cg=new Graph;_.forEach(layerGraphs,function(lg){var root=lg.graph().root;var sorted=sortSubgraph(lg,root,cg,biasRight);_.forEach(sorted.vs,function(v,i){lg.node(v).order=i});addSubgraphConstraints(lg,cg,sorted.vs)})}function assignOrder(g,layering){_.forEach(layering,function(layer){_.forEach(layer,function(v,i){g.node(v).order=i})})}},{"../graphlib":7,"../lodash":10,"../util":29,"./add-subgraph-constraints":13,"./build-layer-graph":15,"./cross-count":16,"./init-order":18,"./sort-subgraph":20}],18:[function(require,module,exports){"use strict";var _=require("../lodash");module.exports=initOrder;
/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */function initOrder(g){var visited={},simpleNodes=_.filter(g.nodes(),function(v){return!g.children(v).length}),maxRank=_.max(_.map(simpleNodes,function(v){return g.node(v).rank})),layers=_.map(_.range(maxRank+1),function(){return[]});function dfs(v){if(_.has(visited,v))return;visited[v]=true;var node=g.node(v);layers[node.rank].push(v);_.forEach(g.successors(v),dfs)}var orderedVs=_.sortBy(simpleNodes,function(v){return g.node(v).rank});_.forEach(orderedVs,dfs);return layers}},{"../lodash":10}],19:[function(require,module,exports){"use strict";var _=require("../lodash");module.exports=resolveConflicts;
/*
 * Given a list of entries of the form {v, barycenter, weight} and a
 * constraint graph this function will resolve any conflicts between the
 * constraint graph and the barycenters for the entries. If the barycenters for
 * an entry would violate a constraint in the constraint graph then we coalesce
 * the nodes in the conflict into a new node that respects the contraint and
 * aggregates barycenter and weight information.
 *
 * This implementation is based on the description in Forster, "A Fast and
 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
 * differs in some specific details.
 *
 * Pre-conditions:
 *
 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
 *       no barycenter, then {v}.
 *
 * Returns:
 *
 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
 *    `vs` may either be a singleton or it may be an aggregation of nodes
 *    ordered such that they do not violate constraints from the constraint
 *    graph. The property `i` is the lowest original index of any of the
 *    elements in `vs`.
 */function resolveConflicts(entries,cg){var mappedEntries={};_.forEach(entries,function(entry,i){var tmp=mappedEntries[entry.v]={indegree:0,in:[],out:[],vs:[entry.v],i:i};if(!_.isUndefined(entry.barycenter)){tmp.barycenter=entry.barycenter;tmp.weight=entry.weight}});_.forEach(cg.edges(),function(e){var entryV=mappedEntries[e.v],entryW=mappedEntries[e.w];if(!_.isUndefined(entryV)&&!_.isUndefined(entryW)){entryW.indegree++;entryV.out.push(mappedEntries[e.w])}});var sourceSet=_.filter(mappedEntries,function(entry){return!entry.indegree});return doResolveConflicts(sourceSet)}function doResolveConflicts(sourceSet){var entries=[];function handleIn(vEntry){return function(uEntry){if(uEntry.merged){return}if(_.isUndefined(uEntry.barycenter)||_.isUndefined(vEntry.barycenter)||uEntry.barycenter>=vEntry.barycenter){mergeEntries(vEntry,uEntry)}}}function handleOut(vEntry){return function(wEntry){wEntry["in"].push(vEntry);if(--wEntry.indegree===0){sourceSet.push(wEntry)}}}while(sourceSet.length){var entry=sourceSet.pop();entries.push(entry);_.forEach(entry["in"].reverse(),handleIn(entry));_.forEach(entry.out,handleOut(entry))}return _.map(_.filter(entries,function(entry){return!entry.merged}),function(entry){return _.pick(entry,["vs","i","barycenter","weight"])})}function mergeEntries(target,source){var sum=0,weight=0;if(target.weight){sum+=target.barycenter*target.weight;weight+=target.weight}if(source.weight){sum+=source.barycenter*source.weight;weight+=source.weight}target.vs=source.vs.concat(target.vs);target.barycenter=sum/weight;target.weight=weight;target.i=Math.min(source.i,target.i);source.merged=true}},{"../lodash":10}],20:[function(require,module,exports){var _=require("../lodash"),barycenter=require("./barycenter"),resolveConflicts=require("./resolve-conflicts"),sort=require("./sort");module.exports=sortSubgraph;function sortSubgraph(g,v,cg,biasRight){var movable=g.children(v),node=g.node(v),bl=node?node.borderLeft:undefined,br=node?node.borderRight:undefined,subgraphs={};if(bl){movable=_.filter(movable,function(w){return w!==bl&&w!==br})}var barycenters=barycenter(g,movable);_.forEach(barycenters,function(entry){if(g.children(entry.v).length){var subgraphResult=sortSubgraph(g,entry.v,cg,biasRight);subgraphs[entry.v]=subgraphResult;if(_.has(subgraphResult,"barycenter")){mergeBarycenters(entry,subgraphResult)}}});var entries=resolveConflicts(barycenters,cg);expandSubgraphs(entries,subgraphs);var result=sort(entries,biasRight);if(bl){result.vs=_.flatten([bl,result.vs,br],true);if(g.predecessors(bl).length){var blPred=g.node(g.predecessors(bl)[0]),brPred=g.node(g.predecessors(br)[0]);if(!_.has(result,"barycenter")){result.barycenter=0;result.weight=0}result.barycenter=(result.barycenter*result.weight+blPred.order+brPred.order)/(result.weight+2);result.weight+=2}}return result}function expandSubgraphs(entries,subgraphs){_.forEach(entries,function(entry){entry.vs=_.flatten(entry.vs.map(function(v){if(subgraphs[v]){return subgraphs[v].vs}return v}),true)})}function mergeBarycenters(target,other){if(!_.isUndefined(target.barycenter)){target.barycenter=(target.barycenter*target.weight+other.barycenter*other.weight)/(target.weight+other.weight);target.weight+=other.weight}else{target.barycenter=other.barycenter;target.weight=other.weight}}},{"../lodash":10,"./barycenter":14,"./resolve-conflicts":19,"./sort":21}],21:[function(require,module,exports){var _=require("../lodash"),util=require("../util");module.exports=sort;function sort(entries,biasRight){var parts=util.partition(entries,function(entry){return _.has(entry,"barycenter")});var sortable=parts.lhs,unsortable=_.sortBy(parts.rhs,function(entry){return-entry.i}),vs=[],sum=0,weight=0,vsIndex=0;sortable.sort(compareWithBias(!!biasRight));vsIndex=consumeUnsortable(vs,unsortable,vsIndex);_.forEach(sortable,function(entry){vsIndex+=entry.vs.length;vs.push(entry.vs);sum+=entry.barycenter*entry.weight;weight+=entry.weight;vsIndex=consumeUnsortable(vs,unsortable,vsIndex)});var result={vs:_.flatten(vs,true)};if(weight){result.barycenter=sum/weight;result.weight=weight}return result}function consumeUnsortable(vs,unsortable,index){var last;while(unsortable.length&&(last=_.last(unsortable)).i<=index){unsortable.pop();vs.push(last.vs);index++}return index}function compareWithBias(bias){return function(entryV,entryW){if(entryV.barycenter<entryW.barycenter){return-1}else if(entryV.barycenter>entryW.barycenter){return 1}return!bias?entryV.i-entryW.i:entryW.i-entryV.i}}},{"../lodash":10,"../util":29}],22:[function(require,module,exports){var _=require("./lodash");module.exports=parentDummyChains;function parentDummyChains(g){var postorderNums=postorder(g);_.forEach(g.graph().dummyChains,function(v){var node=g.node(v),edgeObj=node.edgeObj,pathData=findPath(g,postorderNums,edgeObj.v,edgeObj.w),path=pathData.path,lca=pathData.lca,pathIdx=0,pathV=path[pathIdx],ascending=true;while(v!==edgeObj.w){node=g.node(v);if(ascending){while((pathV=path[pathIdx])!==lca&&g.node(pathV).maxRank<node.rank){pathIdx++}if(pathV===lca){ascending=false}}if(!ascending){while(pathIdx<path.length-1&&g.node(pathV=path[pathIdx+1]).minRank<=node.rank){pathIdx++}pathV=path[pathIdx]}g.setParent(v,pathV);v=g.successors(v)[0]}})}
// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
function findPath(g,postorderNums,v,w){var vPath=[],wPath=[],low=Math.min(postorderNums[v].low,postorderNums[w].low),lim=Math.max(postorderNums[v].lim,postorderNums[w].lim),parent,lca;
// Traverse up from v to find the LCA
parent=v;do{parent=g.parent(parent);vPath.push(parent)}while(parent&&(postorderNums[parent].low>low||lim>postorderNums[parent].lim));lca=parent;
// Traverse from w to LCA
parent=w;while((parent=g.parent(parent))!==lca){wPath.push(parent)}return{path:vPath.concat(wPath.reverse()),lca:lca}}function postorder(g){var result={},lim=0;function dfs(v){var low=lim;_.forEach(g.children(v),dfs);result[v]={low:low,lim:lim++}}_.forEach(g.children(),dfs);return result}},{"./lodash":10}],23:[function(require,module,exports){"use strict";var _=require("../lodash"),Graph=require("../graphlib").Graph,util=require("../util");
/*
 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
 * and Simple Horizontal Coordinate Assignment."
 */module.exports={positionX:positionX,findType1Conflicts:findType1Conflicts,findType2Conflicts:findType2Conflicts,addConflict:addConflict,hasConflict:hasConflict,verticalAlignment:verticalAlignment,horizontalCompaction:horizontalCompaction,alignCoordinates:alignCoordinates,findSmallestWidthAlignment:findSmallestWidthAlignment,balance:balance};
/*
 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
 * property. A type-1 conflict is one where a non-inner segment crosses an
 * inner segment. An inner segment is an edge with both incident nodes marked
 * with the "dummy" property.
 *
 * This algorithm scans layer by layer, starting with the second, for type-1
 * conflicts between the current layer and the previous layer. For each layer
 * it scans the nodes from left to right until it reaches one that is incident
 * on an inner segment. It then scans predecessors to determine if they have
 * edges that cross that inner segment. At the end a final scan is done for all
 * nodes on the current rank to see if they cross the last visited inner
 * segment.
 *
 * This algorithm (safely) assumes that a dummy node will only be incident on a
 * single node in the layers being scanned.
 */function findType1Conflicts(g,layering){var conflicts={};function visitLayer(prevLayer,layer){var
// last visited node in the previous layer that is incident on an inner
// segment.
k0=0,
// Tracks the last node in this layer scanned for crossings with a type-1
// segment.
scanPos=0,prevLayerLength=prevLayer.length,lastNode=_.last(layer);_.forEach(layer,function(v,i){var w=findOtherInnerSegmentNode(g,v),k1=w?g.node(w).order:prevLayerLength;if(w||v===lastNode){_.forEach(layer.slice(scanPos,i+1),function(scanNode){_.forEach(g.predecessors(scanNode),function(u){var uLabel=g.node(u),uPos=uLabel.order;if((uPos<k0||k1<uPos)&&!(uLabel.dummy&&g.node(scanNode).dummy)){addConflict(conflicts,u,scanNode)}})});scanPos=i+1;k0=k1}});return layer}_.reduce(layering,visitLayer);return conflicts}function findType2Conflicts(g,layering){var conflicts={};function scan(south,southPos,southEnd,prevNorthBorder,nextNorthBorder){var v;_.forEach(_.range(southPos,southEnd),function(i){v=south[i];if(g.node(v).dummy){_.forEach(g.predecessors(v),function(u){var uNode=g.node(u);if(uNode.dummy&&(uNode.order<prevNorthBorder||uNode.order>nextNorthBorder)){addConflict(conflicts,u,v)}})}})}function visitLayer(north,south){var prevNorthPos=-1,nextNorthPos,southPos=0;_.forEach(south,function(v,southLookahead){if(g.node(v).dummy==="border"){var predecessors=g.predecessors(v);if(predecessors.length){nextNorthPos=g.node(predecessors[0]).order;scan(south,southPos,southLookahead,prevNorthPos,nextNorthPos);southPos=southLookahead;prevNorthPos=nextNorthPos}}scan(south,southPos,south.length,nextNorthPos,north.length)});return south}_.reduce(layering,visitLayer);return conflicts}function findOtherInnerSegmentNode(g,v){if(g.node(v).dummy){return _.find(g.predecessors(v),function(u){return g.node(u).dummy})}}function addConflict(conflicts,v,w){if(v>w){var tmp=v;v=w;w=tmp}var conflictsV=conflicts[v];if(!conflictsV){conflicts[v]=conflictsV={}}conflictsV[w]=true}function hasConflict(conflicts,v,w){if(v>w){var tmp=v;v=w;w=tmp}return _.has(conflicts[v],w)}
/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */function verticalAlignment(g,layering,conflicts,neighborFn){var root={},align={},pos={};
// We cache the position here based on the layering because the graph and
// layering may be out of sync. The layering matrix is manipulated to
// generate different extreme alignments.
_.forEach(layering,function(layer){_.forEach(layer,function(v,order){root[v]=v;align[v]=v;pos[v]=order})});_.forEach(layering,function(layer){var prevIdx=-1;_.forEach(layer,function(v){var ws=neighborFn(v);if(ws.length){ws=_.sortBy(ws,function(w){return pos[w]});var mp=(ws.length-1)/2;for(var i=Math.floor(mp),il=Math.ceil(mp);i<=il;++i){var w=ws[i];if(align[v]===v&&prevIdx<pos[w]&&!hasConflict(conflicts,v,w)){align[w]=v;align[v]=root[v]=root[w];prevIdx=pos[w]}}}})});return{root:root,align:align}}function horizontalCompaction(g,layering,root,align,reverseSep){
// This portion of the algorithm differs from BK due to a number of problems.
// Instead of their algorithm we construct a new block graph and do two
// sweeps. The first sweep places blocks with the smallest possible
// coordinates. The second sweep removes unused space by moving blocks to the
// greatest coordinates without violating separation.
var xs={},blockG=buildBlockGraph(g,layering,root,reverseSep),borderType=reverseSep?"borderLeft":"borderRight";function iterate(setXsFunc,nextNodesFunc){var stack=blockG.nodes();var elem=stack.pop();var visited={};while(elem){if(visited[elem]){setXsFunc(elem)}else{visited[elem]=true;stack.push(elem);stack=stack.concat(nextNodesFunc(elem))}elem=stack.pop()}}
// First pass, assign smallest coordinates
function pass1(elem){xs[elem]=blockG.inEdges(elem).reduce(function(acc,e){return Math.max(acc,xs[e.v]+blockG.edge(e))},0)}
// Second pass, assign greatest coordinates
function pass2(elem){var min=blockG.outEdges(elem).reduce(function(acc,e){return Math.min(acc,xs[e.w]-blockG.edge(e))},Number.POSITIVE_INFINITY);var node=g.node(elem);if(min!==Number.POSITIVE_INFINITY&&node.borderType!==borderType){xs[elem]=Math.max(xs[elem],min)}}iterate(pass1,blockG.predecessors.bind(blockG));iterate(pass2,blockG.successors.bind(blockG));
// Assign x coordinates to all nodes
_.forEach(align,function(v){xs[v]=xs[root[v]]});return xs}function buildBlockGraph(g,layering,root,reverseSep){var blockGraph=new Graph,graphLabel=g.graph(),sepFn=sep(graphLabel.nodesep,graphLabel.edgesep,reverseSep);_.forEach(layering,function(layer){var u;_.forEach(layer,function(v){var vRoot=root[v];blockGraph.setNode(vRoot);if(u){var uRoot=root[u],prevMax=blockGraph.edge(uRoot,vRoot);blockGraph.setEdge(uRoot,vRoot,Math.max(sepFn(g,v,u),prevMax||0))}u=v})});return blockGraph}
/*
 * Returns the alignment that has the smallest width of the given alignments.
 */function findSmallestWidthAlignment(g,xss){return _.minBy(_.values(xss),function(xs){var max=Number.NEGATIVE_INFINITY;var min=Number.POSITIVE_INFINITY;_.forIn(xs,function(x,v){var halfWidth=width(g,v)/2;max=Math.max(x+halfWidth,max);min=Math.min(x-halfWidth,min)});return max-min})}
/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */function alignCoordinates(xss,alignTo){var alignToVals=_.values(alignTo),alignToMin=_.min(alignToVals),alignToMax=_.max(alignToVals);_.forEach(["u","d"],function(vert){_.forEach(["l","r"],function(horiz){var alignment=vert+horiz,xs=xss[alignment],delta;if(xs===alignTo)return;var xsVals=_.values(xs);delta=horiz==="l"?alignToMin-_.min(xsVals):alignToMax-_.max(xsVals);if(delta){xss[alignment]=_.mapValues(xs,function(x){return x+delta})}})})}function balance(xss,align){return _.mapValues(xss.ul,function(ignore,v){if(align){return xss[align.toLowerCase()][v]}else{var xs=_.sortBy(_.map(xss,v));return(xs[1]+xs[2])/2}})}function positionX(g){var layering=util.buildLayerMatrix(g),conflicts=_.merge(findType1Conflicts(g,layering),findType2Conflicts(g,layering));var xss={},adjustedLayering;_.forEach(["u","d"],function(vert){adjustedLayering=vert==="u"?layering:_.values(layering).reverse();_.forEach(["l","r"],function(horiz){if(horiz==="r"){adjustedLayering=_.map(adjustedLayering,function(inner){return _.values(inner).reverse()})}var neighborFn=(vert==="u"?g.predecessors:g.successors).bind(g);var align=verticalAlignment(g,adjustedLayering,conflicts,neighborFn);var xs=horizontalCompaction(g,adjustedLayering,align.root,align.align,horiz==="r");if(horiz==="r"){xs=_.mapValues(xs,function(x){return-x})}xss[vert+horiz]=xs})});var smallestWidth=findSmallestWidthAlignment(g,xss);alignCoordinates(xss,smallestWidth);return balance(xss,g.graph().align)}function sep(nodeSep,edgeSep,reverseSep){return function(g,v,w){var vLabel=g.node(v),wLabel=g.node(w),sum=0,delta;sum+=vLabel.width/2;if(_.has(vLabel,"labelpos")){switch(vLabel.labelpos.toLowerCase()){case"l":delta=-vLabel.width/2;break;case"r":delta=vLabel.width/2;break}}if(delta){sum+=reverseSep?delta:-delta}delta=0;sum+=(vLabel.dummy?edgeSep:nodeSep)/2;sum+=(wLabel.dummy?edgeSep:nodeSep)/2;sum+=wLabel.width/2;if(_.has(wLabel,"labelpos")){switch(wLabel.labelpos.toLowerCase()){case"l":delta=wLabel.width/2;break;case"r":delta=-wLabel.width/2;break}}if(delta){sum+=reverseSep?delta:-delta}delta=0;return sum}}function width(g,v){return g.node(v).width}},{"../graphlib":7,"../lodash":10,"../util":29}],24:[function(require,module,exports){"use strict";var _=require("../lodash"),util=require("../util"),positionX=require("./bk").positionX;module.exports=position;function position(g){g=util.asNonCompoundGraph(g);positionY(g);_.forEach(positionX(g),function(x,v){g.node(v).x=x})}function positionY(g){var layering=util.buildLayerMatrix(g),rankSep=g.graph().ranksep,prevY=0;_.forEach(layering,function(layer){var maxHeight=_.max(_.map(layer,function(v){return g.node(v).height}));_.forEach(layer,function(v){g.node(v).y=prevY+maxHeight/2});prevY+=maxHeight+rankSep})}},{"../lodash":10,"../util":29,"./bk":23}],25:[function(require,module,exports){"use strict";var _=require("../lodash"),Graph=require("../graphlib").Graph,slack=require("./util").slack;module.exports=feasibleTree;
/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */function feasibleTree(g){var t=new Graph({directed:false});
// Choose arbitrary node from which to start our tree
var start=g.nodes()[0],size=g.nodeCount();t.setNode(start,{});var edge,delta;while(tightTree(t,g)<size){edge=findMinSlackEdge(t,g);delta=t.hasNode(edge.v)?slack(g,edge):-slack(g,edge);shiftRanks(t,g,delta)}return t}
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */function tightTree(t,g){function dfs(v){_.forEach(g.nodeEdges(v),function(e){var edgeV=e.v,w=v===edgeV?e.w:edgeV;if(!t.hasNode(w)&&!slack(g,e)){t.setNode(w,{});t.setEdge(v,w,{});dfs(w)}})}_.forEach(t.nodes(),dfs);return t.nodeCount()}
/*
 * Finds the edge with the smallest slack that is incident on tree and returns
 * it.
 */function findMinSlackEdge(t,g){return _.minBy(g.edges(),function(e){if(t.hasNode(e.v)!==t.hasNode(e.w)){return slack(g,e)}})}function shiftRanks(t,g,delta){_.forEach(t.nodes(),function(v){g.node(v).rank+=delta})}},{"../graphlib":7,"../lodash":10,"./util":28}],26:[function(require,module,exports){"use strict";var rankUtil=require("./util"),longestPath=rankUtil.longestPath,feasibleTree=require("./feasible-tree"),networkSimplex=require("./network-simplex");module.exports=rank;
/*
 * Assigns a rank to each node in the input graph that respects the "minlen"
 * constraint specified on edges between nodes.
 *
 * This basic structure is derived from Gansner, et al., "A Technique for
 * Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a connected DAG
 *    2. Graph nodes must be objects
 *    3. Graph edges must have "weight" and "minlen" attributes
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have a "rank" attribute based on the results of the
 *       algorithm. Ranks can start at any index (including negative), we'll
 *       fix them up later.
 */function rank(g){switch(g.graph().ranker){case"network-simplex":networkSimplexRanker(g);break;case"tight-tree":tightTreeRanker(g);break;case"longest-path":longestPathRanker(g);break;default:networkSimplexRanker(g)}}
// A fast and simple ranker, but results are far from optimal.
var longestPathRanker=longestPath;function tightTreeRanker(g){longestPath(g);feasibleTree(g)}function networkSimplexRanker(g){networkSimplex(g)}},{"./feasible-tree":25,"./network-simplex":27,"./util":28}],27:[function(require,module,exports){"use strict";var _=require("../lodash"),feasibleTree=require("./feasible-tree"),slack=require("./util").slack,initRank=require("./util").longestPath,preorder=require("../graphlib").alg.preorder,postorder=require("../graphlib").alg.postorder,simplify=require("../util").simplify;module.exports=networkSimplex;
// Expose some internals for testing purposes
networkSimplex.initLowLimValues=initLowLimValues;networkSimplex.initCutValues=initCutValues;networkSimplex.calcCutValue=calcCutValue;networkSimplex.leaveEdge=leaveEdge;networkSimplex.enterEdge=enterEdge;networkSimplex.exchangeEdges=exchangeEdges;
/*
 * The network simplex algorithm assigns ranks to each node in the input graph
 * and iteratively improves the ranking to reduce the length of edges.
 *
 * Preconditions:
 *
 *    1. The input graph must be a DAG.
 *    2. All nodes in the graph must have an object value.
 *    3. All edges in the graph must have "minlen" and "weight" attributes.
 *
 * Postconditions:
 *
 *    1. All nodes in the graph will have an assigned "rank" attribute that has
 *       been optimized by the network simplex algorithm. Ranks start at 0.
 *
 *
 * A rough sketch of the algorithm is as follows:
 *
 *    1. Assign initial ranks to each node. We use the longest path algorithm,
 *       which assigns ranks to the lowest position possible. In general this
 *       leads to very wide bottom ranks and unnecessarily long edges.
 *    2. Construct a feasible tight tree. A tight tree is one such that all
 *       edges in the tree have no slack (difference between length of edge
 *       and minlen for the edge). This by itself greatly improves the assigned
 *       rankings by shorting edges.
 *    3. Iteratively find edges that have negative cut values. Generally a
 *       negative cut value indicates that the edge could be removed and a new
 *       tree edge could be added to produce a more compact graph.
 *
 * Much of the algorithms here are derived from Gansner, et al., "A Technique
 * for Drawing Directed Graphs." The structure of the file roughly follows the
 * structure of the overall algorithm.
 */function networkSimplex(g){g=simplify(g);initRank(g);var t=feasibleTree(g);initLowLimValues(t);initCutValues(t,g);var e,f;while(e=leaveEdge(t)){f=enterEdge(t,g,e);exchangeEdges(t,g,e,f)}}
/*
 * Initializes cut values for all edges in the tree.
 */function initCutValues(t,g){var vs=postorder(t,t.nodes());vs=vs.slice(0,vs.length-1);_.forEach(vs,function(v){assignCutValue(t,g,v)})}function assignCutValue(t,g,child){var childLab=t.node(child),parent=childLab.parent;t.edge(child,parent).cutvalue=calcCutValue(t,g,child)}
/*
 * Given the tight tree, its graph, and a child in the graph calculate and
 * return the cut value for the edge between the child and its parent.
 */function calcCutValue(t,g,child){var childLab=t.node(child),parent=childLab.parent,
// True if the child is on the tail end of the edge in the directed graph
childIsTail=true,
// The graph's view of the tree edge we're inspecting
graphEdge=g.edge(child,parent),
// The accumulated cut value for the edge between this node and its parent
cutValue=0;if(!graphEdge){childIsTail=false;graphEdge=g.edge(parent,child)}cutValue=graphEdge.weight;_.forEach(g.nodeEdges(child),function(e){var isOutEdge=e.v===child,other=isOutEdge?e.w:e.v;if(other!==parent){var pointsToHead=isOutEdge===childIsTail,otherWeight=g.edge(e).weight;cutValue+=pointsToHead?otherWeight:-otherWeight;if(isTreeEdge(t,child,other)){var otherCutValue=t.edge(child,other).cutvalue;cutValue+=pointsToHead?-otherCutValue:otherCutValue}}});return cutValue}function initLowLimValues(tree,root){if(arguments.length<2){root=tree.nodes()[0]}dfsAssignLowLim(tree,{},1,root)}function dfsAssignLowLim(tree,visited,nextLim,v,parent){var low=nextLim,label=tree.node(v);visited[v]=true;_.forEach(tree.neighbors(v),function(w){if(!_.has(visited,w)){nextLim=dfsAssignLowLim(tree,visited,nextLim,w,v)}});label.low=low;label.lim=nextLim++;if(parent){label.parent=parent}else{
// TODO should be able to remove this when we incrementally update low lim
delete label.parent}return nextLim}function leaveEdge(tree){return _.find(tree.edges(),function(e){return tree.edge(e).cutvalue<0})}function enterEdge(t,g,edge){var v=edge.v,w=edge.w;
// For the rest of this function we assume that v is the tail and w is the
// head, so if we don't have this edge in the graph we should flip it to
// match the correct orientation.
if(!g.hasEdge(v,w)){v=edge.w;w=edge.v}var vLabel=t.node(v),wLabel=t.node(w),tailLabel=vLabel,flip=false;
// If the root is in the tail of the edge then we need to flip the logic that
// checks for the head and tail nodes in the candidates function below.
if(vLabel.lim>wLabel.lim){tailLabel=wLabel;flip=true}var candidates=_.filter(g.edges(),function(edge){return flip===isDescendant(t,t.node(edge.v),tailLabel)&&flip!==isDescendant(t,t.node(edge.w),tailLabel)});return _.minBy(candidates,function(edge){return slack(g,edge)})}function exchangeEdges(t,g,e,f){var v=e.v,w=e.w;t.removeEdge(v,w);t.setEdge(f.v,f.w,{});initLowLimValues(t);initCutValues(t,g);updateRanks(t,g)}function updateRanks(t,g){var root=_.find(t.nodes(),function(v){return!g.node(v).parent}),vs=preorder(t,root);vs=vs.slice(1);_.forEach(vs,function(v){var parent=t.node(v).parent,edge=g.edge(v,parent),flipped=false;if(!edge){edge=g.edge(parent,v);flipped=true}g.node(v).rank=g.node(parent).rank+(flipped?edge.minlen:-edge.minlen)})}
/*
 * Returns true if the edge is in the tree.
 */function isTreeEdge(tree,u,v){return tree.hasEdge(u,v)}
/*
 * Returns true if the specified node is descendant of the root node per the
 * assigned low and lim attributes in the tree.
 */function isDescendant(tree,vLabel,rootLabel){return rootLabel.low<=vLabel.lim&&vLabel.lim<=rootLabel.lim}},{"../graphlib":7,"../lodash":10,"../util":29,"./feasible-tree":25,"./util":28}],28:[function(require,module,exports){"use strict";var _=require("../lodash");module.exports={longestPath:longestPath,slack:slack};
/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */function longestPath(g){var visited={};function dfs(v){var label=g.node(v);if(_.has(visited,v)){return label.rank}visited[v]=true;var rank=_.min(_.map(g.outEdges(v),function(e){return dfs(e.w)-g.edge(e).minlen}));if(rank===Number.POSITIVE_INFINITY||// return value of _.map([]) for Lodash 3
rank===undefined||// return value of _.map([]) for Lodash 4
rank===null){// return value of _.map([null])
rank=0}return label.rank=rank}_.forEach(g.sources(),dfs)}
/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */function slack(g,e){return g.node(e.w).rank-g.node(e.v).rank-g.edge(e).minlen}},{"../lodash":10}],29:[function(require,module,exports){"use strict";var _=require("./lodash"),Graph=require("./graphlib").Graph;module.exports={addDummyNode:addDummyNode,simplify:simplify,asNonCompoundGraph:asNonCompoundGraph,successorWeights:successorWeights,predecessorWeights:predecessorWeights,intersectRect:intersectRect,buildLayerMatrix:buildLayerMatrix,normalizeRanks:normalizeRanks,removeEmptyRanks:removeEmptyRanks,addBorderNode:addBorderNode,maxRank:maxRank,partition:partition,time:time,notime:notime};
/*
 * Adds a dummy node to the graph and return v.
 */function addDummyNode(g,type,attrs,name){var v;do{v=_.uniqueId(name)}while(g.hasNode(v));attrs.dummy=type;g.setNode(v,attrs);return v}
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */function simplify(g){var simplified=(new Graph).setGraph(g.graph());_.forEach(g.nodes(),function(v){simplified.setNode(v,g.node(v))});_.forEach(g.edges(),function(e){var simpleLabel=simplified.edge(e.v,e.w)||{weight:0,minlen:1},label=g.edge(e);simplified.setEdge(e.v,e.w,{weight:simpleLabel.weight+label.weight,minlen:Math.max(simpleLabel.minlen,label.minlen)})});return simplified}function asNonCompoundGraph(g){var simplified=new Graph({multigraph:g.isMultigraph()}).setGraph(g.graph());_.forEach(g.nodes(),function(v){if(!g.children(v).length){simplified.setNode(v,g.node(v))}});_.forEach(g.edges(),function(e){simplified.setEdge(e,g.edge(e))});return simplified}function successorWeights(g){var weightMap=_.map(g.nodes(),function(v){var sucs={};_.forEach(g.outEdges(v),function(e){sucs[e.w]=(sucs[e.w]||0)+g.edge(e).weight});return sucs});return _.zipObject(g.nodes(),weightMap)}function predecessorWeights(g){var weightMap=_.map(g.nodes(),function(v){var preds={};_.forEach(g.inEdges(v),function(e){preds[e.v]=(preds[e.v]||0)+g.edge(e).weight});return preds});return _.zipObject(g.nodes(),weightMap)}
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */function intersectRect(rect,point){var x=rect.x;var y=rect.y;
// Rectangle intersection algorithm from:
// http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
var dx=point.x-x;var dy=point.y-y;var w=rect.width/2;var h=rect.height/2;if(!dx&&!dy){throw new Error("Not possible to find intersection inside of the rectangle")}var sx,sy;if(Math.abs(dy)*w>Math.abs(dx)*h){
// Intersection is top or bottom of rect.
if(dy<0){h=-h}sx=h*dx/dy;sy=h}else{
// Intersection is left or right of rect.
if(dx<0){w=-w}sx=w;sy=w*dy/dx}return{x:x+sx,y:y+sy}}
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * function will produce a matrix with the ids of each node.
 */function buildLayerMatrix(g){var layering=_.map(_.range(maxRank(g)+1),function(){return[]});_.forEach(g.nodes(),function(v){var node=g.node(v),rank=node.rank;if(!_.isUndefined(rank)){layering[rank][node.order]=v}});return layering}
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */function normalizeRanks(g){var min=_.min(_.map(g.nodes(),function(v){return g.node(v).rank}));_.forEach(g.nodes(),function(v){var node=g.node(v);if(_.has(node,"rank")){node.rank-=min}})}function removeEmptyRanks(g){
// Ranks may not start at 0, so we need to offset them
var offset=_.min(_.map(g.nodes(),function(v){return g.node(v).rank}));var layers=[];_.forEach(g.nodes(),function(v){var rank=g.node(v).rank-offset;if(!layers[rank]){layers[rank]=[]}layers[rank].push(v)});var delta=0,nodeRankFactor=g.graph().nodeRankFactor;_.forEach(layers,function(vs,i){if(_.isUndefined(vs)&&i%nodeRankFactor!==0){--delta}else if(delta){_.forEach(vs,function(v){g.node(v).rank+=delta})}})}function addBorderNode(g,prefix,rank,order){var node={width:0,height:0};if(arguments.length>=4){node.rank=rank;node.order=order}return addDummyNode(g,"border",node,prefix)}function maxRank(g){return _.max(_.map(g.nodes(),function(v){var rank=g.node(v).rank;if(!_.isUndefined(rank)){return rank}}))}
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * function returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */function partition(collection,fn){var result={lhs:[],rhs:[]};_.forEach(collection,function(value){if(fn(value)){result.lhs.push(value)}else{result.rhs.push(value)}});return result}
/*
 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */function time(name,fn){var start=_.now();try{return fn()}finally{console.log(name+" time: "+(_.now()-start)+"ms")}}function notime(name,fn){return fn()}},{"./graphlib":7,"./lodash":10}],30:[function(require,module,exports){module.exports="0.8.4"},{}],31:[function(require,module,exports){
/**
 * Copyright (c) 2014, Chris Pettitt
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var lib=require("./lib");module.exports={Graph:lib.Graph,json:require("./lib/json"),alg:require("./lib/alg"),version:lib.version}},{"./lib":47,"./lib/alg":38,"./lib/json":48}],32:[function(require,module,exports){var _=require("../lodash");module.exports=components;function components(g){var visited={},cmpts=[],cmpt;function dfs(v){if(_.has(visited,v))return;visited[v]=true;cmpt.push(v);_.each(g.successors(v),dfs);_.each(g.predecessors(v),dfs)}_.each(g.nodes(),function(v){cmpt=[];dfs(v);if(cmpt.length){cmpts.push(cmpt)}});return cmpts}},{"../lodash":49}],33:[function(require,module,exports){var _=require("../lodash");module.exports=dfs;
/*
 * A helper that preforms a pre- or post-order traversal on the input graph
 * and returns the nodes in the order they were visited. If the graph is
 * undirected then this algorithm will navigate using neighbors. If the graph
 * is directed then this algorithm will navigate using successors.
 *
 * Order must be one of "pre" or "post".
 */function dfs(g,vs,order){if(!_.isArray(vs)){vs=[vs]}var navigation=(g.isDirected()?g.successors:g.neighbors).bind(g);var acc=[],visited={};_.each(vs,function(v){if(!g.hasNode(v)){throw new Error("Graph does not have node: "+v)}doDfs(g,v,order==="post",visited,navigation,acc)});return acc}function doDfs(g,v,postorder,visited,navigation,acc){if(!_.has(visited,v)){visited[v]=true;if(!postorder){acc.push(v)}_.each(navigation(v),function(w){doDfs(g,w,postorder,visited,navigation,acc)});if(postorder){acc.push(v)}}}},{"../lodash":49}],34:[function(require,module,exports){var dijkstra=require("./dijkstra"),_=require("../lodash");module.exports=dijkstraAll;function dijkstraAll(g,weightFunc,edgeFunc){return _.transform(g.nodes(),function(acc,v){acc[v]=dijkstra(g,v,weightFunc,edgeFunc)},{})}},{"../lodash":49,"./dijkstra":35}],35:[function(require,module,exports){var _=require("../lodash"),PriorityQueue=require("../data/priority-queue");module.exports=dijkstra;var DEFAULT_WEIGHT_FUNC=_.constant(1);function dijkstra(g,source,weightFn,edgeFn){return runDijkstra(g,String(source),weightFn||DEFAULT_WEIGHT_FUNC,edgeFn||function(v){return g.outEdges(v)})}function runDijkstra(g,source,weightFn,edgeFn){var results={},pq=new PriorityQueue,v,vEntry;var updateNeighbors=function(edge){var w=edge.v!==v?edge.v:edge.w,wEntry=results[w],weight=weightFn(edge),distance=vEntry.distance+weight;if(weight<0){throw new Error("dijkstra does not allow negative edge weights. "+"Bad edge: "+edge+" Weight: "+weight)}if(distance<wEntry.distance){wEntry.distance=distance;wEntry.predecessor=v;pq.decrease(w,distance)}};g.nodes().forEach(function(v){var distance=v===source?0:Number.POSITIVE_INFINITY;results[v]={distance:distance};pq.add(v,distance)});while(pq.size()>0){v=pq.removeMin();vEntry=results[v];if(vEntry.distance===Number.POSITIVE_INFINITY){break}edgeFn(v).forEach(updateNeighbors)}return results}},{"../data/priority-queue":45,"../lodash":49}],36:[function(require,module,exports){var _=require("../lodash"),tarjan=require("./tarjan");module.exports=findCycles;function findCycles(g){return _.filter(tarjan(g),function(cmpt){return cmpt.length>1||cmpt.length===1&&g.hasEdge(cmpt[0],cmpt[0])})}},{"../lodash":49,"./tarjan":43}],37:[function(require,module,exports){var _=require("../lodash");module.exports=floydWarshall;var DEFAULT_WEIGHT_FUNC=_.constant(1);function floydWarshall(g,weightFn,edgeFn){return runFloydWarshall(g,weightFn||DEFAULT_WEIGHT_FUNC,edgeFn||function(v){return g.outEdges(v)})}function runFloydWarshall(g,weightFn,edgeFn){var results={},nodes=g.nodes();nodes.forEach(function(v){results[v]={};results[v][v]={distance:0};nodes.forEach(function(w){if(v!==w){results[v][w]={distance:Number.POSITIVE_INFINITY}}});edgeFn(v).forEach(function(edge){var w=edge.v===v?edge.w:edge.v,d=weightFn(edge);results[v][w]={distance:d,predecessor:v}})});nodes.forEach(function(k){var rowK=results[k];nodes.forEach(function(i){var rowI=results[i];nodes.forEach(function(j){var ik=rowI[k];var kj=rowK[j];var ij=rowI[j];var altDistance=ik.distance+kj.distance;if(altDistance<ij.distance){ij.distance=altDistance;ij.predecessor=kj.predecessor}})})});return results}},{"../lodash":49}],38:[function(require,module,exports){module.exports={components:require("./components"),dijkstra:require("./dijkstra"),dijkstraAll:require("./dijkstra-all"),findCycles:require("./find-cycles"),floydWarshall:require("./floyd-warshall"),isAcyclic:require("./is-acyclic"),postorder:require("./postorder"),preorder:require("./preorder"),prim:require("./prim"),tarjan:require("./tarjan"),topsort:require("./topsort")}},{"./components":32,"./dijkstra":35,"./dijkstra-all":34,"./find-cycles":36,"./floyd-warshall":37,"./is-acyclic":39,"./postorder":40,"./preorder":41,"./prim":42,"./tarjan":43,"./topsort":44}],39:[function(require,module,exports){var topsort=require("./topsort");module.exports=isAcyclic;function isAcyclic(g){try{topsort(g)}catch(e){if(e instanceof topsort.CycleException){return false}throw e}return true}},{"./topsort":44}],40:[function(require,module,exports){var dfs=require("./dfs");module.exports=postorder;function postorder(g,vs){return dfs(g,vs,"post")}},{"./dfs":33}],41:[function(require,module,exports){var dfs=require("./dfs");module.exports=preorder;function preorder(g,vs){return dfs(g,vs,"pre")}},{"./dfs":33}],42:[function(require,module,exports){var _=require("../lodash"),Graph=require("../graph"),PriorityQueue=require("../data/priority-queue");module.exports=prim;function prim(g,weightFunc){var result=new Graph,parents={},pq=new PriorityQueue,v;function updateNeighbors(edge){var w=edge.v===v?edge.w:edge.v,pri=pq.priority(w);if(pri!==undefined){var edgeWeight=weightFunc(edge);if(edgeWeight<pri){parents[w]=v;pq.decrease(w,edgeWeight)}}}if(g.nodeCount()===0){return result}_.each(g.nodes(),function(v){pq.add(v,Number.POSITIVE_INFINITY);result.setNode(v)});
// Start from an arbitrary node
pq.decrease(g.nodes()[0],0);var init=false;while(pq.size()>0){v=pq.removeMin();if(_.has(parents,v)){result.setEdge(v,parents[v])}else if(init){throw new Error("Input graph is not connected: "+g)}else{init=true}g.nodeEdges(v).forEach(updateNeighbors)}return result}},{"../data/priority-queue":45,"../graph":46,"../lodash":49}],43:[function(require,module,exports){var _=require("../lodash");module.exports=tarjan;function tarjan(g){var index=0,stack=[],visited={},// node id -> { onStack, lowlink, index }
results=[];function dfs(v){var entry=visited[v]={onStack:true,lowlink:index,index:index++};stack.push(v);g.successors(v).forEach(function(w){if(!_.has(visited,w)){dfs(w);entry.lowlink=Math.min(entry.lowlink,visited[w].lowlink)}else if(visited[w].onStack){entry.lowlink=Math.min(entry.lowlink,visited[w].index)}});if(entry.lowlink===entry.index){var cmpt=[],w;do{w=stack.pop();visited[w].onStack=false;cmpt.push(w)}while(v!==w);results.push(cmpt)}}g.nodes().forEach(function(v){if(!_.has(visited,v)){dfs(v)}});return results}},{"../lodash":49}],44:[function(require,module,exports){var _=require("../lodash");module.exports=topsort;topsort.CycleException=CycleException;function topsort(g){var visited={},stack={},results=[];function visit(node){if(_.has(stack,node)){throw new CycleException}if(!_.has(visited,node)){stack[node]=true;visited[node]=true;_.each(g.predecessors(node),visit);delete stack[node];results.push(node)}}_.each(g.sinks(),visit);if(_.size(visited)!==g.nodeCount()){throw new CycleException}return results}function CycleException(){}CycleException.prototype=new Error;// must be an instance of Error to pass testing
},{"../lodash":49}],45:[function(require,module,exports){var _=require("../lodash");module.exports=PriorityQueue;
/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */function PriorityQueue(){this._arr=[];this._keyIndices={}}
/**
 * Returns the number of elements in the queue. Takes `O(1)` time.
 */PriorityQueue.prototype.size=function(){return this._arr.length};
/**
 * Returns the keys that are in the queue. Takes `O(n)` time.
 */PriorityQueue.prototype.keys=function(){return this._arr.map(function(x){return x.key})};
/**
 * Returns `true` if **key** is in the queue and `false` if not.
 */PriorityQueue.prototype.has=function(key){return _.has(this._keyIndices,key)};
/**
 * Returns the priority for **key**. If **key** is not present in the queue
 * then this function returns `undefined`. Takes `O(1)` time.
 *
 * @param {Object} key
 */PriorityQueue.prototype.priority=function(key){var index=this._keyIndices[key];if(index!==undefined){return this._arr[index].priority}};
/**
 * Returns the key for the minimum element in this queue. If the queue is
 * empty this function throws an Error. Takes `O(1)` time.
 */PriorityQueue.prototype.min=function(){if(this.size()===0){throw new Error("Queue underflow")}return this._arr[0].key};
/**
 * Inserts a new key into the priority queue. If the key already exists in
 * the queue this function returns `false`; otherwise it will return `true`.
 * Takes `O(n)` time.
 *
 * @param {Object} key the key to add
 * @param {Number} priority the initial priority for the key
 */PriorityQueue.prototype.add=function(key,priority){var keyIndices=this._keyIndices;key=String(key);if(!_.has(keyIndices,key)){var arr=this._arr;var index=arr.length;keyIndices[key]=index;arr.push({key:key,priority:priority});this._decrease(index);return true}return false};
/**
 * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
 */PriorityQueue.prototype.removeMin=function(){this._swap(0,this._arr.length-1);var min=this._arr.pop();delete this._keyIndices[min.key];this._heapify(0);return min.key};
/**
 * Decreases the priority for **key** to **priority**. If the new priority is
 * greater than the previous priority, this function will throw an Error.
 *
 * @param {Object} key the key for which to raise priority
 * @param {Number} priority the new priority for the key
 */PriorityQueue.prototype.decrease=function(key,priority){var index=this._keyIndices[key];if(priority>this._arr[index].priority){throw new Error("New priority is greater than current priority. "+"Key: "+key+" Old: "+this._arr[index].priority+" New: "+priority)}this._arr[index].priority=priority;this._decrease(index)};PriorityQueue.prototype._heapify=function(i){var arr=this._arr;var l=2*i,r=l+1,largest=i;if(l<arr.length){largest=arr[l].priority<arr[largest].priority?l:largest;if(r<arr.length){largest=arr[r].priority<arr[largest].priority?r:largest}if(largest!==i){this._swap(i,largest);this._heapify(largest)}}};PriorityQueue.prototype._decrease=function(index){var arr=this._arr;var priority=arr[index].priority;var parent;while(index!==0){parent=index>>1;if(arr[parent].priority<priority){break}this._swap(index,parent);index=parent}};PriorityQueue.prototype._swap=function(i,j){var arr=this._arr;var keyIndices=this._keyIndices;var origArrI=arr[i];var origArrJ=arr[j];arr[i]=origArrJ;arr[j]=origArrI;keyIndices[origArrJ.key]=i;keyIndices[origArrI.key]=j}},{"../lodash":49}],46:[function(require,module,exports){"use strict";var _=require("./lodash");module.exports=Graph;var DEFAULT_EDGE_NAME="\0",GRAPH_NODE="\0",EDGE_KEY_DELIM="";
// Implementation notes:
//
//  * Node id query functions should return string ids for the nodes
//  * Edge id query functions should return an "edgeObj", edge object, that is
//    composed of enough information to uniquely identify an edge: {v, w, name}.
//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
//    reference edges. This is because we need a performant way to look these
//    edges up and, object properties, which have string keys, are the closest
//    we're going to get to a performant hashtable in JavaScript.
function Graph(opts){this._isDirected=_.has(opts,"directed")?opts.directed:true;this._isMultigraph=_.has(opts,"multigraph")?opts.multigraph:false;this._isCompound=_.has(opts,"compound")?opts.compound:false;
// Label for the graph itself
this._label=undefined;
// Defaults to be set when creating a new node
this._defaultNodeLabelFn=_.constant(undefined);
// Defaults to be set when creating a new edge
this._defaultEdgeLabelFn=_.constant(undefined);
// v -> label
this._nodes={};if(this._isCompound){
// v -> parent
this._parent={};
// v -> children
this._children={};this._children[GRAPH_NODE]={}}
// v -> edgeObj
this._in={};
// u -> v -> Number
this._preds={};
// v -> edgeObj
this._out={};
// v -> w -> Number
this._sucs={};
// e -> edgeObj
this._edgeObjs={};
// e -> label
this._edgeLabels={}}
/* Number of nodes in the graph. Should only be changed by the implementation. */Graph.prototype._nodeCount=0;
/* Number of edges in the graph. Should only be changed by the implementation. */Graph.prototype._edgeCount=0;
/* === Graph functions ========= */Graph.prototype.isDirected=function(){return this._isDirected};Graph.prototype.isMultigraph=function(){return this._isMultigraph};Graph.prototype.isCompound=function(){return this._isCompound};Graph.prototype.setGraph=function(label){this._label=label;return this};Graph.prototype.graph=function(){return this._label};
/* === Node functions ========== */Graph.prototype.setDefaultNodeLabel=function(newDefault){if(!_.isFunction(newDefault)){newDefault=_.constant(newDefault)}this._defaultNodeLabelFn=newDefault;return this};Graph.prototype.nodeCount=function(){return this._nodeCount};Graph.prototype.nodes=function(){return _.keys(this._nodes)};Graph.prototype.sources=function(){var self=this;return _.filter(this.nodes(),function(v){return _.isEmpty(self._in[v])})};Graph.prototype.sinks=function(){var self=this;return _.filter(this.nodes(),function(v){return _.isEmpty(self._out[v])})};Graph.prototype.setNodes=function(vs,value){var args=arguments;var self=this;_.each(vs,function(v){if(args.length>1){self.setNode(v,value)}else{self.setNode(v)}});return this};Graph.prototype.setNode=function(v,value){if(_.has(this._nodes,v)){if(arguments.length>1){this._nodes[v]=value}return this}this._nodes[v]=arguments.length>1?value:this._defaultNodeLabelFn(v);if(this._isCompound){this._parent[v]=GRAPH_NODE;this._children[v]={};this._children[GRAPH_NODE][v]=true}this._in[v]={};this._preds[v]={};this._out[v]={};this._sucs[v]={};++this._nodeCount;return this};Graph.prototype.node=function(v){return this._nodes[v]};Graph.prototype.hasNode=function(v){return _.has(this._nodes,v)};Graph.prototype.removeNode=function(v){var self=this;if(_.has(this._nodes,v)){var removeEdge=function(e){self.removeEdge(self._edgeObjs[e])};delete this._nodes[v];if(this._isCompound){this._removeFromParentsChildList(v);delete this._parent[v];_.each(this.children(v),function(child){self.setParent(child)});delete this._children[v]}_.each(_.keys(this._in[v]),removeEdge);delete this._in[v];delete this._preds[v];_.each(_.keys(this._out[v]),removeEdge);delete this._out[v];delete this._sucs[v];--this._nodeCount}return this};Graph.prototype.setParent=function(v,parent){if(!this._isCompound){throw new Error("Cannot set parent in a non-compound graph")}if(_.isUndefined(parent)){parent=GRAPH_NODE}else{
// Coerce parent to string
parent+="";for(var ancestor=parent;!_.isUndefined(ancestor);ancestor=this.parent(ancestor)){if(ancestor===v){throw new Error("Setting "+parent+" as parent of "+v+" would create a cycle")}}this.setNode(parent)}this.setNode(v);this._removeFromParentsChildList(v);this._parent[v]=parent;this._children[parent][v]=true;return this};Graph.prototype._removeFromParentsChildList=function(v){delete this._children[this._parent[v]][v]};Graph.prototype.parent=function(v){if(this._isCompound){var parent=this._parent[v];if(parent!==GRAPH_NODE){return parent}}};Graph.prototype.children=function(v){if(_.isUndefined(v)){v=GRAPH_NODE}if(this._isCompound){var children=this._children[v];if(children){return _.keys(children)}}else if(v===GRAPH_NODE){return this.nodes()}else if(this.hasNode(v)){return[]}};Graph.prototype.predecessors=function(v){var predsV=this._preds[v];if(predsV){return _.keys(predsV)}};Graph.prototype.successors=function(v){var sucsV=this._sucs[v];if(sucsV){return _.keys(sucsV)}};Graph.prototype.neighbors=function(v){var preds=this.predecessors(v);if(preds){return _.union(preds,this.successors(v))}};Graph.prototype.isLeaf=function(v){var neighbors;if(this.isDirected()){neighbors=this.successors(v)}else{neighbors=this.neighbors(v)}return neighbors.length===0};Graph.prototype.filterNodes=function(filter){var copy=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});copy.setGraph(this.graph());var self=this;_.each(this._nodes,function(value,v){if(filter(v)){copy.setNode(v,value)}});_.each(this._edgeObjs,function(e){if(copy.hasNode(e.v)&&copy.hasNode(e.w)){copy.setEdge(e,self.edge(e))}});var parents={};function findParent(v){var parent=self.parent(v);if(parent===undefined||copy.hasNode(parent)){parents[v]=parent;return parent}else if(parent in parents){return parents[parent]}else{return findParent(parent)}}if(this._isCompound){_.each(copy.nodes(),function(v){copy.setParent(v,findParent(v))})}return copy};
/* === Edge functions ========== */Graph.prototype.setDefaultEdgeLabel=function(newDefault){if(!_.isFunction(newDefault)){newDefault=_.constant(newDefault)}this._defaultEdgeLabelFn=newDefault;return this};Graph.prototype.edgeCount=function(){return this._edgeCount};Graph.prototype.edges=function(){return _.values(this._edgeObjs)};Graph.prototype.setPath=function(vs,value){var self=this,args=arguments;_.reduce(vs,function(v,w){if(args.length>1){self.setEdge(v,w,value)}else{self.setEdge(v,w)}return w});return this};
/*
 * setEdge(v, w, [value, [name]])
 * setEdge({ v, w, [name] }, [value])
 */Graph.prototype.setEdge=function(){var v,w,name,value,valueSpecified=false,arg0=arguments[0];if(typeof arg0==="object"&&arg0!==null&&"v"in arg0){v=arg0.v;w=arg0.w;name=arg0.name;if(arguments.length===2){value=arguments[1];valueSpecified=true}}else{v=arg0;w=arguments[1];name=arguments[3];if(arguments.length>2){value=arguments[2];valueSpecified=true}}v=""+v;w=""+w;if(!_.isUndefined(name)){name=""+name}var e=edgeArgsToId(this._isDirected,v,w,name);if(_.has(this._edgeLabels,e)){if(valueSpecified){this._edgeLabels[e]=value}return this}if(!_.isUndefined(name)&&!this._isMultigraph){throw new Error("Cannot set a named edge when isMultigraph = false")}
// It didn't exist, so we need to create it.
// First ensure the nodes exist.
this.setNode(v);this.setNode(w);this._edgeLabels[e]=valueSpecified?value:this._defaultEdgeLabelFn(v,w,name);var edgeObj=edgeArgsToObj(this._isDirected,v,w,name);
// Ensure we add undirected edges in a consistent way.
v=edgeObj.v;w=edgeObj.w;Object.freeze(edgeObj);this._edgeObjs[e]=edgeObj;incrementOrInitEntry(this._preds[w],v);incrementOrInitEntry(this._sucs[v],w);this._in[w][e]=edgeObj;this._out[v][e]=edgeObj;this._edgeCount++;return this};Graph.prototype.edge=function(v,w,name){var e=arguments.length===1?edgeObjToId(this._isDirected,arguments[0]):edgeArgsToId(this._isDirected,v,w,name);return this._edgeLabels[e]};Graph.prototype.hasEdge=function(v,w,name){var e=arguments.length===1?edgeObjToId(this._isDirected,arguments[0]):edgeArgsToId(this._isDirected,v,w,name);return _.has(this._edgeLabels,e)};Graph.prototype.removeEdge=function(v,w,name){var e=arguments.length===1?edgeObjToId(this._isDirected,arguments[0]):edgeArgsToId(this._isDirected,v,w,name),edge=this._edgeObjs[e];if(edge){v=edge.v;w=edge.w;delete this._edgeLabels[e];delete this._edgeObjs[e];decrementOrRemoveEntry(this._preds[w],v);decrementOrRemoveEntry(this._sucs[v],w);delete this._in[w][e];delete this._out[v][e];this._edgeCount--}return this};Graph.prototype.inEdges=function(v,u){var inV=this._in[v];if(inV){var edges=_.values(inV);if(!u){return edges}return _.filter(edges,function(edge){return edge.v===u})}};Graph.prototype.outEdges=function(v,w){var outV=this._out[v];if(outV){var edges=_.values(outV);if(!w){return edges}return _.filter(edges,function(edge){return edge.w===w})}};Graph.prototype.nodeEdges=function(v,w){var inEdges=this.inEdges(v,w);if(inEdges){return inEdges.concat(this.outEdges(v,w))}};function incrementOrInitEntry(map,k){if(map[k]){map[k]++}else{map[k]=1}}function decrementOrRemoveEntry(map,k){if(!--map[k]){delete map[k]}}function edgeArgsToId(isDirected,v_,w_,name){var v=""+v_;var w=""+w_;if(!isDirected&&v>w){var tmp=v;v=w;w=tmp}return v+EDGE_KEY_DELIM+w+EDGE_KEY_DELIM+(_.isUndefined(name)?DEFAULT_EDGE_NAME:name)}function edgeArgsToObj(isDirected,v_,w_,name){var v=""+v_;var w=""+w_;if(!isDirected&&v>w){var tmp=v;v=w;w=tmp}var edgeObj={v:v,w:w};if(name){edgeObj.name=name}return edgeObj}function edgeObjToId(isDirected,edgeObj){return edgeArgsToId(isDirected,edgeObj.v,edgeObj.w,edgeObj.name)}},{"./lodash":49}],47:[function(require,module,exports){
// Includes only the "core" of graphlib
module.exports={Graph:require("./graph"),version:require("./version")}},{"./graph":46,"./version":50}],48:[function(require,module,exports){var _=require("./lodash"),Graph=require("./graph");module.exports={write:write,read:read};function write(g){var json={options:{directed:g.isDirected(),multigraph:g.isMultigraph(),compound:g.isCompound()},nodes:writeNodes(g),edges:writeEdges(g)};if(!_.isUndefined(g.graph())){json.value=_.clone(g.graph())}return json}function writeNodes(g){return _.map(g.nodes(),function(v){var nodeValue=g.node(v),parent=g.parent(v),node={v:v};if(!_.isUndefined(nodeValue)){node.value=nodeValue}if(!_.isUndefined(parent)){node.parent=parent}return node})}function writeEdges(g){return _.map(g.edges(),function(e){var edgeValue=g.edge(e),edge={v:e.v,w:e.w};if(!_.isUndefined(e.name)){edge.name=e.name}if(!_.isUndefined(edgeValue)){edge.value=edgeValue}return edge})}function read(json){var g=new Graph(json.options).setGraph(json.value);_.each(json.nodes,function(entry){g.setNode(entry.v,entry.value);if(entry.parent){g.setParent(entry.v,entry.parent)}});_.each(json.edges,function(entry){g.setEdge({v:entry.v,w:entry.w,name:entry.name},entry.value)});return g}},{"./graph":46,"./lodash":49}],49:[function(require,module,exports){
/* global window */
var lodash;if(typeof require==="function"){try{lodash={clone:require("lodash/clone"),constant:require("lodash/constant"),each:require("lodash/each"),filter:require("lodash/filter"),has:require("lodash/has"),isArray:require("lodash/isArray"),isEmpty:require("lodash/isEmpty"),isFunction:require("lodash/isFunction"),isUndefined:require("lodash/isUndefined"),keys:require("lodash/keys"),map:require("lodash/map"),reduce:require("lodash/reduce"),size:require("lodash/size"),transform:require("lodash/transform"),union:require("lodash/union"),values:require("lodash/values")}}catch(e){}}if(!lodash){lodash=window._}module.exports=lodash},{"lodash/clone":226,"lodash/constant":228,"lodash/each":230,"lodash/filter":232,"lodash/has":239,"lodash/isArray":243,"lodash/isEmpty":247,"lodash/isFunction":248,"lodash/isUndefined":258,"lodash/keys":259,"lodash/map":262,"lodash/reduce":274,"lodash/size":275,"lodash/transform":284,"lodash/union":285,"lodash/values":287}],50:[function(require,module,exports){module.exports="2.1.7"},{}],51:[function(require,module,exports){var getNative=require("./_getNative"),root=require("./_root");
/* Built-in method references that are verified to be native. */var DataView=getNative(root,"DataView");module.exports=DataView},{"./_getNative":163,"./_root":208}],52:[function(require,module,exports){var hashClear=require("./_hashClear"),hashDelete=require("./_hashDelete"),hashGet=require("./_hashGet"),hashHas=require("./_hashHas"),hashSet=require("./_hashSet");
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Hash(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1])}}
// Add methods to `Hash`.
Hash.prototype.clear=hashClear;Hash.prototype["delete"]=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;module.exports=Hash},{"./_hashClear":172,"./_hashDelete":173,"./_hashGet":174,"./_hashHas":175,"./_hashSet":176}],53:[function(require,module,exports){var listCacheClear=require("./_listCacheClear"),listCacheDelete=require("./_listCacheDelete"),listCacheGet=require("./_listCacheGet"),listCacheHas=require("./_listCacheHas"),listCacheSet=require("./_listCacheSet");
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function ListCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1])}}
// Add methods to `ListCache`.
ListCache.prototype.clear=listCacheClear;ListCache.prototype["delete"]=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;module.exports=ListCache},{"./_listCacheClear":188,"./_listCacheDelete":189,"./_listCacheGet":190,"./_listCacheHas":191,"./_listCacheSet":192}],54:[function(require,module,exports){var getNative=require("./_getNative"),root=require("./_root");
/* Built-in method references that are verified to be native. */var Map=getNative(root,"Map");module.exports=Map},{"./_getNative":163,"./_root":208}],55:[function(require,module,exports){var mapCacheClear=require("./_mapCacheClear"),mapCacheDelete=require("./_mapCacheDelete"),mapCacheGet=require("./_mapCacheGet"),mapCacheHas=require("./_mapCacheHas"),mapCacheSet=require("./_mapCacheSet");
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function MapCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1])}}
// Add methods to `MapCache`.
MapCache.prototype.clear=mapCacheClear;MapCache.prototype["delete"]=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;module.exports=MapCache},{"./_mapCacheClear":193,"./_mapCacheDelete":194,"./_mapCacheGet":195,"./_mapCacheHas":196,"./_mapCacheSet":197}],56:[function(require,module,exports){var getNative=require("./_getNative"),root=require("./_root");
/* Built-in method references that are verified to be native. */var Promise=getNative(root,"Promise");module.exports=Promise},{"./_getNative":163,"./_root":208}],57:[function(require,module,exports){var getNative=require("./_getNative"),root=require("./_root");
/* Built-in method references that are verified to be native. */var Set=getNative(root,"Set");module.exports=Set},{"./_getNative":163,"./_root":208}],58:[function(require,module,exports){var MapCache=require("./_MapCache"),setCacheAdd=require("./_setCacheAdd"),setCacheHas=require("./_setCacheHas");
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */function SetCache(values){var index=-1,length=values==null?0:values.length;this.__data__=new MapCache;while(++index<length){this.add(values[index])}}
// Add methods to `SetCache`.
SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;SetCache.prototype.has=setCacheHas;module.exports=SetCache},{"./_MapCache":55,"./_setCacheAdd":210,"./_setCacheHas":211}],59:[function(require,module,exports){var ListCache=require("./_ListCache"),stackClear=require("./_stackClear"),stackDelete=require("./_stackDelete"),stackGet=require("./_stackGet"),stackHas=require("./_stackHas"),stackSet=require("./_stackSet");
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Stack(entries){var data=this.__data__=new ListCache(entries);this.size=data.size}
// Add methods to `Stack`.
Stack.prototype.clear=stackClear;Stack.prototype["delete"]=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;module.exports=Stack},{"./_ListCache":53,"./_stackClear":215,"./_stackDelete":216,"./_stackGet":217,"./_stackHas":218,"./_stackSet":219}],60:[function(require,module,exports){var root=require("./_root");
/** Built-in value references. */var Symbol=root.Symbol;module.exports=Symbol},{"./_root":208}],61:[function(require,module,exports){var root=require("./_root");
/** Built-in value references. */var Uint8Array=root.Uint8Array;module.exports=Uint8Array},{"./_root":208}],62:[function(require,module,exports){var getNative=require("./_getNative"),root=require("./_root");
/* Built-in method references that are verified to be native. */var WeakMap=getNative(root,"WeakMap");module.exports=WeakMap},{"./_getNative":163,"./_root":208}],63:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func,thisArg,args){switch(args.length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2])}return func.apply(thisArg,args)}module.exports=apply},{}],64:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array,iteratee){var index=-1,length=array==null?0:array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break}}return array}module.exports=arrayEach},{}],65:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array,predicate){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[resIndex++]=value}}return result}module.exports=arrayFilter},{}],66:[function(require,module,exports){var baseIndexOf=require("./_baseIndexOf");
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */function arrayIncludes(array,value){var length=array==null?0:array.length;return!!length&&baseIndexOf(array,value,0)>-1}module.exports=arrayIncludes},{"./_baseIndexOf":95}],67:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array,value,comparator){var index=-1,length=array==null?0:array.length;while(++index<length){if(comparator(value,array[index])){return true}}return false}module.exports=arrayIncludesWith},{}],68:[function(require,module,exports){var baseTimes=require("./_baseTimes"),isArguments=require("./isArguments"),isArray=require("./isArray"),isBuffer=require("./isBuffer"),isIndex=require("./_isIndex"),isTypedArray=require("./isTypedArray");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */function arrayLikeKeys(value,inherited){var isArr=isArray(value),isArg=!isArr&&isArguments(value),isBuff=!isArr&&!isArg&&isBuffer(value),isType=!isArr&&!isArg&&!isBuff&&isTypedArray(value),skipIndexes=isArr||isArg||isBuff||isType,result=skipIndexes?baseTimes(value.length,String):[],length=result.length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(
// Safari 9 has enumerable `arguments.length` in strict mode.
key=="length"||
// Node.js 0.10 has enumerable non-index properties on buffers.
isBuff&&(key=="offset"||key=="parent")||
// PhantomJS 2 has enumerable non-index properties on typed arrays.
isType&&(key=="buffer"||key=="byteLength"||key=="byteOffset")||
// Skip index properties.
isIndex(key,length)))){result.push(key)}}return result}module.exports=arrayLikeKeys},{"./_baseTimes":125,"./_isIndex":181,"./isArguments":242,"./isArray":243,"./isBuffer":246,"./isTypedArray":257}],69:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array)}return result}module.exports=arrayMap},{}],70:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index]}return array}module.exports=arrayPush},{}],71:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array==null?0:array.length;if(initAccum&&length){accumulator=array[++index]}while(++index<length){accumulator=iteratee(accumulator,array[index],index,array)}return accumulator}module.exports=arrayReduce},{}],72:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(predicate(array[index],index,array)){return true}}return false}module.exports=arraySome},{}],73:[function(require,module,exports){var baseProperty=require("./_baseProperty");
/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */var asciiSize=baseProperty("length");module.exports=asciiSize},{"./_baseProperty":117}],74:[function(require,module,exports){var baseAssignValue=require("./_baseAssignValue"),eq=require("./eq");
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function assignMergeValue(object,key,value){if(value!==undefined&&!eq(object[key],value)||value===undefined&&!(key in object)){baseAssignValue(object,key,value)}}module.exports=assignMergeValue},{"./_baseAssignValue":79,"./eq":231}],75:[function(require,module,exports){var baseAssignValue=require("./_baseAssignValue"),eq=require("./eq");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||value===undefined&&!(key in object)){baseAssignValue(object,key,value)}}module.exports=assignValue},{"./_baseAssignValue":79,"./eq":231}],76:[function(require,module,exports){var eq=require("./eq");
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length}}return-1}module.exports=assocIndexOf},{"./eq":231}],77:[function(require,module,exports){var copyObject=require("./_copyObject"),keys=require("./keys");
/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */function baseAssign(object,source){return object&&copyObject(source,keys(source),object)}module.exports=baseAssign},{"./_copyObject":143,"./keys":259}],78:[function(require,module,exports){var copyObject=require("./_copyObject"),keysIn=require("./keysIn");
/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */function baseAssignIn(object,source){return object&&copyObject(source,keysIn(source),object)}module.exports=baseAssignIn},{"./_copyObject":143,"./keysIn":260}],79:[function(require,module,exports){var defineProperty=require("./_defineProperty");
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function baseAssignValue(object,key,value){if(key=="__proto__"&&defineProperty){defineProperty(object,key,{configurable:true,enumerable:true,value:value,writable:true})}else{object[key]=value}}module.exports=baseAssignValue},{"./_defineProperty":153}],80:[function(require,module,exports){var Stack=require("./_Stack"),arrayEach=require("./_arrayEach"),assignValue=require("./_assignValue"),baseAssign=require("./_baseAssign"),baseAssignIn=require("./_baseAssignIn"),cloneBuffer=require("./_cloneBuffer"),copyArray=require("./_copyArray"),copySymbols=require("./_copySymbols"),copySymbolsIn=require("./_copySymbolsIn"),getAllKeys=require("./_getAllKeys"),getAllKeysIn=require("./_getAllKeysIn"),getTag=require("./_getTag"),initCloneArray=require("./_initCloneArray"),initCloneByTag=require("./_initCloneByTag"),initCloneObject=require("./_initCloneObject"),isArray=require("./isArray"),isBuffer=require("./isBuffer"),isMap=require("./isMap"),isObject=require("./isObject"),isSet=require("./isSet"),keys=require("./keys");
/** Used to compose bitmasks for cloning. */var CLONE_DEEP_FLAG=1,CLONE_FLAT_FLAG=2,CLONE_SYMBOLS_FLAG=4;
/** `Object#toString` result references. */var argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",genTag="[object GeneratorFunction]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",weakMapTag="[object WeakMap]";var arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]";
/** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false;
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */function baseClone(value,bitmask,customizer,key,object,stack){var result,isDeep=bitmask&CLONE_DEEP_FLAG,isFlat=bitmask&CLONE_FLAT_FLAG,isFull=bitmask&CLONE_SYMBOLS_FLAG;if(customizer){result=object?customizer(value,key,object,stack):customizer(value)}if(result!==undefined){return result}if(!isObject(value)){return value}var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result)}}else{var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(isBuffer(value)){return cloneBuffer(value,isDeep)}if(tag==objectTag||tag==argsTag||isFunc&&!object){result=isFlat||isFunc?{}:initCloneObject(value);if(!isDeep){return isFlat?copySymbolsIn(value,baseAssignIn(result,value)):copySymbols(value,baseAssign(result,value))}}else{if(!cloneableTags[tag]){return object?value:{}}result=initCloneByTag(value,tag,isDeep)}}
// Check for circular references and return its corresponding clone.
stack||(stack=new Stack);var stacked=stack.get(value);if(stacked){return stacked}stack.set(value,result);if(isSet(value)){value.forEach(function(subValue){result.add(baseClone(subValue,bitmask,customizer,subValue,value,stack))});return result}if(isMap(value)){value.forEach(function(subValue,key){result.set(key,baseClone(subValue,bitmask,customizer,key,value,stack))});return result}var keysFunc=isFull?isFlat?getAllKeysIn:getAllKeys:isFlat?keysIn:keys;var props=isArr?undefined:keysFunc(value);arrayEach(props||value,function(subValue,key){if(props){key=subValue;subValue=value[key]}
// Recursively populate clone (susceptible to call stack limits).
assignValue(result,key,baseClone(subValue,bitmask,customizer,key,value,stack))});return result}module.exports=baseClone},{"./_Stack":59,"./_arrayEach":64,"./_assignValue":75,"./_baseAssign":77,"./_baseAssignIn":78,"./_cloneBuffer":135,"./_copyArray":142,"./_copySymbols":144,"./_copySymbolsIn":145,"./_getAllKeys":159,"./_getAllKeysIn":160,"./_getTag":168,"./_initCloneArray":177,"./_initCloneByTag":178,"./_initCloneObject":179,"./isArray":243,"./isBuffer":246,"./isMap":250,"./isObject":251,"./isSet":254,"./keys":259}],81:[function(require,module,exports){var isObject=require("./isObject");
/** Built-in value references. */var objectCreate=Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */var baseCreate=function(){function object(){}return function(proto){if(!isObject(proto)){return{}}if(objectCreate){return objectCreate(proto)}object.prototype=proto;var result=new object;object.prototype=undefined;return result}}();module.exports=baseCreate},{"./isObject":251}],82:[function(require,module,exports){var baseForOwn=require("./_baseForOwn"),createBaseEach=require("./_createBaseEach");
/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */var baseEach=createBaseEach(baseForOwn);module.exports=baseEach},{"./_baseForOwn":88,"./_createBaseEach":148}],83:[function(require,module,exports){var isSymbol=require("./isSymbol");
/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */function baseExtremum(array,iteratee,comparator){var index=-1,length=array.length;while(++index<length){var value=array[index],current=iteratee(value);if(current!=null&&(computed===undefined?current===current&&!isSymbol(current):comparator(current,computed))){var computed=current,result=value}}return result}module.exports=baseExtremum},{"./isSymbol":256}],84:[function(require,module,exports){var baseEach=require("./_baseEach");
/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value)}});return result}module.exports=baseFilter},{"./_baseEach":82}],85:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array,predicate,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?1:-1);while(fromRight?index--:++index<length){if(predicate(array[index],index,array)){return index}}return-1}module.exports=baseFindIndex},{}],86:[function(require,module,exports){var arrayPush=require("./_arrayPush"),isFlattenable=require("./_isFlattenable");
/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */function baseFlatten(array,depth,predicate,isStrict,result){var index=-1,length=array.length;predicate||(predicate=isFlattenable);result||(result=[]);while(++index<length){var value=array[index];if(depth>0&&predicate(value)){if(depth>1){
// Recursively flatten arrays (susceptible to call stack limits).
baseFlatten(value,depth-1,predicate,isStrict,result)}else{arrayPush(result,value)}}else if(!isStrict){result[result.length]=value}}return result}module.exports=baseFlatten},{"./_arrayPush":70,"./_isFlattenable":180}],87:[function(require,module,exports){var createBaseFor=require("./_createBaseFor");
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */var baseFor=createBaseFor();module.exports=baseFor},{"./_createBaseFor":149}],88:[function(require,module,exports){var baseFor=require("./_baseFor"),keys=require("./keys");
/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */function baseForOwn(object,iteratee){return object&&baseFor(object,iteratee,keys)}module.exports=baseForOwn},{"./_baseFor":87,"./keys":259}],89:[function(require,module,exports){var castPath=require("./_castPath"),toKey=require("./_toKey");
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */function baseGet(object,path){path=castPath(path,object);var index=0,length=path.length;while(object!=null&&index<length){object=object[toKey(path[index++])]}return index&&index==length?object:undefined}module.exports=baseGet},{"./_castPath":133,"./_toKey":223}],90:[function(require,module,exports){var arrayPush=require("./_arrayPush"),isArray=require("./isArray");
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object))}module.exports=baseGetAllKeys},{"./_arrayPush":70,"./isArray":243}],91:[function(require,module,exports){var Symbol=require("./_Symbol"),getRawTag=require("./_getRawTag"),objectToString=require("./_objectToString");
/** `Object#toString` result references. */var nullTag="[object Null]",undefinedTag="[object Undefined]";
/** Built-in value references. */var symToStringTag=Symbol?Symbol.toStringTag:undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag}return symToStringTag&&symToStringTag in Object(value)?getRawTag(value):objectToString(value)}module.exports=baseGetTag},{"./_Symbol":60,"./_getRawTag":165,"./_objectToString":205}],92:[function(require,module,exports){
/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt(value,other){return value>other}module.exports=baseGt},{}],93:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */function baseHas(object,key){return object!=null&&hasOwnProperty.call(object,key)}module.exports=baseHas},{}],94:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object,key){return object!=null&&key in Object(object)}module.exports=baseHasIn},{}],95:[function(require,module,exports){var baseFindIndex=require("./_baseFindIndex"),baseIsNaN=require("./_baseIsNaN"),strictIndexOf=require("./_strictIndexOf");
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function baseIndexOf(array,value,fromIndex){return value===value?strictIndexOf(array,value,fromIndex):baseFindIndex(array,baseIsNaN,fromIndex)}module.exports=baseIndexOf},{"./_baseFindIndex":85,"./_baseIsNaN":101,"./_strictIndexOf":220}],96:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var argsTag="[object Arguments]";
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */function baseIsArguments(value){return isObjectLike(value)&&baseGetTag(value)==argsTag}module.exports=baseIsArguments},{"./_baseGetTag":91,"./isObjectLike":252}],97:[function(require,module,exports){var baseIsEqualDeep=require("./_baseIsEqualDeep"),isObjectLike=require("./isObjectLike");
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */function baseIsEqual(value,other,bitmask,customizer,stack){if(value===other){return true}if(value==null||other==null||!isObjectLike(value)&&!isObjectLike(other)){return value!==value&&other!==other}return baseIsEqualDeep(value,other,bitmask,customizer,baseIsEqual,stack)}module.exports=baseIsEqual},{"./_baseIsEqualDeep":98,"./isObjectLike":252}],98:[function(require,module,exports){var Stack=require("./_Stack"),equalArrays=require("./_equalArrays"),equalByTag=require("./_equalByTag"),equalObjects=require("./_equalObjects"),getTag=require("./_getTag"),isArray=require("./isArray"),isBuffer=require("./isBuffer"),isTypedArray=require("./isTypedArray");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1;
/** `Object#toString` result references. */var argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]";
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function baseIsEqualDeep(object,other,bitmask,customizer,equalFunc,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=objIsArr?arrayTag:getTag(object),othTag=othIsArr?arrayTag:getTag(other);objTag=objTag==argsTag?objectTag:objTag;othTag=othTag==argsTag?objectTag:othTag;var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&isBuffer(object)){if(!isBuffer(other)){return false}objIsArr=true;objIsObj=false}if(isSameTag&&!objIsObj){stack||(stack=new Stack);return objIsArr||isTypedArray(object)?equalArrays(object,other,bitmask,customizer,equalFunc,stack):equalByTag(object,other,objTag,bitmask,customizer,equalFunc,stack)}if(!(bitmask&COMPARE_PARTIAL_FLAG)){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,"__wrapped__"),othIsWrapped=othIsObj&&hasOwnProperty.call(other,"__wrapped__");if(objIsWrapped||othIsWrapped){var objUnwrapped=objIsWrapped?object.value():object,othUnwrapped=othIsWrapped?other.value():other;stack||(stack=new Stack);return equalFunc(objUnwrapped,othUnwrapped,bitmask,customizer,stack)}}if(!isSameTag){return false}stack||(stack=new Stack);return equalObjects(object,other,bitmask,customizer,equalFunc,stack)}module.exports=baseIsEqualDeep},{"./_Stack":59,"./_equalArrays":154,"./_equalByTag":155,"./_equalObjects":156,"./_getTag":168,"./isArray":243,"./isBuffer":246,"./isTypedArray":257}],99:[function(require,module,exports){var getTag=require("./_getTag"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var mapTag="[object Map]";
/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */function baseIsMap(value){return isObjectLike(value)&&getTag(value)==mapTag}module.exports=baseIsMap},{"./_getTag":168,"./isObjectLike":252}],100:[function(require,module,exports){var Stack=require("./_Stack"),baseIsEqual=require("./_baseIsEqual");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length}object=Object(object);while(index--){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object)){return false}}while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false}}else{var stack=new Stack;if(customizer){var result=customizer(objValue,srcValue,key,object,source,stack)}if(!(result===undefined?baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG,customizer,stack):result)){return false}}}return true}module.exports=baseIsMatch},{"./_Stack":59,"./_baseIsEqual":97}],101:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value){return value!==value}module.exports=baseIsNaN},{}],102:[function(require,module,exports){var isFunction=require("./isFunction"),isMasked=require("./_isMasked"),isObject=require("./isObject"),toSource=require("./_toSource");
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */var reIsHostCtor=/^\[object .+?Constructor\]$/;
/** Used for built-in method references. */var funcProto=Function.prototype,objectProto=Object.prototype;
/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/** Used to detect if a method is native. */var reIsNative=RegExp("^"+funcToString.call(hasOwnProperty).replace(reRegExpChar,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false}var pattern=isFunction(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value))}module.exports=baseIsNative},{"./_isMasked":185,"./_toSource":224,"./isFunction":248,"./isObject":251}],103:[function(require,module,exports){var getTag=require("./_getTag"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var setTag="[object Set]";
/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */function baseIsSet(value){return isObjectLike(value)&&getTag(value)==setTag}module.exports=baseIsSet},{"./_getTag":168,"./isObjectLike":252}],104:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),isLength=require("./isLength"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]";var arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */function baseIsTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[baseGetTag(value)]}module.exports=baseIsTypedArray},{"./_baseGetTag":91,"./isLength":249,"./isObjectLike":252}],105:[function(require,module,exports){var baseMatches=require("./_baseMatches"),baseMatchesProperty=require("./_baseMatchesProperty"),identity=require("./identity"),isArray=require("./isArray"),property=require("./property");
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */function baseIteratee(value){
// Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
// See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
if(typeof value=="function"){return value}if(value==null){return identity}if(typeof value=="object"){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value)}return property(value)}module.exports=baseIteratee},{"./_baseMatches":110,"./_baseMatchesProperty":111,"./identity":241,"./isArray":243,"./property":272}],106:[function(require,module,exports){var isPrototype=require("./_isPrototype"),nativeKeys=require("./_nativeKeys");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object)}var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!="constructor"){result.push(key)}}return result}module.exports=baseKeys},{"./_isPrototype":186,"./_nativeKeys":202}],107:[function(require,module,exports){var isObject=require("./isObject"),isPrototype=require("./_isPrototype"),nativeKeysIn=require("./_nativeKeysIn");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function baseKeysIn(object){if(!isObject(object)){return nativeKeysIn(object)}var isProto=isPrototype(object),result=[];for(var key in object){if(!(key=="constructor"&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key)}}return result}module.exports=baseKeysIn},{"./_isPrototype":186,"./_nativeKeysIn":203,"./isObject":251}],108:[function(require,module,exports){
/**
 * The base implementation of `_.lt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 */
function baseLt(value,other){return value<other}module.exports=baseLt},{}],109:[function(require,module,exports){var baseEach=require("./_baseEach"),isArrayLike=require("./isArrayLike");
/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection)});return result}module.exports=baseMap},{"./_baseEach":82,"./isArrayLike":244}],110:[function(require,module,exports){var baseIsMatch=require("./_baseIsMatch"),getMatchData=require("./_getMatchData"),matchesStrictComparable=require("./_matchesStrictComparable");
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){return matchesStrictComparable(matchData[0][0],matchData[0][1])}return function(object){return object===source||baseIsMatch(object,source,matchData)}}module.exports=baseMatches},{"./_baseIsMatch":100,"./_getMatchData":162,"./_matchesStrictComparable":199}],111:[function(require,module,exports){var baseIsEqual=require("./_baseIsEqual"),get=require("./get"),hasIn=require("./hasIn"),isKey=require("./_isKey"),isStrictComparable=require("./_isStrictComparable"),matchesStrictComparable=require("./_matchesStrictComparable"),toKey=require("./_toKey");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */function baseMatchesProperty(path,srcValue){if(isKey(path)&&isStrictComparable(srcValue)){return matchesStrictComparable(toKey(path),srcValue)}return function(object){var objValue=get(object,path);return objValue===undefined&&objValue===srcValue?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG)}}module.exports=baseMatchesProperty},{"./_baseIsEqual":97,"./_isKey":183,"./_isStrictComparable":187,"./_matchesStrictComparable":199,"./_toKey":223,"./get":238,"./hasIn":240}],112:[function(require,module,exports){var Stack=require("./_Stack"),assignMergeValue=require("./_assignMergeValue"),baseFor=require("./_baseFor"),baseMergeDeep=require("./_baseMergeDeep"),isObject=require("./isObject"),keysIn=require("./keysIn"),safeGet=require("./_safeGet");
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */function baseMerge(object,source,srcIndex,customizer,stack){if(object===source){return}baseFor(source,function(srcValue,key){if(isObject(srcValue)){stack||(stack=new Stack);baseMergeDeep(object,source,key,srcIndex,baseMerge,customizer,stack)}else{var newValue=customizer?customizer(safeGet(object,key),srcValue,key+"",object,source,stack):undefined;if(newValue===undefined){newValue=srcValue}assignMergeValue(object,key,newValue)}},keysIn)}module.exports=baseMerge},{"./_Stack":59,"./_assignMergeValue":74,"./_baseFor":87,"./_baseMergeDeep":113,"./_safeGet":209,"./isObject":251,"./keysIn":260}],113:[function(require,module,exports){var assignMergeValue=require("./_assignMergeValue"),cloneBuffer=require("./_cloneBuffer"),cloneTypedArray=require("./_cloneTypedArray"),copyArray=require("./_copyArray"),initCloneObject=require("./_initCloneObject"),isArguments=require("./isArguments"),isArray=require("./isArray"),isArrayLikeObject=require("./isArrayLikeObject"),isBuffer=require("./isBuffer"),isFunction=require("./isFunction"),isObject=require("./isObject"),isPlainObject=require("./isPlainObject"),isTypedArray=require("./isTypedArray"),safeGet=require("./_safeGet"),toPlainObject=require("./toPlainObject");
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */function baseMergeDeep(object,source,key,srcIndex,mergeFunc,customizer,stack){var objValue=safeGet(object,key),srcValue=safeGet(source,key),stacked=stack.get(srcValue);if(stacked){assignMergeValue(object,key,stacked);return}var newValue=customizer?customizer(objValue,srcValue,key+"",object,source,stack):undefined;var isCommon=newValue===undefined;if(isCommon){var isArr=isArray(srcValue),isBuff=!isArr&&isBuffer(srcValue),isTyped=!isArr&&!isBuff&&isTypedArray(srcValue);newValue=srcValue;if(isArr||isBuff||isTyped){if(isArray(objValue)){newValue=objValue}else if(isArrayLikeObject(objValue)){newValue=copyArray(objValue)}else if(isBuff){isCommon=false;newValue=cloneBuffer(srcValue,true)}else if(isTyped){isCommon=false;newValue=cloneTypedArray(srcValue,true)}else{newValue=[]}}else if(isPlainObject(srcValue)||isArguments(srcValue)){newValue=objValue;if(isArguments(objValue)){newValue=toPlainObject(objValue)}else if(!isObject(objValue)||srcIndex&&isFunction(objValue)){newValue=initCloneObject(srcValue)}}else{isCommon=false}}if(isCommon){
// Recursively merge objects and arrays (susceptible to call stack limits).
stack.set(srcValue,newValue);mergeFunc(newValue,srcValue,srcIndex,customizer,stack);stack["delete"](srcValue)}assignMergeValue(object,key,newValue)}module.exports=baseMergeDeep},{"./_assignMergeValue":74,"./_cloneBuffer":135,"./_cloneTypedArray":139,"./_copyArray":142,"./_initCloneObject":179,"./_safeGet":209,"./isArguments":242,"./isArray":243,"./isArrayLikeObject":245,"./isBuffer":246,"./isFunction":248,"./isObject":251,"./isPlainObject":253,"./isTypedArray":257,"./toPlainObject":282}],114:[function(require,module,exports){var arrayMap=require("./_arrayMap"),baseIteratee=require("./_baseIteratee"),baseMap=require("./_baseMap"),baseSortBy=require("./_baseSortBy"),baseUnary=require("./_baseUnary"),compareMultiple=require("./_compareMultiple"),identity=require("./identity");
/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */function baseOrderBy(collection,iteratees,orders){var index=-1;iteratees=arrayMap(iteratees.length?iteratees:[identity],baseUnary(baseIteratee));var result=baseMap(collection,function(value,key,collection){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value)});return{criteria:criteria,index:++index,value:value}});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders)})}module.exports=baseOrderBy},{"./_arrayMap":69,"./_baseIteratee":105,"./_baseMap":109,"./_baseSortBy":124,"./_baseUnary":127,"./_compareMultiple":141,"./identity":241}],115:[function(require,module,exports){var basePickBy=require("./_basePickBy"),hasIn=require("./hasIn");
/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */function basePick(object,paths){return basePickBy(object,paths,function(value,path){return hasIn(object,path)})}module.exports=basePick},{"./_basePickBy":116,"./hasIn":240}],116:[function(require,module,exports){var baseGet=require("./_baseGet"),baseSet=require("./_baseSet"),castPath=require("./_castPath");
/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */function basePickBy(object,paths,predicate){var index=-1,length=paths.length,result={};while(++index<length){var path=paths[index],value=baseGet(object,path);if(predicate(value,path)){baseSet(result,castPath(path,object),value)}}return result}module.exports=basePickBy},{"./_baseGet":89,"./_baseSet":122,"./_castPath":133}],117:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key){return function(object){return object==null?undefined:object[key]}}module.exports=baseProperty},{}],118:[function(require,module,exports){var baseGet=require("./_baseGet");
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */function basePropertyDeep(path){return function(object){return baseGet(object,path)}}module.exports=basePropertyDeep},{"./_baseGet":89}],119:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil=Math.ceil,nativeMax=Math.max;
/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */function baseRange(start,end,step,fromRight){var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(length--){result[fromRight?length:++index]=start;start+=step}return result}module.exports=baseRange},{}],120:[function(require,module,exports){
/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection,iteratee,accumulator,initAccum,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initAccum?(initAccum=false,value):iteratee(accumulator,value,index,collection)});return accumulator}module.exports=baseReduce},{}],121:[function(require,module,exports){var identity=require("./identity"),overRest=require("./_overRest"),setToString=require("./_setToString");
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */function baseRest(func,start){return setToString(overRest(func,start,identity),func+"")}module.exports=baseRest},{"./_overRest":207,"./_setToString":213,"./identity":241}],122:[function(require,module,exports){var assignValue=require("./_assignValue"),castPath=require("./_castPath"),isIndex=require("./_isIndex"),isObject=require("./isObject"),toKey=require("./_toKey");
/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */function baseSet(object,path,value,customizer){if(!isObject(object)){return object}path=castPath(path,object);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=toKey(path[index]),newValue=value;if(index!=lastIndex){var objValue=nested[key];newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue=isObject(objValue)?objValue:isIndex(path[index+1])?[]:{}}}assignValue(nested,key,newValue);nested=nested[key]}return object}module.exports=baseSet},{"./_assignValue":75,"./_castPath":133,"./_isIndex":181,"./_toKey":223,"./isObject":251}],123:[function(require,module,exports){var constant=require("./constant"),defineProperty=require("./_defineProperty"),identity=require("./identity");
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */var baseSetToString=!defineProperty?identity:function(func,string){return defineProperty(func,"toString",{configurable:true,enumerable:false,value:constant(string),writable:true})};module.exports=baseSetToString},{"./_defineProperty":153,"./constant":228,"./identity":241}],124:[function(require,module,exports){
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value}return array}module.exports=baseSortBy},{}],125:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index)}return result}module.exports=baseTimes},{}],126:[function(require,module,exports){var Symbol=require("./_Symbol"),arrayMap=require("./_arrayMap"),isArray=require("./isArray"),isSymbol=require("./isSymbol");
/** Used as references for various `Number` constants. */var INFINITY=1/0;
/** Used to convert symbols to primitives and strings. */var symbolProto=Symbol?Symbol.prototype:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */function baseToString(value){
// Exit early for strings to avoid a performance hit in some environments.
if(typeof value=="string"){return value}if(isArray(value)){
// Recursively convert values (susceptible to call stack limits).
return arrayMap(value,baseToString)+""}if(isSymbol(value)){return symbolToString?symbolToString.call(value):""}var result=value+"";return result=="0"&&1/value==-INFINITY?"-0":result}module.exports=baseToString},{"./_Symbol":60,"./_arrayMap":69,"./isArray":243,"./isSymbol":256}],127:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func){return function(value){return func(value)}}module.exports=baseUnary},{}],128:[function(require,module,exports){var SetCache=require("./_SetCache"),arrayIncludes=require("./_arrayIncludes"),arrayIncludesWith=require("./_arrayIncludesWith"),cacheHas=require("./_cacheHas"),createSet=require("./_createSet"),setToArray=require("./_setToArray");
/** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */function baseUniq(array,iteratee,comparator){var index=-1,includes=arrayIncludes,length=array.length,isCommon=true,result=[],seen=result;if(comparator){isCommon=false;includes=arrayIncludesWith}else if(length>=LARGE_ARRAY_SIZE){var set=iteratee?null:createSet(array);if(set){return setToArray(set)}isCommon=false;includes=cacheHas;seen=new SetCache}else{seen=iteratee?[]:result}outer:while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;value=comparator||value!==0?value:0;if(isCommon&&computed===computed){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer}}if(iteratee){seen.push(computed)}result.push(value)}else if(!includes(seen,computed,comparator)){if(seen!==result){seen.push(computed)}result.push(value)}}return result}module.exports=baseUniq},{"./_SetCache":58,"./_arrayIncludes":66,"./_arrayIncludesWith":67,"./_cacheHas":131,"./_createSet":152,"./_setToArray":212}],129:[function(require,module,exports){var arrayMap=require("./_arrayMap");
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */function baseValues(object,props){return arrayMap(props,function(key){return object[key]})}module.exports=baseValues},{"./_arrayMap":69}],130:[function(require,module,exports){
/**
 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(props,values,assignFunc){var index=-1,length=props.length,valsLength=values.length,result={};while(++index<length){var value=index<valsLength?values[index]:undefined;assignFunc(result,props[index],value)}return result}module.exports=baseZipObject},{}],131:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache,key){return cache.has(key)}module.exports=cacheHas},{}],132:[function(require,module,exports){var identity=require("./identity");
/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */function castFunction(value){return typeof value=="function"?value:identity}module.exports=castFunction},{"./identity":241}],133:[function(require,module,exports){var isArray=require("./isArray"),isKey=require("./_isKey"),stringToPath=require("./_stringToPath"),toString=require("./toString");
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */function castPath(value,object){if(isArray(value)){return value}return isKey(value,object)?[value]:stringToPath(toString(value))}module.exports=castPath},{"./_isKey":183,"./_stringToPath":222,"./isArray":243,"./toString":283}],134:[function(require,module,exports){var Uint8Array=require("./_Uint8Array");
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);new Uint8Array(result).set(new Uint8Array(arrayBuffer));return result}module.exports=cloneArrayBuffer},{"./_Uint8Array":61}],135:[function(require,module,exports){var root=require("./_root");
/** Detect free variable `exports`. */var freeExports=typeof exports=="object"&&exports&&!exports.nodeType&&exports;
/** Detect free variable `module`. */var freeModule=freeExports&&typeof module=="object"&&module&&!module.nodeType&&module;
/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;
/** Built-in value references. */var Buffer=moduleExports?root.Buffer:undefined,allocUnsafe=Buffer?Buffer.allocUnsafe:undefined;
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */function cloneBuffer(buffer,isDeep){if(isDeep){return buffer.slice()}var length=buffer.length,result=allocUnsafe?allocUnsafe(length):new buffer.constructor(length);buffer.copy(result);return result}module.exports=cloneBuffer},{"./_root":208}],136:[function(require,module,exports){var cloneArrayBuffer=require("./_cloneArrayBuffer");
/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */function cloneDataView(dataView,isDeep){var buffer=isDeep?cloneArrayBuffer(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength)}module.exports=cloneDataView},{"./_cloneArrayBuffer":134}],137:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags=/\w*$/;
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result}module.exports=cloneRegExp},{}],138:[function(require,module,exports){var Symbol=require("./_Symbol");
/** Used to convert symbols to primitives and strings. */var symbolProto=Symbol?Symbol.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined;
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{}}module.exports=cloneSymbol},{"./_Symbol":60}],139:[function(require,module,exports){var cloneArrayBuffer=require("./_cloneArrayBuffer");
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */function cloneTypedArray(typedArray,isDeep){var buffer=isDeep?cloneArrayBuffer(typedArray.buffer):typedArray.buffer;return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length)}module.exports=cloneTypedArray},{"./_cloneArrayBuffer":134}],140:[function(require,module,exports){var isSymbol=require("./isSymbol");
/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */function compareAscending(value,other){if(value!==other){var valIsDefined=value!==undefined,valIsNull=value===null,valIsReflexive=value===value,valIsSymbol=isSymbol(value);var othIsDefined=other!==undefined,othIsNull=other===null,othIsReflexive=other===other,othIsSymbol=isSymbol(other);if(!othIsNull&&!othIsSymbol&&!valIsSymbol&&value>other||valIsSymbol&&othIsDefined&&othIsReflexive&&!othIsNull&&!othIsSymbol||valIsNull&&othIsDefined&&othIsReflexive||!valIsDefined&&othIsReflexive||!valIsReflexive){return 1}if(!valIsNull&&!valIsSymbol&&!othIsSymbol&&value<other||othIsSymbol&&valIsDefined&&valIsReflexive&&!valIsNull&&!valIsSymbol||othIsNull&&valIsDefined&&valIsReflexive||!othIsDefined&&valIsReflexive||!othIsReflexive){return-1}}return 0}module.exports=compareAscending},{"./isSymbol":256}],141:[function(require,module,exports){var compareAscending=require("./_compareAscending");
/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=compareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result}var order=orders[index];return result*(order=="desc"?-1:1)}}
// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
// that causes it, under certain circumstances, to provide the same value for
// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
// for more details.
//
// This also ensures a stable sort in V8 and other engines.
// See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
return object.index-other.index}module.exports=compareMultiple},{"./_compareAscending":140}],142:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index]}return array}module.exports=copyArray},{}],143:[function(require,module,exports){var assignValue=require("./_assignValue"),baseAssignValue=require("./_baseAssignValue");
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */function copyObject(source,props,object,customizer){var isNew=!object;object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;if(newValue===undefined){newValue=source[key]}if(isNew){baseAssignValue(object,key,newValue)}else{assignValue(object,key,newValue)}}return object}module.exports=copyObject},{"./_assignValue":75,"./_baseAssignValue":79}],144:[function(require,module,exports){var copyObject=require("./_copyObject"),getSymbols=require("./_getSymbols");
/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */function copySymbols(source,object){return copyObject(source,getSymbols(source),object)}module.exports=copySymbols},{"./_copyObject":143,"./_getSymbols":166}],145:[function(require,module,exports){var copyObject=require("./_copyObject"),getSymbolsIn=require("./_getSymbolsIn");
/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */function copySymbolsIn(source,object){return copyObject(source,getSymbolsIn(source),object)}module.exports=copySymbolsIn},{"./_copyObject":143,"./_getSymbolsIn":167}],146:[function(require,module,exports){var root=require("./_root");
/** Used to detect overreaching core-js shims. */var coreJsData=root["__core-js_shared__"];module.exports=coreJsData},{"./_root":208}],147:[function(require,module,exports){var baseRest=require("./_baseRest"),isIterateeCall=require("./_isIterateeCall");
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */function createAssigner(assigner){return baseRest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=assigner.length>3&&typeof customizer=="function"?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1}object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,index,customizer)}}return object})}module.exports=createAssigner},{"./_baseRest":121,"./_isIterateeCall":182}],148:[function(require,module,exports){var isArrayLike=require("./isArrayLike");
/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){if(collection==null){return collection}if(!isArrayLike(collection)){return eachFunc(collection,iteratee)}var length=collection.length,index=fromRight?length:-1,iterable=Object(collection);while(fromRight?index--:++index<length){if(iteratee(iterable[index],index,iterable)===false){break}}return collection}}module.exports=createBaseEach},{"./isArrayLike":244}],149:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var index=-1,iterable=Object(object),props=keysFunc(object),length=props.length;while(length--){var key=props[fromRight?length:++index];if(iteratee(iterable[key],key,iterable)===false){break}}return object}}module.exports=createBaseFor},{}],150:[function(require,module,exports){var baseIteratee=require("./_baseIteratee"),isArrayLike=require("./isArrayLike"),keys=require("./keys");
/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */function createFind(findIndexFunc){return function(collection,predicate,fromIndex){var iterable=Object(collection);if(!isArrayLike(collection)){var iteratee=baseIteratee(predicate,3);collection=keys(collection);predicate=function(key){return iteratee(iterable[key],key,iterable)}}var index=findIndexFunc(collection,predicate,fromIndex);return index>-1?iterable[iteratee?collection[index]:index]:undefined}}module.exports=createFind},{"./_baseIteratee":105,"./isArrayLike":244,"./keys":259}],151:[function(require,module,exports){var baseRange=require("./_baseRange"),isIterateeCall=require("./_isIterateeCall"),toFinite=require("./toFinite");
/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */function createRange(fromRight){return function(start,end,step){if(step&&typeof step!="number"&&isIterateeCall(start,end,step)){end=step=undefined}
// Ensure the sign of `-0` is preserved.
start=toFinite(start);if(end===undefined){end=start;start=0}else{end=toFinite(end)}step=step===undefined?start<end?1:-1:toFinite(step);return baseRange(start,end,step,fromRight)}}module.exports=createRange},{"./_baseRange":119,"./_isIterateeCall":182,"./toFinite":279}],152:[function(require,module,exports){var Set=require("./_Set"),noop=require("./noop"),setToArray=require("./_setToArray");
/** Used as references for various `Number` constants. */var INFINITY=1/0;
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */var createSet=!(Set&&1/setToArray(new Set([,-0]))[1]==INFINITY)?noop:function(values){return new Set(values)};module.exports=createSet},{"./_Set":57,"./_setToArray":212,"./noop":269}],153:[function(require,module,exports){var getNative=require("./_getNative");var defineProperty=function(){try{var func=getNative(Object,"defineProperty");func({},"",{});return func}catch(e){}}();module.exports=defineProperty},{"./_getNative":163}],154:[function(require,module,exports){var SetCache=require("./_SetCache"),arraySome=require("./_arraySome"),cacheHas=require("./_cacheHas");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */function equalArrays(array,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false}
// Assume cyclic values are equal.
var stacked=stack.get(array);if(stacked&&stack.get(other)){return stacked==other}var index=-1,result=true,seen=bitmask&COMPARE_UNORDERED_FLAG?new SetCache:undefined;stack.set(array,other);stack.set(other,array);
// Ignore non-index properties.
while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack)}if(compared!==undefined){if(compared){continue}result=false;break}
// Recursively compare arrays (susceptible to call stack limits).
if(seen){if(!arraySome(other,function(othValue,othIndex){if(!cacheHas(seen,othIndex)&&(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){return seen.push(othIndex)}})){result=false;break}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){result=false;break}}stack["delete"](array);stack["delete"](other);return result}module.exports=equalArrays},{"./_SetCache":58,"./_arraySome":72,"./_cacheHas":131}],155:[function(require,module,exports){var Symbol=require("./_Symbol"),Uint8Array=require("./_Uint8Array"),eq=require("./eq"),equalArrays=require("./_equalArrays"),mapToArray=require("./_mapToArray"),setToArray=require("./_setToArray");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;
/** `Object#toString` result references. */var boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]";var arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]";
/** Used to convert symbols to primitives and strings. */var symbolProto=Symbol?Symbol.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function equalByTag(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag:if(object.byteLength!=other.byteLength||object.byteOffset!=other.byteOffset){return false}object=object.buffer;other=other.buffer;case arrayBufferTag:if(object.byteLength!=other.byteLength||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false}return true;case boolTag:case dateTag:case numberTag:
// Coerce booleans to `1` or `0` and dates to milliseconds.
// Invalid dates are coerced to `NaN`.
return eq(+object,+other);case errorTag:return object.name==other.name&&object.message==other.message;case regexpTag:case stringTag:
// Coerce regexes to strings and treat strings, primitives and objects,
// as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
// for more details.
return object==other+"";case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&COMPARE_PARTIAL_FLAG;convert||(convert=setToArray);if(object.size!=other.size&&!isPartial){return false}
// Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked){return stacked==other}bitmask|=COMPARE_UNORDERED_FLAG;
// Recursively compare objects (susceptible to call stack limits).
stack.set(object,other);var result=equalArrays(convert(object),convert(other),bitmask,customizer,equalFunc,stack);stack["delete"](object);return result;case symbolTag:if(symbolValueOf){return symbolValueOf.call(object)==symbolValueOf.call(other)}}return false}module.exports=equalByTag},{"./_Symbol":60,"./_Uint8Array":61,"./_equalArrays":154,"./_mapToArray":198,"./_setToArray":212,"./eq":231}],156:[function(require,module,exports){var getAllKeys=require("./_getAllKeys");
/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1;
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function equalObjects(object,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,objProps=getAllKeys(object),objLength=objProps.length,othProps=getAllKeys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false}var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:hasOwnProperty.call(other,key))){return false}}
// Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked&&stack.get(other)){return stacked==other}var result=true;stack.set(object,other);stack.set(other,object);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack)}
// Recursively compare objects (susceptible to call stack limits).
if(!(compared===undefined?objValue===othValue||equalFunc(objValue,othValue,bitmask,customizer,stack):compared)){result=false;break}skipCtor||(skipCtor=key=="constructor")}if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;
// Non `Object` object instances with different constructors are not equal.
if(objCtor!=othCtor&&("constructor"in object&&"constructor"in other)&&!(typeof objCtor=="function"&&objCtor instanceof objCtor&&typeof othCtor=="function"&&othCtor instanceof othCtor)){result=false}}stack["delete"](object);stack["delete"](other);return result}module.exports=equalObjects},{"./_getAllKeys":159}],157:[function(require,module,exports){var flatten=require("./flatten"),overRest=require("./_overRest"),setToString=require("./_setToString");
/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */function flatRest(func){return setToString(overRest(func,undefined,flatten),func+"")}module.exports=flatRest},{"./_overRest":207,"./_setToString":213,"./flatten":235}],158:[function(require,module,exports){(function(global){
/** Detect free variable `global` from Node.js. */
var freeGlobal=typeof global=="object"&&global&&global.Object===Object&&global;module.exports=freeGlobal}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],159:[function(require,module,exports){var baseGetAllKeys=require("./_baseGetAllKeys"),getSymbols=require("./_getSymbols"),keys=require("./keys");
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols)}module.exports=getAllKeys},{"./_baseGetAllKeys":90,"./_getSymbols":166,"./keys":259}],160:[function(require,module,exports){var baseGetAllKeys=require("./_baseGetAllKeys"),getSymbolsIn=require("./_getSymbolsIn"),keysIn=require("./keysIn");
/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */function getAllKeysIn(object){return baseGetAllKeys(object,keysIn,getSymbolsIn)}module.exports=getAllKeysIn},{"./_baseGetAllKeys":90,"./_getSymbolsIn":167,"./keysIn":260}],161:[function(require,module,exports){var isKeyable=require("./_isKeyable");
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=="string"?"string":"hash"]:data.map}module.exports=getMapData},{"./_isKeyable":184}],162:[function(require,module,exports){var isStrictComparable=require("./_isStrictComparable"),keys=require("./keys");
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */function getMatchData(object){var result=keys(object),length=result.length;while(length--){var key=result[length],value=object[key];result[length]=[key,value,isStrictComparable(value)]}return result}module.exports=getMatchData},{"./_isStrictComparable":187,"./keys":259}],163:[function(require,module,exports){var baseIsNative=require("./_baseIsNative"),getValue=require("./_getValue");
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined}module.exports=getNative},{"./_baseIsNative":102,"./_getValue":169}],164:[function(require,module,exports){var overArg=require("./_overArg");
/** Built-in value references. */var getPrototype=overArg(Object.getPrototypeOf,Object);module.exports=getPrototype},{"./_overArg":206}],165:[function(require,module,exports){var Symbol=require("./_Symbol");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString=objectProto.toString;
/** Built-in value references. */var symToStringTag=Symbol?Symbol.toStringTag:undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true}catch(e){}var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag}else{delete value[symToStringTag]}}return result}module.exports=getRawTag},{"./_Symbol":60}],166:[function(require,module,exports){var arrayFilter=require("./_arrayFilter"),stubArray=require("./stubArray");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Built-in value references. */var propertyIsEnumerable=objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetSymbols=Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */var getSymbols=!nativeGetSymbols?stubArray:function(object){if(object==null){return[]}object=Object(object);return arrayFilter(nativeGetSymbols(object),function(symbol){return propertyIsEnumerable.call(object,symbol)})};module.exports=getSymbols},{"./_arrayFilter":65,"./stubArray":277}],167:[function(require,module,exports){var arrayPush=require("./_arrayPush"),getPrototype=require("./_getPrototype"),getSymbols=require("./_getSymbols"),stubArray=require("./stubArray");
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetSymbols=Object.getOwnPropertySymbols;
/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */var getSymbolsIn=!nativeGetSymbols?stubArray:function(object){var result=[];while(object){arrayPush(result,getSymbols(object));object=getPrototype(object)}return result};module.exports=getSymbolsIn},{"./_arrayPush":70,"./_getPrototype":164,"./_getSymbols":166,"./stubArray":277}],168:[function(require,module,exports){var DataView=require("./_DataView"),Map=require("./_Map"),Promise=require("./_Promise"),Set=require("./_Set"),WeakMap=require("./_WeakMap"),baseGetTag=require("./_baseGetTag"),toSource=require("./_toSource");
/** `Object#toString` result references. */var mapTag="[object Map]",objectTag="[object Object]",promiseTag="[object Promise]",setTag="[object Set]",weakMapTag="[object WeakMap]";var dataViewTag="[object DataView]";
/** Used to detect maps, sets, and weakmaps. */var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */var getTag=baseGetTag;
// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||Map&&getTag(new Map)!=mapTag||Promise&&getTag(Promise.resolve())!=promiseTag||Set&&getTag(new Set)!=setTag||WeakMap&&getTag(new WeakMap)!=weakMapTag){getTag=function(value){var result=baseGetTag(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):"";if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag}}return result}}module.exports=getTag},{"./_DataView":51,"./_Map":54,"./_Promise":56,"./_Set":57,"./_WeakMap":62,"./_baseGetTag":91,"./_toSource":224}],169:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object,key){return object==null?undefined:object[key]}module.exports=getValue},{}],170:[function(require,module,exports){var castPath=require("./_castPath"),isArguments=require("./isArguments"),isArray=require("./isArray"),isIndex=require("./_isIndex"),isLength=require("./isLength"),toKey=require("./_toKey");
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */function hasPath(object,path,hasFunc){path=castPath(path,object);var index=-1,length=path.length,result=false;while(++index<length){var key=toKey(path[index]);if(!(result=object!=null&&hasFunc(object,key))){break}object=object[key]}if(result||++index!=length){return result}length=object==null?0:object.length;return!!length&&isLength(length)&&isIndex(key,length)&&(isArray(object)||isArguments(object))}module.exports=hasPath},{"./_castPath":133,"./_isIndex":181,"./_toKey":223,"./isArguments":242,"./isArray":243,"./isLength":249}],171:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f",reComboHalfMarksRange="\\ufe20-\\ufe2f",rsComboSymbolsRange="\\u20d0-\\u20ff",rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsVarRange="\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */var rsZWJ="\\u200d";
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */var reHasUnicode=RegExp("["+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+"]");
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */function hasUnicode(string){return reHasUnicode.test(string)}module.exports=hasUnicode},{}],172:[function(require,module,exports){var nativeCreate=require("./_nativeCreate");
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};this.size=0}module.exports=hashClear},{"./_nativeCreate":201}],173:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key){var result=this.has(key)&&delete this.__data__[key];this.size-=result?1:0;return result}module.exports=hashDelete},{}],174:[function(require,module,exports){var nativeCreate=require("./_nativeCreate");
/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED="__lodash_hash_undefined__";
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result}return hasOwnProperty.call(data,key)?data[key]:undefined}module.exports=hashGet},{"./_nativeCreate":201}],175:[function(require,module,exports){var nativeCreate=require("./_nativeCreate");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function hashHas(key){var data=this.__data__;return nativeCreate?data[key]!==undefined:hasOwnProperty.call(data,key)}module.exports=hashHas},{"./_nativeCreate":201}],176:[function(require,module,exports){var nativeCreate=require("./_nativeCreate");
/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED="__lodash_hash_undefined__";
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */function hashSet(key,value){var data=this.__data__;this.size+=this.has(key)?0:1;data[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;return this}module.exports=hashSet},{"./_nativeCreate":201}],177:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */function initCloneArray(array){var length=array.length,result=new array.constructor(length);
// Add properties assigned by `RegExp#exec`.
if(length&&typeof array[0]=="string"&&hasOwnProperty.call(array,"index")){result.index=array.index;result.input=array.input}return result}module.exports=initCloneArray},{}],178:[function(require,module,exports){var cloneArrayBuffer=require("./_cloneArrayBuffer"),cloneDataView=require("./_cloneDataView"),cloneRegExp=require("./_cloneRegExp"),cloneSymbol=require("./_cloneSymbol"),cloneTypedArray=require("./_cloneTypedArray");
/** `Object#toString` result references. */var boolTag="[object Boolean]",dateTag="[object Date]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]";var arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]";
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneArrayBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case dataViewTag:return cloneDataView(object,isDeep);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return new Ctor;case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return new Ctor;case symbolTag:return cloneSymbol(object)}}module.exports=initCloneByTag},{"./_cloneArrayBuffer":134,"./_cloneDataView":136,"./_cloneRegExp":137,"./_cloneSymbol":138,"./_cloneTypedArray":139}],179:[function(require,module,exports){var baseCreate=require("./_baseCreate"),getPrototype=require("./_getPrototype"),isPrototype=require("./_isPrototype");
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */function initCloneObject(object){return typeof object.constructor=="function"&&!isPrototype(object)?baseCreate(getPrototype(object)):{}}module.exports=initCloneObject},{"./_baseCreate":81,"./_getPrototype":164,"./_isPrototype":186}],180:[function(require,module,exports){var Symbol=require("./_Symbol"),isArguments=require("./isArguments"),isArray=require("./isArray");
/** Built-in value references. */var spreadableSymbol=Symbol?Symbol.isConcatSpreadable:undefined;
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */function isFlattenable(value){return isArray(value)||isArguments(value)||!!(spreadableSymbol&&value&&value[spreadableSymbol])}module.exports=isFlattenable},{"./_Symbol":60,"./isArguments":242,"./isArray":243}],181:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER=9007199254740991;
/** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function isIndex(value,length){var type=typeof value;length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(type=="number"||type!="symbol"&&reIsUint.test(value))&&(value>-1&&value%1==0&&value<length)}module.exports=isIndex},{}],182:[function(require,module,exports){var eq=require("./eq"),isArrayLike=require("./isArrayLike"),isIndex=require("./_isIndex"),isObject=require("./isObject");
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */function isIterateeCall(value,index,object){if(!isObject(object)){return false}var type=typeof index;if(type=="number"?isArrayLike(object)&&isIndex(index,object.length):type=="string"&&index in object){return eq(object[index],value)}return false}module.exports=isIterateeCall},{"./_isIndex":181,"./eq":231,"./isArrayLike":244,"./isObject":251}],183:[function(require,module,exports){var isArray=require("./isArray"),isSymbol=require("./isSymbol");
/** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */function isKey(value,object){if(isArray(value)){return false}var type=typeof value;if(type=="number"||type=="symbol"||type=="boolean"||value==null||isSymbol(value)){return true}return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||object!=null&&value in Object(object)}module.exports=isKey},{"./isArray":243,"./isSymbol":256}],184:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value){var type=typeof value;return type=="string"||type=="number"||type=="symbol"||type=="boolean"?value!=="__proto__":value===null}module.exports=isKeyable},{}],185:[function(require,module,exports){var coreJsData=require("./_coreJsData");
/** Used to detect methods masquerading as native. */var maskSrcKey=function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||"");return uid?"Symbol(src)_1."+uid:""}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */function isMasked(func){return!!maskSrcKey&&maskSrcKey in func}module.exports=isMasked},{"./_coreJsData":146}],186:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto=Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=="function"&&Ctor.prototype||objectProto;return value===proto}module.exports=isPrototype},{}],187:[function(require,module,exports){var isObject=require("./isObject");
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */function isStrictComparable(value){return value===value&&!isObject(value)}module.exports=isStrictComparable},{"./isObject":251}],188:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear(){this.__data__=[];this.size=0}module.exports=listCacheClear},{}],189:[function(require,module,exports){var assocIndexOf=require("./_assocIndexOf");
/** Used for built-in method references. */var arrayProto=Array.prototype;
/** Built-in value references. */var splice=arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false}var lastIndex=data.length-1;if(index==lastIndex){data.pop()}else{splice.call(data,index,1)}--this.size;return true}module.exports=listCacheDelete},{"./_assocIndexOf":76}],190:[function(require,module,exports){var assocIndexOf=require("./_assocIndexOf");
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1]}module.exports=listCacheGet},{"./_assocIndexOf":76}],191:[function(require,module,exports){var assocIndexOf=require("./_assocIndexOf");
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1}module.exports=listCacheHas},{"./_assocIndexOf":76}],192:[function(require,module,exports){var assocIndexOf=require("./_assocIndexOf");
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){++this.size;data.push([key,value])}else{data[index][1]=value}return this}module.exports=listCacheSet},{"./_assocIndexOf":76}],193:[function(require,module,exports){var Hash=require("./_Hash"),ListCache=require("./_ListCache"),Map=require("./_Map");
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */function mapCacheClear(){this.size=0;this.__data__={hash:new Hash,map:new(Map||ListCache),string:new Hash}}module.exports=mapCacheClear},{"./_Hash":52,"./_ListCache":53,"./_Map":54}],194:[function(require,module,exports){var getMapData=require("./_getMapData");
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function mapCacheDelete(key){var result=getMapData(this,key)["delete"](key);this.size-=result?1:0;return result}module.exports=mapCacheDelete},{"./_getMapData":161}],195:[function(require,module,exports){var getMapData=require("./_getMapData");
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function mapCacheGet(key){return getMapData(this,key).get(key)}module.exports=mapCacheGet},{"./_getMapData":161}],196:[function(require,module,exports){var getMapData=require("./_getMapData");
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function mapCacheHas(key){return getMapData(this,key).has(key)}module.exports=mapCacheHas},{"./_getMapData":161}],197:[function(require,module,exports){var getMapData=require("./_getMapData");
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */function mapCacheSet(key,value){var data=getMapData(this,key),size=data.size;data.set(key,value);this.size+=data.size==size?0:1;return this}module.exports=mapCacheSet},{"./_getMapData":161}],198:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value]});return result}module.exports=mapToArray},{}],199:[function(require,module,exports){
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key,srcValue){return function(object){if(object==null){return false}return object[key]===srcValue&&(srcValue!==undefined||key in Object(object))}}module.exports=matchesStrictComparable},{}],200:[function(require,module,exports){var memoize=require("./memoize");
/** Used as the maximum memoize cache size. */var MAX_MEMOIZE_SIZE=500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */function memoizeCapped(func){var result=memoize(func,function(key){if(cache.size===MAX_MEMOIZE_SIZE){cache.clear()}return key});var cache=result.cache;return result}module.exports=memoizeCapped},{"./memoize":265}],201:[function(require,module,exports){var getNative=require("./_getNative");
/* Built-in method references that are verified to be native. */var nativeCreate=getNative(Object,"create");module.exports=nativeCreate},{"./_getNative":163}],202:[function(require,module,exports){var overArg=require("./_overArg");
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeKeys=overArg(Object.keys,Object);module.exports=nativeKeys},{"./_overArg":206}],203:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object){var result=[];if(object!=null){for(var key in Object(object)){result.push(key)}}return result}module.exports=nativeKeysIn},{}],204:[function(require,module,exports){var freeGlobal=require("./_freeGlobal");
/** Detect free variable `exports`. */var freeExports=typeof exports=="object"&&exports&&!exports.nodeType&&exports;
/** Detect free variable `module`. */var freeModule=freeExports&&typeof module=="object"&&module&&!module.nodeType&&module;
/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;
/** Detect free variable `process` from Node.js. */var freeProcess=moduleExports&&freeGlobal.process;
/** Used to access faster Node.js helpers. */var nodeUtil=function(){try{
// Use `util.types` for Node.js 10+.
var types=freeModule&&freeModule.require&&freeModule.require("util").types;if(types){return types}
// Legacy `process.binding('util')` for Node.js < 10.
return freeProcess&&freeProcess.binding&&freeProcess.binding("util")}catch(e){}}();module.exports=nodeUtil},{"./_freeGlobal":158}],205:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto=Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString=objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */function objectToString(value){return nativeObjectToString.call(value)}module.exports=objectToString},{}],206:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func,transform){return function(arg){return func(transform(arg))}}module.exports=overArg},{}],207:[function(require,module,exports){var apply=require("./_apply");
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeMax=Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */function overRest(func,start,transform){start=nativeMax(start===undefined?func.length-1:start,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index]}index=-1;var otherArgs=Array(start+1);while(++index<start){otherArgs[index]=args[index]}otherArgs[start]=transform(array);return apply(func,this,otherArgs)}}module.exports=overRest},{"./_apply":63}],208:[function(require,module,exports){var freeGlobal=require("./_freeGlobal");
/** Detect free variable `self`. */var freeSelf=typeof self=="object"&&self&&self.Object===Object&&self;
/** Used as a reference to the global object. */var root=freeGlobal||freeSelf||Function("return this")();module.exports=root},{"./_freeGlobal":158}],209:[function(require,module,exports){
/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object,key){return key=="__proto__"?undefined:object[key]}module.exports=safeGet},{}],210:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED="__lodash_hash_undefined__";
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */function setCacheAdd(value){this.__data__.set(value,HASH_UNDEFINED);return this}module.exports=setCacheAdd},{}],211:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value){return this.__data__.has(value)}module.exports=setCacheHas},{}],212:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value});return result}module.exports=setToArray},{}],213:[function(require,module,exports){var baseSetToString=require("./_baseSetToString"),shortOut=require("./_shortOut");
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */var setToString=shortOut(baseSetToString);module.exports=setToString},{"./_baseSetToString":123,"./_shortOut":214}],214:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT=800,HOT_SPAN=16;
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeNow=Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */function shortOut(func){var count=0,lastCalled=0;return function(){var stamp=nativeNow(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return arguments[0]}}else{count=0}return func.apply(undefined,arguments)}}module.exports=shortOut},{}],215:[function(require,module,exports){var ListCache=require("./_ListCache");
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */function stackClear(){this.__data__=new ListCache;this.size=0}module.exports=stackClear},{"./_ListCache":53}],216:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key){var data=this.__data__,result=data["delete"](key);this.size=data.size;return result}module.exports=stackDelete},{}],217:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key){return this.__data__.get(key)}module.exports=stackGet},{}],218:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key){return this.__data__.has(key)}module.exports=stackHas},{}],219:[function(require,module,exports){var ListCache=require("./_ListCache"),Map=require("./_Map"),MapCache=require("./_MapCache");
/** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */function stackSet(key,value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map||pairs.length<LARGE_ARRAY_SIZE-1){pairs.push([key,value]);this.size=++data.size;return this}data=this.__data__=new MapCache(pairs)}data.set(key,value);this.size=data.size;return this}module.exports=stackSet},{"./_ListCache":53,"./_Map":54,"./_MapCache":55}],220:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array,value,fromIndex){var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index}}return-1}module.exports=strictIndexOf},{}],221:[function(require,module,exports){var asciiSize=require("./_asciiSize"),hasUnicode=require("./_hasUnicode"),unicodeSize=require("./_unicodeSize");
/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */function stringSize(string){return hasUnicode(string)?unicodeSize(string):asciiSize(string)}module.exports=stringSize},{"./_asciiSize":73,"./_hasUnicode":171,"./_unicodeSize":225}],222:[function(require,module,exports){var memoizeCapped=require("./_memoizeCapped");
/** Used to match property names within property paths. */var rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */var stringToPath=memoizeCapped(function(string){var result=[];if(string.charCodeAt(0)===46/* . */){result.push("")}string.replace(rePropName,function(match,number,quote,subString){result.push(quote?subString.replace(reEscapeChar,"$1"):number||match)});return result});module.exports=stringToPath},{"./_memoizeCapped":200}],223:[function(require,module,exports){var isSymbol=require("./isSymbol");
/** Used as references for various `Number` constants. */var INFINITY=1/0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */function toKey(value){if(typeof value=="string"||isSymbol(value)){return value}var result=value+"";return result=="0"&&1/value==-INFINITY?"-0":result}module.exports=toKey},{"./isSymbol":256}],224:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto=Function.prototype;
/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */function toSource(func){if(func!=null){try{return funcToString.call(func)}catch(e){}try{return func+""}catch(e){}}return""}module.exports=toSource},{}],225:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f",reComboHalfMarksRange="\\ufe20-\\ufe2f",rsComboSymbolsRange="\\u20d0-\\u20ff",rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsVarRange="\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */var rsAstral="["+rsAstralRange+"]",rsCombo="["+rsComboRange+"]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsModifier="(?:"+rsCombo+"|"+rsFitz+")",rsNonAstral="[^"+rsAstralRange+"]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsZWJ="\\u200d";
/** Used to compose unicode regexes. */var reOptMod=rsModifier+"?",rsOptVar="["+rsVarRange+"]?",rsOptJoin="(?:"+rsZWJ+"(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsSeq=rsOptVar+reOptMod+rsOptJoin,rsSymbol="(?:"+[rsNonAstral+rsCombo+"?",rsCombo,rsRegional,rsSurrPair,rsAstral].join("|")+")";
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */var reUnicode=RegExp(rsFitz+"(?="+rsFitz+")|"+rsSymbol+rsSeq,"g");
/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */function unicodeSize(string){var result=reUnicode.lastIndex=0;while(reUnicode.test(string)){++result}return result}module.exports=unicodeSize},{}],226:[function(require,module,exports){var baseClone=require("./_baseClone");
/** Used to compose bitmasks for cloning. */var CLONE_SYMBOLS_FLAG=4;
/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */function clone(value){return baseClone(value,CLONE_SYMBOLS_FLAG)}module.exports=clone},{"./_baseClone":80}],227:[function(require,module,exports){var baseClone=require("./_baseClone");
/** Used to compose bitmasks for cloning. */var CLONE_DEEP_FLAG=1,CLONE_SYMBOLS_FLAG=4;
/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */function cloneDeep(value){return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG)}module.exports=cloneDeep},{"./_baseClone":80}],228:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value){return function(){return value}}module.exports=constant},{}],229:[function(require,module,exports){var baseRest=require("./_baseRest"),eq=require("./eq"),isIterateeCall=require("./_isIterateeCall"),keysIn=require("./keysIn");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */var defaults=baseRest(function(object,sources){object=Object(object);var index=-1;var length=sources.length;var guard=length>2?sources[2]:undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){length=1}while(++index<length){var source=sources[index];var props=keysIn(source);var propsIndex=-1;var propsLength=props.length;while(++propsIndex<propsLength){var key=props[propsIndex];var value=object[key];if(value===undefined||eq(value,objectProto[key])&&!hasOwnProperty.call(object,key)){object[key]=source[key]}}}return object});module.exports=defaults},{"./_baseRest":121,"./_isIterateeCall":182,"./eq":231,"./keysIn":260}],230:[function(require,module,exports){module.exports=require("./forEach")},{"./forEach":236}],231:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value,other){return value===other||value!==value&&other!==other}module.exports=eq},{}],232:[function(require,module,exports){var arrayFilter=require("./_arrayFilter"),baseFilter=require("./_baseFilter"),baseIteratee=require("./_baseIteratee"),isArray=require("./isArray");
/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */function filter(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,baseIteratee(predicate,3))}module.exports=filter},{"./_arrayFilter":65,"./_baseFilter":84,"./_baseIteratee":105,"./isArray":243}],233:[function(require,module,exports){var createFind=require("./_createFind"),findIndex=require("./findIndex");
/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */var find=createFind(findIndex);module.exports=find},{"./_createFind":150,"./findIndex":234}],234:[function(require,module,exports){var baseFindIndex=require("./_baseFindIndex"),baseIteratee=require("./_baseIteratee"),toInteger=require("./toInteger");
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeMax=Math.max;
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */function findIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1}var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0)}return baseFindIndex(array,baseIteratee(predicate,3),index)}module.exports=findIndex},{"./_baseFindIndex":85,"./_baseIteratee":105,"./toInteger":280}],235:[function(require,module,exports){var baseFlatten=require("./_baseFlatten");
/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */function flatten(array){var length=array==null?0:array.length;return length?baseFlatten(array,1):[]}module.exports=flatten},{"./_baseFlatten":86}],236:[function(require,module,exports){var arrayEach=require("./_arrayEach"),baseEach=require("./_baseEach"),castFunction=require("./_castFunction"),isArray=require("./isArray");
/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */function forEach(collection,iteratee){var func=isArray(collection)?arrayEach:baseEach;return func(collection,castFunction(iteratee))}module.exports=forEach},{"./_arrayEach":64,"./_baseEach":82,"./_castFunction":132,"./isArray":243}],237:[function(require,module,exports){var baseFor=require("./_baseFor"),castFunction=require("./_castFunction"),keysIn=require("./keysIn");
/**
 * Iterates over own and inherited enumerable string keyed properties of an
 * object and invokes `iteratee` for each property. The iteratee is invoked
 * with three arguments: (value, key, object). Iteratee functions may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forInRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forIn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
 */function forIn(object,iteratee){return object==null?object:baseFor(object,castFunction(iteratee),keysIn)}module.exports=forIn},{"./_baseFor":87,"./_castFunction":132,"./keysIn":260}],238:[function(require,module,exports){var baseGet=require("./_baseGet");
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result}module.exports=get},{"./_baseGet":89}],239:[function(require,module,exports){var baseHas=require("./_baseHas"),hasPath=require("./_hasPath");
/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */function has(object,path){return object!=null&&hasPath(object,path,baseHas)}module.exports=has},{"./_baseHas":93,"./_hasPath":170}],240:[function(require,module,exports){var baseHasIn=require("./_baseHasIn"),hasPath=require("./_hasPath");
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */function hasIn(object,path){return object!=null&&hasPath(object,path,baseHasIn)}module.exports=hasIn},{"./_baseHasIn":94,"./_hasPath":170}],241:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value){return value}module.exports=identity},{}],242:[function(require,module,exports){var baseIsArguments=require("./_baseIsArguments"),isObjectLike=require("./isObjectLike");
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/** Built-in value references. */var propertyIsEnumerable=objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */var isArguments=baseIsArguments(function(){return arguments}())?baseIsArguments:function(value){return isObjectLike(value)&&hasOwnProperty.call(value,"callee")&&!propertyIsEnumerable.call(value,"callee")};module.exports=isArguments},{"./_baseIsArguments":96,"./isObjectLike":252}],243:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray=Array.isArray;module.exports=isArray},{}],244:[function(require,module,exports){var isFunction=require("./isFunction"),isLength=require("./isLength");
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value)}module.exports=isArrayLike},{"./isFunction":248,"./isLength":249}],245:[function(require,module,exports){var isArrayLike=require("./isArrayLike"),isObjectLike=require("./isObjectLike");
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value)}module.exports=isArrayLikeObject},{"./isArrayLike":244,"./isObjectLike":252}],246:[function(require,module,exports){var root=require("./_root"),stubFalse=require("./stubFalse");
/** Detect free variable `exports`. */var freeExports=typeof exports=="object"&&exports&&!exports.nodeType&&exports;
/** Detect free variable `module`. */var freeModule=freeExports&&typeof module=="object"&&module&&!module.nodeType&&module;
/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;
/** Built-in value references. */var Buffer=moduleExports?root.Buffer:undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */var nativeIsBuffer=Buffer?Buffer.isBuffer:undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */var isBuffer=nativeIsBuffer||stubFalse;module.exports=isBuffer},{"./_root":208,"./stubFalse":278}],247:[function(require,module,exports){var baseKeys=require("./_baseKeys"),getTag=require("./_getTag"),isArguments=require("./isArguments"),isArray=require("./isArray"),isArrayLike=require("./isArrayLike"),isBuffer=require("./isBuffer"),isPrototype=require("./_isPrototype"),isTypedArray=require("./isTypedArray");
/** `Object#toString` result references. */var mapTag="[object Map]",setTag="[object Set]";
/** Used for built-in method references. */var objectProto=Object.prototype;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */function isEmpty(value){if(value==null){return true}if(isArrayLike(value)&&(isArray(value)||typeof value=="string"||typeof value.splice=="function"||isBuffer(value)||isTypedArray(value)||isArguments(value))){return!value.length}var tag=getTag(value);if(tag==mapTag||tag==setTag){return!value.size}if(isPrototype(value)){return!baseKeys(value).length}for(var key in value){if(hasOwnProperty.call(value,key)){return false}}return true}module.exports=isEmpty},{"./_baseKeys":106,"./_getTag":168,"./_isPrototype":186,"./isArguments":242,"./isArray":243,"./isArrayLike":244,"./isBuffer":246,"./isTypedArray":257}],248:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),isObject=require("./isObject");
/** `Object#toString` result references. */var asyncTag="[object AsyncFunction]",funcTag="[object Function]",genTag="[object GeneratorFunction]",proxyTag="[object Proxy]";
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function isFunction(value){if(!isObject(value)){return false}
// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var tag=baseGetTag(value);return tag==funcTag||tag==genTag||tag==asyncTag||tag==proxyTag}module.exports=isFunction},{"./_baseGetTag":91,"./isObject":251}],249:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER=9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */function isLength(value){return typeof value=="number"&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER}module.exports=isLength},{}],250:[function(require,module,exports){var baseIsMap=require("./_baseIsMap"),baseUnary=require("./_baseUnary"),nodeUtil=require("./_nodeUtil");
/* Node.js helper references. */var nodeIsMap=nodeUtil&&nodeUtil.isMap;
/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */var isMap=nodeIsMap?baseUnary(nodeIsMap):baseIsMap;module.exports=isMap},{"./_baseIsMap":99,"./_baseUnary":127,"./_nodeUtil":204}],251:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value){var type=typeof value;return value!=null&&(type=="object"||type=="function")}module.exports=isObject},{}],252:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value){return value!=null&&typeof value=="object"}module.exports=isObjectLike},{}],253:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),getPrototype=require("./_getPrototype"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var objectTag="[object Object]";
/** Used for built-in method references. */var funcProto=Function.prototype,objectProto=Object.prototype;
/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;
/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */function isPlainObject(value){if(!isObjectLike(value)||baseGetTag(value)!=objectTag){return false}var proto=getPrototype(value);if(proto===null){return true}var Ctor=hasOwnProperty.call(proto,"constructor")&&proto.constructor;return typeof Ctor=="function"&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString}module.exports=isPlainObject},{"./_baseGetTag":91,"./_getPrototype":164,"./isObjectLike":252}],254:[function(require,module,exports){var baseIsSet=require("./_baseIsSet"),baseUnary=require("./_baseUnary"),nodeUtil=require("./_nodeUtil");
/* Node.js helper references. */var nodeIsSet=nodeUtil&&nodeUtil.isSet;
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */var isSet=nodeIsSet?baseUnary(nodeIsSet):baseIsSet;module.exports=isSet},{"./_baseIsSet":103,"./_baseUnary":127,"./_nodeUtil":204}],255:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),isArray=require("./isArray"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var stringTag="[object String]";
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */function isString(value){return typeof value=="string"||!isArray(value)&&isObjectLike(value)&&baseGetTag(value)==stringTag}module.exports=isString},{"./_baseGetTag":91,"./isArray":243,"./isObjectLike":252}],256:[function(require,module,exports){var baseGetTag=require("./_baseGetTag"),isObjectLike=require("./isObjectLike");
/** `Object#toString` result references. */var symbolTag="[object Symbol]";
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */function isSymbol(value){return typeof value=="symbol"||isObjectLike(value)&&baseGetTag(value)==symbolTag}module.exports=isSymbol},{"./_baseGetTag":91,"./isObjectLike":252}],257:[function(require,module,exports){var baseIsTypedArray=require("./_baseIsTypedArray"),baseUnary=require("./_baseUnary"),nodeUtil=require("./_nodeUtil");
/* Node.js helper references. */var nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */var isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;module.exports=isTypedArray},{"./_baseIsTypedArray":104,"./_baseUnary":127,"./_nodeUtil":204}],258:[function(require,module,exports){
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value){return value===undefined}module.exports=isUndefined},{}],259:[function(require,module,exports){var arrayLikeKeys=require("./_arrayLikeKeys"),baseKeys=require("./_baseKeys"),isArrayLike=require("./isArrayLike");
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object)}module.exports=keys},{"./_arrayLikeKeys":68,"./_baseKeys":106,"./isArrayLike":244}],260:[function(require,module,exports){var arrayLikeKeys=require("./_arrayLikeKeys"),baseKeysIn=require("./_baseKeysIn"),isArrayLike=require("./isArrayLike");
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */function keysIn(object){return isArrayLike(object)?arrayLikeKeys(object,true):baseKeysIn(object)}module.exports=keysIn},{"./_arrayLikeKeys":68,"./_baseKeysIn":107,"./isArrayLike":244}],261:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array){var length=array==null?0:array.length;return length?array[length-1]:undefined}module.exports=last},{}],262:[function(require,module,exports){var arrayMap=require("./_arrayMap"),baseIteratee=require("./_baseIteratee"),baseMap=require("./_baseMap"),isArray=require("./isArray");
/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */function map(collection,iteratee){var func=isArray(collection)?arrayMap:baseMap;return func(collection,baseIteratee(iteratee,3))}module.exports=map},{"./_arrayMap":69,"./_baseIteratee":105,"./_baseMap":109,"./isArray":243}],263:[function(require,module,exports){var baseAssignValue=require("./_baseAssignValue"),baseForOwn=require("./_baseForOwn"),baseIteratee=require("./_baseIteratee");
/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */function mapValues(object,iteratee){var result={};iteratee=baseIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,key,iteratee(value,key,object))});return result}module.exports=mapValues},{"./_baseAssignValue":79,"./_baseForOwn":88,"./_baseIteratee":105}],264:[function(require,module,exports){var baseExtremum=require("./_baseExtremum"),baseGt=require("./_baseGt"),identity=require("./identity");
/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */function max(array){return array&&array.length?baseExtremum(array,identity,baseGt):undefined}module.exports=max},{"./_baseExtremum":83,"./_baseGt":92,"./identity":241}],265:[function(require,module,exports){var MapCache=require("./_MapCache");
/** Error message constants. */var FUNC_ERROR_TEXT="Expected a function";
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */function memoize(func,resolver){if(typeof func!="function"||resolver!=null&&typeof resolver!="function"){throw new TypeError(FUNC_ERROR_TEXT)}var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key)}var result=func.apply(this,args);memoized.cache=cache.set(key,result)||cache;return result};memoized.cache=new(memoize.Cache||MapCache);return memoized}
// Expose `MapCache`.
memoize.Cache=MapCache;module.exports=memoize},{"./_MapCache":55}],266:[function(require,module,exports){var baseMerge=require("./_baseMerge"),createAssigner=require("./_createAssigner");
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */var merge=createAssigner(function(object,source,srcIndex){baseMerge(object,source,srcIndex)});module.exports=merge},{"./_baseMerge":112,"./_createAssigner":147}],267:[function(require,module,exports){var baseExtremum=require("./_baseExtremum"),baseLt=require("./_baseLt"),identity=require("./identity");
/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */function min(array){return array&&array.length?baseExtremum(array,identity,baseLt):undefined}module.exports=min},{"./_baseExtremum":83,"./_baseLt":108,"./identity":241}],268:[function(require,module,exports){var baseExtremum=require("./_baseExtremum"),baseIteratee=require("./_baseIteratee"),baseLt=require("./_baseLt");
/**
 * This method is like `_.min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * // The `_.property` iteratee shorthand.
 * _.minBy(objects, 'n');
 * // => { 'n': 1 }
 */function minBy(array,iteratee){return array&&array.length?baseExtremum(array,baseIteratee(iteratee,2),baseLt):undefined}module.exports=minBy},{"./_baseExtremum":83,"./_baseIteratee":105,"./_baseLt":108}],269:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop(){
// No operation performed.
}module.exports=noop},{}],270:[function(require,module,exports){var root=require("./_root");
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */var now=function(){return root.Date.now()};module.exports=now},{"./_root":208}],271:[function(require,module,exports){var basePick=require("./_basePick"),flatRest=require("./_flatRest");
/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */var pick=flatRest(function(object,paths){return object==null?{}:basePick(object,paths)});module.exports=pick},{"./_basePick":115,"./_flatRest":157}],272:[function(require,module,exports){var baseProperty=require("./_baseProperty"),basePropertyDeep=require("./_basePropertyDeep"),isKey=require("./_isKey"),toKey=require("./_toKey");
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */function property(path){return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path)}module.exports=property},{"./_baseProperty":117,"./_basePropertyDeep":118,"./_isKey":183,"./_toKey":223}],273:[function(require,module,exports){var createRange=require("./_createRange");
/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */var range=createRange();module.exports=range},{"./_createRange":151}],274:[function(require,module,exports){var arrayReduce=require("./_arrayReduce"),baseEach=require("./_baseEach"),baseIteratee=require("./_baseIteratee"),baseReduce=require("./_baseReduce"),isArray=require("./isArray");
/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */function reduce(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduce:baseReduce,initAccum=arguments.length<3;return func(collection,baseIteratee(iteratee,4),accumulator,initAccum,baseEach)}module.exports=reduce},{"./_arrayReduce":71,"./_baseEach":82,"./_baseIteratee":105,"./_baseReduce":120,"./isArray":243}],275:[function(require,module,exports){var baseKeys=require("./_baseKeys"),getTag=require("./_getTag"),isArrayLike=require("./isArrayLike"),isString=require("./isString"),stringSize=require("./_stringSize");
/** `Object#toString` result references. */var mapTag="[object Map]",setTag="[object Set]";
/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */function size(collection){if(collection==null){return 0}if(isArrayLike(collection)){return isString(collection)?stringSize(collection):collection.length}var tag=getTag(collection);if(tag==mapTag||tag==setTag){return collection.size}return baseKeys(collection).length}module.exports=size},{"./_baseKeys":106,"./_getTag":168,"./_stringSize":221,"./isArrayLike":244,"./isString":255}],276:[function(require,module,exports){var baseFlatten=require("./_baseFlatten"),baseOrderBy=require("./_baseOrderBy"),baseRest=require("./_baseRest"),isIterateeCall=require("./_isIterateeCall");
/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */var sortBy=baseRest(function(collection,iteratees){if(collection==null){return[]}var length=iteratees.length;if(length>1&&isIterateeCall(collection,iteratees[0],iteratees[1])){iteratees=[]}else if(length>2&&isIterateeCall(iteratees[0],iteratees[1],iteratees[2])){iteratees=[iteratees[0]]}return baseOrderBy(collection,baseFlatten(iteratees,1),[])});module.exports=sortBy},{"./_baseFlatten":86,"./_baseOrderBy":114,"./_baseRest":121,"./_isIterateeCall":182}],277:[function(require,module,exports){
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray(){return[]}module.exports=stubArray},{}],278:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse(){return false}module.exports=stubFalse},{}],279:[function(require,module,exports){var toNumber=require("./toNumber");
/** Used as references for various `Number` constants. */var INFINITY=1/0,MAX_INTEGER=17976931348623157e292;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */function toFinite(value){if(!value){return value===0?value:0}value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=value<0?-1:1;return sign*MAX_INTEGER}return value===value?value:0}module.exports=toFinite},{"./toNumber":281}],280:[function(require,module,exports){var toFinite=require("./toFinite");
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */function toInteger(value){var result=toFinite(value),remainder=result%1;return result===result?remainder?result-remainder:result:0}module.exports=toInteger},{"./toFinite":279}],281:[function(require,module,exports){var isObject=require("./isObject"),isSymbol=require("./isSymbol");
/** Used as references for various `Number` constants. */var NAN=0/0;
/** Used to match leading and trailing whitespace. */var reTrim=/^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */var reIsBinary=/^0b[01]+$/i;
/** Used to detect octal string values. */var reIsOctal=/^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */var freeParseInt=parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */function toNumber(value){if(typeof value=="number"){return value}if(isSymbol(value)){return NAN}if(isObject(value)){var other=typeof value.valueOf=="function"?value.valueOf():value;value=isObject(other)?other+"":other}if(typeof value!="string"){return value===0?value:+value}value=value.replace(reTrim,"");var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value}module.exports=toNumber},{"./isObject":251,"./isSymbol":256}],282:[function(require,module,exports){var copyObject=require("./_copyObject"),keysIn=require("./keysIn");
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */function toPlainObject(value){return copyObject(value,keysIn(value))}module.exports=toPlainObject},{"./_copyObject":143,"./keysIn":260}],283:[function(require,module,exports){var baseToString=require("./_baseToString");
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */function toString(value){return value==null?"":baseToString(value)}module.exports=toString},{"./_baseToString":126}],284:[function(require,module,exports){var arrayEach=require("./_arrayEach"),baseCreate=require("./_baseCreate"),baseForOwn=require("./_baseForOwn"),baseIteratee=require("./_baseIteratee"),getPrototype=require("./_getPrototype"),isArray=require("./isArray"),isBuffer=require("./isBuffer"),isFunction=require("./isFunction"),isObject=require("./isObject"),isTypedArray=require("./isTypedArray");
/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */function transform(object,iteratee,accumulator){var isArr=isArray(object),isArrLike=isArr||isBuffer(object)||isTypedArray(object);iteratee=baseIteratee(iteratee,4);if(accumulator==null){var Ctor=object&&object.constructor;if(isArrLike){accumulator=isArr?new Ctor:[]}else if(isObject(object)){accumulator=isFunction(Ctor)?baseCreate(getPrototype(object)):{}}else{accumulator={}}}(isArrLike?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object)});return accumulator}module.exports=transform},{"./_arrayEach":64,"./_baseCreate":81,"./_baseForOwn":88,"./_baseIteratee":105,"./_getPrototype":164,"./isArray":243,"./isBuffer":246,"./isFunction":248,"./isObject":251,"./isTypedArray":257}],285:[function(require,module,exports){var baseFlatten=require("./_baseFlatten"),baseRest=require("./_baseRest"),baseUniq=require("./_baseUniq"),isArrayLikeObject=require("./isArrayLikeObject");
/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */var union=baseRest(function(arrays){return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true))});module.exports=union},{"./_baseFlatten":86,"./_baseRest":121,"./_baseUniq":128,"./isArrayLikeObject":245}],286:[function(require,module,exports){var toString=require("./toString");
/** Used to generate unique IDs. */var idCounter=0;
/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */function uniqueId(prefix){var id=++idCounter;return toString(prefix)+id}module.exports=uniqueId},{"./toString":283}],287:[function(require,module,exports){var baseValues=require("./_baseValues"),keys=require("./keys");
/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */function values(object){return object==null?[]:baseValues(object,keys(object))}module.exports=values},{"./_baseValues":129,"./keys":259}],288:[function(require,module,exports){var assignValue=require("./_assignValue"),baseZipObject=require("./_baseZipObject");
/**
 * This method is like `_.fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 0.4.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject(['a', 'b'], [1, 2]);
 * // => { 'a': 1, 'b': 2 }
 */function zipObject(props,values){return baseZipObject(props||[],values||[],assignValue)}module.exports=zipObject},{"./_assignValue":75,"./_baseZipObject":130}]},{},[1])(1)});

;(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("dagre"));
	else if(typeof define === 'function' && define.amd)
		define(["dagre"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeDagre"] = factory(require("dagre"));
	else
		root["cytoscapeDagre"] = factory(root["dagre"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isFunction = function isFunction(o) {
  return typeof o === 'function';
};
var defaults = __webpack_require__(2);
var assign = __webpack_require__(1);
var dagre = __webpack_require__(4);

// constructor
// options : object containing layout options
function DagreLayout(options) {
  this.options = assign({}, defaults, options);
}

// runs the layout
DagreLayout.prototype.run = function () {
  var options = this.options;
  var layout = this;

  var cy = options.cy; // cy is automatically populated for us in the constructor
  var eles = options.eles;

  var getVal = function getVal(ele, val) {
    return isFunction(val) ? val.apply(ele, [ele]) : val;
  };

  var bb = options.boundingBox || { x1: 0, y1: 0, w: cy.width(), h: cy.height() };
  if (bb.x2 === undefined) {
    bb.x2 = bb.x1 + bb.w;
  }
  if (bb.w === undefined) {
    bb.w = bb.x2 - bb.x1;
  }
  if (bb.y2 === undefined) {
    bb.y2 = bb.y1 + bb.h;
  }
  if (bb.h === undefined) {
    bb.h = bb.y2 - bb.y1;
  }

  var g = new dagre.graphlib.Graph({
    multigraph: true,
    compound: true
  });

  var gObj = {};
  var setGObj = function setGObj(name, val) {
    if (val != null) {
      gObj[name] = val;
    }
  };

  setGObj('nodesep', options.nodeSep);
  setGObj('edgesep', options.edgeSep);
  setGObj('ranksep', options.rankSep);
  setGObj('rankdir', options.rankDir);
  setGObj('ranker', options.ranker);

  g.setGraph(gObj);

  g.setDefaultEdgeLabel(function () {
    return {};
  });
  g.setDefaultNodeLabel(function () {
    return {};
  });

  // add nodes to dagre
  var nodes = eles.nodes();
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var nbb = node.layoutDimensions(options);

    g.setNode(node.id(), {
      width: nbb.w,
      height: nbb.h,
      name: node.id()
    });

    // console.log( g.node(node.id()) );
  }

  // set compound parents
  for (var _i = 0; _i < nodes.length; _i++) {
    var _node = nodes[_i];

    if (_node.isChild()) {
      g.setParent(_node.id(), _node.parent().id());
    }
  }

  // add edges to dagre
  var edges = eles.edges().stdFilter(function (edge) {
    return !edge.source().isParent() && !edge.target().isParent(); // dagre can't handle edges on compound nodes
  });
  for (var _i2 = 0; _i2 < edges.length; _i2++) {
    var edge = edges[_i2];

    g.setEdge(edge.source().id(), edge.target().id(), {
      minlen: getVal(edge, options.minLen),
      weight: getVal(edge, options.edgeWeight),
      name: edge.id()
    }, edge.id());

    // console.log( g.edge(edge.source().id(), edge.target().id(), edge.id()) );
  }

  dagre.layout(g);

  var gNodeIds = g.nodes();
  for (var _i3 = 0; _i3 < gNodeIds.length; _i3++) {
    var id = gNodeIds[_i3];
    var n = g.node(id);

    cy.getElementById(id).scratch().dagre = n;
  }

  var dagreBB = void 0;

  if (options.boundingBox) {
    dagreBB = { x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity };
    nodes.forEach(function (node) {
      var dModel = node.scratch().dagre;

      dagreBB.x1 = Math.min(dagreBB.x1, dModel.x);
      dagreBB.x2 = Math.max(dagreBB.x2, dModel.x);

      dagreBB.y1 = Math.min(dagreBB.y1, dModel.y);
      dagreBB.y2 = Math.max(dagreBB.y2, dModel.y);
    });

    dagreBB.w = dagreBB.x2 - dagreBB.x1;
    dagreBB.h = dagreBB.y2 - dagreBB.y1;
  } else {
    dagreBB = bb;
  }

  var constrainPos = function constrainPos(p) {
    if (options.boundingBox) {
      var xPct = dagreBB.w === 0 ? 0 : (p.x - dagreBB.x1) / dagreBB.w;
      var yPct = dagreBB.h === 0 ? 0 : (p.y - dagreBB.y1) / dagreBB.h;

      return {
        x: bb.x1 + xPct * bb.w,
        y: bb.y1 + yPct * bb.h
      };
    } else {
      return p;
    }
  };

  nodes.layoutPositions(layout, options, function (ele) {
    ele = (typeof ele === 'undefined' ? 'undefined' : _typeof(ele)) === "object" ? ele : this;
    var dModel = ele.scratch().dagre;

    return constrainPos({
      x: dModel.x,
      y: dModel.y
    });
  });

  return this; // chaining
};

module.exports = DagreLayout;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = {
  // dagre algo options, uses default value on undefined
  nodeSep: undefined, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: undefined, // the separation between adjacent nodes in the same rank
  rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
  ranker: undefined, // Type of algorithm to assigns a rank to each node in the input graph.
  // Possible values: network-simplex, tight-tree or longest-path
  minLen: function minLen(edge) {
    return 1;
  }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function edgeWeight(edge) {
    return 1;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges

  // general layout options
  fit: true, // whether to fit to viewport
  padding: 30, // fit padding
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  animate: false, // whether to transition the node positions
  animateFilter: function animateFilter(node, i) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform: function transform(node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position
  ready: function ready() {}, // on layoutready
  stop: function stop() {} // on layoutstop
};

module.exports = defaults;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'dagre', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});
;