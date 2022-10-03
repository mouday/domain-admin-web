<template>
  <div class="">
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="domain-list">域名管理</el-menu-item>

      <el-menu-item index="user-edit">个人设置</el-menu-item>

      <el-menu-item index="system-list">系统设置</el-menu-item>

      <div class="self-center margin-left--auto">
        <el-dropdown>
          <el-avatar :src="userInfo && userInfo.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>

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
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'Menu',

  props: {},

  components: {},

  data() {
    return {
      activeIndex: '',
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),

    async getData() {},

    handleSelect(index) {
      // console.log(index)
      // this.$router.push({
      //   name: index,
      // })
    },

    handleLogoutClick(data) {
      //   console.log(data)
      this.removeUserInfo()

      removeToken()

      this.$router.push({
        path: '/login',
      })
    },
  },

  created() {
    this.activeIndex = this.$route.name
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
