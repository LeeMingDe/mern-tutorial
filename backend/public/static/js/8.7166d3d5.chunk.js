(this["webpackJsonpmern-tutorial"]=this["webpackJsonpmern-tutorial"]||[]).push([[8],{43:function(e,t,c){"use strict";c(0),c(49);var n=c(1);t.a=function(e){return Object(n.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},49:function(e,t,c){},63:function(e,t,c){},64:function(e,t,c){},65:function(e,t,c){},74:function(e,t,c){"use strict";c.r(t);var n=c(47),s=c.n(n),a=c(48),r=c(11),i=c(0),l=c.n(i),u=c(50),j=c(17),o=c(51),m=c(9),h=(c(63),c(1)),d=function(e){return Object(h.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:Object(h.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})},b=c(43),p=(c(64),function(e){return Object(h.jsx)("li",{className:"user-item",children:Object(h.jsx)(b.a,{className:"user-item__content",children:Object(h.jsxs)(m.b,{to:"/".concat(e.id,"/places"),children:[Object(h.jsx)("div",{className:"user-item__image",children:Object(h.jsx)(d,{image:"".concat("https://mern-app-tut.herokuapp.com","/").concat(e.image),alt:e.name})}),Object(h.jsxs)("div",{className:"user-item__info",children:[Object(h.jsx)("h2",{children:e.name}),Object(h.jsxs)("h3",{children:[e.placeCount," ",1===e.placeCount?"Place":"Places"]})]})]})})})}),O=(c(65),function(e){return 0===e.items.length?Object(h.jsx)("div",{className:"center",children:Object(h.jsx)(b.a,{children:Object(h.jsx)("h2",{children:"No users found."})})}):Object(h.jsx)("ul",{className:"users-list",children:e.items.map((function(e){return Object(h.jsx)(p,{id:e.id,image:e.image,name:e.name,placeCount:e.places.length},e.id)}))})});t.default=function(){var e=Object(o.a)(),t=e.isLoading,c=e.error,n=e.sendRequest,m=e.clearError,d=Object(i.useState)(),b=Object(r.a)(d,2),p=b[0],x=b[1];return Object(i.useEffect)((function(){(function(){var e=Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("https://mern-app-tut.herokuapp.com/api/users");case 3:t=e.sent,x(t.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[n]),Object(h.jsxs)(l.a.Fragment,{children:[Object(h.jsx)(u.a,{error:c,onClear:m}),t&&Object(h.jsx)("div",{className:"center",children:Object(h.jsx)(j.a,{})}),!t&&p&&Object(h.jsx)(O,{items:p})]})}}}]);
//# sourceMappingURL=8.7166d3d5.chunk.js.map