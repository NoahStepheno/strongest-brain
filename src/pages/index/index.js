import * as React from 'react'
import { View, Text, Image, Button } from 'remax/one'
import { useAppEvent } from 'remax/macro'
import BlockList from '../../components/BlockList'
import Timer from '../../components/Timer'
import styles from './index.less'
import {
  blackWhiteRelatively,
  initial2DStructure,
  totalZeroWithoutIgnore
} from '../../components/BlockList/interactive'
import { showModal } from '../../helpers/helper'
import usePopup from '../../hooks/usePopup'

export default () => {
  const block = React.useRef()
  const timer = React.useRef()

  const handleReset = () => {
    block.current.reset()
    timer.current.reset()
  }

  const handleRefresh = () => {
    block.current.refresh()
    timer.current.reset()
  }

  const handleSubmit = () => {
    const result = block.current && block.current.submit()
    console.log({result}) 
    if (result) {
      showModal({
        title: '恭喜通关',
        confirmText: '下一关',
        cancelText: '重置',
        success: handleRefresh,
        cancel: handleReset
      })
    } else {
      showModal({
        title: '回答错误',
        confirmText: '继续',
        cancelText: '重置',
        cancel: handleReset,
      })
    }
  }

  const popupRef = React.useRef()
  const Popup = usePopup({ title: '123', ref: popupRef })

  React.useEffect(() => {
    console.log('123', popupRef)
    popupRef.current.show()
  }, [])

  useAppEvent('onShareAppMessage', () => ({
    title: '最强大脑同款题目，防止老年痴呆。',
    path: '/page/index/index'
  }))

  return (
    <View className={styles.app}>
      <Timer ref={timer} />
      <View className={styles.blockList}>
        <BlockList
          ref={block}
          row={5}
          column={5}
          onClick={blackWhiteRelatively}
          ignoreColumnIndex={[0, 6]}
          ignoreRowIndex={[0, 6]}
          transform2DArray={initial2DStructure(10)}
          onSuccess={totalZeroWithoutIgnore({
            ignoreColumnIndex: [0, 6],
            ignoreRowIndex: [0, 6],
            equal: (item) => item === 0,
          })}
        />
      </View>
      <View className={styles.buttons}>
        <Button
          type='ghost'
          className={styles.btn}
          onTap={handleReset}
        >
          重置
        </Button>
        <Button 
          type='ghost' 
          className={styles.btn}
          onTap={handleSubmit}
        >
          提交
        </Button>
      </View>
      <Popup />
    </View>
  );
};
