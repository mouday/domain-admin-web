<template>
  <div class="domain-detail">
    <div class="mo-form-detail grid grid-cols-2">
      <el-form label-width="130px">
        <el-form-item
          label="域名"
          prop="domain"
        >
          <el-link :underline="false">{{ form.domain }}</el-link>
        </el-form-item>

        <el-form-item
          label="注册时间"
          prop="create_time"
        >
          <span>{{ form.domain_start_time || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="到期时间"
          prop="create_time"
        >
          <span>{{ form.domain_expire_time || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="自动更新"
          prop="isp"
        >
          <span class="truncate">{{
            form.domain_auto_update_label || '-'
          }}</span>
        </el-form-item>
      </el-form>

      <el-form
        label-width="130px"
        style="margin-right: -1px"
      >
        <el-form-item
          label="证书数量"
          prop="domain"
        >
          <span>{{ form.ssl_count || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="剩余天数"
          prop="create_time"
        >
          <!-- <span>{{ form.real_time_domain_expire_days || '-' }}</span> -->
          <ExpireDays :value="form.real_domain_expire_days"></ExpireDays>
        </el-form-item>

        <el-form-item
          label="检查时间"
          prop="isp"
        >
          <div class="flex justify-between flex-1">
            <span class="truncate">{{ form.update_time_label || '-' }}</span>

            <el-link
              :underline="false"
              type="primary"
              class="mr-sm"
              @click="handleUpdateRowDomainInfo"
              ><el-icon><Refresh /></el-icon
            ></el-link>
          </div>
        </el-form-item>

        <el-form-item
          label="过期监测"
          prop="isp"
        >
          <span class="truncate">{{ form.domain_expire_monitor || '-' }}</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="mo-form-detail mt-[20px]">
      <el-form label-width="130px">
        <el-form-item
          label="注册商"
          prop="domain_registrar"
        >
          <a
            v-if="form.domain_registrar_url"
            :href="form.domain_registrar_url"
            target="_blank"
            class="mo-link"
            >{{ form.domain_registrar }}</a
          >
          <span v-else>{{ form.domain_registrar || '-' }}</span>
        </el-form-item>

        <el-form-item
          label="备注"
          prop="comment"
        >
          <span class="truncate">{{ form.comment || '-' }}</span>
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
import ExpireDays from '@/components/ExpireDays.vue'
import AddressList from '@/components/address-list/index.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    ExpireDays,
    AddressList,
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

        real_time_expire_days: '',
        domain_start_time: '',
        domain_expire_time: '',
        real_time_domain_expire_days: '',
        alias: '',
        domain_auto_update: '',
        domain_auto_update_label: '',
        domain_expire_monitor: '',
        domain_check_time_label: '',
        port: '',
        real_domain_expire_days: '',
        ssl_count: '',
        comment: '',
        domain_registrar: '',
        domain_registrar_url: '',
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
          domain_info_id: this.row.id,
        }

        const res = await this.$http.getDomainInfoById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 域名
        this.form.domain = data.domain
        this.form.update_time_label = data.update_time_label
        this.form.ssl_count = data.ssl_count
        this.form.comment = data.comment

        this.form.domain_url = data.domain_url
        this.form.domain_registrar_url = data.domain_registrar_url
        this.form.domain_registrar = data.domain_registrar

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
        this.form.real_time_expire_days = data.real_time_expire_days
        // 创建时间
        this.form.create_time = data.create_time
        this.form.update_time = data.update_time

        this.form.domain_auto_update = data.domain_auto_update

        this.form.domain_auto_update_label =
          data.is_auto_update == true ? '是' : '否'
        this.form.domain_expire_monitor =
          data.is_expire_monitor == true ? '是' : '否'
        this.form.domain_check_time_label = data.domain_check_time_label
        this.form.port = data.port
        this.form.real_domain_expire_days = data.real_domain_expire_days

        // 备注
        this.form.alias = data.alias

        // 域名信息
        this.form.domain_start_time = data.domain_start_time
        this.form.domain_expire_time = data.domain_expire_time
        this.form.real_time_domain_expire_days =
          data.real_time_domain_expire_days

        this.form.detail = {
          issuer: data.detail.issuer || {},
          subject: data.detail.subject || {},
        }

        // this.getIpInfo()
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
        domain_info_id: this.row.id,
      }

      const res = await this.$http.updateDomainInfoRowById(params)

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
