import { map } from 'lodash/fp'

export const randomRange = (from, end, accuracy = 10000) => {
  const duration = (end - from + 1) * accuracy;
  const total = accuracy;
  const random = Math.random() * accuracy | 0;
  const per = total / duration;
  const randomPer = random / total
  const plus = (randomPer / per) | 0
  return plus + from; 
}

export const transform2DArray = map(
  map(array => randomRange(0, 1))
)

export const setOpposite = number => number === 1 ? 0 : 1;