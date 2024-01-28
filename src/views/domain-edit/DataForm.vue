<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <div class="flex">
        <!-- 域名 -->
        <el-form-item
          :label="$t('域名')"
          prop="domain"
          class="flex-1"
        >
          <el-input
            type="text"
            v-model="form.domain"
            :placeholder="$t('请输入域名')"
            @blur="handleDomainChange"
          ></el-input>
        </el-form-item>

        <!-- 端口 -->
        <el-form-item
          :label="$t('端口')"
          prop="port"
          style="width: 160px"
        >
          <el-input
            type="text"
            v-model="form.port"
            :placeholder="$t('请输入端口')"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item
        :label="$t('证书时间')"
        prop="start_time"
      >
        <div class="flex justify-between w-full">
          <el-date-picker
            v-model="form.start_time"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
            :placeholder="$t('证书颁发时间')"
            :disabled="form.auto_update"
            style="width: 180px"
          />

          <span> - </span>

          <el-date-picker
            v-model="form.expire_time"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
            :placeholder="$t('证书过期时间')"
            :disabled="form.auto_update"
            style="width: 180px"
          />
        </div>
      </el-form-item>

      <div class="grid grid-cols-2">
        <el-form-item
          :label="$t('自动更新')"
          prop="auto_update"
        >
          <el-switch v-model="form.auto_update" />

          <el-tooltip
            effect="dark"
            content="如需手动设置证书时间，需关闭自动更新"
            placement="top-start"
            :show-after="500"
          >
            <el-link :underline="false"
              ><el-icon class="ml-sm"><Warning /></el-icon
            ></el-link>
          </el-tooltip>
        </el-form-item>

        <!-- 动态主机 -->
        <!-- <el-form-item
          :label="$t('动态主机')"
          prop="is_dynamic_host"
        >
          <el-switch v-model="form.is_dynamic_host" />

          <el-tooltip
            effect="dark"
            content="每次自动更新将重置主机列表"
            placement="top-start"
            :show-after="500"
          >
            <el-link :underline="false"
              ><el-icon class="ml-sm"><Warning /></el-icon
            ></el-link>
          </el-tooltip>
        </el-form-item> -->

        <el-form-item
          :label="$t('加密方式')"
          prop="ssl_type"
        >
          <el-select
            v-model="form.ssl_type"
            :placeholder="$t('加密方式')"
          >
            <el-option
              v-for="item in sslTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>

      <!-- 分组 -->
      <el-form-item
        :label="$t('分组')"
        prop="group_id"
      >
        <SelectGroup
          class="w-[150px]"
          v-model="form.group_id"
          clearable
        ></SelectGroup>
      </el-form-item>

      <!-- 备注 -->
      <el-form-item
        :label="$t('备注')"
        prop="alias"
      >
        <el-input
          type="textarea"
          v-model="form.alias"
          :rows="3"
          :placeholder="$t('请输入备注')"
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
 * created 2022-10-01
 * */
// 引入枚举值
import { formRules, sslTypeOptions } from './config.js'
import SelectGroup from '../../components/SelectGroup.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    SelectGroup,
  },

  data() {
    return {
      sslTypeOptions,

      loading: false,

      form: {
        // 域名
        domain: '',
        // 备注
        alias: '',
        // 端口
        port: 443,
        // 分组
        group_id: '',

        // 动态ip
        is_dynamic_host: false,
        ssl_type: 0,

        start_time: '',
        expire_time: '',
        auto_update: true,
      },

      rules: formRules,
    }
  },

  computed: {
    disabledDomain() {
      if (this.row) {
        return true
      } else {
        return false
      }
    },
  },

  methods: {
    async getData() {
      this.loading = true

      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.getDomainById(params)

        let data = res.data
        // let data = this.row
        // 域名
        this.form.domain = data.domain
        this.form.alias = data.alias
        this.form.group_id = data.group_id
        this.form.port = data.port
        // this.form.is_dynamic_host = data.is_dynamic_host
        this.form.ssl_type = data.ssl_type
        this.form.start_time = data.start_time
        this.form.expire_time = data.expire_time
        this.form.auto_update = data.auto_update

        if (this.form.group_id == 0) {
          this.form.group_id = ''
        }
      }

      this.loading = false
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      console.log('handleSubmit', this.form)

      this.$refs['form'].validate((valid) => {
        console.log(valid)

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
        // 域名
        domain: this.form.domain.trim(),
        alias: this.form.alias.trim(),
        group_id: this.form.group_id,
        port: this.form.port,
        // is_dynamic_host: this.form.is_dynamic_host,
        ssl_type: this.form.ssl_type,

        start_time: this.form.start_time,
        expire_time: this.form.expire_time,
        auto_update: this.form.auto_update,
      }

      let res = null

      if (this.row) {
        // 编辑
        params['id'] = this.row.id
        res = await this.$http.updateDomainById(params)
      } else {
        // 添加
        res = await this.$http.addDomain(params)
      }

      if (res.ok) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    async handleDomainChange() {
      return

      if (!this.form.domain) {
        return
      }

      if (this.form.is_dynamic_host) {
        return
      }

      let params = {
        domain: this.form.domain,
      }

      const res = await this.$http.queryDomainCname(params)

      if (res.ok) {
        if (res.data && res.data.length > 0) {
          this.form.is_dynamic_host = true
        }
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
