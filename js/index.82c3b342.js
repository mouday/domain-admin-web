import{C as E}from"./ConnectStatus.5eda1e79.js";import{_ as b}from"./index.92b6fe80.js";import{ag as r,o as _,c as y,P as n,H as l,a as o,M as c,K as d,aq as L,G as x,I,Q as R,L as f}from"./vendor-vue.5e429edb.js";import{i as N}from"./index.ef9dbd1f.js";import{M as P}from"./monitor-status-enums.dac7cbf3.js";import"./element-plus.af1c8bed.js";import"./element-icon.65c0b9c3.js";import"./vendor-lib.cd48dffd.js";const O={name:"",components:{ConnectStatus:E},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(e){this.currentRow=e,this.dialogVisible=!0},async handleDeleteClick(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},async handleStatusChange(e){let t={id:e.id};const s=await this.$http.function(t);s.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(s.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function j(e,t,s,g,a,p){const h=r("el-table-column"),w=r("ConnectStatus"),u=r("el-table");return _(),y("div",null,[n(u,{data:s.list,stripe:"",border:""},{default:l(()=>[n(h,{label:e.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:l(i=>[o("span",null,c(i.$index+1),1)]),_:1},8,["label"]),d(" \u72B6\u6001 "),d(" \u521B\u5EFA\u65F6\u95F4 "),n(h,{label:e.$t("\u5F00\u59CB\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"180"},{default:l(i=>[o("span",null,c(i.row.create_time||"-"),1)]),_:1},8,["label"]),d(" \u66F4\u65B0\u65F6\u95F4 "),n(h,{label:e.$t("\u7ED3\u675F\u65F6\u95F4"),"header-align":"center",align:"center",prop:"update_time",width:"180"},{default:l(i=>[o("span",null,c(i.row.update_time||"-"),1)]),_:1},8,["label"]),n(h,{label:e.$t("\u6301\u7EED\u65F6\u95F4"),"header-align":"center",align:"center",width:"100",prop:"total_time_label"},{default:l(i=>[o("span",null,c(i.row.total_time_label||"-"),1)]),_:1},8,["label"]),n(h,{label:e.$t("\u72B6\u6001"),"header-align":"center",align:"center",prop:"status",width:"60"},{default:l(i=>[d(" <span>{{ scope.row.status || '-' }}</span> "),n(w,{value:i.row.status_value},null,8,["value"])]),_:1},8,["label"]),n(h,{label:e.$t("\u6267\u884C\u7ED3\u679C"),"header-align":"center",align:"center",prop:"status"},{default:l(i=>[o("span",null,c(i.row.result||"-"),1)]),_:1},8,["label"]),d(" \u64CD\u4F5C "),d(` <el-table-column
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
      </el-table-column> `)]),_:1},8,["data"]),d(" \u7F16\u8F91\u6846 "),d(` <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> `)])}const q=b(O,[["render",j]]);const G={name:"DataChart",props:{},components:{},data(){return{myChart:null}},computed:{},methods:{refreshData(e){const t="#67c23a",s="#f56c6c";let g=e.map(a=>({value:a.total_microsecond_time,label:a.create_time_label,valueColor:a.status==1?t:s})).reverse();this.getData(g)},async getData(e){this.myChart||(this.myChart=N(this.$refs.chart));let t={xAxis:{name:"\u68C0\u6D4B\u65F6\u95F4",type:"category",data:e.map(s=>s.label)},yAxis:{type:"value",name:"\u54CD\u5E94\u65F6\u95F4\uFF08\u6BEB\u79D2\uFF09"},series:[{type:"bar",data:e.map(s=>s.value),itemStyle:{color:function(s){return console.log(e[s.dataIndex]),e[s.dataIndex].valueColor}}}]};this.myChart.setOption(t)}},mounted(){},created(){}},H={class:"log-monitor-list__DataChart",ref:"chart"};function K(e,t,s,g,a,p){return _(),y("div",H,null,512)}const Q=b(G,[["render",K]]);const J={name:"log-scheduler-list",props:{monitorId:{type:String,default:null}},components:{DataTable:q,DataChart:Q},data(){return{list:[],total:0,page:1,size:20,keywords:"",detail:{},loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize",showMode:"chart",timer:null}},computed:{},methods:{async resetData(){this.page=1,this.list=[],await this.refreshData()},async refreshData(){await this.getData(),await this.getMonitorData()},async getMonitorData(){let e={monitor_id:this.monitorId};const t=await this.$http.getMonitorById(e);t.ok&&(this.detail=t.data)},async getData(){this.loading=!0;let e={monitor_id:this.monitorId,page:this.page,size:this.size};const t=await this.$http.getLogMonitorList(e);t.code==0&&(this.list=t.data.list.map(s=>(s.status_value=P(s.status),s)),this.total=t.data.total),this.handleRefreshChart(),this.loading=!1},handleRefreshChart(){this.$refs.DataChart&&this.$refs.DataChart.refreshData(this.list)},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSizeChange(e){localStorage.setItem(this.pageSizeCachekey,e),this.resetData()},loadPageSize(){let e=localStorage.getItem(this.pageSizeCachekey);e&&(this.size=parseInt(e))},async handleBatchDeleteConfirm(){let e=this.$loading({fullscreen:!0});try{const t=await this.$http.clearLogMonitor({monitor_id:this.monitorId});t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(t.msg)}catch(t){console.log(t)}finally{this.$nextTick(()=>{e.close()})}},handleChangeShowMode(e){this.showMode=e}},beforeUnmount(){this.timer&&(clearInterval(this.timer),this.timer=null)},mounted(){this.timer=setInterval(()=>{this.refreshData()},1e3*30),this.resetData()},created(){this.loadPageSize()}},W={class:"app-container"},X={class:"flex justify-between mb-sm"},Y={class:"flex items-center"},Z={class:"ml-sm whitespace-nowrap"},ee={class:"ml-sm"},te={class:"check-url"},ae={class:"flex items-center"},ne={class:"color--info text-sm whitespace-nowrap"};function se(e,t,s,g,a,p){var D,v,S,k,$,z;const h=r("el-link"),w=r("DataAnalysis"),u=r("el-icon"),i=r("Tickets"),V=r("Delete"),A=r("el-popconfirm"),B=r("Refresh"),T=r("DataChart"),F=r("DataTable"),U=r("el-pagination"),C=L("loading");return _(),y("div",W,[o("div",X,[o("div",Y,[t[4]||(t[4]=o("span",{class:"color--info whitespace-nowrap"},"\u76D1\u63A7\u540D\u79F0: ",-1)),o("span",Z,c((D=a.detail)==null?void 0:D.title),1),t[5]||(t[5]=o("span",{class:"ml-md color--info whitespace-nowrap"},"\u76D1\u63A7\u8BF7\u6C42: ",-1)),o("span",ee,c((S=(v=a.detail)==null?void 0:v.content)==null?void 0:S.method),1),n(h,{class:"ml-sm",underline:!1,type:"primary",href:($=(k=a.detail)==null?void 0:k.content)==null?void 0:$.url,target:"_blank"},{default:l(()=>{var m,M;return[o("span",te,c((M=(m=a.detail)==null?void 0:m.content)==null?void 0:M.url),1)]}),_:1},8,["href"])]),o("div",ae,[o("span",ne,"\u4E0B\u6B21\u8FD0\u884C\u65F6\u95F4\uFF1A"+c(((z=a.detail)==null?void 0:z.next_run_time)||"-"),1),a.showMode=="table"?(_(),x(h,{key:0,underline:!1,type:"primary",class:"ml-sm",onClick:t[0]||(t[0]=m=>p.handleChangeShowMode("chart"))},{default:l(()=>[n(u,null,{default:l(()=>[n(w)]),_:1}),f(c(e.$t("\u56FE\u8868")),1)]),_:1})):(_(),x(h,{key:1,underline:!1,type:"primary",class:"ml-sm whitespace-nowrap",onClick:t[1]||(t[1]=m=>p.handleChangeShowMode("table"))},{default:l(()=>[n(u,null,{default:l(()=>[n(i)]),_:1}),f(c(e.$t("\u6570\u636E")),1)]),_:1})),n(A,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:p.handleBatchDeleteConfirm},{reference:l(()=>[n(h,{underline:!1,type:"danger",class:"ml-sm whitespace-nowrap"},{default:l(()=>[n(u,null,{default:l(()=>[n(V)]),_:1}),f(c(e.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"]),n(h,{underline:!1,type:"primary",class:"ml-sm whitespace-nowrap",disabled:a.loading,onClick:p.getData},{default:l(()=>[n(u,null,{default:l(()=>[n(B)]),_:1}),f(c(e.$t("\u5237\u65B0")),1)]),_:1},8,["disabled","onClick"])])]),d(" \u6570\u636E\u56FE\u8868 "),I(n(T,{ref:"DataChart"},null,512),[[R,a.showMode=="chart"],[C,a.loading]]),d(" \u6570\u636E\u5217\u8868 "),I(n(F,{list:a.list,onOnSuccess:p.resetData},null,8,["list","onOnSuccess"]),[[R,a.showMode=="table"],[C,a.loading]]),d(" \u7FFB\u9875 "),n(U,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:a.total,"page-size":a.size,"onUpdate:pageSize":t[2]||(t[2]=m=>a.size=m),"current-page":a.page,"onUpdate:currentPage":t[3]||(t[3]=m=>a.page=m),onCurrentChange:p.getData,onSizeChange:p.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),d(" \u7F16\u8F91\u6846 "),d(` <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> `)])}const me=b(J,[["render",se],["__scopeId","data-v-8882f9a2"]]);export{me as default};
