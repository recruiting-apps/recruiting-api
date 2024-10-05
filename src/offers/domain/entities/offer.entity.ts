import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { User } from 'src/users/domain/entities/user.entity'
import { Application } from './application.entity'

@Entity({
  name: 'offers'
})
export class Offer {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ name: 'title', type: 'varchar', length: 200 })
    title: string

  @Column({ name: 'description', type: 'text' })
    description: string

  @Column({ name: 'company', type: 'varchar', length: 50 })
    company: string

  @Column({ name: 'location', type: 'varchar', length: 50 })
    location: string

  @Column({ name: 'salary', type: 'varchar' })
    salary: string | number

  @Column({ name: 'publication_date', type: 'date' })
    publicationDate: Date

  @Column({ name: 'expiration_date', type: 'date' })
    expirationDate: Date

  @Column({ name: 'closed', type: 'boolean', default: false })
    closed: boolean

  @Column({ name: 'sorted', type: 'boolean', default: false })
    sorted: boolean

  @Column({ name: 'expected_abilities', type: 'json', default: '[]' })
    expectedAbilities: string[]

  @OneToMany(() => Application, application => application.offer)
    applications: Application[]

  @ManyToOne(() => User, user => user.offers)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}
