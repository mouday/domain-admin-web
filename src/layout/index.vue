<template>
  <div class="app-layout">
    <Menu></Menu>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01
import Menu from './Menu.vue'

export default {
  name: 'index',

  props: {},

  components: {
    Menu,
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    async getData() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.app-layout {
  width: 1000px;
  margin: 0 auto;
}
</style>
