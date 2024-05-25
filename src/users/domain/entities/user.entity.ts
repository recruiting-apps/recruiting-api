import * as argon2 from 'argon2'
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { Role } from '../enums/role.enum'
import { Application } from 'src/offers/domain/entities/application.entity'
import { Offer } from 'src/offers/domain/entities/offer.entity'
import { type PresentationLetter } from './presentation-letter'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ name: 'name', type: 'varchar', length: 100 })
    name: string

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
    lastName: string

  @Column({ type: 'varchar', length: 100, unique: true })
    email: string

  @Exclude()
  @Column()
    password: string

  @Column({ enum: Role, default: Role.APPLICANT })
    role: string

  @Column({ name: 'born_date', type: 'date' })
    bornDate: Date

  @Column({ name: 'description', type: 'text' })
    description: string

  @Column({ type: 'varchar', length: 15 })
    phone: string

  @Column({ type: 'varchar', length: 100 })
    address: string

  @Column({ type: 'text' })
    education: string

  @Column({ name: 'work_experience', type: 'text' })
    workExperience: string

  @Column({ type: 'text' })
    profession: string

  @Column({ name: 'abilities', type: 'json', default: '[]' })
    abilities: string[]

  @Column({ name: 'cv_path', type: 'text' })
    cvPath: string

  @Column({ name: 'profile_image_path', type: 'text' })
    profileImagePath: string

  @Column({ name: 'google_account', default: false })
    googleAccount: boolean

  @Column({ name: 'email_notification', default: true })
    emailNotification: boolean

  @Column({ name: 'presentation_letters', type: 'json', default: '[]' })
    presentationLetters: PresentationLetter[]

  @OneToMany(() => Application, application => application.user)
    applications: Application[]

  @OneToMany(() => Offer, offer => offer.user)
    offers: Offer[]

  @Expose()
  get fullName (): string {
    return `${this.name} ${this.lastName}`
  }

  @BeforeInsert()
  async hashPassword (): Promise<void> {
    this.password = await argon2.hash(this.password)
  }

  async comparePassword (attempt: string): Promise<boolean> {
    return await argon2.verify(this.password, attempt)
  }
}
