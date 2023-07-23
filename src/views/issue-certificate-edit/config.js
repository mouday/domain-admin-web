// 表单验证
export const formRules = {
    
    // 域名列表
    domains: [
      {
        message: '域名列表不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 验证状态
    status: [
      {
        message: '验证状态不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // SSL签发时间
    start_time: [
      {
        message: 'SSL签发时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // SSL过期时间
    expire_time: [
      {
        message: 'SSL过期时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 创建时间
    create_time_label: [
      {
        message: '创建时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
  }


// 引入枚举值










