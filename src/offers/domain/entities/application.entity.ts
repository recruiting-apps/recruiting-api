import { User } from 'src/users/domain/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Status } from '../enum/status.enum'
import { Offer } from './offer.entity'

@Entity({
  name: 'applications'
})
export class Application {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ name: 'application_date', type: 'date' })
    applicationDate: Date

  @Column({ name: 'status', type: 'enum', enum: Status, default: Status.PENDING })
    status: Status

  @Column({ name: 'comments', type: 'text', default: '' })
    comments: string

  @Column({ name: 'letter', type: 'text', nullable: true, default: null })
    letter: string | null

  @Column({ name: 'order', type: 'int', default: 0 })
    order: number

  @ManyToOne(() => Offer, offer => offer.applications)
  @JoinColumn({ name: 'offer_id', referencedColumnName: 'id' })
    offer: Offer

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}
