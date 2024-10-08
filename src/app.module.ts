import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/app.config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { OffersModule } from './offers/offers.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { AiModule } from './ai/ai.module'
import { NotificationsModule } from './notifications/notifications.module'
import { MailingModule } from './mailing/mailing.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { databaseConfig } from './config/database/database.config'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 40
        }
      ]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig
    }),
    AuthModule,
    UsersModule,
    OffersModule,
    AiModule,
    NotificationsModule,
    MailingModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
