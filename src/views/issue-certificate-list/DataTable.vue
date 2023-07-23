<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 域名列表 -->
      <el-table-column
        label="域名"
        header-align="center"
        align="center"
        prop="domains"
      >
        <template #default="scope">
          <template v-for="domain in scope.row.domains">
            <div>{{ domain }}</div>
          </template>
        </template>
      </el-table-column>

      <!-- 验证状态 -->
      <el-table-column
        label="验证状态"
        header-align="center"
        align="center"
        prop="status"
        width="80"
      >
        <template #default="scope">
          <ConnectStatus
            :value="scope.row.show_status"
            @on-click="handleShowAddressListgDialog(scope.row)"
          ></ConnectStatus>

          <span style="margin-left: 4px;">{{ scope.row.status_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- SSL签发时间 -->
      <el-table-column
        label="SSL签发时间"
        header-align="center"
        align="center"
        prop="start_time"
        width="160"
      >
        <template #default="scope">
          <span>{{ scope.row.start_time || '-' }}</span>
        </template>
      </el-table-column>

      <!-- SSL过期时间 -->
      <el-table-column
        label="SSL过期时间"
        header-align="center"
        align="center"
        prop="expire_time"
        width="160"
      >
        <template #default="scope">
          <span>{{ scope.row.expire_time || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time_label"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time_label || '-' }}</span>
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

      <el-table-column
        label="查看"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleEditRow(scope.row)"
            ><el-icon><Tickets /></el-icon></el-link>
        </template>
      </el-table-column>

      <!-- <el-table-column
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
      </el-table-column> -->
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
 * created 2023-07-23
 */
import DataFormDialog from '../issue-certificate-edit/DataFormDialog.vue'
import ConnectStatus from '@/components/ConnectStatus.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
    ConnectStatus
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
