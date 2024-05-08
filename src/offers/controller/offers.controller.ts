import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { OffersService } from '../services/offers.service'
import { CreateOfferDto, UpdateOfferDto } from '../domain/dto/offer.dto'
import { type Offer } from '../domain/entities/offer.entity'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from 'src/users/domain/entities/user.entity'

@ApiBearerAuth()
@ApiTags('offers')
@Controller('offers')
@UseInterceptors(ClassSerializerInterceptor)
export class OffersController {
  constructor (
    private readonly offersService: OffersService
  ) {}

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  async findAll (
    @Query('userId', ParseIntPipe) userId: number = 0
  ): Promise<Offer[]> {
    return await this.offersService.findAll(userId)
  }

  @Post()
  async create (
    @CurrentUser() user: User,
      @Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return await this.offersService.create(user.id, createOfferDto)
  }

  @Post(':id/better-application')
  async betterApplication (
    @Param('id', ParseIntPipe) id: number
  ): Promise<Offer> {
    return await this.offersService.getBetterApplication(id)
  }

  @Get('my-applications')
  async getMyApplications (
    @CurrentUser() user: User
  ): Promise<Offer[]> {
    return await this.offersService.getMyApplications(user.id)
  }

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return await this.offersService.findOne(id)
  }

  @Patch(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
      @Body() updateOfferDto: UpdateOfferDto
  ): Promise<Offer> {
    return await this.offersService.update(id, updateOfferDto)
  }

  @Delete(':id')
  async remove (@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return await this.offersService.remove(id)
  }
}
