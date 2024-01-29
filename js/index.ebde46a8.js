import{C as M}from"./ConnectStatus.0553be0f.js";import{_ as y}from"./index.1e38ba03.js";import{ah as d,o as z,c as v,V as n,P as o,a as r,U as p,S as i,ar as B,Q as R,T as C}from"./vendor-vue.cefe3aef.js";import{M as T}from"./monitor-status-enums.c776840f.js";import"./element-plus.4ffcce52.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.673ea722.js";const x={name:"",components:{ConnectStatus:M},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const l=await this.$http.function(t);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},async handleStatusChange(e){let t={id:e.id};const l=await this.$http.function(t);l.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(l.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function F(e,t,l,k,s,h){const c=d("el-table-column"),u=d("ConnectStatus"),g=d("el-table");return z(),v("div",null,[n(g,{data:l.list,stripe:"",border:""},{default:o(()=>[n(c,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:o(a=>[r("span",null,p(a.$index+1),1)]),_:1},8,["label"]),i(" \u72B6\u6001 "),i(" \u521B\u5EFA\u65F6\u95F4 "),n(c,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"180"},{default:o(a=>[r("span",null,p(a.row.create_time||"-"),1)]),_:1},8,["label"]),i(" \u66F4\u65B0\u65F6\u95F4 "),n(c,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time",width:"180"},{default:o(a=>[r("span",null,p(a.row.update_time||"-"),1)]),_:1},8,["label"]),n(c,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"100",prop:"total_time_label"},{default:o(a=>[r("span",null,p(a.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(c,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:o(a=>[i(" <span>{{ scope.row.status || '-' }}</span> "),n(u,{value:a.row.status_value},null,8,["value"])]),_:1},8,["label"]),n(c,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:o(a=>[r("span",null,p(a.row.result||"-"),1)]),_:1},8,["label"]),i(" \u64CD\u4F5C "),i(` <el-table-column
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
      </el-table-column> `)]),_:1},8,["data"]),i(" \u7F16\u8F91\u6846 "),i(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const U=y(x,[["render",F]]),A={name:"log-scheduler-list",props:{monitorId:{type:String,default:null}},components:{DataTable:U},data(){return{list:[],total:0,page:1,size:20,keywords:"",detail:{},loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData(),this.getMonitorData()},refreshData(){this.getData()},async getMonitorData(){let e={monitor_id:this.monitorId};const t=await this.$http.getMonitorById(e);t.ok&&(this.detail=t.data)},async getData(){this.loading=!0;let e={monitor_id:this.monitorId,page:this.page,size:this.size};const t=await this.$http.getLogMonitorList(e);t.code==0&&(this.list=t.data.list.map(l=>(l.status_value=T(l.status),l)),this.total=t.data.total),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogMonitor({monitor_id:this.monitorId});t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}}},created(){this.loadPageSize(),this.resetData()}},E={class:"app-container"},N={class:"flex justify-between mb-sm"},P={class:"flex items-center"},L=r("span",{class:"color--info"},"\u76D1\u63A7\u540D\u79F0: ",-1),j={class:"ml-sm"},O=r("span",{class:"ml-md color--info"},"\u76D1\u63A7\u8BF7\u6C42: ",-1),Q={class:"ml-sm"};function q(e,t,l,k,s,h){var _,f,b,w,D;const c=d("el-link"),u=d("Delete"),g=d("el-icon"),a=d("el-popconfirm"),$=d("DataTable"),V=d("el-pagination"),I=B("loading");return z(),v("div",E,[r("div",N,[r("div",P,[L,r("span",j,p((_=s.detail)==null?void 0:_.title),1),O,r("span",Q,p((b=(f=s.detail)==null?void 0:f.content)==null?void 0:b.method),1),n(c,{class:"ml-sm",underline:!1,type:"primary",href:(D=(w=s.detail)==null?void 0:w.content)==null?void 0:D.url,target:"_blank"},{default:o(()=>{var m,S;return[C(p((S=(m=s.detail)==null?void 0:m.content)==null?void 0:S.url),1)]}),_:1},8,["href"])]),n(a,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:h.handleBatchDeleteConfirm},{reference:o(()=>[n(c,{underline:!1,type:"danger",class:"mr-sm"},{default:o(()=>[n(g,null,{default:o(()=>[n(u)]),_:1}),C(p(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),i(" \u6570\u636E\u5217\u8868 "),R(n($,{list:s.list,onOnSuccess:h.resetData},null,8,["list","onOnSuccess"]),[[I,s.loading]]),i(" \u7FFB\u9875 "),n(V,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:s.total,"page-size":s.size,"onUpdate:pageSize":t[0]||(t[0]=m=>s.size=m),"current-page":s.page,"onUpdate:currentPage":t[1]||(t[1]=m=>s.page=m),onCurrentChange:h.getData,onSizeChange:h.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),i(" \u7F16\u8F91\u6846 "),i(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const Z=y(A,[["render",q]]);export{Z as default};
