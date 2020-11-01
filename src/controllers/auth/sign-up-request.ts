import { IsNotEmpty } from 'class-validator'
import SignInRequestData from './sign-in-request'

export default class SignUpRequestData extends SignInRequestData {
  @IsNotEmpty() firstName: string
  @IsNotEmpty() lastName: string
}
