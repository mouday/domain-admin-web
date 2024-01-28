<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
      @sort-change="$emit('on-sort-change', $event)"
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

      <!-- 事件类型 -->
      <el-table-column
        :label="$t('事件类型')"
        header-align="center"
        align="left"
        width="150"
        prop="event_id"
        sortable="custom"
      >
        <template #default="scope">
          <span>{{ scope.row.event_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 通知方式 -->
      <el-table-column
        :label="$t('通知方式')"
        header-align="center"
        align="left"
        width="150"
        prop="type_id"
        sortable="custom"
      >
        <template #default="scope">
          <span>{{ scope.row.type_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 剩余天数 -->
      <el-table-column
        :label="$t('剩余天数')"
        header-align="center"
        align="center"
        width="90"
        prop="expire_days"
        sortable="custom"
      >
        <template #default="scope">
          <span>{{ scope.row.expire_days || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 分组 -->
      <el-table-column
        :label="$t('触发分组')"
        header-align="center"
        align="center"
        width="90"
        prop="groups"
      >
        <template #default="scope">
          <template
            v-if="scope.row.group_list && scope.row.group_list.length > 0"
          >
            <div v-for="item in scope.row.group_list"> {{ item.name }}</div>
          </template>
          <span v-else>全部</span>
        </template>
      </el-table-column>

      <!-- 通知配置 -->
      <!-- <el-table-column
        label="通知配置"
        header-align="center"
        align="left"
        prop="value"
      >
        <template #default="scope">-->
      <!-- 邮件方式 -->
      <!-- <template v-if="NotifyTypeEnum.Email">
            <template
              v-if="
                scope.row.value &&
                scope.row.value.email_list &&
                scope.row.value.email_list.length > 0
              "
            >
              <template v-for="item in scope.row.value.email_list">
                <div>{{ item }}</div>
              </template>
            </template>

            <span v-else>-</span>
          </template>
          <span v-else>-</span>
        </template> -->
      <!-- </el-table-column>  -->

      <!-- 备注 -->
      <el-table-column
        :label="$t('备注')"
        header-align="center"
        align="left"
        prop="comment"
      >
        <template #default="scope">
          <span>{{ scope.row.comment || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('启用')"
        header-align="center"
        align="center"
        width="90"
        prop="status"
        sortable="custom"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          />
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('测试')"
        header-align="center"
        align="center"
        width="80"
      >
        <template #header>
          <el-tooltip
            effect="dark"
            content="如果收不到消息，可尝试增加：剩余天数"
            placement="top-start"
            :show-after="800"
          >
            <div class="inline-flex items-center">
              <span class="mr-[2px]">{{ $t('测试') }}</span>
              <el-icon><Warning /></el-icon>
            </div>
          </el-tooltip>
        </template>

        <template #default="scope">
          <el-popconfirm
            title="确定发送？"
            @confirm="handleTestRow(scope.row)"
            :disabled="scope.row.disable_test"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="primary"
                :disabled="scope.row.disable_test"
                ><el-icon><Position /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('编辑')"
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
        :label="$t('删除')"
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
 * created 2023-06-20
 */
import DataFormDialog from '../notify-edit/DataFormDialog.vue'

import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'
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

  emits: ['on-sort-change'],

  computed: {},

  data() {
    return {
      currentRow: null,
      dialogVisible: false,
      NotifyTypeEnum,
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        notify_id: row.id,
      }

      const res = await this.$http.deleteNotifyById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleStatusChange(row, val) {
      let params = {
        notify_id: row.id,
        status: val,
      }

      const res = await this.$http.updateNotifyStatusById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },

    async handleTestRow(row) {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        notify_id: row.id,
      }

      const res = await this.$http.handleTestNotifyById(params)

      if (res.code == 0) {
        // this.$msg.success('操作成功')
        let msg = res.data
        try {
          msg = JSON.parse(msg)
        } catch (e) {}

        this.$msg.success(msg || '操作成功')

        // this.$emit('on-success')
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
