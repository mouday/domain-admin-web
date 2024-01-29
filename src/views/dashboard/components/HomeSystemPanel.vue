<template>
  <HomeCard
    :title="title"
    :desc="desc"
  >
    <el-row :gutter="20">
      <el-col :span="10">
        <HomeList :list="list"/>
      </el-col>

      <el-col :span="14">
        <ChartGauge
          :value="value"
          :subtext="subtext"
        />
      </el-col>
    </el-row>
  </HomeCard>
</template>

<script>
import HomeCard from './card.vue';
import HomeList from './HomeList.vue';
import ChartGauge from './ChartGauge.vue';

export default {
  props: {
    
    title: '',
    desc: '',
    // { value: 335, name: '直接访问', color: '#3AA1FF' },
    list: {type: Array},
    value: 0,
    subtext: '',
    
  },

  components: { ChartGauge, HomeCard, HomeList },

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

  created() {
    this.$refs.chart;
  },
};
</script>

<style lang="less" scoped>

</style>
