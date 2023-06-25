<template>
  <el-link
    :underline="false"
    type="primary"
    @click="updateAllDomainCertInfoOfUser"
    :disabled="disableUpdateButton"
    ><el-icon><Refresh /></el-icon>{{ updateText }}</el-link
  >
</template>

<script>
// created at 2023-04-04
export default {
  name: 'updateDomainInfo',

  props: {},

  components: {},

  data() {
    return {
      updateTimer: null,
    }
  },

  computed: {
    disableUpdateButton() {
      return this.updateTimer != null
    },

    updateText() {
      if (this.disableUpdateButton) {
        return '正在更新'
      } else {
        return '全部更新'
      }
    },
  },

  methods: {
    async updateAllDomainCertInfoOfUser() {
      // this.disableUpdateButton = true
      this.updateTimer = true

      const res = await this.$http.updateAllDomainCertInfoOfUser()

      // if (res.code == 0) {
      //   this.$msg.success('操作成功')
      // }
    },
  },

  beforeUnmount() {
    clearInterval(this.updateTimer)
    this.updateTimer = null
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
