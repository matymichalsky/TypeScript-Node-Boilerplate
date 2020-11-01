declare interface Number {
  between(from: number, to?: number): boolean
  toRad(): number
}

declare interface NumberConstructor {
  random(min: number, max: number): number
}
