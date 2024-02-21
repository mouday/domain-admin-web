<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!-- 用户名 -->
      <el-table-column
        label="用户名"
        header-align="center"
        align="center"
        prop="username"
      >
        <template #default="scope">
          <span>{{ scope.row.user_name || '-' }}</span>
          <el-tag
            v-if="scope.row.is_leader"
            class="ml-sm"
            >负责人</el-tag
          >
        </template>
      </el-table-column>

      <!-- 读权限 -->
      <el-table-column
        label="权限"
        header-align="center"
        align="center"
        prop="has_edit_permission"
      >
        <template #default="scope">
          <el-checkbox
            :model-value="true"
            disabled
            label="读权限"
          />

          <el-checkbox
            v-model="scope.row.has_edit_permission"
            label="写权限"
            :disabled="disabled || scope.row.is_leader"
            @change="handleRowHasEditPermissionChange(scope.row, $event)"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="移除"
        width="60"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定从分组移除？"
            @confirm="handleDeleteClick(scope.row)"
            :width="160"
            :disabled="disabled || scope.row.is_leader"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="danger"
                :disabled="disabled || scope.row.is_leader"
                ><el-icon><Delete /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <!-- <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog> -->
  </div>
</template>

<script>
/**
 * created 2023-07-05
 */
// import DataFormDialog from '../group-user-edit/DataFormDialog.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: '',

  components: {
    // DataFormDialog,
  },

  props: {
    list: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
    },
  },

  computed: {},

  data() {
    return {
      RoleEnum,
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
        group_user_id: row.id,
      }

      const res = await this.$http.deleteGroupUserById(params)

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

    async handleRowHasEditPermissionChange(row, value) {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        group_user_id: row.id,
        has_edit_permission: value,
      }

      try {
        const res = await this.$http.updateGroupUserById(params)

        if (res.code == 0) {
          this.$msg.success('操作成功')
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

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
