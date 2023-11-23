import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import * as argon2 from 'argon2'
import { Role } from '../enums/role.enum'

@Entity({
  name: 'users'
})
export class User {
  @ObjectIdColumn()
    _id: ObjectId

  @Column()
    name: string

  @Column()
    lastName: string

  @Column()
    email: string

  @Exclude()
  @Column()
    password: string

  @Column({ enum: Role, default: Role.APPLICANT })
    role: string

  @Column()
    bornDate: Date

  @Column()
    description: string

  @Column()
    phone: string

  @Column()
    address: string

  @Column()
    education: string

  @Column()
    workExperience: string

  @Column()
    abilities: string[]

  @Column()
    cvPath: string

  @Column()
    profileImagePath: string

  @Column()
    profession: string

  @Column({ default: false })
    googleAccount: boolean

  @Expose()
  get fullName (): string {
    return `${this.name} ${this.lastName}`
  }

  @Expose({
    name: 'id'
  })
  get id (): string {
    return this._id.toString()
  }

  async comparePassword (attempt: string): Promise<boolean> {
    return await argon2.verify(this.password, attempt)
  }
}
