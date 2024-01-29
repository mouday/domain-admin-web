<template>
  <div
    class="log-monitor-list__DataChart"
    ref="chart"
  ></div>
</template>

<script>
// created at 2024-01-29
import * as echarts from 'echarts'

export default {
  name: 'DataChart',

  props: {},

  components: {},

  data() {
    return {
      myChart: null,
    }
  },

  computed: {},

  methods: {
    refreshData(list) {
      const successColor = '#67c23a'
      const errorColor = '#f56c6c'

      let chartData = list
        .map((item) => {
          return {
            value: item.total_microsecond_time,
            label: item.create_time_label,
            valueColor: item.status == 1 ? successColor : errorColor,
          }
        })
        .reverse()

      this.getData(chartData)
    },

    async getData(chartData) {
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.chart)
      }

      let option = {
        xAxis: {
          name: '检测时间',
          type: 'category',
          data: chartData.map((item) => item.label),
        },
        yAxis: {
          type: 'value',
          name: '响应时间（毫秒）',
        },
        series: [
          {
            type: 'bar',
            data: chartData.map((item) => item.value),
            itemStyle: {
              color: function (params) {
                // console.log(params);
                console.log(chartData[params.dataIndex])
                return chartData[params.dataIndex].valueColor
              },
            },
          },
        ],
      }

      this.myChart.setOption(option)
    },
  },

  mounted() {},

  created() {},
}
</script>

<style lang="less">
.log-monitor-list__DataChart {
  width: 100%;
  height: 500px;
}
</style>

<style lang="less" scoped></style>
