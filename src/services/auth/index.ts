import { readFileSync } from 'fs'
import { Action } from 'routing-controllers'
import { sign, verify } from 'jsonwebtoken'
import { Container, Service } from 'typedi'
import User from '../../models/user/user'
import { UsersService } from '../users'

const jwtPrivateKey = readFileSync(__dirname + '/../../../secrets/jwtRS256.key')

@Service()
export default class AuthService {
  constructor(private usersService: UsersService) {}

  public extractTokenFromHeader(authHeader: string = '') {
    const [, token] = authHeader && authHeader.split(' ') || []
    return token || null
  }

  public generateJwtForUser(user: User) {
    return sign(
      { uid: user.id },
      jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: '60 days'
      }
    )
  }

  private decodeToken(token: string): Promise<JwtData> {
    return new Promise((resolve, reject) => {
      verify(token, jwtPrivateKey, { algorithms: ['RS256'] }, (err, res: JwtData) => {
        if (err) {
          return reject(err)
        }
        resolve(res)
      })
    })
  }

  public async isTokenValid(token: string): Promise<boolean> {
    if (!token) {
      return false
    }

    try {
      const { uid: userId } = await this.decodeToken(token)
      return !!userId
    } catch (e) {
      console.error(e)
      return false
    }
  }

  public async getUserByToken(token: string) {
    if (!token) {
      return null
    }

    const { uid: userId } = await this.decodeToken(token)

    if (!userId) {
      return null
    }

    return this.usersService.get(userId)
  }
}

const authService = Container.get(AuthService)

export function authorizationChecker(action: Action) {
  const token = authService.extractTokenFromHeader(action.request.headers?.authorization)
  return authService.isTokenValid(token)
}

export function currentUserChecker(action: Action) {
  const token = authService.extractTokenFromHeader(action.request.headers?.authorization)
  return authService.getUserByToken(token)
}

interface JwtData {
  uid: string
  iat: number
  exp: number
}
