<template>
  <div class="flex flex-1 items-center">
    <el-autocomplete
      v-model="keyword"
      style="width: 180px"
      :fetch-suggestions="handleSearch"
      clearable
      :placeholder="$t('搜索DNS账号')"
      @select="handleSelect"
    />

    <el-link
      class="ml-sm"
      :underline="false"
      type="primary"
      @click="handleAddClick"
      ><el-icon><Plus /></el-icon><span>{{ $t('添加') }}</span>
    </el-link>

    <!-- 编辑框 -->
    <el-dialog
      title="DNS账号"
      v-model="visible"
      width="400px"
      center
      top="20px"
      append-to-body
      @close="handleDialogClose"
    >
      <DataForm
        v-if="visible"
        @on-cancel="handleClose"
        @on-success="handleSuccess"
      ></DataForm>
    </el-dialog>
  </div>
</template>

<script>
// created at 2023-07-29
import DataForm from '@/views/dns-edit/DataForm.vue'
import { DNSTypeOptions } from '@/emuns/dns-type-enums.js'

export default {
  name: 'RemoteHost',

  props: {
    defaultKeyword: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Object,
      default: null,
    },
  },

  // 'on-confirm',
  emits: ['update:modelValue'],

  components: {
    DataForm,
  },

  data() {
    return {
      visible: false,

      keyword: '',
      list: [],
      editValue: null,

      // row: {
      //   id: null,
      //   host: '',
      //   password: '',
      //   user: '',
      // },
    }
  },

  computed: {
    disabled() {
      return !(this.modelValue && this.modelValue.id)
    },

    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },

  methods: {
    async getData() {
      if (this.defaultKeyword) {
        this.keyword = this.defaultKeyword
      }
    },

    handleClose() {
      this.value = null
      this.visible = false
    },

    handleAddClick() {
      //   this.editValue = {
      //     host: this.keyword,
      //   }
      this.visible = true
    },

    handleEditHost() {
      this.editValue = this.value
      this.visible = true
    },

    async handleSearch(queryString, cb) {
      let params = {
        // 域名列表
        keyword: queryString,
      }

      const res = await this.$http.getDnsList(params)

      if (res.ok) {
        cb(
          res.data.list.map((item) => {
            let dns_type_label = DNSTypeOptions.find(
              (o) => o.value == item.dns_type_id
            )?.label

            item.value = `${item.name}(${dns_type_label})`
            return item
          })
        )
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleSelect(data) {
      console.log(data)
      this.value = data
      this.$emit('on-change', data)
    },

    // handleDeployVerifyFile() {
    //   this.$emit('on-confirm', this.value)
    // },

    handleSuccess(data) {
      let dns_type_label = DNSTypeOptions.find(
        (o) => o.value == data.dns_type_id
      )?.label

      data.value = `${data.name}(${dns_type_label})`

      this.value = data
      this.$emit('on-change', data)
      this.handleClose()
    },

    handleDialogClose() {
      this.visible = false
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
