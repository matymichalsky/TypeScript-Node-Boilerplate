import { IsNotEmpty } from 'class-validator'
import EmailRequest from './email-request'

export default class SignInRequestData extends EmailRequest {
  @IsNotEmpty() password: string
}
