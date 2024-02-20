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
        label="主机IP地址"
        prop="host"
      >
        <el-input
          type="text"
          style="width: 220px"
          v-model="form.host"
          placeholder="请输入主机地址"
        ></el-input>
      </el-form-item>

      <!-- 主机连接状态 -->

      <!-- 证书颁发时间 -->

      <!-- <el-form-item
        label="证书颁发时间"
        prop="ssl_start_time"
      >
        <el-date-picker
          v-model="form.ssl_start_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="证书颁发时间"
          :teleported="false"
          :disabled="disabledTime"
        />
      </el-form-item> -->

      <!-- 证书过期时间 -->

      <!-- <el-form-item
        label="证书过期时间"
        prop="ssl_expire_time"
      >
        <el-date-picker
          v-model="form.ssl_expire_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="证书过期时间"
          :teleported="false"
          :disabled="disabledTime"
        />
      </el-form-item> -->

      <el-form-item
        label="备注"
        prop="comment"
      >
        <el-input
          type="textarea"
          style="width: 220px"
          v-model="form.comment"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item
        label="证书自动更新"
        prop="ssl_auto_update"
      >
        <el-switch v-model="form.ssl_auto_update" />
      </el-form-item> -->

      <!-- <el-form-item
        label="证书到期监控"
        prop="ssl_expire_monitor"
      >
        <el-switch v-model="form.ssl_expire_monitor" />
      </el-form-item> -->

      <!-- 证书检查时间 -->
    </el-form>

    <!-- <div class="text-[12px] color--info">
      提示：如需手动设置，请关闭自动更新
    </div> -->

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
 * created 2023-06-03
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

    domainId: {
      type: Number,
      default: null,
    },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值
      // 是否自动更新
      is_auto_update: true,

      form: {
        // 主机地址
        host: '',
        // 主机连接状态
        host_connect_status: '',
        // 主机检查时间
        host_check_time: '',
        // 证书颁发时间
        ssl_start_time: '',
        // 证书过期时间
        ssl_expire_time: '',
        // 证书检查时间
        ssl_check_time: '',
        // 过期剩余天数
        ssl_expire_days: '',
        // 过期监控
        ssl_expire_monitor: true,
        // 自动更新
        ssl_auto_update: true,
        comment: ''
      },
    }
  },

  computed: {
    disabledTime() {
      return this.is_auto_update
    },
  },

  methods: {
    async getDomainById() {
      let params = {
        domain_id: this.domainId,
      }

      const res = await this.$http.getDomainById(params)

      if (res.ok) {
        this.is_auto_update = res.data.auto_update
      }
    },

    async getData() {
      await this.getDomainById()

      if (this.row) {
        let params = {
          address_id: this.row.id,
        }

        const res = await this.$http.getAddressById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 主机地址
        this.form.host = data.host
        // 主机连接状态
        this.form.host_connect_status = data.host_connect_status
        // 主机检查时间
        this.form.host_check_time = data.host_check_time
        // 证书颁发时间
        this.form.ssl_start_time = data.ssl_start_time
        // 证书过期时间
        this.form.ssl_expire_time = data.ssl_expire_time
        // 证书检查时间
        this.form.ssl_check_time = data.ssl_check_time
        // 过期剩余天数
        this.form.ssl_expire_days = data.ssl_expire_days

        this.form.ssl_auto_update = data.ssl_auto_update
        this.form.ssl_expire_monitor = data.ssl_expire_monitor
        this.form.comment = data.comment
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
        domain_id: this.domainId,
        // 主机地址
        host: this.form.host.trim(),
        // 主机连接状态
        // host_connect_status: this.form.host_connect_status,
        // 主机检查时间
        // host_check_time: this.form.host_check_time,
        // 证书颁发时间
        ssl_start_time: this.form.ssl_start_time,
        // 证书过期时间
        ssl_expire_time: this.form.ssl_expire_time,
        comment: this.form.comment,
        // 证书检查时间
        // ssl_check_time: this.form.ssl_check_time,
        // 过期剩余天数
        // ssl_expire_days: this.form.ssl_expire_days,
        // ssl_auto_update: this.form.ssl_auto_update,
        // ssl_expire_monitor: this.form.ssl_expire_monitor,
      }

      // 编辑
      let res = null
      if (this.row) {
        params['address_id'] = this.row.id

        res = await this.$http.updateAddressById(params)
      } else {
        res = await this.$http.addAddress(params)
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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
