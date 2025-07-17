import{a6 as B,a7 as I,a5 as U,N as V,g as F,_ as w,b as l,f as N,a as P,d as b,e as D,a8 as K,q as W}from"./useZIndex-DBDpAXdW.js";import{r as s,R as x}from"./app-CDT_DPKo.js";import{c as q}from"./index-Cwcdd4Qr.js";function G(n){return n.replace(/-(.)/g,function(e,o){return o.toUpperCase()})}function H(n,e){F(n,"[@ant-design/icons] ".concat(e))}function S(n){return w(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(w(n.icon)==="object"||typeof n.icon=="function")}function E(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,o){var a=n[o];switch(o){case"class":e.className=a,delete e.class;break;default:delete e[o],e[G(o)]=a}return e},{})}function v(n,e,o){return o?x.createElement(n.tag,l(l({key:e},E(n.attrs)),o),(n.children||[]).map(function(a,r){return v(a,"".concat(e,"-").concat(n.tag,"-").concat(r))})):x.createElement(n.tag,l({key:e},E(n.attrs)),(n.children||[]).map(function(a,r){return v(a,"".concat(e,"-").concat(n.tag,"-").concat(r))}))}function L(n){return B(n)[0]}function M(n){return n?Array.isArray(n)?n:[n]:[]}var J=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,Q=function(e){var o=s.useContext(I),a=o.csp,r=o.prefixCls,c=o.layer,t=J;r&&(t=t.replace(/anticon/g,r)),c&&(t="@layer ".concat(c,` {
`).concat(t,`
}`)),s.useEffect(function(){var d=e.current,f=U(d);V(t,"@ant-design-icons",{prepend:!c,csp:a,attachTo:f})},[])},X=["icon","className","onClick","style","primaryColor","secondaryColor"],g={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Y(n){var e=n.primaryColor,o=n.secondaryColor;g.primaryColor=e,g.secondaryColor=o||L(e),g.calculated=!!o}function Z(){return l({},g)}var m=function(e){var o=e.icon,a=e.className,r=e.onClick,c=e.style,t=e.primaryColor,d=e.secondaryColor,f=N(e,X),C=s.useRef(),u=g;if(t&&(u={primaryColor:t,secondaryColor:d||L(t)}),Q(C),H(S(o),"icon should be icon definiton, but got ".concat(o)),!S(o))return null;var i=o;return i&&typeof i.icon=="function"&&(i=l(l({},i),{},{icon:i.icon(u.primaryColor,u.secondaryColor)})),v(i.icon,"svg-".concat(i.name),l(l({className:a,onClick:r,style:c,"data-icon":i.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},f),{},{ref:C}))};m.displayName="IconReact";m.getTwoToneColors=Z;m.setTwoToneColors=Y;function _(n){var e=M(n),o=P(e,2),a=o[0],r=o[1];return m.setTwoToneColors({primaryColor:a,secondaryColor:r})}function nn(){var n=m.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var en=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];_(K.primary);var p=s.forwardRef(function(n,e){var o=n.className,a=n.icon,r=n.spin,c=n.rotate,t=n.tabIndex,d=n.onClick,f=n.twoToneColor,C=N(n,en),u=s.useContext(I),i=u.prefixCls,y=i===void 0?"anticon":i,R=u.rootClassName,O=q(R,y,b(b({},"".concat(y,"-").concat(a.name),!!a.name),"".concat(y,"-spin"),!!r||a.name==="loading"),o),h=t;h===void 0&&d&&(h=-1);var z=c?{msTransform:"rotate(".concat(c,"deg)"),transform:"rotate(".concat(c,"deg)")}:void 0,A=M(f),T=P(A,2),$=T[0],j=T[1];return s.createElement("span",D({role:"img","aria-label":a.name},C,{ref:e,tabIndex:h,onClick:d,className:O}),s.createElement(m,{icon:a,primaryColor:$,secondaryColor:j,style:z}))});p.displayName="AntdIcon";p.getTwoToneColor=nn;p.setTwoToneColor=_;var on={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"},an=function(e,o){return s.createElement(p,D({},e,{ref:o,icon:on}))},fn=s.forwardRef(an),rn=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,tn=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,cn="".concat(rn," ").concat(tn).split(/[\s\n]+/),ln="aria-",sn="data-";function k(n,e){return n.indexOf(e)===0}function gn(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,o;e===!1?o={aria:!0,data:!0,attr:!0}:e===!0?o={aria:!0}:o=l({},e);var a={};return Object.keys(n).forEach(function(r){(o.aria&&(r==="role"||k(r,ln))||o.data&&k(r,sn)||o.attr&&cn.includes(r))&&(a[r]=n[r])}),a}const Cn=n=>{const[,,,,e]=W();return e?`${n}-css-var`:""};export{p as I,fn as R,gn as p,Cn as u};
