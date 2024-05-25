import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Notification } from './domain/entities/notification.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification
    ]),
    UsersModule
  ],
  providers: [NotificationsService]
})
export class NotificationsModule {}
