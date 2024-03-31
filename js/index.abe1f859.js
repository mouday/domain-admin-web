import{C as F}from"./ConnectStatus.a517ecde.js";import{_ as C}from"./index.6fb0bf74.js";import{ah as c,o as g,c as y,V as s,P as l,a as r,U as d,S as i,ar as E,O as x,Q as I,W as V,T as f}from"./vendor-vue.cefe3aef.js";import{i as N}from"./index.afa609c1.js";import{M as O}from"./monitor-status-enums.014616d9.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const P={name:"",components:{ConnectStatus:F},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const a=await this.$http.function(t);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},async handleStatusChange(e){let t={id:e.id};const a=await this.$http.function(t);a.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(a.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function L(e,t,a,_,n,m){const h=c("el-table-column"),b=c("ConnectStatus"),u=c("el-table");return g(),y("div",null,[s(u,{data:a.list,stripe:"",border:""},{default:l(()=>[s(h,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:l(o=>[r("span",null,d(o.$index+1),1)]),_:1},8,["label"]),i(" \u72B6\u6001 "),i(" \u521B\u5EFA\u65F6\u95F4 "),s(h,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"180"},{default:l(o=>[r("span",null,d(o.row.create_time||"-"),1)]),_:1},8,["label"]),i(" \u66F4\u65B0\u65F6\u95F4 "),s(h,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time",width:"180"},{default:l(o=>[r("span",null,d(o.row.update_time||"-"),1)]),_:1},8,["label"]),s(h,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"100",prop:"total_time_label"},{default:l(o=>[r("span",null,d(o.row.total_time_label||"-"),1)]),_:1},8,["label"]),s(h,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:l(o=>[i(" <span>{{ scope.row.status || '-' }}</span> "),s(b,{value:o.row.status_value},null,8,["value"])]),_:1},8,["label"]),s(h,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:l(o=>[r("span",null,d(o.row.result||"-"),1)]),_:1},8,["label"]),i(" \u64CD\u4F5C "),i(` <el-table-column
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
    ></DataFormDailog> `)])}const j=C(P,[["render",L]]);const Q={name:"DataChart",props:{},components:{},data(){return{myChart:null}},computed:{},methods:{refreshData(e){const t="#67c23a",a="#f56c6c";let _=e.map(n=>({value:n.total_microsecond_time,label:n.create_time_label,valueColor:n.status==1?t:a})).reverse();this.getData(_)},async getData(e){this.myChart||(this.myChart=N(this.$refs.chart));let t={xAxis:{name:"\u68C0\u6D4B\u65F6\u95F4",type:"category",data:e.map(a=>a.label)},yAxis:{type:"value",name:"\u54CD\u5E94\u65F6\u95F4\uFF08\u6BEB\u79D2\uFF09"},series:[{type:"bar",data:e.map(a=>a.value),itemStyle:{color:function(a){return console.log(e[a.dataIndex]),e[a.dataIndex].valueColor}}}]};this.myChart.setOption(t)}},mounted(){},created(){}},W={class:"log-monitor-list__DataChart",ref:"chart"};function q(e,t,a,_,n,m){return g(),y("div",W,null,512)}const G=C(Q,[["render",q]]),H={name:"log-scheduler-list",props:{monitorId:{type:String,default:null}},components:{DataTable:j,DataChart:G},data(){return{list:[],total:0,page:1,size:20,keywords:"",detail:{},loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize",showMode:"chart",timer:null}},computed:{},methods:{async resetData(){this.page=1,this.list=[],await this.refreshData()},async refreshData(){await this.getData(),await this.getMonitorData()},async getMonitorData(){let e={monitor_id:this.monitorId};const t=await this.$http.getMonitorById(e);t.ok&&(this.detail=t.data)},async getData(){this.loading=!0;let e={monitor_id:this.monitorId,page:this.page,size:this.size};const t=await this.$http.getLogMonitorList(e);t.code==0&&(this.list=t.data.list.map(a=>(a.status_value=O(a.status),a)),this.total=t.data.total),this.handleRefreshChart(),this.loading=!1},handleRefreshChart(){this.$refs.DataChart&&this.$refs.DataChart.refreshData(this.list)},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogMonitor({monitor_id:this.monitorId});t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}},handleChangeShowMode(e){this.showMode=e}},beforeUnmount(){this.timer&&(clearInterval(this.timer),this.timer=null)},mounted(){this.timer=setInterval(()=>{this.refreshData()},1e3*30),this.resetData()},created(){this.loadPageSize()}},J={class:"app-container"},K={class:"flex justify-between mb-sm"},X={class:"flex items-center"},Y=r("span",{class:"color--info"},"\u76D1\u63A7\u540D\u79F0: ",-1),Z={class:"ml-sm"},ee=r("span",{class:"ml-md color--info"},"\u76D1\u63A7\u8BF7\u6C42: ",-1),te={class:"ml-sm"},ae={class:"flex items-center"},ne={class:"color--info text-sm"};function se(e,t,a,_,n,m){var w,v,S,k,$,z;const h=c("el-link"),b=c("DataAnalysis"),u=c("el-icon"),o=c("Tickets"),A=c("Delete"),R=c("el-popconfirm"),T=c("DataChart"),B=c("DataTable"),U=c("el-pagination"),D=E("loading");return g(),y("div",J,[r("div",K,[r("div",X,[Y,r("span",Z,d((w=n.detail)==null?void 0:w.title),1),ee,r("span",te,d((S=(v=n.detail)==null?void 0:v.content)==null?void 0:S.method),1),s(h,{class:"ml-sm",underline:!1,type:"primary",href:($=(k=n.detail)==null?void 0:k.content)==null?void 0:$.url,target:"_blank"},{default:l(()=>{var p,M;return[f(d((M=(p=n.detail)==null?void 0:p.content)==null?void 0:M.url),1)]}),_:1},8,["href"])]),r("div",ae,[r("span",ne,"\u4E0B\u6B21\u8FD0\u884C\u65F6\u95F4\uFF1A"+d(((z=n.detail)==null?void 0:z.next_run_time)||"-"),1),n.showMode=="table"?(g(),x(h,{key:0,underline:!1,type:"primary",class:"ml-sm",onClick:t[0]||(t[0]=p=>m.handleChangeShowMode("chart"))},{default:l(()=>[s(u,null,{default:l(()=>[s(b)]),_:1}),f(d(e.$t("\u56FE\u8868")),1)]),_:1})):(g(),x(h,{key:1,underline:!1,type:"primary",class:"ml-sm",onClick:t[1]||(t[1]=p=>m.handleChangeShowMode("table"))},{default:l(()=>[s(u,null,{default:l(()=>[s(o)]),_:1}),f(d(e.$t("\u6570\u636E")),1)]),_:1})),s(R,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:m.handleBatchDeleteConfirm},{reference:l(()=>[s(h,{underline:!1,type:"danger",class:"ml-sm"},{default:l(()=>[s(u,null,{default:l(()=>[s(A)]),_:1}),f(d(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])])]),i(" \u6570\u636E\u56FE\u8868 "),I(s(T,{ref:"DataChart"},null,512),[[V,n.showMode=="chart"],[D,n.loading]]),i(" \u6570\u636E\u5217\u8868 "),I(s(B,{list:n.list,onOnSuccess:m.resetData},null,8,["list","onOnSuccess"]),[[V,n.showMode=="table"],[D,n.loading]]),i(" \u7FFB\u9875 "),s(U,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":t[2]||(t[2]=p=>n.size=p),"current-page":n.page,"onUpdate:currentPage":t[3]||(t[3]=p=>n.page=p),onCurrentChange:m.getData,onSizeChange:m.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),i(" \u7F16\u8F91\u6846 "),i(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const pe=C(H,[["render",se]]);export{pe as default};
