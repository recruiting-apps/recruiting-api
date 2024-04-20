import { Module } from '@nestjs/common'
import { OffersService } from './services/offers.service'
import { OffersController } from './controller/offers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Offer } from './domain/entities/offer.entity'
import { UsersModule } from 'src/users/users.module'
import { ApplicationsService } from './services/application.service'
import { Application } from './domain/entities/application.entity'
import { ApplicationsController } from './controller/application.controller'
import { AiModule } from 'src/ai/ai.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Offer,
      Application
    ]),
    UsersModule,
    AiModule
  ],
  providers: [OffersService, ApplicationsService],
  controllers: [OffersController, ApplicationsController]
})
export class OffersModule {}
