<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 用户名 -->

      <el-form-item
        label="用户名"
        prop="username"
      >
        <span>{{ form.username }}</span>
      </el-form-item>

      <!-- 头像 -->

      <el-form-item
        label="头像"
        prop="avatar_url"
      >
        <el-avatar :src="avatar"> </el-avatar>

        <!-- <el-link
          class="ml-md"
          :underline="false"
          @click="handleRandomAvatar"
          ><el-icon><Refresh /></el-icon>随机获取</el-link
        > -->
      </el-form-item>

      <!-- 过期前多少天提醒 -->

      <!-- <el-form-item
        label="过期通知(天)"
        prop="before_expire_days"
      >
        <el-input-number
          v-model="form.before_expire_days"
          :min="0"
          placeholder="过期通知"
        ></el-input-number>
      </el-form-item> -->

      <!-- 邮件列表 -->

      <!-- <el-form-item
        label="收件邮箱"
        prop="email_list"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.email_list"
          placeholder="邮箱列表，每行一个"
        ></el-input>
      </el-form-item> -->
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
 * created 2022-10-03
 * */
import { formRules } from './config.js'
// import { getUUID } from '@/utils/uuid.js'
import { getAvatarUrl } from '@/utils/avatar-util.js'
import avatar from '@/assets/user-avatar.gif'

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
      avatar,
      form: {
        // 用户名
        username: '',
        // 头像
        avatar_url: '',
        // 过期前多少天提醒
        before_expire_days: 0,
        // 邮件列表
        // email_list: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      const res = await this.$http.getUserInfo()

      if (res.code != 0) {
        return
      }

      let data = res.data
      // let data = this.row
      // 用户名
      this.form.username = data.username
      // 头像
      this.form.avatar_url = data.avatar_url
      // 过期前多少天提醒
      // this.form.before_expire_days = data.before_expire_days
      // 邮件列表
      // this.form.email_list = data.email_list.join('\n')
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    handleRandomAvatar() {
      // let loading = this.$loading({ fullscreen: true })
      this.form.avatar_url = getAvatarUrl()
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

      // console.log(this.form.email_list);
      let email_list = []
      if (this.form.email_list && this.form.email_list.trim()) {
        email_list = this.form.email_list.trim().split('\n')
      }

      let params = {
        // 用户名
        // username: this.form.username,
        // 头像
        avatar_url: this.form.avatar_url,
        // 过期前多少天提醒
        before_expire_days: this.form.before_expire_days,
        // 邮件列表
        // email_list: email_list,
      }

      // 编辑
      // if (this.row) {
      //   params['id'] = this.row.id
      // }

      // console.log(params);
      const res = await this.$http.updateUserInfo(params)

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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
