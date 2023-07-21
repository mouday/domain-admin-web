<template>
  <!-- 编辑框 -->
  <el-dialog
    title="表格设置"
    v-model="dialogVisible"
    width="500px"
    center
    append-to-body
    :lock-scroll="false"
  >
    <TableColumnSetForm
      v-if="dialogVisible"
      :row="row"
      @on-cancel="handleClose"
      @on-success="handleSuccess"
    ></TableColumnSetForm>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-01
 */
import TableColumnSetForm from './TableColumnSetForm.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: {
      type: Object,
      default: null,
    },

    // 显示
    visible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:visible'],

  components: {
    TableColumnSetForm,
  },

  data() {
    return {}
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },

      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },

  methods: {
    handleClose() {
      // console.log('handleClose');
      // this.dialogVisible = false
      this.$emit('update:visible', false)
    },

    handleOpen() {
      // this.dialogVisible = true
      this.$emit('update:visible', true)
    },

    handleSuccess() {
      this.handleClose()
      this.$emit('on-success')
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
