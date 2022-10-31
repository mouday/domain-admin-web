<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="请求方法"
        prop="method"
      >
        <el-select
          v-model="form.method"
          placeholder="请求方法"
          style="width: 100px"
        >
          <el-option
            v-for="item in methodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="请求地址"
        prop="url"
      >
        <el-input
          type="text"
          v-model="form.url"
          placeholder="请求地址"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="请求头"
        prop="headers"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.headers"
          :placeholder="`示例: \n${headerExample}`"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="请求体"
        prop="body"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.body"
          placeholder="请求体"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">重 置</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >保 存</el-button
      >
      <el-tooltip
        content="请保存后再测试"
        placement="top"
      >
        <el-button @click="handleTest">测 试</el-button>
      </el-tooltip>
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
 * created 2022-10-01
 * */
import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'

import {
  formRules,
  // 引入枚举值
} from './config.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        // 域名
        method: 'get',
        url: '',
        headers: JSON.stringify(
          {
            'Content-Type': 'application/json',
          },
          null,
          4
        ),
        body: '',
      },

      methodOptions: [
        {
          label: 'GET',
          value: 'GET',
        },
        {
          label: 'POST',
          value: 'POST',
        },
      ],

      headerExample: JSON.stringify(
        {
          'User-Agent': 'Mozilla/5.0',
          'Content-Type': 'application/json',
        },
        null,
        4
      ),
    }
  },

  computed: {},

  methods: {
    async getData() {
      this.loading = true

      let params = {
        type_id: NotifyTypeEnum.Webkook,
      }

      const res = await this.$http.getNotifyOfUser(params)

      let data = res.data

      if (data && data.value) {
        let headers = ''

        if (data.value.headers) {
          headers = JSON.stringify(data.value.headers, null, 4)
        }

        this.form = {
          method: data.value.method,
          url: data.value.url,
          headers: headers,
          body: data.value.body,
        }
      }

      this.loading = false
    },

    // 取消
    handleCancel() {
      // this.$emit('on-cancel')
      // this.getData()
      this.$refs.form.resetFields()
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

      let headers = null
      if (this.form.headers) {
        headers = JSON.parse(this.form.headers)
      }

      let params = {
        type_id: NotifyTypeEnum.Webkook,
        value: {
          method: this.form.method,
          url: this.form.url,
          headers: headers,
          body: this.form.body,
        },
      }

      let res = await this.$http.updateNotifyOfUser(params)

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

    async handleTest() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.testWebhookNotifyOfUser()

        if (res.code == 0) {
          this.$msg.success(res.data)
          // this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
