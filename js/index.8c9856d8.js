import{C as k}from"./ConnectStatus.eb2e9163.js";import{_}from"./index.998c7fb0.js";import{ah as r,o as f,c as b,V as a,P as s,a as o,U as p,S as l,ar as C,Q as $,T as v}from"./vendor-vue.cefe3aef.js";import"./element-plus.4ffcce52.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.673ea722.js";const z={name:"",components:{ConnectStatus:k},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const c=await this.$http.function(t);c.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(c.msg)},async handleStatusChange(e){let t={id:e.id};const c=await this.$http.function(t);c.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(c.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function V(e,t,c,w,d,h){const i=r("el-table-column"),m=r("ConnectStatus"),u=r("el-table");return f(),b("div",null,[a(u,{data:c.list,stripe:"",border:""},{default:s(()=>[a(i,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:s(n=>[o("span",null,p(n.$index+1),1)]),_:1},8,["label"]),a(i,{label:e.$t("\u7528\u6237"),"header-align":"center",align:"center",prop:"create_time",width:"140"},{default:s(n=>[o("span",null,p(n.row.user_name||"-"),1)]),_:1},8,["label"]),l(" \u72B6\u6001 "),a(i,{label:e.$t("\u4EFB\u52A1\u540D\u79F0"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:s(n=>[o("span",null,p(n.row.task_name||"-"),1)]),_:1},8,["label"]),l(" \u521B\u5EFA\u65F6\u95F4 "),a(i,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:s(n=>[o("span",null,p(n.row.start_time||"-"),1)]),_:1},8,["label"]),l(" \u66F4\u65B0\u65F6\u95F4 "),a(i,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"end_time"},{default:s(n=>[o("span",null,p(n.row.end_time||"-"),1)]),_:1},8,["label"]),a(i,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"80",prop:"total_time_label"},{default:s(n=>[o("span",null,p(n.row.total_time_label||"-"),1)]),_:1},8,["label"]),a(i,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:s(n=>[l(" <span>{{ scope.row.status || '-' }}</span> "),a(m,{value:n.row.status},null,8,["value"])]),_:1},8,["label"]),a(i,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:s(n=>[o("span",null,p(n.row.result||"-"),1)]),_:1},8,["label"]),l(" \u64CD\u4F5C "),l(` <el-table-column
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
    ></DataFormDailog> `)])}const T=_(z,[["render",V]]),A={name:"log-scheduler-list",props:{},components:{DataTable:T},data(){return{list:[],total:0,page:1,size:20,keywords:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let e={ticket:this.ticket,page:this.page,size:this.size,keywords:this.keywords};const t=await this.$http.getAsyncTaskLogList(e);t.code==0&&(this.list=t.data.list,this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearAsyncTaskLogList();t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.getData()}},R={class:"app-container"},B={class:"flex justify-between mb-sm"},U=o("div",null,null,-1);function E(e,t,c,w,d,h){const i=r("Delete"),m=r("el-icon"),u=r("el-link"),n=r("el-popconfirm"),D=r("DataTable"),y=r("el-pagination"),S=C("loading");return f(),b("div",R,[l(" \u64CD\u4F5C\u6309\u94AE "),l(' <div class="margin-bottom--20"> '),l(` <el-button
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
    </div> `),o("div",B,[U,a(n,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:h.handleBatchDeleteConfirm},{reference:s(()=>[a(u,{underline:!1,type:"danger",class:"mr-sm"},{default:s(()=>[a(m,null,{default:s(()=>[a(i)]),_:1}),v(p(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),l(" \u6570\u636E\u5217\u8868 "),$(a(D,{list:d.list,onOnSuccess:h.resetData},null,8,["list","onOnSuccess"]),[[S,d.loading]]),l(" \u7FFB\u9875 "),a(y,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:d.total,"page-size":d.size,"onUpdate:pageSize":t[0]||(t[0]=g=>d.size=g),"current-page":d.page,"onUpdate:currentPage":t[1]||(t[1]=g=>d.page=g),onCurrentChange:h.getData,onSizeChange:h.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),l(" \u7F16\u8F91\u6846 "),l(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const j=_(A,[["render",E]]);export{j as default};
