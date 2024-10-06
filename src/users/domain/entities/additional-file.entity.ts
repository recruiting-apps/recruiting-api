import { AuditModel } from 'src/common/models/audit.model'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Exclude } from 'class-transformer'

@Entity({
  name: 'files'
})
export class AdditionalFile extends AuditModel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar', length: 100 })
    name: string

  @Column({ type: 'text', default: '' })
    path: string

  @Exclude()
  @ManyToOne(() => User, user => user.files)
  @JoinColumn({ name: 'user_id' })
    user: User
}
