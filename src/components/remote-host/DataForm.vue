<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 主机地址 -->

      <el-form-item
        label="主机地址"
        prop="host"
      >
        <el-input
          type="text"
          v-model="form.host"
          placeholder="主机地址"
        ></el-input>
      </el-form-item>

      <!-- 验证类型 -->

      <el-form-item
        label="用户名"
        prop="user"
      >
        <el-input
          type="text"
          v-model="form.user"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >确 定</el-button
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
 * created 2023-07-27
 * */
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
      rules: formRules,

      // 引入枚举值

      form: {
        host: '',
        password: '',
        user: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        for (let key in this.form) {
          this.form[key] = this.row[key]
        }
      }
    },

    async getHostById(host_id) {
      let params = {
        host_id: host_id,
      }

      const res = await this.$http.getHostById(params)
      return res.data
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
        host: this.form.host,
        user: this.form.user,
        password: this.form.password,
      }

      let res = null
      let host_row = null
      // 编辑
      if (this.row && this.row.id) {
        host_id = this.row.id
        params['host_id'] = this.row.id

        res = await this.$http.updateHostById(params)

        host_row = {
          ...this.row,
          ...params,
        }
      } else {
        res = await this.$http.addHost(params)
        host_row = res.data
      }

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success', host_row)
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
