<template>
  <div>
    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleSubmit"
        >申 请</el-button
      >
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'
import { highlight } from '@/utils/highlight-util.js'
import hljs from 'highlight.js'
import RemoteHost from '@/components/remote-host/index.vue'
import { formatExportDomain } from '@/utils/domain-util.js'

export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
  },

  emits: ['on-success'],

  components: {
    RemoteHost,
  },

  data() {
    return {
      hasInit: false,
      host: '',
      keyDeployPath: '',
      pemDeployPath: '',
    }
  },

  computed: {
    domain_list() {
      return this.form.domains.join(' ')
    },

    nginxConfig() {
      return highlight(this.nginxConfigTemplate, { language: 'nginx' }).value
    },
  },

  methods: {
    async getData() {
      this.keyDeployPath = `/path/to/${this.form.domains[0]}.key`
      this.pemDeployPath = `/path/to/${this.form.domains[0]}.pem`
    },

    handleClose() {
      this.$emit('on-close')
    },
    
    async handleSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
      }

      const res = await this.$http.renewCertificate(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })

      return res
    },

    downloadSSLKeyFile() {
      console.log(JSON.stringify(this.form, null, 2))

      let blob = new Blob([this.form.ssl_certificate_key], {
        type: 'text/plain;charset=utf-8',
      })

      let name = formatExportDomain(this.form.domains[0])
      FileSaver.saveAs(blob, `${name}.key`)
    },

    async downloadSSLFile() {
      if (!this.form.ssl_certificate) {
        const res = await this.handleSubmit()
        this.form.ssl_certificate = res.data.ssl_certificate
      }

      let blob = new Blob([this.form.ssl_certificate], {
        type: 'text/plain;charset=utf-8',
      })
      let name = formatExportDomain(this.form.domains[0])
      FileSaver.saveAs(blob, `${name}.pem`)
    },

    async getDomainHost() {
      let params = {
        // 域名列表
        domain: this.form.domains[0],
      }

      const res = await this.$http.getDomainHost(params)

      if (res.code == 0) {
        this.host = res.data.host
      } else {
        this.$msg.error(res.msg)
      }

      this.hasInit = true
    },

    handleDeployVerifyFile() {},
  },

  mounted() {
    hljs.highlightAll()
  },

  created() {
    this.getDomainHost()
    this.getData()
  },
}
</script>

<style lang="less">
// .mo-form-detail .code-item .el-form-item__content {
//   padding: 0;
// }
</style>

<style lang="less" scoped>
.verify-step__value {
  font-size: 12px;
  word-break: break-all;
}
</style>
