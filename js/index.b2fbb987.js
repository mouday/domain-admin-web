import{_ as D}from"./index.074b19b8.js";import{ah as i,o as _,c as V,V as t,P as s,a as m,T as k,O as v,S as x,U as b,L as E,al as z,ax as B,ar as R,a9 as G,Q as U,aA as L}from"./vendor-vue.edbe275b.js";import{S as A,u as T}from"./SelectGroup.3ad72357.js";import"./element-icon.ade3aa7e.js";import"./vendor-lib.4c56f242.js";import"./element-plus.dcbfaaa8.js";const F={name:[{message:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},I={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:F,form:{name:""}}},computed:{},methods:{async getData(){if(this.row){let l={id:this.row.id};const e=await this.$http.getGroupById(l);if(e.code!=0)return;let a=e.data;this.form.name=a.name}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(l=>{if(l)this.confirmSubmit();else return!1})},async confirmSubmit(){let l=this.$loading({fullscreen:!0}),e={name:this.form.name},a=null;this.row?(e.id=this.row.id,a=await this.$http.updateGroupById(e)):a=await this.$http.addGroup(e),a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg),this.$nextTick(()=>{l.close()})}},created(){this.getData()}},N={class:"text-center"};function j(l,e,a,f,o,n){const r=i("el-input"),u=i("el-form-item"),c=i("el-form"),h=i("el-button");return _(),V("div",null,[t(c,{ref:"form",model:o.form,rules:o.rules,"label-width":"60px"},{default:s(()=>[t(u,{label:"\u540D\u79F0",prop:"name"},{default:s(()=>[t(r,{type:"text",modelValue:o.form.name,"onUpdate:modelValue":e[0]||(e[0]=w=>o.form.name=w),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),m("div",N,[t(h,{onClick:n.handleCancel},{default:s(()=>[k("\u53D6 \u6D88")]),_:1},8,["onClick"]),t(h,{type:"primary",onClick:n.handleSubmit},{default:s(()=>[k("\u786E \u5B9A")]),_:1},8,["onClick"])])])}const P=D(I,[["render",j]]),K={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:P},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u5206\u7EC4":"\u6DFB\u52A0\u5206\u7EC4"},dialogVisible:{get(){return this.visible},set(l){this.$emit("update:visible",l)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function q(l,e,a,f,o,n){const r=i("DataForm"),u=i("el-dialog");return _(),v(u,{title:n.dialogTitle,modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=c=>n.dialogVisible=c),width:"300px",center:"","append-to-body":"","lock-scroll":!1},{default:s(()=>[n.dialogVisible?(_(),v(r,{key:0,row:a.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):x("",!0)]),_:1},8,["title","modelValue"])}const $=D(K,[["render",q]]),H={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(l){this.currentRow=l,this.dialogVisible=!0},async handleDeleteClick(l){let e={id:l.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(l){let e={id:l.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleSelectable(l,e){return!Boolean(l.group_id)}},created(){}};function Q(l,e,a,f,o,n){const r=i("el-table-column"),u=i("el-table");return _(),V("div",null,[t(u,E({stripe:"",border:""},l.$attrs,z(l.$events)),{default:s(()=>[t(r,{type:"selection",width:"40","header-align":"center",align:"center",selectable:n.handleSelectable},null,8,["selectable"]),t(r,{label:"\u57DF\u540D","header-align":"center",align:"center",prop:"domain"},{default:s(c=>[m("span",null,b(c.row.domain||"-"),1)]),_:1}),t(r,{label:"\u5206\u7EC4","header-align":"center",align:"center",width:"100",prop:"check_time"},{default:s(c=>[m("span",null,b(c.row.group_name||"-"),1)]),_:1}),t(r,{label:"\u5907\u6CE8","header-align":"center",align:"center",prop:"check_time","show-overflow-tooltip":""},{default:s(c=>[m("span",null,b(c.row.alias||"-"),1)]),_:1})]),_:1},16)])}const J=D(H,[["render",Q]]),M={name:"group-domain-list",props:{row:{type:Object}},components:{DataTable:J,SelectGroup:A},data(){return{list:[],total:0,page:1,size:10,keyword:"",loading:!0,dialogVisible:!1,selection:[],group_id:""}},computed:{...B(T,{groupOptions:"getGroupOptions"}),disableRelationButton(){return this.selection.length==0}},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let l={page:this.page,size:this.size,keyword:this.keyword,group_id:this.group_id};try{const e=await this.$http.getDomainList(l);e.code==0&&(this.list=e.data.list.map(a=>(a.group_id&&(a.group_name=this.getGroupName(a.group_id)),a)),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},getGroupName(l){let e=this.groupOptions.find(a=>a.value==l);if(e)return e.name},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async handleRelation(){let l=this.selection.map(f=>f.id);console.log(l);let e={domain_ids:l,group_id:this.row.id};const a=await this.$http.domainRelationGroup(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.getData()):this.$msg.error(a.msg)},handleSelectionChange(l){console.log(l),this.selection=l},handleEditRow(l){}},created(){this.row&&(this.group_id=this.row.id),this.getData()}},W={class:""},X={class:"margin-bottom--20"};function Y(l,e,a,f,o,n){const r=i("Search"),u=i("el-icon"),c=i("el-button"),h=i("el-input"),w=i("SelectGroup"),C=i("DataTable"),y=i("el-pagination"),S=R("loading");return _(),V("div",W,[m("div",X,[t(h,{style:{width:"260px"},modelValue:o.keyword,"onUpdate:modelValue":e[0]||(e[0]=p=>o.keyword=p),placeholder:"\u8F93\u5165\u57DF\u540D",clearable:"",onKeypress:G(n.handleSearch,["enter"]),onClear:n.handleSearch},{append:s(()=>[t(c,{onClick:n.handleSearch},{default:s(()=>[t(u,null,{default:s(()=>[t(r)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"]),t(w,{class:"w-[150px] ml-sm",modelValue:o.group_id,"onUpdate:modelValue":e[1]||(e[1]=p=>o.group_id=p),clearable:"",showNotGroup:"",onChange:n.resetData},null,8,["modelValue","onChange"]),t(c,{class:"ml-sm",type:"primary",onClick:n.handleRelation,disabled:n.disableRelationButton},{default:s(()=>[k("\u5173\u8054")]),_:1},8,["onClick","disabled"])]),U(t(C,{class:"mt-md",data:o.list,onSelectionChange:n.handleSelectionChange,onOnSuccess:n.resetData,onOnEditRow:n.handleEditRow},null,8,["data","onSelectionChange","onOnSuccess","onOnEditRow"]),[[S,o.loading]]),t(y,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:pageSize":e[2]||(e[2]=p=>o.size=p),"current-page":o.page,"onUpdate:currentPage":e[3]||(e[3]=p=>o.page=p),onCurrentChange:n.getData},null,8,["total","page-size","current-page","onCurrentChange"])])}const Z=D(M,[["render",Y]]),ee={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},components:{DataTableIndex:Z},data(){return{}},computed:{dialogTitle(){return this.row?`\u5206\u7EC4\u5173\u8054\u57DF\u540D\uFF1A${this.row.name}`:"-"},dialogVisible:{get(){return this.visible},set(l){this.$emit("update:visible",l)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose()},handleDialogClose(){this.$emit("on-success")}},created(){}};function te(l,e,a,f,o,n){const r=i("DataTableIndex"),u=i("el-dialog");return _(),v(u,{title:n.dialogTitle,modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=c=>n.dialogVisible=c),width:"800px",center:"","append-to-body":"","lock-scroll":!1,onClose:n.handleDialogClose},{default:s(()=>[n.dialogVisible?(_(),v(r,{key:0,row:a.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):x("",!0)]),_:1},8,["title","modelValue","onClose"])}const le=D(ee,[["render",te]]),ne={name:"",components:{DataFormDialog:$,GroupDomainListDialog:le},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1,groupDomainListDialogVisible:!1}},methods:{handleEditRow(l){this.currentRow=l,this.dialogVisible=!0},async handleDeleteClick(l){let e={id:l.id};const a=await this.$http.deleteGroupById(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(l){let e={id:l.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleCountClick(l){console.log("handleCountClick"),this.currentRow=l,this.groupDomainListDialogVisible=!0}},created(){}};function ae(l,e,a,f,o,n){const r=i("el-table-column"),u=i("Link"),c=i("el-icon"),h=i("el-link"),w=i("Edit"),C=i("Delete"),y=i("el-popconfirm"),S=i("el-table"),p=i("DataFormDialog"),g=i("GroupDomainListDialog");return _(),V("div",null,[t(S,{data:a.list,stripe:"",border:""},{default:s(()=>[t(r,{label:"\u5E8F\u53F7",align:"center",prop:"id",width:"60"},{default:s(d=>[m("span",null,b(d.$index+1),1)]),_:1}),t(r,{label:"\u540D\u79F0","header-align":"center",align:"center",prop:"name"},{default:s(d=>[m("span",null,b(d.row.name||"-"),1)]),_:1}),t(r,{label:"\u8BC1\u4E66\u6570\u91CF","header-align":"center",align:"center",prop:"name"},{default:s(d=>[m("span",null,b(d.row.cert_count||"-"),1)]),_:1}),t(r,{label:"\u57DF\u540D\u6570\u91CF","header-align":"center",align:"center",prop:"name"},{default:s(d=>[m("span",null,b(d.row.domain_count||"-"),1)]),_:1}),t(r,{label:"\u521B\u5EFA\u65F6\u95F4","header-align":"center",align:"center",prop:"create_time"},{default:s(d=>[m("span",null,b(d.row.create_time||"-"),1)]),_:1}),t(r,{label:"\u5173\u8054\u8BC1\u4E66",width:"90","header-align":"center",align:"center"},{default:s(d=>[t(h,{underline:!1,type:"primary",onClick:O=>n.handleCountClick(d.row)},{default:s(()=>[t(c,null,{default:s(()=>[t(u)]),_:1})]),_:2},1032,["onClick"])]),_:1}),t(r,{label:"\u7F16\u8F91",width:"60","header-align":"center",align:"center"},{default:s(d=>[t(h,{underline:!1,type:"primary",onClick:O=>n.handleEditRow(d.row)},{default:s(()=>[t(c,null,{default:s(()=>[t(w)]),_:1})]),_:2},1032,["onClick"])]),_:1}),t(r,{label:"\u5220\u9664",width:"60",align:"center",prop:"tag"},{default:s(d=>[t(y,{title:"\u786E\u5B9A\u5220\u9664\uFF1F",onConfirm:O=>n.handleDeleteClick(d.row)},{reference:s(()=>[t(h,{underline:!1,type:"danger"},{default:s(()=>[t(c,null,{default:s(()=>[t(C)]),_:1})]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),t(p,{visible:o.dialogVisible,"onUpdate:visible":e[0]||(e[0]=d=>o.dialogVisible=d),row:o.currentRow,onOnSuccess:n.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"]),t(g,{row:o.currentRow,visible:o.groupDomainListDialogVisible,"onUpdate:visible":e[1]||(e[1]=d=>o.groupDomainListDialogVisible=d),onOnSuccess:n.handleUpdateSuccess},null,8,["row","visible","onOnSuccess"])])}const oe=D(ne,[["render",ae]]),se={name:"group-list",props:{},components:{DataFormDialog:$,DataTable:oe},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1}},computed:{},methods:{...L(T,{setGroupOptions:"setGroupOptions"}),resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let l={keyword:this.keyword.trim()};try{const e=await this.$http.getGroupList(l);e.code==0&&(this.list=e.data.list,this.total=e.data.total,this.setGroupOptions(e.data.list))}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleEditRow(l){}},created(){this.getData()}},ie={class:"app-container"},re={class:"margin-bottom--20"};function ce(l,e,a,f,o,n){const r=i("Plus"),u=i("el-icon"),c=i("el-button"),h=i("Search"),w=i("el-input"),C=i("DataTable"),y=i("el-pagination"),S=i("DataFormDialog"),p=R("loading");return _(),V("div",ie,[m("div",re,[t(c,{type:"primary",onClick:n.handleAddRow},{default:s(()=>[t(u,null,{default:s(()=>[t(r)]),_:1}),k("\u6DFB\u52A0")]),_:1},8,["onClick"]),t(w,{class:"ml-sm",style:{width:"260px"},modelValue:o.keyword,"onUpdate:modelValue":e[0]||(e[0]=g=>o.keyword=g),clearable:"",placeholder:"\u641C\u7D22\u5206\u7EC4",onKeypress:G(n.handleSearch,["enter"]),onClear:n.handleSearch},{append:s(()=>[t(c,{onClick:n.handleSearch},{default:s(()=>[t(u,null,{default:s(()=>[t(h)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"])]),U(t(C,{class:"mt-md",list:o.list,onOnSuccess:n.resetData,onOnEditRow:n.handleEditRow},null,8,["list","onOnSuccess","onOnEditRow"]),[[p,o.loading]]),t(y,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:o.total,"page-size":o.total,"onUpdate:pageSize":e[1]||(e[1]=g=>o.total=g),"current-page":o.page,"onUpdate:currentPage":e[2]||(e[2]=g=>o.page=g),onCurrentChange:n.getData},null,8,["total","page-size","current-page","onCurrentChange"]),t(S,{visible:o.dialogVisible,"onUpdate:visible":e[3]||(e[3]=g=>o.dialogVisible=g),onOnSuccess:n.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const _e=D(se,[["render",ce]]);export{_e as default};
