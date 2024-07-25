import{_ as D,R as B}from"./index.68ff74a4.js";import{o as m,c as p,J as U,U as h,ah as o,V as l,P as i,S as n,a as y,T as v,O as k,F as V,ar as A,Q as E}from"./vendor-vue.cefe3aef.js";const T={name:"ExpireDays",props:{value:{type:[Number,String],default:null}},components:{},data(){return{}},computed:{showValue(){return Number.isInteger(this.value)},className(){return this.showValue?this.value<7?["color--danger"]:this.value<30?["color--warning"]:["color--success"]:[]}},methods:{async getData(){}},created(){this.getData()}},$={class:"ExpireDays"},N={key:1};function z(s,t,e,g,d,a){return m(),p("div",$,[a.showValue?(m(),p("span",{key:0,class:U(a.className)},h(e.value),3)):(m(),p("span",N,"-"))])}const F=D(T,[["render",z]]),j={host:[{message:"\u4E3B\u673A\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],host_connect_status:[{message:"\u4E3B\u673A\u8FDE\u63A5\u72B6\u6001\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],host_check_time:[{message:"\u4E3B\u673A\u68C0\u67E5\u65F6\u95F4\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},Y={name:"",props:{row:{type:Object,default:null},domainId:{type:Number,default:null}},components:{},data(){return{rules:j,is_auto_update:!0,form:{host:"",host_connect_status:"",host_check_time:"",ssl_start_time:"",ssl_expire_time:"",ssl_check_time:"",ssl_expire_days:"",ssl_expire_monitor:!0,ssl_auto_update:!0,comment:""}}},computed:{disabledTime(){return this.is_auto_update}},methods:{async getDomainById(){let s={domain_id:this.domainId};const t=await this.$http.getDomainById(s);t.ok&&(this.is_auto_update=t.data.auto_update)},async getData(){if(await this.getDomainById(),this.row){let s={address_id:this.row.id};const t=await this.$http.getAddressById(s);if(t.code!=0)return;let e=t.data;this.form.host=e.host,this.form.host_connect_status=e.host_connect_status,this.form.host_check_time=e.host_check_time,this.form.ssl_start_time=e.ssl_start_time,this.form.ssl_expire_time=e.ssl_expire_time,this.form.ssl_check_time=e.ssl_check_time,this.form.ssl_expire_days=e.ssl_expire_days,this.form.ssl_auto_update=e.ssl_auto_update,this.form.ssl_expire_monitor=e.ssl_expire_monitor,this.form.comment=e.comment}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(s=>{if(s)this.confirmSubmit();else return!1})},async confirmSubmit(){let s=this.$loading({fullscreen:!0}),t={domain_id:this.domainId,host:this.form.host.trim(),ssl_start_time:this.form.ssl_start_time,ssl_expire_time:this.form.ssl_expire_time,comment:this.form.comment},e=null;this.row?(t.address_id=this.row.id,e=await this.$http.updateAddressById(t)):e=await this.$http.addAddress(t),e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg),this.$nextTick(()=>{s.close()})}},created(){this.getData()}},P={class:"text-center mt-md"};function H(s,t,e,g,d,a){const c=o("el-input"),u=o("el-form-item"),f=o("el-form"),b=o("el-button");return m(),p("div",null,[l(f,{ref:"form",model:d.form,rules:d.rules,"label-width":"100px"},{default:i(()=>[n(" \u4E3B\u673A\u5730\u5740 "),l(u,{label:"\u4E3B\u673AIP\u5730\u5740",prop:"host"},{default:i(()=>[l(c,{type:"text",style:{width:"220px"},modelValue:d.form.host,"onUpdate:modelValue":t[0]||(t[0]=_=>d.form.host=_),placeholder:"\u8BF7\u8F93\u5165\u4E3B\u673A\u5730\u5740"},null,8,["modelValue"])]),_:1}),n(" \u4E3B\u673A\u8FDE\u63A5\u72B6\u6001 "),n(" \u8BC1\u4E66\u9881\u53D1\u65F6\u95F4 "),n(` <el-form-item
        label="\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4"
        prop="ssl_start_time"
      >
        <el-date-picker
          v-model="form.ssl_start_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4"
          :teleported="false"
          :disabled="disabledTime"
        />
      </el-form-item> `),n(" \u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4 "),n(` <el-form-item
        label="\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4"
        prop="ssl_expire_time"
      >
        <el-date-picker
          v-model="form.ssl_expire_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4"
          :teleported="false"
          :disabled="disabledTime"
        />
      </el-form-item> `),l(u,{label:"\u5907\u6CE8",prop:"comment"},{default:i(()=>[l(c,{type:"textarea",style:{width:"220px"},modelValue:d.form.comment,"onUpdate:modelValue":t[1]||(t[1]=_=>d.form.comment=_),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1}),n(` <el-form-item
        label="\u8BC1\u4E66\u81EA\u52A8\u66F4\u65B0"
        prop="ssl_auto_update"
      >
        <el-switch v-model="form.ssl_auto_update" />
      </el-form-item> `),n(` <el-form-item
        label="\u8BC1\u4E66\u5230\u671F\u76D1\u63A7"
        prop="ssl_expire_monitor"
      >
        <el-switch v-model="form.ssl_expire_monitor" />
      </el-form-item> `),n(" \u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4 ")]),_:1},8,["model","rules"]),n(` <div class="text-[12px] color--info">
      \u63D0\u793A\uFF1A\u5982\u9700\u624B\u52A8\u8BBE\u7F6E\uFF0C\u8BF7\u5173\u95ED\u81EA\u52A8\u66F4\u65B0
    </div> `),n(" \u64CD\u4F5C "),y("div",P,[l(b,{onClick:a.handleCancel},{default:i(()=>[v(h(s.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),l(b,{type:"primary",onClick:a.handleSubmit},{default:i(()=>[v(h(s.$t("\u786E\u5B9A")),1)]),_:1},8,["onClick"])])])}const L=D(Y,[["render",H]]),M={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1},domainId:{type:Number,default:null}},emits:["update:visible"],components:{DataForm:L},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91\u4E3B\u673A\u5730\u5740":"\u6DFB\u52A0\u4E3B\u673A\u5730\u5740"},dialogVisible:{get(){return this.visible},set(s){this.$emit("update:visible",s)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function q(s,t,e,g,d,a){const c=o("DataForm"),u=o("el-dialog");return m(),p(V,null,[n(" \u7F16\u8F91\u6846 "),l(u,{title:a.dialogTitle,modelValue:a.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=f=>a.dialogVisible=f),width:"400px",center:"","append-to-body":""},{default:i(()=>[a.dialogVisible?(m(),k(c,{key:0,row:e.row,domainId:e.domainId,onOnCancel:a.handleClose,onOnSuccess:a.handleSuccess},null,8,["row","domainId","onOnCancel","onOnSuccess"])):n("v-if",!0)]),_:1},8,["title","modelValue"])],2112)}const O=D(M,[["render",q]]),J={name:"",components:{DataFormDialog:O,ExpireDays:F},props:{list:{type:Array},domainId:{type:Number,default:null},domainRow:{type:Object,default:null},disableUpdateButton:{type:Boolean,default:!1},role:{type:Number}},emits:["on-selection-change"],computed:{},data(){return{RoleEnum:B,currentRow:null,dialogVisible:!1}},methods:{handleEditRow(s){this.currentRow=s,this.dialogVisible=!0},async handleDeleteClick(s){let t={address_id:s.id};const e=await this.$http.deleteAddressById(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},async handleStatusChange(s){let t={id:s.id};const e=await this.$http.function(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(e.msg)},handleUpdateSuccess(){this.$emit("on-success")},async handleUpdateRowDomainInfo(s){let t=this.$loading({fullscreen:!0}),e={address_id:s.id};const g=await this.$http.updateAddressRowInfoById(e);g.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(g.msg),this.$nextTick(()=>{t.close()})}},created(){}};function Q(s,t,e,g,d,a){const c=o("el-table-column"),u=o("ExpireDays"),f=o("Refresh"),b=o("el-icon"),_=o("el-link"),C=o("Edit"),x=o("Delete"),I=o("el-popconfirm"),S=o("el-table"),R=o("DataFormDialog");return m(),p("div",null,[l(S,{data:e.list,stripe:"",border:"",onSelectionChange:t[0]||(t[0]=r=>s.$emit("on-selection-change",r))},{default:i(()=>[d.RoleEnum.User==e.role&&e.domainRow.has_edit_permission?(m(),k(c,{key:0,type:"selection","header-align":"center",align:"center",width:"40"})):n("v-if",!0),n(" \u4E3B\u673A\u5730\u5740 "),l(c,{label:"\u4E3B\u673AIP\u5730\u5740","header-align":"center",align:"center",prop:"host"},{default:i(r=>[y("span",null,h(r.row.host||"-"),1)]),_:1}),n(" \u4E3B\u673A\u8FDE\u63A5\u72B6\u6001 "),n(` <el-table-column
        label="\u4E3B\u673A\u8FDE\u63A5\u72B6\u6001"
        header-align="center"
        align="center"
        prop="host_connect_status"
      >
        <template #default="scope">
          <span>{{ scope.row.host_connect_status || '-' }}</span>
        </template>
      </el-table-column> `),n(" \u4E3B\u673A\u68C0\u67E5\u65F6\u95F4 "),n(` <el-table-column
        label="\u4E3B\u673A\u68C0\u67E5\u65F6\u95F4"
        header-align="center"
        align="center"
        prop="host_check_time"
      >
        <template #default="scope">
          <span>{{ scope.row.host_check_time || '-' }}</span>
        </template>
      </el-table-column> `),n(" \u8BC1\u4E66\u9881\u53D1\u65F6\u95F4 "),l(c,{label:"\u8BC1\u4E66\u9881\u53D1\u65F6\u95F4","header-align":"center",align:"center",prop:"ssl_start_time",width:"110"},{default:i(r=>[y("span",null,h(r.row.ssl_start_date||"-"),1)]),_:1}),n(" \u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4 "),l(c,{label:"\u8BC1\u4E66\u8FC7\u671F\u65F6\u95F4","header-align":"center",align:"center",width:"110",prop:"ssl_expire_time"},{default:i(r=>[y("span",null,h(r.row.ssl_expire_date||"-"),1)]),_:1}),n(" \u8BC1\u4E66\u5269\u4F59\u5929\u6570 "),l(c,{label:"\u5269\u4F59\u5929\u6570","header-align":"center",align:"center",width:"80",prop:"ssl_expire_days"},{default:i(r=>[n(" <span>{{ scope.row.real_time_ssl_expire_days || '-' }}</span> "),l(u,{value:r.row.real_time_ssl_expire_days},null,8,["value"]),n(` <el-tag
            v-if="!scope.row.ssl_auto_update"
            class="ml-[5px] mo-table-tag"
            type="info"
            size="small"
            >\u624B\u52A8</el-tag
          > `)]),_:1}),n(" \u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4 "),l(c,{label:"\u8BC1\u4E66\u68C0\u67E5\u65F6\u95F4","header-align":"center",align:"center",width:"110",prop:"ssl_check_time"},{default:i(r=>[y("span",null,h(r.row.update_time_label||"-"),1)]),_:1}),n(" comment "),l(c,{label:"\u5907\u6CE8","header-align":"center",align:"center",prop:"comment"},{default:i(r=>[y("span",null,h(r.row.comment||"-"),1)]),_:1}),n(" \u64CD\u4F5C "),n(` <el-table-column
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
      </el-table-column> `),n(` <el-table-column
        label="\u7F16\u8F91"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon
          ></el-link>
        </template>
      </el-table-column> `),l(c,{label:"\u64CD\u4F5C",width:"90",align:"center",prop:"tag"},{default:i(r=>[l(_,{underline:!1,type:"primary",class:"mr-sm",disabled:e.disableUpdateButton,onClick:w=>a.handleUpdateRowDomainInfo(r.row)},{default:i(()=>[l(b,null,{default:i(()=>[l(f)]),_:1})]),_:2},1032,["disabled","onClick"]),n(" \u7528\u6237\u53EF\u89C1 "),d.RoleEnum.User==e.role?(m(),p(V,{key:0},[l(_,{underline:!1,type:"primary",class:"mr-sm",onClick:w=>a.handleEditRow(r.row),disabled:!e.domainRow.has_edit_permission||r.row.source==0},{default:i(()=>[l(b,null,{default:i(()=>[l(C)]),_:1})]),_:2},1032,["onClick","disabled"]),l(I,{title:`${s.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:w=>a.handleDeleteClick(r.row),disabled:!e.domainRow.has_edit_permission},{reference:i(()=>[l(_,{underline:!1,type:"danger",disabled:!e.domainRow.has_edit_permission},{default:i(()=>[l(b,null,{default:i(()=>[l(x)]),_:1})]),_:1},8,["disabled"])]),_:2},1032,["title","onConfirm","disabled"])],64)):n("v-if",!0)]),_:1})]),_:1},8,["data"]),n(" \u7F16\u8F91\u6846 "),l(R,{visible:d.dialogVisible,"onUpdate:visible":t[1]||(t[1]=r=>d.dialogVisible=r),row:d.currentRow,domainId:e.domainId,onOnSuccess:a.handleUpdateSuccess},null,8,["visible","row","domainId","onOnSuccess"])])}const G=D(J,[["render",Q]]),K={name:"address-list",props:{domainRow:{type:Object,default:null},domainId:{type:Number,default:null},role:{type:Number}},components:{DataFormDialog:O,DataTable:G},data(){return{RoleEnum:B,list:[],total:0,page:1,size:10,keyword:"",selectedRows:[],loading:!0,dialogVisible:!1,is_auto_update:!0}},computed:{disableUpdateButton(){return!this.is_auto_update},showBatchDeleteButton(){return!!(this.selectedRows&&this.selectedRows.length>0)}},methods:{async resetData(){this.page=1,await this.getData()},async getDomainById(){let s={domain_id:this.domainId};const t=await this.$http.getDomainById(s);t.ok&&(this.is_auto_update=t.data.auto_update)},async getData(){this.loading=!0;let s={domain_id:this.domainId,page:this.page,size:this.size};try{const t=await this.$http.getAddressListByDomainId(s);t.code==0&&(this.list=t.data.list,this.total=t.data.total)}catch(t){console.log(t)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},async updateAllAddress(){let s=this.$loading({fullscreen:!0}),t={domain_id:this.domainId},e=await this.$http.updateAddressListInfoByDomainId(t);e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg),this.$nextTick(()=>{s.close()})},handleSizeChange(s){this.resetData()},handleSelectionChange(s){this.selectedRows=s},async handleBatchDeleteConfirm(){let s=this.$loading({fullscreen:!0}),t={address_ids:this.selectedRows.map(e=>e.id)};try{(await this.$http.deleteAddressByIds(t)).ok&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData())}catch(e){console.log(e)}finally{this.$nextTick(()=>{s.close()})}}},created(){this.resetData()}},W={class:""},X={class:"flex justify-between items-center"},Z={key:1};function ee(s,t,e,g,d,a){const c=o("Plus"),u=o("el-icon"),f=o("el-button"),b=o("Delete"),_=o("el-link"),C=o("el-popconfirm"),x=o("Refresh"),I=o("DataTable"),S=o("el-pagination"),R=o("DataFormDialog"),r=A("loading");return m(),p("div",W,[n(" \u64CD\u4F5C\u6309\u94AE "),y("div",X,[d.RoleEnum.User==e.role?(m(),k(f,{key:0,type:"primary",onClick:a.handleAddRow,disabled:!e.domainRow.has_edit_permission},{default:i(()=>[l(u,null,{default:i(()=>[l(c)]),_:1}),v(h(s.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick","disabled"])):(m(),p("span",Z)),y("div",null,[a.showBatchDeleteButton?(m(),k(C,{key:0,title:"\u786E\u5B9A\u5220\u9664\u9009\u4E2D\uFF1F",onConfirm:a.handleBatchDeleteConfirm},{reference:i(()=>[l(_,{underline:!1,type:"danger",class:"mr-sm"},{default:i(()=>[l(u,null,{default:i(()=>[l(b)]),_:1}),v("\u6279\u91CF\u5220\u9664")]),_:1})]),_:1},8,["onConfirm"])):n("v-if",!0),l(_,{underline:!1,type:"primary",disabled:a.disableUpdateButton,onClick:a.updateAllAddress},{default:i(()=>[l(u,null,{default:i(()=>[l(x)]),_:1}),v(h(s.$t("\u5168\u90E8\u66F4\u65B0")),1)]),_:1},8,["disabled","onClick"])]),n(` <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        placeholder="\u8F93\u5165\u57DF\u540D"
        clearable
        @keypress.enter="handleSearch"
        @clear="handleSearch"
      >
        <template #append>
          <el-button @click="handleSearch">
            <el-icon><Search /></el-icon
          ></el-button>
        </template>
      </el-input> `)]),n(" \u6570\u636E\u5217\u8868 "),E(l(I,{class:"mt-sm",list:d.list,role:e.role,domainId:e.domainId,domainRow:e.domainRow,disableUpdateButton:a.disableUpdateButton,onOnSuccess:a.resetData,onOnSelectionChange:a.handleSelectionChange},null,8,["list","role","domainId","domainRow","disableUpdateButton","onOnSuccess","onOnSelectionChange"]),[[r,d.loading]]),n(" \u7FFB\u9875 "),l(S,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:d.total,"page-size":d.size,"onUpdate:pageSize":t[0]||(t[0]=w=>d.size=w),"current-page":d.page,"onUpdate:currentPage":t[1]||(t[1]=w=>d.page=w),onCurrentChange:a.getData,onSizeChange:a.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),n(" \u7F16\u8F91\u6846 "),l(R,{visible:d.dialogVisible,"onUpdate:visible":t[2]||(t[2]=w=>d.dialogVisible=w),domainId:e.domainId,onOnSuccess:a.handleAddSuccess},null,8,["visible","domainId","onOnSuccess"])])}const te=D(K,[["render",ee]]),se={name:"",props:{domainRow:{type:Object,default:null},row:{type:Object,default:null},visible:{type:Boolean,default:!1},domainId:{type:Number,default:null},role:{type:Number}},components:{DataTableIndex:te},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(s){this.$emit("update:visible",s)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose(),this.$emit("on-success")},handleDialogClose(){this.$emit("on-close")}},created(){}};function le(s,t,e,g,d,a){const c=o("DataTableIndex"),u=o("el-dialog");return m(),p(V,null,[n(" \u7F16\u8F91\u6846 "),l(u,{title:"\u57DF\u540D\u4E3B\u673A\u5217\u8868",modelValue:a.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=f=>a.dialogVisible=f),width:"960px",center:"","append-to-body":"",onClose:a.handleDialogClose},{default:i(()=>[a.dialogVisible?(m(),k(c,{key:0,row:e.row,role:e.role,domainRow:e.domainRow,domainId:e.domainId,onOnCancel:a.handleClose,onOnSuccess:a.handleSuccess},null,8,["row","role","domainRow","domainId","onOnCancel","onOnSuccess"])):n("v-if",!0)]),_:1},8,["modelValue","onClose"])],2112)}const ie=D(se,[["render",le]]);export{te as A,F as E,ie as a};
