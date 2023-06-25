<template>
  <div class="app-container">
    <div class="flex"></div>

    <DataForm
      class="mt-md"
      @on-success="handleSuccess"
    ></DataForm>
  </div>
</template>

<script>
/**
 * created 2022-10-03
 */
import DataForm from './DataForm.vue'
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'user-edit',

  props: {},

  components: {
    DataForm,
  },

  data() {
    return {
      id: null,
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
    }),

    handleSuccess() {
      this.updateUserInfo()
    },
  },

  created() {
    this.id = this.$route.query.id
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
