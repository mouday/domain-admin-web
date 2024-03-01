<template>
  <div class="">
    <div class="text-sm color--info flex items-center justify-end">
      <el-icon><Warning /></el-icon>
      <span>&nbsp;验证通过后会自动加入到[证书监控]列表 </span>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="$t('文件验证')"
        name="file"
        lazy
      >
        <VerifyStepFile
          :form="form"
          :list="fileList"
          @on-success="handleSuccess"
        ></VerifyStepFile>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('DNS验证')"
        name="dns"
        lazy
      >
        <VerifyStepDNS
          :form="form"
          :list="dnsList"
          @on-success="handleSuccess"
        ></VerifyStepDNS>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'

import VerifyStepDNS from './VerifyStepDNS.vue'
import VerifyStepFile from './VerifyStepFile.vue'

export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
  },

  emits: ['on-success'],

  components: {
    VerifyStepDNS,
    VerifyStepFile,
  },

  data() {
    return {
      list: [],
      activeName: 'file',
    }
  },

  computed: {
    fileList() {
      return this.list
        .filter((item) => {
          return item.challenge && item.challenge.type == 'http-01'
        })
        .map((item) => {
          item.verify_path = '/.well-known/acme-challenge/' + item.token
          item.verify_url = 'http://' + item.domain + item.verify_path
          return item
        })
    },

    dnsList() {
      return this.list
        .filter((item) => {
          return item.challenge && item.challenge.type == 'dns-01'
        })
        .map((item) => {
          // 特殊处理www前缀
          if (item.sub_domain && item.sub_domain != 'www') {
            item.verify_key = `_acme-challenge.${item.sub_domain}`
          } else {
            item.verify_key = '_acme-challenge'
          }

          return item
        })
    },
  },

  methods: {
    async getData() {
      this.loading = true

      let params = {
        issue_certificate_id: this.form.id,
      }

      try {
        const res = await this.$http.getCertificateChallenges(params)
        this.list = res.data.list.map((item) => {
          if (item.challenge) {
            item = {
              ...item.challenge,
              ...item,
            }
          }

          if (item.status == 'valid') {
            item.status_value = true
          } else if (item.status == 'invalid') {
            item.status_value = false
          } else {
            item.status_value = null
          }

          return item
        })
        console.log(this.list)

        this.total = res.data.total

        // 如果仅dns可用，则默认选中dns tab
        if (this.fileList.length == 0 && this.dnsList.length > 0) {
          this.activeName = 'dns'
        } else {
          this.activeName = 'file'
        }

      } catch (e) {
        console.log(e)
        // this.msg.error(e.msg);
      } finally {
        this.loading = false
      }
    },

    handleSuccess() {
      this.$emit('on-success')
    },
  },

  mounted() {},

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped>
.verify-step__value {
  font-size: 12px;
  word-break: break-all;
}
</style>
