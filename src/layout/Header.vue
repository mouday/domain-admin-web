<template>
  <div class="layout__header">
    <a
      class="layout__header__logo"
      href="#"
      >Domain Admin</a
    >

    <div class="self-center margin-left--auto flex items-center">
      <el-dropdown trigger="hover">
        <el-avatar :src="userInfo && userInfo.avatar_url">
          <img src="https://api.multiavatar.com/domain-admin.png" />
        </el-avatar>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="handleUserInfoEditOpen"
              class="justify-center"
              >个人设置</el-dropdown-item
            >

            <el-dropdown-item
              @click="handleUpdatePasswordClick"
              class="justify-center"
              >修改密码</el-dropdown-item
            >

            <el-dropdown-item
              @click="handleAboutClick"
              class="justify-center"
              >关于</el-dropdown-item
            >

            <el-dropdown-item
              @click="handleLogoutClick"
              class="justify-center"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 修改密码 -->
    <UserPaswordEditDataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleUserPaswordEditSuccess"
      @on-cancel="handleUserPaswordEditClose"
    ></UserPaswordEditDataFormDailog>

    <!-- 修改个人设置 -->
    <UserDataFormDailig
      v-model:visible="userDialogVisible"
      @on-success="handleUserInfoEditClose"
      @on-cancel="handleUserInfoEditClose"
    ></UserDataFormDailig>

    <!-- 关于 -->
    <AboutDataFormDailig
      v-model:visible="aboutDialogVisible"
    ></AboutDataFormDailig>
  </div>
</template>

<script>
// created at 2023-06-04
import UserPaswordEditDataFormDailog from '@/views/user-pasword-edit/DataFormDailog.vue'
import AboutDataFormDailig from '@/views/about/DataFormDailig.vue'
import UserDataFormDailig from '@/views/user-edit/DataFormDailig.vue'
import { removeToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'Header',

  props: {},

  components: {
    UserPaswordEditDataFormDailog,
    AboutDataFormDailig,
    UserDataFormDailig,
  },

  data() {
    return {
      dialogVisible: false,
      aboutDialogVisible: false,
      userDialogVisible: false,
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
      isAdmin: 'isAdmin',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),

    async getData() {},

    handleLogoutClick(data) {
      //   console.log(data)
      this.removeUserInfo()

      removeToken()

      this.$router.push({
        path: '/login',
      })
    },

    handleUpdatePasswordClick() {
      this.dialogVisible = true
    },

    handleUserPaswordEditClose() {
      this.dialogVisible = false
    },

    handleUserPaswordEditSuccess() {
      this.dialogVisible = false
    },

    handleUserInfoEditOpen() {
      this.userDialogVisible = true
    },

    handleUserInfoEditClose() {
      this.userDialogVisible = false
    },

    handleAboutClick() {
      this.aboutDialogVisible = true
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  padding: 0 20px;
  background-color: #262f3e;
  box-shadow: inset 0 -1px 0 0 #344258;
  font-size: 12px;
  color: #ffffff;
}

.layout__header__logo {
  font-size: 16px;
  font-weight: bold;
}
</style>

<style lang="less" scoped></style>
