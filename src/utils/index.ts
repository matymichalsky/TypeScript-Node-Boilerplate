export const objectKeysToCamelCase = (obj: any) => {
  const newObject: any = {}
  if (obj instanceof Array) {
    return obj.map(function(value) {
      if (typeof value === 'object') {
        value = objectKeysToCamelCase(value)
      }
      return value
    })
  } else {
    Object.keys(obj).forEach(originalKey => {
      if (obj.hasOwnProperty(originalKey)) {
        const newKey = (originalKey.charAt(0).toLowerCase() + originalKey.slice(1) || originalKey).toString()
        let value = obj[originalKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = objectKeysToCamelCase(value)
        }
        newObject[newKey] = value
      }
    })
  }
  return newObject
}