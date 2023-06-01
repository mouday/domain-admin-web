import{_ as y}from"./index.26d2b051.js";import{a5 as s,o as _,c as k,X as l,R as i,a as h,Z as V,Q as v,V as R,W as w,O as z,am as B,ay as E,ak as x,aa as G,S as $,az as L}from"./vendor-vue.e07d7f7e.js";import{S as A,u as U}from"./SelectGroup.561736f6.js";import"./element-icon.bb5f2c38.js";import"./vendor-lib.f93a8f58.js";import"./element-plus.0d508af4.js";const F={name:[{message:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},I={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:F,form:{name:""}}},computed:{},methods:{async getData(){if(this.row){let t={id:this.row.id};const e=await this.$http.getGroupById(t);if(e.code!=0)return;let a=e.data;this.form.name=a.name}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={name:this.form.name},a=null;this.row?(e.id=this.row.id,a=await this.$http.updateGroupById(e)):a=await this.$http.addGroup(e),a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg),this.$nextTick(()=>{t.close()})}},created(){this.getData()}},j={class:"text-center"};function N(t,e,a,f,o,n){const r=s("el-input"),u=s("el-form-item"),c=s("el-form"),m=s("el-button");return _(),k("div",null,[l(c,{ref:"form",model:o.form,rules:o.rules,"label-width":"60px"},{default:i(()=>[l(u,{label:"\u540D\u79F0",prop:"name"},{default:i(()=>[l(r,{type:"text",modelValue:o.form.name,"onUpdate:modelValue":e[0]||(e[0]=b=>o.form.name=b),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),h("div",j,[l(m,{onClick:n.handleCancel},{default:i(()=>[V("\u53D6 \u6D88")]),_:1},8,["onClick"]),l(m,{type:"primary",onClick:n.handleSubmit},{default:i(()=>[V("\u786E \u5B9A")]),_:1},8,["onClick"])])])}const K=y(I,[["render",N]]),P={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:K},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u5206\u7EC4":"\u6DFB\u52A0\u5206\u7EC4"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function q(t,e,a,f,o,n){const r=s("DataForm"),u=s("el-dialog");return _(),v(u,{title:n.dialogTitle,modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=c=>n.dialogVisible=c),width:"300px",center:"","append-to-body":"","lock-scroll":!1},{default:i(()=>[n.dialogVisible?(_(),v(r,{key:0,row:a.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):R("",!0)]),_:1},8,["title","modelValue"])}const T=y(P,[["render",q]]),H={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let e={id:t.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(t){let e={id:t.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleSelectable(t,e){return!Boolean(t.group_id)}},created(){}};function Q(t,e,a,f,o,n){const r=s("el-table-column"),u=s("el-table");return _(),k("div",null,[l(u,z({stripe:"",border:""},t.$attrs,B(t.$events)),{default:i(()=>[l(r,{type:"selection",width:"55",selectable:n.handleSelectable},null,8,["selectable"]),l(r,{label:"\u57DF\u540D","header-align":"center",align:"center",prop:"domain"},{default:i(c=>[h("span",null,w(c.row.domain||"-"),1)]),_:1}),l(r,{label:"\u5206\u7EC4","header-align":"center",align:"center",width:"100",prop:"check_time"},{default:i(c=>[h("span",null,w(c.row.group_name||"-"),1)]),_:1}),l(r,{label:"\u5907\u6CE8","header-align":"center",align:"center",prop:"check_time","show-overflow-tooltip":""},{default:i(c=>[h("span",null,w(c.row.alias||"-"),1)]),_:1})]),_:1},16)])}const W=y(H,[["render",Q]]),X={name:"group-domain-list",props:{row:{type:Object}},components:{DataTable:W,SelectGroup:A},data(){return{list:[],total:0,page:1,size:10,keyword:"",loading:!0,dialogVisible:!1,selection:[],group_id:""}},computed:{...E(U,{groupOptions:"getGroupOptions"}),disableRelationButton(){return this.selection.length==0}},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let t={page:this.page,size:this.size,keyword:this.keyword,group_id:this.group_id};try{const e=await this.$http.getDomainList(t);e.code==0&&(this.list=e.data.list.map(a=>(a.group_id&&(a.group_name=this.getGroupName(a.group_id)),a)),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},getGroupName(t){let e=this.groupOptions.find(a=>a.value==t);if(e)return e.name},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async handleRelation(){let t=this.selection.map(f=>f.id);console.log(t);let e={domain_ids:t,group_id:this.row.id};const a=await this.$http.domainRelationGroup(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.getData()):this.$msg.error(a.msg)},handleSelectionChange(t){console.log(t),this.selection=t}},created(){this.row&&(this.group_id=this.row.id),this.getData()}},Z={class:""},J={class:"margin-bottom--20"};function M(t,e,a,f,o,n){const r=s("Search"),u=s("el-icon"),c=s("el-button"),m=s("el-input"),b=s("SelectGroup"),D=s("DataTable"),C=s("el-pagination"),S=x("loading");return _(),k("div",Z,[h("div",J,[l(m,{style:{width:"260px"},modelValue:o.keyword,"onUpdate:modelValue":e[0]||(e[0]=p=>o.keyword=p),placeholder:"\u8F93\u5165\u57DF\u540D",clearable:"",onKeypress:G(n.handleSearch,["enter"]),onClear:n.handleSearch},{append:i(()=>[l(c,{onClick:n.handleSearch},{default:i(()=>[l(u,null,{default:i(()=>[l(r)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"]),l(b,{class:"w-[150px] ml-sm",modelValue:o.group_id,"onUpdate:modelValue":e[1]||(e[1]=p=>o.group_id=p),clearable:"",onChange:n.resetData},null,8,["modelValue","onChange"]),l(c,{class:"ml-sm",type:"primary",onClick:n.handleRelation,disabled:n.disableRelationButton},{default:i(()=>[V("\u5173\u8054")]),_:1},8,["onClick","disabled"])]),$(l(D,{class:"mt-md",data:o.list,onSelectionChange:n.handleSelectionChange,onOnSuccess:n.resetData,onOnEditRow:t.handleEditRow},null,8,["data","onSelectionChange","onOnSuccess","onOnEditRow"]),[[S,o.loading]]),l(C,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:page-size":e[2]||(e[2]=p=>o.size=p),"current-page":o.page,"onUpdate:current-page":e[3]||(e[3]=p=>o.page=p),onCurrentChange:n.getData},null,8,["total","page-size","current-page","onCurrentChange"])])}const Y=y(X,[["render",M]]),ee={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},components:{DataTableIndex:Y},data(){return{}},computed:{dialogTitle(){return this.row?`\u5206\u7EC4\u5173\u8054\u57DF\u540D\uFF1A${this.row.name}`:"-"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){console.log("created")}};function te(t,e,a,f,o,n){const r=s("DataTableIndex"),u=s("el-dialog");return _(),v(u,{title:n.dialogTitle,modelValue:n.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=c=>n.dialogVisible=c),width:"800px",center:"","append-to-body":"","lock-scroll":!1},{default:i(()=>[n.dialogVisible?(_(),v(r,{key:0,row:a.row,onOnCancel:n.handleClose,onOnSuccess:n.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):R("",!0)]),_:1},8,["title","modelValue"])}const le=y(ee,[["render",te]]),ne={name:"",components:{DataFormDialog:T,GroupDomainListDialog:le},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1,groupDomainListDialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let e={id:t.id};const a=await this.$http.deleteGroupById(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(t){let e={id:t.id};const a=await this.$http.function(e);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleCountClick(t){console.log("handleCountClick"),this.currentRow=t,this.groupDomainListDialogVisible=!0}},created(){}};function ae(t,e,a,f,o,n){const r=s("el-table-column"),u=s("Link"),c=s("el-icon"),m=s("el-link"),b=s("Edit"),D=s("Delete"),C=s("el-popconfirm"),S=s("el-table"),p=s("DataFormDialog"),g=s("GroupDomainListDialog");return _(),k("div",null,[l(S,{data:a.list,stripe:"",border:""},{default:i(()=>[l(r,{label:"\u5E8F\u53F7",align:"center",prop:"id",width:"60"},{default:i(d=>[h("span",null,w(d.$index+1),1)]),_:1}),l(r,{label:"\u540D\u79F0","header-align":"center",align:"center",prop:"name"},{default:i(d=>[h("span",null,w(d.row.name||"-"),1)]),_:1}),l(r,{label:"\u57DF\u540D\u6570\u91CF","header-align":"center",align:"center",prop:"name"},{default:i(d=>[h("span",null,w(d.row.domain_count||"-"),1)]),_:1}),l(r,{label:"\u521B\u5EFA\u65F6\u95F4","header-align":"center",align:"center",prop:"create_time"},{default:i(d=>[h("span",null,w(d.row.create_time||"-"),1)]),_:1}),l(r,{label:"\u5173\u8054\u57DF\u540D",width:"90","header-align":"center",align:"center"},{default:i(d=>[l(m,{underline:!1,type:"primary",onClick:O=>n.handleCountClick(d.row)},{default:i(()=>[l(c,null,{default:i(()=>[l(u)]),_:1})]),_:2},1032,["onClick"])]),_:1}),l(r,{label:"\u7F16\u8F91",width:"60","header-align":"center",align:"center"},{default:i(d=>[l(m,{underline:!1,type:"primary",onClick:O=>n.handleEditRow(d.row)},{default:i(()=>[l(c,null,{default:i(()=>[l(b)]),_:1})]),_:2},1032,["onClick"])]),_:1}),l(r,{label:"\u5220\u9664",width:"60",align:"center",prop:"tag"},{default:i(d=>[l(C,{title:"\u786E\u5B9A\u5220\u9664\uFF1F",onConfirm:O=>n.handleDeleteClick(d.row)},{reference:i(()=>[l(m,{underline:!1,type:"danger"},{default:i(()=>[l(c,null,{default:i(()=>[l(D)]),_:1})]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),l(p,{visible:o.dialogVisible,"onUpdate:visible":e[0]||(e[0]=d=>o.dialogVisible=d),row:o.currentRow,onOnSuccess:n.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"]),l(g,{row:o.currentRow,visible:o.groupDomainListDialogVisible,"onUpdate:visible":e[1]||(e[1]=d=>o.groupDomainListDialogVisible=d),onOnSuccess:n.handleUpdateSuccess},null,8,["row","visible","onOnSuccess"])])}const oe=y(ne,[["render",ae]]),se={name:"group-list",props:{},components:{DataFormDialog:T,DataTable:oe},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1}},computed:{},methods:{...L(U,{setGroupOptions:"setGroupOptions"}),resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let t={keyword:this.keyword.trim()};try{const e=await this.$http.getGroupList(t);e.code==0&&(this.list=e.data.list,this.total=e.data.total,this.setGroupOptions(e.data.list))}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()}},created(){this.getData()}},ie={class:"app-container"},re={class:"margin-bottom--20"};function ce(t,e,a,f,o,n){const r=s("Plus"),u=s("el-icon"),c=s("el-button"),m=s("Search"),b=s("el-input"),D=s("DataTable"),C=s("el-pagination"),S=s("DataFormDialog"),p=x("loading");return _(),k("div",ie,[h("div",re,[l(c,{type:"primary",onClick:n.handleAddRow},{default:i(()=>[l(u,null,{default:i(()=>[l(r)]),_:1}),V("\u6DFB\u52A0")]),_:1},8,["onClick"]),l(b,{class:"ml-sm",style:{width:"260px"},modelValue:o.keyword,"onUpdate:modelValue":e[0]||(e[0]=g=>o.keyword=g),clearable:"",placeholder:"\u641C\u7D22\u5206\u7EC4",onKeypress:G(n.handleSearch,["enter"]),onClear:n.handleSearch},{append:i(()=>[l(c,{onClick:n.handleSearch},{default:i(()=>[l(u,null,{default:i(()=>[l(m)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"])]),$(l(D,{class:"mt-md",list:o.list,onOnSuccess:n.resetData,onOnEditRow:t.handleEditRow},null,8,["list","onOnSuccess","onOnEditRow"]),[[p,o.loading]]),l(C,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:o.total,"page-size":o.total,"onUpdate:page-size":e[1]||(e[1]=g=>o.total=g),"current-page":o.page,"onUpdate:current-page":e[2]||(e[2]=g=>o.page=g),onCurrentChange:n.getData},null,8,["total","page-size","current-page","onCurrentChange"]),l(S,{visible:o.dialogVisible,"onUpdate:visible":e[3]||(e[3]=g=>o.dialogVisible=g),onOnSuccess:n.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const _e=y(se,[["render",ce]]);export{_e as default};
