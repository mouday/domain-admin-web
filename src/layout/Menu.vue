<template>
  <div class="layout-container">
    <div class="layout__menu-wrap">
      <div class="layout__menu-inner">
        <el-scrollbar class="layout__menu-scrollbar">
          <el-menu
            :default-active="activeIndex"
            :ellipsis="false"
            class="layout__menu"
            mode="vertical"
            menu-trigger="click"
            unique-opened
            @select="handleSelect"
            :collapse="isCollapse"
            ref="menu"
          >
            <template v-for="route in routes">
              <template v-if="hasRoutePermission(route)">
                <!-- 仅一个子节点 -->
                <el-menu-item
                  v-if="hasOnlyOneChildren(route)"
                  :index="route.children[0].name"
                  @click="handleRouteClick(route.children[0])"
                >
                  <el-icon>
                    <component :is="route.meta.icon"></component>
                  </el-icon>
                  <span>{{ $t(route.meta.title) }}</span>
                </el-menu-item>

                <!-- 多个子节点 -->
                <el-sub-menu
                  v-else
                  :index="route.name"
                >
                  <template #title>
                    <el-icon>
                      <component :is="route.meta.icon"></component>
                    </el-icon>
                    <span>{{ $t(route.meta.title) }}</span>
                  </template>

                  <template v-for="child in route.children">
                    <template v-if="hasRoutePermission(child)">
                      <el-menu-item
                        :index="child.name"
                        @click="handleRouteClick(child)"
                        >{{ $t(child.meta.title) }}</el-menu-item
                      >
                    </template>
                  </template>
                </el-sub-menu>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>

        <!-- 收起时不显示 -->
        <SystemInfo
          class="menu-info"
          v-show="showSystemInfo"
        ></SystemInfo>
      </div>

      <!-- 展开收起 -->
      <div class="layout__menu__collapse-wrap">
        <div
          class="layout__menu__collapse"
          @click="handleToggleCollapse"
        >
          <el-link
            v-if="isCollapse"
            :underline="false"
            ><el-icon><CaretRight /></el-icon
          ></el-link>
          <el-link
            v-else
            :underline="false"
            ><el-icon><CaretLeft /></el-icon
          ></el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01

import { routes } from '@/router/routes.js'
import { hasPermission } from '@/router/permission.js'
import { useUserStore } from '@/store/user-store.js'
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'
import SystemInfo from './Info.vue'

export default {
  name: 'Menu',

  props: {},

  components: {
    SystemInfo,
  },

  data() {
    return {
      // activeIndex: '',
      routes,
      // isCollapse: false,
      showSystemInfo: false,
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
      isAdmin: 'isAdmin',
      userRoles: 'userRoles',
    }),

    ...mapState(useSystemStore, {
      isCollapse: 'isCollapse',
    }),

    activeIndex() {
      return this.$route.name
    },
  },

  methods: {
    ...mapActions(useSystemStore, {
      toggleCollapse: 'toggleCollapse',
    }),

    async getData() {},

    handleSelect(index) {
      // console.log(index)
      // this.$router.push({
      //   name: index,
      // })
    },

    handleRouteClick(route) {
      // console.log('handleRouteClick', route)
      this.$router.push({ name: route.name })
      // this.activeIndex = route.name
      // console.log(console.dir(this.$refs.menu))
    },

    hasRoutePermission(route) {
      if (route.meta && route.meta.hidden) {
        // 隐藏的都不显示
        return false
      } else if (
        route.meta &&
        route.meta.roles &&
        route.meta.roles.length > 0
      ) {
        // 有权限要求的判断权限
        return hasPermission(route.meta.roles, this.userRoles)
      } else {
        // 默认都显示
        return true
      }
    },

    hasOnlyOneChildren(route) {
      return (
        route.children.filter((child) => {
          return this.hasRoutePermission(child)
        }).length == 1
      )
    },

    handleToggleCollapse() {
      // 菜单折叠动画之前，先把无关元素隐藏
      if (this.isCollapse) {
        setTimeout(() => {
          this.showSystemInfo = true
        }, 900)
      } else {
        this.showSystemInfo = false
      }

      this.toggleCollapse()
    },
  },

  created() {
    // this.activeIndex = this.$route.name
    // console.log(this.activeIndex)
    this.showSystemInfo = !this.isCollapse
    this.getData()
  },
}
</script>

<style lang="less">
.layout__menu-wrap {
  flex-shrink: 0;
  height: 100%;
  position: relative;
  flex: 1;

  .el-menu-item {
    transition: border-color var(--el-transition-duration),
      color var(--el-transition-duration);
  }
}

.layout__menu__collapse {
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1e222d;
}

.layout__menu {
  height: 100%;
}

.menu-info {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  flex-shrink: 0;
}

// 黑色主题
.theme--dark {
  .layout-container {
    position: relative;
    background: #f8f9fd;
    padding: 20px 20px 0;

    .logo-view {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 30px;
        height: 30px;
        // margin-right: 10px;
      }
      span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .layout__menu .el-menu-item,
  .layout__menu .el-sub-menu__title {
    padding-right: 60px;
    color: #a2a4a6;
    // height: 50px;
  }

  .layout__menu .el-menu-item:hover,
  .layout__menu .el-sub-menu__title {
    background-color: #f8f9fd;
  }

  .layout__menu .el-menu-item.is-active {
    // padding-left: 10px;
    // padding-right: 10px;
    // width: 40px;
    // padding: 0;
    background-color: #030303;
    color: #ffffff;
    border: 1px solid #030303;
    border-radius: 50px;
  }

  .layout__menu__collapse {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: red;
    border: 1px solid #030303;
    border-radius: 30px;
  }

  .layout__menu {
    background-color: #f8f9fd;
  }

  .el-menu .el-menu {
    background-color: #f8f9fd;
  }

  .el-menu--collapse .el-menu-item {
    padding-right: 14px;
  }

  .layout__menu__collapse-wrap {
    display: none;
  }
}

// 蓝色主题
.theme--blue {
  .layout__menu__collapse-wrap {
    position: absolute;
    top: 0;
    left: 100%;
    height: 50px;
    // background-color: red;
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .layout__menu__collapse {
    height: 30px;
    background-color: #ffffff;
  }

  .layout__menu {
    background-color: #1e222d;
  }

  .layout__menu .el-menu-item,
  .layout__menu .el-sub-menu__title {
    background-color: #1e222d;
    color: #c1c6c8;
  }

  .layout__menu .el-menu-item:hover,
  .layout__menu .el-sub-menu__title:hover {
    background-color: #262f3e;
  }

  .layout__menu .el-menu-item.is-active,
  .layout__menu .el-sub-menu__title.is-active {
    background-color: #006eff;
    color: #ffffff;
  }

  .layout__menu .el-sub-menu .el-menu-item {
  }
}

// .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
//   border: 0;
//   max-width: 178px !important;
// }

.el-menu {
  border: 0;
}

.layout__menu-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout__menu-scrollbar {
  flex: 1;
}
</style>

<style lang="less" scoped></style>
