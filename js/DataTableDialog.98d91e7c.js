import{_ as D,R as S}from"./index.aa8d5977.js";import{o as c,c as y,J as O,U as _,ah as i,V as a,P as n,a as b,T as C,O as w,S as k,F as U,ar as A,Q as $}from"./vendor-vue.cefe3aef.js";const E={name:"ExpireDays",props:{value:{type:[Number,String],default:null}},components:{},data(){return{}},computed:{showValue(){return Number.isInteger(this.value)},className(){return this.showValue?this.value<7?["color--danger"]:this.value<30?["color--warning"]:["color--success"]:[]}},methods:{async getData(){}},created(){this.getData()}},N={class:"ExpireDays"},T={key:1};function z(s,t,e,p,o,l){return c(),y("div",N,[l.showValue?(c(),y("span",{key:0,class:O(l.className)},_(e.value),3)):(c(),y("span",T,"-"))])}const F=D(E,[["render",z]]),j={host:[{message:"\u4E3B\u673A\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],host_connect_status:[{message:"\u4E3B\u673A\u8FDE\u63A5\u72B6\u6001\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],host_check_time:[{message:"\u4E3B\u673A\u68C0\u67E5\u65F6\u95F4\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},P={name:"",props:{row:{type:Object,default:null},domainId:{type:Number,default:null}},components:{},data(){return{rules:j,is_auto_update:!0,form:{host:"",host_connect_status:"",host_check_time:"",ssl_start_time:"",ssl_expire_time:"",ssl_check_time:"",ssl_expire_days:"",ssl_expire_monitor:!0,ssl_auto_update:!0,comment:""}}},computed:{disabledTime(){return this.is_auto_update}},methods:{async getDomainById(){let s={domain_id:this.domainId};const t=await this.$http.getDomainById(s);t.ok&&(this.is_auto_update=t.data.auto_update)},async getData(){if(await this.getDomainById(),this.row){let s={address_id:this.row.id};const t=await this.$http.getAddressById(s);if(t.code!=0)return;let e=t.data;this.form.host=e.host,this.form.host_connect_status=e.host_connect_status,this.form.host_check_time=e.host_check_time,this.form.ssl_start_time=e.ssl_start_time,this.form.ssl_expire_time=e.ssl_expire_time,this.form.ssl_check_time=e.ssl_check_time,this.form.ssl_expire_days=e.ssl_expire_days,this.form.ssl_auto_update=e.ssl_auto_update,this.form.ssl_expire_monitor=e.ssl_expire_monitor,this.form.comment=e.comment}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(s=>{if(s)this.confirmSubmit();else return!1})},async confirmSubmit(){let s=this.$loading({fullscreen:!0}),t={domain_id:this.domainId,host:this.form.host.trim(),ssl_start_time:this.form.ssl_start_time,ssl_expire_time:this.form.ssl_expire_time,comment:this.form.comment},e=null;this.row?(t.address_id=this.row.id,e=await this.$http.updateAddressById(t)):e=await this.$http.addAddress(t),e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg),this.$nextTick(()=>{s.close()})}},created(){this.getData()}},L={class:"text-center mt-md"};function q(s,t,e,p,o,l){const r=i("el-input"),m=i("el-form-item"),h=i("el-form"),f=i("el-button");return c(),y("div",null,[a(h,{ref:"form",model:o.form,rules:o.rules,"label-width":"100px"},{default:n(()=>[a(m,{label:"\u4E3B\u673AIP\u5730\u5740",prop:"host"},{default:n(()=>[a(r,{type:"text",style:{width:"220px"},modelValue:o.form.host,"onUpdate:modelValue":t[0]||(t[0]=u=>o.form.host=u),placeholder:"\u8BF7\u8F93\u5165\u4E3B\u673A\u5730\u5740"},null,8,["modelValue"])]),_:1}),a(m,{label:"\u5907\u6CE8",prop:"comment"},{default:n(()=>[a(r,{type:"textarea",style:{width:"220px"},modelValue:o.form.comment,"onUpdate:modelValue":t[1]||(t[1]=u=>o.form.comment=u),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),b("div",L,[a(f,{onClick:l.handleCancel},{default:n(()=>[C(_(s.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),a(f,{type:"primary",onClick:l.handleSubmit},{default:n(()=>[C(_(s.$t("\u786E\u5B9A")),1)]),_:1},8,["onClick"])])])}const J=D(P,[["render",q]]),Q={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1},domainId:{type:Number,default:null}},emits:["update:visible"],components:{DataForm:J},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u4E3B\u673A\u5730\u5740":"\u6DFB\u52A0\u4E3B\u673A\u5730\u5740"},dialogVisible:{get(){return this.visible},set(s){this.$emit("update:visible",s)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function G(s,t,e,p,o,l){const r=i("DataForm"),m=i("el-dialog");return c(),w(m,{title:l.dialogTitle,modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=h=>l.dialogVisible=h),width:"400px",center:"","append-to-body":""},{default:n(()=>[l.dialogVisible?(c(),w(r,{key:0,row:e.row,domainId:e.domainId,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","domainId","onOnCancel","onOnSuccess"])):k("",!0)]),_:1},8,["title","modelValue"])}const B=D(Q,[["render",G]]),H={name:"",components:{DataFormDialog:B,ExpireDays:F},props:{list:{type:Array},domainId:{type:Number,default:null},domainRow:{type:Object,default:null},disableUpdateButton:{type:Boolean,default:!1},role:{type:Number}},emits:["on-selection-change"],computed:{},data(){return{RoleEnum:S,currentRow:null,dialogVisible:!1}},methods:{handleEditRow(s){this.currentRow=s,this.dialogVisible=!0},async handleDeleteClick(s){let t={address_id:s.id};const e=await this.$http.deleteAddressById(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},async handleStatusChange(s){let t={id:s.id};const e=await this.$http.function(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},handleUpdateSuccess(){this.$emit("on-success")},async handleUpdateRowDomainInfo(s){let t=this.$loading({fullscreen:!0}),e={address_id:s.id};const p=await this.$http.updateAddressRowInfoById(e);p.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(p.msg),this.$nextTick(()=>{t.close()})}},created(){}};function K(s,t,e,p,o,l){const r=i("el-table-column"),m=i("ExpireDays"),h=i("Refresh"),f=i("el-icon"),u=i("el-link"),I=i("Edit"),x=i("Delete"),v=i("el-popconfirm"),R=i("el-table"),V=i("DataFormDialog");return c(),y("div",null,[a(R,{data:e.list,stripe:"",border:"",onSelectionChange:t[0]||(t[0]=d=>s.$emit("on-selection-change",d))},{default:n(()=>[o.RoleEnum.User==e.role&&e.domainRow.has_edit_permission?(c(),w(r,{key:0,type:"selection","header-align":"center",align:"center",width:"40"})):k("",!0),a(r,{label:"\u4E3B\u673AIP\u5730\u5740","header-align":"center",align:"center",prop:"host"},{default:n(d=>[b("span",null,_(d.row.host||"-"),1)]),_:1}),a(r,{label:"\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4","header-align":"center",align:"center",prop:"ssl_start_time",width:"110"},{default:n(d=>[b("span",null,_(d.row.ssl_start_date||"-"),1)]),_:1}),a(r,{label:"\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4","header-align":"center",align:"center",width:"110",prop:"ssl_expire_time"},{default:n(d=>[b("span",null,_(d.row.ssl_expire_date||"-"),1)]),_:1}),a(r,{label:"\u5269\u4F59\u5929\u6570","header-align":"center",align:"center",width:"80",prop:"ssl_expire_days"},{default:n(d=>[a(m,{value:d.row.real_time_ssl_expire_days},null,8,["value"])]),_:1}),a(r,{label:"\u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4","header-align":"center",align:"center",width:"110",prop:"ssl_check_time"},{default:n(d=>[b("span",null,_(d.row.update_time_label||"-"),1)]),_:1}),a(r,{label:"\u5907\u6CE8","header-align":"center",align:"center",prop:"comment"},{default:n(d=>[b("span",null,_(d.row.comment||"-"),1)]),_:1}),a(r,{label:"\u64CD\u4F5C",width:"90",align:"center",prop:"tag"},{default:n(d=>[a(u,{underline:!1,type:"primary",class:"mr-sm",disabled:e.disableUpdateButton,onClick:g=>l.handleUpdateRowDomainInfo(d.row)},{default:n(()=>[a(f,null,{default:n(()=>[a(h)]),_:1})]),_:2},1032,["disabled","onClick"]),o.RoleEnum.User==e.role?(c(),y(U,{key:0},[a(u,{underline:!1,type:"primary",class:"mr-sm",onClick:g=>l.handleEditRow(d.row),disabled:!e.domainRow.has_edit_permission||d.row.source==0},{default:n(()=>[a(f,null,{default:n(()=>[a(I)]),_:1})]),_:2},1032,["onClick","disabled"]),a(v,{title:`${s.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:g=>l.handleDeleteClick(d.row),disabled:!e.domainRow.has_edit_permission},{reference:n(()=>[a(u,{underline:!1,type:"danger",disabled:!e.domainRow.has_edit_permission},{default:n(()=>[a(f,null,{default:n(()=>[a(x)]),_:1})]),_:1},8,["disabled"])]),_:2},1032,["title","onConfirm","disabled"])],64)):k("",!0)]),_:1})]),_:1},8,["data"]),a(V,{visible:o.dialogVisible,"onUpdate:visible":t[1]||(t[1]=d=>o.dialogVisible=d),row:o.currentRow,domainId:e.domainId,onOnSuccess:l.handleUpdateSuccess},null,8,["visible","row","domainId","onOnSuccess"])])}const M=D(H,[["render",K]]),W={name:"address-list",props:{domainRow:{type:Object,default:null},domainId:{type:Number,default:null},role:{type:Number}},components:{DataFormDialog:B,DataTable:M},data(){return{RoleEnum:S,list:[],total:0,page:1,size:10,keyword:"",selectedRows:[],loading:!0,dialogVisible:!1,is_auto_update:!0}},computed:{disableUpdateButton(){return!this.is_auto_update},showBatchDeleteButton(){return!!(this.selectedRows&&this.selectedRows.length>0)}},methods:{async resetData(){this.page=1,await this.getData()},async getDomainById(){let s={domain_id:this.domainId};const t=await this.$http.getDomainById(s);t.ok&&(this.is_auto_update=t.data.auto_update)},async getData(){this.loading=!0;let s={domain_id:this.domainId,page:this.page,size:this.size};try{const t=await this.$http.getAddressListByDomainId(s);t.code==0&&(this.list=t.data.list,this.total=t.data.total)}catch(t){console.log(t)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async updateAllAddress(){let s=this.$loading({fullscreen:!0}),t={domain_id:this.domainId},e=await this.$http.updateAddressListInfoByDomainId(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg),this.$nextTick(()=>{s.close()})},handleSizeChange(s){this.resetData()},handleSelectionChange(s){this.selectedRows=s},async handleBatchDeleteConfirm(){let s=this.$loading({fullscreen:!0}),t={address_ids:this.selectedRows.map(e=>e.id)};try{(await this.$http.deleteAddressByIds(t)).ok&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData())}catch(e){console.log(e)}finally{this.$nextTick(()=>{s.close()})}}},created(){this.resetData()}},X={class:""},Y={class:"flex justify-between items-center"},Z={key:1};function ee(s,t,e,p,o,l){const r=i("Plus"),m=i("el-icon"),h=i("el-button"),f=i("Delete"),u=i("el-link"),I=i("el-popconfirm"),x=i("Refresh"),v=i("DataTable"),R=i("el-pagination"),V=i("DataFormDialog"),d=A("loading");return c(),y("div",X,[b("div",Y,[o.RoleEnum.User==e.role?(c(),w(h,{key:0,type:"primary",onClick:l.handleAddRow,disabled:!e.domainRow.has_edit_permission},{default:n(()=>[a(m,null,{default:n(()=>[a(r)]),_:1}),C(_(s.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick","disabled"])):(c(),y("span",Z)),b("div",null,[l.showBatchDeleteButton?(c(),w(I,{key:0,title:"\u786E\u5B9A\u5220\u9664\u9009\u4E2D\uFF1F",onConfirm:l.handleBatchDeleteConfirm},{reference:n(()=>[a(u,{underline:!1,type:"danger",class:"mr-sm"},{default:n(()=>[a(m,null,{default:n(()=>[a(f)]),_:1}),C("\u6279\u91CF\u5220\u9664")]),_:1})]),_:1},8,["onConfirm"])):k("",!0),a(u,{underline:!1,type:"primary",disabled:l.disableUpdateButton,onClick:l.updateAllAddress},{default:n(()=>[a(m,null,{default:n(()=>[a(x)]),_:1}),C(_(s.$t("\u5168\u90E8\u66F4\u65B0")),1)]),_:1},8,["disabled","onClick"])])]),$(a(v,{class:"mt-sm",list:o.list,role:e.role,domainId:e.domainId,domainRow:e.domainRow,disableUpdateButton:l.disableUpdateButton,onOnSuccess:l.resetData,onOnSelectionChange:l.handleSelectionChange},null,8,["list","role","domainId","domainRow","disableUpdateButton","onOnSuccess","onOnSelectionChange"]),[[d,o.loading]]),a(R,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:pageSize":t[0]||(t[0]=g=>o.size=g),"current-page":o.page,"onUpdate:currentPage":t[1]||(t[1]=g=>o.page=g),onCurrentChange:l.getData,onSizeChange:l.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),a(V,{visible:o.dialogVisible,"onUpdate:visible":t[2]||(t[2]=g=>o.dialogVisible=g),domainId:e.domainId,onOnSuccess:l.handleAddSuccess},null,8,["visible","domainId","onOnSuccess"])])}const te=D(W,[["render",ee]]),se={name:"",props:{domainRow:{type:Object,default:null},row:{type:Object,default:null},visible:{type:Boolean,default:!1},domainId:{type:Number,default:null},role:{type:Number}},components:{DataTableIndex:te},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(s){this.$emit("update:visible",s)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose(),this.$emit("on-success")},handleDialogClose(){this.$emit("on-close")}},created(){}};function ae(s,t,e,p,o,l){const r=i("DataTableIndex"),m=i("el-dialog");return c(),w(m,{title:"\u57DF\u540D\u4E3B\u673A\u5217\u8868",modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=h=>l.dialogVisible=h),width:"960px",center:"","append-to-body":"",onClose:l.handleDialogClose},{default:n(()=>[l.dialogVisible?(c(),w(r,{key:0,row:e.row,role:e.role,domainRow:e.domainRow,domainId:e.domainId,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","role","domainRow","domainId","onOnCancel","onOnSuccess"])):k("",!0)]),_:1},8,["modelValue","onClose"])}const ie=D(se,[["render",ae]]);export{te as A,F as E,ie as a};