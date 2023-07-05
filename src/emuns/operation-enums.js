/**
 * 数据操作枚举值
 */
export const OperationEnum = {
  // 添加
  CREATE: 1,

  // 更新
  UPDATE: 2,

  // 删除
  DELETE: 3,

  // 批量删除
  BATCH_DELETE: 4,
}

export const OperationOptions = [
  {
    value: OperationEnum.CREATE,
    label: '添加',
  },
  {
    value: OperationEnum.UPDATE,
    label: '更新',
  },
  {
    value: OperationEnum.DELETE,
    label: '删除',
  },
  {
    value: OperationEnum.BATCH_DELETE,
    label: '批量删除',
  },
]

export function OperationFilter(value) {
  const item = OperationOptions.find((item) => item.value == value)
  if (item) {
    return item.label
  }
  return
}
