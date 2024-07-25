<template>
  <div>
    <el-form
      ref="form"
      :model="deployForm"
      :rules="rules"
      label-width="160px"
    >
      <el-form-item
        :label="$t('域名')"
        prop="domain"
      >
        <a
          class="mo-link"
          target="_blank"
          :href="`https://${domain}`"
          >{{ domain }}</a
        >
      </el-form-item>

      <el-form-item
        :label="$t('DNS账号')"
        prop="dns"
      >
        <div class="flex items-center">
          <!-- 如果不是默认22端口再显示 -->
          <template v-if="deployForm.dns && deployForm.dns.value">
            <el-tag
              class="cursor-pointer"
              closable
              @close="handleClose"
              @click="handleEditHost"
              >{{ deployForm.dns.value }}</el-tag
            >
          </template>

          <template v-else>
            <SelectDns
              :modelValue="deployForm.dns"
              @on-change="handleChangeHost"
            ></SelectDns>
          </template>

          <!-- 一键部署 -->
          <el-button
            class="ml-md"
            type="primary"
            :disabled="disabled"
            @click="handleDeploy"
            >{{ $t('一键部署') }}</el-button
          >
        </div>

        <div class="ml-sm text-sm color--info flex items-center">
          <el-icon><Warning /></el-icon>
          <span>&nbsp;目前，仅支持阿里云</span>
        </div>
      </el-form-item>
    </el-form>

    <!-- 编辑框 -->
    <el-dialog
      title="DNS账号"
      v-model="visible"
      width="400px"
      center
      top="20px"
      append-to-body
      @close="handleDialogClose"
    >
      <DNSDataForm
        v-if="visible"
        :row="deployForm.dns"
        @on-cancel="handleDialogClose"
        @on-success="handleSuccess"
      ></DNSDataForm>
    </el-dialog>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'
import JSZip from 'jszip'

import SelectDns from '@/components/select-dns/index.vue'
import DNSDataForm from '@/views/dns-edit/DataForm.vue'
import { DNSTypeOptions } from '@/emuns/dns-type-enums.js'
import { CertDeployTypeEnum } from '@/emuns/cert-deploy-type-enums.js'

export default {
  name: 'DownloadStepByOSS',

  props: {
    form: {
      type: Object,
    },
  },

  emits: ['on-success', 'on-close'],

  components: {
    SelectDns,
    DNSDataForm,
  },

  data() {
    return {
      host: '',

      visible: false,

      deployForm: {
        // id, value
        dns: null,
      },

      rules: {
        dns: [
          {
            message: 'DNS不能为空',
            required: true,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    disabled() {
      return !(this.deployForm.dns && this.deployForm.dns.value)
    },

    domain() {
      return this.form.domains?.[0]
    },
  },

  methods: {
    getData() {
      console.log(this.form)

      if (
        this.form &&
        this.form.cert_deploy_dns &&
        this.form.deploy_type_id == CertDeployTypeEnum.CDN
      ) {
        this.handleSuccess(this.form.cert_deploy_dns)
      }
    },

    async handleDeploy() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmDeploy()
        } else {
          return false
        }
      })
    },

    async confirmDeploy() {
      // console.log(this.deployForm);

      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
        dns_id: this.deployForm.dns.id,
      }

      const res = await this.$http.deployCertToCdn(params)

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

    handleChangeHost(data) {
      console.log(data)
      this.deployForm.dns = data
      this.$refs.form.validateField(['dns'])
    },

    handleClose() {
      this.deployForm.dns = null
    },

    handleEditHost() {
      this.visible = true
    },

    handleDialogClose() {
      this.visible = false
    },

    handleSuccess(data) {
      let dns_type_label = DNSTypeOptions.find(
        (o) => o.value == data.dns_type_id
      )?.label

      data.value = `${data.name}(${dns_type_label})`

      this.deployForm.dns = data
      this.handleDialogClose()
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
