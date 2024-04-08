import{C}from"./ConnectStatus.c6726ae8.js";import{_}from"./index.b24d3117.js";import{ah as o,o as f,c as b,V as a,P as i,a as d,U as p,S as n,ar as k,Q as $,T as v}from"./vendor-vue.cefe3aef.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const z={name:"",components:{ConnectStatus:C},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},async handleStatusChange(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function V(e,t,s,w,r,u){const c=o("el-table-column"),h=o("ConnectStatus"),m=o("el-table");return f(),b("div",null,[a(m,{data:s.list,stripe:"",border:""},{default:i(()=>[a(c,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:i(l=>[d("span",null,p(l.$index+1),1)]),_:1},8,["label"]),n(" \u72B6\u6001 "),n(" \u521B\u5EFA\u65F6\u95F4 "),a(c,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time"},{default:i(l=>[d("span",null,p(l.row.create_time||"-"),1)]),_:1},8,["label"]),n(" \u66F4\u65B0\u65F6\u95F4 "),a(c,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time"},{default:i(l=>[d("span",null,p(l.row.update_time||"-"),1)]),_:1},8,["label"]),a(c,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",prop:"total_time_label"},{default:i(l=>[d("span",null,p(l.row.total_time_label||"-"),1)]),_:1},8,["label"]),a(c,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:i(l=>[n(" <span>{{ scope.row.status || '-' }}</span> "),a(h,{value:l.row.status},null,8,["value"])]),_:1},8,["label"]),a(c,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:i(l=>[d("span",null,p(l.row.error_message||"-"),1)]),_:1},8,["label"]),n(" \u64CD\u4F5C "),n(` <el-table-column
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
      </el-table-column> `)]),_:1},8,["data"]),n(" \u7F16\u8F91\u6846 "),n(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const R=_(z,[["render",V]]),T={name:"log-scheduler-list",props:{},components:{DataTable:R},data(){return{list:[],total:0,page:1,size:20,keywords:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let e={ticket:this.ticket,page:this.page,size:this.size,keywords:this.keywords};const t=await this.$http.getLogSchedulerList(e);t.code==0&&(this.list=t.data.list.map(s=>(s.status==!1&&(s.status=null),s)),this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogSchedulerList();t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.getData()}},x={class:"app-container"},A={class:"flex justify-between mb-sm"},B=d("div",null,null,-1);function U(e,t,s,w,r,u){const c=o("Delete"),h=o("el-icon"),m=o("el-link"),l=o("el-popconfirm"),D=o("DataTable"),S=o("el-pagination"),y=k("loading");return f(),b("div",x,[n(" \u64CD\u4F5C\u6309\u94AE "),n(' <div class="margin-bottom--20"> '),n(` <el-button
        type="primary"
        @click="handleAddRow"
        >\u6DFB\u52A0</el-button
      > `),n(` <el-input
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
    </div> `),d("div",A,[B,a(l,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:u.handleBatchDeleteConfirm},{reference:i(()=>[a(m,{underline:!1,type:"danger",class:"mr-sm"},{default:i(()=>[a(h,null,{default:i(()=>[a(c)]),_:1}),v(p(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),n(" \u6570\u636E\u5217\u8868 "),$(a(D,{list:r.list,onOnSuccess:u.resetData},null,8,["list","onOnSuccess"]),[[y,r.loading]]),n(" \u7FFB\u9875 "),a(S,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:r.total,"page-size":r.size,"onUpdate:pageSize":t[0]||(t[0]=g=>r.size=g),"current-page":r.page,"onUpdate:currentPage":t[1]||(t[1]=g=>r.page=g),onCurrentChange:u.getData,onSizeChange:u.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),n(" \u7F16\u8F91\u6846 "),n(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const j=_(T,[["render",U]]);export{j as default};
