import{_ as C}from"./index.92b6fe80.js";import{ag as a,o as f,c as h,P as s,H as r,K as i,a as g,L as w,M as y,G as v,O as $,a4 as V}from"./vendor-vue.5e429edb.js";import{e as S}from"./element-plus.af1c8bed.js";import{i as k,p as x,c as D}from"./vendor-lib.cd48dffd.js";import"./element-icon.65c0b9c3.js";const E={mail_host:[{message:"\u670D\u52A1\u5668\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],mail_port:[{message:"\u670D\u52A1\u5668\u7AEF\u53E3\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],mail_alias:[{message:"\u53D1\u4EF6\u4EBA\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],mail_username:[{message:"\u53D1\u4EF6\u4EBA\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],mail_password:[{message:"\u53D1\u4EF6\u4EBA\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}]},T={subject:[{message:"\u90AE\u4EF6\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],content:[{message:"\u90AE\u4EF6\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],email_list:[{message:"\u6536\u4EF6\u90AE\u7BB1\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},F={name:"",props:{row:{type:Object,default:null},defaultEamil:{type:String,default:""}},components:{},data(){return{rules:T,form:{subject:"Domain Admin\u6D4B\u8BD5\u90AE\u4EF6",content:"\u6B22\u8FCE\u4F7F\u7528Domain Admin\u57DF\u540D\u8BC1\u4E66\u76D1\u63A7\u7CFB\u7EDF",email_list:""}}},computed:{},methods:{async getData(){if(this.row){let t={id:this.row.id};const e=await this.$http.function(t);if(e.code!=0)return;let o=e.data;this.form.subject=o.subject,this.form.content=o.content,this.form.email_list=o.email_list}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={subject:this.form.subject,content:this.form.content,email_list:this.form.email_list.split(";"),mail_host:this.row.mail_host,mail_port:this.row.mail_port,mail_alias:this.row.mail_alias,mail_username:this.row.mail_username,mail_password:this.row.mail_password},o=await this.$http.sendTestEmail(e);o.code==0?(this.$msg.success("\u53D1\u9001\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})}},created(){this.form.email_list=this.row.mail_username}},j={class:"text-center"};function N(t,e,o,b,l,m){const u=a("el-input"),n=a("el-form-item"),p=a("el-form"),_=a("el-button");return f(),h("div",null,[s(p,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:r(()=>[i(" \u6536\u4EF6\u90AE\u7BB1 "),s(n,{label:"\u6536\u4EF6\u90AE\u7BB1",prop:"email_list"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.email_list,"onUpdate:modelValue":e[0]||(e[0]=d=>l.form.email_list=d),placeholder:"\u6536\u4EF6\u90AE\u7BB1\uFF0C\u591A\u4E2A\u5206\u53F7\u9694\u5F00\u3002\u4F8B\u5982\uFF1A123456@qq.com"},null,8,["modelValue"])]),_:1}),i(" \u90AE\u4EF6\u6807\u9898 "),s(n,{label:"\u90AE\u4EF6\u6807\u9898",prop:"subject"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.subject,"onUpdate:modelValue":e[1]||(e[1]=d=>l.form.subject=d),placeholder:"\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"},null,8,["modelValue"])]),_:1}),i(" \u90AE\u4EF6\u5185\u5BB9 "),s(n,{label:"\u90AE\u4EF6\u5185\u5BB9",prop:"content"},{default:r(()=>[s(u,{type:"textarea",rows:5,modelValue:l.form.content,"onUpdate:modelValue":e[2]||(e[2]=d=>l.form.content=d),placeholder:"\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),i(" \u64CD\u4F5C "),g("div",j,[s(_,{onClick:m.handleCancel},{default:r(()=>[w(y(t.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),s(_,{type:"primary",onClick:m.handleSubmit},{default:r(()=>[w(y(t.$t("\u53D1\u9001")),1)]),_:1},8,["onClick"])])])}const q=C(F,[["render",N]]),O={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1},defaultEamil:{type:String,default:""}},emits:["update:visible"],components:{DataForm:q},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function U(t,e,o,b,l,m){const u=a("DataForm"),n=a("el-dialog");return f(),h($,null,[i(" \u7F16\u8F91\u6846 "),s(n,{title:"\u90AE\u4EF6\u53D1\u9001\u6D4B\u8BD5",modelValue:m.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>m.dialogVisible=p),width:"500px",center:"","append-to-body":""},{default:r(()=>[m.dialogVisible?(f(),v(u,{key:0,row:o.row,defaultEamil:o.defaultEamil,onOnCancel:m.handleClose,onOnSuccess:m.handleSuccess},null,8,["row","defaultEamil","onOnCancel","onOnSuccess"])):i("v-if",!0)]),_:1},8,["modelValue"])],2112)}const L=C(O,[["render",U]]),B={name:"",props:{row:{type:Object,default:null}},components:{EmailTestDataFormDialog:L},data(){return{rules:E,dialogVisible:!1,form:{mail_host:"",mail_port:"",mail_alias:"",mail_username:"",mail_password:""}}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getAllSystemConfig(t);if(e.code!=0)return;let o=e.data;this.form.mail_host=o.mail_host,this.form.mail_port=o.mail_port,this.form.mail_alias=o.mail_alias,this.form.mail_username=o.mail_username,this.form.mail_password=o.mail_password},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={mail_host:this.form.mail_host,mail_port:this.form.mail_port,mail_alias:this.form.mail_alias,mail_username:this.form.mail_username,mail_password:this.form.mail_password};const o=await this.$http.updateSystemConfig(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},handleTest(){this.dialogVisible=!0},handleTestSuccess(){}},created(){this.getData()}},Y={class:""},A={class:"text-center"};function I(t,e,o,b,l,m){const u=a("el-input"),n=a("el-form-item"),p=a("el-form"),_=a("el-button"),d=a("EmailTestDataFormDialog");return f(),h("div",Y,[s(p,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:r(()=>[i(" \u670D\u52A1\u5668\u5730\u5740 "),s(n,{label:t.$t("\u670D\u52A1\u5668\u5730\u5740"),prop:"mail_host"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.mail_host,"onUpdate:modelValue":e[0]||(e[0]=c=>l.form.mail_host=c),placeholder:"\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740"},null,8,["modelValue"])]),_:1},8,["label"]),i(" \u670D\u52A1\u5668\u7AEF\u53E3 "),s(n,{label:t.$t("\u670D\u52A1\u5668\u7AEF\u53E3"),prop:"mail_port"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.mail_port,"onUpdate:modelValue":e[1]||(e[1]=c=>l.form.mail_port=c),placeholder:"\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u7AEF\u53E3"},null,8,["modelValue"])]),_:1},8,["label"]),i(" \u53D1\u4EF6\u4EBA\u540D\u79F0 "),s(n,{label:t.$t("\u53D1\u4EF6\u4EBA\u540D\u79F0"),prop:"mail_alias"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.mail_alias,"onUpdate:modelValue":e[2]||(e[2]=c=>l.form.mail_alias=c),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u540D\u79F0"},null,8,["modelValue"])]),_:1},8,["label"]),i(" \u53D1\u4EF6\u4EBA\u8D26\u53F7 "),s(n,{label:t.$t("\u53D1\u4EF6\u4EBA\u8D26\u53F7"),prop:"mail_username"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.mail_username,"onUpdate:modelValue":e[3]||(e[3]=c=>l.form.mail_username=c),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u8D26\u53F7"},null,8,["modelValue"])]),_:1},8,["label"]),i(" \u53D1\u4EF6\u4EBA\u5BC6\u7801 "),s(n,{label:t.$t("\u53D1\u4EF6\u4EBA\u5BC6\u7801"),prop:"mail_password"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.mail_password,"onUpdate:modelValue":e[4]||(e[4]=c=>l.form.mail_password=c),placeholder:"\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u5BC6\u7801","show-password":""},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"]),i(" \u64CD\u4F5C "),g("div",A,[s(_,{onClick:m.handleTest},{default:r(()=>e[6]||(e[6]=[w("\u6D4B \u8BD5")])),_:1},8,["onClick"]),s(_,{type:"primary",onClick:m.handleSubmit},{default:r(()=>[w(y(t.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])]),i(" \u90AE\u4EF6\u53D1\u9001\u6D4B\u8BD5 "),s(d,{visible:l.dialogVisible,"onUpdate:visible":e[5]||(e[5]=c=>l.dialogVisible=c),row:l.form,onOnSuccess:m.handleTestSuccess},null,8,["visible","row","onOnSuccess"])])}const R=C(B,[["render",I]]),z={scheduler_cron:[{message:"\u5B9A\u65F6\u68C0\u6D4B\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{trigger:"blur",validator:(t,e,o)=>{if(k(e))o();else return o(new Error("cron\u8868\u8FBE\u5F0F\u4E0D\u6B63\u786E"))}}]};function H(t){if(!k(t))return[];let e=[];try{let o=x.parseExpression(t);for(let b=0;b<5;b++){let l=S(o.next().toString()).format("YYYY-MM-DD HH:mm:ss");e.push(l)}}catch{}return e}const K={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:z,form:{scheduler_cron:""},cronNextList:[]}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getCronConfig(t);if(e.code!=0)return;let o=e.data;this.form.scheduler_cron=o.scheduler_cron,this.parseCrontab()},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={scheduler_cron:this.form.scheduler_cron};this.row&&(e.id=this.row.id);const o=await this.$http.updateCronConfig(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},parseCrontab(){this.cronNextList=H(this.form.scheduler_cron)}},created(){this.getData()}},M={key:0},P={key:1,class:"mo-empty"},G={class:"text-center"};function J(t,e,o,b,l,m){const u=a("el-input"),n=a("el-form-item"),p=a("el-form"),_=a("el-button");return f(),h("div",null,[s(p,{ref:"form",model:l.form,rules:l.rules,"label-width":"100px"},{default:r(()=>[i(" \u5B9A\u65F6\u68C0\u6D4B "),s(n,{label:t.$t("\u5B9A\u65F6\u8BBE\u7F6E"),prop:"scheduler_cron"},{default:r(()=>[s(u,{type:"text",modelValue:l.form.scheduler_cron,"onUpdate:modelValue":e[0]||(e[0]=d=>l.form.scheduler_cron=d),onChange:m.parseCrontab,placeholder:"crontab \u8868\u8FBE\u5F0F\uFF1A\u5206 \u65F6 \u65E5 \u6708 \u5468"},null,8,["modelValue","onChange"])]),_:1},8,["label"]),s(n,{label:t.$t("\u6267\u884C\u8BA1\u5212"),prop:"cronNextList"},{default:r(()=>[l.cronNextList&&l.cronNextList.length>0?(f(),h("div",M,[(f(!0),h($,null,V(l.cronNextList,d=>(f(),h("div",null,y(d),1))),256))])):(f(),h("div",P," \u6682\u65E0\u8BA1\u5212 "))]),_:1},8,["label"])]),_:1},8,["model","rules"]),i(" \u64CD\u4F5C "),g("div",G,[i(' <el-button @click="handleCancel">\u53D6 \u6D88</el-button> '),s(_,{type:"primary",onClick:m.handleSubmit},{default:r(()=>[w(y(t.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])}const Q=C(K,[["render",J]]),W={prometheus_key:[{message:"prometheus_key\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}],token_expire_days:[{message:"Token\u6709\u6548\u671F\uFF08\u5929\uFF09\u4E0D\u80FD\u4E3A\u7A7A",required:!1,trigger:"blur"}]},X={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:W,form:{prometheus_key:"",token_expire_days:""}}},computed:{},methods:{async getData(){let t={};const e=await this.$http.getSystemEnvConfig(t);if(e.code!=0)return;let o=e.data;this.form.prometheus_key=o.prometheus_key,this.form.token_expire_days=o.token_expire_days},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={prometheus_key:this.form.prometheus_key,token_expire_days:this.form.token_expire_days};this.row&&(e.id=this.row.id);const o=await this.$http.function(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg),this.$nextTick(()=>{t.close()})},handleCopyClick(t){D(t),this.$msg.success("\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F")}},created(){this.getData()}};function Z(t,e,o,b,l,m){const u=a("DocumentCopy"),n=a("el-icon"),p=a("el-form-item"),_=a("el-form");return a("el-button"),f(),h("div",null,[s(_,{ref:"form",model:l.form,rules:l.rules,"label-width":"150px","aria-label":"left"},{default:r(()=>[i(" prometheus_key "),s(p,{label:"Prometheus Key",prop:"prometheus_key"},{default:r(()=>[g("span",null,y(l.form.prometheus_key),1),g("span",{onClick:e[0]||(e[0]=d=>m.handleCopyClick(l.form.prometheus_key)),class:"mo-link ml-sm"},[s(n,null,{default:r(()=>[s(u)]),_:1})])]),_:1}),i(" Token\u6709\u6548\u671F\uFF08\u5929\uFF09 "),i(` <el-form-item
        label="Token\u6709\u6548\u671F"
        prop="token_expire_days"
      >
        {{ form.token_expire_days }} \u5929
      </el-form-item> `)]),_:1},8,["model","rules"]),i(" \u64CD\u4F5C "),i("v-if",!0)])}const ee=C(X,[["render",Z]]);const te={name:"index",props:{},components:{SystemEditDataForm:R,CronConfigEditDataForm:Q,SystemEnvEditDataForm:ee},data(){return{activeName:"email-config"}},computed:{},methods:{async getData(){},handleTabChange(t){localStorage.setItem("system-setup/tab",t)}},created(){let t=localStorage.getItem("system-setup/tab");this.activeName=this.$route.query.tab||t||this.activeName,this.getData()}},le={class:"app-container"},oe={class:"tab-container"},se={class:"tab-container"},re={class:"tab-container"};function ae(t,e,o,b,l,m){const u=a("SystemEditDataForm"),n=a("el-tab-pane"),p=a("CronConfigEditDataForm"),_=a("SystemEnvEditDataForm"),d=a("el-tabs");return f(),h("div",le,[s(d,{modelValue:l.activeName,"onUpdate:modelValue":e[0]||(e[0]=c=>l.activeName=c),onTabChange:m.handleTabChange},{default:r(()=>[s(n,{label:t.$t("\u90AE\u4EF6\u8BBE\u7F6E"),name:"email-config",lazy:""},{default:r(()=>[g("div",oe,[s(u)])]),_:1},8,["label"]),s(n,{label:t.$t("\u76D1\u6D4B\u8BBE\u7F6E"),name:"cron-config",lazy:""},{default:r(()=>[g("div",se,[s(p)])]),_:1},8,["label"]),s(n,{label:"API KEY",name:"system-env",lazy:""},{default:r(()=>[g("div",re,[s(_)])]),_:1})]),_:1},8,["modelValue","onTabChange"])])}const ce=C(te,[["render",ae],["__scopeId","data-v-63953fa2"]]);export{ce as default};