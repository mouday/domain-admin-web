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
          <el-link
            :underline="false"
            :href="scope.row.domain_url"
            target="_blank"
            >{{ scope.row.domain }}</el-link
          >
        </template>
      </el-table-column>

      <!-- ip -->
      <el-table-column
        label="ip地址"
        header-align="center"
        align="center"
        width="140"
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
          <ConnectStatus
            :value="scope.row.connect_status"
            @on-click="handleShowDetail(scope.row)"
          ></ConnectStatus>
        </template>
      </el-table-column>

      <!-- 有效期总天数 -->
      <el-table-column
        label="有效期天数"
        header-align="center"
        align="center"
        width="180"
        prop="total_days"
      >
        <template #default="scope">
          <el-progress
            v-if="scope.row.percentage"
            :percentage="scope.row.percentage"
            :show-text="false"
            :status="scope.row.percentage_status"
          />
          <div>
            <span class="el-text-color-primary">{{ scope.row.expire_days || '-' }}</span>
            <span> / </span>
            <span class="el-text-color-secondary">{{ scope.row.total_days || '-' }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <!-- <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        width="110"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time_label || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 创建时间 -->
      <el-table-column
        label="更新时间"
        header-align="center"
        align="center"
        width="110"
        prop="check_time"
      >
        <template #default="scope">
          <span>{{ scope.row.check_time_label || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="更新"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleUpdateRowDomainInfo(scope.row)"
            ><el-icon><Refresh /></el-icon
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

    <!-- 详情 -->
    <DataDetailDialog
      :row="currentRow"
      v-model:visible="dialogDetailVisible"
      @on-success="handleDetailSuccess"
    ></DataDetailDialog>
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */
import DataFormDialog from '../domain-edit/DataFormDialog.vue'
import DataDetailDialog from '../domain-detail/DataFormDailig.vue'
import ConnectStatus from '@/components/ConnectStatus.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
    DataDetailDialog,
    ConnectStatus,
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
      dialogDetailVisible: false,
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

    async handleUpdateRowDomainInfo(row) {
      let loading = this.$loading({
        lock: true,
        text: '更新中',
      })

      let params = {
        id: row.id,
      }

      const res = await this.$http.updateDomainCertInfoById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      }

      loading.close()
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },

    handleDetailSuccess() {
      this.$emit('on-success')
    },

    handleShowDetail(row) {
      this.currentRow = row
      this.dialogDetailVisible = true
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
