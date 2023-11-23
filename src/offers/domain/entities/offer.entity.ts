import { Entity, ObjectIdColumn, type ObjectId, Column } from 'typeorm'
import { Expose } from 'class-transformer'
import { User } from 'src/users/domain/entities/user.entity'
import { Application } from './application.entity'

@Entity({
  name: 'offers'
})
export class Offer {
  @ObjectIdColumn()
    _id: ObjectId

  @Column()
    title: string

  @Column()
    description: string

  @Column()
    company: string

  @Column()
    location: string

  @Column()
    salary: string | number

  @Column()
    publicationDate: Date

  @Column()
    expirationDate: Date

  @Column()
    closed: boolean

  @Column((type) => User)
    user: User

  @Column((type) => Application)
    applications: Application[]

  @Column()
    expectedAbilities: string[]

  @Expose({
    name: 'id'
  })
  get id (): string {
    return this._id.toString()
  }
}
