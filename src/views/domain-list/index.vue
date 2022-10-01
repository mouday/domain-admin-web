<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>添加</el-button
      >

      <div class="flex">
        <el-button @click="updateAllDomainCertInfoOfUser"
          ><el-icon><Refresh /></el-icon>全部更新</el-button
        >

        <el-upload
          class="ml-sm"
          action="action"
          :limit="1"
          :show-file-list="false"
          :http-request="handleHttpRequest"
        >
          <el-button @click="importDomainFromFile"
            ><el-icon><Upload /></el-icon>导入</el-button
          >
        </el-upload>
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
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */

import DataFormDialog from '../domain-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'

export default {
  name: 'domain-list',

  props: {},

  components: {
    DataFormDialog,
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
        keywords: this.keywords,
      }

      const res = await this.$http.getDomainList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          if (item.expire_days && item.total_days) {
            item.percentage = (item.expire_days / item.total_days) * 100
          } else {
            item.percentage = null
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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
