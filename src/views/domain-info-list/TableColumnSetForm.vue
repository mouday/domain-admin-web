<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="70px"
    >
      <!-- 域名 -->
      <el-form-item
        label="显示字段"
        prop="fields"
      >
        <el-checkbox-group v-model="form.fields">
          <template v-for="item in options">
            <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
/**
 * props:
 *  row
 *
 * event:
 *  on-cancel
 *  on-success
 *
 * created 2022-10-01
 * */
// 引入枚举值
import { getTableColumn, setTableColumn } from './table-column.js'

export default {
  name: '',

  props: {},
  
  emits: ['on-success', 'on-cancel'],

  components: {},

  data() {
    return {
      form: {
        fields: [],
      },

      options: [
        {
          label: '主办单位名称',
          value: 'icp_company',
        },
        {
          label: 'ICP备案',
          value: 'icp_licence',
        },
        {
          label: '更新ICP',
          value: 'update_icp',
        },
      ],
    }
  },

  computed: {},

  methods: {
    handleCancel() {
      this.$emit('on-cancel')
    },

    handleSubmit() {
      setTableColumn(this.form.fields)
      this.$emit('on-success')
    },
  },

  created() {
    this.form.fields = getTableColumn()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
