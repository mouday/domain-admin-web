<template>
  <div class="progress-list">
    <div
      :key="item.name"
      class="item"
      v-for="item in list"
    >
      <p>
        <i :style="{background:item.color}"></i>
        <span>{{item.name}}</span>
        <span style="margin-left:10px;">{{item.value}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    // eg: { value: 335, name: '直接访问', color: '#3AA1FF' },
    list: { type: Array },
  },

  components: {},

  data() {
    return {
      // list: [
      //   { value: 335, name: '直接访问', color: '#3AA1FF' },
      //   { value: 310, name: '邮件营销', color: '#36CBCB' },
      //   { value: 234, name: '联盟广告', color: '#4ECB73' },
      //   { value: 135, name: '视频广告', color: '#F47F92' },
      //   { value: 1548, name: '搜索引擎', color: '#FBD437' },
      // ],
    };
  },

  computed: {},

  methods: {
    async getData() {},
  },

  created() {
    this.getData();
  },
};
</script>


<style lang="less" scoped>
.progress-list {
  // height: 100%;
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .item {
    display: flex;
    font-size: 16px;
    color: #595959;
    // margin-bottom: 16px;
    span {
      color: #808080;
      // margin: 0 29px;
    }

    p {
      width: 400px;
      i {
        display: inline-block;
        border-radius: 5px;
        width: 10px;
        height: 10px;
        // margin-right: 6px;
        background: #f66;
      }
      // padding-right: 200px;
    }
    .progress {
      flex: 1;
    }
  }
}
</style>