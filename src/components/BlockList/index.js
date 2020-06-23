import React, { useState, useCallback, useEffect } from 'react';
import { fill, noop, cloneDeep } from 'lodash';
import cx from 'classnames'
import { View } from 'remax/one';
import styles from './Block.less';

const createBasicStructure = (column, row) => {
  const result = []
  for (let i = 0; i < row + 2; i++) {
    result.push([])
    for (let j = 0; j < column + 2; j++) {
      result[i].push(0)
    }
  }
  return result
}

export default React.forwardRef((props, ref) => {
  const {
    column,
    row,
    ignoreColumnIndex = [],
    ignoreRowIndex = [],
    transform2DArray = noop,
    onSuccess = noop,
  } = props;

  const [structure, setStructure] = useState([])
  const [baseStructure, setBaseStructure] = useState([])
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!ref) return noop;
    ref.current = {
      refresh: () => setRefresh(refresh => refresh + 1),
      submit: () => onSuccess(structure),
      reset: () => {
        setStructure(cloneDeep(baseStructure))
      }
    }
  }, [structure, baseStructure])

  useEffect(() => {
    const structure = transform2DArray(
      createBasicStructure(column, row)
    )
    const copy = cloneDeep(structure);
    setStructure(structure)
    setBaseStructure(cloneDeep(structure))
  }, [refresh])

  const onClick = (rowIdx, columnIdx) => {
    const newStructure = props.onClick({
      structure,
      rowIdx,
      columnIdx,
    })
    setStructure(newStructure)
  }

  return (
    <View className={styles.blockList}>
      {structure.map((rows, index) => (
        !ignoreColumnIndex.includes(index) && (
          <View className={styles.rows} key={index}>
            {rows.map((row, idx) => (
              !ignoreRowIndex.includes(idx) && (
                <View 
                  className={cx(
                    styles.block, 
                    row & 1 > 0 ? styles.isBlack : styles.isWhite
                  )} 
                  key={idx}
                  onTap={() => onClick(index, idx)}
                >
                  <View className={styles.block__ele} />
                </View>
              )
            ))}
          </View>
        )
      ))}
    </View>
  )
})