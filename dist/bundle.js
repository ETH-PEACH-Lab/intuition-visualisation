(()=>{"use strict";var n={735:(n,t,e)=>{e.d(t,{A:()=>c});var o=e(601),i=e.n(o),a=e(314),r=e.n(a)()(i());r.push([n.id,"body {\n    font-family: 'Consolas', monospace;\n    margin: 0;\n    padding: 20px;\n    background-color: #f4f4f9;\n}\n\n.container {\n    width: 55%;\n    margin: 0 auto;\n    text-align: left;\n}\n\nh1 {\n    margin-bottom: 20px;\n}\n\n#introduction-container {\n    margin-bottom: 20px;\n}\n\n#topic-tags-container {\n    width: 55%;\n    margin: 0 auto;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 5px;\n    margin-bottom: 20px;\n}\n\n#filter-container {\n    text-align: center;\n    margin-bottom: 20px;\n}\n\n#topic-filter {\n    padding: 10px;\n    font-size: 16px;\n    width: 300px;\n    margin-right: 10px;\n}\n\n#filter-button {\n    padding: 10px 20px;\n    font-size: 16px;\n    cursor: pointer;\n}\n\n#slide-count-container {\n    text-align: center;\n    margin-bottom: 50px;\n    font-size: 18px;\n    font-weight: bold;\n}\n\n.slide-section {\n    margin-bottom: 80px;\n    text-align: center;\n    position: relative;\n    width: 45%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.slide-section h2 {\n    margin: 0;\n}\n\n.slide-section a {\n    display: block;\n    margin: 5px 0;\n    color: #0066cc;\n    text-decoration: none;\n}\n\n.slide-section a:hover {\n    text-decoration: underline;\n}\n\n.slide-section img {\n    width: 100%;\n    height: auto;\n    display: block;\n    margin: 0 auto;\n}\n\n.topics {\n    font-size: 12px;\n    text-align: left;\n    margin: 10px 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 5px;\n}\n\n.topic-label {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    color: #333;\n    font-size: 12px;\n}\n\n.controls {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 10px;\n    padding: 0 10px;\n    width: 100%;\n}\n\n.button-group {\n    display: flex;\n    gap: 10px;\n}\n\n.controls button {\n    padding: 2px 10px;\n    font-size: 10px;\n    cursor: pointer;\n}\n\n#page-info {\n    font-size: 16px;\n    font-weight: bold;\n}\n\n#pagination-controls {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-top: 20px;\n    gap: 10px;\n}\n\n#pagination-controls button {\n    padding: 5px 10px;\n    font-size: 14px;\n    cursor: pointer;\n}\n\n.topic-label.clickable {\n    cursor: pointer;\n    margin: 5px;\n}\n\n.topic-label.clickable:hover {\n    background-color: #cccccc;\n}\n",""]);const c=r},314:n=>{n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e="",o=void 0!==t[5];return t[4]&&(e+="@supports (".concat(t[4],") {")),t[2]&&(e+="@media ".concat(t[2]," {")),o&&(e+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),e+=n(t),o&&(e+="}"),t[2]&&(e+="}"),t[4]&&(e+="}"),e})).join("")},t.i=function(n,e,o,i,a){"string"==typeof n&&(n=[[null,n,void 0]]);var r={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(r[s]=!0)}for(var l=0;l<n.length;l++){var d=[].concat(n[l]);o&&r[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),e&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=e):d[2]=e),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),t.push(d))}},t}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var t=[];function e(n){for(var e=-1,o=0;o<t.length;o++)if(t[o].identifier===n){e=o;break}return e}function o(n,o){for(var a={},r=[],c=0;c<n.length;c++){var s=n[c],l=o.base?s[0]+o.base:s[0],d=a[l]||0,p="".concat(l," ").concat(d);a[l]=d+1;var u=e(p),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var f=i(m,o);o.byIndex=c,t.splice(c,0,{identifier:p,updater:f,references:1})}r.push(p)}return r}function i(n,t){var e=t.domAPI(t);return e.update(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;e.update(n=t)}else e.remove()}}n.exports=function(n,i){var a=o(n=n||[],i=i||{});return function(n){n=n||[];for(var r=0;r<a.length;r++){var c=e(a[r]);t[c].references--}for(var s=o(n,i),l=0;l<a.length;l++){var d=e(a[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}a=s}}},659:n=>{var t={};n.exports=function(n,e){var o=function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}t[n]=e}return t[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}},540:n=>{n.exports=function(n){var t=document.createElement("style");return n.setAttributes(t,n.attributes),n.insert(t,n.options),t}},56:(n,t,e)=>{n.exports=function(n){var t=e.nc;t&&n.setAttribute("nonce",t)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=n.insertStyleElement(n);return{update:function(e){!function(n,t,e){var o="";e.supports&&(o+="@supports (".concat(e.supports,") {")),e.media&&(o+="@media ".concat(e.media," {"));var i=void 0!==e.layer;i&&(o+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),o+=e.css,i&&(o+="}"),e.media&&(o+="}"),e.supports&&(o+="}");var a=e.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(o,n,t.options)}(t,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)}}}},113:n=>{n.exports=function(n,t){if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}},t={};function e(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={id:o,exports:{}};return n[o](a,a.exports,e),a.exports}e.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},e.d=(n,t)=>{for(var o in t)e.o(t,o)&&!e.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},e.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),e.nc=void 0,(()=>{var n=e(72),t=e.n(n),o=e(825),i=e.n(o),a=e(659),r=e.n(a),c=e(56),s=e.n(c),l=e(540),d=e.n(l),p=e(113),u=e.n(p),m=e(735),f={};f.styleTagTransform=u(),f.setAttributes=s(),f.insert=r().bind(null,"head"),f.domAPI=i(),f.insertStyleElement=d(),t()(m.A,f),m.A&&m.A.locals&&m.A.locals,console.log("JavaScript loaded");let g=20,h=[],x=[];const v={array:"#ADD8E6",tree:"#90EE90",graph:"#FFB6C1","dynamic programming":"#FFD700",string:"#FF69B4",math:"#CD5C5C","hash table":"#FFA07A","depth-first search":"#20B2AA","breadth-first search":"#778899","two pointers":"#B0E0E6","binary search":"#32CD32",backtracking:"#FF4500",greedy:"#DA70D6",heap:"#EEE8AA",default:"#D3D3D3"};function b(n,t=!1){const e=document.createElement("span");return e.classList.add("topic-label"),e.textContent=n,e.style.backgroundColor=function(n){const t=n.trim().toLowerCase();return v[t]||v.default}(n),t&&(e.classList.add("clickable"),e.addEventListener("click",(()=>w([n])))),e}function y(n,t){const e=document.createElement("section");e.classList.add("slide-section");const o=document.createElement("h2");o.textContent=n.title,e.appendChild(o);const i=document.createElement("a");i.href=n.link,i.textContent="Problem Link",i.target="_blank",e.appendChild(i);const a=document.createElement("div");a.classList.add("topics"),n.topics.forEach((n=>{const t=b(n);a.appendChild(t)})),e.appendChild(a);const r=document.createElement("img");r.id=`slide-image-${t}`,r.src=`/intuition-visualisation/${n.paths[0]}`,r.dataset.page=0,e.appendChild(r);const c=document.createElement("div");c.classList.add("controls");const s=document.createElement("div");s.classList.add("button-group");const l=document.createElement("button");l.textContent="◀",l.addEventListener("click",(()=>C(t,-1))),s.appendChild(l);const d=document.createElement("button");d.textContent="▶",d.addEventListener("click",(()=>C(t,1))),s.appendChild(d),c.appendChild(s);const p=document.createElement("div");p.id=`page-info-${t}`,p.textContent=`1 / ${n.total}`,c.appendChild(p),e.appendChild(c),document.getElementById("slides-container").appendChild(e)}function C(n,t){const e=x[n],o=document.getElementById(`slide-image-${n}`),i=document.getElementById(`page-info-${n}`);let a=parseInt(o.dataset.page)||0;a+=t,a<0&&(a=0),a>=e.total&&(a=e.total-1),o.src=`/intuition-visualisation/${e.paths[a]}`,o.dataset.page=a,i.textContent=`${a+1} / ${e.total}`}function E(n,t){document.getElementById("slides-container").innerHTML="";const e=n*g,o=Math.min(e+g,t.length);for(let n=e;n<o;n++)y(t[n],n);var i;!function(n,t){const e=Math.ceil(t.length/g),o=document.getElementById("pagination-controls");o.innerHTML="";for(let i=0;i<e;i++){const e=document.createElement("button");e.textContent=i+1,i===n?e.disabled=!0:e.addEventListener("click",(()=>E(i,t))),o.appendChild(e)}}(n,t),i=t.length,document.getElementById("slide-count-container").textContent=`Slides found: ${i}`}function w(n){const t=n.map((n=>n.trim().toLowerCase()));x=h.filter((n=>{const e=t.some((t=>n.title.toLowerCase().includes(t))),o=t.every((t=>n.topics.map((n=>n.trim().toLowerCase())).includes(t)));return e||o})),E(0,x)}document.getElementById("filter-button").addEventListener("click",(()=>{w(document.getElementById("topic-filter").value.split(","))})),fetch("/intuition-visualisation/slideSets.json").then((n=>n.json())).then((n=>{console.log("Data fetched:",n),h=n,x=h,function(n){const t=document.getElementById("topic-tags-container");t.innerHTML="";const e=[...new Set(n.flat().map((n=>n.trim().toLowerCase())))];e.sort(),e.forEach((n=>{const e=b(n,!0);t.appendChild(e)}))}(h.map((n=>n.topics))),E(0,h)}))})()})();