import{i as q,E as H}from"./event-enums.6c6f25e7.js";import{S as G,u as $}from"./SelectGroup.c805f730.js";import{_ as x,d as P,r as Y}from"./index.f7516781.js";import{ah as s,ar as A,Q as z,o as h,c as C,V as t,P as i,a as c,T as w,O as y,S as I,U as f,L as M,ax as L,aA as W,a9 as K}from"./vendor-vue.edbe275b.js";import{E as N,A as Q,a as X,b as J,C as Z}from"./ConditionFilterGroup.2f805951.js";import{C as ee}from"./ConnectStatus.2af2da8c.js";import{F as te}from"./vendor-lib.aab05a6a.js";import{a as oe}from"./element-plus.83d58e84.js";import"./element-icon.ade3aa7e.js";const le={domain:[{message:"\u57DF\u540D\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],port:[{required:!0,trigger:"blur",validator:(l,e,o)=>{if(!e)return o();if(q(e))o();else return o(new Error("\u7AEF\u53E3\u53F7\u53EA\u80FD\u662F\u6570\u5B57"))}}]},ie={name:"",props:{row:{type:Object,default:null}},components:{SelectGroup:G},data(){return{loading:!1,form:{domain:"",alias:"",port:443,group_id:"",is_dynamic_host:!1,start_time:"",expire_time:"",auto_update:!0},rules:le}},computed:{disabledDomain(){return!!this.row}},methods:{async getData(){if(this.loading=!0,this.row){let l={id:this.row.id},o=(await this.$http.getDomainById(l)).data;this.form.domain=o.domain,this.form.alias=o.alias,this.form.group_id=o.group_id,this.form.port=o.port,this.form.is_dynamic_host=o.is_dynamic_host,this.form.start_time=o.start_time,this.form.expire_time=o.expire_time,this.form.auto_update=o.auto_update,this.form.group_id==0&&(this.form.group_id="")}this.loading=!1},handleCancel(){this.$emit("on-cancel")},handleSubmit(){console.log("handleSubmit",this.form),this.$refs.form.validate(l=>{if(console.log(l),l)this.confirmSubmit();else return!1})},async confirmSubmit(){let l=this.$loading({fullscreen:!0}),e={domain:this.form.domain.trim(),alias:this.form.alias.trim(),group_id:this.form.group_id,port:this.form.port,is_dynamic_host:this.form.is_dynamic_host,start_time:this.form.start_time,expire_time:this.form.expire_time,auto_update:this.form.auto_update},o=null;this.row?(e.id=this.row.id,o=await this.$http.updateDomainById(e)):o=await this.$http.addDomain(e),o.ok&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")),this.$nextTick(()=>{l.close()})}},created(){this.getData()}},ae={class:"flex"},ne={class:"flex justify-between w-full"},se=c("span",null," - ",-1),re={class:"grid grid-cols-2"},de={class:"text-center"};function me(l,e,o,u,a,n){const m=s("el-input"),d=s("el-form-item"),p=s("el-date-picker"),k=s("el-switch"),b=s("Warning"),v=s("el-icon"),S=s("el-link"),D=s("el-tooltip"),O=s("SelectGroup"),U=s("el-form"),R=s("el-button"),F=A("loading");return z((h(),C("div",null,[t(U,{ref:"form",model:a.form,rules:a.rules,"label-width":"70px"},{default:i(()=>[c("div",ae,[t(d,{label:"\u57DF\u540D",prop:"domain",class:"flex-1"},{default:i(()=>[t(m,{type:"text",modelValue:a.form.domain,"onUpdate:modelValue":e[0]||(e[0]=_=>a.form.domain=_),placeholder:"\u8BF7\u8F93\u5165\u57DF\u540D"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u7AEF\u53E3",prop:"port",style:{width:"140px"}},{default:i(()=>[t(m,{type:"text",modelValue:a.form.port,"onUpdate:modelValue":e[1]||(e[1]=_=>a.form.port=_),placeholder:"\u8BF7\u8F93\u5165\u7AEF\u53E3"},null,8,["modelValue"])]),_:1})]),t(d,{label:"\u8BC1\u4E66\u65F6\u95F4",prop:"start_time"},{default:i(()=>[c("div",ne,[t(p,{modelValue:a.form.start_time,"onUpdate:modelValue":e[2]||(e[2]=_=>a.form.start_time=_),type:"date","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4",disabled:a.form.auto_update,style:{width:"180px"}},null,8,["modelValue","disabled"]),se,t(p,{modelValue:a.form.expire_time,"onUpdate:modelValue":e[3]||(e[3]=_=>a.form.expire_time=_),type:"date","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4",disabled:a.form.auto_update,style:{width:"180px"}},null,8,["modelValue","disabled"])])]),_:1}),c("div",re,[t(d,{label:"\u81EA\u52A8\u66F4\u65B0",prop:"is_dynamic_host"},{default:i(()=>[t(k,{modelValue:a.form.auto_update,"onUpdate:modelValue":e[4]||(e[4]=_=>a.form.auto_update=_)},null,8,["modelValue"]),t(D,{effect:"dark",content:"\u5982\u9700\u624B\u52A8\u8BBE\u7F6E\u8BC1\u4E66\u65F6\u95F4\uFF0C\u9700\u5173\u95ED\u81EA\u52A8\u66F4\u65B0",placement:"top-start","show-after":500},{default:i(()=>[t(S,{underline:!1},{default:i(()=>[t(v,{class:"ml-sm"},{default:i(()=>[t(b)]),_:1})]),_:1})]),_:1})]),_:1}),t(d,{label:"\u52A8\u6001\u4E3B\u673A",prop:"is_dynamic_host"},{default:i(()=>[t(k,{modelValue:a.form.is_dynamic_host,"onUpdate:modelValue":e[5]||(e[5]=_=>a.form.is_dynamic_host=_)},null,8,["modelValue"]),t(D,{effect:"dark",content:"\u6BCF\u6B21\u81EA\u52A8\u66F4\u65B0\u5C06\u91CD\u7F6E\u4E3B\u673A\u5217\u8868",placement:"top-start","show-after":500},{default:i(()=>[t(S,{underline:!1},{default:i(()=>[t(v,{class:"ml-sm"},{default:i(()=>[t(b)]),_:1})]),_:1})]),_:1})]),_:1})]),t(d,{label:"\u5206\u7EC4",prop:"group_id"},{default:i(()=>[t(O,{class:"w-[150px]",modelValue:a.form.group_id,"onUpdate:modelValue":e[6]||(e[6]=_=>a.form.group_id=_),clearable:""},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5907\u6CE8",prop:"alias"},{default:i(()=>[t(m,{type:"textarea",modelValue:a.form.alias,"onUpdate:modelValue":e[7]||(e[7]=_=>a.form.alias=_),rows:3,placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),c("div",de,[t(R,{onClick:n.handleCancel},{default:i(()=>[w("\u53D6 \u6D88")]),_:1},8,["onClick"]),t(R,{type:"primary",onClick:n.handleSubmit},{default:i(()=>[w("\u786E \u5B9A")]),_:1},8,["onClick"])])])),[[F,a.loading]])}const ce=x(ie,[["render",me]]),ue={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:ce},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u57DF\u540D":"\u6DFB\u52A0\u57DF\u540D"},dialogVisible:{get(){return this.visible},set(l){this.$emit("update:visible",l)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function pe(l,e,o,u,a,n){const m=s("DataForm"),d=s("el-dialog");return h(),y(d,{title:n.dialogTitle,modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>n.dialogVisible=p),width:"500px",center:"","append-to-body":"","lock-scroll":!1},{default:i(()=>[n.dialogVisible?(h(),y(m,{key:0,row:o.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):I("",!0)]),_:1},8,["title","modelValue"])}const j=x(ue,[["render",pe]]),_e={name:"",props:{row:{type:Object,default:null}},components:{ExpireDays:N,AddressList:Q},data(){return{form:{domain:"",domain_url:"",ip:"",start_time:"",expire_time:"",check_time:"",connect_status:"",total_days:"",expire_days:"",create_time:"",update_time:"",group_name:"",real_time_expire_days:"",domain_start_time:"",domain_expire_time:"",real_time_domain_expire_days:"",alias:"",domain_auto_update:"",domain_auto_update_label:"",domain_expire_monitor:"",domain_check_time_label:"",port:"",address_count:0,group:null},ipInfo:{isp:""}}},computed:{},methods:{async getData(){if(this.row){let l={id:this.row.id};const e=await this.$http.getDomainById(l);if(!e.ok)return;let o=e.data;this.form.domain=o.domain,this.form.domain_url=o.domain_url,this.form.ip=o.ip,this.form.start_time=o.start_time,this.form.expire_time=o.expire_time,this.form.check_time=o.check_time,this.form.connect_status=o.connect_status,this.form.total_days=o.total_days,this.form.expire_days=o.expire_days,this.form.real_time_expire_days=o.real_time_expire_days,this.form.create_time=o.create_time,this.form.update_time_label=o.update_time_label,this.form.domain_auto_update=o.domain_auto_update,this.form.domain_auto_update_label=o.domain_auto_update==!0?"\u662F":"\u5426",this.form.domain_expire_monitor=o.domain_expire_monitor==!0?"\u662F":"\u5426",this.form.domain_check_time_label=o.domain_check_time_label,this.form.port=o.port,this.form.alias=o.alias,this.form.domain_start_time=o.domain_start_time,this.form.domain_expire_time=o.domain_expire_time,this.form.real_time_domain_expire_days=o.real_time_domain_expire_days,this.form.address_count=o.address_count,this.form.group=o.group,this.form.group_name=o.group_name}},handleCancel(){this.$emit("on-cancel")},async handleUpdateRowDomainInfo(){let l=this.$loading({lock:!0,text:"\u66F4\u65B0\u4E2D"}),e={domain_id:this.row.id};(await this.$http.updateDomainCertInfoById(e)).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.getData()),l.close()},async getIpInfo(){let l={ip:this.form.ip};const e=await this.$http.getIpInfo(l);e.code==0&&(this.ipInfo=e.data)}},created(){this.getData()}},he={class:"domain-detail"},fe={class:"mo-form-detail grid grid-cols-2"},ge={key:0},we={key:1},be={class:"flex justify-between flex-1"},ye={class:"truncate"},De={class:"mo-form-detail mt-[20px]"},Ce={class:"truncate"},xe={class:"text-center mt-md"};function ke(l,e,o,u,a,n){const m=s("el-link"),d=s("el-form-item"),p=s("el-form"),k=s("ExpireDays"),b=s("Refresh"),v=s("el-icon"),S=s("el-button");return h(),C("div",he,[c("div",fe,[t(p,{"label-width":"130px"},{default:i(()=>[t(d,{label:"\u57DF\u540D",prop:"domain"},{default:i(()=>[t(m,{underline:!1,href:a.form.domain_url,target:"_blank"},{default:i(()=>[w(f(a.form.domain),1)]),_:1},8,["href"])]),_:1}),t(d,{label:"\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4",prop:"create_time"},{default:i(()=>[c("span",null,f(a.form.start_time||"-"),1)]),_:1}),t(d,{label:"\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4",prop:"create_time"},{default:i(()=>[c("span",null,f(a.form.expire_time||"-"),1)]),_:1}),t(d,{label:"\u5206\u7EC4",prop:"create_time"},{default:i(()=>[a.form.group_name?(h(),C("span",ge,f(a.form.group_name||"-"),1)):(h(),C("span",we,"-"))]),_:1})]),_:1}),t(p,{"label-width":"130px",style:{"margin-right":"-1px"}},{default:i(()=>[t(d,{label:"\u7AEF\u53E3\u53F7",prop:"domain"},{default:i(()=>[c("span",null,f(a.form.port||"-"),1)]),_:1}),t(d,{label:"\u5269\u4F59\u5929\u6570",prop:"create_time"},{default:i(()=>[t(k,{value:a.form.real_time_expire_days},null,8,["value"])]),_:1}),t(d,{label:"\u68C0\u67E5\u65F6\u95F4",prop:"isp"},{default:i(()=>[c("div",be,[c("span",ye,f(a.form.update_time_label||"-"),1),t(m,{underline:!1,type:"primary",class:"mr-sm",onClick:n.handleUpdateRowDomainInfo},{default:i(()=>[t(v,null,{default:i(()=>[t(b)]),_:1})]),_:1},8,["onClick"])])]),_:1}),t(d,{label:"\u4E3B\u673A\u6570\u91CF",prop:"create_time"},{default:i(()=>[c("span",null,f(a.form.address_count||"-"),1)]),_:1})]),_:1})]),c("div",De,[t(p,{"label-width":"130px"},{default:i(()=>[t(d,{label:"\u5907\u6CE8",prop:"isp"},{default:i(()=>[c("span",Ce,f(a.form.alias||"-"),1)]),_:1})]),_:1})]),c("div",xe,[t(S,{type:"primary",onClick:n.handleCancel},{default:i(()=>[w("\u5173 \u95ED")]),_:1},8,["onClick"])])])}const ve=x(_e,[["render",ke]]),Se={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:ve},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(l){this.$emit("update:visible",l)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose()},handleDialogClose(){this.$emit("on-success")}},created(){}};function Ve(l,e,o,u,a,n){const m=s("DataForm"),d=s("el-dialog");return h(),y(d,{title:"\u8BC1\u4E66\u8BE6\u60C5",modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>n.dialogVisible=p),width:"800px",center:"","append-to-body":"","lock-scroll":!1,onClose:n.handleDialogClose},{default:i(()=>[n.dialogVisible?(h(),y(m,{key:0,row:o.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):I("",!0)]),_:1},8,["modelValue","onClose"])}const Re=x(Se,[["render",Ve]]),Ie={name:"",components:{DataFormDialog:j,DataDetailDialog:Re,ConnectStatus:ee,ExpireDays:N,ExpireProgress:X,AddressListgDialog:J},emits:["on-success","selection-change","sort-change","on-refresh-row"],props:{},computed:{},data(){return{currentRow:null,dialogVisible:!1,dialogDetailVisible:!1,AddressListgDialogVisible:!1}},methods:{handleEditRow(l){this.currentRow=l,this.dialogVisible=!0},async handleDeleteClick(l){let e={id:l.id};const o=await this.$http.deleteDomainById(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg)},async handleStatusChange(l){let e={id:l.id};const o=await this.$Http.function(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(o.msg)},async handleMonitorStatusChange(l,e){let o={domain_id:l.id,is_monitor:e};const u=await this.$http.updateDomainExpireMonitorById(o);u.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(u.msg)},async handleUpdateRowDomainInfo(l){let e=this.$loading({lock:!0,text:"\u66F4\u65B0\u4E2D"}),o={id:l.id};(await this.$http.updateDomainRowInfoById(o)).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")),e.close()},handleUpdateSuccess(){this.$emit("on-success")},handleDetailSuccess(){},handleShowDetail(l){this.currentRow=l,this.dialogDetailVisible=!0},handleShowAddressListgDialog(l){this.currentRow=l,this.AddressListgDialogVisible=!0},async handleAutoUpdateStatusChange(l,e){let o={domain_id:l.id,field:"auto_update",value:e};const u=await this.$http.updateDomainFieldById(o);u.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(u.msg)},handleRefreshRow(l){this.$emit("on-refresh-row",l)},handleSelectable(l,e){return l.has_edit_permission}},created(){}},Oe={key:0,class:"color--danger"},Ue={key:2},Fe={class:"inline-flex items-center"},Te=c("span",{class:"mr-[2px]"},"\u8BC1\u4E66\u5929\u6570",-1);function Be(l,e,o,u,a,n){const m=s("el-table-column"),d=s("el-link"),p=s("ConnectStatus"),k=s("Warning"),b=s("el-icon"),v=s("el-tooltip"),S=s("ExpireProgress"),D=s("el-switch"),O=s("Refresh"),U=s("Edit"),R=s("Delete"),F=s("el-popconfirm"),_=s("el-table"),T=s("DataFormDialog"),B=s("DataDetailDialog"),E=s("AddressListgDialog");return h(),C("div",null,[t(_,M({stripe:"",border:""},l.$attrs,{onSortChange:e[0]||(e[0]=r=>l.$emit("sort-change",r)),onSelectionChange:e[1]||(e[1]=r=>l.$emit("selection-change",r))}),{default:i(()=>[t(m,{type:"selection","header-align":"center",align:"center",width:"40",selectable:n.handleSelectable},null,8,["selectable"]),t(m,{label:"\u57DF\u540D","header-align":"center",align:"center",width:"230","show-overflow-tooltip":"",prop:"domain"},{default:i(r=>[t(d,{underline:!1,onClick:g=>n.handleShowDetail(r.row)},{default:i(()=>[w(f(r.row.domain),1)]),_:2},1032,["onClick"])]),_:1}),t(m,{label:"\u7AEF\u53E3","header-align":"center",align:"center",width:"60",sortable:"custom",prop:"port"},{default:i(r=>[c("span",null,f(r.row.port||"-"),1)]),_:1}),t(m,{label:"\u4E3B\u673A\u6570\u91CF","header-align":"center",align:"center",width:"80",prop:"address_count"},{default:i(r=>[r.row.is_dynamic_host?(h(),C("span",Oe,"*")):I("",!0),r.row.address_count&&r.row.address_count>0?(h(),y(d,{key:1,underline:!1,onClick:g=>n.handleShowAddressListgDialog(r.row)},{default:i(()=>[w(f(r.row.address_count),1)]),_:2},1032,["onClick"])):(h(),C("span",Ue,"-"))]),_:1}),t(m,{label:"\u72B6\u6001","header-align":"center",align:"center",width:"60",sortable:"custom",prop:"expire_status"},{default:i(r=>[t(p,{value:r.row.expire_status,onOnClick:g=>n.handleShowAddressListgDialog(r.row)},null,8,["value","onOnClick"])]),_:1}),t(m,{label:"\u8BC1\u4E66\u5929\u6570","header-align":"center",align:"center",width:"110",sortable:"custom",prop:"expire_days"},{header:i(()=>[t(v,{effect:"dark",content:"\u5982\u6709\u591A\u4E2A\u4E3B\u673AIP\u5730\u5740\uFF0C\u6B64\u5904\u4EC5\u663E\u793A\u5230\u671F\u65F6\u95F4\u6700\u77ED\u7684\u8BC1\u4E66",placement:"top-start","show-after":800},{default:i(()=>[c("div",Fe,[Te,t(b,null,{default:i(()=>[t(k)]),_:1})])]),_:1})]),default:i(r=>[t(S,{startTime:r.row.start_time,endTime:r.row.expire_time},null,8,["startTime","endTime"])]),_:1}),t(m,{label:"\u5206\u7EC4","header-align":"center",align:"center",width:"100",sortable:"custom",prop:"group_name"},{default:i(r=>[c("span",null,f(r.row.group_name||"-"),1)]),_:1}),t(m,{label:"\u5907\u6CE8","header-align":"center",align:"left",prop:"check_time","show-overflow-tooltip":""},{default:i(r=>[c("span",null,f(r.row.alias||"-"),1)]),_:1}),t(m,{label:"\u66F4\u65B0\u65F6\u95F4","header-align":"center",align:"center",width:"100",prop:"update_time",sortable:"custom","show-overflow-tooltip":""},{default:i(r=>[c("span",null,f(r.row.update_time_label||"-"),1)]),_:1}),t(m,{label:"\u81EA\u52A8\u66F4\u65B0",width:"90","header-align":"center",align:"center",sortable:"custom",prop:"auto_update"},{default:i(r=>[t(D,{disabled:!r.row.has_edit_permission,modelValue:r.row.auto_update,"onUpdate:modelValue":g=>r.row.auto_update=g,onChange:g=>n.handleAutoUpdateStatusChange(r.row,g)},null,8,["disabled","modelValue","onUpdate:modelValue","onChange"])]),_:1}),t(m,{label:"\u5230\u671F\u63D0\u9192",width:"90","header-align":"center",align:"center",sortable:"custom",prop:"is_monitor"},{default:i(r=>[t(D,{disabled:!r.row.has_edit_permission,modelValue:r.row.is_monitor,"onUpdate:modelValue":g=>r.row.is_monitor=g,onChange:g=>n.handleMonitorStatusChange(r.row,g)},null,8,["disabled","modelValue","onUpdate:modelValue","onChange"])]),_:1}),t(m,{label:"\u64CD\u4F5C",width:"100","header-align":"center",align:"center"},{default:i(r=>[t(d,{underline:!1,type:"primary",class:"mr-sm",onClick:g=>n.handleUpdateRowDomainInfo(r.row)},{default:i(()=>[t(b,null,{default:i(()=>[t(O)]),_:1})]),_:2},1032,["onClick"]),t(d,{underline:!1,type:"primary",class:"mr-sm",disabled:!r.row.has_edit_permission,onClick:g=>n.handleEditRow(r.row)},{default:i(()=>[t(b,null,{default:i(()=>[t(U)]),_:1})]),_:2},1032,["disabled","onClick"]),t(F,{title:"\u786E\u5B9A\u5220\u9664\uFF1F",onConfirm:g=>n.handleDeleteClick(r.row),disabled:!r.row.has_edit_permission},{reference:i(()=>[t(d,{underline:!1,type:"danger",disabled:!r.row.has_edit_permission},{default:i(()=>[t(b,null,{default:i(()=>[t(R)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["onConfirm","disabled"])]),_:1})]),_:1},16),t(T,{visible:a.dialogVisible,"onUpdate:visible":e[2]||(e[2]=r=>a.dialogVisible=r),row:a.currentRow,onOnSuccess:e[3]||(e[3]=r=>n.handleRefreshRow(a.currentRow))},null,8,["visible","row"]),t(B,{row:a.currentRow,visible:a.dialogDetailVisible,"onUpdate:visible":e[4]||(e[4]=r=>a.dialogDetailVisible=r),onOnSuccess:e[5]||(e[5]=r=>n.handleRefreshRow(a.currentRow))},null,8,["row","visible"]),a.currentRow?(h(),y(E,{key:0,domainId:a.currentRow.id,domainRow:a.currentRow,visible:a.AddressListgDialogVisible,"onUpdate:visible":e[6]||(e[6]=r=>a.AddressListgDialogVisible=r),onOnClose:e[7]||(e[7]=r=>n.handleRefreshRow(a.currentRow))},null,8,["domainId","domainRow","visible"])):I("",!0)])}const Ee=x(Ie,[["render",Be]]),$e={name:"updateDomainInfo",props:{},components:{},data(){return{updateTimer:null}},computed:{disableUpdateButton(){return this.updateTimer!=null},updateText(){return this.disableUpdateButton?"\u6B63\u5728\u66F4\u65B0":"\u5168\u90E8\u66F4\u65B0"}},methods:{async updateAllDomainCertInfoOfUser(){this.updateTimer=!0,await this.$http.updateAllDomainCertInfoOfUser()}},beforeUnmount(){clearInterval(this.updateTimer),this.updateTimer=null},created(){}};function Ae(l,e,o,u,a,n){const m=s("Refresh"),d=s("el-icon"),p=s("el-link");return h(),y(p,{underline:!1,type:"primary",onClick:n.updateAllDomainCertInfoOfUser,disabled:n.disableUpdateButton},{default:i(()=>[t(d,null,{default:i(()=>[t(m)]),_:1}),w(f(n.updateText),1)]),_:1},8,["onClick","disabled"])}const ze=x($e,[["render",Ae]]),Pe={name:"updateDomainInfo",props:{},components:{},data(){return{updateTimer:null}},computed:{disableUpdateButton(){return this.updateTimer!=null},updateText(){return this.disableUpdateButton?"\u6B63\u5728\u68C0\u67E5":"\u8BC1\u4E66\u68C0\u67E5"}},methods:{async handleNotifyByEventId(){let l=this.$loading({lock:!0,text:"\u68C0\u67E5\u4E2D",fullscreen:!0});try{const e=await this.$http.handleNotifyByEventId({event_id:H.SSL_CERT_EXPIRE});e.ok&&this.$msg.success(`\u68C0\u67E5\u6E20\u9053\uFF1A${e.data.success}`)}catch(e){console.log(e)}finally{this.$nextTick(()=>{l.close()})}}},beforeUnmount(){clearInterval(this.updateTimer),this.updateTimer=null},created(){}};function Ge(l,e,o,u,a,n){const m=s("Position"),d=s("el-icon"),p=s("el-link");return h(),y(p,{underline:!1,type:"primary",onClick:n.handleNotifyByEventId,disabled:n.disableUpdateButton},{default:i(()=>[t(d,null,{default:i(()=>[t(m)]),_:1}),w(f(n.updateText),1)]),_:1},8,["onClick","disabled"])}const Le=x(Pe,[["render",Ge]]),Ne={name:"ConditionFilter",props:{},components:{ConditionFilterGroup:Z},data(){return{loading:!0,options:[{title:"\u8BC1\u4E66\u72B6\u6001",maxCount:1,field:"expire_days",selected:[],options:[{label:"\u5DF2\u8FC7\u671F",value:[null,3]},{label:"3\u5929\u5185\u8FC7\u671F",value:[0,3]},{label:"7\u5929\u5185\u8FC7\u671F",value:[0,7]},{label:"30\u5929\u5185\u8FC7\u671F",value:[0,30]}]},{title:"\u57DF\u540D\u5206\u7EC4",field:"group_ids",hidden:!0,selected:[],options:[]}]}},computed:{...L($,{groupOptions:"getGroupOptions"})},methods:{async resetData(){const l=await this.$http.getGroupList();l.ok&&this.options.forEach(e=>{e.field=="group_ids"&&(l.data.list&&l.data.list.length>0?(e.options=l.data.list.map(o=>{let u=o.name;return{...o,value:o.id,label:u}}),e.hidden=!1):e.hidden=!0)}),this.loading=!1},handleChange(l){this.$emit("on-change",this.options)}},created(){this.resetData()}},je={class:""};function qe(l,e,o,u,a,n){const m=s("ConditionFilterGroup"),d=A("loading");return z((h(),C("div",je,[t(m,{options:a.options,onOnChange:n.handleChange},null,8,["options","onOnChange"])])),[[d,a.loading]])}const He=x(Ne,[["render",qe]]),Ye={name:"domain-list",props:{},components:{DataFormDialog:j,DataTable:Ee,SelectGroup:G,UpdateDomainInfo:ze,CheckDomainInfo:Le,ConditionFilter:He},data(){return{dataApi:P,list:[],total:0,page:1,size:20,keyword:"",group_id:"",pageSizeCachekey:"pageSize",loading:!0,dialogVisible:!1,export_to_file_url:Y(P.exportDomainToFile),order_type:"ascending",order_prop:"expire_days",hasInitData:!1,ConditionFilterParams:[],selectedRows:[]}},computed:{...L($,{groupOptions:"getGroupOptions"}),showBatchDeleteButton(){return!!(this.selectedRows&&this.selectedRows.length>0)}},methods:{...W($,{updateGroupOptions:"updateGroupOptions"}),resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let l={page:this.page,size:this.size,group_id:this.group_id,keyword:this.keyword.trim(),order_type:this.order_type,order_prop:this.order_prop};for(let o of this.ConditionFilterParams)o.selected&&o.selected.length>0&&(o.maxCount==1?l[o.field]=o.selected[0]:l[o.field]=o.selected);const e=await this.$http.getDomainList(l);e.code==0?(this.list=e.data.list,this.total=e.data.total):this.$msg.error(e.msg),this.loading=!1},getGroupName(l){let e=this.groupOptions.find(o=>o.value==l);if(e)return e.name},async handleHttpRequest(l){let e=this.$loading({fullscreen:!0}),o=new FormData;o.append("file",l.file),(await this.$http.importDomainFromFile(o)).code==0&&(this.$msg.success("\u4E0A\u4F20\u6210\u529F\uFF0C\u540E\u53F0\u5BFC\u5165\u4E2D"),this.resetData(),this.$refs.ConditionFilter&&this.$refs.ConditionFilter.resetData(),this.updateGroupOptions()),e.close()},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},async handleExportToFile(){const l=await this.$http.exportDomainFile();l.ok&&te.saveAs(l.data.url,l.data.name)},handleSearch(){this.resetData()},handleSizeChange(l){localStorage.setItem(this.pageSizeCachekey,l),this.resetData()},loadPageSize(){let l=localStorage.getItem(this.pageSizeCachekey);l&&(this.size=parseInt(l))},handleExceed(l){this.$refs.upload.clearFiles();const e=l[0];e.uid=oe(),this.handleHttpRequest({file:e})},handleSortChange({column:l,prop:e,order:o}){console.log(l,e,o),this.order_prop="",this.order_type="",o&&(this.order_type=o,this.order_prop=e),this.resetData()},async initData(){this.loadPageSize(),await this.updateGroupOptions(),this.hasInitData=!0,this.getData()},handleSelectionChange(l){this.selectedRows=l},handleConditionFilterChange(l){console.log(l),this.ConditionFilterParams=l,this.resetData()},async handleBatchDeleteConfirm(){let l=this.$loading({fullscreen:!0}),e={ids:this.selectedRows.map(o=>o.id)};try{const o=await this.$http.deleteDomainByIds(e);o.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(o.msg)}catch(o){console.log(o)}finally{this.$nextTick(()=>{l.close()})}},async handleRefreshRow(l){let e={id:l.id};const o=await this.$http.getDomainById(e);if(o.ok){let u=this.list.findIndex(a=>a.id==l.id);this.list.splice(u,1,o.data),console.log(this.list)}}},created(){this.keyword=this.$route.query.keyword||this.keyword,this.initData()}},Me={class:"app-container"},We={class:"flex",style:{"justify-content":"space-between"}},Ke={class:"flex mt-sm",style:{"align-items":"center"}},Qe={style:{"font-size":"14px",color:"#333333"}},Xe={class:"flex",style:{"margin-left":"auto"}},Je=c("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}},null,-1);function Ze(l,e,o,u,a,n){const m=s("Plus"),d=s("el-icon"),p=s("el-button"),k=s("Search"),b=s("el-input"),v=s("ConditionFilter"),S=s("Delete"),D=s("el-link"),O=s("el-popconfirm"),U=s("UpdateDomainInfo"),R=s("CheckDomainInfo"),F=s("Upload"),_=s("el-upload"),T=s("Download"),B=s("DataTable"),E=s("el-pagination"),r=s("DataFormDialog"),g=A("loading");return h(),C("div",Me,[c("div",We,[t(p,{type:"primary",onClick:n.handleAddRow},{default:i(()=>[t(d,null,{default:i(()=>[t(m)]),_:1}),w("\u6DFB\u52A0")]),_:1},8,["onClick"]),t(b,{class:"ml-sm",style:{width:"260px"},modelValue:a.keyword,"onUpdate:modelValue":e[0]||(e[0]=V=>a.keyword=V),placeholder:"\u641C\u7D22\u57DF\u540D",clearable:"",onKeypress:K(n.handleSearch,["enter"]),onClear:n.handleSearch},{append:i(()=>[t(p,{onClick:n.handleSearch},{default:i(()=>[t(d,null,{default:i(()=>[t(k)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"])]),a.hasInitData?(h(),y(v,{key:0,class:"mt-md",ref:"ConditionFilter",onOnChange:n.handleConditionFilterChange},null,8,["onOnChange"])):I("",!0),c("div",Ke,[c("div",Qe,"\u5171\u8BA1 "+f(a.total)+" \u6761\u6570\u636E",1),c("div",Xe,[n.showBatchDeleteButton?(h(),y(O,{key:0,title:"\u786E\u5B9A\u5220\u9664\u9009\u4E2D\uFF1F",onConfirm:n.handleBatchDeleteConfirm},{reference:i(()=>[t(D,{underline:!1,type:"danger",class:"mr-sm"},{default:i(()=>[t(d,null,{default:i(()=>[t(S)]),_:1}),w("\u6279\u91CF\u5220\u9664")]),_:1})]),_:1},8,["onConfirm"])):I("",!0),t(U,{onOnSuccess:n.resetData},null,8,["onOnSuccess"]),t(R,{class:"ml-sm",onOnSuccess:n.resetData},null,8,["onOnSuccess"]),t(D,{underline:!1,type:"primary",class:"ml-sm",style:{position:"relative"}},{default:i(()=>[t(d,null,{default:i(()=>[t(F)]),_:1}),w("\u5BFC\u5165 "),t(_,{ref:"upload",action:"action",accept:".txt",limit:1,"on-exceed":n.handleExceed,"show-file-list":!1,"http-request":n.handleHttpRequest},{default:i(()=>[Je]),_:1},8,["on-exceed","http-request"])]),_:1}),t(D,{underline:!1,type:"primary",class:"ml-sm",onClick:n.handleExportToFile},{default:i(()=>[t(d,null,{default:i(()=>[t(T)]),_:1}),w("\u5BFC\u51FA")]),_:1},8,["onClick"])])]),z(t(B,{class:"mt-sm",data:a.list,onOnSuccess:n.resetData,onOnRefreshRow:n.handleRefreshRow,onSortChange:n.handleSortChange,onSelectionChange:n.handleSelectionChange},null,8,["data","onOnSuccess","onOnRefreshRow","onSortChange","onSelectionChange"]),[[g,a.loading]]),t(E,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:a.total,"page-size":a.size,"onUpdate:pageSize":e[1]||(e[1]=V=>a.size=V),"current-page":a.page,"onUpdate:currentPage":e[2]||(e[2]=V=>a.page=V),onCurrentChange:n.getData,onSizeChange:n.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),t(r,{visible:a.dialogVisible,"onUpdate:visible":e[3]||(e[3]=V=>a.dialogVisible=V),onOnSuccess:n.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const dt=x(Ye,[["render",Ze]]);export{dt as default};
