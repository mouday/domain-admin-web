import{_ as y}from"./index.3a962a7b.js";import{ai as r,o as _,c as f,U as s,O as a,a as b,S as C,T as g,M as w,R as $,F as v,a8 as k}from"./vendor-vue.4528e1db.js";import{e as S}from"./element-plus.30d726c7.js";import{i as V,p as x,c as D}from"./vendor-lib.c9601dda.js";import"./element-icon.3215fc88.js";const E={mail_host:[{message:"\u670D\u52A1\u5668\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],mail_port:[{message:"\u670D\u52A1\u5668\u7AEF\u53E3\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],mail_alias:[{message:"\u53D1\u4EF6\u4EBA\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],mail_username:[{message:"\u53D1\u4EF6\u4EBA\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],mail_password:[{message:"\u53D1\u4EF6\u4EBA\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}]},T={subject:[{message:"\u90AE\u4EF6\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],content:[{message:"\u90AE\u4EF6\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],email_list:[{message:"\u6536\u4EF6\u90AE\u7BB1\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},F={name:"",props:{row:{type:Object,default:null},defaultEamil:{type:String,default:""}},components:{},data(){return{rules:T,form:{subject:"Domain Admin\u6D4B\u8BD5\u90AE\u4EF6",content:"\u6B22\u8FCE\u4F7F\u7528Domain Admin\u57DF\u540D\u8BC1\u4E66\u76D1\u63A7\u7CFB\u7EDF",email_list:""}}},computed:{},methods:{async getData(){if(this.row){let t={id:this.row.id};const e=await this.$http.function(t);if(e.code!=0)return;let o=e.data;this.form.subject=o.subject,this.form.content=o.content,this.form.email_list=o.email_list}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={subject:this.form.subject,content:this.form.content,email_list:this.form.email_list.split(";"),mail_host:this.row.mail_host,mail_port:this.row.mail_port,mail_alias:this.row.mail_alias,mail_username:this.row.mail_username,mail_password:this.row.mail_password},o=await this.$http.sendTestEmail(e);o.code==0?(this.$msg.success("\u53D1\u9001\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})}},created(){this.form.email_list=this.row.mail_username}},j={class:"text-center"};function N(t,e,o,h,l,n){const m=r("el-input"),i=r("el-form-item"),c=r("el-form"),p=r("el-button");return _(),f("div",null,[s(c,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:a(()=>[s(i,{label:"\u6536\u4EF6\u90AE\u7BB1",prop:"email_list"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.email_list,"onUpdate:modelValue":e[0]||(e[0]=u=>l.form.email_list=u),placeholder:"\u6536\u4EF6\u90AE\u7BB1\uFF0C\u591A\u4E2A\u5206\u53F7\u9694\u5F00\u3002\u4F8B\u5982\uFF1A123456@qq.com"},null,8,["modelValue"])]),_:1}),s(i,{label:"\u90AE\u4EF6\u6807\u9898",prop:"subject"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.subject,"onUpdate:modelValue":e[1]||(e[1]=u=>l.form.subject=u),placeholder:"\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"},null,8,["modelValue"])]),_:1}),s(i,{label:"\u90AE\u4EF6\u5185\u5BB9",prop:"content"},{default:a(()=>[s(m,{type:"textarea",rows:5,modelValue:l.form.content,"onUpdate:modelValue":e[2]||(e[2]=u=>l.form.content=u),placeholder:"\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),b("div",j,[s(p,{onClick:n.handleCancel},{default:a(()=>[C(g(t.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),s(p,{type:"primary",onClick:n.handleSubmit},{default:a(()=>[C(g(t.$t("\u53D1\u9001")),1)]),_:1},8,["onClick"])])])}const q=y(F,[["render",N]]),O={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1},defaultEamil:{type:String,default:""}},emits:["update:visible"],components:{DataForm:q},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function U(t,e,o,h,l,n){const m=r("DataForm"),i=r("el-dialog");return _(),w(i,{title:"\u90AE\u4EF6\u53D1\u9001\u6D4B\u8BD5",modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=c=>n.dialogVisible=c),width:"500px",center:"","append-to-body":""},{default:a(()=>[n.dialogVisible?(_(),w(m,{key:0,row:o.row,defaultEamil:o.defaultEamil,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","defaultEamil","onOnCancel","onOnSuccess"])):$("",!0)]),_:1},8,["modelValue"])}const L=y(O,[["render",U]]),B={name:"",props:{row:{type:Object,default:null}},components:{EmailTestDataFormDialog:L},data(){return{rules:E,dialogVisible:!1,form:{mail_host:"",mail_port:"",mail_alias:"",mail_username:"",mail_password:""}}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getAllSystemConfig(t);if(e.code!=0)return;let o=e.data;this.form.mail_host=o.mail_host,this.form.mail_port=o.mail_port,this.form.mail_alias=o.mail_alias,this.form.mail_username=o.mail_username,this.form.mail_password=o.mail_password},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={mail_host:this.form.mail_host,mail_port:this.form.mail_port,mail_alias:this.form.mail_alias,mail_username:this.form.mail_username,mail_password:this.form.mail_password};const o=await this.$http.updateSystemConfig(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},handleTest(){this.dialogVisible=!0},handleTestSuccess(){}},created(){this.getData()}},R={class:""},Y={class:"text-center"};function A(t,e,o,h,l,n){const m=r("el-input"),i=r("el-form-item"),c=r("el-form"),p=r("el-button"),u=r("EmailTestDataFormDialog");return _(),f("div",R,[s(c,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:a(()=>[s(i,{label:t.$t("\u670D\u52A1\u5668\u5730\u5740"),prop:"mail_host"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.mail_host,"onUpdate:modelValue":e[0]||(e[0]=d=>l.form.mail_host=d),placeholder:"\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740"},null,8,["modelValue"])]),_:1},8,["label"]),s(i,{label:t.$t("\u670D\u52A1\u5668\u7AEF\u53E3"),prop:"mail_port"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.mail_port,"onUpdate:modelValue":e[1]||(e[1]=d=>l.form.mail_port=d),placeholder:"\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u7AEF\u53E3"},null,8,["modelValue"])]),_:1},8,["label"]),s(i,{label:t.$t("\u53D1\u4EF6\u4EBA\u540D\u79F0"),prop:"mail_alias"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.mail_alias,"onUpdate:modelValue":e[2]||(e[2]=d=>l.form.mail_alias=d),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u540D\u79F0"},null,8,["modelValue"])]),_:1},8,["label"]),s(i,{label:t.$t("\u53D1\u4EF6\u4EBA\u8D26\u53F7"),prop:"mail_username"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.mail_username,"onUpdate:modelValue":e[3]||(e[3]=d=>l.form.mail_username=d),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u8D26\u53F7"},null,8,["modelValue"])]),_:1},8,["label"]),s(i,{label:t.$t("\u53D1\u4EF6\u4EBA\u5BC6\u7801"),prop:"mail_password"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.mail_password,"onUpdate:modelValue":e[4]||(e[4]=d=>l.form.mail_password=d),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u5BC6\u7801","show-password":""},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"]),b("div",Y,[s(p,{onClick:n.handleTest},{default:a(()=>e[6]||(e[6]=[C("\u6D4B \u8BD5")])),_:1},8,["onClick"]),s(p,{type:"primary",onClick:n.handleSubmit},{default:a(()=>[C(g(t.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])]),s(u,{visible:l.dialogVisible,"onUpdate:visible":e[5]||(e[5]=d=>l.dialogVisible=d),row:l.form,onOnSuccess:n.handleTestSuccess},null,8,["visible","row","onOnSuccess"])])}const I=y(B,[["render",A]]),z={scheduler_cron:[{message:"\u5B9A\u65F6\u68C0\u6D4B\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{trigger:"blur",validator:(t,e,o)=>{if(V(e))o();else return o(new Error("cron\u8868\u8FBE\u5F0F\u4E0D\u6B63\u786E"))}}]};function M(t){if(!V(t))return[];let e=[];try{let o=x.parseExpression(t);for(let h=0;h<5;h++){let l=S(o.next().toString()).format("YYYY-MM-DD HH:mm:ss");e.push(l)}}catch{}return e}const H={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:z,form:{scheduler_cron:""},cronNextList:[]}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getCronConfig(t);if(e.code!=0)return;let o=e.data;this.form.scheduler_cron=o.scheduler_cron,this.parseCrontab()},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={scheduler_cron:this.form.scheduler_cron};this.row&&(e.id=this.row.id);const o=await this.$http.updateCronConfig(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},parseCrontab(){this.cronNextList=M(this.form.scheduler_cron)}},created(){this.getData()}},K={key:0},P={key:1,class:"mo-empty"},G={class:"text-center"};function J(t,e,o,h,l,n){const m=r("el-input"),i=r("el-form-item"),c=r("el-form"),p=r("el-button");return _(),f("div",null,[s(c,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:a(()=>[s(i,{label:t.$t("\u5B9A\u65F6\u8BBE\u7F6E"),prop:"scheduler_cron"},{default:a(()=>[s(m,{type:"text",modelValue:l.form.scheduler_cron,"onUpdate:modelValue":e[0]||(e[0]=u=>l.form.scheduler_cron=u),onChange:n.parseCrontab,placeholder:"crontab \u8868\u8FBE\u5F0F\uFF1A\u5206 \u65F6 \u65E5 \u6708 \u5468"},null,8,["modelValue","onChange"])]),_:1},8,["label"]),s(i,{label:t.$t("\u6267\u884C\u8BA1\u5212"),prop:"cronNextList"},{default:a(()=>[l.cronNextList&&l.cronNextList.length>0?(_(),f("div",K,[(_(!0),f(v,null,k(l.cronNextList,u=>(_(),f("div",null,g(u),1))),256))])):(_(),f("div",P," \u6682\u65E0\u8BA1\u5212 "))]),_:1},8,["label"])]),_:1},8,["model","rules"]),b("div",G,[s(p,{type:"primary",onClick:n.handleSubmit},{default:a(()=>[C(g(t.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])}const Q=y(H,[["render",J]]),W={prometheus_key:[{message:"prometheus_key\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],token_expire_days:[{message:"Token\u6709\u6548\u671F\uFF08\u5929\uFF09\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}]},X={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:W,form:{prometheus_key:"",token_expire_days:""}}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getSystemEnvConfig(t);if(e.code!=0)return;let o=e.data;this.form.prometheus_key=o.prometheus_key,this.form.token_expire_days=o.token_expire_days},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={prometheus_key:this.form.prometheus_key,token_expire_days:this.form.token_expire_days};this.row&&(e.id=this.row.id);const o=await this.$http.function(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},handleCopyClick(t){D(t),this.$msg.success("\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F")}},created(){this.getData()}};function Z(t,e,o,h,l,n){const m=r("DocumentCopy"),i=r("el-icon"),c=r("el-form-item"),p=r("el-form");return r("el-button"),_(),f("div",null,[s(p,{ref:"form",model:l.form,rules:l.rules,"label-width":"150px","aria-label":"left"},{default:a(()=>[s(c,{label:"Prometheus Key",prop:"prometheus_key"},{default:a(()=>[b("span",null,g(l.form.prometheus_key),1),b("span",{onClick:e[0]||(e[0]=u=>n.handleCopyClick(l.form.prometheus_key)),class:"mo-link ml-sm"},[s(i,null,{default:a(()=>[s(m)]),_:1})])]),_:1})]),_:1},8,["model","rules"]),$("",!0)])}const ee=y(X,[["render",Z]]);const te={name:"index",props:{},components:{SystemEditDataForm:I,CronConfigEditDataForm:Q,SystemEnvEditDataForm:ee},data(){return{activeName:"email-config"}},computed:{},methods:{async getData(){},handleTabChange(t){localStorage.setItem("system-setup/tab",t)}},created(){let t=localStorage.getItem("system-setup/tab");this.activeName=this.$route.query.tab||t||this.activeName,this.getData()}},le={class:"app-container"},oe={class:"tab-container"},se={class:"tab-container"},ae={class:"tab-container"};function re(t,e,o,h,l,n){const m=r("SystemEditDataForm"),i=r("el-tab-pane"),c=r("CronConfigEditDataForm"),p=r("SystemEnvEditDataForm"),u=r("el-tabs");return _(),f("div",le,[s(u,{modelValue:l.activeName,"onUpdate:modelValue":e[0]||(e[0]=d=>l.activeName=d),onTabChange:n.handleTabChange},{default:a(()=>[s(i,{label:t.$t("\u90AE\u4EF6\u8BBE\u7F6E"),name:"email-config",lazy:""},{default:a(()=>[b("div",oe,[s(m)])]),_:1},8,["label"]),s(i,{label:t.$t("\u76D1\u6D4B\u8BBE\u7F6E"),name:"cron-config",lazy:""},{default:a(()=>[b("div",se,[s(c)])]),_:1},8,["label"]),s(i,{label:"API KEY",name:"system-env",lazy:""},{default:a(()=>[b("div",ae,[s(p)])]),_:1})]),_:1},8,["modelValue","onTabChange"])])}const ce=y(te,[["render",re],["__scopeId","data-v-63953fa2"]]);export{ce as default};
