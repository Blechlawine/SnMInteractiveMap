(function(t){function e(e){for(var i,o,c=e[0],r=e[1],l=e[2],p=0,f=[];p<c.length;p++)o=c[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,c=1;c<n.length;c++){var r=n[c];0!==a[r]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},s=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=r;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0e62":function(t,e,n){},"0f85":function(t,e,n){"use strict";n("9bb5")},"16b3":function(t,e,n){},"172a":function(t,e,n){},"2c53":function(t,e,n){"use strict";n("0e62")},"2d3e":function(t,e,n){},"32b7":function(t,e,n){"use strict";n("f6dc")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],o={name:"App",mounted:function(){this.$store.dispatch("fetchAll")}},c=o,r=(n("5c0b"),n("2877")),l=Object(r["a"])(c,a,s,!1,null,null,null),u=l.exports,p=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("Sidebar",{staticClass:"sidebar"}),n("Map",{staticClass:"map"})],1)},d=[],v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"component",staticClass:"map",style:t.mapStyle,on:{mousedown:t.onMouseDown,mouseup:t.stopMoving,mousemove:t.onMouseMove,wheel:t.zoom,click:t.useTool}},[n("div",{ref:"map",staticClass:"mapContent",style:t.mapPositionStyle},[n("img",{ref:"image",staticClass:"image",attrs:{src:""+t.mapImageSrc,alt:""}}),t._l(t.pins,(function(e){return n("Pin",{key:e.id,style:t.pinStyle,attrs:{pin:e}})}))],2),n("IconButton",{staticClass:"addBtn",attrs:{primary:!0},on:{click:t.selectAddTool}},[t._v("add")]),n("Dialog",{staticClass:"addPinDialog",attrs:{title:"Create new pin",open:t.addPinDialogOpen},on:{close:t.closeAddPinDialog}},[n("TextInput",{attrs:{label:"Name"},model:{value:t.newPin.title,callback:function(e){t.$set(t.newPin,"title",e)},expression:"newPin.title"}}),n("Dropdown",{attrs:{value:this.newPin.category.title,values:t.categories,label:"Category"},on:{change:this.setNewPinCategory},scopedSlots:t._u([{key:"value",fn:function(e){var i=e.value;return[n("p",[t._v(t._s(i.title))])]}}])}),n("Dropdown",{attrs:{value:this.newPin.type.title,values:t.types,label:"Type"},on:{change:this.setNewPinType},scopedSlots:t._u([{key:"value",fn:function(e){var i=e.value;return[n("p",[t._v(t._s(i.title))])]}}])}),n("Button",{attrs:{primary:""},on:{click:t.addPin}},[t._v("Add")])],1)],1)},h=[],m=n("5530"),g=(n("99af"),n("d81d"),n("b0c0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pin",style:t.pinStyle},[n("div",{staticClass:"clicky",on:{click:t.toggleDetails}},[n("span",{staticClass:"material-icons pinIcon"},[t._v("place")])]),t.detailsOpen?n("div",{staticClass:"details"},[n("div",{staticClass:"detailsHeader"},[n("p",{staticClass:"pinTitle"},[t._v(" "+t._s(this.pin.title||"Untitled Pin")+" ")]),n("span",{staticClass:"material-icons closeBtn",on:{click:t.toggleDetails}},[t._v("close")])]),n("div",{staticClass:"detailsContent"},[this.pin.description||this.pin.imageUrl?t._e():n("div",{staticClass:"placeholder"},[n("p",[t._v("This pin does not have a description")])]),this.pin.imageUrl?n("div",{staticClass:"imageContainer"},[n("img",{attrs:{src:this.pin.imageUrl,alt:""}})]):t._e(),this.pin.description?n("p",{staticClass:"description"},[t._v(" "+t._s(this.pin.description)+" ")]):t._e()])]):t._e()])}),y=[],b=n("2f62"),_={name:"pin",props:{pin:Object},data:function(){return{detailsOpen:!1}},computed:Object(m["a"])(Object(m["a"])(Object(m["a"])({},Object(b["c"])({activeArea:function(t){return t.mapLocations[t.mapLocationIndex]}})),Object(b["b"])(["getType"])),{},{visible:function(){return this.getType(this.pin.typeId).visible&&this.activeArea.name==this.pin.area},pinStyle:function(){return{"margin-left":"".concat(this.pin.x,"px"),"margin-top":"".concat(this.pin.y,"px"),display:this.visible?"initial":"none"}}}),methods:{toggleDetails:function(){this.detailsOpen=!this.detailsOpen}}},P=_,x=(n("8c92"),Object(r["a"])(P,g,y,!1,null,"5b001b50",null)),C=x.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:this.classes,on:{click:this.click}},[n("span",{staticClass:"material-icons"},[t._t("default")],2)])},O=[],S={name:"CustomButton",props:{primary:{type:Boolean,default:!1}},computed:{classes:function(){return{buttonPrimary:this.primary,buttonSecondary:!this.primary}}},methods:{click:function(t){this.$emit("click",t)}}},T=S,k=(n("6aaf"),Object(r["a"])(T,w,O,!1,null,"36ad7850",null)),j=k.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:this.classes,on:{click:this.click}},[n("p",{staticClass:"label"},[t._v(t._s(this.text))])])},D=[],$={name:"CustomButton",props:{primary:{type:Boolean,default:!1}},computed:{classes:function(){return{buttonPrimary:this.primary,buttonSecondary:!this.primary}},text:function(){return this.$slots.default[0].text}},methods:{click:function(t){this.$emit("click",t)}}},I=$,E=(n("5be8"),Object(r["a"])(I,M,D,!1,null,"34c3f8f8",null)),L=E.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:this.classes},[n("div",{staticClass:"select",on:{click:t.toggle}},[n("p",{staticClass:"value"},[t._v(t._s(this.value||this.label))]),n("span",{staticClass:"material-icons"},[t._v(t._s(this.open?"expand_less":"expand_more"))])]),this.open?n("div",{staticClass:"values"},t._l(t.values,(function(e){return n("div",{key:JSON.stringify(e),staticClass:"value",attrs:{"data-value":JSON.stringify(e)},on:{click:t.selectValue}},[t._t("value",null,{value:e})],2)})),0):t._e()])},B=[],N={name:"dropdown",model:{prop:"value",event:"change"},props:{label:String,value:String,values:Array},data:function(){return{active:!1,open:!1}},methods:{activate:function(){this.active=!0},deactivate:function(){this.active=!1},toggle:function(){this.open=!this.open},selectValue:function(t){this.$emit("change",t.currentTarget.dataset.value),this.open=!1}},computed:{labelStyles:function(){return{}},classes:function(){return{dropdown:!0,open:this.open}}}},R=N,J=(n("a0dc"),Object(r["a"])(R,A,B,!1,null,"7e851a89",null)),z=J.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.open?n("div",{staticClass:"dialogWrapper"},[n("div",{staticClass:"clickAwayListener",on:{click:t.close}}),n("div",{staticClass:"dialog"},[n("div",{staticClass:"titleBar"},[n("p",{staticClass:"title"},[t._v(t._s(t.title))]),n("span",{staticClass:"material-icons closeBtn",on:{click:t.close}},[t._v("close")])]),n("div",{staticClass:"dialogContent"},[t._t("default")],2)])]):t._e()},Y=[],H={name:"CustomDialog",props:{title:String,open:Boolean},methods:{close:function(){this.$emit("close")}}},X=H,F=(n("32b7"),Object(r["a"])(X,U,Y,!1,null,"4b060170",null)),V=F.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:this.inputClasses},[n("label",{style:this.labelStyles},[t._v(t._s(this.label))]),n("input",{ref:"input",attrs:{type:this.type},domProps:{value:this.value},on:{input:this.onInput,focus:this.activate,blur:this.deactivate,keypress:this.keypress}})])},q=[],G={name:"textinput",model:{prop:"value",event:"change"},props:{label:String,value:String,password:{type:Boolean,default:!1}},data:function(){return{active:!1}},methods:{onInput:function(t){this.$emit("change",t.target.value),this.$emit("input",t)},activate:function(){this.active=!0},deactivate:function(){this.active=!1},focus:function(){this.$refs.input.focus()},keypress:function(t){this.$emit("keypress",t)}},computed:{type:function(){return this.password?"password":"text"},empty:function(){return""==this.value&&!this.active},labelStyles:function(){return{"font-size":this.empty?"16px":"11px",transform:this.empty?"":"translate(3px, -16px)"}},inputClasses:function(){return{textinput:!0,active:this.active}}}},K=G,Q=(n("2c53"),Object(r["a"])(K,W,q,!1,null,"0ca9cb5e",null)),Z=Q.exports,tt={name:"movableMap",components:{Pin:C,Dropdown:z,Button:L,TextInput:Z,IconButton:j,Dialog:V},data:function(){return{moving:!1,mapPosition:{x:0,y:0},mouseDownPosition:{x:0,y:0},prevMapPosition:{x:0,y:0},canMove:!0,mapScale:1,addPinDialogOpen:!1,newPin:{title:"",category:{},type:{},x:0,y:0}}},computed:Object(m["a"])(Object(m["a"])(Object(m["a"])({},Object(b["c"])({activeArea:function(t){return t.mapLocations[t.mapLocationIndex]},categories:function(t){return t.pins.categories},types:function(t){return t.pins.types},pins:function(t){return t.pins.pins}})),Object(b["b"])(["privateCategories","privateTypes","privatePins"])),{},{mapPositionStyle:function(){return{transform:"scale(".concat(this.mapScale,") translate(").concat(this.mapPosition.x,"px, ").concat(this.mapPosition.y,"px)")}},mapImageSrc:function(){return this.$store.state.mapLocations[this.$store.state.mapLocationIndex].path},mapStyle:function(){return{cursor:this.canMove?this.moving?"grabbing":"grab":"crosshair"}},pinStyle:function(){return{transform:"scale(".concat(1/this.mapScale,") translate(-").concat(18*this.mapScale,"px, -").concat(18*this.mapScale,"px)")}}}),methods:{onMouseDown:function(t){this.canMove&&(this.moving=!0,this.mouseDownPosition.x=t.clientX,this.mouseDownPosition.y=t.clientY,this.prevMapPosition=Object(m["a"])({},this.mapPosition))},stopMoving:function(){this.moving=!1},onMouseMove:function(t){this.moving&&this.canMove&&this.moveMap(t),t.preventDefault()},moveMap:function(t){this.mapPosition.x=this.prevMapPosition.x+(t.clientX-this.mouseDownPosition.x)/this.mapScale,this.mapPosition.y=this.prevMapPosition.y+(t.clientY-this.mouseDownPosition.y)/this.mapScale},zoom:function(t){this.canMove&&(t.deltaY>0?this.mapScale*=.9:(this.mapScale*=1.1,this.mapPosition))},selectAddTool:function(){var t=this;setTimeout((function(){t.canMove=!1}),100),window.addEventListener("keydown",this.cancelTool)},useTool:function(t){if(!this.canMove&&!this.addPinDialogOpen){this.mouseDownPosition.x=t.clientX,this.mouseDownPosition.y=t.clientY;var e=this.$refs.map.getBoundingClientRect();this.newPin.x=(t.clientX-e.x)/this.mapScale,this.newPin.y=(t.clientY-e.y)/this.mapScale,this.openAddPinDialog()}},cancelTool:function(t){"Escape"==t.code&&(this.canMove=!0,window.removeEventListener("keydown",this.cancelTool))},openAddPinDialog:function(){this.addPinDialogOpen=!0},closeAddPinDialog:function(){this.canMove=!0,this.addPinDialogOpen=!1},addPin:function(){var t=Object(m["a"])(Object(m["a"])({},this.newPin),{},{area:this.activeArea.name});this.$store.dispatch("addPrivatePin",t),this.closeAddPinDialog()},setNewPinCategory:function(t){var e=JSON.parse(t);this.newPin.categoryId=e.id,this.newPin.category=e},setNewPinType:function(t){var e=JSON.parse(t);this.newPin.typeId=e.id,this.newPin.type=e}}},et=tt,nt=(n("0f85"),Object(r["a"])(et,v,h,!1,null,"d1ab5af2",null)),it=nt.exports,at=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("div",{staticClass:"locations"},t._l(t.mapLocations,(function(e,i){return n("Button",{key:e.name,attrs:{"data-index":i,primary:!0},on:{click:t.changeMapLocation}},[t._v(" "+t._s(e.name)+" ")])})),1),n("p",[t._v("Categories")]),n("div",{staticClass:"categories public"},t._l(t.publicCategories,(function(e,i){return n("FoldableSection",{key:e.id,staticClass:"category",attrs:{title:e.title+" "+(e.private?"(private)":"")}},t._l(t.getCategoryTypes(e.id),(function(e,a){return n("ToggleSwitch",{key:e.id,attrs:{on:e.visible,label:e.title+" "+(e.private?"(private)":"")},on:{change:function(){t.toggleType(e,a,i)}}})})),1)})),1)])},st=[],ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"foldableSection"},[n("div",{staticClass:"sectionHeader",on:{click:t.toggle}},[n("p",{staticClass:"title"},[t._v(t._s(t.title))]),n("span",{staticClass:"material-icons"},[t._v(t._s(this.open?"expand_less":"expand_more"))])]),this.open?n("div",{staticClass:"content"},[t._t("default")],2):t._e()])},ct=[],rt={name:"foldableSection",props:{title:String},data:function(){return{open:!0}},methods:{toggle:function(){this.open=!this.open}}},lt=rt,ut=(n("f53d"),Object(r["a"])(lt,ot,ct,!1,null,"7d76609e",null)),pt=ut.exports,ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"toggleSwitch",on:{click:t.toggle}},[n("span",{staticClass:"material-icons"},[t._v(t._s(this.on?"check_box":"check_box_outline_blank"))]),n("p",[t._v(t._s(this.label))])])},dt=[],vt={name:"ToggleSwitch",model:{event:"change",prop:"on"},props:{on:Boolean,label:String},methods:{toggle:function(){this.$emit("change",!this.on)}}},ht=vt,mt=(n("e3cf"),Object(r["a"])(ht,ft,dt,!1,null,"45551279",null)),gt=mt.exports,yt={name:"sidebar",components:{Button:L,FoldableSection:pt,ToggleSwitch:gt},computed:Object(m["a"])(Object(m["a"])({},Object(b["b"])(["getCategoryTypes"])),Object(b["c"])({mapLocations:function(t){return t.mapLocations},publicCategories:function(t){return t.pins.categories},publicTypes:function(t){return t.pins.types}})),methods:{changeMapLocation:function(t){this.$store.commit("setMapLocationIndex",parseInt(t.target.dataset.index))},toggleType:function(t,e,n){t.visible=!t.visible,this.$store.commit("updateType",{type:t,typeIndex:e,categoryIndex:n})}}},bt=yt,_t=(n("576d"),Object(r["a"])(bt,at,st,!1,null,"cc18b810",null)),Pt=_t.exports,xt={name:"Home",components:{Map:it,Sidebar:Pt}},Ct=xt,wt=(n("f4e7"),Object(r["a"])(Ct,f,d,!1,null,"ecb3ce38",null)),Ot=wt.exports;i["a"].use(p["a"]);var St=[{path:"/",name:"Home",component:Ot}],Tt=new p["a"]({mode:"history",base:"/",routes:St}),kt=Tt,jt=n("1da1"),Mt=(n("96cf"),n("d3b7"),n("159b"),n("7db0"),n("e9c4"),n("4de4"),n("bc3a")),Dt=n.n(Mt),$t={state:function(){return{categories:[],types:[],pins:[]}},mutations:{setCategories:function(t,e){t.categories=e},setTypes:function(t,e){t.types=e},setPins:function(t,e){t.pins=e},updateType:function(t,e){var n=e.type,i=e.typeIndex;Object.assign(t.types[i],n)},updatePrivateType:function(t,e){var n=e.type,i=e.typeIndex;Object.assign(t.privateTypes[i],n)},addPrivatePin:function(t,e){e.private=!0,t.pins.push(e)},addPrivateType:function(t,e){e.private=!0,t.types.push(e)},addPrivateCategory:function(t,e){e.private=!0,t.categories.push(e)},setPrivateCategories:function(t,e){e.forEach((function(t){t.private=!0})),t.categories=t.categories.concat(e)},setPrivateTypes:function(t,e){e.forEach((function(t){t.private=!0})),t.types=t.types.concat(e)},setPrivatePins:function(t,e){e.forEach((function(t){t.private=!0})),t.pins=t.pins.concat(e)}},actions:{fetchAll:function(t){return Object(jt["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.dispatch,e.next=3,n("fetchCategories");case 3:return e.next=5,n("fetchTypes");case 5:return e.next=7,n("fetchPins");case 7:n("loadPrivateData");case 8:case"end":return e.stop()}}),e)})))()},fetchCategories:function(t){return Object(jt["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,Dt.a.get("/categories").then((function(t){var e=t.data.data.categories;e.forEach((function(t){t.private=!1})),n("setCategories",e)}));case 3:case"end":return e.stop()}}),e)})))()},fetchTypes:function(t){return Object(jt["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,Dt.a.get("/types").then((function(t){var e=t.data.data.types;e.forEach((function(t){t.visible=!0,t.private=!1})),n("setTypes",e)}));case 3:case"end":return e.stop()}}),e)})))()},fetchPins:function(t){return Object(jt["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,Dt.a.get("/pins").then((function(t){var e=t.data.data.pins;e.forEach((function(t){t.private=!1})),n("setPins",e)}));case 3:case"end":return e.stop()}}),e)})))()},loadPrivateData:function(t){var e=t.commit,n=localStorage.getItem("privateData");if(n){var i=JSON.parse(n);e("setPrivateCategories",i.categories),e("setPrivateTypes",i.types),e("setPrivatePins",i.pins)}},addPrivatePin:function(t,e){var n=t.state,i=t.getters,a=t.commit,s=n.categories.find((function(t){return t.id===e.categoryId}));s||a("addPrivateCategory",e.category),delete e.category;var o=n.types.find((function(t){return t.id===e.typeId}));o||a("addPrivateType",e.type),delete e.type,a("addPrivatePin",e),localStorage.setItem("privateData",JSON.stringify({categories:i["privateCategories"],types:i["privateTypes"],pins:i["privatePins"]}))}},getters:{publicCategories:function(t){return t.categories.filter((function(t){return!t.private}))},publicTypes:function(t){return t.types.filter((function(t){return!t.private}))},publicPins:function(t){return t.pins.filter((function(t){return!t.private}))},privateCategories:function(t){return t.categories.filter((function(t){return t.private}))},privateTypes:function(t){return t.types.filter((function(t){return t.private}))},privatePins:function(t){return t.pins.filter((function(t){return t.private}))},getType:function(t){return function(e){return t.types.find((function(t){return t.id===e}))}},getCategoryTypes:function(t){return function(e){return t.types.filter((function(t){return t.categoryId===e}))}}}};i["a"].use(b["a"]);var It=new b["a"].Store({state:{mapLocationIndex:0,mapLocations:[{name:"Azura",path:"Map_AzuraIsland.png"},{name:"Farmlands",path:"map_farmlands_prototype_vec.svg"}]},mutations:{setMapLocationIndex:function(t,e){t.mapLocationIndex=e}},actions:{},modules:{pins:$t}});Dt.a.defaults.baseURL="/api",i["a"].config.productionTip=!1,new i["a"]({router:kt,store:It,render:function(t){return t(u)}}).$mount("#app")},"576d":function(t,e,n){"use strict";n("172a")},"5a5a":function(t,e,n){},"5be8":function(t,e,n){"use strict";n("6be5")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"6aaf":function(t,e,n){"use strict";n("bcc3")},"6be5":function(t,e,n){},"8c92":function(t,e,n){"use strict";n("5a5a")},"9bb5":function(t,e,n){},"9c0c":function(t,e,n){},a0dc:function(t,e,n){"use strict";n("cc85")},bcc3:function(t,e,n){},cc85:function(t,e,n){},cc8a:function(t,e,n){},e3cf:function(t,e,n){"use strict";n("16b3")},f4e7:function(t,e,n){"use strict";n("2d3e")},f53d:function(t,e,n){"use strict";n("cc8a")},f6dc:function(t,e,n){}});
//# sourceMappingURL=app.ce1ffe42.js.map