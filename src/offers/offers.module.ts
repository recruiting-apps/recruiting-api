import { Module } from '@nestjs/common'
import { OffersService } from './services/offers.service'
import { OffersController } from './controller/offers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Offer } from './domain/entities/offer.entity'
import { UsersModule } from 'src/users/users.module'
import { ApplicationsServices } from './services/application.service'
import { Application } from './domain/entities/application.entity'
import { ApplicationsController } from './controller/application.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Offer,
      Application
    ]),
    UsersModule
  ],
  providers: [OffersService, ApplicationsServices],
  controllers: [OffersController, ApplicationsController]
})
export class OffersModule {}
