<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <template v-for="route in matchedRoutes">
      <el-breadcrumb-item>{{ $t(route.meta.title) }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
// created at 2023-07-15
export default {
  name: 'Breadcrumb',

  props: {},

  components: {},

  data() {
    return {}
  },

  computed: {
    matchedRoutes() {
      return this.$route.matched
    },
  },

  methods: {
    async getData() {},
  },

  created() {
    console.log(this.$route)
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
