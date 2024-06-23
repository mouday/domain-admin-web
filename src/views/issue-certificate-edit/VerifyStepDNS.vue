<template>
  <div class="">
    <VerifyStepDNSDataTable
      :form="form"
      :list="list"
      challenge-type="dns-01"
    ></VerifyStepDNSDataTable>

    <!-- 添加表单 -->
    <el-form
      ref="form"
      label-width="130px"
      class="mt-md"
      :model="deployForm"
      :rules="rules"
    >
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
            :disabled="disabled"
            @click="handleDeployVerifyFile"
            >{{ $t('一键部署') }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleSubmit"
        >验 证</el-button
      >
    </div>

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
      <DataForm
        v-if="visible"
        :row="deployForm.dns"
        @on-cancel="handleDialogClose"
        @on-success="handleSuccess"
      ></DataForm>
    </el-dialog>
  </div>
</template>

<script>
// created at 2023-07-23
import FileSaver from 'file-saver'
import hljs from 'highlight.js'
import VerifyStepDNSDataTable from './VerifyStepDNSDataTable.vue'
import SelectDns from '@/components/select-dns/index.vue'
import DataForm from '@/views/dns-edit/DataForm.vue'
import { DNSTypeOptions } from '@/emuns/dns-type-enums.js'

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
    SelectDns,
    DataForm,
  },

  data() {
    return {
      visible: false,
      deployForm: {
        deploy_host: '',
      },

      rules: {
        dns: [
          {
            required: true,
            message: '请选择DNS账号',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    disabled() {
      return !Boolean(this.deployForm.dns)
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

    handleClose() {
      this.deployForm.dns = null
    },

    handleChangeHost(data) {
      console.log(data)
      this.deployForm.dns = data
      this.$refs.form.validateField(['dns'])
    },

    handleDeployVerifyFile() {
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
        dns_id: this.deployForm.dns.id,
      }

      const res = await this.$http.addDnsDomainRecord(params)

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
      this.handleClose()
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
