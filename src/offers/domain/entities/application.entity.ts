import { User } from 'src/users/domain/entities/user.entity'
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'
import { Status } from '../enum/status.enum'
import { Expose } from 'class-transformer'

@Entity({
  name: 'applications'
})
export class Application {
  @ObjectIdColumn()
    _id: ObjectId

  @Column()
    applicationDate: string

  @Column()
    status: Status

  @Column()
    comments: string

  @Column(() => User)
    user: User

  @Expose({
    name: 'id'
  })
  get id (): string {
    return this._id.toString()
  }
}
