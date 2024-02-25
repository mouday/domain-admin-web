<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 域名 -->

      <el-form-item
        label="域名"
        prop="domain"
      >
        <el-input
          type="text"
          v-model="form.domain"
          placeholder="请输入域名"
        ></el-input>
      </el-form-item>

      <!-- 证书 -->

      <el-form-item
        label="证书"
        prop="ssl_certificate"
      >
        <FileDrop
          @on-files="handleFileUpload('ssl_certificate', $event)"
          @on-dragenter="handleDragenter('ssl_certificate_input')"
          @on-dragleave="handleDragleave('ssl_certificate_input')"
        >
          <el-input
            ref="ssl_certificate_input"
            type="textarea"
            v-model="form.ssl_certificate"
            placeholder="证书内容（.pem文件），支持拖拽上传"
            :rows="6"
            :spellcheck="false"
            @change="handleCertificateChange"
          ></el-input>
        </FileDrop>
      </el-form-item>

      <!-- 证书私钥 -->

      <el-form-item
        label="证书私钥"
        prop="ssl_certificate_key"
      >
        <FileDrop
          @on-files="handleFileUpload('ssl_certificate_key', $event)"
          @on-dragenter="handleDragenter('ssl_certificate_key_input')"
          @on-dragleave="handleDragleave('ssl_certificate_key_input')"
        >
          <el-input
            ref="ssl_certificate_key_input"
            type="textarea"
            v-model="form.ssl_certificate_key"
            placeholder="证书私钥内容（.key文件），支持拖拽上传"
            :rows="6"
            :spellcheck="false"
          ></el-input>
        </FileDrop>
      </el-form-item>

      <!-- 签发时间 -->

      <div class="flex">
        <el-form-item
          label="签发时间"
          prop="start_time"
        >
          <el-date-picker
            v-model="form.start_time"
            type="date"
            placeholder="签发时间"
          />
        </el-form-item>

        <!-- 过期时间 -->

        <el-form-item
          label="过期时间"
          prop="expire_time"
        >
          <el-date-picker
            v-model="form.expire_time"
            type="date"
            placeholder="过期时间"
          />
        </el-form-item>
      </div>

      <!-- 备注 -->

      <el-form-item
        label="备注"
        prop="comment"
      >
        <el-input
          type="textarea"
          v-model="form.comment"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->

    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('确定') }}</el-button
      >
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
 * created 2024-02-25
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { genFileId } from 'element-plus'
import FileDrop from '@/components/FileDrop/FileDrop.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    FileDrop,
  },

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // 域名
        domain: '',
        // 证书
        ssl_certificate: '',
        // 证书私钥
        ssl_certificate_key: '',
        // 签发时间
        start_time: '',
        // 过期时间
        expire_time: '',
        // 备注
        comment: '',
        // 创建时间
        // create_time: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          certificate_id: this.row.certificate_id,
        }

        const res = await this.$http.getCertificateById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 域名
        this.form.domain = data.domain
        // 证书
        this.form.ssl_certificate = data.ssl_certificate
        // 证书私钥
        this.form.ssl_certificate_key = data.ssl_certificate_key
        // 签发时间
        this.form.start_time = data.start_time
        // 过期时间
        this.form.expire_time = data.expire_time
        // 备注
        this.form.comment = data.comment
        // 创建时间
        // this.form.create_time = data.create_time
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
        // 域名
        domain: this.form.domain,
        // 证书
        ssl_certificate: this.form.ssl_certificate,
        // 证书私钥
        ssl_certificate_key: this.form.ssl_certificate_key,
        // 签发时间
        start_time: this.form.start_time,
        // 过期时间
        expire_time: this.form.expire_time,
        // 备注
        comment: this.form.comment,
        // 创建时间
        // create_time: this.form.create_time,
      }

      // 编辑
      let res = null

      if (this.row) {
        params['certificate_id'] = this.row.certificate_id
        res = await this.$http.updateCertificateById(params)
      } else {
        res = await this.$http.addCertificate(params)
      }

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
    },

    async parsePublicCert() {
      let params = {
        certificate: this.form.ssl_certificate,
      }
      const res = await this.$http.parsePublicCert(params)
      console.log(res)

      if (res.ok && res.data) {
        this.form.domain = res.data.subject.CN
        this.form.start_time = res.data.notBefore
        this.form.expire_time = res.data.notAfter
      }

      this.$refs.form.validate()
    },

    handleCertificateChange() {
      if (!this.form.ssl_certificate) {
        return
      }

      this.parsePublicCert()
    },

    handleFileUpload(key, files) {
      console.log(key, files)

      if (files && files.length > 0) {
        let reader = new FileReader()
        reader.readAsText(files[0])
        // console.log(reader)
        reader.onload = (res) => {
          // console.log(res.target.result)
          this.form[key] = res.target.result

          if (key == 'ssl_certificate') {
            this.handleCertificateChange()
          }
        }
      }
    },

    handleDragenter(refValue) {
      console.log('handleDragenter', refValue)
      this.$refs[refValue].focus()
    },

    handleDragleave(refValue) {
      console.log('handleDragleave', refValue)
      this.$refs[refValue].blur()
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.el-textarea__inner:focus {
    outline: 0;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
}
</style>

<style lang="less" scoped></style>
