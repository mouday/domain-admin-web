<template>
  <div class="sidebar-info">
    <div v-if="version">{{ version }}</div>

    <a
      href="https://pypi.org/project/domain-admin/"
      target="_blank"
      class="sidebar-info__box"
    >
      <img
        alt="Version"
        src="https://img.shields.io/pypi/v/domain-admin.svg"
    /></a>

    <a
      href="https://github.com/dromara/domain-admin"
      target="_blank"
      class="sidebar-info__box"
    >
      <img
        alt="GitHub stars"
        src="https://img.shields.io/github/stars/dromara/domain-admin.svg?style=social"
    /></a>
  </div>
</template>

<script>
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: '',

  props: [],

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapState(useSystemStore, {
      version: 'version',
    }),
  },

  methods: {
    async getData() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.sidebar-info {
  color: #c1c6c8;
  font-size: 14px;
  padding-bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-info__box {
  margin-top: 10px;
}

// 黑色主题
.theme--dark {
  .sidebar-info {
    color: #a2a4a6;
  }
}
</style>
