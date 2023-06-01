import{_ as x}from"./index.26d2b051.js";import{a5 as a,o as p,c as g,X as n,R as s,a as m,Z as h,Q as D,V as J,ak as S,S as N,F as T,a8 as E,U as C,W as F}from"./vendor-vue.e07d7f7e.js";import"./element-icon.bb5f2c38.js";import"./vendor-lib.f93a8f58.js";import"./element-plus.0d508af4.js";function I(l){var e=/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return e.test(l)}function k(l){try{return JSON.parse(l),!0}catch{return!1}}function U(l){return Object.prototype.toString.call(l)=="[object Object]"}const A=(l,e,t)=>{if(!e)return t();if(!k(e))return t(new Error("\u5FC5\u987B\u662Fjson"));let r=JSON.parse(e);Array.isArray(r)?r.some(o=>!I(o))?t(new Error("\u6570\u7EC4\u9879\u53EA\u80FD\u662F\u90AE\u7BB1\u5730\u5740")):t():t(new Error("\u5FC5\u987B\u662Farray\u6570\u7EC4"))},B={email_list:[{validator:A,trigger:"blur"}]},$={Unknown:0,Email:1,Webkook:2,WorkWeixin:3},L={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{loading:!1,rules:B,form:{email_list:""},emailListExample:JSON.stringify(["123@qq.com","domain@163.com"],null,4)}},computed:{},methods:{async getData(){let l=this.$loading(),e={type_id:$.Email};const t=await this.$http.getNotifyOfUser(e);t.data&&t.data.value&&t.data.value.email_list&&(this.form.email_list=JSON.stringify(t.data.value.email_list,null,4)),this.$nextTick(()=>{l.close()})},handleCancel(){this.$refs.form.resetFields()},handleSubmit(){this.$refs.form.validate(l=>{if(l)this.confirmSubmit();else return!1})},async confirmSubmit(){let l=this.$loading({fullscreen:!0}),e=null;this.form.email_list&&(e=JSON.parse(this.form.email_list));let t={type_id:$.Email,value:{email_list:e}},r=await this.$http.updateNotifyOfUser(t);r.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(r.msg),this.$nextTick(()=>{l.close()})},async sendDomainInfoListEmail(){let l=this.$loading({fullscreen:!0});try{(await this.$http.sendDomainInfoListEmail()).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success"))}catch{}finally{this.$nextTick(()=>{l.close()})}}},created(){this.getData()}},q=m("div",{class:"text-[14px] color--info"},[m("span",null,"\u63D0\u793A\uFF1A\u53D1\u4EF6\u90AE\u7BB1\u5728[\u7CFB\u7EDF\u8BBE\u7F6E]\u4E2D\u914D\u7F6E")],-1),R={class:"text-center"};function P(l,e,t,r,o,i){const c=a("el-input"),f=a("el-form-item"),u=a("el-form"),d=a("el-button"),b=a("el-tooltip");return p(),g("div",null,[n(u,{ref:"form",model:o.form,rules:o.rules,"label-width":"80px"},{default:s(()=>[n(f,{label:"\u90AE\u4EF6\u5217\u8868",prop:"email_list"},{default:s(()=>[n(c,{type:"textarea",rows:5,placeholder:`\u793A\u4F8B:
${o.emailListExample}`,modelValue:o.form.email_list,"onUpdate:modelValue":e[0]||(e[0]=y=>o.form.email_list=y)},null,8,["placeholder","modelValue"])]),_:1})]),_:1},8,["model","rules"]),q,m("div",R,[n(d,{onClick:i.handleCancel},{default:s(()=>[h("\u91CD \u7F6E")]),_:1},8,["onClick"]),n(d,{type:"primary",onClick:i.handleSubmit},{default:s(()=>[h("\u4FDD \u5B58")]),_:1},8,["onClick"]),n(b,{content:"\u8BF7\u4FDD\u5B58\u540E\u518D\u6D4B\u8BD5",placement:"top"},{default:s(()=>[n(d,{class:"margin-left--auto",onClick:i.sendDomainInfoListEmail},{default:s(()=>[h("\u6D4B \u8BD5")]),_:1},8,["onClick"])]),_:1})])])}const V=x(L,[["render",P]]),z={name:"",props:{},components:{},data(){return{templateData:""}},computed:{},methods:{async getData(){let l=this.$loading();const e=await this.$http.getTemplateData();e.data&&(this.templateData=JSON.stringify(e.data,null,4)),this.$nextTick(()=>{l.close()})},handleConfirm(){this.$emit("on-confirm")}},created(){this.getData()}},M={class:"text-center"};function Z(l,e,t,r,o,i){const c=a("el-input"),f=a("el-form-item"),u=a("el-form"),d=a("el-button");return p(),g("div",null,[n(u,{"label-width":"0"},{default:s(()=>[n(f,{label:""},{default:s(()=>[n(c,{type:"textarea",rows:20,modelValue:o.templateData,"onUpdate:modelValue":e[0]||(e[0]=b=>o.templateData=b)},null,8,["modelValue"])]),_:1})]),_:1}),m("div",M,[n(d,{type:"primary",onClick:i.handleConfirm},{default:s(()=>[h("\u786E \u5B9A")]),_:1},8,["onClick"])])])}const G=x(z,[["render",Z]]),H={name:"",props:{visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:G},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(l){this.$emit("update:visible",l)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function Q(l,e,t,r,o,i){const c=a("DataForm"),f=a("el-dialog");return p(),D(f,{title:"\u6A21\u677F\u53C2\u6570",modelValue:i.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=u=>i.dialogVisible=u),width:"600px",center:"","append-to-body":"","lock-scroll":!1},{default:s(()=>[i.dialogVisible?(p(),D(c,{key:0,onOnCancel:i.handleClose,onOnConfirm:i.handleClose},null,8,["onOnCancel","onOnConfirm"])):J("",!0)]),_:1},8,["modelValue"])}const X=x(H,[["render",Q]]),K=(l,e,t)=>{if(!e)return t();if(!k(e))return t(new Error("\u5FC5\u987B\u662Fjson"));let r=JSON.parse(e);U(r)?t():t(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},Y={headers:[{validator:K,trigger:"blur"}]},ee={name:"",props:{row:{type:Object,default:null}},components:{TemplateDataDialog:X},data(){return{loading:!1,rules:Y,templateDataDialogVisible:!1,form:{method:"GET",url:"",headers:JSON.stringify({"Content-Type":"application/json"},null,4),body:""},methodOptions:[{label:"GET",value:"GET"},{label:"POST",value:"POST"}],headerExample:JSON.stringify({"User-Agent":"Mozilla/5.0","Content-Type":"application/json"},null,4)}},computed:{},methods:{async getData(){this.loading=!0;let l={type_id:$.Webkook},t=(await this.$http.getNotifyOfUser(l)).data;if(t&&t.value){let r="";t.value.headers&&(r=JSON.stringify(t.value.headers,null,4)),this.form={method:t.value.method,url:t.value.url,headers:r,body:t.value.body}}this.loading=!1},handleCancel(){this.$refs.form.resetFields()},handleSubmit(){this.$refs.form.validate(l=>{if(l)this.confirmSubmit();else return!1})},async confirmSubmit(){let l=this.$loading({fullscreen:!0}),e=null;this.form.headers&&(e=JSON.parse(this.form.headers));let t={type_id:$.Webkook,value:{method:this.form.method,url:this.form.url,headers:e,body:this.form.body}},r=await this.$http.updateNotifyOfUser(t);r.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(r.msg),this.$nextTick(()=>{l.close()})},async handleTest(){let l=this.$loading({fullscreen:!0});try{const e=await this.$http.testWebhookNotifyOfUser();e.code==0&&this.$msg.success(e.data)}catch{}finally{this.$nextTick(()=>{l.close()})}},handleOpenTemplateDataDialog(){this.templateDataDialogVisible=!0}},created(){this.getData()}},te=m("div",{class:"text-[14px] color--info"},[m("span",null,"\u8D44\u6E90\u63A8\u8350\uFF1A"),m("a",{href:"https://pengshiyu.blog.csdn.net/article/details/124135877",class:"color--brand",target:"_blank"},"\u5FAE\u4FE1\u63A8\u9001\u6D88\u606F\u901A\u77E5\u63A5\u53E3\u6C47\u603B")],-1),le={class:"text-center mt-md"};function oe(l,e,t,r,o,i){const c=a("el-option"),f=a("el-select"),u=a("el-form-item"),d=a("el-input"),b=a("el-form"),y=a("el-button"),v=a("el-tooltip"),W=a("TemplateDataDialog"),j=S("loading");return N((p(),g("div",null,[n(b,{ref:"form",model:o.form,rules:o.rules,"label-width":"80px"},{default:s(()=>[n(u,{label:"\u8BF7\u6C42\u65B9\u6CD5",prop:"method"},{default:s(()=>[n(f,{modelValue:o.form.method,"onUpdate:modelValue":e[0]||(e[0]=_=>o.form.method=_),placeholder:"\u8BF7\u6C42\u65B9\u6CD5",style:{width:"100px"}},{default:s(()=>[(p(!0),g(T,null,E(o.methodOptions,_=>(p(),D(c,{key:_.value,label:_.label,value:_.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),n(u,{label:"\u8BF7\u6C42\u5730\u5740",prop:"url"},{default:s(()=>[n(d,{type:"text",modelValue:o.form.url,"onUpdate:modelValue":e[1]||(e[1]=_=>o.form.url=_),placeholder:"\u8BF7\u6C42\u5730\u5740"},null,8,["modelValue"])]),_:1}),n(u,{label:"\u8BF7\u6C42\u5934",prop:"headers"},{default:s(()=>[n(d,{type:"textarea",rows:5,modelValue:o.form.headers,"onUpdate:modelValue":e[2]||(e[2]=_=>o.form.headers=_),placeholder:`\u793A\u4F8B: 
${o.headerExample}`},null,8,["modelValue","placeholder"])]),_:1}),n(u,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:s(()=>[n(d,{type:"textarea",rows:5,modelValue:o.form.body,"onUpdate:modelValue":e[3]||(e[3]=_=>o.form.body=_),placeholder:"\u8BF7\u6C42\u4F53\uFF0C\u652F\u6301jinja2\u6A21\u677F\u8BED\u6CD5"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),te,m("div",le,[n(y,{onClick:i.handleOpenTemplateDataDialog},{default:s(()=>[h("\u6A21\u677F\u53C2\u6570")]),_:1},8,["onClick"]),n(y,{onClick:i.handleCancel},{default:s(()=>[h("\u91CD \u7F6E")]),_:1},8,["onClick"]),n(y,{type:"primary",onClick:i.handleSubmit},{default:s(()=>[h("\u4FDD \u5B58")]),_:1},8,["onClick"]),n(v,{content:"\u8BF7\u4FDD\u5B58\u540E\u518D\u6D4B\u8BD5",placement:"top"},{default:s(()=>[n(y,{onClick:i.handleTest},{default:s(()=>[h("\u6D4B \u8BD5")]),_:1},8,["onClick"])]),_:1})]),n(W,{visible:o.templateDataDialogVisible,"onUpdate:visible":e[4]||(e[4]=_=>o.templateDataDialogVisible=_)},null,8,["visible"])])),[[j,o.loading]])}const w=x(ee,[["render",oe]]),ne=(l,e,t)=>{if(!e)return t();if(!k(e))return t(new Error("\u5FC5\u987B\u662Fjson"));let r=JSON.parse(e);U(r)?t():t(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},se={body:[{validator:ne,trigger:"blur"}]},ae={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{loading:!1,rules:se,form:{corpid:"",corpsecret:"",body:""},defaultBody:JSON.stringify({touser:"UserID1|UserID2|UserID3",toparty:"PartyID1|PartyID2",totag:"TagID1 | TagID2",msgtype:"text",agentid:1,text:{content:`\u4F60\u7684\u57DF\u540D\u8BC1\u4E66\u5373\u5C06\u5230\u671F
\u70B9\u51FB\u67E5\u770B<a href="${window.location.href}">Domain Admin</a>`},safe:0,enable_id_trans:0,enable_duplicate_check:0,duplicate_check_interval:1800},null,4)}},computed:{},methods:{async getData(){this.loading=!0;let l={type_id:$.WorkWeixin},t=(await this.$http.getNotifyOfUser(l)).data;t&&t.value?this.form={corpid:t.value.corpid,corpsecret:t.value.corpsecret,body:t.value.body}:this.form.body=this.defaultBody,this.loading=!1},handleCancel(){this.$refs.form.resetFields()},handleSubmit(){this.$refs.form.validate(l=>{if(l)this.confirmSubmit();else return!1})},async confirmSubmit(){let l=this.$loading({fullscreen:!0});this.form.headers&&JSON.parse(this.form.headers);let e={type_id:$.WorkWeixin,value:{corpid:this.form.corpid,corpsecret:this.form.corpsecret,body:this.form.body}},t=await this.$http.updateNotifyOfUser(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg),this.$nextTick(()=>{l.close()})},async handleTest(){let l=this.$loading({fullscreen:!0});try{const e=await this.$http.testWorkWeixinNotifyOfUser();e.code==0&&this.$msg.success(e.data)}catch{}finally{this.$nextTick(()=>{l.close()})}}},created(){this.getData()}},ie=m("div",{class:"text-[14px] color--info"},[m("span",null,"\u5F00\u53D1\u6587\u6863\uFF1A"),m("a",{href:"https://developer.work.weixin.qq.com/document/path/90236",class:"color--brand",target:"_blank"},"\u4F01\u4E1A\u5FAE\u4FE1-\u53D1\u9001\u5E94\u7528\u6D88\u606F")],-1),re={class:"text-center"};function de(l,e,t,r,o,i){const c=a("el-input"),f=a("el-form-item"),u=a("el-form"),d=a("el-button"),b=a("el-tooltip"),y=S("loading");return N((p(),g("div",null,[n(u,{class:"mt-md",ref:"form",model:o.form,rules:o.rules,"label-width":"80px"},{default:s(()=>[n(f,{label:"\u4F01\u4E1AID",prop:"corpid"},{default:s(()=>[n(c,{type:"text",modelValue:o.form.corpid,"onUpdate:modelValue":e[0]||(e[0]=v=>o.form.corpid=v),placeholder:"corpid"},null,8,["modelValue"])]),_:1}),n(f,{label:"\u51ED\u8BC1\u5BC6\u94A5",prop:"corpsecret"},{default:s(()=>[n(c,{type:"text",modelValue:o.form.corpsecret,"onUpdate:modelValue":e[1]||(e[1]=v=>o.form.corpsecret=v),placeholder:"corpsecret"},null,8,["modelValue"])]),_:1}),n(f,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:s(()=>[n(c,{type:"textarea",rows:16,modelValue:o.form.body,"onUpdate:modelValue":e[2]||(e[2]=v=>o.form.body=v),placeholder:"\u8BF7\u6C42\u4F53"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),ie,m("div",re,[n(d,{onClick:i.handleCancel},{default:s(()=>[h("\u91CD \u7F6E")]),_:1},8,["onClick"]),n(d,{type:"primary",onClick:i.handleSubmit},{default:s(()=>[h("\u4FDD \u5B58")]),_:1},8,["onClick"]),n(b,{content:"\u8BF7\u4FDD\u5B58\u540E\u518D\u6D4B\u8BD5",placement:"top"},{default:s(()=>[n(d,{onClick:i.handleTest},{default:s(()=>[h("\u6D4B \u8BD5")]),_:1},8,["onClick"])]),_:1})])])),[[y,o.loading]])}const ce=x(ae,[["render",de]]),me={name:"domain-edit",props:{},components:{DataForm:ce},data(){return{id:null}},computed:{},methods:{handleSuccess(){}},created(){this.id=this.$route.query.id}},ue={class:""};function pe(l,e,t,r,o,i){const c=a("DataForm");return p(),g("div",ue,[n(c,{onOnSuccess:i.handleSuccess},null,8,["onOnSuccess"])])}const O=x(me,[["render",pe]]);const fe={name:"index",props:{},components:{NotifyEditEmail:V,NotifyEditWebhook:w,NotifyEditWorkWeixin:O},data(){return{active:"email",options:[{value:"email",label:"\u90AE\u4EF6\u901A\u77E5",icon:"Message",component:V},{value:"webhook",label:"WebHook",icon:"AlarmClock",component:w},{value:"work-weixin",label:"\u4F01\u4E1A\u5FAE\u4FE1",icon:"ChatSquare",component:O}]}},computed:{currentComponent(){return this.options.find(l=>l.value==this.active).component}},methods:{async getData(){},handleMenuSelect(l,e,t,r){this.active=l}},created(){this.getData()}},_e={class:"app-container notify-edit-container"},he={class:"notify-edit__menu"},ye={class:"notify-edit__main"};function ge(l,e,t,r,o,i){const c=a("el-icon"),f=a("el-menu-item"),u=a("el-menu");return p(),g("div",_e,[m("div",he,[n(u,{"default-active":o.active,"menu-trigger":"click",onSelect:i.handleMenuSelect},{default:s(()=>[(p(!0),g(T,null,E(o.options,d=>(p(),D(f,{index:d.value},{default:s(()=>[n(c,null,{default:s(()=>[(p(),D(C(d.icon)))]),_:2},1024),m("span",null,F(d.label),1)]),_:2},1032,["index"]))),256))]),_:1},8,["default-active","onSelect"])]),m("div",ye,[(p(),D(C(i.currentComponent)))])])}const ke=x(fe,[["render",ge],["__scopeId","data-v-f56037ab"]]);export{ke as default};
