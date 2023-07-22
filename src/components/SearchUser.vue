<template>
  <el-autocomplete
    v-model="keyword_"
    :fetch-suggestions="querySearchAsync"
    placeholder="搜索用户名"
    :debounce="500"
    clearable
    @select="handleSelectUser"
  />
</template>

<script>
// created at 2023-07-22
export default {
  name: 'SearchUser',

  props: {
    keyword: {
      type: String,
      default: '',
    },
  },

  emits: ['on-select', 'update:keyword'],

  components: {},

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    keyword_: {
      get() {
        return this.keyword
      },
      set(val) {
        this.$emit('update:keyword', val)
      },
    },
  },

  methods: {
    async getData() {},

    async querySearchAsync(queryString, cb) {
      const list = await this.searchUser()
      cb(list)
    },

    async searchUser() {
      this.loading = true

      let params = {
        keyword: this.keyword,
      }

      let list = []

      try {
        const res = await this.$http.getUserList(params)

        if (res.ok) {
          list = res.data.list.map((item) => {
            item.value = item.username
            return item
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }

      return list
    },

    handleSelectUser(data) {
      this.$emit('on-select', data)
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
