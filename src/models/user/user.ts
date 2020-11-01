import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { dateColumnOptions, DateType } from '../../utils/db/utils/date'
import JsonDateFormat from '../../utils/decorators/json-date-format'
import AuthDetails from './auth-details'
import Profile from './profile'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Index({ unique: true })
  @Column()
  email!: string

  @OneToOne(_type => Profile, { eager: true })
  @JoinColumn()
  profile = new Profile()

  @Exclude()
  @OneToOne(_type => AuthDetails)
  @JoinColumn()
  auth: AuthDetails;

  @UpdateDateColumn(dateColumnOptions())
  @JsonDateFormat()
  updatedAt: Date

  @CreateDateColumn(dateColumnOptions())
  @JsonDateFormat()
  createdAt: DateType
}
