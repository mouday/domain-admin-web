// vue2
// import { Message } from "element-ui";
// vue3
import { ElMessage as Message } from 'element-plus'

/**
 * 确保浏览器只有一个弹框
 * options 文档参考
 * https://element.eleme.cn/#/zh-CN/component/message
 */
class SingleMessage {
  static message(options) {
    Message.closeAll()
    return Message(options)
  }

  static success(message) {
    return this.message({
      message,
      type: 'success',
      // duration: 0
    })
  }

  static warning(message) {
    return this.message({
      message,
      type: 'warning',
    })
  }

  static info(message) {
    return this.message({
      message,
      type: 'info',
    })
  }

  static error(message) {
    return this.message({
      message,
      type: 'error',
    })
  }

  static closeAll() {
    Message.closeAll()
  }
}

export default SingleMessage
