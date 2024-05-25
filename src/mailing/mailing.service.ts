import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { type ApplicationChangeStatusEmail, type ApplicationApplyEmail } from './types'

@Injectable()
export class MailingService {
  constructor (
    private readonly mailerService: MailerService
  ) {}

  async sendChangeApplicationStatusEmail ({ user, offer, status }: ApplicationChangeStatusEmail): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Application status changed',
      html: `
        <h1>Application status changed</h1>
        <p>Your application to the offer <span style='font-weight:bold;'>'${offer.title}'</span>  has been ${status}</p>
      `
    })
  }

  async sendApplicationApplyEmail ({ user, offer }: ApplicationApplyEmail): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Application received',
      html: `
        <h1>Application received</h1>
        <p>Your application to the offer <span style='font-weight:bold;'>'${offer.title}'</span> has been received</p>
      `
    })
  }
}
