import{_ as l}from"./index.71c1d1bf.js";import{ah as c,o as d,O as i}from"./vendor-vue.9e61e0af.js";const u={name:"SearchUser",props:{keyword:{type:String,default:""}},emits:["on-select","update:keyword"],components:{},data(){return{loading:!1}},computed:{keyword_:{get(){return this.keyword},set(e){this.$emit("update:keyword",e)}}},methods:{async getData(){},async querySearchAsync(e,t){const r=await this.searchUser();t(r)},async searchUser(){this.loading=!0;let e={keyword:this.keyword},t=[];try{const r=await this.$http.getUserList(e);r.ok&&(t=r.data.list.map(s=>(s.value=s.username,s)))}catch(r){console.log(r)}finally{this.loading=!1}return t},handleSelectUser(e){this.$emit("on-select",e)}},created(){this.getData()}};function h(e,t,r,s,p,a){const o=c("el-autocomplete");return d(),i(o,{modelValue:a.keyword_,"onUpdate:modelValue":t[0]||(t[0]=n=>a.keyword_=n),"fetch-suggestions":a.querySearchAsync,placeholder:"\u641C\u7D22\u7528\u6237\u540D",debounce:500,clearable:"",onSelect:a.handleSelectUser},null,8,["modelValue","fetch-suggestions","onSelect"])}const g=l(u,[["render",h]]);export{g as S};
