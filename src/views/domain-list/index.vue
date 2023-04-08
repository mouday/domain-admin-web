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

        <SelectGroup
          class="w-[150px] ml-sm"
          v-model="group_id"
          clearable
          @change="resetData"
        ></SelectGroup>

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
        <UpdateDomainInfo @on-success="resetData"></UpdateDomainInfo>

        <CheckDomainInfo @on-success="resetData"></CheckDomainInfo>

        <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept -->
        <el-upload
          class="ml-sm"
          ref="upload"
          action="action"
          accept=".txt"
          :limit="1"
          :on-exceed="handleExceed"
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
      @sort-change="handleSortChange"
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
import { genFileId } from 'element-plus'
import SelectGroup from '@/components/SelectGroup.vue'
import { useGroupStore } from '@/store/group-store.js'
import { mapState, mapActions } from 'pinia'
import UpdateDomainInfo from './UpdateDomainInfo.vue'
import CheckDomainInfo from './CheckDomainInfo.vue'

export default {
  name: 'domain-list',

  props: {},

  components: {
    DataFormDialog,
    DataTable,
    SelectGroup,
    UpdateDomainInfo,
    CheckDomainInfo,
  },

  data() {
    return {
      dataApi,
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',
      group_id: '',

      pageSizeCachekey: 'pageSize',

      loading: true,
      dialogVisible: false,
      export_to_file_url: resolve_api_url(dataApi.exportDomainToFile),

      order_type: 'ascending',
      order_prop: 'expire_days',
    }
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),
  },

  methods: {
    ...mapActions(useGroupStore, {
      updateGroupOptions: 'updateGroupOptions',
    }),

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
        group_id: this.group_id,
        keyword: this.keyword.trim(),
        order_type: this.order_type,
        order_prop: this.order_prop,
      }

      const res = await this.$http.getDomainList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          // 分组
          if (item.group_id) {
            item.group_name = this.getGroupName(item.group_id)
          }

          return item
        })
        this.total = res.data.total
      } else {
        this.$msg.error(e.msg)
      }

      this.loading = false
    },

    getGroupName(group_id) {
      let groupOption = this.groupOptions.find((x) => x.value == group_id)

      if (groupOption) {
        return groupOption.name
      }
    },

    async handleHttpRequest(options) {
      let loading = this.$loading({ fullscreen: true })

      // console.log(options)
      let form = new FormData()
      form.append('file', options.file)

      const res = await this.$http.importDomainFromFile(form)

      if (res.code == 0) {
        // this.$msg.success(`导入成功：${res.data.count}`)
        this.$msg.success('上传成功，后台导入中')
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
      // const res = await this.$http.getAllDomainListOfUser()
      // let content = res.data.list.map((item) => item.domain).join('\n')

      // var blob = new Blob([content], {
      //   type: 'text/plain;charset=utf-8',
      // })
      const res = await this.$http.exportDomainFile()
      if (res.ok) {
        FileSaver.saveAs(res.data.url, 'domain.txt')
      }
    },

    handleSearch() {
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

    handleSortChange({ column, prop, order }) {
      console.log(column, prop, order)

      this.order_type = order
      this.order_prop = prop

      this.resetData()
    },

    async initData() {
      this.loadPageSize()

      await this.updateGroupOptions()

      this.getData()
    },
  },

  created() {
    this.initData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
