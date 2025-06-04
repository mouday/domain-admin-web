import{C as v}from"./ConnectStatus.d6fb2825.js";import{_}from"./index.8beb34c5.js";import{ag as o,o as b,c as w,P as n,H as i,a as d,M as p,K as a,aq as z,I as $,L as f}from"./vendor-vue.ad8ef945.js";import"./element-plus.c5ea6a8d.js";import"./element-icon.bd98fab2.js";import"./vendor-lib.58eb3e18.js";const V={name:"",components:{ConnectStatus:v},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},async handleStatusChange(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function R(e,t,s,D,r,u){const c=o("el-table-column"),m=o("ConnectStatus"),h=o("el-table");return b(),w("div",null,[n(h,{data:s.list,stripe:"",border:""},{default:i(()=>[n(c,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:i(l=>[d("span",null,p(l.$index+1),1)]),_:1},8,["label"]),a(" \u72B6\u6001 "),a(" \u521B\u5EFA\u65F6\u95F4 "),n(c,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time"},{default:i(l=>[d("span",null,p(l.row.create_time||"-"),1)]),_:1},8,["label"]),a(" \u66F4\u65B0\u65F6\u95F4 "),n(c,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time"},{default:i(l=>[d("span",null,p(l.row.update_time||"-"),1)]),_:1},8,["label"]),n(c,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",prop:"total_time_label"},{default:i(l=>[d("span",null,p(l.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(c,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:i(l=>[a(" <span>{{ scope.row.status || '-' }}</span> "),n(m,{value:l.row.status},null,8,["value"])]),_:1},8,["label"]),n(c,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:i(l=>[d("span",null,p(l.row.error_message||"-"),1)]),_:1},8,["label"]),a(" \u64CD\u4F5C "),a(` <el-table-column
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
      </el-table-column> `)]),_:1},8,["data"]),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const A=_(V,[["render",R]]),B={name:"log-scheduler-list",props:{},components:{DataTable:A},data(){return{list:[],total:0,page:1,size:20,keywords:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let e={ticket:this.ticket,page:this.page,size:this.size,keywords:this.keywords};const t=await this.$http.getLogSchedulerList(e);t.code==0&&(this.list=t.data.list.map(s=>(s.status==!1&&(s.status=null),s)),this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogSchedulerList();t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.getData()}},L={class:"app-container"},T={class:"flex justify-end mb-sm"};function x(e,t,s,D,r,u){const c=o("Delete"),m=o("el-icon"),h=o("el-link"),l=o("el-popconfirm"),S=o("Refresh"),y=o("DataTable"),C=o("el-pagination"),k=z("loading");return b(),w("div",L,[a(" \u64CD\u4F5C\u6309\u94AE "),a(' <div class="margin-bottom--20"> '),a(` <el-button
        type="primary"
        @click="handleAddRow"
        >\u6DFB\u52A0</el-button
      > `),a(` <el-input
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
    </div> `),d("div",T,[t[2]||(t[2]=d("div",null,null,-1)),n(l,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:u.handleBatchDeleteConfirm},{reference:i(()=>[n(h,{underline:!1,type:"danger",class:"mr-sm"},{default:i(()=>[n(m,null,{default:i(()=>[n(c)]),_:1}),f(p(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"]),n(h,{underline:!1,type:"primary",disabled:r.loading,onClick:u.getData},{default:i(()=>[n(m,null,{default:i(()=>[n(S)]),_:1}),f(p(e.$t("\u5237\u65B0")),1)]),_:1},8,["disabled","onClick"])]),a(" \u6570\u636E\u5217\u8868 "),$(n(y,{list:r.list,onOnSuccess:u.resetData},null,8,["list","onOnSuccess"]),[[k,r.loading]]),a(" \u7FFB\u9875 "),n(C,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:r.total,"page-size":r.size,"onUpdate:pageSize":t[0]||(t[0]=g=>r.size=g),"current-page":r.page,"onUpdate:currentPage":t[1]||(t[1]=g=>r.page=g),onCurrentChange:u.getData,onSizeChange:u.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),a(" \u7F16\u8F91\u6846 "),a(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const j=_(B,[["render",x]]);export{j as default};
