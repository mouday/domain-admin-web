<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <el-table-column
        :label="$t('序号')"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 状态 -->

      <!-- 创建时间 -->
      <el-table-column
        :label="$t('开始时间')"
        header-align="center"
        align="center"
        prop="create_time"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 更新时间 -->
      <el-table-column
        :label="$t('结束时间')"
        header-align="center"
        align="center"
        prop="update_time"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.update_time || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('持续时间')"
        header-align="center"
        align="center"
        width="100"
        prop="total_time_label"
      >
        <template #default="scope">
          <span>{{ scope.row.total_time_label || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('状态')"
        header-align="center"
        align="center"
        prop="status"
        width="60"
      >
        <template #default="scope">
          <!-- <span>{{ scope.row.status || '-' }}</span> -->
          <ConnectStatus :value="scope.row.status_value"></ConnectStatus>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('执行结果')"
        header-align="center"
        align="center"
        prop="status"
      >
        <template #default="scope">
          <span>{{ scope.row.result || '-' }}</span>
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
      </el-table-column> -->
    </el-table>

    <!-- 编辑框 -->
    <!-- <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog> -->
  </div>
</template>

<script>
/**
 * created 2022-10-03
 */
// import DataFormDailog from '../log_scheduler-edit/DataFormDailog.vue'
import ConnectStatus from '@/components/ConnectStatus.vue'

export default {
  name: '',

  components: {
    // DataFormDailog,
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
