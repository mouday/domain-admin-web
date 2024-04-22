<template>
  <div class="">
    <VerifyStepFileDataTable
      :form="form"
      :list="list"
      challenge-type="http-01"
    ></VerifyStepFileDataTable>

    <el-form
      ref="form"
      label-width="130px"
      class="mt-md"
      :model="deployForm"
      :rules="rules"
    >
      <el-form-item
        :label="$t('服务器地址')"
        prop="deploy_host"
      >
        <div class="flex">
          <RemoteHost
            v-if="hasInit"
            :defaultKeyword="host"
            v-model="deployForm.deploy_host"
            @on-change="handleChangeHost"
          ></RemoteHost>

          <!-- 一键部署 -->
          <el-button
            class="ml-md"
            :disabled="disabled"
            @click="handleDeployVerifyFile"
            >{{ $t('一键部署') }}</el-button
          >
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('服务器目录')"
        prop="verifyDeployPath"
      >
        <el-input v-model="deployForm.verifyDeployPath"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('Nginx配置')"
        prop="isp"
      >
        <CodeHighlight :value="nginxConfig"></CodeHighlight>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleVerifyCertificateById"
        >{{ $t('验证') }}</el-button
      >
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'

import VerifyStepFileDataTable from './VerifyStepFileDataTable.vue'
import RemoteHost from '@/components/remote-host/index.vue'
import CodeHighlight from '@/components/code-highlight/index.vue'

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
    VerifyStepFileDataTable,
    RemoteHost,
    CodeHighlight,
  },

  data() {
    return {
      host: '',
      hasInit: false,

      deployForm: {
        deploy_host: null,
        verifyDeployPath: '',
      },

      rules: {
        deploy_host: [
          {
            message: '服务器不能为空',
            required: true,
            trigger: 'blur',
          },
        ],
        verifyDeployPath: [
          {
            message: '服务器部署目录不能为空',
            required: true,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    disabled() {
      return !(this.deployForm.deploy_host && this.deployForm.deploy_host.id)
    },

    domain_list() {
      return this.form.domains.join(' ')
    },

    // https://github.com/diafygi/acme-tiny
    nginxConfig() {
      return `server {
  listen 80;
  server_name ${this.domain_list};

  location /.well-known/acme-challenge/ {
      alias ${this.deployForm.verifyDeployPath};
      try_files $uri = 404;
  }
}`
    },
  },

  methods: {
    async getData() {
      await this.getDomainHost()

      this.hasInit = true
    },

    async getDomainHost() {
      let domain = this.form.domains[0]

      // 泛域名直接返回
      if (domain.startsWith('*')) {
        return
      }

      let params = {
        // 域名列表
        domain: domain,
      }

      const res = await this.$http.getDomainHost(params)

      if (res.code == 0) {
        this.host = res.data.host

        if (this.host) {
          await this.getHost()
        }
      } else {
        this.$msg.error(res.msg)
      }
    },

    async getHost() {
      let params = {
        // 域名列表
        host: this.host,
      }

      const res = await this.$http.getHostList(params)

      if (res.data.list && res.data.list.length > 0) {
        this.deployForm.deploy_host = res.data.list[0]
      }
    },

    async handleVerifyCertificateById() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
        challenge_type: 'http-01',
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

    async handleDeployVerifyFile() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmDeployVerifyFile()
        } else {
          return false
        }
      })
    },

    async confirmDeployVerifyFile() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
        host_id: this.deployForm.deploy_host.id,
        verify_deploy_path: this.deployForm.verifyDeployPath,
        challenges: this.list,
      }

      const res = await this.$http.deployVerifyFile(params)

      if (res.code == 0) {
        this.$msg.success('部署成功')
        this.$emit('on-success', res.data)
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    handleChangeHost() {
      this.$refs.form.validateField(['deploy_host'])
    },
  },

  created() {
    this.deployForm.verifyDeployPath = '/var/www/challenges/'
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
