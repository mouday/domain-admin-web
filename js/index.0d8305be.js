import{C as $}from"./ConnectStatus.7848d518.js";import{_ as f}from"./index.03d61c20.js";import{ah as r,o as b,c as w,V as n,P as i,a as c,U as p,S as s,ar as z,T as _,Q as v}from"./vendor-vue.cefe3aef.js";import{M as k}from"./monitor-status-enums.d5e55f4a.js";import"./element-plus.4ffcce52.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.673ea722.js";const V={name:"",components:{ConnectStatus:$},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const l=await this.$http.function(t);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},async handleStatusChange(e){let t={id:e.id};const l=await this.$http.function(t);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function I(e,t,l,D,o,u){const d=r("el-table-column"),m=r("ConnectStatus"),h=r("el-table");return b(),w("div",null,[n(h,{data:l.list,stripe:"",border:""},{default:i(()=>[n(d,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:i(a=>[c("span",null,p(a.$index+1),1)]),_:1},8,["label"]),s(" \u72B6\u6001 "),s(" \u521B\u5EFA\u65F6\u95F4 "),n(d,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"180"},{default:i(a=>[c("span",null,p(a.row.create_time||"-"),1)]),_:1},8,["label"]),s(" \u66F4\u65B0\u65F6\u95F4 "),n(d,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time",width:"180"},{default:i(a=>[c("span",null,p(a.row.update_time||"-"),1)]),_:1},8,["label"]),n(d,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"100",prop:"total_time_label"},{default:i(a=>[c("span",null,p(a.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(d,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:i(a=>[s(" <span>{{ scope.row.status || '-' }}</span> "),n(m,{value:a.row.status_value},null,8,["value"])]),_:1},8,["label"]),n(d,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:i(a=>[c("span",null,p(a.row.result||"-"),1)]),_:1},8,["label"]),s(" \u64CD\u4F5C "),s(` <el-table-column
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
      </el-table-column>

      <el-table-column
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
      </el-table-column>

      <el-table-column
        label="\u5220\u9664"
        width="60"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            title="\u786E\u5B9A\u5220\u9664\uFF1F"
            @confirm="handleDeleteClick(row)"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="danger"
                ><el-icon><Delete /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column> `)]),_:1},8,["data"]),s(" \u7F16\u8F91\u6846 "),s(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const M=f(V,[["render",I]]),B={name:"log-scheduler-list",props:{monitorId:{type:String,default:null}},components:{DataTable:M},data(){return{list:[],total:0,page:1,size:20,keywords:"",detail:{},loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData(),this.getMonitorData()},refreshData(){this.getData()},async getMonitorData(){let e={monitor_id:this.monitorId};const t=await this.$http.getMonitorById(e);t.ok&&(this.detail=t.data)},async getData(){this.loading=!0;let e={monitor_id:this.monitorId,page:this.page,size:this.size};const t=await this.$http.getLogMonitorList(e);t.code==0&&(this.list=t.data.list.map(l=>(l.status_value=k(l.status),l)),this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogMonitor({monitor_id:this.monitorId});t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.resetData()}},R={class:"app-container"},T={class:"flex justify-between mb-sm"},F=c("span",{class:"color--info"},"\u76D1\u63A7\u540D\u79F0: ",-1);function U(e,t,l,D,o,u){const d=r("Delete"),m=r("el-icon"),h=r("el-link"),a=r("el-popconfirm"),S=r("DataTable"),C=r("el-pagination"),y=z("loading");return b(),w("div",R,[c("div",T,[c("div",null,[F,_(),c("span",null,p(o.detail.title),1)]),n(a,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:u.handleBatchDeleteConfirm},{reference:i(()=>[n(h,{underline:!1,type:"danger",class:"mr-sm"},{default:i(()=>[n(m,null,{default:i(()=>[n(d)]),_:1}),_(p(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),s(" \u6570\u636E\u5217\u8868 "),v(n(S,{list:o.list,onOnSuccess:u.resetData},null,8,["list","onOnSuccess"]),[[y,o.loading]]),s(" \u7FFB\u9875 "),n(C,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:pageSize":t[0]||(t[0]=g=>o.size=g),"current-page":o.page,"onUpdate:currentPage":t[1]||(t[1]=g=>o.page=g),onCurrentChange:u.getData,onSizeChange:u.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),s(" \u7F16\u8F91\u6846 "),s(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const O=f(B,[["render",U]]);export{O as default};
