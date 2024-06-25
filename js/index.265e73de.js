import{H as B}from"./highlight-lib.3654f6d3.js";import{_ as H}from"./index.3063a777.js";import{ah as _,o as x,c as k,V as f,P as g,S as c,a as C,U as z,T as J,ar as M,Q as F}from"./vendor-vue.cefe3aef.js";import{h as T}from"./highlight-util.a4f1867f.js";import"./element-plus.af689926.js";import"./element-icon.1fe9d2a8.js";import"./vendor-lib.a8c0b8df.js";const W={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(n){this.currentRow=n,this.dialogVisible=!0},async handleDeleteClick(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},async handleStatusChange(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},handleUpdateSuccess(){this.$emit("on-success")}},mounted(){B.highlightAll()},created(){}},Q={key:0},Z=["innerHTML"],G={key:1},X=["innerHTML"];function Y(n,e,t,s,l,o){const r=_("el-table-column"),u=_("el-tag"),a=_("el-table");return x(),k("div",null,[f(a,{data:t.list,stripe:"",border:""},{default:g(()=>[c(` <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
        `),c(" \u64CD\u4F5C\u4EBA "),f(r,{label:n.$t("\u64CD\u4F5C\u4EBA"),"header-align":"center",align:"center",width:"100",prop:"user_name","show-overflow-tooltip":""},{default:g(i=>[C("span",null,z(i.row.user_name||"-"),1)]),_:1},8,["label"]),c(" \u64CD\u4F5C\u8868 "),f(r,{label:n.$t("\u64CD\u4F5C\u8868"),width:"120","header-align":"center",align:"center",prop:"table","show-overflow-tooltip":""},{default:g(i=>[C("span",null,z(i.row.table||"-"),1)]),_:1},8,["label"]),c(" \u64CD\u4F5C\u7C7B\u578B "),f(r,{label:n.$t("\u64CD\u4F5C\u7C7B\u578B"),"header-align":"center",align:"center",prop:"type_id",width:"100"},{default:g(i=>[f(u,{type:i.row.type_style},{default:g(()=>[J(z(i.row.type_label),1)]),_:2},1032,["type"])]),_:1},8,["label"]),c(" \u64CD\u4F5C\u7C7B\u578B "),f(r,{label:n.$t("\u6570\u636E\u53D8\u5316"),"header-align":"center",align:"left",prop:"type_id"},{default:g(i=>[c(` <pre
            v-if="scope.row.type_style == ''"
            class="code"
            v-html="scope.row.data"
          ></pre> `),c(` <highlightjs
            v-else
            language="json"
            :code="scope.row.data"
          /> `),i.row.type_style==""?(x(),k("pre",Q,[C("code",{class:"language-diff",innerHTML:i.row.data},null,8,Z)])):(x(),k("pre",G,[C("code",{class:"language-json",innerHTML:i.row.data},null,8,X)]))]),_:1},8,["label"]),c(" \u64CD\u4F5C\u524D "),c(` <el-table-column
        label="\u64CD\u4F5C\u524D"
        header-align="center"
        align="left"
        prop="before"
        show-overflow-tooltip
      >
        <template #default="scope">
          \u6279\u91CF\u5220\u9664 `),c(` <template v-if="scope.row.type_id == 4">
            <template v-if="scope.row.before && scope.row.before.length > 0">
              <div v-for="(item, index) in scope.row.before">
                <div v-for="(value, key) in item">{{ key }}: {{ value }}</div>
                <el-divider v-if="index + 1 < scope.row.before.length" />
              </div>
            </template>
            <span v-else>-</span>
          </template> `),c(" \u5176\u4ED6 "),c(` <template v-else>
            <template v-if="scope.row.before">
              <div v-for="(value, key) in scope.row.before">
                {{ key }}: {{ value }}
              </div>
            </template>

            <span v-else>-</span>
          </template>
        </template>
      </el-table-column> `),c(" \u64CD\u4F5C\u540E "),c(` <el-table-column
        label="\u64CD\u4F5C\u540E"
        header-align="center"
        align="left"
        prop="after"
        show-overflow-tooltip
      >
        <template #default="scope">
          <template v-if="scope.row.after">
            <div v-for="(value, key) in scope.row.after">
              {{ key }}: {{ value }}
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column> `),c(" \u64CD\u4F5C\u65F6\u95F4 "),f(r,{label:n.$t("\u64CD\u4F5C\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"130"},{default:g(i=>[C("span",null,z(i.row.create_time_label||"-"),1)]),_:1},8,["label"])]),_:1},8,["data"])])}const P=H(W,[["render",Y]]),O={CREATE:1,UPDATE:2,DELETE:3,BATCH_DELETE:4};function w(){}w.prototype={diff:function(e,t){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},l=s.callback;typeof s=="function"&&(l=s,s={}),this.options=s;var o=this;function r(p){return l?(setTimeout(function(){l(void 0,p)},0),!0):p}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var u=t.length,a=e.length,i=1,h=u+a;s.maxEditLength&&(h=Math.min(h,s.maxEditLength));var d=[{newPos:-1,components:[]}],v=this.extractCommon(d[0],t,e,0);if(d[0].newPos+1>=u&&v+1>=a)return r([{value:this.join(t),count:t.length}]);function m(){for(var p=-1*i;p<=i;p+=2){var y=void 0,b=d[p-1],D=d[p+1],$=(D?D.newPos:0)-p;b&&(d[p-1]=void 0);var V=b&&b.newPos+1<u,I=D&&0<=$&&$<a;if(!V&&!I){d[p]=void 0;continue}if(!V||I&&b.newPos<D.newPos?(y=ee(D),o.pushComponent(y.components,void 0,!0)):(y=b,y.newPos++,o.pushComponent(y.components,!0,void 0)),$=o.extractCommon(y,t,e,p),y.newPos+1>=u&&$+1>=a)return r(K(o,y.components,t,e,o.useLongestToken));d[p]=y}i++}if(l)(function p(){setTimeout(function(){if(i>h)return l();m()||p()},0)})();else for(;i<=h;){var L=m();if(L)return L}},pushComponent:function(e,t,s){var l=e[e.length-1];l&&l.added===t&&l.removed===s?e[e.length-1]={count:l.count+1,added:t,removed:s}:e.push({count:1,added:t,removed:s})},extractCommon:function(e,t,s,l){for(var o=t.length,r=s.length,u=e.newPos,a=u-l,i=0;u+1<o&&a+1<r&&this.equals(t[u+1],s[a+1]);)u++,a++,i++;return i&&e.components.push({count:i}),e.newPos=u,a},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],s=0;s<e.length;s++)e[s]&&t.push(e[s]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function K(n,e,t,s,l){for(var o=0,r=e.length,u=0,a=0;o<r;o++){var i=e[o];if(i.removed){if(i.value=n.join(s.slice(a,a+i.count)),a+=i.count,o&&e[o-1].added){var d=e[o-1];e[o-1]=e[o],e[o]=d}}else{if(!i.added&&l){var h=t.slice(u,u+i.count);h=h.map(function(m,L){var p=s[a+L];return p.length>m.length?p:m}),i.value=n.join(h)}else i.value=n.join(t.slice(u,u+i.count));u+=i.count,i.added||(a+=i.count)}}var v=e[r-1];return r>1&&typeof v.value=="string"&&(v.added||v.removed)&&n.equals("",v.value)&&(e[r-2].value+=v.value,e.pop()),e}function ee(n){return{newPos:n.newPos,components:n.components.slice(0)}}var R=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,j=/\S/,q=new w;q.equals=function(n,e){return this.options.ignoreCase&&(n=n.toLowerCase(),e=e.toLowerCase()),n===e||this.options.ignoreWhitespace&&!j.test(n)&&!j.test(e)};q.tokenize=function(n){for(var e=n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<e.length-1;t++)!e[t+1]&&e[t+2]&&R.test(e[t])&&R.test(e[t+2])&&(e[t]+=e[t+2],e.splice(t+1,2),t--);return e};var U=new w;U.tokenize=function(n){var e=[],t=n.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var s=0;s<t.length;s++){var l=t[s];s%2&&!this.options.newlineIsToken?e[e.length-1]+=l:(this.options.ignoreWhitespace&&(l=l.trim()),e.push(l))}return e};var te=new w;te.tokenize=function(n){return n.split(/(\S.+?[.!?])(?=\s+|$)/)};var ne=new w;ne.tokenize=function(n){return n.split(/([{}:;,]|\s+)/)};function A(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?A=function(e){return typeof e}:A=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(n)}var oe=Object.prototype.toString,E=new w;E.useLongestToken=!0;E.tokenize=U.tokenize;E.castInput=function(n){var e=this.options,t=e.undefinedReplacement,s=e.stringifyReplacer,l=s===void 0?function(o,r){return typeof r>"u"?t:r}:s;return typeof n=="string"?n:JSON.stringify(S(n,null,null,l),l,"  ")};E.equals=function(n,e){return w.prototype.equals.call(E,n.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function S(n,e,t,s,l){e=e||[],t=t||[],s&&(n=s(l,n));var o;for(o=0;o<e.length;o+=1)if(e[o]===n)return t[o];var r;if(oe.call(n)==="[object Array]"){for(e.push(n),r=new Array(n.length),t.push(r),o=0;o<n.length;o+=1)r[o]=S(n[o],e,t,s,l);return e.pop(),t.pop(),r}if(n&&n.toJSON&&(n=n.toJSON()),A(n)==="object"&&n!==null){e.push(n),r={},t.push(r);var u=[],a;for(a in n)n.hasOwnProperty(a)&&u.push(a);for(u.sort(),o=0;o<u.length;o+=1)a=u[o],r[a]=S(n[a],e,t,s,a);e.pop(),t.pop()}else r=n;return r}var N=new w;N.tokenize=function(n){return n.slice()};N.join=N.removeEmpty=function(n){return n};function se(n,e,t){return N.diff(n,e,t)}const ie={name:"log_operation-list",props:{},components:{DataTable:P},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData()},async getData(){this.loading=!0;let n={page:this.page,size:this.size,keyword:this.keyword};try{const e=await this.$http.getOperationLogList(n);e.code==0&&(this.list=e.data.list.map(t=>{try{t.before=JSON.stringify(JSON.parse(t.before),null,2)}catch{}try{t.after=JSON.stringify(JSON.parse(t.after),null,2)}catch{}if(t.type_id==O.UPDATE){let l=se(t.before.split(`
`),t.after.split(`
`)).map(o=>o.added?o.value.map(r=>"+"+r).join(`
`):o.removed?o.value.map(r=>"-"+r).join(`
`):o.value.map(r=>r).join(`
`));t.data=T(l.join(`
`),{language:"diff"}).value,t.type_style=""}else t.type_id==O.CREATE?(t.data=T(t.after,{language:"json"}).value,t.type_style="success"):t.type_id==O.DELETE?(t.data=T(t.before,{language:"json"}).value,t.type_style="danger"):t.type_id==O.BATCH_DELETE&&(t.data=T(t.before,{language:"json"}).value,t.type_style="danger");return t}),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},getObjectString(n){let e=[];for(let[t,s]of Object.entries(n))e.push(`${t}: ${s}`);return e.join(`
`)},handleSearch(){this.resetData()},handleSizeChange(n){localStorage.setItem(this.pageSizeCachekey,n),this.resetData()},loadPageSize(){let n=localStorage.getItem(this.pageSizeCachekey);n&&(this.size=parseInt(n))},async clearLogOperationList(){let n=this.$loading({fullscreen:!0});try{const e=await this.$http.clearLogOperationList();e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg)}catch(e){console.log(e)}finally{this.$nextTick(()=>{n.close()})}}},created(){this.loadPageSize(),this.getData()}},le={class:"app-container"},re={class:"flex justify-between mb-sm"},ae=C("div",null,null,-1);function ue(n,e,t,s,l,o){const r=_("Delete"),u=_("el-icon"),a=_("el-link"),i=_("el-popconfirm"),h=_("DataTable"),d=_("el-pagination"),v=M("loading");return x(),k("div",le,[C("div",re,[ae,f(i,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:o.clearLogOperationList},{reference:g(()=>[f(a,{underline:!1,type:"danger",class:"mr-sm"},{default:g(()=>[f(u,null,{default:g(()=>[f(r)]),_:1}),J(z(n.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),c(" \u6570\u636E\u5217\u8868 "),F(f(h,{list:l.list,onOnSuccess:o.resetData},null,8,["list","onOnSuccess"]),[[v,l.loading]]),c(" \u7FFB\u9875 "),f(d,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:l.total,"page-size":l.size,"onUpdate:pageSize":e[0]||(e[0]=m=>l.size=m),"current-page":l.page,"onUpdate:currentPage":e[1]||(e[1]=m=>l.page=m),onCurrentChange:o.getData,onSizeChange:o.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"])])}const me=H(ie,[["render",ue]]);export{me as default};
