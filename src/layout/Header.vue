<template>
  <div class="layout__header">
    <div
      class="menu__button"
      @click="handleMenuClick"
    >
      <el-icon style="color: #4f5a76; font-size: 20px"><Menu /></el-icon>
    </div>

    <a
      class="layout__header__logo__span"
      href="#"
    >
      <img
        class="layout__header__logo"
        src="../assets/logo.svg"
        alt=""
        srcset=""
      />
      <span>Domain Admin</span>
    </a>

    <div class="self-center margin-left--auto flex items-center">
      <el-radio-group
        v-model="theme"
        size="small"
        @change="handleThemeChange"
      >
        <el-radio-button
          v-for="item in themeList"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>

      <el-dropdown trigger="hover">
        <div class="avatar-group ml-sm">
          <el-avatar :src="userInfo && userInfo.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>
          <span>{{ username }}</span>
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
    let themeList = [
      {
        value: 'theme--blue',
        label: '经典',
      },
      {
        value: 'theme--dark',
        label: '极客',
      },
    ]
    return {
      dialogVisible: false,
      aboutDialogVisible: false,
      userDialogVisible: false,

      // 主题
      themeList,
      theme: themeList[0].value,
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

    username() {
      if (this.userInfo) {
        return this.userInfo.username
      } else {
        return ''
      }
    },
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),

    ...mapActions(useSystemStore, {
      toggleCollapse: 'toggleCollapse',
    }),

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
      this.toggleCollapse()
    },

    handleThemeChange(val) {
      console.log(val)

      localStorage.setItem('theme', val)

      for (let item of this.themeList) {
        document.querySelector('body').classList.remove(item.value)
      }

      document.querySelector('body').classList.add(val)
    },
  },

  created() {
    // 初始化风格
    this.theme = localStorage.getItem('theme') || this.theme
    this.handleThemeChange(this.theme)
  },
}
</script>

<style lang="less">
.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.layout__header__logo__span {
  font-size: 16px;
  font-weight: bold;

  display: flex;
  align-items: center;
}

.layout__header__logo {
  margin-right: 10px;
}

.avatar-group {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-weight: bold;
  }
}

// 黑色主题
.theme--dark {
  .layout__header {
    height: 80px;
    background-color: #f6f8fa;
    box-shadow: inset 0 -1px 0 0 #edeff1;
    font-size: 12px;
    color: #ffffff;

    .layout__header__logo__span {
      color: #4f5a76;
    }

    .layout__header__logo {
      color: #4f5a76;
    }

    .menu__button {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 50%;
      box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}

// 蓝色主题
.theme--blue {
  .layout__header {
    height: 50px;
    background-color: #262f3e;
    box-shadow: inset 0 -1px 0 0 #344258;
  }

  .layout__header__logo__span {
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }

  .layout__header__logo {
    color: #ffffff;
    display: none;
  }

  .menu__button {
    display: none;
  }

  .avatar-group {
    color: #ffffff;
  }
}
</style>

<style lang="less" scoped></style>
