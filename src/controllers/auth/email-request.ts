import { IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'

export default class EmailRequest {
  @IsEmail()
  @Transform((value: string) => value.toLowerCase())
  email: string
}
