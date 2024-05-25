import { AuditModel } from 'src/common/models/audit.model'
import { User } from 'src/users/domain/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'notifications'
})
export class Notification extends AuditModel {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    message: string

  @ManyToOne(() => User)
    user: User
}
