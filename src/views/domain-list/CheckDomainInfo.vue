<template>
  <el-link
    :underline="false"
    type="primary"
    @click="handleNotifyByEventId"
    :disabled="disableUpdateButton"
    ><el-icon><Position /></el-icon>{{ updateText }}</el-link
  >
</template>

<script>
// created at 2023-04-04
import {EventEnum} from "@/emuns/event-enums.js"

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
    async handleNotifyByEventId() {
  
      const res = await this.$http.handleNotifyByEventId({
        event_id: EventEnum.SSL_CERT_EXPIRE, // ssl证书到期
      })

      if (res.ok) {
        this.$msg.success(`成功渠道：${res.data.success}`)
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
