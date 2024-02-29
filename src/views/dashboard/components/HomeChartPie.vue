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
      let selected = {}
      for (let item of value) {
        selected[item.name] = item.selected
      }

      // #cccccc
      let isAllZero = true
      value.forEach((item) => {
        if (item.value != 0) {
          isAllZero = false
        }
      })

      let color = value.map((x) => x.color)
      if (isAllZero == true) {
        color = ['#cccccc', '#cccccc']
      }

      let option = {
        // color: ['#409eff', '#f56c6c'],
        color: color,

        tooltip: {
          trigger: 'item',
          // position: 'top',
          // backgroundColor: 'transparent',
          // borderWidth: 0,
        },

        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false,
          // selected: selected,
        },

        series: [
          {
            // name: 'Access From',
            type: 'pie',
            showEmptyCircle: true,

            radius: ['30%', '60%'],
            center: ['50%', '54%'],

            // avoidLabelOverlap: false,

            label: {
              show: false,
              //   // position: 'center',
              //   position: 'outside',
              // formatter: '{d}%',
            },

            emphasis: {
              // label: {
              //   show: false,
              //   fontSize: 40,
              //   fontWeight: 'bold',
              // },
            },
            // labelLine: {
            //   show: true,
            // },
            data: value.map((item) => {
              item.name = this.$t(item.name)
              return item
            }),

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

      value.forEach((item) => {
        if (!item.selected) {
          this.chartDom.dispatchAction({
            type: 'legendUnSelect',
            // 图例名称
            name: item.name,
          })
        }
      })

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
