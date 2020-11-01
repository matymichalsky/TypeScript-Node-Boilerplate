import { isNil } from 'lodash'

Number.random = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

Number.prototype.toRad = function(): number {
  return this * Math.PI / 180
}

Number.prototype.between = function(from: number, to?: number): boolean {
  let success = true

  if (from) {
    success = this >= from
  }

  if (success && !isNil(to)) {
    return this <= to
  }

  return success
}