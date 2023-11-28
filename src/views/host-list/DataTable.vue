<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!-- 主机地址 -->
      <el-table-column
        label="主机地址"
        header-align="center"
        align="center"
        prop="host"
      >
        <template #default="scope">
          <span>{{ scope.row.host || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 端口号 -->
      <el-table-column
        label="端口号"
        header-align="center"
        align="center"
        width="90"
        prop="port"
      >
        <template #default="scope">
          <span>{{ scope.row.port || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 登录用户 -->
      <el-table-column
        label="登录用户"
        header-align="center"
        align="center"
        prop="user"
      >
        <template #default="scope">
          <span>{{ scope.row.user || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 验证方式 -->
      <el-table-column
        label="验证方式"
        header-align="center"
        align="center"
        width="80"
        prop="auth_type"
      >
        <template #default="scope">
          <span>{{ scope.row.auth_type_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        width="180"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
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
            :title="`${$t('确定删除')}？`"
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
  </div>
</template>

<script>
/**
 * created 2023-11-28
 */

import DataFormDialog from '@/components/remote-host/DataFormDialog.vue'
export default {
  name: '',

  components: {
    DataFormDialog,
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
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        host_id: row.id,
      }

      const res = await this.$http.deleteHostById(params)

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
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
