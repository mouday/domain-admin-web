import{H as Z}from"./highlight-lib.2ee09073.js";import{_ as B}from"./index.a968bb1b.js";import{ai as v,o as A,c as I,U as g,O as m,R as f,a as D,T as $,S as F,aq as G,P as Q}from"./vendor-vue.43598ec5.js";import{h as O}from"./highlight-util.7ff64d2a.js";import"./element-plus.6ad0e9c9.js";import"./element-icon.b2784a36.js";import"./vendor-lib.46ff5dd6.js";const X={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(n){this.currentRow=n,this.dialogVisible=!0},async handleDeleteClick(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},async handleStatusChange(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},handleUpdateSuccess(){this.$emit("on-success")}},mounted(){Z.highlightAll()},created(){}},Y={key:0},K=["innerHTML"],ee={key:1},te=["innerHTML"];function ne(n,e,t,s,i,o){const r=v("el-table-column"),a=v("el-tag"),u=v("el-table");return A(),I("div",null,[g(u,{data:t.list,stripe:"",border:""},{default:m(()=>[f(` <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
        `),f(" \u64CD\u4F5C\u4EBA "),g(r,{label:n.$t("\u64CD\u4F5C\u4EBA"),"header-align":"center",align:"center",width:"100",prop:"user_name","show-overflow-tooltip":""},{default:m(l=>[D("span",null,$(l.row.user_name||"-"),1)]),_:1},8,["label"]),f(" \u64CD\u4F5C\u8868 "),g(r,{label:n.$t("\u64CD\u4F5C\u8868"),width:"120","header-align":"center",align:"center",prop:"table","show-overflow-tooltip":""},{default:m(l=>[D("span",null,$(l.row.table||"-"),1)]),_:1},8,["label"]),f(" \u64CD\u4F5C\u7C7B\u578B "),g(r,{label:n.$t("\u64CD\u4F5C\u7C7B\u578B"),"header-align":"center",align:"center",prop:"type_id",width:"100"},{default:m(l=>[g(a,{type:l.row.type_style},{default:m(()=>[F($(l.row.type_label),1)]),_:2},1032,["type"])]),_:1},8,["label"]),f(" \u64CD\u4F5C\u7C7B\u578B "),g(r,{label:n.$t("\u6570\u636E\u53D8\u5316"),"header-align":"center",align:"left",prop:"type_id"},{default:m(l=>[f(` <pre
            v-if="scope.row.type_style == ''"
            class="code"
            v-html="scope.row.data"
          ></pre> `),f(` <highlightjs
            v-else
            language="json"
            :code="scope.row.data"
          /> `),l.row.type_style==""?(A(),I("pre",Y,[D("code",{class:"language-diff",innerHTML:l.row.data},null,8,K)])):(A(),I("pre",ee,[D("code",{class:"language-json",innerHTML:l.row.data},null,8,te)]))]),_:1},8,["label"]),f(" \u64CD\u4F5C\u524D "),f(` <el-table-column
        label="\u64CD\u4F5C\u524D"
        header-align="center"
        align="left"
        prop="before"
        show-overflow-tooltip
      >
        <template #default="scope">
          \u6279\u91CF\u5220\u9664 `),f(` <template v-if="scope.row.type_id == 4">
            <template v-if="scope.row.before && scope.row.before.length > 0">
              <div v-for="(item, index) in scope.row.before">
                <div v-for="(value, key) in item">{{ key }}: {{ value }}</div>
                <el-divider v-if="index + 1 < scope.row.before.length" />
              </div>
            </template>
            <span v-else>-</span>
          </template> `),f(" \u5176\u4ED6 "),f(` <template v-else>
            <template v-if="scope.row.before">
              <div v-for="(value, key) in scope.row.before">
                {{ key }}: {{ value }}
              </div>
            </template>

            <span v-else>-</span>
          </template>
        </template>
      </el-table-column> `),f(" \u64CD\u4F5C\u540E "),f(` <el-table-column
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
      </el-table-column> `),f(" \u64CD\u4F5C\u65F6\u95F4 "),g(r,{label:n.$t("\u64CD\u4F5C\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"130"},{default:m(l=>[D("span",null,$(l.row.create_time_label||"-"),1)]),_:1},8,["label"])]),_:1},8,["data"])])}const oe=B(X,[["render",ne]]),k={CREATE:1,UPDATE:2,DELETE:3,BATCH_DELETE:4};function _(){}_.prototype={diff:function(e,t){var s,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},o=i.callback;typeof i=="function"&&(o=i,i={}),this.options=i;var r=this;function a(c){return o?(setTimeout(function(){o(void 0,c)},0),!0):c}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var u=t.length,l=e.length,d=1,p=u+l;i.maxEditLength&&(p=Math.min(p,i.maxEditLength));var w=(s=i.timeout)!==null&&s!==void 0?s:1/0,y=Date.now()+w,h=[{oldPos:-1,lastComponent:void 0}],C=this.extractCommon(h[0],t,e,0);if(h[0].oldPos+1>=l&&C+1>=u)return a([{value:this.join(t),count:t.length}]);var z=-1/0,T=1/0;function M(){for(var c=Math.max(z,-d);c<=Math.min(T,d);c+=2){var b=void 0,E=h[c-1],L=h[c+1];E&&(h[c-1]=void 0);var R=!1;if(L){var q=L.oldPos-c;R=L&&0<=q&&q<u}var H=E&&E.oldPos+1<l;if(!R&&!H){h[c]=void 0;continue}if(!H||R&&E.oldPos+1<L.oldPos?b=r.addToPath(L,!0,void 0,0):b=r.addToPath(E,void 0,!0,1),C=r.extractCommon(b,t,e,c),b.oldPos+1>=l&&C+1>=u)return a(se(r,b.lastComponent,t,e,r.useLongestToken));h[c]=b,b.oldPos+1>=l&&(T=Math.min(T,c-1)),C+1>=u&&(z=Math.max(z,c+1))}d++}if(o)(function c(){setTimeout(function(){if(d>p||Date.now()>y)return o();M()||c()},0)})();else for(;d<=p&&Date.now()<=y;){var j=M();if(j)return j}},addToPath:function(e,t,s,i){var o=e.lastComponent;return o&&o.added===t&&o.removed===s?{oldPos:e.oldPos+i,lastComponent:{count:o.count+1,added:t,removed:s,previousComponent:o.previousComponent}}:{oldPos:e.oldPos+i,lastComponent:{count:1,added:t,removed:s,previousComponent:o}}},extractCommon:function(e,t,s,i){for(var o=t.length,r=s.length,a=e.oldPos,u=a-i,l=0;u+1<o&&a+1<r&&this.equals(t[u+1],s[a+1]);)u++,a++,l++;return l&&(e.lastComponent={count:l,previousComponent:e.lastComponent}),e.oldPos=a,u},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],s=0;s<e.length;s++)e[s]&&t.push(e[s]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function se(n,e,t,s,i){for(var o=[],r;e;)o.push(e),r=e.previousComponent,delete e.previousComponent,e=r;o.reverse();for(var a=0,u=o.length,l=0,d=0;a<u;a++){var p=o[a];if(p.removed){if(p.value=n.join(s.slice(d,d+p.count)),d+=p.count,a&&o[a-1].added){var y=o[a-1];o[a-1]=o[a],o[a]=y}}else{if(!p.added&&i){var w=t.slice(l,l+p.count);w=w.map(function(C,z){var T=s[d+z];return T.length>C.length?T:C}),p.value=n.join(w)}else p.value=n.join(t.slice(l,l+p.count));l+=p.count,p.added||(d+=p.count)}}var h=o[u-1];return u>1&&typeof h.value=="string"&&(h.added||h.removed)&&n.equals("",h.value)&&(o[u-2].value+=h.value,o.pop()),o}var J=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,U=/\S/,W=new _;W.equals=function(n,e){return this.options.ignoreCase&&(n=n.toLowerCase(),e=e.toLowerCase()),n===e||this.options.ignoreWhitespace&&!U.test(n)&&!U.test(e)};W.tokenize=function(n){for(var e=n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<e.length-1;t++)!e[t+1]&&e[t+2]&&J.test(e[t])&&J.test(e[t+2])&&(e[t]+=e[t+2],e.splice(t+1,2),t--);return e};var P=new _;P.tokenize=function(n){this.options.stripTrailingCr&&(n=n.replace(/\r\n/g,`
`));var e=[],t=n.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var s=0;s<t.length;s++){var i=t[s];s%2&&!this.options.newlineIsToken?e[e.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),e.push(i))}return e};var ie=new _;ie.tokenize=function(n){return n.split(/(\S.+?[.!?])(?=\s+|$)/)};var re=new _;re.tokenize=function(n){return n.split(/([{}:;,]|\s+)/)};function S(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?S=function(e){return typeof e}:S=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(n)}var le=Object.prototype.toString,x=new _;x.useLongestToken=!0;x.tokenize=P.tokenize;x.castInput=function(n){var e=this.options,t=e.undefinedReplacement,s=e.stringifyReplacer,i=s===void 0?function(o,r){return typeof r>"u"?t:r}:s;return typeof n=="string"?n:JSON.stringify(V(n,null,null,i),i,"  ")};x.equals=function(n,e){return _.prototype.equals.call(x,n.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function V(n,e,t,s,i){e=e||[],t=t||[],s&&(n=s(i,n));var o;for(o=0;o<e.length;o+=1)if(e[o]===n)return t[o];var r;if(le.call(n)==="[object Array]"){for(e.push(n),r=new Array(n.length),t.push(r),o=0;o<n.length;o+=1)r[o]=V(n[o],e,t,s,i);return e.pop(),t.pop(),r}if(n&&n.toJSON&&(n=n.toJSON()),S(n)==="object"&&n!==null){e.push(n),r={},t.push(r);var a=[],u;for(u in n)n.hasOwnProperty(u)&&a.push(u);for(a.sort(),o=0;o<a.length;o+=1)u=a[o],r[u]=V(n[u],e,t,s,u);e.pop(),t.pop()}else r=n;return r}var N=new _;N.tokenize=function(n){return n.slice()};N.join=N.removeEmpty=function(n){return n};function ae(n,e,t){return N.diff(n,e,t)}const ue={name:"log_operation-list",props:{},components:{DataTable:oe},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData()},async getData(){this.loading=!0;let n={page:this.page,size:this.size,keyword:this.keyword};try{const e=await this.$http.getOperationLogList(n);e.code==0&&(this.list=e.data.list.map(t=>{try{t.before=JSON.stringify(JSON.parse(t.before),null,2)}catch{}try{t.after=JSON.stringify(JSON.parse(t.after),null,2)}catch{}if(t.type_id==k.UPDATE){let i=ae(t.before.split(`
`),t.after.split(`
`)).map(o=>o.added?o.value.map(r=>"+"+r).join(`
`):o.removed?o.value.map(r=>"-"+r).join(`
`):o.value.map(r=>r).join(`
`));t.data=O(i.join(`
`),{language:"diff"}).value,t.type_style=""}else t.type_id==k.CREATE?(t.data=O(t.after,{language:"json"}).value,t.type_style="success"):t.type_id==k.DELETE?(t.data=O(t.before,{language:"json"}).value,t.type_style="danger"):t.type_id==k.BATCH_DELETE&&(t.data=O(t.before,{language:"json"}).value,t.type_style="danger");return t}),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},getObjectString(n){let e=[];for(let[t,s]of Object.entries(n))e.push(`${t}: ${s}`);return e.join(`
`)},handleSearch(){this.resetData()},handleSizeChange(n){localStorage.setItem(this.pageSizeCachekey,n),this.resetData()},loadPageSize(){let n=localStorage.getItem(this.pageSizeCachekey);n&&(this.size=parseInt(n))},async clearLogOperationList(){let n=this.$loading({fullscreen:!0});try{const e=await this.$http.clearLogOperationList();e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg)}catch(e){console.log(e)}finally{this.$nextTick(()=>{n.close()})}}},created(){this.loadPageSize(),this.getData()}},pe={class:"app-container"},fe={class:"flex justify-between mb-sm"};function ce(n,e,t,s,i,o){const r=v("Delete"),a=v("el-icon"),u=v("el-link"),l=v("el-popconfirm"),d=v("DataTable"),p=v("el-pagination"),w=G("loading");return A(),I("div",pe,[D("div",fe,[e[2]||(e[2]=D("div",null,null,-1)),g(l,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:o.clearLogOperationList},{reference:m(()=>[g(u,{underline:!1,type:"danger",class:"mr-sm"},{default:m(()=>[g(a,null,{default:m(()=>[g(r)]),_:1}),F($(n.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"])]),f(" \u6570\u636E\u5217\u8868 "),Q(g(d,{list:i.list,onOnSuccess:o.resetData},null,8,["list","onOnSuccess"]),[[w,i.loading]]),f(" \u7FFB\u9875 "),g(p,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:i.total,"page-size":i.size,"onUpdate:pageSize":e[0]||(e[0]=y=>i.size=y),"current-page":i.page,"onUpdate:currentPage":e[1]||(e[1]=y=>i.page=y),onCurrentChange:o.getData,onSizeChange:o.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"])])}const we=B(ue,[["render",ce]]);export{we as default};
