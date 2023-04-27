<template>
  <!-- 编辑框 -->
  <el-dialog
    title="域名设置"
    v-model="dialogVisible"
    width="380px"
    center
    append-to-body
    :lock-scroll="false"
  >
    <DomainSettingForm
      v-if="dialogVisible"
      :row="row"
      @on-cancel="handleClose"
      @on-success="handleSuccess"
    ></DomainSettingForm>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-01
 */
import DomainSettingForm from './DomainSettingForm.vue'

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
    DomainSettingForm,
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
