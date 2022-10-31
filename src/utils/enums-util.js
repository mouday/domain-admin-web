// 创建枚举对象，用于界面显示转换
export function createEnumObject(enums) {
  let labels = null
  let values = null

  return {
    getLabels() {
      if (!labels) {
        labels = enums.map((item) => item.label)
      }
      return labels
    },

    getValues() {
      if (!values) {
        values = enums.map((item) => item.value)
      }
      return values
    },

    getLabel(value) {
      let index = this.getValues().indexOf(value)

      if (index > -1) {
        return this.getLabels()[index]
      }
    },

    getValue(label) {
      let index = this.getLabels().indexOf(label)

      if (index > -1) {
        return this.getValues()[index]
      }
    },

    getItem(valueOrLabel) {
      let index = this.getValues().indexOf(valueOrLabel)

      if (index < 0) {
        index = this.getLabels().indexOf(valueOrLabel)
      }

      if (index > -1) {
        return enums[index]
      }
    },
  }
}
