import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity()
export default class Profile extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ type: 'text', nullable: true })
  photo?: string

  @Expose()
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
