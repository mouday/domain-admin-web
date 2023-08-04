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

      <!-- 用户名 -->
      <el-table-column
        :label="$t('用户名')"
        header-align="center"
        align="center"
        prop="username"
      >
        <template #default="scope">
          <span>{{ scope.row.username || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 头像 -->
      <!-- <el-table-column
        label="头像"
        header-align="center"
        align="center"
        prop="avatar_url"
        width="70"
      >
        <template #default="scope">
          <el-avatar :src="scope.row.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>
        </template>
      </el-table-column> -->

      <!-- 过期前多少天提醒 -->
      <!-- <el-table-column
        label="过期前多少天提醒"
        header-align="center"
        align="center"
        prop="before_expire_days"
      >
        <template #default="scope">
          <span>{{ scope.row.before_expire_days || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 证书数量 -->
      <el-table-column
        :label="$t('证书数量')"
        header-align="center"
        align="center"
        prop="cert_count"
        width="100"
      >
        <template #default="scope">
          <span>{{ scope.row.cert_count || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 域名数量 -->
      <el-table-column
        :label="$t('域名数量')"
        header-align="center"
        align="center"
        prop="notify_count"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.domain_count || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 分组数量 -->
      <el-table-column
        :label="$t('分组数量')"
        header-align="center"
        align="center"
        prop="group_count"
        width="110"
      >
        <template #default="scope">
          <span>{{ scope.row.group_count || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 通知渠道 -->
      <el-table-column
        :label="$t('通知渠道')"
        header-align="center"
        align="center"
        prop="notify_count"
        width="100"
      >
        <template #default="scope">
          <span>{{ scope.row.notify_count || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 邮件列表 -->
      <!-- <el-table-column
        label="邮件列表"
        header-align="center"
        align="center"
        prop="email_list"
      >
        <template #default="scope">
          <template
            v-if="scope.row.email_list && scope.row.email_list.length > 0"
          >
            <div v-for="item in scope.row.email_list">{{ item }}</div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column> -->

      <!-- 操作 -->
      <el-table-column
        :label="$t('启用')"
        header-align="center"
        align="center"
        width="80"
      >
        <template #default="scope">
          <el-switch
            :disabled="scope.row.username == 'admin'"
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          />
        </template>
      </el-table-column>

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
        :label="$t('重置密码')"
        width="150"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定重置密码？"
            @confirm="handleResetUserPasswordUser(scope.row)"
            :disabled="scope.row.username == 'admin'"
          >
            <template #reference>
              <el-link
                :disabled="scope.row.username == 'admin'"
                :underline="false"
                type="primary"
                ><el-icon><Refresh /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('删除')"
        width="60"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
          :title="`${$t('确定删除')}？`"
            @confirm="handleDeleteClick(scope.row)"
            :disabled="scope.row.username == 'admin'"
          >
            <template #reference>
              <el-link
                :disabled="scope.row.username == 'admin'"
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
    <DataFormDailog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailog>
  </div>
</template>

<script>
/**
 * created 2022-10-03
 */
import DataFormDailog from '../user-admin-edit/DataFormDailog.vue'
import copy from 'copy-to-clipboard'

export default {
  name: '',

  components: {
    DataFormDailog,
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
        user_id: row.id,
      }

      const res = await this.$http.deleteUser(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      }
    },

    async handleResetUserPasswordUser(row) {
      let params = {
        user_id: row.id,
      }

      const res = await this.$http.resetUserPasswordUser(params)

      if (res.ok) {
        // this.$msg.success('操作成功')
        // this.$emit('on-success')

        this.$alert(`新密码：${res.data.password}`, '密码重置成功', {
          center: true,
          autofocus: false,
          confirmButtonText: '复制',
          type: 'success',
        })
          .then(() => {
            copy(res.data.password)
            this.$msg.success('已复制到剪切板')
          })
          .catch(() => {})
      }
    },

    async handleStatusChange(row, value) {
      let params = {
        user_id: row.id,
        status: value,
      }

      const res = await this.$http.updateUserStatus(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
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
