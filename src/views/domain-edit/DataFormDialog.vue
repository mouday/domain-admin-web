<template>
  <!-- 编辑框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="530px"
    center
    append-to-body
    :lock-scroll="false"
  >
    <DataForm
      v-if="dialogVisible"
      :row="row"
      @on-cancel="handleClose"
      @on-success="handleSuccess"
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
    DataForm,
  },

  data() {
    return {
      // currentRow: null,
      // dialogVisible: false,
    }
  },

  computed: {
    dialogTitle() {
      if (this.row) {
        return this.$t('编辑域名')
      } else {
        return this.$t('添加域名')
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
      this.dialogVisible = false
    },

    handleOpen() {
      this.dialogVisible = true
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
