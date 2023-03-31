<template>
  <!-- 编辑框 -->
  <el-dialog
    title="模板参数"
    v-model="dialogVisible"
    width="600px"
    center
    append-to-body
    :lock-scroll="false"
  >
    <DataForm
      v-if="dialogVisible"
      @on-cancel="handleClose"
      @on-confirm="handleClose"
    ></DataForm>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-01
 */
import DataForm from './DataForm.vue'

export default {
  name: '',

  props: {
    // 显示
    visible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:visible'],

  components: {
    DataForm,
  },

  data() {
    return {}
  },

  computed: {
    dialogTitle() {
      if (this.row) {
        return '编辑'
      } else {
        return '添加'
      }
    },

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
