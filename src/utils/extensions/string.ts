import { v4 as uuidv4 } from 'uuid'
import { isNaN } from 'lodash'

String.randomStringByCharacters = (length: number = 64, allowedCharacters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_:-') => {
  let text = ''

  for (let i = 0; i < length; i++) {
    text += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length))
  }

  return text
}

String.uuid = () => {
  return uuidv4()
}

String.randomString = (length: number = 64, includeLowercase: boolean = true, includeUppercase: boolean = true, includeDashes: boolean = false, includeSpecialCharacters: boolean = false) => {
  let allowedCharacters = '0123456789'

  if (includeLowercase) {
    allowedCharacters += 'abcdefghijklmnopqrstuvwxyz'
  }

  if (includeUppercase) {
    allowedCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }

  if (includeDashes) {
    allowedCharacters += '-_'
  }

  if (includeSpecialCharacters) {
    allowedCharacters += '!@#$%^&*()+='
  }

  return String.randomStringByCharacters(length, allowedCharacters)
}

String.prototype.toRegex = function(): RegExp {
  const flags = this.replace(/.*\/([gimy]*)$/, '$1')
  const pattern = this.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1')
  return new RegExp(pattern, flags)
}

String.prototype.uppercaseFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.lowercaseFirstLetter = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

String.prototype.isNumeric = function () {
  return !isNaN(+this)
}

String.prototype.chunk = function (length: number) {
  return this.match(`/(.|[\\r\\n]){1,${length}}/g`.toRegex())
}

String.prototype.stripNonNumericCharacters = function () {
  return this.replace(/\D/g,'')
}

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

String.prototype.isUuid = function() {
  return uuidRegex.test(this)
}

String.prototype.toBase64 = function () {
  return Buffer.from(this).toString('base64')
}
