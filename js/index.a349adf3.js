import{H as Z}from"./highlight-lib.2ee09073.js";import{_ as F}from"./index.d131bb2e.js";import{ai as v,o as A,c as I,U as h,O as m,R as c,a as b,T as z,S as V,aq as G,P as Q}from"./vendor-vue.279aabbf.js";import{h as O}from"./highlight-util.7ff64d2a.js";import"./element-plus.2186919a.js";import"./element-icon.a3660786.js";import"./vendor-lib.c8503388.js";const X={name:"",components:{},props:{list:{type:Array}},computed:{},data(){return{currentRow:null,dialogVisible:!1}},methods:{handleEditRow(n){this.currentRow=n,this.dialogVisible=!0},async handleDeleteClick(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},async handleStatusChange(n){let e={id:n.id};const t=await this.$http.function(e);t.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.$emit("on-success")):this.$msg.error(t.msg)},handleUpdateSuccess(){this.$emit("on-success")}},mounted(){Z.highlightAll()},created(){}},Y={key:0},K=["innerHTML"],ee={key:1},te=["innerHTML"];function ne(n,e,t,i,s,o){const l=v("el-table-column"),a=v("el-tag"),u=v("el-table");return A(),I("div",null,[h(u,{data:t.list,stripe:"",border:""},{default:m(()=>[c(` <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
        `),c(" \u64CD\u4F5C\u4EBA "),h(l,{label:n.$t("\u64CD\u4F5C\u4EBA"),"header-align":"center",align:"center",width:"100",prop:"user_name","show-overflow-tooltip":""},{default:m(r=>[b("span",null,z(r.row.user_name||"-"),1)]),_:1},8,["label"]),c(" \u64CD\u4F5C\u8868 "),h(l,{label:n.$t("\u64CD\u4F5C\u8868"),width:"120","header-align":"center",align:"center",prop:"table","show-overflow-tooltip":""},{default:m(r=>[b("span",null,z(r.row.table||"-"),1)]),_:1},8,["label"]),c(" \u64CD\u4F5C\u7C7B\u578B "),h(l,{label:n.$t("\u64CD\u4F5C\u7C7B\u578B"),"header-align":"center",align:"center",prop:"type_id",width:"100"},{default:m(r=>[h(a,{type:r.row.type_style},{default:m(()=>[V(z(r.row.type_label),1)]),_:2},1032,["type"])]),_:1},8,["label"]),c(" \u64CD\u4F5C\u7C7B\u578B "),h(l,{label:n.$t("\u6570\u636E\u53D8\u5316"),"header-align":"center",align:"left",prop:"type_id"},{default:m(r=>[c(` <pre
            v-if="scope.row.type_style == ''"
            class="code"
            v-html="scope.row.data"
          ></pre> `),c(` <highlightjs
            v-else
            language="json"
            :code="scope.row.data"
          /> `),r.row.type_style==""?(A(),I("pre",Y,[b("code",{class:"language-diff",innerHTML:r.row.data},null,8,K)])):(A(),I("pre",ee,[b("code",{class:"language-json",innerHTML:r.row.data},null,8,te)]))]),_:1},8,["label"]),c(" \u64CD\u4F5C\u524D "),c(` <el-table-column
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
      </el-table-column> `),c(" \u64CD\u4F5C\u65F6\u95F4 "),h(l,{label:n.$t("\u64CD\u4F5C\u65F6\u95F4"),"header-align":"center",align:"center",prop:"create_time",width:"130"},{default:m(r=>[b("span",null,z(r.row.create_time_label||"-"),1)]),_:1},8,["label"])]),_:1},8,["data"])])}const oe=F(X,[["render",ne]]),k={CREATE:1,UPDATE:2,DELETE:3,BATCH_DELETE:4};function y(){}y.prototype={diff:function(e,t){var i,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},o=s.callback;typeof s=="function"&&(o=s,s={}),this.options=s;var l=this;function a(d){return o?(setTimeout(function(){o(void 0,d)},0),!0):d}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var u=t.length,r=e.length,g=1,p=u+r;s.maxEditLength&&(p=Math.min(p,s.maxEditLength));var _=(i=s.timeout)!==null&&i!==void 0?i:1/0,D=Date.now()+_,f=[{oldPos:-1,lastComponent:void 0}],w=this.extractCommon(f[0],t,e,0);if(f[0].oldPos+1>=r&&w+1>=u)return a([{value:this.join(t),count:t.length}]);var E=-1/0,T=1/0;function j(){for(var d=Math.max(E,-g);d<=Math.min(T,g);d+=2){var C=void 0,L=f[d-1],$=f[d+1];L&&(f[d-1]=void 0);var N=!1;if($){var H=$.oldPos-d;N=$&&0<=H&&H<u}var J=L&&L.oldPos+1<r;if(!N&&!J){f[d]=void 0;continue}if(!J||N&&L.oldPos+1<$.oldPos?C=l.addToPath($,!0,void 0,0):C=l.addToPath(L,void 0,!0,1),w=l.extractCommon(C,t,e,d),C.oldPos+1>=r&&w+1>=u)return a(ie(l,C.lastComponent,t,e,l.useLongestToken));f[d]=C,C.oldPos+1>=r&&(T=Math.min(T,d-1)),w+1>=u&&(E=Math.max(E,d+1))}g++}if(o)(function d(){setTimeout(function(){if(g>p||Date.now()>D)return o();j()||d()},0)})();else for(;g<=p&&Date.now()<=D;){var q=j();if(q)return q}},addToPath:function(e,t,i,s){var o=e.lastComponent;return o&&o.added===t&&o.removed===i?{oldPos:e.oldPos+s,lastComponent:{count:o.count+1,added:t,removed:i,previousComponent:o.previousComponent}}:{oldPos:e.oldPos+s,lastComponent:{count:1,added:t,removed:i,previousComponent:o}}},extractCommon:function(e,t,i,s){for(var o=t.length,l=i.length,a=e.oldPos,u=a-s,r=0;u+1<o&&a+1<l&&this.equals(t[u+1],i[a+1]);)u++,a++,r++;return r&&(e.lastComponent={count:r,previousComponent:e.lastComponent}),e.oldPos=a,u},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],i=0;i<e.length;i++)e[i]&&t.push(e[i]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function ie(n,e,t,i,s){for(var o=[],l;e;)o.push(e),l=e.previousComponent,delete e.previousComponent,e=l;o.reverse();for(var a=0,u=o.length,r=0,g=0;a<u;a++){var p=o[a];if(p.removed){if(p.value=n.join(i.slice(g,g+p.count)),g+=p.count,a&&o[a-1].added){var D=o[a-1];o[a-1]=o[a],o[a]=D}}else{if(!p.added&&s){var _=t.slice(r,r+p.count);_=_.map(function(w,E){var T=i[g+E];return T.length>w.length?T:w}),p.value=n.join(_)}else p.value=n.join(t.slice(r,r+p.count));r+=p.count,p.added||(g+=p.count)}}var f=o[u-1];return u>1&&typeof f.value=="string"&&(f.added||f.removed)&&n.equals("",f.value)&&(o[u-2].value+=f.value,o.pop()),o}var U=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,B=/\S/,W=new y;W.equals=function(n,e){return this.options.ignoreCase&&(n=n.toLowerCase(),e=e.toLowerCase()),n===e||this.options.ignoreWhitespace&&!B.test(n)&&!B.test(e)};W.tokenize=function(n){for(var e=n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<e.length-1;t++)!e[t+1]&&e[t+2]&&U.test(e[t])&&U.test(e[t+2])&&(e[t]+=e[t+2],e.splice(t+1,2),t--);return e};var P=new y;P.tokenize=function(n){this.options.stripTrailingCr&&(n=n.replace(/\r\n/g,`
`));var e=[],t=n.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var i=0;i<t.length;i++){var s=t[i];i%2&&!this.options.newlineIsToken?e[e.length-1]+=s:(this.options.ignoreWhitespace&&(s=s.trim()),e.push(s))}return e};var se=new y;se.tokenize=function(n){return n.split(/(\S.+?[.!?])(?=\s+|$)/)};var le=new y;le.tokenize=function(n){return n.split(/([{}:;,]|\s+)/)};function R(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?R=function(e){return typeof e}:R=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(n)}var re=Object.prototype.toString,x=new y;x.useLongestToken=!0;x.tokenize=P.tokenize;x.castInput=function(n){var e=this.options,t=e.undefinedReplacement,i=e.stringifyReplacer,s=i===void 0?function(o,l){return typeof l>"u"?t:l}:i;return typeof n=="string"?n:JSON.stringify(M(n,null,null,s),s,"  ")};x.equals=function(n,e){return y.prototype.equals.call(x,n.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function M(n,e,t,i,s){e=e||[],t=t||[],i&&(n=i(s,n));var o;for(o=0;o<e.length;o+=1)if(e[o]===n)return t[o];var l;if(re.call(n)==="[object Array]"){for(e.push(n),l=new Array(n.length),t.push(l),o=0;o<n.length;o+=1)l[o]=M(n[o],e,t,i,s);return e.pop(),t.pop(),l}if(n&&n.toJSON&&(n=n.toJSON()),R(n)==="object"&&n!==null){e.push(n),l={},t.push(l);var a=[],u;for(u in n)n.hasOwnProperty(u)&&a.push(u);for(a.sort(),o=0;o<a.length;o+=1)u=a[o],l[u]=M(n[u],e,t,i,u);e.pop(),t.pop()}else l=n;return l}var S=new y;S.tokenize=function(n){return n.slice()};S.join=S.removeEmpty=function(n){return n};function ae(n,e,t){return S.diff(n,e,t)}const ue={name:"log_operation-list",props:{},components:{DataTable:oe},data(){return{list:[],total:0,page:1,size:20,keyword:"",loading:!0,dialogVisible:!1,pageSizeCachekey:"pageSize"}},computed:{},methods:{resetData(){this.page=1,this.list=[],this.getData()},async getData(){this.loading=!0;let n={page:this.page,size:this.size,keyword:this.keyword};try{const e=await this.$http.getOperationLogList(n);e.code==0&&(this.list=e.data.list.map(t=>{try{t.before=JSON.stringify(JSON.parse(t.before),null,2)}catch{}try{t.after=JSON.stringify(JSON.parse(t.after),null,2)}catch{}if(t.type_id==k.UPDATE){let s=ae(t.before.split(`
`),t.after.split(`
`)).map(o=>o.added?o.value.map(l=>"+"+l).join(`
`):o.removed?o.value.map(l=>"-"+l).join(`
`):o.value.map(l=>l).join(`
`));t.data=O(s.join(`
`),{language:"diff"}).value,t.type_style=""}else t.type_id==k.CREATE?(t.data=O(t.after,{language:"json"}).value,t.type_style="success"):t.type_id==k.DELETE?(t.data=O(t.before,{language:"json"}).value,t.type_style="danger"):t.type_id==k.BATCH_DELETE&&(t.data=O(t.before,{language:"json"}).value,t.type_style="danger");return t}),this.total=e.data.total)}catch(e){console.log(e)}finally{this.loading=!1}},handleAddRow(){this.dialogVisible=!0},handleAddSuccess(){this.resetData()},getObjectString(n){let e=[];for(let[t,i]of Object.entries(n))e.push(`${t}: ${i}`);return e.join(`
`)},handleSearch(){this.resetData()},handleSizeChange(n){localStorage.setItem(this.pageSizeCachekey,n),this.resetData()},loadPageSize(){let n=localStorage.getItem(this.pageSizeCachekey);n&&(this.size=parseInt(n))},async clearLogOperationList(){let n=this.$loading({fullscreen:!0});try{const e=await this.$http.clearLogOperationList();e.code==0?(this.$msg.success("\u64CD\u4F5C\u6210\u529F"),this.resetData()):this.$msg.error(e.msg)}catch(e){console.log(e)}finally{this.$nextTick(()=>{n.close()})}}},created(){this.loadPageSize(),this.getData()}},pe={class:"app-container"},fe={class:"flex justify-end mb-sm"};function ce(n,e,t,i,s,o){const l=v("Delete"),a=v("el-icon"),u=v("el-link"),r=v("el-popconfirm"),g=v("Refresh"),p=v("DataTable"),_=v("el-pagination"),D=G("loading");return A(),I("div",pe,[b("div",fe,[e[2]||(e[2]=b("div",null,null,-1)),h(r,{title:"\u786E\u5B9A\u6E05\u7A7A\u65E5\u5FD7\uFF1F",onConfirm:o.clearLogOperationList},{reference:m(()=>[h(u,{underline:!1,type:"danger",class:"mr-sm"},{default:m(()=>[h(a,null,{default:m(()=>[h(l)]),_:1}),V(z(n.$t("\u6E05\u7A7A\u65E5\u5FD7")),1)]),_:1})]),_:1},8,["onConfirm"]),h(u,{underline:!1,type:"primary",disabled:s.loading,onClick:o.getData},{default:m(()=>[h(a,null,{default:m(()=>[h(g)]),_:1}),V(z(n.$t("\u5237\u65B0")),1)]),_:1},8,["disabled","onClick"])]),c(" \u6570\u636E\u5217\u8868 "),Q(h(p,{list:s.list,onOnSuccess:o.resetData},null,8,["list","onOnSuccess"]),[[D,s.loading]]),c(" \u7FFB\u9875 "),h(_,{class:"mt-md justify-center",background:"",layout:"total, sizes, prev, pager, next",total:s.total,"page-size":s.size,"onUpdate:pageSize":e[0]||(e[0]=f=>s.size=f),"current-page":s.page,"onUpdate:currentPage":e[1]||(e[1]=f=>s.page=f),onCurrentChange:o.getData,onSizeChange:o.handleSizeChange},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"])])}const we=F(ue,[["render",ce]]);export{we as default};
