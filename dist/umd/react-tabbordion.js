!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.ReactTabbordion=t(require("react"),require("prop-types")):e.ReactTabbordion=t(e.React,e.PropTypes)}(window,function(e,t){return function(e){var t={}
function n(o){if(t[o])return t[o].exports
var i=t[o]={i:o,l:!1,exports:{}}
return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/build/",n(n.s=5)}([function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.bemClassName=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"--",i=e&&e[t]||null
if(null==i)return null
"string"!=typeof i&&(i=String(i))
var r="",a=i.indexOf(" ")
a>=0&&(r=i.slice(a),i=i.slice(0,a))
var l=" "+i+o
if(r&&o){var s=" "+o
for(a=r.indexOf(s);a>=0;a=r.indexOf(s,a+i.length))r=r.replace(s,l)}if(!Array.isArray(n))return i+r
return n.reduce(function(e,t){return null!=t?e+l+t:e},i)+r}},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addSubscriber=function(e){return function(t){e.includes(t)||e.push(t)}},t.removeSubscriber=function(e){return function(t){var n=e.indexOf(t)
~n&&e.splice(n,1)}}},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var i="function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?function(e){return void 0===e?"undefined":o(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":o(e)}
t.getArray=function(e){return Array.isArray(e)&&e.length>0?e:r},t.getChecked=function(e){return e.checked},t.getDisabled=function(e){return e.disabled},t.getIndex=function(e){return e.index},t.isShallowlyDifferent=a,t.isShallowlyDifferentArray=l
var r=[]
function a(e,t){if(e===t)return!1
if(null==e||null==t)return null!=e||null!=t
if("object"!==(void 0===e?"undefined":i(e))||"object"!==(void 0===t?"undefined":i(t)))return!0
var n=Object.keys(e||{}).sort(),o=Object.keys(t||{}).sort()
return n.length!==o.length||n.some(function(n,i){return n!==o[i]||(Array.isArray(e[n])?l(e[n],t[n]):e[n]!==t[n])})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
return e.length!==t.length||e.some(function(e,n){return a(e,t[n])})}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.TabContent=t.TabLabel=t.TabPanel=t.Tabbordion=t.bemClassName=void 0
var o=n(0)
Object.defineProperty(t,"bemClassName",{enumerable:!0,get:function(){return o.bemClassName}})
var i=s(n(6)),r=s(n(7)),a=s(n(8)),l=s(n(9))
function s(e){return e&&e.__esModule?e:{default:e}}t.Tabbordion=i.default,t.TabPanel=r.default,t.TabLabel=a.default,t.TabContent=l.default},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=d(a),s=d(n(2)),u=n(3),c=n(4)
function d(e){return e&&e.__esModule?e:{default:e}}var f=0,b=0
function p(e){return{bemModifiers:e.bemModifiers,bemSeparator:e.bemSeparator,blockElements:e.blockElements}}function h(e,t,n){var o=(0,c.getArray)(n.stateful?n.panels:t.panels)
return{animateContent:t.animateContent,checkedPanels:o.filter(c.getChecked).map(c.getIndex),disabledPanels:o.filter(c.getDisabled).map(c.getIndex),firstVisiblePanel:e.firstVisibleIndex,lastVisiblePanel:e.lastVisibleIndex,panelName:t.name||e.uniqId,panelType:"multiple"===t.mode?"checkbox":"radio",tabbordionId:t.id||e.uniqId}}function m(e){return e}var y=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return f++,n.uniqId="tabbordion-"+b,b++,n.getNextState=n.getNextState.bind(n),n.onChange=n.onChange.bind(n),n.firstVisibleIndex=null,n.lastVisibleIndex=null,n.state=n.getNextState(e,{stateful:!1},Array.isArray(e.panels)?e.panels:e.initialPanels),n.subscribers={bem:[],tabbordion:[]},n.childContext={bem:{getState:function(){return n.bemState},subscribe:(0,u.addSubscriber)(n.subscribers.bem),unsubscribe:(0,u.removeSubscriber)(n.subscribers.bem)},tabbordion:{getState:function(){return n.tabbordionState},onChangePanel:n.onChange,subscribe:(0,u.addSubscriber)(n.subscribers.tabbordion),unsubscribe:(0,u.removeSubscriber)(n.subscribers.tabbordion)}},n.bemState=p(e),n.tabbordionState=h(n,e,n.state),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),r(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.getNextState(e,this.state)
t!==this.state&&this.setState(t)
var n=p(e);(0,c.isShallowlyDifferent)(n,this.bemState)&&(this.subscribers.bem.forEach(function(e){return e.forceUpdate()}),this.bemState=n)
var o=h(this,e,t);(0,c.isShallowlyDifferent)(o,this.tabbordionState)&&(this.subscribers.tabbordion.forEach(function(e){return e.forceUpdate()}),this.tabbordionState=o)}},{key:"componentWillUnmount",value:function(){0===--f&&(b=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getNextState",value:function(e,t,n){for(var o=(0,c.getArray)(t.stateful?t.panels:n||e.panels),i=[],r=[],s=[],u="multiple"===e.mode,d=[e.children];d.length;)a.Children.forEach(d.shift(),function(e){if(null!=e&&e.type){var t=e.props||e._store&&e._store.props||{}
if(e.type===l.default.Fragment&&t.children)d.push(t.children)
else if(e.type.contextTypes&&e.type.contextTypes.tabbordion){var n=null!=t.index&&t.index,o=!1===n||r.includes(n)
o?s.push(i.length):r.push(n),i.push({checked:t.checked,disabled:t.disabled,index:!o&&n,visible:t.visible})}}})
for(var f=0;s.length>0;){for(;r.includes(f);)f++
i[s.shift()].index=f,f++}var b=0,p=null,h=null,m=i.map(function(e,t){var n=o.find(function(t){return t.index===e.index})||{checked:i,disabled:r,visible:a},i=(null!=e.checked?e.checked:!!n.checked)&&(u||0===b),r=null!=e.disabled?e.disabled:!!n.disabled,a=null!=e.visible?e.visible:!1!==n.visible
return a&&(h=t,null==p&&(p=h)),i&&a&&b++,{checked:i,disabled:r,index:e.index,visible:a}})
null!=p&&(0===b&&"multiple"!==e.mode&&"toggle"!==e.mode&&(m[p].checked=!0),p=m[p].index,h=m[h].index),this.firstVisibleIndex=p,this.lastVisibleIndex=h
var y=!e.onChange||!e.onPanels||!Array.isArray(e.panels)
if(y){if(!t.stateful||(0,c.isShallowlyDifferentArray)(t.panels,m))return e.onPanels&&e.onPanels(m),{panels:m,stateful:y}}else if((0,c.isShallowlyDifferentArray)(o,m)&&e.onPanels(m),t.stateful)return{panels:null,stateful:y}
return t}},{key:"onChange",value:function(e){var t=this.props.mode
if(this.state.stateful){var n=this.state.panels.find(function(t){return t.index===e})
if(null==n)throw new Error("Unexpected invalid panel index: "+e)
var o=!1
switch(t){case"toggle":this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1)}),n.checked=!n.checked,o=!0
break
case"multiple":n.checked=!n.checked,o=!0
break
default:this.state.panels.forEach(function(e){e!==n&&e.checked&&(e.checked=!1,o=!0)}),n.checked||(n.checked=!0,o=!0)}o&&this.setState({panels:this.state.panels.slice(0)})}else this.props.onChange({index:e,mode:t})}},{key:"render",value:function(){for(var e=this.props,t=(e.animateContent,e.children),n=e.component,o=(e.bemModifiers,e.bemSeparator,e.blockElements,e.component,e.initialPanels,e.mode,e.name,e.onChange,e.onPanels,e.panels),r=function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(e,["animateContent","children","component","bemModifiers","bemSeparator","blockElements","component","initialPanels","mode","name","onChange","onPanels","panels"]),s=0,u=this.state.stateful?this.state.panels:o,c=[t],d=[];c.length;)a.Children.forEach(c.shift(),function(e){if(null!=e&&e.type)if(e.type===l.default.Fragment)c.push(e.props.children)
else if(e.type.contextTypes&&e.type.contextTypes.tabbordion){var t=l.default.cloneElement(e,u[s])
s++,d.push(t)}else d.push(e)
else d.push(e)})
return l.default.createElement(n,i({},r,{role:"tablist"}),a.Children.map(d,m))}}]),t}()
y.childContextTypes={bem:s.default.object,tabbordion:s.default.object},y.defaultProps={animateContent:!1,bemModifiers:{animated:"animated",between:"between",checked:"checked",content:"content",disabled:"disabled",enabled:"enabled",first:"first",hidden:"hidden",last:"last",noContent:"no-content",unchecked:"unchecked"},bemSeparator:"--",blockElements:{animator:"panel__animator",content:"panel__content",label:"panel__label",panel:"panel"},component:"ul",mode:"single"}
var v=s.default.arrayOf(s.default.shape({checked:s.default.bool,disabled:s.default.bool,index:s.default.number,visible:s.default.bool}))
y.propTypes={animateContent:s.default.oneOf([!1,"height","marginTop"]),bemModifiers:s.default.shape({between:s.default.string,checked:s.default.string,content:s.default.string,disabled:s.default.string,enabled:s.default.string,first:s.default.string,hidden:s.default.string,last:s.default.string,noContent:s.default.string,unchecked:s.default.string}),bemSeparator:s.default.string,blockElements:s.default.shape({content:s.default.string,label:s.default.string,panel:s.default.string}),children:s.default.node,className:s.default.string,component:s.default.oneOfType([s.default.func,s.default.object,s.default.string]),id:s.default.string,initialPanels:v,mode:s.default.oneOf(["single","toggle","multiple"]),name:s.default.string,onChange:s.default.func,onPanels:s.default.func,panels:v},t.default=y},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=n(1),l=f(a),s=f(n(2)),u=n(3),c=n(0),d=n(4)
function f(e){return e&&e.__esModule?e:{default:e}}function b(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}var p="undefined"!=typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:setTimeout,h=0,m=0
function y(e,t,n){for(var o=t.bem,i=t.tabbordion,s=e.checked,u=e.disabled,c=e.id,f=e.index,p=e.modifiers,h=e.name,m=e.type,y=e.value,v=e.visible,g=b(e,["checked","disabled","id","index","modifiers","name","type","value","visible"]),P=i.getState(),x=P.animateContent,k=P.checkedPanels,S=P.disabledPanels,C=P.firstVisiblePanel,O=P.lastVisiblePanel,_=P.panelName,w=P.panelType,j=P.tabbordionId,T=(0,d.getArray)(k),E=(0,d.getArray)(S),N=(null!=h?h:_)||j||"tabbordion-panel-"+n,R=c||(j||N)+"-"+f,I=null!=s?s:T.includes(f),M=null!=u?u:E.includes(f),A=!1===v?"hidden":(C===f?"first":O===f&&"last")||"between",z=null,D=null,L=[g.children];!z&&L.length;)a.Children.forEach(L.shift(),function(e){if(!z&&e&&e.type){var t=e.props||e._store&&e._store.props||{}
e.type===l.default.Fragment?L.push(t.children):e.type.hasContent&&(D=!0,z=t.id||null)}})
z||(z=R+"-content")
var q=o.getState(),U=q.bemModifiers,V=q.bemSeparator,F=q.blockElements
return r({},g,{animateContent:x,bemModifiers:U,bemSeparator:V,blockElements:F,checked:I,disabled:M,contentId:z,hasContent:D,id:R,index:f,name:N,type:null!=m?m:w,value:null!=y?y:String(f),visible:A,checkedPanels:T,disabledPanels:E,modifiers:U?(0,d.getArray)(p).concat([U[I?"checked":"unchecked"],U[D?"content":"noContent"],U[M?"disabled":"enabled"],U[A]].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}(C===O&&f===C?[U.last]:[]))).concat(x?[U.animated,x]:[]):(0,d.getArray)(p),onChangePanel:i.onChangePanel})}var v=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))
return h++,i.uniqId=""+m,m++,i.cachedProps=y(e,n,i.uniqId),i.getInputRef=i.getInputRef.bind(i),i.onChange=i.onChange.bind(i),i.onClickLabel=i.onClickLabel.bind(i),i.subscribers=[],i.childContext={tabbordionPanel:{getState:function(){return{animateContent:i.cachedProps.animateContent,checked:i.cachedProps.checked,contentId:i.cachedProps.contentId,disabled:i.cachedProps.disabled,inputId:i.cachedProps.id,index:i.cachedProps.index,modifiers:i.cachedProps.modifiers,visible:i.cachedProps.visible}},onClickLabel:i.onClickLabel,subscribe:(0,u.addSubscriber)(i.subscribers),unsubscribe:(0,u.removeSubscriber)(i.subscribers)}},i.panelState=i.childContext.tabbordionPanel.getState(),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),i(t,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordion.subscribe(this)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){this.cachedProps=y(e,t,this.uniqId)
var n=this.childContext.tabbordionPanel.getState();(0,d.isShallowlyDifferent)(n,this.panelState)&&(this.subscribers.forEach(function(e){return e.forceUpdate()}),this.panelState=n)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordion.unsubscribe(this),delete this.cachedProps,0===--h&&(m=0)}},{key:"getChildContext",value:function(){return this.childContext}},{key:"getInputRef",value:function(e){this.input=e}},{key:"onChange",value:function(e){if(!e.defaultPrevented){var t=this.cachedProps,n=t.index,o=t.onChangePanel
o&&o(n)}}},{key:"onClickLabel",value:function(){var e=this,t=this.cachedProps,n=t.index,o=t.onChangePanel,i=t.type
o&&o(n),p(function(){e.input&&(e.input.checked||"checkbox"===i)&&document.activeElement!==e.input&&e.input.focus()})}},{key:"render",value:function(){var e=this.cachedProps,t=(e.animateContent,e.bemModifiers,e.bemSeparator),n=e.blockElements,o=e.checked,i=(e.checkedPanels,e.children),a=e.className,s=e.component,u=e.contentId,d=e.disabled,f=(e.disabledPanels,e.hasContent),p=e.id,h=(e.index,e.modifiers),m=(e.onChangePanel,e.name),y=e.style,v=e.type,g=e.value,P=e.visible,x=b(e,["animateContent","bemModifiers","bemSeparator","blockElements","checked","checkedPanels","children","className","component","contentId","disabled","disabledPanels","hasContent","id","index","modifiers","onChangePanel","name","style","type","value","visible"]),k=(0,c.bemClassName)(n,"panel",h,t),S=o?"true":"false"
return l.default.createElement(s,r({},x,{"aria-expanded":f&&S,"aria-selected":S,className:k?a?k+" "+a:k:a,role:"tab",style:r({},y,{display:"hidden"===P?"none":null})}),l.default.createElement("input",{"aria-controls":u,checked:o,"data-state":"tabbordion",disabled:d||"hidden"===P,id:p,name:m,onChange:this.onChange,ref:this.getInputRef,type:v,value:g}),i)}}]),t}()
v.childContextTypes={tabbordionPanel:s.default.object},v.contextTypes={bem:s.default.object,tabbordion:s.default.object},v.defaultProps={component:"li"},v.propTypes={checked:s.default.bool,className:s.default.string,disabled:s.default.bool,id:s.default.string,index:s.default.number,name:s.default.string,type:s.default.oneOf(["checkbox","radio"]),value:s.default.string,visible:s.default.bool,children:s.default.node,component:s.default.oneOfType([s.default.func,s.default.object,s.default.string]),modifiers:s.default.array},t.default=v},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=c(a),s=c(n(2)),u=n(0)
function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))
return i.onClick=i.onClick.bind(i),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),r(t,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this)}},{key:"componentWillUnmount",value:function(){this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"onClick",value:function(e){if(!e.defaultPrevented){var t=this.context.tabbordionPanel.onClickLabel
t&&(e.preventDefault(),t())}}},{key:"render",value:function(){var e=this.context.bem.getState(),t=e.bemSeparator,n=e.blockElements,o=this.context.tabbordionPanel.getState(),r=o.inputId,a=o.modifiers,s=this.props,c=s.className,d=s.component,f=function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(s,["className","component"]),b=(0,u.bemClassName)(n,"label",a,t)
return l.default.createElement(d,i({className:b?c?b+" "+c:b:c,htmlFor:r,onClick:this.onClick},f))}}]),t}()
d.contextTypes={bem:s.default.object,tabbordionPanel:s.default.object},d.defaultProps={component:"label"},d.propTypes={className:s.default.string,component:s.default.oneOfType([s.default.func,s.default.object,s.default.string])},t.default=d},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=d(a),s=d(n(2)),u=n(0),c=n(10)
function d(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))
return i.state={fastTransition:!1,height:null},i.getRef=i.getRef.bind(i),i.onResize=i.onResize.bind(i),i.update=i.update.bind(i),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),r(t,[{key:"componentDidMount",value:function(){this.context.bem.subscribe(this),this.context.tabbordionPanel.subscribe(this),this.onResize.getState=this.context.tabbordionPanel.getState,(0,c.addResizeListener)(this.onResize)}},{key:"componentDidUpdate",value:function(){this.update()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e,t){t.tabbordionPanel!==this.context.tabbordionPanel&&(this.onResize.getState=t.tabbordionPanel.getState)}},{key:"componentWillUnmount",value:function(){(0,c.removeResizeListener)(this.onResize),this.context.bem.unsubscribe(this),this.context.tabbordionPanel.unsubscribe(this)}},{key:"getRef",value:function(e){this.child=e}},{key:"onResize",value:function(){this.update("resize")}},{key:"update",value:function(e){var t=this
if(this.child){var n=this.child.getBoundingClientRect(),o=n.bottom,i=n.top,r=Math.ceil(o-i),a=this.state.fastTransition
this.state.height!==r&&("resize"===e&&(a=!0),this.setState({fastTransition:a,height:r})),"resize"===e&&a&&(clearTimeout(this._dtt),this._dtt=setTimeout(function(){delete t._dtt,t.setState({fastTransition:!1})},500))}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,o=e.component,r=e.style,a=function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(e,["children","className","component","style"]),s=this.context.bem.getState(),c=s.bemSeparator,d=s.blockElements,f=this.context.tabbordionPanel.getState(),b=f.animateContent,p=f.checked,h=f.contentId,m=f.inputId,y=f.modifiers,v=(0,u.bemClassName)(d,"content",y,c),g=(0,u.bemClassName)(d,"animator",y,c),P="height"===b?p?this.state.height&&this.state.height+"px"||"auto":"0px":null,x="marginTop"===b?p?"0px":this.state.height&&-this.state.height+"px"||"-65535px":null,k=this.state.fastTransition?{webkitTransition:"all 32ms",transition:"all 32ms"}:null
return b?l.default.createElement(o,i({id:h},a,{"aria-labelledby":m,className:g?n?g+" "+n:g:n,role:"tabpanel",style:i({},r,{height:P,overflow:p&&"marginTop"===b?"visible":"hidden"},k)}),l.default.createElement("div",{ref:this.getRef,className:v,style:x&&i({marginTop:x},k)},t)):l.default.createElement(o,i({id:h},a,{"aria-labelledby":m,className:v?n?v+" "+n:v:n,ref:this.getRef,role:"tabpanel",style:r}),t)}}]),t}()
f.hasContent=!0,f.contextTypes={bem:s.default.object,tabbordionPanel:s.default.object},f.defaultProps={component:"div"},f.propTypes={children:s.default.node,className:s.default.string,component:s.default.oneOfType([s.default.func,s.default.object,s.default.string]),style:s.default.object},t.default=f},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.addResizeListener=function(e){0===o.length&&window.addEventListener("resize",r,!1)
o.includes(e)||o.push(e)},t.removeResizeListener=function(e){var t=o.indexOf(e)
~t&&o.splice(t,1)
0===o.length&&window.removeEventListener("resize",r,!1)}
var o=[]
function i(e){var t=e.getState(),n=t.animateContent,o=t.checked;("height"===n&&o||"marginTop"===n&&!o)&&e()}var r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=void 0,i=void 0,r=void 0,a=void 0,l=void 0
function s(){a=!1===n.leading?0:Date.now(),l=null,r=e.apply(o,i),l||(o=i=null)}return function(){var u=Date.now()
a||!1!==n.leading||(a=u)
var c=t-(u-a)
return o=this,i=arguments,c<=0||c>t?(l&&(clearTimeout(l),l=null),a=u,r=e.apply(o,i),l||(o=i=null)):l||!1===n.trailing||(l=setTimeout(s,c)),r}}(function(){o.forEach(i)},200,{leading:!1})}])})

//# sourceMappingURL=react-tabbordion.js.map