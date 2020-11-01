import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { compare, genSalt, hash } from '../../utils/bcrypt-async'
import { dateColumnOptions, DateType } from '../../utils/db/utils/date'
import JsonDateFormat from '../../utils/decorators/json-date-format'

@Exclude()
@Entity()
export default class AuthDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  password!: string

  @Column({ default: 0 })
  loginAttempts: number = 0

  @Column(dateColumnOptions({ nullable: true }))
  @JsonDateFormat()
  lastAttempt?: DateType

  @Column(dateColumnOptions({ nullable: true }))
  @JsonDateFormat()
  blockedUntil?: DateType

  private storedPassword: string
  @AfterLoad()
  private loadStoredSecret() {
    this.storedPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptSecret() {
    if (this.password !== this.storedPassword) {
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt)
    }
  }

  public compare(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
