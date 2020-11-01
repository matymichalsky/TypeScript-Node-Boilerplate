Array.prototype.removeItem = function(item: any): number {
  const index = this.indexOf(item)

  if (index !== -1) {
    this.splice(index, 1)
  }

  return this.length
}

Array.prototype.removeByIndex = function(index: number): number {
  delete this[index]
  this.clean()

  return this.length
}

Array.prototype.first = function(): any {
  if (!this.length) {
    return null
  }

  return this[0]
}

Array.prototype.last = function(): any {
  if (!this.length) {
    return null
  }

  return this[this.length - 1]
}

Array.prototype.chunk = function(size: number) {
  const result = []
  for (let i = 0; i < this.length; i += size) {
    result.push(this.slice(i, i + size))
  }
  return result
}