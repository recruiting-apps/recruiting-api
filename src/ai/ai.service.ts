import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { type Application } from 'src/offers/domain/entities/application.entity'
import { type Offer } from 'src/offers/domain/entities/offer.entity'

@Injectable()
export class AiService {
  constructor (
    private readonly httpService: HttpService
  ) {}

  cleanHtml (html: string): string {
    return html.replace(/<[^>]*>?/gm, '')
  }

  async getBetterApplicantUsingAi (offer: Offer): Promise<Application[]> {
    const API_URL = process.env.AI_API_URL ?? ''

    const url = `${API_URL}/find-better-applicant`

    const offerContent = `${offer.title} ${this.cleanHtml(offer.description)} ${offer.expectedAbilities.join(' ')} ${offer.company} ${offer.location}`

    const response = await this.httpService.axiosRef.post<Application[]>(url, {
      offer: offerContent,
      applications: offer.applications
    })
      .then((response) => {
        return response.data
      })

    return response
  }
}
