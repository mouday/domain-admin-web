<template>
  <el-link
    v-if="value"
    :underline="false"
    type="success"
    @click="handleClick"
    ><el-icon><SuccessFilled /></el-icon
  ></el-link>

  <el-link
    v-else
    :underline="false"
    type="danger"
    @click="handleClick"
    ><el-icon><WarningFilled /></el-icon
  ></el-link>
</template>

<script>
// created at 2022-10-01
export default {
  name: 'ConnectStatus',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    async getData() {},

    handleClick() {
      this.$emit('on-click')
    },
  },

  created() {},
}
</script>

<style lang="less"></style>
