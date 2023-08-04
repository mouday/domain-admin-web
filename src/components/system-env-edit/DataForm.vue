<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
      aria-label="left"
    >
      <!-- prometheus_key -->

      <el-form-item
        label="Prometheus Key"
        prop="prometheus_key"
      >
        <span>{{ form.prometheus_key }}</span>
        <span 
          @click="handleCopyClick(form.prometheus_key)"
          class="mo-link ml-sm"
          ><el-icon><DocumentCopy /></el-icon
        ></span>
      </el-form-item>

      <!-- Token有效期（天） -->

      <!-- <el-form-item
        label="Token有效期"
        prop="token_expire_days"
      >
        {{ form.token_expire_days }} 天
      </el-form-item> -->
    </el-form>

    <!-- 操作 -->
    <div
      class="text-center"
      v-if="false"
    >
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
 * created 2023-07-01
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import copy from 'copy-to-clipboard'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // prometheus_key
        prometheus_key: '',
        // Token有效期（天）
        token_expire_days: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      let params = {}

      const res = await this.$http.getSystemEnvConfig(params)

      if (res.code != 0) {
        return
      }

      let data = res.data
      // let data = this.row
      // prometheus_key
      this.form.prometheus_key = data.prometheus_key
      // Token有效期（天）
      this.form.token_expire_days = data.token_expire_days
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
        // prometheus_key
        prometheus_key: this.form.prometheus_key,
        // Token有效期（天）
        token_expire_days: this.form.token_expire_days,
      }

      // 编辑
      if (this.row) {
        params['id'] = this.row.id
      }

      const res = await this.$http.function(params)

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

    handleCopyClick(value) {
      copy(value)
      this.$msg.success('已复制到剪切板')
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
