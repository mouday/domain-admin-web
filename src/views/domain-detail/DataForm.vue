<template>
  <div class="domain-detail">
    <!-- <div class="flex justify-end">
     
    </div> -->

    <div class="mo-form-detail grid grid-cols-2 mt-sm">
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <!-- 域名 -->

        <el-form-item
          label="域名"
          prop="domain"
        >
          <el-link
            :underline="false"
            :href="form.domain_url"
            target="_blank"
            >{{ form.domain }}</el-link
          >
        </el-form-item>

        <!-- ip -->

        <el-form-item
          label="ip"
          prop="ip"
        >
          <span>{{ form.ip || '-' }}</span>
        </el-form-item>

        <!-- 域名连接状态 -->

        <el-form-item
          label="域名连接状态"
          prop="connect_status"
        >
          <ConnectStatus :value="form.connect_status"></ConnectStatus>
        </el-form-item>

        <!-- 创建时间 -->

        <el-form-item
          label="创建时间"
          prop="create_time"
        >
          <span>{{ form.create_time || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="更新时间"
          prop="create_time"
        >
          <span>{{ form.update_time || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="颁发者.公用名"
          prop="expire_days"
        >
          <span class="truncate">{{ form.detail.issuer.CN || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="颁发者.组织"
          prop="expire_days"
        >
          <span class="truncate">{{ form.detail.issuer.O || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="颁发者.组织单位"
          prop="expire_days"
        >
          <span class="truncate">{{ form.detail.issuer.OU || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="物理位置"
          prop="isp"
        >
          <span>{{ ipInfo.country || '-' }}</span>
          <span>&nbsp;</span>
          <span>{{ ipInfo.city || '-' }}</span>
          <span>&nbsp;</span>
          <span>{{ ipInfo.county || '-' }}</span>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <!-- ip -->

        <!-- 证书颁发时间 -->

        <el-form-item
          label="证书颁发时间"
          prop="start_time"
        >
          <span>{{ form.start_time || '-' }}</span>
        </el-form-item>

        <!-- 证书过期时间 -->

        <el-form-item
          label="证书过期时间"
          prop="expire_time"
        >
          <span>{{ form.expire_time || '-' }}</span>
        </el-form-item>

        <!-- 证书检查时间 -->

        <el-form-item
          label="证书检查时间"
          prop="check_time"
        >
          <div class="flex justify-between flex-1">
            <span>{{ form.check_time || '-' }}</span>

            <el-link
              :underline="false"
              type="primary"
              @click="handleUpdateRowDomainInfo"
              ><el-icon><Refresh /></el-icon><span> 更新</span></el-link
            >
          </div>
        </el-form-item>

        <!-- 有效期总天数 -->

        <el-form-item
          label="有效期总天数"
          prop="total_days"
        >
          <span>{{ form.total_days || '-' }}</span>
        </el-form-item>

        <!-- 过期剩余天数 -->

        <el-form-item
          label="过期剩余天数"
          prop="real_time_expire_days"
        >
          <span class="el-text-color-primary">{{
            form.real_time_expire_days || form.expire_days || '-'
          }}</span>
        </el-form-item>

        <el-form-item
          label="颁发对象.公用名"
          prop="subject"
        >
          <span class="truncate">{{ form.detail.subject.CN || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="颁发对象.组织"
          prop="subject"
        >
          <span class="truncate">{{ form.detail.subject.O || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="颁发对象.组织单位"
          prop="subject"
        >
          <span class="truncate">{{ form.detail.subject.OU || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="网络业务提供商"
          prop="isp"
        >
          <span class="truncate">{{ ipInfo.isp || '-' }}</span>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleCancel"
        >关 闭</el-button
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
import ConnectStatus from '@/components/ConnectStatus.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    ConnectStatus,
  },

  data() {
    return {
      // 引入枚举值

      form: {
        // 域名
        domain: '',
        domain_url: '',
        // ip
        ip: '',
        // 证书颁发时间
        start_time: '',
        // 证书过期时间
        expire_time: '',
        // 证书检查时间
        check_time: '',
        // 域名连接状态
        connect_status: '',
        // 有效期总天数
        total_days: '',
        // 过期剩余天数
        expire_days: '',
        // 创建时间
        create_time: '',
        update_time: '',
        detail: {
          issuer: {},
          subject: {},
        },
      },

      // ip信息
      ipInfo: {
        isp: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.getDomainById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 域名
        this.form.domain = data.domain

        this.form.domain_url = data.domain_url

        // ip
        this.form.ip = data.ip
        // 证书颁发时间
        this.form.start_time = data.start_time
        // 证书过期时间
        this.form.expire_time = data.expire_time
        // 证书检查时间
        this.form.check_time = data.check_time
        // 域名连接状态
        this.form.connect_status = data.connect_status
        // 有效期总天数
        this.form.total_days = data.total_days
        // 过期剩余天数
        this.form.expire_days = data.expire_days
        // 创建时间
        this.form.create_time = data.create_time
        this.form.update_time = data.update_time

        this.form.detail = {
          issuer: data.detail.issuer || {},
          subject: data.detail.subject || {},
        }

        this.getIpInfo()
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    async handleUpdateRowDomainInfo() {
      let loading = this.$loading({
        lock: true,
        text: '更新中',
      })

      let params = {
        id: this.row.id,
      }

      const res = await this.$http.updateDomainCertInfoById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.getData()
      }

      loading.close()
    },

    async getIpInfo() {
      let params = {
        ip: this.form.ip,
      }

      const res = await this.$http.getIpInfo(params)

      if (res.code == 0) {
        this.ipInfo = res.data
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
