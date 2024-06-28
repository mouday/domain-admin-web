import{D as V,a as O}from"./DataForm.724d1920.js";import{_ as D}from"./index.9e59753f.js";import{ah as s,o as f,O as v,P as a,S as R,c as C,V as t,a as p,U as _,ar as x,Q as E,T as z}from"./vendor-vue.cefe3aef.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const F={name:"",props:{row:{type:Object,default:null},visible:{type:Boolean,default:!1}},emits:["update:visible"],components:{DataForm:V},data(){return{}},computed:{dialogTitle(){return this.row?"\u7F16\u8F91":"\u6DFB\u52A0"},dialogVisible:{get(){return this.visible},set(o){this.$emit("update:visible",o)}}},methods:{handleClose(){this.$emit("update:visible",!1)},handleOpen(){this.$emit("update:visible",!0)},handleSuccess(){this.handleClose(),this.$emit("on-success")}},created(){}};function T(o,e,r,m,n,l){const c=s("DataForm"),g=s("el-dialog");return f(),v(g,{title:l.dialogTitle,modelValue:l.dialogVisible,"onUpdate:modelValue":e[0]||(e[0]=u=>l.dialogVisible=u),width:"400px",center:"","append-to-body":""},{default:a(()=>[l.dialogVisible?(f(),v(c,{key:0,row:r.row,onOnCancel:l.handleClose,onOnSuccess:l.handleSuccess},null,8,["row","onOnCancel","onOnSuccess"])):R("",!0)]),_:1},8,["title","modelValue"])}const S=D(F,[["render",T]]),U={name:"",components:{DataFormDialog:S},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(o){this.currentRow=o,this.dialogVisible=!0},async handleDeleteClick(o){let e={dns_id:o.id};const r=await this.$http.deleteDnsById(e);r.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(r.msg)},async handleStatusChange(o){let e={id:o.id};const r=await this.$http.function(e);r.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(r.msg)},handleUpdateSuccess(){this.$emit("on-success")}},created(){}};function $(o,e,r,m,n,l){const c=s("el-table-column"),g=s("Edit"),u=s("el-icon"),h=s("el-link"),b=s("Delete"),w=s("el-popconfirm"),y=s("el-table"),d=s("DataFormDialog");return f(),C("div",null,[t(y,{data:r.list,stripe:"",border:""},{default:a(()=>[t(c,{label:"\u7C7B\u578B","header-align":"center",align:"center",prop:"dns_type_id",width:"120"},{default:a(i=>[p("span",null,_(i.row.dns_type_label||"-"),1)]),_:1}),t(c,{label:"\u540D\u79F0","header-align":"center",align:"center",prop:"name",width:"140"},{default:a(i=>[p("span",null,_(i.row.name||"-"),1)]),_:1}),t(c,{label:"Access Key","header-align":"center",align:"center",prop:"access_key"},{default:a(i=>[p("span",null,_(i.row.access_key||"-"),1)]),_:1}),t(c,{label:"Secret Key","header-align":"center",align:"center",prop:"secret_key"},{default:a(i=>[p("span",null,_(i.row.secret_key||"-"),1)]),_:1}),t(c,{label:"\u521B\u5EFA\u65F6\u95F4","header-align":"center",align:"center",prop:"create_time",width:"200"},{default:a(i=>[p("span",null,_(i.row.create_time||"-"),1)]),_:1}),t(c,{label:"\u7F16\u8F91",width:"60","header-align":"center",align:"center"},{default:a(i=>[t(h,{underline:!1,type:"primary",onClick:k=>l.handleEditRow(i.row)},{default:a(()=>[t(u,null,{default:a(()=>[t(g)]),_:1})]),_:2},1032,["onClick"])]),_:1}),t(c,{label:"\u5220\u9664",width:"60",align:"center",prop:"tag"},{default:a(i=>[t(w,{title:`${o.$t("\u786E\u5B9A\u5220\u9664")}\uFF1F`,onConfirm:k=>l.handleDeleteClick(i.row)},{reference:a(()=>[t(h,{underline:!1,type:"danger"},{default:a(()=>[t(u,null,{default:a(()=>[t(b)]),_:1})]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),t(d,{visible:n.dialogVisible,"onUpdate:visible":e[0]||(e[0]=i=>n.dialogVisible=i),row:n.currentRow,onOnSuccess:l.handleUpdateSuccess},null,8,["visible","row","onOnSuccess"])])}const A=D(U,[["render",$]]),B={name:"dns-list",props:{},components:{DataFormDialog:S,DataTable:A},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1}},computed:{},methods:{resetData(){this.page=1,this.getData()},async getData(){this.loading=!0;let o={page:this.page,size:this.size,keyword:this.keyword};try{const e=await this.$http.getDnsList(o);e.code==0&&(this.list=e.data.list.map(r=>{var m;return r.dns_type_label=(m=O.find(n=>n.value==r.dns_type_id))==null?void 0:m.label,r}),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},handleSearch(){this.resetData()},handleEditRow(o){}},created(){this.getData()}},N={class:"app-container"},P={class:"flex justify-between"};function j(o,e,r,m,n,l){const c=s("Plus"),g=s("el-icon"),u=s("el-button"),h=s("DataTable"),b=s("el-pagination"),w=s("DataFormDialog"),y=x("loading");return f(),C("div",N,[p("div",P,[t(u,{type:"primary",onClick:l.handleAddRow},{default:a(()=>[t(g,null,{default:a(()=>[t(c)]),_:1}),z(_(o.$t("\u6DFB\u52A0")),1)]),_:1},8,["onClick"])]),E(t(h,{class:"mt-md",list:n.list,onOnSuccess:l.resetData,onOnEditRow:l.handleEditRow},null,8,["list","onOnSuccess","onOnEditRow"]),[[y,n.loading]]),t(b,{class:"mt-md justify-center",background:"",layout:"total, prev, pager, next",total:n.total,"page-size":n.size,"onUpdate:pageSize":e[0]||(e[0]=d=>n.size=d),"current-page":n.page,"onUpdate:currentPage":e[1]||(e[1]=d=>n.page=d),onCurrentChange:l.getData},null,8,["total","page-size","current-page","onCurrentChange"]),t(w,{visible:n.dialogVisible,"onUpdate:visible":e[2]||(e[2]=d=>n.dialogVisible=d),onOnSuccess:l.handleAddSuccess},null,8,["visible","onOnSuccess"])])}const H=D(B,[["render",j]]);export{H as default};
