<template>
  <div class="app-container">
    <div class="flex justify-between mb-sm">
      <div class="flex items-center">
        <span class="color--info">监控名称: </span>
        <span class="ml-sm">{{ detail?.title }}</span>

        <span class="ml-md color--info">监控请求: </span>
        <span class="ml-sm">{{ detail?.content?.method }}</span>
        <el-link
          class="ml-sm"
          :underline="false"
          type="primary"
          :href="detail?.content?.url"
          :target="'_blank'"
          >{{ detail?.content?.url }}</el-link
        >
      </div>

      <div class="flex items-center">
        <span class="color--info text-sm"
          >下次运行时间：{{ detail?.next_run_time || '-'}}</span
        >

        <el-link
          v-if="showMode == 'table'"
          :underline="false"
          type="primary"
          class="ml-sm"
          @click="handleChangeShowMode('chart')"
          ><el-icon><DataAnalysis /></el-icon>{{ $t('图表') }}</el-link
        >

        <el-link
          v-else
          :underline="false"
          type="primary"
          class="ml-sm"
          @click="handleChangeShowMode('table')"
          ><el-icon><Tickets /></el-icon>{{ $t('数据') }}</el-link
        >

        <el-popconfirm
          title="确定清空日志？"
          @confirm="handleBatchDeleteConfirm"
        >
          <template #reference>
            <el-link
              :underline="false"
              type="danger"
              class="ml-sm"
              ><el-icon><Delete /></el-icon>{{ $t('清空日志') }}</el-link
            >
          </template>
        </el-popconfirm>
      </div>
    </div>

    <!-- 数据图表 -->
    <DataChart
      v-show="showMode == 'chart'"
      v-loading="loading"
      ref="DataChart"
    ></DataChart>

    <!-- 数据列表 -->
    <DataTable
      v-show="showMode == 'table'"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
    />

    <!-- 翻页 -->
    <el-pagination
      class="mt-md justify-center"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
      @size-change="handleSizeChange"
    />

    <!-- 编辑框 -->
    <!-- <DataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailog> -->
  </div>
</template>

<script>
/**
 * created 2022-10-03
 */

// import DataFormDailog from '../log_scheduler-edit/DataFormDailog.vue'
import DataTable from './DataTable.vue'
import DataChart from './DataChart.vue'
import {
  MonitorStatusFilter,
  MonitorStatusFilterStatus,
} from '../../emuns/monitor-status-enums.js'

export default {
  name: 'log-scheduler-list',

  props: {
    monitorId: {
      type: String,
      default: null,
    },
  },

  components: {
    // DataFormDailog,
    DataTable,
    DataChart,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keywords: '',
      detail: {},
      loading: true,
      dialogVisible: false,

      pageSizeCachekey: 'pageSize',
      showMode: 'chart', // chart table

      timer: null,
    }
  },

  computed: {},

  methods: {
    async resetData() {
      this.page = 1
      this.list = []
      await this.refreshData()
    },

    async refreshData() {
      await this.getData()
      await this.getMonitorData()
    },

    async getMonitorData() {
      let params = {
        monitor_id: this.monitorId,
      }

      const res = await this.$http.getMonitorById(params)
      if (res.ok) {
        this.detail = res.data
      }
    },

    async getData() {
      this.loading = true

      let params = {
        monitor_id: this.monitorId,
        page: this.page,
        size: this.size,
        // keywords: this.keywords,
      }

      const res = await this.$http.getLogMonitorList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          item.status_value = MonitorStatusFilterStatus(item.status)
          return item
        })
        this.total = res.data.total
      }

      // 绘制图表
      this.handleRefreshChart()

      this.loading = false
    },

    handleRefreshChart() {
      // 绘制图表
      if (this.$refs.DataChart) {
        this.$refs.DataChart.refreshData(this.list)
      }
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },

    handleSizeChange(value) {
      localStorage.setItem(this.pageSizeCachekey, value)
      this.resetData()
    },

    loadPageSize() {
      let size = localStorage.getItem(this.pageSizeCachekey)
      if (size) {
        this.size = parseInt(size)
      }
    },

    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.clearLogMonitor({
          monitor_id: this.monitorId,
        })

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.resetData()
        } else {
          this.$msg.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loading.close()
        })
      }
    },

    handleChangeShowMode(showMode) {
      this.showMode = showMode
    },
  },

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.refreshData()
    }, 1000 * 30)

    this.resetData()
  },

  created() {
    this.loadPageSize()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
