import React, { useRef, useState, useImperativeHandle } from 'react'
import { Popup } from 'anna-remax-ui'

function usePopup(props) {
  const {
    position = 'center',
    title,
    content,
    ref,
  } = props
  const [visible, setVisible] = useState(true)
  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false)
  }))
  const Component = () => {
    return (
      <Popup
        position={position}
        title={title}
        open={visible}
        closeable
        onClose={() => {
          setShow1(false);
        }}
      >
        {content}
      </Popup>
    )
  }
  const view = useRef(Component)
  return view.current
}

export default usePopup