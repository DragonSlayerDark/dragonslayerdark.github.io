"use strict";(self.webpackChunkpawl_frontend=self.webpackChunkpawl_frontend||[]).push([[888],{9888:(C,l,s)=>{s.r(l),s.d(l,{HomeModule:()=>x});var r=s(9808),i=s(3257),e=s(5e3),d=s(9850),m=s(2943),a=s(5642);const u=function(o){return{borderColor:o}},p=function(o){return{color:o}};function g(o,n){if(1&o&&(e.TgZ(0,"div",2)(1,"div",3),e._UZ(2,"img",4),e.qZA(),e.TgZ(3,"div",5)(4,"div",6),e._uU(5),e.qZA(),e.TgZ(6,"div",7),e._uU(7),e.qZA()()()),2&o){const t=n.$implicit;e.Q6J("routerLink",t.route),e.xp6(1),e.Q6J("ngStyle",e.VKq(6,u,t.color)),e.xp6(1),e.Q6J("src",t.img,e.LSH),e.xp6(2),e.Q6J("ngStyle",e.VKq(8,p,t.color)),e.xp6(1),e.hij(" ",t.title," "),e.xp6(2),e.hij(" ",t.info," ")}}let f=(()=>{class o{constructor(){this.selectedPetIDRoute=null!=localStorage.getItem(a.D5.SELECTED_PET_ID)?"/my-pets/vaccine-card/"+localStorage.getItem(a.D5.SELECTED_PET_ID):"/my-pets",this.INFO=[{img:"assets/Grupo 1253.svg",title:"Cartilla Vacunaci\xf3n",info:"Lleva el control de la salud de tu mascota mediante el registro de vacunas, medicina preventiva y desparasitantes.",color:"#5CCBC2",route:this.selectedPetIDRoute},{img:"assets/tienda-home.svg",title:"Tienda Pawl",info:"Obt\xe9n los mejores productos y promociones en todo lo necesario para cuidar y consentir a tus mascotas.",color:"#009DE0",route:["/shop"]},{img:"assets/pedidos-home.svg",title:"Seguimiento Pedidos",info:"Revisa tu listado de todos los pedidos de compras realizados para cada una de tus mascotas ",color:"#AC79AF",route:["/shop/orders"]}]}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-info-home"]],decls:2,vars:1,consts:[[1,""],["class","grid grid-cols-4 my-3 mt-8 cursor-pointer",3,"routerLink",4,"ngFor","ngForOf"],[1,"grid","grid-cols-4","my-3","mt-8","cursor-pointer",3,"routerLink"],[1,"flex","justify-center","items-center","border-4","object-top","rounded-full","h-16","w-16","col-span-1",3,"ngStyle"],[3,"src"],[1,"col-span-3"],[1,"font-bold","text-lg",3,"ngStyle"],[1,"text-gray-400","text-sm"]],template:function(t,c){1&t&&(e._UZ(0,"div",0),e.YNc(1,g,8,10,"div",1)),2&t&&(e.xp6(1),e.Q6J("ngForOf",c.INFO))},dependencies:[r.sg,r.PC,i.rH]}),o})();const v=[{path:"",component:(()=>{class o{constructor(t){this.auth=t}ngOnInit(){this.auth.getId(),setTimeout(()=>this.debug(),1e3)}debug(){(null===localStorage.getItem("reloadDebug")||!1===JSON.parse(localStorage.getItem("reloadDebug")))&&(window.location.reload(),localStorage.setItem("reloadDebug",JSON.stringify(!0)))}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(d.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-home"]],decls:13,vars:1,consts:[[1,"content","content-margintop","mb-16"],[1,"font-bold","text-2xl","text-center","mb-4",2,"color","#937195"],[1,"rounded-3xl","py-5","w-full","flex","justify-center",2,"box-shadow","inset 0 0 20px #E2DBCA"],[1,"text-yellow-500","font-bold","text-xl","tracking-widest","block","text-center","mb-4"],[3,"showAdd"],[1,"rounded-3xl","py-1","mx-12","mt-6","h-2","justify-center","box-shadow-base"],[1,"flex","justify-center","p-6"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0)(1,"h1",1)(2,"b"),e._uU(3," Bienvenido "),e.qZA()(),e.TgZ(4,"div")(5,"div",2)(6,"div")(7,"h1",3),e._uU(8," Mis Mascotas "),e.qZA(),e._UZ(9,"app-pets",4),e.qZA()()(),e._UZ(10,"div",5),e.TgZ(11,"div",6),e._UZ(12,"app-info-home"),e.qZA()()),2&t&&(e.xp6(9),e.Q6J("showAdd",!0))},dependencies:[m.n,f]}),o})()}];let h=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[i.Bz.forChild(v),i.Bz]}),o})();var y=s(2271);let x=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[r.ez,h,y.m]}),o})()}}]);