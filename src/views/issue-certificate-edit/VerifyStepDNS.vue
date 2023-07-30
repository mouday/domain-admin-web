<template>
  <div class="mo-form-detail">
    <VerifyStepDNSDataTable
      :form="form"
      :list="list"
      challenge-type="dns-01"
    ></VerifyStepDNSDataTable>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleSubmit"
        >验 证</el-button
      >
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'
import hljs from 'highlight.js'
import VerifyStepDNSDataTable from './VerifyStepDNSDataTable.vue'

export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
    list: {
      type: Array,
    },
  },

  emits: ['on-success'],

  components: {
    VerifyStepDNSDataTable,
  },

  data() {
    return {}
  },

  computed: {
    domain_list() {
      return this.form.domains.join(' ')
    },

    // https://github.com/diafygi/acme-tiny
    nginxConfig() {
      return `server {
  listen 80;
  server_name ${this.domain_list};

  location /.well-known/acme-challenge/ {
      alias /var/www/challenges/;
      try_files $uri =404;
  }
}`
    },
  },

  methods: {
    async getData() {},

    async handleSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
        challenge_type: 'dns-01',
      }

      const res = await this.$http.verifyCertificateById(params)

      if (res.code == 0) {
        this.$msg.success('验证成功')
        this.$emit('on-success', res.data)
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    downloadVerifyFile() {
      // 关于vue下载无后缀名的文件被加上后缀.txt，有后缀名的文件下载正常问题的解决
      // https://blog.csdn.net/yanziit/article/details/127990100
      let blob = new Blob([this.form.validation], {
        type: 'application/octet-stream;charset=utf-8',
      })
      FileSaver.saveAs(blob, this.form.token)
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

<style lang="less"></style>

<style lang="less" scoped>
.verify-step__value {
  font-size: 12px;
  word-break: break-all;
}
</style>
