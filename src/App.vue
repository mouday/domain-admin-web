<template>
  <router-view :key="$route.fullPath"></router-view>
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
    }),
  },

  created() {
    this.updateVersion()
  },
}
</script>

<style scoped></style>
