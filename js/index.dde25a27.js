import{C as F}from"./ConnectStatus.f565c260.js";import{_ as C}from"./index.c66c262b.js";import{ah as r,o as g,c as D,V as l,P as s,a as c,U as h,S as i,ar as U,O as M,Q as V,W as x,T as f}from"./vendor-vue.cefe3aef.js";import{i as E}from"./index.afa609c1.js";import{M as N}from"./monitor-status-enums.aed1a525.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const O={name:"",components:{ConnectStatus:F},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const a=await this.$http.function(t);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(e){let t={id:e.id};const a=await this.$http.function(t);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function P(e,t,a,_,n,p){const d=r("el-table-column"),b=r("ConnectStatus"),u=r("el-table");return g(),D("div",null,[l(u,{data:a.list,stripe:"",border:""},{default:s(()=>[l(d,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:s(o=>[c("span",null,h(o.$index+1),1)]),_:1},8,["label"]),i(" \u72B6\u6001 "),i(" \u521B\u5EFA\u65F6\u95F4 "),l(d,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"180"},{default:s(o=>[c("span",null,h(o.row.create_time||"-"),1)]),_:1},8,["label"]),i(" \u66F4\u65B0\u65F6\u95F4 "),l(d,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time",width:"180"},{default:s(o=>[c("span",null,h(o.row.update_time||"-"),1)]),_:1},8,["label"]),l(d,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"100",prop:"total_time_label"},{default:s(o=>[c("span",null,h(o.row.total_time_label||"-"),1)]),_:1},8,["label"]),l(d,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:s(o=>[i(" <span>{{ scope.row.status || '-' }}</span> "),l(b,{value:o.row.status_value},null,8,["value"])]),_:1},8,["label"]),l(d,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:s(o=>[c("span",null,h(o.row.result||"-"),1)]),_:1},8,["label"]),i(" \u64CD\u4F5C "),i(` <el-table-column
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
    ></DataFormDailog> `)])}const L=C(O,[["render",P]]);const j={name:"DataChart",props:{},components:{},data(){return{myChart:null}},computed:{},methods:{refreshData(e){const t="#67c23a",a="#f56c6c";let _=e.map(n=>({value:n.total_microsecond_time,label:n.create_time_label,valueColor:n.status==1?t:a})).reverse();this.getData(_)},async getData(e){this.myChart||(this.myChart=E(this.$refs.chart));let t={xAxis:{name:"\u68C0\u6D4B\u65F6\u95F4",type:"category",data:e.map(a=>a.label)},yAxis:{type:"value",name:"\u54CD\u5E94\u65F6\u95F4\uFF08\u6BEB\u79D2\uFF09"},series:[{type:"bar",data:e.map(a=>a.value),itemStyle:{color:function(a){return console.log(e[a.dataIndex]),e[a.dataIndex].valueColor}}}]};this.myChart.setOption(t)}},mounted(){},created(){}},Q={class:"log-monitor-list__DataChart",ref:"chart"};function W(e,t,a,_,n,p){return g(),D("div",Q,null,512)}const q=C(j,[["render",W]]),G={name:"log-scheduler-list",props:{monitorId:{type:String,default:null}},components:{DataTable:L,DataChart:q},data(){return{list:[],total:0,page:1,size:20,keywords:"",detail:{},loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize",showMode:"chart"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData(),this.getMonitorData()},refreshData(){this.getData()},async getMonitorData(){let e={monitor_id:this.monitorId};const t=await this.$http.getMonitorById(e);t.ok&&(this.detail=t.data)},async getData(){this.loading=!0;let e={monitor_id:this.monitorId,page:this.page,size:this.size};const t=await this.$http.getLogMonitorList(e);t.code==0&&(this.list=t.data.list.map(a=>(a.status_value=N(a.status),a)),this.total=t.data.total),this.handleRefreshChart(),this.loading=!1},handleRefreshChart(){this.$refs.DataChart&&this.$refs.DataChart.refreshData(this.list)},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogMonitor({monitor_id:this.monitorId});t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}},handleChangeShowMode(e){this.showMode=e}},mounted(){this.resetData()},created(){this.loadPageSize()}},H={class:"app-container"},J={class:"flex justify-between mb-sm"},K={class:"flex items-center"},X=c("span",{class:"color--info"},"\u76D1\u63A7\u540D\u79F0: ",-1),Y={class:"ml-sm"},Z=c("span",{class:"ml-md color--info"},"\u76D1\u63A7\u8BF7\u6C42: ",-1),ee={class:"ml-sm"};function te(e,t,a,_,n,p){var w,S,v,$,k;const d=r("el-link"),b=r("DataAnalysis"),u=r("el-icon"),o=r("Tickets"),I=r("Delete"),A=r("el-popconfirm"),R=r("DataChart"),T=r("DataTable"),B=r("el-pagination"),y=U("loading");return g(),D("div",H,[c("div",J,[c("div",K,[X,c("span",Y,h((w=n.detail)==null?void 0:w.title),1),Z,c("span",ee,h((v=(S=n.detail)==null?void 0:S.content)==null?void 0:v.method),1),l(d,{class:"ml-sm",underline:!1,type:"primary",href:(k=($=n.detail)==null?void 0:$.content)==null?void 0:k.url,target:"_blank"},{default:s(()=>{var m,z;return[f(h((z=(m=n.detail)==null?void 0:m.content)==null?void 0:z.url),1)]}),_:1},8,["href"])]),c("div",null,[n.showMode=="table"?(g(),M(d,{key:0,underline:!1,type:"primary",class:"mr-sm",onClick:t[0]||(t[0]=m=>p.handleChangeShowMode("chart"))},{default:s(()=>[l(u,null,{default:s(()=>[l(b)]),_:1}),f(h(e.$t("\u56FE\u8868")),1)]),_:1})):(g(),M(d,{key:1,underline:!1,type:"primary",class:"mr-sm",onClick:t[1]||(t[1]=m=>p.handleChangeShowMode("table"))},{default:s(()=>[l(u,null,{default:s(()=>[l(o)]),_:1}),f(h(e.$t("\u6570\u636E")),1)]),_:1})),l(A,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:p.handleBatchDeleteConfirm},{reference:s(()=>[l(d,{underline:!1,type:"danger",class:"mr-sm"},{default:s(()=>[l(u,null,{default:s(()=>[l(I)]),_:1}),f(h(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])])]),i(" \u6570\u636E\u56FE\u8868 "),V(l(R,{ref:"DataChart"},null,512),[[x,n.showMode=="chart"],[y,n.loading]]),i(" \u6570\u636E\u5217\u8868 "),V(l(T,{list:n.list,onOnSuccess:p.resetData},null,8,["list","onOnSuccess"]),[[x,n.showMode=="table"],[y,n.loading]]),i(" \u7FFB\u9875 "),l(B,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":t[2]||(t[2]=m=>n.size=m),"current-page":n.page,"onUpdate:currentPage":t[3]||(t[3]=m=>n.page=m),onCurrentChange:p.getData,onSizeChange:p.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),i(" \u7F16\u8F91\u6846 "),i(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const de=C(G,[["render",te]]);export{de as default};
