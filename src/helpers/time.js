export const unshiftZero = number => number < 10 ? `0${number}` : number

export const formatSeconds = time => {
  const minutes = time / 60 | 0
  const seconds = time % 60
  return `${unshiftZero(minutes)} : ${unshiftZero(seconds)}`
}