<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="110px"
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

      <!-- 域名列表 -->

      <el-form-item
        :label="$t('域名列表')"
        prop="domains"
      >
        <el-input
          type="textarea"
          v-model="form.domains"
          :rows="5"
          :placeholder="$t('请输入域名列表，每行一个')"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="证书厂商"
        prop="directory_type"
      >
        <!-- <el-select
          v-model="form.directory_type"
          :placeholder="$t('请选择证书厂商')"
        >
          <el-option
            v-for="item in DIRECTORY_URL_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->

        <el-radio-group v-model="form.directory_type">
          <el-radio-button
            class="directory_type_button"
            v-for="item in DIRECTORY_URL_OPTIONS"
            :key="item.value"
            :disabled="item.disabled"
            :label="item.value"
            ><img
              class="directory_icon"
              :src="item.icon"
              :alt="item.label"
          /></el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="加密算法"
        prop="key_type"
      >
        <el-radio-group v-model="form.key_type">
          <el-radio-button
            v-for="item in KEY_TYPE_OPTIONS"
            :key="item.value"
            :disabled="item.disabled"
            :label="item.value"
          >{{item.label}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="ml-[110px] text-sm color--info flex items-center">
      <el-icon><Warning /></el-icon>
      <span v-if="false"
        >&nbsp;免费SSL证书颁发机构:
        <a
          href="https://letsencrypt.org/zh-cn/docs/rate-limits/?from=domain-admin"
          target="_blank"
          class="mo-link"
          >Let’s Encrypt</a
        ></span
      >
      <span>申请域名为www.domain.com的证书同时支持保护domain.com</span>
    </div>

    <!-- 操作 -->
    <div class="text-center mt-md">
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
 * created 2023-07-23
 * */
import { formRules } from './config.js'
import { DIRECTORY_URL_OPTIONS } from '@/emuns/directory-type-enums.js'
import { KEY_TYPE_OPTIONS } from '@/emuns/key-type-enums.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      DIRECTORY_URL_OPTIONS,
      KEY_TYPE_OPTIONS,
      rules: formRules,

      // 引入枚举值

      form: {
        // 域名列表
        domains: '',
        // 验证状态
        status: '',
        // SSL签发时间
        start_time: '',
        directory_type: DIRECTORY_URL_OPTIONS[0].value,
        // SSL过期时间
        expire_time: '',
        key_type: KEY_TYPE_OPTIONS[0].value,
        // 创建时间
        create_time_label: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.function(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 域名列表
        this.form.domains = data.domains
        // 验证状态
        this.form.status = data.status
        // SSL签发时间
        this.form.start_time = data.start_time
        // SSL过期时间
        this.form.expire_time = data.expire_time
        // 创建时间
        this.form.create_time_label = data.create_time_label
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

      // 过滤用户输入的空行
      let domains = this.form.domains.split('\n')

      domains = domains
        .map((domain) => domain.trim())
        .filter((domain) => domain)

      if (domains.length == 0) {
        this.$msg.error('请输入域名')
        return
      }

      let params = {
        // 域名列表
        domains: domains,
        directory_type: this.form.directory_type,
        key_type: this.form.key_type,

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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.directory_type_button {
  .el-radio-button__inner {
    padding: 4px 6px;
  }
  .el-radio-button__original-radio:checked + .el-radio-button__inner {
    background-color: #fff;
  }
}
</style>

<style lang="less" scoped>
.directory_icon {
  width: 100px;
  height: 24px;
  object-fit: contain;
}
</style>
