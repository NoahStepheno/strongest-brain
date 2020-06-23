import { setOpposite, randomRange} from '../../helpers/number'

export const blackWhiteRelatively = ({
  structure,
  rowIdx,
  columnIdx,
}) => {
  const newStructure = structure.concat();
  setOppositeBy(newStructure, rowIdx, columnIdx)
  setOppositeBy(newStructure, rowIdx - 1, columnIdx)
  setOppositeBy(newStructure, rowIdx + 1, columnIdx)
  setOppositeBy(newStructure, rowIdx, columnIdx - 1)
  setOppositeBy(newStructure, rowIdx, columnIdx + 1)
  return newStructure
}

export const setOppositeBy = (structure, rowIdx, columnIdx) => {
  const opp = setOpposite(structure[rowIdx][columnIdx])
  structure[rowIdx][columnIdx] = opp
  return structure
}

export const initial2DStructure = step => structure => {
  const row = structure.length
  const column = structure[0].length
  let newStructure = structure.concat()
  for (let i = 0; i < step; i ++) {
    const rowIdx = randomRange(1, row - 2)
    const columnIdx = randomRange(1, column - 2)
    console.log(rowIdx, columnIdx)
    newStructure = blackWhiteRelatively({
      structure: newStructure,
      rowIdx,
      columnIdx
    })
  }
  return newStructure
}

export const totalZeroWithoutIgnore = ({
  ignoreColumnIndex,
  ignoreRowIndex,
  equal,
}) => structure => {
  return structure.every((rows, rowIdx) => {
    if (ignoreRowIndex.includes(rowIdx)) return true;
    return rows.every((column, columnIdx) => {
      if (ignoreColumnIndex.includes(columnIdx)) {
        return true;
      } else {
        return equal(column)
      }
    })
  })
}