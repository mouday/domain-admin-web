// 表单验证
export const formRules = {
  // 标题
  title: [
    {
      message: '名称不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 监控类型
  monitor_type: [
    {
      message: '监控类型不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 检测频率
  interval: [
    {
      message: '检测频率不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 重试次数
  allow_error_count: [
    {
      message: '重试次数不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 启用
  // is_active: [
  //   {
  //     message: '启用不能为空',
  //     required: true,
  //     trigger: 'blur',
  //   },
  // ],
}

// 引入枚举值
