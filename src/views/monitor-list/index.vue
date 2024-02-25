<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
      >

      <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        placeholder="输入名称"
        clearable
        @keypress.enter="handleSearch"
        @clear="handleSearch"
      >
        <template #append>
          <el-button @click="handleSearch">
            <el-icon><Search /></el-icon
          ></el-button>
        </template>
      </el-input>
    </div>

    <!-- 筛选器 -->
    <ConditionFilter
      v-if="hasInitData"
      class="mt-md"
      ref="ConditionFilter"
      @on-change="handleConditionFilterChange"
    ></ConditionFilter>

    <!-- 工具栏 -->
    <div
      class="flex mt-sm"
      style="align-items: center"
    >
      <DataCount :value="total"></DataCount>

      <div
        class="flex"
        style="margin-left: auto"
      >
        <span
          v-if="next_run_time"
          class="color--info text-sm"
          >即将运行：{{ next_run_time }}</span
        >

        <template v-if="showBatchActionButton">
          <el-popconfirm
            title="确定删除选中？"
            @confirm="handleBatchDeleteConfirm"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="danger"
                class="ml-sm"
                ><el-icon><Delete /></el-icon>批量删除</el-link
              >
            </template>
          </el-popconfirm>
        </template>

        <!-- 导入 -->
        <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept -->
        <el-link
          :underline="false"
          type="primary"
          class="ml-sm"
          style="position: relative"
          ><el-icon><Upload /></el-icon>{{ $t('导入') }}
          <el-upload
            ref="upload"
            action="action"
            accept=".txt,.csv,.xlsx"
            :limit="1"
            :on-exceed="handleExceed"
            :show-file-list="false"
            :http-request="handleHttpRequest"
          >
            <div
              style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
            ></div>
          </el-upload>
        </el-link>

        <!-- 导出 -->
        <el-link
          :underline="false"
          type="primary"
          class="ml-sm"
          @click="handleExportToFile"
          ><el-icon><Download /></el-icon>{{ $t('导出') }}</el-link
        >
      </div>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-sm"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
      @selection-change="handleSelectionChange"
    />

    <!-- 翻页 -->
    <el-pagination
      class="mt-md justify-center"
      background
      layout="total, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
    />

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog>

    <!-- 数据导出 -->
    <ExportFileDialog
      :allowExts="['xlsx', 'csv']"
      v-model:visible="exportFileDialogVisible"
      @on-confirm="handleExportConfirm"
    ></ExportFileDialog>
  </div>
</template>

<script>
/**
 * created 2024-01-28
 */

import DataFormDialog from '../../components/monitor-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import {
  MonitorStatusFilter,
  MonitorStatusFilterStatus,
} from '../../emuns/monitor-status-enums.js'
import { MonitorTypeFilter } from '../../emuns/monitor-type-enums.js'
import DataCount from '@/components/DataCount.vue'
import ConditionFilter from './ConditionFilter.vue'
import ExportFileDialog from '@/components/export-file/ExportFileDialog.vue'
import FileSaver from 'file-saver'
import { genFileId } from 'element-plus'
import dayjs from 'dayjs'

export default {
  name: 'monitor-list',

  props: {},

  components: {
    DataFormDialog,
    DataTable,
    DataCount,
    ConditionFilter,
    ExportFileDialog,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',
      timer: null,

      loading: true,
      hasInitData: true,
      dialogVisible: false,
      params: {},
      ConditionFilterParams: [],
      exportFileDialogVisible: false,
      next_run_time: null,
      selectedRows: [],
    }
  },

  computed: {
    showBatchActionButton() {
      if (this.selectedRows && this.selectedRows.length > 0) {
        return true
      } else {
        return false
      }
    },
  },

  methods: {
    resetData() {
      this.page = 1
      // this.getMonitorTaskNextRunTime()
      this.getData()
    },

    async getMonitorTaskNextRunTime() {
      const res = await this.$http.getMonitorTaskNextRunTime()
      this.next_run_time = res.data.next_run_time

      // if (this.next_run_time) {
      //   let diff = dayjs(this.next_run_time).diff(dayjs()) + 5 * 1000

      //   this.timer = setTimeout(() => {
      //     this.getMonitorTaskNextRunTime()
      //     this.getData()
      //   }, diff)
      // }
    },

    async getData() {
      this.loading = true

      let params = {
        page: this.page,
        size: this.size,
        keyword: this.keyword,
      }

      // 筛选参数
      for (let item of this.ConditionFilterParams) {
        if (item.selected && item.selected.length > 0) {
          if (item.maxCount == 1) {
            params[item.field] = item.selected[0]
          } else {
            params[item.field] = item.selected
          }
        }
      }

      this.params = params

      try {
        const res = await this.$http.getMonitorList(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            item.monitor_type_label = MonitorTypeFilter(item.monitor_type)
            item.status_value = MonitorStatusFilterStatus(item.status)
            return item
          })
          this.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },

    handleSearch() {
      this.resetData()
    },

    handleConditionFilterChange(data) {
      console.log(data)
      this.ConditionFilterParams = data
      this.resetData()
    },

    handleExportToFile() {
      this.exportFileDialogVisible = true
    },

    async handleExportConfirm(data) {
      const res = await this.$http.exportMonitorFile({
        ...this.params,
        ext: data.ext,
      })

      if (res.ok) {
        FileSaver.saveAs(res.data.url, res.data.name)
      }
    },

    // 覆盖前一个文件
    handleExceed(files) {
      // console.log(files)
      this.$refs.upload.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      // console.log(file)

      this.handleHttpRequest({ file })

      // this.$refs.upload.handleStart(file)
    },

    async handleHttpRequest(options) {
      let loading = this.$loading({ fullscreen: true })

      // console.log(options)
      let form = new FormData()
      form.append('file', options.file)

      const res = await this.$http.importMonitorFromFile(form)

      if (res.code == 0) {
        // this.$msg.success(`导入成功：${res.data.count}`)
        this.$msg.success('导入成功，后台检测中')
        this.resetData()

        if (this.$refs.ConditionFilter) {
          this.$refs.ConditionFilter.resetData()
        }

        // this.updateGroupOptions()
      }

      loading.close()
    },

    handleSelectionChange(val) {
      this.selectedRows = val
      // console.log(val.map((item) => item.id))
    },

    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        monitor_ids: this.selectedRows.map((item) => item.id),
      }

      try {
        const res = await this.$http.deleteMonitorByIds(params)

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

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  created() {
    this.resetData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
