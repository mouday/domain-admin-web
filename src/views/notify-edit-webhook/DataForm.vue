<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
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
        <!-- <el-input
          type="textarea"
          :rows="5"
          v-model="form.headers"
          :placeholder="`示例: \n${headerExample}`"
        ></el-input> -->

        <CodeEditor
          v-model="form.headers"
          height="100px"
          :placeholder="`示例: \n${headerExample}`"
        ></CodeEditor>
      </el-form-item>

      <el-form-item
        label="请求体"
        prop="body"
      >
        <!-- <el-input
          type="textarea"
          :rows="5"
          v-model="form.body"
          placeholder="请求体，支持jinja2模板语法"
        ></el-input> -->

        <CodeEditor
          mode="twig"
          v-model="form.body"
          height="140px"
          :placeholder="bodyPlaceholder"
        ></CodeEditor>
      </el-form-item>
    </el-form>

    <div class="text-[14px] color--info">
      <span>资源推荐：</span>
      <a
        href="https://pengshiyu.blog.csdn.net/article/details/124135877"
        class="color--brand"
        target="_blank"
        >微信推送消息通知接口汇总</a
      >
    </div>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >保 存</el-button
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
 * created 2022-10-01
 * */
import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'

import { deepCopy } from '@/utils/copy-util.js'
import CodeEditor from '@/components/code-editor/CodeEditor.vue'

import {
  formRules,
  // 引入枚举值
} from './config.js'

export default {
  name: '',

  props: {
    // 数据行
    rowData: { type: Object, default: null },
    labelWidth: { type: String, default: '' },
  },

  emits: ['on-submit', 'on-cancel'],

  components: { CodeEditor },

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        // 域名
        method: 'POST',
        url: '',
        headers: JSON.stringify(
          {
            'Content-Type': 'application/json',
          },
          null,
          4
        ),

        body: `{
  "title": "到期提醒",
  "content": "{% for row in list %}{{row.domain}} {{row.start_date or '-' }} - {{row.expire_date or '-' }} ({{row.expire_days}}){% endfor %}"
}
`,
      },

      bodyPlaceholder: '支持jinja2模板语法',

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
      // this.loading = true

      console.log(this.rowData)

      let data = this.rowData

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

      // this.loading = false
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
      // this.getData()
      // this.$refs.form.resetFields()
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
      // let loading = this.$loading({ fullscreen: true })

      let headers = null
      if (this.form.headers) {
        headers = JSON.parse(this.form.headers)
      }

      let params = {
        // type_id: NotifyTypeEnum.Webkook,
        value: {
          method: this.form.method,
          url: this.form.url,
          headers: headers,
          body: this.form.body,
        },
      }

      this.$emit('on-submit', deepCopy(params))
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
