import { Injectable } from '@nestjs/common'
import { MailingService } from './mailing.service'
import { OnEvent } from '@nestjs/event-emitter'
import { ApplicationApplyEmail, ApplicationChangeStatusEmail } from './types'
import { MailingEvents } from './events'

@Injectable()
export class MailingListener {
  constructor (
    private readonly mailingService: MailingService
  ) {}

  @OnEvent(MailingEvents.APPLICATION_APPLY, { async: true })
  async handleApplicationApply (payload: ApplicationApplyEmail) {
    await this.mailingService.sendApplicationApplyEmail(payload)
  }

  @OnEvent(MailingEvents.APPLICATION_CHANGE_STATUS, { async: true })
  async handleApplicationStatus (payload: ApplicationChangeStatusEmail) {
    await this.mailingService.sendChangeApplicationStatusEmail(payload)
  }
}
