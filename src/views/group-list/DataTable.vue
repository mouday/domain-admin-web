<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <el-table-column
        label="序号"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 名称 -->
      <el-table-column
        label="名称"
        header-align="center"
        align="center"
        prop="name"
      >
        <template #default="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 域名数量 -->
      <el-table-column
        label="域名数量"
        header-align="center"
        align="center"
        prop="name"
      >
        <template #default="scope">
          <span>{{ scope.row.domain_count || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <!-- <el-table-column
        label="状态"
        header-align="center"
        align="center"
        width="80"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          />
        </template>
      </el-table-column> -->

      <!-- 关联域名 -->
      <el-table-column
        label="关联域名"
        width="90"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleCountClick(scope.row)"
            ><el-icon><Link /></el-icon
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column
        label="编辑"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column
        label="删除"
        width="60"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定删除？"
            @confirm="handleDeleteClick(scope.row)"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="danger"
                ><el-icon><Delete /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog>

    <!-- 分组 + 域名 关联-->
    <GroupDomainListDialog
      :row="currentRow"
      v-model:visible="groupDomainListDialogVisible"
      @on-success="handleUpdateSuccess"
    ></GroupDomainListDialog>
  </div>
</template>

<script>
/**
 * created 2023-04-04
 */
import DataFormDialog from '../group-edit/DataFormDialog.vue'

import GroupDomainListDialog from '@/components/group-domain-list/DataTableDialog.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
    GroupDomainListDialog,
  },

  props: {
    list: {
      type: Array,
    },
  },

  computed: {},

  data() {
    return {
      currentRow: null,
      dialogVisible: false,
      groupDomainListDialogVisible: false,
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.deleteGroupById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleStatusChange(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.function(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },

    handleCountClick(row) {
      console.log('handleCountClick');
      // this.$emit('on-count-click', row)
      this.currentRow = row
      this.groupDomainListDialogVisible = true
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
