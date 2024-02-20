<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
      @selection-change="$emit('on-selection-change', $event)"
    >
      <el-table-column
        v-if="RoleEnum.User == role && domainRow.has_edit_permission"
        type="selection"
        header-align="center"
        align="center"
        width="40"
      />

      <!-- 主机地址 -->
      <el-table-column
        label="主机IP地址"
        header-align="center"
        align="center"
        prop="host"
      >
        <template #default="scope">
          <span>{{ scope.row.host || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 主机连接状态 -->
      <!-- <el-table-column
        label="主机连接状态"
        header-align="center"
        align="center"
        prop="host_connect_status"
      >
        <template #default="scope">
          <span>{{ scope.row.host_connect_status || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 主机检查时间 -->
      <!-- <el-table-column
        label="主机检查时间"
        header-align="center"
        align="center"
        prop="host_check_time"
      >
        <template #default="scope">
          <span>{{ scope.row.host_check_time || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 证书颁发时间 -->
      <el-table-column
        label="证书颁发时间"
        header-align="center"
        align="center"
        prop="ssl_start_time"
        width="110"
      >
        <template #default="scope">
          <span>{{ scope.row.ssl_start_date || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 证书过期时间 -->
      <el-table-column
        label="证书过期时间"
        header-align="center"
        align="center"
        width="110"
        prop="ssl_expire_time"
      >
        <template #default="scope">
          <span>{{ scope.row.ssl_expire_date || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 证书剩余天数 -->
      <el-table-column
        label="剩余天数"
        header-align="center"
        align="center"
        width="80"
        prop="ssl_expire_days"
      >
        <template #default="scope">
          <!-- <span>{{ scope.row.real_time_ssl_expire_days || '-' }}</span> -->
          <ExpireDays :value="scope.row.real_time_ssl_expire_days"></ExpireDays>

          <!-- <el-tag
            v-if="!scope.row.ssl_auto_update"
            class="ml-[5px] mo-table-tag"
            type="info"
            size="small"
            >手动</el-tag
          > -->
        </template>
      </el-table-column>

      <!-- 证书检查时间 -->
      <el-table-column
        label="证书检查时间"
        header-align="center"
        align="center"
        width="110"
        prop="ssl_check_time"
      >
        <template #default="scope">
          <span>{{ scope.row.update_time_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- comment -->
      <el-table-column
        label="备注"
        header-align="center"
        align="center"
        prop="comment"
      >
        <template #default="scope">
          <span>{{ scope.row.comment || '-' }}</span>
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

      <!-- <el-table-column
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
      </el-table-column> -->

      <el-table-column
        label="操作"
        width="90"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            class="mr-sm"
            :disabled="disableUpdateButton"
            @click="handleUpdateRowDomainInfo(scope.row)"
            ><el-icon><Refresh /></el-icon
          ></el-link>

          <!-- 用户可见 -->
          <template v-if="RoleEnum.User == role">
            <el-link
              :underline="false"
              type="primary"
              class="mr-sm"
              @click="handleEditRow(scope.row)"
              :disabled="!domainRow.has_edit_permission || scope.row.source == 0"
              ><el-icon><Edit /></el-icon
            ></el-link>

            <el-popconfirm
              :title="`${$t('确定删除')}？`"
              @confirm="handleDeleteClick(scope.row)"
              :disabled="!domainRow.has_edit_permission"
            >
              <template #reference>
                <el-link
                  :underline="false"
                  type="danger"
                  :disabled="!domainRow.has_edit_permission"
                  ><el-icon><Delete /></el-icon
                ></el-link>
              </template>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      :domainId="domainId"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2023-06-03
 */
import DataFormDialog from '../address-edit/DataFormDialog.vue'
import ExpireDays from '@/components/ExpireDays.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: '',

  components: {
    DataFormDialog,
    ExpireDays,
  },

  props: {
    list: {
      type: Array,
    },
    domainId: {
      type: Number,
      default: null,
    },
    domainRow: {
      type: Object,
      default: null,
    },

    disableUpdateButton: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
    },
  },

  emits: ['on-selection-change'],

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
        address_id: row.id,
      }

      const res = await this.$http.deleteAddressById(params)

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

    async handleUpdateRowDomainInfo(row) {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        address_id: row.id,
      }

      const res = await this.$http.updateAddressRowInfoById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
