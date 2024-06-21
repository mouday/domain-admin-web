// 表单验证
export const formRules = {
    
    // 类型
    dns_type_id: [
      {
        message: '类型不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 名称
    name: [
      {
        message: '名称不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // Access Key
    access_key: [
      {
        message: 'Access Key不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // Secret Key
    secret_key: [
      {
        message: 'Secret Key不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 创建时间
    create_time: [
      {
        message: '创建时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
  }


// 引入枚举值










