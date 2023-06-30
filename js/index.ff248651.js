import{i as q,E as H}from"./event-enums.6c6f25e7.js";import{S as A,u as B}from"./SelectGroup.f49be142.js";import{_ as D,d as E,r as Y}from"./index.56110aa5.js";import{ah as s,ar as $,Q as T,o as h,c as x,V as i,P as a,a as u,T as b,O as y,S as V,U as p,L as M,ax as z,aA as K,a9 as Q}from"./vendor-vue.edbe275b.js";import{E as G,A as X,a as J,b as W,C as Z}from"./ConditionFilterGroup.08bc30e1.js";import{F as ee}from"./vendor-lib.4c56f242.js";import{a as te}from"./element-plus.dcbfaaa8.js";import"./element-icon.ade3aa7e.js";const oe={domain:[{message:"\u57DF\u540D\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],port:[{required:!1,trigger:"blur",validator:(o,t,e)=>{if(!t)return e();if(q(t))e();else return e(new Error("\u7AEF\u53E3\u53F7\u53EA\u80FD\u662F\u6570\u5B57"))}}]},ie={name:"",props:{row:{type:Object,default:null}},components:{SelectGroup:A},data(){return{loading:!1,form:{domain:"",comment:"",port:443,group_id:"",domain_start_time:"",domain_expire_time:""},rules:oe,disabledTime:!1}},computed:{disabledDomain(){return!!this.row}},methods:{async getData(){if(this.loading=!0,this.row){let o={domain_info_id:this.row.id},e=(await this.$http.getDomainInfoById(o)).data;this.form.domain=e.domain,this.form.comment=e.comment,this.form.group_id=e.group_id,this.form.domain_start_time=e.domain_start_time,this.form.domain_expire_time=e.domain_expire_time,this.form.group_id==0&&(this.form.group_id=""),e.is_auto_update&&(this.disabledTime=!0)}this.loading=!1},handleCancel(){this.$emit("on-cancel")},handleSubmit(){console.log("handleSubmit",this.form),this.$refs.form.validate(o=>{if(console.log(o),o)this.confirmSubmit();else return!1})},async confirmSubmit(){let o=this.$loading({fullscreen:!0}),t={domain:this.form.domain.trim(),comment:this.form.comment.trim(),group_id:this.form.group_id,domain_start_time:this.form.domain_start_time,domain_expire_time:this.form.domain_expire_time},e=null;this.row?(t.domain_info_id=this.row.id,e=await this.$http.updateDomainInfoById(t)):e=await this.$http.addDomainInfo(t),e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg),this.$nextTick(()=>{o.close()})}},created(){this.getData()}},ne={class:"text-center"};function ae(o,t,e,c,n,l){const m=s("el-input"),d=s("el-form-item"),_=s("el-date-picker"),C=s("SelectGroup"),k=s("el-form"),w=s("el-button"),v=$("loading");return T((h(),x("div",null,[i(k,{ref:"form",model:n.form,rules:n.rules,"label-width":"70px"},{default:a(()=>[i(d,{label:"\u57DF\u540D",prop:"domain"},{default:a(()=>[i(m,{type:"text",modelValue:n.form.domain,"onUpdate:modelValue":t[0]||(t[0]=f=>n.form.domain=f),placeholder:"\u8BF7\u8F93\u5165\u57DF\u540D"},null,8,["modelValue"])]),_:1}),i(d,{label:"\u6CE8\u518C\u65F6\u95F4",prop:"domain_start_time"},{default:a(()=>[i(_,{modelValue:n.form.domain_start_time,"onUpdate:modelValue":t[1]||(t[1]=f=>n.form.domain_start_time=f),type:"date","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"\u57DF\u540D\u6CE8\u518C\u65F6\u95F4",disabled:n.disabledTime},null,8,["modelValue","disabled"])]),_:1}),i(d,{label:"\u5230\u671F\u65F6\u95F4",prop:"domain_expire_time"},{default:a(()=>[i(_,{modelValue:n.form.domain_expire_time,"onUpdate:modelValue":t[2]||(t[2]=f=>n.form.domain_expire_time=f),"value-format":"YYYY-MM-DD HH:mm:ss",type:"date",placeholder:"\u57DF\u540D\u5230\u671F\u65F6\u95F4",disabled:n.disabledTime},null,8,["modelValue","disabled"])]),_:1}),i(d,{label:"\u5206\u7EC4",prop:"group_id"},{default:a(()=>[i(C,{class:"w-[150px]",modelValue:n.form.group_id,"onUpdate:modelValue":t[3]||(t[3]=f=>n.form.group_id=f),clearable:""},null,8,["modelValue"])]),_:1}),i(d,{label:"\u5907\u6CE8",prop:"comment"},{default:a(()=>[i(m,{type:"textarea",modelValue:n.form.comment,"onUpdate:modelValue":t[4]||(t[4]=f=>n.form.comment=f),rows:3,placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),u("div",ne,[i(w,{onClick:l.handleCancel},{default:a(()=>[b("\u53D6 \u6D88")]),_:1},8,["onClick"]),i(w,{type:"primary",onClick:l.handleSubmit},{default:a(()=>[b("\u786E \u5B9A")]),_:1},8,["onClick"])])])),[[v,n.loading]])}const le=D(ie,[["render",ae]]),se={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:le},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u57DF\u540D":"\u6DFB\u52A0\u57DF\u540D"},dialogVisible:{get(){return this.visible},set(o){this.$emit("update:visible",o)}}},methods:{handleClose(){this.$emit("on-success"),this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function re(o,t,e,c,n,l){const m=s("DataForm"),d=s("el-dialog");return h(),y(d,{title:l.dialogTitle,modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=_=>l.dialogVisible=_),width:"400px",center:"","append-to-body":"","lock-scroll":!1},{default:a(()=>[l.dialogVisible?(h(),y(m,{key:0,row:e.row,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):V("",!0)]),_:1},8,["title","modelValue"])}const P=D(se,[["render",re]]),de={name:"",props:{row:{type:Object,default:null}},components:{ExpireDays:G,AddressList:X},data(){return{form:{domain:"",domain_url:"",ip:"",start_time:"",expire_time:"",check_time:"",connect_status:"",total_days:"",expire_days:"",create_time:"",update_time:"",detail:{issuer:{},subject:{}},real_time_expire_days:"",domain_start_time:"",domain_expire_time:"",real_time_domain_expire_days:"",alias:"",domain_auto_update:"",domain_auto_update_label:"",domain_expire_monitor:"",domain_check_time_label:"",port:"",real_domain_expire_days:"",ssl_count:"",comment:"",domain_registrar:"",domain_registrar_url:""},ipInfo:{isp:""}}},computed:{},methods:{async getData(){if(this.row){let o={domain_info_id:this.row.id};const t=await this.$http.getDomainInfoById(o);if(t.code!=0)return;let e=t.data;this.form.domain=e.domain,this.form.update_time_label=e.update_time_label,this.form.ssl_count=e.ssl_count,this.form.comment=e.comment,this.form.domain_url=e.domain_url,this.form.domain_registrar_url=e.domain_registrar_url,this.form.domain_registrar=e.domain_registrar,this.form.ip=e.ip,this.form.start_time=e.start_time,this.form.expire_time=e.expire_time,this.form.check_time=e.check_time,this.form.connect_status=e.connect_status,this.form.total_days=e.total_days,this.form.expire_days=e.expire_days,this.form.real_time_expire_days=e.real_time_expire_days,this.form.create_time=e.create_time,this.form.update_time=e.update_time,this.form.domain_auto_update=e.domain_auto_update,this.form.domain_auto_update_label=e.is_auto_update==!0?"\u662F":"\u5426",this.form.domain_expire_monitor=e.is_expire_monitor==!0?"\u662F":"\u5426",this.form.domain_check_time_label=e.domain_check_time_label,this.form.port=e.port,this.form.real_domain_expire_days=e.real_domain_expire_days,this.form.alias=e.alias,this.form.domain_start_time=e.domain_start_time,this.form.domain_expire_time=e.domain_expire_time,this.form.real_time_domain_expire_days=e.real_time_domain_expire_days,this.form.detail={issuer:e.detail.issuer||{},subject:e.detail.subject||{}}}},handleCancel(){this.$emit("on-cancel")},async handleUpdateRowDomainInfo(){let o=this.$loading({lock:!0,text:"\u66F4\u65B0\u4E2D"}),t={domain_info_id:this.row.id};(await this.$http.updateDomainInfoRowById(t)).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.getData()),o.close()},async getIpInfo(){let o={ip:this.form.ip};const t=await this.$http.getIpInfo(o);t.code==0&&(this.ipInfo=t.data)}},created(){this.getData()}},me={class:"domain-detail"},ce={class:"mo-form-detail grid grid-cols-2"},ue={class:"truncate"},_e={class:"flex justify-between flex-1"},pe={class:"truncate"},he={class:"truncate"},fe={class:"mo-form-detail mt-[20px]"},ge=["href"],be={key:1},we={class:"truncate"},ye={class:"text-center mt-md"};function De(o,t,e,c,n,l){const m=s("el-link"),d=s("el-form-item"),_=s("el-form"),C=s("ExpireDays"),k=s("Refresh"),w=s("el-icon"),v=s("el-button");return h(),x("div",me,[u("div",ce,[i(_,{"label-width":"130px"},{default:a(()=>[i(d,{label:"\u57DF\u540D",prop:"domain"},{default:a(()=>[i(m,{underline:!1},{default:a(()=>[b(p(n.form.domain),1)]),_:1})]),_:1}),i(d,{label:"\u6CE8\u518C\u65F6\u95F4",prop:"create_time"},{default:a(()=>[u("span",null,p(n.form.domain_start_time||"-"),1)]),_:1}),i(d,{label:"\u5230\u671F\u65F6\u95F4",prop:"create_time"},{default:a(()=>[u("span",null,p(n.form.domain_expire_time||"-"),1)]),_:1}),i(d,{label:"\u81EA\u52A8\u66F4\u65B0",prop:"isp"},{default:a(()=>[u("span",ue,p(n.form.domain_auto_update_label||"-"),1)]),_:1})]),_:1}),i(_,{"label-width":"130px",style:{"margin-right":"-1px"}},{default:a(()=>[i(d,{label:"\u8BC1\u4E66\u6570\u91CF",prop:"domain"},{default:a(()=>[u("span",null,p(n.form.ssl_count||"-"),1)]),_:1}),i(d,{label:"\u5269\u4F59\u5929\u6570",prop:"create_time"},{default:a(()=>[i(C,{value:n.form.real_domain_expire_days},null,8,["value"])]),_:1}),i(d,{label:"\u68C0\u67E5\u65F6\u95F4",prop:"isp"},{default:a(()=>[u("div",_e,[u("span",pe,p(n.form.update_time_label||"-"),1),i(m,{underline:!1,type:"primary",class:"mr-sm",onClick:l.handleUpdateRowDomainInfo},{default:a(()=>[i(w,null,{default:a(()=>[i(k)]),_:1})]),_:1},8,["onClick"])])]),_:1}),i(d,{label:"\u8FC7\u671F\u76D1\u6D4B",prop:"isp"},{default:a(()=>[u("span",he,p(n.form.domain_expire_monitor||"-"),1)]),_:1})]),_:1})]),u("div",fe,[i(_,{"label-width":"130px"},{default:a(()=>[i(d,{label:"\u6CE8\u518C\u5546",prop:"domain_registrar"},{default:a(()=>[n.form.domain_registrar_url?(h(),x("a",{key:0,href:n.form.domain_registrar_url,target:"_blank",class:"mo-link"},p(n.form.domain_registrar),9,ge)):(h(),x("span",be,p(n.form.domain_registrar||"-"),1))]),_:1}),i(d,{label:"\u5907\u6CE8",prop:"comment"},{default:a(()=>[u("span",we,p(n.form.comment||"-"),1)]),_:1})]),_:1})]),u("div",ye,[i(v,{type:"primary",onClick:l.handleCancel},{default:a(()=>[b("\u5173 \u95ED")]),_:1},8,["onClick"])])])}const Ce=D(de,[["render",De]]),xe={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:Ce},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(o){this.$emit("update:visible",o)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose()},handleDialogClose(){this.$emit("on-success")}},created(){}};function ke(o,t,e,c,n,l){const m=s("DataForm"),d=s("el-dialog");return h(),y(d,{title:"\u57DF\u540D\u8BE6\u60C5",modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=_=>l.dialogVisible=_),width:"800px",center:"","append-to-body":"","lock-scroll":!1,onClose:l.handleDialogClose},{default:a(()=>[l.dialogVisible?(h(),y(m,{key:0,row:e.row,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):V("",!0)]),_:1},8,["modelValue","onClose"])}const ve=D(xe,[["render",ke]]),Se={name:"",components:{DataFormDialog:P,DataDetailDialog:ve,ExpireDays:G,ExpireProgress:J,AddressListgDialog:W},emits:["on-success","selection-change","sort-change","on-refresh-row"],props:{},computed:{},data(){return{currentRow:null,dialogVisible:!1,dialogDetailVisible:!1,AddressListgDialogVisible:!1}},methods:{handleEditRow(o){this.currentRow=o,this.dialogVisible=!0},async handleDeleteClick(o){let t={domain_info_id:o.id};const e=await this.$http.deleteDomainInfoById(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},async handleStatusChange(o){let t={id:o.id};const e=await this.$Http.function(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},async handleMonitorStatusChange(o,t){let e={domain_info_id:o.id,field:"is_expire_monitor",value:t};const c=await this.$http.updateDomainInfoFieldById(e);c.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(c.msg)},async handleAutoUpdateStatusChange(o,t){let e={domain_info_id:o.id,field:"is_auto_update",value:t};const c=await this.$http.updateDomainInfoFieldById(e);c.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(c.msg)},async handleUpdateRowDomainInfo(o){let t=this.$loading({lock:!0,text:"\u66F4\u65B0\u4E2D"}),e={domain_info_id:o.id};(await this.$http.updateDomainInfoRowById(e)).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")),t.close()},handleUpdateSuccess(){this.$emit("on-success")},handleDetailSuccess(){},handleShowDetail(o){this.currentRow=o,this.dialogDetailVisible=!0},handleShowAddressListgDialog(o){this.currentRow=o,this.AddressListgDialogVisible=!0},handleCertCountClick(o){let t=this.$router.resolve({name:"domain-list",query:{keyword:o.domain}});window.open(t.href,"_blank")},handleRefreshRow(o){this.$emit("on-refresh-row",o)}},created(){}},Ve={key:1};function Ie(o,t,e,c,n,l){const m=s("el-table-column"),d=s("el-link"),_=s("ExpireDays"),C=s("el-switch"),k=s("Refresh"),w=s("el-icon"),v=s("Edit"),f=s("Delete"),I=s("el-popconfirm"),R=s("el-table"),O=s("DataFormDialog"),U=s("DataDetailDialog"),F=s("AddressListgDialog");return h(),x("div",null,[i(R,M({stripe:"",border:""},o.$attrs,{onSortChange:t[0]||(t[0]=r=>o.$emit("sort-change",r)),onSelectionChange:t[1]||(t[1]=r=>o.$emit("selection-change",r))}),{default:a(()=>[i(m,{type:"selection","header-align":"center",align:"center",width:"40"}),i(m,{label:"\u57DF\u540D","header-align":"center",align:"center",width:"250","show-overflow-tooltip":"",prop:"domain"},{default:a(r=>[i(d,{underline:!1,onClick:g=>l.handleShowDetail(r.row)},{default:a(()=>[b(p(r.row.domain),1)]),_:2},1032,["onClick"])]),_:1}),i(m,{label:"\u57DF\u540D\u5929\u6570","header-align":"center",align:"center",width:"90",sortable:"custom",prop:"domain_expire_days"},{default:a(r=>[i(_,{value:r.row.real_domain_expire_days},null,8,["value"])]),_:1}),i(m,{label:"\u8BC1\u4E66\u6570\u91CF","header-align":"center",align:"center",width:"100"},{default:a(r=>[r.row.ssl_count&&r.row.ssl_count>0?(h(),y(d,{key:0,underline:!1,onClick:g=>l.handleCertCountClick(r.row)},{default:a(()=>[b(p(r.row.ssl_count),1)]),_:2},1032,["onClick"])):(h(),x("span",Ve,"-"))]),_:1}),i(m,{label:"\u5206\u7EC4","header-align":"center",align:"center",width:"100",sortable:"custom",prop:"group_name"},{default:a(r=>[u("span",null,p(r.row.group_name||"-"),1)]),_:1}),i(m,{label:"\u5907\u6CE8","header-align":"center",align:"left",prop:"comment","show-overflow-tooltip":""},{default:a(r=>[u("span",null,p(r.row.comment||"-"),1)]),_:1}),i(m,{label:"\u66F4\u65B0\u65F6\u95F4","header-align":"center",align:"center",width:"90",prop:"update_time",sortable:"custom","show-overflow-tooltip":""},{default:a(r=>[u("span",null,p(r.row.update_time_label||"-"),1)]),_:1}),i(m,{label:"\u81EA\u52A8\u66F4\u65B0",width:"90","header-align":"center",align:"center",sortable:"custom",prop:"domain_expire_monitor"},{default:a(r=>[i(C,{modelValue:r.row.is_auto_update,"onUpdate:modelValue":g=>r.row.is_auto_update=g,onChange:g=>l.handleAutoUpdateStatusChange(r.row,g)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),i(m,{label:"\u5230\u671F\u63D0\u9192",width:"90","header-align":"center",align:"center",sortable:"custom",prop:"is_expire_monitor"},{default:a(r=>[i(C,{modelValue:r.row.is_expire_monitor,"onUpdate:modelValue":g=>r.row.is_expire_monitor=g,onChange:g=>l.handleMonitorStatusChange(r.row,g)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),i(m,{label:"\u64CD\u4F5C",width:"100","header-align":"center",align:"center"},{default:a(r=>[i(d,{underline:!1,type:"primary",class:"mr-sm",onClick:g=>l.handleUpdateRowDomainInfo(r.row)},{default:a(()=>[i(w,null,{default:a(()=>[i(k)]),_:1})]),_:2},1032,["onClick"]),i(d,{underline:!1,type:"primary",class:"mr-sm",onClick:g=>l.handleEditRow(r.row)},{default:a(()=>[i(w,null,{default:a(()=>[i(v)]),_:1})]),_:2},1032,["onClick"]),i(I,{title:"\u786E\u5B9A\u5220\u9664\uFF1F",onConfirm:g=>l.handleDeleteClick(r.row)},{reference:a(()=>[i(d,{underline:!1,type:"danger"},{default:a(()=>[i(w,null,{default:a(()=>[i(f)]),_:1})]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},16),i(O,{visible:n.dialogVisible,"onUpdate:visible":t[2]||(t[2]=r=>n.dialogVisible=r),row:n.currentRow,onOnSuccess:t[3]||(t[3]=r=>l.handleRefreshRow(n.currentRow))},null,8,["visible","row"]),i(U,{row:n.currentRow,visible:n.dialogDetailVisible,"onUpdate:visible":t[4]||(t[4]=r=>n.dialogDetailVisible=r),onOnSuccess:t[5]||(t[5]=r=>l.handleRefreshRow(n.currentRow))},null,8,["row","visible"]),n.currentRow?(h(),y(F,{key:0,domainId:n.currentRow.id,visible:n.AddressListgDialogVisible,"onUpdate:visible":t[6]||(t[6]=r=>n.AddressListgDialogVisible=r),onOnSuccess:l.handleUpdateSuccess},null,8,["domainId","visible","onOnSuccess"])):V("",!0)])}const Re=D(Se,[["render",Ie]]),Oe={name:"updateDomainInfo",props:{},components:{},data(){return{updateTimer:null}},computed:{disableUpdateButton(){return this.updateTimer!=null},updateText(){return this.disableUpdateButton?"\u6B63\u5728\u66F4\u65B0":"\u5168\u90E8\u66F4\u65B0"}},methods:{async updateAllDomainCertInfoOfUser(){this.updateTimer=!0,(await this.$http.updateDomainInfoOfUser()).code==0&&this.$msg.success("\u540E\u53F0\u66F4\u65B0\u4E2D\uFF0C\u5237\u65B0\u67E5\u770B")}},beforeUnmount(){clearInterval(this.updateTimer),this.updateTimer=null},created(){}};function Ue(o,t,e,c,n,l){const m=s("Refresh"),d=s("el-icon"),_=s("el-link");return h(),y(_,{underline:!1,type:"primary",onClick:l.updateAllDomainCertInfoOfUser,disabled:l.disableUpdateButton},{default:a(()=>[i(d,null,{default:a(()=>[i(m)]),_:1}),b(p(l.updateText),1)]),_:1},8,["onClick","disabled"])}const Fe=D(Oe,[["render",Ue]]),Be={name:"updateDomainInfo",props:{},components:{},data(){return{updateTimer:null}},computed:{disableUpdateButton(){return this.updateTimer!=null},updateText(){return this.disableUpdateButton?"\u6B63\u5728\u68C0\u67E5":"\u57DF\u540D\u68C0\u67E5"}},methods:{async handleNotifyByEventId(){const o=await this.$http.handleNotifyByEventId({event_id:H.DOMAIN_EXPIRE});o.ok&&this.$msg.success(`\u6210\u529F\u6E20\u9053\uFF1A${o.data.success}`)}},beforeUnmount(){clearInterval(this.updateTimer),this.updateTimer=null},created(){}};function $e(o,t,e,c,n,l){const m=s("Position"),d=s("el-icon"),_=s("el-link");return h(),y(_,{underline:!1,type:"primary",onClick:l.handleNotifyByEventId,disabled:l.disableUpdateButton},{default:a(()=>[i(d,null,{default:a(()=>[i(m)]),_:1}),b(p(l.updateText),1)]),_:1},8,["onClick","disabled"])}const Te=D(Be,[["render",$e]]),Ee={name:"ConditionFilter",props:{},components:{ConditionFilterGroup:Z},data(){return{loading:!0,options:[{title:"\u57DF\u540D\u72B6\u6001",field:"domain_expire_days",selected:[],maxCount:1,options:[{label:"\u5DF2\u8FC7\u671F",value:[null,3]},{label:"3\u5929\u5185\u8FC7\u671F",value:[0,3]},{label:"7\u5929\u5185\u8FC7\u671F",value:[0,7]},{label:"30\u5929\u5185\u8FC7\u671F",value:[0,30]}]},{title:"\u57DF\u540D\u5206\u7EC4",field:"group_ids",hidden:!0,selected:[],options:[]}]}},computed:{...z(B,{groupOptions:"getGroupOptions"})},methods:{async resetData(){const o=await this.$http.getDomainInfoGroupFilter();o.ok&&this.options.forEach(t=>{t.field=="group_ids"&&(o.data.list&&o.data.list.length>0?(t.options=o.data.list.map(e=>{let c=e.name;return e.domain_count>0&&(c=`${e.name} ${e.domain_count}`),{...e,value:e.id,label:c}}),t.hidden=!1):t.hidden=!0)}),this.loading=!1},handleChange(o){this.$emit("on-change",this.options)}},created(){this.resetData()}},Ae={class:""};function ze(o,t,e,c,n,l){const m=s("ConditionFilterGroup"),d=$("loading");return T((h(),x("div",Ae,[i(m,{options:n.options,onOnChange:l.handleChange},null,8,["options","onOnChange"])])),[[d,n.loading]])}const Ge=D(Ee,[["render",ze]]),Pe={name:"domain-list",props:{},components:{DataFormDialog:P,DataTable:Re,SelectGroup:A,UpdateDomainInfo:Fe,CheckDomainInfo:Te,ConditionFilter:Ge},data(){return{dataApi:E,list:[],total:0,page:1,size:20,keyword:"",group_id:"",pageSizeCachekey:"pageSize",loading:!0,dialogVisible:!1,export_to_file_url:Y(E.exportDomainToFile),order_type:"ascending",order_prop:"domain_expire_days",hasInitData:!1,ConditionFilterParams:[],selectedRows:[]}},computed:{...z(B,{groupOptions:"getGroupOptions"}),showBatchDeleteButton(){return!!(this.selectedRows&&this.selectedRows.length>0)}},methods:{...K(B,{updateGroupOptions:"updateGroupOptions"}),resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let o={page:this.page,size:this.size,group_id:this.group_id,keyword:this.keyword.trim(),order_type:this.order_type,order_prop:this.order_prop};for(let e of this.ConditionFilterParams)e.selected&&e.selected.length>0&&(e.maxCount==1?o[e.field]=e.selected[0]:o[e.field]=e.selected);const t=await this.$http.getDomainInfoList(o);t.code==0?(this.list=t.data.list,this.total=t.data.total):this.$msg.error(t.msg),this.loading=!1},getGroupName(o){let t=this.groupOptions.find(e=>e.value==o);if(t)return t.name},async handleHttpRequest(o){let t=this.$loading({fullscreen:!0}),e=new FormData;e.append("file",o.file),(await this.$http.importDomainInFromFile(e)).code==0&&(this.$msg.success("\u4E0A\u4F20\u6210\u529F\uFF0C\u540E\u53F0\u5BFC\u5165\u4E2D"),this.resetData(),this.$refs.ConditionFilter&&this.$refs.ConditionFilter.resetData(),this.updateGroupOptions()),t.close()},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},async handleExportToFile(){const o=await this.$http.exportDomainInfoFile();o.ok&&ee.saveAs(o.data.url,o.data.name)},handleSearch(){this.resetData()},handleSizeChange(o){localStorage.setItem(this.pageSizeCachekey,o),this.resetData()},loadPageSize(){let o=localStorage.getItem(this.pageSizeCachekey);o&&(this.size=parseInt(o))},handleExceed(o){this.$refs.upload.clearFiles();const t=o[0];t.uid=te(),this.handleHttpRequest({file:t})},handleSortChange({column:o,prop:t,order:e}){console.log(o,t,e),this.order_prop="",this.order_type="",e&&(this.order_type=e,this.order_prop=t),this.resetData()},async initData(){this.loadPageSize(),await this.updateGroupOptions(),this.hasInitData=!0,this.getData()},handleSelectionChange(o){this.selectedRows=o},handleConditionFilterChange(o){console.log(o),this.ConditionFilterParams=o,this.resetData()},async handleBatchDeleteConfirm(){let o=this.$loading({fullscreen:!0}),t={domain_info_ids:this.selectedRows.map(e=>e.id)};try{const e=await this.$http.deleteDomainInfoByIds(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg)}catch(e){console.log(e)}finally{this.$nextTick(()=>{o.close()})}},async handleRefreshRow(o){let t={domain_info_id:o.id};const e=await this.$http.getDomainInfoById(t);if(e.ok){let c=this.list.findIndex(n=>n.id==o.id);this.list.splice(c,1,e.data),console.log(this.list)}}},created(){this.initData()}},Le={class:"app-container"},je={class:"flex",style:{"justify-content":"space-between"}},Ne={class:"flex mt-sm",style:{"align-items":"center"}},qe={style:{"font-size":"14px",color:"#333333"}},He={class:"flex",style:{"margin-left":"auto"}},Ye=u("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}},null,-1);function Me(o,t,e,c,n,l){const m=s("Plus"),d=s("el-icon"),_=s("el-button"),C=s("Search"),k=s("el-input"),w=s("ConditionFilter"),v=s("Delete"),f=s("el-link"),I=s("el-popconfirm"),R=s("UpdateDomainInfo"),O=s("CheckDomainInfo"),U=s("Upload"),F=s("el-upload"),r=s("Download"),g=s("DataTable"),L=s("el-pagination"),j=s("DataFormDialog"),N=$("loading");return h(),x("div",Le,[u("div",je,[i(_,{type:"primary",onClick:l.handleAddRow},{default:a(()=>[i(d,null,{default:a(()=>[i(m)]),_:1}),b("\u6DFB\u52A0")]),_:1},8,["onClick"]),i(k,{class:"ml-sm",style:{width:"260px"},modelValue:n.keyword,"onUpdate:modelValue":t[0]||(t[0]=S=>n.keyword=S),placeholder:"\u641C\u7D22\u57DF\u540D",clearable:"",onKeypress:Q(l.handleSearch,["enter"]),onClear:l.handleSearch},{append:a(()=>[i(_,{onClick:l.handleSearch},{default:a(()=>[i(d,null,{default:a(()=>[i(C)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"])]),n.hasInitData?(h(),y(w,{key:0,class:"mt-md",ref:"ConditionFilter",onOnChange:l.handleConditionFilterChange},null,8,["onOnChange"])):V("",!0),u("div",Ne,[u("div",qe,"\u5171\u8BA1 "+p(n.total)+" \u6761\u6570\u636E",1),u("div",He,[l.showBatchDeleteButton?(h(),y(I,{key:0,title:"\u786E\u5B9A\u5220\u9664\u9009\u4E2D\uFF1F",onConfirm:l.handleBatchDeleteConfirm},{reference:a(()=>[i(f,{underline:!1,type:"danger",class:"mr-sm"},{default:a(()=>[i(d,null,{default:a(()=>[i(v)]),_:1}),b("\u6279\u91CF\u5220\u9664")]),_:1})]),_:1},8,["onConfirm"])):V("",!0),i(R,{onOnSuccess:l.resetData},null,8,["onOnSuccess"]),i(O,{class:"ml-sm",onOnSuccess:l.resetData},null,8,["onOnSuccess"]),i(f,{underline:!1,type:"primary",class:"ml-sm",style:{position:"relative"}},{default:a(()=>[i(d,null,{default:a(()=>[i(U)]),_:1}),b("\u5BFC\u5165 "),i(F,{ref:"upload",action:"action",accept:".txt",limit:1,"on-exceed":l.handleExceed,"show-file-list":!1,"http-request":l.handleHttpRequest},{default:a(()=>[Ye]),_:1},8,["on-exceed","http-request"])]),_:1}),i(f,{underline:!1,type:"primary",class:"ml-sm",onClick:l.handleExportToFile},{default:a(()=>[i(d,null,{default:a(()=>[i(r)]),_:1}),b("\u5BFC\u51FA")]),_:1},8,["onClick"])])]),T(i(g,{class:"mt-sm",data:n.list,onOnSuccess:l.resetData,onSortChange:l.handleSortChange,onSelectionChange:l.handleSelectionChange,onOnRefreshRow:l.handleRefreshRow},null,8,["data","onOnSuccess","onSortChange","onSelectionChange","onOnRefreshRow"]),[[N,n.loading]]),i(L,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":t[1]||(t[1]=S=>n.size=S),"current-page":n.page,"onUpdate:currentPage":t[2]||(t[2]=S=>n.page=S),onCurrentChange:l.getData,onSizeChange:l.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),i(j,{visible:n.dialogVisible,"onUpdate:visible":t[3]||(t[3]=S=>n.dialogVisible=S),onOnSuccess:l.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const ot=D(Pe,[["render",Me]]);export{ot as default};
