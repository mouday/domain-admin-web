<template>
  <div class="remote-host">
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
        <div class="flex">
          <el-input
            type="text"
            v-model="form.host"
            placeholder="主机地址"
          ></el-input>

          <el-input
            class="remote-host__port-input"
            type="text"
            v-model="form.port"
            placeholder="端口号"
          ></el-input>
        </div>
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

      <!-- 验证方式 -->
      <el-form-item
        label="验证方式"
        prop="auth_type"
      >
        <el-select v-model="form.auth_type">
          <el-option
            v-for="item in HostAuthTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 秘钥 -->
      <el-form-item
        v-if="HostAuthTypeEnum.PRIVATE_KEY == form.auth_type"
        label="私钥证书"
        prop="private_key"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.private_key"
          show-password
          :spellcheck="false"
          placeholder="请输入私钥证书"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->

      <el-form-item
        v-else
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          show-password
          autocomplete="new-password"
          placeholder="请输入密码"
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
 * created 2023-07-27
 * */
import {
  formRules,
  HostAuthTypeEnum,
  HostAuthTypeOptions,
  // 引入枚举值
} from './config.js'

export default {
  name: 'RemoteHostForm',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值
      HostAuthTypeEnum,
      HostAuthTypeOptions,
      form: {
        host: '',
        port: '22',
        user: '',
        auth_type: HostAuthTypeEnum.PASSWORD,
        password: '',
        private_key: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      console.log(this.row)

      if (this.row && this.row.id) {
        const data = await this.getHostById(this.row.id)

        for (let key in this.form) {
          this.form[key] = data[key]
        }
      } else if (this.row && this.row.host) {
        this.form.host = this.row.host
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
        port: this.form.port,
        user: this.form.user,
        password: this.form.password,
        private_key: this.form.private_key,
        auth_type: this.form.auth_type,
      }

      let res = null
      let host_row = null
      let host_id = null

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
        host_id = res.data.id
      }

      if (res.code == 0) {
        this.$msg.success('操作成功')

        let detailData = await this.getHostById(host_id)

        this.$emit('on-success', detailData)
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
.remote-host__port-input {
  width: 90px;
  margin-left: 10px;
}
</style>

<style lang="less" scoped></style>
