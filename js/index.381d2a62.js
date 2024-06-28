import{_ as D,R as O}from"./index.8747a27b.js";import{ah as i,o as h,c as w,V as o,P as r,S as a,a as f,T as R,U as y,O as U,F as x,L as F,al as I,ax as A,ar as T,a9 as z,Q as E,ay as N}from"./vendor-vue.cefe3aef.js";import{u as B}from"./group-store.f69efe71.js";import{S as j}from"./SelectGroup.b376ed99.js";import{S as P}from"./SearchUser.e3ac81a9.js";import{D as K}from"./DataCount.3a935533.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const H={name:[{message:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},q={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:H,form:{name:""}}},computed:{},methods:{async getData(){if(this.row){let t={id:this.row.id};const e=await this.$http.getGroupById(t);if(e.code!=0)return;let l=e.data;this.form.name=l.name}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),e={name:this.form.name},l=null;this.row?(e.id=this.row.id,l=await this.$http.updateGroupById(e)):l=await this.$http.addGroup(e),l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg),this.$nextTick(()=>{t.close()})}},created(){this.getData()}},Q={class:"text-center"};function J(t,e,l,g,n,s){const d=i("el-input"),u=i("el-form-item"),p=i("el-form"),b=i("el-button");return h(),w("div",null,[o(p,{ref:"form",model:n.form,rules:n.rules,"label-width":"60px"},{default:r(()=>[a(" \u540D\u79F0 "),o(u,{label:t.$t("\u540D\u79F0"),prop:"name"},{default:r(()=>[o(d,{type:"text",modelValue:n.form.name,"onUpdate:modelValue":e[0]||(e[0]=_=>n.form.name=_),placeholder:t.$t("\u8BF7\u8F93\u5165\u540D\u79F0")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),a(" \u521B\u5EFA\u65F6\u95F4 "),a(` <el-form-item
        label="\u521B\u5EFA\u65F6\u95F4"
        prop="create_time"
      >
        <el-input
          type="text"
          v-model="form.create_time"
          placeholder="\u8BF7\u8F93\u5165\u521B\u5EFA\u65F6\u95F4"
        ></el-input>
      </el-form-item> `)]),_:1},8,["model","rules"]),a(" \u64CD\u4F5C "),f("div",Q,[o(b,{onClick:s.handleCancel},{default:r(()=>[R(y(t.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),o(b,{type:"primary",onClick:s.handleSubmit},{default:r(()=>[R(y(t.$t("\u786E\u5B9A")),1)]),_:1},8,["onClick"])])])}const M=D(q,[["render",J]]),W={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:M},data(){return{}},computed:{dialogTitle(){return this.row?this.$t("\u7F16\u8F91\u5206\u7EC4"):this.$t("\u6DFB\u52A0\u5206\u7EC4")},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function X(t,e,l,g,n,s){const d=i("DataForm"),u=i("el-dialog");return h(),w(x,null,[a(" \u7F16\u8F91\u6846 "),o(u,{title:s.dialogTitle,modelValue:s.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>s.dialogVisible=p),width:"300px",center:"","append-to-body":"","lock-scroll":!1},{default:r(()=>[s.dialogVisible?(h(),U(d,{key:0,row:l.row,onOnCancel:s.handleClose,onOnSuccess:s.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):a("v-if",!0)]),_:1},8,["title","modelValue"])],2112)}const L=D(W,[["render",X]]),Y={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let e={id:t.id};const l=await this.$http.function(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},async handleStatusChange(t){let e={id:t.id};const l=await this.$http.function(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleSelectable(t,e){return!Boolean(t.group_id)}},created(){}};function Z(t,e,l,g,n,s){const d=i("el-table-column"),u=i("el-table");return h(),w("div",null,[o(u,F({stripe:"",border:""},t.$attrs,I(t.$events)),{default:r(()=>[a(` <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
        `),o(d,{type:"selection",width:"40","header-align":"center",align:"center",selectable:s.handleSelectable},null,8,["selectable"]),a(" \u57DF\u540D "),o(d,{label:"\u57DF\u540D","header-align":"center",align:"center",prop:"domain"},{default:r(p=>[f("span",null,y(p.row.domain||"-"),1)]),_:1}),a(" ip "),a(` <el-table-column
        label="ip"
        header-align="center"
        align="center"
        prop="ip"
      >
        <template #default="scope">
          <span
            >{{ scope.row.ip || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u8BC1\u4E66\u9881\u53D1\u65F6\u95F4 "),a(` <el-table-column
        label="\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="start_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.start_time || '-' }}</span
          >
        </template>
      </el-table-column>
       `),a(" \u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4 "),a(` <el-table-column
        label="\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="expire_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.expire_time || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4 "),a(` <el-table-column
        label="\u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="check_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.check_time || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u57DF\u540D\u8FDE\u63A5\u72B6\u6001 "),a(` <el-table-column
        label="\u57DF\u540D\u8FDE\u63A5\u72B6\u6001"
        header-align="center"
        align="center"
        prop="connect_status"
      >
        <template #default="scope">
          <span
            >{{ scope.row.connect_status || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u6709\u6548\u671F\u603B\u5929\u6570 "),a(` <el-table-column
        label="\u6709\u6548\u671F\u603B\u5929\u6570"
        header-align="center"
        align="center"
        prop="total_days"
      >
        <template #default="scope">
          <span
            >{{ scope.row.total_days || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u8FC7\u671F\u5269\u4F59\u5929\u6570 "),a(` <el-table-column
        label="\u8FC7\u671F\u5269\u4F59\u5929\u6570"
        header-align="center"
        align="center"
        prop="expire_days"
      >
        <template #default="scope">
          <span
            >{{ scope.row.expire_days || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u521B\u5EFA\u65F6\u95F4 "),a(` <el-table-column
        label="\u521B\u5EFA\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="create_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.create_time || '-' }}</span
          >
        </template>
      </el-table-column> `),a(" \u5206\u7EC4 "),o(d,{label:"\u5206\u7EC4","header-align":"center",align:"center",width:"100",prop:"check_time"},{default:r(p=>[f("span",null,y(p.row.group_name||"-"),1)]),_:1}),a(" \u5907\u6CE8 "),o(d,{label:"\u5907\u6CE8","header-align":"center",align:"center",prop:"check_time","show-overflow-tooltip":""},{default:r(p=>[f("span",null,y(p.row.alias||"-"),1)]),_:1}),a(" \u64CD\u4F5C "),a(` <el-table-column
        :label="$t('\u64CD\u4F5C')"
        header-align="center"
        align="center"
        prop="check_time"
        width="100"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="danger"
            :disabled="!scope.row.group_id"
            ><el-icon><Delete /></el-icon
          ></el-link>
        </template>
      </el-table-column> `)]),_:1},16),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog> `)])}const ee=D(Y,[["render",Z]]),te={name:"group-domain-list",props:{row:{type:Object}},components:{DataTable:ee,SelectGroup:j},data(){return{list:[],total:0,page:1,size:10,keyword:"",loading:!0,dialogVisible:!1,selection:[],group_id:""}},computed:{...A(B,{groupOptions:"getGroupOptions"}),disableRelationButton(){return this.selection.length==0}},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let t={page:this.page,size:this.size,keyword:this.keyword,group_id:this.group_id};try{const e=await this.$http.getDomainList(t);e.code==0&&(this.list=e.data.list.map(l=>(l.group_id&&(l.group_name=this.getGroupName(l.group_id)),l)),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},getGroupName(t){let e=this.groupOptions.find(l=>l.value==t);if(e)return e.name},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async handleRelation(){let t=this.selection.map(g=>g.id);console.log(t);let e={domain_ids:t,group_id:this.row.id};const l=await this.$http.domainRelationGroup(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.getData()):this.$msg.error(l.msg)},handleSelectionChange(t){console.log(t),this.selection=t},handleEditRow(t){},handleSizeChange(t){this.resetData()}},created(){this.row&&(this.group_id=this.row.id),this.getData()}},le={class:""},ne={class:"margin-bottom--20"};function ae(t,e,l,g,n,s){const d=i("Search"),u=i("el-icon"),p=i("el-button"),b=i("el-input"),_=i("SelectGroup"),S=i("DataTable"),k=i("el-pagination"),v=T("loading");return h(),w("div",le,[a(" \u64CD\u4F5C\u6309\u94AE "),f("div",ne,[o(b,{style:{width:"260px"},modelValue:n.keyword,"onUpdate:modelValue":e[0]||(e[0]=m=>n.keyword=m),placeholder:"\u8F93\u5165\u57DF\u540D",clearable:"",onKeypress:z(s.handleSearch,["enter"]),onClear:s.handleSearch},{append:r(()=>[o(p,{onClick:s.handleSearch},{default:r(()=>[o(u,null,{default:r(()=>[o(d)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","onKeypress","onClear"]),o(_,{class:"w-[150px] ml-sm",modelValue:n.group_id,"onUpdate:modelValue":e[1]||(e[1]=m=>n.group_id=m),clearable:"",showNotGroup:"",onChange:s.resetData},null,8,["modelValue","onChange"]),o(p,{class:"ml-sm",type:"primary",onClick:s.handleRelation,disabled:s.disableRelationButton},{default:r(()=>[R("\u5173\u8054")]),_:1},8,["onClick","disabled"])]),a(" \u6570\u636E\u5217\u8868 "),E(o(S,{class:"mt-md",data:n.list,onSelectionChange:s.handleSelectionChange,onOnSuccess:s.resetData,onOnEditRow:s.handleEditRow},null,8,["data","onSelectionChange","onOnSuccess","onOnEditRow"]),[[v,n.loading]]),a(" \u7FFB\u9875 "),o(k,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":e[2]||(e[2]=m=>n.size=m),"current-page":n.page,"onUpdate:currentPage":e[3]||(e[3]=m=>n.page=m),onCurrentChange:s.getData,onSizeChange:s.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog> `)])}const oe=D(te,[["render",ae]]),se={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},components:{DataTableIndex:oe},data(){return{}},computed:{dialogTitle(){return this.row?`\u5206\u7EC4\u5173\u8054\u57DF\u540D\uFF1A${this.row.name}`:"-"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose()},handleDialogClose(){this.$emit("on-success")}},created(){}};function ie(t,e,l,g,n,s){const d=i("DataTableIndex"),u=i("el-dialog");return h(),w(x,null,[a(" \u7F16\u8F91\u6846 "),o(u,{title:s.dialogTitle,modelValue:s.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>s.dialogVisible=p),width:"800px",center:"","append-to-body":"","lock-scroll":!1,onClose:s.handleDialogClose},{default:r(()=>[s.dialogVisible?(h(),U(d,{key:0,row:l.row,onOnCancel:s.handleClose,onOnSuccess:s.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):a("v-if",!0)]),_:1},8,["title","modelValue","onClose"])],2112)}const re=D(se,[["render",ie]]),ce={name:"",components:{},props:{list:{type:Array},disabled:{type:Boolean,default:!1},role:{type:Number}},computed:{},data(){return{RoleEnum:O,currentRow:null,dialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let e={group_user_id:t.id};const l=await this.$http.deleteGroupUserById(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},async handleStatusChange(t){let e={id:t.id};const l=await this.$http.function(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},handleUpdateSuccess(){this.$emit("on-success")},async handleRowHasEditPermissionChange(t,e){let l=this.$loading({fullscreen:!0}),g={group_user_id:t.id,has_edit_permission:e};try{const n=await this.$http.updateGroupUserById(g);n.code==0?this.$msg.success("\u64CD\u4F5C\u6210\u529F"):this.$msg.error(n.msg)}catch(n){console.log(n)}finally{this.$nextTick(()=>{l.close()})}}},created(){}};function de(t,e,l,g,n,s){const d=i("el-tag"),u=i("el-table-column"),p=i("el-checkbox"),b=i("Delete"),_=i("el-icon"),S=i("el-link"),k=i("el-popconfirm"),v=i("el-table");return h(),w("div",null,[o(v,{data:l.list,stripe:"",border:""},{default:r(()=>[a(" \u7528\u6237\u540D "),o(u,{label:"\u7528\u6237\u540D","header-align":"center",align:"center",prop:"username"},{default:r(m=>[f("span",null,y(m.row.user_name||"-"),1),m.row.is_leader?(h(),U(d,{key:0,class:"ml-sm"},{default:r(()=>[R("\u8D1F\u8D23\u4EBA")]),_:1})):a("v-if",!0)]),_:1}),a(" \u8BFB\u6743\u9650 "),o(u,{label:"\u6743\u9650","header-align":"center",align:"center",prop:"has_edit_permission"},{default:r(m=>[o(p,{"model-value":!0,disabled:"",label:"\u8BFB\u6743\u9650"}),o(p,{modelValue:m.row.has_edit_permission,"onUpdate:modelValue":C=>m.row.has_edit_permission=C,label:"\u5199\u6743\u9650",disabled:l.disabled||m.row.is_leader,onChange:C=>s.handleRowHasEditPermissionChange(m.row,C)},null,8,["modelValue","onUpdate:modelValue","disabled","onChange"])]),_:1}),o(u,{label:"\u79FB\u9664",width:"60",align:"center",prop:"tag"},{default:r(m=>[o(k,{title:"\u786E\u5B9A\u4ECE\u5206\u7EC4\u79FB\u9664\uFF1F",onConfirm:C=>s.handleDeleteClick(m.row),width:160,disabled:l.disabled||m.row.is_leader},{reference:r(()=>[o(S,{underline:!1,type:"danger",disabled:l.disabled||m.row.is_leader},{default:r(()=>[o(_,null,{default:r(()=>[o(b)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["onConfirm","disabled"])]),_:1})]),_:1},8,["data"]),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog> `)])}const ue=D(ce,[["render",de]]),pe={name:"group-user-list",props:{groupRow:{type:Object},role:{type:Number}},components:{DataTable:ue,SearchUser:P},data(){return{RoleEnum:O,list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1}},computed:{},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let t={group_id:this.groupRow.id};try{const e=await this.$http.getGroupUserList(t);e.code==0&&(this.list=e.data.list,this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async handleSelectUser(t){if(this.list.find(n=>n.user_id==t.id)){this.$msg.warning("\u6210\u5458\u5DF2\u5B58\u5728");return}let l=this.$loading({fullscreen:!0}),g={group_id:this.groupRow.id,user_id:t.id};try{const n=await this.$http.addGroupUser(g);n.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.keyword="",this.resetData()):this.$msg.error(n.msg)}catch(n){console.log(n)}finally{this.$nextTick(()=>{l.close()})}},handleEditRow(t){}},created(){this.getData()}},me={class:""},he={key:0,class:"mb-md"},ge=f("span",null,"\u6DFB\u52A0\u6210\u5458\uFF1A",-1);function _e(t,e,l,g,n,s){const d=i("SearchUser"),u=i("DataTable"),p=i("el-pagination"),b=T("loading");return h(),w("div",me,[a(" \u64CD\u4F5C\u6309\u94AE "),l.groupRow.is_leader&&l.role==n.RoleEnum.User?(h(),w("div",he,[a(` <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>\u6DFB\u52A0</el-button
      > `),ge,o(d,{keyword:n.keyword,"onUpdate:keyword":e[0]||(e[0]=_=>n.keyword=_),onOnSelect:s.handleSelectUser},null,8,["keyword","onOnSelect"])])):a("v-if",!0),a(" \u6570\u636E\u5217\u8868 "),E(o(u,{list:n.list,role:l.role,disabled:!l.groupRow.is_leader||l.role!=n.RoleEnum.User,onOnSuccess:s.resetData,onOnEditRow:s.handleEditRow},null,8,["list","role","disabled","onOnSuccess","onOnEditRow"]),[[b,n.loading]]),a(" \u7FFB\u9875 "),o(p,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":e[1]||(e[1]=_=>n.size=_),"current-page":n.page,"onUpdate:currentPage":e[2]||(e[2]=_=>n.page=_),onCurrentChange:s.getData},null,8,["total","page-size","current-page","onCurrentChange"]),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog> `)])}const be=D(pe,[["render",_e]]),fe={name:"",props:{groupRow:{type:Object},row:{type:Object,default:null},visible:{type:Boolean,default:!1},role:{type:Number}},components:{DataTableIndex:be},data(){return{}},computed:{dialogTitle(){return this.groupRow?`\u5206\u7EC4\u6210\u5458\uFF1A${this.groupRow.name}`:"\u5206\u7EC4\u6210\u5458"},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.dialogVisible=!1,this.$emit("on-close")},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function we(t,e,l,g,n,s){const d=i("DataTableIndex"),u=i("el-dialog");return h(),w(x,null,[a(" \u7F16\u8F91\u6846 "),o(u,{title:s.dialogTitle,modelValue:s.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=p=>s.dialogVisible=p),width:"600px",center:"","append-to-body":"",onClose:s.handleClose},{default:r(()=>[s.dialogVisible?(h(),U(d,{key:0,groupRow:l.groupRow,role:l.role,onOnSuccess:s.handleSuccess},null,8,["groupRow","role","onOnSuccess"])):a("v-if",!0)]),_:1},8,["title","modelValue","onClose"])],2112)}const ye=D(fe,[["render",we]]),De={name:"",components:{DataFormDialog:L,GroupDomainListDialog:re,GroupUserListDialog:ye},props:{list:{type:Array},role:{type:Number,default:O.User}},emits:["selection-change"],computed:{},data(){return{RoleEnum:O,currentRow:null,dialogVisible:!1,groupDomainListDialogVisible:!1,GroupUserListDialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let e={id:t.id};const l=await this.$http.deleteGroupById(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},async handleStatusChange(t){let e={id:t.id};const l=await this.$http.function(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleCountClick(t){console.log("handleCountClick"),this.currentRow=t,this.groupDomainListDialogVisible=!0},handleEditRowGroupUser(t){this.currentRow=t,this.GroupUserListDialogVisible=!0},handleSelectable(t,e){return t.is_leader}},created(){}};function Ce(t,e,l,g,n,s){const d=i("el-table-column"),u=i("el-link"),p=i("Link"),b=i("el-icon"),_=i("Edit"),S=i("Delete"),k=i("el-popconfirm"),v=i("el-table"),m=i("DataFormDialog"),C=i("GroupDomainListDialog"),G=i("GroupUserListDialog");return h(),w("div",null,[o(v,{data:l.list,stripe:"",border:"",onSelectionChange:e[0]||(e[0]=c=>t.$emit("selection-change",c))},{default:r(()=>[l.role==n.RoleEnum.User?(h(),U(d,{key:0,type:"selection","header-align":"center",align:"center",width:"40",selectable:s.handleSelectable},null,8,["selectable"])):a("v-if",!0),o(d,{label:"ID",align:"center",prop:"id",width:"60"},{default:r(c=>[f("span",null,y(c.row.id),1)]),_:1}),a(" \u540D\u79F0 "),o(d,{label:t.$t("\u540D\u79F0"),"header-align":"center",align:"center",prop:"name"},{default:r(c=>[f("span",null,y(c.row.name||"-"),1)]),_:1},8,["label"]),a(" \u8BC1\u4E66\u6570\u91CF "),o(d,{label:t.$t("\u8BC1\u4E66\u6570\u91CF"),"header-align":"center",align:"center",prop:"name",width:"100"},{default:r(c=>[f("span",null,y(c.row.cert_count||"0"),1)]),_:1},8,["label"]),a(" \u57DF\u540D\u6570\u91CF "),o(d,{label:t.$t("\u57DF\u540D\u6570\u91CF"),"header-align":"center",align:"center",prop:"name",width:"120"},{default:r(c=>[f("span",null,y(c.row.domain_count||"0"),1)]),_:1},8,["label"]),a(" \u6210\u5458\u6570\u91CF "),o(d,{label:t.$t("\u6210\u5458\u6570\u91CF"),"header-align":"center",align:"center",prop:"name",width:"100"},{default:r(c=>[o(u,{underline:!1,type:"primary",onClick:$=>s.handleEditRowGroupUser(c.row)},{default:r(()=>[R(y(c.row.group_user_count||"0"),1)]),_:2},1032,["onClick"])]),_:1},8,["label"]),a(" \u521B\u5EFA\u65F6\u95F4 "),a(` <el-table-column
        label="\u521B\u5EFA\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
        </template>
      </el-table-column> `),a(" \u64CD\u4F5C "),a(` <el-table-column
        label="\u72B6\u6001"
        header-align="center"
        align="center"
        width="80"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          />
        </template>
      </el-table-column> `),l.role==n.RoleEnum.User?(h(),w(x,{key:1},[a(" \u5173\u8054\u8BC1\u4E66 "),o(d,{label:t.$t("\u5173\u8054\u8BC1\u4E66"),width:"130","header-align":"center",align:"center"},{default:r(c=>[o(u,{underline:!1,type:"primary",disabled:!c.row.is_leader,onClick:$=>s.handleCountClick(c.row)},{default:r(()=>[o(b,null,{default:r(()=>[o(p)]),_:1})]),_:2},1032,["disabled","onClick"])]),_:1},8,["label"]),o(d,{label:t.$t("\u7F16\u8F91"),width:"60","header-align":"center",align:"center"},{default:r(c=>[o(u,{underline:!1,type:"primary",disabled:!c.row.is_leader,onClick:$=>s.handleEditRow(c.row)},{default:r(()=>[o(b,null,{default:r(()=>[o(_)]),_:1})]),_:2},1032,["disabled","onClick"])]),_:1},8,["label"]),o(d,{label:t.$t("\u5220\u9664"),width:"60",align:"center",prop:"tag"},{default:r(c=>[o(k,{title:`${t.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:$=>s.handleDeleteClick(c.row),disabled:!c.row.is_leader},{reference:r(()=>[o(u,{underline:!1,type:"danger",disabled:!c.row.is_leader},{default:r(()=>[o(b,null,{default:r(()=>[o(S)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["title","onConfirm","disabled"])]),_:1},8,["label"])],64)):a("v-if",!0)]),_:1},8,["data"]),a(" \u7F16\u8F91\u6846 "),o(m,{visible:n.dialogVisible,"onUpdate:visible":e[1]||(e[1]=c=>n.dialogVisible=c),row:n.currentRow,onOnSuccess:s.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"]),a(" \u5206\u7EC4 + \u57DF\u540D \u5173\u8054"),o(C,{row:n.currentRow,visible:n.groupDomainListDialogVisible,"onUpdate:visible":e[2]||(e[2]=c=>n.groupDomainListDialogVisible=c),onOnSuccess:s.handleUpdateSuccess},null,8,["row","visible","onOnSuccess"]),a(" \u7EC4\u5458 "),o(G,{groupRow:n.currentRow,role:l.role,visible:n.GroupUserListDialogVisible,"onUpdate:visible":e[3]||(e[3]=c=>n.GroupUserListDialogVisible=c),onOnSuccess:s.handleUpdateSuccess,onOnClose:e[4]||(e[4]=c=>t.$emit("on-success"))},null,8,["groupRow","role","visible","onOnSuccess"])])}const Se=D(De,[["render",Ce]]),ke={name:"group-list",props:{role:{type:Number,default:O.User}},components:{DataFormDialog:L,DataTable:Se,DataCount:K},data(){return{RoleEnum:O,list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1,selectedRows:[]}},computed:{showBatchDeleteButton(){return!!(this.selectedRows&&this.selectedRows.length>0)}},methods:{...N(B,{setGroupOptions:"setGroupOptions"}),resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let t={keyword:this.keyword.trim(),role:this.role};try{const e=await this.$http.getGroupList(t);e.code==0&&(this.list=e.data.list,this.total=e.data.total,this.setGroupOptions(e.data.list))}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleEditRow(t){},handleSelectionChange(t){this.selectedRows=t},async handleBatchDeleteConfirm(){let t=this.$loading({fullscreen:!0}),e={group_ids:this.selectedRows.map(l=>l.id)};try{const l=await this.$http.deleteGroupByIds(e);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(l.msg)}catch(l){console.log(l)}finally{this.$nextTick(()=>{t.close()})}}},created(){this.getData()}},ve={class:"app-container"},Ve={class:"flex justify-between margin-bottom--20"},Re={key:1},Ue={class:"flex mt-sm",style:{"align-items":"center"}},Oe={class:"flex",style:{"margin-left":"auto"}};function $e(t,e,l,g,n,s){const d=i("Plus"),u=i("el-icon"),p=i("el-button"),b=i("Search"),_=i("el-input"),S=i("DataCount"),k=i("Delete"),v=i("el-link"),m=i("el-popconfirm"),C=i("DataTable"),G=i("el-pagination"),c=i("DataFormDialog"),$=T("loading");return h(),w("div",ve,[a(" \u64CD\u4F5C\u6309\u94AE "),f("div",Ve,[l.role==n.RoleEnum.User?(h(),U(p,{key:0,type:"primary",onClick:s.handleAddRow},{default:r(()=>[o(u,null,{default:r(()=>[o(d)]),_:1}),R(y(t.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick"])):(h(),w("span",Re)),o(_,{class:"ml-sm",style:{width:"260px"},modelValue:n.keyword,"onUpdate:modelValue":e[0]||(e[0]=V=>n.keyword=V),clearable:"",placeholder:t.$t("\u641C\u7D22\u5206\u7EC4"),onKeypress:z(s.handleSearch,["enter"]),onClear:s.handleSearch},{append:r(()=>[o(p,{onClick:s.handleSearch},{default:r(()=>[o(u,null,{default:r(()=>[o(b)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","placeholder","onKeypress","onClear"])]),f("div",Ue,[o(S,{value:n.total},null,8,["value"]),f("div",Oe,[s.showBatchDeleteButton?(h(),U(m,{key:0,title:"\u786E\u5B9A\u5220\u9664\u9009\u4E2D\uFF1F",onConfirm:s.handleBatchDeleteConfirm},{reference:r(()=>[o(v,{underline:!1,type:"danger",class:"mr-sm"},{default:r(()=>[o(u,null,{default:r(()=>[o(k)]),_:1}),R("\u6279\u91CF\u5220\u9664")]),_:1})]),_:1},8,["onConfirm"])):a("v-if",!0)])]),a(" \u6570\u636E\u5217\u8868 "),E(o(C,{class:"mt-sm",role:l.role,list:n.list,onOnSuccess:s.resetData,onOnEditRow:s.handleEditRow,onSelectionChange:s.handleSelectionChange},null,8,["role","list","onOnSuccess","onOnEditRow","onSelectionChange"]),[[$,n.loading]]),a(" \u7FFB\u9875 "),o(G,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:n.total,"page-size":n.total,"onUpdate:pageSize":e[1]||(e[1]=V=>n.total=V),"current-page":n.page,"onUpdate:currentPage":e[2]||(e[2]=V=>n.page=V),onCurrentChange:s.getData},null,8,["total","page-size","current-page","onCurrentChange"]),a(" \u7F16\u8F91\u6846 "),o(c,{visible:n.dialogVisible,"onUpdate:visible":e[3]||(e[3]=V=>n.dialogVisible=V),onOnSuccess:s.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const Ae=D(ke,[["render",$e]]);export{Ae as default};
