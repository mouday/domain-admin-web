<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      {% for item in table.columns %}
      <!-- {{item.comment or item.name}} -->
      {% if item.type == 'date' %}
      {# 日期 #}
      <el-form-item
        label="{{item.comment or item.name}}"
        prop="{{item.name}}"
      >
        <el-date-picker
          v-model="form.{{item.name}}"
          type="date"
          placeholder="请输入{{item.comment or item.name}}"
          value-format="yyyy-MM-dd"
          style="width: 160px"
        >
        </el-date-picker>
      </el-form-item>
      
      {% elseif item.type == 'enum' %}
      {# 枚举 #}
      <el-form-item
        label="{{item.comment or item.name}}"
        prop="{{item.name}}"
      >
      <el-select
         v-model="form.{{item.name}}"
          placeholder="请选择{{item.comment or item.name}}"
        >
          <el-option
            v-for="item in {{item.name}}Options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
          
      {% elseif item.type == 'bool' %}
      {# 布尔 #}
      <el-form-item
        label="{{item.comment or item.name}}"
        prop="{{item.name}}"
      >
        <mo-switch v-model="form.{{item.name}}"
          ></mo-switch>
      </el-form-item>

      {% else %}

      <el-form-item
        label="{{item.comment or item.name}}"
        prop="{{item.name}}"
      >
        <el-input
          type="text"
          v-model="form.{{item.name}}"
          placeholder="请输入{{item.comment or item.name}}"
        ></el-input>
      </el-form-item>
      {% endif %}

      {% endfor %}
    </el-form>

    <!-- 操作 -->
    {% raw %}
    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('确定') }}</el-button
      >
    </div>
    {% endraw %}
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
 * created {{time.date}}
 * */
import { 
  formRules,
  // 引入枚举值
  {% for item in table.columns %}
        {% if item.type == 'enum' %}
         {{item.name}}Options,
        {% endif %}
      {% endfor %}
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
      {% for item in table.columns %}
        {% if item.type == 'enum' %}
         {{item.name}}Options,
        {% endif %}
      {% endfor %}

      form: {
        {%- for item in table.columns %}
        // {{item.comment or item.name }}
        {{item.name}}: '{{item.default | safe }}',
        {%- endfor %}
      },

    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          id: this.row.id
        }

        const res = await this.$http.function(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row

        {%- for item in table.columns %}
        // {{item.comment or item.name }}
        this.form.{{item.name}} = data.{{item.name}}
        {%- endfor %}
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
        {%- for item in table.columns %}
        // {{item.comment or item.name }}
        {{item.name}}: this.form.{{item.name}},
        {%- endfor %}
      }

      // 编辑
      if(this.row){
        params['id'] = this.row.id
      }

      const res = await this.$http.function(params)

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
