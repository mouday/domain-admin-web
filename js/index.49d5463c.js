import{_ as C}from"./index.a7078a53.js";import{ah as d,o as w,c as S,V as l,P as r,S as s,a as f,T as $,U as p,O as z,F as O,ar as x,a9 as R,Q as F}from"./vendor-vue.cefe3aef.js";import{c as T}from"./vendor-lib.a8c0b8df.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";const P={username:[{message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],password:[{message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],avatar_url:[{message:"\u5934\u50CF\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],before_expire_days:[{message:"\u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}],email_list:[{message:"\u90AE\u4EF6\u5217\u8868\u4E0D\u80FD\u4E3A\u7A7A",required:!0,trigger:"blur"}]},B={name:"",props:{row:{type:Object,default:null}},components:{},data(){return{rules:P,form:{username:"",password:"",avatar_url:"",before_expire_days:"",email_list:""}}},computed:{},methods:{async getData(){if(this.row){let t={id:this.row.id};const a=await this.$http.function(t);if(a.code!=0)return;let c=a.data;this.form.username=c.username,this.form.avatar_url=c.avatar_url,this.form.before_expire_days=c.before_expire_days,this.form.email_list=c.email_list}},handleCancel(){this.$emit("on-cancel")},handleSubmit(){this.$refs.form.validate(t=>{if(t)this.confirmSubmit();else return!1})},async confirmSubmit(){let t=this.$loading({fullscreen:!0}),a={username:this.form.username.trim(),password:this.form.password.trim()};this.row&&(a.id=this.row.id);const c=await this.$http.addUser(a);c.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(c.msg),this.$nextTick(()=>{t.close()})}},created(){this.getData()}},q={class:"text-center"};function A(t,a,c,y,o,i){const u=d("el-input"),m=d("el-form-item"),h=d("el-form"),g=d("el-button");return w(),S("div",null,[l(h,{ref:"form",model:o.form,rules:o.rules,"label-width":"100px"},{default:r(()=>[s(" \u7528\u6237\u540D "),l(m,{label:t.$t("\u7528\u6237\u540D"),prop:"username"},{default:r(()=>[l(u,{type:"text",modelValue:o.form.username,"onUpdate:modelValue":a[0]||(a[0]=_=>o.form.username=_),placeholder:t.$t("\u8BF7\u8F93\u5165\u7528\u6237\u540D")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),l(m,{label:t.$t("\u5BC6\u7801"),prop:"password"},{default:r(()=>[l(u,{type:"text",modelValue:o.form.password,"onUpdate:modelValue":a[1]||(a[1]=_=>o.form.password=_),placeholder:t.$t("\u8BF7\u8F93\u5165\u5BC6\u7801")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(" \u5934\u50CF "),s(` <el-form-item
        label="\u5934\u50CF"
        prop="avatar_url"
      >
        <el-input
          type="text"
          v-model="form.avatar_url"
          placeholder="\u8BF7\u8F93\u5165\u5934\u50CF"
        ></el-input>
      </el-form-item> `),s(" \u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192 "),s(` <el-form-item
        label="\u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192"
        prop="before_expire_days"
      >
        <el-input
          type="text"
          v-model="form.before_expire_days"
          placeholder="\u8BF7\u8F93\u5165\u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192"
        ></el-input>
      </el-form-item> `),s(" \u90AE\u4EF6\u5217\u8868 "),s(` <el-form-item
        label="\u90AE\u4EF6\u5217\u8868"
        prop="email_list"
      >
        <el-input
          type="text"
          v-model="form.email_list"
          placeholder="\u8BF7\u8F93\u5165\u90AE\u4EF6\u5217\u8868"
        ></el-input>
      </el-form-item> `)]),_:1},8,["model","rules"]),s(" \u64CD\u4F5C "),f("div",q,[l(g,{onClick:i.handleCancel},{default:r(()=>[$(p(t.$t("\u53D6\u6D88")),1)]),_:1},8,["onClick"]),l(g,{type:"primary",onClick:i.handleSubmit},{default:r(()=>[$(p(t.$t("\u786E\u5B9A")),1)]),_:1},8,["onClick"])])])}const j=C(B,[["render",A]]),E={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:j},data(){return{}},computed:{dialogTitle(){return this.row?this.$t("\u7F16\u8F91\u7528\u6237"):this.$t("\u6DFB\u52A0\u7528\u6237")},dialogVisible:{get(){return this.visible},set(t){this.$emit("update:visible",t)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function N(t,a,c,y,o,i){const u=d("DataForm"),m=d("el-dialog");return w(),S(O,null,[s(" \u7F16\u8F91\u6846 "),l(m,{title:i.dialogTitle,modelValue:i.dialogVisible,"onUpdate:modelValue":a[0]||(a[0]=h=>i.dialogVisible=h),width:"400px",center:"","append-to-body":"","lock-scroll":!1},{default:r(()=>[i.dialogVisible?(w(),z(u,{key:0,row:c.row,onOnCancel:i.handleClose,onOnSuccess:i.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):s("v-if",!0)]),_:1},8,["title","modelValue"])],2112)}const U=C(E,[["render",N]]),I={name:"",components:{DataFormDailog:U},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(t){this.currentRow=t,this.dialogVisible=!0},async handleDeleteClick(t){let a={user_id:t.id};(await this.$http.deleteUser(a)).code==0&&(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success"))},async handleResetUserPasswordUser(t){let a={user_id:t.id};const c=await this.$http.resetUserPasswordUser(a);c.ok&&this.$alert(`\u65B0\u5BC6\u7801\uFF1A${c.data.password}`,"\u5BC6\u7801\u91CD\u7F6E\u6210\u529F",{center:!0,autofocus:!1,confirmButtonText:"\u590D\u5236",type:"success"}).then(()=>{T(c.data.password),this.$msg.success("\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F")}).catch(()=>{})},async handleStatusChange(t,a){let c={user_id:t.id,status:a};(await this.$http.updateUserStatus(c)).code==0&&this.$msg.success("\u64CD\u4F5C\u6210\u529F")},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function K(t,a,c,y,o,i){const u=d("el-table-column"),m=d("el-switch"),h=d("Refresh"),g=d("el-icon"),_=d("el-link"),v=d("el-popconfirm"),D=d("Delete"),V=d("el-table"),k=d("DataFormDailog");return w(),S("div",null,[l(V,{data:c.list,stripe:"",border:""},{default:r(()=>[l(u,{label:t.$t("\u5E8F\u53F7"),align:"center",prop:"id",width:"60"},{default:r(n=>[f("span",null,p(n.$index+1),1)]),_:1},8,["label"]),s(" \u7528\u6237\u540D "),l(u,{label:t.$t("\u7528\u6237\u540D"),"header-align":"center",align:"center",prop:"username"},{default:r(n=>[f("span",null,p(n.row.username||"-"),1)]),_:1},8,["label"]),s(" \u5934\u50CF "),s(` <el-table-column
        label="\u5934\u50CF"
        header-align="center"
        align="center"
        prop="avatar_url"
        width="70"
      >
        <template #default="scope">
          <el-avatar :src="scope.row.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>
        </template>
      </el-table-column> `),s(" \u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192 "),s(` <el-table-column
        label="\u8FC7\u671F\u524D\u591A\u5C11\u5929\u63D0\u9192"
        header-align="center"
        align="center"
        prop="before_expire_days"
      >
        <template #default="scope">
          <span>{{ scope.row.before_expire_days || '-' }}</span>
        </template>
      </el-table-column> `),s(" \u8BC1\u4E66\u6570\u91CF "),l(u,{label:t.$t("\u8BC1\u4E66\u6570\u91CF"),"header-align":"center",align:"center",prop:"cert_count",width:"100"},{default:r(n=>[f("span",null,p(n.row.cert_count||"-"),1)]),_:1},8,["label"]),s(" \u57DF\u540D\u6570\u91CF "),l(u,{label:t.$t("\u57DF\u540D\u6570\u91CF"),"header-align":"center",align:"center",prop:"notify_count",width:"120"},{default:r(n=>[f("span",null,p(n.row.domain_count||"-"),1)]),_:1},8,["label"]),s(" \u5206\u7EC4\u6570\u91CF "),l(u,{label:t.$t("\u5206\u7EC4\u6570\u91CF"),"header-align":"center",align:"center",prop:"group_count",width:"110"},{default:r(n=>[f("span",null,p(n.row.group_count||"-"),1)]),_:1},8,["label"]),s(" \u901A\u77E5\u6E20\u9053 "),l(u,{label:t.$t("\u901A\u77E5\u6E20\u9053"),"header-align":"center",align:"center",prop:"notify_count",width:"100"},{default:r(n=>[f("span",null,p(n.row.notify_count||"-"),1)]),_:1},8,["label"]),s(" \u90AE\u4EF6\u5217\u8868 "),s(` <el-table-column
        label="\u90AE\u4EF6\u5217\u8868"
        header-align="center"
        align="center"
        prop="email_list"
      >
        <template #default="scope">
          <template
            v-if="scope.row.email_list && scope.row.email_list.length > 0"
          >
            <div v-for="item in scope.row.email_list">{{ item }}</div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column> `),s(" \u64CD\u4F5C "),l(u,{label:t.$t("\u542F\u7528"),"header-align":"center",align:"center",width:"80"},{default:r(n=>[l(m,{disabled:n.row.username=="admin",modelValue:n.row.status,"onUpdate:modelValue":b=>n.row.status=b,onChange:b=>i.handleStatusChange(n.row,b)},null,8,["disabled","modelValue","onUpdate:modelValue","onChange"])]),_:1},8,["label"]),s(` <el-table-column
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
      </el-table-column> `),l(u,{label:t.$t("\u91CD\u7F6E\u5BC6\u7801"),width:"150",align:"center",prop:"tag"},{default:r(n=>[l(v,{title:"\u786E\u5B9A\u91CD\u7F6E\u5BC6\u7801\uFF1F",onConfirm:b=>i.handleResetUserPasswordUser(n.row),disabled:n.row.username=="admin"},{reference:r(()=>[l(_,{disabled:n.row.username=="admin",underline:!1,type:"primary"},{default:r(()=>[l(g,null,{default:r(()=>[l(h)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["onConfirm","disabled"])]),_:1},8,["label"]),l(u,{label:t.$t("\u5220\u9664"),width:"60",align:"center",prop:"tag"},{default:r(n=>[l(v,{title:`${t.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:b=>i.handleDeleteClick(n.row),disabled:n.row.username=="admin"},{reference:r(()=>[l(_,{disabled:n.row.username=="admin",underline:!1,type:"danger"},{default:r(()=>[l(g,null,{default:r(()=>[l(D)]),_:1})]),_:2},1032,["disabled"])]),_:2},1032,["title","onConfirm","disabled"])]),_:1},8,["label"])]),_:1},8,["data"]),s(" \u7F16\u8F91\u6846 "),l(k,{visible:o.dialogVisible,"onUpdate:visible":a[0]||(a[0]=n=>o.dialogVisible=n),row:o.currentRow,onOnSuccess:i.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"])])}const L=C(I,[["render",K]]),Q={name:"user-admin-list",props:{},components:{DataFormDailog:U,DataTable:L},data(){return{list:[],total:0,page:1,size:20,keyword:"",pageSizeCachekey:"pageSize",loading:!0,dialogVisible:!1}},computed:{},methods:{resetData(){this.page=1,this.getData()},refreshData(){this.getData()},async getData(){this.loading=!0;let t={page:this.page,size:this.size,keyword:this.keyword.trim()};const a=await this.$http.getUserList(t);a.code==0?(this.list=a.data.list,this.total=a.data.total):this.$msg.error(e.msg),this.loading=!1},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleSizeChange(t){localStorage.setItem(this.pageSizeCachekey,t),this.resetData()},loadPageSize(){let t=localStorage.getItem(this.pageSizeCachekey);t&&(this.size=parseInt(t))}},created(){this.loadPageSize(),this.getData()}},G={class:"app-container"},H={class:"flex justify-between margin-bottom--20"};function J(t,a,c,y,o,i){const u=d("Plus"),m=d("el-icon"),h=d("el-button"),g=d("Search"),_=d("el-input"),v=d("DataTable"),D=d("el-pagination"),V=d("DataFormDailog"),k=x("loading");return w(),S("div",G,[s(" \u64CD\u4F5C\u6309\u94AE "),f("div",H,[l(h,{type:"primary",onClick:i.handleAddRow},{default:r(()=>[l(m,null,{default:r(()=>[l(u)]),_:1}),$(p(t.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick"]),l(_,{class:"ml-sm",style:{width:"260px"},modelValue:o.keyword,"onUpdate:modelValue":a[0]||(a[0]=n=>o.keyword=n),placeholder:t.$t("\u641C\u7D22\u7528\u6237\u540D"),clearable:"",onKeypress:R(i.handleSearch,["enter"]),onClear:i.handleSearch},{append:r(()=>[l(h,{onClick:i.handleSearch},{default:r(()=>[l(m,null,{default:r(()=>[l(g)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["modelValue","placeholder","onKeypress","onClear"])]),s(" \u6570\u636E\u5217\u8868 "),F(l(v,{class:"mt-md",list:o.list,onOnSuccess:i.resetData},null,8,["list","onOnSuccess"]),[[k,o.loading]]),s(" \u7FFB\u9875 "),l(D,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:o.total,"page-size":o.size,"onUpdate:pageSize":a[1]||(a[1]=n=>o.size=n),"current-page":o.page,"onUpdate:currentPage":a[2]||(a[2]=n=>o.page=n),onCurrentChange:i.getData,onSizeChange:i.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"]),s(" \u7F16\u8F91\u6846 "),l(V,{visible:o.dialogVisible,"onUpdate:visible":a[3]||(a[3]=n=>o.dialogVisible=n),onOnSuccess:i.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const ee=C(Q,[["render",J]]);export{ee as default};
