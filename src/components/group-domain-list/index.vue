<template>
  <div class="">
    <!-- 操作按钮 -->
    <div class="margin-bottom--20">
      <el-input
        style="width: 260px"
        v-model="keyword"
        placeholder="输入域名"
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

      <el-button
        class="ml-sm"
        type="primary"
        @click="handleRelation"
        >关联</el-button
      >
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-md"
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
      @on-success="resetData"
      @on-edit-row="handleEditRow"
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
    <!-- <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog> -->
  </div>
</template>

<script>
/**
 * created 2023-04-07
 */

// import DataFormDialog from '../group-domain-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import { useGroupStore } from '@/store/group-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'group-domain-list',

  props: {
    row: {
      type: Object,
    },
  },

  components: {
    // DataFormDialog,
    DataTable,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',

      loading: true,
      dialogVisible: false,
      selection: [],
    }
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),
  },

  methods: {
    resetData() {
      this.page = 1
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        page: this.page,
        size: this.size,
        keyword: this.keyword,
      }

      try {
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
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    getGroupName(group_id) {
      let groupOption = this.groupOptions.find((x) => x.value == group_id)

      if (groupOption) {
        return groupOption.name
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

    async handleRelation() {
      let domainIds = this.selection.map((item) => item.id)
      console.log(domainIds)

      let params = {
        domain_ids: domainIds,
        group_id: this.row.id,
      }

      const res = await this.$http.domainRelationGroup(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleSelectionChange(selection) {
      console.log(selection)
      this.selection = selection
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
