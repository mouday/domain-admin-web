<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="$t('SSH部署')"
        name="ssh"
        lazy
      >
        <DownloadStepBySSH
          :form="form"
          @on-success="handleSuccess"
        ></DownloadStepBySSH>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('API部署')"
        name="api"
        lazy
      >
        <DownloadStepByAPI
          :form="form"
          :issueCertificate="issueCertificate"
          :issueCertificateId="issueCertificateId"
          @on-success="handleSuccess"
        ></DownloadStepByAPI>
      </el-tab-pane>
    </el-tabs>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button @click="handleClose">{{ $t('关闭') }}</el-button>
    </div>
  </div>
</template>

<script>
// created at 2023-07-23

import DownloadStepBySSH from './DownloadStepBySSH.vue'
import DownloadStepByAPI from './DownloadStepByAPI.vue'

export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
    
    issueCertificate: {
      type: Object,
    },

    issueCertificateId: {
      type: String,
    },
  },

  emits: ['on-success', 'on-close'],

  components: {
    DownloadStepBySSH,
    DownloadStepByAPI,
  },

  data() {
    return {
      activeName: 'ssh',
    }
  },

  methods: {
    handleClose() {
      this.$emit('on-close')
    },
    handleSuccess() {},
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
