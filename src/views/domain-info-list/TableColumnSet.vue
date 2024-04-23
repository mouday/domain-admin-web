<template>
  <el-link
    :underline="false"
    type="primary"
    @click="showDialog"
    ><el-icon><Setting /></el-icon>{{ $t('表格设置') }}</el-link
  >

  <TableColumnSetDialog
    v-model:visible="visible"
    @on-success="$emit('on-success')"
  ></TableColumnSetDialog>
</template>

<script>
// created at 2023-04-04
import TableColumnSetDialog from './TableColumnSetDialog.vue'

export default {
  name: 'UpdateDomainICP',

  props: {},
  
  emits: ['on-success'],

  components: {
    TableColumnSetDialog,
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {},

  methods: {
    showDialog() {
      this.visible = true
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
