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
    }
  },
  computed: {},
  watch: {},
  filters: {},

  methods: {
    async getData() {
      const res = await this.$http.getSystemData()
      this.list = res.data.map((item) => {
        item.key = getUUID()
        return item
      })

      this.handleInit(this.list)

      //   this.$emit('on-init', { list: this.list })
    },

    handleInit(list) {
      console.log(list)

      // 证书
      let cert_count = list.find((item) => item.title === '证书数量').count
      let cert_expire_count = list.find(
        (item) => item.title === '过期证书'
      ).count

      let certValue = [
        {
          value: cert_count - cert_expire_count,
          name: '未过期',
        },
        {
          value: cert_expire_count,
          name: '已过期',
        },
      ]

      this.$refs.HomeChartCertPie.initChart(certValue)

      //   域名
      let domain_count = list.find((item) => item.title === '域名数量').count
      let domain_expire_count = list.find(
        (item) => item.title === '过期域名'
      ).count

      let domainValue = [
        {
          value: domain_count - domain_expire_count,
          name: '未过期',
        },
        {
          value: domain_expire_count,
          name: '已过期',
        },
      ]

      this.$refs.HomeChartDomainPie.initChart(domainValue)

      //   监控
      let monitor_count = list.find((item) => item.title === '监控数量').count
      let monitor_expire_count = list.find(
        (item) => item.title === '监控异常'
      ).count

      let monitorValue = [
        {
          value: monitor_count - monitor_expire_count,
          name: '正常',
        },
        {
          value: monitor_count,
          name: '异常',
        },
      ]

      this.$refs.HomeChartMonitorPie.initChart(monitorValue)
    },
  },

  mounted() {
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
