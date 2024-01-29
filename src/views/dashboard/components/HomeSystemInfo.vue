<template>
  <div class="">

    <el-row :gutter="20">
      <el-col :span="12">
        <HomeSystemPanel
          title="磁盘信息"
          desc='Disk'
          :list="disk_usage_list"
          :value="disk_usage.percent"
          subtext="磁盘使用率"
        />
      </el-col>

      <el-col :span="12">
        <HomeSystemPanel
          title="内存信息"
          desc="Memory"
          :list="virtual_memory_list"
          :value="virtual_memory.percent"
          subtext="内存使用率"
        />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import HomeSystemPanel from './HomeSystemPanel.vue';

export default {
  props: {
    value: Array,
  },
  components: { HomeSystemPanel },

  data() {
    return {
      virtual_memory: {},
      virtual_memory_list: [],
      disk_usage: {},
      disk_usage_list: [],
    };
  },
  methods: {
    async getData() {
      const res = await this.$Http.systemSystemInfo();
      this.virtual_memory = res.data.virtual_memory;
      this.virtual_memory_list = [
        {
          value: this.virtual_memory.total_format,
          name: '总内存',
          color: '#3AA1FF',
        },
        {
          value: this.virtual_memory.used_format,
          name: '已用内存',
          color: '#36CBCB',
        },
        {
          value: this.virtual_memory.available_format,
          name: '可用内存',
          color: '#4ECB73',
        },
      ];
      this.disk_usage = res.data.disk_usage;

      this.disk_usage_list = [
        {
          value: this.disk_usage.total_format,
          name: '总大小',
          color: '#FBD437',
        },
        {
          value: this.disk_usage.used_format,
          name: '已用大小',
          color: '#36CBCB',
        },
        {
          value: this.disk_usage.free_format,
          name: '剩余大小',
          color: '#F47F92',
        },
      ];
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less">
</style>
