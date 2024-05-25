import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MailingEvents } from 'src/mailing/events'
import { type ApplicationChangeStatusEmail, type ApplicationApplyEmail } from 'src/mailing/types'

@Injectable()
export class ApplicationEmailEmitter {
  constructor (
    private readonly eventEmitter: EventEmitter2
  ) {}

  async emitApplicationApplyEmail (payload: ApplicationApplyEmail): Promise<void> {
    this.eventEmitter.emit(MailingEvents.APPLICATION_APPLY, payload)
  }

  async emitApplicationChangeStatusEmail (payload: ApplicationChangeStatusEmail): Promise<void> {
    this.eventEmitter.emit(MailingEvents.APPLICATION_CHANGE_STATUS, payload)
  }
}
