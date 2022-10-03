<template>
  <div class="app-container">
    <div class="flex">
      <el-button
        class="margin-left--auto"
        @click="sendDomainInfoListEmail"
        ><el-icon><Position /></el-icon>发送测试邮件</el-button
      >

      <el-button
        class="margin-left--auto"
        @click="checkDomainCert"
        ><el-icon><Promotion /></el-icon>域名证书到期检查</el-button
      >
    </div>

    <DataForm
      class="mt-md"
      @on-success="handleSuccess"
    ></DataForm>
  </div>
</template>

<script>
/**
 * created 2022-10-03
 */
import DataForm from './DataForm.vue'
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'user-edit',

  props: {},

  components: {
    DataForm,
  },

  data() {
    return {
      id: null,
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
    }),

    handleSuccess() {
      this.updateUserInfo()
    },

    async sendDomainInfoListEmail() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.sendDomainInfoListEmail()

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },

    async checkDomainCert() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.checkDomainCert()

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
  },

  created() {
    this.id = this.$route.query.id
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
