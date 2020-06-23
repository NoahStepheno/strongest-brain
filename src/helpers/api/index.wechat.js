import { showModal as privateShowModal } from 'remax/wechat'
import { noop } from 'lodash'

export const showModal = ({
  title,
  confirmText,
  cancelText,
  success = noop,
  cancel = noop,
}) => privateShowModal({
  title,
  confirmText,
  cancelText,
  success({ confirm }) {
    if (confirm) success()
    else cancel()
  }
})