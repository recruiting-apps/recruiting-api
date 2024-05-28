import { AuditModel } from 'src/common/models/audit.model'
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Exclude } from 'class-transformer'

@Entity({
  name: 'files'
})
export class AdditionalFile extends AuditModel {
  @PrimaryGeneratedColumn()
    id: number

  @PrimaryColumn({ type: 'varchar', length: 100 })
    name: string

  @PrimaryColumn({ type: 'text', default: '' })
    path: string

  @Exclude()
  @ManyToOne(() => User, user => user.files)
  @JoinColumn({ name: 'user_id' })
    user: User
}
