<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="60px"
    >
      <!-- 名称 -->

      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          type="text"
          v-model="form.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <!-- 创建时间 -->

      <!-- <el-form-item
        label="创建时间"
        prop="create_time"
      >
        <el-input
          type="text"
          v-model="form.create_time"
          placeholder="请输入创建时间"
        ></el-input>
      </el-form-item> -->
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
/**
 * props:
 *  row
 *
 * event:
 *  on-cancel
 *  on-success
 *
 * created 2023-04-04
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // 名称
        name: '',
        // 创建时间
        // create_time: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.getGroupById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 名称
        this.form.name = data.name
        // 创建时间
        // this.form.create_time = data.create_time
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 名称
        name: this.form.name,
        // 创建时间
        // create_time: this.form.create_time,
      }

      let res = null

      // 编辑
      if (this.row) {
        params['id'] = this.row.id
        res = await this.$http.updateGroupById(params)
      } else {
        res = await this.$http.addGroup(params)
      }

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
