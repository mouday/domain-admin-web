// 表单验证
export const formRules = {
    
    // prometheus_key
    prometheus_key: [
      {
        message: 'prometheus_key不能为空',
        required: false,
        trigger: 'blur',
      },
    ],
    
    // Token有效期（天）
    token_expire_days: [
      {
        message: 'Token有效期（天）不能为空',
        required: false,
        trigger: 'blur',
      },
    ],
    
  }


// 引入枚举值




