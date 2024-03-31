<template>
  <div class="">
    <!-- 操作按钮 -->
    <div
      class="mb-md"
      v-if="groupRow.is_leader && role == RoleEnum.User"
    >
      <!-- <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>添加</el-button
      > -->
      <span>添加成员：</span>

      <SearchUser
        v-model:keyword="keyword"
        @on-select="handleSelectUser"
      ></SearchUser>
    </div>

    <!-- 数据列表 -->
    <DataTable
      v-loading="loading"
      :list="list"
      :role="role"
      :disabled="!groupRow.is_leader || role != RoleEnum.User"
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
 * created 2023-07-05
 */

// import DataFormDialog from '../group-user-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import { RoleEnum } from '@/emuns/role-enums.js'
import SearchUser from '@/components/SearchUser.vue'

export default {
  name: 'group-user-list',

  props: {
    groupRow: {
      type: Object,
    },

    role: {
      type: Number,
    },
  },

  components: {
    // DataFormDialog,
    DataTable,
    SearchUser,
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
    }
  },

  computed: {},

  methods: {
    resetData() {
      this.page = 1
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        // page: this.page,
        // size: this.size,
        // keyword: this.keyword,
        group_id: this.groupRow.id,
      }

      try {
        const res = await this.$http.getGroupUserList(params)

        if (res.code == 0) {
          this.list = res.data.list
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

    

    async handleSelectUser(data) {
      let exist = this.list.find((item) => {
        return item.user_id == data.id
      })

      if (exist) {
        this.$msg.warning('成员已存在')
        return
      }

      let loading = this.$loading({ fullscreen: true })

      let params = {
        group_id: this.groupRow.id,
        user_id: data.id,
      }

      try {
        const res = await this.$http.addGroupUser(params)

        if (res.code == 0) {
          this.$msg.success('操作成功')
          // this.$emit('on-success')
          this.keyword = ''
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

    handleEditRow(row){}
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
