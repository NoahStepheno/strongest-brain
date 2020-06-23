import { Modal } from 'antd-mobile'
import { noop } from 'lodash'

const { alert } = Modal

export const showModal = ({
  title,
  content,
  cancelText = '确定',
  confirmText = '取消',
  fail = noop,
  success = noop,
}) => alert(title, content, [
  { text: cancelText, onPress: fail },
  { text: confirmText, onPress: success },
])