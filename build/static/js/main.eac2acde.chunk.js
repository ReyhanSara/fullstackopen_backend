(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),u=t.n(r),c=t(4),l=t(2),i=t(3),m=t.n(i),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},b=function(e){return m.a.post(f,e).then((function(e){return e.data}))},s=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},h=function(e,n){return m.a.delete("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.text,t=e.value,a=e.onChange;return o.a.createElement("div",null,n,": ",o.a.createElement("input",{value:t,onChange:a}))},p=function(e){var n=e.newName,t=e.newNumber,a=e.onChangeName,r=e.onChangeNumber,u=e.onClick;return o.a.createElement("div",null,o.a.createElement("form",null,o.a.createElement("div",null,o.a.createElement(v,{text:"Name",value:n,onChange:a}),o.a.createElement(v,{text:"Number",value:t,onChange:r})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit",onClick:u},"add"))))},E=function(e){var n=e.name,t=e.number,a=e.deletePerson,r=e.btn;return o.a.createElement("div",null,n,"\xa0",t,r?o.a.createElement("button",{onClick:a},"delete"):o.a.createElement("span",null))},g=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},w=function(e){var n=e.onChange;return o.a.createElement("span",null,"filter person with :",o.a.createElement("input",{onChange:n}))},C=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],f=i[1],v=Object(a.useState)(""),C=Object(l.a)(v,2),O=C[0],j=C[1],k=Object(a.useState)(""),N=Object(l.a)(k,2),y=N[0],x=N[1],S=Object(a.useState)(null),P=Object(l.a)(S,2),T=P[0],A=P[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){r(e)}))}),[]);var D=""!==y?t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())})):t;return o.a.createElement("div",null,o.a.createElement("h1",null,"Phonebook"),o.a.createElement(g,{message:T}),o.a.createElement(w,{onChange:function(e){x(e.target.value)}}),o.a.createElement("h3",null,"Add new contact"),o.a.createElement(p,{newName:m,newNumber:O,onChangeName:function(e){console.log(e.target.value),f(e.target.value)},onChangeNumber:function(e){console.log(e.target.value),j(e.target.value)},onClick:function(e){e.preventDefault();var n={name:m,number:O,btn:!0},a=t.map((function(e){return e.name})),o=t.find((function(e){return e.name===n.name})),u=Object(c.a)(Object(c.a)({},o),{},{number:O});-1!==a.indexOf(m)?window.confirm("".concat(m," is already added in the phone book, replace old number with new?"))?s(o.id,u).then((function(e){r(t.map((function(n){return n.id!==o.id?n:e}))),A("Updated phone number of ".concat(m)),setTimeout((function(){A(null)}),5e3)})).catch((function(e){A("Information of ".concat(m," has been removed from the server")),setTimeout((function(){A(null)}),5e3)})):console.log("do nothing"):b(n).then((function(e){r(t.concat(e)),A("Added ".concat(n.name," to phonebook")),setTimeout((function(){A(null)}),5e3)})),f(""),j("")}}),o.a.createElement("h2",null,"Numbers"),D.map((function(e,n){return o.a.createElement(E,{key:n,name:e.name,number:e.number,btn:e.btn,deletePerson:function(){return function(e){if(window.confirm("Do you really want to delete ".concat(e,"?"))){var n=t.find((function(n){return n.id===e})),a=Object(c.a)(Object(c.a)({},n),{},{btn:!1});h(e,a).then((function(n){r(t.map((function(t){return t.id!==e?t:n})))}))}}(e.id)}})})))};t(37);u.a.render(o.a.createElement(C,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.eac2acde.chunk.js.map