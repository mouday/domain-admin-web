import{a as $,b as K,c as G,d as R,E as B,e as Q}from"./event-enums.2f665cd6.js";import{t as q,_ as D}from"./index.30b05bcc.js";import{T as Y,t as Z,o as L,j as ee}from"./codemirror-lib.512a46ff.js";import{ah as i,o as h,O as E,K as te,c as w,V as o,P as r,S as d,a as c,T as C,U as v,ar as T,Q as U,F as O,a8 as N,R as le}from"./vendor-vue.cefe3aef.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const oe={status:[{message:"\u72B6\u6001\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],value:[{message:"\u901A\u77E5\u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],expire_days:[{message:"\u5269\u4F59\u5929\u6570\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],groups:[{message:"\u5206\u7EC4\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},ne=(e,t,n)=>{if(!t)return n();if(!$(t))return n(new Error("\u5FC5\u987B\u662Fjson"));let u=JSON.parse(t);Array.isArray(u)?u.length==0?n(new Error("\u6570\u7EC4\u957F\u5EA6\u4E0D\u80FD\u4E3A\u7A7A")):u.some(l=>!K(l))?n(new Error("\u6570\u7EC4\u9879\u53EA\u80FD\u662F\u90AE\u7BB1\u5730\u5740")):n():n(new Error("\u5FC5\u987B\u662Farray\u6570\u7EC4"))},re={email_list:[{message:"\u90AE\u4EF6\u5217\u8868\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{validator:ne,trigger:"blur"}],type_id:[{message:"\u89E6\u53D1\u4E8B\u4EF6\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},k={Unknown:0,Email:1,Webhook:2,WorkWeixin:3,DingTalk:4,Feishu:5},ie=[{value:k.Email,label:q("\u90AE\u4EF6")},{value:k.Webhook,label:"Webhook"},{value:k.WorkWeixin,label:q("\u4F01\u4E1A\u5FAE\u4FE1")},{value:k.DingTalk,label:q("\u9489\u9489")},{value:k.Feishu,label:q("\u98DE\u4E66")}];function ae(e){const t=ie.find(n=>n.value==e);if(t)return t.label}function W(e){return JSON.parse(JSON.stringify(e))}const se={name:"CodeEditor",props:{value:{type:String,default:""},placeholder:{type:String,default:""},height:{type:String,default:"200px"},mode:{type:String,default:"json"}},components:{Codemirror:Y},data(){return{}},computed:{value_:{get(){return this.value},set(e){this.$emit("update:value",e)}},editorStyle(){return{width:"100%",height:this.height,"font-size":"16px"}},extensions(){return this.mode=="twig"?[Z(),L]:[ee(),L]}},methods:{async getData(){}},created(){this.getData()}};function de(e,t,n,u,l,a){const p=i("codemirror");return h(),E(p,{modelValue:a.value_,"onUpdate:modelValue":t[0]||(t[0]=f=>a.value_=f),placeholder:n.placeholder,style:te(a.editorStyle),autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:a.extensions},null,8,["modelValue","placeholder","style","extensions"])}const j=D(se,[["render",de]]),ue={name:"",props:{rowData:{type:Object,default:null},labelWidth:{type:String,default:""}},emits:["on-submit","on-cancel"],components:{CodeEditor:j},data(){return{loading:!1,rules:re,form:{email_list:""},EventOptions:G,emailListExample:JSON.stringify(["123456@qq.com","domain@163.com"],null,4)}},computed:{disabledTestButton(){return!(this.rowData&&this.rowData.id)}},methods:{async getData(){this.rowData&&this.rowData.value&&this.rowData.value.email_list&&(this.form.email_list=JSON.stringify(this.rowData.value.email_list,null,4))},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(e=>{if(e)this.confirmSubmit();else return!1})},async confirmSubmit(){let e=null;this.form.email_list&&(e=JSON.parse(this.form.email_list));let t={value:{email_list:e}};this.$emit("on-submit",W(t))},handleToSystemSetting(){let e=this.$router.resolve({name:"system-setup"});window.open(e.href,"_blank")}},created(){this.getData()}},pe={class:"text-[14px] color--info"},me={class:"text-center"};function ce(e,t,n,u,l,a){const p=i("CodeEditor"),f=i("el-form-item"),g=i("el-form"),y=i("el-button");return h(),w("div",null,[o(g,{ref:"form",model:l.form,rules:l.rules,"label-width":n.labelWidth},{default:r(()=>[d(" \u57DF\u540D "),o(f,{label:e.$t("\u90AE\u4EF6\u5217\u8868"),prop:"email_list"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="5"
          v-model="form.email_list"
        ></el-input> `),o(p,{modelValue:l.form.email_list,"onUpdate:modelValue":t[0]||(t[0]=b=>l.form.email_list=b),placeholder:`\u793A\u4F8B:
${l.emailListExample}`},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules","label-width"]),c("div",pe,[c("span",null,[C("\u63D0\u793A\uFF1A\u53D1\u4EF6\u90AE\u7BB1\u5728"),c("span",{class:"cursor-pointer color--brand",onClick:t[1]||(t[1]=(...b)=>a.handleToSystemSetting&&a.handleToSystemSetting(...b))},"[\u7CFB\u7EDF\u8BBE\u7F6E]"),C("\u4E2D\u914D\u7F6E")])]),d(" \u64CD\u4F5C "),c("div",me,[o(y,{onClick:a.handleCancel},{default:r(()=>[C(v(e.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(y,{type:"primary",onClick:a.handleSubmit},{default:r(()=>[C(v(e.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])}const J=D(ue,[["render",ce]]),fe=(e,t,n)=>{if(!t)return n();if(!$(t))return n(new Error("\u5FC5\u987B\u662Fjson"));let u=JSON.parse(t);R(u)?n():n(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},he={headers:[{validator:fe,trigger:"blur"}],url:[{message:"\u8BF7\u6C42\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},_e={name:"",props:{rowData:{type:Object,default:null},labelWidth:{type:String,default:""}},emits:["on-submit","on-cancel"],components:{CodeEditor:j},data(){return{loading:!1,rules:he,form:{method:"POST",url:"",headers:JSON.stringify({"Content-Type":"application/json"},null,4),body:`{
  "title": "\u5230\u671F\u63D0\u9192",
  "content": "{% for row in list %}{{row.domain}} {{row.start_date or '-' }} - {{row.expire_date or '-' }} ({{row.expire_days}}){% endfor %}"
}
`},bodyPlaceholder:"\u652F\u6301jinja2\u6A21\u677F\u8BED\u6CD5",methodOptions:[{label:"GET",value:"GET"},{label:"POST",value:"POST"}],headerExample:JSON.stringify({"User-Agent":"Mozilla/5.0","Content-Type":"application/json"},null,4)}},computed:{},methods:{async getData(){console.log(this.rowData);let e=this.rowData;if(e&&e.value){let t="";e.value.headers&&(t=JSON.stringify(e.value.headers,null,4)),this.form={method:e.value.method,url:e.value.url,headers:t,body:e.value.body}}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(e=>{if(e)this.confirmSubmit();else return!1})},async confirmSubmit(){let e=null;this.form.headers&&(e=JSON.parse(this.form.headers));let t={value:{method:this.form.method,url:this.form.url,headers:e,body:this.form.body}};this.$emit("on-submit",W(t))}},created(){this.getData()}},ge=c("div",{class:"text-[14px] color--info"},[c("span",null,"\u8D44\u6E90\u63A8\u8350\uFF1A"),c("a",{href:"https://pengshiyu.blog.csdn.net/article/details/124135877",class:"color--brand",target:"_blank"},"\u5FAE\u4FE1\u63A8\u9001\u6D88\u606F\u901A\u77E5\u63A5\u53E3\u6C47\u603B")],-1),be={class:"text-center mt-md"};function ye(e,t,n,u,l,a){const p=i("el-option"),f=i("el-select"),g=i("el-form-item"),y=i("el-input"),b=i("CodeEditor"),V=i("el-form"),_=i("el-button"),S=T("loading");return U((h(),w("div",null,[o(V,{ref:"form",model:l.form,rules:l.rules,"label-width":n.labelWidth},{default:r(()=>[o(g,{label:"\u8BF7\u6C42\u65B9\u6CD5",prop:"method"},{default:r(()=>[o(f,{modelValue:l.form.method,"onUpdate:modelValue":t[0]||(t[0]=s=>l.form.method=s),placeholder:"\u8BF7\u6C42\u65B9\u6CD5",style:{width:"100px"}},{default:r(()=>[(h(!0),w(O,null,N(l.methodOptions,s=>(h(),E(p,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(g,{label:"\u8BF7\u6C42\u5730\u5740",prop:"url"},{default:r(()=>[o(y,{type:"text",modelValue:l.form.url,"onUpdate:modelValue":t[1]||(t[1]=s=>l.form.url=s),placeholder:"\u8BF7\u6C42\u5730\u5740"},null,8,["modelValue"])]),_:1}),o(g,{label:"\u8BF7\u6C42\u5934",prop:"headers"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="5"
          v-model="form.headers"
          :placeholder="\`\u793A\u4F8B: \\n\${headerExample}\`"
        ></el-input> `),o(b,{modelValue:l.form.headers,"onUpdate:modelValue":t[2]||(t[2]=s=>l.form.headers=s),height:"100px",placeholder:`\u793A\u4F8B: 
${l.headerExample}`},null,8,["modelValue","placeholder"])]),_:1}),o(g,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="5"
          v-model="form.body"
          placeholder="\u8BF7\u6C42\u4F53\uFF0C\u652F\u6301jinja2\u6A21\u677F\u8BED\u6CD5"
        ></el-input> `),o(b,{mode:"twig",modelValue:l.form.body,"onUpdate:modelValue":t[3]||(t[3]=s=>l.form.body=s),height:"140px",placeholder:l.bodyPlaceholder},null,8,["modelValue","placeholder"])]),_:1})]),_:1},8,["model","rules","label-width"]),ge,d(" \u64CD\u4F5C "),c("div",be,[o(_,{onClick:a.handleCancel},{default:r(()=>[C(v(e.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(_,{type:"primary",onClick:a.handleSubmit},{default:r(()=>[C(v(e.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])),[[S,l.loading]])}const I=D(_e,[["render",ye]]),ve=(e,t,n)=>{if(!t)return n();if(!$(t))return n(new Error("\u5FC5\u987B\u662Fjson"));let u=JSON.parse(t);R(u)?n():n(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},we={body:[{message:"\u8BF7\u6C42\u4F53\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{validator:ve,trigger:"blur"}],corpid:[{message:"\u4F01\u4E1AID\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],corpsecret:[{message:"\u51ED\u8BC1\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},Ce={name:"",props:{rowData:{type:Object,default:null},labelWidth:{type:String,default:""}},emits:["on-submit","on-cancel"],components:{CodeEditor:j},data(){return{loading:!1,rules:we,form:{corpid:"",corpsecret:"",body:""},defaultBody:JSON.stringify({touser:"@all",msgtype:"text",agentid:1,text:{content:`\u4F60\u7684\u57DF\u540D\u8BC1\u4E66\u5373\u5C06\u5230\u671F
\u70B9\u51FB\u67E5\u770B<a href="${window.location.href}">Domain Admin</a>`}},null,4)}},computed:{},methods:{async getData(){let e=this.rowData;console.log(this.rowData),e&&e.value?this.form={corpid:e.value.corpid,corpsecret:e.value.corpsecret,body:e.value.body}:this.form.body=this.defaultBody},handleCancel(){this.$emit("on-cancel")},handleSubmit(){console.log("handleSubmit"),this.$refs.form.validate(e=>{if(e)this.confirmSubmit();else return console.log("err"),!1})},async confirmSubmit(){console.log("confirmSubmit");let e={value:{corpid:this.form.corpid,corpsecret:this.form.corpsecret,body:this.form.body}};this.$emit("on-submit",W(e))}},created(){this.getData()}},Se=c("div",{class:"text-[14px] color--info"},[c("span",null,"\u5F00\u53D1\u6587\u6863\uFF1A"),c("a",{href:"https://developer.work.weixin.qq.com/document/path/90236",class:"color--brand",target:"_blank"},"\u4F01\u4E1A\u5FAE\u4FE1-\u53D1\u9001\u5E94\u7528\u6D88\u606F")],-1),Ve={class:"text-center"};function ke(e,t,n,u,l,a){const p=i("el-input"),f=i("el-form-item"),g=i("CodeEditor"),y=i("el-form"),b=i("el-button"),V=T("loading");return U((h(),w("div",null,[o(y,{ref:"form",model:l.form,rules:l.rules,"label-width":n.labelWidth},{default:r(()=>[o(f,{label:"\u4F01\u4E1AID",prop:"corpid"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.corpid,"onUpdate:modelValue":t[0]||(t[0]=_=>l.form.corpid=_),placeholder:"corpid"},null,8,["modelValue"])]),_:1}),o(f,{label:"\u51ED\u8BC1\u5BC6\u94A5",prop:"corpsecret"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.corpsecret,"onUpdate:modelValue":t[1]||(t[1]=_=>l.form.corpsecret=_),placeholder:"corpsecret"},null,8,["modelValue"])]),_:1}),o(f,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="10"
          v-model="form.body"
          placeholder="\u8BF7\u6C42\u4F53"
        ></el-input> `),o(g,{mode:"json",modelValue:l.form.body,"onUpdate:modelValue":t[2]||(t[2]=_=>l.form.body=_),height:"200px",placeholder:"\u8BF7\u6C42\u4F53"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-width"]),Se,d(" \u64CD\u4F5C "),c("div",Ve,[o(b,{onClick:a.handleCancel},{default:r(()=>[C(v(e.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(b,{type:"primary",onClick:a.handleSubmit},{default:r(()=>[C(v(e.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])),[[V,l.loading]])}const F=D(Ce,[["render",ke]]),De=(e,t,n)=>{if(!t)return n();if(!$(t))return n(new Error("\u5FC5\u987B\u662Fjson"));let u=JSON.parse(t);R(u)?n():n(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},Ee={body:[{message:"\u8BF7\u6C42\u4F53\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{validator:De,trigger:"blur"}],appkey:[{message:"\u5E94\u7528key\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],appsecret:[{message:"\u5E94\u7528\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},xe={name:"",props:{rowData:{type:Object,default:null},labelWidth:{type:String,default:""}},emits:["on-submit","on-cancel"],components:{CodeEditor:j},data(){return{loading:!1,rules:Ee,form:{appkey:"",appsecret:"",body:""},defaultBody:JSON.stringify({agent_id:"",userid_list:"",msg:{msgtype:"text",text:{content:"\u57DF\u540D\u6216\u8BC1\u4E66\u8FC7\u671F\u63D0\u9192"}}},null,4)}},computed:{},methods:{async getData(){let e=this.rowData;console.log(this.rowData),e&&e.value?this.form={appkey:e.value.appkey,appsecret:e.value.appsecret,body:e.value.body}:this.form.body=this.defaultBody},handleCancel(){this.$emit("on-cancel")},handleSubmit(){console.log("handleSubmit"),this.$refs.form.validate(e=>{if(e)this.confirmSubmit();else return console.log("err"),!1})},async confirmSubmit(){console.log("confirmSubmit");let e={value:{appkey:this.form.appkey,appsecret:this.form.appsecret,body:this.form.body}};this.$emit("on-submit",W(e))}},created(){this.getData()}},Oe=c("div",{class:"text-[14px] color--info"},[c("span",null,"\u5F00\u53D1\u6587\u6863\uFF1A"),c("a",{href:"https://open.dingtalk.com/document/orgapp/asynchronous-sending-of-enterprise-session-messages",class:"color--brand",target:"_blank"},"\u9489\u9489\u5F00\u653E\u5E73\u53F0-\u53D1\u9001\u5DE5\u4F5C\u901A\u77E5")],-1),Ne={class:"text-center"};function $e(e,t,n,u,l,a){const p=i("el-input"),f=i("el-form-item"),g=i("CodeEditor"),y=i("el-form"),b=i("el-button"),V=T("loading");return U((h(),w("div",null,[o(y,{ref:"form",model:l.form,rules:l.rules,"label-width":n.labelWidth},{default:r(()=>[o(f,{label:"\u5E94\u7528key",prop:"appkey"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.appkey,"onUpdate:modelValue":t[0]||(t[0]=_=>l.form.appkey=_),placeholder:"appkey"},null,8,["modelValue"])]),_:1}),o(f,{label:"\u5E94\u7528\u5BC6\u94A5",prop:"appsecret"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.appsecret,"onUpdate:modelValue":t[1]||(t[1]=_=>l.form.appsecret=_),placeholder:"appsecret"},null,8,["modelValue"])]),_:1}),o(f,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="10"
          v-model="form.body"
          placeholder="\u8BF7\u6C42\u4F53"
        ></el-input> `),o(g,{mode:"json",modelValue:l.form.body,"onUpdate:modelValue":t[2]||(t[2]=_=>l.form.body=_),height:"200px",placeholder:"\u8BF7\u6C42\u4F53"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-width"]),Oe,d(" \u64CD\u4F5C "),c("div",Ne,[o(b,{onClick:a.handleCancel},{default:r(()=>[C(v(e.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(b,{type:"primary",onClick:a.handleSubmit},{default:r(()=>[C(v(e.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])),[[V,l.loading]])}const A=D(xe,[["render",$e]]),Te=(e,t,n)=>{if(!t)return n();if(!$(t))return n(new Error("\u5FC5\u987B\u662Fjson"));let u=JSON.parse(t);R(u)?n():n(new Error("\u5FC5\u987B\u662Fobject\u5BF9\u8C61"))},Ue={body:[{message:"\u8BF7\u6C42\u4F53\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"},{validator:Te,trigger:"blur"}],app_id:[{message:"\u5E94\u7528key\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],app_secret:[{message:"\u5E94\u7528\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},We=[{value:"open_id",label:"open_id"},{value:"user_id",label:"user_id"},{value:"union_id",label:"union_id"},{value:"email",label:"email"},{value:"chat_id",label:"chat_id"}],je={name:"",props:{rowData:{type:Object,default:null},labelWidth:{type:String,default:""}},emits:["on-submit","on-cancel"],components:{CodeEditor:j},data(){return{loading:!1,rules:Ue,receiveIdTypeOptions:We,form:{app_id:"",app_secret:"",receive_id_type:"open_id",body:""},defaultBody:JSON.stringify({receive_id:"<open_id>",msg_type:"text",content:JSON.stringify({text:"\u57DF\u540D\u6216\u8BC1\u4E66\u8FC7\u671F\u63D0\u9192"})},null,4)}},computed:{},methods:{async getData(){let e=this.rowData;console.log(this.rowData),e&&e.value?this.form={app_id:e.value.app_id,app_secret:e.value.app_secret,body:e.value.body,receive_id_type:e.value.params.receive_id_type}:this.form.body=this.defaultBody},handleCancel(){this.$emit("on-cancel")},handleSubmit(){console.log("handleSubmit"),this.$refs.form.validate(e=>{if(e)this.confirmSubmit();else return console.log("err"),!1})},async confirmSubmit(){console.log("confirmSubmit");let e={value:{app_id:this.form.app_id,app_secret:this.form.app_secret,params:{receive_id_type:this.form.receive_id_type},body:this.form.body}};this.$emit("on-submit",W(e))}},created(){this.getData()}},qe=c("div",{class:"text-[14px] color--info"},[c("span",null,"\u5F00\u53D1\u6587\u6863\uFF1A"),c("a",{href:"https://open.feishu.cn/document/server-docs/im-v1/message/create",class:"color--brand",target:"_blank"},"\u98DE\u4E66\u5F00\u653E\u5E73\u53F0-\u53D1\u9001\u6D88\u606F")],-1),Re={class:"text-center"};function Be(e,t,n,u,l,a){const p=i("el-input"),f=i("el-form-item"),g=i("el-option"),y=i("el-select"),b=i("CodeEditor"),V=i("el-form"),_=i("el-button"),S=T("loading");return U((h(),w("div",null,[o(V,{ref:"form",model:l.form,rules:l.rules,"label-width":n.labelWidth},{default:r(()=>[o(f,{label:"\u5E94\u7528key",prop:"app_id"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.app_id,"onUpdate:modelValue":t[0]||(t[0]=s=>l.form.app_id=s),placeholder:"app_id"},null,8,["modelValue"])]),_:1}),o(f,{label:"\u5E94\u7528\u5BC6\u94A5",prop:"app_secret"},{default:r(()=>[o(p,{type:"text",modelValue:l.form.app_secret,"onUpdate:modelValue":t[1]||(t[1]=s=>l.form.app_secret=s),placeholder:"app_secret"},null,8,["modelValue"])]),_:1}),o(f,{label:"ID\u7C7B\u578B",prop:"receive_id_type"},{default:r(()=>[d(` <el-input
          type="text"
          v-model="form.app_secret"
          placeholder="app_secret"
        ></el-input> `),o(y,{modelValue:l.form.receive_id_type,"onUpdate:modelValue":t[2]||(t[2]=s=>l.form.receive_id_type=s),placeholder:"\u6D88\u606F\u63A5\u6536\u8005id\u7C7B\u578B"},{default:r(()=>[(h(!0),w(O,null,N(l.receiveIdTypeOptions,s=>(h(),E(g,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(f,{label:"\u8BF7\u6C42\u4F53",prop:"body"},{default:r(()=>[d(` <el-input
          type="textarea"
          :rows="10"
          v-model="form.body"
          placeholder="\u8BF7\u6C42\u4F53"
        ></el-input> `),o(b,{mode:"json",modelValue:l.form.body,"onUpdate:modelValue":t[3]||(t[3]=s=>l.form.body=s),height:"200px",placeholder:"\u8BF7\u6C42\u4F53"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-width"]),qe,d(" \u64CD\u4F5C "),c("div",Re,[o(_,{onClick:a.handleCancel},{default:r(()=>[C(v(e.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(_,{type:"primary",onClick:a.handleSubmit},{default:r(()=>[C(v(e.$t("\u4FDD\u5B58")),1)]),_:1},8,["onClick"])])])),[[S,l.loading]])}const P=D(je,[["render",Be]]),Le={name:"",props:{row:{type:Object,default:null}},emits:["on-success","on-cancel"],components:{NotifyEditEmail:J,NotifyEditWebhook:I,NotifyEditWorkWeixin:F,NotifyEditDingTalk:A,NotifyEditFeishu:P},data(){return{hasInit:!1,rowData:null,labelWidth:"90px",groupList:[],options:[{value:k.Email,label:this.$t("\u90AE\u4EF6"),icon:"Message",component:J},{value:k.Webhook,label:"WebHook",icon:"AlarmClock",component:I},{value:k.WorkWeixin,label:this.$t("\u4F01\u4E1A\u5FAE\u4FE1"),icon:"ChatSquare",component:F},{value:k.DingTalk,label:this.$t("\u9489\u9489"),icon:"ChatSquare",component:A},{value:k.Feishu,label:this.$t("\u98DE\u4E66"),icon:"ChatSquare",component:P}],rules:oe,EventEnum:B,EventOptions:G,form:{event_id:B.SSL_CERT_EXPIRE,type_id:k.Email,expire_days:3,comment:"",groups:[]}}},computed:{isEdit(){return this.row&&this.row.id},currentComponent(){return this.options.find(e=>e.value==this.form.type_id).component},disabledType(){return Boolean(this.row&&this.row.id)},checkAllGroup(){return this.groupList&&this.groupList.length>0&&this.form.groups.length==this.groupList.length},indeterminate(){return this.form.groups.length>0&&this.form.groups.length<this.groupList.length}},methods:{async getData(){if(await this.getGroupList(),this.row){let e={notify_id:this.row.id};const t=await this.$http.getNotifyById(e);if(t.ok){this.rowData=t.data;let n=t.data;this.form.event_id=n.event_id,this.form.type_id=n.type_id,this.form.value=n.value,this.form.expire_days=n.expire_days,this.form.comment=n.comment,n.groups&&n.groups.length>0&&(this.form.groups=n.groups)}}this.form.groups.length==0&&(this.form.groups=this.groupList.map(e=>e.id)),this.hasInit=!0},handleCancel(){this.$emit("on-cancel")},handleSubmit(e){console.log(e),this.$refs.form.validate(t=>{if(t)this.confirmSubmit(e);else return!1})},async confirmSubmit(e){let t=this.$loading({fullscreen:!0}),n={event_id:this.form.event_id,type_id:this.form.type_id,expire_days:this.form.expire_days,comment:this.form.comment,groups:this.checkAllGroup?null:this.form.groups,value:e.value},u=null;this.row&&this.row.id?(n.notify_id=this.row.id,u=await this.$http.updateNotifyById(n)):u=await this.$http.addNotify(n),u.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(u.msg),this.$nextTick(()=>{t.close()})},handleClose(){this.$emit("on-cancel")},async getGroupList(){const e=await this.$http.getGroupList();e.ok&&(this.groupList=e.data.list)},handleCheckAllGroupChange(){this.checkAllGroup?this.form.groups=[]:this.form.groups=this.groupList.map(e=>e.id),this.$refs.form.validateField("groups")},handleCheckedGroupChange(){this.$refs.form.validateField("groups")}},created(){this.getData()}},Je={class:"flex"};function Ie(e,t,n,u,l,a){const p=i("el-option"),f=i("el-select"),g=i("el-form-item"),y=i("el-input-number"),b=i("el-checkbox"),V=i("el-checkbox-group"),_=i("el-input"),S=i("el-form");return h(),w("div",null,[o(S,{ref:"form",model:l.form,rules:l.rules,"label-width":l.labelWidth},{default:r(()=>[d(" \u901A\u77E5\u65B9\u5F0F "),o(g,{label:e.$t("\u901A\u77E5\u65B9\u5F0F"),prop:"type_id"},{default:r(()=>[o(f,{placeholder:"\u901A\u77E5\u65B9\u5F0F",modelValue:l.form.type_id,"onUpdate:modelValue":t[0]||(t[0]=s=>l.form.type_id=s),disabled:a.disabledType},{default:r(()=>[(h(!0),w(O,null,N(l.options,s=>(h(),E(p,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1},8,["label"]),d(" \u89E6\u53D1\u4E8B\u4EF6 "),o(g,{label:e.$t("\u89E6\u53D1\u4E8B\u4EF6"),prop:"event_id"},{default:r(()=>[o(f,{placeholder:e.$t("\u89E6\u53D1\u4E8B\u4EF6"),modelValue:l.form.event_id,"onUpdate:modelValue":t[1]||(t[1]=s=>l.form.event_id=s)},{default:r(()=>[(h(!0),w(O,null,N(l.EventOptions,s=>(h(),E(p,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["placeholder","modelValue"])]),_:1},8,["label"]),[l.EventEnum.SSL_CERT_EXPIRE,l.EventEnum.DOMAIN_EXPIRE].includes(l.form.event_id)?(h(),w(O,{key:0},[o(g,{label:e.$t("\u5269\u4F59\u5929\u6570"),prop:"expire_days"},{default:r(()=>[o(y,{modelValue:l.form.expire_days,"onUpdate:modelValue":t[2]||(t[2]=s=>l.form.expire_days=s),min:0,placeholder:"\u8FC7\u671F\u901A\u77E5"},null,8,["modelValue"])]),_:1},8,["label"]),d(" \u5206\u7EC4 "),l.groupList&&l.groupList.length>0?(h(),E(g,{key:0,label:e.$t("\u89E6\u53D1\u5206\u7EC4"),prop:"groups"},{default:r(()=>[c("div",Je,[o(b,{class:"mr-sm","model-value":a.checkAllGroup,indeterminate:a.indeterminate,onChange:a.handleCheckAllGroupChange},{default:r(()=>[C("\u5168\u9009")]),_:1},8,["model-value","indeterminate","onChange"]),o(V,{class:"ml-md",modelValue:l.form.groups,"onUpdate:modelValue":t[3]||(t[3]=s=>l.form.groups=s),onChange:a.handleCheckedGroupChange},{default:r(()=>[(h(!0),w(O,null,N(l.groupList,s=>(h(),E(b,{key:s.id,label:s.id},{default:r(()=>[C(v(s.name),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","onChange"])])]),_:1},8,["label"])):d("v-if",!0)],64)):d("v-if",!0),d(" \u5907\u6CE8 "),o(g,{label:e.$t("\u5907\u6CE8"),prop:"comment"},{default:r(()=>[o(_,{modelValue:l.form.comment,"onUpdate:modelValue":t[4]||(t[4]=s=>l.form.comment=s),placeholder:e.$t("\u5907\u6CE8")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules","label-width"]),d(" \u7B49\u5F85\u521D\u59CB\u5316 "),l.hasInit?(h(),E(le(a.currentComponent),{key:0,rowData:l.rowData,labelWidth:l.labelWidth,onOnSubmit:a.handleSubmit,onOnCancel:a.handleClose},null,40,["rowData","labelWidth","onOnSubmit","onOnCancel"])):d("v-if",!0)])}const Fe=D(Le,[["render",Ie]]),Ae={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:Fe},data(){return{}},computed:{dialogTitle(){return this.row?this.$t("\u7F16\u8F91\u901A\u77E5"):this.$t("\u6DFB\u52A0\u901A\u77E5")},dialogVisible:{get(){return this.visible},set(e){this.$emit("update:visible",e)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function Pe(e,t,n,u,l,a){const p=i("DataForm"),f=i("el-dialog");return h(),w(O,null,[d(" \u7F16\u8F91\u6846 "),o(f,{title:a.dialogTitle,modelValue:a.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=g=>a.dialogVisible=g),width:"800px",center:"",top:"8vh","append-to-body":""},{default:r(()=>[a.dialogVisible?(h(),E(p,{key:0,row:n.row,onOnCancel:a.handleClose,onOnSuccess:a.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):d("v-if",!0)]),_:1},8,["title","modelValue"])],2112)}const z=D(Ae,[["render",Pe]]),Ge={name:"",components:{DataFormDialog:z},props:{list:{type:Array}},emits:["on-sort-change"],computed:{},data(){return{currentRow:null,dialogVisible:!1,NotifyTypeEnum:k}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={notify_id:e.id};const n=await this.$http.deleteNotifyById(t);n.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(n.msg)},async handleStatusChange(e,t){let n={notify_id:e.id,status:t};const u=await this.$http.updateNotifyStatusById(n);u.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(u.msg)},handleUpdateSuccess(){this.$emit("on-success")},async handleTestRow(e){let t=this.$loading({fullscreen:!0}),n={notify_id:e.id};const u=await this.$http.handleTestNotifyById(n);if(u.code==0){let l=u.data;try{l=JSON.parse(l)}catch{}this.$msg.success(l||"\u64CD\u4F5C\u6210\u529F")}else this.$msg.error(u.msg);this.$nextTick(()=>{t.close()})}},created(){}},ze={key:1},Me={class:"inline-flex items-center"},Xe={class:"mr-[2px]"};function He(e,t,n,u,l,a){const p=i("el-table-column"),f=i("el-switch"),g=i("Warning"),y=i("el-icon"),b=i("el-tooltip"),V=i("Position"),_=i("el-link"),S=i("el-popconfirm"),s=i("Edit"),M=i("Delete"),X=i("el-table"),H=i("DataFormDialog");return h(),w("div",null,[o(X,{data:n.list,stripe:"",border:"",onSortChange:t[0]||(t[0]=m=>e.$emit("on-sort-change",m))},{default:r(()=>[o(p,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:r(m=>[c("span",null,v(m.$index+1),1)]),_:1},8,["label"]),d(" \u4E8B\u4EF6\u7C7B\u578B "),o(p,{label:e.$t("\u4E8B\u4EF6\u7C7B\u578B"),"header-align":"center",align:"left",width:"150",prop:"event_id",sortable:"custom"},{default:r(m=>[c("span",null,v(m.row.event_label||"-"),1)]),_:1},8,["label"]),d(" \u901A\u77E5\u65B9\u5F0F "),o(p,{label:e.$t("\u901A\u77E5\u65B9\u5F0F"),"header-align":"center",align:"left",width:"150",prop:"type_id",sortable:"custom"},{default:r(m=>[c("span",null,v(m.row.type_label||"-"),1)]),_:1},8,["label"]),d(" \u5269\u4F59\u5929\u6570 "),o(p,{label:e.$t("\u5269\u4F59\u5929\u6570"),"header-align":"center",align:"center",width:"90",prop:"expire_days",sortable:"custom"},{default:r(m=>[c("span",null,v(m.row.expire_days||"-"),1)]),_:1},8,["label"]),d(" \u5206\u7EC4 "),o(p,{label:e.$t("\u89E6\u53D1\u5206\u7EC4"),"header-align":"center",align:"center",width:"90",prop:"groups"},{default:r(m=>[m.row.group_list&&m.row.group_list.length>0?(h(!0),w(O,{key:0},N(m.row.group_list,x=>(h(),w("div",null,v(x.name),1))),256)):(h(),w("span",ze,"\u5168\u90E8"))]),_:1},8,["label"]),d(" \u901A\u77E5\u914D\u7F6E "),d(` <el-table-column
        label="\u901A\u77E5\u914D\u7F6E"
        header-align="center"
        align="left"
        prop="value"
      >
        <template #default="scope">`),d(" \u90AE\u4EF6\u65B9\u5F0F "),d(` <template v-if="NotifyTypeEnum.Email">
            <template
              v-if="
                scope.row.value &&
                scope.row.value.email_list &&
                scope.row.value.email_list.length > 0
              "
            >
              <template v-for="item in scope.row.value.email_list">
                <div>{{ item }}</div>
              </template>
            </template>

            <span v-else>-</span>
          </template>
          <span v-else>-</span>
        </template> `),d(" </el-table-column>  "),d(" \u5907\u6CE8 "),o(p,{label:e.$t("\u5907\u6CE8"),"header-align":"center",align:"left",prop:"comment"},{default:r(m=>[c("span",null,v(m.row.comment||"-"),1)]),_:1},8,["label"]),d(" \u64CD\u4F5C "),o(p,{label:e.$t("\u542F\u7528"),"header-align":"center",align:"center",width:"90",prop:"status",sortable:"custom"},{default:r(m=>[o(f,{modelValue:m.row.status,"onUpdate:modelValue":x=>m.row.status=x,onChange:x=>a.handleStatusChange(m.row,x)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1},8,["label"]),d(" \u64CD\u4F5C "),o(p,{label:e.$t("\u6D4B\u8BD5"),"header-align":"center",align:"center",width:"80"},{header:r(()=>[o(b,{effect:"dark",content:"\u5982\u679C\u6536\u4E0D\u5230\u6D88\u606F\uFF0C\u53EF\u5C1D\u8BD5\u589E\u52A0\uFF1A\u5269\u4F59\u5929\u6570",placement:"top-start","show-after":800},{default:r(()=>[c("div",Me,[c("span",Xe,v(e.$t("\u6D4B\u8BD5")),1),o(y,null,{default:r(()=>[o(g)]),_:1})])]),_:1})]),default:r(m=>[o(S,{title:"\u786E\u5B9A\u53D1\u9001\uFF1F",onConfirm:x=>a.handleTestRow(m.row),disabled:m.row.disable_test},{reference:r(()=>[o(_,{underline:!1,type:"primary",disabled:m.row.disable_test},{default:r(()=>[o(y,null,{default:r(()=>[o(V)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["onConfirm","disabled"])]),_:1},8,["label"]),o(p,{label:e.$t("\u7F16\u8F91"),width:"60","header-align":"center",align:"center"},{default:r(m=>[o(_,{underline:!1,type:"primary",onClick:x=>a.handleEditRow(m.row)},{default:r(()=>[o(y,null,{default:r(()=>[o(s)]),_:1})]),_:2},1032,["onClick"])]),_:1},8,["label"]),o(p,{label:e.$t("\u5220\u9664"),width:"60",align:"center",prop:"tag"},{default:r(m=>[o(S,{title:`${e.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:x=>a.handleDeleteClick(m.row)},{reference:r(()=>[o(_,{underline:!1,type:"danger"},{default:r(()=>[o(y,null,{default:r(()=>[o(M)]),_:1})]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1},8,["label"])]),_:1},8,["data"]),d(" \u7F16\u8F91\u6846 "),o(H,{visible:l.dialogVisible,"onUpdate:visible":t[1]||(t[1]=m=>l.dialogVisible=m),row:l.currentRow,onOnSuccess:a.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"])])}const Ke=D(Ge,[["render",He]]),Qe={name:"notify-list",props:{},components:{DataFormDialog:z,DataTable:Ke},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1,order_type:"",order_prop:""}},computed:{},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let e={page:this.page,size:this.size,keyword:this.keyword,order_type:this.order_type,order_prop:this.order_prop};try{const t=await this.$http.getNotifyListOfUser(e);t.code==0&&(this.list=t.data.list.map(n=>(n.type_label=ae(n.type_id),n.event_label=Q(n.event_id),n.event_id==B.MONITOR_EXCEPTION&&(n.expire_days=null,n.disable_test=!0),n)),this.total=t.data.total)}catch(t){console.log(t)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleSortChange({column:e,prop:t,order:n}){console.log(e,t,n),this.order_prop="",this.order_type="",n&&(this.order_type=n,this.order_prop=t),this.resetData()}},created(){this.resetData()}},Ye={class:"app-container"},Ze={class:"margin-bottom--20"};function et(e,t,n,u,l,a){const p=i("Plus"),f=i("el-icon"),g=i("el-button"),y=i("DataTable"),b=i("el-pagination"),V=i("DataFormDialog"),_=T("loading");return h(),w("div",Ye,[d(" \u64CD\u4F5C\u6309\u94AE "),c("div",Ze,[o(g,{type:"primary",onClick:a.handleAddRow},{default:r(()=>[o(f,null,{default:r(()=>[o(p)]),_:1}),C(v(e.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick"])]),d(" \u6570\u636E\u5217\u8868 "),U(o(y,{class:"mt-md",list:l.list,onOnSuccess:a.resetData,onOnSortChange:a.handleSortChange},null,8,["list","onOnSuccess","onOnSortChange"]),[[_,l.loading]]),d(" \u7FFB\u9875 "),o(b,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:l.total,"page-size":l.size,"onUpdate:pageSize":t[0]||(t[0]=S=>l.size=S),"current-page":l.page,"onUpdate:currentPage":t[1]||(t[1]=S=>l.page=S),onCurrentChange:a.getData},null,8,["total","page-size","current-page","onCurrentChange"]),d(" \u7F16\u8F91\u6846 "),o(V,{visible:l.dialogVisible,"onUpdate:visible":t[2]||(t[2]=S=>l.dialogVisible=S),onOnSuccess:a.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const st=D(Qe,[["render",et]]);export{st as default};