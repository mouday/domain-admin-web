<template>
  <div class="mo-form-detail">
    <el-form label-width="130px">
      <el-form-item
        label="私钥"
        prop="domain"
      >
        <el-link
          :underline="false"
          type="primary"
          class="mr-sm"
          @click="downloadSSLKeyFile"
          ><el-icon><Download /></el-icon>点击下载</el-link
        >
      </el-form-item>

      <el-form-item
        label="公钥"
        prop="domain"
      >
        <el-link
          :underline="false"
          type="primary"
          class="mr-sm"
          @click="downloadSSLFile"
          ><el-icon><Download /></el-icon>点击下载</el-link
        >
      </el-form-item>

      <el-form-item
        label="Nginx配置"
        prop="domain"
      >
        <div style="padding: 10px 0; overflow-x: auto;">
          <pre><code v-html="nginxConfig"></code></pre>
        </div>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleClose"
        >关 闭</el-button
      >
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'
import { highlight } from '@/utils/highlight-util.js'
import hljs from 'highlight.js'

export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
  },

  components: {},

  data() {
    return {
      nginxConfigTemplate: `server {
    listen 443 ssl;
    server_name ${this.form.domain_list};

    ssl_certificate /path/to/${this.form.domains[0]}.pem;
    ssl_certificate_key /path/to/${this.form.domains[0]}.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:50m;
    ssl_dhparam /path/to/server.dhparam;
    ssl_prefer_server_ciphers on;
}`,
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
    async getData() {},

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
        this.$emit('on-success', res.data)
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

      let name = this.form.domains[0]
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
      let name = this.form.domains[0]
      FileSaver.saveAs(blob, `${name}.pem`)
    },
  },

  mounted() {
    hljs.highlightAll()
  },

  created() {
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
