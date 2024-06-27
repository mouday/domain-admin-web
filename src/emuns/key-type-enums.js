// 加密方式
export const KeyTypeEnum = {
  RSA: 'RSA',
  DSA: 'DSA',
  EC: 'EC',
  DH: 'DH',
}

export const KEY_TYPE_OPTIONS = [
  {
    label: 'RSA',
    value: KeyTypeEnum.RSA,
  },
  {
    label: 'DSA',
    value: KeyTypeEnum.DSA,
    disabled: true,
  },
  {
    label: 'EC',
    value: KeyTypeEnum.EC,
    disabled: true,
  },
  {
    label: 'DH',
    value: KeyTypeEnum.DH,
    disabled: true,
  },
]
