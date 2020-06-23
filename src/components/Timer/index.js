import React, { useState, useEffect } from 'react'
import { View } from 'remax/one'
import { noop } from 'lodash'
import styles from './Timer.less'
import { formatSeconds } from '../../helpers/time'


export default React.forwardRef((props, ref) => {

  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    const currentTimer = setTimeout(() => setSeconds(
      prevSeconds => prevSeconds + 1
    ), 1e3)
    setTimer(currentTimer)
  }, [seconds])

  useEffect(() => {
    if (!ref) return noop
    ref.current = {
      reset() {
        setSeconds(0)
        clearTimeout(timer)
        setTimer(null)
      },
      pause() {
        clearTimeout(timer)
        setTimer(null)
      }
    }
  }, [timer])

  return (
    <View className={styles.timer}>
      {formatSeconds(seconds)}
    </View>
  )
})