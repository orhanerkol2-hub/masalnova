(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function L2(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Ch={exports:{}},qo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h1;function N2(){if(h1)return qo;h1=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:h,ref:l!==void 0?l:null,props:c}}return qo.Fragment=e,qo.jsx=i,qo.jsxs=i,qo}var d1;function O2(){return d1||(d1=1,Ch.exports=N2()),Ch.exports}var be=O2(),Dh={exports:{}},dt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p1;function P2(){if(p1)return dt;p1=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function S(O){return O===null||typeof O!="object"?null:(O=g&&O[g]||O["@@iterator"],typeof O=="function"?O:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,y={};function M(O,Q,Se){this.props=O,this.context=Q,this.refs=y,this.updater=Se||A}M.prototype.isReactComponent={},M.prototype.setState=function(O,Q){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,Q,"setState")},M.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function N(){}N.prototype=M.prototype;function z(O,Q,Se){this.props=O,this.context=Q,this.refs=y,this.updater=Se||A}var R=z.prototype=new N;R.constructor=z,D(R,M.prototype),R.isPureReactComponent=!0;var F=Array.isArray;function U(){}var P={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function L(O,Q,Se){var Te=Se.ref;return{$$typeof:s,type:O,key:Q,ref:Te!==void 0?Te:null,props:Se}}function H(O,Q){return L(O.type,Q,O.props)}function k(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function W(O){var Q={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Se){return Q[Se]})}var ce=/\/+/g;function ue(O,Q){return typeof O=="object"&&O!==null&&O.key!=null?W(""+O.key):Q.toString(36)}function K(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(U,U):(O.status="pending",O.then(function(Q){O.status==="pending"&&(O.status="fulfilled",O.value=Q)},function(Q){O.status==="pending"&&(O.status="rejected",O.reason=Q)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function B(O,Q,Se,Te,Re){var te=typeof O;(te==="undefined"||te==="boolean")&&(O=null);var fe=!1;if(O===null)fe=!0;else switch(te){case"bigint":case"string":case"number":fe=!0;break;case"object":switch(O.$$typeof){case s:case e:fe=!0;break;case x:return fe=O._init,B(fe(O._payload),Q,Se,Te,Re)}}if(fe)return Re=Re(O),fe=Te===""?"."+ue(O,0):Te,F(Re)?(Se="",fe!=null&&(Se=fe.replace(ce,"$&/")+"/"),B(Re,Q,Se,"",function(et){return et})):Re!=null&&(k(Re)&&(Re=H(Re,Se+(Re.key==null||O&&O.key===Re.key?"":(""+Re.key).replace(ce,"$&/")+"/")+fe)),Q.push(Re)),1;fe=0;var he=Te===""?".":Te+":";if(F(O))for(var Le=0;Le<O.length;Le++)Te=O[Le],te=he+ue(Te,Le),fe+=B(Te,Q,Se,te,Re);else if(Le=S(O),typeof Le=="function")for(O=Le.call(O),Le=0;!(Te=O.next()).done;)Te=Te.value,te=he+ue(Te,Le++),fe+=B(Te,Q,Se,te,Re);else if(te==="object"){if(typeof O.then=="function")return B(K(O),Q,Se,Te,Re);throw Q=String(O),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return fe}function V(O,Q,Se){if(O==null)return O;var Te=[],Re=0;return B(O,Te,"","",function(te){return Q.call(Se,te,Re++)}),Te}function ee(O){if(O._status===-1){var Q=O._result;Q=Q(),Q.then(function(Se){(O._status===0||O._status===-1)&&(O._status=1,O._result=Se)},function(Se){(O._status===0||O._status===-1)&&(O._status=2,O._result=Se)}),O._status===-1&&(O._status=0,O._result=Q)}if(O._status===1)return O._result.default;throw O._result}var _e=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},Ee={map:V,forEach:function(O,Q,Se){V(O,function(){Q.apply(this,arguments)},Se)},count:function(O){var Q=0;return V(O,function(){Q++}),Q},toArray:function(O){return V(O,function(Q){return Q})||[]},only:function(O){if(!k(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return dt.Activity=_,dt.Children=Ee,dt.Component=M,dt.Fragment=i,dt.Profiler=l,dt.PureComponent=z,dt.StrictMode=r,dt.Suspense=m,dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,dt.__COMPILER_RUNTIME={__proto__:null,c:function(O){return P.H.useMemoCache(O)}},dt.cache=function(O){return function(){return O.apply(null,arguments)}},dt.cacheSignal=function(){return null},dt.cloneElement=function(O,Q,Se){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var Te=D({},O.props),Re=O.key;if(Q!=null)for(te in Q.key!==void 0&&(Re=""+Q.key),Q)!b.call(Q,te)||te==="key"||te==="__self"||te==="__source"||te==="ref"&&Q.ref===void 0||(Te[te]=Q[te]);var te=arguments.length-2;if(te===1)Te.children=Se;else if(1<te){for(var fe=Array(te),he=0;he<te;he++)fe[he]=arguments[he+2];Te.children=fe}return L(O.type,Re,Te)},dt.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},dt.createElement=function(O,Q,Se){var Te,Re={},te=null;if(Q!=null)for(Te in Q.key!==void 0&&(te=""+Q.key),Q)b.call(Q,Te)&&Te!=="key"&&Te!=="__self"&&Te!=="__source"&&(Re[Te]=Q[Te]);var fe=arguments.length-2;if(fe===1)Re.children=Se;else if(1<fe){for(var he=Array(fe),Le=0;Le<fe;Le++)he[Le]=arguments[Le+2];Re.children=he}if(O&&O.defaultProps)for(Te in fe=O.defaultProps,fe)Re[Te]===void 0&&(Re[Te]=fe[Te]);return L(O,te,Re)},dt.createRef=function(){return{current:null}},dt.forwardRef=function(O){return{$$typeof:p,render:O}},dt.isValidElement=k,dt.lazy=function(O){return{$$typeof:x,_payload:{_status:-1,_result:O},_init:ee}},dt.memo=function(O,Q){return{$$typeof:d,type:O,compare:Q===void 0?null:Q}},dt.startTransition=function(O){var Q=P.T,Se={};P.T=Se;try{var Te=O(),Re=P.S;Re!==null&&Re(Se,Te),typeof Te=="object"&&Te!==null&&typeof Te.then=="function"&&Te.then(U,_e)}catch(te){_e(te)}finally{Q!==null&&Se.types!==null&&(Q.types=Se.types),P.T=Q}},dt.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},dt.use=function(O){return P.H.use(O)},dt.useActionState=function(O,Q,Se){return P.H.useActionState(O,Q,Se)},dt.useCallback=function(O,Q){return P.H.useCallback(O,Q)},dt.useContext=function(O){return P.H.useContext(O)},dt.useDebugValue=function(){},dt.useDeferredValue=function(O,Q){return P.H.useDeferredValue(O,Q)},dt.useEffect=function(O,Q){return P.H.useEffect(O,Q)},dt.useEffectEvent=function(O){return P.H.useEffectEvent(O)},dt.useId=function(){return P.H.useId()},dt.useImperativeHandle=function(O,Q,Se){return P.H.useImperativeHandle(O,Q,Se)},dt.useInsertionEffect=function(O,Q){return P.H.useInsertionEffect(O,Q)},dt.useLayoutEffect=function(O,Q){return P.H.useLayoutEffect(O,Q)},dt.useMemo=function(O,Q){return P.H.useMemo(O,Q)},dt.useOptimistic=function(O,Q){return P.H.useOptimistic(O,Q)},dt.useReducer=function(O,Q,Se){return P.H.useReducer(O,Q,Se)},dt.useRef=function(O){return P.H.useRef(O)},dt.useState=function(O){return P.H.useState(O)},dt.useSyncExternalStore=function(O,Q,Se){return P.H.useSyncExternalStore(O,Q,Se)},dt.useTransition=function(){return P.H.useTransition()},dt.version="19.2.0",dt}var m1;function l0(){return m1||(m1=1,Dh.exports=P2()),Dh.exports}var T=l0();const I2=L2(T);var Uh={exports:{}},Yo={},Lh={exports:{}},Nh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g1;function F2(){return g1||(g1=1,(function(s){function e(B,V){var ee=B.length;B.push(V);e:for(;0<ee;){var _e=ee-1>>>1,Ee=B[_e];if(0<l(Ee,V))B[_e]=V,B[ee]=Ee,ee=_e;else break e}}function i(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var V=B[0],ee=B.pop();if(ee!==V){B[0]=ee;e:for(var _e=0,Ee=B.length,O=Ee>>>1;_e<O;){var Q=2*(_e+1)-1,Se=B[Q],Te=Q+1,Re=B[Te];if(0>l(Se,ee))Te<Ee&&0>l(Re,Se)?(B[_e]=Re,B[Te]=ee,_e=Te):(B[_e]=Se,B[Q]=ee,_e=Q);else if(Te<Ee&&0>l(Re,ee))B[_e]=Re,B[Te]=ee,_e=Te;else break e}}return V}function l(B,V){var ee=B.sortIndex-V.sortIndex;return ee!==0?ee:B.id-V.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var h=Date,p=h.now();s.unstable_now=function(){return h.now()-p}}var m=[],d=[],x=1,_=null,g=3,S=!1,A=!1,D=!1,y=!1,M=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function R(B){for(var V=i(d);V!==null;){if(V.callback===null)r(d);else if(V.startTime<=B)r(d),V.sortIndex=V.expirationTime,e(m,V);else break;V=i(d)}}function F(B){if(D=!1,R(B),!A)if(i(m)!==null)A=!0,U||(U=!0,W());else{var V=i(d);V!==null&&K(F,V.startTime-B)}}var U=!1,P=-1,b=5,L=-1;function H(){return y?!0:!(s.unstable_now()-L<b)}function k(){if(y=!1,U){var B=s.unstable_now();L=B;var V=!0;try{e:{A=!1,D&&(D=!1,N(P),P=-1),S=!0;var ee=g;try{t:{for(R(B),_=i(m);_!==null&&!(_.expirationTime>B&&H());){var _e=_.callback;if(typeof _e=="function"){_.callback=null,g=_.priorityLevel;var Ee=_e(_.expirationTime<=B);if(B=s.unstable_now(),typeof Ee=="function"){_.callback=Ee,R(B),V=!0;break t}_===i(m)&&r(m),R(B)}else r(m);_=i(m)}if(_!==null)V=!0;else{var O=i(d);O!==null&&K(F,O.startTime-B),V=!1}}break e}finally{_=null,g=ee,S=!1}V=void 0}}finally{V?W():U=!1}}}var W;if(typeof z=="function")W=function(){z(k)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,ue=ce.port2;ce.port1.onmessage=k,W=function(){ue.postMessage(null)}}else W=function(){M(k,0)};function K(B,V){P=M(function(){B(s.unstable_now())},V)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_next=function(B){switch(g){case 1:case 2:case 3:var V=3;break;default:V=g}var ee=g;g=V;try{return B()}finally{g=ee}},s.unstable_requestPaint=function(){y=!0},s.unstable_runWithPriority=function(B,V){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ee=g;g=B;try{return V()}finally{g=ee}},s.unstable_scheduleCallback=function(B,V,ee){var _e=s.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?_e+ee:_e):ee=_e,B){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=ee+Ee,B={id:x++,callback:V,priorityLevel:B,startTime:ee,expirationTime:Ee,sortIndex:-1},ee>_e?(B.sortIndex=ee,e(d,B),i(m)===null&&B===i(d)&&(D?(N(P),P=-1):D=!0,K(F,ee-_e))):(B.sortIndex=Ee,e(m,B),A||S||(A=!0,U||(U=!0,W()))),B},s.unstable_shouldYield=H,s.unstable_wrapCallback=function(B){var V=g;return function(){var ee=g;g=V;try{return B.apply(this,arguments)}finally{g=ee}}}})(Nh)),Nh}var _1;function z2(){return _1||(_1=1,Lh.exports=F2()),Lh.exports}var Oh={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v1;function B2(){if(v1)return Fn;v1=1;var s=l0();function e(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)d+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,x){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:d,implementation:x}}var h=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Fn.createPortal=function(m,d){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return c(m,d,null,x)},Fn.flushSync=function(m){var d=h.T,x=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=d,r.p=x,r.d.f()}},Fn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,r.d.C(m,d))},Fn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Fn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var x=d.as,_=p(x,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,S=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;x==="style"?r.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:S}):x==="script"&&r.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:S,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Fn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var x=p(d.as,d.crossOrigin);r.d.M(m,{crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&r.d.M(m)},Fn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var x=d.as,_=p(x,d.crossOrigin);r.d.L(m,x,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Fn.preloadModule=function(m,d){if(typeof m=="string")if(d){var x=p(d.as,d.crossOrigin);r.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else r.d.m(m)},Fn.requestFormReset=function(m){r.d.r(m)},Fn.unstable_batchedUpdates=function(m,d){return m(d)},Fn.useFormState=function(m,d,x){return h.H.useFormState(m,d,x)},Fn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Fn.version="19.2.0",Fn}var x1;function H2(){if(x1)return Oh.exports;x1=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Oh.exports=B2(),Oh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var M1;function V2(){if(M1)return Yo;M1=1;var s=z2(),e=l0(),i=H2();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function d(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var v=!1,C=u.child;C;){if(C===a){v=!0,a=u,o=f;break}if(C===o){v=!0,o=u,a=f;break}C=C.sibling}if(!v){for(C=f.child;C;){if(C===a){v=!0,a=f,o=u;break}if(C===o){v=!0,o=f,a=u;break}C=C.sibling}if(!v)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function x(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=x(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),z=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),H=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Symbol.for("react.client.reference");function ue(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ce?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case D:return"Fragment";case M:return"Profiler";case y:return"StrictMode";case F:return"Suspense";case U:return"SuspenseList";case L:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case A:return"Portal";case z:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case R:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case P:return n=t.displayName||null,n!==null?n:ue(t.type)||"Memo";case b:n=t._payload,t=t._init;try{return ue(t(n))}catch{}}return null}var K=Array.isArray,B=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},_e=[],Ee=-1;function O(t){return{current:t}}function Q(t){0>Ee||(t.current=_e[Ee],_e[Ee]=null,Ee--)}function Se(t,n){Ee++,_e[Ee]=t.current,t.current=n}var Te=O(null),Re=O(null),te=O(null),fe=O(null);function he(t,n){switch(Se(te,n),Se(Re,t),Se(Te,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Pg(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Pg(n),t=Ig(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Te),Se(Te,t)}function Le(){Q(Te),Q(Re),Q(te)}function et(t){t.memoizedState!==null&&Se(fe,t);var n=Te.current,a=Ig(n,t.type);n!==a&&(Se(Re,t),Se(Te,a))}function Pe(t){Re.current===t&&(Q(Te),Q(Re)),fe.current===t&&(Q(fe),ko._currentValue=ee)}var De,He;function je(t){if(De===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);De=n&&n[1]||"",He=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+De+t+He}var mt=!1;function ot(t,n){if(!t||mt)return"";mt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ye=function(){throw Error()};if(Object.defineProperty(ye.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ye,[])}catch(de){var le=de}Reflect.construct(t,[],ye)}else{try{ye.call()}catch(de){le=de}t.call(ye.prototype)}}else{try{throw Error()}catch(de){le=de}(ye=t())&&typeof ye.catch=="function"&&ye.catch(function(){})}}catch(de){if(de&&le&&typeof de.stack=="string")return[de.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),v=f[0],C=f[1];if(v&&C){var G=v.split(`
`),ie=C.split(`
`);for(u=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ie.length&&!ie[u].includes("DetermineComponentFrameRoot");)u++;if(o===G.length||u===ie.length)for(o=G.length-1,u=ie.length-1;1<=o&&0<=u&&G[o]!==ie[u];)u--;for(;1<=o&&0<=u;o--,u--)if(G[o]!==ie[u]){if(o!==1||u!==1)do if(o--,u--,0>u||G[o]!==ie[u]){var ve=`
`+G[o].replace(" at new "," at ");return t.displayName&&ve.includes("<anonymous>")&&(ve=ve.replace("<anonymous>",t.displayName)),ve}while(1<=o&&0<=u);break}}}finally{mt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?je(a):""}function Lt(t,n){switch(t.tag){case 26:case 27:case 5:return je(t.type);case 16:return je("Lazy");case 13:return t.child!==n&&n!==null?je("Suspense Fallback"):je("Suspense");case 19:return je("SuspenseList");case 0:case 15:return ot(t.type,!1);case 11:return ot(t.type.render,!1);case 1:return ot(t.type,!0);case 31:return je("Activity");default:return""}}function We(t){try{var n="",a=null;do n+=Lt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ft=Object.prototype.hasOwnProperty,Mt=s.unstable_scheduleCallback,zt=s.unstable_cancelCallback,$t=s.unstable_shouldYield,q=s.unstable_requestPaint,It=s.unstable_now,ct=s.unstable_getCurrentPriorityLevel,I=s.unstable_ImmediatePriority,E=s.unstable_UserBlockingPriority,$=s.unstable_NormalPriority,se=s.unstable_LowPriority,me=s.unstable_IdlePriority,we=s.log,Oe=s.unstable_setDisableYieldValue,pe=null,ge=null;function Ue(t){if(typeof we=="function"&&Oe(t),ge&&typeof ge.setStrictMode=="function")try{ge.setStrictMode(pe,t)}catch{}}var ke=Math.clz32?Math.clz32:it,ze=Math.log,Ie=Math.LN2;function it(t){return t>>>=0,t===0?32:31-(ze(t)/Ie|0)|0}var at=256,ht=262144,Z=4194304;function Ce(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function xe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,v=t.pingedLanes;t=t.warmLanes;var C=o&134217727;return C!==0?(o=C&~f,o!==0?u=Ce(o):(v&=C,v!==0?u=Ce(v):a||(a=C&~t,a!==0&&(u=Ce(a))))):(C=o&~f,C!==0?u=Ce(C):v!==0?u=Ce(v):a||(a=o&~t,a!==0&&(u=Ce(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Ne(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ge(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ae(){var t=Z;return Z<<=1,(Z&62914560)===0&&(Z=4194304),t}function Je(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function qe(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function nn(t,n,a,o,u,f){var v=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,G=t.expirationTimes,ie=t.hiddenUpdates;for(a=v&~a;0<a;){var ve=31-ke(a),ye=1<<ve;C[ve]=0,G[ve]=-1;var le=ie[ve];if(le!==null)for(ie[ve]=null,ve=0;ve<le.length;ve++){var de=le[ve];de!==null&&(de.lane&=-536870913)}a&=~ye}o!==0&&Ht(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(v&~n))}function Ht(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ke(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function ei(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ke(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ti(t,n){var a=n&-n;return a=(a&42)!==0?1:no(a),(a&(t.suspendedLanes|n))!==0?0:a}function no(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function io(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ao(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:r1(t.type))}function Qr(t,n){var a=V.p;try{return V.p=t,n()}finally{V.p=a}}var zi=Math.random().toString(36).slice(2),pn="__reactFiber$"+zi,wn="__reactProps$"+zi,Zn="__reactContainer$"+zi,gr="__reactEvents$"+zi,_l="__reactListeners$"+zi,vl="__reactHandles$"+zi,_r="__reactResources$"+zi,Ua="__reactMarker$"+zi;function La(t){delete t[pn],delete t[wn],delete t[gr],delete t[_l],delete t[vl]}function ea(t){var n=t[pn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Zn]||a[pn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=kg(t);t!==null;){if(a=t[pn])return a;t=kg(t)}return n}t=a,a=t.parentNode}return null}function ta(t){if(t=t[pn]||t[Zn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function vr(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function Na(t){var n=t[_r];return n||(n=t[_r]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function mn(t){t[Ua]=!0}var xl=new Set,w={};function Y(t,n){oe(t,n),oe(t+"Capture",n)}function oe(t,n){for(w[t]=n,t=0;t<n.length;t++)xl.add(n[t])}var ae=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),re={},Be={};function Ze(t){return ft.call(Be,t)?!0:ft.call(re,t)?!1:ae.test(t)?Be[t]=!0:(re[t]=!0,!1)}function Fe(t,n,a){if(Ze(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ke(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ye(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function rt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function gt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function tt(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){a=""+v,f.call(this,v)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(v){a=""+v},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Nt(t){if(!t._valueTracker){var n=gt(t)?"checked":"value";t._valueTracker=tt(t,n,""+t[n])}}function an(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=gt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function jt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Vt=/[\n"\\]/g;function Gt(t){return t.replace(Vt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Xe(t,n,a,o,u,f,v,C){t.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?t.type=v:t.removeAttribute("type"),n!=null?v==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+rt(n)):t.value!==""+rt(n)&&(t.value=""+rt(n)):v!=="submit"&&v!=="reset"||t.removeAttribute("value"),n!=null?St(t,v,rt(n)):a!=null?St(t,v,rt(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+rt(C):t.removeAttribute("name")}function In(t,n,a,o,u,f,v,C){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Nt(t);return}a=a!=null?""+rt(a):"",n=n!=null?""+rt(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=C?t.checked:!!o,t.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(t.name=v),Nt(t)}function St(t,n,a){n==="number"&&jt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Sn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+rt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function ni(t,n,a){if(n!=null&&(n=""+rt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+rt(a):""}function Ri(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(K(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=rt(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Nt(t)}function ii(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var kt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function rn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||kt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function wi(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&rn(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&rn(t,f,n[f])}function Bt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Oa=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xr(t){return Oa.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function na(){}var Au=null;function Tu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var jr=null,Jr=null;function O0(t){var n=ta(t);if(n&&(t=n.stateNode)){var a=t[wn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Xe(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Gt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[wn]||null;if(!u)throw Error(r(90));Xe(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&an(o)}break e;case"textarea":ni(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&Sn(t,!!a.multiple,n,!1)}}}var Ru=!1;function P0(t,n,a){if(Ru)return t(n,a);Ru=!0;try{var o=t(n);return o}finally{if(Ru=!1,(jr!==null||Jr!==null)&&(sc(),jr&&(n=jr,t=Jr,Jr=jr=null,O0(n),t)))for(n=0;n<t.length;n++)O0(t[n])}}function ro(t,n){var a=t.stateNode;if(a===null)return null;var o=a[wn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ia=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wu=!1;if(ia)try{var so={};Object.defineProperty(so,"passive",{get:function(){wu=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{wu=!1}var Pa=null,Cu=null,Ml=null;function I0(){if(Ml)return Ml;var t,n=Cu,a=n.length,o,u="value"in Pa?Pa.value:Pa.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var v=a-t;for(o=1;o<=v&&n[a-o]===u[f-o];o++);return Ml=u.slice(t,1<o?1-o:void 0)}function Sl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function yl(){return!0}function F0(){return!1}function qn(t){function n(a,o,u,f,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(f):f[C]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?yl:F0,this.isPropagationStopped=F0,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=yl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=yl)},persist:function(){},isPersistent:yl}),n}var Mr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},El=qn(Mr),oo=_({},Mr,{view:0,detail:0}),Dv=qn(oo),Du,Uu,lo,bl=_({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(Du=t.screenX-lo.screenX,Uu=t.screenY-lo.screenY):Uu=Du=0,lo=t),Du)},movementY:function(t){return"movementY"in t?t.movementY:Uu}}),z0=qn(bl),Uv=_({},bl,{dataTransfer:0}),Lv=qn(Uv),Nv=_({},oo,{relatedTarget:0}),Lu=qn(Nv),Ov=_({},Mr,{animationName:0,elapsedTime:0,pseudoElement:0}),Pv=qn(Ov),Iv=_({},Mr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Fv=qn(Iv),zv=_({},Mr,{data:0}),B0=qn(zv),Bv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gv(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Vv[t])?!!n[t]:!1}function Nu(){return Gv}var kv=_({},oo,{key:function(t){if(t.key){var n=Bv[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Sl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Hv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nu,charCode:function(t){return t.type==="keypress"?Sl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Sl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Xv=qn(kv),Wv=_({},bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),H0=qn(Wv),Zv=_({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nu}),qv=qn(Zv),Yv=_({},Mr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kv=qn(Yv),Qv=_({},bl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),jv=qn(Qv),Jv=_({},Mr,{newState:0,oldState:0}),$v=qn(Jv),ex=[9,13,27,32],Ou=ia&&"CompositionEvent"in window,co=null;ia&&"documentMode"in document&&(co=document.documentMode);var tx=ia&&"TextEvent"in window&&!co,V0=ia&&(!Ou||co&&8<co&&11>=co),G0=" ",k0=!1;function X0(t,n){switch(t){case"keyup":return ex.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function W0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var $r=!1;function nx(t,n){switch(t){case"compositionend":return W0(n);case"keypress":return n.which!==32?null:(k0=!0,G0);case"textInput":return t=n.data,t===G0&&k0?null:t;default:return null}}function ix(t,n){if($r)return t==="compositionend"||!Ou&&X0(t,n)?(t=I0(),Ml=Cu=Pa=null,$r=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return V0&&n.locale!=="ko"?null:n.data;default:return null}}var ax={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Z0(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!ax[t.type]:n==="textarea"}function q0(t,n,a,o){jr?Jr?Jr.push(o):Jr=[o]:jr=o,n=dc(n,"onChange"),0<n.length&&(a=new El("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var uo=null,fo=null;function rx(t){Cg(t,0)}function Al(t){var n=vr(t);if(an(n))return t}function Y0(t,n){if(t==="change")return n}var K0=!1;if(ia){var Pu;if(ia){var Iu="oninput"in document;if(!Iu){var Q0=document.createElement("div");Q0.setAttribute("oninput","return;"),Iu=typeof Q0.oninput=="function"}Pu=Iu}else Pu=!1;K0=Pu&&(!document.documentMode||9<document.documentMode)}function j0(){uo&&(uo.detachEvent("onpropertychange",J0),fo=uo=null)}function J0(t){if(t.propertyName==="value"&&Al(fo)){var n=[];q0(n,fo,t,Tu(t)),P0(rx,n)}}function sx(t,n,a){t==="focusin"?(j0(),uo=n,fo=a,uo.attachEvent("onpropertychange",J0)):t==="focusout"&&j0()}function ox(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Al(fo)}function lx(t,n){if(t==="click")return Al(n)}function cx(t,n){if(t==="input"||t==="change")return Al(n)}function ux(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:ux;function ho(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ft.call(n,u)||!ai(t[u],n[u]))return!1}return!0}function $0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ep(t,n){var a=$0(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=$0(a)}}function tp(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?tp(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function np(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=jt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=jt(t.document)}return n}function Fu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var fx=ia&&"documentMode"in document&&11>=document.documentMode,es=null,zu=null,po=null,Bu=!1;function ip(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Bu||es==null||es!==jt(o)||(o=es,"selectionStart"in o&&Fu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),po&&ho(po,o)||(po=o,o=dc(zu,"onSelect"),0<o.length&&(n=new El("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=es)))}function Sr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var ts={animationend:Sr("Animation","AnimationEnd"),animationiteration:Sr("Animation","AnimationIteration"),animationstart:Sr("Animation","AnimationStart"),transitionrun:Sr("Transition","TransitionRun"),transitionstart:Sr("Transition","TransitionStart"),transitioncancel:Sr("Transition","TransitionCancel"),transitionend:Sr("Transition","TransitionEnd")},Hu={},ap={};ia&&(ap=document.createElement("div").style,"AnimationEvent"in window||(delete ts.animationend.animation,delete ts.animationiteration.animation,delete ts.animationstart.animation),"TransitionEvent"in window||delete ts.transitionend.transition);function yr(t){if(Hu[t])return Hu[t];if(!ts[t])return t;var n=ts[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in ap)return Hu[t]=n[a];return t}var rp=yr("animationend"),sp=yr("animationiteration"),op=yr("animationstart"),hx=yr("transitionrun"),dx=yr("transitionstart"),px=yr("transitioncancel"),lp=yr("transitionend"),cp=new Map,Vu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Vu.push("scrollEnd");function Ci(t,n){cp.set(t,n),Y(n,[t])}var Tl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},mi=[],ns=0,Gu=0;function Rl(){for(var t=ns,n=Gu=ns=0;n<t;){var a=mi[n];mi[n++]=null;var o=mi[n];mi[n++]=null;var u=mi[n];mi[n++]=null;var f=mi[n];if(mi[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}f!==0&&up(a,u,f)}}function wl(t,n,a,o){mi[ns++]=t,mi[ns++]=n,mi[ns++]=a,mi[ns++]=o,Gu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function ku(t,n,a,o){return wl(t,n,a,o),Cl(t)}function Er(t,n){return wl(t,null,null,n),Cl(t)}function up(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-ke(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function Cl(t){if(50<Io)throw Io=0,$f=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var is={};function mx(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(t,n,a,o){return new mx(t,n,a,o)}function Xu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function aa(t,n){var a=t.alternate;return a===null?(a=ri(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function fp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Dl(t,n,a,o,u,f){var v=0;if(o=t,typeof t=="function")Xu(t)&&(v=1);else if(typeof t=="string")v=M2(t,a,Te.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case L:return t=ri(31,a,n,u),t.elementType=L,t.lanes=f,t;case D:return br(a.children,u,f,n);case y:v=8,u|=24;break;case M:return t=ri(12,a,n,u|2),t.elementType=M,t.lanes=f,t;case F:return t=ri(13,a,n,u),t.elementType=F,t.lanes=f,t;case U:return t=ri(19,a,n,u),t.elementType=U,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case z:v=10;break e;case N:v=9;break e;case R:v=11;break e;case P:v=14;break e;case b:v=16,o=null;break e}v=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=ri(v,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function br(t,n,a,o){return t=ri(7,t,o,n),t.lanes=a,t}function Wu(t,n,a){return t=ri(6,t,null,n),t.lanes=a,t}function hp(t){var n=ri(18,null,null,0);return n.stateNode=t,n}function Zu(t,n,a){return n=ri(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var dp=new WeakMap;function gi(t,n){if(typeof t=="object"&&t!==null){var a=dp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:We(n)},dp.set(t,n),n)}return{value:t,source:n,stack:We(n)}}var as=[],rs=0,Ul=null,mo=0,_i=[],vi=0,Ia=null,Hi=1,Vi="";function ra(t,n){as[rs++]=mo,as[rs++]=Ul,Ul=t,mo=n}function pp(t,n,a){_i[vi++]=Hi,_i[vi++]=Vi,_i[vi++]=Ia,Ia=t;var o=Hi;t=Vi;var u=32-ke(o)-1;o&=~(1<<u),a+=1;var f=32-ke(n)+u;if(30<f){var v=u-u%5;f=(o&(1<<v)-1).toString(32),o>>=v,u-=v,Hi=1<<32-ke(n)+u|a<<u|o,Vi=f+t}else Hi=1<<f|a<<u|o,Vi=t}function qu(t){t.return!==null&&(ra(t,1),pp(t,1,0))}function Yu(t){for(;t===Ul;)Ul=as[--rs],as[rs]=null,mo=as[--rs],as[rs]=null;for(;t===Ia;)Ia=_i[--vi],_i[vi]=null,Vi=_i[--vi],_i[vi]=null,Hi=_i[--vi],_i[vi]=null}function mp(t,n){_i[vi++]=Hi,_i[vi++]=Vi,_i[vi++]=Ia,Hi=n.id,Vi=n.overflow,Ia=t}var Cn=null,en=null,wt=!1,Fa=null,xi=!1,Ku=Error(r(519));function za(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw go(gi(n,t)),Ku}function gp(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[pn]=t,n[wn]=o,a){case"dialog":Et("cancel",n),Et("close",n);break;case"iframe":case"object":case"embed":Et("load",n);break;case"video":case"audio":for(a=0;a<zo.length;a++)Et(zo[a],n);break;case"source":Et("error",n);break;case"img":case"image":case"link":Et("error",n),Et("load",n);break;case"details":Et("toggle",n);break;case"input":Et("invalid",n),In(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Et("invalid",n);break;case"textarea":Et("invalid",n),Ri(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||Ng(n.textContent,a)?(o.popover!=null&&(Et("beforetoggle",n),Et("toggle",n)),o.onScroll!=null&&Et("scroll",n),o.onScrollEnd!=null&&Et("scrollend",n),o.onClick!=null&&(n.onclick=na),n=!0):n=!1,n||za(t,!0)}function _p(t){for(Cn=t.return;Cn;)switch(Cn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:Cn=Cn.return}}function ss(t){if(t!==Cn)return!1;if(!wt)return _p(t),wt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ph(t.type,t.memoizedProps)),a=!a),a&&en&&za(t),_p(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));en=Gg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));en=Gg(t)}else n===27?(n=en,Ja(t.type)?(t=xh,xh=null,en=t):en=n):en=Cn?Si(t.stateNode.nextSibling):null;return!0}function Ar(){en=Cn=null,wt=!1}function Qu(){var t=Fa;return t!==null&&(jn===null?jn=t:jn.push.apply(jn,t),Fa=null),t}function go(t){Fa===null?Fa=[t]:Fa.push(t)}var ju=O(null),Tr=null,sa=null;function Ba(t,n,a){Se(ju,n._currentValue),n._currentValue=a}function oa(t){t._currentValue=ju.current,Q(ju)}function Ju(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function $u(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var v=u.child;f=f.firstContext;e:for(;f!==null;){var C=f;f=u;for(var G=0;G<n.length;G++)if(C.context===n[G]){f.lanes|=a,C=f.alternate,C!==null&&(C.lanes|=a),Ju(f.return,a,t),o||(v=null);break e}f=C.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(r(341));v.lanes|=a,f=v.alternate,f!==null&&(f.lanes|=a),Ju(v,a,t),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===t){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function os(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(r(387));if(v=v.memoizedProps,v!==null){var C=u.type;ai(u.pendingProps.value,v.value)||(t!==null?t.push(C):t=[C])}}else if(u===fe.current){if(v=u.alternate,v===null)throw Error(r(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(ko):t=[ko])}u=u.return}t!==null&&$u(n,t,a,o),n.flags|=262144}function Ll(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Rr(t){Tr=t,sa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Dn(t){return vp(Tr,t)}function Nl(t,n){return Tr===null&&Rr(t),vp(t,n)}function vp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},sa===null){if(t===null)throw Error(r(308));sa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else sa=sa.next=n;return a}var gx=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},_x=s.unstable_scheduleCallback,vx=s.unstable_NormalPriority,gn={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ef(){return{controller:new gx,data:new Map,refCount:0}}function _o(t){t.refCount--,t.refCount===0&&_x(vx,function(){t.controller.abort()})}var vo=null,tf=0,ls=0,cs=null;function xx(t,n){if(vo===null){var a=vo=[];tf=0,ls=rh(),cs={status:"pending",value:void 0,then:function(o){a.push(o)}}}return tf++,n.then(xp,xp),n}function xp(){if(--tf===0&&vo!==null){cs!==null&&(cs.status="fulfilled");var t=vo;vo=null,ls=0,cs=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Mx(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Mp=B.S;B.S=function(t,n){ig=It(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&xx(t,n),Mp!==null&&Mp(t,n)};var wr=O(null);function nf(){var t=wr.current;return t!==null?t:Jt.pooledCache}function Ol(t,n){n===null?Se(wr,wr.current):Se(wr,n.pool)}function Sp(){var t=nf();return t===null?null:{parent:gn._currentValue,pool:t}}var us=Error(r(460)),af=Error(r(474)),Pl=Error(r(542)),Il={then:function(){}};function yp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ep(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(na,na),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Ap(t),t;default:if(typeof n.status=="string")n.then(na,na);else{if(t=Jt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Ap(t),t}throw Dr=n,us}}function Cr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Dr=a,us):a}}var Dr=null;function bp(){if(Dr===null)throw Error(r(459));var t=Dr;return Dr=null,t}function Ap(t){if(t===us||t===Pl)throw Error(r(483))}var fs=null,xo=0;function Fl(t){var n=xo;return xo+=1,fs===null&&(fs=[]),Ep(fs,t,n)}function Mo(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function zl(t,n){throw n.$$typeof===g?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Tp(t){function n(J,X){if(t){var ne=J.deletions;ne===null?(J.deletions=[X],J.flags|=16):ne.push(X)}}function a(J,X){if(!t)return null;for(;X!==null;)n(J,X),X=X.sibling;return null}function o(J){for(var X=new Map;J!==null;)J.key!==null?X.set(J.key,J):X.set(J.index,J),J=J.sibling;return X}function u(J,X){return J=aa(J,X),J.index=0,J.sibling=null,J}function f(J,X,ne){return J.index=ne,t?(ne=J.alternate,ne!==null?(ne=ne.index,ne<X?(J.flags|=67108866,X):ne):(J.flags|=67108866,X)):(J.flags|=1048576,X)}function v(J){return t&&J.alternate===null&&(J.flags|=67108866),J}function C(J,X,ne,Me){return X===null||X.tag!==6?(X=Wu(ne,J.mode,Me),X.return=J,X):(X=u(X,ne),X.return=J,X)}function G(J,X,ne,Me){var st=ne.type;return st===D?ve(J,X,ne.props.children,Me,ne.key):X!==null&&(X.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===b&&Cr(st)===X.type)?(X=u(X,ne.props),Mo(X,ne),X.return=J,X):(X=Dl(ne.type,ne.key,ne.props,null,J.mode,Me),Mo(X,ne),X.return=J,X)}function ie(J,X,ne,Me){return X===null||X.tag!==4||X.stateNode.containerInfo!==ne.containerInfo||X.stateNode.implementation!==ne.implementation?(X=Zu(ne,J.mode,Me),X.return=J,X):(X=u(X,ne.children||[]),X.return=J,X)}function ve(J,X,ne,Me,st){return X===null||X.tag!==7?(X=br(ne,J.mode,Me,st),X.return=J,X):(X=u(X,ne),X.return=J,X)}function ye(J,X,ne){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Wu(""+X,J.mode,ne),X.return=J,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case S:return ne=Dl(X.type,X.key,X.props,null,J.mode,ne),Mo(ne,X),ne.return=J,ne;case A:return X=Zu(X,J.mode,ne),X.return=J,X;case b:return X=Cr(X),ye(J,X,ne)}if(K(X)||W(X))return X=br(X,J.mode,ne,null),X.return=J,X;if(typeof X.then=="function")return ye(J,Fl(X),ne);if(X.$$typeof===z)return ye(J,Nl(J,X),ne);zl(J,X)}return null}function le(J,X,ne,Me){var st=X!==null?X.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number"||typeof ne=="bigint")return st!==null?null:C(J,X,""+ne,Me);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case S:return ne.key===st?G(J,X,ne,Me):null;case A:return ne.key===st?ie(J,X,ne,Me):null;case b:return ne=Cr(ne),le(J,X,ne,Me)}if(K(ne)||W(ne))return st!==null?null:ve(J,X,ne,Me,null);if(typeof ne.then=="function")return le(J,X,Fl(ne),Me);if(ne.$$typeof===z)return le(J,X,Nl(J,ne),Me);zl(J,ne)}return null}function de(J,X,ne,Me,st){if(typeof Me=="string"&&Me!==""||typeof Me=="number"||typeof Me=="bigint")return J=J.get(ne)||null,C(X,J,""+Me,st);if(typeof Me=="object"&&Me!==null){switch(Me.$$typeof){case S:return J=J.get(Me.key===null?ne:Me.key)||null,G(X,J,Me,st);case A:return J=J.get(Me.key===null?ne:Me.key)||null,ie(X,J,Me,st);case b:return Me=Cr(Me),de(J,X,ne,Me,st)}if(K(Me)||W(Me))return J=J.get(ne)||null,ve(X,J,Me,st,null);if(typeof Me.then=="function")return de(J,X,ne,Fl(Me),st);if(Me.$$typeof===z)return de(J,X,ne,Nl(X,Me),st);zl(X,Me)}return null}function Qe(J,X,ne,Me){for(var st=null,Ot=null,$e=X,vt=X=0,Rt=null;$e!==null&&vt<ne.length;vt++){$e.index>vt?(Rt=$e,$e=null):Rt=$e.sibling;var Pt=le(J,$e,ne[vt],Me);if(Pt===null){$e===null&&($e=Rt);break}t&&$e&&Pt.alternate===null&&n(J,$e),X=f(Pt,X,vt),Ot===null?st=Pt:Ot.sibling=Pt,Ot=Pt,$e=Rt}if(vt===ne.length)return a(J,$e),wt&&ra(J,vt),st;if($e===null){for(;vt<ne.length;vt++)$e=ye(J,ne[vt],Me),$e!==null&&(X=f($e,X,vt),Ot===null?st=$e:Ot.sibling=$e,Ot=$e);return wt&&ra(J,vt),st}for($e=o($e);vt<ne.length;vt++)Rt=de($e,J,vt,ne[vt],Me),Rt!==null&&(t&&Rt.alternate!==null&&$e.delete(Rt.key===null?vt:Rt.key),X=f(Rt,X,vt),Ot===null?st=Rt:Ot.sibling=Rt,Ot=Rt);return t&&$e.forEach(function(ir){return n(J,ir)}),wt&&ra(J,vt),st}function lt(J,X,ne,Me){if(ne==null)throw Error(r(151));for(var st=null,Ot=null,$e=X,vt=X=0,Rt=null,Pt=ne.next();$e!==null&&!Pt.done;vt++,Pt=ne.next()){$e.index>vt?(Rt=$e,$e=null):Rt=$e.sibling;var ir=le(J,$e,Pt.value,Me);if(ir===null){$e===null&&($e=Rt);break}t&&$e&&ir.alternate===null&&n(J,$e),X=f(ir,X,vt),Ot===null?st=ir:Ot.sibling=ir,Ot=ir,$e=Rt}if(Pt.done)return a(J,$e),wt&&ra(J,vt),st;if($e===null){for(;!Pt.done;vt++,Pt=ne.next())Pt=ye(J,Pt.value,Me),Pt!==null&&(X=f(Pt,X,vt),Ot===null?st=Pt:Ot.sibling=Pt,Ot=Pt);return wt&&ra(J,vt),st}for($e=o($e);!Pt.done;vt++,Pt=ne.next())Pt=de($e,J,vt,Pt.value,Me),Pt!==null&&(t&&Pt.alternate!==null&&$e.delete(Pt.key===null?vt:Pt.key),X=f(Pt,X,vt),Ot===null?st=Pt:Ot.sibling=Pt,Ot=Pt);return t&&$e.forEach(function(U2){return n(J,U2)}),wt&&ra(J,vt),st}function Qt(J,X,ne,Me){if(typeof ne=="object"&&ne!==null&&ne.type===D&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case S:e:{for(var st=ne.key;X!==null;){if(X.key===st){if(st=ne.type,st===D){if(X.tag===7){a(J,X.sibling),Me=u(X,ne.props.children),Me.return=J,J=Me;break e}}else if(X.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===b&&Cr(st)===X.type){a(J,X.sibling),Me=u(X,ne.props),Mo(Me,ne),Me.return=J,J=Me;break e}a(J,X);break}else n(J,X);X=X.sibling}ne.type===D?(Me=br(ne.props.children,J.mode,Me,ne.key),Me.return=J,J=Me):(Me=Dl(ne.type,ne.key,ne.props,null,J.mode,Me),Mo(Me,ne),Me.return=J,J=Me)}return v(J);case A:e:{for(st=ne.key;X!==null;){if(X.key===st)if(X.tag===4&&X.stateNode.containerInfo===ne.containerInfo&&X.stateNode.implementation===ne.implementation){a(J,X.sibling),Me=u(X,ne.children||[]),Me.return=J,J=Me;break e}else{a(J,X);break}else n(J,X);X=X.sibling}Me=Zu(ne,J.mode,Me),Me.return=J,J=Me}return v(J);case b:return ne=Cr(ne),Qt(J,X,ne,Me)}if(K(ne))return Qe(J,X,ne,Me);if(W(ne)){if(st=W(ne),typeof st!="function")throw Error(r(150));return ne=st.call(ne),lt(J,X,ne,Me)}if(typeof ne.then=="function")return Qt(J,X,Fl(ne),Me);if(ne.$$typeof===z)return Qt(J,X,Nl(J,ne),Me);zl(J,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"||typeof ne=="bigint"?(ne=""+ne,X!==null&&X.tag===6?(a(J,X.sibling),Me=u(X,ne),Me.return=J,J=Me):(a(J,X),Me=Wu(ne,J.mode,Me),Me.return=J,J=Me),v(J)):a(J,X)}return function(J,X,ne,Me){try{xo=0;var st=Qt(J,X,ne,Me);return fs=null,st}catch($e){if($e===us||$e===Pl)throw $e;var Ot=ri(29,$e,null,J.mode);return Ot.lanes=Me,Ot.return=J,Ot}finally{}}}var Ur=Tp(!0),Rp=Tp(!1),Ha=!1;function rf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function sf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Va(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ga(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Ft&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Cl(t),up(t,null,a),n}return wl(t,o,n,a),Cl(t)}function So(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}function of(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var lf=!1;function yo(){if(lf){var t=cs;if(t!==null)throw t}}function Eo(t,n,a,o){lf=!1;var u=t.updateQueue;Ha=!1;var f=u.firstBaseUpdate,v=u.lastBaseUpdate,C=u.shared.pending;if(C!==null){u.shared.pending=null;var G=C,ie=G.next;G.next=null,v===null?f=ie:v.next=ie,v=G;var ve=t.alternate;ve!==null&&(ve=ve.updateQueue,C=ve.lastBaseUpdate,C!==v&&(C===null?ve.firstBaseUpdate=ie:C.next=ie,ve.lastBaseUpdate=G))}if(f!==null){var ye=u.baseState;v=0,ve=ie=G=null,C=f;do{var le=C.lane&-536870913,de=le!==C.lane;if(de?(Tt&le)===le:(o&le)===le){le!==0&&le===ls&&(lf=!0),ve!==null&&(ve=ve.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});e:{var Qe=t,lt=C;le=n;var Qt=a;switch(lt.tag){case 1:if(Qe=lt.payload,typeof Qe=="function"){ye=Qe.call(Qt,ye,le);break e}ye=Qe;break e;case 3:Qe.flags=Qe.flags&-65537|128;case 0:if(Qe=lt.payload,le=typeof Qe=="function"?Qe.call(Qt,ye,le):Qe,le==null)break e;ye=_({},ye,le);break e;case 2:Ha=!0}}le=C.callback,le!==null&&(t.flags|=64,de&&(t.flags|=8192),de=u.callbacks,de===null?u.callbacks=[le]:de.push(le))}else de={lane:le,tag:C.tag,payload:C.payload,callback:C.callback,next:null},ve===null?(ie=ve=de,G=ye):ve=ve.next=de,v|=le;if(C=C.next,C===null){if(C=u.shared.pending,C===null)break;de=C,C=de.next,de.next=null,u.lastBaseUpdate=de,u.shared.pending=null}}while(!0);ve===null&&(G=ye),u.baseState=G,u.firstBaseUpdate=ie,u.lastBaseUpdate=ve,f===null&&(u.shared.lanes=0),qa|=v,t.lanes=v,t.memoizedState=ye}}function wp(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function Cp(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)wp(a[t],n)}var hs=O(null),Bl=O(0);function Dp(t,n){t=ga,Se(Bl,t),Se(hs,n),ga=t|n.baseLanes}function cf(){Se(Bl,ga),Se(hs,hs.current)}function uf(){ga=Bl.current,Q(hs),Q(Bl)}var si=O(null),Mi=null;function ka(t){var n=t.alternate;Se(hn,hn.current&1),Se(si,t),Mi===null&&(n===null||hs.current!==null||n.memoizedState!==null)&&(Mi=t)}function ff(t){Se(hn,hn.current),Se(si,t),Mi===null&&(Mi=t)}function Up(t){t.tag===22?(Se(hn,hn.current),Se(si,t),Mi===null&&(Mi=t)):Xa()}function Xa(){Se(hn,hn.current),Se(si,si.current)}function oi(t){Q(si),Mi===t&&(Mi=null),Q(hn)}var hn=O(0);function Hl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||_h(a)||vh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var la=0,_t=null,Yt=null,_n=null,Vl=!1,ds=!1,Lr=!1,Gl=0,bo=0,ps=null,Sx=0;function un(){throw Error(r(321))}function hf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function df(t,n,a,o,u,f){return la=f,_t=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=t===null||t.memoizedState===null?pm:wf,Lr=!1,f=a(o,u),Lr=!1,ds&&(f=Np(n,a,o,u)),Lp(t),f}function Lp(t){B.H=Ro;var n=Yt!==null&&Yt.next!==null;if(la=0,_n=Yt=_t=null,Vl=!1,bo=0,ps=null,n)throw Error(r(300));t===null||vn||(t=t.dependencies,t!==null&&Ll(t)&&(vn=!0))}function Np(t,n,a,o){_t=t;var u=0;do{if(ds&&(ps=null),bo=0,ds=!1,25<=u)throw Error(r(301));if(u+=1,_n=Yt=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}B.H=mm,f=n(a,o)}while(ds);return f}function yx(){var t=B.H,n=t.useState()[0];return n=typeof n.then=="function"?Ao(n):n,t=t.useState()[0],(Yt!==null?Yt.memoizedState:null)!==t&&(_t.flags|=1024),n}function pf(){var t=Gl!==0;return Gl=0,t}function mf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function gf(t){if(Vl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Vl=!1}la=0,_n=Yt=_t=null,ds=!1,bo=Gl=0,ps=null}function kn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?_t.memoizedState=_n=t:_n=_n.next=t,_n}function dn(){if(Yt===null){var t=_t.alternate;t=t!==null?t.memoizedState:null}else t=Yt.next;var n=_n===null?_t.memoizedState:_n.next;if(n!==null)_n=n,Yt=t;else{if(t===null)throw _t.alternate===null?Error(r(467)):Error(r(310));Yt=t,t={memoizedState:Yt.memoizedState,baseState:Yt.baseState,baseQueue:Yt.baseQueue,queue:Yt.queue,next:null},_n===null?_t.memoizedState=_n=t:_n=_n.next=t}return _n}function kl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(t){var n=bo;return bo+=1,ps===null&&(ps=[]),t=Ep(ps,t,n),n=_t,(_n===null?n.memoizedState:_n.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?pm:wf),t}function Xl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ao(t);if(t.$$typeof===z)return Dn(t)}throw Error(r(438,String(t)))}function _f(t){var n=null,a=_t.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=_t.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=kl(),_t.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=H;return n.index++,a}function ca(t,n){return typeof n=="function"?n(t):n}function Wl(t){var n=dn();return vf(n,Yt,t)}function vf(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var v=u.next;u.next=f.next,f.next=v}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var C=v=null,G=null,ie=n,ve=!1;do{var ye=ie.lane&-536870913;if(ye!==ie.lane?(Tt&ye)===ye:(la&ye)===ye){var le=ie.revertLane;if(le===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null}),ye===ls&&(ve=!0);else if((la&le)===le){ie=ie.next,le===ls&&(ve=!0);continue}else ye={lane:0,revertLane:ie.revertLane,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},G===null?(C=G=ye,v=f):G=G.next=ye,_t.lanes|=le,qa|=le;ye=ie.action,Lr&&a(f,ye),f=ie.hasEagerState?ie.eagerState:a(f,ye)}else le={lane:ye,revertLane:ie.revertLane,gesture:ie.gesture,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},G===null?(C=G=le,v=f):G=G.next=le,_t.lanes|=ye,qa|=ye;ie=ie.next}while(ie!==null&&ie!==n);if(G===null?v=f:G.next=C,!ai(f,t.memoizedState)&&(vn=!0,ve&&(a=cs,a!==null)))throw a;t.memoizedState=f,t.baseState=v,t.baseQueue=G,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function xf(t){var n=dn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do f=t(f,v.action),v=v.next;while(v!==u);ai(f,n.memoizedState)||(vn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function Op(t,n,a){var o=_t,u=dn(),f=wt;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var v=!ai((Yt||u).memoizedState,a);if(v&&(u.memoizedState=a,vn=!0),u=u.queue,yf(Fp.bind(null,o,u,t),[t]),u.getSnapshot!==n||v||_n!==null&&_n.memoizedState.tag&1){if(o.flags|=2048,ms(9,{destroy:void 0},Ip.bind(null,o,u,a,n),null),Jt===null)throw Error(r(349));f||(la&127)!==0||Pp(o,n,a)}return a}function Pp(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=_t.updateQueue,n===null?(n=kl(),_t.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Ip(t,n,a,o){n.value=a,n.getSnapshot=o,zp(n)&&Bp(t)}function Fp(t,n,a){return a(function(){zp(n)&&Bp(t)})}function zp(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function Bp(t){var n=Er(t,2);n!==null&&Jn(n,t,2)}function Mf(t){var n=kn();if(typeof t=="function"){var a=t;if(t=a(),Lr){Ue(!0);try{a()}finally{Ue(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:t},n}function Hp(t,n,a,o){return t.baseState=a,vf(t,Yt,typeof o=="function"?o:ca)}function Ex(t,n,a,o,u){if(Yl(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){f.listeners.push(v)}};B.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,Vp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Vp(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=B.T,v={};B.T=v;try{var C=a(u,o),G=B.S;G!==null&&G(v,C),Gp(t,n,C)}catch(ie){Sf(t,n,ie)}finally{f!==null&&v.types!==null&&(f.types=v.types),B.T=f}}else try{f=a(u,o),Gp(t,n,f)}catch(ie){Sf(t,n,ie)}}function Gp(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){kp(t,n,o)},function(o){return Sf(t,n,o)}):kp(t,n,a)}function kp(t,n,a){n.status="fulfilled",n.value=a,Xp(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Vp(t,a)))}function Sf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Xp(n),n=n.next;while(n!==o)}t.action=null}function Xp(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Wp(t,n){return n}function Zp(t,n){if(wt){var a=Jt.formState;if(a!==null){e:{var o=_t;if(wt){if(en){t:{for(var u=en,f=xi;u.nodeType!==8;){if(!f){u=null;break t}if(u=Si(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){en=Si(u.nextSibling),o=u.data==="F!";break e}}za(o)}o=!1}o&&(n=a[0])}}return a=kn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wp,lastRenderedState:n},a.queue=o,a=fm.bind(null,_t,o),o.dispatch=a,o=Mf(!1),f=Rf.bind(null,_t,!1,o.queue),o=kn(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Ex.bind(null,_t,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function qp(t){var n=dn();return Yp(n,Yt,t)}function Yp(t,n,a){if(n=vf(t,n,Wp)[0],t=Wl(ca)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Ao(n)}catch(v){throw v===us?Pl:v}else o=n;n=dn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(_t.flags|=2048,ms(9,{destroy:void 0},bx.bind(null,u,a),null)),[o,f,t]}function bx(t,n){t.action=n}function Kp(t){var n=dn(),a=Yt;if(a!==null)return Yp(n,a,t);dn(),n=n.memoizedState,a=dn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ms(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=_t.updateQueue,n===null&&(n=kl(),_t.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Qp(){return dn().memoizedState}function Zl(t,n,a,o){var u=kn();_t.flags|=t,u.memoizedState=ms(1|n,{destroy:void 0},a,o===void 0?null:o)}function ql(t,n,a,o){var u=dn();o=o===void 0?null:o;var f=u.memoizedState.inst;Yt!==null&&o!==null&&hf(o,Yt.memoizedState.deps)?u.memoizedState=ms(n,f,a,o):(_t.flags|=t,u.memoizedState=ms(1|n,f,a,o))}function jp(t,n){Zl(8390656,8,t,n)}function yf(t,n){ql(2048,8,t,n)}function Ax(t){_t.flags|=4;var n=_t.updateQueue;if(n===null)n=kl(),_t.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Jp(t){var n=dn().memoizedState;return Ax({ref:n,nextImpl:t}),function(){if((Ft&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function $p(t,n){return ql(4,2,t,n)}function em(t,n){return ql(4,4,t,n)}function tm(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function nm(t,n,a){a=a!=null?a.concat([t]):null,ql(4,4,tm.bind(null,n,t),a)}function Ef(){}function im(t,n){var a=dn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&hf(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function am(t,n){var a=dn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&hf(n,o[1]))return o[0];if(o=t(),Lr){Ue(!0);try{t()}finally{Ue(!1)}}return a.memoizedState=[o,n],o}function bf(t,n,a){return a===void 0||(la&1073741824)!==0&&(Tt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=rg(),_t.lanes|=t,qa|=t,a)}function rm(t,n,a,o){return ai(a,n)?a:hs.current!==null?(t=bf(t,a,o),ai(t,n)||(vn=!0),t):(la&42)===0||(la&1073741824)!==0&&(Tt&261930)===0?(vn=!0,t.memoizedState=a):(t=rg(),_t.lanes|=t,qa|=t,n)}function sm(t,n,a,o,u){var f=V.p;V.p=f!==0&&8>f?f:8;var v=B.T,C={};B.T=C,Rf(t,!1,n,a);try{var G=u(),ie=B.S;if(ie!==null&&ie(C,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var ve=Mx(G,o);To(t,n,ve,ui(t))}else To(t,n,o,ui(t))}catch(ye){To(t,n,{then:function(){},status:"rejected",reason:ye},ui())}finally{V.p=f,v!==null&&C.types!==null&&(v.types=C.types),B.T=v}}function Tx(){}function Af(t,n,a,o){if(t.tag!==5)throw Error(r(476));var u=om(t).queue;sm(t,u,n,ee,a===null?Tx:function(){return lm(t),a(o)})}function om(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:ee},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function lm(t){var n=om(t);n.next===null&&(n=t.alternate.memoizedState),To(t,n.next.queue,{},ui())}function Tf(){return Dn(ko)}function cm(){return dn().memoizedState}function um(){return dn().memoizedState}function Rx(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ui();t=Va(a);var o=Ga(n,t,a);o!==null&&(Jn(o,n,a),So(o,n,a)),n={cache:ef()},t.payload=n;return}n=n.return}}function wx(t,n,a){var o=ui();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Yl(t)?hm(n,a):(a=ku(t,n,a,o),a!==null&&(Jn(a,t,o),dm(a,n,o)))}function fm(t,n,a){var o=ui();To(t,n,a,o)}function To(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Yl(t))hm(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var v=n.lastRenderedState,C=f(v,a);if(u.hasEagerState=!0,u.eagerState=C,ai(C,v))return wl(t,n,u,0),Jt===null&&Rl(),!1}catch{}finally{}if(a=ku(t,n,u,o),a!==null)return Jn(a,t,o),dm(a,n,o),!0}return!1}function Rf(t,n,a,o){if(o={lane:2,revertLane:rh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Yl(t)){if(n)throw Error(r(479))}else n=ku(t,a,o,2),n!==null&&Jn(n,t,2)}function Yl(t){var n=t.alternate;return t===_t||n!==null&&n===_t}function hm(t,n){ds=Vl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function dm(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}var Ro={readContext:Dn,use:Xl,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un};Ro.useEffectEvent=un;var pm={readContext:Dn,use:Xl,useCallback:function(t,n){return kn().memoizedState=[t,n===void 0?null:n],t},useContext:Dn,useEffect:jp,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Zl(4194308,4,tm.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Zl(4194308,4,t,n)},useInsertionEffect:function(t,n){Zl(4,2,t,n)},useMemo:function(t,n){var a=kn();n=n===void 0?null:n;var o=t();if(Lr){Ue(!0);try{t()}finally{Ue(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=kn();if(a!==void 0){var u=a(n);if(Lr){Ue(!0);try{a(n)}finally{Ue(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=wx.bind(null,_t,t),[o.memoizedState,t]},useRef:function(t){var n=kn();return t={current:t},n.memoizedState=t},useState:function(t){t=Mf(t);var n=t.queue,a=fm.bind(null,_t,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Ef,useDeferredValue:function(t,n){var a=kn();return bf(a,t,n)},useTransition:function(){var t=Mf(!1);return t=sm.bind(null,_t,t.queue,!0,!1),kn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=_t,u=kn();if(wt){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Jt===null)throw Error(r(349));(Tt&127)!==0||Pp(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,jp(Fp.bind(null,o,f,t),[t]),o.flags|=2048,ms(9,{destroy:void 0},Ip.bind(null,o,f,a,n),null),a},useId:function(){var t=kn(),n=Jt.identifierPrefix;if(wt){var a=Vi,o=Hi;a=(o&~(1<<32-ke(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Gl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Sx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Tf,useFormState:Zp,useActionState:Zp,useOptimistic:function(t){var n=kn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Rf.bind(null,_t,!0,a),a.dispatch=n,[t,n]},useMemoCache:_f,useCacheRefresh:function(){return kn().memoizedState=Rx.bind(null,_t)},useEffectEvent:function(t){var n=kn(),a={impl:t};return n.memoizedState=a,function(){if((Ft&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},wf={readContext:Dn,use:Xl,useCallback:im,useContext:Dn,useEffect:yf,useImperativeHandle:nm,useInsertionEffect:$p,useLayoutEffect:em,useMemo:am,useReducer:Wl,useRef:Qp,useState:function(){return Wl(ca)},useDebugValue:Ef,useDeferredValue:function(t,n){var a=dn();return rm(a,Yt.memoizedState,t,n)},useTransition:function(){var t=Wl(ca)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:Ao(t),n]},useSyncExternalStore:Op,useId:cm,useHostTransitionStatus:Tf,useFormState:qp,useActionState:qp,useOptimistic:function(t,n){var a=dn();return Hp(a,Yt,t,n)},useMemoCache:_f,useCacheRefresh:um};wf.useEffectEvent=Jp;var mm={readContext:Dn,use:Xl,useCallback:im,useContext:Dn,useEffect:yf,useImperativeHandle:nm,useInsertionEffect:$p,useLayoutEffect:em,useMemo:am,useReducer:xf,useRef:Qp,useState:function(){return xf(ca)},useDebugValue:Ef,useDeferredValue:function(t,n){var a=dn();return Yt===null?bf(a,t,n):rm(a,Yt.memoizedState,t,n)},useTransition:function(){var t=xf(ca)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:Ao(t),n]},useSyncExternalStore:Op,useId:cm,useHostTransitionStatus:Tf,useFormState:Kp,useActionState:Kp,useOptimistic:function(t,n){var a=dn();return Yt!==null?Hp(a,Yt,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:_f,useCacheRefresh:um};mm.useEffectEvent=Jp;function Cf(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Df={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ui(),u=Va(o);u.payload=n,a!=null&&(u.callback=a),n=Ga(t,u,o),n!==null&&(Jn(n,t,o),So(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ui(),u=Va(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ga(t,u,o),n!==null&&(Jn(n,t,o),So(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ui(),o=Va(a);o.tag=2,n!=null&&(o.callback=n),n=Ga(t,o,a),n!==null&&(Jn(n,t,a),So(n,t,a))}};function gm(t,n,a,o,u,f,v){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,v):n.prototype&&n.prototype.isPureReactComponent?!ho(a,o)||!ho(u,f):!0}function _m(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Df.enqueueReplaceState(n,n.state,null)}function Nr(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function vm(t){Tl(t)}function xm(t){console.error(t)}function Mm(t){Tl(t)}function Kl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Sm(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Uf(t,n,a){return a=Va(a),a.tag=3,a.payload={element:null},a.callback=function(){Kl(t,n)},a}function ym(t){return t=Va(t),t.tag=3,t}function Em(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){Sm(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(t.callback=function(){Sm(n,a,o),typeof u!="function"&&(Ya===null?Ya=new Set([this]):Ya.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})})}function Cx(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&os(n,a,u,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Mi===null?oc():a.alternate===null&&fn===0&&(fn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Il?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),nh(t,o,u)),!1;case 22:return a.flags|=65536,o===Il?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),nh(t,o,u)),!1}throw Error(r(435,a.tag))}return nh(t,o,u),oc(),!1}if(wt)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Ku&&(t=Error(r(422),{cause:o}),go(gi(t,a)))):(o!==Ku&&(n=Error(r(423),{cause:o}),go(gi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=gi(o,a),u=Uf(t.stateNode,o,u),of(t,u),fn!==4&&(fn=2)),!1;var f=Error(r(520),{cause:o});if(f=gi(f,a),Po===null?Po=[f]:Po.push(f),fn!==4&&(fn=2),n===null)return!0;o=gi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Uf(a.stateNode,o,t),of(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ya===null||!Ya.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=ym(u),Em(u,t,a,o),of(a,u),!1}a=a.return}while(a!==null);return!1}var Lf=Error(r(461)),vn=!1;function Un(t,n,a,o){n.child=t===null?Rp(n,null,a,o):Ur(n,t.child,a,o)}function bm(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var v={};for(var C in o)C!=="ref"&&(v[C]=o[C])}else v=o;return Rr(n),o=df(t,n,a,v,f,u),C=pf(),t!==null&&!vn?(mf(t,n,u),ua(t,n,u)):(wt&&C&&qu(n),n.flags|=1,Un(t,n,o,u),n.child)}function Am(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!Xu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Tm(t,n,f,o,u)):(t=Dl(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Hf(t,u)){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:ho,a(v,o)&&t.ref===n.ref)return ua(t,n,u)}return n.flags|=1,t=aa(f,o),t.ref=n.ref,t.return=n,n.child=t}function Tm(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(ho(f,o)&&t.ref===n.ref)if(vn=!1,n.pendingProps=o=f,Hf(t,u))(t.flags&131072)!==0&&(vn=!0);else return n.lanes=t.lanes,ua(t,n,u)}return Nf(t,n,a,o,u)}function Rm(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return wm(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ol(n,f!==null?f.cachePool:null),f!==null?Dp(n,f):cf(),Up(n);else return o=n.lanes=536870912,wm(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Ol(n,f.cachePool),Dp(n,f),Xa(),n.memoizedState=null):(t!==null&&Ol(n,null),cf(),Xa());return Un(t,n,u,a),n.child}function wo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function wm(t,n,a,o,u){var f=nf();return f=f===null?null:{parent:gn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&Ol(n,null),cf(),Up(n),t!==null&&os(t,n,o,!0),n.childLanes=u,null}function Ql(t,n){return n=Jl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Cm(t,n,a){return Ur(n,t.child,null,a),t=Ql(n,n.pendingProps),t.flags|=2,oi(n),n.memoizedState=null,t}function Dx(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(wt){if(o.mode==="hidden")return t=Ql(n,o),n.lanes=536870912,wo(null,t);if(ff(n),(t=en)?(t=Vg(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ia!==null?{id:Hi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=hp(t),a.return=n,n.child=a,Cn=n,en=null)):t=null,t===null)throw za(n);return n.lanes=536870912,null}return Ql(n,o)}var f=t.memoizedState;if(f!==null){var v=f.dehydrated;if(ff(n),u)if(n.flags&256)n.flags&=-257,n=Cm(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(vn||os(t,n,a,!1),u=(a&t.childLanes)!==0,vn||u){if(o=Jt,o!==null&&(v=ti(o,a),v!==0&&v!==f.retryLane))throw f.retryLane=v,Er(t,v),Jn(o,t,v),Lf;oc(),n=Cm(t,n,a)}else t=f.treeContext,en=Si(v.nextSibling),Cn=n,wt=!0,Fa=null,xi=!1,t!==null&&mp(n,t),n=Ql(n,o),n.flags|=4096;return n}return t=aa(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function jl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Nf(t,n,a,o,u){return Rr(n),a=df(t,n,a,o,void 0,u),o=pf(),t!==null&&!vn?(mf(t,n,u),ua(t,n,u)):(wt&&o&&qu(n),n.flags|=1,Un(t,n,a,u),n.child)}function Dm(t,n,a,o,u,f){return Rr(n),n.updateQueue=null,a=Np(n,o,a,u),Lp(t),o=pf(),t!==null&&!vn?(mf(t,n,f),ua(t,n,f)):(wt&&o&&qu(n),n.flags|=1,Un(t,n,a,f),n.child)}function Um(t,n,a,o,u){if(Rr(n),n.stateNode===null){var f=is,v=a.contextType;typeof v=="object"&&v!==null&&(f=Dn(v)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Df,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},rf(n),v=a.contextType,f.context=typeof v=="object"&&v!==null?Dn(v):is,f.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(Cf(n,a,v,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(v=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),v!==f.state&&Df.enqueueReplaceState(f,f.state,null),Eo(n,o,f,u),yo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var C=n.memoizedProps,G=Nr(a,C);f.props=G;var ie=f.context,ve=a.contextType;v=is,typeof ve=="object"&&ve!==null&&(v=Dn(ve));var ye=a.getDerivedStateFromProps;ve=typeof ye=="function"||typeof f.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,ve||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(C||ie!==v)&&_m(n,f,o,v),Ha=!1;var le=n.memoizedState;f.state=le,Eo(n,o,f,u),yo(),ie=n.memoizedState,C||le!==ie||Ha?(typeof ye=="function"&&(Cf(n,a,ye,o),ie=n.memoizedState),(G=Ha||gm(n,a,G,o,le,ie,v))?(ve||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ie),f.props=o,f.state=ie,f.context=v,o=G):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,sf(t,n),v=n.memoizedProps,ve=Nr(a,v),f.props=ve,ye=n.pendingProps,le=f.context,ie=a.contextType,G=is,typeof ie=="object"&&ie!==null&&(G=Dn(ie)),C=a.getDerivedStateFromProps,(ie=typeof C=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==ye||le!==G)&&_m(n,f,o,G),Ha=!1,le=n.memoizedState,f.state=le,Eo(n,o,f,u),yo();var de=n.memoizedState;v!==ye||le!==de||Ha||t!==null&&t.dependencies!==null&&Ll(t.dependencies)?(typeof C=="function"&&(Cf(n,a,C,o),de=n.memoizedState),(ve=Ha||gm(n,a,ve,o,le,de,G)||t!==null&&t.dependencies!==null&&Ll(t.dependencies))?(ie||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,de,G),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,de,G)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=de),f.props=o,f.state=de,f.context=G,o=ve):(typeof f.componentDidUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,jl(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=Ur(n,t.child,null,u),n.child=Ur(n,null,a,u)):Un(t,n,a,u),n.memoizedState=f.state,t=n.child):t=ua(t,n,u),t}function Lm(t,n,a,o){return Ar(),n.flags|=256,Un(t,n,a,o),n.child}var Of={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Pf(t){return{baseLanes:t,cachePool:Sp()}}function If(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ci),t}function Nm(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,v;if((v=f)||(v=t!==null&&t.memoizedState===null?!1:(hn.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,t===null){if(wt){if(u?ka(n):Xa(),(t=en)?(t=Vg(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ia!==null?{id:Hi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=hp(t),a.return=n,n.child=a,Cn=n,en=null)):t=null,t===null)throw za(n);return vh(t)?n.lanes=32:n.lanes=536870912,null}var C=o.children;return o=o.fallback,u?(Xa(),u=n.mode,C=Jl({mode:"hidden",children:C},u),o=br(o,u,a,null),C.return=n,o.return=n,C.sibling=o,n.child=C,o=n.child,o.memoizedState=Pf(a),o.childLanes=If(t,v,a),n.memoizedState=Of,wo(null,o)):(ka(n),Ff(n,C))}var G=t.memoizedState;if(G!==null&&(C=G.dehydrated,C!==null)){if(f)n.flags&256?(ka(n),n.flags&=-257,n=zf(t,n,a)):n.memoizedState!==null?(Xa(),n.child=t.child,n.flags|=128,n=null):(Xa(),C=o.fallback,u=n.mode,o=Jl({mode:"visible",children:o.children},u),C=br(C,u,a,null),C.flags|=2,o.return=n,C.return=n,o.sibling=C,n.child=o,Ur(n,t.child,null,a),o=n.child,o.memoizedState=Pf(a),o.childLanes=If(t,v,a),n.memoizedState=Of,n=wo(null,o));else if(ka(n),vh(C)){if(v=C.nextSibling&&C.nextSibling.dataset,v)var ie=v.dgst;v=ie,o=Error(r(419)),o.stack="",o.digest=v,go({value:o,source:null,stack:null}),n=zf(t,n,a)}else if(vn||os(t,n,a,!1),v=(a&t.childLanes)!==0,vn||v){if(v=Jt,v!==null&&(o=ti(v,a),o!==0&&o!==G.retryLane))throw G.retryLane=o,Er(t,o),Jn(v,t,o),Lf;_h(C)||oc(),n=zf(t,n,a)}else _h(C)?(n.flags|=192,n.child=t.child,n=null):(t=G.treeContext,en=Si(C.nextSibling),Cn=n,wt=!0,Fa=null,xi=!1,t!==null&&mp(n,t),n=Ff(n,o.children),n.flags|=4096);return n}return u?(Xa(),C=o.fallback,u=n.mode,G=t.child,ie=G.sibling,o=aa(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,ie!==null?C=aa(ie,C):(C=br(C,u,a,null),C.flags|=2),C.return=n,o.return=n,o.sibling=C,n.child=o,wo(null,o),o=n.child,C=t.child.memoizedState,C===null?C=Pf(a):(u=C.cachePool,u!==null?(G=gn._currentValue,u=u.parent!==G?{parent:G,pool:G}:u):u=Sp(),C={baseLanes:C.baseLanes|a,cachePool:u}),o.memoizedState=C,o.childLanes=If(t,v,a),n.memoizedState=Of,wo(t.child,o)):(ka(n),a=t.child,t=a.sibling,a=aa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(v=n.deletions,v===null?(n.deletions=[t],n.flags|=16):v.push(t)),n.child=a,n.memoizedState=null,a)}function Ff(t,n){return n=Jl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Jl(t,n){return t=ri(22,t,null,n),t.lanes=0,t}function zf(t,n,a){return Ur(n,t.child,null,a),t=Ff(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Om(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Ju(t.return,n,a)}function Bf(t,n,a,o,u,f){var v=t.memoizedState;v===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(v.isBackwards=n,v.rendering=null,v.renderingStartTime=0,v.last=o,v.tail=a,v.tailMode=u,v.treeForkCount=f)}function Pm(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var v=hn.current,C=(v&2)!==0;if(C?(v=v&1|2,n.flags|=128):v&=1,Se(hn,v),Un(t,n,o,a),o=wt?mo:0,!C&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Om(t,a,n);else if(t.tag===19)Om(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Hl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Bf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Hl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Bf(n,!0,a,null,f,o);break;case"together":Bf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ua(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),qa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(os(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=aa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=aa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Hf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Ll(t)))}function Ux(t,n,a){switch(n.tag){case 3:he(n,n.stateNode.containerInfo),Ba(n,gn,t.memoizedState.cache),Ar();break;case 27:case 5:et(n);break;case 4:he(n,n.stateNode.containerInfo);break;case 10:Ba(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,ff(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(ka(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Nm(t,n,a):(ka(n),t=ua(t,n,a),t!==null?t.sibling:null);ka(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(os(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return Pm(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Se(hn,hn.current),o)break;return null;case 22:return n.lanes=0,Rm(t,n,a,n.pendingProps);case 24:Ba(n,gn,t.memoizedState.cache)}return ua(t,n,a)}function Im(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)vn=!0;else{if(!Hf(t,a)&&(n.flags&128)===0)return vn=!1,Ux(t,n,a);vn=(t.flags&131072)!==0}else vn=!1,wt&&(n.flags&1048576)!==0&&pp(n,mo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Cr(n.elementType),n.type=t,typeof t=="function")Xu(t)?(o=Nr(t,o),n.tag=1,n=Um(null,n,t,o,a)):(n.tag=0,n=Nf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===R){n.tag=11,n=bm(null,n,t,o,a);break e}else if(u===P){n.tag=14,n=Am(null,n,t,o,a);break e}}throw n=ue(t)||t,Error(r(306,n,""))}}return n;case 0:return Nf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Nr(o,n.pendingProps),Um(t,n,o,u,a);case 3:e:{if(he(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,sf(t,n),Eo(n,o,null,a);var v=n.memoizedState;if(o=v.cache,Ba(n,gn,o),o!==f.cache&&$u(n,[gn],a,!0),yo(),o=v.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Lm(t,n,o,a);break e}else if(o!==u){u=gi(Error(r(424)),n),go(u),n=Lm(t,n,o,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(en=Si(t.firstChild),Cn=n,wt=!0,Fa=null,xi=!0,a=Rp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ar(),o===u){n=ua(t,n,a);break e}Un(t,n,o,a)}n=n.child}return n;case 26:return jl(t,n),t===null?(a=qg(n.type,null,n.pendingProps,null))?n.memoizedState=a:wt||(a=n.type,t=n.pendingProps,o=pc(te.current).createElement(a),o[pn]=n,o[wn]=t,Ln(o,a,t),mn(o),n.stateNode=o):n.memoizedState=qg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return et(n),t===null&&wt&&(o=n.stateNode=Xg(n.type,n.pendingProps,te.current),Cn=n,xi=!0,u=en,Ja(n.type)?(xh=u,en=Si(o.firstChild)):en=u),Un(t,n,n.pendingProps.children,a),jl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&wt&&((u=o=en)&&(o=o2(o,n.type,n.pendingProps,xi),o!==null?(n.stateNode=o,Cn=n,en=Si(o.firstChild),xi=!1,u=!0):u=!1),u||za(n)),et(n),u=n.type,f=n.pendingProps,v=t!==null?t.memoizedProps:null,o=f.children,ph(u,f)?o=null:v!==null&&ph(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=df(t,n,yx,null,null,a),ko._currentValue=u),jl(t,n),Un(t,n,o,a),n.child;case 6:return t===null&&wt&&((t=a=en)&&(a=l2(a,n.pendingProps,xi),a!==null?(n.stateNode=a,Cn=n,en=null,t=!0):t=!1),t||za(n)),null;case 13:return Nm(t,n,a);case 4:return he(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Ur(n,null,o,a):Un(t,n,o,a),n.child;case 11:return bm(t,n,n.type,n.pendingProps,a);case 7:return Un(t,n,n.pendingProps,a),n.child;case 8:return Un(t,n,n.pendingProps.children,a),n.child;case 12:return Un(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ba(n,n.type,o.value),Un(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Rr(n),u=Dn(u),o=o(u),n.flags|=1,Un(t,n,o,a),n.child;case 14:return Am(t,n,n.type,n.pendingProps,a);case 15:return Tm(t,n,n.type,n.pendingProps,a);case 19:return Pm(t,n,a);case 31:return Dx(t,n,a);case 22:return Rm(t,n,a,n.pendingProps);case 24:return Rr(n),o=Dn(gn),t===null?(u=nf(),u===null&&(u=Jt,f=ef(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},rf(n),Ba(n,gn,u)):((t.lanes&a)!==0&&(sf(t,n),Eo(n,null,null,a),yo()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ba(n,gn,o)):(o=f.cache,Ba(n,gn,o),o!==u.cache&&$u(n,[gn],a,!0))),Un(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function fa(t){t.flags|=4}function Vf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(cg())t.flags|=8192;else throw Dr=Il,af}else t.flags&=-16777217}function Fm(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jg(n))if(cg())t.flags|=8192;else throw Dr=Il,af}function $l(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Ae():536870912,t.lanes|=n,xs|=n)}function Co(t,n){if(!wt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function tn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function Lx(t,n,a){var o=n.pendingProps;switch(Yu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(n),null;case 1:return tn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),oa(gn),Le(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(ss(n)?fa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Qu())),tn(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(fa(n),f!==null?(tn(n),Fm(n,f)):(tn(n),Vf(n,u,null,o,a))):f?f!==t.memoizedState?(fa(n),tn(n),Fm(n,f)):(tn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&fa(n),tn(n),Vf(n,u,t,o,a)),null;case 27:if(Pe(n),a=te.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&fa(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return tn(n),null}t=Te.current,ss(n)?gp(n):(t=Xg(u,o,a),n.stateNode=t,fa(n))}return tn(n),null;case 5:if(Pe(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&fa(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return tn(n),null}if(f=Te.current,ss(n))gp(n);else{var v=pc(te.current);switch(f){case 1:f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=v.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?v.createElement("select",{is:o.is}):v.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?v.createElement(u,{is:o.is}):v.createElement(u)}}f[pn]=n,f[wn]=o;e:for(v=n.child;v!==null;){if(v.tag===5||v.tag===6)f.appendChild(v.stateNode);else if(v.tag!==4&&v.tag!==27&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===n)break e;for(;v.sibling===null;){if(v.return===null||v.return===n)break e;v=v.return}v.sibling.return=v.return,v=v.sibling}n.stateNode=f;e:switch(Ln(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&fa(n)}}return tn(n),Vf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&fa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=te.current,ss(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Cn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[pn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Ng(t.nodeValue,a)),t||za(n,!0)}else t=pc(t).createTextNode(o),t[pn]=n,n.stateNode=t}return tn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=ss(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[pn]=n}else Ar(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;tn(n),t=!1}else a=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(oi(n),n):(oi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return tn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=ss(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[pn]=n}else Ar(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;tn(n),u=!1}else u=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(oi(n),n):(oi(n),null)}return oi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),$l(n,n.updateQueue),tn(n),null);case 4:return Le(),t===null&&ch(n.stateNode.containerInfo),tn(n),null;case 10:return oa(n.type),tn(n),null;case 19:if(Q(hn),o=n.memoizedState,o===null)return tn(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Co(o,!1);else{if(fn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=Hl(t),f!==null){for(n.flags|=128,Co(o,!1),t=f.updateQueue,n.updateQueue=t,$l(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)fp(a,t),a=a.sibling;return Se(hn,hn.current&1|2),wt&&ra(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&It()>ac&&(n.flags|=128,u=!0,Co(o,!1),n.lanes=4194304)}else{if(!u)if(t=Hl(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,$l(n,t),Co(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!wt)return tn(n),null}else 2*It()-o.renderingStartTime>ac&&a!==536870912&&(n.flags|=128,u=!0,Co(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=It(),t.sibling=null,a=hn.current,Se(hn,u?a&1|2:a&1),wt&&ra(n,o.treeForkCount),t):(tn(n),null);case 22:case 23:return oi(n),uf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(tn(n),n.subtreeFlags&6&&(n.flags|=8192)):tn(n),a=n.updateQueue,a!==null&&$l(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Q(wr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),oa(gn),tn(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function Nx(t,n){switch(Yu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return oa(gn),Le(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Pe(n),null;case 31:if(n.memoizedState!==null){if(oi(n),n.alternate===null)throw Error(r(340));Ar()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(oi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Ar()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Q(hn),null;case 4:return Le(),null;case 10:return oa(n.type),null;case 22:case 23:return oi(n),uf(),t!==null&&Q(wr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return oa(gn),null;case 25:return null;default:return null}}function zm(t,n){switch(Yu(n),n.tag){case 3:oa(gn),Le();break;case 26:case 27:case 5:Pe(n);break;case 4:Le();break;case 31:n.memoizedState!==null&&oi(n);break;case 13:oi(n);break;case 19:Q(hn);break;case 10:oa(n.type);break;case 22:case 23:oi(n),uf(),t!==null&&Q(wr);break;case 24:oa(gn)}}function Do(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,v=a.inst;o=f(),v.destroy=o}a=a.next}while(a!==u)}}catch(C){Wt(n,n.return,C)}}function Wa(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var v=o.inst,C=v.destroy;if(C!==void 0){v.destroy=void 0,u=n;var G=a,ie=C;try{ie()}catch(ve){Wt(u,G,ve)}}}o=o.next}while(o!==f)}}catch(ve){Wt(n,n.return,ve)}}function Bm(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Cp(n,a)}catch(o){Wt(t,t.return,o)}}}function Hm(t,n,a){a.props=Nr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Wt(t,n,o)}}function Uo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){Wt(t,n,u)}}function Gi(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Wt(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Wt(t,n,u)}else a.current=null}function Vm(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Wt(t,t.return,u)}}function Gf(t,n,a){try{var o=t.stateNode;t2(o,t.type,a,n),o[wn]=n}catch(u){Wt(t,t.return,u)}}function Gm(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ja(t.type)||t.tag===4}function kf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Gm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ja(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Xf(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=na));else if(o!==4&&(o===27&&Ja(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Xf(t,n,a),t=t.sibling;t!==null;)Xf(t,n,a),t=t.sibling}function ec(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Ja(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(ec(t,n,a),t=t.sibling;t!==null;)ec(t,n,a),t=t.sibling}function km(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Ln(n,o,a),n[pn]=t,n[wn]=a}catch(f){Wt(t,t.return,f)}}var ha=!1,xn=!1,Wf=!1,Xm=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function Ox(t,n){if(t=t.containerInfo,hh=Sc,t=np(t),Fu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var v=0,C=-1,G=-1,ie=0,ve=0,ye=t,le=null;t:for(;;){for(var de;ye!==a||u!==0&&ye.nodeType!==3||(C=v+u),ye!==f||o!==0&&ye.nodeType!==3||(G=v+o),ye.nodeType===3&&(v+=ye.nodeValue.length),(de=ye.firstChild)!==null;)le=ye,ye=de;for(;;){if(ye===t)break t;if(le===a&&++ie===u&&(C=v),le===f&&++ve===o&&(G=v),(de=ye.nextSibling)!==null)break;ye=le,le=ye.parentNode}ye=de}a=C===-1||G===-1?null:{start:C,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(dh={focusedElem:t,selectionRange:a},Sc=!1,Tn=n;Tn!==null;)if(n=Tn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Tn=t;else for(;Tn!==null;){switch(n=Tn,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Qe=Nr(a.type,u);t=o.getSnapshotBeforeUpdate(Qe,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(lt){Wt(a,a.return,lt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)gh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":gh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,Tn=t;break}Tn=n.return}}function Wm(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:pa(t,a),o&4&&Do(5,a);break;case 1:if(pa(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(v){Wt(a,a.return,v)}else{var u=Nr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(v){Wt(a,a.return,v)}}o&64&&Bm(a),o&512&&Uo(a,a.return);break;case 3:if(pa(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Cp(t,n)}catch(v){Wt(a,a.return,v)}}break;case 27:n===null&&o&4&&km(a);case 26:case 5:pa(t,a),n===null&&o&4&&Vm(a),o&512&&Uo(a,a.return);break;case 12:pa(t,a);break;case 31:pa(t,a),o&4&&Ym(t,a);break;case 13:pa(t,a),o&4&&Km(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=kx.bind(null,a),c2(t,a))));break;case 22:if(o=a.memoizedState!==null||ha,!o){n=n!==null&&n.memoizedState!==null||xn,u=ha;var f=xn;ha=o,(xn=n)&&!f?ma(t,a,(a.subtreeFlags&8772)!==0):pa(t,a),ha=u,xn=f}break;case 30:break;default:pa(t,a)}}function Zm(t){var n=t.alternate;n!==null&&(t.alternate=null,Zm(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&La(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var sn=null,Yn=!1;function da(t,n,a){for(a=a.child;a!==null;)qm(t,n,a),a=a.sibling}function qm(t,n,a){if(ge&&typeof ge.onCommitFiberUnmount=="function")try{ge.onCommitFiberUnmount(pe,a)}catch{}switch(a.tag){case 26:xn||Gi(a,n),da(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:xn||Gi(a,n);var o=sn,u=Yn;Ja(a.type)&&(sn=a.stateNode,Yn=!1),da(t,n,a),Ho(a.stateNode),sn=o,Yn=u;break;case 5:xn||Gi(a,n);case 6:if(o=sn,u=Yn,sn=null,da(t,n,a),sn=o,Yn=u,sn!==null)if(Yn)try{(sn.nodeType===9?sn.body:sn.nodeName==="HTML"?sn.ownerDocument.body:sn).removeChild(a.stateNode)}catch(f){Wt(a,n,f)}else try{sn.removeChild(a.stateNode)}catch(f){Wt(a,n,f)}break;case 18:sn!==null&&(Yn?(t=sn,Bg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Rs(t)):Bg(sn,a.stateNode));break;case 4:o=sn,u=Yn,sn=a.stateNode.containerInfo,Yn=!0,da(t,n,a),sn=o,Yn=u;break;case 0:case 11:case 14:case 15:Wa(2,a,n),xn||Wa(4,a,n),da(t,n,a);break;case 1:xn||(Gi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Hm(a,n,o)),da(t,n,a);break;case 21:da(t,n,a);break;case 22:xn=(o=xn)||a.memoizedState!==null,da(t,n,a),xn=o;break;default:da(t,n,a)}}function Ym(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Rs(t)}catch(a){Wt(n,n.return,a)}}}function Km(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Rs(t)}catch(a){Wt(n,n.return,a)}}function Px(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Xm),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Xm),n;default:throw Error(r(435,t.tag))}}function tc(t,n){var a=Px(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=Xx.bind(null,t,o);o.then(u,u)}})}function Kn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=t,v=n,C=v;e:for(;C!==null;){switch(C.tag){case 27:if(Ja(C.type)){sn=C.stateNode,Yn=!1;break e}break;case 5:sn=C.stateNode,Yn=!1;break e;case 3:case 4:sn=C.stateNode.containerInfo,Yn=!0;break e}C=C.return}if(sn===null)throw Error(r(160));qm(f,v,u),sn=null,Yn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Qm(n,t),n=n.sibling}var Di=null;function Qm(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Kn(n,t),Qn(t),o&4&&(Wa(3,t,t.return),Do(3,t),Wa(5,t,t.return));break;case 1:Kn(n,t),Qn(t),o&512&&(xn||a===null||Gi(a,a.return)),o&64&&ha&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Di;if(Kn(n,t),Qn(t),o&512&&(xn||a===null||Gi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Ua]||f[pn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Ln(f,o,a),f[pn]=t,mn(f),o=f;break e;case"link":var v=Qg("link","href",u).get(o+(a.href||""));if(v){for(var C=0;C<v.length;C++)if(f=v[C],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(C,1);break t}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;case"meta":if(v=Qg("meta","content",u).get(o+(a.content||""))){for(C=0;C<v.length;C++)if(f=v[C],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(C,1);break t}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[pn]=t,mn(f),o=f}t.stateNode=o}else jg(u,t.type,t.stateNode);else t.stateNode=Kg(u,o,t.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?jg(u,t.type,t.stateNode):Kg(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Gf(t,t.memoizedProps,a.memoizedProps)}break;case 27:Kn(n,t),Qn(t),o&512&&(xn||a===null||Gi(a,a.return)),a!==null&&o&4&&Gf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Kn(n,t),Qn(t),o&512&&(xn||a===null||Gi(a,a.return)),t.flags&32){u=t.stateNode;try{ii(u,"")}catch(Qe){Wt(t,t.return,Qe)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Gf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Wf=!0);break;case 6:if(Kn(n,t),Qn(t),o&4){if(t.stateNode===null)throw Error(r(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Qe){Wt(t,t.return,Qe)}}break;case 3:if(_c=null,u=Di,Di=mc(n.containerInfo),Kn(n,t),Di=u,Qn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Rs(n.containerInfo)}catch(Qe){Wt(t,t.return,Qe)}Wf&&(Wf=!1,jm(t));break;case 4:o=Di,Di=mc(t.stateNode.containerInfo),Kn(n,t),Qn(t),Di=o;break;case 12:Kn(n,t),Qn(t);break;case 31:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,tc(t,o)));break;case 13:Kn(n,t),Qn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ic=It()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,tc(t,o)));break;case 22:u=t.memoizedState!==null;var G=a!==null&&a.memoizedState!==null,ie=ha,ve=xn;if(ha=ie||u,xn=ve||G,Kn(n,t),xn=ve,ha=ie,Qn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||G||ha||xn||Or(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){G=a=n;try{if(f=G.stateNode,u)v=f.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none";else{C=G.stateNode;var ye=G.memoizedProps.style,le=ye!=null&&ye.hasOwnProperty("display")?ye.display:null;C.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(Qe){Wt(G,G.return,Qe)}}}else if(n.tag===6){if(a===null){G=n;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(Qe){Wt(G,G.return,Qe)}}}else if(n.tag===18){if(a===null){G=n;try{var de=G.stateNode;u?Hg(de,!0):Hg(G.stateNode,!1)}catch(Qe){Wt(G,G.return,Qe)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,tc(t,a))));break;case 19:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,tc(t,o)));break;case 30:break;case 21:break;default:Kn(n,t),Qn(t)}}function Qn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(Gm(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=kf(t);ec(t,f,u);break;case 5:var v=a.stateNode;a.flags&32&&(ii(v,""),a.flags&=-33);var C=kf(t);ec(t,C,v);break;case 3:case 4:var G=a.stateNode.containerInfo,ie=kf(t);Xf(t,ie,G);break;default:throw Error(r(161))}}catch(ve){Wt(t,t.return,ve)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function jm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;jm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function pa(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Wm(t,n.alternate,n),n=n.sibling}function Or(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Wa(4,n,n.return),Or(n);break;case 1:Gi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Hm(n,n.return,a),Or(n);break;case 27:Ho(n.stateNode);case 26:case 5:Gi(n,n.return),Or(n);break;case 22:n.memoizedState===null&&Or(n);break;case 30:Or(n);break;default:Or(n)}t=t.sibling}}function ma(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,v=f.flags;switch(f.tag){case 0:case 11:case 15:ma(u,f,a),Do(4,f);break;case 1:if(ma(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ie){Wt(o,o.return,ie)}if(o=f,u=o.updateQueue,u!==null){var C=o.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)wp(G[u],C)}catch(ie){Wt(o,o.return,ie)}}a&&v&64&&Bm(f),Uo(f,f.return);break;case 27:km(f);case 26:case 5:ma(u,f,a),a&&o===null&&v&4&&Vm(f),Uo(f,f.return);break;case 12:ma(u,f,a);break;case 31:ma(u,f,a),a&&v&4&&Ym(u,f);break;case 13:ma(u,f,a),a&&v&4&&Km(u,f);break;case 22:f.memoizedState===null&&ma(u,f,a),Uo(f,f.return);break;case 30:break;default:ma(u,f,a)}n=n.sibling}}function Zf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&_o(a))}function qf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&_o(t))}function Ui(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Jm(t,n,a,o),n=n.sibling}function Jm(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ui(t,n,a,o),u&2048&&Do(9,n);break;case 1:Ui(t,n,a,o);break;case 3:Ui(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&_o(t)));break;case 12:if(u&2048){Ui(t,n,a,o),t=n.stateNode;try{var f=n.memoizedProps,v=f.id,C=f.onPostCommit;typeof C=="function"&&C(v,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(G){Wt(n,n.return,G)}}else Ui(t,n,a,o);break;case 31:Ui(t,n,a,o);break;case 13:Ui(t,n,a,o);break;case 23:break;case 22:f=n.stateNode,v=n.alternate,n.memoizedState!==null?f._visibility&2?Ui(t,n,a,o):Lo(t,n):f._visibility&2?Ui(t,n,a,o):(f._visibility|=2,gs(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Zf(v,n);break;case 24:Ui(t,n,a,o),u&2048&&qf(n.alternate,n);break;default:Ui(t,n,a,o)}}function gs(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,v=n,C=a,G=o,ie=v.flags;switch(v.tag){case 0:case 11:case 15:gs(f,v,C,G,u),Do(8,v);break;case 23:break;case 22:var ve=v.stateNode;v.memoizedState!==null?ve._visibility&2?gs(f,v,C,G,u):Lo(f,v):(ve._visibility|=2,gs(f,v,C,G,u)),u&&ie&2048&&Zf(v.alternate,v);break;case 24:gs(f,v,C,G,u),u&&ie&2048&&qf(v.alternate,v);break;default:gs(f,v,C,G,u)}n=n.sibling}}function Lo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Lo(a,o),u&2048&&Zf(o.alternate,o);break;case 24:Lo(a,o),u&2048&&qf(o.alternate,o);break;default:Lo(a,o)}n=n.sibling}}var No=8192;function _s(t,n,a){if(t.subtreeFlags&No)for(t=t.child;t!==null;)$m(t,n,a),t=t.sibling}function $m(t,n,a){switch(t.tag){case 26:_s(t,n,a),t.flags&No&&t.memoizedState!==null&&S2(a,Di,t.memoizedState,t.memoizedProps);break;case 5:_s(t,n,a);break;case 3:case 4:var o=Di;Di=mc(t.stateNode.containerInfo),_s(t,n,a),Di=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=No,No=16777216,_s(t,n,a),No=o):_s(t,n,a));break;default:_s(t,n,a)}}function eg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Oo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,ng(o,t)}eg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)tg(t),t=t.sibling}function tg(t){switch(t.tag){case 0:case 11:case 15:Oo(t),t.flags&2048&&Wa(9,t,t.return);break;case 3:Oo(t);break;case 12:Oo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,nc(t)):Oo(t);break;default:Oo(t)}}function nc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,ng(o,t)}eg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Wa(8,n,n.return),nc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,nc(n));break;default:nc(n)}t=t.sibling}}function ng(t,n){for(;Tn!==null;){var a=Tn;switch(a.tag){case 0:case 11:case 15:Wa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:_o(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Tn=o;else e:for(a=t;Tn!==null;){o=Tn;var u=o.sibling,f=o.return;if(Zm(o),o===a){Tn=null;break e}if(u!==null){u.return=f,Tn=u;break e}Tn=f}}}var Ix={getCacheForType:function(t){var n=Dn(gn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Dn(gn).controller.signal}},Fx=typeof WeakMap=="function"?WeakMap:Map,Ft=0,Jt=null,yt=null,Tt=0,Xt=0,li=null,Za=!1,vs=!1,Yf=!1,ga=0,fn=0,qa=0,Pr=0,Kf=0,ci=0,xs=0,Po=null,jn=null,Qf=!1,ic=0,ig=0,ac=1/0,rc=null,Ya=null,yn=0,Ka=null,Ms=null,_a=0,jf=0,Jf=null,ag=null,Io=0,$f=null;function ui(){return(Ft&2)!==0&&Tt!==0?Tt&-Tt:B.T!==null?rh():ao()}function rg(){if(ci===0)if((Tt&536870912)===0||wt){var t=ht;ht<<=1,(ht&3932160)===0&&(ht=262144),ci=t}else ci=536870912;return t=si.current,t!==null&&(t.flags|=32),ci}function Jn(t,n,a){(t===Jt&&(Xt===2||Xt===9)||t.cancelPendingCommit!==null)&&(Ss(t,0),Qa(t,Tt,ci,!1)),qe(t,a),((Ft&2)===0||t!==Jt)&&(t===Jt&&((Ft&2)===0&&(Pr|=a),fn===4&&Qa(t,Tt,ci,!1)),ki(t))}function sg(t,n,a){if((Ft&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ne(t,n),u=o?Hx(t,n):th(t,n,!0),f=o;do{if(u===0){vs&&!o&&Qa(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!zx(a)){u=th(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var v=0;else v=t.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;e:{var C=t;u=Po;var G=C.current.memoizedState.isDehydrated;if(G&&(Ss(C,v).flags|=256),v=th(C,v,!1),v!==2){if(Yf&&!G){C.errorRecoveryDisabledLanes|=f,Pr|=f,u=4;break e}f=jn,jn=u,f!==null&&(jn===null?jn=f:jn.push.apply(jn,f))}u=v}if(f=!1,u!==2)continue}}if(u===1){Ss(t,0),Qa(t,n,0,!0);break}e:{switch(o=t,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Qa(o,n,ci,!Za);break e;case 2:jn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=ic+300-It(),10<u)){if(Qa(o,n,ci,!Za),xe(o,0,!0)!==0)break e;_a=n,o.timeoutHandle=Fg(og.bind(null,o,a,jn,rc,Qf,n,ci,Pr,xs,Za,f,"Throttled",-0,0),u);break e}og(o,a,jn,rc,Qf,n,ci,Pr,xs,Za,f,null,-0,0)}}break}while(!0);ki(t)}function og(t,n,a,o,u,f,v,C,G,ie,ve,ye,le,de){if(t.timeoutHandle=-1,ye=n.subtreeFlags,ye&8192||(ye&16785408)===16785408){ye={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:na},$m(n,f,ye);var Qe=(f&62914560)===f?ic-It():(f&4194048)===f?ig-It():0;if(Qe=y2(ye,Qe),Qe!==null){_a=f,t.cancelPendingCommit=Qe(mg.bind(null,t,n,f,a,o,u,v,C,G,ve,ye,null,le,de)),Qa(t,f,v,!ie);return}}mg(t,n,f,a,o,u,v,C,G)}function zx(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ai(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Qa(t,n,a,o){n&=~Kf,n&=~Pr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-ke(u),v=1<<f;o[f]=-1,u&=~v}a!==0&&Ht(t,a,n)}function sc(){return(Ft&6)===0?(Fo(0),!1):!0}function eh(){if(yt!==null){if(Xt===0)var t=yt.return;else t=yt,sa=Tr=null,gf(t),fs=null,xo=0,t=yt;for(;t!==null;)zm(t.alternate,t),t=t.return;yt=null}}function Ss(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,a2(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),_a=0,eh(),Jt=t,yt=a=aa(t.current,null),Tt=n,Xt=0,li=null,Za=!1,vs=Ne(t,n),Yf=!1,xs=ci=Kf=Pr=qa=fn=0,jn=Po=null,Qf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ke(o),f=1<<u;n|=t[u],o&=~f}return ga=n,Rl(),a}function lg(t,n){_t=null,B.H=Ro,n===us||n===Pl?(n=bp(),Xt=3):n===af?(n=bp(),Xt=4):Xt=n===Lf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,yt===null&&(fn=1,Kl(t,gi(n,t.current)))}function cg(){var t=si.current;return t===null?!0:(Tt&4194048)===Tt?Mi===null:(Tt&62914560)===Tt||(Tt&536870912)!==0?t===Mi:!1}function ug(){var t=B.H;return B.H=Ro,t===null?Ro:t}function fg(){var t=B.A;return B.A=Ix,t}function oc(){fn=4,Za||(Tt&4194048)!==Tt&&si.current!==null||(vs=!0),(qa&134217727)===0&&(Pr&134217727)===0||Jt===null||Qa(Jt,Tt,ci,!1)}function th(t,n,a){var o=Ft;Ft|=2;var u=ug(),f=fg();(Jt!==t||Tt!==n)&&(rc=null,Ss(t,n)),n=!1;var v=fn;e:do try{if(Xt!==0&&yt!==null){var C=yt,G=li;switch(Xt){case 8:eh(),v=6;break e;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var ie=Xt;if(Xt=0,li=null,ys(t,C,G,ie),a&&vs){v=0;break e}break;default:ie=Xt,Xt=0,li=null,ys(t,C,G,ie)}}Bx(),v=fn;break}catch(ve){lg(t,ve)}while(!0);return n&&t.shellSuspendCounter++,sa=Tr=null,Ft=o,B.H=u,B.A=f,yt===null&&(Jt=null,Tt=0,Rl()),v}function Bx(){for(;yt!==null;)hg(yt)}function Hx(t,n){var a=Ft;Ft|=2;var o=ug(),u=fg();Jt!==t||Tt!==n?(rc=null,ac=It()+500,Ss(t,n)):vs=Ne(t,n);e:do try{if(Xt!==0&&yt!==null){n=yt;var f=li;t:switch(Xt){case 1:Xt=0,li=null,ys(t,n,f,1);break;case 2:case 9:if(yp(f)){Xt=0,li=null,dg(n);break}n=function(){Xt!==2&&Xt!==9||Jt!==t||(Xt=7),ki(t)},f.then(n,n);break e;case 3:Xt=7;break e;case 4:Xt=5;break e;case 7:yp(f)?(Xt=0,li=null,dg(n)):(Xt=0,li=null,ys(t,n,f,7));break;case 5:var v=null;switch(yt.tag){case 26:v=yt.memoizedState;case 5:case 27:var C=yt;if(v?Jg(v):C.stateNode.complete){Xt=0,li=null;var G=C.sibling;if(G!==null)yt=G;else{var ie=C.return;ie!==null?(yt=ie,lc(ie)):yt=null}break t}}Xt=0,li=null,ys(t,n,f,5);break;case 6:Xt=0,li=null,ys(t,n,f,6);break;case 8:eh(),fn=6;break e;default:throw Error(r(462))}}Vx();break}catch(ve){lg(t,ve)}while(!0);return sa=Tr=null,B.H=o,B.A=u,Ft=a,yt!==null?0:(Jt=null,Tt=0,Rl(),fn)}function Vx(){for(;yt!==null&&!$t();)hg(yt)}function hg(t){var n=Im(t.alternate,t,ga);t.memoizedProps=t.pendingProps,n===null?lc(t):yt=n}function dg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Dm(a,n,n.pendingProps,n.type,void 0,Tt);break;case 11:n=Dm(a,n,n.pendingProps,n.type.render,n.ref,Tt);break;case 5:gf(n);default:zm(a,n),n=yt=fp(n,ga),n=Im(a,n,ga)}t.memoizedProps=t.pendingProps,n===null?lc(t):yt=n}function ys(t,n,a,o){sa=Tr=null,gf(n),fs=null,xo=0;var u=n.return;try{if(Cx(t,u,n,a,Tt)){fn=1,Kl(t,gi(a,t.current)),yt=null;return}}catch(f){if(u!==null)throw yt=u,f;fn=1,Kl(t,gi(a,t.current)),yt=null;return}n.flags&32768?(wt||o===1?t=!0:vs||(Tt&536870912)!==0?t=!1:(Za=t=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),pg(n,t)):lc(n)}function lc(t){var n=t;do{if((n.flags&32768)!==0){pg(n,Za);return}t=n.return;var a=Lx(n.alternate,n,ga);if(a!==null){yt=a;return}if(n=n.sibling,n!==null){yt=n;return}yt=n=t}while(n!==null);fn===0&&(fn=5)}function pg(t,n){do{var a=Nx(t.alternate,t);if(a!==null){a.flags&=32767,yt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){yt=t;return}yt=t=a}while(t!==null);fn=6,yt=null}function mg(t,n,a,o,u,f,v,C,G){t.cancelPendingCommit=null;do cc();while(yn!==0);if((Ft&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=Gu,nn(t,a,f,v,C,G),t===Jt&&(yt=Jt=null,Tt=0),Ms=n,Ka=t,_a=a,jf=f,Jf=u,ag=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Wx($,function(){return Mg(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=V.p,V.p=2,v=Ft,Ft|=4;try{Ox(t,n,a)}finally{Ft=v,V.p=u,B.T=o}}yn=1,gg(),_g(),vg()}}function gg(){if(yn===1){yn=0;var t=Ka,n=Ms,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=V.p;V.p=2;var u=Ft;Ft|=4;try{Qm(n,t);var f=dh,v=np(t.containerInfo),C=f.focusedElem,G=f.selectionRange;if(v!==C&&C&&C.ownerDocument&&tp(C.ownerDocument.documentElement,C)){if(G!==null&&Fu(C)){var ie=G.start,ve=G.end;if(ve===void 0&&(ve=ie),"selectionStart"in C)C.selectionStart=ie,C.selectionEnd=Math.min(ve,C.value.length);else{var ye=C.ownerDocument||document,le=ye&&ye.defaultView||window;if(le.getSelection){var de=le.getSelection(),Qe=C.textContent.length,lt=Math.min(G.start,Qe),Qt=G.end===void 0?lt:Math.min(G.end,Qe);!de.extend&&lt>Qt&&(v=Qt,Qt=lt,lt=v);var J=ep(C,lt),X=ep(C,Qt);if(J&&X&&(de.rangeCount!==1||de.anchorNode!==J.node||de.anchorOffset!==J.offset||de.focusNode!==X.node||de.focusOffset!==X.offset)){var ne=ye.createRange();ne.setStart(J.node,J.offset),de.removeAllRanges(),lt>Qt?(de.addRange(ne),de.extend(X.node,X.offset)):(ne.setEnd(X.node,X.offset),de.addRange(ne))}}}}for(ye=[],de=C;de=de.parentNode;)de.nodeType===1&&ye.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<ye.length;C++){var Me=ye[C];Me.element.scrollLeft=Me.left,Me.element.scrollTop=Me.top}}Sc=!!hh,dh=hh=null}finally{Ft=u,V.p=o,B.T=a}}t.current=n,yn=2}}function _g(){if(yn===2){yn=0;var t=Ka,n=Ms,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=V.p;V.p=2;var u=Ft;Ft|=4;try{Wm(t,n.alternate,n)}finally{Ft=u,V.p=o,B.T=a}}yn=3}}function vg(){if(yn===4||yn===3){yn=0,q();var t=Ka,n=Ms,a=_a,o=ag;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?yn=5:(yn=0,Ms=Ka=null,xg(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Ya=null),io(a),n=n.stateNode,ge&&typeof ge.onCommitFiberRoot=="function")try{ge.onCommitFiberRoot(pe,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,u=V.p,V.p=2,B.T=null;try{for(var f=t.onRecoverableError,v=0;v<o.length;v++){var C=o[v];f(C.value,{componentStack:C.stack})}}finally{B.T=n,V.p=u}}(_a&3)!==0&&cc(),ki(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===$f?Io++:(Io=0,$f=t):Io=0,Fo(0)}}function xg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,_o(n)))}function cc(){return gg(),_g(),vg(),Mg()}function Mg(){if(yn!==5)return!1;var t=Ka,n=jf;jf=0;var a=io(_a),o=B.T,u=V.p;try{V.p=32>a?32:a,B.T=null,a=Jf,Jf=null;var f=Ka,v=_a;if(yn=0,Ms=Ka=null,_a=0,(Ft&6)!==0)throw Error(r(331));var C=Ft;if(Ft|=4,tg(f.current),Jm(f,f.current,v,a),Ft=C,Fo(0,!1),ge&&typeof ge.onPostCommitFiberRoot=="function")try{ge.onPostCommitFiberRoot(pe,f)}catch{}return!0}finally{V.p=u,B.T=o,xg(t,n)}}function Sg(t,n,a){n=gi(a,n),n=Uf(t.stateNode,n,2),t=Ga(t,n,2),t!==null&&(qe(t,2),ki(t))}function Wt(t,n,a){if(t.tag===3)Sg(t,t,a);else for(;n!==null;){if(n.tag===3){Sg(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ya===null||!Ya.has(o))){t=gi(a,t),a=ym(2),o=Ga(n,a,2),o!==null&&(Em(a,o,n,t),qe(o,2),ki(o));break}}n=n.return}}function nh(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new Fx;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Yf=!0,u.add(a),t=Gx.bind(null,t,n,a),n.then(t,t))}function Gx(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Jt===t&&(Tt&a)===a&&(fn===4||fn===3&&(Tt&62914560)===Tt&&300>It()-ic?(Ft&2)===0&&Ss(t,0):Kf|=a,xs===Tt&&(xs=0)),ki(t)}function yg(t,n){n===0&&(n=Ae()),t=Er(t,n),t!==null&&(qe(t,n),ki(t))}function kx(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),yg(t,a)}function Xx(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),yg(t,a)}function Wx(t,n){return Mt(t,n)}var uc=null,Es=null,ih=!1,fc=!1,ah=!1,ja=0;function ki(t){t!==Es&&t.next===null&&(Es===null?uc=Es=t:Es=Es.next=t),fc=!0,ih||(ih=!0,qx())}function Fo(t,n){if(!ah&&fc){ah=!0;do for(var a=!1,o=uc;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var v=o.suspendedLanes,C=o.pingedLanes;f=(1<<31-ke(42|t)+1)-1,f&=u&~(v&~C),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Tg(o,f))}else f=Tt,f=xe(o,o===Jt?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Ne(o,f)||(a=!0,Tg(o,f));o=o.next}while(a);ah=!1}}function Zx(){Eg()}function Eg(){fc=ih=!1;var t=0;ja!==0&&i2()&&(t=ja);for(var n=It(),a=null,o=uc;o!==null;){var u=o.next,f=bg(o,n);f===0?(o.next=null,a===null?uc=u:a.next=u,u===null&&(Es=a)):(a=o,(t!==0||(f&3)!==0)&&(fc=!0)),o=u}yn!==0&&yn!==5||Fo(t),ja!==0&&(ja=0)}function bg(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var v=31-ke(f),C=1<<v,G=u[v];G===-1?((C&a)===0||(C&o)!==0)&&(u[v]=Ge(C,n)):G<=n&&(t.expiredLanes|=C),f&=~C}if(n=Jt,a=Tt,a=xe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(Xt===2||Xt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&zt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ne(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&zt(o),io(a)){case 2:case 8:a=E;break;case 32:a=$;break;case 268435456:a=me;break;default:a=$}return o=Ag.bind(null,t),a=Mt(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&zt(o),t.callbackPriority=2,t.callbackNode=null,2}function Ag(t,n){if(yn!==0&&yn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(cc()&&t.callbackNode!==a)return null;var o=Tt;return o=xe(t,t===Jt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(sg(t,o,n),bg(t,It()),t.callbackNode!=null&&t.callbackNode===a?Ag.bind(null,t):null)}function Tg(t,n){if(cc())return null;sg(t,n,!0)}function qx(){r2(function(){(Ft&6)!==0?Mt(I,Zx):Eg()})}function rh(){if(ja===0){var t=ls;t===0&&(t=at,at<<=1,(at&261888)===0&&(at=256)),ja=t}return ja}function Rg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:xr(""+t)}function wg(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Yx(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=Rg((u[wn]||null).action),v=o.submitter;v&&(n=(n=v[wn]||null)?Rg(n.formAction):v.getAttribute("formAction"),n!==null&&(f=n,v=null));var C=new El("action","action",null,o,u);t.push({event:C,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ja!==0){var G=v?wg(u,v):new FormData(u);Af(a,{pending:!0,data:G,method:u.method,action:f},null,G)}}else typeof f=="function"&&(C.preventDefault(),G=v?wg(u,v):new FormData(u),Af(a,{pending:!0,data:G,method:u.method,action:f},f,G))},currentTarget:u}]})}}for(var sh=0;sh<Vu.length;sh++){var oh=Vu[sh],Kx=oh.toLowerCase(),Qx=oh[0].toUpperCase()+oh.slice(1);Ci(Kx,"on"+Qx)}Ci(rp,"onAnimationEnd"),Ci(sp,"onAnimationIteration"),Ci(op,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(hx,"onTransitionRun"),Ci(dx,"onTransitionStart"),Ci(px,"onTransitionCancel"),Ci(lp,"onTransitionEnd"),oe("onMouseEnter",["mouseout","mouseover"]),oe("onMouseLeave",["mouseout","mouseover"]),oe("onPointerEnter",["pointerout","pointerover"]),oe("onPointerLeave",["pointerout","pointerover"]),Y("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Y("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Y("onBeforeInput",["compositionend","keypress","textInput","paste"]),Y("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zo));function Cg(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var f=void 0;if(n)for(var v=o.length-1;0<=v;v--){var C=o[v],G=C.instance,ie=C.currentTarget;if(C=C.listener,G!==f&&u.isPropagationStopped())break e;f=C,u.currentTarget=ie;try{f(u)}catch(ve){Tl(ve)}u.currentTarget=null,f=G}else for(v=0;v<o.length;v++){if(C=o[v],G=C.instance,ie=C.currentTarget,C=C.listener,G!==f&&u.isPropagationStopped())break e;f=C,u.currentTarget=ie;try{f(u)}catch(ve){Tl(ve)}u.currentTarget=null,f=G}}}}function Et(t,n){var a=n[gr];a===void 0&&(a=n[gr]=new Set);var o=t+"__bubble";a.has(o)||(Dg(n,t,2,!1),a.add(o))}function lh(t,n,a){var o=0;n&&(o|=4),Dg(a,t,o,n)}var hc="_reactListening"+Math.random().toString(36).slice(2);function ch(t){if(!t[hc]){t[hc]=!0,xl.forEach(function(a){a!=="selectionchange"&&(jx.has(a)||lh(a,!1,t),lh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[hc]||(n[hc]=!0,lh("selectionchange",!1,n))}}function Dg(t,n,a,o){switch(r1(n)){case 2:var u=A2;break;case 8:u=T2;break;default:u=bh}a=u.bind(null,n,a,t),u=void 0,!wu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function uh(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var C=o.stateNode.containerInfo;if(C===u)break;if(v===4)for(v=o.return;v!==null;){var G=v.tag;if((G===3||G===4)&&v.stateNode.containerInfo===u)return;v=v.return}for(;C!==null;){if(v=ea(C),v===null)return;if(G=v.tag,G===5||G===6||G===26||G===27){o=f=v;continue e}C=C.parentNode}}o=o.return}P0(function(){var ie=f,ve=Tu(a),ye=[];e:{var le=cp.get(t);if(le!==void 0){var de=El,Qe=t;switch(t){case"keypress":if(Sl(a)===0)break e;case"keydown":case"keyup":de=Xv;break;case"focusin":Qe="focus",de=Lu;break;case"focusout":Qe="blur",de=Lu;break;case"beforeblur":case"afterblur":de=Lu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=z0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=Lv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=qv;break;case rp:case sp:case op:de=Pv;break;case lp:de=Kv;break;case"scroll":case"scrollend":de=Dv;break;case"wheel":de=jv;break;case"copy":case"cut":case"paste":de=Fv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=H0;break;case"toggle":case"beforetoggle":de=$v}var lt=(n&4)!==0,Qt=!lt&&(t==="scroll"||t==="scrollend"),J=lt?le!==null?le+"Capture":null:le;lt=[];for(var X=ie,ne;X!==null;){var Me=X;if(ne=Me.stateNode,Me=Me.tag,Me!==5&&Me!==26&&Me!==27||ne===null||J===null||(Me=ro(X,J),Me!=null&&lt.push(Bo(X,Me,ne))),Qt)break;X=X.return}0<lt.length&&(le=new de(le,Qe,null,a,ve),ye.push({event:le,listeners:lt}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",de=t==="mouseout"||t==="pointerout",le&&a!==Au&&(Qe=a.relatedTarget||a.fromElement)&&(ea(Qe)||Qe[Zn]))break e;if((de||le)&&(le=ve.window===ve?ve:(le=ve.ownerDocument)?le.defaultView||le.parentWindow:window,de?(Qe=a.relatedTarget||a.toElement,de=ie,Qe=Qe?ea(Qe):null,Qe!==null&&(Qt=c(Qe),lt=Qe.tag,Qe!==Qt||lt!==5&&lt!==27&&lt!==6)&&(Qe=null)):(de=null,Qe=ie),de!==Qe)){if(lt=z0,Me="onMouseLeave",J="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(lt=H0,Me="onPointerLeave",J="onPointerEnter",X="pointer"),Qt=de==null?le:vr(de),ne=Qe==null?le:vr(Qe),le=new lt(Me,X+"leave",de,a,ve),le.target=Qt,le.relatedTarget=ne,Me=null,ea(ve)===ie&&(lt=new lt(J,X+"enter",Qe,a,ve),lt.target=ne,lt.relatedTarget=Qt,Me=lt),Qt=Me,de&&Qe)t:{for(lt=Jx,J=de,X=Qe,ne=0,Me=J;Me;Me=lt(Me))ne++;Me=0;for(var st=X;st;st=lt(st))Me++;for(;0<ne-Me;)J=lt(J),ne--;for(;0<Me-ne;)X=lt(X),Me--;for(;ne--;){if(J===X||X!==null&&J===X.alternate){lt=J;break t}J=lt(J),X=lt(X)}lt=null}else lt=null;de!==null&&Ug(ye,le,de,lt,!1),Qe!==null&&Qt!==null&&Ug(ye,Qt,Qe,lt,!0)}}e:{if(le=ie?vr(ie):window,de=le.nodeName&&le.nodeName.toLowerCase(),de==="select"||de==="input"&&le.type==="file")var Ot=Y0;else if(Z0(le))if(K0)Ot=cx;else{Ot=ox;var $e=sx}else de=le.nodeName,!de||de.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?ie&&Bt(ie.elementType)&&(Ot=Y0):Ot=lx;if(Ot&&(Ot=Ot(t,ie))){q0(ye,Ot,a,ve);break e}$e&&$e(t,le,ie),t==="focusout"&&ie&&le.type==="number"&&ie.memoizedProps.value!=null&&St(le,"number",le.value)}switch($e=ie?vr(ie):window,t){case"focusin":(Z0($e)||$e.contentEditable==="true")&&(es=$e,zu=ie,po=null);break;case"focusout":po=zu=es=null;break;case"mousedown":Bu=!0;break;case"contextmenu":case"mouseup":case"dragend":Bu=!1,ip(ye,a,ve);break;case"selectionchange":if(fx)break;case"keydown":case"keyup":ip(ye,a,ve)}var vt;if(Ou)e:{switch(t){case"compositionstart":var Rt="onCompositionStart";break e;case"compositionend":Rt="onCompositionEnd";break e;case"compositionupdate":Rt="onCompositionUpdate";break e}Rt=void 0}else $r?X0(t,a)&&(Rt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Rt="onCompositionStart");Rt&&(V0&&a.locale!=="ko"&&($r||Rt!=="onCompositionStart"?Rt==="onCompositionEnd"&&$r&&(vt=I0()):(Pa=ve,Cu="value"in Pa?Pa.value:Pa.textContent,$r=!0)),$e=dc(ie,Rt),0<$e.length&&(Rt=new B0(Rt,t,null,a,ve),ye.push({event:Rt,listeners:$e}),vt?Rt.data=vt:(vt=W0(a),vt!==null&&(Rt.data=vt)))),(vt=tx?nx(t,a):ix(t,a))&&(Rt=dc(ie,"onBeforeInput"),0<Rt.length&&($e=new B0("onBeforeInput","beforeinput",null,a,ve),ye.push({event:$e,listeners:Rt}),$e.data=vt)),Yx(ye,t,ie,a,ve)}Cg(ye,n)})}function Bo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function dc(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=ro(t,a),u!=null&&o.unshift(Bo(t,u,f)),u=ro(t,n),u!=null&&o.push(Bo(t,u,f))),t.tag===3)return o;t=t.return}return[]}function Jx(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Ug(t,n,a,o,u){for(var f=n._reactName,v=[];a!==null&&a!==o;){var C=a,G=C.alternate,ie=C.stateNode;if(C=C.tag,G!==null&&G===o)break;C!==5&&C!==26&&C!==27||ie===null||(G=ie,u?(ie=ro(a,f),ie!=null&&v.unshift(Bo(a,ie,G))):u||(ie=ro(a,f),ie!=null&&v.push(Bo(a,ie,G)))),a=a.return}v.length!==0&&t.push({event:n,listeners:v})}var $x=/\r\n?/g,e2=/\u0000|\uFFFD/g;function Lg(t){return(typeof t=="string"?t:""+t).replace($x,`
`).replace(e2,"")}function Ng(t,n){return n=Lg(n),Lg(t)===n}function Kt(t,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ii(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ii(t,""+o);break;case"className":Ke(t,"class",o);break;case"tabIndex":Ke(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ke(t,a,o);break;case"style":wi(t,o,f);break;case"data":if(n!=="object"){Ke(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=xr(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Kt(t,n,"name",u.name,u,null),Kt(t,n,"formEncType",u.formEncType,u,null),Kt(t,n,"formMethod",u.formMethod,u,null),Kt(t,n,"formTarget",u.formTarget,u,null)):(Kt(t,n,"encType",u.encType,u,null),Kt(t,n,"method",u.method,u,null),Kt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=xr(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=na);break;case"onScroll":o!=null&&Et("scroll",t);break;case"onScrollEnd":o!=null&&Et("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=xr(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Et("beforetoggle",t),Et("toggle",t),Fe(t,"popover",o);break;case"xlinkActuate":Ye(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ye(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ye(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ye(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ye(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ye(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Fe(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Bi.get(a)||a,Fe(t,a,o))}}function fh(t,n,a,o,u,f){switch(a){case"style":wi(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof o=="string"?ii(t,o):(typeof o=="number"||typeof o=="bigint")&&ii(t,""+o);break;case"onScroll":o!=null&&Et("scroll",t);break;case"onScrollEnd":o!=null&&Et("scrollend",t);break;case"onClick":o!=null&&(t.onclick=na);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[wn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Fe(t,a,o)}}}function Ln(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Et("error",t),Et("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var v=a[f];if(v!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Kt(t,n,f,v,a,null)}}u&&Kt(t,n,"srcSet",a.srcSet,a,null),o&&Kt(t,n,"src",a.src,a,null);return;case"input":Et("invalid",t);var C=f=v=u=null,G=null,ie=null;for(o in a)if(a.hasOwnProperty(o)){var ve=a[o];if(ve!=null)switch(o){case"name":u=ve;break;case"type":v=ve;break;case"checked":G=ve;break;case"defaultChecked":ie=ve;break;case"value":f=ve;break;case"defaultValue":C=ve;break;case"children":case"dangerouslySetInnerHTML":if(ve!=null)throw Error(r(137,n));break;default:Kt(t,n,o,ve,a,null)}}In(t,f,C,G,ie,v,u,!1);return;case"select":Et("invalid",t),o=v=f=null;for(u in a)if(a.hasOwnProperty(u)&&(C=a[u],C!=null))switch(u){case"value":f=C;break;case"defaultValue":v=C;break;case"multiple":o=C;default:Kt(t,n,u,C,a,null)}n=f,a=v,t.multiple=!!o,n!=null?Sn(t,!!o,n,!1):a!=null&&Sn(t,!!o,a,!0);return;case"textarea":Et("invalid",t),f=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(C=a[v],C!=null))switch(v){case"value":o=C;break;case"defaultValue":u=C;break;case"children":f=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(r(91));break;default:Kt(t,n,v,C,a,null)}Ri(t,o,u,f);return;case"option":for(G in a)if(a.hasOwnProperty(G)&&(o=a[G],o!=null))switch(G){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Kt(t,n,G,o,a,null)}return;case"dialog":Et("beforetoggle",t),Et("toggle",t),Et("cancel",t),Et("close",t);break;case"iframe":case"object":Et("load",t);break;case"video":case"audio":for(o=0;o<zo.length;o++)Et(zo[o],t);break;case"image":Et("error",t),Et("load",t);break;case"details":Et("toggle",t);break;case"embed":case"source":case"link":Et("error",t),Et("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ie in a)if(a.hasOwnProperty(ie)&&(o=a[ie],o!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Kt(t,n,ie,o,a,null)}return;default:if(Bt(n)){for(ve in a)a.hasOwnProperty(ve)&&(o=a[ve],o!==void 0&&fh(t,n,ve,o,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(o=a[C],o!=null&&Kt(t,n,C,o,a,null))}function t2(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,v=null,C=null,G=null,ie=null,ve=null;for(de in a){var ye=a[de];if(a.hasOwnProperty(de)&&ye!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":G=ye;default:o.hasOwnProperty(de)||Kt(t,n,de,null,o,ye)}}for(var le in o){var de=o[le];if(ye=a[le],o.hasOwnProperty(le)&&(de!=null||ye!=null))switch(le){case"type":f=de;break;case"name":u=de;break;case"checked":ie=de;break;case"defaultChecked":ve=de;break;case"value":v=de;break;case"defaultValue":C=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(r(137,n));break;default:de!==ye&&Kt(t,n,le,de,o,ye)}}Xe(t,v,C,G,ie,ve,f,u);return;case"select":de=v=C=le=null;for(f in a)if(G=a[f],a.hasOwnProperty(f)&&G!=null)switch(f){case"value":break;case"multiple":de=G;default:o.hasOwnProperty(f)||Kt(t,n,f,null,o,G)}for(u in o)if(f=o[u],G=a[u],o.hasOwnProperty(u)&&(f!=null||G!=null))switch(u){case"value":le=f;break;case"defaultValue":C=f;break;case"multiple":v=f;default:f!==G&&Kt(t,n,u,f,o,G)}n=C,a=v,o=de,le!=null?Sn(t,!!a,le,!1):!!o!=!!a&&(n!=null?Sn(t,!!a,n,!0):Sn(t,!!a,a?[]:"",!1));return;case"textarea":de=le=null;for(C in a)if(u=a[C],a.hasOwnProperty(C)&&u!=null&&!o.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Kt(t,n,C,null,o,u)}for(v in o)if(u=o[v],f=a[v],o.hasOwnProperty(v)&&(u!=null||f!=null))switch(v){case"value":le=u;break;case"defaultValue":de=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Kt(t,n,v,u,o,f)}ni(t,le,de);return;case"option":for(var Qe in a)if(le=a[Qe],a.hasOwnProperty(Qe)&&le!=null&&!o.hasOwnProperty(Qe))switch(Qe){case"selected":t.selected=!1;break;default:Kt(t,n,Qe,null,o,le)}for(G in o)if(le=o[G],de=a[G],o.hasOwnProperty(G)&&le!==de&&(le!=null||de!=null))switch(G){case"selected":t.selected=le&&typeof le!="function"&&typeof le!="symbol";break;default:Kt(t,n,G,le,o,de)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in a)le=a[lt],a.hasOwnProperty(lt)&&le!=null&&!o.hasOwnProperty(lt)&&Kt(t,n,lt,null,o,le);for(ie in o)if(le=o[ie],de=a[ie],o.hasOwnProperty(ie)&&le!==de&&(le!=null||de!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(r(137,n));break;default:Kt(t,n,ie,le,o,de)}return;default:if(Bt(n)){for(var Qt in a)le=a[Qt],a.hasOwnProperty(Qt)&&le!==void 0&&!o.hasOwnProperty(Qt)&&fh(t,n,Qt,void 0,o,le);for(ve in o)le=o[ve],de=a[ve],!o.hasOwnProperty(ve)||le===de||le===void 0&&de===void 0||fh(t,n,ve,le,o,de);return}}for(var J in a)le=a[J],a.hasOwnProperty(J)&&le!=null&&!o.hasOwnProperty(J)&&Kt(t,n,J,null,o,le);for(ye in o)le=o[ye],de=a[ye],!o.hasOwnProperty(ye)||le===de||le==null&&de==null||Kt(t,n,ye,le,o,de)}function Og(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function n2(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,v=u.initiatorType,C=u.duration;if(f&&C&&Og(v)){for(v=0,C=u.responseEnd,o+=1;o<a.length;o++){var G=a[o],ie=G.startTime;if(ie>C)break;var ve=G.transferSize,ye=G.initiatorType;ve&&Og(ye)&&(G=G.responseEnd,v+=ve*(G<C?1:(C-ie)/(G-ie)))}if(--o,n+=8*(f+v)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var hh=null,dh=null;function pc(t){return t.nodeType===9?t:t.ownerDocument}function Pg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ig(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ph(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var mh=null;function i2(){var t=window.event;return t&&t.type==="popstate"?t===mh?!1:(mh=t,!0):(mh=null,!1)}var Fg=typeof setTimeout=="function"?setTimeout:void 0,a2=typeof clearTimeout=="function"?clearTimeout:void 0,zg=typeof Promise=="function"?Promise:void 0,r2=typeof queueMicrotask=="function"?queueMicrotask:typeof zg<"u"?function(t){return zg.resolve(null).then(t).catch(s2)}:Fg;function s2(t){setTimeout(function(){throw t})}function Ja(t){return t==="head"}function Bg(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Rs(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ho(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Ho(a);for(var f=a.firstChild;f;){var v=f.nextSibling,C=f.nodeName;f[Ua]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=v}}else a==="body"&&Ho(t.ownerDocument.body);a=u}while(a);Rs(n)}function Hg(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function gh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":gh(a),La(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function o2(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ua])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=Si(t.nextSibling),t===null)break}return null}function l2(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Si(t.nextSibling),t===null))return null;return t}function Vg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Si(t.nextSibling),t===null))return null;return t}function _h(t){return t.data==="$?"||t.data==="$~"}function vh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function c2(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Si(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var xh=null;function Gg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Si(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function kg(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Xg(t,n,a){switch(n=pc(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Ho(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);La(t)}var yi=new Map,Wg=new Set;function mc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var va=V.d;V.d={f:u2,r:f2,D:h2,C:d2,L:p2,m:m2,X:_2,S:g2,M:v2};function u2(){var t=va.f(),n=sc();return t||n}function f2(t){var n=ta(t);n!==null&&n.tag===5&&n.type==="form"?lm(n):va.r(t)}var bs=typeof document>"u"?null:document;function Zg(t,n,a){var o=bs;if(o&&typeof n=="string"&&n){var u=Gt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Wg.has(u)||(Wg.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Ln(n,"link",t),mn(n),o.head.appendChild(n)))}}function h2(t){va.D(t),Zg("dns-prefetch",t,null)}function d2(t,n){va.C(t,n),Zg("preconnect",t,n)}function p2(t,n,a){va.L(t,n,a);var o=bs;if(o&&t&&n){var u='link[rel="preload"][as="'+Gt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Gt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Gt(a.imageSizes)+'"]')):u+='[href="'+Gt(t)+'"]';var f=u;switch(n){case"style":f=As(t);break;case"script":f=Ts(t)}yi.has(f)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),yi.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Vo(f))||n==="script"&&o.querySelector(Go(f))||(n=o.createElement("link"),Ln(n,"link",t),mn(n),o.head.appendChild(n)))}}function m2(t,n){va.m(t,n);var a=bs;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Gt(o)+'"][href="'+Gt(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Ts(t)}if(!yi.has(f)&&(t=_({rel:"modulepreload",href:t},n),yi.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Go(f)))return}o=a.createElement("link"),Ln(o,"link",t),mn(o),a.head.appendChild(o)}}}function g2(t,n,a){va.S(t,n,a);var o=bs;if(o&&t){var u=Na(o).hoistableStyles,f=As(t);n=n||"default";var v=u.get(f);if(!v){var C={loading:0,preload:null};if(v=o.querySelector(Vo(f)))C.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=yi.get(f))&&Mh(t,a);var G=v=o.createElement("link");mn(G),Ln(G,"link",t),G._p=new Promise(function(ie,ve){G.onload=ie,G.onerror=ve}),G.addEventListener("load",function(){C.loading|=1}),G.addEventListener("error",function(){C.loading|=2}),C.loading|=4,gc(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:C},u.set(f,v)}}}function _2(t,n){va.X(t,n);var a=bs;if(a&&t){var o=Na(a).hoistableScripts,u=Ts(t),f=o.get(u);f||(f=a.querySelector(Go(u)),f||(t=_({src:t,async:!0},n),(n=yi.get(u))&&Sh(t,n),f=a.createElement("script"),mn(f),Ln(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function v2(t,n){va.M(t,n);var a=bs;if(a&&t){var o=Na(a).hoistableScripts,u=Ts(t),f=o.get(u);f||(f=a.querySelector(Go(u)),f||(t=_({src:t,async:!0,type:"module"},n),(n=yi.get(u))&&Sh(t,n),f=a.createElement("script"),mn(f),Ln(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function qg(t,n,a,o){var u=(u=te.current)?mc(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=As(a.href),a=Na(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=As(a.href);var f=Na(u).hoistableStyles,v=f.get(t);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,v),(f=u.querySelector(Vo(t)))&&!f._p&&(v.instance=f,v.state.loading=5),yi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(t,a),f||x2(u,t,a,v.state))),n&&o===null)throw Error(r(528,""));return v}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Ts(a),a=Na(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function As(t){return'href="'+Gt(t)+'"'}function Vo(t){return'link[rel="stylesheet"]['+t+"]"}function Yg(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function x2(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Ln(n,"link",a),mn(n),t.head.appendChild(n))}function Ts(t){return'[src="'+Gt(t)+'"]'}function Go(t){return"script[async]"+t}function Kg(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Gt(a.href)+'"]');if(o)return n.instance=o,mn(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),mn(o),Ln(o,"style",u),gc(o,a.precedence,t),n.instance=o;case"stylesheet":u=As(a.href);var f=t.querySelector(Vo(u));if(f)return n.state.loading|=4,n.instance=f,mn(f),f;o=Yg(a),(u=yi.get(u))&&Mh(o,u),f=(t.ownerDocument||t).createElement("link"),mn(f);var v=f;return v._p=new Promise(function(C,G){v.onload=C,v.onerror=G}),Ln(f,"link",o),n.state.loading|=4,gc(f,a.precedence,t),n.instance=f;case"script":return f=Ts(a.src),(u=t.querySelector(Go(f)))?(n.instance=u,mn(u),u):(o=a,(u=yi.get(f))&&(o=_({},a),Sh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),mn(u),Ln(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,gc(o,a.precedence,t));return n.instance}function gc(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,v=0;v<o.length;v++){var C=o[v];if(C.dataset.precedence===n)f=C;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Sh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var _c=null;function Qg(t,n,a){if(_c===null){var o=new Map,u=_c=new Map;u.set(a,o)}else u=_c,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[Ua]||f[pn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var v=f.getAttribute(n)||"";v=t+v;var C=o.get(v);C?C.push(f):o.set(v,[f])}}return o}function jg(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function M2(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Jg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function S2(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=As(o.href),f=n.querySelector(Vo(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=vc.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,mn(f);return}f=n.ownerDocument||n,o=Yg(o),(u=yi.get(u))&&Mh(o,u),f=f.createElement("link"),mn(f);var v=f;v._p=new Promise(function(C,G){v.onload=C,v.onerror=G}),Ln(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=vc.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var yh=0;function y2(t,n){return t.stylesheets&&t.count===0&&Mc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&Mc(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&yh===0&&(yh=62500*n2());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Mc(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>yh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function vc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Mc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var xc=null;function Mc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,xc=new Map,n.forEach(E2,t),xc=null,vc.call(t))}function E2(t,n){if(!(n.state.loading&4)){var a=xc.get(t);if(a)var o=a.get(null);else{a=new Map,xc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var v=u[f];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),f=a.get(v)||o,f===o&&a.set(null,u),a.set(v,u),this.count++,o=vc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var ko={$$typeof:z,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function b2(t,n,a,o,u,f,v,C,G){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Je(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Je(0),this.hiddenUpdates=Je(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function $g(t,n,a,o,u,f,v,C,G,ie,ve,ye){return t=new b2(t,n,a,v,G,ie,ve,ye,C),n=1,f===!0&&(n|=24),f=ri(3,null,null,n),t.current=f,f.stateNode=t,n=ef(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},rf(f),t}function e1(t){return t?(t=is,t):is}function t1(t,n,a,o,u,f){u=e1(u),o.context===null?o.context=u:o.pendingContext=u,o=Va(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Ga(t,o,n),a!==null&&(Jn(a,t,n),So(a,t,n))}function n1(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Eh(t,n){n1(t,n),(t=t.alternate)&&n1(t,n)}function i1(t){if(t.tag===13||t.tag===31){var n=Er(t,67108864);n!==null&&Jn(n,t,67108864),Eh(t,67108864)}}function a1(t){if(t.tag===13||t.tag===31){var n=ui();n=no(n);var a=Er(t,n);a!==null&&Jn(a,t,n),Eh(t,n)}}var Sc=!0;function A2(t,n,a,o){var u=B.T;B.T=null;var f=V.p;try{V.p=2,bh(t,n,a,o)}finally{V.p=f,B.T=u}}function T2(t,n,a,o){var u=B.T;B.T=null;var f=V.p;try{V.p=8,bh(t,n,a,o)}finally{V.p=f,B.T=u}}function bh(t,n,a,o){if(Sc){var u=Ah(o);if(u===null)uh(t,n,o,yc,a),s1(t,o);else if(w2(u,t,n,a,o))o.stopPropagation();else if(s1(t,o),n&4&&-1<R2.indexOf(t)){for(;u!==null;){var f=ta(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var v=Ce(f.pendingLanes);if(v!==0){var C=f;for(C.pendingLanes|=2,C.entangledLanes|=2;v;){var G=1<<31-ke(v);C.entanglements[1]|=G,v&=~G}ki(f),(Ft&6)===0&&(ac=It()+500,Fo(0))}}break;case 31:case 13:C=Er(f,2),C!==null&&Jn(C,f,2),sc(),Eh(f,2)}if(f=Ah(o),f===null&&uh(t,n,o,yc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else uh(t,n,o,null,a)}}function Ah(t){return t=Tu(t),Th(t)}var yc=null;function Th(t){if(yc=null,t=ea(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=p(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return yc=t,null}function r1(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ct()){case I:return 2;case E:return 8;case $:case se:return 32;case me:return 268435456;default:return 32}default:return 32}}var Rh=!1,$a=null,er=null,tr=null,Xo=new Map,Wo=new Map,nr=[],R2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function s1(t,n){switch(t){case"focusin":case"focusout":$a=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":Xo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wo.delete(n.pointerId)}}function Zo(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=ta(n),n!==null&&i1(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function w2(t,n,a,o,u){switch(n){case"focusin":return $a=Zo($a,t,n,a,o,u),!0;case"dragenter":return er=Zo(er,t,n,a,o,u),!0;case"mouseover":return tr=Zo(tr,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Xo.set(f,Zo(Xo.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Wo.set(f,Zo(Wo.get(f)||null,t,n,a,o,u)),!0}return!1}function o1(t){var n=ea(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Qr(t.priority,function(){a1(a)});return}}else if(n===31){if(n=p(a),n!==null){t.blockedOn=n,Qr(t.priority,function(){a1(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ec(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Ah(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Au=o,a.target.dispatchEvent(o),Au=null}else return n=ta(a),n!==null&&i1(n),t.blockedOn=a,!1;n.shift()}return!0}function l1(t,n,a){Ec(t)&&a.delete(n)}function C2(){Rh=!1,$a!==null&&Ec($a)&&($a=null),er!==null&&Ec(er)&&(er=null),tr!==null&&Ec(tr)&&(tr=null),Xo.forEach(l1),Wo.forEach(l1)}function bc(t,n){t.blockedOn===n&&(t.blockedOn=null,Rh||(Rh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,C2)))}var Ac=null;function c1(t){Ac!==t&&(Ac=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Ac===t&&(Ac=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Th(o||a)===null)continue;break}var f=ta(a);f!==null&&(t.splice(n,3),n-=3,Af(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Rs(t){function n(G){return bc(G,t)}$a!==null&&bc($a,t),er!==null&&bc(er,t),tr!==null&&bc(tr,t),Xo.forEach(n),Wo.forEach(n);for(var a=0;a<nr.length;a++){var o=nr[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<nr.length&&(a=nr[0],a.blockedOn===null);)o1(a),a.blockedOn===null&&nr.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],v=u[wn]||null;if(typeof f=="function")v||c1(a);else if(v){var C=null;if(f&&f.hasAttribute("formAction")){if(u=f,v=f[wn]||null)C=v.formAction;else if(Th(u)!==null)continue}else C=v.action;typeof C=="function"?a[o+1]=C:(a.splice(o,3),o-=3),c1(a)}}}function u1(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(v){return u=v})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function wh(t){this._internalRoot=t}Tc.prototype.render=wh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ui();t1(a,o,t,n,null,null)},Tc.prototype.unmount=wh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;t1(t.current,2,null,t,null,null),sc(),n[Zn]=null}};function Tc(t){this._internalRoot=t}Tc.prototype.unstable_scheduleHydration=function(t){if(t){var n=ao();t={blockedOn:null,target:t,priority:n};for(var a=0;a<nr.length&&n!==0&&n<nr[a].priority;a++);nr.splice(a,0,t),a===0&&o1(t)}};var f1=e.version;if(f1!=="19.2.0")throw Error(r(527,f1,"19.2.0"));V.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=d(n),t=t!==null?x(t):null,t=t===null?null:t.stateNode,t};var D2={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rc.isDisabled&&Rc.supportsFiber)try{pe=Rc.inject(D2),ge=Rc}catch{}}return Yo.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",u=vm,f=xm,v=Mm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError)),n=$g(t,1,!1,null,null,a,o,null,u,f,v,u1),t[Zn]=n.current,ch(t),new wh(n)},Yo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,u="",f=vm,v=xm,C=Mm,G=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(G=a.formState)),n=$g(t,1,!0,n,a??null,o,u,G,f,v,C,u1),n.context=e1(null),a=n.current,o=ui(),o=no(o),u=Va(o),u.callback=null,Ga(a,u,o),a=o,n.current.lanes=a,qe(n,a),ki(n),t[Zn]=n.current,ch(t),new Tc(n)},Yo.version="19.2.0",Yo}var S1;function G2(){if(S1)return Uh.exports;S1=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Uh.exports=V2(),Uh.exports}var k2=G2();const X2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z",opacity:"0.2"}),T.createElement("path",{d:"M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z"}))]]),W2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M112,56V200L40,128Z",opacity:"0.2"}),T.createElement("path",{d:"M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-13.66,5.66l-72-72a8,8,0,0,1,0-11.32l72-72A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H54.49l61.75,61.76a6,6,0,1,1-8.48,8.48l-72-72a6,6,0,0,1,0-8.48l72-72a6,6,0,0,1,8.48,8.48L54.49,122H216A6,6,0,0,1,222,128Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H49.66l65.17,65.17a4,4,0,0,1-5.66,5.66l-72-72a4,4,0,0,1,0-5.66l72-72a4,4,0,0,1,5.66,5.66L49.66,124H216A4,4,0,0,1,220,128Z"}))]]),Z2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M216,128l-72,72V56Z",opacity:"0.2"}),T.createElement("path",{d:"M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z"}))]]),q2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,112H56l72-72Z",opacity:"0.2"}),T.createElement("path",{d:"M205.66,106.34l-72-72a8,8,0,0,0-11.32,0l-72,72A8,8,0,0,0,56,120h64v96a8,8,0,0,0,16,0V120h64a8,8,0,0,0,5.66-13.66ZM75.31,104,128,51.31,180.69,104Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M204.24,116.24a6,6,0,0,1-8.48,0L134,54.49V216a6,6,0,0,1-12,0V54.49L60.24,116.24a6,6,0,0,1-8.48-8.48l72-72a6,6,0,0,1,8.48,0l72,72A6,6,0,0,1,204.24,116.24Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M202.83,114.83a4,4,0,0,1-5.66,0L132,49.66V216a4,4,0,0,1-8,0V49.66L58.83,114.83a4,4,0,0,1-5.66-5.66l72-72a4,4,0,0,1,5.66,0l72,72A4,4,0,0,1,202.83,114.83Z"}))]]),Y2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M160,48V208L80,128Z",opacity:"0.2"}),T.createElement("path",{d:"M163.06,40.61a8,8,0,0,0-8.72,1.73l-80,80a8,8,0,0,0,0,11.32l80,80A8,8,0,0,0,168,208V48A8,8,0,0,0,163.06,40.61ZM152,188.69,91.31,128,152,67.31Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M168,48V208a8,8,0,0,1-13.66,5.66l-80-80a8,8,0,0,1,0-11.32l80-80A8,8,0,0,1,168,48Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M162.83,205.17a4,4,0,0,1-5.66,5.66l-80-80a4,4,0,0,1,0-5.66l80-80a4,4,0,1,1,5.66,5.66L85.66,128Z"}))]]),K2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M176,128,96,208V48Z",opacity:"0.2"}),T.createElement("path",{d:"M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M180.24,132.24l-80,80a6,6,0,0,1-8.48-8.48L167.51,128,91.76,52.24a6,6,0,0,1,8.48-8.48l80,80A6,6,0,0,1,180.24,132.24Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"}))]]),Q2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z",opacity:"0.2"}),T.createElement("path",{d:"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42ZM128,217.11C111.59,207.64,30,157.72,30,102A48.05,48.05,0,0,1,78,54c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,64.83,157.72,54,178,54a48.05,48.05,0,0,1,48,48C226,157.72,144.41,207.64,128,217.11Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z"}))]]),j2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",opacity:"0.2"}),T.createElement("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z"}))]]),J2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M96,240l16-80L48,136,160,16,144,96l64,24Z",opacity:"0.2"}),T.createElement("path",{d:"M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M213.84,118.63a6,6,0,0,0-3.73-4.25L150.88,92.17l15-75a6,6,0,0,0-10.27-5.27l-112,120a6,6,0,0,0,2.28,9.71l59.23,22.21-15,75a6,6,0,0,0,3.14,6.52A6.07,6.07,0,0,0,96,246a6,6,0,0,0,4.39-1.91l112-120A6,6,0,0,0,213.84,118.63ZM106,220.46l11.85-59.28a6,6,0,0,0-3.77-6.8l-55.6-20.85,91.46-98L138.12,94.82a6,6,0,0,0,3.77,6.8l55.6,20.85Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M211.89,119.09a4,4,0,0,0-2.49-2.84l-60.81-22.8,15.33-76.67a4,4,0,0,0-6.84-3.51l-112,120a4,4,0,0,0-1,3.64,4,4,0,0,0,2.49,2.84l60.81,22.8L92.08,239.22a4,4,0,0,0,6.84,3.51l112-120A4,4,0,0,0,211.89,119.09ZM102.68,227l13.24-66.2a4,4,0,0,0-2.52-4.53L55,134.36,153.32,29l-13.24,66.2a4,4,0,0,0,2.52,4.53L201,121.64Z"}))]]),$2=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"}),T.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"}))]]),eM=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z",opacity:"0.2"}),T.createElement("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z"}))]]),tM=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M157.27,21.22a12,12,0,0,0-12.64,1.31L75.88,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V32A12,12,0,0,0,157.27,21.22ZM36,100H68v56H36Zm104,99.46L92,162.13V93.87l48-37.33ZM212,128a44,44,0,0,1-11,29.11,12,12,0,1,1-18-15.88,20,20,0,0,0,0-26.43,12,12,0,0,1,18-15.86A43.94,43.94,0,0,1,212,128Zm40,0a83.87,83.87,0,0,1-21.39,56,12,12,0,0,1-17.89-16,60,60,0,0,0,0-80,12,12,0,1,1,17.88-16A83.87,83.87,0,0,1,252,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M80,88v80H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8Z",opacity:"0.2"}),T.createElement("path",{d:"M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M154.64,26.61a6,6,0,0,0-6.32.65L77.94,82H32A14,14,0,0,0,18,96v64a14,14,0,0,0,14,14H77.94l70.38,54.74A6,6,0,0,0,158,224V32A6,6,0,0,0,154.64,26.61ZM30,160V96a2,2,0,0,1,2-2H74v68H32A2,2,0,0,1,30,160Zm116,51.73L86,165.07V90.93l60-46.66Zm50.53-108.85a38,38,0,0,1,0,50.24,6,6,0,1,1-9-7.94,26,26,0,0,0,0-34.37,6,6,0,0,1,9-7.93ZM246,128a77.86,77.86,0,0,1-19.86,52,6,6,0,1,1-8.94-8,66,66,0,0,0,0-88,6,6,0,1,1,8.94-8A77.86,77.86,0,0,1,246,128Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M153.76,28.41a4,4,0,0,0-4.22.43L78.63,84H32A12,12,0,0,0,20,96v64a12,12,0,0,0,12,12H78.63l70.91,55.16A4.07,4.07,0,0,0,152,228a3.92,3.92,0,0,0,1.76-.41A4,4,0,0,0,156,224V32A4,4,0,0,0,153.76,28.41ZM28,160V96a4,4,0,0,1,4-4H76v72H32A4,4,0,0,1,28,160Zm120,55.82L84,166V90l64-49.78Zm47-111.61a36,36,0,0,1,0,47.59,4,4,0,1,1-6-5.3,28,28,0,0,0,0-37,4,4,0,0,1,6-5.28ZM244,128a75.88,75.88,0,0,1-19.35,50.67,4,4,0,0,1-6-5.34,68,68,0,0,0,0-90.66,4,4,0,0,1,6-5.34A75.88,75.88,0,0,1,244,128Z"}))]]),nM=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M56.88,31.93A12,12,0,1,0,39.12,48.07L64.51,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V185.44l35.12,38.63a12,12,0,0,0,17.76-16.14ZM36,100H68v56H36Zm104,99.46L92,162.13V106.24L140,159Zm-31-134a12,12,0,0,1,2.11-16.84l33.51-26.07A12,12,0,0,1,164,32V94.94a12,12,0,0,1-24,0V56.54l-14.15,11A12,12,0,0,1,109,65.44Zm74,49.35a12,12,0,0,1,18-15.85,44,44,0,0,1,5.55,50.21,12,12,0,0,1-21-11.55A19.67,19.67,0,0,0,188,128,20,20,0,0,0,183,114.79ZM252,128a84.18,84.18,0,0,1-19.11,53.35,12,12,0,1,1-18.53-15.25A60,60,0,0,0,212.73,88a12,12,0,1,1,17.88-16A83.87,83.87,0,0,1,252,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M80,88v80H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8Z",opacity:"0.2"}),T.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09v48.6a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.55-51A4,4,0,0,1,80,176.18V87.09L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-27.21-55.46a8,8,0,0,0,11.29-.7,40,40,0,0,0,0-52.88,8,8,0,1,0-12,10.57,24,24,0,0,1,0,31.72A8,8,0,0,0,186.71,155.16Zm40.92-80.49a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66ZM153,119.87a4,4,0,0,0,7-2.7V32.25a8.27,8.27,0,0,0-2.88-6.4,8,8,0,0,0-10-.16L103.83,59.33a4,4,0,0,0-.5,5.85ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M52.44,36A6,6,0,0,0,43.56,44L78,81.94l-.08.06H32A14,14,0,0,0,18,96v64a14,14,0,0,0,14,14H77.94l70.38,54.74A6,6,0,0,0,158,224V169.92L203.56,220a6,6,0,0,0,8.88-8.08ZM30,160V96a2,2,0,0,1,2-2H74v68H32A2,2,0,0,1,30,160Zm116,51.73L86,165.07V90.93l.11-.08L146,156.72Zm41.5-66.53a26,26,0,0,0,0-34.37,6,6,0,1,1,9-7.93,38,38,0,0,1,0,50.24,6,6,0,0,1-9-7.94ZM107.41,66.68a6,6,0,0,1,1.06-8.42l39.85-31A6,6,0,0,1,158,32v74.83a6,6,0,0,1-12,0V44.27L115.83,67.73A6,6,0,0,1,107.41,66.68ZM246,128a77.86,77.86,0,0,1-19.86,52,6,6,0,1,1-8.94-8,66,66,0,0,0,0-88,6,6,0,1,1,8.94-8A77.86,77.86,0,0,1,246,128Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M51,37.31A4,4,0,0,0,45,42.69L81,82.19,78.63,84H32A12,12,0,0,0,20,96v64a12,12,0,0,0,12,12H78.63l70.91,55.16A4.07,4.07,0,0,0,152,228a3.92,3.92,0,0,0,1.76-.41A4,4,0,0,0,156,224V164.75l49,53.94a4,4,0,1,0,5.92-5.38ZM28,160V96a4,4,0,0,1,4-4H76v72H32A4,4,0,0,1,28,160Zm120,55.82L84,166V90l2.35-1.83L148,156Zm41-69.3a28,28,0,0,0,0-37,4,4,0,1,1,6-5.29,36,36,0,0,1,0,47.59,4,4,0,1,1-6-5.29ZM109,65.45a4,4,0,0,1,.7-5.61l39.85-31A4,4,0,0,1,156,32v74.83a4,4,0,0,1-8,0V40.18l-33.39,26A4,4,0,0,1,109,65.45ZM244,128a75.88,75.88,0,0,1-19.35,50.67,4,4,0,0,1-6-5.34,68,68,0,0,0,0-90.66,4,4,0,0,1,6-5.34A75.88,75.88,0,0,1,244,128Z"}))]]),iM=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M230.86,109.25,169.18,86.82,146.75,25.14a19.95,19.95,0,0,0-37.5,0L86.82,86.82,25.14,109.25a19.95,19.95,0,0,0,0,37.5l61.68,22.43,22.43,61.68a19.95,19.95,0,0,0,37.5,0l22.43-61.68,61.68-22.43a19.95,19.95,0,0,0,0-37.5Zm-75.14,39.29a12,12,0,0,0-7.18,7.18L128,212.21l-20.54-56.49a12,12,0,0,0-7.18-7.18L43.79,128l56.49-20.54a12,12,0,0,0,7.18-7.18L128,43.79l20.54,56.49a12,12,0,0,0,7.18,7.18L212.21,128Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M226.76,135.48l-66.94,24.34-24.34,66.94a8,8,0,0,1-15,0L96.18,159.82,29.24,135.48a8,8,0,0,1,0-15L96.18,96.18l24.34-66.94a8,8,0,0,1,15,0l24.34,66.94,66.94,24.34A8,8,0,0,1,226.76,135.48Z",opacity:"0.2"}),T.createElement("path",{d:"M229.5,113,166.06,89.94,143,26.5a16,16,0,0,0-30,0L89.94,89.94,26.5,113a16,16,0,0,0,0,30l63.44,23.07L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30ZM157.08,152.3a8,8,0,0,0-4.78,4.78L128,223.9l-24.3-66.82a8,8,0,0,0-4.78-4.78L32.1,128l66.82-24.3a8,8,0,0,0,4.78-4.78L128,32.1l24.3,66.82a8,8,0,0,0,4.78,4.78L223.9,128Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M228.81,114.89,164.5,91.5,141.11,27.19a13.95,13.95,0,0,0-26.22,0L91.5,91.5,27.19,114.89a13.95,13.95,0,0,0,0,26.22L91.5,164.5l23.39,64.31a13.95,13.95,0,0,0,26.22,0L164.5,164.5l64.31-23.39a13.95,13.95,0,0,0,0-26.22Zm-4.1,15-66.94,24.34a6,6,0,0,0-3.59,3.59l-24.34,66.94a2,2,0,0,1-3.68,0l-24.34-66.94a6,6,0,0,0-3.59-3.59L31.29,129.84a2,2,0,0,1,0-3.68l66.94-24.34a6,6,0,0,0,3.59-3.59l24.34-66.94a2,2,0,0,1,3.68,0l24.34,66.94a6,6,0,0,0,3.59,3.59l66.94,24.34a2,2,0,0,1,0,3.68Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M229.5,113,166.06,89.94,143,26.5a16,16,0,0,0-30,0L89.94,89.94,26.5,113a16,16,0,0,0,0,30l63.44,23.07L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30ZM157.08,152.3a8,8,0,0,0-4.78,4.78L128,223.9l-24.3-66.82a8,8,0,0,0-4.78-4.78L32.1,128l66.82-24.3a8,8,0,0,0,4.78-4.78L128,32.1l24.3,66.82a8,8,0,0,0,4.78,4.78L223.9,128Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M228.13,116.77,162.94,93.06,139.23,27.87a11.95,11.95,0,0,0-22.46,0L93.06,93.06,27.87,116.77a11.95,11.95,0,0,0,0,22.46l65.19,23.71,23.71,65.19a11.95,11.95,0,0,0,22.46,0l23.71-65.19,65.19-23.71a11.95,11.95,0,0,0,0-22.46Zm-2.73,15-67,24.34a4,4,0,0,0-2.39,2.39l-24.34,67a4,4,0,0,1-7.44,0l-24.34-67a4,4,0,0,0-2.39-2.39L30.6,131.72a4,4,0,0,1,0-7.44L97.55,99.94a4,4,0,0,0,2.39-2.39L124.28,30.6a4,4,0,0,1,7.44,0l24.34,66.95a4,4,0,0,0,2.39,2.39l67,24.34a4,4,0,0,1,0,7.44Z"}))]]),aM=new Map([["bold",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,60H212V48a12,12,0,0,0-12-12H56A12,12,0,0,0,44,48V60H24A20,20,0,0,0,4,80V96a44.05,44.05,0,0,0,44,44h.77A84.18,84.18,0,0,0,116,195.15V212H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V195.11c30.94-4.51,56.53-26.2,67-55.11h1a44.05,44.05,0,0,0,44-44V80A20,20,0,0,0,232,60ZM28,96V84H44v28c0,1.21,0,2.41.09,3.61A20,20,0,0,1,28,96Zm160,15.1c0,33.33-26.71,60.65-59.54,60.9A60,60,0,0,1,68,112V60H188ZM228,96a20,20,0,0,1-16.12,19.62c.08-1.5.12-3,.12-4.52V84h16Z"}))],["duotone",T.createElement(T.Fragment,null,T.createElement("path",{d:"M200,48v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112V48Z",opacity:"0.2"}),T.createElement("path",{d:"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"}))],["fill",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"}))],["light",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,66H206V48a6,6,0,0,0-6-6H56a6,6,0,0,0-6,6V66H24A14,14,0,0,0,10,80V96a38,38,0,0,0,38,38h5.14A78,78,0,0,0,122,189.75V218H96a6,6,0,0,0,0,12h64a6,6,0,0,0,0-12H134V189.75c32.44-2.52,59.43-25.3,68.62-55.75H208a38,38,0,0,0,38-38V80A14,14,0,0,0,232,66ZM48,122A26,26,0,0,1,22,96V80a2,2,0,0,1,2-2H50v34a80.87,80.87,0,0,0,.65,10Zm146-10.9c0,36.62-29.38,66.63-65.5,66.9A66,66,0,0,1,62,112V54H194ZM234,96a26,26,0,0,1-26,26h-2.77a78.45,78.45,0,0,0,.77-10.9V78h26a2,2,0,0,1,2,2Z"}))],["regular",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"}))],["thin",T.createElement(T.Fragment,null,T.createElement("path",{d:"M232,68H204V48a4,4,0,0,0-4-4H56a4,4,0,0,0-4,4V68H24A12,12,0,0,0,12,80V96a36,36,0,0,0,36,36h6.66A76,76,0,0,0,124,187.89V220H96a4,4,0,0,0,0,8h64a4,4,0,0,0,0-8H132V187.88c32.93-1.74,60.41-24.91,69.11-55.88H208a36,36,0,0,0,36-36V80A12,12,0,0,0,232,68ZM48,124A28,28,0,0,1,20,96V80a4,4,0,0,1,4-4H52v36a77,77,0,0,0,1,12Zm148-12.9c0,37.71-30.79,68.62-68,68.9a68,68,0,0,1-68-68V52H196ZM236,96a28,28,0,0,1-28,28h-5.1a77.35,77.35,0,0,0,1.1-12.9V76h28a4,4,0,0,1,4,4Z"}))]]),rM=T.createContext({color:"currentColor",size:"1em",weight:"regular",mirrored:!1}),Gn=T.forwardRef((s,e)=>{const{alt:i,color:r,size:l,weight:c,mirrored:h,children:p,weights:m,...d}=s,{color:x="currentColor",size:_,weight:g="regular",mirrored:S=!1,...A}=T.useContext(rM);return T.createElement("svg",{ref:e,xmlns:"http://www.w3.org/2000/svg",width:l??_,height:l??_,fill:r??x,viewBox:"0 0 256 256",transform:h||S?"scale(-1, 1)":void 0,...A,...d},!!i&&T.createElement("title",null,i),p,m.get(c??g))});Gn.displayName="IconBase";const w_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:X2}));w_.displayName="ArrowCounterClockwiseIcon";const sM=w_,C_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:W2}));C_.displayName="ArrowLeftIcon";const oM=C_,D_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:Z2}));D_.displayName="ArrowRightIcon";const y1=D_,U_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:q2}));U_.displayName="ArrowUpIcon";const lM=U_,L_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:Y2}));L_.displayName="CaretLeftIcon";const cM=L_,N_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:K2}));N_.displayName="CaretRightIcon";const uM=N_,O_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:Q2}));O_.displayName="HeartIcon";const fM=O_,P_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:j2}));P_.displayName="HouseIcon";const E1=P_,I_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:J2}));I_.displayName="LightningIcon";const hM=I_,F_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:$2}));F_.displayName="PauseIcon";const dM=F_,z_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:eM}));z_.displayName="PlayIcon";const b1=z_,B_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:tM}));B_.displayName="SpeakerHighIcon";const pM=B_,H_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:nM}));H_.displayName="SpeakerSlashIcon";const mM=H_,V_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:iM}));V_.displayName="StarFourIcon";const gM=V_,G_=T.forwardRef((s,e)=>T.createElement(Gn,{ref:e,...s,weights:aM}));G_.displayName="TrophyIcon";const _M=G_;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const c0="185",vM=0,A1=1,xM=2,au=1,k_=2,rl=3,dr=0,$n=1,ba=2,Ta=0,qs=1,gd=2,T1=3,R1=4,MM=5,Vr=100,SM=101,yM=102,EM=103,bM=104,AM=200,TM=201,RM=202,wM=203,_d=204,vd=205,CM=206,DM=207,UM=208,LM=209,NM=210,OM=211,PM=212,IM=213,FM=214,xd=0,Md=1,Sd=2,Qs=3,yd=4,Ed=5,bd=6,Ad=7,X_=0,zM=1,BM=2,Qi=0,W_=1,Z_=2,q_=3,u0=4,Y_=5,K_=6,Q_=7,j_=300,Zr=301,js=302,Ph=303,Ih=304,xu=306,uu=1e3,Aa=1001,Td=1002,On=1003,HM=1004,wc=1005,Hn=1006,Fh=1007,kr=1008,pi=1009,J_=1010,$_=1011,cl=1012,f0=1013,Ji=1014,qi=1015,Ca=1016,h0=1017,d0=1018,ul=1020,ev=35902,tv=35899,nv=1021,iv=1022,Ii=1023,Da=1026,Xr=1027,av=1028,p0=1029,qr=1030,m0=1031,g0=1033,ru=33776,su=33777,ou=33778,lu=33779,Rd=35840,wd=35841,Cd=35842,Dd=35843,Ud=36196,Ld=37492,Nd=37496,Od=37488,Pd=37489,fu=37490,Id=37491,Fd=37808,zd=37809,Bd=37810,Hd=37811,Vd=37812,Gd=37813,kd=37814,Xd=37815,Wd=37816,Zd=37817,qd=37818,Yd=37819,Kd=37820,Qd=37821,jd=36492,Jd=36494,$d=36495,e0=36283,t0=36284,hu=36285,n0=36286,VM=3200,i0=0,GM=1,ur="",Nn="srgb",du="srgb-linear",pu="linear",Zt="srgb",ws=7680,w1=519,kM=512,XM=513,WM=514,_0=515,ZM=516,qM=517,v0=518,YM=519,a0=35044,C1="300 es",Yi=2e3,fl=2001;function KM(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function hl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function QM(){const s=hl("canvas");return s.style.display="block",s}const D1={};function mu(...s){const e="THREE."+s.shift();console.log(e,...s)}function rv(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function ut(...s){s=rv(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...s)}}function Dt(...s){s=rv(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...s)}}function Ys(...s){const e=s.join(" ");e in D1||(D1[e]=!0,ut(...s))}function jM(s,e,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const JM={[xd]:Md,[Sd]:bd,[yd]:Ad,[Qs]:Ed,[Md]:xd,[bd]:Sd,[Ad]:yd,[Ed]:Qs};class Yr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let U1=1234567;const ol=Math.PI/180,dl=180/Math.PI;function Ra(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]).toLowerCase()}function bt(s,e,i){return Math.max(e,Math.min(i,s))}function x0(s,e){return(s%e+e)%e}function $M(s,e,i,r,l){return r+(s-e)*(l-r)/(i-e)}function eS(s,e,i){return s!==e?(i-s)/(e-s):0}function ll(s,e,i){return(1-i)*s+i*e}function tS(s,e,i,r){return ll(s,e,1-Math.exp(-i*r))}function nS(s,e=1){return e-Math.abs(x0(s,e*2)-e)}function iS(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*(3-2*s))}function aS(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*s*(s*(s*6-15)+10))}function rS(s,e){return s+Math.floor(Math.random()*(e-s+1))}function sS(s,e){return s+Math.random()*(e-s)}function oS(s){return s*(.5-Math.random())}function lS(s){s!==void 0&&(U1=s);let e=U1+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cS(s){return s*ol}function uS(s){return s*dl}function fS(s){return(s&s-1)===0&&s!==0}function hS(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function dS(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function pS(s,e,i,r,l){const c=Math.cos,h=Math.sin,p=c(i/2),m=h(i/2),d=c((e+r)/2),x=h((e+r)/2),_=c((e-r)/2),g=h((e-r)/2),S=c((r-e)/2),A=h((r-e)/2);switch(l){case"XYX":s.set(p*x,m*_,m*g,p*d);break;case"YZY":s.set(m*g,p*x,m*_,p*d);break;case"ZXZ":s.set(m*_,m*g,p*x,p*d);break;case"XZX":s.set(p*x,m*A,m*S,p*d);break;case"YXY":s.set(m*S,p*x,m*A,p*d);break;case"ZYZ":s.set(m*A,m*S,p*x,p*d);break;default:ut("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Pi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ko={DEG2RAD:ol,RAD2DEG:dl,generateUUID:Ra,clamp:bt,euclideanModulo:x0,mapLinear:$M,inverseLerp:eS,lerp:ll,damp:tS,pingpong:nS,smoothstep:iS,smootherstep:aS,randInt:rS,randFloat:sS,randFloatSpread:oS,seededRandom:lS,degToRad:cS,radToDeg:uS,isPowerOfTwo:fS,ceilPowerOfTwo:hS,floorPowerOfTwo:dS,setQuaternionFromProperEuler:pS,normalize:qt,denormalize:Pi},C0=class C0{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=bt(this.x,e.x,i.x),this.y=bt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=bt(this.x,e,i),this.y=bt(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(bt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(bt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-e.x,h=this.y-e.y;return this.x=c*r-h*l+e.x,this.y=c*l+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};C0.prototype.isVector2=!0;let nt=C0;class eo{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,c,h,p){let m=r[l+0],d=r[l+1],x=r[l+2],_=r[l+3],g=c[h+0],S=c[h+1],A=c[h+2],D=c[h+3];if(_!==D||m!==g||d!==S||x!==A){let y=m*g+d*S+x*A+_*D;y<0&&(g=-g,S=-S,A=-A,D=-D,y=-y);let M=1-p;if(y<.9995){const N=Math.acos(y),z=Math.sin(N);M=Math.sin(M*N)/z,p=Math.sin(p*N)/z,m=m*M+g*p,d=d*M+S*p,x=x*M+A*p,_=_*M+D*p}else{m=m*M+g*p,d=d*M+S*p,x=x*M+A*p,_=_*M+D*p;const N=1/Math.sqrt(m*m+d*d+x*x+_*_);m*=N,d*=N,x*=N,_*=N}}e[i]=m,e[i+1]=d,e[i+2]=x,e[i+3]=_}static multiplyQuaternionsFlat(e,i,r,l,c,h){const p=r[l],m=r[l+1],d=r[l+2],x=r[l+3],_=c[h],g=c[h+1],S=c[h+2],A=c[h+3];return e[i]=p*A+x*_+m*S-d*g,e[i+1]=m*A+x*g+d*_-p*S,e[i+2]=d*A+x*S+p*g-m*_,e[i+3]=x*A-p*_-m*g-d*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,c=e._z,h=e._order,p=Math.cos,m=Math.sin,d=p(r/2),x=p(l/2),_=p(c/2),g=m(r/2),S=m(l/2),A=m(c/2);switch(h){case"XYZ":this._x=g*x*_+d*S*A,this._y=d*S*_-g*x*A,this._z=d*x*A+g*S*_,this._w=d*x*_-g*S*A;break;case"YXZ":this._x=g*x*_+d*S*A,this._y=d*S*_-g*x*A,this._z=d*x*A-g*S*_,this._w=d*x*_+g*S*A;break;case"ZXY":this._x=g*x*_-d*S*A,this._y=d*S*_+g*x*A,this._z=d*x*A+g*S*_,this._w=d*x*_-g*S*A;break;case"ZYX":this._x=g*x*_-d*S*A,this._y=d*S*_+g*x*A,this._z=d*x*A-g*S*_,this._w=d*x*_+g*S*A;break;case"YZX":this._x=g*x*_+d*S*A,this._y=d*S*_+g*x*A,this._z=d*x*A-g*S*_,this._w=d*x*_-g*S*A;break;case"XZY":this._x=g*x*_-d*S*A,this._y=d*S*_-g*x*A,this._z=d*x*A+g*S*_,this._w=d*x*_+g*S*A;break;default:ut("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],c=i[8],h=i[1],p=i[5],m=i[9],d=i[2],x=i[6],_=i[10],g=r+p+_;if(g>0){const S=.5/Math.sqrt(g+1);this._w=.25/S,this._x=(x-m)*S,this._y=(c-d)*S,this._z=(h-l)*S}else if(r>p&&r>_){const S=2*Math.sqrt(1+r-p-_);this._w=(x-m)/S,this._x=.25*S,this._y=(l+h)/S,this._z=(c+d)/S}else if(p>_){const S=2*Math.sqrt(1+p-r-_);this._w=(c-d)/S,this._x=(l+h)/S,this._y=.25*S,this._z=(m+x)/S}else{const S=2*Math.sqrt(1+_-r-p);this._w=(h-l)/S,this._x=(c+d)/S,this._y=(m+x)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,c=e._z,h=e._w,p=i._x,m=i._y,d=i._z,x=i._w;return this._x=r*x+h*p+l*d-c*m,this._y=l*x+h*m+c*p-r*d,this._z=c*x+h*d+r*m-l*p,this._w=h*x-r*p-l*m-c*d,this._onChangeCallback(),this}slerp(e,i){let r=e._x,l=e._y,c=e._z,h=e._w,p=this.dot(e);p<0&&(r=-r,l=-l,c=-c,h=-h,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),x=Math.sin(d);m=Math.sin(m*d)/x,i=Math.sin(i*d)/x,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const D0=class D0{constructor(e=0,i=0,r=0){this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(L1.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(L1.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=e.elements,h=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,c=e.x,h=e.y,p=e.z,m=e.w,d=2*(h*l-p*r),x=2*(p*i-c*l),_=2*(c*r-h*i);return this.x=i+m*d+h*_-p*x,this.y=r+m*x+p*d-c*_,this.z=l+m*_+c*x-h*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=bt(this.x,e.x,i.x),this.y=bt(this.y,e.y,i.y),this.z=bt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=bt(this.x,e,i),this.y=bt(this.y,e,i),this.z=bt(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(bt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,c=e.z,h=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*h-r*m,this.z=r*p-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return zh.copy(this).projectOnVector(e),this.sub(zh)}reflect(e){return this.sub(zh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(bt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};D0.prototype.isVector3=!0;let j=D0;const zh=new j,L1=new eo,U0=class U0{constructor(e,i,r,l,c,h,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,p,m,d)}set(e,i,r,l,c,h,p,m,d){const x=this.elements;return x[0]=e,x[1]=l,x[2]=p,x[3]=i,x[4]=c,x[5]=m,x[6]=r,x[7]=h,x[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],p=r[3],m=r[6],d=r[1],x=r[4],_=r[7],g=r[2],S=r[5],A=r[8],D=l[0],y=l[3],M=l[6],N=l[1],z=l[4],R=l[7],F=l[2],U=l[5],P=l[8];return c[0]=h*D+p*N+m*F,c[3]=h*y+p*z+m*U,c[6]=h*M+p*R+m*P,c[1]=d*D+x*N+_*F,c[4]=d*y+x*z+_*U,c[7]=d*M+x*R+_*P,c[2]=g*D+S*N+A*F,c[5]=g*y+S*z+A*U,c[8]=g*M+S*R+A*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],p=e[5],m=e[6],d=e[7],x=e[8];return i*h*x-i*p*d-r*c*x+r*p*m+l*c*d-l*h*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],p=e[5],m=e[6],d=e[7],x=e[8],_=x*h-p*d,g=p*m-x*c,S=d*c-h*m,A=i*_+r*g+l*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/A;return e[0]=_*D,e[1]=(l*d-x*r)*D,e[2]=(p*r-l*h)*D,e[3]=g*D,e[4]=(x*i-l*m)*D,e[5]=(l*c-p*i)*D,e[6]=S*D,e[7]=(r*m-d*i)*D,e[8]=(h*i-r*c)*D,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,c,h,p){const m=Math.cos(c),d=Math.sin(c);return this.set(r*m,r*d,-r*(m*h+d*p)+h+e,-l*d,l*m,-l*(-d*h+m*p)+p+i,0,0,1),this}scale(e,i){return Ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Bh.makeScale(e,i)),this}rotate(e){return Ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Bh.makeRotation(-e)),this}translate(e,i){return Ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Bh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};U0.prototype.isMatrix3=!0;let pt=U0;const Bh=new pt,N1=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),O1=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mS(){const s={enabled:!0,workingColorSpace:du,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Zt&&(l.r=wa(l.r),l.g=wa(l.g),l.b=wa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Zt&&(l.r=Ks(l.r),l.g=Ks(l.g),l.b=Ks(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ur?pu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[du]:{primaries:e,whitePoint:r,transfer:pu,toXYZ:N1,fromXYZ:O1,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Nn},outputColorSpaceConfig:{drawingBufferColorSpace:Nn}},[Nn]:{primaries:e,whitePoint:r,transfer:Zt,toXYZ:N1,fromXYZ:O1,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Nn}}}),s}const Ct=mS();function wa(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ks(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Cs;class gS{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Cs===void 0&&(Cs=hl("canvas")),Cs.width=e.width,Cs.height=e.height;const l=Cs.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=Cs}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=hl("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=wa(c[h]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(wa(i[r]/255)*255):i[r]=wa(i[r]);return{data:i,width:e.width,height:e.height}}else return ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _S=0;class M0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_S++}),this.uuid=Ra(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,p=l.length;h<p;h++)l[h].isDataTexture?c.push(Hh(l[h].image)):c.push(Hh(l[h]))}else c=Hh(l);r.url=c}return i||(e.images[this.uuid]=r),r}}function Hh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?gS.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ut("Texture: Unable to serialize Texture."),{})}let vS=0;const Vh=new j;class Vn extends Yr{constructor(e=Vn.DEFAULT_IMAGE,i=Vn.DEFAULT_MAPPING,r=Aa,l=Aa,c=Hn,h=kr,p=Ii,m=pi,d=Vn.DEFAULT_ANISOTROPY,x=ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vS++}),this.uuid=Ra(),this.name="",this.source=new M0(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vh).x}get height(){return this.source.getSize(Vh).y}get depth(){return this.source.getSize(Vh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){ut(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ut(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==j_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case uu:e.x=e.x-Math.floor(e.x);break;case Aa:e.x=e.x<0?0:1;break;case Td:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case uu:e.y=e.y-Math.floor(e.y);break;case Aa:e.y=e.y<0?0:1;break;case Td:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=j_;Vn.DEFAULT_ANISOTROPY=1;const L0=class L0{constructor(e=0,i=0,r=0,l=1){this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,c;const m=e.elements,d=m[0],x=m[4],_=m[8],g=m[1],S=m[5],A=m[9],D=m[2],y=m[6],M=m[10];if(Math.abs(x-g)<.01&&Math.abs(_-D)<.01&&Math.abs(A-y)<.01){if(Math.abs(x+g)<.1&&Math.abs(_+D)<.1&&Math.abs(A+y)<.1&&Math.abs(d+S+M-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(d+1)/2,R=(S+1)/2,F=(M+1)/2,U=(x+g)/4,P=(_+D)/4,b=(A+y)/4;return z>R&&z>F?z<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(z),l=U/r,c=P/r):R>F?R<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(R),r=U/l,c=b/l):F<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(F),r=P/c,l=b/c),this.set(r,l,c,i),this}let N=Math.sqrt((y-A)*(y-A)+(_-D)*(_-D)+(g-x)*(g-x));return Math.abs(N)<.001&&(N=1),this.x=(y-A)/N,this.y=(_-D)/N,this.z=(g-x)/N,this.w=Math.acos((d+S+M-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=bt(this.x,e.x,i.x),this.y=bt(this.y,e.y,i.y),this.z=bt(this.z,e.z,i.z),this.w=bt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=bt(this.x,e,i),this.y=bt(this.y,e,i),this.z=bt(this.z,e,i),this.w=bt(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(bt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};L0.prototype.isVector4=!0;let cn=L0;class xS extends Yr{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new cn(0,0,e,i),this.scissorTest=!1,this.viewport=new cn(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:r.depth},c=new Vn(l),h=r.count;for(let p=0;p<h;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new M0(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ji extends xS{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class sv extends Vn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class MS extends Vn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vu=class vu{constructor(e,i,r,l,c,h,p,m,d,x,_,g,S,A,D,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,p,m,d,x,_,g,S,A,D,y)}set(e,i,r,l,c,h,p,m,d,x,_,g,S,A,D,y){const M=this.elements;return M[0]=e,M[4]=i,M[8]=r,M[12]=l,M[1]=c,M[5]=h,M[9]=p,M[13]=m,M[2]=d,M[6]=x,M[10]=_,M[14]=g,M[3]=S,M[7]=A,M[11]=D,M[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vu().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,r=e.elements,l=1/Ds.setFromMatrixColumn(e,0).length(),c=1/Ds.setFromMatrixColumn(e,1).length(),h=1/Ds.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,c=e.z,h=Math.cos(r),p=Math.sin(r),m=Math.cos(l),d=Math.sin(l),x=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=h*x,S=h*_,A=p*x,D=p*_;i[0]=m*x,i[4]=-m*_,i[8]=d,i[1]=S+A*d,i[5]=g-D*d,i[9]=-p*m,i[2]=D-g*d,i[6]=A+S*d,i[10]=h*m}else if(e.order==="YXZ"){const g=m*x,S=m*_,A=d*x,D=d*_;i[0]=g+D*p,i[4]=A*p-S,i[8]=h*d,i[1]=h*_,i[5]=h*x,i[9]=-p,i[2]=S*p-A,i[6]=D+g*p,i[10]=h*m}else if(e.order==="ZXY"){const g=m*x,S=m*_,A=d*x,D=d*_;i[0]=g-D*p,i[4]=-h*_,i[8]=A+S*p,i[1]=S+A*p,i[5]=h*x,i[9]=D-g*p,i[2]=-h*d,i[6]=p,i[10]=h*m}else if(e.order==="ZYX"){const g=h*x,S=h*_,A=p*x,D=p*_;i[0]=m*x,i[4]=A*d-S,i[8]=g*d+D,i[1]=m*_,i[5]=D*d+g,i[9]=S*d-A,i[2]=-d,i[6]=p*m,i[10]=h*m}else if(e.order==="YZX"){const g=h*m,S=h*d,A=p*m,D=p*d;i[0]=m*x,i[4]=D-g*_,i[8]=A*_+S,i[1]=_,i[5]=h*x,i[9]=-p*x,i[2]=-d*x,i[6]=S*_+A,i[10]=g-D*_}else if(e.order==="XZY"){const g=h*m,S=h*d,A=p*m,D=p*d;i[0]=m*x,i[4]=-_,i[8]=d*x,i[1]=g*_+D,i[5]=h*x,i[9]=S*_-A,i[2]=A*_-S,i[6]=p*x,i[10]=D*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(SS,e,yS)}lookAt(e,i,r){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ar.crossVectors(r,fi),ar.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ar.crossVectors(r,fi)),ar.normalize(),Cc.crossVectors(fi,ar),l[0]=ar.x,l[4]=Cc.x,l[8]=fi.x,l[1]=ar.y,l[5]=Cc.y,l[9]=fi.y,l[2]=ar.z,l[6]=Cc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],p=r[4],m=r[8],d=r[12],x=r[1],_=r[5],g=r[9],S=r[13],A=r[2],D=r[6],y=r[10],M=r[14],N=r[3],z=r[7],R=r[11],F=r[15],U=l[0],P=l[4],b=l[8],L=l[12],H=l[1],k=l[5],W=l[9],ce=l[13],ue=l[2],K=l[6],B=l[10],V=l[14],ee=l[3],_e=l[7],Ee=l[11],O=l[15];return c[0]=h*U+p*H+m*ue+d*ee,c[4]=h*P+p*k+m*K+d*_e,c[8]=h*b+p*W+m*B+d*Ee,c[12]=h*L+p*ce+m*V+d*O,c[1]=x*U+_*H+g*ue+S*ee,c[5]=x*P+_*k+g*K+S*_e,c[9]=x*b+_*W+g*B+S*Ee,c[13]=x*L+_*ce+g*V+S*O,c[2]=A*U+D*H+y*ue+M*ee,c[6]=A*P+D*k+y*K+M*_e,c[10]=A*b+D*W+y*B+M*Ee,c[14]=A*L+D*ce+y*V+M*O,c[3]=N*U+z*H+R*ue+F*ee,c[7]=N*P+z*k+R*K+F*_e,c[11]=N*b+z*W+R*B+F*Ee,c[15]=N*L+z*ce+R*V+F*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[12],h=e[1],p=e[5],m=e[9],d=e[13],x=e[2],_=e[6],g=e[10],S=e[14],A=e[3],D=e[7],y=e[11],M=e[15],N=m*S-d*g,z=p*S-d*_,R=p*g-m*_,F=h*S-d*x,U=h*g-m*x,P=h*_-p*x;return i*(D*N-y*z+M*R)-r*(A*N-y*F+M*U)+l*(A*z-D*F+M*P)-c*(A*R-D*U+y*P)}determinantAffine(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[1],h=e[5],p=e[9],m=e[2],d=e[6],x=e[10];return i*(h*x-p*d)-r*(c*x-p*m)+l*(c*d-h*m)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],p=e[5],m=e[6],d=e[7],x=e[8],_=e[9],g=e[10],S=e[11],A=e[12],D=e[13],y=e[14],M=e[15],N=i*p-r*h,z=i*m-l*h,R=i*d-c*h,F=r*m-l*p,U=r*d-c*p,P=l*d-c*m,b=x*D-_*A,L=x*y-g*A,H=x*M-S*A,k=_*y-g*D,W=_*M-S*D,ce=g*M-S*y,ue=N*ce-z*W+R*k+F*H-U*L+P*b;if(ue===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const K=1/ue;return e[0]=(p*ce-m*W+d*k)*K,e[1]=(l*W-r*ce-c*k)*K,e[2]=(D*P-y*U+M*F)*K,e[3]=(g*U-_*P-S*F)*K,e[4]=(m*H-h*ce-d*L)*K,e[5]=(i*ce-l*H+c*L)*K,e[6]=(y*R-A*P-M*z)*K,e[7]=(x*P-g*R+S*z)*K,e[8]=(h*W-p*H+d*b)*K,e[9]=(r*H-i*W-c*b)*K,e[10]=(A*U-D*R+M*N)*K,e[11]=(_*R-x*U-S*N)*K,e[12]=(p*L-h*k-m*b)*K,e[13]=(i*k-r*L+l*b)*K,e[14]=(D*z-A*F-y*N)*K,e[15]=(x*F-_*z+g*N)*K,this}scale(e){const i=this.elements,r=e.x,l=e.y,c=e.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,h=e.x,p=e.y,m=e.z,d=c*h,x=c*p;return this.set(d*h+r,d*p-l*m,d*m+l*p,0,d*p+l*m,x*p+r,x*m-l*h,0,d*m-l*p,x*m+l*h,c*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,c,h){return this.set(1,r,c,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,c=i._x,h=i._y,p=i._z,m=i._w,d=c+c,x=h+h,_=p+p,g=c*d,S=c*x,A=c*_,D=h*x,y=h*_,M=p*_,N=m*d,z=m*x,R=m*_,F=r.x,U=r.y,P=r.z;return l[0]=(1-(D+M))*F,l[1]=(S+R)*F,l[2]=(A-z)*F,l[3]=0,l[4]=(S-R)*U,l[5]=(1-(g+M))*U,l[6]=(y+N)*U,l[7]=0,l[8]=(A+z)*P,l[9]=(y-N)*P,l[10]=(1-(g+D))*P,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinantAffine();if(c===0)return r.set(1,1,1),i.identity(),this;let h=Ds.set(l[0],l[1],l[2]).length();const p=Ds.set(l[4],l[5],l[6]).length(),m=Ds.set(l[8],l[9],l[10]).length();c<0&&(h=-h),Li.copy(this);const d=1/h,x=1/p,_=1/m;return Li.elements[0]*=d,Li.elements[1]*=d,Li.elements[2]*=d,Li.elements[4]*=x,Li.elements[5]*=x,Li.elements[6]*=x,Li.elements[8]*=_,Li.elements[9]*=_,Li.elements[10]*=_,i.setFromRotationMatrix(Li),r.x=h,r.y=p,r.z=m,this}makePerspective(e,i,r,l,c,h,p=Yi,m=!1){const d=this.elements,x=2*c/(i-e),_=2*c/(r-l),g=(i+e)/(i-e),S=(r+l)/(r-l);let A,D;if(m)A=c/(h-c),D=h*c/(h-c);else if(p===Yi)A=-(h+c)/(h-c),D=-2*h*c/(h-c);else if(p===fl)A=-h/(h-c),D=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=S,d[13]=0,d[2]=0,d[6]=0,d[10]=A,d[14]=D,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,i,r,l,c,h,p=Yi,m=!1){const d=this.elements,x=2/(i-e),_=2/(r-l),g=-(i+e)/(i-e),S=-(r+l)/(r-l);let A,D;if(m)A=1/(h-c),D=h/(h-c);else if(p===Yi)A=-2/(h-c),D=-(h+c)/(h-c);else if(p===fl)A=-1/(h-c),D=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=S,d[2]=0,d[6]=0,d[10]=A,d[14]=D,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}};vu.prototype.isMatrix4=!0;let on=vu;const Ds=new j,Li=new on,SS=new j(0,0,0),yS=new j(1,1,1),ar=new j,Cc=new j,fi=new j,P1=new on,I1=new eo;class pr{constructor(e=0,i=0,r=0,l=pr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,c=l[0],h=l[4],p=l[8],m=l[1],d=l[5],x=l[9],_=l[2],g=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(bt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-x,S),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(p,S),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(bt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-h,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-bt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,d));break;case"YZX":this._z=Math.asin(bt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(p,S));break;case"XZY":this._z=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-x,S),this._y=0);break;default:ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return P1.makeRotationFromQuaternion(e),this.setFromRotationMatrix(P1,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return I1.setFromEuler(this),this.setFromQuaternion(I1,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pr.DEFAULT_ORDER="XYZ";class ov{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ES=0;const F1=new j,Us=new eo,xa=new on,Dc=new j,Qo=new j,bS=new j,AS=new eo,z1=new j(1,0,0),B1=new j(0,1,0),H1=new j(0,0,1),V1={type:"added"},TS={type:"removed"},Ls={type:"childadded",child:null},Gh={type:"childremoved",child:null};class En extends Yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ES++}),this.uuid=Ra(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new j,i=new pr,r=new eo,l=new j(1,1,1);function c(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new on},normalMatrix:{value:new pt}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ov,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Us.setFromAxisAngle(e,i),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,i){return Us.setFromAxisAngle(e,i),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(z1,e)}rotateY(e){return this.rotateOnAxis(B1,e)}rotateZ(e){return this.rotateOnAxis(H1,e)}translateOnAxis(e,i){return F1.copy(e).applyQuaternion(this.quaternion),this.position.add(F1.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(z1,e)}translateY(e){return this.translateOnAxis(B1,e)}translateZ(e){return this.translateOnAxis(H1,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?Dc.copy(e):Dc.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(Qo,Dc,this.up):xa.lookAt(Dc,Qo,this.up),this.quaternion.setFromRotationMatrix(xa),l&&(xa.extractRotation(l.matrixWorld),Us.setFromRotationMatrix(xa),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Dt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(V1),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(TS),Gh.child=e,this.dispatchEvent(Gh),Gh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xa.multiply(e.parent.matrixWorld)),e.applyMatrix4(xa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(V1),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,e,bS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,AS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,r=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*r-c[8]*l,c[13]+=r-c[1]*i-c[5]*r-c[9]*l,c[14]+=l-c[2]*i-c[6]*r-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i,r=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){const c=this.children;for(let h=0,p=c.length;h<p;h++)c[h].updateWorldMatrix(!1,!0,r)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,x=m.length;d<x;d++){const _=m[d];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(e.materials,this.material[m]));l.material=p}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(e.animations,m))}}if(i){const p=h(e.geometries),m=h(e.materials),d=h(e.textures),x=h(e.images),_=h(e.shapes),g=h(e.skeletons),S=h(e.animations),A=h(e.nodes);p.length>0&&(r.geometries=p),m.length>0&&(r.materials=m),d.length>0&&(r.textures=d),x.length>0&&(r.images=x),_.length>0&&(r.shapes=_),g.length>0&&(r.skeletons=g),S.length>0&&(r.animations=S),A.length>0&&(r.nodes=A)}return r.object=l,r;function h(p){const m=[];for(const d in p){const x=p[d];delete x.metadata,m.push(x)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}En.DEFAULT_UP=new j(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ki extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const RS={type:"move"};class kh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,c=null,h=null;const p=this._targetRay,m=this._grip,d=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(d&&e.hand){h=!0;for(const D of e.hand.values()){const y=i.getJointPose(D,r),M=this._getHandJoint(d,D);y!==null&&(M.matrix.fromArray(y.transform.matrix),M.matrix.decompose(M.position,M.rotation,M.scale),M.matrixWorldNeedsUpdate=!0,M.jointRadius=y.radius),M.visible=y!==null}const x=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=x.position.distanceTo(_.position),S=.02,A=.005;d.inputState.pinching&&g>S+A?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=S-A&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(RS)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new Ki;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}const lv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},Uc={h:0,s:0,l:0};function Xh(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class At{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=Ct.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ct.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=Ct.workingColorSpace){if(e=x0(e,1),i=bt(i,0,1),r=bt(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,h=2*r-c;this.r=Xh(h,c,e+1/3),this.g=Xh(h,c,e),this.b=Xh(h,c,e-1/3)}return Ct.colorSpaceToWorking(this,l),this}setStyle(e,i=Nn){function r(c){c!==void 0&&parseFloat(c)<1&&ut("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const h=l[1],p=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ut("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ut("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Nn){const r=lv[e.toLowerCase()];return r!==void 0?this.setHex(r,i):ut("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}copyLinearToSRGB(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nn){return Ct.workingToColorSpace(Bn.copy(this),e),Math.round(bt(Bn.r*255,0,255))*65536+Math.round(bt(Bn.g*255,0,255))*256+Math.round(bt(Bn.b*255,0,255))}getHexString(e=Nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ct.workingColorSpace){Ct.workingToColorSpace(Bn.copy(this),i);const r=Bn.r,l=Bn.g,c=Bn.b,h=Math.max(r,l,c),p=Math.min(r,l,c);let m,d;const x=(p+h)/2;if(p===h)m=0,d=0;else{const _=h-p;switch(d=x<=.5?_/(h+p):_/(2-h-p),h){case r:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-r)/_+2;break;case c:m=(r-l)/_+4;break}m/=6}return e.h=m,e.s=d,e.l=x,e}getRGB(e,i=Ct.workingColorSpace){return Ct.workingToColorSpace(Bn.copy(this),i),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=Nn){Ct.workingToColorSpace(Bn.copy(this),e);const i=Bn.r,r=Bn.g,l=Bn.b;return e!==Nn?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+i,rr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(rr),e.getHSL(Uc);const r=ll(rr.h,Uc.h,i),l=ll(rr.s,Uc.s,i),c=ll(rr.l,Uc.l,i);return this.setHSL(r,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new At;At.NAMES=lv;class S0{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new At(e),this.density=i}clone(){return new S0(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wS extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pr,this.environmentIntensity=1,this.environmentRotation=new pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ni=new j,Ma=new j,Wh=new j,Sa=new j,Ns=new j,Os=new j,G1=new j,Zh=new j,qh=new j,Yh=new j,Kh=new cn,Qh=new cn,jh=new cn;class Ai{constructor(e=new j,i=new j,r=new j){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Ni.subVectors(e,i),l.cross(Ni);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,r,l,c){Ni.subVectors(l,i),Ma.subVectors(r,i),Wh.subVectors(e,i);const h=Ni.dot(Ni),p=Ni.dot(Ma),m=Ni.dot(Wh),d=Ma.dot(Ma),x=Ma.dot(Wh),_=h*d-p*p;if(_===0)return c.set(0,0,0),null;const g=1/_,S=(d*m-p*x)*g,A=(h*x-p*m)*g;return c.set(1-S-A,A,S)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(e,i,r,l,c,h,p,m){return this.getBarycoord(e,i,r,l,Sa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Sa.x),m.addScaledVector(h,Sa.y),m.addScaledVector(p,Sa.z),m)}static getInterpolatedAttribute(e,i,r,l,c,h){return Kh.setScalar(0),Qh.setScalar(0),jh.setScalar(0),Kh.fromBufferAttribute(e,i),Qh.fromBufferAttribute(e,r),jh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Kh,c.x),h.addScaledVector(Qh,c.y),h.addScaledVector(jh,c.z),h}static isFrontFacing(e,i,r,l){return Ni.subVectors(r,i),Ma.subVectors(e,i),Ni.cross(Ma).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ni.subVectors(this.c,this.b),Ma.subVectors(this.a,this.b),Ni.cross(Ma).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ai.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,c){return Ai.getInterpolation(e,this.a,this.b,this.c,i,r,l,c)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,c=this.c;let h,p;Ns.subVectors(l,r),Os.subVectors(c,r),Zh.subVectors(e,r);const m=Ns.dot(Zh),d=Os.dot(Zh);if(m<=0&&d<=0)return i.copy(r);qh.subVectors(e,l);const x=Ns.dot(qh),_=Os.dot(qh);if(x>=0&&_<=x)return i.copy(l);const g=m*_-x*d;if(g<=0&&m>=0&&x<=0)return h=m/(m-x),i.copy(r).addScaledVector(Ns,h);Yh.subVectors(e,c);const S=Ns.dot(Yh),A=Os.dot(Yh);if(A>=0&&S<=A)return i.copy(c);const D=S*d-m*A;if(D<=0&&d>=0&&A<=0)return p=d/(d-A),i.copy(r).addScaledVector(Os,p);const y=x*A-S*_;if(y<=0&&_-x>=0&&S-A>=0)return G1.subVectors(c,l),p=(_-x)/(_-x+(S-A)),i.copy(l).addScaledVector(G1,p);const M=1/(y+D+g);return h=D*M,p=g*M,i.copy(r).addScaledVector(Ns,h).addScaledVector(Os,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ml{constructor(e=new j(1/0,1/0,1/0),i=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Oi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Oi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Oi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let h=0,p=c.count;h<p;h++)e.isMesh===!0?e.getVertexPosition(h,Oi):Oi.fromBufferAttribute(c,h),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Lc.copy(r.boundingBox)),Lc.applyMatrix4(e.matrixWorld),this.union(Lc)}const l=e.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),Nc.subVectors(this.max,jo),Ps.subVectors(e.a,jo),Is.subVectors(e.b,jo),Fs.subVectors(e.c,jo),sr.subVectors(Is,Ps),or.subVectors(Fs,Is),Ir.subVectors(Ps,Fs);let i=[0,-sr.z,sr.y,0,-or.z,or.y,0,-Ir.z,Ir.y,sr.z,0,-sr.x,or.z,0,-or.x,Ir.z,0,-Ir.x,-sr.y,sr.x,0,-or.y,or.x,0,-Ir.y,Ir.x,0];return!Jh(i,Ps,Is,Fs,Nc)||(i=[1,0,0,0,1,0,0,0,1],!Jh(i,Ps,Is,Fs,Nc))?!1:(Oc.crossVectors(sr,or),i=[Oc.x,Oc.y,Oc.z],Jh(i,Ps,Is,Fs,Nc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ya[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ya[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ya[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ya[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ya[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ya[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ya[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ya[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ya),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ya=[new j,new j,new j,new j,new j,new j,new j,new j],Oi=new j,Lc=new ml,Ps=new j,Is=new j,Fs=new j,sr=new j,or=new j,Ir=new j,jo=new j,Nc=new j,Oc=new j,Fr=new j;function Jh(s,e,i,r,l){for(let c=0,h=s.length-3;c<=h;c+=3){Fr.fromArray(s,c);const p=l.x*Math.abs(Fr.x)+l.y*Math.abs(Fr.y)+l.z*Math.abs(Fr.z),m=e.dot(Fr),d=i.dot(Fr),x=r.dot(Fr);if(Math.max(-Math.max(m,d,x),Math.min(m,d,x))>p)return!1}return!0}const Mn=new j,Pc=new nt;let CS=0;class Ti extends Yr{constructor(e,i,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:CS++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=a0,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Pc.fromBufferAttribute(this,i),Pc.applyMatrix3(e),this.setXY(i,Pc.x,Pc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyMatrix3(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyMatrix4(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyNormalMatrix(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.transformDirection(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Pi(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=qt(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Pi(i,this.array)),i}setX(e,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Pi(i,this.array)),i}setY(e,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Pi(i,this.array)),i}setZ(e,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Pi(i,this.array)),i}setW(e,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array),l=qt(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e*=this.itemSize,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array),l=qt(l,this.array),c=qt(c,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==a0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cv extends Ti{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class uv extends Ti{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class ln extends Ti{constructor(e,i,r){super(new Float32Array(e),i,r)}}const DS=new ml,Jo=new j,$h=new j;class Mu{constructor(e=new j,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):DS.setFromPoints(e).getCenter(r);let l=0;for(let c=0,h=e.length;c<h;c++)l=Math.max(l,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jo.subVectors(e,this.center);const i=Jo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Jo,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($h.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jo.copy(e.center).add($h)),this.expandByPoint(Jo.copy(e.center).sub($h))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let US=0;const Ei=new on,ed=new En,zs=new j,hi=new ml,$o=new ml,Rn=new j;class Pn extends Yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:US++}),this.uuid=Ra(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(KM(e)?uv:cv)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new pt().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,i,r){return Ei.makeTranslation(e,i,r),this.applyMatrix4(Ei),this}scale(e,i,r){return Ei.makeScale(e,i,r),this.applyMatrix4(Ei),this}lookAt(e){return ed.lookAt(e),ed.updateMatrix(),this.applyMatrix4(ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zs).negate(),this.translate(zs.x,zs.y,zs.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=e.length;l<c;l++){const h=e[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ln(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ml);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];hi.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mu);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const r=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),i)for(let c=0,h=i.length;c<h;c++){const p=i[c];$o.setFromBufferAttribute(p),this.morphTargetsRelative?(Rn.addVectors(hi.min,$o.min),hi.expandByPoint(Rn),Rn.addVectors(hi.max,$o.max),hi.expandByPoint(Rn)):(hi.expandByPoint($o.min),hi.expandByPoint($o.max))}hi.getCenter(r);let l=0;for(let c=0,h=e.count;c<h;c++)Rn.fromBufferAttribute(e,c),l=Math.max(l,r.distanceToSquared(Rn));if(i)for(let c=0,h=i.length;c<h;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,x=p.count;d<x;d++)Rn.fromBufferAttribute(p,d),m&&(zs.fromBufferAttribute(e,d),Rn.add(zs)),l=Math.max(l,r.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;let h=this.getAttribute("tangent");(h===void 0||h.count!==r.count)&&(h=new Ti(new Float32Array(4*r.count),4),this.setAttribute("tangent",h));const p=[],m=[];for(let b=0;b<r.count;b++)p[b]=new j,m[b]=new j;const d=new j,x=new j,_=new j,g=new nt,S=new nt,A=new nt,D=new j,y=new j;function M(b,L,H){d.fromBufferAttribute(r,b),x.fromBufferAttribute(r,L),_.fromBufferAttribute(r,H),g.fromBufferAttribute(c,b),S.fromBufferAttribute(c,L),A.fromBufferAttribute(c,H),x.sub(d),_.sub(d),S.sub(g),A.sub(g);const k=1/(S.x*A.y-A.x*S.y);isFinite(k)&&(D.copy(x).multiplyScalar(A.y).addScaledVector(_,-S.y).multiplyScalar(k),y.copy(_).multiplyScalar(S.x).addScaledVector(x,-A.x).multiplyScalar(k),p[b].add(D),p[L].add(D),p[H].add(D),m[b].add(y),m[L].add(y),m[H].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let b=0,L=N.length;b<L;++b){const H=N[b],k=H.start,W=H.count;for(let ce=k,ue=k+W;ce<ue;ce+=3)M(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const z=new j,R=new j,F=new j,U=new j;function P(b){F.fromBufferAttribute(l,b),U.copy(F);const L=p[b];z.copy(L),z.sub(F.multiplyScalar(F.dot(L))).normalize(),R.crossVectors(U,L);const k=R.dot(m[b])<0?-1:1;h.setXYZW(b,z.x,z.y,z.z,k)}for(let b=0,L=N.length;b<L;++b){const H=N[b],k=H.start,W=H.count;for(let ce=k,ue=k+W;ce<ue;ce+=3)P(e.getX(ce+0)),P(e.getX(ce+1)),P(e.getX(ce+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new Ti(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let g=0,S=r.count;g<S;g++)r.setXYZ(g,0,0,0);const l=new j,c=new j,h=new j,p=new j,m=new j,d=new j,x=new j,_=new j;if(e)for(let g=0,S=e.count;g<S;g+=3){const A=e.getX(g+0),D=e.getX(g+1),y=e.getX(g+2);l.fromBufferAttribute(i,A),c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),x.subVectors(h,c),_.subVectors(l,c),x.cross(_),p.fromBufferAttribute(r,A),m.fromBufferAttribute(r,D),d.fromBufferAttribute(r,y),p.add(x),m.add(x),d.add(x),r.setXYZ(A,p.x,p.y,p.z),r.setXYZ(D,m.x,m.y,m.z),r.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,S=i.count;g<S;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),h.fromBufferAttribute(i,g+2),x.subVectors(h,c),_.subVectors(l,c),x.cross(_),r.setXYZ(g+0,x.x,x.y,x.z),r.setXYZ(g+1,x.x,x.y,x.z),r.setXYZ(g+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(p,m){const d=p.array,x=p.itemSize,_=p.normalized,g=new d.constructor(m.length*x);let S=0,A=0;for(let D=0,y=m.length;D<y;D++){p.isInterleavedBufferAttribute?S=m[D]*p.data.stride+p.offset:S=m[D]*x;for(let M=0;M<x;M++)g[A++]=d[S++]}return new Ti(g,x,_)}if(this.index===null)return ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Pn,r=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=e(m,r);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let x=0,_=d.length;x<_;x++){const g=d[x],S=e(g,r);m.push(S)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let p=0,m=h.length;p<m;p++){const d=h[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(e[d]=m[d]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const d=r[m];e.data.attributes[m]=d.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],x=[];for(let _=0,g=d.length;_<g;_++){const S=d[_];x.push(S.toJSON(e.data))}x.length>0&&(l[m]=x,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const d in l){const x=l[d];this.setAttribute(d,x.clone(i))}const c=e.morphAttributes;for(const d in c){const x=[],_=c[d];for(let g=0,S=_.length;g<S;g++)x.push(_[g].clone(i));this.morphAttributes[d]=x}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let d=0,x=h.length;d<x;d++){const _=h[d];this.addGroup(_.start,_.count,_.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class LS{constructor(e,i){this.isInterleavedBuffer=!0,this.array=e,this.stride=i,this.count=e!==void 0?e.length/i:0,this.usage=a0,this.updateRanges=[],this.version=0,this.uuid=Ra()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,i,r){e*=this.stride,r*=i.stride;for(let l=0,c=this.stride;l<c;l++)this.array[e+l]=i.array[r+l];return this}set(e,i=0){return this.array.set(e,i),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ra()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(i,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ra()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xn=new j;class gu{constructor(e,i,r,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=i,this.offset=r,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let i=0,r=this.data.count;i<r;i++)Xn.fromBufferAttribute(this,i),Xn.applyMatrix4(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)Xn.fromBufferAttribute(this,i),Xn.applyNormalMatrix(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)Xn.fromBufferAttribute(this,i),Xn.transformDirection(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}getComponent(e,i){let r=this.array[e*this.data.stride+this.offset+i];return this.normalized&&(r=Pi(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=qt(r,this.array)),this.data.array[e*this.data.stride+this.offset+i]=r,this}setX(e,i){return this.normalized&&(i=qt(i,this.array)),this.data.array[e*this.data.stride+this.offset]=i,this}setY(e,i){return this.normalized&&(i=qt(i,this.array)),this.data.array[e*this.data.stride+this.offset+1]=i,this}setZ(e,i){return this.normalized&&(i=qt(i,this.array)),this.data.array[e*this.data.stride+this.offset+2]=i,this}setW(e,i){return this.normalized&&(i=qt(i,this.array)),this.data.array[e*this.data.stride+this.offset+3]=i,this}getX(e){let i=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(i=Pi(i,this.array)),i}getY(e){let i=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(i=Pi(i,this.array)),i}getZ(e){let i=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(i=Pi(i,this.array)),i}getW(e){let i=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(i=Pi(i,this.array)),i}setXY(e,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this}setXYZ(e,i,r,l){return e=e*this.data.stride+this.offset,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array),l=qt(l,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e=e*this.data.stride+this.offset,this.normalized&&(i=qt(i,this.array),r=qt(r,this.array),l=qt(l,this.array),c=qt(c,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=l,this.data.array[e+3]=c,this}clone(e){if(e===void 0){mu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let r=0;r<this.count;r++){const l=r*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)i.push(this.data.array[l+c])}return new Ti(new this.array.constructor(i),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new gu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){mu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let r=0;r<this.count;r++){const l=r*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)i.push(this.data.array[l+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let NS=0;class Kr extends Yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:NS++}),this.uuid=Ra(),this.name="",this.type="Material",this.blending=qs,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_d,this.blendDst=vd,this.blendEquation=Vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=w1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){ut(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ut(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector2&&r&&r.isVector2||l&&l.isEuler&&r&&r.isEuler||l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==qs&&(r.blending=this.blending),this.side!==dr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==_d&&(r.blendSrc=this.blendSrc),this.blendDst!==vd&&(r.blendDst=this.blendDst),this.blendEquation!==Vr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==w1&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const h=[];for(const p in c){const m=c[p];delete m.metadata,h.push(m)}return h}if(i){const c=l(e.textures),h=l(e.images);c.length>0&&(r.textures=c),h.length>0&&(r.images=h)}return r}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new At().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new nt().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new nt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class y0 extends Kr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new At(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Bs;const el=new j,Hs=new j,Vs=new j,Gs=new nt,tl=new nt,fv=new on,Ic=new j,nl=new j,Fc=new j,k1=new nt,td=new nt,X1=new nt;class hv extends En{constructor(e=new y0){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new Pn;const i=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new LS(i,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new gu(r,3,0,!1)),Bs.setAttribute("uv",new gu(r,2,3,!1))}this.geometry=Bs,this.material=e,this.center=new nt(.5,.5),this.count=1}raycast(e,i){e.camera===null&&Dt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hs.setFromMatrixScale(this.matrixWorld),fv.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hs.multiplyScalar(-Vs.z);const r=this.material.rotation;let l,c;r!==0&&(c=Math.cos(r),l=Math.sin(r));const h=this.center;zc(Ic.set(-.5,-.5,0),Vs,h,Hs,l,c),zc(nl.set(.5,-.5,0),Vs,h,Hs,l,c),zc(Fc.set(.5,.5,0),Vs,h,Hs,l,c),k1.set(0,0),td.set(1,0),X1.set(1,1);let p=e.ray.intersectTriangle(Ic,nl,Fc,!1,el);if(p===null&&(zc(nl.set(-.5,.5,0),Vs,h,Hs,l,c),td.set(0,1),p=e.ray.intersectTriangle(Ic,Fc,nl,!1,el),p===null))return;const m=e.ray.origin.distanceTo(el);m<e.near||m>e.far||i.push({distance:m,point:el.clone(),uv:Ai.getInterpolation(el,Ic,nl,Fc,k1,td,X1,new nt),face:null,object:this})}copy(e,i){return super.copy(e,i),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function zc(s,e,i,r,l,c){Gs.subVectors(s,i).addScalar(.5).multiply(r),l!==void 0?(tl.x=c*Gs.x-l*Gs.y,tl.y=l*Gs.x+c*Gs.y):tl.copy(Gs),s.copy(e),s.x+=tl.x,s.y+=tl.y,s.applyMatrix4(fv)}const Ea=new j,nd=new j,Bc=new j,lr=new j,id=new j,Hc=new j,ad=new j;class dv{constructor(e=new j,i=new j(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ea)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ea.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ea.copy(this.origin).addScaledVector(this.direction,i),Ea.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){nd.copy(e).add(i).multiplyScalar(.5),Bc.copy(i).sub(e).normalize(),lr.copy(this.origin).sub(nd);const c=e.distanceTo(i)*.5,h=-this.direction.dot(Bc),p=lr.dot(this.direction),m=-lr.dot(Bc),d=lr.lengthSq(),x=Math.abs(1-h*h);let _,g,S,A;if(x>0)if(_=h*m-p,g=h*p-m,A=c*x,_>=0)if(g>=-A)if(g<=A){const D=1/x;_*=D,g*=D,S=_*(_+h*g+2*p)+g*(h*_+g+2*m)+d}else g=c,_=Math.max(0,-(h*g+p)),S=-_*_+g*(g+2*m)+d;else g=-c,_=Math.max(0,-(h*g+p)),S=-_*_+g*(g+2*m)+d;else g<=-A?(_=Math.max(0,-(-h*c+p)),g=_>0?-c:Math.min(Math.max(-c,-m),c),S=-_*_+g*(g+2*m)+d):g<=A?(_=0,g=Math.min(Math.max(-c,-m),c),S=g*(g+2*m)+d):(_=Math.max(0,-(h*c+p)),g=_>0?c:Math.min(Math.max(-c,-m),c),S=-_*_+g*(g+2*m)+d);else g=h>0?-c:c,_=Math.max(0,-(h*g+p)),S=-_*_+g*(g+2*m)+d;return r&&r.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(nd).addScaledVector(Bc,g),S}intersectSphere(e,i){Ea.subVectors(e.center,this.origin);const r=Ea.dot(this.direction),l=Ea.dot(Ea)-r*r,c=e.radius*e.radius;if(l>c)return null;const h=Math.sqrt(c-l),p=r-h,m=r+h;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,c,h,p,m;const d=1/this.direction.x,x=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(r=(e.min.x-g.x)*d,l=(e.max.x-g.x)*d):(r=(e.max.x-g.x)*d,l=(e.min.x-g.x)*d),x>=0?(c=(e.min.y-g.y)*x,h=(e.max.y-g.y)*x):(c=(e.max.y-g.y)*x,h=(e.min.y-g.y)*x),r>h||c>l||((c>r||isNaN(r))&&(r=c),(h<l||isNaN(l))&&(l=h),_>=0?(p=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(p=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),r>m||p>l)||((p>r||r!==r)&&(r=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,Ea)!==null}intersectTriangle(e,i,r,l,c){id.subVectors(i,e),Hc.subVectors(r,e),ad.crossVectors(id,Hc);let h=this.direction.dot(ad),p;if(h>0){if(l)return null;p=1}else if(h<0)p=-1,h=-h;else return null;lr.subVectors(this.origin,e);const m=p*this.direction.dot(Hc.crossVectors(lr,Hc));if(m<0)return null;const d=p*this.direction.dot(id.cross(lr));if(d<0||m+d>h)return null;const x=-p*lr.dot(ad);return x<0?null:this.at(x/h,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fr extends Kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.combine=X_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const W1=new on,zr=new dv,Vc=new Mu,Z1=new j,Gc=new j,kc=new j,Xc=new j,rd=new j,Wc=new j,q1=new j,Zc=new j;class Ut extends En{constructor(e=new Pn,i=new fr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const p=this.morphTargetInfluences;if(c&&p){Wc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const x=p[m],_=c[m];x!==0&&(rd.fromBufferAttribute(_,e),h?Wc.addScaledVector(rd,x):Wc.addScaledVector(rd.sub(i),x))}i.add(Wc)}return i}raycast(e,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Vc.copy(r.boundingSphere),Vc.applyMatrix4(c),zr.copy(e.ray).recast(e.near),!(Vc.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Vc,Z1)===null||zr.origin.distanceToSquared(Z1)>(e.far-e.near)**2))&&(W1.copy(c).invert(),zr.copy(e.ray).applyMatrix4(W1),!(r.boundingBox!==null&&zr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,zr)))}_computeIntersections(e,i,r){let l;const c=this.geometry,h=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,x=c.attributes.uv1,_=c.attributes.normal,g=c.groups,S=c.drawRange;if(p!==null)if(Array.isArray(h))for(let A=0,D=g.length;A<D;A++){const y=g[A],M=h[y.materialIndex],N=Math.max(y.start,S.start),z=Math.min(p.count,Math.min(y.start+y.count,S.start+S.count));for(let R=N,F=z;R<F;R+=3){const U=p.getX(R),P=p.getX(R+1),b=p.getX(R+2);l=qc(this,M,e,r,d,x,_,U,P,b),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,S.start),D=Math.min(p.count,S.start+S.count);for(let y=A,M=D;y<M;y+=3){const N=p.getX(y),z=p.getX(y+1),R=p.getX(y+2);l=qc(this,h,e,r,d,x,_,N,z,R),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let A=0,D=g.length;A<D;A++){const y=g[A],M=h[y.materialIndex],N=Math.max(y.start,S.start),z=Math.min(m.count,Math.min(y.start+y.count,S.start+S.count));for(let R=N,F=z;R<F;R+=3){const U=R,P=R+1,b=R+2;l=qc(this,M,e,r,d,x,_,U,P,b),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,S.start),D=Math.min(m.count,S.start+S.count);for(let y=A,M=D;y<M;y+=3){const N=y,z=y+1,R=y+2;l=qc(this,h,e,r,d,x,_,N,z,R),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function OS(s,e,i,r,l,c,h,p){let m;if(e.side===$n?m=r.intersectTriangle(h,c,l,!0,p):m=r.intersectTriangle(l,c,h,e.side===dr,p),m===null)return null;Zc.copy(p),Zc.applyMatrix4(s.matrixWorld);const d=i.ray.origin.distanceTo(Zc);return d<i.near||d>i.far?null:{distance:d,point:Zc.clone(),object:s}}function qc(s,e,i,r,l,c,h,p,m,d){s.getVertexPosition(p,Gc),s.getVertexPosition(m,kc),s.getVertexPosition(d,Xc);const x=OS(s,e,i,r,Gc,kc,Xc,q1);if(x){const _=new j;Ai.getBarycoord(q1,Gc,kc,Xc,_),l&&(x.uv=Ai.getInterpolatedAttribute(l,p,m,d,_,new nt)),c&&(x.uv1=Ai.getInterpolatedAttribute(c,p,m,d,_,new nt)),h&&(x.normal=Ai.getInterpolatedAttribute(h,p,m,d,_,new j),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new j,materialIndex:0};Ai.getNormal(Gc,kc,Xc,g.normal),x.face=g,x.barycoord=_}return x}class PS extends Vn{constructor(e=null,i=1,r=1,l,c,h,p,m,d=On,x=On,_,g){super(null,h,p,m,d,x,l,c,_,g),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const sd=new j,IS=new j,FS=new pt;class Hr{constructor(e=new j(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=sd.subVectors(r,i).cross(IS.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,r=!0){const l=e.delta(sd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const h=-(e.start.dot(this.normal)+this.constant)/c;return r===!0&&(h<0||h>1)?null:i.copy(e.start).addScaledVector(l,h)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||FS.getNormalMatrix(e),l=this.coplanarPoint(sd).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Br=new Mu,zS=new nt(.5,.5),Yc=new j;class E0{constructor(e=new Hr,i=new Hr,r=new Hr,l=new Hr,c=new Hr,h=new Hr){this.planes=[e,i,r,l,c,h]}set(e,i,r,l,c,h){const p=this.planes;return p[0].copy(e),p[1].copy(i),p[2].copy(r),p[3].copy(l),p[4].copy(c),p[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=Yi,r=!1){const l=this.planes,c=e.elements,h=c[0],p=c[1],m=c[2],d=c[3],x=c[4],_=c[5],g=c[6],S=c[7],A=c[8],D=c[9],y=c[10],M=c[11],N=c[12],z=c[13],R=c[14],F=c[15];if(l[0].setComponents(d-h,S-x,M-A,F-N).normalize(),l[1].setComponents(d+h,S+x,M+A,F+N).normalize(),l[2].setComponents(d+p,S+_,M+D,F+z).normalize(),l[3].setComponents(d-p,S-_,M-D,F-z).normalize(),r)l[4].setComponents(m,g,y,R).normalize(),l[5].setComponents(d-m,S-g,M-y,F-R).normalize();else if(l[4].setComponents(d-m,S-g,M-y,F-R).normalize(),i===Yi)l[5].setComponents(d+m,S+g,M+y,F+R).normalize();else if(i===fl)l[5].setComponents(m,g,y,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Br)}intersectsSprite(e){Br.center.set(0,0,0);const i=zS.distanceTo(e.center);return Br.radius=.7071067811865476+i,Br.applyMatrix4(e.matrixWorld),this.intersectsSphere(Br)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Yc.x=l.normal.x>0?e.max.x:e.min.x,Yc.y=l.normal.y>0?e.max.y:e.min.y,Yc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Yc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pv extends Kr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new At(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Y1=new on,r0=new dv,Kc=new Mu,Qc=new j;class BS extends En{constructor(e=new Pn,i=new pv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,h=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Kc.copy(r.boundingSphere),Kc.applyMatrix4(l),Kc.radius+=c,e.ray.intersectsSphere(Kc)===!1)return;Y1.copy(l).invert(),r0.copy(e.ray).applyMatrix4(Y1);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=r.index,_=r.attributes.position;if(d!==null){const g=Math.max(0,h.start),S=Math.min(d.count,h.start+h.count);for(let A=g,D=S;A<D;A++){const y=d.getX(A);Qc.fromBufferAttribute(_,y),K1(Qc,y,m,l,e,i,this)}}else{const g=Math.max(0,h.start),S=Math.min(_.count,h.start+h.count);for(let A=g,D=S;A<D;A++)Qc.fromBufferAttribute(_,A),K1(Qc,A,m,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function K1(s,e,i,r,l,c,h){const p=r0.distanceSqToPoint(s);if(p<i){const m=new j;r0.closestPointToPoint(s,m),m.applyMatrix4(r);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:h})}}class mv extends Vn{constructor(e=[],i=Zr,r,l,c,h,p,m,d,x){super(e,i,r,l,c,h,p,m,d,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Js extends Vn{constructor(e,i,r=Ji,l,c,h,p=On,m=On,d,x=Da,_=1){if(x!==Da&&x!==Xr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:_};super(g,l,c,h,p,m,x,r,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new M0(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class HS extends Js{constructor(e,i=Ji,r=Zr,l,c,h=On,p=On,m,d=Da){const x={width:e,height:e,depth:1},_=[x,x,x,x,x,x];super(e,e,i,r,l,c,h,p,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class gv extends Vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Fi extends Pn{constructor(e=1,i=1,r=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:h};const p=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],d=[],x=[],_=[];let g=0,S=0;A("z","y","x",-1,-1,r,i,e,h,c,0),A("z","y","x",1,-1,r,i,-e,h,c,1),A("x","z","y",1,1,e,r,i,l,h,2),A("x","z","y",1,-1,e,r,-i,l,h,3),A("x","y","z",1,-1,e,i,r,l,c,4),A("x","y","z",-1,-1,e,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new ln(d,3)),this.setAttribute("normal",new ln(x,3)),this.setAttribute("uv",new ln(_,2));function A(D,y,M,N,z,R,F,U,P,b,L){const H=R/P,k=F/b,W=R/2,ce=F/2,ue=U/2,K=P+1,B=b+1;let V=0,ee=0;const _e=new j;for(let Ee=0;Ee<B;Ee++){const O=Ee*k-ce;for(let Q=0;Q<K;Q++){const Se=Q*H-W;_e[D]=Se*N,_e[y]=O*z,_e[M]=ue,d.push(_e.x,_e.y,_e.z),_e[D]=0,_e[y]=0,_e[M]=U>0?1:-1,x.push(_e.x,_e.y,_e.z),_.push(Q/P),_.push(1-Ee/b),V+=1}}for(let Ee=0;Ee<b;Ee++)for(let O=0;O<P;O++){const Q=g+O+K*Ee,Se=g+O+K*(Ee+1),Te=g+(O+1)+K*(Ee+1),Re=g+(O+1)+K*Ee;m.push(Q,Se,Re),m.push(Se,Te,Re),ee+=6}p.addGroup(S,ee,L),S+=ee,g+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class pl extends Pn{constructor(e=1,i=32,r=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:i,thetaStart:r,thetaLength:l},i=Math.max(3,i);const c=[],h=[],p=[],m=[],d=new j,x=new nt;h.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let _=0,g=3;_<=i;_++,g+=3){const S=r+_/i*l;d.x=e*Math.cos(S),d.y=e*Math.sin(S),h.push(d.x,d.y,d.z),p.push(0,0,1),x.x=(h[g]/e+1)/2,x.y=(h[g+1]/e+1)/2,m.push(x.x,x.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new ln(h,3)),this.setAttribute("normal",new ln(p,3)),this.setAttribute("uv",new ln(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class mr extends Pn{constructor(e=1,i=1,r=1,l=32,c=1,h=!1,p=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:r,radialSegments:l,heightSegments:c,openEnded:h,thetaStart:p,thetaLength:m};const d=this;l=Math.floor(l),c=Math.floor(c);const x=[],_=[],g=[],S=[];let A=0;const D=[],y=r/2;let M=0;N(),h===!1&&(e>0&&z(!0),i>0&&z(!1)),this.setIndex(x),this.setAttribute("position",new ln(_,3)),this.setAttribute("normal",new ln(g,3)),this.setAttribute("uv",new ln(S,2));function N(){const R=new j,F=new j;let U=0;const P=(i-e)/r;for(let b=0;b<=c;b++){const L=[],H=b/c,k=H*(i-e)+e;for(let W=0;W<=l;W++){const ce=W/l,ue=ce*m+p,K=Math.sin(ue),B=Math.cos(ue);F.x=k*K,F.y=-H*r+y,F.z=k*B,_.push(F.x,F.y,F.z),R.set(K,P,B).normalize(),g.push(R.x,R.y,R.z),S.push(ce,1-H),L.push(A++)}D.push(L)}for(let b=0;b<l;b++)for(let L=0;L<c;L++){const H=D[L][b],k=D[L+1][b],W=D[L+1][b+1],ce=D[L][b+1];(e>0||L!==0)&&(x.push(H,k,ce),U+=3),(i>0||L!==c-1)&&(x.push(k,W,ce),U+=3)}d.addGroup(M,U,0),M+=U}function z(R){const F=A,U=new nt,P=new j;let b=0;const L=R===!0?e:i,H=R===!0?1:-1;for(let W=1;W<=l;W++)_.push(0,y*H,0),g.push(0,H,0),S.push(.5,.5),A++;const k=A;for(let W=0;W<=l;W++){const ue=W/l*m+p,K=Math.cos(ue),B=Math.sin(ue);P.x=L*B,P.y=y*H,P.z=L*K,_.push(P.x,P.y,P.z),g.push(0,H,0),U.x=K*.5+.5,U.y=B*.5*H+.5,S.push(U.x,U.y),A++}for(let W=0;W<l;W++){const ce=F+W,ue=k+W;R===!0?x.push(ue,ue+1,ce):x.push(ue+1,ue,ce),b+=3}d.addGroup(M,b,R===!0?1:2),M+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Su extends Pn{constructor(e=[],i=[],r=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:r,detail:l};const c=[],h=[];p(l),d(r),x(),this.setAttribute("position",new ln(c,3)),this.setAttribute("normal",new ln(c.slice(),3)),this.setAttribute("uv",new ln(h,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function p(N){const z=new j,R=new j,F=new j;for(let U=0;U<i.length;U+=3)S(i[U+0],z),S(i[U+1],R),S(i[U+2],F),m(z,R,F,N)}function m(N,z,R,F){const U=F+1,P=[];for(let b=0;b<=U;b++){P[b]=[];const L=N.clone().lerp(R,b/U),H=z.clone().lerp(R,b/U),k=U-b;for(let W=0;W<=k;W++)W===0&&b===U?P[b][W]=L:P[b][W]=L.clone().lerp(H,W/k)}for(let b=0;b<U;b++)for(let L=0;L<2*(U-b)-1;L++){const H=Math.floor(L/2);L%2===0?(g(P[b][H+1]),g(P[b+1][H]),g(P[b][H])):(g(P[b][H+1]),g(P[b+1][H+1]),g(P[b+1][H]))}}function d(N){const z=new j;for(let R=0;R<c.length;R+=3)z.x=c[R+0],z.y=c[R+1],z.z=c[R+2],z.normalize().multiplyScalar(N),c[R+0]=z.x,c[R+1]=z.y,c[R+2]=z.z}function x(){const N=new j;for(let z=0;z<c.length;z+=3){N.x=c[z+0],N.y=c[z+1],N.z=c[z+2];const R=y(N)/2/Math.PI+.5,F=M(N)/Math.PI+.5;h.push(R,1-F)}A(),_()}function _(){for(let N=0;N<h.length;N+=6){const z=h[N+0],R=h[N+2],F=h[N+4],U=Math.max(z,R,F),P=Math.min(z,R,F);U>.9&&P<.1&&(z<.2&&(h[N+0]+=1),R<.2&&(h[N+2]+=1),F<.2&&(h[N+4]+=1))}}function g(N){c.push(N.x,N.y,N.z)}function S(N,z){const R=N*3;z.x=e[R+0],z.y=e[R+1],z.z=e[R+2]}function A(){const N=new j,z=new j,R=new j,F=new j,U=new nt,P=new nt,b=new nt;for(let L=0,H=0;L<c.length;L+=9,H+=6){N.set(c[L+0],c[L+1],c[L+2]),z.set(c[L+3],c[L+4],c[L+5]),R.set(c[L+6],c[L+7],c[L+8]),U.set(h[H+0],h[H+1]),P.set(h[H+2],h[H+3]),b.set(h[H+4],h[H+5]),F.copy(N).add(z).add(R).divideScalar(3);const k=y(F);D(U,H+0,N,k),D(P,H+2,z,k),D(b,H+4,R,k)}}function D(N,z,R,F){F<0&&N.x===1&&(h[z]=N.x-1),R.x===0&&R.z===0&&(h[z]=F/2/Math.PI+.5)}function y(N){return Math.atan2(N.z,-N.x)}function M(N){return Math.atan2(-N.y,Math.sqrt(N.x*N.x+N.z*N.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Su(e.vertices,e.indices,e.radius,e.detail)}}class _u extends Su{constructor(e=1,i=0){const r=(1+Math.sqrt(5))/2,l=1/r,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-r,0,-l,r,0,l,-r,0,l,r,-l,-r,0,-l,r,0,l,-r,0,l,r,0,-r,0,-l,r,0,-l,-r,0,l,r,0,l],h=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,h,e,i),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new _u(e.radius,e.detail)}}class b0 extends Pn{constructor(e=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],i=12,r=0,l=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:i,phiStart:r,phiLength:l},i=Math.floor(i),l=bt(l,0,Math.PI*2);const c=[],h=[],p=[],m=[],d=[],x=1/i,_=new j,g=new nt,S=new j,A=new j,D=new j;let y=0,M=0;for(let N=0;N<=e.length-1;N++)switch(N){case 0:y=e[N+1].x-e[N].x,M=e[N+1].y-e[N].y,S.x=M*1,S.y=-y,S.z=M*0,D.copy(S),S.normalize(),m.push(S.x,S.y,S.z);break;case e.length-1:m.push(D.x,D.y,D.z);break;default:y=e[N+1].x-e[N].x,M=e[N+1].y-e[N].y,S.x=M*1,S.y=-y,S.z=M*0,A.copy(S),S.x+=D.x,S.y+=D.y,S.z+=D.z,S.normalize(),m.push(S.x,S.y,S.z),D.copy(A)}for(let N=0;N<=i;N++){const z=r+N*x*l,R=Math.sin(z),F=Math.cos(z);for(let U=0;U<=e.length-1;U++){_.x=e[U].x*R,_.y=e[U].y,_.z=e[U].x*F,h.push(_.x,_.y,_.z),g.x=N/i,g.y=U/(e.length-1),p.push(g.x,g.y);const P=m[3*U+0]*R,b=m[3*U+1],L=m[3*U+0]*F;d.push(P,b,L)}}for(let N=0;N<i;N++)for(let z=0;z<e.length-1;z++){const R=z+N*e.length,F=R,U=R+e.length,P=R+e.length+1,b=R+1;c.push(F,U,b),c.push(P,b,U)}this.setIndex(c),this.setAttribute("position",new ln(h,3)),this.setAttribute("uv",new ln(p,2)),this.setAttribute("normal",new ln(d,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new b0(e.points,e.segments,e.phiStart,e.phiLength)}}class A0 extends Su{constructor(e=1,i=0){const r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,l,e,i),this.type="OctahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new A0(e.radius,e.detail)}}class Wr extends Pn{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const c=e/2,h=i/2,p=Math.floor(r),m=Math.floor(l),d=p+1,x=m+1,_=e/p,g=i/m,S=[],A=[],D=[],y=[];for(let M=0;M<x;M++){const N=M*g-h;for(let z=0;z<d;z++){const R=z*_-c;A.push(R,-N,0),D.push(0,0,1),y.push(z/p),y.push(1-M/m)}}for(let M=0;M<m;M++)for(let N=0;N<p;N++){const z=N+d*M,R=N+d*(M+1),F=N+1+d*(M+1),U=N+1+d*M;S.push(z,R,U),S.push(R,F,U)}this.setIndex(S),this.setAttribute("position",new ln(A,3)),this.setAttribute("normal",new ln(D,3)),this.setAttribute("uv",new ln(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.width,e.height,e.widthSegments,e.heightSegments)}}class gl extends Pn{constructor(e=1,i=.4,r=12,l=48,c=Math.PI*2,h=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:c,thetaStart:h,thetaLength:p},r=Math.floor(r),l=Math.floor(l);const m=[],d=[],x=[],_=[],g=new j,S=new j,A=new j;for(let D=0;D<=r;D++){const y=h+D/r*p;for(let M=0;M<=l;M++){const N=M/l*c;S.x=(e+i*Math.cos(y))*Math.cos(N),S.y=(e+i*Math.cos(y))*Math.sin(N),S.z=i*Math.sin(y),d.push(S.x,S.y,S.z),g.x=e*Math.cos(N),g.y=e*Math.sin(N),A.subVectors(S,g).normalize(),x.push(A.x,A.y,A.z),_.push(M/l),_.push(D/r)}}for(let D=1;D<=r;D++)for(let y=1;y<=l;y++){const M=(l+1)*D+y-1,N=(l+1)*(D-1)+y-1,z=(l+1)*(D-1)+y,R=(l+1)*D+y;m.push(M,N,R),m.push(N,z,R)}this.setIndex(m),this.setAttribute("position",new ln(d,3)),this.setAttribute("normal",new ln(x,3)),this.setAttribute("uv",new ln(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function $s(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];if(Q1(l))l.isRenderTargetTexture?(ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone();else if(Array.isArray(l))if(Q1(l[0])){const c=[];for(let h=0,p=l.length;h<p;h++)c[h]=l[h].clone();e[i][r]=c}else e[i][r]=l.slice();else e[i][r]=l}}return e}function Wn(s){const e={};for(let i=0;i<s.length;i++){const r=$s(s[i]);for(const l in r)e[l]=r[l]}return e}function Q1(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function VS(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function _v(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}const GS={clone:$s,merge:Wn};var kS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,XS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $i extends Kr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kS,this.fragmentShader=XS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=VS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const r in e.uniforms){const l=e.uniforms[r];switch(this.uniforms[r]={},l.type){case"t":this.uniforms[r].value=i[l.value]||null;break;case"c":this.uniforms[r].value=new At().setHex(l.value);break;case"v2":this.uniforms[r].value=new nt().fromArray(l.value);break;case"v3":this.uniforms[r].value=new j().fromArray(l.value);break;case"v4":this.uniforms[r].value=new cn().fromArray(l.value);break;case"m3":this.uniforms[r].value=new pt().fromArray(l.value);break;case"m4":this.uniforms[r].value=new on().fromArray(l.value);break;default:this.uniforms[r].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class WS extends $i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bi extends Kr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new At(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new At(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=i0,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ZS extends Kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=VM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qS extends Kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const od={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(j1(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!j1(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function j1(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class YS{constructor(e,i,r){const l=this;let c=!1,h=0,p=0,m;const d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=r,this._abortController=null,this.itemStart=function(x){p++,c===!1&&l.onStart!==void 0&&l.onStart(x,h,p),c=!0},this.itemEnd=function(x){h++,l.onProgress!==void 0&&l.onProgress(x,h,p),h===p&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(x){l.onError!==void 0&&l.onError(x)},this.resolveURL=function(x){return x=x.normalize("NFC"),m?m(x):x},this.setURLModifier=function(x){return m=x,this},this.addHandler=function(x,_){return d.push(x,_),this},this.removeHandler=function(x){const _=d.indexOf(x);return _!==-1&&d.splice(_,2),this},this.getHandler=function(x){for(let _=0,g=d.length;_<g;_+=2){const S=d[_],A=d[_+1];if(S.global&&(S.lastIndex=0),S.test(x))return A}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const KS=new YS;class T0{constructor(e){this.manager=e!==void 0?e:KS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const r=this;return new Promise(function(l,c){r.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}T0.DEFAULT_MATERIAL_NAME="__DEFAULT";const ks=new WeakMap;class QS extends T0{constructor(e){super(e)}load(e,i,r,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,h=od.get(`image:${e}`);if(h!==void 0){if(h.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(h),c.manager.itemEnd(e)},0);else{let _=ks.get(h);_===void 0&&(_=[],ks.set(h,_)),_.push({onLoad:i,onError:l})}return h}const p=hl("img");function m(){x(),i&&i(this);const _=ks.get(this)||[];for(let g=0;g<_.length;g++){const S=_[g];S.onLoad&&S.onLoad(this)}ks.delete(this),c.manager.itemEnd(e)}function d(_){x(),l&&l(_),od.remove(`image:${e}`);const g=ks.get(this)||[];for(let S=0;S<g.length;S++){const A=g[S];A.onError&&A.onError(_)}ks.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function x(){p.removeEventListener("load",m,!1),p.removeEventListener("error",d,!1)}return p.addEventListener("load",m,!1),p.addEventListener("error",d,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(p.crossOrigin=this.crossOrigin),od.add(`image:${e}`,p),c.manager.itemStart(e),p.src=e,p}}class jS extends T0{constructor(e){super(e)}load(e,i,r,l){const c=new Vn,h=new QS(this.manager);return h.setCrossOrigin(this.crossOrigin),h.setPath(this.path),h.load(e,function(p){c.image=p,c.needsUpdate=!0,i!==void 0&&i(c)},r,l),c}}class R0 extends En{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new At(e),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class JS extends R0{constructor(e,i,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.groundColor=new At(i)}copy(e,i){return super.copy(e,i),this.groundColor.copy(e.groundColor),this}toJSON(e){const i=super.toJSON(e);return i.object.groundColor=this.groundColor.getHex(),i}}const ld=new on,J1=new j,$1=new j;class vv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new E0,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new cn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;J1.setFromMatrixPosition(e.matrixWorld),i.position.copy(J1),$1.setFromMatrixPosition(e.target.matrixWorld),i.lookAt($1),i.updateMatrixWorld(),ld.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ld,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===fl||i.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(ld)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const jc=new j,Jc=new eo,Xi=new j;class xv extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jc,Jc,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,Jc,Xi.set(1,1,1)).invert()}updateWorldMatrix(e,i,r=!1){super.updateWorldMatrix(e,i,r),this.matrixWorld.decompose(jc,Jc,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,Jc,Xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const cr=new j,e_=new nt,t_=new nt;class di extends xv{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=dl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ol*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dl*2*Math.atan(Math.tan(ol*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(cr.x,cr.y).multiplyScalar(-e/cr.z),cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(cr.x,cr.y).multiplyScalar(-e/cr.z)}getViewSize(e,i){return this.getViewBounds(e,e_,t_),i.subVectors(t_,e_)}setViewOffset(e,i,r,l,c,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(ol*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,d=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*r/d,l*=h.width/m,r*=h.height/d}const p=this.filmOffset;p!==0&&(c+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class $S extends vv{constructor(){super(new di(90,1,.5,500)),this.isPointLightShadow=!0}}class Mv extends R0{constructor(e,i,r=0,l=2){super(e,i),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=l,this.shadow=new $S}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,i){return super.copy(e,i),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class w0 extends xv{constructor(e=-1,i=1,r=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-e,h=r+e,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,h=c+d*this.view.width,p-=x*this.view.offsetY,m=p-x*this.view.height}this.projectionMatrix.makeOrthographic(c,h,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class ey extends vv{constructor(){super(new w0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class n_ extends R0{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.shadow=new ey}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}const Xs=-90,Ws=1;class ty extends En{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new di(Xs,Ws,e,i);l.layers=this.layers,this.add(l);const c=new di(Xs,Ws,e,i);c.layers=this.layers,this.add(c);const h=new di(Xs,Ws,e,i);h.layers=this.layers,this.add(h);const p=new di(Xs,Ws,e,i);p.layers=this.layers,this.add(p);const m=new di(Xs,Ws,e,i);m.layers=this.layers,this.add(m);const d=new di(Xs,Ws,e,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,c,h,p,m]=i;for(const d of i)this.remove(d);if(e===Yi)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===fl)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of i)this.add(d),d.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,h,p,m,d,x]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const D=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(r,0,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(r,1,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(r,2,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(r,3,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(r,4,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),r.texture.generateMipmaps=D,e.setRenderTarget(r,5,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,x),e.setRenderTarget(_,g,S),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class ny extends di{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class iy{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,ut("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}const N0=class N0{constructor(e,i,r,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,r,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let r=0;r<4;r++)this.elements[r]=e[r+i];return this}set(e,i,r,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=r,c[3]=l,this}};N0.prototype.isMatrix2=!0;let i_=N0;function a_(s,e,i,r){const l=ay(r);switch(i){case nv:return s*e;case av:return s*e/l.components*l.byteLength;case p0:return s*e/l.components*l.byteLength;case qr:return s*e*2/l.components*l.byteLength;case m0:return s*e*2/l.components*l.byteLength;case iv:return s*e*3/l.components*l.byteLength;case Ii:return s*e*4/l.components*l.byteLength;case g0:return s*e*4/l.components*l.byteLength;case ru:case su:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ou:case lu:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wd:case Dd:return Math.max(s,16)*Math.max(e,8)/4;case Rd:case Cd:return Math.max(s,8)*Math.max(e,8)/2;case Ud:case Ld:case Od:case Pd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Nd:case fu:case Id:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Fd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Bd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Hd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Vd:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Gd:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case kd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Xd:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Wd:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Zd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case qd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Yd:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Kd:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Qd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case jd:case Jd:case $d:return Math.ceil(s/4)*Math.ceil(e/4)*16;case e0:case t0:return Math.ceil(s/4)*Math.ceil(e/4)*8;case hu:case n0:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function ay(s){switch(s){case pi:case J_:return{byteLength:1,components:1};case cl:case $_:case Ca:return{byteLength:2,components:1};case h0:case d0:return{byteLength:2,components:4};case Ji:case f0:case qi:return{byteLength:4,components:1};case ev:case tv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:c0}}));typeof window<"u"&&(window.__THREE__?ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=c0);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Sv(){let s=null,e=!1,i=null,r=null;function l(c,h){i(c,h),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&s!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function ry(s){const e=new WeakMap;function i(p,m){const d=p.array,x=p.usage,_=d.byteLength,g=s.createBuffer();s.bindBuffer(m,g),s.bufferData(m,d,x),p.onUploadCallback();let S;if(d instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)S=s.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)S=s.SHORT;else if(d instanceof Uint32Array)S=s.UNSIGNED_INT;else if(d instanceof Int32Array)S=s.INT;else if(d instanceof Int8Array)S=s.BYTE;else if(d instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:S,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:_}}function r(p,m,d){const x=m.array,_=m.updateRanges;if(s.bindBuffer(d,p),_.length===0)s.bufferSubData(d,0,x);else{_.sort((S,A)=>S.start-A.start);let g=0;for(let S=1;S<_.length;S++){const A=_[g],D=_[S];D.start<=A.start+A.count+1?A.count=Math.max(A.count,D.start+D.count-A.start):(++g,_[g]=D)}_.length=g+1;for(let S=0,A=_.length;S<A;S++){const D=_[S];s.bufferSubData(d,D.start*x.BYTES_PER_ELEMENT,x,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(s.deleteBuffer(m.buffer),e.delete(p))}function h(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const x=e.get(p);(!x||x.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=e.get(p);if(d===void 0)e.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:h}}var sy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,oy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ly=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,py=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,my=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_y=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,My=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,by=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ay=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ty=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ry=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Cy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Uy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ly=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ny=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Oy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Py=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ky=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ky=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Jy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$y=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,aE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,cE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_E=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ME=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,SE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,EE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,AE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,TE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,CE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,DE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,UE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,LE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,IE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,FE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,BE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,GE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,kE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,XE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,WE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,YE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,KE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,QE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,JE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$E=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ab=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ob=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,db=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ab=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Db=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ub=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ob=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ib=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xt={alphahash_fragment:sy,alphahash_pars_fragment:oy,alphamap_fragment:ly,alphamap_pars_fragment:cy,alphatest_fragment:uy,alphatest_pars_fragment:fy,aomap_fragment:hy,aomap_pars_fragment:dy,batching_pars_vertex:py,batching_vertex:my,begin_vertex:gy,beginnormal_vertex:_y,bsdfs:vy,iridescence_fragment:xy,bumpmap_pars_fragment:My,clipping_planes_fragment:Sy,clipping_planes_pars_fragment:yy,clipping_planes_pars_vertex:Ey,clipping_planes_vertex:by,color_fragment:Ay,color_pars_fragment:Ty,color_pars_vertex:Ry,color_vertex:wy,common:Cy,cube_uv_reflection_fragment:Dy,defaultnormal_vertex:Uy,displacementmap_pars_vertex:Ly,displacementmap_vertex:Ny,emissivemap_fragment:Oy,emissivemap_pars_fragment:Py,colorspace_fragment:Iy,colorspace_pars_fragment:Fy,envmap_fragment:zy,envmap_common_pars_fragment:By,envmap_pars_fragment:Hy,envmap_pars_vertex:Vy,envmap_physical_pars_fragment:Jy,envmap_vertex:Gy,fog_vertex:ky,fog_pars_vertex:Xy,fog_fragment:Wy,fog_pars_fragment:Zy,gradientmap_pars_fragment:qy,lightmap_pars_fragment:Yy,lights_lambert_fragment:Ky,lights_lambert_pars_fragment:Qy,lights_pars_begin:jy,lights_toon_fragment:$y,lights_toon_pars_fragment:eE,lights_phong_fragment:tE,lights_phong_pars_fragment:nE,lights_physical_fragment:iE,lights_physical_pars_fragment:aE,lights_fragment_begin:rE,lights_fragment_maps:sE,lights_fragment_end:oE,lightprobes_pars_fragment:lE,logdepthbuf_fragment:cE,logdepthbuf_pars_fragment:uE,logdepthbuf_pars_vertex:fE,logdepthbuf_vertex:hE,map_fragment:dE,map_pars_fragment:pE,map_particle_fragment:mE,map_particle_pars_fragment:gE,metalnessmap_fragment:_E,metalnessmap_pars_fragment:vE,morphinstance_vertex:xE,morphcolor_vertex:ME,morphnormal_vertex:SE,morphtarget_pars_vertex:yE,morphtarget_vertex:EE,normal_fragment_begin:bE,normal_fragment_maps:AE,normal_pars_fragment:TE,normal_pars_vertex:RE,normal_vertex:wE,normalmap_pars_fragment:CE,clearcoat_normal_fragment_begin:DE,clearcoat_normal_fragment_maps:UE,clearcoat_pars_fragment:LE,iridescence_pars_fragment:NE,opaque_fragment:OE,packing:PE,premultiplied_alpha_fragment:IE,project_vertex:FE,dithering_fragment:zE,dithering_pars_fragment:BE,roughnessmap_fragment:HE,roughnessmap_pars_fragment:VE,shadowmap_pars_fragment:GE,shadowmap_pars_vertex:kE,shadowmap_vertex:XE,shadowmask_pars_fragment:WE,skinbase_vertex:ZE,skinning_pars_vertex:qE,skinning_vertex:YE,skinnormal_vertex:KE,specularmap_fragment:QE,specularmap_pars_fragment:jE,tonemapping_fragment:JE,tonemapping_pars_fragment:$E,transmission_fragment:eb,transmission_pars_fragment:tb,uv_pars_fragment:nb,uv_pars_vertex:ib,uv_vertex:ab,worldpos_vertex:rb,background_vert:sb,background_frag:ob,backgroundCube_vert:lb,backgroundCube_frag:cb,cube_vert:ub,cube_frag:fb,depth_vert:hb,depth_frag:db,distance_vert:pb,distance_frag:mb,equirect_vert:gb,equirect_frag:_b,linedashed_vert:vb,linedashed_frag:xb,meshbasic_vert:Mb,meshbasic_frag:Sb,meshlambert_vert:yb,meshlambert_frag:Eb,meshmatcap_vert:bb,meshmatcap_frag:Ab,meshnormal_vert:Tb,meshnormal_frag:Rb,meshphong_vert:wb,meshphong_frag:Cb,meshphysical_vert:Db,meshphysical_frag:Ub,meshtoon_vert:Lb,meshtoon_frag:Nb,points_vert:Ob,points_frag:Pb,shadow_vert:Ib,shadow_frag:Fb,sprite_vert:zb,sprite_frag:Bb},Ve={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Zi={basic:{uniforms:Wn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:Wn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new At(0)},envMapIntensity:{value:1}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:Wn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:Wn([Ve.common,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.roughnessmap,Ve.metalnessmap,Ve.fog,Ve.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:Wn([Ve.common,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.gradientmap,Ve.fog,Ve.lights,{emissive:{value:new At(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:Wn([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:Wn([Ve.points,Ve.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:Wn([Ve.common,Ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:Wn([Ve.common,Ve.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:Wn([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:Wn([Ve.sprite,Ve.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distance:{uniforms:Wn([Ve.common,Ve.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distance_vert,fragmentShader:xt.distance_frag},shadow:{uniforms:Wn([Ve.lights,Ve.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};Zi.physical={uniforms:Wn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};const $c={r:0,b:0,g:0},Hb=new on,yv=new pt;yv.set(-1,0,0,0,1,0,0,0,1);function Vb(s,e,i,r,l,c){const h=new At(0);let p=l===!0?0:1,m,d,x=null,_=0,g=null;function S(N){let z=N.isScene===!0?N.background:null;if(z&&z.isTexture){const R=N.backgroundBlurriness>0;z=e.get(z,R)}return z}function A(N){let z=!1;const R=S(N);R===null?y(h,p):R&&R.isColor&&(y(R,1),z=!0);const F=s.xr.getEnvironmentBlendMode();F==="additive"?i.buffers.color.setClear(0,0,0,1,c):F==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(s.autoClear||z)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function D(N,z){const R=S(z);R&&(R.isCubeTexture||R.mapping===xu)?(d===void 0&&(d=new Ut(new Fi(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:$s(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(F,U,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=R,d.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Hb.makeRotationFromEuler(z.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(yv),d.material.toneMapped=Ct.getTransfer(R.colorSpace)!==Zt,(x!==R||_!==R.version||g!==s.toneMapping)&&(d.material.needsUpdate=!0,x=R,_=R.version,g=s.toneMapping),d.layers.enableAll(),N.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Ut(new Wr(2,2),new $i({name:"BackgroundMaterial",uniforms:$s(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,m.material.toneMapped=Ct.getTransfer(R.colorSpace)!==Zt,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(x!==R||_!==R.version||g!==s.toneMapping)&&(m.material.needsUpdate=!0,x=R,_=R.version,g=s.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function y(N,z){N.getRGB($c,_v(s)),i.buffers.color.setClear($c.r,$c.g,$c.b,z,c)}function M(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(N,z=1){h.set(N),p=z,y(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(N){p=N,y(h,p)},render:A,addToRenderList:D,dispose:M}}function Gb(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=g(null);let c=l,h=!1;function p(k,W,ce,ue,K){let B=!1;const V=_(k,ue,ce,W);c!==V&&(c=V,d(c.object)),B=S(k,ue,ce,K),B&&A(k,ue,ce,K),K!==null&&e.update(K,s.ELEMENT_ARRAY_BUFFER),(B||h)&&(h=!1,R(k,W,ce,ue),K!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function m(){return s.createVertexArray()}function d(k){return s.bindVertexArray(k)}function x(k){return s.deleteVertexArray(k)}function _(k,W,ce,ue){const K=ue.wireframe===!0;let B=r[W.id];B===void 0&&(B={},r[W.id]=B);const V=k.isInstancedMesh===!0?k.id:0;let ee=B[V];ee===void 0&&(ee={},B[V]=ee);let _e=ee[ce.id];_e===void 0&&(_e={},ee[ce.id]=_e);let Ee=_e[K];return Ee===void 0&&(Ee=g(m()),_e[K]=Ee),Ee}function g(k){const W=[],ce=[],ue=[];for(let K=0;K<i;K++)W[K]=0,ce[K]=0,ue[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:ce,attributeDivisors:ue,object:k,attributes:{},index:null}}function S(k,W,ce,ue){const K=c.attributes,B=W.attributes;let V=0;const ee=ce.getAttributes();for(const _e in ee)if(ee[_e].location>=0){const O=K[_e];let Q=B[_e];if(Q===void 0&&(_e==="instanceMatrix"&&k.instanceMatrix&&(Q=k.instanceMatrix),_e==="instanceColor"&&k.instanceColor&&(Q=k.instanceColor)),O===void 0||O.attribute!==Q||Q&&O.data!==Q.data)return!0;V++}return c.attributesNum!==V||c.index!==ue}function A(k,W,ce,ue){const K={},B=W.attributes;let V=0;const ee=ce.getAttributes();for(const _e in ee)if(ee[_e].location>=0){let O=B[_e];O===void 0&&(_e==="instanceMatrix"&&k.instanceMatrix&&(O=k.instanceMatrix),_e==="instanceColor"&&k.instanceColor&&(O=k.instanceColor));const Q={};Q.attribute=O,O&&O.data&&(Q.data=O.data),K[_e]=Q,V++}c.attributes=K,c.attributesNum=V,c.index=ue}function D(){const k=c.newAttributes;for(let W=0,ce=k.length;W<ce;W++)k[W]=0}function y(k){M(k,0)}function M(k,W){const ce=c.newAttributes,ue=c.enabledAttributes,K=c.attributeDivisors;ce[k]=1,ue[k]===0&&(s.enableVertexAttribArray(k),ue[k]=1),K[k]!==W&&(s.vertexAttribDivisor(k,W),K[k]=W)}function N(){const k=c.newAttributes,W=c.enabledAttributes;for(let ce=0,ue=W.length;ce<ue;ce++)W[ce]!==k[ce]&&(s.disableVertexAttribArray(ce),W[ce]=0)}function z(k,W,ce,ue,K,B,V){V===!0?s.vertexAttribIPointer(k,W,ce,K,B):s.vertexAttribPointer(k,W,ce,ue,K,B)}function R(k,W,ce,ue){D();const K=ue.attributes,B=ce.getAttributes(),V=W.defaultAttributeValues;for(const ee in B){const _e=B[ee];if(_e.location>=0){let Ee=K[ee];if(Ee===void 0&&(ee==="instanceMatrix"&&k.instanceMatrix&&(Ee=k.instanceMatrix),ee==="instanceColor"&&k.instanceColor&&(Ee=k.instanceColor)),Ee!==void 0){const O=Ee.normalized,Q=Ee.itemSize,Se=e.get(Ee);if(Se===void 0)continue;const Te=Se.buffer,Re=Se.type,te=Se.bytesPerElement,fe=Re===s.INT||Re===s.UNSIGNED_INT||Ee.gpuType===f0;if(Ee.isInterleavedBufferAttribute){const he=Ee.data,Le=he.stride,et=Ee.offset;if(he.isInstancedInterleavedBuffer){for(let Pe=0;Pe<_e.locationSize;Pe++)M(_e.location+Pe,he.meshPerAttribute);k.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Pe=0;Pe<_e.locationSize;Pe++)y(_e.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let Pe=0;Pe<_e.locationSize;Pe++)z(_e.location+Pe,Q/_e.locationSize,Re,O,Le*te,(et+Q/_e.locationSize*Pe)*te,fe)}else{if(Ee.isInstancedBufferAttribute){for(let he=0;he<_e.locationSize;he++)M(_e.location+he,Ee.meshPerAttribute);k.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let he=0;he<_e.locationSize;he++)y(_e.location+he);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let he=0;he<_e.locationSize;he++)z(_e.location+he,Q/_e.locationSize,Re,O,Q*te,Q/_e.locationSize*he*te,fe)}}else if(V!==void 0){const O=V[ee];if(O!==void 0)switch(O.length){case 2:s.vertexAttrib2fv(_e.location,O);break;case 3:s.vertexAttrib3fv(_e.location,O);break;case 4:s.vertexAttrib4fv(_e.location,O);break;default:s.vertexAttrib1fv(_e.location,O)}}}}N()}function F(){L();for(const k in r){const W=r[k];for(const ce in W){const ue=W[ce];for(const K in ue){const B=ue[K];for(const V in B)x(B[V].object),delete B[V];delete ue[K]}}delete r[k]}}function U(k){if(r[k.id]===void 0)return;const W=r[k.id];for(const ce in W){const ue=W[ce];for(const K in ue){const B=ue[K];for(const V in B)x(B[V].object),delete B[V];delete ue[K]}}delete r[k.id]}function P(k){for(const W in r){const ce=r[W];for(const ue in ce){const K=ce[ue];if(K[k.id]===void 0)continue;const B=K[k.id];for(const V in B)x(B[V].object),delete B[V];delete K[k.id]}}}function b(k){for(const W in r){const ce=r[W],ue=k.isInstancedMesh===!0?k.id:0,K=ce[ue];if(K!==void 0){for(const B in K){const V=K[B];for(const ee in V)x(V[ee].object),delete V[ee];delete K[B]}delete ce[ue],Object.keys(ce).length===0&&delete r[W]}}}function L(){H(),h=!0,c!==l&&(c=l,d(c.object))}function H(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:L,resetDefaultState:H,dispose:F,releaseStatesOfGeometry:U,releaseStatesOfObject:b,releaseStatesOfProgram:P,initAttributes:D,enableAttribute:y,disableUnusedAttributes:N}}function kb(s,e,i){let r;function l(m){r=m}function c(m,d){s.drawArrays(r,m,d),i.update(d,r,1)}function h(m,d,x){x!==0&&(s.drawArraysInstanced(r,m,d,x),i.update(d,r,x))}function p(m,d,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,d,0,x);let g=0;for(let S=0;S<x;S++)g+=d[S];i.update(g,r,1)}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=p}function Xb(s,e,i,r){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Ii&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(P){const b=P===Ca&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==pi&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==qi&&!b)}function m(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const x=m(d);x!==d&&(ut("WebGLRenderer:",d,"not supported, using",x,"instead."),d=x);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),M=s.getParameter(s.MAX_VERTEX_ATTRIBS),N=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),z=s.getParameter(s.MAX_VARYING_VECTORS),R=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),F=s.getParameter(s.MAX_SAMPLES),U=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:S,maxVertexTextures:A,maxTextureSize:D,maxCubemapSize:y,maxAttributes:M,maxVertexUniforms:N,maxVaryings:z,maxFragmentUniforms:R,maxSamples:F,samples:U}}function Wb(s){const e=this;let i=null,r=0,l=!1,c=!1;const h=new Hr,p=new pt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const S=_.length!==0||g||r!==0||l;return l=g,r=_.length,S},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=x(_,g,0)},this.setState=function(_,g,S){const A=_.clippingPlanes,D=_.clipIntersection,y=_.clipShadows,M=s.get(_);if(!l||A===null||A.length===0||c&&!y)c?x(null):d();else{const N=c?0:r,z=N*4;let R=M.clippingState||null;m.value=R,R=x(A,g,z,S);for(let F=0;F!==z;++F)R[F]=i[F];M.clippingState=R,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=N}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function x(_,g,S,A){const D=_!==null?_.length:0;let y=null;if(D!==0){if(y=m.value,A!==!0||y===null){const M=S+D*4,N=g.matrixWorldInverse;p.getNormalMatrix(N),(y===null||y.length<M)&&(y=new Float32Array(M));for(let z=0,R=S;z!==D;++z,R+=4)h.copy(_[z]).applyMatrix4(N,p),h.normal.toArray(y,R),y[R+3]=h.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=D,e.numIntersection=0,y}}const hr=4,r_=[.125,.215,.35,.446,.526,.582],Gr=20,Zb=256,il=new w0,s_=new At;let cd=null,ud=0,fd=0,hd=!1;const qb=new j;class o_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,r=.1,l=100,c={}){const{size:h=256,position:p=qb}=c;cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=u_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=c_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(cd,ud,fd),this._renderer.xr.enabled=hd,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Zr||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Ca,format:Ii,colorSpace:du,depthBuffer:!1},l=l_(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=l_(e,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Yb(c)),this._blurMaterial=Qb(c,e,i),this._ggxMaterial=Kb(c,e,i)}return l}_compileMaterial(e){const i=new Ut(new Pn,e);this._renderer.compile(i,il)}_sceneToCubeUV(e,i,r,l,c){const m=new di(90,1,i,r),d=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,S=_.toneMapping;_.getClearColor(s_),_.toneMapping=Qi,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ut(new Fi,new fr({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,y=D.material;let M=!1;const N=e.background;N?N.isColor&&(y.color.copy(N),e.background=null,M=!0):(y.color.copy(s_),M=!0);for(let z=0;z<6;z++){const R=z%3;R===0?(m.up.set(0,d[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[z],c.y,c.z)):R===1?(m.up.set(0,0,d[z]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[z],c.z)):(m.up.set(0,d[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[z]));const F=this._cubeSize;Zs(l,R*F,z>2?F:0,F,F),_.setRenderTarget(l),M&&_.render(D,m),_.render(e,m)}_.toneMapping=S,_.autoClear=g,e.background=N}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Zr||e.mapping===js;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=u_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=c_());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const p=c.uniforms;p.envMap.value=e;const m=this._cubeSize;Zs(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,il)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=r}_applyGGXFilter(e,i,r){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,p=this._lodMeshes[r];p.material=h;const m=h.uniforms,d=r/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),_=Math.sqrt(d*d-x*x),g=0+d*1.25,S=_*g,{_lodMax:A}=this,D=this._sizeLods[r],y=3*D*(r>A-hr?r-A+hr:0),M=4*(this._cubeSize-D);m.envMap.value=e.texture,m.roughness.value=S,m.mipInt.value=A-i,Zs(c,y,M,3*D,2*D),l.setRenderTarget(c),l.render(p,il),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=A-r,Zs(e,y,M,3*D,2*D),l.setRenderTarget(e),l.render(p,il)}_blur(e,i,r,l,c){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,l,"latitudinal",c),this._halfBlur(h,e,r,r,l,"longitudinal",c)}_halfBlur(e,i,r,l,c,h,p){const m=this._renderer,d=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&Dt("blur direction must be either latitudinal or longitudinal!");const x=3,_=this._lodMeshes[l];_.material=d;const g=d.uniforms,S=this._sizeLods[r]-1,A=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Gr-1),D=c/A,y=isFinite(c)?1+Math.floor(x*D):Gr;y>Gr&&ut(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Gr}`);const M=[];let N=0;for(let P=0;P<Gr;++P){const b=P/D,L=Math.exp(-b*b/2);M.push(L),P===0?N+=L:P<y&&(N+=2*L)}for(let P=0;P<M.length;P++)M[P]=M[P]/N;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=M,g.latitudinal.value=h==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:z}=this;g.dTheta.value=A,g.mipInt.value=z-r;const R=this._sizeLods[l],F=3*R*(l>z-hr?l-z+hr:0),U=4*(this._cubeSize-R);Zs(i,F,U,3*R,2*R),m.setRenderTarget(i),m.render(_,il)}}function Yb(s){const e=[],i=[],r=[];let l=s;const c=s-hr+1+r_.length;for(let h=0;h<c;h++){const p=Math.pow(2,l);e.push(p);let m=1/p;h>s-hr?m=r_[h-s+hr-1]:h===0&&(m=0),i.push(m);const d=1/(p-2),x=-d,_=1+d,g=[x,x,_,x,_,_,x,x,_,_,x,_],S=6,A=6,D=3,y=2,M=1,N=new Float32Array(D*A*S),z=new Float32Array(y*A*S),R=new Float32Array(M*A*S);for(let U=0;U<S;U++){const P=U%3*2/3-1,b=U>2?0:-1,L=[P,b,0,P+2/3,b,0,P+2/3,b+1,0,P,b,0,P+2/3,b+1,0,P,b+1,0];N.set(L,D*A*U),z.set(g,y*A*U);const H=[U,U,U,U,U,U];R.set(H,M*A*U)}const F=new Pn;F.setAttribute("position",new Ti(N,D)),F.setAttribute("uv",new Ti(z,y)),F.setAttribute("faceIndex",new Ti(R,M)),r.push(new Ut(F,null)),l>hr&&l--}return{lodMeshes:r,sizeLods:e,sigmas:i}}function l_(s,e,i){const r=new ji(s,e,i);return r.texture.mapping=xu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Zs(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function Kb(s,e,i){return new $i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Zb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function Qb(s,e,i){const r=new Float32Array(Gr),l=new j(0,1,0);return new $i({name:"SphericalGaussianBlur",defines:{n:Gr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function c_(){return new $i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function u_(){return new $i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function yu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ev extends ji{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new mv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Fi(5,5,5),c=new $i({name:"CubemapFromEquirect",uniforms:$s(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:$n,blending:Ta});c.uniforms.tEquirect.value=i;const h=new Ut(l,c),p=i.minFilter;return i.minFilter===kr&&(i.minFilter=Hn),new ty(1,10,this).update(e,h),i.minFilter=p,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const c=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,l);e.setRenderTarget(c)}}function jb(s){let e=new WeakMap,i=new WeakMap,r=null;function l(g,S=!1){return g==null?null:S?h(g):c(g)}function c(g){if(g&&g.isTexture){const S=g.mapping;if(S===Ph||S===Ih)if(e.has(g)){const A=e.get(g).texture;return p(A,g.mapping)}else{const A=g.image;if(A&&A.height>0){const D=new Ev(A.height);return D.fromEquirectangularTexture(s,g),e.set(g,D),g.addEventListener("dispose",d),p(D.texture,g.mapping)}else return null}}return g}function h(g){if(g&&g.isTexture){const S=g.mapping,A=S===Ph||S===Ih,D=S===Zr||S===js;if(A||D){let y=i.get(g);const M=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==M)return r===null&&(r=new o_(s)),y=A?r.fromEquirectangular(g,y):r.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),y.texture;if(y!==void 0)return y.texture;{const N=g.image;return A&&N&&N.height>0||D&&N&&m(N)?(r===null&&(r=new o_(s)),y=A?r.fromEquirectangular(g):r.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),g.addEventListener("dispose",x),y.texture):null}}}return g}function p(g,S){return S===Ph?g.mapping=Zr:S===Ih&&(g.mapping=js),g}function m(g){let S=0;const A=6;for(let D=0;D<A;D++)g[D]!==void 0&&S++;return S===A}function d(g){const S=g.target;S.removeEventListener("dispose",d);const A=e.get(S);A!==void 0&&(e.delete(S),A.dispose())}function x(g){const S=g.target;S.removeEventListener("dispose",x);const A=i.get(S);A!==void 0&&(i.delete(S),A.dispose())}function _(){e=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:_}}function Jb(s){const e={};function i(r){if(e[r]!==void 0)return e[r];const l=s.getExtension(r);return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Ys("WebGLRenderer: "+r+" extension not supported."),l}}}function $b(s,e,i,r){const l={},c=new WeakMap;function h(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const A in g.attributes)e.remove(g.attributes[A]);g.removeEventListener("dispose",h),delete l[g.id];const S=c.get(g);S&&(e.remove(S),c.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(_,g){return l[g.id]===!0||(g.addEventListener("dispose",h),l[g.id]=!0,i.memory.geometries++),g}function m(_){const g=_.attributes;for(const S in g)e.update(g[S],s.ARRAY_BUFFER)}function d(_){const g=[],S=_.index,A=_.attributes.position;let D=0;if(A===void 0)return;if(S!==null){const N=S.array;D=S.version;for(let z=0,R=N.length;z<R;z+=3){const F=N[z+0],U=N[z+1],P=N[z+2];g.push(F,U,U,P,P,F)}}else{const N=A.array;D=A.version;for(let z=0,R=N.length/3-1;z<R;z+=3){const F=z+0,U=z+1,P=z+2;g.push(F,U,U,P,P,F)}}const y=new(A.count>=65535?uv:cv)(g,1);y.version=D;const M=c.get(_);M&&e.remove(M),c.set(_,y)}function x(_){const g=c.get(_);if(g){const S=_.index;S!==null&&g.version<S.version&&d(_)}else d(_);return c.get(_)}return{get:p,update:m,getWireframeAttribute:x}}function e3(s,e,i){let r;function l(_){r=_}let c,h;function p(_){c=_.type,h=_.bytesPerElement}function m(_,g){s.drawElements(r,g,c,_*h),i.update(g,r,1)}function d(_,g,S){S!==0&&(s.drawElementsInstanced(r,g,c,_*h,S),i.update(g,r,S))}function x(_,g,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,c,_,0,S);let D=0;for(let y=0;y<S;y++)D+=g[y];i.update(D,r,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=x}function t3(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,h,p){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=p*(c/3);break;case s.LINES:i.lines+=p*(c/2);break;case s.LINE_STRIP:i.lines+=p*(c-1);break;case s.LINE_LOOP:i.lines+=p*c;break;case s.POINTS:i.points+=p*c;break;default:Dt("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function n3(s,e,i){const r=new WeakMap,l=new cn;function c(h,p,m){const d=h.morphTargetInfluences,x=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,_=x!==void 0?x.length:0;let g=r.get(p);if(g===void 0||g.count!==_){let H=function(){b.dispose(),r.delete(p),p.removeEventListener("dispose",H)};var S=H;g!==void 0&&g.texture.dispose();const A=p.morphAttributes.position!==void 0,D=p.morphAttributes.normal!==void 0,y=p.morphAttributes.color!==void 0,M=p.morphAttributes.position||[],N=p.morphAttributes.normal||[],z=p.morphAttributes.color||[];let R=0;A===!0&&(R=1),D===!0&&(R=2),y===!0&&(R=3);let F=p.attributes.position.count*R,U=1;F>e.maxTextureSize&&(U=Math.ceil(F/e.maxTextureSize),F=e.maxTextureSize);const P=new Float32Array(F*U*4*_),b=new sv(P,F,U,_);b.type=qi,b.needsUpdate=!0;const L=R*4;for(let k=0;k<_;k++){const W=M[k],ce=N[k],ue=z[k],K=F*U*4*k;for(let B=0;B<W.count;B++){const V=B*L;A===!0&&(l.fromBufferAttribute(W,B),P[K+V+0]=l.x,P[K+V+1]=l.y,P[K+V+2]=l.z,P[K+V+3]=0),D===!0&&(l.fromBufferAttribute(ce,B),P[K+V+4]=l.x,P[K+V+5]=l.y,P[K+V+6]=l.z,P[K+V+7]=0),y===!0&&(l.fromBufferAttribute(ue,B),P[K+V+8]=l.x,P[K+V+9]=l.y,P[K+V+10]=l.z,P[K+V+11]=ue.itemSize===4?l.w:1)}}g={count:_,texture:b,size:new nt(F,U)},r.set(p,g),p.addEventListener("dispose",H)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let A=0;for(let y=0;y<d.length;y++)A+=d[y];const D=p.morphTargetsRelative?1:1-A;m.getUniforms().setValue(s,"morphTargetBaseInfluence",D),m.getUniforms().setValue(s,"morphTargetInfluences",d)}m.getUniforms().setValue(s,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:c}}function i3(s,e,i,r,l){let c=new WeakMap;function h(d){const x=l.render.frame,_=d.geometry,g=e.get(d,_);if(c.get(g)!==x&&(e.update(g),c.set(g,x)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==x&&(i.update(d.instanceMatrix,s.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,s.ARRAY_BUFFER),c.set(d,x))),d.isSkinnedMesh){const S=d.skeleton;c.get(S)!==x&&(S.update(),c.set(S,x))}return g}function p(){c=new WeakMap}function m(d){const x=d.target;x.removeEventListener("dispose",m),r.releaseStatesOfObject(x),i.remove(x.instanceMatrix),x.instanceColor!==null&&i.remove(x.instanceColor)}return{update:h,dispose:p}}const a3={[W_]:"LINEAR_TONE_MAPPING",[Z_]:"REINHARD_TONE_MAPPING",[q_]:"CINEON_TONE_MAPPING",[u0]:"ACES_FILMIC_TONE_MAPPING",[K_]:"AGX_TONE_MAPPING",[Q_]:"NEUTRAL_TONE_MAPPING",[Y_]:"CUSTOM_TONE_MAPPING"};function r3(s,e,i,r,l,c){const h=new ji(e,i,{type:s,depthBuffer:l,stencilBuffer:c,samples:r?4:0,depthTexture:l?new Js(e,i):void 0}),p=new ji(e,i,{type:Ca,depthBuffer:!1,stencilBuffer:!1}),m=new Pn;m.setAttribute("position",new ln([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new ln([0,2,0,0,2,0],2));const d=new WS({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),x=new Ut(m,d),_=new w0(-1,1,1,-1,0,1);let g=null,S=null,A=!1,D,y=null,M=[],N=!1;this.setSize=function(z,R){h.setSize(z,R),p.setSize(z,R);for(let F=0;F<M.length;F++){const U=M[F];U.setSize&&U.setSize(z,R)}},this.setEffects=function(z){M=z,N=M.length>0&&M[0].isRenderPass===!0;const R=h.width,F=h.height;for(let U=0;U<M.length;U++){const P=M[U];P.setSize&&P.setSize(R,F)}},this.begin=function(z,R){if(A||z.toneMapping===Qi&&M.length===0)return!1;if(y=R,R!==null){const F=R.width,U=R.height;(h.width!==F||h.height!==U)&&this.setSize(F,U)}return N===!1&&z.setRenderTarget(h),D=z.toneMapping,z.toneMapping=Qi,!0},this.hasRenderPass=function(){return N},this.end=function(z,R){z.toneMapping=D,A=!0;let F=h,U=p;for(let P=0;P<M.length;P++){const b=M[P];if(b.enabled!==!1&&(b.render(z,U,F,R),b.needsSwap!==!1)){const L=F;F=U,U=L}}if(g!==z.outputColorSpace||S!==z.toneMapping){g=z.outputColorSpace,S=z.toneMapping,d.defines={},Ct.getTransfer(g)===Zt&&(d.defines.SRGB_TRANSFER="");const P=a3[S];P&&(d.defines[P]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=F.texture,z.setRenderTarget(y),z.render(x,_),y=null,A=!1},this.isCompositing=function(){return A},this.dispose=function(){h.depthTexture&&h.depthTexture.dispose(),h.dispose(),p.dispose(),m.dispose(),d.dispose()}}const bv=new Vn,s0=new Js(1,1),Av=new sv,Tv=new MS,Rv=new mv,f_=[],h_=[],d_=new Float32Array(16),p_=new Float32Array(9),m_=new Float32Array(4);function to(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let c=f_[l];if(c===void 0&&(c=new Float32Array(l),f_[l]=c),e!==0){r.toArray(c,0);for(let h=1,p=0;h!==e;++h)p+=i,s[h].toArray(c,p)}return c}function bn(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function An(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function Eu(s,e){let i=h_[e];i===void 0&&(i=new Int32Array(e),h_[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function s3(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function o3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2fv(this.addr,e),An(i,e)}}function l3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(bn(i,e))return;s.uniform3fv(this.addr,e),An(i,e)}}function c3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4fv(this.addr,e),An(i,e)}}function u3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),An(i,e)}else{if(bn(i,r))return;m_.set(r),s.uniformMatrix2fv(this.addr,!1,m_),An(i,r)}}function f3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),An(i,e)}else{if(bn(i,r))return;p_.set(r),s.uniformMatrix3fv(this.addr,!1,p_),An(i,r)}}function h3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),An(i,e)}else{if(bn(i,r))return;d_.set(r),s.uniformMatrix4fv(this.addr,!1,d_),An(i,r)}}function d3(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function p3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2iv(this.addr,e),An(i,e)}}function m3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3iv(this.addr,e),An(i,e)}}function g3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4iv(this.addr,e),An(i,e)}}function _3(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function v3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2uiv(this.addr,e),An(i,e)}}function x3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3uiv(this.addr,e),An(i,e)}}function M3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4uiv(this.addr,e),An(i,e)}}function S3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(s0.compareFunction=i.isReversedDepthBuffer()?v0:_0,c=s0):c=bv,i.setTexture2D(e||c,l)}function y3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||Tv,l)}function E3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||Rv,l)}function b3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||Av,l)}function A3(s){switch(s){case 5126:return s3;case 35664:return o3;case 35665:return l3;case 35666:return c3;case 35674:return u3;case 35675:return f3;case 35676:return h3;case 5124:case 35670:return d3;case 35667:case 35671:return p3;case 35668:case 35672:return m3;case 35669:case 35673:return g3;case 5125:return _3;case 36294:return v3;case 36295:return x3;case 36296:return M3;case 35678:case 36198:case 36298:case 36306:case 35682:return S3;case 35679:case 36299:case 36307:return y3;case 35680:case 36300:case 36308:case 36293:return E3;case 36289:case 36303:case 36311:case 36292:return b3}}function T3(s,e){s.uniform1fv(this.addr,e)}function R3(s,e){const i=to(e,this.size,2);s.uniform2fv(this.addr,i)}function w3(s,e){const i=to(e,this.size,3);s.uniform3fv(this.addr,i)}function C3(s,e){const i=to(e,this.size,4);s.uniform4fv(this.addr,i)}function D3(s,e){const i=to(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function U3(s,e){const i=to(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function L3(s,e){const i=to(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function N3(s,e){s.uniform1iv(this.addr,e)}function O3(s,e){s.uniform2iv(this.addr,e)}function P3(s,e){s.uniform3iv(this.addr,e)}function I3(s,e){s.uniform4iv(this.addr,e)}function F3(s,e){s.uniform1uiv(this.addr,e)}function z3(s,e){s.uniform2uiv(this.addr,e)}function B3(s,e){s.uniform3uiv(this.addr,e)}function H3(s,e){s.uniform4uiv(this.addr,e)}function V3(s,e,i){const r=this.cache,l=e.length,c=Eu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),An(r,c));let h;this.type===s.SAMPLER_2D_SHADOW?h=s0:h=bv;for(let p=0;p!==l;++p)i.setTexture2D(e[p]||h,c[p])}function G3(s,e,i){const r=this.cache,l=e.length,c=Eu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),An(r,c));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||Tv,c[h])}function k3(s,e,i){const r=this.cache,l=e.length,c=Eu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),An(r,c));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||Rv,c[h])}function X3(s,e,i){const r=this.cache,l=e.length,c=Eu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),An(r,c));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||Av,c[h])}function W3(s){switch(s){case 5126:return T3;case 35664:return R3;case 35665:return w3;case 35666:return C3;case 35674:return D3;case 35675:return U3;case 35676:return L3;case 5124:case 35670:return N3;case 35667:case 35671:return O3;case 35668:case 35672:return P3;case 35669:case 35673:return I3;case 5125:return F3;case 36294:return z3;case 36295:return B3;case 36296:return H3;case 35678:case 36198:case 36298:case 36306:case 35682:return V3;case 35679:case 36299:case 36307:return G3;case 35680:case 36300:case 36308:case 36293:return k3;case 36289:case 36303:case 36311:case 36292:return X3}}class Z3{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=A3(i.type)}}class q3{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=W3(i.type)}}class Y3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const p=l[c];p.setValue(e,i[p.id],r)}}}const dd=/(\w+)(\])?(\[|\.)?/g;function g_(s,e){s.seq.push(e),s.map[e.id]=e}function K3(s,e,i){const r=s.name,l=r.length;for(dd.lastIndex=0;;){const c=dd.exec(r),h=dd.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&h+2===l){g_(i,d===void 0?new Z3(p,s,e):new q3(p,s,e));break}else{let _=i.map[p];_===void 0&&(_=new Y3(p),g_(i,_)),i=_}}}class cu{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let h=0;h<r;++h){const p=e.getActiveUniform(i,h),m=e.getUniformLocation(i,p.name);K3(p,m,this)}const l=[],c=[];for(const h of this.seq)h.type===e.SAMPLER_2D_SHADOW||h.type===e.SAMPLER_CUBE_SHADOW||h.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(h):c.push(h);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let c=0,h=i.length;c!==h;++c){const p=i[c],m=r[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,c=e.length;l!==c;++l){const h=e[l];h.id in i&&r.push(h)}return r}}function __(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const Q3=37297;let j3=0;function J3(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let h=l;h<c;h++){const p=h+1;r.push(`${p===e?">":" "} ${p}: ${i[h]}`)}return r.join(`
`)}const v_=new pt;function $3(s){Ct._getMatrix(v_,Ct.workingColorSpace,s);const e=`mat3( ${v_.elements.map(i=>i.toFixed(4))} )`;switch(Ct.getTransfer(s)){case pu:return[e,"LinearTransferOETF"];case Zt:return[e,"sRGBTransferOETF"];default:return ut("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function x_(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),c=(s.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const p=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+J3(s.getShaderSource(e),p)}else return c}function eA(s,e){const i=$3(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const tA={[W_]:"Linear",[Z_]:"Reinhard",[q_]:"Cineon",[u0]:"ACESFilmic",[K_]:"AgX",[Q_]:"Neutral",[Y_]:"Custom"};function nA(s,e){const i=tA[e];return i===void 0?(ut("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const eu=new j;function iA(){Ct.getLuminanceCoefficients(eu);const s=eu.x.toFixed(4),e=eu.y.toFixed(4),i=eu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aA(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sl).join(`
`)}function rA(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function sA(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(e,l),h=c.name;let p=1;c.type===s.FLOAT_MAT2&&(p=2),c.type===s.FLOAT_MAT3&&(p=3),c.type===s.FLOAT_MAT4&&(p=4),i[h]={type:c.type,location:s.getAttribLocation(e,h),locationSize:p}}return i}function sl(s){return s!==""}function M_(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function S_(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const oA=/^[ \t]*#include +<([\w\d./]+)>/gm;function o0(s){return s.replace(oA,cA)}const lA=new Map;function cA(s,e){let i=xt[e];if(i===void 0){const r=lA.get(e);if(r!==void 0)i=xt[r],ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return o0(i)}const uA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function y_(s){return s.replace(uA,fA)}function fA(s,e,i,r){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function E_(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const hA={[au]:"SHADOWMAP_TYPE_PCF",[rl]:"SHADOWMAP_TYPE_VSM"};function dA(s){return hA[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const pA={[Zr]:"ENVMAP_TYPE_CUBE",[js]:"ENVMAP_TYPE_CUBE",[xu]:"ENVMAP_TYPE_CUBE_UV"};function mA(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":pA[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const gA={[js]:"ENVMAP_MODE_REFRACTION"};function _A(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":gA[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const vA={[X_]:"ENVMAP_BLENDING_MULTIPLY",[zM]:"ENVMAP_BLENDING_MIX",[BM]:"ENVMAP_BLENDING_ADD"};function xA(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":vA[s.combine]||"ENVMAP_BLENDING_NONE"}function MA(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function SA(s,e,i,r){const l=s.getContext(),c=i.defines;let h=i.vertexShader,p=i.fragmentShader;const m=dA(i),d=mA(i),x=_A(i),_=xA(i),g=MA(i),S=aA(i),A=rA(c),D=l.createProgram();let y,M,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(sl).join(`
`),y.length>0&&(y+=`
`),M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(sl).join(`
`),M.length>0&&(M+=`
`)):(y=[E_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sl).join(`
`),M=[E_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+x:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Qi?"#define TONE_MAPPING":"",i.toneMapping!==Qi?xt.tonemapping_pars_fragment:"",i.toneMapping!==Qi?nA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,eA("linearToOutputTexel",i.outputColorSpace),iA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(sl).join(`
`)),h=o0(h),h=M_(h,i),h=S_(h,i),p=o0(p),p=M_(p,i),p=S_(p,i),h=y_(h),p=y_(p),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,M=["#define varying in",i.glslVersion===C1?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===C1?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const z=N+y+h,R=N+M+p,F=__(l,l.VERTEX_SHADER,z),U=__(l,l.FRAGMENT_SHADER,R);l.attachShader(D,F),l.attachShader(D,U),i.index0AttributeName!==void 0?l.bindAttribLocation(D,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(D,0,"position"),l.linkProgram(D);function P(k){if(s.debug.checkShaderErrors){const W=l.getProgramInfoLog(D)||"",ce=l.getShaderInfoLog(F)||"",ue=l.getShaderInfoLog(U)||"",K=W.trim(),B=ce.trim(),V=ue.trim();let ee=!0,_e=!0;if(l.getProgramParameter(D,l.LINK_STATUS)===!1)if(ee=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,D,F,U);else{const Ee=x_(l,F,"vertex"),O=x_(l,U,"fragment");Dt("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(D,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+K+`
`+Ee+`
`+O)}else K!==""?ut("WebGLProgram: Program Info Log:",K):(B===""||V==="")&&(_e=!1);_e&&(k.diagnostics={runnable:ee,programLog:K,vertexShader:{log:B,prefix:y},fragmentShader:{log:V,prefix:M}})}l.deleteShader(F),l.deleteShader(U),b=new cu(l,D),L=sA(l,D)}let b;this.getUniforms=function(){return b===void 0&&P(this),b};let L;this.getAttributes=function(){return L===void 0&&P(this),L};let H=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=l.getProgramParameter(D,Q3)),H},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=j3++,this.cacheKey=e,this.usedTimes=1,this.program=D,this.vertexShader=F,this.fragmentShader=U,this}let yA=0;class EA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,r){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new bA(e),i.set(e,r)),r}}class bA{constructor(e){this.id=yA++,this.code=e,this.usedTimes=0}}function AA(s){return s===qr||s===fu||s===hu}function TA(s,e,i,r,l,c){const h=new ov,p=new EA,m=new Set,d=[],x=new Map,_=r.logarithmicDepthBuffer;let g=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(b){return m.add(b),b===0?"uv":`uv${b}`}function D(b,L,H,k,W,ce){const ue=k.fog,K=W.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ee=e.get(b.envMap||B,V),_e=ee&&ee.mapping===xu?ee.image.height:null,Ee=S[b.type];b.precision!==null&&(g=r.getMaxPrecision(b.precision),g!==b.precision&&ut("WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const O=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Q=O!==void 0?O.length:0;let Se=0;K.morphAttributes.position!==void 0&&(Se=1),K.morphAttributes.normal!==void 0&&(Se=2),K.morphAttributes.color!==void 0&&(Se=3);let Te,Re,te,fe;if(Ee){const qe=Zi[Ee];Te=qe.vertexShader,Re=qe.fragmentShader}else{Te=b.vertexShader,Re=b.fragmentShader;const qe=p.getVertexShaderStage(b),nn=p.getFragmentShaderStage(b);p.update(b,qe,nn),te=qe.id,fe=nn.id}const he=s.getRenderTarget(),Le=s.state.buffers.depth.getReversed(),et=W.isInstancedMesh===!0,Pe=W.isBatchedMesh===!0,De=!!b.map,He=!!b.matcap,je=!!ee,mt=!!b.aoMap,ot=!!b.lightMap,Lt=!!b.bumpMap&&b.wireframe===!1,We=!!b.normalMap,ft=!!b.displacementMap,Mt=!!b.emissiveMap,zt=!!b.metalnessMap,$t=!!b.roughnessMap,q=b.anisotropy>0,It=b.clearcoat>0,ct=b.dispersion>0,I=b.iridescence>0,E=b.sheen>0,$=b.transmission>0,se=q&&!!b.anisotropyMap,me=It&&!!b.clearcoatMap,we=It&&!!b.clearcoatNormalMap,Oe=It&&!!b.clearcoatRoughnessMap,pe=I&&!!b.iridescenceMap,ge=I&&!!b.iridescenceThicknessMap,Ue=E&&!!b.sheenColorMap,ke=E&&!!b.sheenRoughnessMap,ze=!!b.specularMap,Ie=!!b.specularColorMap,it=!!b.specularIntensityMap,at=$&&!!b.transmissionMap,ht=$&&!!b.thicknessMap,Z=!!b.gradientMap,Ce=!!b.alphaMap,xe=b.alphaTest>0,Ne=!!b.alphaHash,Ge=!!b.extensions;let Ae=Qi;b.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Ae=s.toneMapping);const Je={shaderID:Ee,shaderType:b.type,shaderName:b.name,vertexShader:Te,fragmentShader:Re,defines:b.defines,customVertexShaderID:te,customFragmentShaderID:fe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Pe,batchingColor:Pe&&W._colorsTexture!==null,instancing:et,instancingColor:et&&W.instanceColor!==null,instancingMorph:et&&W.morphTexture!==null,outputColorSpace:he===null?s.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Ct.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:De,matcap:He,envMap:je,envMapMode:je&&ee.mapping,envMapCubeUVHeight:_e,aoMap:mt,lightMap:ot,bumpMap:Lt,normalMap:We,displacementMap:ft,emissiveMap:Mt,normalMapObjectSpace:We&&b.normalMapType===GM,normalMapTangentSpace:We&&b.normalMapType===i0,packedNormalMap:We&&b.normalMapType===i0&&AA(b.normalMap.format),metalnessMap:zt,roughnessMap:$t,anisotropy:q,anisotropyMap:se,clearcoat:It,clearcoatMap:me,clearcoatNormalMap:we,clearcoatRoughnessMap:Oe,dispersion:ct,iridescence:I,iridescenceMap:pe,iridescenceThicknessMap:ge,sheen:E,sheenColorMap:Ue,sheenRoughnessMap:ke,specularMap:ze,specularColorMap:Ie,specularIntensityMap:it,transmission:$,transmissionMap:at,thicknessMap:ht,gradientMap:Z,opaque:b.transparent===!1&&b.blending===qs&&b.alphaToCoverage===!1,alphaMap:Ce,alphaTest:xe,alphaHash:Ne,combine:b.combine,mapUv:De&&A(b.map.channel),aoMapUv:mt&&A(b.aoMap.channel),lightMapUv:ot&&A(b.lightMap.channel),bumpMapUv:Lt&&A(b.bumpMap.channel),normalMapUv:We&&A(b.normalMap.channel),displacementMapUv:ft&&A(b.displacementMap.channel),emissiveMapUv:Mt&&A(b.emissiveMap.channel),metalnessMapUv:zt&&A(b.metalnessMap.channel),roughnessMapUv:$t&&A(b.roughnessMap.channel),anisotropyMapUv:se&&A(b.anisotropyMap.channel),clearcoatMapUv:me&&A(b.clearcoatMap.channel),clearcoatNormalMapUv:we&&A(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&A(b.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&A(b.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&A(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&A(b.sheenColorMap.channel),sheenRoughnessMapUv:ke&&A(b.sheenRoughnessMap.channel),specularMapUv:ze&&A(b.specularMap.channel),specularColorMapUv:Ie&&A(b.specularColorMap.channel),specularIntensityMapUv:it&&A(b.specularIntensityMap.channel),transmissionMapUv:at&&A(b.transmissionMap.channel),thicknessMapUv:ht&&A(b.thicknessMap.channel),alphaMapUv:Ce&&A(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(We||q),vertexNormals:!!K.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!K.attributes.uv&&(De||Ce),fog:!!ue,useFog:b.fog===!0,fogExp2:!!ue&&ue.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||K.attributes.normal===void 0&&We===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Le,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:K.attributes.position!==void 0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Se,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ae,decodeVideoTexture:De&&b.map.isVideoTexture===!0&&Ct.getTransfer(b.map.colorSpace)===Zt,decodeVideoTextureEmissive:Mt&&b.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(b.emissiveMap.colorSpace)===Zt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ba,flipSided:b.side===$n,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ge&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&b.extensions.multiDraw===!0||Pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Je.vertexUv1s=m.has(1),Je.vertexUv2s=m.has(2),Je.vertexUv3s=m.has(3),m.clear(),Je}function y(b){const L=[];if(b.shaderID?L.push(b.shaderID):(L.push(b.customVertexShaderID),L.push(b.customFragmentShaderID)),b.defines!==void 0)for(const H in b.defines)L.push(H),L.push(b.defines[H]);return b.isRawShaderMaterial===!1&&(M(L,b),N(L,b),L.push(s.outputColorSpace)),L.push(b.customProgramCacheKey),L.join()}function M(b,L){b.push(L.precision),b.push(L.outputColorSpace),b.push(L.envMapMode),b.push(L.envMapCubeUVHeight),b.push(L.mapUv),b.push(L.alphaMapUv),b.push(L.lightMapUv),b.push(L.aoMapUv),b.push(L.bumpMapUv),b.push(L.normalMapUv),b.push(L.displacementMapUv),b.push(L.emissiveMapUv),b.push(L.metalnessMapUv),b.push(L.roughnessMapUv),b.push(L.anisotropyMapUv),b.push(L.clearcoatMapUv),b.push(L.clearcoatNormalMapUv),b.push(L.clearcoatRoughnessMapUv),b.push(L.iridescenceMapUv),b.push(L.iridescenceThicknessMapUv),b.push(L.sheenColorMapUv),b.push(L.sheenRoughnessMapUv),b.push(L.specularMapUv),b.push(L.specularColorMapUv),b.push(L.specularIntensityMapUv),b.push(L.transmissionMapUv),b.push(L.thicknessMapUv),b.push(L.combine),b.push(L.fogExp2),b.push(L.sizeAttenuation),b.push(L.morphTargetsCount),b.push(L.morphAttributeCount),b.push(L.numDirLights),b.push(L.numPointLights),b.push(L.numSpotLights),b.push(L.numSpotLightMaps),b.push(L.numHemiLights),b.push(L.numRectAreaLights),b.push(L.numDirLightShadows),b.push(L.numPointLightShadows),b.push(L.numSpotLightShadows),b.push(L.numSpotLightShadowsWithMaps),b.push(L.numLightProbes),b.push(L.shadowMapType),b.push(L.toneMapping),b.push(L.numClippingPlanes),b.push(L.numClipIntersection),b.push(L.depthPacking)}function N(b,L){h.disableAll(),L.instancing&&h.enable(0),L.instancingColor&&h.enable(1),L.instancingMorph&&h.enable(2),L.matcap&&h.enable(3),L.envMap&&h.enable(4),L.normalMapObjectSpace&&h.enable(5),L.normalMapTangentSpace&&h.enable(6),L.clearcoat&&h.enable(7),L.iridescence&&h.enable(8),L.alphaTest&&h.enable(9),L.vertexColors&&h.enable(10),L.vertexAlphas&&h.enable(11),L.vertexUv1s&&h.enable(12),L.vertexUv2s&&h.enable(13),L.vertexUv3s&&h.enable(14),L.vertexTangents&&h.enable(15),L.anisotropy&&h.enable(16),L.alphaHash&&h.enable(17),L.batching&&h.enable(18),L.dispersion&&h.enable(19),L.batchingColor&&h.enable(20),L.gradientMap&&h.enable(21),L.packedNormalMap&&h.enable(22),L.vertexNormals&&h.enable(23),b.push(h.mask),h.disableAll(),L.fog&&h.enable(0),L.useFog&&h.enable(1),L.flatShading&&h.enable(2),L.logarithmicDepthBuffer&&h.enable(3),L.reversedDepthBuffer&&h.enable(4),L.skinning&&h.enable(5),L.morphTargets&&h.enable(6),L.morphNormals&&h.enable(7),L.morphColors&&h.enable(8),L.premultipliedAlpha&&h.enable(9),L.shadowMapEnabled&&h.enable(10),L.doubleSided&&h.enable(11),L.flipSided&&h.enable(12),L.useDepthPacking&&h.enable(13),L.dithering&&h.enable(14),L.transmission&&h.enable(15),L.sheen&&h.enable(16),L.opaque&&h.enable(17),L.pointsUvs&&h.enable(18),L.decodeVideoTexture&&h.enable(19),L.decodeVideoTextureEmissive&&h.enable(20),L.alphaToCoverage&&h.enable(21),L.numLightProbeGrids>0&&h.enable(22),L.hasPositionAttribute&&h.enable(23),b.push(h.mask)}function z(b){const L=S[b.type];let H;if(L){const k=Zi[L];H=GS.clone(k.uniforms)}else H=b.uniforms;return H}function R(b,L){let H=x.get(L);return H!==void 0?++H.usedTimes:(H=new SA(s,L,b,l),d.push(H),x.set(L,H)),H}function F(b){if(--b.usedTimes===0){const L=d.indexOf(b);d[L]=d[d.length-1],d.pop(),x.delete(b.cacheKey),b.destroy()}}function U(b){p.remove(b)}function P(){p.dispose()}return{getParameters:D,getProgramCacheKey:y,getUniforms:z,acquireProgram:R,releaseProgram:F,releaseShaderCache:U,programs:d,dispose:P}}function RA(){let s=new WeakMap;function e(h){return s.has(h)}function i(h){let p=s.get(h);return p===void 0&&(p={},s.set(h,p)),p}function r(h){s.delete(h)}function l(h,p,m){s.get(h)[p]=m}function c(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:c}}function wA(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function b_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function A_(){const s=[];let e=0;const i=[],r=[],l=[];function c(){e=0,i.length=0,r.length=0,l.length=0}function h(g){let S=0;return g.isInstancedMesh&&(S+=2),g.isSkinnedMesh&&(S+=1),S}function p(g,S,A,D,y,M){let N=s[e];return N===void 0?(N={id:g.id,object:g,geometry:S,material:A,materialVariant:h(g),groupOrder:D,renderOrder:g.renderOrder,z:y,group:M},s[e]=N):(N.id=g.id,N.object=g,N.geometry=S,N.material=A,N.materialVariant=h(g),N.groupOrder=D,N.renderOrder=g.renderOrder,N.z=y,N.group=M),e++,N}function m(g,S,A,D,y,M){const N=p(g,S,A,D,y,M);A.transmission>0?r.push(N):A.transparent===!0?l.push(N):i.push(N)}function d(g,S,A,D,y,M){const N=p(g,S,A,D,y,M);A.transmission>0?r.unshift(N):A.transparent===!0?l.unshift(N):i.unshift(N)}function x(g,S,A){i.length>1&&i.sort(g||wA),r.length>1&&r.sort(S||b_),l.length>1&&l.sort(S||b_),A&&(i.reverse(),r.reverse(),l.reverse())}function _(){for(let g=e,S=s.length;g<S;g++){const A=s[g];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:m,unshift:d,finish:_,sort:x}}function CA(){let s=new WeakMap;function e(r,l){const c=s.get(r);let h;return c===void 0?(h=new A_,s.set(r,[h])):l>=c.length?(h=new A_,c.push(h)):h=c[l],h}function i(){s=new WeakMap}return{get:e,dispose:i}}function DA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new j,color:new At};break;case"SpotLight":i={position:new j,direction:new j,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new j,color:new At,distance:0,decay:0};break;case"HemisphereLight":i={direction:new j,skyColor:new At,groundColor:new At};break;case"RectAreaLight":i={color:new At,position:new j,halfWidth:new j,halfHeight:new j};break}return s[e.id]=i,i}}}function UA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let LA=0;function NA(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function OA(s){const e=new DA,i=UA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new j);const l=new j,c=new on,h=new on;function p(d){let x=0,_=0,g=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let S=0,A=0,D=0,y=0,M=0,N=0,z=0,R=0,F=0,U=0,P=0;d.sort(NA);for(let L=0,H=d.length;L<H;L++){const k=d[L],W=k.color,ce=k.intensity,ue=k.distance;let K=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===qr?K=k.shadow.map.texture:K=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)x+=W.r*ce,_+=W.g*ce,g+=W.b*ce;else if(k.isLightProbe){for(let B=0;B<9;B++)r.probe[B].addScaledVector(k.sh.coefficients[B],ce);P++}else if(k.isDirectionalLight){const B=e.get(k);if(B.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const V=k.shadow,ee=i.get(k);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,r.directionalShadow[S]=ee,r.directionalShadowMap[S]=K,r.directionalShadowMatrix[S]=k.shadow.matrix,N++}r.directional[S]=B,S++}else if(k.isSpotLight){const B=e.get(k);B.position.setFromMatrixPosition(k.matrixWorld),B.color.copy(W).multiplyScalar(ce),B.distance=ue,B.coneCos=Math.cos(k.angle),B.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),B.decay=k.decay,r.spot[D]=B;const V=k.shadow;if(k.map&&(r.spotLightMap[F]=k.map,F++,V.updateMatrices(k),k.castShadow&&U++),r.spotLightMatrix[D]=V.matrix,k.castShadow){const ee=i.get(k);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,r.spotShadow[D]=ee,r.spotShadowMap[D]=K,R++}D++}else if(k.isRectAreaLight){const B=e.get(k);B.color.copy(W).multiplyScalar(ce),B.halfWidth.set(k.width*.5,0,0),B.halfHeight.set(0,k.height*.5,0),r.rectArea[y]=B,y++}else if(k.isPointLight){const B=e.get(k);if(B.color.copy(k.color).multiplyScalar(k.intensity),B.distance=k.distance,B.decay=k.decay,k.castShadow){const V=k.shadow,ee=i.get(k);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,ee.shadowCameraNear=V.camera.near,ee.shadowCameraFar=V.camera.far,r.pointShadow[A]=ee,r.pointShadowMap[A]=K,r.pointShadowMatrix[A]=k.shadow.matrix,z++}r.point[A]=B,A++}else if(k.isHemisphereLight){const B=e.get(k);B.skyColor.copy(k.color).multiplyScalar(ce),B.groundColor.copy(k.groundColor).multiplyScalar(ce),r.hemi[M]=B,M++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ve.LTC_FLOAT_1,r.rectAreaLTC2=Ve.LTC_FLOAT_2):(r.rectAreaLTC1=Ve.LTC_HALF_1,r.rectAreaLTC2=Ve.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=_,r.ambient[2]=g;const b=r.hash;(b.directionalLength!==S||b.pointLength!==A||b.spotLength!==D||b.rectAreaLength!==y||b.hemiLength!==M||b.numDirectionalShadows!==N||b.numPointShadows!==z||b.numSpotShadows!==R||b.numSpotMaps!==F||b.numLightProbes!==P)&&(r.directional.length=S,r.spot.length=D,r.rectArea.length=y,r.point.length=A,r.hemi.length=M,r.directionalShadow.length=N,r.directionalShadowMap.length=N,r.pointShadow.length=z,r.pointShadowMap.length=z,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=N,r.pointShadowMatrix.length=z,r.spotLightMatrix.length=R+F-U,r.spotLightMap.length=F,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=P,b.directionalLength=S,b.pointLength=A,b.spotLength=D,b.rectAreaLength=y,b.hemiLength=M,b.numDirectionalShadows=N,b.numPointShadows=z,b.numSpotShadows=R,b.numSpotMaps=F,b.numLightProbes=P,r.version=LA++)}function m(d,x){let _=0,g=0,S=0,A=0,D=0;const y=x.matrixWorldInverse;for(let M=0,N=d.length;M<N;M++){const z=d[M];if(z.isDirectionalLight){const R=r.directional[_];R.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(y),_++}else if(z.isSpotLight){const R=r.spot[S];R.position.setFromMatrixPosition(z.matrixWorld),R.position.applyMatrix4(y),R.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(y),S++}else if(z.isRectAreaLight){const R=r.rectArea[A];R.position.setFromMatrixPosition(z.matrixWorld),R.position.applyMatrix4(y),h.identity(),c.copy(z.matrixWorld),c.premultiply(y),h.extractRotation(c),R.halfWidth.set(z.width*.5,0,0),R.halfHeight.set(0,z.height*.5,0),R.halfWidth.applyMatrix4(h),R.halfHeight.applyMatrix4(h),A++}else if(z.isPointLight){const R=r.point[g];R.position.setFromMatrixPosition(z.matrixWorld),R.position.applyMatrix4(y),g++}else if(z.isHemisphereLight){const R=r.hemi[D];R.direction.setFromMatrixPosition(z.matrixWorld),R.direction.transformDirection(y),D++}}}return{setup:p,setupView:m,state:r}}function T_(s){const e=new OA(s),i=[],r=[],l=[];function c(g){_.camera=g,i.length=0,r.length=0,l.length=0}function h(g){i.push(g)}function p(g){r.push(g)}function m(g){l.push(g)}function d(){e.setup(i)}function x(g){e.setupView(i,g)}const _={lightsArray:i,shadowsArray:r,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:x,pushLight:h,pushShadow:p,pushLightProbeGrid:m}}function PA(s){let e=new WeakMap;function i(l,c=0){const h=e.get(l);let p;return h===void 0?(p=new T_(s),e.set(l,[p])):c>=h.length?(p=new T_(s),h.push(p)):p=h[c],p}function r(){e=new WeakMap}return{get:i,dispose:r}}const IA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,zA=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],BA=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],R_=new on,al=new j,pd=new j;function HA(s,e,i){let r=new E0;const l=new nt,c=new nt,h=new cn,p=new ZS,m=new qS,d={},x=i.maxTextureSize,_={[dr]:$n,[$n]:dr,[ba]:ba},g=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:IA,fragmentShader:FA}),S=g.clone();S.defines.HORIZONTAL_PASS=1;const A=new Pn;A.setAttribute("position",new Ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new Ut(A,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=au;let M=this.type;this.render=function(U,P,b){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||U.length===0)return;this.type===k_&&(ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=au);const L=s.getRenderTarget(),H=s.getActiveCubeFace(),k=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Ta),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ce=M!==this.type;ce&&P.traverse(function(ue){ue.material&&(Array.isArray(ue.material)?ue.material.forEach(K=>K.needsUpdate=!0):ue.material.needsUpdate=!0)});for(let ue=0,K=U.length;ue<K;ue++){const B=U[ue],V=B.shadow;if(V===void 0){ut("WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;l.copy(V.mapSize);const ee=V.getFrameExtents();l.multiply(ee),c.copy(V.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/ee.x),l.x=c.x*ee.x,V.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/ee.y),l.y=c.y*ee.y,V.mapSize.y=c.y));const _e=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=_e,V.map===null||ce===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===rl){if(B.isPointLight){ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new ji(l.x,l.y,{format:qr,type:Ca,minFilter:Hn,magFilter:Hn,generateMipmaps:!1}),V.map.texture.name=B.name+".shadowMap",V.map.depthTexture=new Js(l.x,l.y,qi),V.map.depthTexture.name=B.name+".shadowMapDepth",V.map.depthTexture.format=Da,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=On,V.map.depthTexture.magFilter=On}else B.isPointLight?(V.map=new Ev(l.x),V.map.depthTexture=new HS(l.x,Ji)):(V.map=new ji(l.x,l.y),V.map.depthTexture=new Js(l.x,l.y,Ji)),V.map.depthTexture.name=B.name+".shadowMap",V.map.depthTexture.format=Da,this.type===au?(V.map.depthTexture.compareFunction=_e?v0:_0,V.map.depthTexture.minFilter=Hn,V.map.depthTexture.magFilter=Hn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=On,V.map.depthTexture.magFilter=On);V.camera.updateProjectionMatrix()}const Ee=V.map.isWebGLCubeRenderTarget?6:1;for(let O=0;O<Ee;O++){if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,O),s.clear();else{O===0&&(s.setRenderTarget(V.map),s.clear());const Q=V.getViewport(O);h.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),W.viewport(h)}if(B.isPointLight){const Q=V.camera,Se=V.matrix,Te=B.distance||Q.far;Te!==Q.far&&(Q.far=Te,Q.updateProjectionMatrix()),al.setFromMatrixPosition(B.matrixWorld),Q.position.copy(al),pd.copy(Q.position),pd.add(zA[O]),Q.up.copy(BA[O]),Q.lookAt(pd),Q.updateMatrixWorld(),Se.makeTranslation(-al.x,-al.y,-al.z),R_.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),V._frustum.setFromProjectionMatrix(R_,Q.coordinateSystem,Q.reversedDepth)}else V.updateMatrices(B);r=V.getFrustum(),R(P,b,V.camera,B,this.type)}V.isPointLightShadow!==!0&&this.type===rl&&N(V,b),V.needsUpdate=!1}M=this.type,y.needsUpdate=!1,s.setRenderTarget(L,H,k)};function N(U,P){const b=e.update(D);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,S.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,S.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new ji(l.x,l.y,{format:qr,type:Ca})),g.uniforms.shadow_pass.value=U.map.depthTexture,g.uniforms.resolution.value=U.mapSize,g.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(P,null,b,g,D,null),S.uniforms.shadow_pass.value=U.mapPass.texture,S.uniforms.resolution.value=U.mapSize,S.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(P,null,b,S,D,null)}function z(U,P,b,L){let H=null;const k=b.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(k!==void 0)H=k;else if(H=b.isPointLight===!0?m:p,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const W=H.uuid,ce=P.uuid;let ue=d[W];ue===void 0&&(ue={},d[W]=ue);let K=ue[ce];K===void 0&&(K=H.clone(),ue[ce]=K,P.addEventListener("dispose",F)),H=K}if(H.visible=P.visible,H.wireframe=P.wireframe,L===rl?H.side=P.shadowSide!==null?P.shadowSide:P.side:H.side=P.shadowSide!==null?P.shadowSide:_[P.side],H.alphaMap=P.alphaMap,H.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,H.map=P.map,H.clipShadows=P.clipShadows,H.clippingPlanes=P.clippingPlanes,H.clipIntersection=P.clipIntersection,H.displacementMap=P.displacementMap,H.displacementScale=P.displacementScale,H.displacementBias=P.displacementBias,H.wireframeLinewidth=P.wireframeLinewidth,H.linewidth=P.linewidth,b.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const W=s.properties.get(H);W.light=b}return H}function R(U,P,b,L,H){if(U.visible===!1)return;if(U.layers.test(P.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&H===rl)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,U.matrixWorld);const ce=e.update(U),ue=U.material;if(Array.isArray(ue)){const K=ce.groups;for(let B=0,V=K.length;B<V;B++){const ee=K[B],_e=ue[ee.materialIndex];if(_e&&_e.visible){const Ee=z(U,_e,L,H);U.onBeforeShadow(s,U,P,b,ce,Ee,ee),s.renderBufferDirect(b,null,ce,Ee,U,ee),U.onAfterShadow(s,U,P,b,ce,Ee,ee)}}}else if(ue.visible){const K=z(U,ue,L,H);U.onBeforeShadow(s,U,P,b,ce,K,null),s.renderBufferDirect(b,null,ce,K,U,null),U.onAfterShadow(s,U,P,b,ce,K,null)}}const W=U.children;for(let ce=0,ue=W.length;ce<ue;ce++)R(W[ce],P,b,L,H)}function F(U){U.target.removeEventListener("dispose",F);for(const b in d){const L=d[b],H=U.target.uuid;H in L&&(L[H].dispose(),delete L[H])}}}function VA(s,e){function i(){let Z=!1;const Ce=new cn;let xe=null;const Ne=new cn(0,0,0,0);return{setMask:function(Ge){xe!==Ge&&!Z&&(s.colorMask(Ge,Ge,Ge,Ge),xe=Ge)},setLocked:function(Ge){Z=Ge},setClear:function(Ge,Ae,Je,qe,nn){nn===!0&&(Ge*=qe,Ae*=qe,Je*=qe),Ce.set(Ge,Ae,Je,qe),Ne.equals(Ce)===!1&&(s.clearColor(Ge,Ae,Je,qe),Ne.copy(Ce))},reset:function(){Z=!1,xe=null,Ne.set(-1,0,0,0)}}}function r(){let Z=!1,Ce=!1,xe=null,Ne=null,Ge=null;return{setReversed:function(Ae){if(Ce!==Ae){const Je=e.get("EXT_clip_control");Ae?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT),Ce=Ae;const qe=Ge;Ge=null,this.setClear(qe)}},getReversed:function(){return Ce},setTest:function(Ae){Ae?he(s.DEPTH_TEST):Le(s.DEPTH_TEST)},setMask:function(Ae){xe!==Ae&&!Z&&(s.depthMask(Ae),xe=Ae)},setFunc:function(Ae){if(Ce&&(Ae=JM[Ae]),Ne!==Ae){switch(Ae){case xd:s.depthFunc(s.NEVER);break;case Md:s.depthFunc(s.ALWAYS);break;case Sd:s.depthFunc(s.LESS);break;case Qs:s.depthFunc(s.LEQUAL);break;case yd:s.depthFunc(s.EQUAL);break;case Ed:s.depthFunc(s.GEQUAL);break;case bd:s.depthFunc(s.GREATER);break;case Ad:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ne=Ae}},setLocked:function(Ae){Z=Ae},setClear:function(Ae){Ge!==Ae&&(Ge=Ae,Ce&&(Ae=1-Ae),s.clearDepth(Ae))},reset:function(){Z=!1,xe=null,Ne=null,Ge=null,Ce=!1}}}function l(){let Z=!1,Ce=null,xe=null,Ne=null,Ge=null,Ae=null,Je=null,qe=null,nn=null;return{setTest:function(Ht){Z||(Ht?he(s.STENCIL_TEST):Le(s.STENCIL_TEST))},setMask:function(Ht){Ce!==Ht&&!Z&&(s.stencilMask(Ht),Ce=Ht)},setFunc:function(Ht,ei,ti){(xe!==Ht||Ne!==ei||Ge!==ti)&&(s.stencilFunc(Ht,ei,ti),xe=Ht,Ne=ei,Ge=ti)},setOp:function(Ht,ei,ti){(Ae!==Ht||Je!==ei||qe!==ti)&&(s.stencilOp(Ht,ei,ti),Ae=Ht,Je=ei,qe=ti)},setLocked:function(Ht){Z=Ht},setClear:function(Ht){nn!==Ht&&(s.clearStencil(Ht),nn=Ht)},reset:function(){Z=!1,Ce=null,xe=null,Ne=null,Ge=null,Ae=null,Je=null,qe=null,nn=null}}}const c=new i,h=new r,p=new l,m=new WeakMap,d=new WeakMap;let x={},_={},g={},S=new WeakMap,A=[],D=null,y=!1,M=null,N=null,z=null,R=null,F=null,U=null,P=null,b=new At(0,0,0),L=0,H=!1,k=null,W=null,ce=null,ue=null,K=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ee=0;const _e=s.getParameter(s.VERSION);_e.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(_e)[1]),V=ee>=1):_e.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),V=ee>=2);let Ee=null,O={};const Q=s.getParameter(s.SCISSOR_BOX),Se=s.getParameter(s.VIEWPORT),Te=new cn().fromArray(Q),Re=new cn().fromArray(Se);function te(Z,Ce,xe,Ne){const Ge=new Uint8Array(4),Ae=s.createTexture();s.bindTexture(Z,Ae),s.texParameteri(Z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(Z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Je=0;Je<xe;Je++)Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,Ne,0,s.RGBA,s.UNSIGNED_BYTE,Ge):s.texImage2D(Ce+Je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ge);return Ae}const fe={};fe[s.TEXTURE_2D]=te(s.TEXTURE_2D,s.TEXTURE_2D,1),fe[s.TEXTURE_CUBE_MAP]=te(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[s.TEXTURE_2D_ARRAY]=te(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),fe[s.TEXTURE_3D]=te(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),p.setClear(0),he(s.DEPTH_TEST),h.setFunc(Qs),Lt(!1),We(A1),he(s.CULL_FACE),mt(Ta);function he(Z){x[Z]!==!0&&(s.enable(Z),x[Z]=!0)}function Le(Z){x[Z]!==!1&&(s.disable(Z),x[Z]=!1)}function et(Z,Ce){return g[Z]!==Ce?(s.bindFramebuffer(Z,Ce),g[Z]=Ce,Z===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=Ce),Z===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Pe(Z,Ce){let xe=A,Ne=!1;if(Z){xe=S.get(Ce),xe===void 0&&(xe=[],S.set(Ce,xe));const Ge=Z.textures;if(xe.length!==Ge.length||xe[0]!==s.COLOR_ATTACHMENT0){for(let Ae=0,Je=Ge.length;Ae<Je;Ae++)xe[Ae]=s.COLOR_ATTACHMENT0+Ae;xe.length=Ge.length,Ne=!0}}else xe[0]!==s.BACK&&(xe[0]=s.BACK,Ne=!0);Ne&&s.drawBuffers(xe)}function De(Z){return D!==Z?(s.useProgram(Z),D=Z,!0):!1}const He={[Vr]:s.FUNC_ADD,[SM]:s.FUNC_SUBTRACT,[yM]:s.FUNC_REVERSE_SUBTRACT};He[EM]=s.MIN,He[bM]=s.MAX;const je={[AM]:s.ZERO,[TM]:s.ONE,[RM]:s.SRC_COLOR,[_d]:s.SRC_ALPHA,[NM]:s.SRC_ALPHA_SATURATE,[UM]:s.DST_COLOR,[CM]:s.DST_ALPHA,[wM]:s.ONE_MINUS_SRC_COLOR,[vd]:s.ONE_MINUS_SRC_ALPHA,[LM]:s.ONE_MINUS_DST_COLOR,[DM]:s.ONE_MINUS_DST_ALPHA,[OM]:s.CONSTANT_COLOR,[PM]:s.ONE_MINUS_CONSTANT_COLOR,[IM]:s.CONSTANT_ALPHA,[FM]:s.ONE_MINUS_CONSTANT_ALPHA};function mt(Z,Ce,xe,Ne,Ge,Ae,Je,qe,nn,Ht){if(Z===Ta){y===!0&&(Le(s.BLEND),y=!1);return}if(y===!1&&(he(s.BLEND),y=!0),Z!==MM){if(Z!==M||Ht!==H){if((N!==Vr||F!==Vr)&&(s.blendEquation(s.FUNC_ADD),N=Vr,F=Vr),Ht)switch(Z){case qs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gd:s.blendFunc(s.ONE,s.ONE);break;case T1:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case R1:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Dt("WebGLState: Invalid blending: ",Z);break}else switch(Z){case qs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gd:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case T1:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case R1:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",Z);break}z=null,R=null,U=null,P=null,b.set(0,0,0),L=0,M=Z,H=Ht}return}Ge=Ge||Ce,Ae=Ae||xe,Je=Je||Ne,(Ce!==N||Ge!==F)&&(s.blendEquationSeparate(He[Ce],He[Ge]),N=Ce,F=Ge),(xe!==z||Ne!==R||Ae!==U||Je!==P)&&(s.blendFuncSeparate(je[xe],je[Ne],je[Ae],je[Je]),z=xe,R=Ne,U=Ae,P=Je),(qe.equals(b)===!1||nn!==L)&&(s.blendColor(qe.r,qe.g,qe.b,nn),b.copy(qe),L=nn),M=Z,H=!1}function ot(Z,Ce){Z.side===ba?Le(s.CULL_FACE):he(s.CULL_FACE);let xe=Z.side===$n;Ce&&(xe=!xe),Lt(xe),Z.blending===qs&&Z.transparent===!1?mt(Ta):mt(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),h.setFunc(Z.depthFunc),h.setTest(Z.depthTest),h.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const Ne=Z.stencilWrite;p.setTest(Ne),Ne&&(p.setMask(Z.stencilWriteMask),p.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),p.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Mt(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?he(s.SAMPLE_ALPHA_TO_COVERAGE):Le(s.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(Z){k!==Z&&(Z?s.frontFace(s.CW):s.frontFace(s.CCW),k=Z)}function We(Z){Z!==vM?(he(s.CULL_FACE),Z!==W&&(Z===A1?s.cullFace(s.BACK):Z===xM?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Le(s.CULL_FACE),W=Z}function ft(Z){Z!==ce&&(V&&s.lineWidth(Z),ce=Z)}function Mt(Z,Ce,xe){Z?(he(s.POLYGON_OFFSET_FILL),(ue!==Ce||K!==xe)&&(ue=Ce,K=xe,h.getReversed()&&(Ce=-Ce),s.polygonOffset(Ce,xe))):Le(s.POLYGON_OFFSET_FILL)}function zt(Z){Z?he(s.SCISSOR_TEST):Le(s.SCISSOR_TEST)}function $t(Z){Z===void 0&&(Z=s.TEXTURE0+B-1),Ee!==Z&&(s.activeTexture(Z),Ee=Z)}function q(Z,Ce,xe){xe===void 0&&(Ee===null?xe=s.TEXTURE0+B-1:xe=Ee);let Ne=O[xe];Ne===void 0&&(Ne={type:void 0,texture:void 0},O[xe]=Ne),(Ne.type!==Z||Ne.texture!==Ce)&&(Ee!==xe&&(s.activeTexture(xe),Ee=xe),s.bindTexture(Z,Ce||fe[Z]),Ne.type=Z,Ne.texture=Ce)}function It(){const Z=O[Ee];Z!==void 0&&Z.type!==void 0&&(s.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function ct(){try{s.compressedTexImage2D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function I(){try{s.compressedTexImage3D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function E(){try{s.texSubImage2D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function $(){try{s.texSubImage3D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function se(){try{s.compressedTexSubImage2D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function me(){try{s.compressedTexSubImage3D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function we(){try{s.texStorage2D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function Oe(){try{s.texStorage3D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function pe(){try{s.texImage2D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function ge(){try{s.texImage3D(...arguments)}catch(Z){Dt("WebGLState:",Z)}}function Ue(Z){return _[Z]!==void 0?_[Z]:s.getParameter(Z)}function ke(Z,Ce){_[Z]!==Ce&&(s.pixelStorei(Z,Ce),_[Z]=Ce)}function ze(Z){Te.equals(Z)===!1&&(s.scissor(Z.x,Z.y,Z.z,Z.w),Te.copy(Z))}function Ie(Z){Re.equals(Z)===!1&&(s.viewport(Z.x,Z.y,Z.z,Z.w),Re.copy(Z))}function it(Z,Ce){let xe=d.get(Ce);xe===void 0&&(xe=new WeakMap,d.set(Ce,xe));let Ne=xe.get(Z);Ne===void 0&&(Ne=s.getUniformBlockIndex(Ce,Z.name),xe.set(Z,Ne))}function at(Z,Ce){const Ne=d.get(Ce).get(Z);m.get(Ce)!==Ne&&(s.uniformBlockBinding(Ce,Ne,Z.__bindingPointIndex),m.set(Ce,Ne))}function ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),x={},_={},Ee=null,O={},g={},S=new WeakMap,A=[],D=null,y=!1,M=null,N=null,z=null,R=null,F=null,U=null,P=null,b=new At(0,0,0),L=0,H=!1,k=null,W=null,ce=null,ue=null,K=null,Te.set(0,0,s.canvas.width,s.canvas.height),Re.set(0,0,s.canvas.width,s.canvas.height),c.reset(),h.reset(),p.reset()}return{buffers:{color:c,depth:h,stencil:p},enable:he,disable:Le,bindFramebuffer:et,drawBuffers:Pe,useProgram:De,setBlending:mt,setMaterial:ot,setFlipSided:Lt,setCullFace:We,setLineWidth:ft,setPolygonOffset:Mt,setScissorTest:zt,activeTexture:$t,bindTexture:q,unbindTexture:It,compressedTexImage2D:ct,compressedTexImage3D:I,texImage2D:pe,texImage3D:ge,pixelStorei:ke,getParameter:Ue,updateUBOMapping:it,uniformBlockBinding:at,texStorage2D:we,texStorage3D:Oe,texSubImage2D:E,texSubImage3D:$,compressedTexSubImage2D:se,compressedTexSubImage3D:me,scissor:ze,viewport:Ie,reset:ht}}function GA(s,e,i,r,l,c,h){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new nt,x=new WeakMap,_=new Set;let g;const S=new WeakMap;let A=!1;try{A=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(I,E){return A?new OffscreenCanvas(I,E):hl("canvas")}function y(I,E,$){let se=1;const me=ct(I);if((me.width>$||me.height>$)&&(se=$/Math.max(me.width,me.height)),se<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const we=Math.floor(se*me.width),Oe=Math.floor(se*me.height);g===void 0&&(g=D(we,Oe));const pe=E?D(we,Oe):g;return pe.width=we,pe.height=Oe,pe.getContext("2d").drawImage(I,0,0,we,Oe),ut("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+we+"x"+Oe+")."),pe}else return"data"in I&&ut("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),I;return I}function M(I){return I.generateMipmaps}function N(I){s.generateMipmap(I)}function z(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function R(I,E,$,se,me,we=!1){if(I!==null){if(s[I]!==void 0)return s[I];ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Oe;se&&(Oe=e.get("EXT_texture_norm16"),Oe||ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pe=E;if(E===s.RED&&($===s.FLOAT&&(pe=s.R32F),$===s.HALF_FLOAT&&(pe=s.R16F),$===s.UNSIGNED_BYTE&&(pe=s.R8),$===s.UNSIGNED_SHORT&&Oe&&(pe=Oe.R16_EXT),$===s.SHORT&&Oe&&(pe=Oe.R16_SNORM_EXT)),E===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(pe=s.R8UI),$===s.UNSIGNED_SHORT&&(pe=s.R16UI),$===s.UNSIGNED_INT&&(pe=s.R32UI),$===s.BYTE&&(pe=s.R8I),$===s.SHORT&&(pe=s.R16I),$===s.INT&&(pe=s.R32I)),E===s.RG&&($===s.FLOAT&&(pe=s.RG32F),$===s.HALF_FLOAT&&(pe=s.RG16F),$===s.UNSIGNED_BYTE&&(pe=s.RG8),$===s.UNSIGNED_SHORT&&Oe&&(pe=Oe.RG16_EXT),$===s.SHORT&&Oe&&(pe=Oe.RG16_SNORM_EXT)),E===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(pe=s.RG8UI),$===s.UNSIGNED_SHORT&&(pe=s.RG16UI),$===s.UNSIGNED_INT&&(pe=s.RG32UI),$===s.BYTE&&(pe=s.RG8I),$===s.SHORT&&(pe=s.RG16I),$===s.INT&&(pe=s.RG32I)),E===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(pe=s.RGB8UI),$===s.UNSIGNED_SHORT&&(pe=s.RGB16UI),$===s.UNSIGNED_INT&&(pe=s.RGB32UI),$===s.BYTE&&(pe=s.RGB8I),$===s.SHORT&&(pe=s.RGB16I),$===s.INT&&(pe=s.RGB32I)),E===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(pe=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(pe=s.RGBA16UI),$===s.UNSIGNED_INT&&(pe=s.RGBA32UI),$===s.BYTE&&(pe=s.RGBA8I),$===s.SHORT&&(pe=s.RGBA16I),$===s.INT&&(pe=s.RGBA32I)),E===s.RGB&&($===s.UNSIGNED_SHORT&&Oe&&(pe=Oe.RGB16_EXT),$===s.SHORT&&Oe&&(pe=Oe.RGB16_SNORM_EXT),$===s.UNSIGNED_INT_5_9_9_9_REV&&(pe=s.RGB9_E5),$===s.UNSIGNED_INT_10F_11F_11F_REV&&(pe=s.R11F_G11F_B10F)),E===s.RGBA){const ge=we?pu:Ct.getTransfer(me);$===s.FLOAT&&(pe=s.RGBA32F),$===s.HALF_FLOAT&&(pe=s.RGBA16F),$===s.UNSIGNED_BYTE&&(pe=ge===Zt?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT&&Oe&&(pe=Oe.RGBA16_EXT),$===s.SHORT&&Oe&&(pe=Oe.RGBA16_SNORM_EXT),$===s.UNSIGNED_SHORT_4_4_4_4&&(pe=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(pe=s.RGB5_A1)}return(pe===s.R16F||pe===s.R32F||pe===s.RG16F||pe===s.RG32F||pe===s.RGBA16F||pe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function F(I,E){let $;return I?E===null||E===Ji||E===ul?$=s.DEPTH24_STENCIL8:E===qi?$=s.DEPTH32F_STENCIL8:E===cl&&($=s.DEPTH24_STENCIL8,ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ji||E===ul?$=s.DEPTH_COMPONENT24:E===qi?$=s.DEPTH_COMPONENT32F:E===cl&&($=s.DEPTH_COMPONENT16),$}function U(I,E){return M(I)===!0||I.isFramebufferTexture&&I.minFilter!==On&&I.minFilter!==Hn?Math.log2(Math.max(E.width,E.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?E.mipmaps.length:1}function P(I){const E=I.target;E.removeEventListener("dispose",P),L(E),E.isVideoTexture&&x.delete(E),E.isHTMLTexture&&_.delete(E)}function b(I){const E=I.target;E.removeEventListener("dispose",b),k(E)}function L(I){const E=r.get(I);if(E.__webglInit===void 0)return;const $=I.source,se=S.get($);if(se){const me=se[E.__cacheKey];me.usedTimes--,me.usedTimes===0&&H(I),Object.keys(se).length===0&&S.delete($)}r.remove(I)}function H(I){const E=r.get(I);s.deleteTexture(E.__webglTexture);const $=I.source,se=S.get($);delete se[E.__cacheKey],h.memory.textures--}function k(I){const E=r.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),r.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let me=0;me<E.__webglFramebuffer[se].length;me++)s.deleteFramebuffer(E.__webglFramebuffer[se][me]);else s.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)s.deleteFramebuffer(E.__webglFramebuffer[se]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const $=I.textures;for(let se=0,me=$.length;se<me;se++){const we=r.get($[se]);we.__webglTexture&&(s.deleteTexture(we.__webglTexture),h.memory.textures--),r.remove($[se])}r.remove(I)}let W=0;function ce(){W=0}function ue(){return W}function K(I){W=I}function B(){const I=W;return I>=l.maxTextures&&ut("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+l.maxTextures),W+=1,I}function V(I){const E=[];return E.push(I.wrapS),E.push(I.wrapT),E.push(I.wrapR||0),E.push(I.magFilter),E.push(I.minFilter),E.push(I.anisotropy),E.push(I.internalFormat),E.push(I.format),E.push(I.type),E.push(I.generateMipmaps),E.push(I.premultiplyAlpha),E.push(I.flipY),E.push(I.unpackAlignment),E.push(I.colorSpace),E.join()}function ee(I,E){const $=r.get(I);if(I.isVideoTexture&&q(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&$.__version!==I.version){const se=I.image;if(se===null)ut("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Le($,I,E);return}}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+E)}function _e(I,E){const $=r.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){Le($,I,E);return}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+E)}function Ee(I,E){const $=r.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){Le($,I,E);return}i.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+E)}function O(I,E){const $=r.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&$.__version!==I.version){et($,I,E);return}i.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+E)}const Q={[uu]:s.REPEAT,[Aa]:s.CLAMP_TO_EDGE,[Td]:s.MIRRORED_REPEAT},Se={[On]:s.NEAREST,[HM]:s.NEAREST_MIPMAP_NEAREST,[wc]:s.NEAREST_MIPMAP_LINEAR,[Hn]:s.LINEAR,[Fh]:s.LINEAR_MIPMAP_NEAREST,[kr]:s.LINEAR_MIPMAP_LINEAR},Te={[kM]:s.NEVER,[YM]:s.ALWAYS,[XM]:s.LESS,[_0]:s.LEQUAL,[WM]:s.EQUAL,[v0]:s.GEQUAL,[ZM]:s.GREATER,[qM]:s.NOTEQUAL};function Re(I,E){if(E.type===qi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Hn||E.magFilter===Fh||E.magFilter===wc||E.magFilter===kr||E.minFilter===Hn||E.minFilter===Fh||E.minFilter===wc||E.minFilter===kr)&&ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,Q[E.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,Q[E.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,Q[E.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,Se[E.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,Se[E.minFilter]),E.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,Te[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===On||E.minFilter!==wc&&E.minFilter!==kr||E.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function te(I,E){let $=!1;I.__webglInit===void 0&&(I.__webglInit=!0,E.addEventListener("dispose",P));const se=E.source;let me=S.get(se);me===void 0&&(me={},S.set(se,me));const we=V(E);if(we!==I.__cacheKey){me[we]===void 0&&(me[we]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,$=!0),me[we].usedTimes++;const Oe=me[I.__cacheKey];Oe!==void 0&&(me[I.__cacheKey].usedTimes--,Oe.usedTimes===0&&H(E)),I.__cacheKey=we,I.__webglTexture=me[we].texture}return $}function fe(I,E,$){return Math.floor(Math.floor(I/$)/E)}function he(I,E,$,se){const we=I.updateRanges;if(we.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,$,se,E.data);else{we.sort((ke,ze)=>ke.start-ze.start);let Oe=0;for(let ke=1;ke<we.length;ke++){const ze=we[Oe],Ie=we[ke],it=ze.start+ze.count,at=fe(Ie.start,E.width,4),ht=fe(ze.start,E.width,4);Ie.start<=it+1&&at===ht&&fe(Ie.start+Ie.count-1,E.width,4)===at?ze.count=Math.max(ze.count,Ie.start+Ie.count-ze.start):(++Oe,we[Oe]=Ie)}we.length=Oe+1;const pe=i.getParameter(s.UNPACK_ROW_LENGTH),ge=i.getParameter(s.UNPACK_SKIP_PIXELS),Ue=i.getParameter(s.UNPACK_SKIP_ROWS);i.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let ke=0,ze=we.length;ke<ze;ke++){const Ie=we[ke],it=Math.floor(Ie.start/4),at=Math.ceil(Ie.count/4),ht=it%E.width,Z=Math.floor(it/E.width),Ce=at,xe=1;i.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),i.pixelStorei(s.UNPACK_SKIP_ROWS,Z),i.texSubImage2D(s.TEXTURE_2D,0,ht,Z,Ce,xe,$,se,E.data)}I.clearUpdateRanges(),i.pixelStorei(s.UNPACK_ROW_LENGTH,pe),i.pixelStorei(s.UNPACK_SKIP_PIXELS,ge),i.pixelStorei(s.UNPACK_SKIP_ROWS,Ue)}}function Le(I,E,$){let se=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=s.TEXTURE_3D);const me=te(I,E),we=E.source;i.bindTexture(se,I.__webglTexture,s.TEXTURE0+$);const Oe=r.get(we);if(we.version!==Oe.__version||me===!0){if(i.activeTexture(s.TEXTURE0+$),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const xe=Ct.getPrimaries(Ct.workingColorSpace),Ne=E.colorSpace===ur?null:Ct.getPrimaries(E.colorSpace),Ge=E.colorSpace===ur||xe===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge)}i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let ge=y(E.image,!1,l.maxTextureSize);ge=It(E,ge);const Ue=c.convert(E.format,E.colorSpace),ke=c.convert(E.type);let ze=R(E.internalFormat,Ue,ke,E.normalized,E.colorSpace,E.isVideoTexture);Re(se,E);let Ie;const it=E.mipmaps,at=E.isVideoTexture!==!0,ht=Oe.__version===void 0||me===!0,Z=we.dataReady,Ce=U(E,ge);if(E.isDepthTexture)ze=F(E.format===Xr,E.type),ht&&(at?i.texStorage2D(s.TEXTURE_2D,1,ze,ge.width,ge.height):i.texImage2D(s.TEXTURE_2D,0,ze,ge.width,ge.height,0,Ue,ke,null));else if(E.isDataTexture)if(it.length>0){at&&ht&&i.texStorage2D(s.TEXTURE_2D,Ce,ze,it[0].width,it[0].height);for(let xe=0,Ne=it.length;xe<Ne;xe++)Ie=it[xe],at?Z&&i.texSubImage2D(s.TEXTURE_2D,xe,0,0,Ie.width,Ie.height,Ue,ke,Ie.data):i.texImage2D(s.TEXTURE_2D,xe,ze,Ie.width,Ie.height,0,Ue,ke,Ie.data);E.generateMipmaps=!1}else at?(ht&&i.texStorage2D(s.TEXTURE_2D,Ce,ze,ge.width,ge.height),Z&&he(E,ge,Ue,ke)):i.texImage2D(s.TEXTURE_2D,0,ze,ge.width,ge.height,0,Ue,ke,ge.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){at&&ht&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,ze,it[0].width,it[0].height,ge.depth);for(let xe=0,Ne=it.length;xe<Ne;xe++)if(Ie=it[xe],E.format!==Ii)if(Ue!==null)if(at){if(Z)if(E.layerUpdates.size>0){const Ge=a_(Ie.width,Ie.height,E.format,E.type);for(const Ae of E.layerUpdates){const Je=Ie.data.subarray(Ae*Ge/Ie.data.BYTES_PER_ELEMENT,(Ae+1)*Ge/Ie.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,Ae,Ie.width,Ie.height,1,Ue,Je)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,Ie.width,Ie.height,ge.depth,Ue,Ie.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,xe,ze,Ie.width,Ie.height,ge.depth,0,Ie.data,0,0);else ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?Z&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,Ie.width,Ie.height,ge.depth,Ue,ke,Ie.data):i.texImage3D(s.TEXTURE_2D_ARRAY,xe,ze,Ie.width,Ie.height,ge.depth,0,Ue,ke,Ie.data)}else{at&&ht&&i.texStorage2D(s.TEXTURE_2D,Ce,ze,it[0].width,it[0].height);for(let xe=0,Ne=it.length;xe<Ne;xe++)Ie=it[xe],E.format!==Ii?Ue!==null?at?Z&&i.compressedTexSubImage2D(s.TEXTURE_2D,xe,0,0,Ie.width,Ie.height,Ue,Ie.data):i.compressedTexImage2D(s.TEXTURE_2D,xe,ze,Ie.width,Ie.height,0,Ie.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?Z&&i.texSubImage2D(s.TEXTURE_2D,xe,0,0,Ie.width,Ie.height,Ue,ke,Ie.data):i.texImage2D(s.TEXTURE_2D,xe,ze,Ie.width,Ie.height,0,Ue,ke,Ie.data)}else if(E.isDataArrayTexture)if(at){if(ht&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,ze,ge.width,ge.height,ge.depth),Z)if(E.layerUpdates.size>0){const xe=a_(ge.width,ge.height,E.format,E.type);for(const Ne of E.layerUpdates){const Ge=ge.data.subarray(Ne*xe/ge.data.BYTES_PER_ELEMENT,(Ne+1)*xe/ge.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ne,ge.width,ge.height,1,Ue,ke,Ge)}E.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Ue,ke,ge.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,ze,ge.width,ge.height,ge.depth,0,Ue,ke,ge.data);else if(E.isData3DTexture)at?(ht&&i.texStorage3D(s.TEXTURE_3D,Ce,ze,ge.width,ge.height,ge.depth),Z&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Ue,ke,ge.data)):i.texImage3D(s.TEXTURE_3D,0,ze,ge.width,ge.height,ge.depth,0,Ue,ke,ge.data);else if(E.isFramebufferTexture){if(ht)if(at)i.texStorage2D(s.TEXTURE_2D,Ce,ze,ge.width,ge.height);else{let xe=ge.width,Ne=ge.height;for(let Ge=0;Ge<Ce;Ge++)i.texImage2D(s.TEXTURE_2D,Ge,ze,xe,Ne,0,Ue,ke,null),xe>>=1,Ne>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const xe=s.canvas;if(xe.hasAttribute("layoutsubtree")||xe.setAttribute("layoutsubtree","true"),ge.parentNode!==xe){xe.appendChild(ge),_.add(E),xe.onpaint=Ne=>{const Ge=Ne.changedElements;for(const Ae of _)Ge.includes(Ae.image)&&(Ae.needsUpdate=!0)},xe.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ge);else{const Ge=s.RGBA,Ae=s.RGBA,Je=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ge,Ae,Je,ge)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(it.length>0){if(at&&ht){const xe=ct(it[0]);i.texStorage2D(s.TEXTURE_2D,Ce,ze,xe.width,xe.height)}for(let xe=0,Ne=it.length;xe<Ne;xe++)Ie=it[xe],at?Z&&i.texSubImage2D(s.TEXTURE_2D,xe,0,0,Ue,ke,Ie):i.texImage2D(s.TEXTURE_2D,xe,ze,Ue,ke,Ie);E.generateMipmaps=!1}else if(at){if(ht){const xe=ct(ge);i.texStorage2D(s.TEXTURE_2D,Ce,ze,xe.width,xe.height)}Z&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Ue,ke,ge)}else i.texImage2D(s.TEXTURE_2D,0,ze,Ue,ke,ge);M(E)&&N(se),Oe.__version=we.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function et(I,E,$){if(E.image.length!==6)return;const se=te(I,E),me=E.source;i.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+$);const we=r.get(me);if(me.version!==we.__version||se===!0){i.activeTexture(s.TEXTURE0+$);const Oe=Ct.getPrimaries(Ct.workingColorSpace),pe=E.colorSpace===ur?null:Ct.getPrimaries(E.colorSpace),ge=E.colorSpace===ur||Oe===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ue=E.isCompressedTexture||E.image[0].isCompressedTexture,ke=E.image[0]&&E.image[0].isDataTexture,ze=[];for(let Ae=0;Ae<6;Ae++)!Ue&&!ke?ze[Ae]=y(E.image[Ae],!0,l.maxCubemapSize):ze[Ae]=ke?E.image[Ae].image:E.image[Ae],ze[Ae]=It(E,ze[Ae]);const Ie=ze[0],it=c.convert(E.format,E.colorSpace),at=c.convert(E.type),ht=R(E.internalFormat,it,at,E.normalized,E.colorSpace),Z=E.isVideoTexture!==!0,Ce=we.__version===void 0||se===!0,xe=me.dataReady;let Ne=U(E,Ie);Re(s.TEXTURE_CUBE_MAP,E);let Ge;if(Ue){Z&&Ce&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,ht,Ie.width,Ie.height);for(let Ae=0;Ae<6;Ae++){Ge=ze[Ae].mipmaps;for(let Je=0;Je<Ge.length;Je++){const qe=Ge[Je];E.format!==Ii?it!==null?Z?xe&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je,0,0,qe.width,qe.height,it,qe.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je,ht,qe.width,qe.height,0,qe.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?xe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je,0,0,qe.width,qe.height,it,at,qe.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je,ht,qe.width,qe.height,0,it,at,qe.data)}}}else{if(Ge=E.mipmaps,Z&&Ce){Ge.length>0&&Ne++;const Ae=ct(ze[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,ht,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(ke){Z?xe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,ze[Ae].width,ze[Ae].height,it,at,ze[Ae].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,ht,ze[Ae].width,ze[Ae].height,0,it,at,ze[Ae].data);for(let Je=0;Je<Ge.length;Je++){const nn=Ge[Je].image[Ae].image;Z?xe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je+1,0,0,nn.width,nn.height,it,at,nn.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je+1,ht,nn.width,nn.height,0,it,at,nn.data)}}else{Z?xe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,it,at,ze[Ae]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,ht,it,at,ze[Ae]);for(let Je=0;Je<Ge.length;Je++){const qe=Ge[Je];Z?xe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je+1,0,0,it,at,qe.image[Ae]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Je+1,ht,it,at,qe.image[Ae])}}}M(E)&&N(s.TEXTURE_CUBE_MAP),we.__version=me.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function Pe(I,E,$,se,me,we){const Oe=c.convert($.format,$.colorSpace),pe=c.convert($.type),ge=R($.internalFormat,Oe,pe,$.normalized,$.colorSpace),Ue=r.get(E),ke=r.get($);if(ke.__renderTarget=E,!Ue.__hasExternalTextures){const ze=Math.max(1,E.width>>we),Ie=Math.max(1,E.height>>we);me===s.TEXTURE_3D||me===s.TEXTURE_2D_ARRAY?i.texImage3D(me,we,ge,ze,Ie,E.depth,0,Oe,pe,null):i.texImage2D(me,we,ge,ze,Ie,0,Oe,pe,null)}i.bindFramebuffer(s.FRAMEBUFFER,I),$t(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,me,ke.__webglTexture,0,zt(E)):(me===s.TEXTURE_2D||me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,me,ke.__webglTexture,we),i.bindFramebuffer(s.FRAMEBUFFER,null)}function De(I,E,$){if(s.bindRenderbuffer(s.RENDERBUFFER,I),E.depthBuffer){const se=E.depthTexture,me=se&&se.isDepthTexture?se.type:null,we=F(E.stencilBuffer,me),Oe=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;$t(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,zt(E),we,E.width,E.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,zt(E),we,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,we,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Oe,s.RENDERBUFFER,I)}else{const se=E.textures;for(let me=0;me<se.length;me++){const we=se[me],Oe=c.convert(we.format,we.colorSpace),pe=c.convert(we.type),ge=R(we.internalFormat,Oe,pe,we.normalized,we.colorSpace);$t(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,zt(E),ge,E.width,E.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,zt(E),ge,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,ge,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function He(I,E,$){const se=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,I),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const me=r.get(E.depthTexture);if(me.__renderTarget=E,(!me.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),se){if(me.__webglInit===void 0&&(me.__webglInit=!0,E.depthTexture.addEventListener("dispose",P)),me.__webglTexture===void 0){me.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,me.__webglTexture),Re(s.TEXTURE_CUBE_MAP,E.depthTexture);const Ue=c.convert(E.depthTexture.format),ke=c.convert(E.depthTexture.type);let ze;E.depthTexture.format===Da?ze=s.DEPTH_COMPONENT24:E.depthTexture.format===Xr&&(ze=s.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,ze,E.width,E.height,0,Ue,ke,null)}}else ee(E.depthTexture,0);const we=me.__webglTexture,Oe=zt(E),pe=se?s.TEXTURE_CUBE_MAP_POSITIVE_X+$:s.TEXTURE_2D,ge=E.depthTexture.format===Xr?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===Da)$t(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,pe,we,0,Oe):s.framebufferTexture2D(s.FRAMEBUFFER,ge,pe,we,0);else if(E.depthTexture.format===Xr)$t(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,pe,we,0,Oe):s.framebufferTexture2D(s.FRAMEBUFFER,ge,pe,we,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(I){const E=r.get(I),$=I.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==I.depthTexture){const se=I.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),se){const me=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,se.removeEventListener("dispose",me)};se.addEventListener("dispose",me),E.__depthDisposeCallback=me}E.__boundDepthTexture=se}if(I.depthTexture&&!E.__autoAllocateDepthBuffer)if($)for(let se=0;se<6;se++)He(E.__webglFramebuffer[se],I,se);else{const se=I.texture.mipmaps;se&&se.length>0?He(E.__webglFramebuffer[0],I,0):He(E.__webglFramebuffer,I,0)}else if($){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]===void 0)E.__webglDepthbuffer[se]=s.createRenderbuffer(),De(E.__webglDepthbuffer[se],I,!1);else{const me=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=E.__webglDepthbuffer[se];s.bindRenderbuffer(s.RENDERBUFFER,we),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,we)}}else{const se=I.texture.mipmaps;if(se&&se.length>0?i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),De(E.__webglDepthbuffer,I,!1);else{const me=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,we),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,we)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function mt(I,E,$){const se=r.get(I);E!==void 0&&Pe(se.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&je(I)}function ot(I){const E=I.texture,$=r.get(I),se=r.get(E);I.addEventListener("dispose",b);const me=I.textures,we=I.isWebGLCubeRenderTarget===!0,Oe=me.length>1;if(Oe||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=E.version,h.memory.textures++),we){$.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[pe]=[];for(let ge=0;ge<E.mipmaps.length;ge++)$.__webglFramebuffer[pe][ge]=s.createFramebuffer()}else $.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let pe=0;pe<E.mipmaps.length;pe++)$.__webglFramebuffer[pe]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(Oe)for(let pe=0,ge=me.length;pe<ge;pe++){const Ue=r.get(me[pe]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=s.createTexture(),h.memory.textures++)}if(I.samples>0&&$t(I)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let pe=0;pe<me.length;pe++){const ge=me[pe];$.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[pe]);const Ue=c.convert(ge.format,ge.colorSpace),ke=c.convert(ge.type),ze=R(ge.internalFormat,Ue,ke,ge.normalized,ge.colorSpace,I.isXRRenderTarget===!0),Ie=zt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,ze,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,$.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),De($.__webglDepthRenderbuffer,I,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(we){i.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),Re(s.TEXTURE_CUBE_MAP,E);for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)Pe($.__webglFramebuffer[pe][ge],I,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ge);else Pe($.__webglFramebuffer[pe],I,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);M(E)&&N(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Oe){for(let pe=0,ge=me.length;pe<ge;pe++){const Ue=me[pe],ke=r.get(Ue);let ze=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ze=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(ze,ke.__webglTexture),Re(ze,Ue),Pe($.__webglFramebuffer,I,Ue,s.COLOR_ATTACHMENT0+pe,ze,0),M(Ue)&&N(ze)}i.unbindTexture()}else{let pe=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pe=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(pe,se.__webglTexture),Re(pe,E),E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)Pe($.__webglFramebuffer[ge],I,E,s.COLOR_ATTACHMENT0,pe,ge);else Pe($.__webglFramebuffer,I,E,s.COLOR_ATTACHMENT0,pe,0);M(E)&&N(pe),i.unbindTexture()}I.depthBuffer&&je(I)}function Lt(I){const E=I.textures;for(let $=0,se=E.length;$<se;$++){const me=E[$];if(M(me)){const we=z(I),Oe=r.get(me).__webglTexture;i.bindTexture(we,Oe),N(we),i.unbindTexture()}}}const We=[],ft=[];function Mt(I){if(I.samples>0){if($t(I)===!1){const E=I.textures,$=I.width,se=I.height;let me=s.COLOR_BUFFER_BIT;const we=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Oe=r.get(I),pe=E.length>1;if(pe)for(let Ue=0;Ue<E.length;Ue++)i.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);const ge=I.texture.mipmaps;ge&&ge.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Ue=0;Ue<E.length;Ue++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(me|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(me|=s.STENCIL_BUFFER_BIT)),pe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[Ue]);const ke=r.get(E[Ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ke,0)}s.blitFramebuffer(0,0,$,se,0,0,$,se,me,s.NEAREST),m===!0&&(We.length=0,ft.length=0,We.push(s.COLOR_ATTACHMENT0+Ue),I.depthBuffer&&I.resolveDepthBuffer===!1&&(We.push(we),ft.push(we),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ft)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,We))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pe)for(let Ue=0;Ue<E.length;Ue++){i.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[Ue]);const ke=r.get(E[Ue]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,ke,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&m){const E=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function zt(I){return Math.min(l.maxSamples,I.samples)}function $t(I){const E=r.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function q(I){const E=h.render.frame;x.get(I)!==E&&(x.set(I,E),I.update())}function It(I,E){const $=I.colorSpace,se=I.format,me=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||$!==du&&$!==ur&&(Ct.getTransfer($)===Zt?(se!==Ii||me!==pi)&&ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",$)),E}function ct(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=ce,this.getTextureUnits=ue,this.setTextureUnits=K,this.setTexture2D=ee,this.setTexture2DArray=_e,this.setTexture3D=Ee,this.setTextureCube=O,this.rebindTextures=mt,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=$t,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function kA(s,e){function i(r,l=ur){let c;const h=Ct.getTransfer(l);if(r===pi)return s.UNSIGNED_BYTE;if(r===h0)return s.UNSIGNED_SHORT_4_4_4_4;if(r===d0)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ev)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===tv)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===J_)return s.BYTE;if(r===$_)return s.SHORT;if(r===cl)return s.UNSIGNED_SHORT;if(r===f0)return s.INT;if(r===Ji)return s.UNSIGNED_INT;if(r===qi)return s.FLOAT;if(r===Ca)return s.HALF_FLOAT;if(r===nv)return s.ALPHA;if(r===iv)return s.RGB;if(r===Ii)return s.RGBA;if(r===Da)return s.DEPTH_COMPONENT;if(r===Xr)return s.DEPTH_STENCIL;if(r===av)return s.RED;if(r===p0)return s.RED_INTEGER;if(r===qr)return s.RG;if(r===m0)return s.RG_INTEGER;if(r===g0)return s.RGBA_INTEGER;if(r===ru||r===su||r===ou||r===lu)if(h===Zt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===ru)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===su)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===lu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===ru)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===su)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ou)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===lu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Rd||r===wd||r===Cd||r===Dd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===Rd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===wd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Cd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Dd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ud||r===Ld||r===Nd||r===Od||r===Pd||r===fu||r===Id)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===Ud||r===Ld)return h===Zt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===Nd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===Od)return c.COMPRESSED_R11_EAC;if(r===Pd)return c.COMPRESSED_SIGNED_R11_EAC;if(r===fu)return c.COMPRESSED_RG11_EAC;if(r===Id)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Fd||r===zd||r===Bd||r===Hd||r===Vd||r===Gd||r===kd||r===Xd||r===Wd||r===Zd||r===qd||r===Yd||r===Kd||r===Qd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===Fd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===zd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Bd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Hd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Gd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===kd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Xd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Zd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===qd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Yd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Kd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Qd)return h===Zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===jd||r===Jd||r===$d)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===jd)return h===Zt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===$d)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===e0||r===t0||r===hu||r===n0)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===e0)return c.COMPRESSED_RED_RGTC1_EXT;if(r===t0)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===hu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===n0)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ul?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const XA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ZA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new gv(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new $i({vertexShader:XA,fragmentShader:WA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ut(new Wr(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qA extends Yr{constructor(e,i){super();const r=this;let l=null,c=1,h=null,p="local-floor",m=1,d=null,x=null,_=null,g=null,S=null,A=null;const D=typeof XRWebGLBinding<"u",y=new ZA,M={},N=i.getContextAttributes();let z=null,R=null;const F=[],U=[],P=new nt;let b=null;const L=new di;L.viewport=new cn;const H=new di;H.viewport=new cn;const k=[L,H],W=new ny;let ce=null,ue=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let fe=F[te];return fe===void 0&&(fe=new kh,F[te]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(te){let fe=F[te];return fe===void 0&&(fe=new kh,F[te]=fe),fe.getGripSpace()},this.getHand=function(te){let fe=F[te];return fe===void 0&&(fe=new kh,F[te]=fe),fe.getHandSpace()};function K(te){const fe=U.indexOf(te.inputSource);if(fe===-1)return;const he=F[fe];he!==void 0&&(he.update(te.inputSource,te.frame,d||h),he.dispatchEvent({type:te.type,data:te.inputSource}))}function B(){l.removeEventListener("select",K),l.removeEventListener("selectstart",K),l.removeEventListener("selectend",K),l.removeEventListener("squeeze",K),l.removeEventListener("squeezestart",K),l.removeEventListener("squeezeend",K),l.removeEventListener("end",B),l.removeEventListener("inputsourceschange",V);for(let te=0;te<F.length;te++){const fe=U[te];fe!==null&&(U[te]=null,F[te].disconnect(fe))}ce=null,ue=null,y.reset();for(const te in M)delete M[te];e.setRenderTarget(z),S=null,g=null,_=null,l=null,R=null,Re.stop(),r.isPresenting=!1,e.setPixelRatio(b),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){c=te,r.isPresenting===!0&&ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){p=te,r.isPresenting===!0&&ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||h},this.setReferenceSpace=function(te){d=te},this.getBaseLayer=function(){return g!==null?g:S},this.getBinding=function(){return _===null&&D&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return A},this.getSession=function(){return l},this.setSession=async function(te){if(l=te,l!==null){if(z=e.getRenderTarget(),l.addEventListener("select",K),l.addEventListener("selectstart",K),l.addEventListener("selectend",K),l.addEventListener("squeeze",K),l.addEventListener("squeezestart",K),l.addEventListener("squeezeend",K),l.addEventListener("end",B),l.addEventListener("inputsourceschange",V),N.xrCompatible!==!0&&await i.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(P),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,Le=null,et=null;N.depth&&(et=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,he=N.stencil?Xr:Da,Le=N.stencil?ul:Ji);const Pe={colorFormat:i.RGBA8,depthFormat:et,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(Pe),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),R=new ji(g.textureWidth,g.textureHeight,{format:Ii,type:pi,depthTexture:new Js(g.textureWidth,g.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const he={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,he),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),R=new ji(S.framebufferWidth,S.framebufferHeight,{format:Ii,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(m),d=null,h=await l.requestReferenceSpace(p),Re.setContext(l),Re.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function V(te){for(let fe=0;fe<te.removed.length;fe++){const he=te.removed[fe],Le=U.indexOf(he);Le>=0&&(U[Le]=null,F[Le].disconnect(he))}for(let fe=0;fe<te.added.length;fe++){const he=te.added[fe];let Le=U.indexOf(he);if(Le===-1){for(let Pe=0;Pe<F.length;Pe++)if(Pe>=U.length){U.push(he),Le=Pe;break}else if(U[Pe]===null){U[Pe]=he,Le=Pe;break}if(Le===-1)break}const et=F[Le];et&&et.connect(he)}}const ee=new j,_e=new j;function Ee(te,fe,he){ee.setFromMatrixPosition(fe.matrixWorld),_e.setFromMatrixPosition(he.matrixWorld);const Le=ee.distanceTo(_e),et=fe.projectionMatrix.elements,Pe=he.projectionMatrix.elements,De=et[14]/(et[10]-1),He=et[14]/(et[10]+1),je=(et[9]+1)/et[5],mt=(et[9]-1)/et[5],ot=(et[8]-1)/et[0],Lt=(Pe[8]+1)/Pe[0],We=De*ot,ft=De*Lt,Mt=Le/(-ot+Lt),zt=Mt*-ot;if(fe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(zt),te.translateZ(Mt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),et[10]===-1)te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const $t=De+Mt,q=He+Mt,It=We-zt,ct=ft+(Le-zt),I=je*He/q*$t,E=mt*He/q*$t;te.projectionMatrix.makePerspective(It,ct,I,E,$t,q),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function O(te,fe){fe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(fe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(l===null)return;let fe=te.near,he=te.far;y.texture!==null&&(y.depthNear>0&&(fe=y.depthNear),y.depthFar>0&&(he=y.depthFar)),W.near=H.near=L.near=fe,W.far=H.far=L.far=he,(ce!==W.near||ue!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),ce=W.near,ue=W.far),W.layers.mask=te.layers.mask|6,L.layers.mask=W.layers.mask&-5,H.layers.mask=W.layers.mask&-3;const Le=te.parent,et=W.cameras;O(W,Le);for(let Pe=0;Pe<et.length;Pe++)O(et[Pe],Le);et.length===2?Ee(W,L,H):W.projectionMatrix.copy(L.projectionMatrix),Q(te,W,Le)};function Q(te,fe,he){he===null?te.matrix.copy(fe.matrixWorld):(te.matrix.copy(he.matrixWorld),te.matrix.invert(),te.matrix.multiply(fe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=dl*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(g===null&&S===null))return m},this.setFoveation=function(te){m=te,g!==null&&(g.fixedFoveation=te),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=te)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(W)},this.getCameraTexture=function(te){return M[te]};let Se=null;function Te(te,fe){if(x=fe.getViewerPose(d||h),A=fe,x!==null){const he=x.views;S!==null&&(e.setRenderTargetFramebuffer(R,S.framebuffer),e.setRenderTarget(R));let Le=!1;he.length!==W.cameras.length&&(W.cameras.length=0,Le=!0);for(let He=0;He<he.length;He++){const je=he[He];let mt=null;if(S!==null)mt=S.getViewport(je);else{const Lt=_.getViewSubImage(g,je);mt=Lt.viewport,He===0&&(e.setRenderTargetTextures(R,Lt.colorTexture,Lt.depthStencilTexture),e.setRenderTarget(R))}let ot=k[He];ot===void 0&&(ot=new di,ot.layers.enable(He),ot.viewport=new cn,k[He]=ot),ot.matrix.fromArray(je.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(je.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(mt.x,mt.y,mt.width,mt.height),He===0&&(W.matrix.copy(ot.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Le===!0&&W.cameras.push(ot)}const et=l.enabledFeatures;if(et&&et.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&D){_=r.getBinding();const He=_.getDepthInformation(he[0]);He&&He.isValid&&He.texture&&y.init(He,l.renderState)}if(et&&et.includes("camera-access")&&D){e.state.unbindTexture(),_=r.getBinding();for(let He=0;He<he.length;He++){const je=he[He].camera;if(je){let mt=M[je];mt||(mt=new gv,M[je]=mt);const ot=_.getCameraImage(je);mt.sourceTexture=ot}}}}for(let he=0;he<F.length;he++){const Le=U[he],et=F[he];Le!==null&&et!==void 0&&et.update(Le,fe,d||h)}Se&&Se(te,fe),fe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:fe}),A=null}const Re=new Sv;Re.setAnimationLoop(Te),this.setAnimationLoop=function(te){Se=te},this.dispose=function(){}}}const YA=new on,wv=new pt;wv.set(-1,0,0,0,1,0,0,0,1);function KA(s,e){function i(y,M){y.matrixAutoUpdate===!0&&y.updateMatrix(),M.value.copy(y.matrix)}function r(y,M){M.color.getRGB(y.fogColor.value,_v(s)),M.isFog?(y.fogNear.value=M.near,y.fogFar.value=M.far):M.isFogExp2&&(y.fogDensity.value=M.density)}function l(y,M,N,z,R){M.isNodeMaterial?M.uniformsNeedUpdate=!1:M.isMeshBasicMaterial?c(y,M):M.isMeshLambertMaterial?(c(y,M),M.envMap&&(y.envMapIntensity.value=M.envMapIntensity)):M.isMeshToonMaterial?(c(y,M),_(y,M)):M.isMeshPhongMaterial?(c(y,M),x(y,M),M.envMap&&(y.envMapIntensity.value=M.envMapIntensity)):M.isMeshStandardMaterial?(c(y,M),g(y,M),M.isMeshPhysicalMaterial&&S(y,M,R)):M.isMeshMatcapMaterial?(c(y,M),A(y,M)):M.isMeshDepthMaterial?c(y,M):M.isMeshDistanceMaterial?(c(y,M),D(y,M)):M.isMeshNormalMaterial?c(y,M):M.isLineBasicMaterial?(h(y,M),M.isLineDashedMaterial&&p(y,M)):M.isPointsMaterial?m(y,M,N,z):M.isSpriteMaterial?d(y,M):M.isShadowMaterial?(y.color.value.copy(M.color),y.opacity.value=M.opacity):M.isShaderMaterial&&(M.uniformsNeedUpdate=!1)}function c(y,M){y.opacity.value=M.opacity,M.color&&y.diffuse.value.copy(M.color),M.emissive&&y.emissive.value.copy(M.emissive).multiplyScalar(M.emissiveIntensity),M.map&&(y.map.value=M.map,i(M.map,y.mapTransform)),M.alphaMap&&(y.alphaMap.value=M.alphaMap,i(M.alphaMap,y.alphaMapTransform)),M.bumpMap&&(y.bumpMap.value=M.bumpMap,i(M.bumpMap,y.bumpMapTransform),y.bumpScale.value=M.bumpScale,M.side===$n&&(y.bumpScale.value*=-1)),M.normalMap&&(y.normalMap.value=M.normalMap,i(M.normalMap,y.normalMapTransform),y.normalScale.value.copy(M.normalScale),M.side===$n&&y.normalScale.value.negate()),M.displacementMap&&(y.displacementMap.value=M.displacementMap,i(M.displacementMap,y.displacementMapTransform),y.displacementScale.value=M.displacementScale,y.displacementBias.value=M.displacementBias),M.emissiveMap&&(y.emissiveMap.value=M.emissiveMap,i(M.emissiveMap,y.emissiveMapTransform)),M.specularMap&&(y.specularMap.value=M.specularMap,i(M.specularMap,y.specularMapTransform)),M.alphaTest>0&&(y.alphaTest.value=M.alphaTest);const N=e.get(M),z=N.envMap,R=N.envMapRotation;z&&(y.envMap.value=z,y.envMapRotation.value.setFromMatrix4(YA.makeRotationFromEuler(R)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(wv),y.reflectivity.value=M.reflectivity,y.ior.value=M.ior,y.refractionRatio.value=M.refractionRatio),M.lightMap&&(y.lightMap.value=M.lightMap,y.lightMapIntensity.value=M.lightMapIntensity,i(M.lightMap,y.lightMapTransform)),M.aoMap&&(y.aoMap.value=M.aoMap,y.aoMapIntensity.value=M.aoMapIntensity,i(M.aoMap,y.aoMapTransform))}function h(y,M){y.diffuse.value.copy(M.color),y.opacity.value=M.opacity,M.map&&(y.map.value=M.map,i(M.map,y.mapTransform))}function p(y,M){y.dashSize.value=M.dashSize,y.totalSize.value=M.dashSize+M.gapSize,y.scale.value=M.scale}function m(y,M,N,z){y.diffuse.value.copy(M.color),y.opacity.value=M.opacity,y.size.value=M.size*N,y.scale.value=z*.5,M.map&&(y.map.value=M.map,i(M.map,y.uvTransform)),M.alphaMap&&(y.alphaMap.value=M.alphaMap,i(M.alphaMap,y.alphaMapTransform)),M.alphaTest>0&&(y.alphaTest.value=M.alphaTest)}function d(y,M){y.diffuse.value.copy(M.color),y.opacity.value=M.opacity,y.rotation.value=M.rotation,M.map&&(y.map.value=M.map,i(M.map,y.mapTransform)),M.alphaMap&&(y.alphaMap.value=M.alphaMap,i(M.alphaMap,y.alphaMapTransform)),M.alphaTest>0&&(y.alphaTest.value=M.alphaTest)}function x(y,M){y.specular.value.copy(M.specular),y.shininess.value=Math.max(M.shininess,1e-4)}function _(y,M){M.gradientMap&&(y.gradientMap.value=M.gradientMap)}function g(y,M){y.metalness.value=M.metalness,M.metalnessMap&&(y.metalnessMap.value=M.metalnessMap,i(M.metalnessMap,y.metalnessMapTransform)),y.roughness.value=M.roughness,M.roughnessMap&&(y.roughnessMap.value=M.roughnessMap,i(M.roughnessMap,y.roughnessMapTransform)),M.envMap&&(y.envMapIntensity.value=M.envMapIntensity)}function S(y,M,N){y.ior.value=M.ior,M.sheen>0&&(y.sheenColor.value.copy(M.sheenColor).multiplyScalar(M.sheen),y.sheenRoughness.value=M.sheenRoughness,M.sheenColorMap&&(y.sheenColorMap.value=M.sheenColorMap,i(M.sheenColorMap,y.sheenColorMapTransform)),M.sheenRoughnessMap&&(y.sheenRoughnessMap.value=M.sheenRoughnessMap,i(M.sheenRoughnessMap,y.sheenRoughnessMapTransform))),M.clearcoat>0&&(y.clearcoat.value=M.clearcoat,y.clearcoatRoughness.value=M.clearcoatRoughness,M.clearcoatMap&&(y.clearcoatMap.value=M.clearcoatMap,i(M.clearcoatMap,y.clearcoatMapTransform)),M.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=M.clearcoatRoughnessMap,i(M.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),M.clearcoatNormalMap&&(y.clearcoatNormalMap.value=M.clearcoatNormalMap,i(M.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(M.clearcoatNormalScale),M.side===$n&&y.clearcoatNormalScale.value.negate())),M.dispersion>0&&(y.dispersion.value=M.dispersion),M.iridescence>0&&(y.iridescence.value=M.iridescence,y.iridescenceIOR.value=M.iridescenceIOR,y.iridescenceThicknessMinimum.value=M.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=M.iridescenceThicknessRange[1],M.iridescenceMap&&(y.iridescenceMap.value=M.iridescenceMap,i(M.iridescenceMap,y.iridescenceMapTransform)),M.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=M.iridescenceThicknessMap,i(M.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),M.transmission>0&&(y.transmission.value=M.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),M.transmissionMap&&(y.transmissionMap.value=M.transmissionMap,i(M.transmissionMap,y.transmissionMapTransform)),y.thickness.value=M.thickness,M.thicknessMap&&(y.thicknessMap.value=M.thicknessMap,i(M.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=M.attenuationDistance,y.attenuationColor.value.copy(M.attenuationColor)),M.anisotropy>0&&(y.anisotropyVector.value.set(M.anisotropy*Math.cos(M.anisotropyRotation),M.anisotropy*Math.sin(M.anisotropyRotation)),M.anisotropyMap&&(y.anisotropyMap.value=M.anisotropyMap,i(M.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=M.specularIntensity,y.specularColor.value.copy(M.specularColor),M.specularColorMap&&(y.specularColorMap.value=M.specularColorMap,i(M.specularColorMap,y.specularColorMapTransform)),M.specularIntensityMap&&(y.specularIntensityMap.value=M.specularIntensityMap,i(M.specularIntensityMap,y.specularIntensityMapTransform))}function A(y,M){M.matcap&&(y.matcap.value=M.matcap)}function D(y,M){const N=e.get(M).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function QA(s,e,i,r){let l={},c={},h=[];const p=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(R,F){const U=F.program;r.uniformBlockBinding(R,U)}function d(R,F){let U=l[R.id];U===void 0&&(y(R),U=x(R),l[R.id]=U,R.addEventListener("dispose",N));const P=F.program;r.updateUBOMapping(R,P);const b=e.render.frame;c[R.id]!==b&&(g(R),c[R.id]=b)}function x(R){const F=_();R.__bindingPointIndex=F;const U=s.createBuffer(),P=R.__size,b=R.usage;return s.bindBuffer(s.UNIFORM_BUFFER,U),s.bufferData(s.UNIFORM_BUFFER,P,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,F,U),U}function _(){for(let R=0;R<p;R++)if(h.indexOf(R)===-1)return h.push(R),R;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const F=l[R.id],U=R.uniforms,P=R.__cache;s.bindBuffer(s.UNIFORM_BUFFER,F);for(let b=0,L=U.length;b<L;b++){const H=U[b];if(Array.isArray(H))for(let k=0,W=H.length;k<W;k++)S(H[k],b,k,P);else S(H,b,0,P)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(R,F,U,P){if(D(R,F,U,P)===!0){const b=R.__offset,L=R.value;if(Array.isArray(L)){let H=0;for(let k=0;k<L.length;k++){const W=L[k],ce=M(W);A(W,R.__data,H),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(H+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}}else A(L,R.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,R.__data)}}function A(R,F,U){typeof R=="number"||typeof R=="boolean"?F[0]=R:R.isMatrix3?(F[0]=R.elements[0],F[1]=R.elements[1],F[2]=R.elements[2],F[3]=0,F[4]=R.elements[3],F[5]=R.elements[4],F[6]=R.elements[5],F[7]=0,F[8]=R.elements[6],F[9]=R.elements[7],F[10]=R.elements[8],F[11]=0):ArrayBuffer.isView(R)?F.set(new R.constructor(R.buffer,R.byteOffset,F.length)):R.toArray(F,U)}function D(R,F,U,P){const b=R.value,L=F+"_"+U;if(P[L]===void 0)return typeof b=="number"||typeof b=="boolean"?P[L]=b:ArrayBuffer.isView(b)?P[L]=b.slice():P[L]=b.clone(),!0;{const H=P[L];if(typeof b=="number"||typeof b=="boolean"){if(H!==b)return P[L]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(H.equals(b)===!1)return H.copy(b),!0}}return!1}function y(R){const F=R.uniforms;let U=0;const P=16;for(let L=0,H=F.length;L<H;L++){const k=Array.isArray(F[L])?F[L]:[F[L]];for(let W=0,ce=k.length;W<ce;W++){const ue=k[W],K=Array.isArray(ue.value)?ue.value:[ue.value];for(let B=0,V=K.length;B<V;B++){const ee=K[B],_e=M(ee),Ee=U%P,O=Ee%_e.boundary,Q=Ee+O;U+=O,Q!==0&&P-Q<_e.storage&&(U+=P-Q),ue.__data=new Float32Array(_e.storage/Float32Array.BYTES_PER_ELEMENT),ue.__offset=U,U+=_e.storage}}}const b=U%P;return b>0&&(U+=P-b),R.__size=U,R.__cache={},this}function M(R){const F={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(F.boundary=4,F.storage=4):R.isVector2?(F.boundary=8,F.storage=8):R.isVector3||R.isColor?(F.boundary=16,F.storage=12):R.isVector4?(F.boundary=16,F.storage=16):R.isMatrix3?(F.boundary=48,F.storage=48):R.isMatrix4?(F.boundary=64,F.storage=64):R.isTexture?ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(F.boundary=16,F.storage=R.byteLength):ut("WebGLRenderer: Unsupported uniform value type.",R),F}function N(R){const F=R.target;F.removeEventListener("dispose",N);const U=h.indexOf(F.__bindingPointIndex);h.splice(U,1),s.deleteBuffer(l[F.id]),delete l[F.id],delete c[F.id]}function z(){for(const R in l)s.deleteBuffer(l[R]);h=[],l={},c={}}return{bind:m,update:d,dispose:z}}const jA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wi=null;function JA(){return Wi===null&&(Wi=new PS(jA,16,16,qr,Ca),Wi.name="DFG_LUT",Wi.minFilter=Hn,Wi.magFilter=Hn,Wi.wrapS=Aa,Wi.wrapT=Aa,Wi.generateMipmaps=!1,Wi.needsUpdate=!0),Wi}class $A{constructor(e={}){const{canvas:i=QM(),context:r=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:S=pi}=e;this.isWebGLRenderer=!0;let A;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");A=r.getContextAttributes().alpha}else A=h;const D=S,y=new Set([g0,m0,p0]),M=new Set([pi,Ji,cl,ul,h0,d0]),N=new Uint32Array(4),z=new Int32Array(4),R=new j;let F=null,U=null;const P=[],b=[];let L=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const H=this;let k=!1,W=null,ce=null,ue=null,K=null;this._outputColorSpace=Nn;let B=0,V=0,ee=null,_e=-1,Ee=null;const O=new cn,Q=new cn;let Se=null;const Te=new At(0);let Re=0,te=i.width,fe=i.height,he=1,Le=null,et=null;const Pe=new cn(0,0,te,fe),De=new cn(0,0,te,fe);let He=!1;const je=new E0;let mt=!1,ot=!1;const Lt=new on,We=new j,ft=new cn,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function $t(){return ee===null?he:1}let q=r;function It(w,Y){return i.getContext(w,Y)}try{const w={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:x,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${c0}`),i.addEventListener("webglcontextlost",nn,!1),i.addEventListener("webglcontextrestored",Ht,!1),i.addEventListener("webglcontextcreationerror",ei,!1),q===null){const Y="webgl2";if(q=It(Y,w),q===null)throw It(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(w){throw Dt("WebGLRenderer: "+w.message),w}let ct,I,E,$,se,me,we,Oe,pe,ge,Ue,ke,ze,Ie,it,at,ht,Z,Ce,xe,Ne,Ge,Ae;function Je(){ct=new Jb(q),ct.init(),Ne=new kA(q,ct),I=new Xb(q,ct,e,Ne),E=new VA(q,ct),I.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),ce=q.createFramebuffer(),ue=q.createFramebuffer(),K=q.createFramebuffer(),$=new t3(q),se=new RA,me=new GA(q,ct,E,se,I,Ne,$),we=new jb(H),Oe=new ry(q),Ge=new Gb(q,Oe),pe=new $b(q,Oe,$,Ge),ge=new i3(q,pe,Oe,Ge,$),Z=new n3(q,I,me),it=new Wb(se),Ue=new TA(H,we,ct,I,Ge,it),ke=new KA(H,se),ze=new CA,Ie=new PA(ct),ht=new Vb(H,we,E,ge,A,m),at=new HA(H,ge,I),Ae=new QA(q,$,I,E),Ce=new kb(q,ct,$),xe=new e3(q,ct,$),$.programs=Ue.programs,H.capabilities=I,H.extensions=ct,H.properties=se,H.renderLists=ze,H.shadowMap=at,H.state=E,H.info=$}Je(),D!==pi&&(L=new r3(D,i.width,i.height,p,l,c));const qe=new qA(H,q);this.xr=qe,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const w=ct.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ct.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(w){w!==void 0&&(he=w,this.setSize(te,fe,!1))},this.getSize=function(w){return w.set(te,fe)},this.setSize=function(w,Y,oe=!0){if(qe.isPresenting){ut("WebGLRenderer: Can't change size while VR device is presenting.");return}te=w,fe=Y,i.width=Math.floor(w*he),i.height=Math.floor(Y*he),oe===!0&&(i.style.width=w+"px",i.style.height=Y+"px"),L!==null&&L.setSize(i.width,i.height),this.setViewport(0,0,w,Y)},this.getDrawingBufferSize=function(w){return w.set(te*he,fe*he).floor()},this.setDrawingBufferSize=function(w,Y,oe){te=w,fe=Y,he=oe,i.width=Math.floor(w*oe),i.height=Math.floor(Y*oe),this.setViewport(0,0,w,Y)},this.setEffects=function(w){if(D===pi){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let Y=0;Y<w.length;Y++)if(w[Y].isOutputPass===!0){ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(O)},this.getViewport=function(w){return w.copy(Pe)},this.setViewport=function(w,Y,oe,ae){w.isVector4?Pe.set(w.x,w.y,w.z,w.w):Pe.set(w,Y,oe,ae),E.viewport(O.copy(Pe).multiplyScalar(he).round())},this.getScissor=function(w){return w.copy(De)},this.setScissor=function(w,Y,oe,ae){w.isVector4?De.set(w.x,w.y,w.z,w.w):De.set(w,Y,oe,ae),E.scissor(Q.copy(De).multiplyScalar(he).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(w){E.setScissorTest(He=w)},this.setOpaqueSort=function(w){Le=w},this.setTransparentSort=function(w){et=w},this.getClearColor=function(w){return w.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(w=!0,Y=!0,oe=!0){let ae=0;if(w){let re=!1;if(ee!==null){const Be=ee.texture.format;re=y.has(Be)}if(re){const Be=ee.texture.type,Ze=M.has(Be),Fe=ht.getClearColor(),Ke=ht.getClearAlpha(),Ye=Fe.r,rt=Fe.g,gt=Fe.b;Ze?(N[0]=Ye,N[1]=rt,N[2]=gt,N[3]=Ke,q.clearBufferuiv(q.COLOR,0,N)):(z[0]=Ye,z[1]=rt,z[2]=gt,z[3]=Ke,q.clearBufferiv(q.COLOR,0,z))}else ae|=q.COLOR_BUFFER_BIT}Y&&(ae|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),oe&&(ae|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&q.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),W=w},this.dispose=function(){i.removeEventListener("webglcontextlost",nn,!1),i.removeEventListener("webglcontextrestored",Ht,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),ht.dispose(),ze.dispose(),Ie.dispose(),se.dispose(),we.dispose(),ge.dispose(),Ge.dispose(),Ae.dispose(),Ue.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",pn),qe.removeEventListener("sessionend",wn),Zn.stop()};function nn(w){w.preventDefault(),mu("WebGLRenderer: Context Lost."),k=!0}function Ht(){mu("WebGLRenderer: Context Restored."),k=!1;const w=$.autoReset,Y=at.enabled,oe=at.autoUpdate,ae=at.needsUpdate,re=at.type;Je(),$.autoReset=w,at.enabled=Y,at.autoUpdate=oe,at.needsUpdate=ae,at.type=re}function ei(w){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ti(w){const Y=w.target;Y.removeEventListener("dispose",ti),no(Y)}function no(w){io(w),se.remove(w)}function io(w){const Y=se.get(w).programs;Y!==void 0&&(Y.forEach(function(oe){Ue.releaseProgram(oe)}),w.isShaderMaterial&&Ue.releaseShaderCache(w))}this.renderBufferDirect=function(w,Y,oe,ae,re,Be){Y===null&&(Y=Mt);const Ze=re.isMesh&&re.matrixWorld.determinantAffine()<0,Fe=Na(w,Y,oe,ae,re);E.setMaterial(ae,Ze);let Ke=oe.index,Ye=1;if(ae.wireframe===!0){if(Ke=pe.getWireframeAttribute(oe),Ke===void 0)return;Ye=2}const rt=oe.drawRange,gt=oe.attributes.position;let tt=rt.start*Ye,Nt=(rt.start+rt.count)*Ye;Be!==null&&(tt=Math.max(tt,Be.start*Ye),Nt=Math.min(Nt,(Be.start+Be.count)*Ye)),Ke!==null?(tt=Math.max(tt,0),Nt=Math.min(Nt,Ke.count)):gt!=null&&(tt=Math.max(tt,0),Nt=Math.min(Nt,gt.count));const an=Nt-tt;if(an<0||an===1/0)return;Ge.setup(re,ae,Fe,oe,Ke);let jt,Vt=Ce;if(Ke!==null&&(jt=Oe.get(Ke),Vt=xe,Vt.setIndex(jt)),re.isMesh)ae.wireframe===!0?(E.setLineWidth(ae.wireframeLinewidth*$t()),Vt.setMode(q.LINES)):Vt.setMode(q.TRIANGLES);else if(re.isLine){let Gt=ae.linewidth;Gt===void 0&&(Gt=1),E.setLineWidth(Gt*$t()),re.isLineSegments?Vt.setMode(q.LINES):re.isLineLoop?Vt.setMode(q.LINE_LOOP):Vt.setMode(q.LINE_STRIP)}else re.isPoints?Vt.setMode(q.POINTS):re.isSprite&&Vt.setMode(q.TRIANGLES);if(re.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))Vt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{const Gt=re._multiDrawStarts,Xe=re._multiDrawCounts,In=re._multiDrawCount,St=Ke?Oe.get(Ke).bytesPerElement:1,Sn=se.get(ae).currentProgram.getUniforms();for(let ni=0;ni<In;ni++)Sn.setValue(q,"_gl_DrawID",ni),Vt.render(Gt[ni]/St,Xe[ni])}else if(re.isInstancedMesh)Vt.renderInstances(tt,an,re.count);else if(oe.isInstancedBufferGeometry){const Gt=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Xe=Math.min(oe.instanceCount,Gt);Vt.renderInstances(tt,an,Xe)}else Vt.render(tt,an)};function ao(w,Y,oe){w.transparent===!0&&w.side===ba&&w.forceSinglePass===!1?(w.side=$n,w.needsUpdate=!0,La(w,Y,oe),w.side=dr,w.needsUpdate=!0,La(w,Y,oe),w.side=ba):La(w,Y,oe)}this.compile=function(w,Y,oe=null){oe===null&&(oe=w),U=Ie.get(oe),U.init(Y),b.push(U),oe.traverseVisible(function(re){re.isLight&&re.layers.test(Y.layers)&&(U.pushLight(re),re.castShadow&&U.pushShadow(re))}),w!==oe&&w.traverseVisible(function(re){re.isLight&&re.layers.test(Y.layers)&&(U.pushLight(re),re.castShadow&&U.pushShadow(re))}),U.setupLights();const ae=new Set;return w.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;const Be=re.material;if(Be)if(Array.isArray(Be))for(let Ze=0;Ze<Be.length;Ze++){const Fe=Be[Ze];ao(Fe,oe,re),ae.add(Fe)}else ao(Be,oe,re),ae.add(Be)}),U=b.pop(),ae},this.compileAsync=function(w,Y,oe=null){const ae=this.compile(w,Y,oe);return new Promise(re=>{function Be(){if(ae.forEach(function(Ze){se.get(Ze).currentProgram.isReady()&&ae.delete(Ze)}),ae.size===0){re(w);return}setTimeout(Be,10)}ct.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Qr=null;function zi(w){Qr&&Qr(w)}function pn(){Zn.stop()}function wn(){Zn.start()}const Zn=new Sv;Zn.setAnimationLoop(zi),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(w){Qr=w,qe.setAnimationLoop(w),w===null?Zn.stop():Zn.start()},qe.addEventListener("sessionstart",pn),qe.addEventListener("sessionend",wn),this.render=function(w,Y){if(Y!==void 0&&Y.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;W!==null&&W.renderStart(w,Y);const oe=qe.enabled===!0&&qe.isPresenting===!0,ae=L!==null&&(ee===null||oe)&&L.begin(H,ee);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(Y),Y=qe.getCamera()),w.isScene===!0&&w.onBeforeRender(H,w,Y,ee),U=Ie.get(w,b.length),U.init(Y),U.state.textureUnits=me.getTextureUnits(),b.push(U),Lt.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),je.setFromProjectionMatrix(Lt,Yi,Y.reversedDepth),ot=this.localClippingEnabled,mt=it.init(this.clippingPlanes,ot),F=ze.get(w,P.length),F.init(),P.push(F),qe.enabled===!0&&qe.isPresenting===!0){const Ze=H.xr.getDepthSensingMesh();Ze!==null&&gr(Ze,Y,-1/0,H.sortObjects)}gr(w,Y,0,H.sortObjects),F.finish(),H.sortObjects===!0&&F.sort(Le,et,Y.reversedDepth),zt=qe.enabled===!1||qe.isPresenting===!1||qe.hasDepthSensing()===!1,zt&&ht.addToRenderList(F,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),mt===!0&&it.beginShadows();const re=U.state.shadowsArray;if(at.render(re,w,Y),mt===!0&&it.endShadows(),(ae&&L.hasRenderPass())===!1){const Ze=F.opaque,Fe=F.transmissive;if(U.setupLights(),Y.isArrayCamera){const Ke=Y.cameras;if(Fe.length>0)for(let Ye=0,rt=Ke.length;Ye<rt;Ye++){const gt=Ke[Ye];vl(Ze,Fe,w,gt)}zt&&ht.render(w);for(let Ye=0,rt=Ke.length;Ye<rt;Ye++){const gt=Ke[Ye];_l(F,w,gt,gt.viewport)}}else Fe.length>0&&vl(Ze,Fe,w,Y),zt&&ht.render(w),_l(F,w,Y)}ee!==null&&V===0&&(me.updateMultisampleRenderTarget(ee),me.updateRenderTargetMipmap(ee)),ae&&L.end(H),w.isScene===!0&&w.onAfterRender(H,w,Y),Ge.resetDefaultState(),_e=-1,Ee=null,b.pop(),b.length>0?(U=b[b.length-1],me.setTextureUnits(U.state.textureUnits),mt===!0&&it.setGlobalState(H.clippingPlanes,U.state.camera)):U=null,P.pop(),P.length>0?F=P[P.length-1]:F=null,W!==null&&W.renderEnd()};function gr(w,Y,oe,ae){if(w.visible===!1)return;if(w.layers.test(Y.layers)){if(w.isGroup)oe=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(Y);else if(w.isLightProbeGrid)U.pushLightProbeGrid(w);else if(w.isLight)U.pushLight(w),w.castShadow&&U.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||je.intersectsSprite(w)){ae&&ft.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Lt);const Ze=ge.update(w),Fe=w.material;Fe.visible&&F.push(w,Ze,Fe,oe,ft.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||je.intersectsObject(w))){const Ze=ge.update(w),Fe=w.material;if(ae&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ft.copy(w.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),ft.copy(Ze.boundingSphere.center)),ft.applyMatrix4(w.matrixWorld).applyMatrix4(Lt)),Array.isArray(Fe)){const Ke=Ze.groups;for(let Ye=0,rt=Ke.length;Ye<rt;Ye++){const gt=Ke[Ye],tt=Fe[gt.materialIndex];tt&&tt.visible&&F.push(w,Ze,tt,oe,ft.z,gt)}}else Fe.visible&&F.push(w,Ze,Fe,oe,ft.z,null)}}const Be=w.children;for(let Ze=0,Fe=Be.length;Ze<Fe;Ze++)gr(Be[Ze],Y,oe,ae)}function _l(w,Y,oe,ae){const{opaque:re,transmissive:Be,transparent:Ze}=w;U.setupLightsView(oe),mt===!0&&it.setGlobalState(H.clippingPlanes,oe),ae&&E.viewport(O.copy(ae)),re.length>0&&_r(re,Y,oe),Be.length>0&&_r(Be,Y,oe),Ze.length>0&&_r(Ze,Y,oe),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function vl(w,Y,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[ae.id]===void 0){const tt=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[ae.id]=new ji(1,1,{generateMipmaps:!0,type:tt?Ca:pi,minFilter:kr,samples:Math.max(4,I.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ct.workingColorSpace})}const Be=U.state.transmissionRenderTarget[ae.id],Ze=ae.viewport||O;Be.setSize(Ze.z*H.transmissionResolutionScale,Ze.w*H.transmissionResolutionScale);const Fe=H.getRenderTarget(),Ke=H.getActiveCubeFace(),Ye=H.getActiveMipmapLevel();H.setRenderTarget(Be),H.getClearColor(Te),Re=H.getClearAlpha(),Re<1&&H.setClearColor(16777215,.5),H.clear(),zt&&ht.render(oe);const rt=H.toneMapping;H.toneMapping=Qi;const gt=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),U.setupLightsView(ae),mt===!0&&it.setGlobalState(H.clippingPlanes,ae),_r(w,oe,ae),me.updateMultisampleRenderTarget(Be),me.updateRenderTargetMipmap(Be),ct.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Nt=0,an=Y.length;Nt<an;Nt++){const jt=Y[Nt],{object:Vt,geometry:Gt,material:Xe,group:In}=jt;if(Xe.side===ba&&Vt.layers.test(ae.layers)){const St=Xe.side;Xe.side=$n,Xe.needsUpdate=!0,Ua(Vt,oe,ae,Gt,Xe,In),Xe.side=St,Xe.needsUpdate=!0,tt=!0}}tt===!0&&(me.updateMultisampleRenderTarget(Be),me.updateRenderTargetMipmap(Be))}H.setRenderTarget(Fe,Ke,Ye),H.setClearColor(Te,Re),gt!==void 0&&(ae.viewport=gt),H.toneMapping=rt}function _r(w,Y,oe){const ae=Y.isScene===!0?Y.overrideMaterial:null;for(let re=0,Be=w.length;re<Be;re++){const Ze=w[re],{object:Fe,geometry:Ke,group:Ye}=Ze;let rt=Ze.material;rt.allowOverride===!0&&ae!==null&&(rt=ae),Fe.layers.test(oe.layers)&&Ua(Fe,Y,oe,Ke,rt,Ye)}}function Ua(w,Y,oe,ae,re,Be){w.onBeforeRender(H,Y,oe,ae,re,Be),w.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),re.onBeforeRender(H,Y,oe,ae,w,Be),re.transparent===!0&&re.side===ba&&re.forceSinglePass===!1?(re.side=$n,re.needsUpdate=!0,H.renderBufferDirect(oe,Y,ae,re,w,Be),re.side=dr,re.needsUpdate=!0,H.renderBufferDirect(oe,Y,ae,re,w,Be),re.side=ba):H.renderBufferDirect(oe,Y,ae,re,w,Be),w.onAfterRender(H,Y,oe,ae,re,Be)}function La(w,Y,oe){Y.isScene!==!0&&(Y=Mt);const ae=se.get(w),re=U.state.lights,Be=U.state.shadowsArray,Ze=re.state.version,Fe=Ue.getParameters(w,re.state,Be,Y,oe,U.state.lightProbeGridArray),Ke=Ue.getProgramCacheKey(Fe);let Ye=ae.programs;ae.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?Y.environment:null,ae.fog=Y.fog;const rt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ae.envMap=we.get(w.envMap||ae.environment,rt),ae.envMapRotation=ae.environment!==null&&w.envMap===null?Y.environmentRotation:w.envMapRotation,Ye===void 0&&(w.addEventListener("dispose",ti),Ye=new Map,ae.programs=Ye);let gt=Ye.get(Ke);if(gt!==void 0){if(ae.currentProgram===gt&&ae.lightsStateVersion===Ze)return ta(w,Fe),gt}else Fe.uniforms=Ue.getUniforms(w),W!==null&&w.isNodeMaterial&&W.build(w,oe,Fe),w.onBeforeCompile(Fe,H),gt=Ue.acquireProgram(Fe,Ke),Ye.set(Ke,gt),ae.uniforms=Fe.uniforms;const tt=ae.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(tt.clippingPlanes=it.uniform),ta(w,Fe),ae.needsLights=xl(w),ae.lightsStateVersion=Ze,ae.needsLights&&(tt.ambientLightColor.value=re.state.ambient,tt.lightProbe.value=re.state.probe,tt.directionalLights.value=re.state.directional,tt.directionalLightShadows.value=re.state.directionalShadow,tt.spotLights.value=re.state.spot,tt.spotLightShadows.value=re.state.spotShadow,tt.rectAreaLights.value=re.state.rectArea,tt.ltc_1.value=re.state.rectAreaLTC1,tt.ltc_2.value=re.state.rectAreaLTC2,tt.pointLights.value=re.state.point,tt.pointLightShadows.value=re.state.pointShadow,tt.hemisphereLights.value=re.state.hemi,tt.directionalShadowMatrix.value=re.state.directionalShadowMatrix,tt.spotLightMatrix.value=re.state.spotLightMatrix,tt.spotLightMap.value=re.state.spotLightMap,tt.pointShadowMatrix.value=re.state.pointShadowMatrix),ae.lightProbeGrid=U.state.lightProbeGridArray.length>0,ae.currentProgram=gt,ae.uniformsList=null,gt}function ea(w){if(w.uniformsList===null){const Y=w.currentProgram.getUniforms();w.uniformsList=cu.seqWithValue(Y.seq,w.uniforms)}return w.uniformsList}function ta(w,Y){const oe=se.get(w);oe.outputColorSpace=Y.outputColorSpace,oe.batching=Y.batching,oe.batchingColor=Y.batchingColor,oe.instancing=Y.instancing,oe.instancingColor=Y.instancingColor,oe.instancingMorph=Y.instancingMorph,oe.skinning=Y.skinning,oe.morphTargets=Y.morphTargets,oe.morphNormals=Y.morphNormals,oe.morphColors=Y.morphColors,oe.morphTargetsCount=Y.morphTargetsCount,oe.numClippingPlanes=Y.numClippingPlanes,oe.numIntersection=Y.numClipIntersection,oe.vertexAlphas=Y.vertexAlphas,oe.vertexTangents=Y.vertexTangents,oe.toneMapping=Y.toneMapping}function vr(w,Y){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;R.setFromMatrixPosition(Y.matrixWorld);for(let oe=0,ae=w.length;oe<ae;oe++){const re=w[oe];if(re.texture!==null&&re.boundingBox.containsPoint(R))return re}return null}function Na(w,Y,oe,ae,re){Y.isScene!==!0&&(Y=Mt),me.resetTextureUnits();const Be=Y.fog,Ze=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial?Y.environment:null,Fe=ee===null?H.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ct.workingColorSpace,Ke=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial&&!ae.envMap||ae.isMeshPhongMaterial&&!ae.envMap,Ye=we.get(ae.envMap||Ze,Ke),rt=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,gt=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),tt=!!oe.morphAttributes.position,Nt=!!oe.morphAttributes.normal,an=!!oe.morphAttributes.color;let jt=Qi;ae.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(jt=H.toneMapping);const Vt=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Gt=Vt!==void 0?Vt.length:0,Xe=se.get(ae),In=U.state.lights;if(mt===!0&&(ot===!0||w!==Ee)){const Bt=w===Ee&&ae.id===_e;it.setState(ae,w,Bt)}let St=!1;ae.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==In.state.version||Xe.outputColorSpace!==Fe||re.isBatchedMesh&&Xe.batching===!1||!re.isBatchedMesh&&Xe.batching===!0||re.isBatchedMesh&&Xe.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&Xe.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&Xe.instancing===!1||!re.isInstancedMesh&&Xe.instancing===!0||re.isSkinnedMesh&&Xe.skinning===!1||!re.isSkinnedMesh&&Xe.skinning===!0||re.isInstancedMesh&&Xe.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&Xe.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&Xe.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&Xe.instancingMorph===!1&&re.morphTexture!==null||Xe.envMap!==Ye||ae.fog===!0&&Xe.fog!==Be||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==it.numPlanes||Xe.numIntersection!==it.numIntersection)||Xe.vertexAlphas!==rt||Xe.vertexTangents!==gt||Xe.morphTargets!==tt||Xe.morphNormals!==Nt||Xe.morphColors!==an||Xe.toneMapping!==jt||Xe.morphTargetsCount!==Gt||!!Xe.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(St=!0):(St=!0,Xe.__version=ae.version);let Sn=Xe.currentProgram;St===!0&&(Sn=La(ae,Y,re),W&&ae.isNodeMaterial&&W.onUpdateProgram(ae,Sn,Xe));let ni=!1,Ri=!1,ii=!1;const kt=Sn.getUniforms(),rn=Xe.uniforms;if(E.useProgram(Sn.program)&&(ni=!0,Ri=!0,ii=!0),ae.id!==_e&&(_e=ae.id,Ri=!0),Xe.needsLights){const Bt=vr(U.state.lightProbeGridArray,re);Xe.lightProbeGrid!==Bt&&(Xe.lightProbeGrid=Bt,Ri=!0)}if(ni||Ee!==w){E.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),kt.setValue(q,"projectionMatrix",w.projectionMatrix),kt.setValue(q,"viewMatrix",w.matrixWorldInverse);const Bi=kt.map.cameraPosition;Bi!==void 0&&Bi.setValue(q,We.setFromMatrixPosition(w.matrixWorld)),I.logarithmicDepthBuffer&&kt.setValue(q,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&kt.setValue(q,"isOrthographic",w.isOrthographicCamera===!0),Ee!==w&&(Ee=w,Ri=!0,ii=!0)}if(Xe.needsLights&&(In.state.directionalShadowMap.length>0&&kt.setValue(q,"directionalShadowMap",In.state.directionalShadowMap,me),In.state.spotShadowMap.length>0&&kt.setValue(q,"spotShadowMap",In.state.spotShadowMap,me),In.state.pointShadowMap.length>0&&kt.setValue(q,"pointShadowMap",In.state.pointShadowMap,me)),re.isSkinnedMesh){kt.setOptional(q,re,"bindMatrix"),kt.setOptional(q,re,"bindMatrixInverse");const Bt=re.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),kt.setValue(q,"boneTexture",Bt.boneTexture,me))}re.isBatchedMesh&&(kt.setOptional(q,re,"batchingTexture"),kt.setValue(q,"batchingTexture",re._matricesTexture,me),kt.setOptional(q,re,"batchingIdTexture"),kt.setValue(q,"batchingIdTexture",re._indirectTexture,me),kt.setOptional(q,re,"batchingColorTexture"),re._colorsTexture!==null&&kt.setValue(q,"batchingColorTexture",re._colorsTexture,me));const wi=oe.morphAttributes;if((wi.position!==void 0||wi.normal!==void 0||wi.color!==void 0)&&Z.update(re,oe,Sn),(Ri||Xe.receiveShadow!==re.receiveShadow)&&(Xe.receiveShadow=re.receiveShadow,kt.setValue(q,"receiveShadow",re.receiveShadow)),(ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial)&&ae.envMap===null&&Y.environment!==null&&(rn.envMapIntensity.value=Y.environmentIntensity),rn.dfgLUT!==void 0&&(rn.dfgLUT.value=JA()),Ri){if(kt.setValue(q,"toneMappingExposure",H.toneMappingExposure),Xe.needsLights&&mn(rn,ii),Be&&ae.fog===!0&&ke.refreshFogUniforms(rn,Be),ke.refreshMaterialUniforms(rn,ae,he,fe,U.state.transmissionRenderTarget[w.id]),Xe.needsLights&&Xe.lightProbeGrid){const Bt=Xe.lightProbeGrid;rn.probesSH.value=Bt.texture,rn.probesMin.value.copy(Bt.boundingBox.min),rn.probesMax.value.copy(Bt.boundingBox.max),rn.probesResolution.value.copy(Bt.resolution)}cu.upload(q,ea(Xe),rn,me)}if(ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(cu.upload(q,ea(Xe),rn,me),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&kt.setValue(q,"center",re.center),kt.setValue(q,"modelViewMatrix",re.modelViewMatrix),kt.setValue(q,"normalMatrix",re.normalMatrix),kt.setValue(q,"modelMatrix",re.matrixWorld),ae.uniformsGroups!==void 0){const Bt=ae.uniformsGroups;for(let Bi=0,Oa=Bt.length;Bi<Oa;Bi++){const xr=Bt[Bi];Ae.update(xr,Sn),Ae.bind(xr,Sn)}}return Sn}function mn(w,Y){w.ambientLightColor.needsUpdate=Y,w.lightProbe.needsUpdate=Y,w.directionalLights.needsUpdate=Y,w.directionalLightShadows.needsUpdate=Y,w.pointLights.needsUpdate=Y,w.pointLightShadows.needsUpdate=Y,w.spotLights.needsUpdate=Y,w.spotLightShadows.needsUpdate=Y,w.rectAreaLights.needsUpdate=Y,w.hemisphereLights.needsUpdate=Y}function xl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(w,Y,oe){const ae=se.get(w);ae.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),se.get(w.texture).__webglTexture=Y,se.get(w.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:oe,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,Y){const oe=se.get(w);oe.__webglFramebuffer=Y,oe.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(w,Y=0,oe=0){ee=w,B=Y,V=oe;let ae=null,re=!1,Be=!1;if(w){const Fe=se.get(w);if(Fe.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(q.FRAMEBUFFER,Fe.__webglFramebuffer),O.copy(w.viewport),Q.copy(w.scissor),Se=w.scissorTest,E.viewport(O),E.scissor(Q),E.setScissorTest(Se),_e=-1;return}else if(Fe.__webglFramebuffer===void 0)me.setupRenderTarget(w);else if(Fe.__hasExternalTextures)me.rebindTextures(w,se.get(w.texture).__webglTexture,se.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const rt=w.depthTexture;if(Fe.__boundDepthTexture!==rt){if(rt!==null&&se.has(rt)&&(w.width!==rt.image.width||w.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(w)}}const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Be=!0);const Ye=se.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ye[Y])?ae=Ye[Y][oe]:ae=Ye[Y],re=!0):w.samples>0&&me.useMultisampledRTT(w)===!1?ae=se.get(w).__webglMultisampledFramebuffer:Array.isArray(Ye)?ae=Ye[oe]:ae=Ye,O.copy(w.viewport),Q.copy(w.scissor),Se=w.scissorTest}else O.copy(Pe).multiplyScalar(he).floor(),Q.copy(De).multiplyScalar(he).floor(),Se=He;if(oe!==0&&(ae=ce),E.bindFramebuffer(q.FRAMEBUFFER,ae)&&E.drawBuffers(w,ae),E.viewport(O),E.scissor(Q),E.setScissorTest(Se),re){const Fe=se.get(w.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Fe.__webglTexture,oe)}else if(Be){const Fe=Y;for(let Ke=0;Ke<w.textures.length;Ke++){const Ye=se.get(w.textures[Ke]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Ke,Ye.__webglTexture,oe,Fe)}}else if(w!==null&&oe!==0){const Fe=se.get(w.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Fe.__webglTexture,oe)}_e=-1},this.readRenderTargetPixels=function(w,Y,oe,ae,re,Be,Ze,Fe=0){if(!(w&&w.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=se.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ke=Ke[Ze]),Ke){E.bindFramebuffer(q.FRAMEBUFFER,Ke);try{const Ye=w.textures[Fe],rt=Ye.format,gt=Ye.type;if(w.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Fe),!I.textureFormatReadable(rt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!I.textureTypeReadable(gt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=w.width-ae&&oe>=0&&oe<=w.height-re&&q.readPixels(Y,oe,ae,re,Ne.convert(rt),Ne.convert(gt),Be)}finally{const Ye=ee!==null?se.get(ee).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(w,Y,oe,ae,re,Be,Ze,Fe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ke=se.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ke=Ke[Ze]),Ke)if(Y>=0&&Y<=w.width-ae&&oe>=0&&oe<=w.height-re){E.bindFramebuffer(q.FRAMEBUFFER,Ke);const Ye=w.textures[Fe],rt=Ye.format,gt=Ye.type;if(w.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Fe),!I.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!I.textureTypeReadable(gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,tt),q.bufferData(q.PIXEL_PACK_BUFFER,Be.byteLength,q.STREAM_READ),q.readPixels(Y,oe,ae,re,Ne.convert(rt),Ne.convert(gt),0);const Nt=ee!==null?se.get(ee).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,Nt);const an=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await jM(q,an,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,tt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Be),q.deleteBuffer(tt),q.deleteSync(an),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,Y=null,oe=0){const ae=Math.pow(2,-oe),re=Math.floor(w.image.width*ae),Be=Math.floor(w.image.height*ae),Ze=Y!==null?Y.x:0,Fe=Y!==null?Y.y:0;me.setTexture2D(w,0),q.copyTexSubImage2D(q.TEXTURE_2D,oe,0,0,Ze,Fe,re,Be),E.unbindTexture()},this.copyTextureToTexture=function(w,Y,oe=null,ae=null,re=0,Be=0){let Ze,Fe,Ke,Ye,rt,gt,tt,Nt,an;const jt=w.isCompressedTexture?w.mipmaps[Be]:w.image;if(oe!==null)Ze=oe.max.x-oe.min.x,Fe=oe.max.y-oe.min.y,Ke=oe.isBox3?oe.max.z-oe.min.z:1,Ye=oe.min.x,rt=oe.min.y,gt=oe.isBox3?oe.min.z:0;else{const rn=Math.pow(2,-re);Ze=Math.floor(jt.width*rn),Fe=Math.floor(jt.height*rn),w.isDataArrayTexture?Ke=jt.depth:w.isData3DTexture?Ke=Math.floor(jt.depth*rn):Ke=1,Ye=0,rt=0,gt=0}ae!==null?(tt=ae.x,Nt=ae.y,an=ae.z):(tt=0,Nt=0,an=0);const Vt=Ne.convert(Y.format),Gt=Ne.convert(Y.type);let Xe;Y.isData3DTexture?(me.setTexture3D(Y,0),Xe=q.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(me.setTexture2DArray(Y,0),Xe=q.TEXTURE_2D_ARRAY):(me.setTexture2D(Y,0),Xe=q.TEXTURE_2D),E.activeTexture(q.TEXTURE0),E.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Y.flipY),E.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),E.pixelStorei(q.UNPACK_ALIGNMENT,Y.unpackAlignment);const In=E.getParameter(q.UNPACK_ROW_LENGTH),St=E.getParameter(q.UNPACK_IMAGE_HEIGHT),Sn=E.getParameter(q.UNPACK_SKIP_PIXELS),ni=E.getParameter(q.UNPACK_SKIP_ROWS),Ri=E.getParameter(q.UNPACK_SKIP_IMAGES);E.pixelStorei(q.UNPACK_ROW_LENGTH,jt.width),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,jt.height),E.pixelStorei(q.UNPACK_SKIP_PIXELS,Ye),E.pixelStorei(q.UNPACK_SKIP_ROWS,rt),E.pixelStorei(q.UNPACK_SKIP_IMAGES,gt);const ii=w.isDataArrayTexture||w.isData3DTexture,kt=Y.isDataArrayTexture||Y.isData3DTexture;if(w.isDepthTexture){const rn=se.get(w),wi=se.get(Y),Bt=se.get(rn.__renderTarget),Bi=se.get(wi.__renderTarget);E.bindFramebuffer(q.READ_FRAMEBUFFER,Bt.__webglFramebuffer),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Oa=0;Oa<Ke;Oa++)ii&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,se.get(w).__webglTexture,re,gt+Oa),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,se.get(Y).__webglTexture,Be,an+Oa)),q.blitFramebuffer(Ye,rt,Ze,Fe,tt,Nt,Ze,Fe,q.DEPTH_BUFFER_BIT,q.NEAREST);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(re!==0||w.isRenderTargetTexture||se.has(w)){const rn=se.get(w),wi=se.get(Y);E.bindFramebuffer(q.READ_FRAMEBUFFER,ue),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,K);for(let Bt=0;Bt<Ke;Bt++)ii?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,rn.__webglTexture,re,gt+Bt):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,rn.__webglTexture,re),kt?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,wi.__webglTexture,Be,an+Bt):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,wi.__webglTexture,Be),re!==0?q.blitFramebuffer(Ye,rt,Ze,Fe,tt,Nt,Ze,Fe,q.COLOR_BUFFER_BIT,q.NEAREST):kt?q.copyTexSubImage3D(Xe,Be,tt,Nt,an+Bt,Ye,rt,Ze,Fe):q.copyTexSubImage2D(Xe,Be,tt,Nt,Ye,rt,Ze,Fe);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else kt?w.isDataTexture||w.isData3DTexture?q.texSubImage3D(Xe,Be,tt,Nt,an,Ze,Fe,Ke,Vt,Gt,jt.data):Y.isCompressedArrayTexture?q.compressedTexSubImage3D(Xe,Be,tt,Nt,an,Ze,Fe,Ke,Vt,jt.data):q.texSubImage3D(Xe,Be,tt,Nt,an,Ze,Fe,Ke,Vt,Gt,jt):w.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Be,tt,Nt,Ze,Fe,Vt,Gt,jt.data):w.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Be,tt,Nt,jt.width,jt.height,Vt,jt.data):q.texSubImage2D(q.TEXTURE_2D,Be,tt,Nt,Ze,Fe,Vt,Gt,jt);E.pixelStorei(q.UNPACK_ROW_LENGTH,In),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,St),E.pixelStorei(q.UNPACK_SKIP_PIXELS,Sn),E.pixelStorei(q.UNPACK_SKIP_ROWS,ni),E.pixelStorei(q.UNPACK_SKIP_IMAGES,Ri),Be===0&&Y.generateMipmaps&&q.generateMipmap(Xe),E.unbindTexture()},this.initRenderTarget=function(w){se.get(w).__webglFramebuffer===void 0&&me.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?me.setTextureCube(w,0):w.isData3DTexture?me.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?me.setTexture2DArray(w,0):me.setTexture2D(w,0),E.unbindTexture()},this.resetState=function(){B=0,V=0,ee=null,E.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ct._getUnpackColorSpace()}}const tu=s=>`/games/keloglan-altin-tavuk/assets/${s}`,nu={road:tu("generated/cobblestone-albedo.webp"),keloglan:tu("generated/keloglan-seated.webp"),chicken:tu("chicken.webp"),village:tu("village-run-background.webp")};function bu(s,e=!0,i=!0){s.traverse(r=>{r.isMesh&&(r.castShadow=e,r.receiveShadow=i)})}function eT(s,e){const i=new Ki,r=new Ut(new gl(.56,.15,12,28),s);r.rotation.y=Math.PI/2,i.add(r);const l=new Ut(new mr(.16,.16,.34,16),e);l.rotation.z=Math.PI/2,i.add(l);for(let c=0;c<8;c+=1){const h=new Ut(new Fi(.09,.82,.08),s);h.rotation.x=c/8*Math.PI,i.add(h)}return i}function tT(s){const e=new Ki,i=new bi({color:7684128,roughness:.72,metalness:.02}),r=new bi({color:11889199,roughness:.62,metalness:.01}),l=new bi({color:3877410,roughness:.42,metalness:.55}),c=new Ut(new Fi(3.1,.28,2.4),i);c.position.y=.78,e.add(c);for(let _=-2;_<=2;_+=1){const g=new Ut(new Fi(2.85,.16,.4),_%2?i:r);g.position.set(0,1.02,_*.4),g.rotation.y=_*.012,e.add(g)}for(const _ of[-1.35,1.35]){const g=new Ut(new Fi(.18,1.12,2.3),i);g.position.set(_,1.47,-.05),g.rotation.z=_*-.035,e.add(g)}const h=new Ut(new mr(.1,.1,3.25,12),r);h.rotation.z=Math.PI/2,h.position.set(0,2.28,-.42),e.add(h);const p=new Ut(new mr(.08,.08,4.05,10),l);p.rotation.z=Math.PI/2,p.position.set(0,.66,.68),e.add(p);const m=[];for(const _ of[-.73,.73])for(const g of[-1.72,1.72]){const S=eT(r,l);S.position.set(g,.63,_),e.add(S),m.push(S)}const d=new hv(new y0({map:s,transparent:!0,depthWrite:!1,alphaTest:.08,toneMapped:!1}));d.position.set(0,2.72,.2),d.scale.set(3.65,3.65,1),e.add(d);const x=new Ut(new pl(2.1,36),new fr({color:328965,transparent:!0,opacity:.34,depthWrite:!1}));return x.rotation.x=-Math.PI/2,x.position.y=.03,x.scale.set(1.35,.62,1),e.add(x),bu(e,!0,!0),d.castShadow=!1,x.castShadow=!1,e.userData.wheels=m,e.userData.character=d,e}function nT(s,e,i){const r=new Ki,l=new Ut(new mr(.07,.1,3.5,8),e);l.position.y=1.75,r.add(l);const c=new Ut(new Fi(.7,.08,.08),e);c.position.set(s*-.27,3.35,0),r.add(c);const h=new Ut(new mr(.24,.38,.65,6),i);h.position.set(s*-.55,3,0),r.add(h);const p=new Mv(16751165,5.2,12,2);return p.position.copy(h.position),r.add(p),r}function iT(s,e){const i=new Ki,r=new Ut(new gl(.58,.12,12,32),s);i.add(r);const l=new Ut(new mr(.51,.51,.12,28),s);l.rotation.x=Math.PI/2,i.add(l);const c=new Ut(new A0(.25,0),e);c.scale.y=1.4,c.position.z=.1,i.add(c);const h=new Mv(16761405,5,5,2);return i.add(h),bu(i,!0,!1),i}function aT(s,e){const i=[new nt(.05,0),new nt(.62,.08),new nt(.78,.62),new nt(.72,1.25),new nt(.46,1.63),new nt(.42,1.9),new nt(.62,2)],r=new Ki,l=new Ut(new b0(i,28),s);r.add(l);const c=new Ut(new gl(.67,.075,8,24),e);return c.rotation.x=Math.PI/2,c.position.y=.93,r.add(c),bu(r,!0,!0),r}function rT(){const e=new Float32Array(690);for(let l=0;l<230;l+=1)e[l*3]=(Math.random()-.5)*22,e[l*3+1]=Math.random()*7.5,e[l*3+2]=-Math.random()*100+9;const i=new Pn;i.setAttribute("position",new Ti(e,3));const r=new pv({color:16767124,size:.045,transparent:!0,opacity:.42,depthWrite:!1,blending:gd});return new BS(i,r)}function sT({worldStateRef:s}){const e=T.useRef(null);return T.useEffect(()=>{const i=e.current;if(!i)return;const r=new $A({antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio,1.8)),r.setSize(i.clientWidth,i.clientHeight,!1),r.shadowMap.enabled=!0,r.shadowMap.type=k_,r.outputColorSpace=Nn,r.toneMapping=u0,r.toneMappingExposure=1.17,i.appendChild(r.domElement);const l=new wS;l.fog=new S0(1516600,.0125);const c=new di(46,i.clientWidth/i.clientHeight,.1,250);c.position.set(0,6.4,12.5),c.lookAt(0,2.1,-17);const h=new jS,p=h.load(nu.road);p.colorSpace=Nn,p.wrapS=p.wrapT=uu,p.repeat.set(3.2,34),p.anisotropy=Math.min(r.capabilities.getMaxAnisotropy(),8);const m=h.load(nu.village);m.colorSpace=Nn;const d=new Ut(new Wr(160,90),new fr({map:m,fog:!1}));d.position.set(0,14.2,-86),l.add(d);const x=new Ut(new pl(3.8,48),new fr({color:16311738,transparent:!0,opacity:.15,fog:!1}));x.position.set(20,25,-82),l.add(x),l.add(new JS(9021915,4006936,2.65));const _=new n_(16764810,4.2);_.position.set(-8,16,12),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),_.shadow.camera.left=-16,_.shadow.camera.right=16,_.shadow.camera.top=18,_.shadow.camera.bottom=-10,l.add(_);const g=new n_(6197224,2.8);g.position.set(12,10,-20),l.add(g);const S=new bi({map:p,color:10716270,roughness:.9,metalness:0}),A=new Ut(new Wr(16.5,220,1,1),S);A.rotation.x=-Math.PI/2,A.position.set(0,0,-85),A.receiveShadow=!0,l.add(A);const D=new bi({color:1646107,roughness:1});for(const fe of[-17.25,17.25]){const he=new Ut(new Wr(18,220),D);he.rotation.x=-Math.PI/2,he.position.set(fe,-.08,-85),he.receiveShadow=!0,l.add(he)}const y=new bi({color:5326395,roughness:.96}),M=new bi({color:7758672,roughness:.94}),N=new bi({color:1453348,roughness:.88}),z=new bi({color:2893090,metalness:.7,roughness:.4}),R=new fr({color:16757312,toneMapped:!1}),F=[];for(let fe=0;fe<12;fe+=1)for(const he of[-1,1]){const Le=new Ki,et=new Ut(new Fi(5.5,1.15,2.4),y);et.position.set(he*10.9,.55,0),et.rotation.y=he*.04,Le.add(et);for(let Pe=-2;Pe<=2;Pe+=1){const De=new Ut(new _u(.56+Pe%2*.06,0),M);De.scale.set(1.35,.55,.75),De.position.set(he*10.9+Pe*1.05,1.15+Math.abs(Pe%2)*.08,0),De.rotation.set(Pe*.08,Pe*.21,Pe*.04),Le.add(De)}if(fe%3===1){const Pe=new Ut(new _u(1.45,1),N);Pe.scale.set(1.35,1,.85),Pe.position.set(he*12.15,1.35,.7),Le.add(Pe)}if(fe%2===0){const Pe=nT(he,z,R);Pe.position.x=he*8.45,Le.add(Pe)}bu(Le,!0,!0),Le.position.z=-12-fe*13-(he>0?5:0),l.add(Le),F.push(Le)}const U=h.load(nu.keloglan);U.colorSpace=Nn;const P=tT(U);P.position.set(0,0,3.25),P.rotation.y=Math.PI,l.add(P);const b=h.load(nu.chicken);b.colorSpace=Nn;const L=new hv(new y0({map:b,transparent:!0,alphaTest:.08,depthWrite:!1,toneMapped:!1}));L.scale.set(2.55,2.55,1),L.position.set(0,1.45,-17),l.add(L);const H=new Ut(new pl(.85,24),new fr({color:0,transparent:!0,opacity:.3,depthWrite:!1}));H.rotation.x=-Math.PI/2,H.position.set(0,.03,-17),l.add(H);const k=new bi({color:16761666,emissive:9256709,emissiveIntensity:1.35,metalness:.78,roughness:.24}),W=new fr({color:16773020,toneMapped:!1}),ce=new bi({color:10898732,roughness:.75}),ue=new bi({color:5580831,roughness:.8}),K=new Map,B=rT();l.add(B);const V=()=>{const fe=i.clientWidth,he=i.clientHeight;c.aspect=fe/Math.max(1,he),c.fov=fe<720?58:46,c.updateProjectionMatrix(),r.setSize(fe,he,!1)},ee=new ResizeObserver(V);ee.observe(i),V();const _e=new iy;let Ee=0,O=0,Q=0,Se=0,Te=0,Re=0;const te=()=>{Ee=requestAnimationFrame(te);const fe=Math.min(_e.getDelta(),.04),he=s.current,Le=he.phase==="playing"||he.phase==="countdown"||he.phase==="menu",et=he.phase==="playing"?he.worldSpeed:he.phase==="paused"?0:6.5;Le&&(O+=et*fe),p.offset.y=-O*.022,B.position.z=O*.68%15,Q-=et*fe*1.25,P.userData.wheels.forEach(ft=>{ft.rotation.x=Q});for(const ft of F)Le&&(ft.position.z+=et*fe),ft.position.z>18&&(ft.position.z-=158);Se=Ko.lerp(Se,he.lane*3.25,1-Math.pow(4e-4,fe));const Pe=he.jumpHeight||0,De=Ko.clamp((he.lane*3.25-Se)*.08,-.13,.13);P.position.x=Se,P.position.y=Pe+Math.sin(O*1.85)*.035,P.rotation.z=-De+Math.sin(O*2.55)*.008,P.rotation.x=Pe>.1?-Math.sin(Math.min(1,Pe/2.3)*Math.PI)*.05:0,P.userData.character.position.y=2.72+Math.sin(O*1.85+.8)*.04,L.position.x=Math.sin(O*.085)*2.05,L.position.y=1.47+Math.abs(Math.sin(O*.7))*.24,L.material.rotation=Math.sin(O*.32)*.06,H.position.x=L.position.x,H.scale.setScalar(1-(L.position.y-1.47)*.85);const He=new Set;for(const ft of he.objects){He.add(ft.id);let Mt=K.get(ft.id);Mt||(Mt=ft.type==="coin"?iT(k,W):aT(ce,ue),Mt.userData.type=ft.type,l.add(Mt),K.set(ft.id,Mt)),Mt.position.set(ft.lane*3.25,ft.type==="coin"?1.55+Math.sin(O*.12+ft.id)*.2:.05,ft.z),ft.type==="coin"?(Mt.rotation.y+=fe*3.8,Mt.rotation.z=Math.sin(O*.16+ft.id)*.15):Mt.rotation.y+=fe*.55,Mt.visible=!ft.collected}for(const[ft,Mt]of K)He.has(ft)||(l.remove(Mt),K.delete(ft));he.impactAt!==Te&&(Te=he.impactAt,Re=.65),Re=Math.max(0,Re-fe*2.8);const je=Re?(Math.random()-.5)*Re:0,mt=Re?(Math.random()-.5)*Re*.48:0,ot=i.clientWidth<720,Lt=ot?.52:.1,We=ot?.38:.08;c.position.x=Ko.lerp(c.position.x,Se*Lt+je,.09),c.position.y=6.4+Pe*.055+mt,c.position.z=he.boosting?13.8:12.5,c.fov=Ko.lerp(c.fov,(i.clientWidth<720?58:46)+(he.boosting?5.5:0),.05),c.updateProjectionMatrix(),c.lookAt(Se*We,2.05,-17),c.rotation.z+=-De*.35,r.toneMappingExposure=Ko.lerp(r.toneMappingExposure,he.boosting?1.35:1.17,.05),r.render(l,c)};return te(),()=>{cancelAnimationFrame(Ee),ee.disconnect();for(const fe of K.values())l.remove(fe);l.traverse(fe=>{fe.geometry&&fe.geometry.dispose(),fe.material&&(Array.isArray(fe.material)?fe.material:[fe.material]).forEach(Le=>Le.dispose())}),p.dispose(),m.dispose(),U.dispose(),b.dispose(),r.dispose(),r.domElement.remove()}},[s]),be.jsx("div",{className:"world-canvas",ref:e,"aria-hidden":"true"})}const Cv=s=>`/games/keloglan-altin-tavuk/assets/${s}`,oT=Cv("keloglan-theme.mp3"),iu=[{name:"Masal Yolculuğu",label:"Sakin bir başlangıç",speed:13.5,obstacleChance:.24,distance:720},{name:"Köy Yarışı",label:"Macera tam gaz",speed:16.5,obstacleChance:.34,distance:900},{name:"Ay Şimşeği",label:"Hızlı ve çılgın",speed:20,obstacleChance:.43,distance:1080}],lT={phase:"menu",lane:0,jumpHeight:0,objects:[],worldSpeed:6.5,boosting:!1,impactAt:0};function md(s,e,i){return Math.max(e,Math.min(i,s))}function cT(s){const e=T.useRef(null);return T.useCallback(i=>{if(!s.current)return;const r=window.AudioContext||window.webkitAudioContext;if(!r)return;const l=e.current||new r;e.current=l;const c=l.currentTime,h=l.createOscillator(),p=l.createGain();h.connect(p),p.connect(l.destination),i==="coin"?(h.type="sine",h.frequency.setValueAtTime(680,c),h.frequency.exponentialRampToValueAtTime(1180,c+.11),p.gain.setValueAtTime(.12,c),p.gain.exponentialRampToValueAtTime(.001,c+.18),h.start(c),h.stop(c+.19)):i==="jump"?(h.type="triangle",h.frequency.setValueAtTime(220,c),h.frequency.exponentialRampToValueAtTime(470,c+.17),p.gain.setValueAtTime(.08,c),p.gain.exponentialRampToValueAtTime(.001,c+.22),h.start(c),h.stop(c+.23)):(h.type="sawtooth",h.frequency.setValueAtTime(110,c),h.frequency.exponentialRampToValueAtTime(58,c+.2),p.gain.setValueAtTime(.13,c),p.gain.exponentialRampToValueAtTime(.001,c+.24),h.start(c),h.stop(c+.25))},[s])}function uT(){const[s,e]=T.useState("menu"),[i,r]=T.useState(1),[l,c]=T.useState(0),[h,p]=T.useState(0),[m,d]=T.useState(0),[x,_]=T.useState(3),[g,S]=T.useState(iu[1].distance),[A,D]=T.useState(0),[y,M]=T.useState(0),[N,z]=T.useState(3),[R,F]=T.useState(!0),[U,P]=T.useState("ALTIN TAVUĞU YAKALA"),[b,L]=T.useState(()=>Number(window.localStorage.getItem("masalnova-keloglan-best")||0)),H=T.useRef(s),k=T.useRef(0),W=T.useRef(R),ce=T.useRef({...lT}),ue=T.useRef(null),K=T.useRef({start:0,until:0}),B=T.useRef(0),V=T.useRef(null),ee=cT(W),_e=T.useRef({objects:[],nextId:1,spawnIn:.8,score:0,coins:0,energy:3,distance:iu[1].distance,boost:0,combo:0,boostingUntil:0}),Ee=iu[i];T.useEffect(()=>{H.current=s,ce.current.phase=s},[s]),T.useEffect(()=>{var De,He;W.current=R,R?["playing","countdown"].includes(H.current)&&((He=ue.current)==null||He.play().catch(()=>{})):(De=ue.current)==null||De.pause()},[R]);const O=T.useCallback((De,He=920)=>{window.clearTimeout(B.current),P(De),B.current=window.setTimeout(()=>P("ALTIN TAVUĞU YAKALA"),He)},[]),Q=T.useCallback(De=>{var mt;const He=_e.current,je=Math.floor(He.score+(De==="victory"?He.energy*350:0));He.score=je,p(je),e(De),H.current=De,ce.current.phase=De,ce.current.boosting=!1,(mt=ue.current)==null||mt.pause(),L(ot=>{const Lt=Math.max(ot,je);return window.localStorage.setItem("masalnova-keloglan-best",String(Lt)),Lt})},[]),Se=T.useCallback(()=>{const De=iu[i];_e.current={objects:[],nextId:1,spawnIn:.9,score:0,coins:0,energy:3,distance:De.distance,boost:0,combo:0,boostingUntil:0},K.current={start:0,until:0},k.current=0,ce.current={...ce.current,phase:"countdown",lane:0,jumpHeight:0,objects:[],boosting:!1},c(0),p(0),d(0),_(3),S(De.distance),D(0),M(0),z(3),P("SIKI TUTUN"),H.current="countdown",e("countdown"),W.current&&ue.current&&(ue.current.currentTime=0,ue.current.volume=.32,ue.current.play().catch(()=>{}))},[i]),Te=T.useCallback(De=>{var je;if(H.current!=="playing")return;const He=md(k.current+De,-1,1);He!==k.current&&(k.current=He,ce.current.lane=He,c(He),(je=navigator.vibrate)==null||je.call(navigator,16))},[]),Re=T.useCallback(()=>{var He;if(H.current!=="playing"||performance.now()<K.current.until)return;const De=performance.now();K.current={start:De,until:De+870},ee("jump"),O("ZIPLA!",650),(He=navigator.vibrate)==null||He.call(navigator,20)},[ee,O]),te=T.useCallback(()=>{var De,He;H.current==="playing"?(H.current="paused",e("paused"),(De=ue.current)==null||De.pause()):H.current==="paused"&&(H.current="playing",e("playing"),W.current&&((He=ue.current)==null||He.play().catch(()=>{})))},[]),fe=T.useCallback(()=>{var De;H.current="menu",e("menu"),ce.current={...ce.current,phase:"menu",objects:[],jumpHeight:0,boosting:!1},(De=ue.current)==null||De.pause()},[]);T.useEffect(()=>{if(s!=="countdown")return;const De=window.setInterval(()=>{z(He=>He<=1?(window.clearInterval(De),H.current="playing",e("playing"),O("HAYDİ!",800),0):He-1)},720);return()=>window.clearInterval(De)},[s,O]),T.useEffect(()=>{if(s!=="playing")return;let De=0,He=performance.now(),je=0;const mt=ot=>{var q,It;if(H.current!=="playing")return;const Lt=Math.min(.04,(ot-He)/1e3);He=ot;const We=_e.current,ft=ot<We.boostingUntil,Mt=Ee.speed*(ft?1.42:1);let zt=0;if(ot<K.current.until){const ct=md((ot-K.current.start)/(K.current.until-K.current.start),0,1);zt=Math.sin(ct*Math.PI)*2.65}if(We.distance-=Mt*Lt*.82,We.score+=Lt*Mt*(1.05+We.combo*.025)*(ft?1.7:1),We.spawnIn-=Lt,We.spawnIn<=0){const ct=Math.random()<Ee.obstacleChance,I=Math.floor(Math.random()*3)-1;We.objects.push({id:We.nextId++,type:ct?"jar":"coin",lane:I,z:-82,resolved:!1}),!ct&&Math.random()<.36&&We.objects.push({id:We.nextId++,type:"coin",lane:I,z:-91,resolved:!1}),We.spawnIn=(.68+Math.random()*.44)*(16/Ee.speed)}let $t=!1;for(const ct of We.objects)ct.z+=Mt*Lt,!ct.resolved&&ct.z>=2.15&&(ct.resolved=!0,ct.lane===k.current?ct.type==="coin"?(ct.collected=!0,We.coins+=1,We.combo+=1,We.boost=Math.min(100,We.boost+20),We.score+=120+We.combo*12,ee("coin"),O(We.combo>=3?`KOMBO ×${We.combo}`:"YILDIZ PARA +120",760),(q=navigator.vibrate)==null||q.call(navigator,18),We.boost>=100&&!ft&&(We.boost=0,We.boostingUntil=ot+4200,O("AY ŞİMŞEĞİ!",1200))):zt<1.05?(We.energy-=1,We.combo=0,We.boost=Math.max(0,We.boost-28),ce.current.impactAt=ot,ee("hit"),O("DİKKAT!",880),(It=navigator.vibrate)==null||It.call(navigator,[70,35,70]),We.energy<=0&&($t=!0)):(We.score+=80,We.combo+=1,O("KIL PAYI +80",720)):ct.type==="coin"&&(We.combo=Math.max(0,We.combo-1)));if(We.objects=We.objects.filter(ct=>ct.z<18&&!(ct.collected&&ct.z>6)),ce.current={...ce.current,phase:"playing",lane:k.current,jumpHeight:zt,objects:We.objects,worldSpeed:Mt,boosting:ot<We.boostingUntil},ot-je>75&&(je=ot,p(Math.floor(We.score)),d(We.coins),_(We.energy),S(Math.max(0,Math.ceil(We.distance))),D(We.boost),M(We.combo)),$t){Q("gameover");return}if(We.distance<=0){Q("victory");return}De=requestAnimationFrame(mt)};return De=requestAnimationFrame(mt),()=>cancelAnimationFrame(De)},[Ee,Q,s,ee,O]),T.useEffect(()=>{const De=He=>{const je=He.key.toLowerCase();["arrowleft","arrowright","arrowup"," ","a","d","w","p","escape","enter"].includes(je)&&He.preventDefault(),(je==="arrowleft"||je==="a")&&Te(-1),(je==="arrowright"||je==="d")&&Te(1),(je==="arrowup"||je==="w"||je===" ")&&Re(),(je==="p"||je==="escape")&&te(),je==="enter"&&["menu","victory","gameover"].includes(H.current)&&Se()};return window.addEventListener("keydown",De,{passive:!1}),()=>window.removeEventListener("keydown",De)},[Re,Te,Se,te]),T.useEffect(()=>()=>{var De;window.clearTimeout(B.current),(De=ue.current)==null||De.pause()},[]);const he=De=>{V.current={x:De.clientX,y:De.clientY}},Le=De=>{if(!V.current||H.current!=="playing")return;const He=De.clientX-V.current.x,je=De.clientY-V.current.y;V.current=null,Math.abs(He)>38&&Math.abs(He)>Math.abs(je)?Te(He>0?1:-1):je<-34&&Re()},et=md(1-g/Ee.distance,0,1),Pe=["playing","paused","countdown"].includes(s);return be.jsxs("main",{className:`game-shell phase-${s}`,onPointerDown:he,onPointerUp:Le,children:[be.jsx(sT,{worldStateRef:ce}),be.jsx("div",{className:"cinematic-grade"}),be.jsx("div",{className:"speed-vignette","data-active":ce.current.boosting?"true":"false"}),be.jsxs("header",{className:"game-header",children:[be.jsxs("div",{className:"brand-lockup","aria-label":"MasalNova",children:[be.jsx("img",{className:"brand-logo",src:Cv("masalnova-logo.webp"),alt:"MasalNova"}),be.jsx("span",{className:"brand-story",children:"OYUNLAŞTIRILMIŞ BİR MASAL"})]}),be.jsxs("div",{className:"header-actions",children:[Pe&&s!=="countdown"&&be.jsx("button",{className:"icon-button",onClick:te,"aria-label":s==="paused"?"Devam et":"Duraklat",title:s==="paused"?"Devam et":"Duraklat",children:s==="paused"?be.jsx(b1,{weight:"fill"}):be.jsx(dM,{weight:"fill"})}),be.jsx("button",{className:"icon-button",onClick:()=>F(De=>!De),"aria-label":R?"Sesi kapat":"Sesi aç",title:R?"Sesi kapat":"Sesi aç",children:R?be.jsx(pM,{weight:"fill"}):be.jsx(mM,{weight:"fill"})})]})]}),s==="menu"&&be.jsxs("section",{className:"start-screen",children:[be.jsxs("div",{className:"story-intro",children:[be.jsx("p",{className:"chapter-label",children:"BÖLÜM I · GECE YOLCULUĞU"}),be.jsxs("h1",{children:["Keloğlan",be.jsx("br",{}),be.jsx("span",{children:"ve Altın Tavuk"})]}),be.jsx("p",{className:"story-copy",children:"Fenerler yandı, altın tavuk kaçtı. Onu yakalayabilecek tek şey senin eski tahta araban."}),be.jsxs("div",{className:"difficulty-picker","aria-label":"Zorluk seviyesi",children:[be.jsx("button",{onClick:()=>r(De=>(De+2)%3),"aria-label":"Daha kolay",children:be.jsx(cM,{weight:"bold"})}),be.jsxs("div",{children:[be.jsx("span",{children:"YOLCULUK HIZI"}),be.jsx("strong",{children:Ee.name}),be.jsx("small",{children:Ee.label})]}),be.jsx("button",{onClick:()=>r(De=>(De+1)%3),"aria-label":"Daha zor",children:be.jsx(uM,{weight:"bold"})})]}),be.jsxs("button",{className:"cta-button",onClick:Se,children:[be.jsx("span",{children:"YOLA ÇIK"}),be.jsx(y1,{weight:"bold"})]}),be.jsxs("div",{className:"desktop-controls",children:[be.jsxs("span",{children:[be.jsx("kbd",{children:"A"}),be.jsx("kbd",{children:"D"})," YÖNLENDİR"]}),be.jsxs("span",{children:[be.jsx("kbd",{children:"W"})," ZIPLA"]}),b>0&&be.jsxs("span",{children:[be.jsx(_M,{weight:"fill"})," REKOR ",b.toLocaleString("tr-TR")]})]})]}),be.jsxs("div",{className:"mission-card",children:[be.jsx("span",{className:"mission-index",children:"01"}),be.jsxs("div",{children:[be.jsx("small",{children:"GÖREVİN"}),be.jsx("strong",{children:"Altın tavuğu köy meydanına varmadan yakala."})]})]})]}),Pe&&be.jsxs("section",{className:"game-hud","aria-label":"Oyun durumu",children:[be.jsxs("div",{className:"score-cluster",children:[be.jsx("span",{children:"PUAN"}),be.jsx("strong",{children:h.toLocaleString("tr-TR").padStart(5,"0")}),be.jsxs("small",{children:[be.jsx(gM,{weight:"fill"})," ",m," ",y>=3&&be.jsxs("b",{children:["KOMBO ×",y]})]})]}),be.jsxs("div",{className:"mission-progress",children:[be.jsxs("div",{className:"mission-progress-copy",children:[be.jsx("span",{children:"KÖY MEYDANI"}),be.jsxs("strong",{children:[g," m"]})]}),be.jsx("div",{className:"mission-track",children:be.jsx("span",{style:{width:`${et*100}%`}})})]}),be.jsxs("div",{className:"status-cluster",children:[be.jsx("span",{children:"CESARET"}),be.jsx("div",{className:"hearts","aria-label":`${x} can`,children:[0,1,2].map(De=>be.jsx(fM,{weight:De<x?"fill":"regular","data-empty":De>=x},De))}),be.jsxs("small",{children:[be.jsx(hM,{weight:"fill"})," AY ŞİMŞEĞİ ",Math.round(A),"%"]})]}),be.jsx("div",{className:"boost-bar",children:be.jsx("span",{style:{width:`${A}%`}})}),be.jsx("div",{className:"game-message",children:U},U),be.jsxs("div",{className:"lane-indicator",children:[be.jsx("i",{"data-active":l===-1}),be.jsx("i",{"data-active":l===0}),be.jsx("i",{"data-active":l===1})]})]}),s==="countdown"&&be.jsxs("section",{className:"overlay countdown-screen",children:[be.jsx("span",{children:"YOL SENİ BEKLİYOR"}),be.jsx("strong",{children:N},N)]}),s==="paused"&&be.jsxs("section",{className:"overlay pause-screen",children:[be.jsx("p",{children:"BİRAZ NEFES AL"}),be.jsx("h2",{children:"Gece seni bekliyor."}),be.jsxs("button",{className:"cta-button compact",onClick:te,children:[be.jsx(b1,{weight:"fill"})," DEVAM ET"]}),be.jsxs("button",{className:"text-action",onClick:fe,children:[be.jsx(E1,{weight:"fill"})," ANA MENÜYE DÖN"]})]}),(s==="victory"||s==="gameover")&&be.jsxs("section",{className:`overlay result-screen ${s}`,children:[be.jsx("p",{children:s==="victory"?"MASAL TAMAMLANDI":"ARABANIN SANA İHTİYACI VAR"}),be.jsx("h2",{children:s==="victory"?"İşte altın tavuk!":"Geceye bir kez daha mı?"}),be.jsxs("div",{className:"result-stats",children:[be.jsxs("div",{children:[be.jsx("span",{children:"PUAN"}),be.jsx("strong",{children:h.toLocaleString("tr-TR")})]}),be.jsxs("div",{children:[be.jsx("span",{children:"YILDIZ"}),be.jsx("strong",{children:m})]}),be.jsxs("div",{children:[be.jsx("span",{children:"REKOR"}),be.jsx("strong",{children:b.toLocaleString("tr-TR")})]})]}),be.jsxs("button",{className:"cta-button compact",onClick:Se,children:[be.jsx(sM,{weight:"bold"})," BİR TUR DAHA"]}),be.jsxs("button",{className:"text-action",onClick:fe,children:[be.jsx(E1,{weight:"fill"})," ANA MENÜ"]})]}),s==="playing"&&be.jsxs("nav",{className:"touch-controls","aria-label":"Dokunmatik kontroller",children:[be.jsx("button",{onClick:()=>Te(-1),"aria-label":"Sola git",children:be.jsx(oM,{weight:"bold"})}),be.jsx("button",{className:"jump-control",onClick:Re,"aria-label":"Zıpla",children:be.jsx(lM,{weight:"bold"})}),be.jsx("button",{onClick:()=>Te(1),"aria-label":"Sağa git",children:be.jsx(y1,{weight:"bold"})})]}),be.jsx("audio",{ref:ue,src:oT,loop:!0,preload:"auto"}),be.jsx("p",{className:"copyright",children:"© MASALNOVA · KELOĞLAN"})]})}k2.createRoot(document.getElementById("root")).render(be.jsx(I2.StrictMode,{children:be.jsx(uT,{})}));
