<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between margin-bottom--20">
      <el-button
        v-if="role == RoleEnum.User"
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
      >
      <span v-else></span>

      <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        clearable
        :placeholder="$t('搜索分组')"
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
      </div>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-sm"
      v-loading="loading"
      :role="role"
      :list="list"
      @on-success="resetData"
      @on-edit-row="handleEditRow"
      @selection-change="handleSelectionChange"
    />

    <!-- 翻页 -->
    <el-pagination
      class="mt-md justify-center"
      background
      layout="total, prev, pager, next"
      :total="total"
      v-model:page-size="total"
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
 * created 2023-04-04
 */

import DataFormDialog from '../group-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'

import { useGroupStore } from '@/store/group-store.js'
import { mapState, mapActions } from 'pinia'
import { RoleEnum } from '@/emuns/role-enums.js'
import DataCount from '@/components/DataCount.vue'

export default {
  name: 'group-list',

  props: {
    role: {
      type: Number,
      default: RoleEnum.User,
    },
  },

  components: {
    DataFormDialog,
    DataTable,
    DataCount,
  },

  data() {
    return {
      RoleEnum,
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',

      loading: true,
      dialogVisible: false,
      selectedRows: [],
    }
  },

  computed: {
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
      setGroupOptions: 'setGroupOptions',
    }),

    resetData() {
      this.page = 1
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        // page: this.page,
        // size: this.size,
        keyword: this.keyword.trim(),
        role: this.role,
      }

      try {
        const res = await this.$http.getGroupList(params)

        if (res.code == 0) {
          this.list = res.data.list
          this.total = res.data.total

          // 更新全局的选项配置
          this.setGroupOptions(res.data.list)
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

    handleEditRow(row) {},

    handleSelectionChange(val) {
      this.selectedRows = val
      // console.log(val.map((item) => item.id))
    },
    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        group_ids: this.selectedRows.map((item) => item.id),
      }

      try {
        const res = await this.$http.deleteGroupByIds(params)

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
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
