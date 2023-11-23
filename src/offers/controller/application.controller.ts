import { ClassSerializerInterceptor, Controller, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { OffersService } from '../services/offers.service'
import { type Offer } from '../domain/entities/offer.entity'
import { Status } from '../domain/enum/status.enum'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from 'src/users/domain/entities/user.entity'

@ApiBearerAuth()
@ApiTags('applications')
@Controller('offers/:offerId/applications')
@UseInterceptors(ClassSerializerInterceptor)
export class ApplicationsController {
  constructor (
    private readonly offersService: OffersService
  ) {}

  @Post()
  async apply (
    @Param('offerId') offerId: string,
      @CurrentUser() user: User
  ): Promise<Offer> {
    return await this.offersService.apply(offerId, user.id)
  }

  @Patch(':id')
  async cancel (
    @Param('offerId') offerId: string,
      @Param('id') id: string
  ): Promise<Offer> {
    return await this.offersService.cancelApplication(offerId, id)
  }

  @Patch(':id/update-status')
  async updateStatus (
    @Param('offerId') offerId: string,
      @Param('id') id: string,
      @Query('status') status: Status
  ): Promise<Offer> {
    return await this.offersService.updateApplication(offerId, id, status)
  }
}
