declare interface String {
  toRegex(): RegExp
  lowercaseFirstLetter(): string
  uppercaseFirstLetter(): string
  isNumeric(): boolean
  chunk(length: number): string[]
  stripNonNumericCharacters(): string
  isUuid(): boolean
  toBase64(): string
}

declare interface StringConstructor {
  randomString(length?: number,
               includeLowercase?: boolean,
               includeUppercase?: boolean,
               includeDashes?: boolean,
               includeSpecialCharacters?: boolean): string
  uuid(): string
  randomStringByCharacters(length?: number, allowedCharacters?: string): string
}
