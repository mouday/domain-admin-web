<template>
  <el-link
    :underline="false"
    type="primary"
    @click="checkDomainCert"
    :disabled="disableUpdateButton"
    ><el-icon><Position /></el-icon>{{ updateText }}</el-link
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
        return '正在检查'
      } else {
        return '证书检查'
      }
    },
  },

  methods: {
    async checkDomainCert() {
      this.updateTimer = setInterval(() => {
        this.getUpdateDomainStatusOfUser()
      }, 2000)

      const res = await this.$http.checkDomainCert()

      if (res.ok) {
        this.$msg.success('操作成功')
      }
    },

    async getUpdateDomainStatusOfUser() {
      const res = await this.$http.getCheckDomainStatusOfUser()

      if (res.ok) {
        if (res.data.status == false) {
          clearInterval(this.updateTimer)
          this.updateTimer = null

          this.$msg.success('操作成功')

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
