// 表单验证
export const formRules = {
    
    // 邮件标题
    subject: [
      {
        message: '邮件标题不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 邮件内容
    content: [
      {
        message: '邮件内容不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 收件邮箱
    email_list: [
      {
        message: '收件邮箱不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
  }


// 引入枚举值






