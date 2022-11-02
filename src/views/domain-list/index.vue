<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <div>
        <el-button
          type="primary"
          @click="handleAddRow"
          ><el-icon><Plus /></el-icon>添加</el-button
        >

        <el-input
          class="ml-sm"
          style="width: 260px"
          v-model="keyword"
          placeholder="搜索域名"
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

      <div class="flex">
        <el-button @click="updateAllDomainCertInfoOfUser"
          ><el-icon><Refresh /></el-icon>全部更新</el-button
        >

        <el-button
          class="margin-left--auto"
          @click="checkDomainCert"
          ><el-icon><Position /></el-icon>证书检查</el-button
        >

        <el-upload
          class="ml-sm"
          action="action"
          :limit="1"
          :show-file-list="false"
          :http-request="handleHttpRequest"
        >
          <el-button
            ><el-icon><Upload /></el-icon>导入</el-button
          >
        </el-upload>

        <el-button
          class="ml-sm"
          @click="handleExportToFile"
          ><el-icon><Download /></el-icon>导出</el-button
        >
      </div>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-md"
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
    <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */

import DataFormDialog from '../domain-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import dataApi from '@/api/dataApi.js'
import { resolve_api_url } from '@/api/index.js'
import FileSaver from 'file-saver'

export default {
  name: 'domain-list',

  props: {},

  components: {
    DataFormDialog,
    DataTable,
  },

  data() {
    return {
      dataApi,
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',

      pageSizeCachekey: 'pageSize',

      loading: true,
      dialogVisible: false,
      export_to_file_url: resolve_api_url(dataApi.exportDomainToFile),
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
        page: this.page,
        size: this.size,
        keyword: this.keyword,
      }

      const res = await this.$http.getDomainList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          // 百分比
          if (item.expire_days && item.total_days) {
            item.percentage = (item.expire_days / item.total_days) * 100
          } else {
            item.percentage = null
          }

          // 状态栏颜色
          item.percentage_status = 'exception'

          if (item.expire_days >= 30) {
            item.percentage_status = '' // success
          } else if (item.expire_days >= 3) {
            item.percentage_status = 'warning'
          }

          return item
        })
        this.total = res.data.total
      } else {
        this.$msg.error(e.msg)
      }

      this.loading = false
    },

    async updateAllDomainCertInfoOfUser() {
      let loading = this.$loading({ fullscreen: true })

      const res = await this.$http.updateAllDomainCertInfoOfUser()

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.resetData()
      }

      loading.close()
    },

    async handleHttpRequest(options) {
      let loading = this.$loading({ fullscreen: true })

      // console.log(options)
      let form = new FormData()
      form.append('file', options.file)

      const res = await this.$http.importDomainFromFile(form)

      if (res.code == 0) {
        this.$msg.success(`导入成功：${res.data.count}`)
        this.resetData()
      }

      loading.close()
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },

    async handleExportToFile() {
      const res = await this.$http.getAllDomainListOfUser()
      let content = res.data.list.map((item) => item.domain).join('\n')

      var blob = new Blob([content], {
        type: 'text/plain;charset=utf-8',
      })

      FileSaver.saveAs(blob, 'domain.txt')
    },

    handleSearch() {
      this.resetData()
    },

    async checkDomainCert() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.checkDomainCert()

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
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
  },

  created() {
    this.loadPageSize()
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
