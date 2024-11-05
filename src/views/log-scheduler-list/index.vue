<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <!-- <div class="margin-bottom--20"> -->
    <!-- <el-button
        type="primary"
        @click="handleAddRow"
        >添加</el-button
      > -->

    <!-- <el-input
          class="ml-sm"
          style="width: 260px"
          v-model="keyword"
          placeholder="输入域名"
          @keypress.enter="handleSearch"
        >
          <template #append>
            <el-button @click="handleSearch">
              <el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
    </div> -->
    <div class="flex justify-end mb-sm">
      <div></div>

      <el-popconfirm
        title="确定清空日志？"
        @confirm="handleBatchDeleteConfirm"
      >
        <template #reference>
          <el-link
            :underline="false"
            type="danger"
            class="mr-sm"
            ><el-icon><Delete /></el-icon>{{ $t('清空日志') }}</el-link
          >
        </template>
      </el-popconfirm>

      <el-link
        :underline="false"
        type="primary"
        :disabled="loading"
        @click="getData"
      >
        <el-icon><Refresh /></el-icon>{{ $t('刷新') }}
      </el-link>
    </div>

    <!-- 数据列表 -->
    <DataTable
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

export default {
  name: 'log-scheduler-list',

  props: {},

  components: {
    // DataFormDailog,
    DataTable,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keywords: '',

      loading: true,
      dialogVisible: false,

      pageSizeCachekey: 'pageSize',
    }
  },

  computed: {},

  methods: {
    resetData() {
      this.page = 1
      this.getData()
    },

    refreshData() {
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        ticket: this.ticket,
        page: this.page,
        size: this.size,
        keywords: this.keywords,
      }

      const res = await this.$http.getLogSchedulerList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          // 显示执行中
          if (item.status == false) {
            item.status = null
          }
          return item
        })
        this.total = res.data.total
      }

      this.loading = false
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
        const res = await this.$http.clearLogSchedulerList()

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
  },

  created() {
    this.loadPageSize()
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
