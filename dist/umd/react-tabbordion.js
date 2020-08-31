!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.ReactTabbordion=t(require("react"),require("prop-types")):e.ReactTabbordion=t(e.React,e.PropTypes)}(window,function(n,r){return a={},o.m=i=[function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.bemClassName=function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"--",o=e&&e[t]||null
{if(null==o)return null
"string"!=typeof o&&(o=String(o))}var i="",a=o.indexOf(" ")
0<=a&&(i=o.slice(a),o=o.slice(0,a))
var l=" "+o+r
if(i&&r){var c=" "+r
for(a=i.indexOf(c);0<=a;a=i.indexOf(c,a+o.length))i=i.replace(c,l)}return Array.isArray(n)?n.reduce(function(e,t){return null!=t?e+l+t:e},o)+i:o+i}},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addSubscriber=function(t){return function(e){t.includes(e)||t.push(e)}},t.removeSubscriber=function(n){return function(e){var t=n.indexOf(e)
~t&&n.splice(t,1)}}},function(e,t,n){"use strict"
function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.getArray=function(e){return Array.isArray(e)&&0<e.length?e:r},t.getChecked=function(e){return e.checked},t.getDisabled=function(e){return e.disabled},t.getIndex=function(e){return e.index},t.isShallowlyDifferent=o,t.isShallowlyDifferentArray=a
var r=[]
function o(n,r){if(n===r)return!1
if(null==n||null==r)return null!=n||null!=r
if("object"!==i(n)||"object"!==i(r))return!0
var e=Object.keys(n||{}).sort(),o=Object.keys(r||{}).sort()
return e.length!==o.length||e.some(function(e,t){return e!==o[t]||(Array.isArray(n[e])?a(n[e],r[e]):n[e]!==r[e])})}function a(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[]
return e.length!==n.length||e.some(function(e,t){return o(e,n[t])})}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bemClassName",{enumerable:!0,get:function(){return r.bemClassName}}),Object.defineProperty(t,"Tabbordion",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"TabPanel",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"TabLabel",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"TabContent",{enumerable:!0,get:function(){return l.default}})
var r=n(0),o=c(n(6)),i=c(n(7)),a=c(n(8)),l=c(n(9))
function c(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,h=function(e){if(e&&e.__esModule)return e
if(null===e||"object"!==l(e)&&"function"!=typeof e)return{default:e}
var t=a()
if(t&&t.has(e))return t.get(e)
var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e){var i
Object.prototype.hasOwnProperty.call(e,o)&&((i=r?Object.getOwnPropertyDescriptor(e,o):null)&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o])}n.default=e,t&&t.set(e,n)
return n}(n(1)),o=(r=n(2))&&r.__esModule?r:{default:r},i=n(3),y=n(4)
function a(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return a=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{}
var n,r=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),i=0;i<o.length;i++)n=o[i],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])
return r}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(i){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()
return function(){var e,t,n,r,o=p(i)
return t=a?(e=p(this).constructor,Reflect.construct(o,arguments,e)):o.apply(this,arguments),n=this,!(r=t)||"object"!==l(r)&&"function"!=typeof r?b(n):r}}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var m=0,g=0
function v(e){return{bemModifiers:e.bemModifiers,bemSeparator:e.bemSeparator,blockElements:e.blockElements}}function O(e,t,n){var r=(0,y.getArray)(n.stateful?n.panels:t.panels)
return{animateContent:t.animateContent,checkedPanels:r.filter(y.getChecked).map(y.getIndex),disabledPanels:r.filter(y.getDisabled).map(y.getIndex),firstVisiblePanel:e.firstVisibleIndex,lastVisiblePanel:e.lastVisibleIndex,panelName:t.name||e.uniqId,panelType:"multiple"===t.mode?"checkbox":"radio",tabbordionId:t.id||e.uniqId}}function P(e){return e}var j=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(o,h.PureComponent)
var e,t,n,r=d(o)
function o(e){var t
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),t=r.call(this,e),m++,t.uniqId="tabbordion-".concat(g),g++,t.getNextState=t.getNextState.bind(b(t)),t.onChange=t.onChange.bind(b(t)),t.firstVisibleIndex=null,t.lastVisibleIndex=null,t.state=t.getNextState(e,{stateful:!1},Array.isArray(e.panels)?e.panels:e.initialPanels),t.subscribers={bem:[],tabbordion:[]},t.childContext={bem:{getState:function(){return t.bemState},subscribe:(0,i.addSubscriber)(t.subscribers.bem),unsubscribe:(0,i.removeSubscriber)(t.subscribers.bem)},tabbordion:{getState:function(){return t.tabbordionState},onChangePanel:t.onChange,subscribe:(0,i.addSubscriber)(t.subscribers.tabbordion),unsubscribe:(0,i.removeSubscriber)(t.subscribers.tabbordion)}},t.bemState=v(e),t.tabbordionState=O(b(t),e,t.state),t}return e=o,(t=[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.getNextState(e,this.state)
t!==this.state&&this.setState(t)
var n=v(e);(0,y.isShallowlyDifferent)(n,this.bemState)&&(this.subscribers.bem.forEach(function(e){return e.forceUpdate()}),this.bemState=n)
var r=O(this,e,t);(0,y.isShallowlyDifferent)(r,this.tabbordionState)&&(this.subscribers.tabbordion.forEach(function(e){return e.forceUpdate()}),this.tabbordionState=r)}},{key:"componentWillUnmount",value:function(){0===--m&&(g=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getNextState",value:function(e,t,n){for(var a=(0,y.getArray)(t.stateful?t.panels:n||e.panels),o=[],i=[],l=[],c="multiple"===e.mode,u=[e.children];u.length;)h.Children.forEach(u.shift(),function(e){var t,n,r
null!=e&&e.type&&(t=e.props||e._store&&e._store.props||{},e.type===h.default.Fragment&&t.children?u.push(t.children):e.type.contextTypes&&e.type.contextTypes.tabbordion&&((r=!1===(n=null!=t.index&&t.index)||i.includes(n))?l.push(o.length):i.push(n),o.push({checked:t.checked,disabled:t.disabled,index:!r&&n,visible:t.visible})))})
for(var r=0;0<l.length;){for(;i.includes(r);)r++
o[l.shift()].index=r,r++}var s=0,f=null,d=null,b=o.map(function(t,e){var n=a.find(function(e){return e.index===t.index})||{checked:r,disabled:o,visible:i},r=(null!=t.checked?t.checked:!!n.checked)&&(c||0===s),o=null!=t.disabled?t.disabled:!!n.disabled,i=null!=t.visible?t.visible:!1!==n.visible
return i&&(d=e,null==f&&(f=d)),r&&i&&s++,{checked:r,disabled:o,index:t.index,visible:i}})
null!=f&&(0===s&&"multiple"!==e.mode&&"toggle"!==e.mode&&(b[f].checked=!0),f=b[f].index,d=b[d].index),this.firstVisibleIndex=f,this.lastVisibleIndex=d
var p=!e.onChange||!e.onPanels||!Array.isArray(e.panels)
if(p){if(!t.stateful||(0,y.isShallowlyDifferentArray)(t.panels,b))return e.onPanels&&e.onPanels(b),{panels:b,stateful:p}}else if((0,y.isShallowlyDifferentArray)(a,b)&&e.onPanels(b),t.stateful)return{panels:null,stateful:p}
return t}},{key:"onChange",value:function(t){var e=this.props.mode
if(this.state.stateful){var n=this.state.panels.find(function(e){return e.index===t})
if(null==n)throw new Error("Unexpected invalid panel index: "+t)
var r=!1
switch(e){case"toggle":this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1)}),n.checked=!n.checked,r=!0
break
case"multiple":n.checked=!n.checked,r=!0
break
default:this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1,r=!0)}),n.checked||(n.checked=!0,r=!0)}r&&this.setState({panels:this.state.panels.slice(0)})}else this.props.onChange({index:t,mode:e})}},{key:"render",value:function(){for(var e=this.props,t=(e.animateContent,e.children),n=e.component,r=(e.bemModifiers,e.bemSeparator,e.blockElements,e.component,e.initialPanels,e.mode,e.name,e.onChange,e.onPanels,e.panels),o=s(e,["animateContent","children","component","bemModifiers","bemSeparator","blockElements","component","initialPanels","mode","name","onChange","onPanels","panels"]),i=0,a=this.state.stateful?this.state.panels:r,l=[t],c=[];l.length;)h.Children.forEach(l.shift(),function(e){var t
null!=e&&e.type?e.type===h.default.Fragment?l.push(e.props.children):e.type.contextTypes&&e.type.contextTypes.tabbordion?(t=h.default.cloneElement(e,a[i]),i++,c.push(t)):c.push(e):c.push(e)})
return h.default.createElement(n,u({},o,{role:"tablist"}),h.Children.map(c,P))}}])&&c(e.prototype,t),n&&c(e,n),o}()
j.childContextTypes={bem:o.default.object,tabbordion:o.default.object},j.defaultProps={animateContent:!1,bemModifiers:{animated:"animated",between:"between",checked:"checked",content:"content",disabled:"disabled",enabled:"enabled",first:"first",hidden:"hidden",last:"last",noContent:"no-content",unchecked:"unchecked"},bemSeparator:"--",blockElements:{animator:"panel__animator",content:"panel__content",label:"panel__label",panel:"panel"},component:"ul",mode:"single"},j.propTypes={animateContent:o.default.oneOf([!1,"height","marginTop"]),bemModifiers:o.default.shape({between:o.default.string,checked:o.default.string,content:o.default.string,disabled:o.default.string,enabled:o.default.string,first:o.default.string,hidden:o.default.string,last:o.default.string,noContent:o.default.string,unchecked:o.default.string}),bemSeparator:o.default.string,blockElements:o.default.shape({content:o.default.string,label:o.default.string,panel:o.default.string}),children:o.default.node,className:o.default.string,component:o.default.oneOfType([o.default.func,o.default.object,o.default.string]),id:o.default.string,initialPanels:o.default.arrayOf(o.default.shape({checked:o.default.bool,disabled:o.default.bool,index:o.default.number,visible:o.default.bool})),mode:o.default.oneOf(["single","toggle","multiple"]),name:o.default.string,onChange:o.default.func,onPanels:o.default.func,panels:o.default.arrayOf(o.default.shape({checked:o.default.bool,disabled:o.default.bool,index:o.default.number,visible:o.default.bool}))},t.default=j},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,W=function(e){if(e&&e.__esModule)return e
if(null===e||"object"!==l(e)&&"function"!=typeof e)return{default:e}
var t=a()
if(t&&t.has(e))return t.get(e)
var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e){var i
Object.prototype.hasOwnProperty.call(e,o)&&((i=r?Object.getOwnPropertyDescriptor(e,o):null)&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o])}n.default=e,t&&t.set(e,n)
return n}(n(1)),o=(r=n(2))&&r.__esModule?r:{default:r},i=n(3),O=n(0),L=n(4)
function a(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return a=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(i){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()
return function(){var e,t,n,r,o=d(i)
return t=a?(e=d(this).constructor,Reflect.construct(o,arguments,e)):o.apply(this,arguments),n=this,!(r=t)||"object"!==l(r)&&"function"!=typeof r?f(n):r}}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function U(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return
if("string"==typeof e)return b(e,t)
var n=Object.prototype.toString.call(e).slice(8,-1)
"Object"===n&&e.constructor&&(n=e.constructor.name)
if("Map"===n||"Set"===n)return Array.from(e)
if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n]
return r}function p(t,e){var n,r=Object.keys(t)
return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function q(o){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{}
e%2?p(Object(i),!0).forEach(function(e){var t,n,r
t=o,r=i[n=e],n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(i)):p(Object(i)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(i,e))})}return o}function V(e,t){if(null==e)return{}
var n,r=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),i=0;i<o.length;i++)n=o[i],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])
return r}var h=0,y=0
function m(e,t,n){for(var r=t.bem,o=t.tabbordion,i=e.checked,a=e.disabled,l=e.id,c=e.index,u=e.modifiers,s=e.name,f=e.type,d=e.value,b=e.visible,p=V(e,["checked","disabled","id","index","modifiers","name","type","value","visible"]),h=o.getState(),y=h.animateContent,m=h.checkedPanels,g=h.disabledPanels,v=h.firstVisiblePanel,O=h.lastVisiblePanel,P=h.panelName,j=h.panelType,k=h.tabbordionId,S=(0,L.getArray)(m),x=(0,L.getArray)(g),w=(null!=s?s:P)||k||"tabbordion-panel-".concat(n),C=l||"".concat(k||w,"-").concat(c),_=null!=i?i:S.includes(c),E=null!=a?a:x.includes(c),T=!1===b?"hidden":(v===c?"first":O===c&&"last")||"between",R=null,M=null,D=[p.children];!R&&D.length;)W.Children.forEach(D.shift(),function(e){var t
!R&&e&&e.type&&(t=e.props||e._store&&e._store.props||{},e.type===W.default.Fragment?D.push(t.children):e.type.hasContent&&(M=!0,R=t.id||null))})
R=R||"".concat(C,"-content")
var I=r.getState(),N=I.bemModifiers,A=I.bemSeparator,z=I.blockElements
return q(q({},p),{},{animateContent:y,bemModifiers:N,bemSeparator:A,blockElements:z,checked:_,disabled:E,contentId:R,hasContent:M,id:C,index:c,name:w,type:null!=f?f:j,value:null!=d?d:String(c),visible:T,checkedPanels:S,disabledPanels:x,modifiers:N?(0,L.getArray)(u).concat([N[_?"checked":"unchecked"],N[M?"content":"noContent"],N[E?"disabled":"enabled"],N[T]].concat(U(v===O&&c===v?[N.last]:[]))).concat(y?[N.animated,y]:[]):(0,L.getArray)(u),onChangePanel:o.onChangePanel})}var g=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(o,W.PureComponent)
var e,t,n,r=s(o)
function o(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),n=r.call(this,e,t),h++,n.uniqId="".concat(y),y++,n.cachedProps=m(e,t,n.uniqId),n.getInputRef=n.getInputRef.bind(f(n)),n.onChange=n.onChange.bind(f(n)),n.onClickLabel=n.onClickLabel.bind(f(n)),n.subscribers=[],n.childContext={tabbordionPanel:{getState:function(){return{animateContent:n.cachedProps.animateContent,checked:n.cachedProps.checked,contentId:n.cachedProps.contentId,disabled:n.cachedProps.disabled,inputId:n.cachedProps.id,index:n.cachedProps.index,modifiers:n.cachedProps.modifiers,visible:n.cachedProps.visible}},onClickLabel:n.onClickLabel,subscribe:(0,i.addSubscriber)(n.subscribers),unsubscribe:(0,i.removeSubscriber)(n.subscribers)}},n.panelState=n.childContext.tabbordionPanel.getState(),n}return e=o,(t=[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordion.subscribe(this)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){this.cachedProps=m(e,t,this.uniqId)
var n=this.childContext.tabbordionPanel.getState();(0,L.isShallowlyDifferent)(n,this.panelState)&&(this.subscribers.forEach(function(e){return e.forceUpdate()}),this.panelState=n)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordion.unsubscribe(this),delete this.cachedProps,0===--h&&(y=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getInputRef",value:function(e){this.input=e}},{key:"onChange",value:function(e){var t,n,r
e.defaultPrevented||(n=(t=this.cachedProps).index,(r=t.onChangePanel)&&r(n))}},{key:"onClickLabel",value:function(){var e=this,t=this.cachedProps,n=t.index,r=t.onChangePanel,o=t.type
r&&r(n),requestAnimationFrame(function(){e.input&&(e.input.checked||"checkbox"===o)&&document.activeElement!==e.input&&e.input.focus()})}},{key:"render",value:function(){var e=this.cachedProps,t=(e.animateContent,e.bemModifiers,e.bemSeparator),n=e.blockElements,r=e.checked,o=(e.checkedPanels,e.children),i=e.className,a=e.component,l=e.contentId,c=e.disabled,u=(e.disabledPanels,e.hasContent),s=e.id,f=(e.index,e.modifiers),d=(e.onChangePanel,e.name),b=e.style,p=e.type,h=e.value,y=e.visible,m=V(e,["animateContent","bemModifiers","bemSeparator","blockElements","checked","checkedPanels","children","className","component","contentId","disabled","disabledPanels","hasContent","id","index","modifiers","onChangePanel","name","style","type","value","visible"]),g=(0,O.bemClassName)(n,"panel",f,t),v=r?"true":"false"
return W.default.createElement(a,P({},m,{"aria-expanded":u&&v,"aria-selected":v,className:g?i?"".concat(g," ").concat(i):g:i,role:"tab",style:q(q({},b),{},{display:"hidden"===y?"none":null})}),W.default.createElement("input",{"aria-controls":l,checked:r,"data-state":"tabbordion",disabled:c||"hidden"===y,id:s,name:d,onChange:this.onChange,ref:this.getInputRef,type:p,value:h}),o)}}])&&c(e.prototype,t),n&&c(e,n),o}()
g.childContextTypes={tabbordionPanel:o.default.object},g.contextTypes={bem:o.default.object,tabbordion:o.default.object},g.defaultProps={component:"li"},g.propTypes={checked:o.default.bool,className:o.default.string,disabled:o.default.bool,id:o.default.string,index:o.default.number,name:o.default.string,type:o.default.oneOf(["checkbox","radio"]),value:o.default.string,visible:o.default.bool,children:o.default.node,component:o.default.oneOfType([o.default.func,o.default.object,o.default.string]),modifiers:o.default.array},t.default=g},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,f=function(e){if(e&&e.__esModule)return e
if(null===e||"object"!==l(e)&&"function"!=typeof e)return{default:e}
var t=a()
if(t&&t.has(e))return t.get(e)
var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e){var i
Object.prototype.hasOwnProperty.call(e,o)&&((i=r?Object.getOwnPropertyDescriptor(e,o):null)&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o])}n.default=e,t&&t.set(e,n)
return n}(n(1)),o=(r=n(2))&&r.__esModule?r:{default:r},d=n(0)
function a(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return a=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t){if(null==e)return{}
var n,r=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),i=0;i<o.length;i++)n=o[i],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])
return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(i){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()
return function(){var e,t,n,r,o=h(i)
return t=a?(e=h(this).constructor,Reflect.construct(o,arguments,e)):o.apply(this,arguments),n=this,!(r=t)||"object"!==l(r)&&"function"!=typeof r?s(n):r}}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(o,f.PureComponent)
var e,t,n,r=u(o)
function o(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(n=r.call(this,e,t)).onClick=n.onClick.bind(s(n)),n}return e=o,(t=[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"onClick",value:function(e){var t
e.defaultPrevented||(t=this.context.tabbordionPanel.onClickLabel)&&(e.preventDefault(),t())}},{key:"render",value:function(){var e=this.context.bem.getState(),t=e.bemSeparator,n=e.blockElements,r=this.context.tabbordionPanel.getState(),o=r.inputId,i=r.modifiers,a=this.props,l=a.className,c=a.component,u=p(a,["className","component"]),s=(0,d.bemClassName)(n,"label",i,t)
return f.default.createElement(c,b({className:s?l?"".concat(s," ").concat(l):s:l,htmlFor:o,onClick:this.onClick},u))}}])&&i(e.prototype,t),n&&i(e,n),o}()
y.contextTypes={bem:o.default.object,tabbordionPanel:o.default.object},y.defaultProps={component:"label"},y.propTypes={className:o.default.string,component:o.default.oneOfType([o.default.func,o.default.object,o.default.string])},t.default=y},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,O=function(e){if(e&&e.__esModule)return e
if(null===e||"object"!==l(e)&&"function"!=typeof e)return{default:e}
var t=a()
if(t&&t.has(e))return t.get(e)
var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e){var i
Object.prototype.hasOwnProperty.call(e,o)&&((i=r?Object.getOwnPropertyDescriptor(e,o):null)&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o])}n.default=e,t&&t.set(e,n)
return n}(n(1)),o=(r=n(2))&&r.__esModule?r:{default:r},P=n(0),i=n(10)
function a(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return a=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(t,e){var n,r=Object.keys(t)
return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function k(o){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{}
e%2?c(Object(i),!0).forEach(function(e){var t,n,r
t=o,r=i[n=e],n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(i,e))})}return o}function S(e,t){if(null==e)return{}
var n,r=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),i=0;i<o.length;i++)n=o[i],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])
return r}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(i){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()
return function(){var e,t,n,r,o=b(i)
return t=a?(e=b(this).constructor,Reflect.construct(o,arguments,e)):o.apply(this,arguments),n=this,!(r=t)||"object"!==l(r)&&"function"!=typeof r?d(n):r}}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(o,O.PureComponent)
var e,t,n,r=f(o)
function o(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(n=r.call(this,e,t)).state={fastTransition:!1,height:null},n.getRef=n.getRef.bind(d(n)),n.onResize=n.onResize.bind(d(n)),n.update=n.update.bind(d(n)),n}return e=o,(t=[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this),this.onResize.getState=this.context.tabbordionPanel.getState,(0,i.addResizeListener)(this.onResize)}},{key:"componentDidUpdate",value:function(){this.update()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){t.tabbordionPanel!==this.context.tabbordionPanel&&(this.onResize.getState=t.tabbordionPanel.getState)}},{key:"componentWillUnmount",value:function(){(0,i.removeResizeListener)(this.onResize),this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"getRef",value:function(e){this.child=e}},{key:"onResize",value:function(){this.update("resize")}},{key:"update",value:function(e){var t,n,r,o,i,a=this
this.child&&(n=(t=this.child.getBoundingClientRect()).bottom,r=t.top,o=Math.ceil(n-r),i=this.state.fastTransition,this.state.height!==o&&("resize"===e&&(i=!0),this.setState({fastTransition:i,height:o})),"resize"===e&&i&&(clearTimeout(this._dtt),this._dtt=setTimeout(function(){delete a._dtt,a.setState({fastTransition:!1})},500)))}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,r=e.component,o=e.style,i=S(e,["children","className","component","style"]),a=this.context.bem.getState(),l=a.bemSeparator,c=a.blockElements,u=this.context.tabbordionPanel.getState(),s=u.animateContent,f=u.checked,d=u.contentId,b=u.inputId,p=u.modifiers,h=(0,P.bemClassName)(c,"content",p,l),y=(0,P.bemClassName)(c,"animator",p,l),m="height"===s?f?this.state.height&&this.state.height+"px"||"auto":"0px":null,g="marginTop"===s?f?"0px":this.state.height&&-this.state.height+"px"||"-65535px":null,v=this.state.fastTransition?{WebkitTransition:"all 32ms",transition:"all 32ms"}:null
return s?O.default.createElement(r,j({id:d},i,{"aria-labelledby":b,className:y?n?"".concat(y," ").concat(n):y:n,role:"tabpanel",style:k(k({},o),{},{height:m,overflow:f&&"marginTop"===s?"visible":"hidden"},v)}),O.default.createElement("div",{ref:this.getRef,className:h,style:g&&k({marginTop:g},v)},t)):O.default.createElement(r,j({id:d},i,{"aria-labelledby":b,className:h?n?"".concat(h," ").concat(n):h:n,ref:this.getRef,role:"tabpanel",style:o}),t)}}])&&u(e.prototype,t),n&&u(e,n),o}()
p.hasContent=!0,p.contextTypes={bem:o.default.object,tabbordionPanel:o.default.object},p.defaultProps={component:"div"},p.propTypes={children:o.default.node,className:o.default.string,component:o.default.oneOfType([o.default.func,o.default.object,o.default.string]),style:o.default.object},t.default=p},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addResizeListener=function(e){0===r.length&&window.addEventListener("resize",i,!1)
r.includes(e)||r.push(e)},t.removeResizeListener=function(e){var t=r.indexOf(e)
~t&&r.splice(t,1)
0===r.length&&window.removeEventListener("resize",i,!1)}
var r=[]
function o(e){var t=e.getState(),n=t.animateContent,r=t.checked;("height"===n&&r||"marginTop"===n&&!r)&&e()}var i=function(n,r,e){var o,i,a,l,c,u=2<arguments.length&&void 0!==e?e:{}
function s(){l=!1===u.leading?0:Date.now(),c=null,a=n.apply(o,i),c||(o=i=null)}return function(){var e=Date.now()
l||!1!==u.leading||(l=e)
var t=r-(e-l)
return o=this,i=arguments,t<=0||r<t?(c&&(clearTimeout(c),c=null),l=e,a=n.apply(o,i),c||(o=i=null)):c||!1===u.trailing||(c=setTimeout(s,t)),a}}(function(){r.forEach(o)},200,{leading:!1})}],o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t
if(4&e&&"object"==typeof t&&t&&t.__esModule)return t
var n=Object.create(null)
if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r))
return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/build/",o(o.s=5)
function o(e){if(a[e])return a[e].exports
var t=a[e]={i:e,l:!1,exports:{}}
return i[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var i,a})

//# sourceMappingURL=react-tabbordion.js.map