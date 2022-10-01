// 表单验证
export const formRules = {
    {% for item in table.columns %}
    // {{item.comment or item.name }}
    {{item.name}}: [
      {
        message: '{{item.comment or item.name}}不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    {% endfor %}
  }


// 引入枚举值
{% for item in table.columns %}
{% if item.type == 'enum' %}
// {{item.comment or item.name}}
export const {{item.name}}Options = [
    {
        label: '{{item.comment or item.name}}',
        value: '{{item.default}}'
    }
]

export function get{{item.name | capitalize }}OptionLabel(value){
    for(let item of {{item.name}}Options){
        if(item.value == value){
            return item.label
        }
    }
}
{% endif %}
{% endfor %}