import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MailingEvents } from 'src/mailing/events'
import { type NewApplicationEmail } from 'src/mailing/types'

@Injectable()
export class OfferEmailEmitter {
  constructor (
    private readonly eventEmitter: EventEmitter2
  ) {}

  async emitNewApplicationEmail (payload: NewApplicationEmail): Promise<void> {
    this.eventEmitter.emit(MailingEvents.NEW_APPLICATION, payload)
  }
}
