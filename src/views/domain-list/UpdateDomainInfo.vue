<template>
  <el-button
    @click="updateAllDomainCertInfoOfUser"
    :disabled="disableUpdateButton"
    ><el-icon><Refresh /></el-icon>{{ updateText }}</el-button
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
      this.updateTimer = setInterval(() => {
        this.getUpdateDomainStatusOfUser()
      }, 2000)

      const res = await this.$http.updateAllDomainCertInfoOfUser()

      if (res.code == 0) {
        this.$msg.success('操作成功')
      }
    },

    async getUpdateDomainStatusOfUser() {
      const res = await this.$http.getUpdateDomainStatusOfUser()

      if (res.ok) {
        if (res.data.status == false) {
          clearInterval(this.updateTimer)
          this.updateTimer = null
          this.$emit('on-success')
        }
      }
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
