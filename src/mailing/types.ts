import { type Offer } from 'src/offers/domain/entities/offer.entity'
import { type Status } from 'src/offers/domain/enum/status.enum'
import { type User } from 'src/users/domain/entities/user.entity'

export interface ApplicationApplyEmail {
  user: User
  offer: Offer
}

export interface ApplicationChangeStatusEmail {
  user: User
  offer: Offer
  status: Status
}
