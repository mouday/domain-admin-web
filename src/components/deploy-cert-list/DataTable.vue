<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
      @selection-change="$emit('on-selection-change', $event)"
    >
      <!-- <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="40"
      />

      <!-- 服务器地址 -->
      <el-table-column
        label="服务器地址"
        header-align="center"
        align="center"
        width="140"
        prop="deploy_host_id"
      >
        <template #default="scope">
          <span>{{ scope.row.deploy_host?.host || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 私钥部署路径 -->
      <el-table-column
        label="私钥部署路径"
        header-align="center"
        align="center"
        prop="deploy_key_file"
      >
        <template #default="scope">
          <span>{{ scope.row.deploy_key_file || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 公钥部署路径 -->
      <el-table-column
        label="公钥部署路径"
        header-align="center"
        align="center"
        prop="deploy_fullchain_file"
      >
        <template #default="scope">
          <span>{{ scope.row.deploy_fullchain_file || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 重启命令 -->
      <el-table-column
        label="重启命令"
        header-align="center"
        align="center"
        prop="deploy_reloadcmd"
      >
        <template #default="scope">
          <span>{{ scope.row.deploy_reloadcmd || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        label="状态"
        header-align="center"
        align="center"
        width="80"
      >
        <template #default="scope">
          <el-tooltip
            effect="dark"
            placement="top"
            :content="scope.row.deploy_status_label"
          >
            <ConnectStatus :value="scope.row.deploy_status"></ConnectStatus>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-popconfirm
            :title="`${$t('确定部署')}？`"
            @confirm="handleDeployRow(scope.row)"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="primary"
                class="mr-sm"
                ><el-icon><Position /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>

          <el-link
            :underline="false"
            type="primary"
            class="mr-sm"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon
          ></el-link>

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
      :certId="certId"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2024-03-31
 */
import DataFormDialog from '../deploy-cert-edit/DataFormDialog.vue'
import ConnectStatus from '@/components/ConnectStatus.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
    ConnectStatus,
  },

  props: {
    list: {
      type: Array,
    },

    certId: { type: Number, default: null },
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
        deploy_cert_id: row.deploy_cert_id,
      }

      const res = await this.$http.deleteByDeployCertId(params)

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

    handleDeployRow(row) {
      this.$emit('on-deploy', row)
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
