<template>
  <div class="">
    <el-steps
      :active="activeStep"
      align-center
      finish-status="success"
    >
      <template v-for="item in setpList">
        <el-step :title="item.title" />
      </template>
    </el-steps>

    <!-- <el-divider /> -->

    <div class="mt-md">
      <DataForm
        v-if="activeStep == 0"
        @on-success="handleIssueSuccess"
        @on-cancel="$emit('on-cancel')"
      ></DataForm>

      <VerifyStep
        v-else-if="activeStep == 1"
        :form="form"
        @on-success="handleVerifySuccess"
      ></VerifyStep>

      <!-- <RenewStep
        v-else-if="activeStep == 2"
        :form="form"
        @on-success="handleVerifySuccess"
      ></RenewStep> -->

      <DownloadStep
        v-else-if="activeStep == 2"
        :form="form"
        :issueCertificateId="issue_certificate_id"
        @on-close="$emit('on-cancel')"
      ></DownloadStep>
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
import DataForm from './DataForm.vue'
import VerifyStep from './VerifyStep.vue'
import RenewStep from './RenewStep.vue'
import DownloadStep from './DownloadStep.vue'

export default {
  name: 'IssueCertificateStep',

  props: {
    row: {
      type: Object,
    },
    defaultActiveStep: {
      type: Number,
      default: 0,
    },
  },

  components: {
    DataForm,
    VerifyStep,
    RenewStep,
    DownloadStep,
  },

  data() {
    return {
      host: '',
      hasInit: false,

      activeStep: 0,
      issue_certificate_id: null,
      form: {
        id: null,
        domains: [],
        // domain_validation_urls: [],
        validation: '',
        token: '',
        status: '',
        ssl_certificate_key: '',
        ssl_certificate: '',
        deploy_key_file: '',
        deploy_fullchain_file: '',
        deploy_reloadcmd: '',
        deploy_host: null,
      },
      
      setpList: [
        {
          title: this.$t('填写域名'),
        },
        {
          title: this.$t('验证域名'),
        },
        {
          title: this.$t('部署证书'),
        },
      ],
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (!this.issue_certificate_id) {
        return
      }

      let params = {
        issue_certificate_id: this.issue_certificate_id,
      }

      const res = await this.$http.getIssueCertificateById(params)

      if (!res.ok) {
        return
      }

      // 域名列表
      for (let key in this.form) {
        this.form[key] = res.data[key]
      }

      this.activeStep = this.defaultActiveStep

      if (res.data.ssl_certificate) {
        this.activeStep = 2
      } else if (res.data.status == 'valid') {
        this.activeStep = 2
      } else if (res.data.id) {
        this.activeStep = 1
      } else {
        this.activeStep = 0
      }
    },

    handleIssueSuccess(data) {
      this.issue_certificate_id = data.id

      this.getData()
    },

    handleVerifySuccess() {
      this.getData()
    },
  },

  created() {
    if (this.row) {
      this.issue_certificate_id = this.row.id
    }

    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
