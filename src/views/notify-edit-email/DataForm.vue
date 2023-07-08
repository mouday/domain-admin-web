<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
    >
      <!-- 域名 -->

      <el-form-item
        label="邮件列表"
        prop="email_list"
      >
        <!-- <el-input
          type="textarea"
          :rows="5"
          v-model="form.email_list"
        ></el-input> -->

        <CodeEditor
          v-model="form.email_list"
          :placeholder="`示例:\n${emailListExample}`"
        ></CodeEditor>
      </el-form-item>
    </el-form>

    <div class="text-[14px] color--info">
      <span
        >提示：发件邮箱在<span
          class="cursor-pointer color--brand"
          @click="handleToSystemSetting"
          >[系统设置]</span
        >中配置</span
      >
    </div>
    <!-- 操作 -->
    <div class="text-center">
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
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { NotifyTypeEnum } from '../../emuns/notify-type-enums.js'
import { EventOptions, EventEnum } from '@/emuns/event-enums.js'
import { deepCopy } from '@/utils/copy-util.js'
import CodeEditor from '@/components/code-editor/CodeEditor.vue'

export default {
  name: '',

  props: {
    // 数据行
    rowData: { type: Object, default: null },
    labelWidth: { type: String, default: '' },
  },

  emits: ['on-submit', 'on-cancel'],

  components: {
    CodeEditor,
  },

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        // 域名
        email_list: '',
      },

      EventOptions,

      emailListExample: JSON.stringify(
        ['123456@qq.com', 'domain@163.com'],
        null,
        4
      ),
    }
  },

  computed: {
    disabledTestButton() {
      return !(this.rowData && this.rowData.id)
    },
  },

  methods: {
    async getData() {
      // let loading = this.$loading()

      if (this.rowData) {
        if (this.rowData.value && this.rowData.value.email_list) {
          this.form.email_list = JSON.stringify(
            this.rowData.value.email_list,
            null,
            4
          )
        }
      }

      // this.$nextTick(() => {
      //   // 以服务的方式调用的 Loading 需要异步关闭
      //   loading.close()
      // })
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
      // this.$refs.form.resetFields()
      // this.getData()
      // this.$refs.form.clearValidate(['email_list'])
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
      let email_list = null
      if (this.form.email_list) {
        email_list = JSON.parse(this.form.email_list)
      }

      let params = {
        value: {
          email_list: email_list,
        },
      }

      this.$emit('on-submit', deepCopy(params))
    },

    handleToSystemSetting() {
      let route = this.$router.resolve({
        name: 'system-setup',
      })

      window.open(route.href, '_blank')
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
