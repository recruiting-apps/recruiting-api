import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { type ApplicationChangeStatusEmail, type ApplicationApplyEmail, type NewApplicationEmail } from './types'

@Injectable()
export class MailingService {
  constructor (
    private readonly mailerService: MailerService
  ) { }

  async sendChangeApplicationStatusEmail ({ user, offer, status }: ApplicationChangeStatusEmail): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Application status changed',
      html: `
        <h1>Application status changed</h1>
        <p>Your application to the offer <span style='font-weight:bold;'>'${offer.title}'</span>  has been ${status}</p>
        
        <p>RecruitingAPP team</p>
        <p> <span style='font-weight:bold;'>RecruitingAPP</span> - The best way to find your next job</p>
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

        <p>RecruitingAPP team</p>
        <p> <span style='font-weight:bold;'>RecruitingAPP</span> - The best way to find your next job</p>
      `
    })
  }

  async sendNewApplicationEmail ({ offer }: NewApplicationEmail): Promise<void> {
    await this.mailerService.sendMail({
      to: offer.user.email,
      subject: 'New application received',
      html: `
        <h1>New application received</h1>
        <p>A new application to your offer <span style='font-weight:bold;'>'${offer.title}'</span> has been received</p>
        <p>Check your dashboard to see the new application</p>
        <p>Total applications: ${offer.applications.length}</p>

        <p>RecruitingAPP team</p>
        <p> <span style='font-weight:bold;'>RecruitingAPP</span> - The best way to find your next job</p>
      `
    })
  }
}
