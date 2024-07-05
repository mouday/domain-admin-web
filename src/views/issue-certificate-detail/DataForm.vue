<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        label="id"
        prop="id"
        style="display: none"
      >
        <el-input
          type="text"
          v-model="form.id"
          placeholder="id"
        ></el-input>
      </el-form-item>

      <!-- 证书文件 -->
      <el-form-item
        label="证书文件"
        prop="domains"
      >
        <el-input
          type="textarea"
          v-model="form.ssl_certificate"
          :rows="10"
          :spellcheck="false"
          placeholder="请输入域名列表，每行一个"
        ></el-input>
      </el-form-item>

      <!-- 证书私钥 -->
      <el-form-item
        label="证书私钥"
        prop="domains"
      >
        <el-input
          type="textarea"
          v-model="form.ssl_certificate_key"
          :rows="10"
          :spellcheck="false"
          placeholder="请输入域名列表，每行一个"
        ></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('证书文件')"
        prop="domain"
      >
        <el-link
          :underline="false"
          type="primary"
          class="mr-sm"
          @click="downloadSSLFile"
          ><el-icon><Download /></el-icon>{{ $t('点击下载') }}（.zip）</el-link
        >
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">关 闭</el-button>
      <!-- <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('确定') }}</el-button
      > -->
    </div>
  </div>
</template>

<script>
/**
 * props:
 *  row
 *
 * event:
 *  on-cancel
 *  on-success
 *
 * created 2023-07-23
 * */
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { formatExportDomain } from '@/utils/domain-util.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: {},

      // 引入枚举值

      form: {
        domains: [],
        // 域名列表
        ssl_certificate: '',
        // 验证状态
        ssl_certificate_key: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      let params = {
        issue_certificate_id: this.row.id,
      }

      const res = await this.$http.getIssueCertificateById(params)

      if (res.ok) {
        for (let key in this.form) {
          this.form[key] = res.data[key]
        }
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        domains: this.form.domains.split('\n'),
        // 验证状态
        // status: this.form.status,
        // // SSL签发时间
        // start_time: this.form.start_time,
        // // SSL过期时间
        // expire_time: this.form.expire_time,
        // // 创建时间
        // create_time_label: this.form.create_time_label,
      }

      // 编辑
      if (this.row) {
        params['id'] = this.row.id
      }

      const res = await this.$http.issueCertificate(params)

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
    },

    async downloadSSLFile() {
      let name = formatExportDomain(this.form.domains[0])

      const zip = new JSZip()

      zip.file(`${name}.pem`, this.form.ssl_certificate)
      zip.file(`${name}.key`, this.form.ssl_certificate_key)

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        FileSaver.saveAs(content, `${name}.zip`)
      })

      // let blob = new Blob([this.form.ssl_certificate], {
      //   type: 'text/plain;charset=utf-8',
      // })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
