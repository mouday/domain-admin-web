import{D as V,a as O}from"./DataForm.5dec632e.js";import{_ as v}from"./index.e847462d.js";import{ai as o,o as f,c as S,R as s,U as e,O as a,M as R,F as x,a as m,T as h,aq as F,P as E,S as z}from"./vendor-vue.4528e1db.js";import"./element-plus.30d726c7.js";import"./element-icon.3215fc88.js";import"./vendor-lib.c9601dda.js";const T={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:V},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(i){this.$emit("update:visible",i)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function U(i,t,c,_,n,l){const d=o("DataForm"),g=o("el-dialog");return f(),S(x,null,[s(" \u7F16\u8F91\u6846 "),e(g,{title:l.dialogTitle,modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=u=>l.dialogVisible=u),width:"400px",center:"","append-to-body":""},{default:a(()=>[l.dialogVisible?(f(),R(d,{key:0,row:c.row,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):s("v-if",!0)]),_:1},8,["title","modelValue"])],2112)}const k=v(T,[["render",U]]),$={name:"",components:{DataFormDialog:k},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(i){this.currentRow=i,this.dialogVisible=!0},async handleDeleteClick(i){let t={dns_id:i.id};const c=await this.$http.deleteDnsById(t);c.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(c.msg)},async handleStatusChange(i){let t={id:i.id};const c=await this.$http.function(t);c.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(c.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function A(i,t,c,_,n,l){const d=o("el-table-column"),g=o("Edit"),u=o("el-icon"),b=o("el-link"),w=o("Delete"),y=o("el-popconfirm"),D=o("el-table"),p=o("DataFormDialog");return f(),S("div",null,[e(D,{data:c.list,stripe:"",border:""},{default:a(()=>[s(` <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column> `),s(" \u7C7B\u578B "),e(d,{label:"\u7C7B\u578B","header-align":"center",align:"center",prop:"dns_type_id",width:"120"},{default:a(r=>[m("span",null,h(r.row.dns_type_label||"-"),1)]),_:1}),s(" \u540D\u79F0 "),e(d,{label:"\u540D\u79F0","header-align":"center",align:"center",prop:"name",width:"140"},{default:a(r=>[m("span",null,h(r.row.name||"-"),1)]),_:1}),s(" Access Key "),e(d,{label:"Access Key","header-align":"center",align:"center",prop:"access_key"},{default:a(r=>[m("span",null,h(r.row.access_key||"-"),1)]),_:1}),s(" Secret Key "),e(d,{label:"Secret Key","header-align":"center",align:"center",prop:"secret_key"},{default:a(r=>[m("span",null,h(r.row.secret_key||"-"),1)]),_:1}),s(" \u521B\u5EFA\u65F6\u95F4 "),e(d,{label:"\u521B\u5EFA\u65F6\u95F4","header-align":"center",align:"center",prop:"create_time",width:"200"},{default:a(r=>[m("span",null,h(r.row.create_time||"-"),1)]),_:1}),s(" \u64CD\u4F5C "),s(` <el-table-column
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
      </el-table-column> `),e(d,{label:"\u7F16\u8F91",width:"60","header-align":"center",align:"center"},{default:a(r=>[e(b,{underline:!1,type:"primary",onClick:C=>l.handleEditRow(r.row)},{default:a(()=>[e(u,null,{default:a(()=>[e(g)]),_:1})]),_:2},1032,["onClick"])]),_:1}),e(d,{label:"\u5220\u9664",width:"60",align:"center",prop:"tag"},{default:a(r=>[e(y,{title:`${i.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:C=>l.handleDeleteClick(r.row)},{reference:a(()=>[e(b,{underline:!1,type:"danger"},{default:a(()=>[e(u,null,{default:a(()=>[e(w)]),_:1})]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),s(" \u7F16\u8F91\u6846 "),e(p,{visible:n.dialogVisible,"onUpdate:visible":t[0]||(t[0]=r=>n.dialogVisible=r),row:n.currentRow,onOnSuccess:l.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"])])}const B=v($,[["render",A]]),N={name:"dns-list",props:{},components:{DataFormDialog:k,DataTable:B},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1}},computed:{},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let i={page:this.page,size:this.size,keyword:this.keyword};try{const t=await this.$http.getDnsList(i);t.code==0&&(this.list=t.data.list.map(c=>{var _;return c.dns_type_label=(_=O.find(n=>n.value==c.dns_type_id))==null?void 0:_.label,c}),this.total=t.data.total)}catch(t){console.log(t)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleEditRow(i){}},created(){this.getData()}},K={class:"app-container"},P={class:"flex justify-between"};function j(i,t,c,_,n,l){const d=o("Plus"),g=o("el-icon"),u=o("el-button"),b=o("DataTable"),w=o("el-pagination"),y=o("DataFormDialog"),D=F("loading");return f(),S("div",K,[s(" \u64CD\u4F5C\u6309\u94AE "),m("div",P,[e(u,{type:"primary",onClick:l.handleAddRow},{default:a(()=>[e(g,null,{default:a(()=>[e(d)]),_:1}),z(h(i.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick"]),s(` <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        placeholder="\u8F93\u5165\u57DF\u540D"
        clearable
        @keypress.enter="handleSearch"
        @clear="handleSearch"
      >
        <template #append>
          <el-button @click="handleSearch">
            <el-icon><Search /></el-icon
          ></el-button>
        </template>
      </el-input> `)]),s(" \u6570\u636E\u5217\u8868 "),E(e(b,{class:"mt-md",list:n.list,onOnSuccess:l.resetData,onOnEditRow:l.handleEditRow},null,8,["list","onOnSuccess","onOnEditRow"]),[[D,n.loading]]),s(" \u7FFB\u9875 "),e(w,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":t[0]||(t[0]=p=>n.size=p),"current-page":n.page,"onUpdate:currentPage":t[1]||(t[1]=p=>n.page=p),onCurrentChange:l.getData},null,8,["total","page-size","current-page","onCurrentChange"]),s(" \u7F16\u8F91\u6846 "),e(y,{visible:n.dialogVisible,"onUpdate:visible":t[2]||(t[2]=p=>n.dialogVisible=p),onOnSuccess:l.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const J=v(N,[["render",j]]);export{J as default};
