<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!-- 域名 -->
      <el-table-column
        label="域名"
        header-align="center"
        align="center"
        prop="domain"
      >
        <template #default="scope">
          <span>{{ scope.row.domain || '-' }}</span>
        </template>
      </el-table-column>

      <!-- ip -->
      <el-table-column
        label="ip地址"
        header-align="center"
        align="center"
        prop="ip"
      >
        <template #default="scope">
          <span>{{ scope.row.ip || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 域名连接状态 -->
      <el-table-column
        label="连接状态"
        header-align="center"
        align="center"
        width="90"
        prop="connect_status"
      >
        <template #default="scope">
          <el-icon
            v-if="scope.row.connect_status"
            class="color--success"
            ><SuccessFilled
          /></el-icon>

          <el-icon
            v-else
            class="color--danger"
            ><WarningFilled
          /></el-icon>
        </template>
      </el-table-column>

      <!-- 有效期总天数 -->
      <el-table-column
        label="有效期天数"
        header-align="center"
        align="center"
        prop="total_days"
      >
        <template #default="scope">
          <el-progress
            v-if="scope.row.percentage"
            :percentage="scope.row.percentage"
            :show-text="false"
          />
          <span
            >{{ scope.row.expire_days || '-' }} /
            {{ scope.row.total_days || '-' }}</span
          >
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        width="170"
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
        <template v-slot="{ row }">
          <el-popconfirm
            title="确定删除？"
            @confirm="handleDeleteClick(row)"
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
 * created 2022-10-01
 */
import DataFormDialog from '../domain-edit/DataFormDialog.vue'

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
        id: row.id,
      }

      const res = await this.$http.deleteDomainById(params)

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

      const res = await this.$Http.function(params)

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
