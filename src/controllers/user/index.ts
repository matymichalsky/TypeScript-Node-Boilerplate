import { Authorized, Controller, CurrentUser, Get } from 'routing-controllers'
import BaseController from '../base-controller'
import User from '../../models/user/user'

@Controller('/user')
@Authorized()
export default class UserController extends BaseController {
  @Get('/')
  public getCurrent(@CurrentUser() user: User) {
    return user
  }
}
