<template>
  <div class="layout-container">
    <div class="layout__menu-wrap">
      <el-menu
        :default-active="activeIndex"
        :ellipsis="false"
        class="layout__menu"
        mode="vertical"
        router
        menu-trigger="click"
        @select="handleSelect"
        :collapse="isCollapse"
      >
        <el-menu-item
          v-for="(route, index) in showRoutes"
          :index="route.name"
          :key="index"
        >
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01

import { routes } from '@/router/routes.js'
import { hasPermission } from '@/router/util.js'
import { useUserStore } from '@/store/user-store.js'
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'Menu',

  props: {},

  components: {},

  data() {
    return {
      activeIndex: '',

      // isCollapse: false,
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

    showRoutes() {
      return routes
        .filter((route) => route.name == 'index')[0]
        .children.filter((x) => {
          return hasPermission(x.meta.roles, this.userRoles)
        })
    },
  },

  methods: {
    ...mapActions(useSystemStore, {
      setIsCollapse: 'setIsCollapse',
    }),

    async getData() {},

    handleSelect(index) {
      // console.log(index)
      // this.$router.push({
      //   name: index,
      // })
    },

    handleOpen() {
      this.setIsCollapse(false)
    },

    handleClose() {
      this.setIsCollapse(true)
    },
  },

  created() {
    this.activeIndex = this.$route.name
    this.getData()
  },
}
</script>

<style lang="less">
.layout-container {
  position: relative;
  background: #f8f9fd;
  padding: 20px 20px;
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
.layout__menu-wrap {
  flex-shrink: 0;
  height: 100%;
  position: relative;
}

.layout__menu__collapse-wrap {
  position: absolute;
  top: 0;
  left: calc(100% - 15px);
  cursor: pointer;
  height: 80px;
  display: flex;
  align-items: center;
}

.layout__menu__collapse {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: 1px solid #030303;
  border-radius: 30px;
}

.layout__menu {
  background-color: #f8f9fd;
}

.layout__menu .el-menu-item {
  padding-right: 60px;
  color: #a2a4a6;
  height: 50px;
}

.layout__menu .el-menu-item:hover {
  background-color: #f8f9fd;
}

.el-menu--collapse .el-menu-item {
  padding-right: 14px;
}

.theme--dark {
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
}

// .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
//   border: 0;
//   max-width: 178px !important;
// }

.el-menu {
  border: 0;
}
</style>

<style lang="less" scoped></style>
