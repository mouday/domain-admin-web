<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <!-- 域名 -->

      <el-form-item
        label="邮件列表"
        prop="email_list"
      >
        <el-input
          type="textarea"
          :rows="5"
          :placeholder="`示例:\n${emailListExample}`"
          v-model="form.email_list"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="text-[14px] color--info">
      <span
        >提示：发件邮箱在<span class="cursor-pointer color--brand" @click="handleToSystemSetting">[系统设置]</span
        >中配置</span
      >
    </div>
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
        <el-button
          class="margin-left--auto"
          @click="sendDomainInfoListEmail"
          >测 试</el-button
        >
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
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { NotifyTypeEnum } from '../../emuns/notify-type-enums.js'

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
        email_list: '',
      },

      emailListExample: JSON.stringify(
        ['123@qq.com', 'domain@163.com'],
        null,
        4
      ),
    }
  },

  computed: {},

  methods: {
    async getData() {
      let loading = this.$loading()

      let params = {
        type_id: NotifyTypeEnum.Email,
      }

      const res = await this.$http.getNotifyOfUser(params)

      if (res.data) {
        if (res.data.value && res.data.value.email_list) {
          this.form.email_list = JSON.stringify(
            res.data.value.email_list,
            null,
            4
          )
        }
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    // 取消
    handleCancel() {
      // this.$emit('on-cancel')
      this.$refs.form.resetFields()
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
      let loading = this.$loading({ fullscreen: true })

      let email_list = null
      if (this.form.email_list) {
        email_list = JSON.parse(this.form.email_list)
      }

      let params = {
        type_id: NotifyTypeEnum.Email,
        value: {
          email_list: email_list,
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

    async sendDomainInfoListEmail() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.sendDomainInfoListEmail()

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },

    handleToSystemSetting() {
      this.$router.push({
        name: 'system-list',
      })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
