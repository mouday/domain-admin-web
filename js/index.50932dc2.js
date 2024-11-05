import{C as $}from"./ConnectStatus.5270a357.js";import{_}from"./index.d131bb2e.js";import{ai as o,o as b,c as w,U as n,O as s,a as c,T as d,R as l,aq as v,P as z,S as f}from"./vendor-vue.279aabbf.js";import"./element-plus.2186919a.js";import"./element-icon.a3660786.js";import"./vendor-lib.c8503388.js";const R={name:"",components:{ConnectStatus:$},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const p=await this.$http.function(t);p.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(p.msg)},async handleStatusChange(e){let t={id:e.id};const p=await this.$http.function(t);p.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(p.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function V(e,t,p,D,r,u){const i=o("el-table-column"),m=o("ConnectStatus"),h=o("el-table");return b(),w("div",null,[n(h,{data:p.list,stripe:"",border:""},{default:s(()=>[n(i,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:s(a=>[c("span",null,d(a.$index+1),1)]),_:1},8,["label"]),n(i,{label:e.$t("\u7528\u6237"),"header-align":"center",align:"center",prop:"create_time",width:"140"},{default:s(a=>[c("span",null,d(a.row.user_name||"-"),1)]),_:1},8,["label"]),l(" \u72B6\u6001 "),n(i,{label:e.$t("\u4EFB\u52A1\u540D\u79F0"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:s(a=>[c("span",null,d(a.row.task_name||"-"),1)]),_:1},8,["label"]),l(" \u521B\u5EFA\u65F6\u95F4 "),n(i,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:s(a=>[c("span",null,d(a.row.start_time||"-"),1)]),_:1},8,["label"]),l(" \u66F4\u65B0\u65F6\u95F4 "),n(i,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"end_time"},{default:s(a=>[c("span",null,d(a.row.end_time||"-"),1)]),_:1},8,["label"]),n(i,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"80",prop:"total_time_label"},{default:s(a=>[c("span",null,d(a.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(i,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:s(a=>[l(" <span>{{ scope.row.status || '-' }}</span> "),n(m,{value:a.row.status},null,8,["value"])]),_:1},8,["label"]),n(i,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:s(a=>[c("span",null,d(a.row.result||"-"),1)]),_:1},8,["label"]),l(" \u64CD\u4F5C "),l(` <el-table-column
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
      </el-table-column> `)]),_:1},8,["data"]),l(" \u7F16\u8F91\u6846 "),l(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const T=_(R,[["render",V]]),A={name:"log-scheduler-list",props:{},components:{DataTable:T},data(){return{list:[],total:0,page:1,size:20,keywords:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let e={ticket:this.ticket,page:this.page,size:this.size,keywords:this.keywords};const t=await this.$http.getAsyncTaskLogList(e);t.code==0&&(this.list=t.data.list,this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearAsyncTaskLogList();t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.getData()}},B={class:"app-container"},U={class:"flex justify-end mb-sm"};function E(e,t,p,D,r,u){const i=o("Delete"),m=o("el-icon"),h=o("el-link"),a=o("el-popconfirm"),y=o("Refresh"),k=o("DataTable"),S=o("el-pagination"),C=v("loading");return b(),w("div",B,[l(" \u64CD\u4F5C\u6309\u94AE "),l(' <div class="margin-bottom--20"> '),l(` <el-button
        type="primary"
        @click="handleAddRow"
        >\u6DFB\u52A0</el-button
      > `),l(` <el-input
          class="ml-sm"
          style="width: 260px"
          v-model="keyword"
          placeholder="\u8F93\u5165\u57DF\u540D"
          @keypress.enter="handleSearch"
        >
          <template #append>
            <el-button @click="handleSearch">
              <el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
    </div> `),c("div",U,[t[2]||(t[2]=c("div",null,null,-1)),n(a,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:u.handleBatchDeleteConfirm},{reference:s(()=>[n(h,{underline:!1,type:"danger",class:"mr-sm"},{default:s(()=>[n(m,null,{default:s(()=>[n(i)]),_:1}),f(d(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"]),n(h,{underline:!1,type:"primary",disabled:r.loading,onClick:u.getData},{default:s(()=>[n(m,null,{default:s(()=>[n(y)]),_:1}),f(d(e.$t("\u5237\u65B0")),1)]),_:1},8,["disabled","onClick"])]),l(" \u6570\u636E\u5217\u8868 "),z(n(k,{list:r.list,onOnSuccess:u.resetData},null,8,["list","onOnSuccess"]),[[C,r.loading]]),l(" \u7FFB\u9875 "),n(S,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:r.total,"page-size":r.size,"onUpdate:pageSize":t[0]||(t[0]=g=>r.size=g),"current-page":r.page,"onUpdate:currentPage":t[1]||(t[1]=g=>r.page=g),onCurrentChange:u.getData,onSizeChange:u.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),l(" \u7F16\u8F91\u6846 "),l(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const j=_(A,[["render",E]]);export{j as default};
