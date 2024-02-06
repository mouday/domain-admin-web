<template>
  <div class="app-container dashboard">
    <HomeDataInfo :list="list" />

    <div class="grid mt-md gap-[20px] grid-cols-3">
      <HomeCard
        title="证书统计"
        desc="SSL Cert"
      >
        <HomeChartPie ref="HomeChartCertPie"></HomeChartPie>
      </HomeCard>

      <HomeCard
        title="域名统计"
        desc="Domain"
      >
        <HomeChartPie ref="HomeChartDomainPie"></HomeChartPie>
      </HomeCard>

      <HomeCard
        title="监控统计"
        desc="Monitor"
      >
        <HomeChartPie ref="HomeChartMonitorPie"></HomeChartPie>
      </HomeCard>
    </div>
  </div>
</template>

<script>
// import HomeSystemInfo from './components/HomeSystemInfo.vue'
import HomeDataInfo from './components/HomeDataInfo.vue'
// import HomeConfig from './components/HomeConfig.vue'
import HomeCard from './components/card.vue'
// import ChartPie from './components/chart-pie.vue'
import HomeChartPie from './components/HomeChartPie.vue'
import { getUUID } from '@/utils/uuid.js'
import { COLORS } from '../../config/index.js'

export default {
  name: 'Home',
  components: {
    HomeDataInfo,
    HomeCard,
    HomeChartPie,
    // HomeConfig,
    // ActivePlate,
    // ChartPie,
    // ChartFunnel,
    // ChartLine,
    // HomeCircle,
    // ChartGauge,
    // ChartBar,
    // HomeProgress,
    // HomeSystemInfo,

    // ChartPie,
  },
  props: {},
  data() {
    return {
      // 内存
      virtual_memory: {},
      // 磁盘
      disk_usage: {},

      adModal: true,
      list: [],
      certValue: [],

      timer: null,
    }
  },
  computed: {},
  watch: {},
  filters: {},

  methods: {
    async getData() {
      const res = await this.$http.getSystemData()
      this.list = res.data.map((item, index) => {
        // item.key = getUUID()

        if (index < 3) {
          item.color = COLORS.PRIMARY
        } else {
          if (item.count > 0) {
            item.color = COLORS.DANGER
          } else {
            item.color = COLORS.SUCCESS
          }
        }

        return item
      })

      let systemData = {}

      res.data.forEach((item) => {
        systemData[item.key] = item
      })

      console.log(systemData)
      this.handleInit(systemData)

      //   this.$emit('on-init', { list: this.list })
    },

    handleCertData(systemData) {
      // 证书
      let ssl_cert_ok_count =
        systemData.ssl_cert_count.count -
        systemData.ssl_cert_expire_count.count -
        systemData.ssl_cert_will_expire_count.count

      let certValue = [
        {
          value: ssl_cert_ok_count,
          name: '未过期',
          color: COLORS.SUCCESS,
          selected: ssl_cert_ok_count > 0,
        },
        {
          value: systemData.ssl_cert_will_expire_count.count,
          name: '即将过期',
          color: COLORS.WARNING,
          selected: systemData.ssl_cert_will_expire_count.count > 0,
        },
        {
          value: systemData.ssl_cert_expire_count.count,
          name: '已过期',
          color: COLORS.DANGER,
          selected: systemData.ssl_cert_expire_count.count > 0,
        },
      ]

      this.$refs.HomeChartCertPie.initChart(certValue)
    },

    handleDomainData(systemData) {
      //   域名

      let domain_ok_count =
        systemData.domain_count.count -
        systemData.domain_will_expire_count.count -
        systemData.domain_expire_count.count

      let domainValue = [
        {
          value: domain_ok_count,
          name: '未过期',
          color: COLORS.SUCCESS,
          selected: domain_ok_count > 0,
        },
        {
          value: systemData.domain_will_expire_count.count,
          name: '即将过期',
          color: COLORS.WARNING,
          selected: systemData.domain_will_expire_count.count > 0,
        },
        {
          value: systemData.domain_expire_count.count,
          name: '已过期',
          color: COLORS.DANGER,
          selected: systemData.domain_expire_count.count > 0,
        },
      ]

      this.$refs.HomeChartDomainPie.initChart(domainValue)
    },

    handleMonitorData(systemData) {
      // 监控

      let monitor_ok_count =
        systemData.monitor_count.count - systemData.monitor_error_count.count

      let monitorValue = [
        {
          value: monitor_ok_count,
          name: '正常',
          color: COLORS.SUCCESS,
          selected: monitor_ok_count > 0,
        },
        {
          value: systemData.monitor_error_count.count,
          name: '异常',
          color: COLORS.DANGER,
          selected: systemData.monitor_error_count.count > 0,
        },
      ]

      this.$refs.HomeChartMonitorPie.initChart(monitorValue)
    },

    handleInit(systemData) {
      console.log(systemData)

      this.handleCertData(systemData)
      this.handleDomainData(systemData)
      this.handleMonitorData(systemData)
    },
  },

  beforeUnmount() {
    console.log('beforeUnmount')
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  mounted() {
    console.log('mounted')
    this.timer = setInterval(() => {
      this.getData()
    }, 1000 * 60 * 1)

    this.getData()
  },
}
</script>

<style lang="less">
.home-container {
}
.count-style {
  font-size: 50px;
}
</style>
