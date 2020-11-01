import { getManager } from 'typeorm'
import { Service } from 'typedi'
import User from '../../models/user/user'
import Profile from '../../models/user/profile'
import AuthDetails from '../../models/user/auth-details'

@Service()
export class UsersService {
  public get(id: string) {
    return User.findOne(id)
  }

  public getByEmail(email: string) {
    return User.findOne({ email })
  }

  public getWithAuthenticationDetails(email: string) {
    return User.findOne({ email }, { relations: ['auth'] })
  }

  public async save(user: User) {
    const promises: Array<AuthDetails|Profile> = []

    return getManager().transaction<User>(async entityManager => {
      if (user.profile) {
        promises.push(user.profile)
      }

      if (user.auth) {
        promises.push(user.auth)
      }

      await entityManager.save(promises)
      return entityManager.save(user)
    })
  }
}
