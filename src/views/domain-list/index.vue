<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div
      class="flex"
      style="justify-content: space-between"
    >
      <span v-if="RoleEnum.Admin == role"></span>
      <div v-else>
        <el-button
          type="primary"
          @click="handleAddRow"
          ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
        ><el-button @click="handleAddCert"><el-icon><Link /></el-icon>{{ $t('证书申请') }}</el-button>
      </div>

      <!-- <SelectGroup
          class="w-[150px] ml-sm"
          v-model="group_id"
          clearable
          @change="resetData"
        ></SelectGroup> -->

      <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        :placeholder="$t('搜索域名')"
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
    <span v-if="RoleEnum.Admin == role"></span>
    <ConditionFilter
      v-else
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
        <el-popconfirm
          v-if="showBatchDeleteButton"
          title="确定删除选中？"
          @confirm="handleBatchDeleteConfirm"
        >
          <template #reference>
            <el-link
              :underline="false"
              type="danger"
              class="mr-sm"
              ><el-icon><Delete /></el-icon>批量删除</el-link
            >
          </template>
        </el-popconfirm>

        <UpdateDomainInfo @on-success="resetData"></UpdateDomainInfo>

        <template v-if="RoleEnum.Admin != role">
          <CheckDomainInfo
            class="ml-sm"
            @on-success="resetData"
          ></CheckDomainInfo>

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

          <el-link
            :underline="false"
            type="primary"
            class="ml-sm"
            @click="handleExportToFile"
            ><el-icon><Download /></el-icon>{{ $t('导出') }}</el-link
          >
        </template>
      </div>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-sm"
      v-loading="loading"
      :role="role"
      :data="list"
      @on-success="resetData"
      @on-refresh-row="handleRefreshRow"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
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

    <!-- 数据导出 -->
    <ExportFileDialog
      v-model:visible="exportFileDialogVisible"
      @on-confirm="handleExportConfirm"
    ></ExportFileDialog>
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
import ConditionFilter from './ConditionFilter.vue'
import { getUUID } from '@/utils/uuid.js'
import { RoleEnum } from '@/emuns/role-enums.js'
import DataCount from '@/components/DataCount.vue'
import ExportFileDialog from '@/components/export-file/ExportFileDialog.vue'

export default {
  name: 'domain-list',

  props: {
    role: {
      type: Number,
      default: RoleEnum.User,
    },
  },

  components: {
    DataFormDialog,
    DataTable,
    SelectGroup,
    UpdateDomainInfo,
    CheckDomainInfo,
    ConditionFilter,
    DataCount,
    ExportFileDialog,
  },

  data() {
    return {
      RoleEnum,
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

      hasInitData: false,

      ConditionFilterParams: [],
      selectedRows: [],
      params: {},

      exportFileDialogVisible: false,
    }
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),
    showBatchDeleteButton() {
      if (this.selectedRows && this.selectedRows.length > 0) {
        return true
      } else {
        return false
      }
    },
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
        role: this.role,
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

      const res = await this.$http.getDomainList(params)

      if (res.code == 0) {
        this.list = res.data.list
        this.total = res.data.total
      } else {
        this.$msg.error(res.msg)
      }

      this.loading = false
    },

    // preHandleRow(row) {
    //   row._uuid = getUUID()

    //   // 分组
    //   if (row.group_id) {
    //     // row.group_name = this.getGroupName(row.group_id)
    //   }

    //   return row
    // },

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

        if (this.$refs.ConditionFilter) {
          this.$refs.ConditionFilter.resetData()
        }

        this.updateGroupOptions()
      }

      loading.close()
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },

    async handleExportConfirm(data) {
      const res = await this.$http.exportDomainFile({
        ...this.params,
        ext: data.ext,
      })

      if (res.ok) {
        FileSaver.saveAs(res.data.url, res.data.name)
      }
    },

    handleExportToFile() {
      // const res = await this.$http.getAllDomainListOfUser()
      // let content = res.data.list.map((item) => item.domain).join('\n')
      // var blob = new Blob([content], {
      //   type: 'text/plain;charset=utf-8',
      // })
      this.exportFileDialogVisible = true
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

      // 先清空
      this.order_prop = ''
      this.order_type = ''

      // 如果有排序字段，再赋值
      if (order) {
        this.order_type = order
        this.order_prop = prop
      }

      this.resetData()
    },

    async initData() {
      this.loadPageSize()

      await this.updateGroupOptions()

      this.hasInitData = true
      this.getData()
    },

    handleSelectionChange(val) {
      this.selectedRows = val
      // console.log(val.map((item) => item.id))
    },

    handleConditionFilterChange(data) {
      console.log(data)
      this.ConditionFilterParams = data
      this.resetData()
    },

    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        ids: this.selectedRows.map((item) => item.id),
      }

      try {
        const res = await this.$http.deleteDomainByIds(params)

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

    async handleRefreshRow(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.getDomainById(params)

      if (res.ok) {
        let index = this.list.findIndex((item) => item.id == row.id)

        this.list.splice(index, 1, res.data)
        console.log(this.list)
      }
    },

    handleAddCert() {
      const route = this.$router.resolve({
        path: '/cert/issue-certificate-list',
      })

      window.open(route.href, '_blank')
    },

    handleEditCert(row) {
      this.$router.push({
        name: 'CertEdit',
        query: {
          id: row.id,
        },
      })
    },
  },

  created() {
    this.keyword = this.$route.query.keyword || this.keyword
    this.initData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
