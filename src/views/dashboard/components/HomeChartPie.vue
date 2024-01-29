<template>
  <div
    class="pie-main"
    ref="dom"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
import * as eventUtil from '../../../utils/event-util.js'

export default {
  props: {
    value: Array,
    text: String,
    subtext: String,
  },

  // mounted() {
  //   this.initChart()
  // },

  data() {
    return {
      chartDom: null,
    }
  },

  beforeDestroy() {
    eventUtil.off(window, 'resize', this.resize)
  },

  methods: {
    resize() {
      if (this.chartDom) {
        this.chartDom.resize()
      }
    },

    initChart(value) {
      let option = {
        color: ['#409eff', '#f56c6c'],

        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '54%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: value,

            // [
            // { value: 1048, name: 'Search Engine' },
            // { value: 735, name: 'Direct' },
            // { value: 580, name: 'Email' },
            // { value: 484, name: 'Union Ads' },
            // { value: 300, name: 'Video Ads' },
            // ],
          },
        ],
      }

      if (!this.chartDom) {
        this.chartDom = echarts.init(this.$refs.dom)
      }

      this.chartDom.setOption(option)
      eventUtil.on(window, 'resize', this.resize)
    },
  },
}
</script>

<style>
.pie-main {
  width: 100%;
  height: 320px;
  padding: 28px;
  background: #fff;
}
</style>
