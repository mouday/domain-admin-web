<template>
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
        v-for="route in showRoutes"
        :index="route.name"
      >
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </el-menu>

    <!-- 展开收起 -->
    <div class="layout__menu__collapse-wrap">
      <div class="layout__menu__collapse">
        <el-link
          v-if="isCollapse"
          :underline="false"
          @click="handleOpen"
          ><el-icon><CaretRight /></el-icon
        ></el-link>
        <el-link
          v-else
          :underline="false"
          @click="handleClose"
          ><el-icon><CaretLeft /></el-icon
        ></el-link>
      </div>
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
.layout__menu-wrap {
  flex-shrink: 0;
  height: 100%;
  position: relative;
}

.layout__menu__collapse-wrap {
  position: absolute;
  top: 0;
  left: 100%;
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
}

.layout__menu__collapse {
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}

.layout__menu {
  height: 100%;
  background-color: #1e222d;
}

.layout__menu .el-menu-item {
  // background-color: #1e222d;
  color: #c1c6c8;
  height: 50px;
}

.layout__menu .el-menu-item:hover {
  background-color: #262f3e;
}

.layout__menu .el-menu-item.is-active {
  background-color: #006eff;
  color: #ffffff;
}
</style>

<style lang="less" scoped></style>
