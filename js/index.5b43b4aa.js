import{H as v}from"./highlight-lib.ebf3907c.js";import{C as $}from"./ConnectStatus.e335c2ac.js";import{_ as y}from"./index.a3e2cc81.js";import{al as d,o as m,c as f,L as s,Q as n,I as a,a as c,P as z,O as u,H as V,ar as R,J as T,M as S}from"./vendor-vue.872ec2a8.js";import{h as O}from"./highlight-util.6edc97d1.js";import"./element-plus.39304440.js";import"./element-icon.0ab2c14a.js";import"./vendor-lib.5a71f1ae.js";const A={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(e){this.$emit("update:visible",e)}}},methods:{handleClose(){this.dialogVisible=!1},handleOpen(){this.dialogVisible=!0},handleSuccess(){this.handleClose()},handleDialogClose(){this.$emit("on-success")}},created(){}},F={style:{"max-height":"600px","overflow-y":"auto"}},B=["innerHTML"];function L(e,t,i,_,o,p){const r=d("el-dialog");return m(),f(z,null,[s(" \u7F16\u8F91\u6846 "),n(r,{title:"\u53C2\u6570\u8BE6\u60C5",modelValue:p.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=h=>p.dialogVisible=h),width:"800px",center:"","append-to-body":"","lock-scroll":!1,onClose:p.handleDialogClose},{default:a(()=>[c("div",F,[c("pre",null,[c("code",{class:"language-json",innerHTML:i.row.params},null,8,B)])])]),_:1},8,["modelValue","onClose"])],2112)}const P=y(A,[["render",L]]),N={name:"",components:{ConnectStatus:$,DataFormParamsDialog:P},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const i=await this.$http.function(t);i.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(i.msg)},async handleStatusChange(e){let t={id:e.id};const i=await this.$http.function(t);i.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(i.msg)},handleUpdateSuccess(){this.$emit("on-success")},handleShowDetail(e){this.currentRow=e,this.dialogVisible=!0}},mounted(){v.highlightAll()},created(){}},U={key:1};function j(e,t,i,_,o,p){const r=d("el-table-column"),h=d("ConnectStatus"),g=d("el-link"),b=d("el-table"),w=d("DataFormParamsDialog");return m(),f("div",null,[n(b,{data:i.list,stripe:"",border:""},{default:a(()=>[n(r,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:a(l=>[c("span",null,u(l.$index+1),1)]),_:1},8,["label"]),n(r,{label:e.$t("\u7528\u6237"),"header-align":"center",align:"center",prop:"create_time",width:"140"},{default:a(l=>[c("span",null,u(l.row.user_name||"-"),1)]),_:1},8,["label"]),s(" \u72B6\u6001 "),n(r,{label:e.$t("\u4EFB\u52A1\u540D\u79F0"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:a(l=>[c("span",null,u(l.row.task_name||"-"),1)]),_:1},8,["label"]),s(" \u521B\u5EFA\u65F6\u95F4 "),n(r,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"create_time"},{default:a(l=>[c("span",null,u(l.row.start_time||"-"),1)]),_:1},8,["label"]),s(" \u66F4\u65B0\u65F6\u95F4 "),n(r,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",width:"180",prop:"end_time"},{default:a(l=>[c("span",null,u(l.row.end_time||"-"),1)]),_:1},8,["label"]),n(r,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"80",prop:"total_time_label"},{default:a(l=>[c("span",null,u(l.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(r,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:a(l=>[s(" <span>{{ scope.row.status || '-' }}</span> "),n(h,{value:l.row.status},null,8,["value"])]),_:1},8,["label"]),n(r,{label:e.$t("\u53C2\u6570"),"header-align":"center",align:"center",prop:"params",width:"60"},{default:a(l=>[l.row.params?(m(),V(g,{key:0,underline:!1,onClick:k=>p.handleShowDetail(l.row)},{default:a(()=>t[1]||(t[1]=[c("span",null,"\u67E5\u770B",-1)])),_:2,__:[1]},1032,["onClick"])):(m(),f("span",U,"-"))]),_:1},8,["label"]),n(r,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:a(l=>[c("span",null,u(l.row.result||"-"),1)]),_:1},8,["label"]),s(" \u64CD\u4F5C "),s(` <el-table-column
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
    ></DataFormDailog> `),n(w,{visible:o.dialogVisible,"onUpdate:visible":t[0]||(t[0]=l=>o.dialogVisible=l),row:o.currentRow,onOnSuccess:e.handleSuccess},null,8,["visible","row","onOnSuccess"])])}const H=y(N,[["render",j]]),x={name:"log-scheduler-list",props:{},components:{DataTable:H},data(){return{list:[],total:0,page:1,size:20,keywords:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let e={ticket:this.ticket,page:this.page,size:this.size,keywords:this.keywords};const t=await this.$http.getAsyncTaskLogList(e);t.code==0&&(this.list=t.data.list.map(i=>{try{i.params=JSON.stringify(JSON.parse(i.params),null,2)}catch{}return i.params=O(i.params,{language:"json"}).value,i}),this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearAsyncTaskLogList();t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.getData()}},E={class:"app-container"},I={class:"flex justify-end mb-sm"};function J(e,t,i,_,o,p){const r=d("Delete"),h=d("el-icon"),g=d("el-link"),b=d("el-popconfirm"),w=d("Refresh"),l=d("DataTable"),k=d("el-pagination"),C=R("loading");return m(),f("div",E,[s(" \u64CD\u4F5C\u6309\u94AE "),s(' <div class="margin-bottom--20"> '),s(` <el-button
        type="primary"
        @click="handleAddRow"
        >\u6DFB\u52A0</el-button
      > `),s(` <el-input
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
    </div> `),c("div",I,[t[2]||(t[2]=c("div",null,null,-1)),n(b,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:p.handleBatchDeleteConfirm},{reference:a(()=>[n(g,{underline:!1,type:"danger",class:"mr-sm"},{default:a(()=>[n(h,null,{default:a(()=>[n(r)]),_:1}),S(u(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"]),n(g,{underline:!1,type:"primary",disabled:o.loading,onClick:p.getData},{default:a(()=>[n(h,null,{default:a(()=>[n(w)]),_:1}),S(u(e.$t("\u5237\u65B0")),1)]),_:1},8,["disabled","onClick"])]),s(" \u6570\u636E\u5217\u8868 "),T(n(l,{list:o.list,onOnSuccess:p.resetData},null,8,["list","onOnSuccess"]),[[C,o.loading]]),s(" \u7FFB\u9875 "),n(k,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:pageSize":t[0]||(t[0]=D=>o.size=D),"current-page":o.page,"onUpdate:currentPage":t[1]||(t[1]=D=>o.page=D),onCurrentChange:p.getData,onSizeChange:p.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),s(" \u7F16\u8F91\u6846 "),s(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const Z=y(x,[["render",J]]);export{Z as default};
