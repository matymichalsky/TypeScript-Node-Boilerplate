declare interface Array<T> {
  chunk(size: number): Array<Array<T>>
  removeItem(item: any): number
  removeByIndex(index: number): number
  first(): T|null
  last(): T|null
  toJson(): Array<any>
}
