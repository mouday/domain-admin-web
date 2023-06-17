<template>
  <router-view></router-view>
</template>

<script>
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'app',

  props: {},

  components: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    ...mapActions(useSystemStore, {
      updateVersion: 'updateVersion',
      setIsCollapse: 'setIsCollapse',
    }),
  },

  created() {
    let isCollapse = localStorage.getItem('isCollapse')
    this.setIsCollapse(isCollapse == 'true')

    this.updateVersion()
  },
}
</script>

<style scoped></style>
