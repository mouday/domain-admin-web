<template>
  <div class="">
    <el-form
      ref="formRef"
      :model="from"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="导出格式"
        prop="ext"
      >
        <el-radio-group v-model="from.ext">
          <template v-for="item in options">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// created at 2023-11-30
export default {
  name: 'ExportFile',

  props: {},

  emits: ['on-cancel', 'on-confirm'],

  components: {},

  data() {
    return {
      from: {
        ext: 'xlsx',
      },

      options: [
        {
          label: 'xlsx',
          value: 'xlsx',
        },
        {
          label: 'csv',
          value: 'csv',
        },
        {
          label: 'txt',
          value: 'txt',
        },
      ],
    }
  },

  computed: {},

  methods: {
    async getData() {},

    handleCancel() {
      this.$emit('on-cancel')
    },
    submitForm() {
      this.$emit('on-confirm', this.from)
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
