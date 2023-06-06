<template>
  <div class="layout__header">

    <div class="menu__button" @click="handleMenuClick">
      <el-icon style="color: #4F5A76  ; font-size: 20px;"><Menu /></el-icon>
    </div>

    <img class="layout__header__logo" src="../assets/logo.svg" alt="" srcset="">
    <a
      class="layout__header__logo__span"
      href="#"
      >Domain Admin</a
    >

    <div class="self-center margin-left--auto flex items-center">
      <el-dropdown trigger="hover">
        <div class="avatar-group">
          <el-avatar :src="userInfo && userInfo.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>
          <span>{{username}}</span>
        </div>
        
      
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
import { useSystemStore } from '@/store/system-store.js'
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
      username: '',
    }
  },
  created() {
    this.getData()
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
      isAdmin: 'isAdmin',
    }),
    ...mapState(useSystemStore, {
      isCollapse: 'isCollapse',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),
    ...mapActions(useSystemStore, {
      setIsCollapse: 'setIsCollapse',
    }),

    async getData() {
      const res = await this.$http.getUserInfo()

      if (res.code != 0) {
        return
      }

      let data = res.data
      this.username = data.username
    },

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

    handleMenuClick() {
      this.setIsCollapse()
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

  height: 80px;
  padding: 0 20px;
  background-color: #F6F8FA;
  box-shadow: inset 0 -1px 0 0 #EDEFF1;
  font-size: 12px;
  color: #ffffff;

  .menu__button {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0 4px 30px 0 rgba(223,225,230,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .layout__header__logo {
    margin-right: 10px;
    color: #4F5A76;
  }

  .layout__header__logo__span {
    font-size: 16px;
    font-weight: bold;
    color: #4F5A76;
  }

  .avatar-group {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      font-weight: bold;
    }
  }
}


</style>

<style lang="less" scoped></style>
