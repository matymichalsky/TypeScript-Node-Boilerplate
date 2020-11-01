import {
  Body,
  ForbiddenError,
  Head,
  HttpError,
  JsonController,
  NotFoundError,
  Post,
  QueryParams,
  UnauthorizedError
} from 'routing-controllers'
import moment from 'moment'
import BaseController from '../base-controller'
import { UsersService } from '../../services/users'
import AuthService from '../../services/auth'
import User from '../../models/user/user'
import Profile from '../../models/user/profile'
import AuthDetails from '../../models/user/auth-details'
import SignUpRequestData from './sign-up-request'
import SignInRequestData from './sign-in-request'
import EmailRequest from './email-request'

@JsonController('/auth')
export default class AuthController extends BaseController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    super()
  }

  @Head('/email-exists')
  public async isEmailExists(
    @QueryParams({ validate: true }) { email }: EmailRequest,
  ) {
    return this.usersService.getByEmail(email)
  }

  @Post('/sign-in')
  public async signIn(
    @Body({ validate: true }) { email, password }: SignInRequestData
  ) {
    const user = await this.usersService.getWithAuthenticationDetails(email)
    if (!user) {
      throw new NotFoundError('Email not found')
    }

    const currentDate = moment()
    if (user.auth.blockedUntil?.isAfter(currentDate)) {
      throw new ForbiddenError('User is blocked')
    }
    user.auth.blockedUntil = null

    if(!await user.auth.compare(password)) {
      const fifteenMinutesAgo = moment().subtract(15, 'minute')
      if (user.auth.lastAttempt?.isBefore(fifteenMinutesAgo)) {
        user.auth.loginAttempts = 0
      }

      user.auth.lastAttempt = currentDate

      user.auth.loginAttempts++
      if (user.auth.loginAttempts >= 5) {
        user.auth.blockedUntil = moment().add(30, 'minutes')
        user.auth.loginAttempts = 0
        user.auth.lastAttempt = null
      }

      await this.usersService.save(user)

      throw new UnauthorizedError('Invalid password')
    }

    user.auth.lastAttempt = null
    user.auth.loginAttempts = 0
    await this.usersService.save(user)

    const token = this.authService.generateJwtForUser(user)

    return { user, token }
  }

  @Post('/sign-up')
  public async signUp(
    @Body({ validate: true }) { email, password, firstName, lastName }: SignUpRequestData
  ) {
    const userByEmail = await this.usersService.getByEmail(email)
    if (userByEmail) {
      throw new HttpError(409, 'Email already exists')
    }

    const user = new User()
    user.email = email

    user.profile = new Profile()
    user.profile.firstName = firstName
    user.profile.lastName = lastName

    user.auth = new AuthDetails()
    user.auth.password = password

    await this.usersService.save(user)

    const token = this.authService.generateJwtForUser(user)

    return { user, token }
  }
}
