<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <!-- 服务器地址 -->

      <el-form-item
        label="服务器地址"
        prop="deploy_host"
      >
        <RemoteHost
          v-if="hasInit"
          :defaultKeyword="host"
          v-model="form.deploy_host"
          @on-confirm="handleDeployVerifyFile"
        ></RemoteHost>
      </el-form-item>

      <!-- 私钥部署路径 -->

      <el-form-item
        label="私钥部署路径"
        prop="deploy_key_file"
      >
        <el-input
          type="text"
          v-model="form.deploy_key_file"
          placeholder="请输入私钥部署的绝对路径，eg: /usr/ssl/xxx.key"
        ></el-input>
      </el-form-item>

      <!-- 公钥部署路径 -->

      <el-form-item
        label="公钥部署路径"
        prop="deploy_fullchain_file"
      >
        <el-input
          type="text"
          v-model="form.deploy_fullchain_file"
          placeholder="请输入公钥部署的绝对路径，eg: /usr/ssl/xxx.pem"
        ></el-input>
      </el-form-item>

      <!-- 重启命令 -->

      <el-form-item
        label="重启命令"
        prop="deploy_reloadcmd"
      >
        <div class="flex">
          <el-select
            style="width: 300px"
            v-model="form.deploy_reloadcmd"
            :placeholder="$t('重启命令')"
          >
            <el-option
              v-for="item in reloadCommandOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div class="ml-sm text-sm color--info flex items-center">
            <el-icon><Warning /></el-icon>
            <span>&nbsp;仅使用预设命令</span>
          </div>
        </div>
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
 * created 2024-03-31
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import RemoteHost from '@/components/remote-host/index.vue'

export default {
  name: '',

  props: {
    // 数据行
    certId: { type: Number, default: null },
    row: { type: Object, default: null },
  },

  components: {
    RemoteHost,
  },

  data() {
    return {
      rules: formRules,
      hasInit: false,
      host: '',
      // 引入枚举值

      form: {
        // 服务器地址
        deploy_host_id: '',
        deploy_host: '',
        // 私钥部署路径
        deploy_key_file: '',
        // 公钥部署路径
        deploy_fullchain_file: '',
        // 重启命令
        deploy_reloadcmd: '',
      },

      reloadCommandOptions: [],
    }
  },

  computed: {},

  methods: {
    async getData() {
      await this.getAllowCommands()

      if (this.row) {
        let params = {
          deploy_cert_id: this.row.deploy_cert_id,
        }

        const res = await this.$http.getDeployCertById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 服务器地址
        this.form.deploy_host = data.deploy_host
        // 私钥部署路径
        this.form.deploy_key_file = data.deploy_key_file
        // 公钥部署路径
        this.form.deploy_fullchain_file = data.deploy_fullchain_file
        // 重启命令
        this.form.deploy_reloadcmd = data.deploy_reloadcmd
      }

      this.hasInit = true
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
        cert_id: this.certId,
        // 服务器地址
        deploy_host_id: this.form.deploy_host.id,
        // 私钥部署路径
        deploy_key_file: this.form.deploy_key_file,
        // 公钥部署路径
        deploy_fullchain_file: this.form.deploy_fullchain_file,
        // 重启命令
        deploy_reloadcmd: this.form.deploy_reloadcmd,
      }

      let res = null

      if (this.row) {
        params['deploy_cert_id'] = this.row.deploy_cert_id
        res = await this.$http.updateDeployCertById(params)
      } else {
        res = await this.$http.addDeployCert(params)
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

    async getAllowCommands() {
      const res = await this.$http.getAllowCommands()

      if (res.ok) {
        this.reloadCommandOptions = res.data.map((item) => {
          return {
            value: item,
            label: item,
          }
        })

        // 设置默认值
        if (!this.form.deploy_reloadcmd) {
          this.form.deploy_reloadcmd = this.reloadCommandOptions[0].value
        }
      }
    },

    handleDeployVerifyFile() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
