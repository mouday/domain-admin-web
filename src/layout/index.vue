<template>
  <div class="app-layout">
    <Header></Header>

    <div class="app-layout__main">
      <Menu></Menu>

      <div class="app-layout__body">
        <!-- <div class="app-layout__path">{{ currentPathName }}</div> -->
        <div class="app-layout__view">
          <transition
            name="fade-transform"
            mode="out-in"
          >
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// created at 2022-10-01
import Menu from './Menu.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'

export default {
  name: 'index',

  props: {},

  components: {
    Menu,
    Footer,
    Header,
  },

  data() {
    return {}
  },

  computed: {
    currentPathName() {
      console.log(this.$route)
      return this.$route.meta.title
    },
  },

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
  // width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.app-layout__main {
  display: flex;
  flex: 1;
  height: 0;
}

.app-layout__body {
  flex: 1;
  background-color: #F6F8FA;
  height: 100%;
  overflow: auto;
  overflow-y: overlay;
  padding: 10px 20px 20px;
}

.app-layout__path {
  color: #333;
  font-size: 12px;
}

.app-layout__view {
  padding-top: 10px;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
