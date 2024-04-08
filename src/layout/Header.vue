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

    <div class="header-breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="self-center margin-left--auto flex items-center">
      <!-- <a
        href="https://www.chatpet.top/"
        class="ad-wrap mr-md"
        target="_blank"
      >
        <img
          src="@/assets/chatpet.jpg"
          alt=""
          class="ad-img ad-img--blue"
        />
        <img
          src="@/assets/chatpet-white.jpg"
          alt=""
          class="ad-img ad-img--white"
        />
      </a> -->

      <div
        @click="handleAddCert"
        class="header-tool-btn mr-md header-tool-btn--link"
      >
        <el-icon><Link /></el-icon>
        <span class="header-tool-btn__text">{{ $t('证书申请') }}</span>
      </div>

      <div class="header-tool-btn mr-md header-tool-btn--doc">
        <el-icon><Link /></el-icon>
        <a
          class="header-tool-btn__text"
          href="https://domain-admin.readthedocs.io/zh_CN/latest/index.html"
          target="_blank"
          >{{ $t('使用文档') }}</a
        >
      </div>

      <el-dropdown trigger="hover">
        <div class="header-tool-btn">
          <el-icon><Suitcase /></el-icon>
          <span class="header-tool-btn__text">{{ $t('工具箱') }}</span>
          <el-icon><arrow-down /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="item in toolList">
              <!-- 外链 -->
              <el-dropdown-item
                v-if="item.type == 'url'"
                @click="handleToolItemClick(item)"
                class="justify-center"
                >{{ $t(item.label) }}<el-icon><Link /></el-icon
              ></el-dropdown-item>

              <!-- 路由 -->
              <el-dropdown-item
                v-else
                @click="handleToolItemClick(item)"
                class="justify-center"
                >{{ $t(item.label) }}</el-dropdown-item
              >
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!--  语言 -->
      <el-dropdown trigger="hover">
        <div class="header-tool-btn ml-md">
          <el-icon><Location /></el-icon>
          <span class="header-tool-btn__text">{{ $t('语言') }}</span>
          <el-icon><arrow-down /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="item in languageOptions">
              <el-dropdown-item
                @click="handleLanguageItemClick(item)"
                class="justify-center"
                >{{ item.label }}</el-dropdown-item
              >
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-radio-group
        v-model="theme"
        size="small"
        class="ml-md"
        @change="handleThemeChange"
      >
        <el-radio-button
          v-for="item in themeList"
          :key="item.value"
          :label="item.value"
          >{{ $t(item.label) }}</el-radio-button
        >
      </el-radio-group>

      <el-dropdown trigger="hover">
        <div class="avatar-group ml-sm">
          <el-avatar :src="avatar"></el-avatar>
          <span>{{ username }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item
              @click="handleUserInfoEditOpen"
              class="justify-center"
              >个人设置</el-dropdown-item
            > -->

            <el-dropdown-item
              @click="handleUpdatePasswordClick"
              class="justify-center"
              >{{ $t('修改密码') }}</el-dropdown-item
            >

            <el-dropdown-item
              @click="handleAboutClick"
              class="justify-center"
              >{{ $t('关于') }}</el-dropdown-item
            >

            <el-dropdown-item
              @click="handleLogoutClick"
              class="justify-center"
              >{{ $t('退出') }}</el-dropdown-item
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
import avatar from '@/assets/user-avatar.gif'
import Breadcrumb from './Breadcrumb.vue'
import { languageOptions } from '@/i18n/index.js'

export default {
  name: 'Header',

  props: {},

  components: {
    UserPaswordEditDataFormDailog,
    AboutDataFormDailig,
    UserDataFormDailig,
    Breadcrumb,
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

    const toolList = [
      // {
      //   type: 'router', // 路由
      //   label: 'SSL证书申请',
      //   value: 'issue-certificate-list',
      // },

      // {
      //   type: 'router', // 路由
      //   label: '证书托管',
      //   value: 'certificate-list',
      // },
      {
        type: 'router', // 路由
        label: 'WHOIS查询',
        value: 'lab',
      },
      {
        type: 'router', // 路由
        label: '子域名证书查询',
        value: 'domain-cert-list',
      },

      {
        type: 'router', // 路由
        label: '证书信息查询',
        value: 'cert-info',
      },

      {
        type: 'router', // 路由
        label: 'ICP备案查询',
        value: 'icp-info',
      },

      {
        type: 'url', // 外链
        label: 'SSL配置生成',
        value: 'https://ssl-config.mozilla.org/',
      },

      // {
      //   type: 'url', // 外链
      //   label: '免费SSL证书',
      //   value: 'https://yundun.console.aliyun.com/?p=cas#/certExtend/free',
      // },

      // {
      //   type: 'url', // 外链
      //   label: '域名注册',
      //   value: 'https://wanwang.aliyun.com/',
      // },

      {
        type: 'url', // 外链
        label: 'HTTPS网站检测',
        value: 'https://myssl.com/',
      },
    ]

    return {
      languageOptions,
      toolList,

      dialogVisible: false,
      aboutDialogVisible: false,
      userDialogVisible: false,

      // 主题
      themeList,
      theme: themeList[0].value,
      avatar,
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
      // console.log(val)

      localStorage.setItem('theme', val)

      for (let item of this.themeList) {
        document.querySelector('body').classList.remove(item.value)
      }

      document.querySelector('body').classList.add(val)
    },

    handleWhoisClick() {
      this.$router.push({
        name: 'lab',
      })
    },

    handleCertClick() {
      this.$router.push({
        name: 'domain-cert-list',
      })
    },

    handleSSLConfigClick() {
      window.open('https://ssl-config.mozilla.org/', '_blank')
    },

    handleWanwangClick() {
      window.open('https://wanwang.aliyun.com/', '_blank')
    },

    handleSSLCertClick() {
      window.open(
        'https://yundun.console.aliyun.com/?p=cas#/certExtend/free',
        '_blank'
      )
    },

    handleToolItemClick(item) {
      if (item.type == 'url') {
        window.open(item.value, '_blank')
      } else {
        this.$router.push({
          name: item.value,
        })
      }
    },

    handleLanguageItemClick(item) {
      console.log(item)
      localStorage.setItem('language', item.value)
      location.reload()
    },

    handleAddCert() {
      this.$router.push({
        path: '/cert/issue-certificate-list',
      })
      // const route = this.$router.resolve({
      //   path: '/cert/issue-certificate-list',
      // })

      // window.open(route.href, '_blank')
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

.header-tool-btn {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.header-tool-btn__text {
  padding: 0 4px;
}

.header-tool-btn--link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.ad-img {
  height: 100%;
}

// 面包屑
.header-breadcrumb {
  margin-left: 20px;

  .el-breadcrumb__inner.is-link {
    color: #c1c6c8;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item .el-breadcrumb__inner {
    color: #c1c6c8;
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

  .ad-wrap {
    height: 34px;
  }
  .ad-img--white {
    display: block;
  }

  .ad-img--blue {
    display: none;
  }

  .header-tool-btn--doc {
    color: #4f5a76;
  }

  .header-tool-btn--link {
    color: #4f5a76;
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

  .header-tool-btn {
    color: #ffffff;
  }

  .ad-wrap {
    height: 24px;
  }
  .ad-img--white {
    display: none;
  }

  .ad-img--blue {
    display: block;
  }

  .header-tool-btn--link {
    color: #ffffff;
  }
}
</style>

<style lang="less" scoped></style>
