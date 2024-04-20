import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { OffersService } from '../services/offers.service'
import { type Offer } from '../domain/entities/offer.entity'
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

  @Get()
  async findAllByUser (
    @CurrentUser() user: User
  ): Promise<Offer[]> {
    return await this.offersService.findAll(user.id)
  }

  @Post()
  async apply (
    @Param('offerId', ParseIntPipe) offerId: number,
      @CurrentUser() user: User
  ): Promise<Offer> {
    return await this.offersService.apply(offerId, user.id)
  }
}
