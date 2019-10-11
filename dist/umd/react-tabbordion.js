!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.ReactTabbordion=t(require("react"),require("prop-types")):e.ReactTabbordion=t(e.React,e.PropTypes)}(window,function(n,r){return a={},o.m=i=[function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.bemClassName=function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"--",o=e&&e[t]||null
{if(null==o)return null
"string"!=typeof o&&(o=String(o))}var i="",a=o.indexOf(" ")
0<=a&&(i=o.slice(a),o=o.slice(0,a))
var l=" "+o+r
if(i&&r){var u=" "+r
for(a=i.indexOf(u);0<=a;a=i.indexOf(u,a+o.length))i=i.replace(u,l)}return Array.isArray(n)?n.reduce(function(e,t){return null!=t?e+l+t:e},o)+i:o+i}},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addSubscriber=function(t){return function(e){t.includes(e)||t.push(e)}},t.removeSubscriber=function(n){return function(e){var t=n.indexOf(e)
~t&&n.splice(t,1)}}},function(e,t,n){"use strict"
function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e){return(i="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.getArray=function(e){return Array.isArray(e)&&0<e.length?e:o},t.getChecked=function(e){return e.checked},t.getDisabled=function(e){return e.disabled},t.getIndex=function(e){return e.index},t.isShallowlyDifferent=a,t.isShallowlyDifferentArray=l
var o=[]
function a(n,r){if(n===r)return!1
if(null==n||null==r)return null!=n||null!=r
if("object"!==i(n)||"object"!==i(r))return!0
var e=Object.keys(n||{}).sort(),o=Object.keys(r||{}).sort()
return e.length!==o.length||e.some(function(e,t){return e!==o[t]||(Array.isArray(n[e])?l(n[e],r[e]):n[e]!==r[e])})}function l(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[]
return e.length!==n.length||e.some(function(e,t){return a(e,n[t])})}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bemClassName",{enumerable:!0,get:function(){return r.bemClassName}}),Object.defineProperty(t,"Tabbordion",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"TabPanel",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"TabLabel",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"TabContent",{enumerable:!0,get:function(){return l.default}})
var r=n(0),o=u(n(6)),i=u(n(7)),a=u(n(8)),l=u(n(9))
function u(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict"
function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var o,y=function(e){if(e&&e.__esModule)return e
var t=l()
if(t&&t.has(e))return t.get(e)
var n={}
if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null
i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}}n.default=e,t&&t.set(e,n)
return n}(n(1)),i=(o=n(2))&&o.__esModule?o:{default:o},a=n(3),h=n(4)
function l(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return l=function(){return e},e}function u(e){return(u="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{}
var n,r,o=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=0,g=0
function v(e){return{bemModifiers:e.bemModifiers,bemSeparator:e.bemSeparator,blockElements:e.blockElements}}function O(e,t,n){var r=(0,h.getArray)(n.stateful?n.panels:t.panels)
return{animateContent:t.animateContent,checkedPanels:r.filter(h.getChecked).map(h.getIndex),disabledPanels:r.filter(h.getDisabled).map(h.getIndex),firstVisiblePanel:e.firstVisibleIndex,lastVisiblePanel:e.lastVisibleIndex,panelName:t.name||e.uniqId,panelType:"multiple"===t.mode?"checkbox":"radio",tabbordionId:t.id||e.uniqId}}function P(e){return e}var S=function(){function n(e){var t
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t=function(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?d(e):t}(this,b(n).call(this,e)),m++,t.uniqId="tabbordion-".concat(g),g++,t.getNextState=t.getNextState.bind(d(t)),t.onChange=t.onChange.bind(d(t)),t.firstVisibleIndex=null,t.lastVisibleIndex=null,t.state=t.getNextState(e,{stateful:!1},Array.isArray(e.panels)?e.panels:e.initialPanels),t.subscribers={bem:[],tabbordion:[]},t.childContext={bem:{getState:function(){return t.bemState},subscribe:(0,a.addSubscriber)(t.subscribers.bem),unsubscribe:(0,a.removeSubscriber)(t.subscribers.bem)},tabbordion:{getState:function(){return t.tabbordionState},onChangePanel:t.onChange,subscribe:(0,a.addSubscriber)(t.subscribers.tabbordion),unsubscribe:(0,a.removeSubscriber)(t.subscribers.tabbordion)}},t.bemState=v(e),t.tabbordionState=O(d(t),e,t.state),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,y.PureComponent),function(e,t,n){t&&f(e.prototype,t),n&&f(e,n)}(n,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.getNextState(e,this.state)
t!==this.state&&this.setState(t)
var n=v(e);(0,h.isShallowlyDifferent)(n,this.bemState)&&(this.subscribers.bem.forEach(function(e){return e.forceUpdate()}),this.bemState=n)
var r=O(this,e,t);(0,h.isShallowlyDifferent)(r,this.tabbordionState)&&(this.subscribers.tabbordion.forEach(function(e){return e.forceUpdate()}),this.tabbordionState=r)}},{key:"componentWillUnmount",value:function(){0===--m&&(g=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getNextState",value:function(e,t,n){for(var a=(0,h.getArray)(t.stateful?t.panels:n||e.panels),o=[],i=[],l=[],u="multiple"===e.mode,c=[e.children];c.length;)y.Children.forEach(c.shift(),function(e){if(null!=e&&e.type){var t=e.props||e._store&&e._store.props||{}
if(e.type===y.default.Fragment&&t.children)c.push(t.children)
else if(e.type.contextTypes&&e.type.contextTypes.tabbordion){var n=null!=t.index&&t.index,r=!1===n||i.includes(n)
r?l.push(o.length):i.push(n),o.push({checked:t.checked,disabled:t.disabled,index:!r&&n,visible:t.visible})}}})
for(var r=0;0<l.length;){for(;i.includes(r);)r++
o[l.shift()].index=r,r++}var s=0,f=null,b=null,d=o.map(function(t,e){var n=a.find(function(e){return e.index===t.index})||{checked:r,disabled:o,visible:i},r=(null!=t.checked?t.checked:!!n.checked)&&(u||0===s),o=null!=t.disabled?t.disabled:!!n.disabled,i=null!=t.visible?t.visible:!1!==n.visible
return i&&(b=e,null==f&&(f=b)),r&&i&&s++,{checked:r,disabled:o,index:t.index,visible:i}})
null!=f&&(0===s&&"multiple"!==e.mode&&"toggle"!==e.mode&&(d[f].checked=!0),f=d[f].index,b=d[b].index),this.firstVisibleIndex=f,this.lastVisibleIndex=b
var p=!e.onChange||!e.onPanels||!Array.isArray(e.panels)
if(p){if(!t.stateful||(0,h.isShallowlyDifferentArray)(t.panels,d))return e.onPanels&&e.onPanels(d),{panels:d,stateful:p}}else if((0,h.isShallowlyDifferentArray)(a,d)&&e.onPanels(d),t.stateful)return{panels:null,stateful:p}
return t}},{key:"onChange",value:function(t){var e=this.props.mode
if(this.state.stateful){var n=this.state.panels.find(function(e){return e.index===t})
if(null==n)throw new Error("Unexpected invalid panel index: "+t)
var r=!1
switch(e){case"toggle":this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1)}),n.checked=!n.checked,r=!0
break
case"multiple":n.checked=!n.checked,r=!0
break
default:this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1,r=!0)}),n.checked||(n.checked=!0,r=!0)}r&&this.setState({panels:this.state.panels.slice(0)})}else this.props.onChange({index:t,mode:e})}},{key:"render",value:function(){for(var e=this.props,t=(e.animateContent,e.children),n=e.component,r=(e.bemModifiers,e.bemSeparator,e.blockElements,e.component,e.initialPanels,e.mode,e.name,e.onChange,e.onPanels,e.panels),o=s(e,["animateContent","children","component","bemModifiers","bemSeparator","blockElements","component","initialPanels","mode","name","onChange","onPanels","panels"]),i=0,a=this.state.stateful?this.state.panels:r,l=[t],u=[];l.length;)y.Children.forEach(l.shift(),function(e){if(null!=e&&e.type)if(e.type===y.default.Fragment)l.push(e.props.children)
else if(e.type.contextTypes&&e.type.contextTypes.tabbordion){var t=y.default.cloneElement(e,a[i])
i++,u.push(t)}else u.push(e)
else u.push(e)})
return y.default.createElement(n,c({},o,{role:"tablist"}),y.Children.map(u,P))}}]),n}()
S.childContextTypes={bem:i.default.object,tabbordion:i.default.object},S.defaultProps={animateContent:!1,bemModifiers:{animated:"animated",between:"between",checked:"checked",content:"content",disabled:"disabled",enabled:"enabled",first:"first",hidden:"hidden",last:"last",noContent:"no-content",unchecked:"unchecked"},bemSeparator:"--",blockElements:{animator:"panel__animator",content:"panel__content",label:"panel__label",panel:"panel"},component:"ul",mode:"single"}
var j=i.default.arrayOf(i.default.shape({checked:i.default.bool,disabled:i.default.bool,index:i.default.number,visible:i.default.bool}))
S.propTypes={animateContent:i.default.oneOf([!1,"height","marginTop"]),bemModifiers:i.default.shape({between:i.default.string,checked:i.default.string,content:i.default.string,disabled:i.default.string,enabled:i.default.string,first:i.default.string,hidden:i.default.string,last:i.default.string,noContent:i.default.string,unchecked:i.default.string}),bemSeparator:i.default.string,blockElements:i.default.shape({content:i.default.string,label:i.default.string,panel:i.default.string}),children:i.default.node,className:i.default.string,component:i.default.oneOfType([i.default.func,i.default.object,i.default.string]),id:i.default.string,initialPanels:j,mode:i.default.oneOf(["single","toggle","multiple"]),name:i.default.string,onChange:i.default.func,onPanels:i.default.func,panels:j}
var k=S
t.default=k},function(e,t,n){"use strict"
function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var o,A=function(e){if(e&&e.__esModule)return e
var t=l()
if(t&&t.has(e))return t.get(e)
var n={}
if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null
i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}}n.default=e,t&&t.set(e,n)
return n}(n(1)),i=(o=n(2))&&o.__esModule?o:{default:o},a=n(3),O=n(0),z=n(4)
function l(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return l=function(){return e},e}function u(e){return(u="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function W(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t]
return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(t,e){var n=Object.keys(t)
if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t)
e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function L(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{}
e%2?d(n,!0).forEach(function(e){p(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function q(e,t){if(null==e)return{}
var n,r,o=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var y="undefined"!=typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:setTimeout,h=0,m=0
function g(e,t,n){for(var r=t.bem,o=t.tabbordion,i=e.checked,a=e.disabled,l=e.id,u=e.index,c=e.modifiers,s=e.name,f=e.type,b=e.value,d=e.visible,p=q(e,["checked","disabled","id","index","modifiers","name","type","value","visible"]),y=o.getState(),h=y.animateContent,m=y.checkedPanels,g=y.disabledPanels,v=y.firstVisiblePanel,O=y.lastVisiblePanel,P=y.panelName,S=y.panelType,j=y.tabbordionId,k=(0,z.getArray)(m),x=(0,z.getArray)(g),w=(null!=s?s:P)||j||"tabbordion-panel-".concat(n),_=l||"".concat(j||w,"-").concat(u),C=null!=i?i:k.includes(u),E=null!=a?a:x.includes(u),T=!1===d?"hidden":(v===u?"first":O===u&&"last")||"between",M=null,I=null,D=[p.children];!M&&D.length;)A.Children.forEach(D.shift(),function(e){if(!M&&e&&e.type){var t=e.props||e._store&&e._store.props||{}
e.type===A.default.Fragment?D.push(t.children):e.type.hasContent&&(I=!0,M=t.id||null)}})
M=M||"".concat(_,"-content")
var N=r.getState(),R=N.bemModifiers
return L({},p,{animateContent:h,bemModifiers:R,bemSeparator:N.bemSeparator,blockElements:N.blockElements,checked:C,disabled:E,contentId:M,hasContent:I,id:_,index:u,name:w,type:null!=f?f:S,value:null!=b?b:String(u),visible:T,checkedPanels:k,disabledPanels:x,modifiers:R?(0,z.getArray)(c).concat([R[C?"checked":"unchecked"],R[I?"content":"noContent"],R[E?"disabled":"enabled"],R[T]].concat(W(v===O&&u===v?[R.last]:[]))).concat(h?[R.animated,h]:[]):(0,z.getArray)(c),onChangePanel:o.onChangePanel})}var v=function(){function r(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),n=function(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?f(e):t}(this,s(r).call(this,e,t)),h++,n.uniqId="".concat(m),m++,n.cachedProps=g(e,t,n.uniqId),n.getInputRef=n.getInputRef.bind(f(n)),n.onChange=n.onChange.bind(f(n)),n.onClickLabel=n.onClickLabel.bind(f(n)),n.subscribers=[],n.childContext={tabbordionPanel:{getState:function(){return{animateContent:n.cachedProps.animateContent,checked:n.cachedProps.checked,contentId:n.cachedProps.contentId,disabled:n.cachedProps.disabled,inputId:n.cachedProps.id,index:n.cachedProps.index,modifiers:n.cachedProps.modifiers,visible:n.cachedProps.visible}},onClickLabel:n.onClickLabel,subscribe:(0,a.addSubscriber)(n.subscribers),unsubscribe:(0,a.removeSubscriber)(n.subscribers)}},n.panelState=n.childContext.tabbordionPanel.getState(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(r,A.PureComponent),function(e,t,n){t&&c(e.prototype,t),n&&c(e,n)}(r,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordion.subscribe(this)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){this.cachedProps=g(e,t,this.uniqId)
var n=this.childContext.tabbordionPanel.getState();(0,z.isShallowlyDifferent)(n,this.panelState)&&(this.subscribers.forEach(function(e){return e.forceUpdate()}),this.panelState=n)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordion.unsubscribe(this),delete this.cachedProps,0===--h&&(m=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getInputRef",value:function(e){this.input=e}},{key:"onChange",value:function(e){if(!e.defaultPrevented){var t=this.cachedProps,n=t.index,r=t.onChangePanel
r&&r(n)}}},{key:"onClickLabel",value:function(){var e=this,t=this.cachedProps,n=t.index,r=t.onChangePanel,o=t.type
r&&r(n),y(function(){e.input&&(e.input.checked||"checkbox"===o)&&document.activeElement!==e.input&&e.input.focus()})}},{key:"render",value:function(){var e=this.cachedProps,t=(e.animateContent,e.bemModifiers,e.bemSeparator),n=e.blockElements,r=e.checked,o=(e.checkedPanels,e.children),i=e.className,a=e.component,l=e.contentId,u=e.disabled,c=(e.disabledPanels,e.hasContent),s=e.id,f=(e.index,e.modifiers),b=(e.onChangePanel,e.name),d=e.style,p=e.type,y=e.value,h=e.visible,m=q(e,["animateContent","bemModifiers","bemSeparator","blockElements","checked","checkedPanels","children","className","component","contentId","disabled","disabledPanels","hasContent","id","index","modifiers","onChangePanel","name","style","type","value","visible"]),g=(0,O.bemClassName)(n,"panel",f,t),v=r?"true":"false"
return A.default.createElement(a,P({},m,{"aria-expanded":c&&v,"aria-selected":v,className:g?i?"".concat(g," ").concat(i):g:i,role:"tab",style:L({},d,{display:"hidden"===h?"none":null})}),A.default.createElement("input",{"aria-controls":l,checked:r,"data-state":"tabbordion",disabled:u||"hidden"===h,id:s,name:b,onChange:this.onChange,ref:this.getInputRef,type:p,value:y}),o)}}]),r}()
v.childContextTypes={tabbordionPanel:i.default.object},v.contextTypes={bem:i.default.object,tabbordion:i.default.object},v.defaultProps={component:"li"},v.propTypes={checked:i.default.bool,className:i.default.string,disabled:i.default.bool,id:i.default.string,index:i.default.number,name:i.default.string,type:i.default.oneOf(["checkbox","radio"]),value:i.default.string,visible:i.default.bool,children:i.default.node,component:i.default.oneOfType([i.default.func,i.default.object,i.default.string]),modifiers:i.default.array}
var S=v
t.default=S},function(e,t,n){"use strict"
function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var o,f=function(e){if(e&&e.__esModule)return e
var t=a()
if(t&&t.has(e))return t.get(e)
var n={}
if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null
i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}}n.default=e,t&&t.set(e,n)
return n}(n(1)),i=(o=n(2))&&o.__esModule?o:{default:o},b=n(0)
function a(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return a=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t){if(null==e)return{}
var n,r,o=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(){function r(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),(n=function(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?s(e):t}(this,c(r).call(this,e,t))).onClick=n.onClick.bind(s(n)),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(r,f.PureComponent),function(e,t,n){t&&u(e.prototype,t),n&&u(e,n)}(r,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"onClick",value:function(e){if(!e.defaultPrevented){var t=this.context.tabbordionPanel.onClickLabel
t&&(e.preventDefault(),t())}}},{key:"render",value:function(){var e=this.context.bem.getState(),t=e.bemSeparator,n=e.blockElements,r=this.context.tabbordionPanel.getState(),o=r.inputId,i=r.modifiers,a=this.props,l=a.className,u=a.component,c=p(a,["className","component"]),s=(0,b.bemClassName)(n,"label",i,t)
return f.default.createElement(u,d({className:s?l?"".concat(s," ").concat(l):s:l,htmlFor:o,onClick:this.onClick},c))}}]),r}()
h.contextTypes={bem:i.default.object,tabbordionPanel:i.default.object},h.defaultProps={component:"label"},h.propTypes={className:i.default.string,component:i.default.oneOfType([i.default.func,i.default.object,i.default.string])}
var m=h
t.default=m},function(e,t,n){"use strict"
function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var o,O=function(e){if(e&&e.__esModule)return e
var t=l()
if(t&&t.has(e))return t.get(e)
var n={}
if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor
for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null
i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}}n.default=e,t&&t.set(e,n)
return n}(n(1)),i=(o=n(2))&&o.__esModule?o:{default:o},P=n(0),a=n(10)
function l(){if("function"!=typeof WeakMap)return null
var e=new WeakMap
return l=function(){return e},e}function u(e){return(u="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(t,e){var n=Object.keys(t)
if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t)
e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function j(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{}
e%2?c(n,!0).forEach(function(e){s(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e,t){if(null==e)return{}
var n,r,o=function(e,t){if(null==e)return{}
var n,r,o={},i=Object.keys(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||(o[n]=e[n])
return o}(e,t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e)
for(r=0;r<i.length;r++)n=i[r],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(){function r(e,t){var n
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),(n=function(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?d(e):t}(this,b(r).call(this,e,t))).state={fastTransition:!1,height:null},n.getRef=n.getRef.bind(d(n)),n.onResize=n.onResize.bind(d(n)),n.update=n.update.bind(d(n)),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(r,O.PureComponent),function(e,t,n){t&&f(e.prototype,t),n&&f(e,n)}(r,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this),this.onResize.getState=this.context.tabbordionPanel.getState,(0,a.addResizeListener)(this.onResize)}},{key:"componentDidUpdate",value:function(){this.update()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){t.tabbordionPanel!==this.context.tabbordionPanel&&(this.onResize.getState=t.tabbordionPanel.getState)}},{key:"componentWillUnmount",value:function(){(0,a.removeResizeListener)(this.onResize),this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"getRef",value:function(e){this.child=e}},{key:"onResize",value:function(){this.update("resize")}},{key:"update",value:function(e){var t=this
if(this.child){var n=this.child.getBoundingClientRect(),r=n.bottom,o=n.top,i=Math.ceil(r-o),a=this.state.fastTransition
this.state.height!==i&&("resize"===e&&(a=!0),this.setState({fastTransition:a,height:i})),"resize"===e&&a&&(clearTimeout(this._dtt),this._dtt=setTimeout(function(){delete t._dtt,t.setState({fastTransition:!1})},500))}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,r=e.component,o=e.style,i=k(e,["children","className","component","style"]),a=this.context.bem.getState(),l=a.bemSeparator,u=a.blockElements,c=this.context.tabbordionPanel.getState(),s=c.animateContent,f=c.checked,b=c.contentId,d=c.inputId,p=c.modifiers,y=(0,P.bemClassName)(u,"content",p,l),h=(0,P.bemClassName)(u,"animator",p,l),m="height"===s?f?this.state.height&&this.state.height+"px"||"auto":"0px":null,g="marginTop"===s?f?"0px":this.state.height&&-this.state.height+"px"||"-65535px":null,v=this.state.fastTransition?{WebkitTransition:"all 32ms",transition:"all 32ms"}:null
return s?O.default.createElement(r,S({id:b},i,{"aria-labelledby":d,className:h?n?"".concat(h," ").concat(n):h:n,role:"tabpanel",style:j({},o,{height:m,overflow:f&&"marginTop"===s?"visible":"hidden"},v)}),O.default.createElement("div",{ref:this.getRef,className:y,style:g&&j({marginTop:g},v)},t)):O.default.createElement(r,S({id:b},i,{"aria-labelledby":d,className:y?n?"".concat(y," ").concat(n):y:n,ref:this.getRef,role:"tabpanel",style:o}),t)}}]),r}()
y.hasContent=!0,y.contextTypes={bem:i.default.object,tabbordionPanel:i.default.object},y.defaultProps={component:"div"},y.propTypes={children:i.default.node,className:i.default.string,component:i.default.oneOfType([i.default.func,i.default.object,i.default.string]),style:i.default.object}
var h=y
t.default=h},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addResizeListener=function(e){0===r.length&&window.addEventListener("resize",i,!1)
r.includes(e)||r.push(e)},t.removeResizeListener=function(e){var t=r.indexOf(e)
~t&&r.splice(t,1)
0===r.length&&window.removeEventListener("resize",i,!1)}
var r=[]
function o(e){var t=e.getState(),n=t.animateContent,r=t.checked;("height"===n&&r||"marginTop"===n&&!r)&&e()}var i=function(n,r,e){var o,i,a,l,u,c=2<arguments.length&&void 0!==e?e:{}
function s(){l=!1===c.leading?0:Date.now(),u=null,a=n.apply(o,i),u||(o=i=null)}return function(){var e=Date.now()
l||!1!==c.leading||(l=e)
var t=r-(e-l)
return o=this,i=arguments,t<=0||r<t?(u&&(clearTimeout(u),u=null),l=e,a=n.apply(o,i),u||(o=i=null)):u||!1===c.trailing||(u=setTimeout(s,t)),a}}(function(){r.forEach(o)},200,{leading:!1})}],o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t
if(4&e&&"object"==typeof t&&t&&t.__esModule)return t
var n=Object.create(null)
if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r))
return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/build/",o(o.s=5)
function o(e){if(a[e])return a[e].exports
var t=a[e]={i:e,l:!1,exports:{}}
return i[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var i,a})

//# sourceMappingURL=react-tabbordion.js.map