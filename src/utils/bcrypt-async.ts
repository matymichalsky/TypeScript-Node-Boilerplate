import { promisify } from 'util'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

export const randomBytes = (number: number) => promisify(crypto.randomBytes)(number)
export const genSalt = (rounds: number) => promisify(bcrypt.genSalt)(rounds)
export const compare = (data: string, hash: string) => promisify(bcrypt.compare)(data, hash)
export const hash = (data: string, salt: string): Promise<string> => new Promise<string>((resolve, reject) => {
  bcrypt.hash(data, salt, undefined, (err, res) => {
    if (err) {
      return reject(err)
    }

    resolve(res)
  })
})