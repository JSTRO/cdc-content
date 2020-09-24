(this["webpackJsonpcdc-content"]=this["webpackJsonpcdc-content"]||[]).push([[0],{104:function(e,t,a){},105:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),i=a.n(c),s=(a(81),a(17)),o=a.n(s),l=a(22),u=a(13),m=a(23),d=a.n(m),p=a(72),g=a(64),h=a(6),f=new function e(){Object(g.a)(this,e),Object(h.h)(this,{loading:!0,isLoggedIn:!1,username:""})};var v=function(e){var t=e.type,a=e.placeholder,n=e.value,c=e.onChange;return r.a.createElement("div",{className:"input"},r.a.createElement("input",{type:t,placeholder:a,value:n,onChange:function(e){return c(e.target.value)}}))};var b=function(e){var t=e.text,a=e.disabled,n=e.onClick;return r.a.createElement("div",{className:"submit"},r.a.createElement("button",{text:t,disabled:a,onClick:function(){return n()}},t))};var E=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(""),s=Object(u.a)(i,2),m=s[0],p=s[1],g=Object(n.useState)(!1),h=Object(u.a)(g,2),E=h[0],j=h[1],O=function(e,t){(t=t.trim()).length>12||("username"===e?c(t):p(t))},w=function(){c(""),p(""),j(!1)},x=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return");case 2:if(m){e.next=4;break}return e.abrupt("return");case 4:return j(!0),e.prev=5,e.next=8,d()({url:"/login",method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},data:JSON.stringify({username:a,password:m})});case 8:return t=e.sent,e.next=11,t.data;case 11:(n=e.sent)&&n.success?(f.isLoggedIn=!0,f.username=n.username,console.log(f.isLoggedIn,"UserStore.isLoggedIn")):n&&!1===n.success&&(w(),alert(n.msg)),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),w();case 18:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"login"},r.a.createElement(v,{type:"text",placeholder:"Username",value:a||"",onChange:function(e){return O("username",e)}}),r.a.createElement(v,{type:"password",placeholder:"Password",value:m||"",onChange:function(e){return O("password",e)}}),r.a.createElement(b,{text:"Log in",disabled:E,onClick:function(){return x()}}))},j=a(65),O=a.n(j),w=a(160),x=a(144),S=Object(x.a)((function(e){return{search:{position:"relative"},searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputInput:{padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"}}}));var y=function(e){var t=e.search,a=e.setSearch,n=S();return r.a.createElement("div",{className:n.search},r.a.createElement("div",{className:n.searchIcon},r.a.createElement(O.a,null)),r.a.createElement(w.a,{placeholder:"Search\u2026",name:"search",value:t,onChange:function(e){var t=e.target.value;a(t)},classes:{root:n.inputRoot,input:n.inputInput},inputProps:{"aria-label":"search"}}))};function k(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(u.a)(c,2),s=i[0],m=i[1],p=Object(n.useState)([]),g=Object(u.a)(p,2),h=g[0],f=g[1];return Object(n.useEffect)((function(){(function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),m(!1),e.prev=2,e.next=5,d.a.get("https://tools.cdc.gov/api/v2/resources/media?max=1000");case 5:t=e.sent,f(t.data.results),r(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),m(!0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}})()()}),[]),{loading:a,error:s,articles:h,setArticles:f}}var I=a(147),C=a(148),L=a(38),N=a(149),A=a(162);var B=Object(x.a)((function(e){return{root:{display:"flex",margin:10},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto",maxWidth:1e3},chip:{margin:10}}}));var P=function(e){var t=e.article,a=B(),n=t.name,c=t.description,i=t.datePublished,s=t.tags,o=t.owningOrgId,l=t.sourceUrl;return r.a.createElement(I.a,{className:a.root,variant:"outlined"},r.a.createElement("div",{className:a.details},r.a.createElement(C.a,{className:a.content},r.a.createElement(L.a,{variant:"h5",component:"h2",gutterBottom:!0},r.a.createElement(N.a,{href:l,target:"blank",color:"inherit",underline:"none"},n)),r.a.createElement(L.a,{color:"textSecondary",gutterBottom:!0},o," \u2022 Published: ",function(e){var t=new Date(e).getFullYear(),a=new Date(e).getMonth(),n=new Date(e).getDate();return"".concat(a,"-").concat(n,"-").concat(t)}(i)),s.map((function(e){return r.a.createElement(A.a,{className:a.chip,size:"small",label:e.name,variant:"outlined",clickable:!0,color:"primary",key:e.id})})),r.a.createElement(L.a,null,c))))};var D=function(e){var t=e.articles;return k().loading?r.a.createElement("p",null,"Loading..."):r.a.createElement("div",null,t.map((function(e){return r.a.createElement(P,{article:e,key:e.id})})))},U=a(159),W=a(37),M=a(48),R=a(3),H=a(27),J=a(158),T=a(151),G=a(152),z=a(150),F=a(155),Y=a(154),$=a(153),q=a(68),K=a.n(q),Q=a(69),V=a.n(Q),X=a(70),Z=a.n(X),_=a(161),ee=a(156),te=a(157),ae=a(49),ne=a.n(ae),re=a(71),ce=a.n(re),ie=Object(x.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:240},title:{flexGrow:1,textAlign:"center"},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(M.a)(Object(M.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"}),content:{flexGrow:1,transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginRight:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:0}}}));function se(){var e=ie(),t=Object(H.a)(),a=r.a.useState(!1),n=Object(u.a)(a,2),c=n[0],i=n[1];return r.a.createElement("div",{className:e.root},r.a.createElement(z.a,null),r.a.createElement(T.a,{position:"fixed",className:Object(R.a)(e.appBar,Object(W.a)({},e.appBarShift,c))},r.a.createElement(G.a,null,r.a.createElement(L.a,{variant:"h6",noWrap:!0,className:e.title},"CDC Content"),r.a.createElement($.a,{color:"inherit","aria-label":"open drawer",edge:"end",onClick:function(){i(!0)},className:Object(R.a)(c&&e.hide)},r.a.createElement(K.a,null)))),r.a.createElement("main",{className:Object(R.a)(e.content,Object(W.a)({},e.contentShift,c))},r.a.createElement("div",{className:e.drawerHeader})),r.a.createElement(J.a,{className:e.drawer,variant:"persistent",anchor:"right",open:c,classes:{paper:e.drawerPaper}},r.a.createElement("div",{className:e.drawerHeader},r.a.createElement($.a,{onClick:function(){i(!1)}},"rtl"===t.direction?r.a.createElement(V.a,null):r.a.createElement(Z.a,null))),r.a.createElement(Y.a,null),r.a.createElement(F.a,null,["My List","Profile Info"].map((function(e,t){return r.a.createElement(_.a,{button:!0,key:e},r.a.createElement(ee.a,null,t%2===0?r.a.createElement(ne.a,null):r.a.createElement(ce.a,null)),r.a.createElement(te.a,{primary:e}))}))),r.a.createElement(Y.a,null),r.a.createElement(F.a,null,r.a.createElement(_.a,null,r.a.createElement(ee.a,null,r.a.createElement(ne.a,null)),r.a.createElement(te.a,null,"Sign Out")))))}a(104);var oe=Object(p.a)((function(){var e=k().articles,t=Object(n.useState)(""),a=Object(u.a)(t,2),c=a[0],i=a[1],s=Object(n.useState)(1),m=Object(u.a)(s,2),p=m[0],g=m[1],h=Object(n.useState)(20),v=Object(u.a)(h,1)[0],j=Object(n.useState)([]),O=Object(u.a)(j,2),w=O[0],x=O[1],S=p*v,I=S-v,C=w.slice(I,S),L=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d()({url:"/isLoggedIn",method:"post",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return t=e.sent,e.next=6,t.data;case 6:(a=e.sent)&&a.success?(console.log("UserStore.isLoggedIn",f.isLoggedIn),f.loading=!1,f.isLoggedIn=!0,f.username=a.username,console.log("UserStore.isLoggedIn",f.isLoggedIn)):(f.loading=!1,f.isLoggedIn=!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),f.loading=!1,f.isLoggedIn=!1;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){L()}),[]);var N=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d()({url:"/logOut",method:"post",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return t=e.sent,e.next=6,t.data;case 6:(a=e.sent)&&a.success&&(f.isLoggedIn=!1,f.username=""),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){x(e.filter((function(e){return e.name.toLowerCase().includes(c.toLowerCase())}))),g(1)}),[c,e]),f.loading?r.a.createElement("div",{className:"App"},r.a.createElement("p",null,"Loading...")):f.isLoggedIn?r.a.createElement("div",{className:"App"},r.a.createElement("p",null,"Welcome, ",f.username),r.a.createElement(b,{text:"Log Out",disabed:!1,onClick:function(){return N()}}),r.a.createElement(se,null),r.a.createElement(y,{search:c,setSearch:i}),r.a.createElement(U.a,{count:Math.ceil(w.length/v),page:p,onChange:function(e,t){g(t)}}),r.a.createElement(D,{articles:C})):r.a.createElement("div",{className:"App"},r.a.createElement(E,null))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},76:function(e,t,a){e.exports=a(105)},81:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.85cee29b.chunk.js.map