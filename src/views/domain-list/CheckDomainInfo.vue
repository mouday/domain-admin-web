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
import { EventEnum } from '@/emuns/event-enums.js'

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
      let loading = this.$loading({
        lock: true,
        text: '检查中',
        fullscreen: true,
      })

      try {
        const res = await this.$http.handleNotifyByEventId({
          event_id: EventEnum.SSL_CERT_EXPIRE, // ssl证书到期
        })

        if (res.ok) {
          this.$msg.success(`检查渠道：${res.data.success}`)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loading.close()
        })
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
