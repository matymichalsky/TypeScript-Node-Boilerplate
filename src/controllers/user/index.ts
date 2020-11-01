import { Authorized, Controller, CurrentUser, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import BaseController from '../base-controller'
import User from '../../models/user/user'

@Controller('/user')
@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }]
})
export default class UserController extends BaseController {
  @Get('/')
  public getCurrent(@CurrentUser() user: User) {
    return user
  }
}
