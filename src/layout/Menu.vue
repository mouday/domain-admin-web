<template>
  <div class="">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="domain-list">域名管理</el-menu-item>

      <div class="self-center ml-auto">
        <el-dropdown>
          <el-avatar
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogoutClick"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
// created at 2022-10-01

import { removeToken } from '@/utils/token-util.js'

export default {
  name: 'Menu',

  props: {},

  components: {},

  data() {
    return {
      activeIndex: 'domain-list',
    }
  },

  computed: {},

  methods: {
    async getData() {},
    handleSelect() {},

    handleLogoutClick(data) {
    //   console.log(data)
      removeToken()

      this.$router.push({
        path: '/login',
      })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
