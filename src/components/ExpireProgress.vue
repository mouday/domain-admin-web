<template>
  <div class="ExpireProgress">
    <el-progress
      v-if="percentage"
      :percentage="percentage"
      :show-text="false"
      :status="percentageStatus"
    />
    <div class="ExpireProgress__info">
      <template v-if="totalDays">
        <span class="el-text-color-primary">{{ expireDays }}</span>
        <span> / </span>
        <span class="el-text-color-secondary">{{ totalDays }}</span>
      </template>
      
      <span v-else>-</span>

      <!-- <el-tag
        v-if="isManual"
        type="info"
        class="mo-table-tag  ml-[1px]"
        size="small"
        >手动</el-tag
      > -->
    </div>
  </div>
</template>

<script>
// created at 2023-04-04
import dayjs from 'dayjs'

export default {
  name: 'ExpireProgress',

  props: {
    // 开始时间
    startTime: {
      type: String,
    },
    // 结束时间
    endTime: {
      type: String,
    },

    // 手动标签
    isManual: {
      type: Boolean,
    },
  },

  components: {},

  data() {
    return {
      nowTime: dayjs(),
    }
  },

  computed: {
    parsedStartTime() {
      return dayjs(this.startTime)
    },

    parsedEndTime() {
      return dayjs(this.endTime)
    },

    totalDays() {
      return this.parsedEndTime.diff(this.parsedStartTime, 'day')
    },

    expireDays() {
      return this.parsedEndTime.diff(this.nowTime, 'day')
    },

    percentage() {
      let percentage = null

      // 百分比
      if (this.expireDays && this.totalDays) {
        percentage = (this.expireDays / this.totalDays) * 100
      }

      return percentage
    },

    percentageStatus() {
      // 状态栏颜色
      let percentage_status

      if (this.expireDays > 7) {
        percentage_status = '' // success
      } else if (this.expireDays > 0) {
        percentage_status = 'warning'
      } else {
        percentage_status = 'exception'
      }

      return percentage_status
    },
  },

  methods: {
    async getData() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.ExpireProgress {
}

.ExpireProgress__info {
}
</style>
